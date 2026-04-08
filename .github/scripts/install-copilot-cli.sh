#!/usr/bin/env bash
set -euo pipefail

echo "Ensuring GitHub Copilot CLI is available..."

if gh copilot --help >/dev/null 2>&1; then
  echo "GitHub Copilot CLI already available."
elif gh extension list | awk '{print $1}' | grep -qx "github/gh-copilot"; then
  # Extension exists but command is unavailable in this shell; try a repair install.
  gh extension install github/gh-copilot --force
else
  gh extension install github/gh-copilot
fi

# Provide a simple `copilot` shim so downstream scripts can call either command.
mkdir -p "$HOME/.local/bin"
cat > "$HOME/.local/bin/copilot" <<'EOF'
#!/usr/bin/env bash
exec gh copilot "$@"
EOF
chmod +x "$HOME/.local/bin/copilot"

if [[ -n "${GITHUB_PATH:-}" ]]; then
  echo "$HOME/.local/bin" >> "$GITHUB_PATH"
else
  export PATH="$HOME/.local/bin:$PATH"
fi

gh copilot --help >/dev/null 2>&1 || {
  echo "GitHub Copilot CLI installation check failed." >&2
  exit 1
}

echo "GitHub Copilot CLI is ready."

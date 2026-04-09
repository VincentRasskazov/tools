name: Daily Copilot Tool Growth

on:
  schedule:
    - cron: "21 2 * * *"
  workflow_dispatch:

permissions:
  contents: write
  actions: write

concurrency:
  group: daily-copilot-tool-growth-v2
  cancel-in-progress: true

jobs:
  add-tools:
    runs-on: ubuntu-latest
    timeout-minutes: 15 # Bumped to allow for 25 AI generations

    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 1
          persist-credentials: true
          sparse-checkout-cone-mode: false
          sparse-checkout: |
            .github/
            tools/category-manifests/
            tools/copilot-timeline-days/
            tools/copilot-timeline.json
            README.md

      - name: Optimize Git Performance
        run: |
          git config --global core.preloadIndex true
          git config --global gc.auto 0
          git config --global advice.detachedHead false

      - name: Verify Node.js runtime
        run: |
          set -e
          node_major="$(node -p "process.versions.node.split('.')[0]")"
          if [[ "$node_major" -lt 20 ]]; then exit 1; fi

      - name: Select model from premium usage
        id: model
        run: node ./.github/scripts/select-copilot-model.js
        env:
          GH_TOKEN: ${{ secrets.COPILOT_PAT }}
          COPILOT_PREMIUM_THRESHOLD: "50"
          COPILOT_HIGH_MODEL: "gpt-5.3-codex"
          COPILOT_HIGH_REASONING: "high"
          COPILOT_LOW_MODEL: "gpt-4.1"
          COPILOT_LOW_REASONING: "standard"

      - name: Add 25 tools
        id: add_tools
        timeout-minutes: 12 # 🚀 Each AI tool takes ~15s, so 25 tools need ~7 mins
        env:
          GH_TOKEN: ${{ secrets.COPILOT_PAT }} # 🚀 THE FIX: Passing the token here
        run: |
          node ./.github/scripts/add-daily-tools.js \
            --count 25 \
            --model "${{ steps.model.outputs.selected_model }}" \
            --reasoning "${{ steps.model.outputs.selected_reasoning }}"

      - name: Build category manifests
        run: node ./.github/scripts/build-category-manifests.js --files "${{ steps.add_tools.outputs.created_files }}"

      - name: Build Copilot timeline
        run: node ./.github/scripts/build-copilot-timeline.js --files "${{ steps.add_tools.outputs.created_files }}"

      - name: Configure Git user
        run: |
          git config user.name "github-actions[bot]"
          git config user.email "41898282+github-actions[bot]@users.noreply.github.com"

      - name: Commit changes
        id: commit
        run: |
          created_files="${{ steps.add_tools.outputs.created_files }}"
          if [[ -z "$created_files" ]]; then
            echo "has_changes=false" >> "$GITHUB_OUTPUT"
            exit 0
          fi

          IFS=',' read -r -a files <<< "$created_files"
          for file in "${files[@]}"; do
            git add --sparse "tools/$file"
          done

          git add --sparse tools/category-manifests
          git add --sparse tools/copilot-timeline.json
          git add --sparse tools/copilot-timeline-days
          git add --sparse README.md

          if git diff --cached --quiet; then
            echo "has_changes=false" >> "$GITHUB_OUTPUT"
            exit 0
          fi

          git commit -m "chore: add 25 tools (${{ steps.model.outputs.selected_model }})"
          echo "has_changes=true" >> "$GITHUB_OUTPUT"

      - name: Push changes
        if: steps.commit.outputs.has_changes == 'true'
        timeout-minutes: 2
        run: |
          set -euo pipefail
          git config --global http.version HTTP/1.1
          git push --force origin HEAD:main

      - name: Neutralize Post-Job Scanner
        if: always()
        run: |
          # 🚀 Keep the Jedi Mind Trick so the cleanup is instant.
          rm -rf .git

import glob
import re
import os

# Regex to find the frontmatter block at the very top of the file
frontmatter_re = re.compile(r"^---\s*\n(.*?)\n---\s*\n", re.DOTALL)
title_re = re.compile(r'title:\s*"([^"]+)"')
desc_re = re.compile(r'description:\s*"([^"]+)"')
head_re = re.compile(r"(<head>)", re.IGNORECASE)

files = glob.glob("tools/*.html")
updated_count = 0

print("🔍 Scanning tools for SEO upgrades...")

for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Look for frontmatter
    match = frontmatter_re.search(content)
    if not match:
        continue # Skip if already patched or no frontmatter

    frontmatter = match.group(1)
    
    # Extract Title and Description
    title_match = title_re.search(frontmatter)
    desc_match = desc_re.search(frontmatter)
    
    title = title_match.group(1) if title_match else "Free Online Tool"
    desc = desc_match.group(1) if desc_match else "A free, fast, client-side utility tool."
    
    # Remove the frontmatter block from the HTML so it doesn't render as text
    new_content = frontmatter_re.sub("", content)

    # Build the massive SEO block
    seo_tags = f"""
  <meta name="description" content="{desc}">
  <meta property="og:title" content="{title}">
  <meta property="og:description" content="{desc}">
  <meta property="og:type" content="website">
  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content="{title}">
  <meta name="twitter:description" content="{desc}">
  """
    
    # Inject it right after <head>
    new_content = head_re.sub(r"\1" + seo_tags, new_content, count=1)

    # Save the file
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    updated_count += 1

print("-" * 40)
print(f"✅ SUCCESS! {updated_count} files have been SEO-Optimized!")
print("-" * 40)

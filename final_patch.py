import glob, re
frontmatter_re = re.compile(r"^---\s*\n(.*?)\n---\s*\n", re.DOTALL)
title_re = re.compile(r'title:\s*"([^"]+)"')
desc_re = re.compile(r'description:\s*"([^"]+)"')
head_re = re.compile(r"(<head>)", re.IGNORECASE)
img_url = "https://placehold.co/1200x630/2563eb/white?text=Vincent%27s+Tools+Hub"

for filepath in glob.glob("tools/*.html"):
    with open(filepath, 'r', encoding='utf-8') as f: content = f.read()
    if 'og:image' in content: continue # skip if already fully patched
    
    match = frontmatter_re.search(content)
    if not match: continue
    
    title = title_re.search(match.group(1)).group(1) if title_re.search(match.group(1)) else "Online Tool"
    desc = desc_re.search(match.group(1)).group(1) if desc_re.search(match.group(1)) else "A free, fast utility tool."
    
    new_content = frontmatter_re.sub("", content)
    tags = f"""
  <meta name="description" content="{desc}">
  <meta property="og:title" content="{title}">
  <meta property="og:description" content="{desc}">
  <meta property="og:type" content="website">
  <meta property="og:image" content="{img_url}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="{title}">
  <meta name="twitter:description" content="{desc}">
  <meta name="twitter:image" content="{img_url}">"""
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(head_re.sub(r"\1" + tags, new_content, count=1))
print("✅ SEO & Embeds applied to new tools!")

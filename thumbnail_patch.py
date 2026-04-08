import glob

files = glob.glob("tools/**/*.html", recursive=True)
updated_count = 0

# A dynamically generated placeholder image that matches your site's blue theme
img_url = "https://placehold.co/1200x630/2563eb/white?text=Vincent%27s+Tools+Hub"
og_image_tag = f'\n  <meta property="og:image" content="{img_url}">\n  <meta name="twitter:image" content="{img_url}">'

for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check if we already have an image tag to prevent duplicates
    if 'og:image' not in content and '<meta property="og:type" content="website">' in content:
        # Inject the image tags right after the og:type tag
        new_content = content.replace(
            '<meta property="og:type" content="website">', 
            '<meta property="og:type" content="website">' + og_image_tag
        )
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        updated_count += 1

print(f"✅ Added rich embed thumbnails to {updated_count} tools!")

import glob

starters = []
for f in glob.glob("tools/*.html"):
    with open(f, 'r', encoding='utf-8') as file:
        if 'starter tool' in file.read().lower():
            starters.append(f)

print("-" * 30)
if len(starters) == 0:
    print("✅ AMAZING! 0 Starters remaining. Your site is 100% complete!")
else:
    print(f"⚠️ Starters found: {len(starters)}")
    for s in starters:
        print(f" - {s}")
print("-" * 30)

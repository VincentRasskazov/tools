// text-similarity-checker.js
// Simple text similarity checker (Jaccard index)

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('check-btn');
  const t1 = document.getElementById('text1');
  const t2 = document.getElementById('text2');
  const result = document.getElementById('similarity-result');
  btn.onclick = () => {
    const set1 = new Set(t1.value.trim().toLowerCase().split(/\W+/));
    const set2 = new Set(t2.value.trim().toLowerCase().split(/\W+/));
    const intersection = new Set([...set1].filter(x => set2.has(x)));
    const union = new Set([...set1, ...set2]);
    const similarity = union.size === 0 ? 0 : intersection.size / union.size;
    result.textContent = `Similarity: ${(similarity * 100).toFixed(2)}%`;
  };
});

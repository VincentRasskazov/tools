// periodic-table-explorer.js
// Simple periodic table explorer (demo)

const elements = [
  {symbol: 'H', name: 'Hydrogen', number: 1},
  {symbol: 'He', name: 'Helium', number: 2},
  {symbol: 'Li', name: 'Lithium', number: 3},
  {symbol: 'Be', name: 'Beryllium', number: 4},
  {symbol: 'B', name: 'Boron', number: 5},
  {symbol: 'C', name: 'Carbon', number: 6},
  {symbol: 'N', name: 'Nitrogen', number: 7},
  {symbol: 'O', name: 'Oxygen', number: 8},
  {symbol: 'F', name: 'Fluorine', number: 9},
  {symbol: 'Ne', name: 'Neon', number: 10}
  // ... (add more elements as needed)
];

document.addEventListener('DOMContentLoaded', () => {
  const tableDiv = document.getElementById('periodic-table');
  const infoDiv = document.getElementById('element-info');
  tableDiv.innerHTML = elements.map(e => `<button class='element-btn' data-num='${e.number}'>${e.symbol}</button>`).join(' ');
  tableDiv.onclick = e => {
    if (e.target.classList.contains('element-btn')) {
      const el = elements.find(x => x.number == e.target.dataset.num);
      infoDiv.innerHTML = `<h2>${el.name} (${el.symbol})</h2><p>Atomic Number: ${el.number}</p>`;
    }
  };
});

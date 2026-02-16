async function callToolApi(url) {
  if (!navigator.onLine) {
    showOfflineWarning();
    return;
  }
  
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    showOfflineWarning();
  }
}

function showOfflineWarning() {
  const container = document.getElementById('result-container');
  if (container) {
    container.innerHTML = `
      <div style="background: rgba(239, 68, 68, 0.1); border: 1px solid #ef4444; color: #ef4444; padding: 15px; border-radius: 12px; margin-top: 10px;">
        <i class="fas fa-exclamation-triangle"></i> 
        <strong>Internet Required:</strong> This tool needs an external API to function.
      </div>`;
  }
}
document.addEventListener("DOMContentLoaded", function() {
    let allTools = [];
    const container = document.getElementById('tools-container');
    const searchInput = document.getElementById('search-tools');
    const categoryContainer = document.getElementById('category-filters');
    const loadingMsg = document.getElementById('loading-msg');

    // 1. Fetch Data
// Replace your existing Fetch block (Line 33-47) with this:
fetch('./tools.json')
    .then(response => {
        if (!response.ok) throw new Error("File not found (404) or server error.");
        return response.text(); // Get as text first to catch syntax errors
    })
    .then(text => {
        try {
            allTools = JSON.parse(text);
            loadingMsg.style.display = 'none';
            generateCategories(allTools);
            displayTools(allTools);
        } catch (e) {
            console.error("JSON Syntax Error:", e);
            loadingMsg.innerHTML = `
                <div style="color: #ef4444;">
                    <i class="fas fa-bug"></i> <strong>JSON Syntax Error:</strong><br>
                    Check line 8374 in tools.json.
                </div>`;
        }
    })
    .catch(error => {
        console.error('Fetch Error:', error);
        loadingMsg.textContent = 'Connection error. Please refresh.';
    });

    // 2. Display Tools Function
    function displayTools(tools) {
        container.innerHTML = '';
        
        if (tools.length === 0) {
            container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #666;">No tools found matching your search.</p>';
            return;
        }

        tools.forEach(tool => {
            // Default category if missing
            const cat = tool.category || 'Utility';
            
            const card = document.createElement('div');
            card.className = 'tool-card';
            card.innerHTML = `
                <span class="category-tag">${cat}</span>
                <h3><a href="${tool.url}">${tool.name}</a></h3>
                <p class="tool-desc">${tool.description || 'Free online tool for daily tasks.'}</p>
            `;
            container.appendChild(card);
        });
    }

    // 3. Search Logic
    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        
        // Reset category buttons when searching
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        
        const filtered = allTools.filter(tool => 
            tool.name.toLowerCase().includes(term) ||
            (tool.description && tool.description.toLowerCase().includes(term)) ||
            (tool.category && tool.category.toLowerCase().includes(term))
        );
        displayTools(filtered);
    });

    // 4. Generate Category Buttons
    function generateCategories(tools) {
        // Get unique categories
        const categories = ['All', ...new Set(tools.map(t => t.category || 'Utility'))].sort();
        
        categoryContainer.innerHTML = '';
        
        categories.forEach(cat => {
            const btn = document.createElement('button');
            btn.className = 'tab-btn';
            if (cat === 'All') btn.classList.add('active');
            btn.textContent = cat;
            
            btn.addEventListener('click', () => {
                // visual active state
                document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // clear search
                searchInput.value = '';
                
                // filter
                if (cat === 'All') {
                    displayTools(allTools);
                } else {
                    const filtered = allTools.filter(t => (t.category || 'Utility') === cat);
                    displayTools(filtered);
                }
            });
            
            categoryContainer.appendChild(btn);
        });
    }
});

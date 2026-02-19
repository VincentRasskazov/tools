document.addEventListener("DOMContentLoaded", function() {
    let allTools = [];
    let filteredTools = [];
    let itemsShown = 50; // Initial number of tools to show
    const loadAmount = 50; // How many to load on scroll

    const container = document.getElementById('tools-container');
    const searchInput = document.getElementById('search-tools');
    const categoryContainer = document.getElementById('category-filters');
    const loadingMsg = document.getElementById('loading-msg');
    const counter = document.getElementById('live-counter');

    // 1. Fetch Data
    fetch('./tools.json?v=' + Date.now()) // Bypass cache
        .then(response => {
            if (!response.ok) throw new Error("HTTP error " + response.status);
            return response.text(); 
        })
        .then(rawText => {
            try {
                // Clean up potential trailing commas before parsing
                const cleanText = rawText.replace(/,\s*([\]}])/g, '$1');
                allTools = JSON.parse(cleanText);

                if (!Array.isArray(allTools)) throw new Error("JSON is not an array");

                filteredTools = allTools;

                // ⭐ Update counter with TRUE total number of tools
                counter.textContent = allTools.length.toLocaleString();

                loadingMsg.style.display = 'none';
                generateCategories(allTools);
                displayTools(true);

            } catch (e) {
                console.error('Parsing Error:', e);
                loadingMsg.innerHTML = `Error: JSON Syntax issue. <button onclick="location.reload()">Retry</button>`;
            }
        })
        .catch(error => {
            console.error('Fetch Error:', error);
            loadingMsg.textContent = 'Connection error or file too large. Please refresh.';
        });

    // 2. Display Tools Function (With Lazy Loading Logic)
    function displayTools(reset = false) {
        if (reset) {
            container.innerHTML = '';
            itemsShown = 50;
        }
        
        if (filteredTools.length === 0) {
            container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #666;">No tools found matching your search.</p>';
            return;
        }

        const toolsToRender = filteredTools.slice(
            container.children.length,
            itemsShown
        );

        const fragment = document.createDocumentFragment();
        toolsToRender.forEach(tool => {
            const cat = tool.category || 'Utility';
            const card = document.createElement('div');
            card.className = 'tool-card';
            card.innerHTML = `
                <span class="category-tag">${cat}</span>
                <h3><a href="${tool.url}">${tool.name}</a></h3>
                <p class="tool-desc">${tool.description || 'Free online tool for daily tasks.'}</p>
            `;
            fragment.appendChild(card);
        });

        container.appendChild(fragment);
    }

    // 3. Infinite Scroll Logic
    window.addEventListener('scroll', () => {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 500) {
            if (itemsShown < filteredTools.length) {
                itemsShown += loadAmount;
                displayTools();
            }
        }
    });

    // 4. Search Logic
    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        
        filteredTools = allTools.filter(tool => 
            tool.name.toLowerCase().includes(term) ||
            (tool.description && tool.description.toLowerCase().includes(term)) ||
            (tool.category && tool.category.toLowerCase().includes(term))
        );

        displayTools(true);
    });

    // 5. Generate Category Buttons
    function generateCategories(tools) {
        const categories = ['All', ...new Set(tools.map(t => t.category || 'Utility'))].sort();
        categoryContainer.innerHTML = '';
        
        categories.forEach(cat => {
            const btn = document.createElement('button');
            btn.className = 'tab-btn';
            if (cat === 'All') btn.classList.add('active');
            btn.textContent = cat;
            
            btn.addEventListener('click', () => {
                document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                searchInput.value = '';
                
                filteredTools = (cat === 'All')
                    ? allTools
                    : allTools.filter(t => (t.category || 'Utility') === cat);

                displayTools(true);
            });

            categoryContainer.appendChild(btn);
        });
    }
});

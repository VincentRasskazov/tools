document.addEventListener("DOMContentLoaded", function() {
    let allTools = []; // Store all tools here for searching
    const container = document.getElementById('tools-list');
    const searchInput = document.getElementById('search-tools'); // Make sure your input has this ID

    // 1. Fetch the tools
    fetch('./tools.json')
        .then(response => {
            if (!response.ok) throw new Error("HTTP error " + response.status);
            return response.json();
        })
        .then(data => {
            allTools = data; // Save data globally
            displayTools(allTools); // Show everything initially
        })
        .catch(error => {
            console.error('Error loading tools:', error);
            if (container) container.innerHTML = '<p>Error loading tools.</p>';
        });

    // 2. Function to display tools
    function displayTools(tools) {
        if (!container) return;
        container.innerHTML = ''; // Clear current list

        if (tools.length === 0) {
            container.innerHTML = '<p>No tools found.</p>';
            return;
        }

        tools.forEach(tool => {
            const card = document.createElement('div');
            card.className = 'tool-card';
            card.innerHTML = `
                <h3><a href="${tool.url}">${tool.name}</a></h3>
                <p class="category">${tool.category}</p>
                <p class="desc">${tool.description}</p>
            `;
            container.appendChild(card);
        });
    }

    // 3. Search Logic (The part you were missing!)
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            
            const filteredTools = allTools.filter(tool => {
                // Search by name, category, OR description
                return (
                    tool.name.toLowerCase().includes(searchTerm) ||
                    tool.category.toLowerCase().includes(searchTerm) ||
                    (tool.description && tool.description.toLowerCase().includes(searchTerm))
                );
            });

            displayTools(filteredTools);
        });
    }
});

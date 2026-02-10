document.addEventListener("DOMContentLoaded", function() {
    // 1. Point to the file we just created
    // We use './tools.json' to make sure it looks in the same folder
    fetch('./tools.json')
        .then(response => {
            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }
            return response.json();
        })
        .then(data => {
            const container = document.getElementById('tools-list'); // Make sure this ID matches your HTML
            if (!container) return;

            // 2. Clear the "No tools found" message
            container.innerHTML = '';

            // 3. Generate the cards
            data.forEach(tool => {
                const card = document.createElement('div');
                card.className = 'tool-card'; // Ensure this class matches your CSS
                card.innerHTML = `
                    <h3><a href="${tool.url}">${tool.name}</a></h3>
                    <p class="category">${tool.category}</p>
                    <p class="desc">${tool.description}</p>
                `;
                container.appendChild(card);
            });
        })
        .catch(function(error) {
            console.error('Error loading tools:', error);
            const container = document.getElementById('tools-list');
            if (container) {
                container.innerHTML = '<p>Error loading tools. Please try again later.</p>';
            }
        });
});

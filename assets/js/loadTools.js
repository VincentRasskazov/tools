document.addEventListener("DOMContentLoaded", function () {
    let activeCategoryTools = [];
    let filteredTools = [];
    let itemsShown = 0;
    let activeCategorySlug = null;
    const loadAmount = 60;
    const categoryCache = new Map();

    const container = document.getElementById("tools-container");
    const searchInput = document.getElementById("search-tools");
    const categoryContainer = document.getElementById("category-filters");
    const loadingMsg = document.getElementById("loading-msg");
    const counter = document.getElementById("live-counter");

    searchInput.disabled = true;
    searchInput.placeholder = "Choose a category to load tools";

    fetch("./tools/category-manifests/index.json")
        .then((response) => {
            if (!response.ok) throw new Error("HTTP error " + response.status);
            return response.json();
        })
        .then((indexData) => {
            if (!indexData || !Array.isArray(indexData.categories)) {
                throw new Error("Invalid category index format");
            }

            counter.textContent = Number(indexData.totalTools || 0).toLocaleString();
            renderCategoryButtons(indexData.categories);
            loadingMsg.innerHTML = "Choose a category above to load tools.";
        })
        .catch((error) => {
            console.error("Category index fetch failed:", error);
            loadingMsg.textContent = "Failed to load categories. Please refresh.";
        });

    function renderCategoryButtons(categories) {
        categoryContainer.innerHTML = "";

        categories.forEach((category) => {
            const btn = document.createElement("button");
            btn.className = "tab-btn";
            btn.dataset.slug = category.slug;
            btn.textContent = `${category.name} (${category.count})`;

            btn.addEventListener("click", async () => {
                const slug = category.slug;
                if (!slug) return;

                document.querySelectorAll(".tab-btn").forEach((item) => item.classList.remove("active"));
                btn.classList.add("active");

                searchInput.value = "";
                searchInput.disabled = true;
                searchInput.placeholder = `Loading ${category.name}...`;
                loadingMsg.innerHTML = `<i class=\"fas fa-spinner fa-spin\"></i> Loading ${category.name} tools...`;

                try {
                    await loadCategory(category);
                    loadingMsg.textContent = `Loaded ${activeCategoryTools.length.toLocaleString()} tools in ${category.name}.`;
                    searchInput.disabled = false;
                    searchInput.placeholder = `Search in ${category.name}`;
                    searchInput.focus();
                } catch (err) {
                    console.error("Category load failed:", err);
                    loadingMsg.textContent = `Failed to load ${category.name}. Try another category.`;
                    searchInput.disabled = true;
                    searchInput.placeholder = "Choose a category to load tools";
                }
            });

            categoryContainer.appendChild(btn);
        });
    }

    async function loadCategory(category) {
        const slug = category.slug;
        activeCategorySlug = slug;

        let tools = categoryCache.get(slug);
        if (!tools) {
            const manifestFile = category.manifest || `${slug}.json`;
            const response = await fetch(`./tools/category-manifests/${manifestFile}`);
            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }

            tools = await response.json();
            if (!Array.isArray(tools)) {
                throw new Error("Category manifest is not an array");
            }

            categoryCache.set(slug, tools);
        }

        // Ignore stale responses if user switched categories quickly.
        if (activeCategorySlug !== slug) return;

        activeCategoryTools = tools;
        filteredTools = tools;
        itemsShown = loadAmount;
        displayTools(true);
    }

    function displayTools(reset = false) {
        if (reset) {
            container.innerHTML = "";
        }

        if (filteredTools.length === 0) {
            container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #666;">No tools found in this category for your query.</p>';
            return;
        }

        const rendered = container.children.length;
        const toolsToRender = filteredTools.slice(rendered, itemsShown);
        const fragment = document.createDocumentFragment();

        toolsToRender.forEach((tool) => {
            const card = document.createElement("div");
            card.className = "tool-card";
            card.innerHTML = `
                <span class="category-tag">${tool.category || "Utility"}</span>
                <h3><a href="${tool.url}">${tool.name}</a></h3>
                <p class="tool-desc">${tool.description || "Free online tool for daily tasks."}</p>
            `;
            fragment.appendChild(card);
        });

        container.appendChild(fragment);
    }

    window.addEventListener("scroll", () => {
        if (searchInput.disabled) return;
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 500) {
            if (itemsShown < filteredTools.length) {
                itemsShown += loadAmount;
                displayTools();
            }
        }
    });

    searchInput.addEventListener("input", (event) => {
        if (searchInput.disabled) return;

        const query = event.target.value.trim().toLowerCase();
        filteredTools = activeCategoryTools.filter((tool) => {
            const name = (tool.name || "").toLowerCase();
            const description = (tool.description || "").toLowerCase();
            return name.includes(query) || description.includes(query);
        });

        itemsShown = loadAmount;
        displayTools(true);
    });
});

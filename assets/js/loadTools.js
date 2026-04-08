document.addEventListener("DOMContentLoaded", function () {
    let activeCategoryTools = [];
    let filteredTools = [];
    let allTools = [];
    let allToolsLoaded = false;
    let allToolsManifestFile = "all-tools.json";
    let itemsShown = 0;
    let activeCategorySlug = null;
    let activeCategoryName = "";
    let searchDebounceId = null;
    const loadAmount = 60;
    const categoryCache = new Map();

    const container = document.getElementById("tools-container");
    const searchInput = document.getElementById("search-tools");
    const categoryContainer = document.getElementById("category-filters");
    const loadingMsg = document.getElementById("loading-msg");
    const counter = document.getElementById("live-counter");

    searchInput.disabled = true;
    searchInput.placeholder = "Loading tool index...";

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
            allToolsManifestFile = indexData.allToolsManifest || "all-tools.json";
            renderCategoryButtons(indexData.categories);
            searchInput.disabled = false;
            searchInput.placeholder = "Search all tools or choose a category";
            loadingMsg.innerHTML = "Search all tools or choose a category above.";
        })
        .catch((error) => {
            console.error("Category index fetch failed:", error);
            loadingMsg.textContent = "Failed to load categories. Please refresh.";
            searchInput.disabled = true;
            searchInput.placeholder = "Tool index failed to load";
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
                searchInput.placeholder = `Search all tools or filter ${category.name}`;
                loadingMsg.innerHTML = `<i class=\"fas fa-spinner fa-spin\"></i> Loading ${category.name} tools...`;

                try {
                    await loadCategory(category);
                    loadingMsg.textContent = `Loaded ${activeCategoryTools.length.toLocaleString()} tools in ${category.name}.`;
                    searchInput.focus();
                } catch (err) {
                    console.error("Category load failed:", err);
                    loadingMsg.textContent = `Failed to load ${category.name}. Try another category.`;
                }
            });

            categoryContainer.appendChild(btn);
        });
    }

    async function loadCategory(category) {
        const slug = category.slug;
        activeCategorySlug = slug;
        activeCategoryName = category.name;

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

    async function ensureAllToolsLoaded() {
        if (allToolsLoaded) return;

        const response = await fetch(`./tools/category-manifests/${allToolsManifestFile}`);
        if (!response.ok) {
            throw new Error("HTTP error " + response.status);
        }

        const payload = await response.json();
        if (!Array.isArray(payload)) {
            throw new Error("Global tool manifest is not an array");
        }

        allTools = payload;
        allToolsLoaded = true;
    }

    async function runSearch(query) {
        const normalizedQuery = query.trim().toLowerCase();

        if (!normalizedQuery) {
            if (activeCategorySlug) {
                filteredTools = activeCategoryTools;
                itemsShown = loadAmount;
                displayTools(true);
                loadingMsg.textContent = `Loaded ${activeCategoryTools.length.toLocaleString()} tools in ${activeCategoryName}.`;
                return;
            }

            filteredTools = [];
            itemsShown = 0;
            displayTools(true);
            loadingMsg.textContent = "Search all tools or choose a category above.";
            return;
        }

        loadingMsg.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Searching all tools...';

        try {
            await ensureAllToolsLoaded();
            filteredTools = allTools.filter((tool) => {
                const name = (tool.name || "").toLowerCase();
                const description = (tool.description || "").toLowerCase();
                const category = (tool.category || "").toLowerCase();

                return name.includes(normalizedQuery)
                    || description.includes(normalizedQuery)
                    || category.includes(normalizedQuery);
            });

            itemsShown = loadAmount;
            displayTools(true);
            loadingMsg.textContent = `Found ${filteredTools.length.toLocaleString()} tools for "${query}" across all categories.`;
        } catch (err) {
            console.error("Global search failed:", err);
            loadingMsg.textContent = "Search failed to load. Please refresh and try again.";
        }
    }

    function displayTools(reset = false) {
        if (reset) {
            container.innerHTML = "";
        }

        if (filteredTools.length === 0) {
            let emptyMessage = "Search all tools or choose a category above.";
            if (searchInput.value.trim()) {
                emptyMessage = "No tools found for your search query.";
            } else if (activeCategorySlug) {
                emptyMessage = "No tools found in this category.";
            }

            container.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #666;">${emptyMessage}</p>`;
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
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 500) {
            if (itemsShown < filteredTools.length) {
                itemsShown += loadAmount;
                displayTools();
            }
        }
    });

    searchInput.addEventListener("input", (event) => {
        if (searchInput.disabled) return;

        const query = event.target.value;
        clearTimeout(searchDebounceId);
        searchDebounceId = setTimeout(() => {
            runSearch(query);
        }, 180);
    });
});

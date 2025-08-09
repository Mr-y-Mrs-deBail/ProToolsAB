document.addEventListener('DOMContentLoaded', () => {
    const searchIconLink = document.querySelector('.search-right a[title="search"]');
    const searchOverlay = document.getElementById('search');
    const closeButton = document.querySelector('.search-right .close');
    const searchInput = document.getElementById('search-input');
    const searchSuggestions = document.getElementById('suggestions');
    const searchResultsContainer = document.getElementById('search-results');
    const searchSubmitButton = document.querySelector('.search-btn-left'); 

    let fuse; 
    let lastSingleSuggestionUrl = null; 

    const getCurrentLanguage = () => {
        const lang = document.documentElement.lang || 'en';
        return lang.substring(0, 2);
    };

    const focusSearchInput = () => {
        setTimeout(() => {
            if (searchInput) {
                searchInput.focus();
            }
        }, 50);
    };

    const openSearch = (event) => {
        event.preventDefault();
        searchOverlay.classList.add('active');
        if (searchIconLink) {
            searchIconLink.style.opacity = '0';
            searchIconLink.style.pointerEvents = 'none';
        }

        const currentPageTitle = document.title;
        const productsSectionUrl = `${window.location.origin}/index.html#products`;

        if (searchInput.value.trim() !== '' && (searchInput.value.trim() === currentPageTitle.trim() || window.location.href.includes('#products'))) {
            searchInput.value = '';
        } else {
            searchInput.value = ''; 
        }

        searchSuggestions.innerHTML = ''; 
        searchSuggestions.style.display = 'none'; 
        if (searchResultsContainer) {
            searchResultsContainer.style.display = 'none'; 
        }
        lastSingleSuggestionUrl = null; 
        focusSearchInput(); 
    };

    const closeSearch = (event) => {
        event.preventDefault();
        searchOverlay.classList.remove('active');
        if (searchIconLink) {
            searchIconLink.style.opacity = '1';
            searchIconLink.style.pointerEvents = 'auto';
        }
        if (searchInput) {
            searchInput.blur(); 
        }
        searchSuggestions.style.display = 'none'; 
        if (searchResultsContainer) {
            searchResultsContainer.style.display = 'none'; 
        }
        lastSingleSuggestionUrl = null; 
    };

    const initializeFuse = () => {
        const currentLang = getCurrentLanguage();
        console.log("Current search language:", currentLang); 

        const fuseOptions = {
            includeScore: false,
            threshold: 0.3,
            ignoreLocation: true,
            findAllMatches: true,
            keys: [
                { name: `title.${currentLang}`, weight: 0.7 },
                { name: `content.${currentLang}`, weight: 0.5 },
                { name: `type.${currentLang}`, weight: 0.3 }
            ]
        };
        fuse = new Fuse(allSearchableItems, fuseOptions);
    };

    initializeFuse(); 

    const showFuzzySuggestions = (query) => {
        searchSuggestions.innerHTML = ''; 
        if (searchResultsContainer) {
            searchResultsContainer.style.display = 'none'; 
        }

        if (query.trim().length === 0) {
            searchSuggestions.style.display = 'none';
            lastSingleSuggestionUrl = null; 
            return;
        }

        if (!fuse || fuse.options.keys[0].name.split('.')[1] !== getCurrentLanguage()) {
            initializeFuse();
        }

        const results = fuse.search(query);
        const maxSuggestions = 8;
        const topResults = results.slice(0, maxSuggestions);
        const currentLang = getCurrentLanguage();

        if (topResults.length === 1) {
            lastSingleSuggestionUrl = topResults[0].item.url;
        } else {
            lastSingleSuggestionUrl = null; 
        }

        if (topResults.length > 0) {
            topResults.forEach(result => {
                const li = document.createElement('li');

                li.style.display = 'flex';
                li.style.alignItems = 'center';
                li.style.gap = '10px';

                const displayTitle = result.item.title[currentLang] || result.item.title['en'] || (result.item.content && result.item.content[currentLang] ? result.item.content[currentLang].substring(0, 50) + '...' : '...');
                const displayType = result.item.type[currentLang] || result.item.type['en'];
                const displayPrice = result.item.price !== undefined ? `$${result.item.price.toFixed(2)}` : '';

                // Agrega imagen si existe
                if (result.item.image) {
                    const img = document.createElement('img');
                    img.src = result.item.image;
                    img.alt = displayTitle;
                    img.style.width = '40px';
                    img.style.height = '40px';
                    img.style.objectFit = 'contain';
                    img.style.borderRadius = '3px';
                    li.appendChild(img);
                }

                const textContainer = document.createElement('div');
                textContainer.innerHTML = `<strong>${displayTitle}</strong> <br><small>${displayType}${displayPrice ? ` - ${displayPrice}` : ''}</small>`;
                li.appendChild(textContainer);

                li.addEventListener('click', () => {
                    searchInput.value = displayTitle; 
                    searchSuggestions.style.display = 'none';
                    if (result.item.url) {
                        window.location.href = result.item.url; 
                    }
                });
                searchSuggestions.appendChild(li);
            });
            searchSuggestions.style.display = 'block'; 
        } else {
            searchSuggestions.style.display = 'block'; 
            searchSuggestions.innerHTML = `
                <li style="display: block; text-align: center; padding: 20px;">
                    <p style="font-size: 1.1em; color: var(--heading-color);">No product found. <br>
                    <img src="img/search.png" alt="No results found" style="max-width: 100px; margin-bottom: 10px;">
                    <br> But perhaps you might be interested in these <a href="${window.location.origin}/index.html#products" style="color: var(--primary-color); text-decoration: underline;">products</a></p>                
                </li>
            `;
            lastSingleSuggestionUrl = null; 
        }
    };

    const redirectToSingleSuggestion = () => {
        if (lastSingleSuggestionUrl) {
            window.location.href = lastSingleSuggestionUrl;
            return true; 
        }
        return false; 
    };

    if (searchInput) {
        searchInput.addEventListener('input', (event) => {
            const query = event.target.value;
            showFuzzySuggestions(query);
        });

        searchInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault(); 

                if (redirectToSingleSuggestion()) {
                } else {
                    searchSuggestions.style.display = 'none';
                }
            }
        });

        searchInput.addEventListener('blur', () => {
            setTimeout(() => {
                if (!searchSuggestions.contains(document.activeElement) && searchInput.value.trim().length === 0) {
                    searchSuggestions.style.display = 'none';
                    lastSingleSuggestionUrl = null; 
                }
            }, 100);
        });
    }
    if (searchSubmitButton) {
        searchSubmitButton.addEventListener('click', (event) => {
            event.preventDefault(); 

            if (redirectToSingleSuggestion()) {
            } 
        });
    }

    if (searchIconLink) {
        searchIconLink.addEventListener('click', openSearch);
    }

    if (closeButton) {
        closeButton.addEventListener('click', closeSearch);
    }
});


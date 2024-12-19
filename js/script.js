document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.nav-item');
    const contentArea = document.getElementById('content-area');

    // Load default section (about.html) at startup
    loadSection('about.html');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            const target = item.getAttribute('data-target');
            loadSection(target);
        });
    });

    function loadSection(sectionFile) {
        fetch('sections/' + sectionFile)
            .then(response => response.text())
            .then(html => {
                contentArea.innerHTML = html;
                initializeReadMore();
            })
            .catch(err => console.error('Error loading section:', err));
    }

    function initializeReadMore() {
        const MAX_LENGTH = 200; // max length for snippet
        const blogTexts = contentArea.querySelectorAll('.blog-text');
        blogTexts.forEach(textElem => {
            const fullText = textElem.innerText.trim();
            if (fullText.length > MAX_LENGTH) {
                const snippet = fullText.slice(0, MAX_LENGTH) + '...';
                textElem.setAttribute('data-fulltext', fullText);
                textElem.innerText = snippet;
            } else {
                const readMoreLink = textElem.parentElement.querySelector('.read-more');
                if (readMoreLink) readMoreLink.style.display = 'none';
            }
        });

        const readMoreLinks = contentArea.querySelectorAll('.read-more');
        readMoreLinks.forEach(link => {
            link.addEventListener('click', () => {
                const textElem = link.parentElement.querySelector('.blog-text');
                const fullText = textElem.getAttribute('data-fulltext');
                const state = link.getAttribute('data-state') || 'collapsed';

                if (state === 'collapsed') {
                    textElem.innerText = fullText;
                    link.innerText = 'Read Less';
                    link.setAttribute('data-state', 'expanded');
                } else {
                    const snippet = fullText.slice(0, MAX_LENGTH) + '...';
                    textElem.innerText = snippet;
                    link.innerText = 'Read More';
                    link.setAttribute('data-state', 'collapsed');
                }
            });
        });
    }
});

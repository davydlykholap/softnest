document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.getElementById('new-menu-toggle');
    const mobileNavigation = document.getElementById('new-mobile-navigation');

    function setMenuOpen(open) {
        if (!menuToggle || !mobileNavigation) return;
        menuToggle.setAttribute('aria-expanded', String(open));
        menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
        mobileNavigation.classList.toggle('mobile-nav--open', open);
    }

    if (menuToggle && mobileNavigation) {
        menuToggle.addEventListener('click', function () {
            setMenuOpen(menuToggle.getAttribute('aria-expanded') !== 'true');
        });

        mobileNavigation.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                setMenuOpen(false);
            });
        });
    }

    const range = document.getElementById('compare-range');
    const afterImage = document.querySelector('.new-hero-root .compare__image--after');
    const divider = document.querySelector('.new-hero-root .compare__line');

    function updateComparison(position) {
        if (afterImage) afterImage.style.clipPath = `inset(0 0 0 ${position}%)`;
        if (divider) divider.style.left = `${position}%`;
    }

    if (range) {
        updateComparison(range.value);
        range.addEventListener('input', function () {
            updateComparison(range.value);
        });
    }

    document.querySelectorAll('.gallery-compare-card').forEach(function (card) {
        const galleryRange = card.querySelector('input[type="range"]');
        const afterLayer = card.querySelector('.gallery-layer--after');
        const divider = card.querySelector('.gallery-divider');

        function updateGalleryComparison(position) {
            if (afterLayer) afterLayer.style.clipPath = `inset(0 0 0 ${position}%)`;
            if (divider) divider.style.left = `${position}%`;
        }

        if (galleryRange) {
            updateGalleryComparison(galleryRange.value);
            galleryRange.addEventListener('input', function () {
                updateGalleryComparison(galleryRange.value);
            });
        }
    });

    const galleryDots = Array.from(document.querySelectorAll('.gallery-pagination button'));
    const galleryPrevious = document.querySelector('.gallery-carousel-arrow--prev');
    const galleryNext = document.querySelector('.gallery-carousel-arrow--next');
    let galleryPage = 0;

    function showGalleryPage(page) {
        if (!galleryDots.length) return;
        galleryPage = (page + galleryDots.length) % galleryDots.length;
        galleryDots.forEach(function (dot, index) {
            dot.classList.toggle('is-active', index === galleryPage);
        });
    }

    galleryDots.forEach(function (dot, index) {
        dot.addEventListener('click', function () {
            showGalleryPage(index);
        });
    });

    if (galleryPrevious) {
        galleryPrevious.addEventListener('click', function () {
            showGalleryPage(galleryPage - 1);
        });
    }

    if (galleryNext) {
        galleryNext.addEventListener('click', function () {
            showGalleryPage(galleryPage + 1);
        });
    }

    const gallerySection = document.querySelector('.gallery-section-v2');
    if (gallerySection) {
        function alignGalleryAnchor() {
            if (window.location.hash !== '#results') return;
            const previousBehavior = document.documentElement.style.scrollBehavior;
            document.documentElement.style.scrollBehavior = 'auto';
            window.scrollTo(0, gallerySection.offsetTop);
            document.documentElement.style.scrollBehavior = previousBehavior;
        }

        alignGalleryAnchor();
        window.setTimeout(alignGalleryAnchor, 0);
        window.addEventListener('hashchange', alignGalleryAnchor);
    }
});

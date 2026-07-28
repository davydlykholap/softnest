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
});

const REVIEWS_AUTO_ADVANCE_MS = 6000;

function initReviewsCarousel() {
    const track = document.getElementById('reviews-track');
    const dotsContainer = document.getElementById('reviews-dots');
    const carousel = document.getElementById('reviews-carousel');

    if (!track || !track.children.length) return;

    const cards = Array.from(track.children);
    let index = 0;
    let autoTimer = null;

    function cardsPerView() {
        if (window.innerWidth >= 768) return 2;
        return 1;
    }

    function maxIndex() {
        return Math.max(0, cards.length - cardsPerView());
    }

    function renderDots() {
        dotsContainer.innerHTML = '';
        const total = maxIndex() + 1;
        for (let i = 0; i < total; i++) {
            const dot = document.createElement('button');
            dot.type = 'button';
            dot.className = 'reviews-carousel__dot' + (i === index ? ' is-active' : '');
            dot.setAttribute('aria-label', `Go to review ${i + 1}`);
            dot.addEventListener('click', () => goTo(i));
            dotsContainer.appendChild(dot);
        }
    }

    function update() {
        const cardWidth = cards[0].getBoundingClientRect().width;
        const gap = 24; // matches CSS gap: 1.5rem
        track.style.transform = `translateX(-${index * (cardWidth + gap)}px)`;
        renderDots();
    }

    function goTo(i) {
        index = Math.min(Math.max(i, 0), maxIndex());
        update();
        resetAutoAdvance();
    }

    function next() { goTo(index >= maxIndex() ? 0 : index + 1); }

    function resetAutoAdvance() {
        if (autoTimer) clearInterval(autoTimer);
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduceMotion || cards.length <= cardsPerView()) return;
        autoTimer = setInterval(next, REVIEWS_AUTO_ADVANCE_MS);
    }

    window.addEventListener('resize', () => { index = 0; update(); });

    carousel.addEventListener('mouseenter', () => autoTimer && clearInterval(autoTimer));
    carousel.addEventListener('mouseleave', resetAutoAdvance);

    update();
    resetAutoAdvance();
}

document.addEventListener('DOMContentLoaded', initReviewsCarousel);

/* ── Mobile nav menu ── */
        function toggleMobileMenu() {
            const drawer = document.getElementById('mobile-nav-drawer');
            const overlay = document.getElementById('mobile-nav-overlay');
            const btn = document.getElementById('hamburger-btn');
            const hamburgerIcon = document.getElementById('hamburger-icon');
            const closeIcon = document.getElementById('close-icon');
            const isOpen = drawer.classList.contains('open');
            if (isOpen) {
                closeMobileMenu();
            } else {
                drawer.classList.add('open');
                overlay.classList.add('open');
                btn.setAttribute('aria-expanded', 'true');
                hamburgerIcon.classList.add('hidden');
                closeIcon.classList.remove('hidden');
                document.body.style.overflow = 'hidden';
            }
        }
        function closeMobileMenu() {
            const drawer = document.getElementById('mobile-nav-drawer');
            const overlay = document.getElementById('mobile-nav-overlay');
            const btn = document.getElementById('hamburger-btn');
            const hamburgerIcon = document.getElementById('hamburger-icon');
            const closeIcon = document.getElementById('close-icon');
            drawer.classList.remove('open');
            overlay.classList.remove('open');
            btn.setAttribute('aria-expanded', 'false');
            hamburgerIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
            document.body.style.overflow = '';
        }

        /* ── Custom multi-select dropdown ── */
        /* -- Quote modal -- */
        let lastQuoteTrigger = null;

        function openQuoteModal(event) {
            if (event) event.preventDefault();
            const modal = document.getElementById('quote-modal');
            const form = document.getElementById('quoteForm');
            const success = document.getElementById('formSuccess');
            if (!modal) return;

            lastQuoteTrigger = event && event.currentTarget ? event.currentTarget : document.activeElement;
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';

            if (form && success) {
                form.classList.remove('hidden');
                success.classList.add('hidden');
                success.classList.remove('flex');
            }

            window.setTimeout(() => {
                const firstField = document.getElementById('nameInput');
                if (firstField) firstField.focus();
            }, 0);
        }

        function closeQuoteModal() {
            const modal = document.getElementById('quote-modal');
            const success = document.getElementById('formSuccess');
            if (!modal) return;
            const isShowingSuccess = success && !success.classList.contains('hidden');

            modal.classList.add('hidden');
            document.body.style.overflow = '';
            document.querySelectorAll('.sn-select-wrapper.open').forEach(w => {
                w.classList.remove('open');
                const trigger = w.querySelector('.sn-select-trigger');
                if (trigger) trigger.setAttribute('aria-expanded', 'false');
            });

            if (lastQuoteTrigger && typeof lastQuoteTrigger.focus === 'function') {
                lastQuoteTrigger.focus();
            }

            if (isShowingSuccess) {
                resetQuoteForm();
            }
        }

        function resetQuoteForm() {
            const form = document.getElementById('quoteForm');
            const success = document.getElementById('formSuccess');
            const errItems = document.getElementById('err-items');
            const errSubmit = document.getElementById('err-submit');

            if (form) form.reset();
            if (success) {
                success.classList.add('hidden');
                success.classList.remove('flex');
            }
            if (errItems) errItems.classList.add('hidden');
            if (errSubmit) errSubmit.classList.add('hidden');

            dropdownSelections['itemsWrapper'] = new Set();
            document.querySelectorAll('#itemsWrapper .sn-option').forEach(option => {
                option.classList.remove('selected');
                option.setAttribute('aria-selected', 'false');
            });
            updateTriggerLabel('itemsWrapper');
        }

        function initQuoteModal() {
            document.querySelectorAll('a[href="#quote-form"]').forEach(link => {
                link.addEventListener('click', openQuoteModal);
            });
            document.querySelectorAll('[data-close-quote]').forEach(control => {
                control.addEventListener('click', closeQuoteModal);
            });
            document.addEventListener('keydown', function (event) {
                const modal = document.getElementById('quote-modal');
                if (event.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
                    closeQuoteModal();
                }
            });

            const phoneInput = document.getElementById('phoneInput');
            if (phoneInput) {
                phoneInput.addEventListener('input', function () { formatPhone(this); });
                phoneInput.addEventListener('keyup', function () { formatPhone(this); });
                phoneInput.addEventListener('paste', function () { setTimeout(function () { formatPhone(phoneInput); }, 0); });
            }
        }

        const dropdownSelections = {};

        function toggleDropdown(wrapperId, event) {
            if (event) event.stopPropagation();
            const wrapper = document.getElementById(wrapperId);
            if (!wrapper) return;
            const isOpen = wrapper.classList.contains('open');
            document.querySelectorAll('.sn-select-wrapper.open').forEach(w => {
                w.classList.remove('open');
                const trigger = w.querySelector('.sn-select-trigger');
                if (trigger) trigger.setAttribute('aria-expanded', 'false');
            });
            if (!isOpen) wrapper.classList.add('open');
            const trigger = wrapper.querySelector('.sn-select-trigger');
            if (trigger) trigger.setAttribute('aria-expanded', !isOpen ? 'true' : 'false');
        }

        function toggleOption(el, wrapperId, event) {
            if (event) event.stopPropagation();
            el.classList.toggle('selected');
            el.setAttribute('aria-selected', el.classList.contains('selected') ? 'true' : 'false');
            if (!dropdownSelections[wrapperId]) dropdownSelections[wrapperId] = new Set();
            const val = el.dataset.value;
            if (el.classList.contains('selected')) {
                dropdownSelections[wrapperId].add(val);
            } else {
                dropdownSelections[wrapperId].delete(val);
            }
            updateTriggerLabel(wrapperId);
        }

        function selectSingle(el, wrapperId) {
            document.querySelectorAll(`#${wrapperId} .sn-option`).forEach(o => o.classList.remove('selected'));
            el.classList.add('selected');
            if (!dropdownSelections[wrapperId]) dropdownSelections[wrapperId] = new Set();
            dropdownSelections[wrapperId].clear();
            dropdownSelections[wrapperId].add(el.dataset.value);
            updateTriggerLabel(wrapperId);
            // Close after selection for single-select
            setTimeout(() => document.getElementById(wrapperId).classList.remove('open'), 120);
        }

        function updateTriggerLabel(wrapperId) {
            const display = document.getElementById(wrapperId.replace('Wrapper', 'Display'));
            const selected = dropdownSelections[wrapperId];
            if (!display) return;
            if (!selected || selected.size === 0) {
                display.className = 'sn-placeholder';
                display.textContent = display.dataset.placeholder || 'Select an option';
            } else {
                const labels = [...document.querySelectorAll(`#${wrapperId} .sn-option.selected span:last-child`)].map(s => s.textContent);
                display.className = 'sn-value';
                display.textContent = labels.join(', ');
            }
            // Keep the hidden form field in sync so selections are actually submitted
            if (wrapperId === 'itemsWrapper') {
                const hiddenField = document.getElementById('itemsHiddenField');
                if (hiddenField) {
                    const labels = selected && selected.size
                        ? [...document.querySelectorAll(`#${wrapperId} .sn-option.selected span:last-child`)].map(s => s.textContent)
                        : [];
                    hiddenField.value = labels.join(', ');
                }
            }
        }

        // Close dropdowns when clicking outside
        document.addEventListener('click', function (e) {
            if (!e.target.closest('.sn-select-wrapper')) {
                document.querySelectorAll('.sn-select-wrapper.open').forEach(w => {
                    w.classList.remove('open');
                    const trigger = w.querySelector('.sn-select-trigger');
                    if (trigger) trigger.setAttribute('aria-expanded', 'false');
                });
            }
        });

        /* -- Phone number formatting -- */
        function formatPhone(input) {
            var digits = input.value.replace(/\D/g, '').slice(0, 10);
            var formatted = '';
            if (digits.length > 0) formatted = '(' + digits.slice(0, 3);
            if (digits.length >= 4) formatted += ') ' + digits.slice(3, 6);
            if (digits.length >= 7) formatted += '-' + digits.slice(6, 10);
            input.value = formatted;
        }
        /* ── Form submission ── */
        function handleFormSubmit(event) {
            event.preventDefault();
            const form = document.getElementById('quoteForm');
            const items = dropdownSelections['itemsWrapper'];
            let valid = true;

            const errItems = document.getElementById('err-items');
            const errSubmit = document.getElementById('err-submit');
            errSubmit.classList.add('hidden');

            if (!items || items.size === 0) { errItems.classList.remove('hidden'); valid = false; }
            else { errItems.classList.add('hidden'); }

            if (!valid) return;

            const submitBtn = document.getElementById('submitBtn');
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';

            const formData = new FormData(form);
            formData.append('access_key', 'c204f6bb-0402-4dfe-8981-fc5080ce3ac4');

            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            })
                .then(response => response.json().then(data => ({ ok: response.ok, data })))
                .then(({ ok, data }) => {
                    if (!ok || !data.success) {
                        throw new Error(data.message || 'Submission failed');
                    }
                    form.classList.add('hidden');
                    const success = document.getElementById('formSuccess');
                    success.classList.remove('hidden');
                    success.classList.add('flex');
                })
                .catch((err) => {
                    errSubmit.textContent = err.message || 'Something went wrong sending your request. Please call us or try again.';
                    errSubmit.classList.remove('hidden');
                })
                .finally(() => {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Submit';
                });
        }

        function createFaqItem(item, isExtra) {
            const wrapper = document.createElement('div');
            wrapper.className = `faq-item ${isExtra ? 'faq-extra hidden ' : ''}bg-white border border-forestGreen/10`;
            wrapper.setAttribute('role', 'listitem');

            const button = document.createElement('button');
            button.className = 'faq-question w-full flex justify-between items-center gap-4 px-5 py-4 text-left font-serif font-bold text-sm text-forestGreen hover:text-mossGreen transition-colors focus:outline-none';
            button.setAttribute('aria-expanded', 'false');
            button.type = 'button';
            button.onclick = function () { toggleFaq(button); };

            const questionText = document.createElement('span');
            questionText.textContent = item.question;

            const icon = document.createElement('span');
            icon.className = 'faq-icon flex-shrink-0';
            icon.setAttribute('aria-hidden', 'true');
            icon.textContent = '+';

            const answer = document.createElement('div');
            answer.className = 'faq-answer max-h-0 overflow-hidden transition-all duration-300 ease-in-out';

            const answerText = document.createElement('p');
            answerText.className = 'px-5 pb-0 text-sm text-stone-600 leading-relaxed';
            answerText.textContent = item.answer;

            button.append(questionText, icon);
            answer.appendChild(answerText);
            wrapper.append(button, answer);
            return wrapper;
        }

        function createFaqToggle(id, label, symbol, onClick) {
            const wrapper = document.createElement('div');
            wrapper.id = id;
            wrapper.className = `${id === 'faq-fewer-item' ? 'hidden ' : ''}bg-forestGreen border border-forestGreen`;
            wrapper.setAttribute('role', 'listitem');

            const button = document.createElement('button');
            button.id = id === 'faq-more-item' ? 'faq-more-btn' : 'faq-fewer-btn';
            button.type = 'button';
            button.className = 'w-full flex justify-between items-center gap-4 px-5 py-4 text-left font-serif font-bold text-sm text-white hover:bg-mossGreen transition-colors focus:outline-none';
            button.setAttribute('aria-controls', 'faq-list');
            if (id === 'faq-more-item') button.setAttribute('aria-expanded', 'false');
            button.onclick = onClick;

            const text = document.createElement('span');
            text.textContent = label;

            const icon = document.createElement('span');
            icon.setAttribute('aria-hidden', 'true');
            icon.textContent = symbol;

            button.append(text, icon);
            wrapper.appendChild(button);
            return wrapper;
        }

        function injectFaqSchema(items) {
            const existing = document.getElementById('faq-schema');
            if (existing) existing.remove();

            const script = document.createElement('script');
            script.id = 'faq-schema';
            script.type = 'application/ld+json';
            script.textContent = JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'FAQPage',
                mainEntity: items.map(item => ({
                    '@type': 'Question',
                    name: item.question,
                    acceptedAnswer: {
                        '@type': 'Answer',
                        text: item.answer
                    }
                }))
            });
            document.head.appendChild(script);
        }

        const fallbackFaqItems = [
            {
                question: 'Do you guarantee that every stain will be removed?',
                answer: 'Many everyday stains lift well, but heat-set stains, dye transfer, fading, or deep contamination may be permanent. We inspect first and explain what is realistic before we start.',
                initiallyVisible: true
            },
            {
                question: 'Are your cleaning products safe for kids and pets?',
                answer: 'Yes. We use fabric-appropriate, non-toxic, pH-balanced products. Once the furniture is dry, it is ready for normal family use.',
                initiallyVisible: true
            },
            {
                question: 'How often should I have my upholstery cleaned?',
                answer: 'Most homes benefit every 12 to 18 months. With pets, kids, allergies, or heavy use, every 6 to 12 months is often better.',
                initiallyVisible: true
            },
            {
                question: 'How long does it take for upholstery to dry?',
                answer: 'Most sofas take 1 to 2 hours to clean and usually dry within 2 to 4 hours, depending on fabric, airflow, and soil level.',
                initiallyVisible: true
            },
            {
                question: 'What areas do you service?',
                answer: 'We serve Mississauga, Oakville, Brampton, Etobicoke, and nearby GTA communities. If you are unsure, call or message us to confirm.',
                initiallyVisible: true
            },
            {
                question: 'Can you remove old or set-in pet urine stains and odours?',
                answer: 'Often, yes. Older urine may reach foam or backing, which can limit results. We use enzyme treatment and give an honest assessment first.',
                initiallyVisible: false
            },
            {
                question: 'Do you clean leather sofas?',
                answer: 'Not at this time. We specialize in fabric upholstery, carpets, and area rugs. Leather requires a different process, so we do not offer it yet.',
                initiallyVisible: false
            },
            {
                question: 'Do I pay before or after the cleaning service?',
                answer: 'Payment is collected after the service is complete. We confirm pricing before starting, with no surprise fees.',
                initiallyVisible: false
            },
            {
                question: 'How should I prepare my furniture before your visit?',
                answer: 'Please remove throws, small cushions, and fragile items nearby. No pre-treating needed; just point out stains, odours, or concerns when we arrive.',
                initiallyVisible: false
            }
        ];

        function renderFaq(items) {
            const faqList = document.getElementById('faq-list');
            if (!faqList) return;

            faqList.textContent = '';
            items.forEach((item, index) => {
                const isExtra = item.initiallyVisible === false;
                if (isExtra && !document.getElementById('faq-more-item')) {
                    faqList.appendChild(createFaqToggle('faq-more-item', 'View More Questions', '+', function () { showMoreFaq(this); }));
                }
                faqList.appendChild(createFaqItem(item, isExtra));
            });

            if (items.some(item => item.initiallyVisible === false)) {
                faqList.appendChild(createFaqToggle('faq-fewer-item', 'View Fewer Questions', '−', function () { showFewerFaq(); }));
            }

            injectFaqSchema(items);
        }

        function loadFaq() {
            const faqList = document.getElementById('faq-list');
            if (!faqList) return;

            renderFaq(fallbackFaqItems);

            fetch('data/faq/faq.json')
                .then(response => {
                    if (!response.ok) throw new Error('FAQ data could not be loaded.');
                    return response.json();
                })
                .then(renderFaq)
                .catch(() => {
                    renderFaq(fallbackFaqItems);
                });
        }

        document.addEventListener('DOMContentLoaded', function () {
            initQuoteModal();
            loadFaq();
        });

        function toggleFaq(button) {
            const item = button.parentElement;
            const isExpanded = button.getAttribute('aria-expanded') === 'true';
            const answerContainer = button.nextElementSibling;
            const icon = button.querySelector('.faq-icon');
            document.querySelectorAll('.faq-item').forEach(el => {
                if (el !== item) {
                    el.classList.remove('open');
                    const btn = el.querySelector('.faq-question');
                    if (btn) {
                        btn.setAttribute('aria-expanded', 'false');
                        btn.nextElementSibling.style.maxHeight = '0px';
                        btn.nextElementSibling.style.paddingBottom = '0px';
                        const btnIcon = btn.querySelector('.faq-icon');
                        if (btnIcon) btnIcon.textContent = '+';
                    }
                }
            });
            if (isExpanded) {
                button.setAttribute('aria-expanded', 'false');
                item.classList.remove('open');
                answerContainer.style.maxHeight = '0px';
                answerContainer.style.paddingBottom = '0px';
                icon.textContent = '+';
            } else {
                button.setAttribute('aria-expanded', 'true');
                item.classList.add('open');
                answerContainer.style.maxHeight = answerContainer.scrollHeight + 20 + 'px';
                answerContainer.style.paddingBottom = '20px';
                icon.textContent = '−';
            }
        }
        function showMoreFaq(button) {
            const faqList = document.getElementById('faq-list');
            const moreItem = document.getElementById('faq-more-item');
            const fewerItem = document.getElementById('faq-fewer-item');
            const extraItems = document.querySelectorAll('.faq-extra');

            extraItems.forEach(item => {
                item.classList.remove('hidden');
            });

            button.setAttribute('aria-expanded', 'true');
            if (faqList) faqList.classList.add('is-expanded');
            if (moreItem) moreItem.classList.add('hidden');
            if (fewerItem) fewerItem.classList.remove('hidden');
        }

        function showFewerFaq() {
            const faqList = document.getElementById('faq-list');
            const moreItem = document.getElementById('faq-more-item');
            const moreButton = document.getElementById('faq-more-btn');
            const fewerItem = document.getElementById('faq-fewer-item');
            const extraItems = document.querySelectorAll('.faq-extra');

            extraItems.forEach(item => {
                item.classList.add('hidden');
                item.classList.remove('open');
                const question = item.querySelector('.faq-question');
                const answer = item.querySelector('.faq-answer');
                const icon = item.querySelector('.faq-icon');
                if (question) question.setAttribute('aria-expanded', 'false');
                if (answer) {
                    answer.style.maxHeight = '0px';
                    answer.style.paddingBottom = '0px';
                }
                if (icon) icon.textContent = '+';
            });

            if (moreItem) moreItem.classList.remove('hidden');
            if (moreButton) moreButton.setAttribute('aria-expanded', 'false');
            if (fewerItem) fewerItem.classList.add('hidden');
            if (faqList) {
                faqList.classList.remove('is-expanded');
                faqList.scrollTop = 0;
            }
        }

        const gallerySlides = document.querySelectorAll('.results-slide');
        const totalSlides = gallerySlides.length;
        const slideDots = document.querySelectorAll('.slide-dot');
        let currentImgIndex = 0;
        function updateSliderPosition() {
            gallerySlides.forEach((slide, i) => {
                slide.classList.toggle('is-active', i === currentImgIndex);
            });
            slideDots.forEach((dot, i) => {
                const isActive = i === currentImgIndex;
                dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
                dot.classList.toggle('bg-forestGreen', isActive);
                dot.classList.toggle('bg-forestGreen/25', !isActive);
            });
        }
        function prevSlide() {
            currentImgIndex = (currentImgIndex === 0) ? totalSlides - 1 : currentImgIndex - 1;
            updateSliderPosition();
        }
        function nextSlide() {
            currentImgIndex = (currentImgIndex === totalSlides - 1) ? 0 : currentImgIndex + 1;
            updateSliderPosition();
        }
        function goToSlide(index) {
            currentImgIndex = index;
            updateSliderPosition();
        }

document.addEventListener('DOMContentLoaded', () => {
    // Mobile navigation toggle
    const navToggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.nav');

    if (navToggle && nav) {
        navToggle.addEventListener('click', () => {
            nav.classList.toggle('nav-visible');
        });
    }

    // Accordion for Sagas page
    const accordionHeaders = document.querySelectorAll('.saga-accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            header.classList.toggle('active');
            const panel = header.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + 'px';
            }
        });
    });

    // Lightbox for Gallery page
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        const lightboxImg = document.getElementById('lightbox-img');
        const lightboxCaption = document.getElementById('lightbox-caption');
        const closeBtn = document.querySelector('.lightbox-close');
        const prevBtn = document.querySelector('.lightbox-prev');
        const nextBtn = document.querySelector('.lightbox-next');
        const galleryItems = document.querySelectorAll('.gallery-item');
        let currentIndex = 0;

        const showImage = (index) => {
            const item = galleryItems[index];
            lightboxImg.src = item.href;
            lightboxCaption.innerHTML = item.querySelector('img').alt;
            currentIndex = index;
        };

        galleryItems.forEach((item, index) => {
            item.addEventListener('click', e => {
                e.preventDefault();
                lightbox.style.display = 'block';
                showImage(index);
            });
        });

        const closeLightbox = () => {
            lightbox.style.display = 'none';
        };

        const showNextImage = () => {
            const nextIndex = (currentIndex + 1) % galleryItems.length;
            showImage(nextIndex);
        };

        const showPrevImage = () => {
            const prevIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
            showImage(prevIndex);
        };

        closeBtn.addEventListener('click', closeLightbox);
        nextBtn.addEventListener('click', showNextImage);
        prevBtn.addEventListener('click', showPrevImage);

        lightbox.addEventListener('click', e => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });

        document.addEventListener('keydown', e => {
            if (lightbox.style.display === 'block') {
                if (e.key === 'ArrowRight') {
                    showNextImage();
                } else if (e.key === 'ArrowLeft') {
                    showPrevImage();
                } else if (e.key === 'Escape') {
                    closeLightbox();
                }
            }
        });
    }
});

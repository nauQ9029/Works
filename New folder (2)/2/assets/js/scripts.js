document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.getElementById('carouselExampleIndicators');
    const offers = document.querySelectorAll('.offer-card');
    const offersPerPage = 2;
    let currentOfferIndex = 0;

    function showOffers(startIndex) {
        offers.forEach((offer, index) => {
            if (index >= startIndex && index < startIndex + offersPerPage) {
                offer.classList.add('active');
            } else {
                offer.classList.remove('active');
            }
        });
    }

    function nextSlide() {
        console.log("Next slide function called.");
        const activeIndex = document.querySelector('.carousel-item.active').dataset.slideTo;
        console.log("Active index:", activeIndex);
        const nextIndex = (parseInt(activeIndex) + 1) % carousel.querySelectorAll('.carousel-item').length;
        console.log("Next index:", nextIndex);
        carousel.querySelector(`[data-slide-to="${nextIndex}"]`).click();
    }
    

    // Auto-switch carousel every 3 seconds
    setInterval(nextSlide, 3000);

    document.getElementById('nextOffers').addEventListener('click', function() {
        if (currentOfferIndex + offersPerPage < offers.length) {
            currentOfferIndex += offersPerPage;
        }
        showOffers(currentOfferIndex);
    });

    document.getElementById('prevOffers').addEventListener('click', function() {
        if (currentOfferIndex - offersPerPage >= 0) {
            currentOfferIndex -= offersPerPage;
        }
        showOffers(currentOfferIndex);
    });

    // Initialize the first set of offers
    showOffers(currentOfferIndex);
});

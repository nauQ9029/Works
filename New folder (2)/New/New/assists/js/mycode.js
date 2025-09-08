document.addEventListener('DOMContentLoaded', function() {
    const offers = document.querySelectorAll('.offer-card');
    const offersPerPage = 3;
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
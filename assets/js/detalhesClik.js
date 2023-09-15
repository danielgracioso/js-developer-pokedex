document.addEventListener('DOMContentLoaded', function () {
    const openOverlayButton = document.getElementById('open-overlay');
    const closeOverlayButton = document.getElementById('close-overlay');

    closeOverlayButton.addEventListener('click', function () {
        pokeApi.closeOverlay();
    });
    pokeApi.closeOverlay = () => {
        const overlay = document.getElementById('pokemon-overlay');
        overlay.style.display = 'none';
    }
});

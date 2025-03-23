
document.addEventListener("DOMContentLoaded", function () {
    const logo = document.querySelector(".logo-animation");
    const presentation = document.getElementById("presentation");

    logo.addEventListener("animationend", function () {
        setTimeout(() => {
            smoothScrollTo(window.scrollY, presentation.offsetTop, 2000); // Durée en ms
        }, 500); // Petite pause avant le scroll
    });

    window.addEventListener("scroll", function () {
        if (window.scrollY > window.innerHeight / 2) {
            presentation.classList.remove("opacity-0");
            presentation.classList.add("opacity-100");
        }
    });

    function smoothScrollTo(startY, endY, duration) {
        const startTime = performance.now();

        function scrollStep(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const ease = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;
            window.scrollTo(0, startY + (endY - startY) * ease);

            if (elapsed < duration) {
                requestAnimationFrame(scrollStep);
            }
        }

        requestAnimationFrame(scrollStep);
    }
});

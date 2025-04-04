document.addEventListener("DOMContentLoaded", function () {
    const overlayContainer = document.getElementById("product-overlay");
    const colorPicker = document.getElementById("color-picker");
    const colorValueDisplay = document.getElementById("color-value");

    function loadSVG(svgPath, productName) {
        fetch(svgPath)
            .then(response => response.text())
            .then(svgText => {
                overlayContainer.innerHTML = svgText;
                overlayContainer.classList.add("loaded");

                const svgElement = overlayContainer.querySelector("svg");
                if (svgElement) {
                    svgElement.id = "custom-svg";
                    console.log("SVG chargé avec succès !");
                } else {
                    console.error("Erreur : le SVG n'a pas pu être chargé.");
                }
            })
            .catch(error => console.error("Erreur lors du chargement du SVG :", error));
    }

    function changeSVGColor(color) {
        const svg = document.getElementById("custom-svg");
        if (svg) {
            const elementsToColor = svg.querySelectorAll(".color-change");

            if (elementsToColor.length > 0) {
                elementsToColor.forEach(element => {
                    element.style.fill = color;
                    element.setAttribute("fill", color);
                });
            } else {
                console.warn("Aucun élément avec la classe 'color-change' trouvé dans le SVG.");
            }
        } else {
            console.error("Le SVG n'est pas encore chargé.");
        }
    }


    function getQueryParams() {
        const params = new URLSearchParams(window.location.search);
        return {
            nom: params.get("nom") || "Produit",
            prix: params.get("prix") || "Prix inconnu",
            image: params.get("image") || "assets/default.png",
            svg: params.get("svg") || ""
        };
    }

    const { nom, prix, image, svg } = getQueryParams();
    document.getElementById("product-name").textContent = nom;
    document.getElementById("product-price").textContent = prix;
    document.getElementById("product-image").src = image;

    if (svg) {
        loadSVG(svg, nom);
    } else {
        overlayContainer.style.display = "none";
    }

    const observer = new MutationObserver((mutations, obs) => {
        const svgLoaded = document.getElementById("custom-svg");
        if (svgLoaded) {
            colorPicker.addEventListener("input", function () {
                const selectedColor = colorPicker.value;
                changeSVGColor(selectedColor);
                if (colorValueDisplay) {
                    colorValueDisplay.textContent = selectedColor;
                }
            });

            // Initialisation : appliquer la couleur par défaut
            changeSVGColor(colorPicker.value);
            if (colorValueDisplay) {
                colorValueDisplay.textContent = colorPicker.value;
            }

            obs.disconnect();
        }
    });

    observer.observe(overlayContainer, { childList: true, subtree: true });
});




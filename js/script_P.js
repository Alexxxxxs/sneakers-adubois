document.addEventListener("DOMContentLoaded", function () {
    const overlayContainer = document.getElementById("product-overlay");
    const colorSelector = document.getElementById("product-color");

    function getColorValue(color) {
        const colors = {
            "noir": "#000000",
            "rouge": "#ff0000",
            "bleu": "#0000ff"
        };
        return colors[color.toLowerCase()] || null;
    }

    function applyColor() {
        const colorName = colorSelector.value;
        const colorValue = getColorValue(colorName);
        const svgElement = overlayContainer.querySelector("svg");

        if (colorName === "Pas d'ajout") {
            overlayContainer.style.display = "none";
        } else {
            overlayContainer.style.display = "block";
            if (svgElement) {
                const elementsToColor = svgElement.querySelectorAll(".color-change");
                if (elementsToColor.length > 0) {
                    elementsToColor.forEach(element => {
                        element.setAttribute("fill", colorValue);
                    });
                } else {
                    console.warn("Aucun élément avec la classe 'color-change' trouvé.");
                }
            }
        }
    }

    function loadSVG(svgPath, productName) {
        fetch(svgPath)
            .then(response => response.text())
            .then(svgText => {
                overlayContainer.innerHTML = svgText;
                overlayContainer.classList.add("loaded");

                const svgElement = overlayContainer.querySelector("svg");
                if (svgElement) {
                    // Déterminer la classe CSS à appliquer
                    const className = `svg-${productName.toLowerCase().replace(/\s+/g, "-")}`;
                    svgElement.classList.add(className);

                    // Ajouter des attributs CSS dynamiques si besoin (ex: mix-blend-mode ou position)
                    console.log(`SVG chargé avec la classe : ${className}`);
                } else {
                    console.error("Erreur : le SVG n'a pas pu être chargé.");
                }

                applyColor();
            })
            .catch(error => console.error("Erreur lors du chargement du SVG :", error));
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

    colorSelector.addEventListener("change", applyColor);
});

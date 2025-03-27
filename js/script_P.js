document.addEventListener("DOMContentLoaded", function () {
    const overlayContainer = document.getElementById("product-overlay");
    const colorSelect = document.getElementById("product-color");

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
                    element.style.fill = color; // Appliquer la couleur via le style
                    element.setAttribute("fill", color); // Assurer que le changement de couleur est appliqué
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
        if (document.getElementById("custom-svg")) {
            colorSelect.addEventListener("change", function () {
                let selectedColor = "none"; // Valeur par défaut (transparent)
                switch (colorSelect.value.toLowerCase()) {
                    case "noir":
                        selectedColor = "#000000";
                        break;
                    case "rouge":
                        selectedColor = "#FF0000";
                        break;
                    case "bleu":
                        selectedColor = "#0000FF";
                        break;
                }
                changeSVGColor(selectedColor);
            });
            obs.disconnect(); // Arrêter l'observation une fois que le SVG est chargé
        }
    });

    observer.observe(overlayContainer, { childList: true, subtree: true });

});

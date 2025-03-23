// Récupérer les paramètres de l'URL
function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        nom: params.get("nom") || "Produit",
        prix: params.get("prix") || "Prix inconnu",
        image: params.get("image") || "assets/default.png"
    };
}

// Injecter les données dans la page
window.onload = function () {
    const { nom, prix, image } = getQueryParams();
    document.getElementById("product-name").textContent = nom;
    document.getElementById("product-price").textContent = prix;
    document.getElementById("product-image").src = image;
};
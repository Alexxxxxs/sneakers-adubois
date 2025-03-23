document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // Récupération des valeurs des champs
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    const successMessage = document.getElementById("successMessage");
    const submitButton = document.getElementById("submitButton");


    // Désactivation du bouton et affichage du délai
    submitButton.disabled = true;
    submitButton.innerText = "Envoi en cours...";

    setTimeout(() => {
        successMessage.classList.remove("hidden");
        submitButton.innerText = "Envoyer";
        submitButton.disabled = false;
        document.getElementById("contactForm").reset();
    }, 1000); // Simulation de 1 seconde avant validation
});
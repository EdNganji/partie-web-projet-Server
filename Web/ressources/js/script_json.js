
document.addEventListener('DOMContentLoaded', function () {
    
    // Récupérer les données depuis votre API Django
    fetch('127.0.0.1:8000/api/item/')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur de récupération des données');
            }
            return response.json();
        })
        .then(data => {
            // Traitement des données et affichage sur la page
            displayData(data);
        })
        .catch(error => {
            console.log('Erreur : ', error);
        });

        function displayData(data) {
            var container = document.getElementById('liste');
            container.innerHTML = '';  
    
            // Parcourir les données et les ajouter au conteneur
            data.forEach(item => {
                container.innerHTML += `<img src = "${item.image}"` ;
                
            });
        }
    
});






$(document).ready(function() {
    // Fonction pour gérer l'ajout d'un appareil
    $('#addAppareilForm').submit(function(event) {
        event.preventDefault();

        var formData = {
            ipAdress: $('#adresseIp').val(),
            name: $('#name').val(),
            type: $('#type').val(),
            etatFonct: $('#etatFonct').val(),
            active: $('#active').is(':checked')
        };

        $.ajax({
            type: 'POST',
            url: 'http://192.168.1.107:8000/api/appareil',
            contentType: 'application/json',
            data: JSON.stringify(formData),
            success: function(responseData) {
                alert('Appareil ajouté avec succès ! ID : ' + responseData);
                $('#addAppareilForm')[0].reset(); // Réinitialiser le formulaire après succès
            },
            error: function(jqXHR, textStatus, errorThrown) {
                alert('Erreur lors de l\'ajout de l\'appareil : ' + errorThrown);
            }
        });
    });

    // Fonction pour gérer la modification d'un appareil
    $('#updateAppareilForm').submit(function(event) {
        event.preventDefault();
        
        var appareilId = $('#updateAppareilId').val(); // Récupérer l'ID de l'appareil à modifier

       // Récupérer les détails de l'appareil à partir de son ID
         $.ajax({
            type: 'GET',
            url: 'http://192.168.1.107:8000/api/appareil/get',
            dataType: 'json',
            success: function(data) {
                var appareil = data.find(function(item) {
                    return item.id === appareilId;
                });

                if (!appareil) {
                    console.error('Appareil avec ID ' + appareilId + ' non trouvé.');
                    return;
                }



        var formData = {
            
            
            ipAdress: appareil.ipAdress,
            name: appareil.name,
            type: $('#updateTypeCap').val(), // Récupérer le nouveau type d'appareil
            etatFonct: $('#updateEtatCap').val(), // Récupérer le nouveau état de fonctionnement
            active: appareil.active

        };


        $.ajax({
            type: 'POST',
            url: 'http://192.168.1.107:8000/api/appareil',
            contentType: 'application/json',
            data: JSON.stringify(formData),
            success: function(responseData) {
                alert('Appareil ajouté avec succès ! ID : ' + responseData);
                $('#addAppareilForm')[0].reset(); // Réinitialiser le formulaire après succès
            }
        });
    },
            error: function(jqXHR, textStatus, errorThrown) {
                alert('Erreur lors de l\'ajout de l\'appareil : ' + errorThrown);
            }
        });
    });
    

    // Ajoutez des fonctions similaires pour les formulaires de modification et de suppression

    // Fonction pour récupérer et afficher la liste d'appareils
    function fetchAppareils() {
        $.ajax({
            type: 'GET',
            url: 'http://192.168.1.107:8000/api/appareil/get',
            dataType: 'json',
            success: function(data) {
                $('#appareilList').empty(); // Effacer la liste précédente
                $.each(data, function(_, appareil) {
                    $('#appareilList').append('<tr><td>' + appareil.id + '</td><td>' + appareil.name + '</td><td>' + appareil.ipAdress + '</td></tr>');
                });
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error('Erreur lors de la récupération des appareils :', errorThrown);
            }
        });
    }

    // Appel initial pour récupérer et afficher la liste d'appareils
    fetchAppareils();

    
});

// Récupérer les données de l'API
function fetchData() {
    return fetch('http://192.168.1.107:8000/api/data')
        .then(response => response.json())
        .then(data => data);
}

// Créer le graphique avec Chart.js
function createChart(data) {
    var temperatureData = data.filter(item => item.nameCha === 'Temperature');
    var labels = temperatureData.map(item => item.heureEnvoi);
    var values = temperatureData.map(item => item.readValue);
    

    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Valeurs',
                data: values,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Récupérer les données de l'API
function fetchData2() {
    return fetch('http://192.168.1.107:8000/api/data')
        .then(response => response.json())
        .then(data => data);
}


// Créer le graphique avec Chart.js
function createChart2(data) {
    var humidityData = data.filter(item => item.nameCha === 'Humidite');
    var labels = humidityData.map(item => item.heureEnvoi);
    var values = humidityData.map(item => item.readValue);

    var ctx = document.getElementById('myChart2').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Valeurs',
                data: values,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}


// Appeler fetchData pour récupérer les données, puis créer le graphique
fetchData().then(data => createChart(data));
fetchData2().then(data => createChart2(data));


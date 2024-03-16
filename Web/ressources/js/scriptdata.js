$(document).ready(function() {
    
    // Fonction pour récupérer et afficher la liste d'appareils
    function fetchLectures() {
        $.ajax({
            type: 'GET',
            url: 'http://192.168.2.107:8000/api/data/list',
            dataType: 'json',
            success: function(data) {
                $('#lectureList').empty(); // Effacer la liste précédente
                $.each(data, function(_, lecture) {
                    $('#lectureList').append('<tr><td>' + lecture.nameCap + '</td><td>' + lecture.nameCha + '</td><td>' + lecture.readValue + '</td><td>' + lecture.dateEnvoi + '</td><td>'+ lecture.heureEnvoi + '</td></tr>');
                });
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error('Erreur lors de la récupération des lectures :', errorThrown);
            }
        });
    }

    // Appel initial pour récupérer et afficher la liste d'appareils
    fetchLectures();

    
});

// Récupérer les données de l'API
function fetchData() {
    return fetch('http://192.168.2.107:8000/api/data')
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
fetchData().then(data => createChart2(data));


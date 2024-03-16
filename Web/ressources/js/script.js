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
            url: 'http://192.168.1.104:8000/api/appareil',
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

   // Fonction pour charger la liste des noms d'appareils
function loadAppareilNames() {
    $.ajax({
        type: 'GET',
        url: 'http://192.168.1.104:8000/api/appareil/get',
        dataType: 'json',
        success: function(data) {
            $('#updateAppareilName').empty(); // Effacer les options précédentes
            data.forEach(function(appareil) {
                $('#updateAppareilName').append('<option value="' + appareil.id + '">' + appareil.name + '</option>');
            });
            $('#deleteAppareilName').empty(); // Effacer les options précédentes
            data.forEach(function(appareil) {
                $('#deleteAppareilName').append('<option value="' + appareil.id + '">' + appareil.name + '</option>');
            });
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error('Erreur lors du chargement des noms d\'appareils :', errorThrown);
        }
    });
}

// Appel initial pour charger la liste des noms d'appareils
loadAppareilNames();

// Fonction pour gérer la soumission du formulaire de modification d'appareil
$('#updateAppareilForm').submit(function(event) {
    event.preventDefault();

    var appareilId = $('#updateAppareilName').val(); // Récupérer l'ID de l'appareil à modifier

    // Récupérer les détails de l'appareil à partir de son ID
    $.ajax({
        type: 'GET',
        url: 'http://192.168.1.104:8000/api/appareil/get',
        dataType: 'json',
        success: function(data) {
            var appareil = data.find(function(item) {
                return item.id == appareilId;
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

            // Envoyer la requête de modification de l'appareil
            $.ajax({
                type: 'POST',
                url: 'http://192.168.1.104:8000/api/appareil',
                contentType: 'application/json',
                data: JSON.stringify(formData),
                success: function(responseData) {
                    alert('Appareil modifié avec succès ! ID : ' + responseData);
                    $('#updateAppareilForm')[0].reset(); // Réinitialiser le formulaire après succès
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    alert('Erreur lors de la modification de l\'appareil : ' + errorThrown);
                }
            });
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error('Erreur lors de la récupération des détails de l\'appareil :', errorThrown);
        }
    });
});



    // Fonction pour gérer la suppression d'un appareil
    $('#deleteAppareilForm').submit(function(event) {
        event.preventDefault();
        
        var appareilId = $('#deleteAppareilName').val(); // Récupérer l'ID de l'appareil à modifier

       // Récupérer les détails de l'appareil à partir de son ID
         $.ajax({
            type: 'GET',
            url: 'http://192.168.1.104:8000/api/appareil/get',
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
            type: appareil.type, 
            etatFonct: appareil.etatFonct, 
            active: appareil.active

        };


        $.ajax({
            type: 'POST',
            url: 'http://192.168.1.104:8000/api/appareil',
            contentType: 'application/json',
            data: JSON.stringify(formData),
            success: function(responseData) {
                alert( responseData);
                $('#deleteAppareilForm')[0].reset(); // Réinitialiser le formulaire après succès
            }
        });
    },
            error: function(jqXHR, textStatus, errorThrown) {
                alert('Erreur lors de la supression de l\'appareil : ' + errorThrown);
            }
        });
    });
    

    // Ajoutez des fonctions similaires pour les formulaires de modification et de suppression

    // Fonction pour récupérer et afficher la liste d'appareils
    function fetchAppareils() {
        $.ajax({
            type: 'GET',
            url: 'http://192.168.1.104:8000/api/appareil/get',
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


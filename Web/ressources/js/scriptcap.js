$(document).ready(function() {
    // Fonction pour gérer l'ajout d'un appareil
    $('#addCapteurForm').submit(function(event) {
        event.preventDefault();

        var formData = {
            idAppareil: $('#idAppareil').val(),
            name: $('#name').val(),
            typeMesure: $('#typeMesure').val(),
            nbreChannel: $('#nbreChannel').val(),
            active: $('#active').is(':checked')
        };

        

        $.ajax({
            type: 'POST',
            url: 'http://192.168.2.107:8000/api/capteur',
            contentType: 'application/json',
            data: JSON.stringify(formData),
            success: function(responseData) {
                alert('Capteur ajouté avec succès ! ID : ' + responseData);
                $('#addCapteurForm')[0].reset(); // Réinitialiser le formulaire après succès
            },
            error: function(jqXHR, textStatus, errorThrown) {
                alert('Erreur lors de l\'ajout du Capteur : ' + errorThrown);
            }
        });
    });

    // Fonction pour gérer la modification d'un capteur
    $('#updateCapteurForm').submit(function(event) {
        event.preventDefault();
        
        var appareilId = $('#updateCapteurId').val(); // Récupérer l'ID du Capteur à modifier

       // Récupérer les détails du capteur à partir de son ID
         $.ajax({
            type: 'GET',
            url: 'http://192.168.2.107:8000/api/capteur/get',
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

            idAppareil: appareil.idAppareil,
            name: appareil.name,
            typeMesure: $('#updateTypeCap').val(), 
            nbreChannel: $('#updateNbreChannel').val(),
            active: appareil.active

        };


        $.ajax({
            type: 'POST',
            url: 'http://192.168.2.107:8000/api/capteur',
            contentType: 'application/json',
            data: JSON.stringify(formData),
            success: function(responseData) {
                alert('Appareil ajouté avec succès ! ID : ' + responseData);
                $('#addCapteurForm')[0].reset(); // Réinitialiser le formulaire après succès
            }
        });
    },
            error: function(jqXHR, textStatus, errorThrown) {
                alert('Erreur lors de la modification du capteur : ' + errorThrown);
            }
        });
    });
    

    // Ajoutez des fonctions similaires pour les formulaires de modification et de suppression

    // Fonction pour récupérer et afficher la liste d'appareils
    function fetchCapteurs() {
        $.ajax({
            type: 'GET',
            url: 'http://192.168.2.107:8000/api/capteur/get',
            dataType: 'json',
            success: function(data) {
                $('#capteurList').empty(); // Effacer la liste précédente
                $.each(data, function(_, capteur) {
                    $('#capteurList').append('<tr><td>' + capteur.id + '</td><td>' + capteur.name + '</td><td>' + capteur.ipAdress + '</td></tr>');
                });
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error('Erreur lors de la récupération des capteurs :', errorThrown);
            }
        });
    }

    // Appel initial pour récupérer et afficher la liste d'appareils
    fetchCapteurs();

    
});


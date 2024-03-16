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
            url: 'http://192.168.2.107:8000/api/appareil',
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
            url: 'http://192.168.2.107:8000/api/appareil/get',
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
            url: 'http://192.168.2.107:8000/api/appareil',
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
            url: 'http://192.168.2.107:8000/api/appareil/get',
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


$(document).ready(function() {
    // Fonction pour gérer l'ajout d'un appareil
    $('#addActionneurForm').submit(function(event) {
        event.preventDefault();

        var formData = {
            idAppareil: $('#idAppareil').val(),
            name: $('#name').val(),
            typeAction: $('#type').val(),
            active: $('#active').is(':checked')
        };

        $.ajax({
            type: 'POST',
            url: 'http://192.168.1.104:8000/api/actionneur',
            contentType: 'application/json',
            data: JSON.stringify(formData),
            success: function(responseData) {
                alert('Actionneur ajouté avec succès ! ID : ' + responseData);
                $('#addActionneurForm')[0].reset(); // Réinitialiser le formulaire après succès
            },
            error: function(jqXHR, textStatus, errorThrown) {
                alert('Erreur lors de l\'ajout de l\'actionneur : ' + errorThrown);
            }
        });
    });

    // Fonction pour gérer la modification d'un appareil
    $('#updateActuateurForm').submit(function(event) {
        event.preventDefault();
        
        var actionneurId = $('#updateAppareilId').val(); // Récupérer l'ID de l'actionneur à modifier

       // Récupérer les détails de l'actionneur à partir de son ID
         $.ajax({
            type: 'GET',
            url: 'http://192.168.1.104:8000/api/actionneur/get',
            dataType: 'json',
            success: function(data) {
                var actionneur = data.find(function(item) {
                    return item.id === actionneurId;
                });

                if (!actionneur) {
                    console.error('actionneur avec ID ' + actionneurId + ' non trouvé.');
                    return;
                }



        var formData = {
            
            
            idAppareil: appareil.idAppareil,
            name: appareil.name,
            typeAction: $('#updateTypeAct').val(), // Récupérer le nouveau type d'appareil
            active: appareil.active

        };


        $.ajax({
            type: 'POST',
            url: 'http://192.168.1.104:8000/api/actionneur/update',
            contentType: 'application/json',
            data: JSON.stringify(formData),
            success: function(responseData) {
                alert('Actionneur modifié avec succès ! ID : ' + responseData);
                $('#addActionneurForm')[0].reset(); // Réinitialiser le formulaire après succès
            }
        });
    },
            error: function(jqXHR, textStatus, errorThrown) {
                alert('Erreur lors de l\'ajout de l\'actionneur : ' + errorThrown);
            }
        });
    });
    
    // Fonction pour gérer la suppression d'un actuateur
    $('#deleteActuateurForm').submit(function(event) {
        event.preventDefault();
        
        var actionneurId = $('#deleteActuateurId').val(); // Récupérer l'ID de l'actionneur à modifier

       // Récupérer les détails de l'actionneur à partir de son ID
         $.ajax({
            type: 'GET',
            url: 'http://192.168.1.104:8000/api/actionneur/get',
            dataType: 'json',
            success: function(data) {
                var actionneur = data.find(function(item) {
                    return item.id === actionneurId;
                });

                if (!actionneur) {
                    console.error('actionneur avec ID ' + actionneurId + ' non trouvé.');
                    return;
                }



        var formData = {
            
            
            idAppareil: actionneur.idAppareil,
            name: actionneur.name,
            typeAction: actionneur.typeAction,
            active: actionneur.active

        };


        $.ajax({
            type: 'POST',
            url: 'http://192.168.1.104:8000/api/actionneur/drop',
            contentType: 'application/json',
            data: JSON.stringify(formData),
            success: function(responseData) {
                alert(responseData);
                $('#addActionneurForm')[0].reset(); // Réinitialiser le formulaire après succès
            }
        });
    },
            error: function(jqXHR, textStatus, errorThrown) {
                alert('Erreur lors de l\'ajout de l\'actionneur : ' + errorThrown);
            }
        });
    });
    


    // Ajoutez des fonctions similaires pour les formulaires de modification et de suppression

    // Fonction pour récupérer et afficher la liste d'appareils
    function fetchActionneurs() {
        $.ajax({
            type: 'GET',
            url: 'http://192.168.1.104:8000/api/actionneur/get',
            dataType: 'json',
            success: function(data) {
                $('#actionneurList').empty(); // Effacer la liste précédente
                $.each(data, function(_, actionneur) {
                    $('#actionneurList').append('<tr><td>' + actionneur.id + '</td><td>' + actionneur.name + '</td><td>' + actionneur.typeAction + '</td></tr>');
                });
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error('Erreur lors de la récupération des actionneurs :', errorThrown);
            }
        });
    }

    // Appel initial pour récupérer et afficher la liste d'actionneurs
    fetchActionneurs();

    
});


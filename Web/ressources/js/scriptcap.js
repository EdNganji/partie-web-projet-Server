$(document).ready(function() {
    // Fonction pour gérer l'ajout d'un capteur
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
            url: 'http://192.168.1.104:8000/api/capteur',
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

    function loadAppareilNames() {
        $.ajax({
            type: 'GET',
            url: 'http://192.168.1.104:8000/api/capteur/get',
            dataType: 'json',
            success: function(data) {
                $('#updateCapteurName').empty(); // Effacer les options précédentes
                data.forEach(function(Capteur) {
                    $('#updateCapteurName').append('<option value="' + Capteur.id + '">' + Capteur.name + '</option>');
                });
                $('#deleteCapteurName').empty(); // Effacer les options précédentes
                data.forEach(function(Capteur) {
                    $('#deleteCapteurName').append('<option value="' + Capteur.id + '">' + Capteur.name + '</option>');
                });
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error('Erreur lors du chargement des noms des Capteurs :', errorThrown);
            }
        });
    }
    
    // Appel initial pour charger la liste des noms d'Capteurs
    loadAppareilNames();
    

    // Fonction pour gérer la modification d'un capteur
    $('#updateCapteurForm').submit(function(event) {
        event.preventDefault();
        
        var capteurId = $('#updateCapteurName').val(); // Récupérer l'ID du Capteur à modifier

       // Récupérer les détails du capteur à partir de son ID
         $.ajax({
            type: 'GET',
            url: 'http://192.168.1.104:8000/api/capteur/get',
            dataType: 'json',
            success: function(data) {
                var capteur = data.find(function(item) {
                    return item.id === capteurId;
                });

                if (!capteur) {
                    console.error('capteur avec ID ' + capteurId + ' non trouvé.');
                    return;
                }



        var formData = {

            idcapteur: capteur.idcapteur,
            name: capteur.name,
            typeMesure: $('#updateTypeCap').val(), 
            nbreChannel: $('#updateNbreChannel').val(),
            active: capteur.active

        };


        $.ajax({
            type: 'POST',
            url: 'http://192.168.1.104:8000/api/capteur/update',
            contentType: 'application/json',
            data: JSON.stringify(formData),
            success: function(responseData) {
                alert('capteur ajouté avec succès ! ID : ' + responseData);
                $('#addCapteurForm')[0].reset(); // Réinitialiser le formulaire après succès
            }
        });
    },
            error: function(jqXHR, textStatus, errorThrown) {
                alert('Erreur lors de la modification du capteur : ' + errorThrown);
            }
        });
    });


    // Fonction pour gérer la suppression d'un capteur
    $('#deleteCapteurForm').submit(function(event) {
        event.preventDefault();
        
        var capteurId = $('#deleteCapteurName').val(); // Récupérer l'ID du Capteur à modifier

       // Récupérer les détails du capteur à partir de son ID
         $.ajax({
            type: 'GET',
            url: 'http://192.168.1.104:8000/api/capteur/get',
            dataType: 'json',
            success: function(data) {
                var capteur = data.find(function(item) {
                    return item.id === capteurId;
                });

                if (!capteur) {
                    console.error('capteur avec ID ' + capteurId + ' non trouvé.');
                    return;
                }



        var formData = {

            idcapteur: capteur.idcapteur,
            name: capteur.name,
            typeMesure: capteur.typeMesure,
            nbreChannel: capteur.nbreChannel,
            active: capteur.active

        };


        $.ajax({
            type: 'POST',
            url: 'http://192.168.1.104:8000/api/capteur/drop',
            contentType: 'application/json',
            data: JSON.stringify(formData),
            success: function(responseData) {
                alert('capteur supprimé avec succès ! ID : ' + responseData);
                $('#deleteCapteurForm')[0].reset(); // Réinitialiser le formulaire après succès
            }
        });
    },
            error: function(jqXHR, textStatus, errorThrown) {
                alert('Erreur lors de la suppression du capteur : ' + errorThrown);
            }
        });
    });
    
    
    // Fonction pour récupérer et afficher la liste d'capteurs
    function fetchCapteurs() {
        $.ajax({
            type: 'GET',
            url: 'http://192.168.1.104:8000/api/capteur/get',
            dataType: 'json',
            success: function(data) {
                $('#capteurList').empty(); // Effacer la liste précédente
                $.each(data, function(_, capteur) {
                    $('#capteurList').append('<tr><td>' + capteur.id + '</td><td>' + capteur.name + '</td><td>' + capteur.typeMesure + '</td></tr>');
                });
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error('Erreur lors de la récupération des capteurs :', errorThrown);
            }
        });
    }

    // Appel initial pour récupérer et afficher la liste d'capteurs
    fetchCapteurs();

    
});


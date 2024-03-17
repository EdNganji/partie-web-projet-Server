$(document).ready(function() {
    // Fonction pour gérer l'ajout d'un appareil
    $('#addChannelForm').submit(function(event) {
        event.preventDefault();

        var formData = {
            name: $('#name').val(),
            unit: $('#unit').val(),
            active: $('#active').is(':checked')
        };

        $.ajax({
            type: 'POST',
            url: 'http://192.168.1.107:8000/api/channel',
            contentType: 'application/json',
            data: JSON.stringify(formData),
            success: function(responseData) {
                alert('Channel ajouté avec succès ! ID : ' + responseData);
                $('#addChannelForm')[0].reset(); // Réinitialiser le formulaire après succès
            },
            error: function(jqXHR, textStatus, errorThrown) {
                alert('Erreur lors de l\'ajout du channel : ' + errorThrown);
            }
        });
    });

    // Fonction pour gérer la modification d'un channel
    $('#updateChannelForm').submit(function(event) {
        event.preventDefault();
        
        var channelId = $('#updateChannelId').val(); // Récupérer l'ID de l'appareil à modifier

       // Récupérer les détails du channel à partir de son ID
         $.ajax({
            type: 'GET',
            url: 'http://192.168.1.107:8000/api/channel/get',
            dataType: 'json',
            success: function(data) {
                var channel = data.find(function(item) {
                    return item.id === channelId;
                });

                if (!channel) {
                    console.error('Channel avec ID ' + channelId + ' non trouvé.');
                    return;
                }



        var formData = {
        
            name: channel.name,
            unit: $('#updateUnit').val(), // Récupérer le nouveau type de channel
            active: channel.active

        };


        $.ajax({
            type: 'POST',
            url: 'http://192.168.1.107:8000/api/channel/update',
            contentType: 'application/json',
            data: JSON.stringify(formData),
            success: function(responseData) {
                alert('Appareil ajouté avec succès ! ID : ' + responseData);
                $('#addAppareilForm')[0].reset(); // Réinitialiser le formulaire après succès
            }
        });
    },
            error: function(jqXHR, textStatus, errorThrown) {
                alert('Erreur lors de l\'ajout du channel : ' + errorThrown);
            }
        });
    });
    
     // Fonction pour gérer la suppression d'un channel
     $('#deleteChannelForm').submit(function(event) {
        event.preventDefault();
        
        var channelId = $('#deleteChannelId').val(); // Récupérer l'ID de l'appareil à supprimer

       // Récupérer les détails du channel à partir de son ID
         $.ajax({
            type: 'GET',
            url: 'http://192.168.1.107:8000/api/channel/get',
            dataType: 'json',
            success: function(data) {
                var channel = data.find(function(item) {
                    return item.id === channelId;
                });

                if (!channel) {
                    console.error('Channel avec ID ' + channelId + ' non trouvé.');
                    return;
                }



        var formData = {
        
            name: channel.name,
            unit: channel.unit,
            active: channel.active

        };


        $.ajax({
            type: 'POST',
            url: 'http://192.168.1.107:8000/api/channel/drop',
            contentType: 'application/json',
            data: JSON.stringify(formData),
            success: function(responseData) {
                alert(responseData);
                $('#addAppareilForm')[0].reset(); // Réinitialiser le formulaire après succès
            }
        });
    },
            error: function(jqXHR, textStatus, errorThrown) {
                alert('Erreur lors de l\'ajout du channel : ' + errorThrown);
            }
        });
    });
    

    
    // Fonction pour récupérer et afficher la liste des channels
    function fetchChannels() {
        $.ajax({
            type: 'GET',
            url: 'http://192.168.1.107:8000/api/channel/get',
            dataType: 'json',
            success: function(data) {
                $('#channelList').empty(); // Effacer la liste précédente
                $.each(data, function(_, channel) {
                    $('#channelList').append('<tr><td>' + channel.id + '</td><td>' + channel.name + '</td><td>' + channel.ipAdress + '</td></tr>');
                });
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error('Erreur lors de la récupération des channels :', errorThrown);
            }
        });
    }

    // Appel initial pour récupérer et afficher la liste d'appareils
    fetchChannels();

    
});


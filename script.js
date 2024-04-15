// Initialisation de la carte
var map = L.map('map').setView([46.15192, -1.12482], 13);

// Ajout du fond de carte OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Charger les données depuis le fichier JSON
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    // Ajout des marqueurs pour chaque lieu
    var markers = [];

    data.forEach(function (place, index) {
      var marker = L.marker([place.latitude, place.longitude]).addTo(map);

      // Création du contenu du popup avec le nom, l'adresse et le QR code
      var popupContent = '<b>' + place.nom + '</b><br>' + place.adresse + '<br>';

      // Ajout de l'image du QR code cliquable
      popupContent += '<a href="' + place.qrcode + '" target="_blank"><img src="images/qrcode.jpg" alt="En savoir plus !"></a>';

      marker.bindPopup(popupContent);

      markers.push(marker);
    }); 




    // // Création de la route en utilisant Leaflet Routing Machine
    // var waypoints = data.map(place => L.latLng(place.latitude, place.longitude));
    // L.Routing.control({
    //   waypoints: waypoints,
    //   routeWhileDragging: true,
    //   addWaypoints: false, // Supprimer l'ajout de waypoints via la barre de contrôle
    //   lineOptions: {
    //     styles: [{ color: '#ed8f67', opacity: 0.8, weight: 6 }]
    //   }
    // }).addTo(map);


  })
  .catch(error => console.error('Erreur lors du chargement des données JSON:', error));

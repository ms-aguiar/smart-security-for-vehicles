var map;
var marker = [];

window.initMap = function () {
  this.inicializar_mapa();
};

function inicializar_mapa() {
  fetch("http://localhost:3333/locations/current_location/2")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var myLatLng = new google.maps.LatLng(-18.450858, -50.455883);

      map = new google.maps.Map(document.getElementById("map"), {
        zoom: 50,
        center: myLatLng,
      });

      infoWindow = new google.maps.InfoWindow();

      google.maps.event.addListener(map, "click", function () {
        infoWindow.close();
      });

      atualizar_mapa();

    })
    .catch(function () {

      var myLatLng = new google.maps.LatLng(-18.450858, -50.455883);

      map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: myLatLng,
      });

      infoWindow = new google.maps.InfoWindow();

      google.maps.event.addListener(map, "click", function () {
        infoWindow.close();
      });

      console.log("Aprende a usar o trem jamanta!");
    });
}

function atualizar_mapa() {
  fetch("http://localhost:3333/insurance/1")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      inserir_marcadores(data);
    })
    .catch(function () {
      console.log("Aprende a usar o trem jamanta!");
    });

  recursiva();
}

function inserir_marcadores(data) {
  var quantidade_de_veiculos = data.length;

  for (i = 0; i < quantidade_de_veiculos; i++) {
    var ano = data[i].ano;
    var marca = data[i].marca;
    var modelo = data[i].modelo;
    var placa = data[i].placa;
    var lat = data[i].locations[0].lat;
    var lng = data[i].locations[0].lng;
    var myLatLng = new google.maps.LatLng(lat, lng);

    if (marker[i] == null) {
      criar_marcadores(myLatLng, marca, modelo, ano, placa, i);
    }

    atualizar_marcadores(myLatLng, i);
  }
}

function criar_marcadores(myLatLng, marca, modelo, ano, placa, i) {
  marker[i] = new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: marca + " - " + modelo,
  });

  google.maps.event.addListener(marker[i], "click", function () {
    // Variável que define a estrutura do HTML a inserir na Info Window.
    var iwContent =
      '<div id="iw_container">' +
      '<div class="iw_title">' +
      placa +
      "</div>" +
      '<div class="iw_content">' +
      marca +
      " - " +
      modelo +
      " | " +
      ano +
      "</div></div>";

    // O conteúdo da variável iwContent é inserido na Info Window.
    infoWindow.setContent(iwContent);

    // A Info Window é aberta com um click no marcador.
    infoWindow.open(map, marker[i]);

  });
}

function atualizar_marcadores(myLatLng, i) {
  var nova_posicao = myLatLng;
  var posicao_atual;

  if (nova_posicao != posicao_atual) {
    marker[i].setPosition(myLatLng);
    posicao_atual = nova_posicao;
  }
}

var recursiva = function () {
  console.log("Se passou 1 segundo!");
  setTimeout(atualizar_mapa, 1000);
};

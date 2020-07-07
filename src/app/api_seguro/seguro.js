const fetch = require('node-fetch');

var recursiva = function () {

  setTimeout(verificacao_dos_usuarios_com_seguro_ligado,5000);

};

function verificacao_dos_usuarios_com_seguro_ligado(){fetch('http://localhost:3333/insurance')
.then(function(response){

  return response.json()

}).then(function(data){

  var quantidade_de_usuarios_com_seguro_ligado = data.length;

  var usuarios_com_seguro_ligado = [];

  var position1 = {}
  var position2 = {}
  var posicao_segura = []

  for(var i = 0; i < quantidade_de_usuarios_com_seguro_ligado; i++){

    var quantidade_de_veiculos_do_usuario = data[i].vehicles.length;
    var creditos_do_usuario = data[i].credits

    for(var j = 0; j < quantidade_de_veiculos_do_usuario; j++){

      if(data[i].vehicles[j].smart_safe){

        posicao_atual = {
          lat : data[i].vehicles[j].locations[0].lat,
          lng : data[i].vehicles[j].locations[0].lng
        }

        posicao_segura = data[i].vehicles[j].safe_positions
        id_veiculo = data[i].vehicles[j].id
        preco_por_minuto_do_veiculo = data[i].vehicles[j].preco_por_minuto

        posicao_segura.map( function (posicao_segura) {

          distancia_entre_a_posicao_segura = haversine_distance(posicao_atual, posicao_segura)

          if(distancia_entre_a_posicao_segura <= posicao_segura.raio){
            console.log('Desligar seguro, veículo encontra-se em localização segura!')
            on_off_seguro(false, id_veiculo)
          }

          else if( creditos_do_usuario > preco_por_minuto_do_veiculo ){
            on_off_seguro(true, id_veiculo)
          }

        })

      }
    }

    calculo_do_valor_a_ser_descontado(data[i]);

  }

  recursiva();

}).catch(function(){

  console.log('Erro ao obter usuários com seguro ligado!')

})

};

function calculo_do_valor_a_ser_descontado(data){

    var quantidade_de_veiculos_do_usuario = data.vehicles.length
    var creditos_do_usuario = data.credits;
    var novo_credito = creditos_do_usuario;
    var id_usuario = data.id

    var preco_por_minuto_do_veiculo = [];
    var status_do_seguro_do_veiculo = [];

    for( var i = 0; i < quantidade_de_veiculos_do_usuario; i++){

        preco_por_minuto_do_veiculo[i] = data.vehicles[i].preco_por_minuto;
        status_do_seguro_do_veiculo[i] = data.vehicles[i].status_seguro;
        id_veiculo[i] = data.vehicles[i].id

        if(creditos_do_usuario > preco_por_minuto_do_veiculo[i]){

            if(status_do_seguro_do_veiculo[i] != 0){

                novo_credito = novo_credito - preco_por_minuto_do_veiculo[i];
                console.log("Creditos atualizados, de: " + creditos_do_usuario + " para: " + novo_credito)

            }
        }
    }

    if(novo_credito != creditos_do_usuario && novo_credito != 0){
        envio_do_novo_credito(novo_credito, id_usuario);
    }

    if(creditos_do_usuario < novo_credito){
        on_off_seguro(false, id_veiculo[i])
    }

};

function envio_do_novo_credito(novo_credito, id_ususario){fetch('http://localhost:3333/insurance/' + id_ususario,{

    method: "PUT",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    body: JSON.stringify({
        credits: novo_credito
    }),


})
.then(function(response) {

    return response.json()
  })
  .then(function() {

  }).catch(function(){
      console.log('Erro ao enviar o novo crédito!')
  });

};

function consumo_do_veiculo(){

};

function haversine_distance(mk1, mk2) {

  var R = 6371.0710; // Radius of the Earth in kilometers
  var rlat1 = mk1.lat * (Math.PI/180); // Convert degrees to radians
  var rlat2 = mk2.lat * (Math.PI/180); // Convert degrees to radians
  var difflat = rlat2-rlat1; // Radian difference (latitudes)
  var difflon = (mk2.lng-mk1.lng) * (Math.PI/180); // Radian difference (longitudes)

  var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
  return d*1000;

};

function on_off_seguro(status_do_seguro, id_veiculo){fetch('http://localhost:3333/vehicles/' + id_veiculo,{

    method: "PUT",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    body: JSON.stringify({
        status_seguro: status_do_seguro
    }),

})
.then(function(response) {

    return response.json()

  })
  .then(function() {

  }).catch(function(){
      console.log('Erro ao atualizar o status do seguro!')
  });

};

recursiva();

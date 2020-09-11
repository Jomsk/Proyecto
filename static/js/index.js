client = new Paho.MQTT.Client("maqiatto.com", 8883, "web_" + parseInt(Math.random() * 100, 10));
var Men2Recv=" ; ",i=0;

// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;
var options = {
  useSSL: false,
  userName: "jomsk@hotmail.com",
  password: "Jomsk4all1996",
  onSuccess:onConnect,
  onFailure:doFail
}

// connect the client
client.connect(options);
  
// called when the client connects
function onConnect() {
  // Once a connection has been made, make a subscription and send a message.
  console.log("Conectado...");

  client.subscribe("jomsk@hotmail.com/IoT");


}

function doFail(e){
  console.log(e);
}

// called when the client loses its connection
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log(responseObject.errorMessage);
  }
}

// called when a message arrives
function onMessageArrived(message) {
  Men2Recv=message.payloadString;
  console.log(Men2Recv);
  accion(Men2Recv);
}

//Aviso: Sin Alimento
function Reca(){
  Men2Send="llen;1"
  SendToPro(Men2Send)
}

function Abrir(){
  var open=document.getElementById("Abrir");
  i=i+1
  if(i>1){
    i=0;
  }
  if(i==1){
    open.innerHTML="Cerrar"
  }else
  open.innerHTML="Alimentar"

  Men2Send="HComer;"+String(i)
  SendToPro(Men2Send)
}

function accion(mensaje){
  var barra=document.getElementById("Malim");
  var aviso=document.getElementById("aviso");
  Marc=mensaje.split(";");
  if(Marc[0]=="LCom"){
    barra.value=parseInt(Marc[1])
    if(barra.value==0){
      aviso.innerHTML="Aviso: Sin Alimento"
    }else{
      aviso.innerHTML=""
    }
  }
  if(Marc[0]=="HComer"){
    i=parseInt(Marc[1]);
    Abrir();
  }
}
function ShowTime(){
  
  var ho = document.getElementById("Porcion");
  Men2Send="TimePorcion;"+ho.value;
  SendToPro(Men2Send)
  
}

function ShowSelected(){ 
  var combo = document.getElementById("cant");
  var selected = combo.options[combo.selectedIndex].value;
  
  Men2Send="Porciom;"+selected;
  SendToPro(Men2Send)
  if(selected==50){
    espera=8
  }
  if(selected==90){
    espera=5.9
  }
  if(selected==190){
    espera=4
  }
  if(selected==500){
    espera=2
  }
  if(selected==590){
    espera=0.5
  }
  if(selected==800){
    espera=0.09
  }
  Men2Send="Espera;"+espera;
  SendToPro(Men2Send)
  }

function SendToPro(toSend){
  console.log(toSend);
  message = new Paho.MQTT.Message(toSend);
  message.destinationName = "jomsk@hotmail.com/IoT1";
  client.send(message);
}


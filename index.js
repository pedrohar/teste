'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()
const lime = require('lime-js')
const messaginghub = require('messaginghub-client');
const WebSocketTransport = require('lime-transport-websocket');

var port = process.env.PORT || 5000;

app.set('port', port)

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}))

// Process application/json
app.use(bodyParser.json())

// Index route
app.get('/', function(req, res) {
    res.send('asdasd')
})

// for Facebook verification
app.get('/webhook/', function(req, res) {

})

app.post('/webhook/', function(req, res) {

})

//const token = "EAAEiM84FfKEBAAbnRrW07p2NoUNcELhz4OMsEivJ2zQ8tpuN6IbqmR0GCTsdk24bHcgDpYvSybIvUO54DFTIu3ZBmRrp8lolomjOlMSbPq1iEM6AN5FsUg7H8gm4HJyfhJQuaseivzxqUGjgRtE3ZAXkLOYo87ZAyjmV2rxqgZDZD"

var sendMessageToUser = function(message) {
    //var msg = { type: "text/plain", content: , to: message.from };
    //var msg = { type: "text/plain", content: message, to: to };
    //client.sendMessage();
    client.sendMessage(message);
};


var identifier = 'godoybot2';

var accessKey = 'ZExSdTlDS1RLdHVDcEZ6WHdSRjA=';

// Cria uma instância do cliente, informando o identifier e accessKey do seu chatbot 
var client = new messaginghub.ClientBuilder()
    .withIdentifier(identifier)
    .withAccessKey(accessKey)
    .withTransportFactory(() => new WebSocketTransport())
    .build();

// Registra um receiver para mensagens do tipo 'text/plain'
client.addMessageReceiver('text/plain', function(message) {

    switchMessages(message);
    //sendMessageToUser(message.from, '');
    //var msg = { type: "text/plain", content: , to: message.from };
    //client.sendMessage(msg);

});




// Registra um receiver para qualquer notificação
client.addNotificationReceiver(true, function(notification) {
    // TODO: Processe a notificação recebida
});



// Conecta com o servidor de forma assíncrona. 
// A conexão ocorre via websocket, na porta 8081.
client.connect() // O retorno deste método é uma 'promise'.
    .then(function(session) {
        //console.log(session);
        // Conexão bem sucedida. A partir deste momento, é possível enviar e receber envelopes do servidor. */ 
        //var msg = { type: "text/plain", content: "Hello, world", to: "1251226478339437@messenger.gw.msging.net" };
        //client.sendMessage(msg);
    })
    .catch(function(err) { /* Falha de conexão. */ });


var switchMessages = function(message) {
    var messageToSend;
    switch (message.content) {
        case "Começar":
            messageToSend = {
                "id": "311F87C0-F938-4FF3-991A-7C5AEF7771A5",
                "to": message.from,
                "type": "application/vnd.lime.select+json",
                "content": {
                    "text": "Olá eu sou o ChatGama! Estou aqui para te orientar no próximo passom depois do ensino médiop. Vamos lá?",
                    "options": [{
                        "text": "Sim, claro!"
                    }, {
                        "text": "Não"
                    }]
                }
            };
            sendMessageToUser(messageToSend);
            break;
        case "Sim, claro!":
            messageToSend = {
                "id": "311F87C0-F938-4FF3-991A-7C5AEF7771A5",
                "to": message.from,
                "type": "application/vnd.lime.select+json",
                "content": {
                    "text": "Você estuda em escola pública ou particular?",
                    "options": [{
                        "text": "Pública"
                    }, {
                        "text": "Particular"
                    }]
                }
            };
            sendMessageToUser(messageToSend);
            break;
        case "Pública":
            messageToSend = {
                "id": "311F87C0-F938-4FF3-991A-7C5AEF7771A5",
                "to": message.from,
                "type": "application/vnd.lime.select+json",
                "content": {
                    "text": "Você pensar em fazer faculdade?",
                    "options": [{
                        "text": "Penso sim!"
                    }, {
                        "text": "Não penso!"
                    }]
                }
            };
            sendMessageToUser(messageToSend);
             break;
             
        case "Particular":
            
            break;
        case "Não penso!":
            messageToSend = {
                "id": "311F87C0-F938-4FF3-991A-7C5AEF7771A5",
                "to": message.from,
                "type": "application/vnd.lime.select+json",
                "content": {
                    "text": "Pq você não pensa?",
                    "options": [{
                        "text": "Falta de dinheiro"
                    }, {
                        "text": "Falta de tempo"
                    }]
                }
            };
            sendMessageToUser(messageToSend);
            break;
        case "Penso sim!":
              messageToSend = {
                "id": "311F87C0-F938-4FF3-991A-7C5AEF7771A5",
                "to": message.from,
                "type": "application/vnd.lime.select+json",
                "content": {
                    "text": "Escoolha uma opção",
                    "options": [{
                        "text": "Presencial"
                    }, {
                        "text": "Online"
                    }]
                }
            };
            sendMessageToUser(messageToSend);
            break;
        case "Não":
            messageToSend = {
                "id": "311F87C0-F938-4FF3-991A-7C5AEF7771A5",
                "to": message.from,
                "type": "application/vnd.lime.select+json",
                "content": {
                    "text": "Pera aí, tenho proposta para te fazer, pode ser?",
                    "options": [{
                        "text": "Sim, pode!"
                    }, {
                        "text": "Não quero!"
                    }]
                }
            };
            sendMessageToUser(messageToSend);
            break;
        case "Não quero!":
            sendMessageToUser({
                type: "text/plain",
                content: "Ok, se mudar de ideia estarei aqui.",
                to: message.from
            });
            break;

        default:
            /*messageToSend = {
                "id": "311F87C0-F938-4FF3-991A-7C5AEF7771A5",
                "to": message.from,
                "type": "application/vnd.lime.select+json",
                "content": {
                    "text": "Escolha uma opção",
                    "options": [{
                        "text": "Claro"
                    }, {
                        "text": "Não"
                    }]
                }
            };
            sendMessageToUser(messageToSend);*/
    }

};




// Spin up the server
app.listen(app.get('port'), function() {
    console.log('running on port', app.get('port'))
})

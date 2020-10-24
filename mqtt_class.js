let mqtt = require('mqtt');
let settings = {
    mqttServerUrl: "192.168.137.105",  // IP raspberry pi
    topic: "home01"                    // topic home
}

class Mqtt {
    // var mqttServerUrl = '';
    // var topic = '';
    // var client = '';
    constructor(mqttServerUrl, topic) {
        this.mqttServerUrl = mqttServerUrl;
        this.topic = topic;
        this.client = mqtt.connect('mqtt://' + settings.mqttServerUrl);
    }

    subscribe = function () {
        this.message = '';
        this.client = mqtt.connect('mqtt://' + settings.mqttServerUrl);
        this.client.on('connect', function () {
            this.client.subscribe(settings.topic);
        })
        this.client.on('message', function (topic, message) {
            this.message = message.toSting();
            console.log(message.toSting());
            this.client.end();
        })
        return this.message;
    }

    publish = function (message) {
        this.client.on('connect', function () {
            setInterval(function () {
                this.message = message;
                client.publish(settings.topic, message);
                console.log('Sent ' + message + " to " + settings.topic);
            }, 1000)
        });
    }
}

module.exports = Mqtt;
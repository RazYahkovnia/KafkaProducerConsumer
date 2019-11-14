var kafka = require('kafka-node');
const KAFKA_URL = process.env.KAFKA_CONNECT || 'kafka:9092';

var Consumer = kafka.Consumer,
    client = new kafka.KafkaClient({kafkaHost: KAFKA_URL}),
    consumer = new Consumer(client, [ {topic: 'test-topic', offset: 0} ], {autoCommit: false});

consumer.on('message', function (message) {
    console.log(message);
});

consumer.on('error', function (err) {
    console.log('Error:',err);
});


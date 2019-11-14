const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PRODUCER_PORT || 3004;
const KAFKA_URL = process.env.KAFKA_CONNECT || 'kafka:9092';

app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.json());
app.use(express.urlencoded());


var kafka = require('kafka-node');
var Producer = kafka.Producer,
    client = new kafka.KafkaClient({kafkaHost: KAFKA_URL}),
    producer = new Producer(client);

producer.on('error', (error) => console.error('Kafka producer error:', error));
producer.on('ready', function () {
    console.log(`producer is ready`);
});

app.post('/', function (req, res) {
    let {message} = req.body;

    const payload = [{
        topic: 'test-topic',
        messages: JSON.stringify({data: message, date: Date.now()}),
        attributes: 1
    }];

    producer.send(payload, function(error, result) {
        console.info('Producer Sent payload to Kafka:', payload);

        if (error) {
            console.error('Producer Sending payload failed:', error);
            res.status(500).json(error);
        } else {
            console.log('Producer Sending payload result:', result);
            res.status(202).json(result);
        }
    });

});
app.listen(PORT, () => console.log(`Producer listening on port ${PORT}!`));
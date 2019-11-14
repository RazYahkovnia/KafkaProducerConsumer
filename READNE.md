# Instructions: 

In docker-compose.yml you can see all containers (Kafka, Zookeeper, Producer via node.js, Consumer via node.js)

To start the cluster: `docker-compose up`

For posting data to kafka use the producer via POST method to `http://localhost:3004/`

You can see the data from the consumer logs in terminal.


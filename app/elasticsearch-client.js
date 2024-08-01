// elasticsearch-client.js
const { Client } = require('@elastic/elasticsearch');

const client = new Client({ node: 'http://localhost:9200' }); // Asegúrate de que Elasticsearch esté ejecutándose en esta URL

module.exports = client;

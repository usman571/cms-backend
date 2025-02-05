const YAML = require('yamljs');
const swaggerUI = require('swagger-ui-express');
const path = require('path');

const swaggerDocument = YAML.load(path.join(__dirname, '../docs/swagger.yaml'));

module.exports = {
   serve: swaggerUI.serve,
   setup: swaggerUI.setup(swaggerDocument)
};
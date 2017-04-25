let Ajv = require('ajv');
let ajv = new Ajv({ useDefaults: true });
require('ajv-keywords')(ajv);
const validate = (schema, data, callback)=> {
  let valid = ajv.validate(schema, data);
  if (!valid) {
    callback(ajv.errors, false);
  } else {
    callback(null, true);
  }
};

module.exports = {
  validate,
};


const sinon = require("sinon");
const redis = require("redis");

sinon
  .stub(redis, "createClient")
  .returns({ connect() {}, get: () => true, setEx() {} });
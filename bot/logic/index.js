const RuleEngine = require("node-rules");
const rules = require('./rules');

const logic = new RuleEngine();
logic.register(rules)

module.exports = logic;
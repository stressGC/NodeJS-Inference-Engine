module.exports = {
  "priority": 990,
  "condition": function(R) {
    console.log("block test", this);
    R.when(true);
  },
  "consequence": function(R) {
    console.log("IS FKING BLOCKED");
    this.action = {
      type: 'BLOCKED',
    };
    R.stop();
  }
}
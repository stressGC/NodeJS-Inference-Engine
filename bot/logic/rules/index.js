const rule = {
  "condition": function(R) {
      R.when(true);
  },
  "consequence": function(R) {
      this.msg = "OK";
      R.stop();
  }
};

module.exports = rule;
module.exports = {
  normalizeEntityName: function() {},

  afterInstall: function() {
    return this.addBowerPackagesToProject([
      { name: 'highlightjs', target: '^9.5.0' }
    ]);
  }
};

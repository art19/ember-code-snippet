module.exports = {
  normalizeEntityName: function() {},

  afterInstall: function() {
    return this.addBowerPackageToProject({ name: 'highlightjs', target: '^9.5.0' });
  }
};

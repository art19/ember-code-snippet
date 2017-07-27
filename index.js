/*jshint node: true */
'use strict';

var path = require('path');
var fs   = require('fs');
var mergeTrees = require('broccoli-merge-trees');
var flatiron = require('broccoli-flatiron');
var snippetFinder = require('./snippet-finder');

module.exports = {
  name: 'Code Snippet Ember Component',

  snippetPaths: function() {
    return this.app.options.snippetPaths || ['snippets'];
  },

  snippetSearchPaths: function(){
    return this.app.options.snippetSearchPaths || ['app'];
  },

  snippetRegexes: function() {
    return [{
      begin: /\bBEGIN-SNIPPET\s+(\S+)\b/,
      end: /\bEND-SNIPPET\b/
    }].concat(this.app.options.snippetRegexes || []);
  },

  treeForApp: function(tree){
    var snippets = mergeTrees(this.snippetPaths().filter(function(path){
      return fs.existsSync(path);
    }));

    var snippetRegexes = this.snippetRegexes();
    snippets = mergeTrees(this.snippetSearchPaths().map(function(path){
      return snippetFinder(path, snippetRegexes);
    }).concat(snippets));

    snippets = flatiron(snippets, {
      outputFile: 'snippets.js'
    });

    return mergeTrees([tree, snippets]);
  },

  included: function(app) {
    app.import(app.bowerDirectory + '/highlightjs/highlight.pack.js');
    app.import('vendor/highlight-style.css');
  }
};

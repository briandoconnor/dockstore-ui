'use strict';

/**
 * @ngdoc service
 * @name dockstore.ui.DocumentationService
 * @description
 * # DocumentationService
 * Service in the dockstore.ui.
 */
angular.module('dockstore.ui')
  .service('DocumentationService', [
    function () {

      this.docObjs = [
        {
          slug: 'getting-started',
          name: 'Getting Started',
          path: 'docs/getting-started.md'
        },
        {
          slug: 'about',
          name: 'About Dockstore',
          path: 'docs/about.md'
        }
      ];

      this.getDocumentObjs = function() {
        return this.docObjs;
      };

  }]);

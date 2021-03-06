'use strict';

/**
 * @ngdoc service
 * @name dockstore.ui.ContainerService
 * @description
 * # ContainerService
 * Service in the dockstore.ui.
 */
angular.module('dockstore.ui')
  .service('ContainerService', [
      '$q',
      '$http',
      'WebService',
      function ($q, $http, WebService) {

    this.getRegisteredContainerList = function() {
      return $q(function(resolve, reject) {
        $http({
          method: 'GET',
          url: WebService.API_URI + '/containers/registered'
        }).then(function(response) {
          resolve(response.data);
        }, function(response) {
          reject(response);
        });
      });
    };

    this.getRegisteredContainerById = function(containerId) {
      return $q(function(resolve, reject) {
        $http({
          method: 'GET',
          url: WebService.API_URI + '/containers/registered/' + containerId
        }).then(function(response) {
          resolve(response.data);
        }, function(response) {
          reject(response);
        });
      });
    };

    this.getRegisteredContainerByPath = function(containerPath) {
      var containerPathEncoded = containerPath.replace(/\//g, '%2F');
      return $q(function(resolve, reject) {
        $http({
          method: 'GET',
          url: WebService.API_URI + '/containers/' + containerPathEncoded + 
                '/registered/'
        }).then(function(response) {
          resolve(response.data);
        }, function(response) {
          reject(response);
        });
      });
    };

    this.getUserContainerList = function(userId) {
      return $q(function(resolve, reject) {
        $http({
          method: 'GET',
          url: WebService.API_URI + '/users/' + userId + '/containers'
        }).then(function(response) {
          resolve(response.data);
        }, function(response) {
          reject(response);
        });
      });
    };

    this.refreshUserContainers = function(userId) {
      return $q(function(resolve, reject) {
        $http({
          method: 'GET',
          url: WebService.API_URI + '/users/' + userId + '/containers/refresh',
        }).then(function(response) {
          resolve(response.data);
        }, function(response) {
          reject(response);
        });
      });
    };

    this.setContainerRegistration = function(containerId, isRegistered) {
      return $q(function(resolve, reject) {
        $http({
          method: 'POST',
          url: WebService.API_URI + '/containers/' + containerId + '/register',
          headers: {
            'Content-Type': 'application/json'
          },
          data: {
            register: isRegistered
          }
        }).then(function(response) {
          resolve(response.data);
        }, function(response) {
          reject(response);
        });
      });
    };

    this.getDockerFile = function(containerId) {
      return $q(function(resolve, reject) {
        $http({
          method: 'GET',
          url: WebService.API_URI + '/containers/' + containerId + '/dockerfile'
        }).then(function(response) {
          resolve(response.data.content);
        }, function(response) {
          reject(response);
        });
      });
    };

    this.getWFDescriptorFile = function(containerId) {
      return $q(function(resolve, reject) {
        $http({
          method: 'GET',
          url: WebService.API_URI + '/containers/' + containerId + '/cwl'
        }).then(function(response) {
          resolve(response.data.content);
        }, function(response) {
          reject(response);
        });
      });
    };

  }]);

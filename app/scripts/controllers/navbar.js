'use strict';

/**
 * @ngdoc function
 * @name dockstore.ui.controller:NavbarCtrl
 * @description
 * # NavbarCtrl
 * Controller of the dockstore.ui
 */
angular.module('dockstore.ui')
  .controller('NavbarCtrl', [
    '$scope',
    '$auth',
    '$location',
    'UserService',
    'NotificationService',
    function ($scope, $auth, $location, UserService, NtfnService) {
    
      var userObj = UserService.getUserObj();
      $scope.username = userObj ? userObj.username : '';

      $scope.isAuthenticated = function() {
        return $auth.isAuthenticated();
      };

      $scope.logout = function() {
        if (!$auth.isAuthenticated()) {
          $location.path('/login');
          return;
        }
        $auth.logout()
          .then(function() {
            UserService.setUserObj(null);
            NtfnService.popSuccess('Logout', 'Logout successful.');
            $location.path('/search');
          });
      };

  }]);
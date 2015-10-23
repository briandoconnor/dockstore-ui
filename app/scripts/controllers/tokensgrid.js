'use strict';

/**
 * @ngdoc function
 * @name dockstore.ui.controller:TokensGridCtrl
 * @description
 * # TokensGridCtrl
 * Controller of the dockstore.ui
 */
angular.module('dockstore.ui')
  .controller('TokensGridCtrl', [
    '$scope',
    function ($scope) {
    
      $scope.tokens = [];
      $scope.sortColumn = 'name';
      $scope.sortReverse = false;
      $scope.numTknsPage = "10";
      $scope.numNavPages = 5; // Must be an odd number
      $scope.currPage = 1;
      $scope.startTkn = 0;
      $scope.endTkn = 0;

      $scope.getLatestVersionNumber = function(tags) {
        if (!tags || tags.length === 0) return 'n/a';
        var descTags = tags.sort(function(a, b) {
          return b.version.localeCompare(a.version);
        });
        if (descTags.length >= 2 && descTags[0].version === 'latest') {
          return descTags[1].version;
        } else {
          return descTags[0].version;
        }
      };

      $scope.getPageNumList = function() {
        if ($scope.filteredTokens.length === 0) return [1];

        var pageNumList = [];
        var numPrevRadiable = Math.min($scope.currPage - 1,
                                        $scope.numNavPages - 1);
        var numNextRadiable = Math.min($scope.numPages - $scope.currPage,
                                        $scope.numNavPages - 1);
        var numNext = 0;
        var numPrev = 0;

        if (numNextRadiable < ($scope.numNavPages - 1) / 2) {
          numPrev = numPrevRadiable - numNextRadiable;
        } else {
          numPrev = Math.min(($scope.numNavPages - 1) / 2,
                              $scope.currPage - 1);
        }
        if (numPrevRadiable < ($scope.numNavPages - 1) / 2) {
          numNext = numNextRadiable - numPrevRadiable;
        } else {
          numNext = Math.min(($scope.numNavPages - 1) / 2,
                              $scope.numPages - $scope.currPage);
        }

        for (var i = numPrev; i > 0; i--) {
          pageNumList.push($scope.currPage - i);
        }
        pageNumList.push($scope.currPage);
        for (var j = 1; j <= numNext; j++) {
          pageNumList.push($scope.currPage + j);
        }

        return pageNumList;
      };

      $scope.refreshPagination = function() {
        $scope.currPage = 1;
        $scope.numPages =
          Math.ceil($scope.filteredTokens.length / parseInt($scope.numTknsPage));
        $scope.pageNumList = $scope.getPageNumList();
      };

      $scope.updateContRange = function() {
        $scope.startTkn = $scope.numTknsPage * ($scope.currPage - 1);
        $scope.endTkn = ($scope.numTknsPage) * $scope.currPage - 1;
      };

      $scope.getPaginRangeObj = function() {
        $scope.updateContRange();
        return {
          start: $scope.startTkn,
          end: $scope.endTkn
        };
      };

      $scope.changePage = function(pageNum) {
        switch (pageNum) {
          case -1:
            $scope.currPage--;
            break;
          case -2:
            $scope.currPage++;
            break;
          default:
            $scope.currPage = pageNum;
        }
      };

      $scope.clickSortColumn = function(columnName) {
        if ($scope.sortColumn === columnName) {
          $scope.sortReverse = !$scope.sortReverse;
        } else {
          $scope.sortColumn = columnName;
          $scope.sortReverse = false;
        }
      };

      $scope.getIconClass = function(columnName) {
        if ($scope.sortColumn === columnName) {
          return !$scope.sortReverse ?
            'glyphicon-sort-by-alphabet' : 'glyphicon-sort-by-alphabet-alt';
        } else {
          return 'glyphicon-sort';
        }
      };

      $scope.getRangeString = function() {
        var start = Math.min($scope.startTkn + 1,
                              $scope.filteredTokens.length).toString();
        var end = Math.min($scope.endTkn + 1,
                              $scope.filteredTokens.length).toString();

        var numLength = Math.max(start.length, end.length);

        for (var i = start.length; i < numLength; i++) {
          start = '0' + start;
        }
        for (var j = end.length; j < numLength; j++) {
          end = '0' + end;
        }

        return start + ' to ' + end + ' of ' + $scope.filteredTokens.length;
      };

  }]);
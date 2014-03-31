(function() {
  'use strict';
  this.app = angular.module('gi', ['ngResource', 'ngRoute']);

  this.app.config([
    '$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
      $routeProvider.when('/algorithms/:item', {
        templateUrl: function(params) {
          return "/" + params.item + (".html?rand=" + (parseInt(10000 * Math.random())));
        }
      });
      return $routeProvider.otherwise({
        redirectTo: '/'
      });
    }
  ]);

  this.app.factory('Topic', [
    '$resource', function($resource) {
      return $resource('/:action.json', {}, {
        all: {
          params: {
            action: 'topic'
          },
          isArray: false,
          method: 'GET'
        }
      });
    }
  ]);

  this.app.controller('GICtrl', [
    '$scope', function($scope) {
      $scope.options = {
        lines: {
          show: true
        },
        points: {
          show: true
        },
        xaxis: {
          tickDecimals: 0,
          tickSize: 1
        }
      };
      return $scope.draw = function(data) {
        var placeholder;
        placeholder = $("#placeholder");
        return $.plot(placeholder, data, $scope.options);
      };
    }
  ]);

  this.app.controller('TopicsCtrl', [
    '$scope', 'Topic', function($scope, Topic) {
      $scope.topics = [];
      return Topic.all({}, function(response) {
        var key, value, _ref, _results;
        _ref = response.items;
        _results = [];
        for (key in _ref) {
          value = _ref[key];
          console.log('%s %s', key, value);
          if (key && value) {
            _results.push($scope.topics.push(response.items[key]));
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      });
    }
  ]);

  this.app.controller('CalculateECtrl', [
    '$scope', function($scope) {
      $scope.start = function(n) {
        console.log("Starting to calculate");
        $scope.e = 0;
        return $scope.e = $scope.calculate(n, $scope.e);
      };
      $scope.factorial = function(n) {
        console.log("Inside factorial for " + n);
        if (0 === n) {
          return 1;
        } else {
          return n * $scope.factorial(n - 1);
        }
      };
      return $scope.calculate = function(n, current) {
        if (current == null) {
          current = 0;
        }
        console.log("Inside calculate with " + n + ", " + current);
        if (0 === n) {
          return 1;
        } else {
          return current + $scope.calculate(1 / $scope.factorial(n - 1));
        }
      };
    }
  ]);

  this.app.controller('HeapsortCtrl', [
    '$scope', function($scope) {
      var data;
      $scope.placeholder = $("#placeholder");
      data = [
        {
          "label": "Europe (EU27)",
          "data": [[1999, 3.0], [2000, 3.9], [2001, 2.0], [2002, 1.2], [2003, 1.3], [2004, 2.5], [2005, 2.0], [2006, 3.1], [2007, 2.9], [2008, 0.9]]
        }
      ];
      return $scope.draw(data);
    }
  ]);

}).call(this);

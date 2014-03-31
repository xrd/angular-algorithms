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
      $scope.summer = $scope.sum;
      $scope.factorial = function(n) {
        if (0 === n) {
          return 1;
        } else {
          return n * $scope.factorial(n - 1);
        }
      };
      $scope.sum = function(n) {
        var fact;
        if (0 === n) {
          return 1;
        } else {
          fact = $scope.factorial(n);
          return $scope.sum(n - 1) + (1.0 / fact);
        }
      };
      $scope.ss = function(msg) {
        $scope.status = msg;
        return console.log(msg);
      };
      $scope.count = 10;
      $scope.timeIterator = function(n) {
        var num, _i, _ref;
        $scope.data = [];
        $scope.timings = [];
        $scope.ss("Starting timing");
        for (num = _i = 1, _ref = n + 1; 1 <= _ref ? _i <= _ref : _i >= _ref; num = 1 <= _ref ? ++_i : --_i) {
          $scope.time(num);
          $scope.draw($scope.data);
        }
        return $scope.ss("Starting timing");
      };
      return $scope.time = function(n) {
        var minusOne, start, stop;
        if (!$scope.data) {
          $scope.data = [];
        }
        minusOne = n - 1;
        $scope.ss("Timing iteraton: " + n);
        $scope.data[minusOne] = {};
        start = new Date().getMilliseconds();
        $scope.data[minusOne].label = "Timing #" + minusOne;
        $scope.sum(minusOne);
        stop = new Date().getMilliseconds();
        $scope.data[minusOne].data = [];
        $scope.data[minusOne].data.push(minusOne);
        return $scope.data[minusOne].data.push(stop - start);
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

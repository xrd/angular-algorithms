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
        return $scope.status = msg;
      };
      $scope.count = 10;
      $scope.timeAndPlot = function(n) {
        var num, _i, _ref;
        $scope.data = [];
        $scope.data[0] = {};
        $scope.data[0].label = "e";
        $scope.data[0].data = [];
        $scope.ss("Starting timing");
        for (num = _i = 0, _ref = n / 10; 0 <= _ref ? _i < _ref : _i > _ref; num = 0 <= _ref ? ++_i : --_i) {
          $scope.time(num * 10);
          $scope.draw($scope.data);
        }
        return $scope.ss("Starting timing");
      };
      return $scope.time = function(n) {
        var start, stop, the_data;
        $scope.ss("Timing iteraton: " + (n + 1));
        start = new Date().getTime();
        $scope.ss("Start: " + start);
        $scope.sum(n);
        stop = new Date().getTime();
        $scope.ss("Stop: " + stop);
        the_data = [n, stop - start];
        return $scope.data[0].data.push(the_data);
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

  this.app.controller('PrimeCalcCtrl', [
    '$scope', '$timeout', function($scope, $timeout) {
      $scope.timeoutInterval = 1000;
      $scope.calculateSoE = function() {
        return console.log("Calculating sieve of eratosthenes!");
      };
      $scope.number = function(n) {
        return $scope.numbers[n - 1];
      };
      $scope.generateNumbers = function(n) {
        var i, _i, _results;
        $scope.numbers = [];
        if (n > 2) {
          _results = [];
          for (i = _i = 2; 2 <= n ? _i <= n : _i >= n; i = 2 <= n ? ++_i : --_i) {
            _results.push($scope.numbers.push({
              prime: false
            }));
          }
          return _results;
        }
      };
      return $scope.start = function() {
        $scope.generateNumbers();
        $scope.p = 2;
        return $scope.calculateSoE();
      };
    }
  ]);

  this.app.controller('StrictModeCtrl', ['$scope', function($scope) {}]);

}).call(this);

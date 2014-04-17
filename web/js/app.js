(function() {
  this.app = angular.module('gi', ['ngResource', 'ngRoute', 'ngAnimate']);

  this.app.config([
    '$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
      $routeProvider.when('/algorithms/:item', {
        templateUrl: function(params) {
          return params.item + (".html?rand=" + (parseInt(10000 * Math.random())));
        }
      });
      return $routeProvider.otherwise({
        redirectTo: ''
      });
    }
  ]);

  this.app.factory('Topic', [
    '$resource', function($resource) {
      return $resource(':action.json', {}, {
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
      $scope.enabled = {
        "enabled": true
      };
      return $scope.draw = function(data, xTick) {
        var placeholder;
        if (xTick == null) {
          xTick = 10;
        }
        $scope.options = {
          lines: {
            show: true
          },
          points: {
            show: true
          },
          xaxis: {
            tickDecimals: 1,
            tickSize: xTick
          },
          yaxis: {
            tickDecimals: 1
          }
        };
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

  this.app.controller('PrimeCalcCtrl', [
    '$scope', '$timeout', function($scope, $timeout) {
      var isCorP, markC;
      $scope.algorithm = void 0;
      $scope.algorithms = ['SieveOfE', 'Other', 'Another'];
      $scope.bounds = 102;
      $scope.p = void 0;
      $scope.stepInt = 250;
      $scope.states = [];
      $scope.the_state = [];
      $scope.clearPrimes = function() {
        return $scope.primes = [];
      };
      $scope.clearPrimes();
      $scope.runAll = function() {
        var a, _i, _len, _ref, _results;
        _ref = $scope.algorithms;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          a = _ref[_i];
          $scope.clearPrimes();
          _results.push($scope[a]());
        }
        return _results;
      };
      $scope.setCallee = function() {
        var e, func, lines, stack, without_ln;
        try {
          throw new Error("Getting stack trace");
        } catch (_error) {
          e = _error;
          stack = e.stack ? e.stack : e.stacktrace;
          lines = stack.split(/\n/);
          without_ln = lines[2].split(/\(/)[0];
          func = without_ln.split(/\./)[2];
          return $scope.callee = func;
        }
      };
      markC = function(n) {
        return $scope.numbers[n].composite = true;
      };
      isCorP = function(i) {
        return $scope.numbers[i].composite || $scope.numbers[i].prime;
      };
      $scope.save = function(arr) {
        return $scope.states.push({
          marking: arr != null ? arr.marking : void 0,
          primes: angular.copy($scope.primes),
          looking: arr != null ? arr.looking : void 0,
          found: arr != null ? arr.found : void 0,
          p: $scope.p,
          numbers: angular.copy($scope.numbers)
        });
      };
      $scope.markThePs = function(n) {
        var i, keepGoing, toMark, _i, _ref, _ref1;
        if (n == null) {
          n = 2;
        }
        if (($scope.p * n) <= $scope.bounds) {
          toMark = $scope.p * n;
          markC(toMark);
          $scope.save({
            marking: toMark
          });
          return $scope.markThePs(n + 1);
        } else {
          keepGoing = false;
          for (i = _i = _ref = $scope.p + 1, _ref1 = $scope.bounds; _ref <= _ref1 ? _i < _ref1 : _i > _ref1; i = _ref <= _ref1 ? ++_i : --_i) {
            $scope.save({
              looking: i
            });
            if (!isCorP(i)) {
              keepGoing = true;
              $scope.primes.push(i);
              $scope.numbers[i].prime = true;
              $scope.p = i;
              $scope.save({
                found: i
              });
              $scope.markThePs();
              break;
            }
          }
          if (!keepGoing) {
            return $scope.done = true;
          }
        }
      };
      $scope.SieveOfE = function() {
        $scope.primes = [1, 2];
        $scope.save();
        $scope.numbers[0].prime = true;
        $scope.numbers[1].prime = true;
        $scope.numbers[2].prime = true;
        $scope.p = 2;
        $timeout($scope.startAnimation, 1000);
        return $scope.markThePs();
      };
      $scope.startAnimation = function() {
        console.log("Jumping to next state");
        if ($scope.states.length > 1) {
          $scope.the_state = $scope.states.shift();
          return $timeout($scope.startAnimation, $scope.stepInt);
        }
      };
      $scope.generateNumbers = function(bounds) {
        var i, _i, _results;
        $scope.bounds = bounds;
        $scope.numbers = [];
        if (bounds > 2) {
          _results = [];
          for (i = _i = 0; 0 <= bounds ? _i <= bounds : _i >= bounds; i = 0 <= bounds ? ++_i : --_i) {
            _results.push($scope.numbers.push({
              prime: false,
              number: i
            }));
          }
          return _results;
        }
      };
      $scope.start = function() {
        $scope.primes = [];
        $scope.generateNumbers($scope.bounds);
        return $scope.calculate();
      };
      return $scope.calculate = function() {
        if (!$scope.algorithm) {
          $scope.algorithm = $scope.algorithms[0];
        }
        return $scope[$scope.algorithm]();
      };
    }
  ]);

  this.app.controller('StrictModeCtrl', ['$scope', function($scope) {}]);

}).call(this);

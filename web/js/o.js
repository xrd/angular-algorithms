(function() {
  this.app.controller('LgCtrl', [
    '$scope', function($scope) {
      return $scope.properties({
        notes: ["Logarithm is an inverse exponential function", "log n^b == b * log n", "log[a] b = ( log[c] b / log[c] a ), which implies log[a] b * log[c] a = log[c] b, easy to shift base", "base has very little impact on the growth rate", "growth rate of any polynomial function is O(log n)"]
      });
    }
  ]);

  this.app.controller('BigOCtrl', [
    '$scope', '$http', function($scope, $http) {
      $scope.properties = {
        notes: ["inverse ackermann's function: the slowest growing complexity function. Value of a(n) < 5 for all known values of n"]
      };
      $scope.highestPossible = 1000;
      $scope.exercise1 = function(n) {
        var i, j, k, r, _i, _j, _k, _ref, _ref1;
        r = 0;
        for (i = _i = 1, _ref = n - 1; 1 <= _ref ? _i <= _ref : _i >= _ref; i = 1 <= _ref ? ++_i : --_i) {
          for (j = _j = _ref1 = i + 1; _ref1 <= n ? _j <= n : _j >= n; j = _ref1 <= n ? ++_j : --_j) {
            for (k = _k = 1; 1 <= j ? _k <= j : _k >= j; k = 1 <= j ? ++_k : --_k) {
              r = r + 1;
            }
          }
        }
        return r;
      };
      $scope.getNextRandom = function() {
        attempt;
        var attempt, index;
        while (void 0 === index) {
          attempt = parseInt($scope.data.length * Math.random());
          if (!$scope.data[attempt].completed) {
            index = attempt;
          }
        }
        $scope.data[attempt].completed = true;
        return index;
      };
      $scope.start = function() {
        return console.log("Hi there");
      };
      $scope.next = function() {
        return $scope.getNextRandom();
      };
      return $scope.init = function() {
        return $http.get('big_o.json').success(function(data) {
          return $scope.data = data;
        });
      };
    }
  ]);

}).call(this);

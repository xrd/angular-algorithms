(function() {
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
          $scope.draw($scope.data, n / 10);
        }
        return $scope.ss("Starting timing");
      };
      return $scope.time = function(n) {
        var start, stop, the_data;
        $scope.ss("Timing iteraton: " + (n + 1));
        start = performance.now();
        $scope.ss("Start: " + start);
        $scope.sum(n);
        stop = performance.now();
        $scope.ss("Stop: " + stop);
        the_data = [n, stop - start];
        return $scope.data[0].data.push(the_data);
      };
    }
  ]);

}).call(this);

(function() {
  this.app.controller('FecCtrl', [
    '$scope', '$timeout', function($scope, $timeout) {
      $scope.algorithms = ["3_1_repetition"];
      $scope.algorithm = void 0;
      $scope.init = function() {
        return console.log("Inside init");
      };
      $scope.generateBits = function() {
        var i, _i, _results;
        $scope.bits = [];
        _results = [];
        for (i = _i = 0; _i <= 100; i = ++_i) {
          _results.push($scope.bits.push({
            index: i,
            data: parseInt(Math.random() * 2)
          }));
        }
        return _results;
      };
      $scope._3_1_repetition = function() {
        console.log("Starting 3 1 repetition");
        return $scope.data = $scope.generateBits();
      };
      return $scope.start = function() {
        console.log("Starting: " + $scope.algorithm);
        return $scope["_" + $scope.algorithm]();
      };
    }
  ]);

  this.app.directive('bit', [
    '$timeout', function() {
      return {
        template: 'A bit is here {{bit.data}}'
      };
    }
  ]);

}).call(this);

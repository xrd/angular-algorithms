(function() {
  this.app.controller('FecCtrl', [
    '$scope', '$timeout', function($scope, $timeout) {
      $scope.algorithms = ["3_1_repetition"];
      $scope.algorithm = void 0;
      $scope.init = function() {
        return console.log("Inside init");
      };
      return $scope.start = function() {
        return $scope[$scope.algorithm]();
      };
    }
  ]);

}).call(this);

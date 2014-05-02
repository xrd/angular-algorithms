(function() {
  this.app.controller('DjikstraCtrl', [
    '$scope', 'Algorithm', function($scope, Algorithm) {
      $scope.init = function() {
        return console.log("Inside the init");
      };
      return $scope.start = function() {};
    }
  ]);

}).call(this);

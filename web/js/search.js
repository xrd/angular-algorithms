(function() {
  this.app.controller('BinarySearch', [
    '$scope', function($scope) {
      return $scope.properties = {
        notes: ["Binary search is O(log n) algorithm"],
        complexity: 'O(log n)'
      };
    }
  ]);

}).call(this);

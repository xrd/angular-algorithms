(function() {
  this.app.controller('ShortestPathCtrl', [
    '$scope', function($scope) {
      $scope.algorithms = [
        {
          name: "Djikstra"
        }, {
          name: "Bellman-Ford",
          attributes: ["slower than Djikstra", "can handle edge weights which have negative numbers", "can detect negative cycles", "Worst case: O( |V| |E| )", "Worse case space: O( |V| )"]
        }, {
          name: "Floyd-Warshall",
          attributes: ["Requires weighted graph", "Finds transitive closure of a relation R", "Best case: O(|V|^3)", "Worst case: Theta(|V|^3)", "Worst case space complexity: Omega(|V|^2)"]
        }
      ];
      $scope.algorithm = void 0;
      $scope.init = function() {
        return console.log("Inside init");
      };
      return $scope.start = function() {
        if (!$scope.algorithm) {

        }
      };
    }
  ]);

}).call(this);

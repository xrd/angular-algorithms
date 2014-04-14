(function() {
  this.app.controller('ShortestPathCtrl', [
    '$scope', function($scope) {
      var print;
      $scope.algorithms = [
        {
          name: "Djikstra"
        }, {
          name: "Checkerboard"
        }, {
          name: "Bellman-Ford",
          attributes: ["slower than Djikstra", "can handle edge weights which have negative numbers", "can detect negative cycles", "Worst case: O( |V| |E| )", "Worse case space: O( |V| )"]
        }, {
          name: "Floyd-Warshall",
          attributes: ["Requires weighted graph", "Finds transitive closure of a relation R", "Best case: O(|V|^3)", "Worst case: Theta(|V|^3)", "Worst case space complexity: Omega(|V|^2)"]
        }
      ];
      $scope.buildArray = function(name) {
        var i, j, _i, _ref, _results;
        $scope[name] = [];
        _results = [];
        for (i = _i = 0, _ref = $scope.n; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
          $scope[name].push([]);
          _results.push((function() {
            var _j, _ref1, _results1;
            _results1 = [];
            for (j = _j = 0, _ref1 = $scope.n; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; j = 0 <= _ref1 ? ++_j : --_j) {
              _results1.push($scope[name][i][j] = {});
            }
            return _results1;
          })());
        }
        return _results;
      };
      $scope.populateBoard = function() {
        var i, j, _i, _ref, _results;
        _results = [];
        for (i = _i = 0, _ref = $scope.n; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
          _results.push((function() {
            var _j, _ref1, _results1;
            _results1 = [];
            for (j = _j = 0, _ref1 = $scope.n; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; j = 0 <= _ref1 ? ++_j : --_j) {
              _results1.push($scope.board[i][j] = {
                cost: parseInt(Math.random() * 10) + 1
              });
            }
            return _results1;
          })());
        }
        return _results;
      };
      $scope.Checkerboard = function() {
        if (!$scope.n) {
          $scope.n = 10;
        }
        console.log("Inside checkerboard");
        $scope.buildArray('board');
        $scope.populateBoard();
        $scope.buildArray('qa');
        $scope.buildArray('pa');
        $scope.i = parseInt(Math.random() * 10);
        $scope.j = 0;
        return $scope.computeShortestPath();
      };
      $scope.c = function(i, j) {
        return $scope.board[i][j].cost;
      };
      $scope.minCost = function(i, j) {
        if (j < 1 || j > $scope.n) {
          return "Infinity";
        } else if (i === 1) {
          return $scope.c(i, j);
        } else {
          return Math.min($scope.minCost(i - 1, j - 1), $scope.minCost(i - 1, j), $scope.minCost(i - 1, j + 1)) + $scope.c(i, j);
        }
      };
      $scope.op = {};
      $scope.op.setInfinity = function(i, j) {
        return $scope.qa[i][j] = "infinity";
      };
      $scope.op.setFirstLevel = function(x) {
        return $scope.qa[1][x] = $scope.c(1, x);
      };
      $scope.computeShortestPathArray = function() {
        var m, x, y, _i, _j, _k, _ref, _ref1, _ref2, _results;
        for (x = _i = 1, _ref = $scope.n; 1 <= _ref ? _i <= _ref : _i >= _ref; x = 1 <= _ref ? ++_i : --_i) {
          $scope.op.setFirstLevel(1, x);
        }
        for (y = _j = 1, _ref1 = $scope.n; 1 <= _ref1 ? _j <= _ref1 : _j >= _ref1; y = 1 <= _ref1 ? ++_j : --_j) {
          $scope.op.setInfinity(y, 0);
          $scope.op.setInfinity(y, $scope.n + 1);
        }
        _results = [];
        for (y = _k = 2, _ref2 = $scope.n; 2 <= _ref2 ? _k <= _ref2 : _k >= _ref2; y = 2 <= _ref2 ? ++_k : --_k) {
          _results.push((function() {
            var _l, _ref3, _results1;
            _results1 = [];
            for (x = _l = 1, _ref3 = $scope.n; 1 <= _ref3 ? _l <= _ref3 : _l >= _ref3; x = 1 <= _ref3 ? ++_l : --_l) {
              m = Math.min($scope.qa[y - 1][x - 1], $scope.qa[y - 1][x], $scope.qa[y - 1][x + 1]);
              $scope.qa[y][x] = m + $scope.c(y, x);
              if (m === $scope.qa[y - 1][x - 1]) {
                _results1.push($scope.pa[y][x] = -1);
              } else if (m === $scope.qa[y - 1][x]) {
                _results1.push($scope.pa[y][x] = 0);
              } else {
                _results1.push($scope.pa[y][x] = 1);
              }
            }
            return _results1;
          })());
        }
        return _results;
      };
      $scope.computeShortestPath = function() {
        var i, min, minIndex, _i, _ref, _results;
        $scope.computeShortestPathArray();
        minIndex = 1;
        min = $scope.qa[$scope.n][1];
        _results = [];
        for (i = _i = 2, _ref = $scope.n; 2 <= _ref ? _i <= _ref : _i >= _ref; i = 2 <= _ref ? ++_i : --_i) {
          if ($scope.qa[$scope.n][1] < min) {
            minIndex = i;
            min = $scope.qa[$scope.n][i];
          }
          _results.push($scope.printPath($scope.n, minIndex));
        }
        return _results;
      };
      print = function(s) {
        return console.log(s);
      };
      $scope.printPath = function(y, x) {
        print(x);
        print("<-");
        if (y === 2) {
          return print("" + (x + $scope.pa[y][x]));
        } else {
          return $scope.printPath(y - 1, x + $scope.pa[y][x]);
        }
      };
      $scope['Bellman-Ford'] = function() {
        return console.log("Chose belman ford");
      };
      $scope.algorithm = void 0;
      $scope.init = function() {
        return console.log("Inside init");
      };
      return $scope.start = function() {
        if (!$scope.algorithm) {
          return;
        }
        console.log("Algorithm: " + $scope.algorithm.name);
        return $scope[$scope.algorithm.name]();
      };
    }
  ]);

}).call(this);

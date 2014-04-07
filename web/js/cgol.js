(function() {
  this.app.controller('CgolCtrl', [
    '$scope', '$timeout', function($scope, $timeout) {
      var BUILD_QUEUE_DELAY, MAX_QUEUE_SIZE, isDead, isLiving, setDead, setLiving;
      $scope.queue = [];
      BUILD_QUEUE_DELAY = 1000;
      MAX_QUEUE_SIZE = 100;
      $scope.matrix = void 0;
      $scope.wait = function() {
        return $timeout($scope.cgol, BUILD_QUEUE_DELAY);
      };
      $scope.tick = function() {
        var i, j, _i, _j, _ref, _ref1;
        $scope.buildMatrix('next');
        for (i = _i = 0, _ref = $scope._grid_size; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
          for (j = _j = 0, _ref1 = $scope._grid_size; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; j = 0 <= _ref1 ? ++_j : --_j) {
            $scope.underpopulation(i, j);
            $scope.nextgeneration(i, j);
            $scope.overcrowding(i, j);
            $scope.reproduction(i, j);
            console.log("tick");
          }
        }
        return $scope.queue.push($scope['next']);
      };
      $scope.underpopulation = function(i, j) {
        var neighbors, x, y, _i, _j, _ref, _ref1, _ref2, _ref3;
        neighbors = 0;
        for (x = _i = _ref = i - 1, _ref1 = i + 1; _ref <= _ref1 ? _i < _ref1 : _i > _ref1; x = _ref <= _ref1 ? ++_i : --_i) {
          for (y = _j = _ref2 = j - 1, _ref3 = j + 1; _ref2 <= _ref3 ? _j < _ref3 : _j > _ref3; y = _ref2 <= _ref3 ? ++_j : --_j) {
            if (!(x === i && y === j)) {
              if (isDead($scope.matrix[i][j])) {
                neighbors += 1;
              }
            }
          }
        }
        return console.log("Neighbor count for " + i + "," + j + ": " + neighbors);
      };
      isDead = function(item) {
        return 'dead' === item.status;
      };
      isLiving = function(item) {
        return 'live' === item.status;
      };
      setLiving = function(item) {
        return item.status = 'live';
      };
      setDead = function(item) {
        return item.status = "dead";
      };
      $scope.nextgeneration = function(i, j) {
        return console.log("next generation");
      };
      $scope.overcrowding = function(i, j) {
        return console.log("overcrowding");
      };
      $scope.reproduction = function(i, j) {
        return console.log("reproduction");
      };
      $scope.grid_size = function(n) {
        return $scope._grid_size = n;
      };
      $scope.living = function(i, j, v) {
        if (v) {
          $scope.matrix[i][j] = v;
        }
        return $scope.matrix[i][j];
      };
      $scope.buildMatrix = function(name) {
        var i, j, row, _i, _j, _ref, _ref1, _results;
        $scope[name ? name : 'matrix'] = [];
        _results = [];
        for (i = _i = 0, _ref = $scope._grid_size; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
          row = [];
          for (j = _j = 0, _ref1 = $scope._grid_size; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; j = 0 <= _ref1 ? ++_j : --_j) {
            row.push({
              status: 'dead'
            });
          }
          _results.push($scope.matrix.push(row));
        }
        return _results;
      };
      $scope.cgol = function() {
        $scope.buildMatrix();
        if ($scope.queue.length > MAX_QUEUE_SIZE) {
          return $scope.wait();
        } else {
          return $scope.tick();
        }
      };
      return $scope.start = function() {
        $scope._grid_size = 20;
        return $scope.cgol();
      };
    }
  ]);

}).call(this);

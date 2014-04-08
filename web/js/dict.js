(function() {
  this.app.controller('DictCtrl', [
    '$scope', '$timeout', function($scope, $timeout) {
      var i, shuffleArray, _i;
      $scope.attempts = 0;
      $scope.successes = 0;
      $scope.selector = void 0;
      $scope.selectors = [];
      for (i = _i = 0; _i <= 100; i = ++_i) {
        $scope.selectors.push([]);
      }
      $scope.answer = function(op, i, j) {
        var c, c2, why;
        $scope.operator = op;
        $scope.index = i;
        $scope.why = void 0;
        $scope.askWhys = [];
        c = $scope.selectors[i][j];
        $scope.attempts += 1;
        c2 = $scope.types[i].operations[op].c;
        why = $scope.types[i].operations[op].why;
        if (c2 === c) {
          $scope.successes += 1;
          return $scope.noteCorrect(why);
        } else {
          return $scope.askWhy(why, c2);
        }
      };
      $scope.noteCorrect = function(text) {
        $scope.why = text;
        return $timeout((function() {
          return $scope.why = void 0;
        }), 5000);
      };
      $scope.selected = function(op, index) {
        return $scope.operator === op && $scope.index === index;
      };
      shuffleArray = function(array) {
        var m, t;
        m = array.length;
        while (m) {
          i = Math.floor(Math.random() * m--);
          t = array[m];
          array[m] = array[i];
          array[i] = t;
        }
        return array;
      };
      $scope.askWhy = function(correctWhy, correctAnswer) {
        var k, uniqueWhys, _j, _k, _len, _ref;
        uniqueWhys = {};
        $scope.askWhys = [];
        for (i = _j = 0; _j <= 3; i = ++_j) {
          uniqueWhys[i] = $scope.whys[parseInt(Math.random() * $scope.whys.length)];
        }
        uniqueWhys.correct = correctWhy;
        _ref = Object.keys(uniqueWhys);
        for (_k = 0, _len = _ref.length; _k < _len; _k++) {
          k = _ref[_k];
          $scope.askWhys.push(uniqueWhys[k]);
        }
        $scope.askWhys = shuffleArray($scope.askWhys);
        return $scope.correctAnswer = correctAnswer;
      };
      $scope.answerWhy = function(answer) {
        console.log("Answer: " + answer);
        $scope.correct = void 0;
        if ($scope.correctWhy === answer) {
          $scope.askWhys = [];
          $scope.correct = "yes";
          return $timeout((function() {
            $scope.correct = void 0;
            return $scope.askWhys = [];
          }), 5000);
        } else {
          return $scope.correct = "no";
        }
      };
      $scope.complexities = ["O(1)", "O(n)"];
      $scope.processWhys = function() {
        var k, keys, the_why, type, _j, _len, _ref, _results;
        $scope.whys = [];
        _ref = $scope.types;
        _results = [];
        for (_j = 0, _len = _ref.length; _j < _len; _j++) {
          type = _ref[_j];
          keys = Object.keys(type.operations);
          _results.push((function() {
            var _k, _len1, _results1;
            _results1 = [];
            for (_k = 0, _len1 = keys.length; _k < _len1; _k++) {
              k = keys[_k];
              the_why = type.operations[k].why;
              console.log("Processing " + k + ": " + the_why);
              _results1.push($scope.whys.push(the_why));
            }
            return _results1;
          })());
        }
        return _results;
      };
      $scope.types = [
        {
          name: "single linked unsorted list",
          operations: {
            'search(L,k)': {
              c: 'O(n)',
              why: '1231232312'
            },
            'insert(L,x)': {
              c: 'O(1)',
              why: 'ok212312'
            },
            'delete(K,x)': {
              c: 'O(n)',
              why: 'um...123123'
            },
            'successor(L,x)': {
              c: 'O(n)',
              why: 'sdas 123123123'
            },
            'predecessor(L,x)': {
              c: ' O(n)',
              why: 'sdasd 1231312'
            },
            'min(L)': {
              c: 'O(n)',
              why: 'asdas 12312 d'
            },
            'max(L)': {
              c: 'O(n)',
              why: 'asdads 12312312'
            }
          }
        }, {
          name: "double linked unsorted list",
          operations: {
            'search(L,k)': {
              c: 'O(n)',
              why: 'hi there123 23131 2313'
            },
            'insert(L,x)': {
              c: 'O(1)',
              why: 'ok 123123 13'
            },
            'delete(K,x)': {
              c: 'O(1)',
              why: 'um...12313345345e'
            },
            'successor(L,x)': {
              c: 'O(n)',
              why: 'sdas 234234 '
            },
            'predecessor(L,x)': {
              c: ' O(n)',
              why: 'sdasd 32423 4 23'
            },
            'min(L)': {
              c: 'O(n)',
              why: 'asdasd 234 234 234 '
            },
            'max(L)': {
              c: 'O(n)',
              why: 'asdads 234 234 234 234 '
            }
          }
        }, {
          name: "single linked sorted list",
          operations: {
            'search(L,k)': {
              c: 'O(n)',
              why: 'hi theredfsdfs '
            },
            'insert(L,x)': {
              c: 'O(n)',
              why: 'oksdf fsd dsf sdf'
            },
            'delete(K,x)': {
              c: 'O(n)',
              why: 'um...s dfsdf sdf'
            },
            'successor(L,x)': {
              c: 'O(1)',
              why: 'sdass dfsdf sdf '
            },
            'predecessor(L,x)': {
              c: ' O(n)',
              why: 'sdasd sfsdfsdfsdf'
            },
            'min(L)': {
              c: 'O(1)',
              why: 'asdasd sdfsdf'
            },
            'max(L)': {
              c: 'O(1)',
              why: 'asdads s dfsdfsdf'
            }
          }
        }, {
          name: "double linked sorted list",
          operations: {
            'search(L,k)': {
              c: 'O(n)',
              why: 'hi there ad q3da d'
            },
            'insert(L,x)': {
              c: 'O(n)',
              why: 'ok2344 234 234'
            },
            'delete(K,x)': {
              c: 'O(1)',
              why: 'um...dfgr56gf'
            },
            'successor(L,x)': {
              c: 'O(1)',
              why: 'sdas f45dfdfg'
            },
            'predecessor(L,x)': {
              c: ' O(1)',
              why: 'sdasddgf 456 gdg'
            },
            'min(L)': {
              c: 'O(1)',
              why: 'asdasd fg3fdgdfg'
            },
            'max(L)': {
              c: 'O(1)',
              why: 'asdads dfg34tdfg'
            }
          }
        }
      ];
      return $scope.init = function() {
        $scope.operations = Object.keys($scope.types[$scope.types.length - 1].operations);
        return $scope.processWhys();
      };
    }
  ]);

}).call(this);

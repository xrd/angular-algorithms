(function() {
  var mod;

  mod = angular.module('AnimateAlgorithms', []);

  mod.service('Algorithm', [
    '$timeout', function($timeout) {
      var addArrayItemToWorldState, animate, printCount, reallyAnimate, reset, save, world;
      reset = function() {
        world.states = [];
        return world.the_state = {};
      };
      save = function(arr) {
        return world.states.push({
          marking: arr != null ? arr.marking : void 0,
          primes: angular.copy(arr != null ? arr.primes : void 0),
          looking: arr != null ? arr.looking : void 0,
          found: arr != null ? arr.found : void 0,
          p: arr != null ? arr.p : void 0,
          numbers: angular.copy(arr != null ? arr.numbers : void 0)
        });
      };
      animate = function(stepInt) {
        return $timeout((function() {
          console.log("Starting animation...");
          return reallyAnimate(stepInt);
        }), 2000);
      };
      printCount = 0;
      addArrayItemToWorldState = function(x, i, obj) {
        var k, _i, _len, _ref;
        if (obj instanceof Object) {
          console.log("Found hash obj");
          _ref = Object.keys(obj);
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            k = _ref[_i];
            if (printCount > 1000 && printCount < 1030) {
              console.log("Old/New", world.the_state[x][i][k], obj[k]);
            }
            if (!world.the_state[x][i]) {
              world.the_state[x][i] = {};
            }
            world.the_state[x][i][k] = obj[k];
          }
        } else {
          world.the_state[x][i] = obj;
        }
        return printCount += 1;
      };
      reallyAnimate = function(stepInt) {
        var i, new_state, type, x;
        if (world.states.length > 1) {
          new_state = world.states.shift();
          for (x in new_state) {
            type = Object.prototype.toString.call(new_state[x]);
            if (type === "[object Array]") {
              if (!world.the_state[x]) {
                world.the_state[x] = [];
              }
              for (i in new_state[x]) {
                addArrayItemToWorldState(x, i, new_state[x][i]);
              }
            } else {
              world.the_state[x] = new_state[x];
            }
          }
          return $timeout((function() {
            return reallyAnimate(stepInt);
          }), stepInt);
        }
      };
      world = {
        states: [],
        the_state: {},
        animate: animate,
        save: save,
        reset: reset
      };
      return world;
    }
  ]);

}).call(this);

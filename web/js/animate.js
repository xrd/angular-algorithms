(function() {
  var mod;

  mod = angular.module('AnimateAlgorithms', []);

  mod.service('Algorithm', [
    '$timeout', function($timeout) {
      var addArrayItemToWorldState, animate, reallyAnimate, reset, save, world;
      reset = function() {
        world.states = [];
        return world.the_state = {};
      };
      save = function(arr) {
        var k, new_obj, _i, _len, _ref;
        new_obj = {};
        _ref = Object.keys(arr);
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          k = _ref[_i];
          new_obj[k] = angular.copy(arr[k]);
        }
        return world.states.push(new_obj);
      };
      animate = function(stepInt) {
        return $timeout((function() {
          return reallyAnimate(stepInt);
        }), 2000);
      };
      addArrayItemToWorldState = function(x, i, obj) {
        var k, _i, _len, _ref, _results;
        if (obj instanceof Object) {
          _ref = Object.keys(obj);
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            k = _ref[_i];
            if (!world.the_state[x][i]) {
              world.the_state[x][i] = {};
            }
            _results.push(world.the_state[x][i][k] = obj[k]);
          }
          return _results;
        } else {
          return world.the_state[x][i] = obj;
        }
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

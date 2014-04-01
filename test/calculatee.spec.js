(function() {
  'use strict';
  describe("Test calculation of e", function() {
    var ctrl, scope;
    ctrl = void 0;
    scope = void 0;
    beforeEach(function() {
      return module("gi");
    });
    beforeEach(inject(function($controller, $rootScope) {
      scope = $rootScope.$new();
      return ctrl = $controller('CalculateECtrl', {
        $scope: scope
      });
    }));
    describe("#sum", function() {
      return it("should sum proper value of e for first three values", function() {
        var e;
        e = scope.sum(0);
        expect(e).toBe(1);
        e = scope.sum(1);
        expect(e).toBe(2);
        e = scope.sum(2);
        expect(e).toBe(2.5);
        e = scope.sum(3);
        expect(parseInt(e * 100)).toBe(266);
        e = scope.sum(4);
        return expect(parseInt(e * 100)).toBe(270);
      });
    });
    return describe("#time", function() {
      return it("should build timing information", function() {
        var count, num, _i, _ref;
        scope.data = [];
        scope.data[0] = {};
        scope.data[0].data = [];
        count = 100;
        for (num = _i = 0, _ref = count / 10; 0 <= _ref ? _i < _ref : _i > _ref; num = 0 <= _ref ? ++_i : --_i) {
          scope.time(num * 10);
        }
        return expect(scope.data[0].data.length).toEqual(count / 10);
      });
    });
  });

}).call(this);

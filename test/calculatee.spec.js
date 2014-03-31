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
        scope.time(2);
        expect(scope.data[0].label).toBeTruthy();
        return expect(scope.data.length).toEqual(2);
      });
    });
  });

}).call(this);

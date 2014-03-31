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
    return describe("#calculate", function() {
      return it("should calculate proper value of e for first three values", function() {
        console.log("The scope: " + scope);
        scope.calculate(0);
        expect(scope.e).toBe(1);
        scope.calculate(1);
        expect(scope.e).toBe(2);
        scope.calculate(2);
        expect(scope.e).toBe(2.5);
        scope.calculate(3);
        return expect(parseInt(scope.e * 100)).toBe(267);
      });
    });
  });

}).call(this);

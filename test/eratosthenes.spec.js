(function() {
  'use strict';
  describe("Test sieve of eratosthenes", function() {
    var ctrl, scope;
    ctrl = void 0;
    scope = void 0;
    beforeEach(function() {
      return module("gi");
    });
    beforeEach(inject(function($controller, $rootScope) {
      scope = $rootScope.$new();
      return ctrl = $controller('EratosthenesCtrl', {
        $scope: scope
      });
    }));
    return describe("#calculateSoE", function() {
      return it("build a list of numbers", function() {
        var NUMBER_COUNT;
        NUMBER_COUNT = 100;
        scope.generateNumbers(NUMBER_COUNT);
        return expect(scope.numbers.length).toEqual(NUMBER_COUNT - 1);
      });
    });
  });

}).call(this);

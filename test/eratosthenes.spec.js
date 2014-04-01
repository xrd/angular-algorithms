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
      it("build a list of numbers", function() {
        var NUMBER_COUNT;
        NUMBER_COUNT = 1000;
        scope.generateNumbers(NUMBER_COUNT);
        return expect(scope.numbers.length).toEqual(NUMBER_COUNT - 1);
      });
      return it("calculates the first primes", function() {
        var NUMBER_COUNT;
        NUMBER_COUNT = 10;
        scope.generateNumbers(NUMBER_COUNT);
        scope.calculateSoE();
        expect(scope.number(3)).toEqual({
          prime: true
        });
        expect(scope.number(5)).toEqual({
          prime: true
        });
        expect(scope.number(7)).toEqual({
          prime: true
        });
        return expect(scope.number(8)).toEqual({
          prime: false
        });
      });
    });
  });

}).call(this);

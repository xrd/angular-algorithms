(function() {
  'use strict';
  describe("Test prime calculation", function() {
    var ctrl, scope, timeout;
    ctrl = void 0;
    scope = void 0;
    timeout = void 0;
    beforeEach(function() {
      return module("gi");
    });
    beforeEach(inject(function($controller, $rootScope, $timeout) {
      scope = $rootScope.$new();
      timeout = function(fn, time) {
        return fn();
      };
      return ctrl = $controller('PrimeCalcCtrl', {
        $scope: scope,
        $timeout: timeout
      });
    }));
    return describe("#calculateSoE", function() {
      beforeEach(function() {
        scope.save = angular.noop;
        return scope.startAnimation = angular.noop;
      });
      it("uses proper indexing (we want to ask for '1' and get back the number '1')", function() {
        scope.generateNumbers(100);
        return expect(scope.numbers[1].number).toBe(1);
      });
      it("calculates the first primes", function() {
        var NUMBER_COUNT;
        NUMBER_COUNT = 10;
        scope.generateNumbers(NUMBER_COUNT);
        scope.SieveOfE();
        expect(scope.numbers[5].prime).toBeTruthy();
        expect(scope.numbers[8].prime).toBeFalsy();
        return expect(scope.primes).toEqual([3, 5, 7]);
      });
      it("should not make the last item in the list prime", function() {
        scope.generateNumbers(100);
        scope.SieveOfE();
        return expect(scope.primes[100]).not.toEqual(100);
      });
      return it("build a list of numbers", function() {
        var NUMBER_COUNT;
        NUMBER_COUNT = 1000;
        scope.generateNumbers(NUMBER_COUNT);
        return expect(scope.primes.length).toEqual(0);
      });
    });
  });

}).call(this);

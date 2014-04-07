(function() {
  'use strict';
  describe("Build out quiz", function() {
    var ctrl, httpBackend, scope;
    ctrl = void 0;
    scope = void 0;
    httpBackend = void 0;
    beforeEach(function() {
      return module("gi");
    });
    beforeEach(inject(function($controller, $rootScope, $httpBackend) {
      httpBackend = $httpBackend;
      $httpBackend.when('GET', 'big_o.json').respond(BIG_O);
      scope = $rootScope.$new();
      return ctrl = $controller('BigOCtrl', {
        $scope: scope
      });
    }));
    afterEach(function() {
      httpBackend.verifyNoOutstandingExpectation();
      return httpBackend.verifyNoOutstandingRequest();
    });
    describe("#exercise1", function() {
      return it("should get a value for 1", function() {
        console.log("For 1: " + scope.exercise1(1));
        console.log("For 1: " + scope.exercise1(2));
        console.log("For 1: " + scope.exercise1(3));
        console.log("For 1: " + scope.exercise1(4));
        return console.log("For 1: " + scope.exercise1(5));
      });
    });
    return describe("#getNextRandom", function() {
      return it("should get random items each time", function() {
        var index1, index2, index3;
        scope.init();
        httpBackend.flush();
        index1 = scope.getNextRandom();
        index2 = scope.getNextRandom();
        index3 = scope.getNextRandom();
        expect(index1).toBeTruthy();
        expect(index1).not.toEqual(index2);
        expect(index2).not.toEqual(index3);
        return expect(index1).not.toEqual(index3);
      });
    });
  });

}).call(this);

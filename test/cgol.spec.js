(function() {
  describe("Conways Game of Life", function() {
    var ctrl, scope;
    ctrl = void 0;
    scope = void 0;
    beforeEach(function() {
      return module("gi");
    });
    beforeEach(inject(function($controller, $rootScope) {
      scope = $rootScope.$new();
      return ctrl = $controller('CgolCtrl', {
        $scope: scope
      });
    }));
    it("should build a matrix", function() {
      scope.buildMatrix();
      return expect(scope.matrix.length).toEqual(scope._grid_size);
    });
    return it("should do SOMETHING!", function() {
      spyOn(scope, "wait").andCallFake((function() {
        return console.log("Done");
      }));
      scope.grid_size(3);
      scope.living(1, 1);
      return scope.tick();
    });
  });

}).call(this);

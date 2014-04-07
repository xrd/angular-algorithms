describe "Conways Game of Life", ->

        ctrl = undefined
        scope = undefined
        
        beforeEach () ->
                module( "gi" )
        
        beforeEach inject ($controller, $rootScope ) ->
                scope = $rootScope.$new()
                ctrl = $controller( 'CgolCtrl', { $scope: scope } )

        it "should build a matrix", ->
                scope.buildMatrix()
                expect( scope.matrix.length ).toEqual scope._grid_size

        it "should do SOMETHING!", ->
                spyOn( scope, "wait" ).andCallFake ( () -> console.log "Done" )
                scope.grid_size( 3 )
                scope.living( 1, 1 )
                scope.tick()

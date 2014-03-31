'use strict'

describe "Test calculation of e", () ->
        ctrl = undefined
        scope = undefined
        
        beforeEach () ->
                module( "gi" )
        
        beforeEach inject ($controller, $rootScope ) ->
                scope = $rootScope.$new()
                ctrl = $controller( 'CalculateECtrl', { $scope: scope } )

        describe "#sum", ->
                it "should sum proper value of e for first three values", ->
                        e = scope.sum( 0 )
                        expect( e ).toBe( 1 )
                        e = scope.sum( 1 )
                        expect( e ).toBe( 2 )
                        e = scope.sum( 2 )
                        expect( e ).toBe( 2.5 )
                        e = scope.sum( 3 )
                        expect( parseInt( e * 100 ) ).toBe( 266 )
                        e = scope.sum( 4 )
                        expect( parseInt( e * 100 ) ).toBe( 270 )


        describe "#time", ->
                it "should build timing information", ->
                        scope.time( 2 )
                        expect( scope.data[0].label ).toBeTruthy()
                        expect( scope.data.length ).toEqual( 2 )
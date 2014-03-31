'use strict'

describe "Test calculation of e", () ->
        ctrl = undefined
        scope = undefined
        
        beforeEach () ->
                module( "gi" )
        
        beforeEach inject ($controller, $rootScope ) ->
                scope = $rootScope.$new()
                ctrl = $controller( 'CalculateECtrl', { $scope: scope } )

        describe "#calculate", ->
                it "should calculate proper value of e for first three values", ->
                        console.log "The scope: #{scope}"
                        scope.calculate( 0 )
                        expect( scope.e ).toBe( 1 )
                        scope.calculate( 1 )
                        expect( scope.e ).toBe( 2 )
                        scope.calculate( 2 )
                        expect( scope.e ).toBe( 2.5 )
                        scope.calculate( 3 )
                        expect( parseInt( scope.e * 100 ) ).toBe( 267 )

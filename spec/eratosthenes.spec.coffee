'use strict'

describe "Test sieve of eratosthenes", () ->
        ctrl = undefined
        scope = undefined
        
        beforeEach () ->
                module( "gi" )
        
        beforeEach inject ($controller, $rootScope ) ->
                scope = $rootScope.$new()
                ctrl = $controller( 'EratosthenesCtrl', { $scope: scope } )

        describe "#calculateSoE", ->

                it "build a list of numbers", ->
                        NUMBER_COUNT = 100
                        scope.generateNumbers( NUMBER_COUNT )
                        expect( scope.numbers.length ).toEqual( NUMBER_COUNT - 1 )

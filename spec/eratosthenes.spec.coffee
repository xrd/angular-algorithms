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
                        NUMBER_COUNT = 1000
                        scope.generateNumbers( NUMBER_COUNT )
                        expect( scope.numbers.length ).toEqual( NUMBER_COUNT - 1 )

                it "calculates the first primes", ->
                        NUMBER_COUNT = 10
                        scope.generateNumbers( NUMBER_COUNT )
                        scope.calculateSoE()
                        expect( scope.number(3) ).toEqual { prime: true }
                        expect( scope.number(5) ).toEqual { prime: true }
                        expect( scope.number(7) ).toEqual { prime: true }
                        expect( scope.number(8) ).toEqual { prime: false }

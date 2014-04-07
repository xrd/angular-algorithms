'use strict'

describe "Test prime calculation", () ->
        ctrl = undefined
        scope = undefined
        timeout = undefined
        
        beforeEach () ->
                module( "gi" )
        
        beforeEach inject ($controller, $rootScope, $timeout ) ->
                scope = $rootScope.$new()
                timeout = (fn, time) ->
                        fn()
                ctrl = $controller( 'PrimeCalcCtrl', { $scope: scope, $timeout: timeout } )

        describe "#calculateSoE", ->

                it "uses proper indexing (we want to ask for '1' and get back the number '1')", ->
                        scope.generateNumbers( 100 )
                        expect( scope.numbers[1].number ).toBe 1
                        
                it "calculates the first primes", ->
                        NUMBER_COUNT = 10
                        scope.generateNumbers( NUMBER_COUNT )
                        scope.SieveOfE()
                        expect( scope.numbers[5].prime ).toBeTruthy() 
                        expect( scope.numbers[8].prime ).toBeFalsy()
                        expect( scope.primes ).toEqual( [ 3, 5, 7 ] )

                it "should not make the last item in the list prime", ->
                        scope.generateNumbers( 100 )
                        scope.SieveOfE()
                        expect( scope.primes[100] ).not.toEqual( 100 )

                it "build a list of numbers", ->
                        NUMBER_COUNT = 1000
                        scope.generateNumbers( NUMBER_COUNT )
                        expect( scope.primes.length ).toEqual 0


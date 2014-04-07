'use strict'

describe "Build out quiz", () ->
        ctrl = undefined
        scope = undefined
        httpBackend = undefined
        
        beforeEach () ->
                module( "gi" )
        
        beforeEach inject ($controller, $rootScope, $httpBackend ) ->
                httpBackend = $httpBackend
                $httpBackend.when( 'GET', 'big_o.json').respond( BIG_O )
                scope = $rootScope.$new()
                ctrl = $controller( 'BigOCtrl', { $scope: scope } )

        afterEach () ->
                httpBackend.verifyNoOutstandingExpectation()
                httpBackend.verifyNoOutstandingRequest()

        describe "#exercise1", ->
                it "should get a value for 1", ->
                        console.log "For 1: " + scope.exercise1(1)
                        console.log "For 1: " + scope.exercise1(2)
                        console.log "For 1: " + scope.exercise1(3)
                        console.log "For 1: " + scope.exercise1(4)
                        console.log "For 1: " + scope.exercise1(5)
                

        describe "#getNextRandom", ->
                it "should get random items each time", ->
                        scope.init()
                        httpBackend.flush();
                        index1 = scope.getNextRandom()
                        index2 = scope.getNextRandom()
                        index3 = scope.getNextRandom()
                        expect( index1 ).toBeTruthy()
                        expect( index1 ).not.toEqual index2
                        expect( index2 ).not.toEqual index3
                        expect( index1 ).not.toEqual index3
                        
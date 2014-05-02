# 'use strict'


@app = angular.module 'gi', [ 'ngResource', 'ngRoute', 'ngAnimate', 'AnimateAlgorithms' ]

@app.config [ '$routeProvider', '$locationProvider', ( $routeProvider, $locationProvider ) ->
        $routeProvider.when '/algorithms/:item',
                templateUrl: (params) -> params.item + ".html?rand=#{parseInt(10000*Math.random())}",
        $routeProvider.otherwise( redirectTo: '' )
        # $locationProvider.html5Mode(true)
        ]

@app.factory 'Topic', [ '$resource', ( $resource ) ->
        $resource ':action.json', {},
                all: { params: { action: 'topic' }, isArray: false, method: 'GET' }
        ]

@app.controller 'GICtrl', [ '$scope', ($scope) ->

        $scope.enabled = { "enabled" : true }

        $scope.draw = (data, xTick=10 ) ->

                $scope.options = {
                        lines: { show: true },
                        points: { show: true },
                        xaxis: { tickDecimals: 1, tickSize: xTick }
                        yaxis: { tickDecimals: 1 }
                }

                placeholder = $("#placeholder")
                $.plot placeholder, data, $scope.options
        ]

@app.controller 'TopicsCtrl', [ '$scope', 'Topic', ( $scope, Topic ) ->
        $scope.topics = []
        Topic.all {}, (response) ->
                for key,value of response.items
                        console.log('%s %s', key, value)
                        $scope.topics.push response.items[key] if key and value
        ]


@app.controller 'PrimeCalcCtrl', [ '$scope', 'Algorithm', ($scope, Algorithm) ->

        $scope.algorithm = undefined
        $scope.algorithms = [ 'SieveOfE', 'Other', 'Another' ]
        $scope.bounds = 102
        $scope.p = undefined

        $scope.algorithm = Algorithm

        $scope.stepInt = 250

        $scope.clearPrimes = () ->
                $scope.primes = []

        $scope.clearPrimes()
        
        $scope.runAll = () ->
                for a in $scope.algorithms
                        $scope.clearPrimes()
                        $scope[a]()

        $scope.setCallee = () ->
                try
                        throw new Error( "Getting stack trace" )
                catch e
                        # Break up the call stack and grab the third one
                        # since first is the line "Getting stack trace"
                        # and second is the setCallee method
                        stack = if e.stack then  e.stack else e.stacktrace
                        lines = stack.split( /\n/ )
                        without_ln = lines[2].split( /\(/ )[0]
                        func = without_ln.split( /\./ )[2]
                        $scope.callee = func

        markC = (n) -> $scope.numbers[n].composite = true 
        isCorP = (i) -> $scope.numbers[i].composite or $scope.numbers[i].prime

        
        $scope.markThePs = ( n=2 ) ->
                if ($scope.p * n) <= $scope.bounds
                        toMark = $scope.p * n
                        markC( toMark )
                        Algorithm.save( { marking: toMark, primes: $scope.primes, numbers: $scope.numbers, p: $scope.p } )
                        $scope.markThePs(n+1)
                else
                        keepGoing = false
                        for i in [$scope.p+1...$scope.bounds]
                                Algorithm.save( { looking: i, primes: $scope.primes, numbers: $scope.numbers, p: $scope.p } )
                                if not isCorP( i )
                                        keepGoing = true
                                        $scope.primes.push i
                                        $scope.numbers[i].prime = true
                                        $scope.p = i
                                        Algorithm.save( { found: i, primes: $scope.primes, numbers: $scope.numbers, p: $scope.p } )
                                        $scope.markThePs()
                                        break
                        $scope.done = true unless keepGoing

        $scope.SieveOfE = () ->
                $scope.primes = [1,2]
                
                Algorithm.reset()
                $scope.the_state = $scope.algorithm.the_state
                $scope.states = $scope.algorithm.states
                
                $scope.numbers[0].prime = true
                $scope.numbers[1].prime = true
                $scope.numbers[2].prime = true
                $scope.p = 2
                $scope.markThePs()
                $scope.algorithm.animate( $scope.stepInt )

        $scope.generateNumbers = (bounds) ->
                $scope.bounds = bounds
                $scope.numbers = []
                if bounds > 2
                        for i in [0..bounds]
                                $scope.numbers.push { prime: false, number: i }

        $scope.start = () ->
                $scope.primes = []
                $scope.generateNumbers($scope.bounds)
                $scope.calculate()

        $scope.calculate = () ->
                $scope.algorithm = $scope.algorithms[0] unless $scope.algorithm
                $scope[$scope.algorithm]()
                                                
        ]
                

@app.controller 'StrictModeCtrl', [ '$scope', ($scope) ->

        ]


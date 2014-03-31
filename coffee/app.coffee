'use strict'

@app = angular.module 'gi', [ 'ngResource', 'ngRoute' ]

@app.config [ '$routeProvider', '$locationProvider', ( $routeProvider, $locationProvider ) ->
        $routeProvider.when '/algorithms/:item',
                templateUrl: (params) -> "/" + params.item + ".html?rand=#{parseInt(10000*Math.random())}",
        $routeProvider.otherwise( redirectTo: '/' )
        # $locationProvider.html5Mode(true)
        ]

@app.factory 'Topic', [ '$resource', ( $resource ) ->
        $resource '/:action.json', {},
                all: { params: { action: 'topic' }, isArray: false, method: 'GET' }
        ]

@app.controller 'GICtrl', [ '$scope', ($scope) ->
        $scope.options = {
                lines: { show: true },
                points: { show: true },
                xaxis: { tickDecimals: 0, tickSize: 1 }
                }

        $scope.draw = (data) ->
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

@app.controller 'CalculateECtrl', [ '$scope', ($scope) ->

        $scope.summer = $scope.sum

        $scope.factorial = (n) ->
                #console.log "Inside factorial for #{n}"
                if 0 == n
                        1
                else
                        n * $scope.factorial( n - 1 )

        $scope.sum = ( n ) ->
                if 0 == n
                        1
                else
                        fact = $scope.factorial( n )
                        # console.log "Fact for #{n-1}: #{fact}"
                        $scope.sum( n - 1 ) + ( 1.0 / fact )

        $scope.ss = (msg) ->
                $scope.status = msg
                console.log msg

        $scope.count = 10

        $scope.timeIterator = (n) ->
                $scope.data = []
                $scope.timings = []
                $scope.ss "Starting timing"
                for num in [1..n+1]
                        $scope.time( num )
                        $scope.draw($scope.data)                      
                $scope.ss "Starting timing"

        $scope.time = (n) ->
                $scope.data = [] unless $scope.data
                minusOne = n-1
                $scope.ss "Timing iteraton: #{n}"
                $scope.data[minusOne] = {}
                start = new Date().getMilliseconds()
                $scope.data[minusOne].label = "Timing ##{minusOne}"
                $scope.sum( minusOne )
                stop = new Date().getMilliseconds()
                $scope.data[minusOne].data = []
                $scope.data[minusOne].data.push( minusOne )
                $scope.data[minusOne].data.push( stop - start )

        ]

@app.controller 'HeapsortCtrl', [ '$scope', ($scope) ->

        $scope.placeholder = $("#placeholder");
                        
        data = [ {
                "label": "Europe (EU27)",
                "data": [[1999, 3.0], [2000, 3.9], [2001, 2.0], [2002, 1.2], [2003, 1.3], [2004, 2.5], [2005, 2.0], [2006, 3.1], [2007, 2.9], [2008, 0.9]]
                } ]

        $scope.draw( data )

        ]
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

        $scope.start = (n) ->
                console.log "Starting to calculate"
                $scope.e = 0
                $scope.e = $scope.calculate( n, $scope.e )

        $scope.factorial = (n) ->
                console.log "Inside factorial for #{n}"
                if 0 == n
                        1
                else
                        n * $scope.factorial( n - 1 )

        $scope.calculate = ( n, current=0 ) ->
                console.log "Inside calculate with #{n}, #{current}"
                if 0 == n
                        1
                else 
                        current + $scope.calculate( 1 / $scope.factorial( n-1 ) )

        ]

@app.controller 'HeapsortCtrl', [ '$scope', ($scope) ->

        $scope.placeholder = $("#placeholder");
                        
        data = [ {
                "label": "Europe (EU27)",
                "data": [[1999, 3.0], [2000, 3.9], [2001, 2.0], [2002, 1.2], [2003, 1.3], [2004, 2.5], [2005, 2.0], [2006, 3.1], [2007, 2.9], [2008, 0.9]]
                } ]

        $scope.draw( data )

        ]
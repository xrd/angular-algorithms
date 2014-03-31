@app = angular.module 'gi', [ 'ngResource', 'ngRoute' ]

@app.config [ '$routeProvider', '$locationProvider', ( $routeProvider, $locationProvider ) ->
        $routeProvider.when '/algorithms/:item',
                templateUrl: (params) -> "/" + params.item + ".html",
        $routeProvider.otherwise( redirectTo: '/' )
        # $locationProvider.html5Mode(true)
        ]

@app.factory 'Topic', [ '$resource', ( $resource ) ->
        $resource '/:action.json', {},
                all: { params: { action: 'topic' }, isArray: false, method: 'GET' }
        ]

@app.controller 'GICtrl', [ '$scope', ($scope) ->

        ]

@app.controller 'TopicsCtrl', [ '$scope', 'Topic', ( $scope, Topic ) ->
        $scope.topics = []
        Topic.all {}, (response) ->
                for key,value of response.items
                        console.log('%s %s', key, value)
                        $scope.topics.push response.items[key] if key and value
        ]

@app.controller 'HeapsortCtrl', [ '$scope', ($scope) ->

        options = {
                lines: { show: true },
                points: { show: true },
                xaxis: { tickDecimals: 0, tickSize: 1 }
                }
                        
        data = {
                "label": "Europe (EU27)",
                "data": [[1999, 3.0], [2000, 3.9], [2001, 2.0], [2002, 1.2], [2003, 1.3], [2004, 2.5], [2005, 2.0], [2006, 3.1], [2007, 2.9], [2008, 0.9]]
                }
        placeholder = $("#placeholder");
        $.plot(placeholder, data, options)

        ]
@app = angular.module 'gi', [ 'ngResource', 'ngRoute' ]

@app.config [ '$routeProvider', '$locationProvider', ( $routeProvider, $locationProvider ) ->
        $routeProvider.when '/algorithm/:item',
                templateUrl: (params) -> '/t/' + params.item,
        $routeProvider.otherwise( redirectTo: '/' )
        $locationProvider.html5Mode(true)
        ]



@app.factory 'Topic', [ '$resource', ( $resource ) ->
        $resource '/:action.json', {},
                all: { params: { action: 'topic' }, isArray: true, method: 'GET' }
        ]

@app.controller 'GICtrl', [ '$scope', ($scope) ->

        ]

@app.controller 'TopicsCtrl', [ '$scope', 'Topic', ( $scope, Topic ) ->
        $scope.topics = Topic.all() # [ 'Heapsort', 'Quicksort' ]
        ]
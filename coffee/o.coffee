@app.controller 'LgCtrl', [ '$scope', ($scope) ->

        $scope.properties {
                
                notes: [
                        "Logarithm is an inverse exponential function"
                        "log n^b == b * log n"
                        "log[a] b = ( log[c] b / log[c] a ), which implies log[a] b * log[c] a = log[c] b, easy to shift base"
                        "base has very little impact on the growth rate"
                        "growth rate of any polynomial function is O(log n)"
                        ]
                
                }

        ]

@app.controller 'BigOCtrl', ['$scope', '$http', ($scope, $http) ->

        $scope.properties = {
                notes: [
                        "inverse ackermann's function: the slowest growing complexity function. Value of a(n) < 5 for all known values of n"
                        ]
                }

        $scope.highestPossible = 1000

        $scope.exercise1 = (n) ->
                r = 0
                for i in [1..n-1]
                        for j in [i+1..n]
                                for k in [1..j]
                                        r = r + 1
                r

        $scope.getNextRandom = () ->
                attempt
                while undefined == index 
                        attempt = parseInt( $scope.data.length*Math.random() )
                        index = attempt unless $scope.data[attempt].completed
                $scope.data[attempt].completed = true
                index

        $scope.start = () ->
                console.log "Hi there"

        $scope.next = () ->
                $scope.getNextRandom()

        $scope.init = () ->
                $http.get( 'big_o.json' ).success (data) ->
                        $scope.data = data
        
        ]


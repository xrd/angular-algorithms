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
                # console.log msg

        $scope.count = 100

        $scope.timeAndPlot = (n) ->
                $scope.data = []
                $scope.data[0] = {}
                $scope.data[0].label = "e"
                $scope.data[0].data = []
                $scope.ss "Starting timing"
                for num in [0...(n/10)]
                        $scope.time( num*10 )
                        $scope.draw($scope.data, n/10)                      
                $scope.ss "Starting timing"

        $scope.time = (n) ->
                $scope.ss "Timing iteraton: #{n+1}"
                start = performance.now()
                $scope.ss "Start: #{start}"
                $scope.sum( n )
                stop = performance.now()
                $scope.ss "Stop: #{stop}"
                the_data = [ n, ( stop - start ) ]
                $scope.data[0].data.push the_data

        ]


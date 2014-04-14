@app.controller 'ShortestPathCtrl', [ '$scope', ($scope) ->

        $scope.algorithms = [
                { name: "Djikstra" },
                { name: "Checkerboard" },
                        { name: "Bellman-Ford",
                        attributes: [
                                "slower than Djikstra"
                                "can handle edge weights which have negative numbers"
                                "can detect negative cycles"
                                "Worst case: O( |V| |E| )"
                                "Worse case space: O( |V| )"
                                ]
                        }
                        { name: "Floyd-Warshall",
                        attributes: [
                                "Requires weighted graph"
                                "Finds transitive closure of a relation R"
                                "Best case: O(|V|^3)"
                                "Worst case: Theta(|V|^3)"
                                "Worst case space complexity: Omega(|V|^2)"
                                ]
                        }
                ]

        $scope.buildArray = ( name ) ->
                # Generate random costs to get to places
                $scope[name] = []
                for i in [0..$scope.n]
                        $scope[name].push []
                        for j in [0..$scope.n]
                                $scope[name][i][j] = {}

        $scope.populateBoard = () ->
                for i in [0..$scope.n]
                        for j in [0..$scope.n]
                                $scope.board[i][j] = { cost: parseInt(Math.random()*10)+1 }

        $scope.Checkerboard = () ->
                $scope.n = 10 unless $scope.n
                console.log "Inside checkerboard"
                $scope.buildArray( 'board' )
                $scope.populateBoard()
                $scope.buildArray( 'qa' ) # cost calc cache
                $scope.buildArray( 'pa' ) # predecessor array

                # Assign position in the bottom row, somewhere
                $scope.i = parseInt(Math.random()*10)
                $scope.j = 0

                $scope.computeShortestPath()

        $scope.c = (i,j) ->
                $scope.board[i][j].cost

        $scope.minCost = (i,j) ->
                if j < 1 or j > $scope.n
                        return "Infinity"
                else if i == 1
                        return $scope.c(i,j)
                else
                        return Math.min( $scope.minCost( i-1, j-1 ), $scope.minCost( i - 1, j ), $scope.minCost( i - 1, j + 1 ) ) + $scope.c( i, j )

        $scope.op = {}

        $scope.op.setInfinity = (i,j) ->
                $scope.qa[i][j] = "infinity"

        $scope.op.setFirstLevel = (x) ->
                $scope.qa[1][x] = $scope.c( 1, x )

        $scope.computeShortestPathArray = () ->
                for x in [1..$scope.n]
                        $scope.op.setFirstLevel( 1, x )
                for y in [1..$scope.n]
                        $scope.op.setInfinity( y, 0 )
                        $scope.op.setInfinity( y, $scope.n+1 )
                for y in [2..$scope.n]
                        for x in [1..$scope.n]
                                m = Math.min( $scope.qa[y-1][x-1], $scope.qa[y-1][x], $scope.qa[y-1][x+1] )
                                $scope.qa[y][x] = m + $scope.c(y,x)
                                if m == $scope.qa[y-1][x-1]
                                        $scope.pa[y][x] = -1
                                else if m == $scope.qa[y-1][x]
                                        $scope.pa[y][x] = 0
                                else
                                        $scope.pa[y][x] = 1

        $scope.computeShortestPath = () ->
                $scope.computeShortestPathArray()
                minIndex = 1
                min = $scope.qa[$scope.n][1]
                for i in [2..$scope.n]
                        if $scope.qa[$scope.n][1] < min
                                minIndex = i
                                min = $scope.qa[$scope.n][i]
                        $scope.printPath( $scope.n, minIndex )

        print = (s) -> console.log( s )

        $scope.printPath = (y,x) ->
                print x
                print "<-"
                if y == 2
                        print "#{x+$scope.pa[y][x]}"
                else
                        $scope.printPath( y-1, x + $scope.pa[y][x] )
        
        $scope['Bellman-Ford'] = () ->
                console.log "Chose belman ford"

        $scope.algorithm = undefined

        $scope.init = () ->
                console.log "Inside init"

        $scope.start = () ->
                return unless $scope.algorithm

                console.log "Algorithm: #{$scope.algorithm.name}"
                # Run the algorithm
                #
                $scope[$scope.algorithm.name]()
        ]
        

        
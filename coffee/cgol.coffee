@app.controller 'CgolCtrl', [ '$scope', '$timeout', ( $scope, $timeout ) ->

        $scope.queue = []
        BUILD_QUEUE_DELAY = 1000
        MAX_QUEUE_SIZE = 100
        $scope.matrix = undefined

        $scope.wait = ->
                $timeout $scope.cgol, BUILD_QUEUE_DELAY

        $scope.tick = ->
                # Run the rules
                # Any live cell with fewer than two live neighbours dies, as if caused by under-population.
                # Any live cell with two or three live neighbours lives on to the next generation.
                # Any live cell with more than three live neighbours dies, as if by overcrowding.
                # Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
                $scope.buildMatrix( 'next' )
                for i in [0...$scope._grid_size]
                        for j in [0...$scope._grid_size]
                                $scope.underpopulation(i,j)
                                $scope.nextgeneration(i,j)
                                $scope.overcrowding(i,j)
                                $scope.reproduction(i,j)
                                console.log "tick"

                # Push next onto the queue
                $scope.queue.push $scope['next']

        $scope.underpopulation = (i,j) ->
                # Look over adjacents to find neighbors
                neighbors = 0
                for x in [i-1...i+1]
                        for y in [j-1...j+1]
                                unless x == i and y == j
                                        neighbors +=1 if isDead( $scope.matrix[i][j] )
                console.log "Neighbor count for #{i},#{j}: #{neighbors}"
                

        isDead = (item) -> 'dead' == item.status
        isLiving = (item) -> 'live' == item.status
        setLiving = (item) -> item.status = 'live'
        setDead = (item) -> item.status = "dead"

        $scope.nextgeneration = (i,j) ->
                console.log "next generation"

        $scope.overcrowding = (i,j) ->
                console.log "overcrowding"

        $scope.reproduction = (i,j) ->
                console.log "reproduction"
                                
        $scope.grid_size = (n) ->
                $scope._grid_size = n

        $scope.living = (i,j,v) ->
                $scope.matrix[i][j] = v if v
                $scope.matrix[i][j]

        $scope.buildMatrix = (name) ->
                $scope[ if name then name else 'matrix' ] = []
                for i in [0...$scope._grid_size]
                        row = []
                        for j in [0...$scope._grid_size]
                                row.push { status: 'dead' }
                        $scope.matrix.push row

        $scope.cgol = ->
                $scope.buildMatrix()
                if $scope.queue.length > MAX_QUEUE_SIZE
                        $scope.wait()
                else
                        $scope.tick()

        $scope.start = ->
                $scope._grid_size = 20
                # start processing
                $scope.cgol()

        ]
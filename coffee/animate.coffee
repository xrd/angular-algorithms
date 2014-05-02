mod = angular.module 'AnimateAlgorithms', []

mod.service 'Algorithm', [ '$timeout', ($timeout) ->

        reset = () ->
                world.states = []
                world.the_state = {}
                
        save = (arr) ->
                # console.log "Array: %o", arr
                world.states.push {
                        marking: arr?.marking,
                        primes: angular.copy( arr?.primes ),
                        looking : arr?.looking,
                        found: arr?.found,
                        p : arr?.p,
                        numbers: angular.copy( arr?.numbers )
                        }
        animate =  (stepInt) ->
                $timeout ( () ->
                        console.log "Starting animation..."
                        reallyAnimate( stepInt ) ), 2000

        printCount = 0

        addArrayItemToWorldState = (x,i,obj) ->
                if obj instanceof Object
                        console.log "Found hash obj"
                        for k in Object.keys( obj )
                                if printCount >  1000 && printCount < 1030
                                        console.log "Old/New", world.the_state[x][i][k], obj[k]
                                world.the_state[x][i] = {} unless world.the_state[x][i]
                                world.the_state[x][i][k] = obj[k]
                else
                        world.the_state[x][i] = obj
                printCount += 1

                                                
        reallyAnimate = (stepInt) ->
                if world.states.length > 1
                        new_state = world.states.shift()
                        for x of new_state
                                type = Object.prototype.toString.call( new_state[x] )
                                # Update existing objects rather than resetting to get animations
                                if type == "[object Array]"
                                        # iterate over all of them
                                        world.the_state[x] = [] unless world.the_state[x]
                                        addArrayItemToWorldState( x, i, new_state[x][i] ) for i of new_state[x]
                                else
                                        world.the_state[x] = new_state[x] 
                        $timeout( ( () ->
                                reallyAnimate( stepInt ) ), stepInt )
        world = {
                states: []
                the_state: {}
                animate: animate
                save: save
                reset: reset
        }
                                
        world 
        ]
        

mod = angular.module 'AnimateAlgorithms', []

mod.service 'Algorithm', [ '$timeout', ($timeout) ->

        reset = () ->
                world.states = []
                world.the_state = {}
                
        save = (arr) ->
                new_obj = {}
                for k in Object.keys( arr )
                        new_obj[k] = angular.copy( arr[k] )
                world.states.push new_obj

        animate =  (stepInt) ->
                $timeout ( () ->
                        reallyAnimate( stepInt ) ), 2000

        addArrayItemToWorldState = (x,i,obj) ->
                if obj instanceof Object
                        for k in Object.keys( obj )
                                world.the_state[x][i] = {} unless world.the_state[x][i]
                                world.the_state[x][i][k] = obj[k]
                else
                        world.the_state[x][i] = obj
                                                
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
        

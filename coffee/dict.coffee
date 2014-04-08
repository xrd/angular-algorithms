@app.controller 'DictCtrl', [ '$scope', '$timeout', ($scope, $timeout) ->

        $scope.attempts = 0
        $scope.successes = 0
        $scope.selector = undefined

        $scope.selectors = []
        for i in [0..100]
                $scope.selectors.push []

        $scope.answer = (op,i,j) ->
                $scope.operator = op
                $scope.index = i
                $scope.why = undefined
                $scope.askWhys = []
                
                c = $scope.selectors[i][j]
                $scope.attempts += 1
                c2 = $scope.types[i].operations[op].c
                why = $scope.types[i].operations[op].why
                if c2 == c
                        $scope.successes += 1
                        $scope.noteCorrect( why )
                else
                        $scope.askWhy( why, c2 )

        $scope.noteCorrect = (text) ->
                $scope.why = text
                $timeout ( () -> $scope.why = undefined ), 5000

        $scope.selected = (op,index) ->
                $scope.operator == op and $scope.index == index

        # -> Fisher–Yates shuffle algorithm
        shuffleArray = (array) ->
                m = array.length

                #  While there remain elements to shuffle
                while m
                        i = Math.floor(Math.random() * m--)
                        t = array[m];
                        array[m] = array[i];
                        array[i] = t;

                array

        $scope.askWhy = (correctWhy, correctAnswer) ->
                uniqueWhys = {}
                $scope.askWhys = []
                for i in [0..3]
                        uniqueWhys[i] = $scope.whys[parseInt(Math.random()*$scope.whys.length)]
                uniqueWhys.correct = correctWhy
                for k in Object.keys uniqueWhys
                        $scope.askWhys.push uniqueWhys[k]
                $scope.askWhys = shuffleArray $scope.askWhys
                $scope.correctAnswer = correctAnswer

        $scope.answerWhy = (answer) ->
                console.log "Answer: #{answer}"
                $scope.correct = undefined
                if $scope.correctWhy == answer
                        $scope.askWhys = []
                        $scope.correct = "yes"
                        $timeout ( () -> $scope.correct = undefined; $scope.askWhys = [] ), 5000
                else
                        $scope.correct = "no"
                

        $scope.complexities = [
                "O(1)"
                "O(n)"
                ]

        $scope.processWhys = () ->
                $scope.whys = []
                for type in $scope.types
                        keys = Object.keys( type.operations )
                        for k in keys
                                the_why = type.operations[k].why
                                console.log "Processing #{k}: #{the_why}"
                                $scope.whys.push the_why

        $scope.types = [
                {
                        name: "single linked unsorted list"
                        operations: {
                                'search(L,k)': { c: 'O(n)', why: 'Worst case you need to search all the items in the list' },
                                'insert(L,x)': { c: 'O(1)', why : 'Insertion requires nothing more than connecting the head pointer to the new item' },
                                'delete(K,x)': { c: 'O(n)', why: 'To find the item for deletion you might have to search the entire list' },
                                'successor(L,x)': { c: 'O(n)', why: 'To find a successor you might have to search the entire list' },
                                'predecessor(L,x)': { c: ' O(n)', why: 'To find a predecessor you might have to search the entire list.' },
                                'min(L)': { c: 'O(n)', why: 'There is no order so you need to search the entire list in worst case' },
                                'max(L)': { c: 'O(n)', why: 'No order here, so you might need to search the entire list' }
                                }    
                },
                {
                        name: "double linked unsorted list"
                        operations: {
                                'search(L,k)': { c: 'O(n)', why: 'Not a sorted list, so worst case could require going over entire list' },
                                'insert(L,x)': { c: 'O(1)', why : 'No need to sort, so insertion just requires adjusting two pointers on the new item' },
                                'delete(K,x)': { c: 'O(1)', why: 'We are given pointer to the item, so deletion just means adjusting the two pointers which previously pointed to it' },
                                'successor(L,x)': { c: 'O(n)', why: 'Since it is unsorted we could in worst case search everything' },
                                'predecessor(L,x)': { c: ' O(n)', why: 'Unsorted, might need to search everything' },
                                'min(L)': { c: 'O(n)', why: 'Unsorted means linear search in worst case' },
                                'max(L)': { c: 'O(n)', why: 'No sorting means this is linear search' }
                                }    
                },
                {
                        name: "single linked sorted list"
                        operations: {
                                'search(L,k)': { c: 'O(n)', why: 'Even though sorted, could have to search all items' },
                                'insert(L,x)': { c: 'O(n)', why : 'Insertion in worst case could require searching to the end' },
                                'delete(K,x)': { c: 'O(n)', why: 'Need to get predecessor after deletion which requires linear time' },
                                'successor(L,x)': { c: 'O(1)', why: 'If we have pointer to this item, getting successor is easy' },
                                'predecessor(L,x)': { c: ' O(n)', why: 'Predecessor retrieval requires linear time' },
                                'min(L)': { c: 'O(1)', why: 'Sorted lists mean we can start at the head to get the min' },
                                'max(L)': { c: 'O(1)', why: 'Sorted lists mean we can start at the tail to get the max' }
                                }    
                },
                {
                        name: "double linked sorted list"
                        operations: {
                                'search(L,k)': { c: 'O(n)', why: 'Searching can require worst case linear time even when sorted' },
                                'insert(L,x)': { c: 'O(n)', why : 'Insertion can require linear worst case time' },
                                'delete(K,x)': { c: 'O(1)', why: 'If we have pointer to the item, we can just adjust pred and succ pointers'},
                                'successor(L,x)': { c: 'O(1)', why: 'If we have pointer to the item, succ is just grabbing a pointer' },
                                'predecessor(L,x)': { c: ' O(1)', why: 'Double linked lists have both pred and succ, so if we have the item, we have pred' },
                                'min(L)': { c: 'O(1)', why: 'Head gives us the min' },
                                'max(L)': { c: 'O(1)', why: 'Tail gives us the max' }
                                }
                }
                ]

        $scope.init = () ->
                $scope.operations =  Object.keys( $scope.types[$scope.types.length-1].operations )
                $scope.processWhys()



        ]
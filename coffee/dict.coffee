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
                                'search(L,k)': { c: 'O(n)', why: '1231232312' },
                                'insert(L,x)': { c: 'O(1)', why : 'ok212312' },
                                'delete(K,x)': { c: 'O(n)', why: 'um...123123' },
                                'successor(L,x)': { c: 'O(n)', why: 'sdas 123123123' },
                                'predecessor(L,x)': { c: ' O(n)', why: 'sdasd 1231312' },
                                'min(L)': { c: 'O(n)', why: 'asdas 12312 d' },
                                'max(L)': { c: 'O(n)', why: 'asdads 12312312' }
                                }    
                },
                {
                        name: "double linked unsorted list"
                        operations: {
                                'search(L,k)': { c: 'O(n)', why: 'hi there123 23131 2313' },
                                'insert(L,x)': { c: 'O(1)', why : 'ok 123123 13' },
                                'delete(K,x)': { c: 'O(1)', why: 'um...12313345345e' },
                                'successor(L,x)': { c: 'O(n)', why: 'sdas 234234 ' },
                                'predecessor(L,x)': { c: ' O(n)', why: 'sdasd 32423 4 23' },
                                'min(L)': { c: 'O(n)', why: 'asdasd 234 234 234 ' },
                                'max(L)': { c: 'O(n)', why: 'asdads 234 234 234 234 ' }
                                }    
                },
                {
                        name: "single linked sorted list"
                        operations: {
                                'search(L,k)': { c: 'O(n)', why: 'hi theredfsdfs ' },
                                'insert(L,x)': { c: 'O(n)', why : 'oksdf fsd dsf sdf' },
                                'delete(K,x)': { c: 'O(n)', why: 'um...s dfsdf sdf' },
                                'successor(L,x)': { c: 'O(1)', why: 'sdass dfsdf sdf ' },
                                'predecessor(L,x)': { c: ' O(n)', why: 'sdasd sfsdfsdfsdf' },
                                'min(L)': { c: 'O(1)', why: 'asdasd sdfsdf' },
                                'max(L)': { c: 'O(1)', why: 'asdads s dfsdfsdf' }
                                }    
                },
                {
                        name: "double linked sorted list"
                        operations: {
                                'search(L,k)': { c: 'O(n)', why: 'hi there ad q3da d' },
                                'insert(L,x)': { c: 'O(n)', why : 'ok2344 234 234' },
                                'delete(K,x)': { c: 'O(1)', why: 'um...dfgr56gf' },
                                'successor(L,x)': { c: 'O(1)', why: 'sdas f45dfdfg' },
                                'predecessor(L,x)': { c: ' O(1)', why: 'sdasddgf 456 gdg' },
                                'min(L)': { c: 'O(1)', why: 'asdasd fg3fdgdfg' },
                                'max(L)': { c: 'O(1)', why: 'asdads dfg34tdfg' }
                                }    
                }
                ]

        $scope.init = () ->
                $scope.operations =  Object.keys( $scope.types[$scope.types.length-1].operations )
                $scope.processWhys()



        ]
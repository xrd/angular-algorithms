@app.controller 'FecCtrl', [ '$scope', '$timeout', ($scope, $timeout) ->

        $scope.algorithms = [
                "3_1_repetition"
                ]

        $scope.algorithm = undefined

        $scope.init = () ->
                console.log "Inside init"

        $scope.generateBits = () ->
                $scope.bits = []
                for i in [0..100]
                        $scope.bits.push parseInt( Math.random()*2 )

        $scope.3_1_repetition = () ->
                $scope.data = $scope.generateBits()
                

        $scope.start = () ->
                $scope[$scope.algorithm]()
        
        
        ]
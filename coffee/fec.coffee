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
                        $scope.bits.push { index: i, data: parseInt( Math.random()*2 ) }

        $scope._3_1_repetition = () ->
                console.log "Starting 3 1 repetition"
                $scope.data = $scope.generateBits()

        $scope.start = () ->
                console.log "Starting: #{$scope.algorithm}"
                $scope["_"+$scope.algorithm]()
        

        ]

@app.directive 'bit', [ '$timeout', () ->

        return {
                template: 'A bit is here {{bit.data}}'
                }

        ]
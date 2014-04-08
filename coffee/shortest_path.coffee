@app.controller 'ShortestPathCtrl', [ '$scope', ($scope) ->

        $scope.algorithms = [
                { name: "Djikstra" },
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

        $scope.algorithm = undefined

        $scope.init = () ->
                console.log "Inside init"

        $scope.start = () ->
                return unless $scope.algorithm

                # Run the algorithm
                # 
        ]

        
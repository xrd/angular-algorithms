@app.controller 'SortingCtrl', [ '$scope', ( $scope ) ->

        $scope.types = [
                "Heapsort: fast sorting via data structures"
                "Mergesort: sort by divide and conquer"
                "Quicksort: sort by randomization"
                "Distribution sort: sorting via bucketing"
                "Binary search and related algorithms"
                "Divide and Conquer"
                ]        

        ]

@app.controller 'HeapsortCtrl', [ '$scope', ($scope) ->
        
        $scope.placeholder = $("#placeholder");
                        
        data = [ {
                "label": "Europe (EU27)",
                "data": [[1999, 3.0], [2000, 3.9], [2001, 2.0], [2002, 1.2], [2003, 1.3], [2004, 2.5], [2005, 2.0], [2006, 3.1], [2007, 2.9], [2008, 0.9]]
                } ]

        $scope.draw( data )

        ]


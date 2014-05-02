(function() {
  this.app.factory('Operations', function() {
    var ops;
    ops = {};
    ops.algorithms = [
      {
        name: 'bubble sort',
        description: 'go over each pair, swapping if they are not sorted. Iterate over each pair, and then go back to begining+1',
        runtime: 'O(n ^ 2)'
      }, {
        name: 'insertion sort',
        description: 'loop over all numbers (start at second). If item is smaller, keep looping until you have swapped them up.',
        runtime: 'O( n ^ 2 ) (worst case, but sorted can be much better)'
      }, {
        name: 'mergesort',
        description: 'does not rely on random access as does heapsort or quicksort so it is great for sorting linked lists. Need an extra buffer when merging.',
        runtime: 'O( n log n ) worst case'
      }, {
        name: 'quicksort',
        description: 'randomly choose a pivot, sort each item before and after. Must give a randomly sorted, sorted items guarantees O(n^2)! Randomization can fix this: permute the items to guarantee randomness even if you got a sorted array. Quicksort is 2-3 times faster than mergesort or heapsort.',
        runtime: 'averages out to O(n log n). Worst case is O(n^2) but the odds of this are small.'
      }, {
        name: 'bucketsort',
        description: 'Sort into buckets, and then use something on the buckets to sort those'
      }
    ];
    ops.ds = [
      {
        name: 'heap',
        description: 'represent binary trees without using pointers. priority queues. bubbling up and down.',
        operations: [
          {
            name: "insert"
          }, {
            name: "extract_min",
            runtime: 'O( n log n )'
          }
        ]
      }
    ];
    return ops;
  });

  this.app.controller('OpsCtrl', [
    '$scope', 'Operations', function($scope, Operations) {
      $scope.ds = Operations.ds;
      return $scope.algorithms = Operations.algorithms;
    }
  ]);

}).call(this);

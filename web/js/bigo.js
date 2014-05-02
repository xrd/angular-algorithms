(function() {
  this.app.factory('BigO', function() {
    return {
      complexities: ['O(n * log n)', 'O(n)', 'O(n^2)']
    };
  });

}).call(this);

(function() {
  this.app = angular.module('gi', ['ngResource', 'ngRoute']);

  this.app.config([
    '$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
      $routeProvider.when('/algorithms/:item', {
        templateUrl: function(params) {
          return "/" + params.item + ".html";
        }
      });
      return $routeProvider.otherwise({
        redirectTo: '/'
      });
    }
  ]);

  this.app.factory('Topic', [
    '$resource', function($resource) {
      return $resource('/:action.json', {}, {
        all: {
          params: {
            action: 'topic'
          },
          isArray: false,
          method: 'GET'
        }
      });
    }
  ]);

  this.app.controller('GICtrl', ['$scope', function($scope) {}]);

  this.app.controller('TopicsCtrl', [
    '$scope', 'Topic', function($scope, Topic) {
      $scope.topics = [];
      return Topic.all({}, function(response) {
        var key, value, _ref, _results;
        _ref = response.items;
        _results = [];
        for (key in _ref) {
          value = _ref[key];
          console.log('%s %s', key, value);
          if (key && value) {
            _results.push($scope.topics.push(response.items[key]));
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      });
    }
  ]);

  this.app.controller('HeapsortCtrl', [
    '$scope', function($scope) {
      var data, options, placeholder;
      options = {
        lines: {
          show: true
        },
        points: {
          show: true
        },
        xaxis: {
          tickDecimals: 0,
          tickSize: 1
        }
      };
      data = {
        "label": "Europe (EU27)",
        "data": [[1999, 3.0], [2000, 3.9], [2001, 2.0], [2002, 1.2], [2003, 1.3], [2004, 2.5], [2005, 2.0], [2006, 3.1], [2007, 2.9], [2008, 0.9]]
      };
      placeholder = $("#placeholder");
      return $.plot(placeholder, data, options);
    }
  ]);

}).call(this);

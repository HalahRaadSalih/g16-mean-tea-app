var app = angular.module('app');

app.controller('HomeController', function($scope, $http){
  $http.get('http://localhost:8000/js/data.json').then(function(data){
    console.log(data.data)
    $scope.items = [];
    $scope.items = data.data.data;
  });
});

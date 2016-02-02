var app = angular.module('app');

app.controller('HomeController', function($scope, $http, menuItems){
    $scope.items = [];
    console.log(menuItems.data().then(function(data){
        $scope.items = data.items;
    }));


});

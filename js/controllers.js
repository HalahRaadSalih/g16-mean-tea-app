var app = angular.module('app');
app.controller('IndexController', function($scope, categories){
  //get categories
   categories.fetchCategories.then(function(data){
     $scope.categories = data;
   });
});

app.controller('HomeController', function($scope, $http, menuItems, categories){
    $scope.items = [];
    // get menu items
    menuItems.data().then(function(data){
        $scope.items = data.items;
    });


});

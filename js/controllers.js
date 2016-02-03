var app = angular.module('app');


app.controller('IndexController', function($scope){
  // $scope.cartTotal = addToCart.uniqueItemCount;

  // console.log($scope.cartTotal)
   // categories.fetchCategories.then(function(data){
   //   $scope.categories = data;
   // });
});

app.controller('HomeController', function($scope, $http, menuItems, categories, addToCart){
    categories.fetchCategories.then(function(data){
     $scope.categories = data;
    });
    $scope.items = [];
    $scope.cartTotal = 0;
    // get menu items
    menuItems.data().then(function(data){
        $scope.items = data.items;
    });

    $scope.quantity = function(n) {
        // create new Array of length up to n
        return new Array(n);
    };

    $scope.priceSorting = "price";

    $scope.addToBag = function(item,q){
      var cartObj = {};
      cartObj.tea = item;
      cartObj.quanity = q;
      addToCart.cart.push(cartObj)
      $scope.cartTotal += 1 * q;
    }
});

app.controller('CheckoutController', function($scope, $http, menuItems, categories, addToCart){
  console.log(addToCart.cart)
})

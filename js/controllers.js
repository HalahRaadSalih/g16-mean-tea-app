var app = angular.module('app');


app.controller('IndexController', function($scope){
  //Index Controller Empty for now
});

app.controller('HomeController', function($scope, $http, $location, menuItems, categories, addToCart){
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
      cartObj.quantity = q;
      addToCart.cart.push(cartObj)
      $scope.cartTotal += 1 * q;
    }

    $scope.checkout = function(){
      console.log("checkout clicked")
      $location.path('/checkout');
    }
});

app.controller('CheckoutController', function($scope, $http, menuItems, categories, addToCart){
  $scope.cartArray = addToCart.cart;
  console.log($scope.cartArray)
})

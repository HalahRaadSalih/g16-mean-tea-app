var app = angular.module('app');


app.controller('IndexController', function($scope, categories, addToCart){
  // $scope.cartTotal = addToCart.uniqueItemCount;

  // console.log($scope.cartTotal)
   categories.fetchCategories.then(function(data){
     $scope.categories = data;
   });
});

app.controller('HomeController', function($scope, $http, menuItems, categories, addToCart){
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
      // teaObj = {};
      // teaObj[item] = q
      // addToCart.cart.push(teaObj)
      $scope.cartTotal += 1 * q;
      // addToCart.uniqueItemCount = 9;
      // console.log(addToCart.uniqueItemCount)
    }

    // console.log(addToCart.cartTotal)
});

app.controller('CheckoutController', function($scope, $http, menuItems, categories, addToCart){
  console.log(addToCart.cart)
})

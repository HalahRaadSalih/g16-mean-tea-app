var app = angular.module('app');


app.controller('IndexController', function($scope){
  //Index Controller Empty for now
});

app.controller('HomeController', function($scope, $http, $location, menuItems, categories, addToCart, updateItem){
    categories.fetchCategories.then(function(data){
     $scope.categories = data;
    });

    $scope.items = [];
    $scope.cartTotal = 0;
    $scope.priceSorting = "price";

    // get menu items
    menuItems.data().then(function(data){
        $scope.items = data.items;
    });

    // range for the quanity input field
    $scope.quantity = function(n) {
        // create new Array of length up to n
        return new Array(n);
    };

    // adding items to cart
    $scope.addToBag = function(item,quantity){
      addToCart.addItem(item, quantity);
      $scope.cartTotal += 1 * quantity;

    }

    //checking out
    $scope.checkout = function(){
      $location.path('/checkout');
    }
});

app.controller('CheckoutController', function($scope, $http, menuItems, categories, addToCart, cartItems, updateItem, removeItem, order){
  $scope.items = cartItems.cart;

  // initially editing is disabled
  $scope.editValue = false;
  $scope.orderTotal = order.total();

  $scope.quantity = function(n) {
      // create new Array of length up to n
      return new Array(n);
  };
  // when edit is clicked, it should only updated the edit being clicked
  $scope.editQuantity = function(){
    $scope.editValue = !$scope.editValue;
  }

  $scope.saveQuantity = function(item, quanity){
    $scope.editValue = !$scope.editValue
    // console.log("cartItem = ", cartItem)
    updateItem.update(item, quanity);
    // update total order
    $scope.orderTotal = order.total();

  }

  $scope.removeItem = function(item){
    // removeItem
    removeItem.remove(item);
    // update total order
    $scope.orderTotal = order.total();

  }
})

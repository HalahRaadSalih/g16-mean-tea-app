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

app.controller('CheckoutController', function($scope, $http, menuItems, categories, addToCart){
  $scope.items = addToCart.cart;
  // initially editing is disabled
  $scope.editValue = false;

  // when edit is clicked, it should only updated the edit being clicked
  $scope.editQuantity = function(item){
    $scope.editValue = !$scope.editValue
    //find an item in the cart with that item.id
    for(var i  = 0; i < addToCart.cart.length; i++){
      if(addToCart.cart[i]._id === item._id){
            console.log(item._id);
        console.log('yo, we have an item');
      }
    }

  }

  $scope.saveEditQuantity = function(cartItem){
    $scope.editValue = !$scope.editValue
    // console.log("cartItem = ", cartItem)
  }
})

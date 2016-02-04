var app = angular.module('app');

// service to get menuItems from data.json
app.service('menuItems', function($http){
  return {
    data: function(){
      return $http.get('http://localhost:8000/js/data.json').then(function(data){
        return {
          items: data.data.data
        };
      });
    }
  }
});

//service to get categories possible from our menuItems
app.service('categories', function(menuItems){
  return {
    fetchCategories: menuItems.data().then(function(data){
      var categories = [];
      // get all categories possible
      for(var i = 0; i< data.items.length; i++){
        categories = categories.concat(data.items[i].categories);
      }
      // remove all dublicates
      var uniqueCategories = function(a) {
          return a.reduce(function(p, c) {
              if (p.indexOf(c) < 0) p.push(c);
              return p;
          }, []);
        };

      return uniqueCategories(categories);
  })};
});

app.service('cartItems', function(){
  return{
    cart: []
  }
});

app.service('addToCart',function(cartItems){
  function containsItem(item, cart) {
    var i;
    if(cart.length > 0){
      for (i = 0; i < cart.length; i++) {
        if (cart[i] === item) {
            return true;
        }
        else
        {
          return false
        }
      }
    }
    else{
      return false;

    }

  }



  return{
    addItem: function(item, quantity){
      // check if item already exits
      if(!containsItem(item, cartItems.cart)){
        // add quantity property to the item
        item.quantity = quantity;
        // subtotal property to item
        item.subtotal = item.price / 100 * quantity;
        //add item to cart
        cartItems.cart.push(item);
      }
      else{
        console.log('item is already in cart');
        // get that item from cart & update quantity
        cartItems.cart[findItem(cartItems.cart,'_id',item)].quantity = quantity;
      }
    }
  }

});

app.service('updateItem', function(cartItems){
  return{
    update: function(item, quantity){
      cartItems.cart[findItem(cartItems.cart,'_id',item)].quantity = quantity;
      cartItems.cart[findItem(cartItems.cart,'_id',item)].subtotal = item.price / 100 * quantity;
    }
  }
});

app.service('removeItem', function (cartItems) {
    return{
        remove: function(item){
          //find item index
          var itemIndex = findItem(cartItems.cart,'_id',item);
          // remove it from cart
          cartItems.cart.splice(itemIndex,1);
        }
    }
});

app.service('order', function(cartItems){
    return{
      total : function(){
        var sum = 0;
        for(var i = 0; i < cartItems.cart.length; i++){
          sum += cartItems.cart[i].subtotal;
        }
        console.log('sum is'+sum);

        return sum;

      }
    }
});
function findItem(arr, key, itemToSearch) {

  for (var i = 0; i < arr.length; i++) {

    if (arr[i][key] == itemToSearch[key]) {
      return i;
    }
  }

  return null;
}

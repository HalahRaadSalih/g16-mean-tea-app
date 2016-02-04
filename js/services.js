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

app.service('addToCart', function(){
  var cartArray = [];
  
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
    cart: [],
    addItem: function(item, quantity){
      console.log('inside add item method');
      // check if item already exits
      if(!containsItem(item, cartArray)){
        console.log('item is not in cart, adding new item');
        // add quantity property to the item
        item.quantity = quantity;
        // subtotal property to item
        item.subtotal = item.price / 100 * quantity;
        //add item to cart
        cartArray.push(item);
      }
      else{
        console.log('item is already in cart');
      }
    }
  }
})

var app = angular.module('app');

app.filter('categoriesFilter', function () {
  var filtersItems = [];
   return function(items, category){
     filtersItems = [];
     if(category){
      for(var i = 0; i< items.length; i++){
        for(var j = 0; j < items[i].categories.length; j++ ){
          if (category === items[i].categories[j] ){

              filtersItems.push(items[i]);
          }
        }
      }

      return filtersItems;
  	}
  	else{
  		return items;
  	}

     
   }

});

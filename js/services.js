var app = angular.module('app');

app.service('menuItems', function($http){
  return { data: function(){
    return $http.get('http://localhost:8000/js/data.json').then(function(data){
      return {
        items: data.data.data
      };
    });
  }
}
});

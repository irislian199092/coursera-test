(
  function(){
    'use strict';
    var app=angular.module('myApp');
    app.service('ShoppingListService',ShoppingListService);
    ShoppingListService.$inject=['$q','$timeout'];
    function ShoppingListService($q,$timeout){
      var service=this;
      var items=[];
      items.push({
        name:'sugar',
        quantity:'2 bags',
        description:'0-sugar user for baking delicious!'
      });
      items.push({
        name:'sugar',
        quantity:'4 bags',
        description:'1-sugar user for baking delicious!'
      });
      items.push({
        name:'sugar',
        quantity:'6 bags',
        description:'2-sugar user for baking delicious!'
      });
      items.push({
        name:'sugar',
        quantity:'6 bags',
        description:'3-sugar user for baking delicious!'
      });
      items.push({
        name:'sugar',
        quantity:'6 bags',
        description:'4-sugar user for baking delicious!'
      });
      service.getItems=function(){
        var deferred=$q.defer();
        $timeout(function(){
          if(items){
            deferred.resolve(items);
          }else{
            result.message='item is null';
            deferred.reject(result);
          }

        },20);
        return deferred.promise;
      }

    }

  }
)();

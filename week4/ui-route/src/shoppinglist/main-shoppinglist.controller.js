(
  function(){
    'use strict';
    var app=angular.module('myApp');
    app.controller('MainShoppingListController',MainShoppingListController);
    /*写法一*/
    // MainShoppingListController.$inject=['ShoppingListService'];
    // function MainShoppingListController(ShoppingListService){
    //   var mainList=this;
    //   mainList.$onInit=function(){
    //     ShoppingListService.getItems()
    //     .then(function(result){
    //       mainList.items=result;
    //     })
    //   }
    // }
    /*写法二*/
    MainShoppingListController.$inject=['items'];
    function MainShoppingListController(items){
      var mainList=this;
      mainList.items=items;
    }
  }
)();

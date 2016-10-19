(
  function(){
    'use strict';
    angular.module('myApp')
    .component('shoppingList',{
      templateUrl:'src/shoppinglist/templates/shoppinglist.template.html',
      bindings:{
        items:'<'
      }
    })
  }
)();

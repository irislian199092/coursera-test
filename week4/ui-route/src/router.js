(
  function(){
    'use strict';
    var app=angular.module('myApp');
    app.config(RoutesConfig);
    RoutesConfig.$inject=['$stateProvider','$urlRouterProvider'];
    function RoutesConfig($stateProvider,$urlRouterProvider){
      $urlRouterProvider.otherwise('/');
      $stateProvider
      .state('home',{
        url:'/',
        templateUrl:'src/shoppinglist/templates/home.template.html'
      })
      .state('mainList',{
        url:'/main-list',
        templateUrl:'src/shoppinglist/templates/main-shoopinglist.template.html',
        controller:'MainShoppingListController as mainList',
        resolve:{
          items:['ShoppingListService',function(ShoppingListService){
            return ShoppingListService.getItems();
          }]
        }
      })
      // url 中的参数
      // .state('itemDetail',{
      //   url:'/item-detail/{itemId}',
      //   templateUrl:'src/shoppinglist/templates/item-detail.template.html',
      //   controller:'itemDetailController as itemDetail',
      //   resolve:{
      //     item:['$stateParams','ShoppingListService',
      //       function($stateParams,ShoppingListService){
      //         return ShoppingListService.getItems()
      //         .then(function(items){
      //           return items[$stateParams.itemId];
      //         });
      //       }]
      //   }
      // })
      // url child
      .state('mainList.itemDetail',{
        // url:'/item-detail/{itemId}',
        params:{
          itemId:null
        },
        templateUrl:'src/shoppinglist/templates/item-detail.template.html',
        controller:'itemDetailController as itemDetail'
      });
    }

  }
)();

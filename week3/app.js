(function(){
  'use strict';
  var app=angular.module('MyApp',[]);
  /*———————————————— 1.angular中异步函数开始————————————————*/

  // function asyncFunction(){
  //   var deferered=$q.defer();
  //   if(...){deferered.resolve(result)}; //成功后
  //   else{deferered.reject(error)};      //失败后
  //   return defered.promise;
  // };
  // var promise=asyncFunction();
  // promise.then(function(result){
  //
  // },function (error){
  //
  // });                            //return a promise;
  //
  // $q.all([promise1,promise2])
  // .then(function(result){
  //
  // })
  // .catch(function(error){
  //
  // });
  app.controller('ShoppingListController',ShoppingListController);
  app.service('ShoppingListService',ShoppingListService);
  app.service('LimitShoppingListService',LimitShoppingListService);

  ShoppingListController.$inject=['ShoppingListService'];
  function ShoppingListController(ShoppingListService){
    var list=this;
    list.items=ShoppingListService.getItems();
    list.itemName="";
    list.itemQuantity="";
    list.addItem=function(){
      ShoppingListService.addItem(list.itemName,list.itemQuantity);
      list.itemName="";
      list.itemQuantity="";
    };
    list.removeItem=function(itemIndex){
      ShoppingListService.removeItem(itemIndex);
    }
  }

  ShoppingListService.$inject=['$q','LimitShoppingListService'];
  function ShoppingListService($q,LimitShoppingListService){
    var service=this;
    var items=[];
    //第一步，普通写法
    // service.addItem=function(name,quantity){
    //   var promise=LimitShoppingListService.checkName(name);
    //   promise.then(function(response){
    //     var nextPromise=LimitShoppingListService.checkQuantity(quantity);
    //     nextPromise.then(function(result){
    //       var item={
    //         name:name,
    //         quantity:quantity
    //       };
    //       items.push(item);
    //     },function(errorRes){
    //       console.log(errorRes.message);
    //     })
    //
    //   },function(errorRes){
    //     console.log(errorRes.message);
    //   })
    // }
    //————————————————————————————————————————
    //第二步，异步promise写法,没加一个需要等4秒
    // service.addItem=function(name,quantity){
    //   var promise=LimitShoppingListService.checkName(name);
    //   promise
    //   .then(function(response){
    //     return LimitShoppingListService.checkQuantity(quantity);
    //   })
    //   .then(function(response){
    //     var item={
    //       name:name,
    //       quantity:quantity
    //     };
    //     items.push(item);
    //   })
    //   .catch(function(errorRes){
    //     console.log(errorRes.message);
    //   })
    // }
    //————————————————————————————————————————
    //第三步，让阻塞的程序并行进行
    service.addItem=function(name,quantity){
      var namePromise=LimitShoppingListService.checkName(name);
      var quantityPromise=LimitShoppingListService.checkQuantity(quantity);
      $q.all([namePromise,quantityPromise])
      .then(function(response){
        var item={
          name:name,
          quantity:quantity
        };
        items.push(item);
      })
      .catch(function(errorRes){
        console.log(errorRes.message);
      })
    }

    service.removeItem=function(itemIndex){
      items.splice(itemIndex,1);
    }
    service.getItems=function(){
      return items;
    }
  }

  LimitShoppingListService.$inject=['$q','$timeout'];
  function LimitShoppingListService($q,$timeout){
    var service=this;
    service.checkName=function(name){
      var deferred=$q.defer();
      var result={
        message:''
      };
      $timeout(function(){
        if(name.toLowerCase().indexOf('cookie')===-1){
          deferred.resolve(result);
        }else{
          result.message='stay away from cookies!';
          deferred.reject(result);
        }
      },3000);
      return deferred.promise;
    };
    service.checkQuantity=function(quantity){
      var deferred=$q.defer();
      var result={
        message:''
      };
      $timeout(function () {
        if(quantity<6){
          deferred.resolve(result);
        }else{
          result.message='too  much weight!';
          deferred.reject(result);
        }
      }, 1000);
      return deferred.promise;
    };

  }

  /*———————————————— 1.angular中异步函数结束————————————————*/
  /*———————————————— 2————$http 开始————————————————*/
  // 基本用法如下：
  // $http({
  //   method:'GET',
  //   url:'https://someurl',
  //   params:{params1:'value1'}       =>    https:someurl?params1=value1
  // })
  // .then(...);























/*———————————————— 2————$http 结束————————————————*/

})()

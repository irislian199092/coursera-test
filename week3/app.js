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
  app.controller('menuListController',menuListController);
  app.service('menuListService',menuListService)
  .constant('ApiBasePath','http://localhost:3000/week3');
  menuListController.$inject=['menuListService'];
  function  menuListController(menuListService){
    var menus=this;
    var promise=menuListService.getCatarage()
    .then(function(res){
      menus.catarage=res.data;
    })
    .catch(function(error){
      console.log('something is wrong!');
    })
  }
  menuListService.$inject=['$http','ApiBasePath'];
  function menuListService($http,ApiBasePath){
    this.getCatarage=function(){
      var response=$http({
        url:(ApiBasePath+'/menu.json')
      })
      return response;
    }

  };

/*———————————————— 2————$http 结束————————————————*/


/*———————————————— 3————directives of @  =开始————————————————*/
app.controller('ShoppingListController1',ShoppingListController1);
app.controller('ShoppingListController2',ShoppingListController2);
app.factory('ShoppingListFactory',ShoppingListFactory);
app.directive('listItem',listItem);
function listItem(){
  var ddo={
    restrict:'AE',
    templateUrl:'listItem.html',
    scope:{
      list:'=myList', //独立的字符串“ ” ,如果只是等号“=”,默认就是"=list"
      title:'@title'  //独立的“{{}}”
    }
  }
  return ddo;
}
ShoppingListController1.$inject=['ShoppingListFactory'];
function ShoppingListController1(ShoppingListFactory){
  var list1=this;
  var shoppinglist1=ShoppingListFactory();
  list1.items=shoppinglist1.getItems();
  list1.itemName="";
  list1.itemQuantity="";
  var originTile="shoppingList1 #1 ";
  list1.title=originTile+(list1.items.length);
  list1.addItem=function(){
    shoppinglist1.addItem(list1.itemName,list1.itemQuantity);
    list1.title=originTile+(list1.items.length);
  };
  list1.removeItem=function(itemIndex){
    shoppinglist1.removeItem(itemIndex);
    list1.title=originTile+(list1.items.length);
  }
}
//展示控制器
ShoppingListController2.$inject=['ShoppingListFactory'];
function ShoppingListController2(ShoppingListFactory){
  var list2=this;
  var shoppinglist2=ShoppingListFactory(3);
  list2.items=shoppinglist2.getItems();
  list2.itemName="";
  list2.itemQuantity="";
  list2.addItem=function(){
    try{
      shoppinglist2.addItem(list2.itemName,list2.itemQuantity);
    }catch(error){
      list2.errorMessage=error.message;
    }
  };
  list2.removeItem=function(itemIndex){
    shoppinglist2.removeItem(itemIndex);
  }
}

function ShoppingListService2(maxItems){
  var service=this;
  var items=[];
  service.addItem=function(name,quantity){
    if((maxItems===undefined)||
    (maxItems!==undefined)&&(items.length<maxItems)){
      var item={
        name:name,
        quantity:quantity
      };
      items.push(item);
    }else{
      throw new Error('Max items('+maxItems+')reached.');
    }

  }
  service.removeItem=function(itemIndex){
    items.splice(itemIndex,1);
  }
  service.getItems=function(){
    return items;
  }
}
//factory function
function ShoppingListFactory(){
  var factory=function(maxItems){
    return new ShoppingListService2(maxItems);
  };
  return factory;
}

/*———————————————— 3————directives of @  =结束————————————————*/
/*———————————————— 4————directives of controller开始————————————————*/
app.controller('ShoppingListDirectiveController',ShoppingListDirectiveController);
app.factory('ShoppingListDirectiveFactory',ShoppingListDirectiveFactory);
app.controller('isolateController',isolateController);
app.directive('shoppingList',shoppingList);
function shoppingList(){
  var ddo={
    restrict:'AE',
    templateUrl:'listItem.html',
    scope:{
      items:'<',//只会检测到HTML中的属性变化，不会检测到directive里的变化，单向检测，保证指令不会改变对象的属性
      title:'@',
      badRemove:'='
    },
    controller:'isolateController as list',
    bindToController:true
    // controllerAs:'list'
  }
  return ddo;
}
function isolateController(){

}

ShoppingListDirectiveController.$inject=['ShoppingListDirectiveFactory'];
function ShoppingListDirectiveController(ShoppingListDirectiveFactory){
  var list=this;
  var shoppinglist2=ShoppingListDirectiveFactory();
  list.items=shoppinglist2.getItems();
  list.itemName="";
  list.itemQuantity="";
  var originTile="shoppingList1 #1 ";
  list.title=originTile+(list.items.length);
  list.addItem=function(){
    shoppinglist2.addItem(list.itemName,list.itemQuantity);
    list.title=originTile+(list.items.length);
  };
  list.removeItem=function(itemIndex){
    console.log(this);
    shoppinglist2.removeItem(itemIndex);
    list.title=originTile+(list.items.length);
    this.lastRemoved='last item removed is'+this.items[itemIndex].name;
  }
}

function ShoppingDirectiveListService(){
  var service=this;
  var items=[];
  service.addItem=function(name,quantity){
    var item={
      name:name,
      quantity:quantity
    };
    items.push(item);
  }
  service.removeItem=function(itemIndex){
    items.splice(itemIndex,1);
  }
  service.getItems=function(){
    return items;
  }
}
//factory function
function ShoppingListDirectiveFactory(){
  var factory=function(maxItems){
    return new ShoppingDirectiveListService();
  };
  return factory;
}

/*———————————————— 4————directives of controller结束————————————————*/





















})()

(function(){
  'use strict';
  var app=angular.module('MyApp',[]);
  app.controller('ShoppingListController',ShoppingListController);
  app.factory('ShoppingListFactory',ShoppingListFactory);
  app.service('WeightService',WeightService);
  //shoppingList组件
  app.component('shoppingList',{
    templateUrl:'shoppingList.html',
    controller:ShoppingListComponentCtrl,
    bindings:{
      items:'<',
      myTitle:'@title',
      onRemove:'&',
    }
  });
  //loading 组件
  app.component('loadingSpinner',{
    templateUrl:'spinner.html',
    controller:SpinnerComponentCtrl
  });
  SpinnerComponentCtrl.$inject=['$rootScope','$scope'];
  function SpinnerComponentCtrl($rootScope,$scope){
    var $ctrl=this;
    var cancelListener=$rootScope.$on('shoppinglist:process',function(event,data){
      console.log('event is:',event);
      console.log('data is ',data);
      if(data.on){
        $ctrl.showSpinner=true;
      }else{
        $ctrl.showSpinner=false;
      }
    });
    $ctrl.$onDestroy=function(){
      cancelListener();        //这个组件的scope，and 绑定在$rootScope的事件也都会销毁
    }
  }


ShoppingListComponentCtrl.$inject=['$rootScope','$element','$q','WeightService'];
function ShoppingListComponentCtrl($rootScope,$element,$q,WeightService){
    var $ctrl=this;
    var totalItems;
    // $ctrl.cookiesList=function(){
    //   for(var i=0;i<$ctrl.items.length;i++){
    //     var name=$ctrl.items[i].name;
    //     if(name.toLowerCase().indexOf('cookie')!==-1){
    //       return true;
    //     }
    //   }
    //   return false;
    // };
    $ctrl.remove=function(myIndex){
      return $ctrl.onRemove({index:myIndex});
    };
    //控制器中一些API
    $ctrl.$onInit=function(){
      totalItems=0;
      //console.log('we are in $onInit();');
      $ctrl.ice='lulian';
    };
    //控制器中一些API
    $ctrl.$onChanges=function(changeObj){
      //console.log(changeObj);
      //console.log(changeObj.myTitle.previousValue);
      //console.log(changeObj.myTitle.currentValue);
    };
    //控制器中一些API
    // $ctrl.$postLink=function(){
    //   $scope.$watch('$ctrl.cookiesList()',function(newValue,oldValue){
    //     console.log(newValue);
    //     console.log(oldValue);
    //     console.log($element);
    //     var errorDiv=$element.find('.error');
    //     if(newValue){
    //       errorDiv.slideDown(900);
    //     }else{
    //       errorDiv.slideUp(900);
    //     }
    //   })
    // };
    //控制器中一些API,angular消化循环机制中每次都会自动运行，所以现在不用再$scope上绑定￥watcher
    $ctrl.$doCheck=function(){
      if($ctrl.items.length!==totalItems){
        totalItems=$ctrl.items.length;
        $rootScope.$broadcast('shoppinglist:process',{on:true});
        var promises=[];
        for(var i=0;i<$ctrl.items.length;i++){
          promises.push(WeightService.checkName($ctrl.items[i].name));
        };
        //让item里每一项都并行检查，如果有一些有cookie，则显示error
        console.log(promises);
        $q.all(promises)
        .then(function(result){
          var errorDiv=$element.find('.error');

            errorDiv.slideUp(900);
            console.log(errorDiv);
        })
        .catch(function(result){
          var errorDiv=$element.find('.error');
          errorDiv.slideDown(900);
        })
        .finally(function(){
          $rootScope.$broadcast('shoppinglist:process',{on:false});
        })

      }
    }
}

WeightService.$inject=['$q','$timeout'];
function WeightService($q,$timeout){
  this.checkName=function(name){
    var deferred=$q.defer();
    var result={
      message:''
    };
    $timeout(function(){
      if(name.toLowerCase().indexOf('cookie')!==-1){
        deferred.resolve(result);
      }else{
        result.message='detected cookies!';
        deferred.reject(result);
      }
    },3000);
    return deferred.promise;
  }
}


ShoppingListController.$inject=['ShoppingListFactory'];
function ShoppingListController(ShoppingListFactory){
  var list1=this;
  var shoppinglist1=ShoppingListFactory();
  list1.items=shoppinglist1.getItems();
  list1.itemName="";
  list1.itemQuantity="";
  var originTile="shoppingList   ";
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

function ShoppingListService(maxItems){
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
    return new ShoppingListService(maxItems);
  };
  return factory;
}





})()

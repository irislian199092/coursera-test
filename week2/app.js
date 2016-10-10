(function(){
  var app=angular.module('MyApp',[]);
/*------------------过滤函数开始------------------*/
  app.controller('FilterController',myFilter)
  .filter('loves',LovesFilterFactory)
  .filter('truth',TruthFilterFactory);
  myFilter.$inject=['$scope','lovesFilter','truthFilter'];
  function myFilter($scope,lovesFilter,truthFilter){
    //
    $scope.sayMsg=function(){
      var msg='Irislian likes eating snacks in night !';
      var outPut=lovesFilter(msg);
      return outPut;
    };
    //
    $scope.truthMsg=function(){
      var msg='Irislian likes eating health snacks in night !';
      var outPut=truthFilter(msg);
      return outPut;
    };
  };
  //自己定义一个过滤器,没有参数
  function LovesFilterFactory(){
    return function(input){
      input=input||'';
      input=input.replace('likes','loves');
      return input;
    }
  };
  //自己定义一个过滤器,添加一个参数
  function TruthFilterFactory(){
    return function(input,target,replace){
      input=input||'';
      input=input.replace(target,replace);
        return input;
    }
  };
/*------------------过滤函数结束------------------*/
/*------------------Digest cycle开始------------------*/
app.controller('digestController',WatchNmuber);
WatchNmuber.$inject=['$scope'];
function WatchNmuber($scope){
  $scope.onceCounter=0;
  $scope.name='';
  $scope.showNum=function(){
    console.log('# of watchers:'+$scope.$$watchersCount);
  };
  $scope.countOnce=function(){
    $scope.onceCounter+=1;
  };
  //方法一加$watch
  // $scope.$watch(function(){
  //   console.log('$scope');
  // })
  //方法二加$watch一个属性的方法
  // $scope.$watch('onceCounter',function(newValue,oldValue){
  //   console.log('New value is :'+newValue);
  //   console.log('Old value is :'+oldValue);
  // });
  //方法三直接{{}}再HTML中,angular会自动为我们添加一个$watch
  //注意：每次digest cycle都会走两次，一次发现改变的属性，一次在循环发现是否有上次改变
  //的属性引起的其他属性的变化
}
/*------------------Digest cycle结束------------------*/
/*------------------$watch and $apply开始------------------*/
app.controller('CounterController',watchCounter);
watchCounter.$inject=['$scope','$timeout'];
function watchCounter($scope,$timeout){
  $scope.counter=0;
  $scope.uPCounter=function(){
    // 方法一，缺点是当有异常错误时，angular捕获不到
    // setTimeout(function(){
    //   $scope.counter++;
    //   console.log('increment the counter');
    //   $scope.$digest();//告诉angular启用消化回收
    // },2000)
    //方法二，通过$apply调用angular环境来执行延时。
    // setTimeout(function(){
    //   $scope.$apply(function(){
    //     $scope.counter++;
    //     console.log('increment the counter');
    //   });
    // },2000);
    //方法三，通过原生的$timeout来实现延时效果
    $timeout(function(){
      $scope.counter++;
      console.log('increment the counter');
    },2000)
  };
};
/*------------------$watch and $apply结束------------------*/
/*------------------2-way 1-way and 1-time binding开始------------------*/
app.controller('BindingController',BindingController);
BindingController.$inject=['$scope'];
function BindingController($scope){
  $scope.firstName='irislian';
  $scope.fullName='';
  $scope.showNum=function(){
    console.log('# of watchers is :'+$scope.$$watchersCount);
  };
  $scope.setFullName=function(){
    $scope.fullName=$scope.firstName+""+'charkin';
  };
  $scope.logFirstName=function(){
    console.log("First name is :"+$scope.firstName);
  };
  $scope.logFullName=function(){
    console.log("Full name is :"+$scope.fullName);
  }
};
/*------------------2-way 1-way and 1-time binding结束------------------*/
/*------------------5————ng-repeat开始------------------*/
app.controller('ShoopingListController',ShoopingListController);
ShoopingListController.$inject=['$scope'];
var shoppingList1=['milk','choclate','cookes'];
var shoppingList2=[{
  name:'item1',
  describe:'this is  a diamaond!'
},{
  name:'item2',
  describe:'this is  a necklace'
},{
  name:'item3',
  describe:'this is  a shingning'
}];
function ShoopingListController($scope){
  $scope.shoppingList1=shoppingList1;
  $scope.shoppingList2=shoppingList2;
  $scope.logIndex=function(){
    console.log(this.$index);
  };
  $scope.addNewItem=function(){

  };
};
/*------------------5————ng-repeat结束------------------*/
/*------------------6————ng-controller开始------------------*/
app.controller('parentController',parentController);
parentController.$inject=['$scope'];
function parentController($scope){
  // var parent=this;
  // parent.value=1;
  this.value=2;
}
app.controller('childrenController',childrenController);
childrenController.$inject=['$scope'];
function childrenController($scope){
  var  children=this;
  children.value=5;
  console.log('children $scope is:',$scope);
}
/*------------------6————ng-controller结束------------------*/
/*------------------7————custom service 开始------------------*/
//app.service('CustomService',CustomService)//前面是注入其他服务的名字，后面是构造函数的名字
app.controller('ShoppingListAddController',ShoppingListAddController);
app.controller('ShoppingListShowController',ShoppingListShowController);
app.service('ShoppingListService',ShoppingListService);
//添加控制器
ShoppingListAddController.$inject=['ShoppingListService'];
function ShoppingListAddController(ShoppingListService){
  var itemAdder=this;
  itemAdder.itemName="";
  itemAdder.itemQuantity="";
  itemAdder.addItem=function(){
    ShoppingListService.addItem(itemAdder.itemName,itemAdder.itemQuantity);
    itemAdder.itemName="";
    itemAdder.itemQuantity="";
  }
}
//展示控制器
ShoppingListShowController.$inject=['ShoppingListService'];
function ShoppingListShowController(ShoppingListService){
  var showList=this;
  showList.items=ShoppingListService.getItems();
  showList.removeItem=function(itemIndex){
    ShoppingListService.removeItem(itemIndex);
  }
}
//custom service 构造函数
function ShoppingListService(){
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
/*------------------7————custom service 结束------------------*/
/*------------------8————custom factory开始------------------*/
app.controller('ShoppingListController1',ShoppingListController1);
app.controller('ShoppingListController2',ShoppingListController2);
app.factory('ShoppingListFactory',ShoppingListFactory);
ShoppingListController1.$inject=['ShoppingListFactory'];
function ShoppingListController1(ShoppingListFactory){
  var list1=this;
  var shoppinglist1=ShoppingListFactory();
  list1.items=shoppinglist1.getItems();
  list1.itemName="";
  list1.itemQuantity="";
  list1.addItem=function(){
    shoppinglist1.addItem(list1.itemName,list1.itemQuantity);
    list1.itemName="";
    list1.itemQuantity="";
  };
  list1.removeItem=function(itemIndex){
    shoppinglist1.removeItem(itemIndex);
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
      list2.itemName="";
      list2.itemQuantity="";
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
function ShoppingListFactory(){
  var factory=function(maxItems){
    return new ShoppingListService2(maxItems);
  };
  return factory;
}

/*------------------8————custom factory结束------------------*/





})()

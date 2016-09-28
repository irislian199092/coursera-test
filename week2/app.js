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
  $scope.showNum=function(){
    console.log('# of watchers:'+$scope.$$watchersCount);
  };
  $scope.countOnce=function(){
    $scope.onceCounter+=1;
  };

  // $scope.$watch('onceCounter',function(newValue,oldValue){
  //   console.log('New value is :'+newValue);
  //   console.log('Old value is :'+oldValue);
  // });
}
/*------------------Digest cycle结束------------------*/
})()

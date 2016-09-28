(function(angular){
  'use strict';
  angular.module('myFirstApp',[])
  .controller('MyFirstController',myCtrl);
  myCtrl.$inject=['$scope'];
  function myCtrl($scope){
    $scope.item='';
    $scope.msg='';
    $scope.checkMenu=function(){
      if(!$scope.item){
        $scope.msg="Please enter data first";
      }else{
        var arr=$scope.item.split(',');
        if(arr.length<=3){
          $scope.msg='Enjoy';
        }else{
          $scope.msg='Too much!';
        }
      }
    }
  };

})(angular)

'use strict';
(function(angular){
  const app=angular.module('myApp',[]);
  app.controller('silderNavController',silderNavController);
  silderNavController.$inject=['$scope'];
  function silderNavController($scope){
    $scope.isOpen=true;
    $scope.navItem=[{
      title:'项目一',
      lists:['3322','dew','dfw']
    },{
      title:'项目一',
      lists:['3322','dew','dfw']
    },{
      title:'项目一',
      lists:['3322','dew','dfw']
    }];
  }
})(angular)

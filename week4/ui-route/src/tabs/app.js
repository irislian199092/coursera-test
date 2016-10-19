(function(){
  'use strict';
  angular.module('RoutingApp',['ui.router']);
  angular.module('RoutingApp')
  .config(RouterConfig);
  RouterConfig.$inject=['$stateProvider','$urlRouterProvider'];
  function RouterConfig($stateProvider,$urlRouterProvider){
    // set 默认router
    $urlRouterProvider.otherwise('/tab1');
    //set ui router
    $stateProvider
      .state('tab1',{
        url:'/tab1',
        templateUrl:'src/tab1.html'
      })
      .state('tab2',{
        url:'/tab2',
        templateUrl:'src/tab2.html'
      })

  }



})()

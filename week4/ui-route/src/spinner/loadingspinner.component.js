(function(){
  'use strict';
  angular.module('Spinner')
  .component('loadingSpinner',{
    templateUrl:'src/spinner/loadingspinner.template.html',
    controller:SpinnerController
  });
  SpinnerController.$inject=['$rootScope'];
  function SpinnerController($rootScope){
    var $ctrl=this;
    var cancellers=[];
    //所有这些时间都是$rootScope $broadcast down
    $ctrl.$onInit=function(){
      // start
      var cancel=$rootScope.$on('$stateChangeStart',
        function(event,toState,formState,fromParams,options){
          $ctrl.showSpinner=true;
        });
      cancellers.push(cancel);
      // success
      cancel=$rootScope.$on('$stateChangeSuccess',
        function(event,toState,toParams,formState,fromParams){
          $ctrl.showSpinner=false;
        });
      cancellers.push(cancel);
      // error
      cancel=$rootScope.$on('$stateChangeError',
        function(event,toState,toParams,formState,fromParams,error){
          $ctrl.showSpinner=false;
        });
      cancellers.push(cancel);
    }
    //destroy
    $ctrl.$onDestroy=function(){
      cancellers.forEach(function(item){
        item();
      })
    }

  }

})();

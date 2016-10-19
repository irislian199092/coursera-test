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
    $ctrl.$onInit=function(){
      // start
      var cancel=cancellers.$on('$stateChangeStart',
        function(event,toState,formState,fromParams,options){
          $ctrl.showSpinner=true;
        });
      cancellers.push(cancel);
      // success
      cancel=cancellers.$on('$stateChangeSuccess',
        function(event,toState,toParams,formState,fromParams){
          $ctrl.showSpinner=false;
        });
      cancellers.push(cancel);
      // error
      cancel=cancellers.$on('$stateChangeError',
        function(event,toState,toParams,formState,fromParams,error){
          $ctrl.showSpinner=false;
        });

      $ctrl.$onDestroy=function(){
        cancellers.forEach(function(item){
          item();
        })
      }

    }
  }

})();

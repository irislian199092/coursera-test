(function(){
  'use strict';
  angular.module('formApp',[])
  .controller('registerController',registerController);
  function registerController(){
    this.user={
      username:'',
      email:'',
      phone:'',
      completed:''
    }
  }
})()

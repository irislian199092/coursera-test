function getRandomNumber(form,to){
  return Math.random()*(max-min)+min;
}

function getRndomOddOrEven1to10(type,randomNumGenerator){
  var found=false;
  while(!found){
    var num=randomNumGenerator(1,10);
    if(type==='odd'){
      if(num%2!==0){
        return num;
      }
      if(num%2===0){
        return num;
      }
    }
  }
}

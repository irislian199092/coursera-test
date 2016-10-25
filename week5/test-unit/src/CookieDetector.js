// version 1
// function detecCookie(items){
//   for(var i=0;i<items.length;i++){
//     var item=items[i];
//     if(item.indexOf('cookie')!==-1){
//       return true;    //有cookie
//     }
//     return false;    //无cookie
//   }
// }

// version 2
// function detecCookie(items){
//   for(var i=0;i<items.length;i++){
//     var item=items[i];
//     if(item.indexOf('cookie')!==-1){
//       return true;    //有cookie
//     }
//   }
//   return false;    //无cookie
// }

// version 3
function detecCookie(items){
  for(var i=0;i<items.length;i++){
    var item=items[i];
    if(item.toLowerCase().indexOf('cookie')!==-1){
      return true;    //有cookie
    }
  }
  return false;    //无cookie
}

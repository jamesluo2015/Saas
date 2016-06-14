//getlabel.js
//用户获取vselect控件的label值
export default(value,arr)=>{
  let temp= arr.filter(function(item){
    return item.value==value;
  });
  if(temp.length){
     return temp[0].label;
  }else{
    return "";
  }
}

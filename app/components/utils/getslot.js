export default (selectlist,val) => {
  let slot=val;
  let model={};
  for (var i = 0; i < selectlist.length; i++) {
    let item =  selectlist[i]
    if(item.value==slot&&item.level==3){
      model.SlotCode=item.label;
      model.StoreId=item.pid;

      for (var i = 0; i < selectlist.length; i++) {
        let item2 =  selectlist[i]
        if(item2.value==model.StoreId&&item2.level==2){
          model.StoreCode=item2.code;
          model.StoreName=item2.label;
          model.AreaId=item2.pid;

          for (var i = 0; i < selectlist.length; i++) {
            let item3 =  selectlist[i]
            if(item3.value==model.AreaId&&item3.level==1){
              model.AreaCode=item3.code;
              model.AreaName=item3.label;
              break;
            }
          }
          break;
        }
      }
      break;
    }
  }
  return model;
}

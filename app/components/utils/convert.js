//convert.js
export default (suitcars,fid)=> {
let s=new Set();
suitcars=suitcars.filter(function(item){
  return item.FactoryId==fid;
})
suitcars.map(x=>s.add(x.CarmodelId));
let arr=[];
for(var set of s){
    let temp=suitcars.filter(function(car){
        return car.CarmodelId==set;
    });
    let carlist=[];
    temp.forEach(function(t){
        carlist.push({
            text: t.PartsYear,
            id: t.PartsYearId,
            des: t.Description,
            carid: temp[0].CarmodelId,
            carmodel: temp[0].Carmodel,
            factoryname: temp[0].FactoryName,
            factoryid: temp[0].FactoryId
        })
    })
    arr.push({
        title: temp[0].FactoryName+'-'+temp[0].Carmodel,
        carlist: carlist
    });
 }
 return arr;
}

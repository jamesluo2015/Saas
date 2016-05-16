//convert.js
export default (suitcars)=> {
let s=new Set();
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
            des: t.Description
        })
    })
    arr.push({
        title: temp[0].FactoryName+'-'+temp[0].Carmodel,
        carlist: carlist
    });
 }
 return arr;
}
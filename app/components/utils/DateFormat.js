//DateFormat.js
export default (val,type)=> {
  if (val != null) {
          var date = new Date(parseInt(val.replace("/Date(", "").replace(")/", ""), 10));
          //月份为0-11，所以+1，月份小于10时补个0
          var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
          var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
          if(type){
            var currentHour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
            var currentMinute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
            var currentSecond = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();

            return date.getFullYear() + "-" + month + "-" + currentDate+" " +currentHour + ":" +currentMinute + ":" + currentSecond;
          }else{
            return date.getFullYear() + "-" + month + "-" + currentDate;
          }

      }

      return "";
}

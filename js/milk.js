var delay=3;
$(document).ready(function(){
$("select").change(function(){

});

});
function getDays(strDateStart,strDateEnd){
   var strSeparator = "-"; //日期分隔符
   var oDate1;
   var oDate2;
   var iDays;
   oDate1= strDateStart.split(strSeparator);
   oDate2= strDateEnd.split(strSeparator);
  var strDateS = new Date(oDate1[0], parseInt(oDate1[1])-1, parseInt(oDate1[2]));
  var strDateE = new Date(oDate2[0], parseInt(oDate2[1])-1, parseInt(oDate2[2]));
   iDays = parseInt(Math.abs(strDateS - strDateE ) / 1000 / 60 / 60 /24)//把相差的毫秒数转换为天数 
   return iDays ;
}
function cFunc(){
var c = $dp.cal;
$("#day").text(getDays($("#d1").val(),c.newdate['y']+"-"+c.newdate["M"]+"-"+c.newdate["d"]));
}
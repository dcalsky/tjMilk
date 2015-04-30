
var submit_time;
var num=$.cookie("num");
var password=$.cookie("password");
  $(function() {
           
      $('#checkname').raty({target: '#checkname_hint',targetText: '点名频率',targetKeep: true, starOff :'img/star-off-big.png',starOn: 'img/star-on-big.png',hints:['天天点名','频繁','一般','偶尔','从不点名']});
      $('#givesroce').raty({number: 3,target: '#givesroce_hint',targetText: '拿优',targetKeep: true, starOff :'img/star-off-big.png',starOn: 'img/star-on-big.png',hints:['难','中','易']});
    var data={action:"login",num:num,password:password};
    $.post("php/handle.php",data,function(data){
      var temp=JSON.parse(data);
      var status=temp["status"];
      if(status=="ok"){
        $( "#submit_input" ).autocomplete({
        source: json});
        $( "#search_input" ).autocomplete({
        source: json});
        $("#submit_input").blur(function(){addteacher("submit")});
        $("#search_input").blur(function(){addteacher("search")});
         }else{
        window.location.href="login.html";
      }
  });
     
    });
      
function addteacher (who){
  console.log(who);
            if(who=="submit"){
          $("#select2").empty();
  var data={action:"get_base",classname:escape($("#submit_input").val())};
  $.post("php/xuanke.php",data,function(data){
          var temp=JSON.parse(data);

          for(var i=0;i<temp.length;i++){
            $("#select2").append("<option value="+i+">"+temp[i].teacher+"</option>");
          }
  });
          }else{
  var data={action:"get_base",classname:escape($("#search_input").val())};
  $.post("php/xuanke.php",data,function(data){
          var temp=JSON.parse(data);
          $("#select1").empty();
          for(var i=0;i<temp.length;i++){
            $("#select1").append("<option value="+i+">"+temp[i].teacher+"</option>");
          }
  });
          }

}
function submit(){
  var data ={action:"submit",classname:escape($("#submit_input").val()),teacher:escape($("#select2").val())};
  $.post("php/xuanke.php",data,function(data){
    var temp=JSON.parse(data);
    if(temp['status']=="ok"){}
      //submit ok
  });
}
function search(){
  var data ={action:"get_info",classname:escape($("#search_input").val()),teacher:escape($("#select1").val())};
  $.post("php/xuanke.php",data,function(data){
    var temp=JSON.parse(data);
     $('#table').dataTable();
    for(var i=0;i<temp.length;i++){
      //$("#tbody").append("<tr><td>"+i+"</td><td>"+temp[i]['checkname']+"</td><td>"+"<div id='readOnly"+i+"'></div>"+"</td><td>"+temp[i]['fixseat']+"</td><td>"+temp[i]['yoursroce']+"</td><td>"+个人评价按钮+"</td></tr>");
      $('#readOnly'+i).raty({ readOnly: true, score: temp[i]['givesroce'], starOff :'img/star-off-big.png',starOn: 'img/star-on-big.png'});
    }
  });
}
$.extend( $.fn.dataTable.defaults, {
    "searching": false,
    "ordering": false

} );
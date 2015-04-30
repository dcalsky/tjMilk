var num=$.cookie("num");
var password=$.cookie("password"); 
var name;
var zc=false;
var allow=false;
$(document).ready(function(){
	var data={action:"login",num:num,password:password};
		$.post("php/handle.php",data,function(data){
			var temp=JSON.parse(data);
			var status=temp["status"];
			if(status=="ok"){
				$("#find").click(find);
				$("#num").text("您好："+num);
				$("#quit").click(quit);
				$("#person").click(function(){
					window.location.href="person.html";
				});
				data={action:"findname",num:num};
				$.post("php/handle.php",data,function(data){
					temp=JSON.parse(data);
					status=temp["status"];
					if(status=="none"){
						$("#zcbox").removeClass("hidden");
						$("#tip").removeClass("hidden");
						$("#tip1").text("请选择你的专业：");
						zc=true;
					}
				});						
			}else{
				window.location.href="login.html";
			}
		});
});
function check() {
	var parten = /^\s*$/ ;
	if($("#namebox").val()=="" || parten.test($("#namebox").val()) || parten.test($("#qq").val()) || $("#qq").val()==""){
		allow=false;
		alert("资料栏请勿为空！")
	}
	else{
		allow=true;
	}
}
function find(){
	if(zc==true)
		check();
	else
		allow=true;
	var xi=$("#xi").val();
	$("#table").empty();
		if(zc==true && allow==true){
			var data={action:"find_zc",num:num,xi:escape(xi),name:escape($("#namebox").val()),qq:$("#qq").val(),classnum:escape($("#classnum").val())};
		}
		else{ 	
			var data={action:"find",xi:escape(xi)};
		}
		$.post("php/handle.php",data,function(data){
			var temp=JSON.parse(data);
			$("table").removeClass("hidden");
			if(temp['status']=="ok"){
				for(var i=0;i<temp['return'].length;i++){
					$("#table").append("<tr><td>"+temp['return'][i]["num"]+"</td><td>"+unescape(temp['return'][i]["name"])+"</td><td>"+temp['return'][i]["qq"]+"</td><td>"+temp['return'][i]["classnum"]+"</td></tr>");
				}
			}
		}); 
		zc=false;
		$("#zcbox").addClass("hidden");
		$("#tip").addClass("hidden");
		$("#tip1").text("请选择要查询的专业：");

}
function quit(){
	$.cookie("num", "", { expires: -1 });
	$.cookie("password", "", { expires: -1 });
	window.location.href="login.html";
}
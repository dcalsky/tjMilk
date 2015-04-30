var num=$.cookie("num");
var password=$.cookie("password"); 
$(document).ready(function(){
	var data={action:"login",num:num,password:password};
		$.post("php/handle.php",data,function(data){
			var temp=JSON.parse(data);
			var status=temp["status"];
			if(status=="ok"){
				$("#login").addClass("hidden");
				$("#num").text("您好："+num);
				$("#quit").click(quit);				
			}else{
				$("#person").addClass("hidden");
				$("#quit").addClass("hidden");
			}
		});
});

function quit(){
	$.cookie("num", "", { expires: -1 });
	$.cookie("password", "", { expires: -1 });
	window.location.href="index.html";
}
var num;
var zc=false;
var allow=false;
$(document).ready(function(){
	$("#login").click(login);
	$("#num").blur(checknum);
	$("#password").blur(checkpassword);
	$("#password1").blur(checkpassword);
});

function checknum(){
	num=$("#num").val();
	if(num.length==7){
		var data={action:"checknum",num:num};
		$.post("php/handle.php",data,function(data){
			var temp=JSON.parse(data);
			var status=temp['status'];
			if(status=="ok"){
				$("#password1").addClass("hidden");
				$("#helpBlock1").text("");
				zc=false;
			}
			else {
				$("#password1").removeClass("hidden");
				$("#helpBlock1").text("");
				$("#helpBlock3").text("*由于第一次登陆，请再次输入密码");
				zc=true;
			}
			}); 
	}else{
		$("#helpBlock1").text("*学号应为7位数");
	}
}
function checkpassword(){
	num=$("#num").val();
	var password=$("#password").val();
	var password1=$("#password1").val();
	if(num.length==7){
		$("#helpBlock1").text("");
		if(password.length==6){
			$("#helpBlock2").text("");
			if(password1==password || zc==false){
				$("#helpBlock3").text("");
				allow=true;
			}else{
				$("#helpBlock3").text("*上下密码不同，请重新输入");
				allow=false;
			}
		}else{
			$("#helpBlock2").text("*密码应为6位数");
			allow=false;
		}
	}else{
		$("#helpBlock1").text("*学号应为7位数");
	}
}
function login(){
	var password=$("#password").val();
	if(allow==true){
		if(zc==true){
			var password1=$("#password1").val();
			var data={action:"login_zc",num:num,password:password};
			$.post("php/handle.php",data,function(data){
				var temp=JSON.parse(data);
				var status=temp['status'];
				if(status=="ok"){
					$.cookie("num", num, { expires: 1 }); 
					$.cookie("password", password, { expires: 1 }); 
					window.location.href="index.html";
				}
			});
		}else{
			var data={action:"login",num:num,password:password};
			$.post("php/handle.php",data,function(data){
				var temp=JSON.parse(data);
				var status=temp['status'];
				if(status=="ok"){
					$.cookie("num", num, { expires: 1 }); 
					$.cookie("password", password, { expires: 1});
					window.location.href="findclass.html";
				}else{
					$("#helpBlock2").text("*密码输入错误！");
				}	
			});
		}
	}
}
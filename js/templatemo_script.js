var delay;
var total;
jQuery(function(){
    $ = jQuery ;
    //main menu
    $("#templatemo_banner_menu ul").singlePageNav({offset: $('#templatemo_banner_menu').outerHeight()});
    //banner slide
    $('.banner').unslider({fluid: true});

    $(window).on("load scroll resize", function(){
        banner_height = ($(document).width()/1920) * 760;
        $('.banner').height(banner_height);
        $('.banner ul li').height(banner_height);
        if(banner_height > 250){
            caption_margin_top = (banner_height-100)/2;
            $('.banner .slide_caption:hidden').show();
            $('.banner .slide_caption').css({"margin-top":caption_margin_top});
        }else{
            $('.banner .slide_caption').hide();
        }
        $("#templatemo_banner_slide > ul > li").css({"background-size":"cover"});
    });
    //about icon
    $(window).on("load scroll resize", function(){
        about_wap_width = $(".about_icon").width();
        about_icon_padding_left = (about_wap_width/100)*30;
        about_icon_width = (about_wap_width/100)*40;
        about_icon_size = (about_icon_width/100)*50;
        about_icon_padding_top = (about_icon_width/100)*25;
        $(".about_icon .imgwap").css({
                                                    'margin-left': about_icon_padding_left,
                                                    'width': about_icon_width,
                                                    'height': about_icon_width,
                                                    });
        $("#templatemo_about .about_icon .imgwap i").css({
                                                                                    "font-size":about_icon_size,
                                                                                    "padding-top":about_icon_padding_top,
                                                                                  });
        $(".about_icon p").css({
                                            'padding-left': "10%",
                                            'padding-right': "10%",
                                            });
    });
$(".registerform").Validform({
        tiptype:3,
        datatype:{//传入自定义datatype类型【方式二】;
            "z2-4" : /^[\u4E00-\u9FA5\uf900-\ufa2d]{2,4}$/
        }
    });

        if($("#milk").find("option:selected").parent().attr('id')=="鲜奶") 
            delay=3;
        else 
            delay=4;
    $("#milk").change(function(){
        $("#d2,#d1").val("");
        $("#tip4,#tip5").text("");
        $("#milk_p").text("品种:"+$("#milk").find("option:selected").text());
        if($("#milk").find("option:selected").parent().attr('id')=="鲜奶") 
            delay=3;
        else 
            delay=4;
        count();
    });
        $("#bld,#room").change(function(){
        $("#room_p").text("寝室楼:"+$("#bld").find("option:selected").text()+"     寝室号:"+$("#room").val());
    });
    $("#mode").change(function(){
        count();
    });
    $("#plus").click(function(){
        if(parseInt($("#number").val())<99)
        $("#number").val(parseInt($("#number").val())+1);
        $("#number_p").text("一次"+$("#number").val()+"袋");
        count();
    });
    $("#reduce").click(function(){
        if(parseInt($("#number").val())>1)
       $("#number").val(parseInt($("#number").val())-1);
        $("#number_p").text("一次"+$("#number").val()+"袋");
        count();
    });
    $("#submit").click(submit);
    $("#back").click(function(){
        window.location.href="milk.html";
    });
});

function day2(){
    var c = $dp.cal;
    var deliverStr = $("#mode").val().split('_');
    var actualday=getDeliverActualNumber($("#d1").val(),c.newdate['y']+"-"+c.newdate["M"]+"-"+c.newdate["d"],deliverStr[1],deliverStr[2]);
    total=(actualday*$("#milk").val()*parseInt($("#number").val())).toFixed(1);
$("#total").text("总计"+actualday*parseInt($("#number").val())+"袋"+"       共 "+(actualday*$("#milk").val()*parseInt($("#number").val())).toFixed(1)+"元");
}
function day1(){
    var c = $dp.cal;
    var deliverStr = $("#mode").val().split('_');
    var actualday=getDeliverActualNumber(c.newdate['y']+"-"+c.newdate["M"]+"-"+c.newdate["d"],$("#d2").val(),deliverStr[1],deliverStr[2]);
    total=(actualday*$("#milk").val()*parseInt($("#number").val())).toFixed(1);
    $("#total").text("总计"+actualday*parseInt($("#number").val())+"袋"+"       共 "+(actualday*$("#milk").val()*parseInt($("#number").val())).toFixed(1)+"元");
}
function count(){
        var deliverStr = $("#mode").val().split('_');
        var actualday=getDeliverActualNumber($("#d1").val(),$("#d2").val(),deliverStr[1],deliverStr[2]);
        total=(actualday*$("#milk").val()*parseInt($("#number").val())).toFixed(1);
        $("#total").text("总计"+actualday*parseInt($("#number").val())+"袋"+"       共 "+(actualday*$("#milk").val()*parseInt($("#number").val())).toFixed(1)+"元");
}
function submit(){
    count();
    if($("#tip1,#tip2,#tip3,#tip4,#tip5").text()=="通过信息验证！通过信息验证！通过信息验证！通过信息验证！通过信息验证！"){
    $("#submit").addClass("disabled");
    $("#submit").text("正在提交ing...");
    var data={action:"submit",
        name:$("#name").val(),
        bld:$("#bld").find("option:selected").text(),
        room:$("#room").val(),
        milk:$("#milk").find("option:selected").text(),
        mode:$("#mode").find("option:selected").text(),
        number:$("#number").val(),
        tel:$("#tel").val(),
        total:total,
        start:$("#d1").val(),
        end:$("#d2").val()  
    };
        $.post("php/milk.php",data,function(data){
            if(data=="ok"){
                $("#messages").text(total);
                $("#success").removeClass("hidden");
                $("#form").addClass("hidden");
                $("#submit").addClass("hidden");
               alert("玻璃瓶装的奶喝完后,空玻璃瓶请务必交给我们进行回收。PS:晚上挂袋子的时候把空瓶放里面，第二天早上会有送奶的同学收。");
            }
        });
}else{alert("填写不正确，请返回填写。")}
}

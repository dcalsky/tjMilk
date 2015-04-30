var delay;
var price;
var milk;
jQuery(function(){
    $ = jQuery ;
$('[data-toggle="radio"]').radiocheck();
$(".registerform").Validform({
        tiptype:3,
        datatype:{//传入自定义datatype类型【方式二】;
            "z2-4" : /^[\u4E00-\u9FA5\uf900-\ufa2d]{2,4}$/
        }
    });
      $('#more').more({'address': 'php/milk.php?action=milkclass'});
      //$('.goods').addClass("col-xs-3 tile");
      $('#exampleModal').on('show.bs.modal', function (event) {
          var button = $(event.relatedTarget) // Button that triggered the modal
          price = button.data('price'); // Extract info from data-* attributes
          milk = button.data('milk') ;
           delay = button.data('milkclass')=="鲜奶"?3:4;
        $('#d1,#d2').val("");
        $('#tip4,#tip5').html("");
        $("#success").addClass("hidden");
        $(".registerform").removeClass("hidden");
        $("#submit").removeClass("hidden");
        $("#submit").removeClass("disabled");
        $("#submit").text("提交订单");
          // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
          // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
          var modal = $(this)
          modal.find('.modal-title').text("产品名："  + milk+"-----单价："+price);
    })
      $('input[name="optionsRadios"]').change(sortMilk);
      $("#submit").click(submit);
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
});

function day2(){
    var c = $dp.cal;
    var deliverStr = $("#mode").val().split('_');
    var actualday=getDeliverActualNumber($("#d1").val(),c.newdate['y']+"-"+c.newdate["M"]+"-"+c.newdate["d"],deliverStr[1],deliverStr[2]);
    total=(actualday*price*parseInt($("#number").val())).toFixed(1);
    $("#total").text("总计"+actualday*parseInt($("#number").val())+"袋"+"       共 "+total+"元");
}
function day1(){
    var c = $dp.cal;
    var deliverStr = $("#mode").val().split('_');
    var actualday=getDeliverActualNumber(c.newdate['y']+"-"+c.newdate["M"]+"-"+c.newdate["d"],$("#d2").val(),deliverStr[1],deliverStr[2]);
    total=(actualday*price*parseInt($("#number").val())).toFixed(1);
    $("#total").text("总计"+actualday*parseInt($("#number").val())+"袋"+"       共 "+total+"元");
}
function count(){
        var deliverStr = $("#mode").val().split('_');
        var actualday=getDeliverActualNumber($("#d1").val(),$("#d2").val(),deliverStr[1],deliverStr[2]);
        total=(actualday*price*parseInt($("#number").val())).toFixed(1);
        $("#total").text("总计"+actualday*parseInt($("#number").val())+"袋"+"       共 "+total+"元");
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
        milk:milk,
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
                $(".registerform").addClass("hidden");
                $("#submit").addClass("hidden");
               alert("玻璃瓶装的奶喝完后,空玻璃瓶请务必交给我们进行回收。PS:晚上挂袋子的时候把空瓶放里面，第二天早上会有送奶的同学收。");
            }
        });
}else{alert("填写不正确，请返回填写。")}
}

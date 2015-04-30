(function( $ ){          
    var target = null;
    var template = null;
    var lock = false;
    var variables = {
        'last'      :    0        
    } 
    var settings = {
        'amount'      :   '8',          
        'address'     :   'comments.php',
        'format'      :   'json',
        'template'    :   '.goods',
        'trigger'     :   '.get_more',
        'scroll'      :   'false',
        'offset'      :   '100',
        'spinner_code':   ''
    }
    
    var methods = {
        init  :   function(options){
            return this.each(function(){
              
                if(options){
                    $.extend(settings, options);
                }
                template = $(this).children(settings.template).wrap('<li/>').parent();
                template.css('display','none')
                $(this).append('<li class="more_loader_spinner">'+settings.spinner_code+'</li>')
                $(this).children(settings.template).remove()   
                target = $(this);
                if(settings.scroll == 'false'){                    
                    $(this).find(settings.trigger).bind('click.more',methods.get_data);
                    $(this).more('get_data');
                }                
                else{
                    if($(this).height() <= $(this).attr('scrollHeight')){
                        target.more('get_data',settings.amount*2);
                    }
                    $(this).bind('scroll.more',methods.check_scroll);
                }
            })
        },
        check_scroll : function(){
            if((target.scrollTop()+target.height()+parseInt(settings.offset)) >= target.attr('scrollHeight') && lock == false){
                target.more('get_data');
            }
        },
        debug :   function(){
            var debug_string = '';
            $.each(variables, function(k,v){
                debug_string += k+' : '+v+'\n';
            })
            alert(debug_string);
        },     
        remove        : function(){            
            target.children(settings.trigger).unbind('.more');
            target.unbind('.more')
            target.children(settings.trigger).remove();
        },
        add_elements  : function(data){
            //alert('adding elements')
            
            var root = target       
         //   alert(root.attr('id'))
            var counter = 0;
            if(data){
                $(data).each(function(){
                    counter++
                    var t = template                    
                    $.each(this, function(key, value){
                        if(key !="pic"){
                            if(t.find('.'+key)) t.find('.'+key).html(value);
                        }else{
                            if(t.find('.pic')) t.find('.pic').attr("src",value);
                        }
                    })         ;
                    //t.attr('id', 'more_element_'+ (variables.last++))
                    if(settings.scroll == 'true'){
                    //    root.append(t.html())
                    root.children('.more_loader_spinner').before(t.html())  
                    }else{
                    //    alert('...')
                          
                          root.children(settings.trigger).before(t.html())  

                    }
                    var now='more_element_'+ ((variables.last++)+1);
                    root.children(settings.template+':last').attr('id', now);
                    $('#'+now+' button').attr("data-milk",$('#'+now+' h3').text());
                    $('#'+now+' button').attr("data-price",$('#'+now+' .price').text());
                    $('#'+now+' button').attr("data-milkClass",$('#'+now+' .milkClass').text());
                    sortMilk();
                })
                
                
            }            
            else  methods.remove()
            target.children('.more_loader_spinner').css('display','none');
            if(counter < settings.amount) methods.remove()            

        },
        get_data      : function(){   
           // alert('getting data')
            var ile;
            lock = true;
            target.children(".more_loader_spinner").css('display','block');
            $(settings.trigger).css('display','none');
            if(typeof(arguments[0]) == 'number') ile=arguments[0];
            else {
                ile = settings.amount;              
            }
            
            $.post(settings.address, {
                last : variables.last, 
                amount : ile                
            }, function(data){            
                $(settings.trigger).css('display','block')
                methods.add_elements(data)
                lock = false;
            }, settings.format)
            
        }
    };
    $.fn.more = function(method){
        if(methods[method]) 
            return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        else if(typeof method == 'object' || !method) 
            return methods.init.apply(this, arguments);
        else $.error('Method ' + method +' does not exist!');
    }
    //$('#more').removeClass('hidden');
    //$('#loading').addClass('hidden');    
})(jQuery)

function sortMilk(){
  switch ($('input[name="optionsRadios"]:checked').val()){
        case "all":
        $('.milkClass').parent().removeClass('hidden')
        break;
        case "yogurt":
        $('.milkClass').parent().addClass('hidden')
        $('.milkClass:contains(酸奶)').parent().removeClass('hidden')
        break;
        case "fresh":
        $('.milkClass').parent().addClass('hidden')
        $('.milkClass:contains(鲜奶)').parent().removeClass('hidden')
        break;
       };}
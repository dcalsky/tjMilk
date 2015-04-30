function getDeliverActualNumber(begin_datestr, end_datestr,date_str,deliver_type){
	  
	 var begin_date = transferStrToDate(begin_datestr);
	 var end_date = transferStrToDate(end_datestr);
	 var actual_number=0;
	 date_str = date_str + ',';
	while(begin_date<=end_date){
		if(deliver_type=='M'){
			date_str = ','+date_str;
			if(date_str.indexOf(','+begin_date.getDate()+',')>=0){
				begin_date.setDate(begin_date.getDate()+1);
				actual_number++;
				continue;
			}
		}else if(deliver_type=='W'){
			if(date_str.indexOf(begin_date.getDay()+',')>=0||(begin_date.getDay()==0&&date_str.indexOf('7')>=0)){
				begin_date.setDate(begin_date.getDate()+1);
				actual_number++;
				continue;
			}
			
		}
		begin_date.setDate(begin_date.getDate()+1);
	}
  return actual_number;

}
function transferStrToDate(dateStr){
	var strSeparator = "-"; //日期分隔符
	var strSeparator2 ="/";
	var strSeparator_hour = ":";
	if(dateStr=="")
	{
		//alert("输入日期格式错误，操作失败");
	}
	else
	{
		var oDate1= dateStr.split(strSeparator);
		if(oDate1.length==1){
			oDate1 = dateStr.split(strSeparator2);
		}
	    if(oDate1[2].length>4){
	    	var tmpStr = oDate1[2].substring(2);
	    	var tmpStr1 = tmpStr.split(strSeparator_hour);
	    	var date_value = new Date(oDate1[0], oDate1[1]-1, oDate1[2].substring(0,2));
	    	date_value.setHours(tmpStr1[0],tmpStr1[1],tmpStr1[2],0);
	    	return date_value;
	    }
	    
	   	var date_value = new Date(oDate1[0], oDate1[1]-1, oDate1[2]);
	
		return date_value;
	}
	}
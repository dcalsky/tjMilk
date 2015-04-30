<?php 
header("Content-Type: text/html; charset=utf-8");
$con = mysql_connect(SAE_MYSQL_HOST_M.':'.SAE_MYSQL_PORT,SAE_MYSQL_USER,SAE_MYSQL_PASS); 
if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }else{
  	mysql_select_db("app_tj666", $con); 
  	mysql_query('SET NAMES UTF8'); 
	if($_REQUEST['action']=="get_base"){
  		$classname=unescape($_POST['classname']);
		$sql="select id,teacher,test,sroce from classname where classname='$classname'";
	  	if($res=mysql_query($sql)){ 
			$return = array();
			while($row=mysql_fetch_array($res)){
			    	$return[] = $row;
			}
	  		print(json_encode($return));
	  	}
}
	if($_REQUEST['action']=="get_info"){
  		$classname=unescape($_POST['classname']);
  		$teacher=unescape($_POST['teacher']);
		$id=mysql_result(mysql_query("select id from classname where classname='$classname' and teacher='$teacher'",$con),0);
	  	$sql="select checkname,givesroce,fixseat,yoursroce,comment from classinfo where id='$id'";
	  	if($res=mysql_query($sql)){ 
			$return = array();
			while($row=mysql_fetch_array($res)){
			    	$return[] = $row;
			}
	  		print(json_encode($return));
	  	}
}		
	if($_REQUEST['action']=="submit"){
		$num=$_POST['num'];
  		$$comment=unescape($_POST['$comment']);
  		$yoursroce=$_POST['yoursroce'];
  		$fixseat=$_POST['fixseat'];
  		$checkname=$_POST['checkname'];
  		$givesroce=$_POST['givesroce'];
  		$sql="INSERT INTO classinfo VALUES ('$id', '$checkname', '$givesroce', '$fixseat','$yoursroce','$comment','$num')";
	  	if(mysql_query($sql)){
			 $status= "ok";
	  	}
	  	else{
	  		$status="worry";
	  		}
	  		print(json_encode(array('status' => $status)));
}  		
	mysql_close($con); 
}
function unescape($escstr) { 
	preg_match_all("/%u[0-9A-Za-z]{4}|%.{2}|[0-9a-zA-Z.+-_]+/", $escstr, $matches); 
	$ar = &$matches[0]; 
	$c = ""; 
	foreach($ar as $val) 
	{ 
	if (substr($val, 0, 1) != "%") 
	{ 
	$c .= $val; 
	} elseif (substr($val, 1, 1) != "u") 
	{ 
	$x = hexdec(substr($val, 1, 2)); 
	$c .= chr($x); 
	} 
	else 
	{ 
	$val = intval(substr($val, 2), 16); 
	if ($val < 0x7F) // 0000-007F 
	{ 
	$c .= chr($val); 
	} elseif ($val < 0x800) // 0080-0800 
	{ 
	$c .= chr(0xC0 | ($val / 64)); 
	$c .= chr(0x80 | ($val % 64)); 
	} 
	else // 0800-FFFF 
	{ 
	$c .= chr(0xE0 | (($val / 64) / 64)); 
	$c .= chr(0x80 | (($val / 64) % 64)); 
	$c .= chr(0x80 | ($val % 64)); 
	} 
	} 
	} 
	return $c; 
}
function escape($string, $in_encoding = 'UTF-8',$out_encoding = 'UCS-2') { 
    $return = ''; 
    if (function_exists('mb_get_info')) { 
        for($x = 0; $x < mb_strlen ( $string, $in_encoding ); $x ++) { 
            $str = mb_substr ( $string, $x, 1, $in_encoding ); 
            if (strlen ( $str ) > 1) { // 多字节字符 
                $return .= '%u' . strtoupper ( bin2hex ( mb_convert_encoding ( $str, $out_encoding, $in_encoding ) ) ); 
            } else { 
                $return .= '%' . strtoupper ( bin2hex ( $str ) ); 
            } 
        } 
    } 
    return $return; 
}
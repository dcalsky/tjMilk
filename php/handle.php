<?php 
header("Content-Type: text/html; charset=utf-8");
$con = mysql_connect(SAE_MYSQL_HOST_M.':'.SAE_MYSQL_PORT,SAE_MYSQL_USER,SAE_MYSQL_PASS); 
if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }else{
  	mysql_select_db("app_tj666", $con); 
  	mysql_query('SET NAMES UTF8');
	if($_REQUEST['action']=="find_zc"){
  		$xi=unescape($_POST['xi']);
		$name=$_POST['name'];
		$qq=$_POST['qq'];
		$classnum=$_POST['classnum'];
		$num=$_POST['num'];
		$id=mysql_result(mysql_query("select id from xi where xi='$xi'",$con),0);
		$sql = "UPDATE user SET classid = '$id',name='$name',qq='$qq',classnum='$classnum' WHERE num = '$num'";
	  	if(mysql_query($sql)){ 
	  		$sql=mysql_query("select num,name,qq,classnum from user where classid='$id'", $con);
			$return = array();
			while($row=mysql_fetch_array($sql)){
			    	$return[] = $row;
			}
			$status="ok";
	  	}else{
	  		$status="worry";
	  		}
	  		print(json_encode(array('status' => $status, 'return' => $return)));
}  		
	if($_REQUEST['action']=="find"){
		$xi=unescape($_POST['xi']);
		$id=mysql_result(mysql_query("select id from xi where xi='$xi'",$con),0);
	  	if($sql=mysql_query("select num,name,qq,classnum from user where classid='$id'", $con) ){ 
			$return = array();
			while($row=mysql_fetch_array($sql)){
			    	$return[] = $row;
			    	$status="ok";
			}
	  	}else{$status="worry";
	  		}
	  		print(json_encode(array('status' => $status, 'return' => $return)));
}
	if($_REQUEST['action']=="login_zc"){
		$num=$_POST['num'];
		$password=$_POST['password'];
		$sql="INSERT INTO user VALUES ('$num', '$password', '3', '','','','none','','')";
	  	if(mysql_query($sql)){ 
			 $status= "ok";
	  	}
	  	else{
	  		$status="worry";
	  		}
	  		print(json_encode(array('status' => $status)));
}   		
	if($_REQUEST['action']=="checknum"){
		$num=$_POST['num'];
		$sql="select * from user where num='$num'";
	  	if($return=mysql_query($sql)){ 
	  		$row=mysql_fetch_array($return);
	  		mysql_free_result($return);
			 if (!$row)
			 	$status= "worry";
			 else 
			 	$status= "ok";
	  		print(json_encode(array('status' => $status)));
	  	}
}   
	if($_REQUEST['action']=="login"){
		$password=$_POST['password'];
		$num=$_POST['num'];
		$sql="select * from user where password='$password' and num='$num'";
	  	if($return=mysql_query($sql)){ 
	  		$row=mysql_fetch_array($return);
	  		mysql_free_result($return);
			 if ($row)
			 	$status= "ok";
			 else 	
			 	$status= "worry";
	  		print(json_encode(array('status' => $status)));
	  	}
}   
	if($_REQUEST['action']=="findname"){
		$num=$_POST['num'];
		$sql="select name from user where num='$num'";
	  	if($return=mysql_query($sql)){ 
	  		$row=mysql_fetch_array($return);
	  		mysql_free_result($return);
			 if ($row[0]=="none")
			 	$status= "none";
			 else{
			 	$status= "had";
			 }
	  		print(json_encode(array('status' => $status, 'return' => $row)));
	  	}
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
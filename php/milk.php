<?php 
header("Content-Type: text/html; charset=utf-8");
$con = mysql_connect(SAE_MYSQL_HOST_M.':'.SAE_MYSQL_PORT,SAE_MYSQL_USER,SAE_MYSQL_PASS); 
if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }else{
  	mysql_select_db("app_tj666", $con); 
  	mysql_query('SET NAMES UTF8');
	if($_REQUEST['action']=="putout"){
	  	if($sql=mysql_query("select * from milk")){ 
			$return = array();
			while($row=mysql_fetch_array($sql)){
			    	$return[] = $row;
			}
			print(json_encode($return));
	  	}
} 
	if($_REQUEST['action']=="milkclass"){
		$last = $_POST['last'];
		$amount = $_POST['amount'];
	  	if($query=mysql_query("select * from milkclass limit $last,$amount")){ 
			while ($row=mysql_fetch_array($query)) {
				$sayList[] = array(
					'price'=>$row['price'],
					'milkClass'=>$row['Class'],
					'milk'=>$row['milk'],
					'pic'=>$row['pic']
			      );
			}
			echo json_encode($sayList);
	  	}
} 
	if($_REQUEST['action']=="get"){
		$name=$_POST['name'];
		$room=$_POST['room'];
		$total=$_POST['total'];
		$mode=$_POST['mode'];
	  	if(mysql_query("UPDATE milk SET pay='1' WHERE room='$room' and total='$total' and name='$name' and mode='$mode'")){ 
 		$status= "ok";
 		print("ok");
	  	}
}  
	if($_REQUEST['action']=="delete"){
		$name=$_POST['name'];
		$room=$_POST['room'];
		$total=$_POST['total'];
	  	if(mysql_query("delete from milk  WHERE room='$room' and total='$total' and name='$name'")){ 
 		$status= "ok";
 		print($status);
	  	}
} 		

	if($_REQUEST['action']=="submit"){
		$name=$_POST['name'];
		$bld=$_POST['bld'];
		$room=$_POST['room'];
		$milk=$_POST['milk'];
		$mode=$_POST['mode'];
		$number=$_POST['number'];
		$total=$_POST['total'];
		$start=$_POST['start'];
		$end=$_POST['end'];
		$tel=$_POST['tel'];
		$sql="INSERT INTO milk VALUES ('$name', '$bld','$room', '$milk', '$mode','$number','$total','$start','$end','$tel','0')";
	  	if(mysql_query($sql)){ 
			 $status= "ok";
	  	}
	  	else{
	  		$status="worry";
	  		}
	  		print($status);
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
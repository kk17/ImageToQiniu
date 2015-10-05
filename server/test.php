<?php
require_once('qiniu/io.php');
require_once('qiniu/rs.php');

function getImage($url) {
    $file = file_get_contents($url);
    return $file;
} 

$url = $_POST['url'];
$accessKey = $_POST['accessKey'];
$secretKey = $_POST['secretKey'];
$fileName = $_POST['fileName'];
$bucket = $_POST['bucket'];
if (empty($url) || empty($accessKey) || empty($secretKey) || empty($fileName) || empty($bucket)) {
    echo 'error';
} else {
        Qiniu_SetKeys($accessKey, $secretKey);
        $putPolicy = new Qiniu_RS_PutPolicy($bucket);
        $upToken = $putPolicy->Token(null);
        $putExtra = new Qiniu_PutExtra();//dirname(__FILE__) . '/' . getImage($url)
        $putExtra->Crc32 = 1;
        list($ret, $err) = Qiniu_Put($upToken, $fileName, getImage($url), $putExtra);
        $result = array();
        if ($err !== null) {
            $result['data'] = $err;
            $result['status'] = 'fail';
            echo json_encode($result);
        } else {
            $result['data'] = $ret;
            $result['status'] = 'success';
            echo json_encode($result);
        }
}



?>
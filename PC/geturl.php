<?php
/**
 * Created by JetBrains PhpStorm.
 * User: semious
 * Date: 12-5-23
 * Time: 下午10:24
 * To change this template use File | Settings | File Templates.
 */
$url = $_GET["url"];
$data = file_get_contents($url);
echo($data);
exit;
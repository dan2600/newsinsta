<?php





$text = $_POST["theText"];
$pontsize = $_POST["pointsize"];
$color = $_POST["theColor"];
$theFont = $_POST["TheFont"];
$rotates = $_POST["rotate"];

$tmpfname = tempnam("/temp", "FOO");


$cmd = "convert -background transparent -size 500x60 -fill '".$color."' -font '".$theFont."' -pointsize ".$pontsize." label:".$text." png:- | convert - -background transparent -rotate ".$rotates." png:".$tmpfname;

exec($cmd);
$fp = fopen($tmpfname, 'rb');

//header("Content-Type: image/png");
//header("Content-Length: " . filesize($tmpfname));

echo base64_encode(file_get_contents($tmpfname));
//echo "convert -size 987x214 -background transparent -fill \"#000000\" -font VH1Replica-Bold.ttf -gravity north caption:\"".$text."\" png:".$tmpfname;

exit;
?>
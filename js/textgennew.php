<?php





$text = $_POST["theText"];
$pontsize = $_POST["pointsize"];
$color = $_POST["theColor"];
$theFont = $_POST["TheFont"];
$rotates = $_POST["rotate"];

$tmpfname = tempnam("/temp", "FOO");


$cmd = "convert -background transparent -size 500x60 -fill '".$color."' -font '".$theFont."' -pointsize ".$pontsize." label:".$text." png:- | convert - -background transparent -rotate ".$rotates." png:".$tmpfname;
   
380x80
6.3

//trunk
convert -background transparent -size 540x80 -gravity center  -fill '#FFFFFF' -font 'DINBold.ttf' -pointsize "66" label:"@TOMLONGTT2" png:- | convert - -background transparent -rotate "6.3" png:"testname.png"
//short

convert -background transparent -size 400x60 -gravity center -distort Arc 75  -fill '#FFFFFF' -font 'DINBold.ttf' -pointsize "50" label:"@MAXEMERSON" png:- | convert - -background transparent -rotate "-6.3" png:"testname.png"


exec($cmd);
$fp = fopen($tmpfname, 'rb');

//header("Content-Type: image/png");
//header("Content-Length: " . filesize($tmpfname));

echo base64_encode(file_get_contents($tmpfname));
//echo "convert -size 987x214 -background transparent -fill \"#000000\" -font VH1Replica-Bold.ttf -gravity north caption:\"".$text."\" png:".$tmpfname;

exit;
?>
<?php

convert -background transparent -size 400x70 -gravity center -rotate 180 -fill '#FFFFFF' -font 'DINBold.ttf' -pointsize "45" label:"@MAXEMERSON" -distort Arc 20 png:- | convert - -background transparent -rotate "-180" png:"testname.png"



$text = $_POST["theText"];
$cardtype = $_POST["cardtype"];


$tmpfname = tempnam("/temp", "FOO");

if(inval($cardtype) -2 >= 0)
{

$cmd = "convert -background transparent -size 540x80 -fill '#FFFFFF' -font 'DINBold.ttf' -pointsize \"66\" label:".$text." png:- | convert - -background transparent -rotate \"6.3\" png:".$tmpfname;
}


else
{
$cmd = "convert -background transparent -size 400x70 -gravity center -rotate 180 -fill '#FFFFFF' -font 'DINBold.ttf' -pointsize \"45\" label:".$text." png:- | convert - -background transparent -rotate \"-180\" png:".$tmpfname;
}


exec($cmd);
$fp = fopen($tmpfname, 'rb');

//header("Content-Type: image/png");
//header("Content-Length: " . filesize($tmpfname));

echo base64_encode(file_get_contents($tmpfname));
//echo "convert -size 987x214 -background transparent -fill \"#000000\" -font VH1Replica-Bold.ttf -gravity north caption:\"".$text."\" png:".$tmpfname;

exit;
?>
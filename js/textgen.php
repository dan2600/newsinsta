<?php



$text = $_POST["theText"];
$cardtype = $_POST["cardtype"];
$rotate = $_POST["rotate"];


$tmpfname = tempnam("/temp", "FOO");

if(intval($cardtype) -2 > 0)
{

$cmd = "convert -background transparent -size 540x80 -gravity center -fill '#000000' -font 'DINBold.ttf' -pointsize \"64\" label:'".$text."' png:- | convert - -background transparent -rotate ".$rotate." png:".$tmpfname;
}


else
{
$cmd = "convert -background transparent -size 400x70 -gravity center -rotate 180 -fill '#FFFFFF' -font 'DINBold.ttf' -pointsize \"45\" label:".$text." -distort Arc 20 png:- | convert - -background transparent -rotate \"-180\" png:".$tmpfname;
}


exec($cmd);
$fp = fopen($tmpfname, 'rb');

//header("Content-Type: image/png");
//header("Content-Length: " . filesize($tmpfname));

echo base64_encode(file_get_contents($tmpfname));
//echo "convert -size 987x214 -background transparent -fill \"#000000\" -font VH1Replica-Bold.ttf -gravity north caption:\"".$text."\" png:".$tmpfname;

exit;
?>
<?php





$text = "hello World";
$pontsize = 50;
$color = "#ffffff";
$theFont = "EamesCenturyModern-Bold.otf";

$tmpfname = tempnam("/temp", "FOO");


$cmd = "convert -background transparent -fill '".$color."' -font '".$theFont."' -pointsize ".$pontsize." label:".$text." png:- | convert - -background transparent -rotate 1.5 png:".$tmpfname;

exec($cmd);
$fp = fopen($tmpfname, 'rb');

//header("Content-Type: image/png");
//header("Content-Length: " . filesize($tmpfname));

echo base64_encode(file_get_contents($tmpfname));
//echo "convert -size 987x214 -background transparent -fill \"#000000\" -font VH1Replica-Bold.ttf -gravity north caption:\"".$text."\" png:".$tmpfname;

exit;
?>
<?php

$text = $_POST["theText"];

$tmpfname = tempnam("/temp", "FOO");

exec("convert -size 987x214 -background transparent -fill \"#FFFFFF\" -font VH1Replica-Bold.ttf -gravity Center caption:\"".$text."\" png:".$tmpfname);

$fp = fopen($tmpfname, 'rb');

//header("Content-Type: image/png");
//header("Content-Length: " . filesize($tmpfname));

echo base64_encode(file_get_contents($tmpfname));
//echo "convert -size 987x214 -background transparent -fill \"#000000\" -font VH1Replica-Bold.ttf -gravity north caption:\"".$text."\" png:".$tmpfname;

exit;
?>
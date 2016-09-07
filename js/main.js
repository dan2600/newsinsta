var sizeRatio;
var imgSize;
var canvas = document.getElementById("thecanvas");
var context = canvas.getContext("2d");
var working = false;
var thecolor = 0;
var colorselect = new Array("blue_OVERLAY.png", "teal_OVERLAY.png", "pink_OVERLAY.png", "red_OVERLAY.png", "yellow_OVERLAY.png", "sky_OVERLAY.png");
var resizing = false;

function setColor(x) {
    thecolor = x;
    wrapText(context, $("#textInput").val().replace(new RegExp("\n", "g"), " \n "), 540, 800, 1080);

}

function wrapText(context, text, x, y, maxWidth) {
    console.log("eah");
    var breakError = false;

    var img1 = new Image();

    //drawing of the test image - img1

    img1.src = 'images/' + colorselect[thecolor];

    img1.onload = function() {
        context.drawImage(img1, 0, 0, canvas.width, canvas.height);
        context.textAlign = "center";
        context.textBaseline = "hanging";

        var words = text.split(' ');
        var line = '';
        var oldx = x;
        var oldy = y;
        var linecount;
        var newlinec = false;
        fontsize = 100 * (imgSize / 1080);
        do {
            x = oldx;
            y = oldy;
            linecount = 0;
            fontsize -= 2;
            lineHeight = fontsize + 2;
            context.font = fontsize + "px replica";
            context.fillStyle = 'white';
            for (var n = 0; n < words.length; n++) {
                //console.log(words[n]);
                if (words[n] === "\n\r" || words[n] === "\n") {
                    newlinec = true;
                    console.log("new Line Character "+words[n]);
                } else {
                    var testLine = line + words[n] + ' ';
                    var metrics = context.measureText(testLine);
                    var testWidth = metrics.width;
                }
                if (testWidth > maxWidth && n > 0 || newlinec === true) {
                    linecount++;
                    //   console.log("current linecountt " + linecount);
                    if (!newlinec) {
                        line = words[n] + ' ';
                    } else {
                        line = '';
                        newlinec = false;
                    }
                    y += lineHeight;
                } else {
                    line = testLine;
                }
            }
            console.log(fontsize + "fontsize linecount" + linecount);

            if (fontsize < 1) {
                console.log("error");
                breakError = true;
                break;
            }
        } while (linecount > 3 || linecount >= 2 && fontsize > 75 );
        if (breakError) {
            console.log("there was a loop error")
            return;
        }

        words = text.split(' ');

        line = '';
        x = oldx;
        console.log("calculated line count is"+ linecount);
        y = linecount === 0 ? oldy + lineHeight : linecount === 1 ? oldy + (lineHeight / 2.2) : oldy + (lineHeight / linecount);
        console.log("y position is " + y)
        for (var n = 0; n < words.length; n++) {
            if (words[n] === "\n\r" || words[n] === "\n") {
                words[n] = "";
                newlinec = true;
            } else {
                var testLine = line + words[n] + ' ';
                var metrics = context.measureText(testLine);
                var testWidth = metrics.width;
            }
            if (testWidth > maxWidth && n > 0 || newlinec === true) {

                context.fillText(line, x, y);
                linecount++;
                console.log("current linecoun final " + linecount);
                if (!newlinec) {
                    line = words[n] + ' ';
                } else {
                    line = '';
                    newlinec = false;
                }
                y += lineHeight;
            } else {
                line = testLine;
            }

        }

        context.fillText(line, x, y);
        var finalimage = canvas.toDataURL();
        var img = document.getElementById("previewImage");
        img.src = finalimage;

    };
}

function loadImage(file) {
    working = true;
    var needcrop = false;
    var preview = document.getElementById('previewImage');
    preview.onLoad = function() { console.log("loaded Image") };
    if (!file) {
        var file = document.querySelector('input[type=file]').files[0];
    }
    var reader = new FileReader();

    reader.addEventListener("load", function() {

        preview.src = reader.result;

        if (preview.naturalWidth / preview.naturalHeight != 1) {
            needcrop = true;
            sizeRatio = preview.naturalWidth / preview.width;
            console.log("image is not square, please crop");
            if (preview.width > preview.height) {
                cropman = preview.height;
                canvas.width = preview.naturalHeight;
                canvas.height = preview.naturalHeight;
            } else {
                cropman = preview.width;
                canvas.width = preview.naturalWidth
                canvas.height = preview.naturalWidth

            }
            console.log(cropman);
            // $("#previewImage").imgAreaSelect({
            //     aspectRatio: '1:1',
            //     handles: true,
            //     onSelectEnd: function(preview, selection) {
            //         $('input[name="x1"]').val(selection.x1);
            //         $('input[name="y1"]').val(selection.y1);
            //         $('input[name="x2"]').val(selection.x2);
            //         $('input[name="y2"]').val(selection.y2);
            //     }
            // });
            resizing = true;
            $("#previewImage").draggable();

            $("body").mouseup(function() {
                if (parseInt($("#previewImage").css("top")) > 0) {
                    $("#previewImage").css("top", "0px")
                }
                if (parseInt($("#previewImage").css("top")) < 500 - parseInt($("#previewImage").css("height"))) {
                    $("#previewImage").css("top", 500 - parseInt($("#previewImage").css("height")) + "px")
                }
                if (parseInt($("#previewImage").css("left")) > 0) {
                    $("#previewImage").css("left", "0px")
                }
                if (parseInt($("#previewImage").css("left")) < 500 - parseInt($("#previewImage").css("width"))) {
                    $("#previewImage").css("left", 500 - parseInt($("#previewImage").css("width")) + "px")
                }
            });
            $("#previewImage").on('mousewheel', function(event) {
            	event.preventDefault();
                currenth = parseInt($("#previewImage").css("height"))
                currenth += event.deltaY;
                $("#previewImage").css("height", currenth + "px");
      
         

            });
        } else {
            console.log("square");
            imgSize = preview.naturalWidth;
            imageToCanvas(0, 0, preview.naturalWidth);
        };

    }, false);

    if (file) {
        $("#main").fadeOut("fast", function() {
            $("#preview").fadeIn("slow", function() {
                var bob = preview.height - 1;
                if (needcrop === true) {
                    $(".cropstuff").show();
                    // $("#previewImage").imgAreaSelect({ x1: 0, x2: bob, y1: 0, y2: bob })
                }
            });
        });
        reader.readAsDataURL(file);
    }
}

$("#crop").on('click', function() {
    var img = document.getElementById('previewImage');
    sizeRatio = img.naturalWidth / img.width;

    var Xcrop = (parseInt($("#previewImage").css("left"))) * sizeRatio;
    var Ycrop = (parseInt($("#previewImage").css("top"))) * sizeRatio;
    var Size = (parseInt($("#previewImage").css("height")) - (parseInt($("#previewImage").css("height")) - 500)) * sizeRatio;
    imgSize = Size;
    console.log(Xcrop + ":x " + Ycrop + ":y s:" + Size)

    imageToCanvas(Xcrop, Ycrop, Size, true);

});

$("#makeText").on("click", function() {

    wrapText(context, $("#textInput").val().replace(new RegExp("\n", "g"), " \n "), 550 * (imgSize / 1080), 780 * (imgSize / 1080), 856 * (imgSize / 1080));

});
//fix the ratio shit
function imageToCanvas(offX, offY, size, cropped) {
    console.log("thesize is " + size)
    var ratio = 1;

    console.log("oversize");
    var backCanvas = document.createElement('canvas');
    var backCtx = backCanvas.getContext('2d');
    backCanvas.width = size;
    backCanvas.height = size;
    var img = document.getElementById("previewImage");
    backCtx.drawImage(img, offX * ratio, offY * ratio);
    canvas.width = 1080;
    canvas.height = 1080;
    size = 1080;
    sizeRatio = 1;
    imgSize = 1080;
    context.drawImage(backCanvas, 0, 0, 1080, 1080);

    var img1 = new Image();

    //drawing of the test image - img1
    img1.onload = function() {
        context.drawImage(img1, 0, 0, size, size);
        var img = document.getElementById("previewImage");
        if (cropped) {
            console.log("croppin");
            $(".cropstuff").hide();
            $("#previewImage").imgAreaSelect({ remove: true })
        };
        $(".textstuff").show();
        img.src = canvas.toDataURL();
    };

    $("#previewImage").css("left", "0px");
    $("#previewImage").css("top", "0px");
    $("#previewImage").css("height", "500px");
    if (resizing) {
        $("#previewImage").draggable('disable');
    }
    $("#previewImage").off('mousewheel');
    img1.src = 'images/' + colorselect[thecolor];

}

$("html").on("dragover", function(e) {
    e.preventDefault();
    console.log("drag");
    e.stopPropagation();
});

$("html").on("drop", function(e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.originalEvent.dataTransfer && working === false) {
        if (e.originalEvent.dataTransfer.files.length) {
            e.preventDefault();
            e.stopPropagation();
            /*UPLOAD FILES HERE*/
            loadImage(e.originalEvent.dataTransfer.files[0]);
            console.log(e.originalEvent.dataTransfer.files[0]);
        }
    }
});

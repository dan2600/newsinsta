var sizeRatio;
var imgSize;
var canvas = document.getElementById("thecanvas");
var context = canvas.getContext("2d");
var working = false;
var thecolor = 0;
var colorselect = new Array("blue_OVERLAY.png", "teal_OVERLAY.png", "pink_OVERLAY.png", "red_OVERLAY.png", "yellow_OVERLAY.png", "sky_OVERLAY.png");
var colorselectb = new Array("blue_BOX.png", "teal_BOX.png", "pink_BOX.png", "red_BOX.png", "yellow_BOX.png", "sky_BOX.png");
var resizing = false;
var isMobile = false;
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    isMobile = true;
    console.log("Mobile Mode");
    $(".mobileBlackout").fadeIn();
}

function makeText(context, text, x, y, maxWidth) {
    console.log("eah");
    var breakError = false;
    var img1 = new Image();
    var img2 = new Image();
    if (text !== "") {
        img1.src = 'images/' + colorselect[thecolor];
    } else {
        img1.src = 'images/' + colorselectb[thecolor];
    }
    img1.onload = function() {
        context.drawImage(img1, 0, 0, canvas.width, canvas.height);

        $.post("js/textgen.php", { theText: text.replace('"', '\"') })
            .done(function(data) {
                console.log(data);
                img2.src = "data:image/png;base64," + data;
            });
    };

    img2.onload = function() {
        context.drawImage(img2, 46, 821);
        var finalimage = canvas.toDataURL("image/jpeg");
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
            $(".cropstuff").show();
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
            resizing = true;
            if (!isMobile) {
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
                currenth = parseInt($("#previewImage").css("height"));
                var scale = 0;
                var lastmoveX = 0;
                var lastmoveY = 0;
                var myElement = document.getElementById('previewImage');
                var hammertime = new Hammer(myElement);
                hammertime.get('pinch').set({ enable: true });
                hammertime.on('pinch', function(ev) {

                    if (scale > ev.scale) {
                        scale = ev.scale;
                        currenth = currenth += 5;
                        $("#previewImage").css("height", currenth + "px");
                    } else {
                        scale = ev.scale;
                        currenth = currenth -= 5;
                        $("#previewImage").css("height", currenth + "px");
                    }

                });

                hammertime.on('pan', function(ev) {
                    currentX = parseInt($("#previewImage").css("left"));
                    currentY = parseInt($("#previewImage").css("top"));
                    console.log(lastmoveX + ev.deltaX)
                    console.log(lastmoveY + ev.deltaY)
                    console.log(ev.velocityX);

                    // if (lastmoveX > ev.deltaX + 10) {
                    //     lastmoveX = ev.deltaX;
                    //     currentX = currentX -= 2;

                    // } else if(lastmoveX > ev.deltaX - 10) {
                    //     lastmoveX = ev.deltaX;
                    //     currentX = currentX += 2;

                    // }

                    $("#previewImage").css("left", currentX + ev.velocityX * 10 + "px").css("top", currentY + ev.velocityY * 10 + "px");

                });
            }
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

        };
        $(".textstuff").show().css('display', 'inline-block');
        img.src = canvas.toDataURL();
    };

    $("#previewImage").css("left", "0px");
    $("#previewImage").css("top", "0px");
    $("#previewImage").css("height", "500px");
    if (resizing && !isMobile) {
        $("#previewImage").draggable('disable');
    }
    $("#previewImage").off('mousewheel');
    img1.src = 'images/' + colorselectb[thecolor];

}

$(document).ready(function() {

    $("html").on("dragover", function(e) {
        e.preventDefault();

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

    $("#download").on('click', function() {

        download($("#previewImage").attr('src'), $("#textInput").val().replace(" ", "-") + ".jpg", "image/jpg");

    });

    $(".cbuto").click(function(e) {
        e.stopPropagation();
        thecolor = $(this).find(".cbox").attr("value");
        console.log("hi " + thecolor);
        makeText(context, $("#textInput").val().replace(new RegExp("\n", "g"), " \n "), 540, 800, 1000);
        return false;
    });

    $("#makeText").on("click", function() {

        makeText(context, $("#textInput").val().replace(new RegExp("\n", "g"), " \n "), 550 * (imgSize / 1080), 780 * (imgSize / 1080), 856 * (imgSize / 1080));

    });

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

});

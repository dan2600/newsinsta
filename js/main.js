//Yay For Globals
var sizeRatio;
var imgSize;
var imgtype = "0";
var canvas = document.getElementById("thecanvas");
var context = canvas.getContext("2d");
var working = false;
var imgZoneSize = 500;
var thecolor = 0;
var colorselect = new Array("blue_OVERLAY.png", "teal_OVERLAY.png", "pink_OVERLAY.png", "red_OVERLAY.png", "yellow_OVERLAY.png", "sky_OVERLAY.png", "meme_OVERLAY.png");
var colorselectb = new Array("blue_BOX.png", "teal_BOX.png", "pink_BOX.png", "red_BOX.png", "yellow_BOX.png", "sky_BOX.png", "meme_BOX.png");
var colorselectqt = new Array("blue_quote.png", "teal_quote.png", "pink_quote.png", "red_quote.png", "yellow_quote.png", "sky_quote.png");
var colorselectbday = new Array("bday1.png", "bday2.png", "bday3.png", "bday4.png");
var resizing = false;
var isMobile = false;
var backimage;

//Mobile Phone Check
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    isMobile = true;
    $("#dad").hide();
    imgZoneSize = 250;
    $("#blackout, #loading, #loading img, .imgcon").css("width", "250px").css("height", "250px");
    $("textarea").css("width", "300px");
  //  $(".mobileBlackout").fadeIn();
};

//I Should have made objects, but whatever, deal with these functions... ;)
//This One Makes the Text / Color Boxes if you don't type text.











    var img1 = new Image();
    var img2 = new Image();


function makeText(context, text, x, y, maxWidth) {

    $("#loading").fadeIn(50);
    context.putImageData(backimage, 0, 0);

    if (text !== "" && imgtype != "3") {

        img1.src = 'images/' + colorselect[thecolor];
    } else if (text == "" && imgtype === "3") 
{

   img1.src = 'images/' + colorselectbday[thecolor];
}
    else {

        img1.src = 'images/' + colorselectb[thecolor];
    }
    img1.onload = function() {

        context.drawImage(img1, 0, 0, canvas.width, canvas.height);
        if (text !== "") {
            var processor = "js/textgen.php";
            if (imgtype === "1") {
                processor = "js/textgenqt.php";
            }
            if (imgtype === "2") {
                processor = "js/textgenmeme.php";
            }

            $.post(processor, { theText: text.replace('"', '\"') })
                .done(function(data) {

                    img2.src = "data:image/png;base64," + data;
                });
        } else {

            var finalimage = canvas.toDataURL("image/jpeg");
            var img = document.getElementById("previewImage");
            img.src = finalimage;
            $("#loading").fadeOut();
        }
    };

    img2.onload = function() {
        if (imgtype === "0") {
            context.drawImage(img2, 46, 821);
        } else if (imgtype === "1") {
            context.drawImage(img2, 515, 176);
        } else if (imgtype === "2") {
            context.drawImage(img2, 64, 50);
        }
        var finalimage = canvas.toDataURL("image/jpeg");
        var img = document.getElementById("previewImage");
        img.src = finalimage;
        $("#loading").fadeOut();
    };
}

function loadImage(file) {
    working = true;
    var needcrop = false;
    var preview = document.getElementById('previewImage');
    preview.onLoad = function() { };
    if (!file) {
        var file = document.querySelector('input[type=file]').files[0];
    }
    var reader = new FileReader();

    reader.addEventListener("load", function() {

        preview.src = reader.result;

        if (preview.naturalWidth / preview.naturalHeight != 1) {
            if (imgtype === "1") {
                $("#blackout").show();
            }
            needcrop = true;
            $(".cropstuff").show();
            sizeRatio = preview.naturalWidth / preview.width;

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
                    if (parseInt($("#previewImage").css("top")) < imgZoneSize - parseInt($("#previewImage").css("height"))) {
                        $("#previewImage").css("top", imgZoneSize - parseInt($("#previewImage").css("height")) + "px")
                    }
                    if (imgtype != "1") {
                        if (parseInt($("#previewImage").css("left")) > 0) {
                            $("#previewImage").css("left", "0px")
                        }
                        if (parseInt($("#previewImage").css("left")) < imgZoneSize - parseInt($("#previewImage").css("width"))) {
                            $("#previewImage").css("left", imgZoneSize - parseInt($("#previewImage").css("width")) + "px")
                        }
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
                    $("#previewImage").css("height", currenth*ev.scale + "px");
                    // if (scale > ev.scale) {
                    //     scale = ev.scale;
                    //     //currenth = currenth -= 3;
                    //     $("#previewImage").css("height", currenth + "px");
                    // } else {
                    //     scale = ev.scale;
                    //     currenth = currenth += 3;
                    //     $("#previewImage").css("height", currenth + "px");
                    // }

                });
                hammertime.on("pinchend", function(ev){
                    currenth = parseInt($("#previewImage").css("height"));

                });
var currentX;
var currentY;

                    hammertime.on( "panstart", function( e ) {
                    currentX = parseInt($("#previewImage").css("left"));
                    currentY = parseInt($("#previewImage").css("top"));
    } );

                hammertime.on('pan', function(ev) {
                     var deltaX = currentX + ev.deltaX;
                      var deltaY = currentY + ev.deltaY;

                    $("#previewImage").css("left", deltaX + "px").css("top", deltaY + "px");

               });
            

                hammertime.on('panend pinchend', function(){

                                        if (parseInt($("#previewImage").css("top")) > 0) {
                        $("#previewImage").css("top", "0px")
                    }
                    if (parseInt($("#previewImage").css("top")) < imgZoneSize - parseInt($("#previewImage").css("height"))) {
                        $("#previewImage").css("top", imgZoneSize - parseInt($("#previewImage").css("height")) + "px")
                    }
                    if (imgtype != "1") {
                        if (parseInt($("#previewImage").css("left")) > 0) {
                            $("#previewImage").css("left", "0px")
                        }
                        if (parseInt($("#previewImage").css("left")) < imgZoneSize - parseInt($("#previewImage").css("width"))) {
                            $("#previewImage").css("left", imgZoneSize - parseInt($("#previewImage").css("width")) + "px")
                        }
                    }



                });
            }
        } else {
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
                }
            });
        });
        reader.readAsDataURL(file);
    }
}
//fix the ratio shit
function imageToCanvas(offX, offY, size, cropped) {
    $("#loading").fadeIn(50);
    if (imgtype === "0") {
        $("#headline").show();
        $("#meme").hide();
    }

    if (imgtype === "1") {
        $("#blackout").hide();
    }
    if (imgtype === "2") {
        $("#headline").hide();
        $("#meme").show();
    }

    var ratio = 1;

    var backCanvas = document.createElement('canvas');
    var backCtx = backCanvas.getContext('2d');
    backCanvas.width = size;
    backCanvas.height = size;
    var img = document.getElementById("previewImage");
    backCtx.drawImage(img, offX * ratio, offY * ratio);


    //greyscale logic
    if ($("#bwbox").is(":checked")) {
        var imageData = backCtx.getImageData(0, 0, size, size);
        var data = imageData.data;

        for (var i = 0; i < data.length; i += 4) {
            var brightness = 0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2];
            // red
            data[i] = brightness;
            // green
            data[i + 1] = brightness;
            // blue
            data[i + 2] = brightness;
        }

        // overwrite original image
        backCtx.putImageData(imageData, 0, 0);
    }

    canvas.width = 1080;
    canvas.height = 1080;
    size = 1080;
    sizeRatio = 1;
    imgSize = 1080;
    context.drawImage(backCanvas, 0, 0, 1080, 1080);
        if(!backimage)
    {
        backimage = context.getImageData(0, 0, 1080, 1080);
    }

    var img1 = new Image();

    //drawing of the test image - img1
    img1.onload = function() {
        context.drawImage(img1, 0, 0, size, size);
        var img = document.getElementById("previewImage");
        if (cropped) {
            $(".cropstuff").hide();

        };
        $(".textstuff").show().css('display', 'inline-block');
                if(imgtype === "3")
    {
       $("#textInput").hide();
        $(".notbox").hide();
    }
        img.src = canvas.toDataURL();
        $("#loading").fadeOut();
    };

    $("#previewImage").css("left", "0px");
    $("#previewImage").css("top", "0px");
    $("#previewImage").css("height", imgZoneSize+"px");
    if (resizing && !isMobile) {
        $("#previewImage").draggable('disable');
    }
    $("#previewImage").off('mousewheel');
    if (imgtype === "1") {
        colorselect = colorselectqt;
        colorselectb = colorselectqt;
    }

    img1.src = 'images/cleartest.png';

}
var colors = ["#ffffff", "#ffffff", "#b934ff", "#fe5ca6", "#ffffff", "#ffffff", "#ff4f51", "#ff6565", "#ff4dba"]
var name1x =[334, 318, 308, 595, 530, 245, 680, 400, 350];
var name1y = [174, 201, 186, 540, 620, 425, 520, 340, 265];


var radioval = 0;

$(document).ready(function() {


$('input[name="optradio"]').click(function() { radioval = $('input[name="optradio"]:checked').val() });

$("#makeCard").click(function(){

        var img1 = new Image();
        var img2 = new Image();
        var img3 = new Image();
        canvas.width = 1080;
        canvas.height = 1080;
       img1.src = 'images/' + "card"+radioval+".jpg";

    img1.onload = function() {
        console.log("loaded");

        context.drawImage(img1, 0, 0, canvas.width, canvas.height);
        var text = $("#toInput").val();
        $.post("js/textgen.php", { theText: text.replace('"', '\"'), cardtype: radioval})
                .done(function(data) {
                    console.log(data);
                    img2.src = "data:image/png;base64," + data;
                });
        //var img2 = new Image();
      //  img2.src = 'images/' + "testnamewine.png";
       img2.onload = function() {
       context.drawImage(img2, name1x[radioval], name1y[radioval]);
       $("#previewImage").show();
 $("#download").show();

             var finalimage = canvas.toDataURL("image/jpeg");
            var img = document.getElementById("previewImage");
            img.src = finalimage;
     


}
}
});







    $("#download").on('click', function() {
        var bob = $("#toInput").val();
        if(!bob)
        {
            bob = (Math.floor(Math.random()*10000)).toString();
        }

        download($("#previewImage").attr('src'), bob.replace(" ", "-") + ".jpg", "image/jpg");

    });

    $(".cbuto").click(function(e) {
        e.stopPropagation();
        thecolor = $(this).find(".cbox").attr("value");
        makeText(context, $("#textInput").val().replace(new RegExp("\n", "g"), " \n"), 540, 800, 1000);
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
        var Size = (parseInt($("#previewImage").css("height")) - (parseInt($("#previewImage").css("height")) - imgZoneSize)) * sizeRatio;
        imgSize = Size;
        imageToCanvas(Xcrop, Ycrop, Size, true);
    });
    $('input[name="optradio"]').click(function() { imgtype = $('input[name="optradio"]:checked').val() });
});

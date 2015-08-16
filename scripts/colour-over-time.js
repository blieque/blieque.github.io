/**
 *
 *  @author  Blieque Mariguan <himself@blieque.co.uk
 *  @license MIT license
 *
 *  @file    Gradually, constantly changes the colour of various page elements.
 *
 */

// variables

var timeMs = 0,
    intervalSec = .5; // number of seconds between changes (can be decimal)

    // integer, between 15 and 29 inclusive
    // float, 1/3 or 1/2
    // integer, between 30 and 329 inclusive
var saturationMult = Math.floor(Math.random() * 15) + 15,
    saturationStrch = 1 / (Math.floor(Math.random() * 2)) + 2,
    saturationShift = Math.floor(Math.random() * 300) + 30;

    // integer, between 10 and 19 inclusive
    // float, between 2/5 exclusive and 2/3 inclusive
var lightnessMult = Math.floor(Math.random() * 10) + 10,
    lightnessStrch = 1 / (Math.random() + 1.5);

var record = window.location.hash == "#record",
    recordInterval = 2,
    recordString = "";

// functions

function updateColour() {

    timeMs = Date.now();

    var hue = Math.floor(timeMs / (intervalSec * 1000)) % 360,
        saturation = Math.sin((hue * saturationStrch + saturationShift) * Math.PI/180) * saturationMult + 30,
        lightness = Math.sin(hue * Math.PI / 180) * lightnessMult + 30,

        cssString = "background:hsl(" + hue + "," +
                    Math.floor(saturation) + "%," +
                    Math.floor(lightness) + "%)",
        elements = document.querySelectorAll("header,#pg a,#pg div,article>h1+div");

    for (var i = 0; i < elements.length; i++) {
        elements[i].style.cssText = cssString;
    };

    if (record && hue % recordInterval == 0) {

        recordString = hue + " " + Math.round(saturation) + " " + Math.round(lightness) + ",";

        if (recordString.length > 3600) {

            dataUri = "data:application/octet-stream," + encodeURIComponent(recordString);
            dlWindow = window.open(dataUri, "download");

            var    hash = window.location.hash == "#record" ? "" : "#record";
            window.location = window.location.href + hash;
            window.location.reload();

        }

    }

}

// runtime

updateColour();
var colourcyle = setInterval(updateColour,intervalSec * 1000);

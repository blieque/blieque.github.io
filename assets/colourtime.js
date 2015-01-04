/*
 *	colourtime.js
 *	Blieque Mariguan, GPLv3
 *
 *	Starting with a value based on the current time, this script gradually
 *	changes the colour of a number of elements on https://blieque.github.io
 *
 */

// variables

var timeMs			= 0,
	intervalSec		= 2,	// number of seconds between changes (can be decimal)
	saturationMult	= Math.floor(Math.random() * 15) + 15,
	saturationStrch	= 1 / Math.floor(Math.random() * 2 + 2),
	saturationShift	= Math.floor(Math.random() * 300) + 30,
	lightnessMult	= Math.floor(Math.random() * 10) + 10,
	lightnessStrch	= 1 / (Math.random() + 1.5);

var record			= window.location.hash == "#record",
	recordInterval	= 2,
	recordString	= "";

// functions

function updateColour() {

	timeMs			= Date.now();

	var hue			= Math.floor(timeMs / (intervalSec * 1000)) % 360,
		saturation	= Math.sin((hue * saturationStrch + saturationShift) * Math.PI/180) * saturationMult + 30,
		lightness	= Math.sin(hue * Math.PI / 180) * lightnessMult + 30,

		cssString	= "background:hsl(" + hue + "," +
					  Math.floor(saturation) + "%," +
					  Math.floor(lightness) + "%)",
		elements	= document.querySelectorAll("header,#pg a,#pg div,article>h1+div");

	for (var i = 0; i < elements.length; i++) {
		elements[i].style.cssText	= cssString;
	};

	if (record && hue % recordInterval == 0) {

		recordString  += hue + " " + Math.round(saturation) + " " + Math.round(lightness) + ",";

		if (recordString.length > 3600) {

			dataUri		= "data:application/octet-stream," + encodeURIComponent(recordString);
			dlWindow	= window.open(dataUri, "download");

			var	hash	= window.location.hash == "#record" ? "" : "#record";
			window.location	= window.location.href + hash;
			window.location.reload();

		}

	}

}

// runtime

updateColour();
var colourcyle	= setInterval(updateColour,intervalSec * 1000);
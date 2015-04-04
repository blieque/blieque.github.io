/* Redirect all HTTP traffic to HTTPS.
 * I'd give this an MIT license, but then I have to distribute the license too.
 * Do with it whatever your heart desires. */
if (window.location.protocol != 'https:') {
	window.location.href = 'https:' + window.location.href.substring(6);
}

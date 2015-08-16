/**
 *
 *  @author  Blieque Mariguan <himself@blieque.co.uk
 *  @license MIT license
 *
 *  @file    Redirects all HTTP to HTTPS.
 *  There are better ways of doing this, such as in the webserver
 *  configuration, but these are not available with GitHub pages.
 *
 */

if (window.location.protocol != 'https:') {
    window.location.href = 'https:' + window.location.href.substring(6);
}

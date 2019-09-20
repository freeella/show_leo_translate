// ==UserScript==
// @name         show_leo_translate
// @namespace    http://ellinger.me/
// @downloadURL  https://raw.githubusercontent.com/freeella/show_leo_translate/master/show_leo_translate.js
// @version      0.2
// @description  Showing dict.leo.org translation in iFrame when selecting a word; tested with current Mozilla Firefox and Google Chrome; change URL to support different languagues
// @author       Kai Ellinger, coding@blicke.de
// @match        https://*/*
// @match        http://*/*
// @grant        none
// @run-at document-body
// ==/UserScript==

function show_web_dict(event)
{
    'use strict';
    // change URL if other translation is needed
    var searchUrl = "https://dict.leo.org/englisch-deutsch/%S#centerColumn"
    var outputWindowWidth = "90%";
    var outputWindowHeight = "400px";
    if (document.getElementById("leoframe") && window.getSelection().toString() === "" ) {
        var leoFrame = document.getElementById("leoframe")
        leoFrame.parentNode.removeChild(leoFrame);
    } else if( window.getSelection &&
        window.getSelection().toString() !== "" &&
        !document.getElementById("leoframe") ) {
        var posX = event.clientX;
        var posY = event.clientY;
        var ifrm = document.createElement("iframe");
        ifrm.setAttribute('id', 'leoframe');
        ifrm.setAttribute("src", searchUrl.replace("%S", encodeURI(window.getSelection()) ) );
        ifrm.style.width = outputWindowWidth;
        ifrm.style.height = outputWindowHeight;
        document.body.appendChild(ifrm);
        ifrm.style.position = "fixed"
        ifrm.style.top = (posY + 20) + 'px'
        ifrm.style.left= (30) + 'px'
    }
}

(function() {
    'use strict';
    document.addEventListener('dblclick', show_web_dict, false);
    document.addEventListener('click', show_web_dict, false);
})();
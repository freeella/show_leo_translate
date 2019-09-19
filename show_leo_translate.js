// ==UserScript==
// @name         show_leo_dict
// @namespace    http://ellinger.me/
// @version      0.1
// @description  Showing dict.leo.org translation when selecting a word
// @author       You
// @match        https://*/*
// @match        http://*/*
// @grant        none
// ==/UserScript==

function show_leo_dict()
{
    if (document.getElementById("leoframe") && window.getSelection().toString() === "" ) {
        var leoFrame = document.getElementById("leoframe")
        leoFrame.parentNode.removeChild(leoFrame);
    } else if(window.getSelection && window.getSelection().toString() !== "" && !document.getElementById("leoframe") ) {
        var e = window.event;
        var posX = e.clientX;
        var posY = e.clientY;
        var ifrm = document.createElement("iframe");
        ifrm.setAttribute('id', 'leoframe');
        ifrm.setAttribute("src",
                          "https://dict.leo.org/englisch-deutsch/" +
                          encodeURI(window.getSelection()) +
                          "#centerColumn");
        ifrm.style.width = "900px";
        ifrm.style.height = "400px";
        document.body.appendChild(ifrm);
        ifrm.style.position = "fixed"
        ifrm.style.top = (posY + 20) + 'px'
        ifrm.style.left= (30) + 'px'
    }
}

(function() {
    document.addEventListener('dblclick', show_leo_dict, false);
    document.addEventListener('click', show_leo_dict, false);
})();
// ==UserScript==
// @id          WDhome view button@https://github.com/mshavliuk/uerscripts
// @name        WDhome view button
// @namespace   https://github.com/mshavliuk/uerscripts
// @description Add the direct link to the file in WDHome web GUI
// @author      mshavliuk
// @license     MIT; https://opensource.org/licenses/MIT
// @version     0.2
// @icon        https://www.mycloud.com/favicon.ico
// @grant       none
// @run-at      document-end
// @include     /^https?://home.mycloud.com/.*$/
// ==/UserScript==
/* global unsafeWindow */

(function(unsafeWindow) {
    unsafeWindow.document.addEventListener('contextmenu', async (e) => {
        await new Promise(r => setTimeout(r, 0)); // Just to run the following code asynchronously

        const el = e.target;
        if(el.closest('.ListViewItem') === null) {
            return;
        }

        const downloadButton = Array.from(document.querySelectorAll('div.ContextMenuItem'))
            .filter(el => el.textContent.toLowerCase().includes('download'))[0]

        const linkWrapper = downloadButton.closest('a')
        const url = linkWrapper.href;
        const urlToView = url.replace('download=true&', '');
        console.log('urlToView', urlToView)
    })
})(typeof unsafeWindow !== "undefined" ? unsafeWindow : window);
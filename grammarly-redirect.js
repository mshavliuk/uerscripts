// ==UserScript==
// @id          Grammarly Redirector@https://github.com/mshavliuk/uerscripts
// @name        Grammarly Redirector
// @namespace   https://github.com/mshavliuk/uerscripts
// @description Redirect to new note from Grammarly start page
// @author      mshavliuk
// @license     MIT; https://opensource.org/licenses/MIT
// @version     0.2
// @icon        https://denali-static.grammarly.com/files/8bcab69b48fd091107bf9cddb0080e87/android-chrome-256x256.png
// @updateURL   https://raw.githubusercontent.com/mshavliuk/uerscripts/master/grammarly-redirect.js
// @grant       none
// @run-at      document-end
// @include     /^https?://app\.grammarly\.com/?$/
// ==/UserScript==
/* global unsafeWindow */

(function(unsafeWindow) {
    if(history.length > 2) {
        return;
    }

    const redirectFn = () => {
        const intervalId = setInterval(() => {
            const el = document.querySelector('[data-name="new-doc-add-btn"]');
            if(el !== null) {
                el.click();
                clearInterval(intervalId);
                unsafeWindow.removeEventListener('load', redirectFn);
            }
        }, 100);
    };

    unsafeWindow.addEventListener('load', redirectFn)
})(typeof unsafeWindow !== "undefined" ? unsafeWindow : window);
// ==UserScript==
// @id          Youtube Blocker@https://github.com/mshavliuk/uerscripts
// @name        Youtube Blocker
// @namespace   https://github.com/mshavliuk/uerscripts
// @description Block youtube usage by preset rules
// @author      mshavliuk
// @license     MIT; https://opensource.org/licenses/MIT
// @version     0.1
// @icon        https://www.youtube.com/s/desktop/aa71f599/img/favicon_144.png
// @updateURL   https://raw.githubusercontent.com/mshavliuk/uerscripts/master/youtube-blocker.js
// @grant       none
// @run-at      document-start
// @include     /^https?:\/\/(www\.)?youtube.com.*$/
// ==/UserScript==
/* global unsafeWindow */

(function (unsafeWindow) {
    const templateHTML = `
      <div class="modal micromodal-slide" id="modal-1" aria-hidden="true">
        <div class="modal__overlay" tabindex="-1" data-micromodal-close>
          <div class="modal__container" role="dialog" aria-modal="true" aria-labelledby="modal-1-title">
            <header class="modal__header">
              <h2 class="modal__title" id="modal-1-title">
                Micromodal
              </h2>
              <button class="modal__close" aria-label="Close modal" data-micromodal-close></button>
            </header>
            <main class="modal__content" id="modal-1-content">
              <p>
                Try hitting the <code>tab</code> key and notice how the focus stays within the modal itself. Also, <code>esc</code> to close modal.
              </p>
            </main>
            <footer class="modal__footer">
              <button class="modal__btn modal__btn-primary">Continue</button>
              <button class="modal__btn" data-micromodal-close aria-label="Close this dialog window">Close</button>
            </footer>
          </div>
        </div>
      </div>
    `;

    const main = async () => { // or check document.readyState === 'complete'
        console.log('run main')

        const loadScript = (url) => new Promise((resolve, reject) => {
            var s = document.createElement('script');
            s.setAttribute('src', url);

            s.onload = resolve;
            document.head.appendChild(s);
        });

        const loadStyle = (url) => new Promise((resolve, reject) => {
            var link = document.createElement('link');
            link.type = "text/css";
            link.rel = "stylesheet";
            link.media = "screen,print";
            link.href = url;

            link.onload = resolve;
            document.head.appendChild(link);
        });


        await loadStyle('https://micromodal.now.sh/styles.f3827981.css');
        await loadScript('https://unpkg.com/micromodal/dist/micromodal.min.js');

        const modalWrapper = document.createElement('div')
        modalWrapper.innerHTML = templateHTML;
        unsafeWindow.document.body.appendChild(modalWrapper)
        MicroModal.init();
        setTimeout(() => MicroModal.show('modal-1'), 10000)
    };

    if (document.readyState === 'complete') {
        console.log('document was ready')
        main();
    } else {
        unsafeWindow.addEventListener('load', main)
        console.log('add on load listener')
    }
})(typeof unsafeWindow !== "undefined" ? unsafeWindow : window);

window.addEventListener('load', e => {
    const clampTextAttribute  = "max-rows";
    const textAttribute  = "data-text";

    const AMOUNT_OF_CHECK_CHARS = 10;
    const LENGTH_OF_LINK_DETAIL = 3;

    const clampSelector  = ".slider__text";
    const searchSelector = ".slider__text-slide";

    const baseObjects = searchSelector === "" ? document : document.querySelectorAll(searchSelector);

    function addLinkDetail(textObj) {
        const lineHeight = getLineHeight(textObj);
        const link = textObj.getAttribute('href');
        textObj.insertAdjacentHTML("beforeend",
            ` <a href=${link} class="link-detail" style="width:${lineHeight}px">
                    <span class="link-detail__icon"></span>
                  </a>`);
    }

    function clampText(textObj) {
        const lineHeight = getLineHeight(textObj);
        const originalText = getOriginalText(textObj);
        const totalChars = originalText.length;

        const bounds = textObj.getBoundingClientRect();
        const totalLinesCount = bounds.height / lineHeight;

        const availableLength = totalLinesCount * bounds.width;
        const avgCharWidth = Math.round(availableLength / textObj.textContent.length);

        const charsPerLine = bounds.width / avgCharWidth;
        const targetChars = Math.ceil(charsPerLine * parseInt(textObj.getAttribute(clampTextAttribute)));

        if (totalChars > (targetChars-LENGTH_OF_LINK_DETAIL)) {
            const nextSpace = originalText.indexOf(" ", targetChars - AMOUNT_OF_CHECK_CHARS);
            const nextComma = originalText.indexOf(",", targetChars - (AMOUNT_OF_CHECK_CHARS+1));
            const minNext = Math.min(nextSpace, nextComma);
            const totalLength = minNext > -1 ? minNext : targetChars;

            textObj.textContent = originalText.substr(0, totalLength);
        }else
            textObj.textContent = originalText;

        addLinkDetail(textObj);
    }

    function addTextAttribute(textObj) {
        textObj.setAttribute(textAttribute, textObj.textContent);
    }

    function getOriginalText(textObj) {
        let originalText = textObj.getAttribute(textAttribute);
        if (originalText == null) {
            addTextAttribute(textObj);
            originalText = textObj.getAttribute(textAttribute);
        }
        return originalText;
    }

    function getLineHeight(textObj) {
        return parseFloat(window.getComputedStyle(textObj).lineHeight);
    }


    baseObjects.forEach(baseObj => {
        baseObj.querySelectorAll(clampSelector).forEach(textObj => {
            if (textObj.getAttribute(clampTextAttribute) == null)
                return;
            addTextAttribute(textObj);
            clampText(textObj);
        });
    });

    window.addEventListener("resize", () => {
        baseObjects.forEach(baseObj => {
            baseObj.querySelectorAll(clampSelector).forEach(textObj => {
                clampText(textObj);
            });
        });
    });
});
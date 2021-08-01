const SOSUtils = {
    fitText: function(jquerySelector, maxFontSize) {
        // get the DOM output element by its selector

        $(jquerySelector).each(function () {
            let outputDiv = this;
            outputDiv.style.whiteSpace = "nowrap";

            // max font size in pixels
            maxFontSize = maxFontSize || parseInt(outputDiv.style.fontSize, 10);

            // get element's width
            let width = outputDiv.clientWidth;
            // get content's width
            let contentWidth = outputDiv.scrollWidth;
            // get fontSize
            let fontSize = parseInt(window.getComputedStyle(outputDiv, null).getPropertyValue('font-size'), 10);
            // if content's width is bigger then elements width - overflow
            if (contentWidth > width) {
                fontSize = Math.ceil(fontSize * width / contentWidth, 10);
                fontSize = fontSize > maxFontSize ? fontSize = maxFontSize : fontSize - 1;
                outputDiv.style.fontSize = fontSize + 'px';
            } else {
                // content is smaller then width... let's resize in 1 px until it fits
                while (contentWidth === width && fontSize < maxFontSize) {
                    fontSize = Math.ceil(fontSize) + 1;
                    fontSize = fontSize > maxFontSize ? fontSize = maxFontSize : fontSize;
                    outputDiv.style.fontSize = fontSize + 'px';
                    // update widths
                    width = outputDiv.clientWidth;
                    contentWidth = outputDiv.scrollWidth;
                    if (contentWidth > width) {
                        outputDiv.style.fontSize = fontSize - 1 + 'px';
                    }
                }
            }
        })
    },
    __textCalculationElem: undefined,
    getTextWidth: function(text, fontFamily, fontSize) {
        //965 - 64px Lustra SemiBold uppercase
        if (!this.__textCalculationElem) {
            let id = this.uniqueId("textWidthDiv-");
            this.__textCalculationElem = document.createElement("DIV");

            this.__textCalculationElem.style.opacity = '0';
            this.__textCalculationElem.style.whiteSpace = 'nowrap';
            this.__textCalculationElem.style.display = 'inline-block';
            document.body.append(this.__textCalculationElem);
        }
        this.__textCalculationElem.textContent = "PRIMER";
        this.__textCalculationElem.style.fontSize = fontSize + 'px';
        this.__textCalculationElem.style.fontFamily = fontFamily;
        this.__textCalculationElem.textContent = text;

        return Math.ceil(this.__textCalculationElem.scrollWidth);
    },
    __idCounter: 1,
    uniqueId: function (prefix) {
        return prefix+(++this.__idCounter).toString();
    }
};
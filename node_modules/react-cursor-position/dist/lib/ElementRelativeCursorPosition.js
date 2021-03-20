"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ElementRelativeCursorPosition = function () {
    function ElementRelativeCursorPosition(el) {
        _classCallCheck(this, ElementRelativeCursorPosition);

        this.el = el;
    }

    _createClass(ElementRelativeCursorPosition, [{
        key: "getDocumentRelativeElementOffset",
        value: function getDocumentRelativeElementOffset(el) {
            var rootEl = this.getRootOfEl(el);

            var _rootEl$getBoundingCl = rootEl.getBoundingClientRect(),
                docLeft = _rootEl$getBoundingCl.left,
                docTop = _rootEl$getBoundingCl.top;

            var _el$getBoundingClient = el.getBoundingClientRect(),
                elLeft = _el$getBoundingClient.left,
                elTop = _el$getBoundingClient.top;

            return {
                x: Math.abs(docLeft) + elLeft,
                y: Math.abs(docTop) + elTop
            };
        }
    }, {
        key: "getRootOfEl",
        value: function getRootOfEl(el) {
            if (el.parentElement) {
                return this.getRootOfEl(el.parentElement);
            }
            return el;
        }
    }, {
        key: "getComputedElementRelativeCursorPosition",
        value: function getComputedElementRelativeCursorPosition(event, documentRelativeElementOffset) {
            this.lastEvent = event;
            var position = this.getDocumentRelativeCursorPosition(event);
            var cursorX = position.x,
                cursorY = position.y;
            var offsetX = documentRelativeElementOffset.x,
                offsetY = documentRelativeElementOffset.y;


            return {
                x: Math.round(cursorX - offsetX),
                y: Math.round(cursorY - offsetY)
            };
        }
    }, {
        key: "getDocumentRelativeCursorPosition",
        value: function getDocumentRelativeCursorPosition(event) {
            return {
                x: event.pageX,
                y: event.pageY
            };
        }
    }, {
        key: "getCursorPosition",
        value: function getCursorPosition(event) {
            return this.getComputedElementRelativeCursorPosition(event, this.documentRelativeElementOffset);
        }
    }, {
        key: "documentRelativeElementOffset",
        get: function get() {
            if (!this.elementOffset) {
                this.elementOffset = this.getDocumentRelativeElementOffset(this.el);
            }

            return this.elementOffset;
        }
    }]);

    return ElementRelativeCursorPosition;
}();

exports.default = ElementRelativeCursorPosition;
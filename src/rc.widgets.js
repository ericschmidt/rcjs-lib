/**
 * rc.widgets.js
 * rc.js widgets module
 *
 * Eric Schmidt 2014
 */

(function(win, doc) {
    
    // Create rc namespace
    var rc = win.rc = win.rc || {};

    // Attaches event handlers to elements
    function _addEventHandler(elt, type, handler) {
        if(elt.addEventListener) elt.addEventListener(type, handler);
        else if(elt.attachEvent) elt.attachEvent("on"+type, handler);
    }

    rc.widgets = {
        // rc.widgets.Button
        Button: function(name, x, y, width, height) {
            var buttonElt = doc.createElement("div");
            buttonElt.style.position = "absolute";
            buttonElt.style.top = y+"px";
            buttonElt.style.left = x+"px";
            buttonElt.style.width = width+"px";
            buttonElt.style.height = height+"px";
            buttonElt.className = "rc-button";
            buttonElt.innerHTML = name;
            var _buttonPress = function(e) {
                rc.send(rc.events.BUTTON_PRESS, {
                    name: name
                });
            };
            var _buttonRelease = function(e) {
                rc.send(rc.events.BUTTON_RELEASE, {
                    name: name
                });
            };
            _addEventHandler(buttonElt, "mousedown", _buttonPress);
            _addEventHandler(buttonElt, "touchstart", _buttonPress);
            _addEventHandler(buttonElt, "mouseup", _buttonRelease);
            _addEventHandler(buttonElt, "touchend", _buttonRelease);
            return buttonElt;
        },

        // rc.widgets.Trackpad
        Trackpad: function(name, x, y, width, height, maxX, maxY) {
            maxX = maxX || 1;
            maxY = maxY || 1;
            var trackpadElt = doc.createElement("div");
            trackpadElt.style.position = "absolute";
            trackpadElt.style.top = y+"px";
            trackpadElt.style.left = x+"px";
            trackpadElt.style.width = width+"px";
            trackpadElt.style.height = height+"px";
            trackpadElt.className = "rc-trackpad";
            var _scaledCoordsFromPage = function(pageX, pageY) {
                relX = pageX - x;
                relY = pageY - y;
                return {
                    x: relX*maxX/width,
                    y: relY*maxY/height
                };
            };
            var _dragging = false;
            var _trackpadPress = function(e) {
                _dragging = true;
                var coords = _scaledCoordsFromPage(e.pageX, e.pageY);
                rc.send(rc.events.TRACKPAD_PRESS, {
                    name: name,
                    x: coords.x,
                    y: coords.y
                });
            };
            var _trackpadMove = function(e) {
                if(_dragging) {
                    var coords = _scaledCoordsFromPage(e.pageX, e.pageY);
                    rc.send(rc.events.TRACKPAD_MOVE, {
                        name: name,
                        x: coords.x,
                        y: coords.y
                    });
                }
            };
            var _trackpadRelease = function(e) {
                _dragging = false;
                var coords = _scaledCoordsFromPage(e.pageX, e.pageY);
                rc.send(rc.events.TRACKPAD_RELEASE, {
                    name: name,
                    x: coords.x,
                    y: coords.y
                });
            };
            _addEventHandler(trackpadElt, "mousedown", _trackpadPress);
            _addEventHandler(trackpadElt, "touchstart", _trackpadPress);
            _addEventHandler(trackpadElt, "mousemove", _trackpadMove);
            _addEventHandler(trackpadElt, "touchmove", _trackpadMove);
            _addEventHandler(trackpadElt, "mouseup", _trackpadRelease);
            _addEventHandler(trackpadElt, "touchend", _trackpadRelease);
            return trackpadElt;
        }
    };

})(window, document);
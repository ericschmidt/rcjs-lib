/**
 * rc.app.js
 * rc.js application-side functions
 *
 * Eric Schmidt 2014
 */

(function(win) {

    // Create rc namespace
    var rc = win.rc = win.rc || {};

    // Event handlers
    var _handlers = {};

    // The main WebSocket
    var _socket = io("http://www.rcjs.me:8000");

    // rc.generateId
    // Generates a unique application ID and passes it to callback
    rc.generateId = function(callback) {
        var xmlhttp;
        if (win.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        } else {
            // code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4) {
                if(xmlhttp.status == 200) {
                    callback(xmlhttp.responseText);
                } else {
                    callback({error: "Could not generate ID"});
                }
            }
        };
        xmlhttp.open("POST", "http://www.rcjs.me/generate_id", true);
        xmlhttp.send();
    };

    // rc.initApp
    rc.initApp = function(id, callback) {
        _socket.removeAllListeners("connection-error");
        _socket.removeAllListeners("connection-success");
        _socket.on("connection-error", function(msg) {
            callback({error: msg});
        });
        _socket.on("connection-success", function(data) {
            if(data) {
                _bindListeners();
                callback({success: true});
            }
        });
        _socket.emit("initialize-application", {id: id});
    };

    // rc.listen
    var _listen = function(eventType, handler) {
        if(_handlers[eventType]) {
            _handlers[eventType].push(handler);
        } else {
            _handlers[eventType] = [handler];
        }
    };

    // rc.controller
    var _controller = function(handler) {
        _socket.removeAllListeners("controller-connect");
        _socket.on("controller-connect", function(data) {
            handler(data.id);
        });
    };

    // rc.disconnect
    var _disconnect = function(handler) {
        _socket.removeAllListeners("controller-disconnect");
        _socket.on("controller-disconnect", function(data) {
            handler(data.id);
        });
    };

    // Binds functions to the rc namespace once application is started
    function _bindListeners() {
        _socket.removeAllListeners("controller-event");
        _socket.on("controller-event", _handleEvent);
        rc.listen = _listen;
        rc.controller = _controller;
        rc.disconnect = _disconnect;
    }

    function _handleEvent(data) {
        if(_handlers[data._eventType]) {
            for(var i=0; i<_handlers[data._eventType].length; i++) {
                _handlers[data._eventType][i](data);
            }
        }
    }

})(window);
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

    // rc.initApp
    rc.initApp = function(id, callback) {
        _socket.removeAllListeners("connection-error");
        _socket.removeAllListeners("connection-success");
        _socket.on("connection-error", function(msg) {
            callback({error: msg});
        });
        _socket.on("connection-success", function(data) {
            if(data) {
                _bindListen();
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

    function _bindListen() {
        _socket.on("controller-event", _handleEvent);
        rc.listen = _listen;
    }

    function _handleEvent(data) {
        if(_handlers[data._eventType]) {
            for(var i=0; i<_handlers[data._eventType].length; i++) {
                _handlers[data._eventType][i](data);
            }
        }
    }

})(window);
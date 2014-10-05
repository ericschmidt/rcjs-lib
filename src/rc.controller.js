/**
 * rc.controller.js
 * rc.js controller-side functions
 *
 * Eric Schmidt 2014
 */

(function(win) {

    // Create rc namespace
    var rc = win.rc = win.rc || {};

    // The main WebSocket
    var _socket = io("http://www.rcjs.me:8000");

    // rc.initController
    rc.initController = function(id, callback) {
        _socket.removeAllListeners("connection-error");
        _socket.removeAllListeners("connection-success");
        _socket.on("connection-error", function(msg) {
            callback({error: msg});
        });
        _socket.on("connection-success", function(data) {
            if(data) {
                _bindFunctions();
                callback({success: true});
            }
        });
        _socket.emit("initialize-controller", {id: id});
    };

    // rc.send
    var _send = function(eventType, data) {
        data._eventType = eventType;
        _socket.emit("controller-event", data);
    };

    // rc.disconnect
    var _disconnect = function(handler) {
        _socket.on("application-disconnect", function(data) {
            handler();
        });
    };

    // rc.startAccelerometer
    var _startAccelerometer = function() {
        gyro.startTracking(function(o) {
            _send("rc_accelerometer", o);
        });
    };

    // rc.stopAccelerometer
    var _stopAccelerometer = function() {
        gyro.stopTracking();
    };

    // Binds functions to the rc namespace once controller is connected to application
    function _bindFunctions() {
        rc.send = _send;
        rc.disconnect = _disconnect;
        rc.startAccelerometer = _startAccelerometer;
        rc.stopAccelerometer = _stopAccelerometer;
    }


})(window);
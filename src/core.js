/**
 * core.js
 * rc.js core functions
 *
 * Eric Schmidt 2014
 */

(function(win) {

    // Create rc namespace
    var rc = win.rc = {};

    // The main WebSocket
    var __socket = rc.__socket = io("http://www.rcjs.me:8000");

    // rc.initApp
    rc.initApp = function(id, callback) {
        __socket.on("error", function(msg) {
            //
        });
    };

})(window);
/**
 * rc.events.js
 * rc.js events module
 *
 * Eric Schmidt 2014
 */

(function(win) {
    
    var rc = win.rc = win.rc || {};

    rc.events = {
        BUTTON_PRESS: "rc_button_press",
        BUTTON_RELEASE: "rc_button_release",
        TRACKPAD_PRESS: "rc_trackpad_press",
        TRACKPAD_MOVE: "rc_trackpad_move",
        TRACKPAD_RELEASE: "rc_trackpad_release",
        ACCELEROMETER: "rc_accelerometer"
    };

})(window);
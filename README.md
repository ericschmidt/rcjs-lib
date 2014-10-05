rc.js
========
Customizable remote controls for mobile devices

# Reference

## Core

These are base rc.js functions for managing applications and controllers.

### Methods

* **rc.initApp(id, callback)**

    *id (String)*: A unique ID for the application  
    *callback (Function)*: Called after the initialization is done  
    Initializes an application so controllers can connect to it. If the initialization is successful, *callback* is passed an object of the form `{ success: Boolean }`; if the initialization fails, *callback* is passed an object of the form `{ error: String }`
* **rc.initController(id, callback)**

    *id (String)*: The ID of the application to connect to  
    *callback (Function)*: Called after the initialization is done  
    Connects a controller to an application. If the connection is successful, *callback* is passed an object of the form `{ success: Boolean }`; if the connection fails, *callback* is passed an object of the form `{ error: String }`
* **rc.controller(handler)**

    *handler (Function)*: Callback which is passed the id of the connected controller  
    Calls *handler* when a new controller connects to the application and passes the controller's ID as an argument
* **rc.disconnect(handler)**

    *handler (Function)*: Called when a device disconnects  
    In a main application, calls *handler* when a controller disconnects and passes the ID of the disconnected controller; in a controller, calls *handler* when the application stops running
* **rc.send(event, data)**

    *event (String)*: The event type to trigger  
    *data (Object)*: Data associated with the event  
    Triggers a given event from the controller; can then be read by `rc.listen()` in the application
* **rc.listen(event, handler)**

    *event (String)*: The event type to listen for  
    *handler (Function)*: The event handling function; is passed the data object associated with the event  
    Attaches an event handler to a given event type
* **rc.startAccelerometer()**

    Starts the accelerometer on the controller; periodically triggers `rc.events.ACCELEROMETER` events with data of the form
    ```
    {
        x: Number,
        y: Number,
        z: Number,
        alpha: Number,
        beta: Number,
        gamma: Number
    }
    ```
* **rc.stopAccelerometer()**

    Stops triggering accelerometer events.

## Events

The events module (`rc.events`) contains constants defining different types of default events.

### Constants

* **rc.events.BUTTON_PRESS** = "rc_button_press"
* **rc.events.BUTTON_RELEASE** = "rc_button_release"
* **rc.events.TRACKPAD_PRESS** = "rc_trackpad_press"
* **rc.events.TRACKPAD_MOVE** = "rc_trackpad_move"
* **rc.events.TRACKPAD_RELEASE** = "rc_trackpad_release"
* **rc.events.ACCELEROMETER** = "rc_accelerometer"

## Widgets

The widgets module (`rc.widgets`) contains useful pre-wired UI widgets for easily creating custom controllers.
Using these widgets requires the `rc.css` stylesheet.

### Classes

* **rc.widgets.Button(name, x, y, width, height)**

    *name (String)*: A name/label for the button  
    *x (Number)*: The x position of the button  
    *y (Number)*: The y position of the button  
    *width (Number)*: The width of the button  
    *height (Number)*: The height of the button  
    A simple button.
    Automatically sends the `rc.events.BUTTON_PRESS` and `rc.events.BUTTON_RELEASE` events with data of the form `{ name: String }`
* **rc.widgets.Trackpad(name, x, y, width, height, maxX = 1, maxY = 1)**

    *name (String)*: A name for the trackpad  
    *x (Number)*: The x position of the trackpad  
    *y (Number)*: The y position of the trackpad  
    *width (Number)*: The width of the trackpad on the screen  
    *height (Number)*: The height of the trackpad on the screen  
    *maxX (Number)*: The maximum x value the trackpad will detect  
    *maxY (Number)*: The maximum y value the trackpad will detect  
    A trackpad widget.
    Automatically sends the `rc.events.TRACKPAD_PRESS`, `rc.events.TRACKPAD_MOVE`, and `rc.events.TRACKPAD_RELEASE` events with data of the form
    ```
    {
        name: String,
        x: Number,
        y: Number
    }
    ```

----
Shout outs to Socket.io and gyro.js for making this as seamless as possible!  
  
Aaron Nojima, Eric Schmidt, Nayeon Kim  
October 2014  
www.rcjs.me
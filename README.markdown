#interface.server.gamepad

This module links SpaceNavigators connected to OS X computers to Interface.Server. It is a thin wrapper around the *spacemouse* module.

## Installation

From the Interface.Server folder, run
    npm install interface.server.gamepad

After installing, make sure to add the spacenavigator field to the IO list in the main Interface.Server config.js file. You can define a *rate* property here in Hz to control the speed of message output.

Example config.js

    module.exports = {
        pathToApplications: __dirname + '/applications',
    
        transports: {
          osc : {
            remoteControlPort: 12000,
          },
        },
    
        IO : {
          spacenavigator : { rate: 1/30 } // 30 Hz update rate, 60 is default
        }
    }
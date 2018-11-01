// import { ipcMain } from 'electron';
var fs = require('fs');

import {
  createPromptWindow,
} from '../windows/Prompt';


// -----------------------------------------------------
// Watch Desktop for new screen shots
// -----------------------------------------------------

export function startScreenShotWatcher(path) {
  // console.log('startScreenShotWatcher',path)

  fs.watch(path,  (eventType, filename) => {
    // console.log('eventType',eventType)
  if (filename && eventType === 'rename') {
    // console.log(filename.substring(0,11));
    if(filename.substring(0,11) === "Screen Shot") {

      // We found a new file and yes it's a SCREEN SHOT!
      activeScreenShotPath = path + '/' + filename;
      // return;

      // if(onboardingComplete === true)
        createPromptWindow();

    }
  }
});

}

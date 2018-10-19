# ScreenShit

![Logo](app/icon/128x128.png)

A simple MacOS desktop application designed to make you more efficient with your screen shots. Like the new option that pops up on your iPhone when you take a screenshot, but for desktop.

## Installation

[Download the latest release](https://github.com/kevando/screenshit.git) and give it a spin (MacOS only and might only work on OSX 10.13.6 )  

Please report any bugs.


## Open Source

I made this app using Electron, so you can run this locally if you want.


#### Local Development


```
git clone https://github.com/kevando/screenshit.git
npm install
electron-forge start  
```

html/css/js is in `/src` and image assets are in `/app`


## Why?

I made this app because I take lots of screenshots and want a better way to manage it. ScreenShit runs in the background and monitors for new screen shots. When a new screen shot is detected, ScreenShit prompts you with options for handling the screen shot.  


## References

[Chokidar](https://ourcodeworld.com/articles/read/160/watch-files-and-directories-with-electron-framework) for watching file system.


[Icon Converter](https://iconverticons.com/online) Export icns, export all png 

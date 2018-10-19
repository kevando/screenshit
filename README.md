# ScreenShit

![Logo](app/icon/128x128.png)

A simple MacOS desktop application designed to make you more efficient with your screen shots. Like the new option that pops up on your iPhone when you take a screenshot, but for desktop.

## Installation

1. Download the latest [ScreenShit.zip](https://github.com/kevando/screenshit/releases/download/1.0.0/ScreenShit.zip)
2. Unzip it (it's safe)
3. Right click on ScreenShit.app and select open

![Help1](docs/screen_shot_rightclickapp.png)

## Usage

1. Click start
2. Take screen shot (CMD + SHIFT + 4)
3. Copy image to clipboard
4. Paste (CMD + V) image into apps like iMessage

## Development

I made this app using Electron, so you can run this locally if you want.


#### Run locally from source code


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

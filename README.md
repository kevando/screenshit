### screenshit

![Logo](app/icon/96x96.png)


**Screen Shit** is a simple, yet powerful, desktop application designed to make you more efficient with your screen shots. 

## How to install

1. [Download the latest release](https://github.com/kevando/screenshit/releases/download/v1.0.2/screen-shit-darwin-x64-1.0.2.zip)
2. Unzip it (it's safe)

## How to use

1. Click start
2. Take screen shot (CMD + SHIFT + 4)
3. Copy image to clipboard
4. Paste (CMD + V) image into apps like iMessage



## Why?

I made this app because I take lots of screenshots and want a better way to manage it. ScreenShit runs in the background and monitors for new screen shots. When a new screen shot is detected, ScreenShit prompts you with options for handling the screen shot.  I understand apple includes a features like this in the new osx. I've yet to upgrade my OS.

[Inspired by mac2imgur](https://github.com/mileswd/mac2imgur)




#### Run local


```
git clone https://github.com/kevando/screenshit.git
npm install
electron-forge start  
```

## Code structure
html/css/js is in `/src` and image assets are in `/app`


## References


[Icon Converter](https://iconverticons.com/online) Export icns, export all png 



https://codepen.io/kevando_/pen/YJOmmj

http://lesscss.org/#mixins

# Distribution

```
electron-forge make
```

Look in `out/make/screen-shit-darwin-x64` for .app file

# History

[`2018-11-13`](https://github.com/kevando/screenshit/releases/tag/v1.0.2) **1.0.2**   
[`2018-10-29`](https://github.com/kevando/screenshit/releases/tag/v1.0.1) **1.0.1**   
[`2018-10-19`](https://github.com/kevando/screenshit/releases/tag/v1.0.1) **1.0.0**   

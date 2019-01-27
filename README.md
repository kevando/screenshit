

![Logo](app/icon/128x128.png) 

Screenshit is a minimal desktop application that lets you disable mojave's new screen capture utility, change where you save screen shots, and the option to copy the screen shot image to clipboard. The result is more time for you.


## Today

You actually don't need my app to accomplish these things.

```
# Change your screenshot path
defaults write com.apple.screencapture location /final_destination/Pics

# Disable  Mojave utility
defaults write com.apple.screencapture show-thumbnail -bool FALSE

```

`CMD` + `SHIFT` + `CONTROL` + `4`  will copy your screen shot to clipboard.


![Logo](app/icon/32x32.png) 

Why continue? Learning.

### Development

You are welcome to build the app from source code and tinker with it.

### Building

You'll need [Node.js](https://nodejs.org) installed on your computer in order to build this app.

```bash
git clone git clone https://github.com/kevando/screenshit.git
cd screnshiht
yarn install
yarn start
# or
yarn dev
```

### Distributing

[Forgetful Kevando](https://electronjs.org/docs/tutorial/application-distribution
)

```bash
yarn package-mac
```

## Tomorrow

You are welcome to build the app from source code and tinker with it. In fact I encourage it  :)


![Logo](app/icon/32x32.png) 





#### Ultimate Goal

> I made this app because I take lots of screenshots and want a better way to manage it. ScreenShit runs in the background and monitors for new screen shots. When a new screen shot is detected, ScreenShit prompts you with options for handling the screen shot.  I understand apple includes a features like this in the new osx. I've yet to upgrade my OS.

I also wanted to bring back some classic UI parts from early internet. Sunglasses emoji is a nod to minesweeper and the paper clip is a nod to the jar jar binks of Windows.

[Inspired by mac2imgur](https://github.com/mileswd/mac2imgur)




## Yesterday

[`1.0.3`](https://github.com/kevando/screenshit/releases/tag/v1.0.2) - Mostly for hoffman. Hoping he gives good feedback.  
[`1.0.2`](https://github.com/kevando/screenshit/releases/tag/v1.0.2)   
[`1.0.1`](https://github.com/kevando/screenshit/releases/tag/v1.0.1)    
[`1.0.0`](https://github.com/kevando/screenshit/releases/tag/v1.0.1)   






![Logo](app/icon/16x16.png) 
![Logo](app/icon/16x16.png) 
![Logo](app/icon/16x16.png) 
![Logo](app/icon/16x16.png) 




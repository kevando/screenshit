# Distribution

First a quick over, then a deeper look at some of the more tricky parts.

## A --> Z


### Package code into an `.app` file


```
electron-packager . --overwrite --platform=darwin --arch=x64 --out=out --icon=assets/app-icon/mac/app.icns --osx-sign.identity='Developer ID Application: Kevaid Inc. (E34JX9GA2A)'"
```

I dont thihnk the osx-sign is needed

## Sign it
Require some major set up, not listed here. This works, but when users go to install it, Apple slams them a scary warning suggesting they would be foolish to trust me.

Bypassing the warning is easy (right click and open the app), but that solution not obvious.

```
codesign --deep --force --verbose --sign "Developer ID Application: Kevaid Inc. (E34JX9GA2A)" Application.app
```
[More info](https://pracucci.com/atom-electron-signing-mac-app.html)

## Create dmg
This final step is optional. I do it because its a better experience for the user.

```
electron-installer-dmg out/Screen\ Shit-darwin-x64/Screen\ Shit.app Screen\ Shit --icon=assets/app-icon/mac/app.icns
```
[More info](https://www.christianengvall.se/dmg-installer-electron-app/)

# Releases

[`1.1.0`](https://github.com/kevando/screenshit/releases/tag/v1.1)
[`1.0.3`](https://github.com/kevando/screenshit/releases/tag/v1.0.2)
[`1.0.2`](https://github.com/kevando/screenshit/releases/tag/v1.0.2)
[`1.0.1`](https://github.com/kevando/screenshit/releases/tag/v1.0.1)
[`1.0.0`](https://github.com/kevando/screenshit/releases/tag/v1.0.1)






# How to sign your installer on MacOS
Electron makes it super easy to code something up really fast, but distributing your app can be a little tricky. And isn't distribution the whole point of a Desktop app?

## MacOS

### Apple Developer Program
Apple requires you to sign up for their [Developer Program](https://developer.apple.com). I think it's $100/year.

### Generate certificate
[Lots of info here](https://electronjs.org/docs/tutorial/code-signing#signing-macos-builds) I also created them in xCode which put them in my keyvchain. [More info here](https://developer.apple.com/developer-id/) and [here](https://github.com/electron-userland/electron-osx-sign/wiki/1.-Getting-Started#certificates)


```
security find-identity -p codesigning -v
```

Run that command in terminal to display a list of valid identities installed in the keychain.

### Code Signing

From these [instructions](https://github.com/electron-userland/electron-osx-sign/wiki/1.-Getting-Started) I ran the following commands to make and sign the app. Add the cert to your config

```
electron-forge make
```


## Possible Issues
When I first tried signing the app, I got this error `resource fork, Finder information, or similar detritus not allowed` and followed [this](https://stackoverflow.com/questions/39652867/code-sign-error-in-macos-high-sierra-xcode-resource-fork-finder-information) to fix it.

Turned out that issue was probably irrelevant. [Chokidar needs to be in dev dependancy](https://github.com/paulmillr/chokidar/issues/618)




![Logo](/assets/app-icon/png/32x32.png)
![Logo](/assets/app-icon/png/32x32.png)
![Logo](/assets/app-icon/png/32x32.png)
![Logo](/assets/app-icon/png/32x32.png)

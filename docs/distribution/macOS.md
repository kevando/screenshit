# How to distribute on MacOS
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
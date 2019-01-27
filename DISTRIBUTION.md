# Distribution

Confusing at first.


## Development

Keeping this section because if dev tools change, it could effect dist.


``` bash
git clone git clone https://github.com/kevando/screenshit.git
cd screenshit
yarn install
yarn start
# or
yarn dev
```

## Test

lol

## Package
_Elaborate on all this_


```
electron-packager . --overwrite --platform=darwin --arch=x64 --icon=app/icon/icon.icns --prune=true --out=out
```

This works, but when users go to install it, Apple slams them a scary warning suggesting they would be foolish to trust me.  

Bypassing the warning is easy (right click and open the app), but that solution not obvious.

## Sign
That's why we make a dmg and sign it. Lets sign a dmg. Install `electron-installer-dmg` as explained [here](1)

```
electron-installer-dmg ./out/screenshit-darwin-x64/screenshit.app screenshit -out=out --overwrite --icon=app/icon/icon.icns
```

## Distribute

[Download the latest version here](latest)


![Logo](app/icon/32x32.png) 
![Logo](app/icon/32x32.png) 
![Logo](app/icon/16x16.png) 
![Logo](app/icon/16x16.png) 
![Logo](app/icon/16x16.png) 


[latest]: https://github.com/kevando/screenshit/TBD

[1]: https://www.christianengvall.se/dmg-installer-electron-app


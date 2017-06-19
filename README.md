# webpack-dll-sampler

Sample that shows how to use the Webpack `DllPlugin` to share bundles between
independently built apps. This sample has the following folder structure:

    |-- vendor (packages vendorlibs.js)
    |-- shared (packages sharedcomponents.js)
    |-- app1   (package app1.js)
    |-- app2   (package app2.js)

Dependency Structure:
 - `app1` and `app2` import vendor libraries from the `vendorlibs` dll
 - `app1` and `app2` import shared components from the `sharedcomponents` dll
 - `sharedcomponents` dll also imports vendor libraries from `vendorlibs` dll

Both `app1` and `app2` have the following network traffic:
 - download `vendorlibs.<contenthash>.js`
 - download `sharedcomponents.<contenthash>.js`
 - download `appn.<contenthash>.js`

### Install
    npm install

### Build All
    npm run build:all

### Launch
    npm start

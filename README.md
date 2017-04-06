# Demo of a compass webapp

[Here is a demo of a mobile compass app](https://iamfrank.github.io/compass-webapp/dist) that uses web technologies.

## Uses Javascrip API

The app is essentially a web page that uses the javascript deviceOrientation API (via [gyronorm.js](https://github.com/dorukeker/gyronorm.js#gyronormjs)) to access your device's internal accelerometer/compass to make a compass image point north on your screen.

You may have to wiggle your device around a bit to calibrate the internal compass, if the onscreen compass seems to wander about.

## Offline capable

You can access the demo and save it to your Home Screen on your mobile device. [Application cache](https://www.w3schools.com/html/html5_app_cache.asp) enables you to use the app while offline.

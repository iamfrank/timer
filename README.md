# Timer webapp

[This simple timer application for the web](https://iamfrank.github.io/timer/) was made to experiment with some web APIs:

- [Web Components](https://developer.mozilla.org/en-US/docs/Web/API/Web_components) to structure an application.
- [manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest) and [service worker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) to make a web application available offline.
- [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) to generate sound.
- [Screen Wake Lock API](https://developer.mozilla.org/en-US/docs/Web/API/Screen_Wake_Lock_API) to keep device from entering sleep mode when running a workout timer.

## Known issues

Screen Wake Lock and Web audio API do not work properly in iOS Safari, making the workout timer pretty useless on iPhones.

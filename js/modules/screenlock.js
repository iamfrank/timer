export class ScreenLock {

  wakeLockSupported
  wakeLock = null

  constructor() {
    this.wakeLockSupported = this.checkWakeLock()
  }

  checkWakeLock() {
    if ("wakeLock" in navigator) {
      console.log("Screen Wake Lock API supported!")
      return true
    } else {
      console.log("Wake lock is not supported by this browser.")
      return false
    }
  }

  async enable() {
    if (!this.wakeLockSupported) {
      console.log("Can't enable screen wake lock on unsupported device.")
      return
    }
    try {
      this.wakeLock = await navigator.wakeLock.request("screen")
      console.log("Wake Lock is active!")
    } catch (err) {
      // The Wake Lock request has failed - usually system related, such as battery.
      console.error(`${err.name}, ${err.message}`)
    }
  }

  disable() {
    if (this.wakeLock) {
      this.wakeLock.release().then(() => {
        this.wakeLock = null
      })  
    }
  }

}

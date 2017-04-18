export class Push {
  constructor (workerPath = '/service-worker.js') {
    this.subData = {}
    this.workerPath = workerPath
    this.listeners = {
      onPermissionGranted: [],
      onPermissionDenied: [],
      onSubscriptionSuccess: [],
      onSubscriptionCancel: [],
      onWorkerError: [],
      onWorkerSuccess: [],
      onWorkerNotSupported: []
    }
    return this
  }

  /**
   * @param {string} eventName
   * @param {function} cb
   * @return {Push}
   */
  on (eventName, cb = () => {}) {
    if (typeof cb === 'function' && this.listeners.hasOwnProperty(eventName)) {
      this.listeners[eventName].push(cb)
    }

    return this
  }

  fire (eventName, params = []) {
    if (this.listeners.hasOwnProperty(eventName)) {
      this.listeners[eventName].forEach(cb => {
        if (typeof cb === 'function') {
          cb.apply(this, params)
        }
      })
    }
  }

  create () {
    console.log('NOT IMPLEMENTED YET')
  }

  /**
   * @return {boolean}
   */
  isSupported () {
    let result = false

    try {
      result = window.Notification ||
        window.webkitNotifications ||
        navigator.mozNotification ||
        (window.external && window.external.msIsSiteMode() !== undefined)
    } catch (e) {}

    return result
  }

  /**
   * @return {string}
   */
  getPermissionStatus () {
    let perm = 'default'

    if (window.Notification && window.Notification.permissionLevel) {
      perm = window.Notification.permissionLevel
    } else if (
      window.webkitNotifications && window.webkitNotifications.checkPermission
    ) {
      switch (window.webkitNotifications.checkPermission()) {
        case 1:
          perm = 'default'
          break
        case 0:
          perm = 'granted'
          break
        default:
          perm = 'denied'
      }
    } else if (window.Notification && window.Notification.permission) {
      perm = window.Notification.permission
    } else if (navigator.mozNotification) {
      perm = 'granted'
    } else if (
      window.external && window.external.msIsSiteMode() !== undefined
    ) {
      perm = window.external.msIsSiteMode() ? 'granted' : 'default'
    }

    return perm.toString().toLowerCase()
  }

  /**
   * @return {string}
   */
  getEndpoint (subscription) {
    let endpoint = subscription.endpoint
    const subscriptionId = subscription.subscriptionId

    // fix for Chrome < 45
    if (subscriptionId && endpoint.indexOf(subscriptionId) === -1) {
      endpoint += '/' + subscriptionId
    }

    return endpoint
  }

  /**
   * @return {boolean}
   */
  isSWRegistered () {
    try {
      return navigator.serviceWorker.controller.state === 'activated'
    } catch (e) {
      return false
    }
  }

  /**
   * @return {void}
   */
  unregisterWorker () {
    const self = this
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then(function (registrations) {
        for (let registration of registrations) {
          registration.unregister()
          self.fire('onSubscriptionCancel')
        }
      })
    }
  }

  /**
   * @return {void}
   */
  requestSubscription (userVisibleOnly = true) {
    const self = this
    const current = this.getPermissionStatus()
    const cb = result => {
      if (result === 'granted') {
        this.fire('onPermissionGranted')

        if ('serviceWorker' in navigator) {
          navigator.serviceWorker.register(this.workerPath).then(function () {
            navigator.serviceWorker.ready.then(
              function (serviceWorkerRegistration) {
                self.fire('onWorkerSuccess')
                serviceWorkerRegistration.pushManager
                  .subscribe({
                    userVisibleOnly: userVisibleOnly
                  })
                  .then(function (subscription) {
                    const key = subscription.getKey('p256dh')
                    const token = subscription.getKey('auth')

                    self.subData = {
                      endpoint: self.getEndpoint(subscription),
                      p256dh: key
                        ? window.btoa(
                            String.fromCharCode.apply(null, new Uint8Array(key))
                          )
                        : null,
                      auth: token
                        ? window.btoa(
                            String.fromCharCode.apply(
                              null,
                              new Uint8Array(token)
                            )
                          )
                        : null
                    }

                    self.fire('onSubscriptionSuccess', [self.subData])
                  })
                  .catch(function (err) {
                    self.fire('onWorkerError', [err])
                  })
              }
            )
          })
        } else {
          self.fire('onWorkerNotSupported')
        }
      } else if (result === 'denied') {
        this.fire('onPermissionDenied')
        this.unregisterWorker()
      }
    }

    if (current === 'default') {
      if (window.Notification && window.Notification.requestPermission) {
        window.Notification.requestPermission(cb)
      } else if (
        window.webkitNotifications && window.webkitNotifications.checkPermission
      ) {
        window.webkitNotifications.requestPermission(cb)
      }
    } else {
      cb(current)
    }
  }
}

var velocityShow = function (promise) {
  var n = this
  $.Velocity(n.barDom, {
    left: 450,
    scaleY: 2
  }, {
    duration: 0
  })
  $.Velocity(n.barDom, {
    left: 0,
    scaleY: 1
  }, {
    easing: [8, 8],
    complete: function () {
      promise(function (resolve) {
        resolve()
      })
    }
  })
}

var velocityClose = function (promise) {
  var n = this
  $.Velocity(n.barDom, {
    left: '+=-50'
  }, {
    easing: [8, 8, 2],
    duration: 350
  })
  $.Velocity(n.barDom, {
    left: 450,
    scaleY: .2,
    height: 0,
    margin: 0
  }, {
    easing: [8, 8],
    complete: function () {
      promise(function (resolve) {
        resolve()
      })
    }
  })
}

var mojsShow = function (promise) {
  var n = this
  var Timeline = new mojs.Timeline()
  var body = new mojs.Html({
    el: n.barDom,
    x: {500: 0, delay: 0, duration: 500, easing: 'elastic.out'},
    isForce3d: true,
    onComplete: function () {
      promise(function (resolve) {
        resolve()
      })
    }
  })

  var parent = new mojs.Shape({
    parent: n.barDom,
    width: 200,
    height: n.barDom.getBoundingClientRect().height,
    radius: 0,
    x: {[150]: -150},
    duration: 1.2 * 500,
    isShowStart: true
  })

  n.barDom.style['overflow'] = 'visible'
  parent.el.style['overflow'] = 'hidden'

  var burst = new mojs.Burst({
    parent: parent.el,
    count: 10,
    top: n.barDom.getBoundingClientRect().height + 75,
    degree: 90,
    radius: 75,
    angle: {[-90]: 40},
    children: {
      fill: '#EBD761',
      delay: 'stagger(500, -50)',
      radius: 'rand(8, 25)',
      direction: -1,
      isSwirl: true
    }
  })

  var fadeBurst = new mojs.Burst({
    parent: parent.el,
    count: 2,
    degree: 0,
    angle: 75,
    radius: {0: 100},
    top: '90%',
    children: {
      fill: '#EBD761',
      pathScale: [.65, 1],
      radius: 'rand(12, 15)',
      direction: [-1, 1],
      delay: .8 * 500,
      isSwirl: true
    }
  })

  Timeline.add(body, burst, fadeBurst, parent)
  Timeline.play()
}

var mojsClose = function (promise) {
  var n = this
  new mojs.Html({
    el: n.barDom,
    x: {0: 500, delay: 10, duration: 500, easing: 'cubic.out'},
    isForce3d: true,
    onComplete: function () {
      promise(function (resolve) {
        resolve()
      })
    }
  }).play()
}

var bouncejsShow = function (promise) {
  var n = this
  new Bounce()
    .translate({
      from: {x: 450, y: 0}, to: {x: 0, y: 0},
      easing: 'bounce',
      duration: 1000,
      bounces: 4,
      stiffness: 3
    })
    .scale({
      from: {x: 1.2, y: 1}, to: {x: 1, y: 1},
      easing: 'bounce',
      duration: 1000,
      delay: 100,
      bounces: 4,
      stiffness: 1
    })
    .scale({
      from: {x: 1, y: 1.2}, to: {x: 1, y: 1},
      easing: 'bounce',
      duration: 1000,
      delay: 100,
      bounces: 6,
      stiffness: 1
    })
    .applyTo(n.barDom, {
      onComplete: function () {
        promise(function (resolve) {
          resolve()
        })
      }
    })
}

var bouncejsClose = function (promise) {
  var n = this
  new Bounce()
    .translate({
      from: {x: 0, y: 0}, to: {x: 450, y: 0},
      easing: 'bounce',
      duration: 500,
      bounces: 4,
      stiffness: 1
    })
    .applyTo(n.barDom, {
      onComplete: function () {
        promise(function (resolve) {
          resolve()
        })
      }
    })
}

$('body').on('click', '#example-runner', function (e) {
  new Noty({
    text: '<div class="text-left">I\'m an example notification. <strong>Hi!</strong></div>',
    type: 'warning',
    theme: 'mint',
    layout: 'topRight',
    timeout: 4000,
    animation: {
      open: mojsShow,
      close: mojsClose
    }
  }).show()
})

$('body').on('click', '#example-animatecss', function (e) {
  new Noty({
    type: 'warning',
    text: 'NOTY - a jquery notification library!',
    animation: {
      open: 'animated bounceInRight', // Animate.css class names
      close: 'animated bounceOutRight' // Animate.css class names
    }
  }).show();
})

$('body').on('click', '#example-bouncejs', function (e) {
  new Noty({
    type: 'warning',
    text: 'NOTY - a jquery notification library!',
    animation: {
      open: bouncejsShow,
      close: bouncejsClose
    }
  }).show();
})

$('body').on('click', '#example-mojs', function (e) {
  new Noty({
    type: 'warning',
    text: 'NOTY - a jquery notification library!',
    animation: {
      open: mojsShow,
      close: mojsClose
    }
  }).show();
})

$('body').on('click', '#example-velocity', function (e) {
  new Noty({
    type: 'warning',
    text: 'NOTY - a jquery notification library!',
    animation: {
      open: velocityShow,
      close: velocityClose
    }
  }).show();
})

setTimeout(function () {
  new Noty({
    text: '<div class="text-center">Wubba lubba dub dub! <strong>v3.1.3 released!</strong></div>',
    type: 'information',
    theme: 'mint',
    layout: 'topRight',
    timeout: 4000,
    animation: {
      open: mojsShow,
      close: mojsClose
    }
  }).show()
}, 2000)

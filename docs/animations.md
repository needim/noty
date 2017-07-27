### CSS Animations

Using with class names. (like animate.css)

```javascript
new Noty({
    text: 'NOTY - a jquery notification library!',
    animation: {
        open: 'animated bounceInRight', // Animate.css class names
        close: 'animated bounceOutRight' // Animate.css class names
    }
}).show();
```

<p>
<button id="example-animatecss" class="button">Run Example</button>
</p>

Example css animation;

```css
.noty_effects_open {
  opacity: 0;
  transform: translate(50%);
  animation: noty_anim_in 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.noty_effects_close {
  animation: noty_anim_out 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

@keyframes noty_anim_in {
  100% {
    transform: translate(0);
    opacity: 1;
  }
}

@keyframes noty_anim_out {
  100% {
    transform: translate(50%);
    opacity: 0;
  }
}
```

!> **JavaScript animations** are deprecated! But you can use 3rd party animation libraries.

#### Other cool ways

### Animating with bounce.js

> Get [bounce.js](http://bouncejs.com/?ref=notyjs), first. Then;

```javascript
new Noty({
    ...
    text: 'NOTY - a jquery notification library!',
    ...
    animation: {
        open: function (promise) {
            var n = this;
            new Bounce()
                .translate({
                    from     : {x: 450, y: 0}, to: {x: 0, y: 0},
                    easing   : "bounce",
                    duration : 1000,
                    bounces  : 4,
                    stiffness: 3
                })
                .scale({
                    from     : {x: 1.2, y: 1}, to: {x: 1, y: 1},
                    easing   : "bounce",
                    duration : 1000,
                    delay    : 100,
                    bounces  : 4,
                    stiffness: 1
                })
                .scale({
                    from     : {x: 1, y: 1.2}, to: {x: 1, y: 1},
                    easing   : "bounce",
                    duration : 1000,
                    delay    : 100,
                    bounces  : 6,
                    stiffness: 1
                })
                .applyTo(n.barDom, {
                    onComplete: function () {
                        promise(function(resolve) {
                            resolve();
                        })
                    }
                });
        },
        close: function (promise) {
            var n = this;
            new Bounce()
                .translate({
                    from     : {x: 0, y: 0}, to: {x: 450, y: 0},
                    easing   : "bounce",
                    duration : 500,
                    bounces  : 4,
                    stiffness: 1
                })
                .applyTo(n.barDom, {
                    onComplete: function () {
                        promise(function(resolve) {
                            resolve();
                        })
                    }
                });
        }
    }
}).show();
```

<p>
<button id="example-bouncejs" class="button">Run Example</button>
</p>


!> **Important**: You need to resolve promises for this type of usage.

### Animating with mo.js

> Get [mo.js](http://mojs.io/?ref=notyjs), first. Then;

```javascript
new Noty({
    ...
    text: 'NOTY - a jquery notification library!',
    ...
    animation: {
        open: function (promise) {
            var n = this;
            var Timeline = new mojs.Timeline();
            var body = new mojs.Html({
                el        : n.barDom,
                x         : {500: 0, delay: 0, duration: 500, easing: 'elastic.out'},
                isForce3d : true,
                onComplete: function () {
                    promise(function(resolve) {
                        resolve();
                    })
                }
            });

            var parent = new mojs.Shape({
                parent: n.barDom,
                width      : 200,
                height     : n.barDom.getBoundingClientRect().height,
                radius     : 0,
                x          : {[150]: -150},
                duration   : 1.2 * 500,
                isShowStart: true
            });

            n.barDom.style['overflow'] = 'visible';
            parent.el.style['overflow'] = 'hidden';

            var burst = new mojs.Burst({
                parent  : parent.el,
                count   : 10,
                top     : n.barDom.getBoundingClientRect().height + 75,
                degree  : 90,
                radius  : 75,
                angle   : {[-90]: 40},
                children: {
                    fill     : '#EBD761',
                    delay    : 'stagger(500, -50)',
                    radius   : 'rand(8, 25)',
                    direction: -1,
                    isSwirl  : true
                }
            });

            var fadeBurst = new mojs.Burst({
                parent  : parent.el,
                count   : 2,
                degree  : 0,
                angle   : 75,
                radius  : {0: 100},
                top     : '90%',
                children: {
                    fill     : '#EBD761',
                    pathScale: [.65, 1],
                    radius   : 'rand(12, 15)',
                    direction: [-1, 1],
                    delay    : .8 * 500,
                    isSwirl  : true
                }
            });

            Timeline.add(body, burst, fadeBurst, parent);
            Timeline.play();
        },
        close: function (promise) {
            var n = this;
            new mojs.Html({
                el        : n.barDom,
                x         : {0: 500, delay: 10, duration: 500, easing: 'cubic.out'},
                skewY     : {0: 10, delay: 10, duration: 500, easing: 'cubic.out'},
                isForce3d : true,
                onComplete: function () {
                    promise(function(resolve) {
                        resolve();
                    })
                }
            }).play();
        }
    }
}).show();
```

<p>
<button id="example-mojs" class="button">Run Example</button>
</p>


!> **Important**: You need to resolve promises for this type of usage.

### Animating with velocity

> Get [velocity](http://velocityjs.org/?ref=notyjs), first. Then;

```javascript
new Noty({
    ...
    text: 'NOTY - animating with velocity!',
    ...
    animation: {
        open: function (promise) {
            var n = this;
            Velocity(n.barDom, {
                left: 450,
                scaleY: 2
            }, {
                duration: 0
            });
            Velocity(n.barDom, {
                left: 0,
                scaleY: 1
            }, {
                easing: [ 8, 8 ],
                complete: function() {
                    promise(function(resolve) {
                        resolve();
                    })
                }
            });
        },
        close: function (promise) {
            var n = this;
            Velocity(n.barDom, {
                left: '+=-50'
            }, {
                easing: [ 8, 8, 2],
                duration: 350
            });
            Velocity(n.barDom, {
                left: 450,
                scaleY: .2,
                height: 0,
                margin: 0
            }, {
                easing: [ 8, 8 ],
                complete: function () {
                    promise(function(resolve) {
                        resolve();
                    })
                }
            });
        }
    }
}).show();
```

<p>
<button id="example-velocity" class="button">Run Example</button>
</p>

!> **Important**: You need to resolve promises for this type of usage.


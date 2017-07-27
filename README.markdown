<p align="center">
  <a href="http://ned.im/noty?ref=readme">
    <img src="http://ned.im/noty/_media/noty-v3-logo.png" width=200 height=70>
  </a>

  <p align="center">
    Dependency-free notification library.
    <br>
    <a href="http://ned.im/noty"><strong>Documentation &raquo;</strong></a>
  </p>

  <p align="center">
    <a href="https://github.com/needim/noty/releases"><img src="https://img.shields.io/github/release/needim/noty.svg" alt="GitHub release"></a>
    <a href="https://bower.io/"><img src="https://img.shields.io/bower/v/noty.svg" alt="Bower version"></a>
    <a href="https://www.npmjs.com/package/noty"><img src="https://img.shields.io/npm/v/noty.svg" alt="NPM version"></a>
    <a href="https://packagist.org/packages/needim/noty"><img src="https://img.shields.io/packagist/v/needim/noty.svg" alt="Packagist version"></a>
    <br>
    <img src="https://img.shields.io/david/needim/noty.svg" alt="Dependencies">
    <img src="https://img.shields.io/david/dev/needim/noty.svg" alt="Dev Dependencies">
    <br>
    <a href="https://travis-ci.org/needim/noty"><img src="https://img.shields.io/travis/needim/noty/master.svg" alt="Travis"></a>
    <a href="https://www.npmjs.com/package/noty"><img src="https://img.shields.io/npm/dm/noty.svg?label=npm%20downloads" alt="NPM Downloads"></a>
    <a href="https://github.com/needim/noty/graphs/contributors"><img src="https://img.shields.io/github/contributors/needim/noty.svg" alt="Contributors"></a>
  </p>
</p>

<br>


## Hi

**NOTY** is a notification library that makes it easy to create **alert** - **success** - **error** - **warning** - **information** - **confirmation** messages as an alternative the standard alert dialog.

The notifications can be positioned at the;
**top** - **topLeft** - **topCenter** - **topRight** - **center** - **centerLeft** - **centerRight** - **bottom** - **bottomLeft** - **bottomCenter** - **bottomRight**

There are lots of other options in the API to customise the text, animation, buttons and much more.

It also has various callbacks for the buttons, opening closing the notifications and queue control.

***
### Features
- [x] Dependency-free
- [x] Web Push Notifications with Service Worker support
- [x] UMD
- [x] Named queue system
- [x] Has 11 layouts, 5 notification styles, 5+ themes
- [x] Custom container (inline notifications)
- [x] Confirm notifications
- [x] TTL
- [x] Progress bar indicator for timed notifications
- [x] Supports css animations, [animate.css](https://github.com/daneden/animate.css), [mojs](https://github.com/legomushroom/mojs), [bounce.js](https://github.com/tictail/bounce.js), [velocity](https://github.com/julianshapiro/velocity) and other animation libraries
- [x] 2 close options: click, button
- [x] API & Callbacks
- [x] Custom templating
- [x] Document visibility control (blur, focus)

### Documentation
Documentation and examples are here: <http://ned.im/noty>

***

##### Basic Usage
```js
import Noty from 'noty';

new Noty({
    text: 'Notification text'
}).show();

// or

const Noty = require('noty');

new Noty({
    text: 'Notification text'
}).show();

```

##### Development
```console
$ npm run dev
$ npm test
$ npm run build
$ npm run browserstack
$ npm run serve-docs
```

##### Development environment
- [x] Standard
- [x] Prettier
- [x] ES6 & Babel & Webpack
- [x] Sass
- [x] Autoprefixer
- [x] QUnit
- [x] BrowserStack
- [x] Pre-commit tests
- [x] Travis CI


[![JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

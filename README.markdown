<p align="center">
  <a href="http://ned.im/noty?ref=readme">
    <img src="http://ned.im/noty/img/projects/noty-v3-logo.png" width=200 height=70>
  </a>

  <p align="center">
    Dependency-free notification plugin.
    <br>
    <a href="http://ned.im/noty"><strong>Documentation &raquo;</strong></a>
  </p>
</p>

<br>

![GitHub release](https://img.shields.io/github/release/needim/noty.svg)
![Bower version](https://img.shields.io/bower/v/noty.svg)
![npm version](https://img.shields.io/npm/v/noty.svg)
![Packagist version](https://img.shields.io/packagist/v/needim/noty.svg)
![David](https://img.shields.io/david/needim/noty.svg)
![devDependency Status](https://img.shields.io/david/dev/needim/noty.svg)
![Travis branch](https://img.shields.io/travis/needim/noty/master.svg)
![npm](https://img.shields.io/npm/dm/noty.svg?label=npm%20downloads)
![Contributors](https://img.shields.io/github/contributors/needim/noty.svg)


## Hi

**NOTY** is a notification plugin that makes it easy to create **alert** - **success** - **error** - **warning** - **information** - **confirmation** messages as an alternative the standard alert dialog.

The notifications can be positioned at the;
**top** - **topLeft** - **topCenter** - **topRight** - **center** - **centerLeft** - **centerRight** - **bottom** - **bottomLeft** - **bottomCenter** - **bottomRight**

There are lots of other options in the API to customise the text, animation, buttons and much more.

It also has various callbacks for the buttons, opening closing the notifications and queue control.

***
### Features
- [x] Dependency-free
- [x] UMD
- [x] Named queue system
- [x] Has 11 layouts, 5 notification styles, 5+ themes
- [x] Custom container (inline notifications)
- [x] Confirm notifications
- [x] TTL
- [x] Progress bar indicator for timed notifications
- [x] Supports css animations, mojs, bouncejs, velocityjs and other animation libraries
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
```

##### Development environment
- [x] Standard
- [x] ES6 & Babel & Webpack
- [x] Sass
- [x] Autoprefixer
- [x] AVA
- [x] Pre-commit tests
- [x] Travis CI


[![JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

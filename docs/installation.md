Include **lib/noty.css** & **lib/noty.js**
or use Bower, NPM, Yarn or Composer

```html
<link href="lib/noty.css" rel="stylesheet">
<script src="lib/noty.js" type="text/javascript"></script>
```

!> NOTY v3 **is NOT dependent to jQuery** anymore.

### Install via Bower

```bash
$ bower install noty
```

### Install via NPM

```bash
$ npm install noty
```

### Install via Yarn

```bash
$ yarn add noty
```

### Install via Composer

```bash
$ composer require needim/noty
```

#### For the Laravel

Add to `resources/assets/sass/app.scss`
```scss
@import "~noty/src/noty.scss";
@import "~noty/src/themes/mint.scss";
```

Add to `resources/assets/js/bootstrap.js`
```javascript
window.Noty = require('noty');
```

Then run `yarn dev` or `npm run dev`

### Usage: Creating a Notification

```javascript
new Noty({
    ...
    text: 'Some notification text',
    ...
}).show();
```

### ES6 import & Require Usages

```javascript
import Noty from 'noty';
new Noty({
    ...
    text: 'Some notification text',
    ...
}).show();

const Noty = require('noty');
new Noty({
    ...
    text: 'Some notification text',
    ...
}).show();
```

### RequireJS

!> While defining path for Noty you should write "Noty" with capital letter of N. 

```javascript
requirejs.config({
	paths: {
		"Noty": "libs/noty.min",
    ...
	},
    ...
```

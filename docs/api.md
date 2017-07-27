### API Methods

```javascript
var n = new Noty({text: 'Hi!'});

console.log(n); // Returns a NOTY javascript object

n.show(); // Show a NOTY
n.close(); // Close a NOTY
n.setText('Hi again!'); // Notification text updater. Important: .noty_body class is required for setText API method.
n.setType('error'); // Notification type updater
n.setTheme('newTheme'); // Notification theme updater
n.setTimeout(4500); // false (clears timeout) or integer (clears timer, starts for given value)
n.stop(); // Clears the timeout
n.resume(); // Restarts the timeout
```

> **setText()**, **setType()** and **setTheme()** methods doesn't override NOTY's options.<br>
If you wanna override those values pass a second parameter as boolean **true**.

### API Static Methods

```javascript
Noty.closeAll(); // Closes all notifications
Noty.closeAll('myCustomQueueName'); // Closes all notifications with queue named 'myCustomQueueName'

Noty.setMaxVisible(10); // Sets the maxVisible notification count for global queue;
Noty.setMaxVisible(10, 'myCustomQueueName'); // Sets the maxVisible notification count for 'myCustomQueueName' queue;
```

> Default **maxVisible** value is **5** for all queues.

### Callbacks

```javascript
new Noty({
    ...
    callbacks: {
        beforeShow: function() {},
        onShow: function() {},
        afterShow: function() {},
        onClose: function() {},
        afterClose: function() {},
        onHover: function() {},
        onTemplate: function() {
            this.barDom.innerHTML = '<div class="my-custom-template noty_body">' + this.options.text + '<div>';
            // Important: .noty_body class is required for setText API method.
        }
    }
    ...
}).show();
```

### Callbacks Alternative Usage

```javascript
new Noty({
    ...
}).on('onShow', function() {
    ...
}).on('afterShow', function() {
    ...
}).show();

// Important: You need to call on() methods before the show() method.
```

### Custom Templating

!> Custom templating is possible with **onTemplate** callback.

> **Suggestion**: You can also use a template library as an alternative. 

<script async src="//jsfiddle.net/needim/jo2t9skf/embed/"></script>

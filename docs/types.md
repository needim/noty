**Types**: <br> `alert`, `success`, `warning`, `error`, `info/information`

**Layouts**: <br> `top`, `topLeft`, `topCenter`, `topRight`, `center`, `centerLeft`, `centerRight`, `bottom`, `bottomLeft`, `bottomCenter`, `bottomRight`

Creating a notification;

```javascript
new Noty({
    type: 'success',
    layout: 'topRight',
    text: 'Some notification text'
}).show();
```

### Custom Containers

Custom container usage example;

```javascript
new Noty({
    text     : 'Some notification text',
    container: '.custom-container'
}).show();
```

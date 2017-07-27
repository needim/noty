We can set button objects with an array like below;

```javascript
var n = new Noty({
  text: 'Do you want to continue? <input id="example" type="text">',
  buttons: [
    Noty.button('YES', 'btn btn-success', function () {
        console.log('button 1 clicked');
    }, {id: 'button1', 'data-status': 'ok'}),

    Noty.button('NO', 'btn btn-error', function () {
        console.log('button 2 clicked');
        n.close();
    })
  ]
}).show();
```

?> **Noty.button**(**text**:string, **classNames**:string, **cb**:function, **attributes**:object<optional>);

!> **About button styling**: Noty doesn't care about that. You need to pass class names with your styles.

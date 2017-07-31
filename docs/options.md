Creating a notification;

```javascript
new Noty({
    ...
    text: 'Some notification text',
    ...
}).show();
```

Available options listed below.

| Option | Default | Info |
| --- | --- | --- |
| **type**: string | 'alert' | alert, success, error, warning, info - ClassName generator uses this value → `noty_type__${type}` |
| **layout**: string | 'topRight' | top, topLeft, topCenter, topRight, center, centerLeft, centerRight, bottom, bottomLeft, bottomCenter, bottomRight - ClassName generator uses this value → `noty_layout__${layout}` |
| **theme**: string | 'mint' | relax, mint, metroui - ClassName generator uses this value → `noty_theme__${theme}` |
| **text**: string |  '' | This string can contain HTML too. But be careful and don't pass user inputs to this parameter. |
| **timeout**: boolean,int | false | false, 1000, 3000, 3500, etc. Delay for closing event in milliseconds (ms). Set 'false' for sticky notifications. |
| **progressBar**: boolean | true | true, false - Displays a progress bar if timeout is not false. |
| **closeWith**: [...string] | ['click'] | click, button |
| **animation.open**: string,null,function | 'noty_effects_open' | If **string**, assumed to be CSS class name. If **null**, no animation at all. If **function**, runs the function. (v3.0.1+) You can use animate.css class names or your custom css animations as well. |
| **animation.close**: string,null,function | 'noty_effects_close' | If **string**, assumed to be CSS class name. If **null**, no animation at all. If **function**, runs the function. (v3.0.1+) You can use animate.css class names or your custom css animations as well. |
| **sounds.sources**: [...string] | [] | **v3.1.0-beta** Array of audio sources e.g 'some.wav' [Check browser support](http://caniuse.com/#search=audio) |
| **sounds.volume**: int | 1 | **v3.1.0-beta** Integer value between 0-1 e.g 0.5 [Check browser support](http://caniuse.com/#search=audio) |
| **sounds.conditions**: [...string] | [] | **v3.1.0-beta** There are two conditions for now: **'docVisible'** & **'docHidden'**. You can use one of them or both. [Check browser support](http://caniuse.com/#search=audio) |
| **docTitle.conditions**: [...string] | [] | **v3.1.0-beta** There are two conditions for now: **'docVisible'** & **'docHidden'**. You can use one of them or both. |
| **modal**: boolean | false | **v3.1.0-beta** Behaves like v2 but more stable |
| **id**: string,boolean | false | You can use this id with querySelectors. Generated automatically if false. |
| **force**: boolean | false | DOM insert method depends on this parameter. If false uses append, if true uses prepend. |
| **queue**: string | 'global' | NEW Named queue system. Details are [here](api.md). |
| **killer**: boolean,string | false | If true closes all **visible** notifications and shows itself. If string(queueName) closes all **visible** notification on this queue and shows itself. |
| **container**: boolean,string | false | Custom container selector string. Like '.my-custom-container'. Layout parameter will be ignored. |
| **buttons**: [...Noty.button] | [] | An array of Noty.button, for creating confirmation dialogs. Details are [here](confirm.md). |
| **callbacks.beforeShow**: function | Default: () => {} | Details are [here](api.md). |
| **callbacks.onShow**: function | Default: () => {} | Details are [here](api.md). |
| **callbacks.afterShow**: function | Default: () => {} | Details are [here](api.md). |
| **callbacks.onClose**: function | Default: () => {} | Details are [here](api.md). |
| **callbacks.afterShow**: function | Default: () => {} | Details are [here](api.md). |
| **callbacks.onHover**: function | Default: () => {} | Details are [here](api.md). |
| **callbacks.onTemplate**: function | Default: () => {} | Mainly for DOM manipulations. Details are [here](api.md). |
| **visibilityControl**: boolean | false | If **true** Noty uses PageVisibility API to handle timeout. To ensure that users do not miss their notifications. |

### Overriding Options

Of course, you can override default values;

```javascript
Noty.overrideDefaults({
    layout   : 'topRight',
    theme    : 'mint',
    closeWith: ['click', 'button'],
    animation: {
        open : 'animated fadeInRight',
        close: 'animated fadeOutRight'
    }
});
```

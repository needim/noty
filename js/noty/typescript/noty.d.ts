interface NotyOptionsStatic {
    text: string;
    type?: string;
    timeout?: any;
    force?: boolean;
    modal?: boolean;
    layout?: string;
    closeWith?: string[];
    id?: string;
    buttons?: any;
    maxVisible?: number;
    dismissQueue?: boolean;
    theme?: string;
    template?: string;
    callback?: {
        onShow?: () => void;
        afterShow?: () => void;
        onClose?: () => void;
        afterClose?: () => void;
    };
}

interface NotyResultStatic {
    options: NotyOptionsStatic;
    showing: boolean;
    shown: boolean;
}

interface NotyJqueryExtensionStatic {
    get(id: string): NotyResultStatic;
    close(id: string);
    clearQueue();
    closeAll();
    setText(id: string, text: string);
    setType(id: string, text: string);
}

interface JQuery {
    noty(options:NotyOptionsStatic): NotyResultStatic;
}

interface JQueryStatic {
    noty: NotyJqueryExtensionStatic;
}

declare function noty(options: NotyOptionsStatic): NotyResultStatic;

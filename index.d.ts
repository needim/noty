declare module 'noty' {
	export = Noty;
}

declare class Noty {
	constructor(options?: Noty.Options);

	/**
	 * Show a NOTY
	 */
	show: () => void;

	/**
	 * Close a NOTY
	 */
	close: () => void;

	/**
	 * Notification text updater. Important: .noty_body class is required for setText API method
	 */
	setText: (text: string, overrideConstructorOption?: true) => void;

	/**
	 * Notification type updater
	 */
	setType: (type: Noty.Type, overrideConstructorOption?: true) => void;

	/**
	 * Notification theme updater
	 */
	setTheme: (theme: Noty.Theme, overrideConstructorOption?: true) => void;

	/**
	 * false (clears timeout) or integer (clears timer, starts for given value)
	 */
	setTimeout: (option: false | number) => void; //

	/**
	 * Clears the timeout
	 */
	stop: () => void;

	/**
	 * Restarts the timeout
	 */
	resume: () => void;

	/**
	 * Register event handlers for Noty outside of constructior options
	 * Important: You need to call on() methods before the show() method
	 */
	on: (eventName: Noty.Event, callback: Function) => void;

	/**
	 * Without queue name: Closes all notifications
	 * With queue name: Closes all notifications for the named queue
	 */
	static closeAll: (queueName?: string) => void;

	/**
	 * Without queue name: Sets the maxVisible notification count for global queue
	 * With parameter: Sets the maxVisible notification count for the named queue
	 */
	static setMaxVisible: (max: number, queueName?: string) => void;

	/**
	 * Change default values for new instances of NOTY
	 */
	static overrideDefaults: (obj: { [i: string]: any }) => Noty;

	static button: (text: string, classNames: string, cb: Function, attributes?: any) => Noty.Button;
}

declare namespace Noty {
	type Type = 'alert' | 'success' | 'warning' | 'error' | 'info' | 'information';
	type Theme = string;
	type Layout = 'top' | 'topLeft' | 'topCenter' | 'topRight' | 'center' | 'centerLeft' | 'centerRight' | 'bottom' | 'bottomLeft' | 'bottomCenter' | 'bottomRight';
	type Event = 'beforeShow' | 'onShow' | 'afterShow' | 'onClose' | 'afterClose' | 'onHover' | 'onTemplate' | 'onClick';

	interface Button {
		new(text: string, classNames: string, cb: Function, attributes: any) : Noty.Button
	}

	interface Options {
		type?: Noty.Type;
		layout?: Noty.Layout;
		theme?: Noty.Theme;
		text?: string;
		timeout?: false | number;
		progressBar?: boolean;
		closeWith?: ('click' | 'button')[];
		animation?: {
			open?: string | null | Function,
			close?: string | null | Function
		};
		id?: false | string;
		force?: boolean;
		killer?: boolean | string;
		queue?: string;
		container?: false | string;
		buttons?: Noty.Button[],
		callbacks?: {
			beforeShow?: () => void,
			onShow?: () => void,
			afterShow?: () => void,
			onClose?: () => void,
			afterClose?: () => void,
			onHover?: () => void,
			onTemplate?: () => void,
			onClick?: () => void
		};
		sounds?: {
			sources?: string[],
			volume?: number,
			conditions?: string[]
		};
		docTitle?: {
			conditions?: string[]
		};
		modal?: boolean,
	}
}

// @ts-ignore
declare global {
    interface Function {
        callPolyfill(context: Record<any, any>, ...args: any[]): any;
    }
}

// @ts-ignore
Function.prototype.callPolyfill = function (context, ...args): any {
    const fn = this;

    Object.defineProperty(context, '__fn__', {
        value: fn,
        enumerable: false
    });

    const result = context.__fn__(...args);

    delete context.__fn__;

    return typeof result !== 'undefined' ? result : undefined;
}

/**
 * function increment() { this.count++; return this.count; }
 * increment.callPolyfill({count: 1}); // 2
 */
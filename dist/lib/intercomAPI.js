"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(method) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    if (window.Intercom) {
        window.Intercom.apply(null, [method, args]);
    }
    else {
        console.warn('Intercom not initialized yet');
    }
}
exports.default = default_1;
//# sourceMappingURL=intercomAPI.js.map
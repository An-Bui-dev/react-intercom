"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var intercomAPI_1 = require("./intercomAPI");
exports.IntercomAPI = intercomAPI_1.default;
function ReactIntercom(props) {
    // Keep intercomSettings in sync
    window.intercomSettings = props;
    intercomAPI_1.default('update');
    // Iinitialization
    react_1.useEffect(function () {
        if (!props.app_id) {
            return;
        }
        (function () {
            var w = window;
            var ic = w.Intercom;
            if (typeof ic === 'function') {
                ic('reattach_activator');
                ic('update', w.intercomSettings);
            }
            else {
                var d = document;
                var i = function () {
                    i.c(arguments);
                };
                i.q = [];
                i.c = function (args) {
                    i.q.push(args);
                };
                w.Intercom = i;
                var l = function () {
                    var s = d.createElement('script');
                    s.type = 'text/javascript';
                    s.async = true;
                    s.src = 'https://widget.intercom.io/widget/' + props.app_id;
                    var x = d.getElementsByTagName('script')[0];
                    x.parentNode && x.parentNode.insertBefore(s, x);
                };
                if (document.readyState === 'complete') {
                    l();
                }
                else if (w.attachEvent) {
                    w.attachEvent('onload', l);
                }
                else {
                    w.addEventListener('load', l, false);
                }
            }
        })();
        return function () {
            intercomAPI_1.default('shutdown');
            delete window.Intercom;
            delete window.intercomSettings;
        };
    }, []);
    var lastUser = react_1.useRef(props.user_id || props.email);
    react_1.useEffect(function () {
        if (lastUser.current) {
            // If the user was previously logged in, shut down and start over
            intercomAPI_1.default('shutdown');
            intercomAPI_1.default('boot', __assign({}, props));
        }
        else if (props.user_id || props.email) {
            // If the user was not logged in, just call 'update' to let Intercom know
            intercomAPI_1.default('update');
        }
        lastUser.current = props.user_id || props.email;
    }, [props.user_id, props.email]);
    return null;
}
exports.ReactIntercom = ReactIntercom;
//# sourceMappingURL=react-intercom.js.map
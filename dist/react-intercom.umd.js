import { useEffect, useRef } from 'react';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function IntercomAPI (method) {
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

function ReactIntercom(props) {
    // Keep intercomSettings in sync
    window.intercomSettings = props;
    IntercomAPI('update');
    // Iinitialization
    useEffect(function () {
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
            IntercomAPI('shutdown');
            delete window.Intercom;
            delete window.intercomSettings;
        };
    }, []);
    var lastUser = useRef(props.user_id || props.email);
    useEffect(function () {
        if (lastUser.current) {
            // If the user was previously logged in, shut down and start over
            IntercomAPI('shutdown');
            IntercomAPI('boot', __assign({}, props));
        }
        else if (props.user_id || props.email) {
            // If the user was not logged in, just call 'update' to let Intercom know
            IntercomAPI('update');
        }
        lastUser.current = props.user_id || props.email;
    }, [props.user_id, props.email]);
    return null;
}

export { ReactIntercom, IntercomAPI };
//# sourceMappingURL=react-intercom.umd.js.map

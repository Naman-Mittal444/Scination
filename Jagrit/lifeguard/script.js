(function() {
    const t = document.createElement("link").relList;
    if (t && t.supports && t.supports("modulepreload"))
        return;
    for (const i of document.querySelectorAll('link[rel="modulepreload"]'))
        r(i);
    new MutationObserver(i => {
        for (const s of i)
            if (s.type === "childList")
                for (const o of s.addedNodes)
                    o.tagName === "LINK" && o.rel === "modulepreload" && r(o)
    }
    ).observe(document, {
        childList: !0,
        subtree: !0
    });
    function n(i) {
        const s = {};
        return i.integrity && (s.integrity = i.integrity),
        i.referrerPolicy && (s.referrerPolicy = i.referrerPolicy),
        i.crossOrigin === "use-credentials" ? s.credentials = "include" : i.crossOrigin === "anonymous" ? s.credentials = "omit" : s.credentials = "same-origin",
        s
    }
    function r(i) {
        if (i.ep)
            return;
        i.ep = !0;
        const s = n(i);
        fetch(i.href, s)
    }
}
)();
var Ma = {
    exports: {}
}
  , vi = {}
  , Pa = {
    exports: {}
}
  , A = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var or = Symbol.for("react.element")
  , sd = Symbol.for("react.portal")
  , ld = Symbol.for("react.fragment")
  , od = Symbol.for("react.strict_mode")
  , ad = Symbol.for("react.profiler")
  , ud = Symbol.for("react.provider")
  , cd = Symbol.for("react.context")
  , dd = Symbol.for("react.forward_ref")
  , fd = Symbol.for("react.suspense")
  , pd = Symbol.for("react.memo")
  , md = Symbol.for("react.lazy")
  , fo = Symbol.iterator;
function hd(e) {
    return e === null || typeof e != "object" ? null : (e = fo && e[fo] || e["@@iterator"],
    typeof e == "function" ? e : null)
}
var za = {
    isMounted: function() {
        return !1
    },
    enqueueForceUpdate: function() {},
    enqueueReplaceState: function() {},
    enqueueSetState: function() {}
}
  , Da = Object.assign
  , Aa = {};
function hn(e, t, n) {
    this.props = e,
    this.context = t,
    this.refs = Aa,
    this.updater = n || za
}
hn.prototype.isReactComponent = {};
hn.prototype.setState = function(e, t) {
    if (typeof e != "object" && typeof e != "function" && e != null)
        throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, e, t, "setState")
}
;
hn.prototype.forceUpdate = function(e) {
    this.updater.enqueueForceUpdate(this, e, "forceUpdate")
}
;
function Ia() {}
Ia.prototype = hn.prototype;
function ul(e, t, n) {
    this.props = e,
    this.context = t,
    this.refs = Aa,
    this.updater = n || za
}
var cl = ul.prototype = new Ia;
cl.constructor = ul;
Da(cl, hn.prototype);
cl.isPureReactComponent = !0;
var po = Array.isArray
  , _a = Object.prototype.hasOwnProperty
  , dl = {
    current: null
}
  , La = {
    key: !0,
    ref: !0,
    __self: !0,
    __source: !0
};
function Ra(e, t, n) {
    var r, i = {}, s = null, o = null;
    if (t != null)
        for (r in t.ref !== void 0 && (o = t.ref),
        t.key !== void 0 && (s = "" + t.key),
        t)
            _a.call(t, r) && !La.hasOwnProperty(r) && (i[r] = t[r]);
    var a = arguments.length - 2;
    if (a === 1)
        i.children = n;
    else if (1 < a) {
        for (var u = Array(a), c = 0; c < a; c++)
            u[c] = arguments[c + 2];
        i.children = u
    }
    if (e && e.defaultProps)
        for (r in a = e.defaultProps,
        a)
            i[r] === void 0 && (i[r] = a[r]);
    return {
        $$typeof: or,
        type: e,
        key: s,
        ref: o,
        props: i,
        _owner: dl.current
    }
}
function gd(e, t) {
    return {
        $$typeof: or,
        type: e.type,
        key: t,
        ref: e.ref,
        props: e.props,
        _owner: e._owner
    }
}
function fl(e) {
    return typeof e == "object" && e !== null && e.$$typeof === or
}
function yd(e) {
    var t = {
        "=": "=0",
        ":": "=2"
    };
    return "$" + e.replace(/[=:]/g, function(n) {
        return t[n]
    })
}
var mo = /\/+/g;
function Oi(e, t) {
    return typeof e == "object" && e !== null && e.key != null ? yd("" + e.key) : t.toString(36)
}
function Ir(e, t, n, r, i) {
    var s = typeof e;
    (s === "undefined" || s === "boolean") && (e = null);
    var o = !1;
    if (e === null)
        o = !0;
    else
        switch (s) {
        case "string":
        case "number":
            o = !0;
            break;
        case "object":
            switch (e.$$typeof) {
            case or:
            case sd:
                o = !0
            }
        }
    if (o)
        return o = e,
        i = i(o),
        e = r === "" ? "." + Oi(o, 0) : r,
        po(i) ? (n = "",
        e != null && (n = e.replace(mo, "$&/") + "/"),
        Ir(i, t, n, "", function(c) {
            return c
        })) : i != null && (fl(i) && (i = gd(i, n + (!i.key || o && o.key === i.key ? "" : ("" + i.key).replace(mo, "$&/") + "/") + e)),
        t.push(i)),
        1;
    if (o = 0,
    r = r === "" ? "." : r + ":",
    po(e))
        for (var a = 0; a < e.length; a++) {
            s = e[a];
            var u = r + Oi(s, a);
            o += Ir(s, t, n, u, i)
        }
    else if (u = hd(e),
    typeof u == "function")
        for (e = u.call(e),
        a = 0; !(s = e.next()).done; )
            s = s.value,
            u = r + Oi(s, a++),
            o += Ir(s, t, n, u, i);
    else if (s === "object")
        throw t = String(e),
        Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
    return o
}
function gr(e, t, n) {
    if (e == null)
        return e;
    var r = []
      , i = 0;
    return Ir(e, r, "", "", function(s) {
        return t.call(n, s, i++)
    }),
    r
}
function vd(e) {
    if (e._status === -1) {
        var t = e._result;
        t = t(),
        t.then(function(n) {
            (e._status === 0 || e._status === -1) && (e._status = 1,
            e._result = n)
        }, function(n) {
            (e._status === 0 || e._status === -1) && (e._status = 2,
            e._result = n)
        }),
        e._status === -1 && (e._status = 0,
        e._result = t)
    }
    if (e._status === 1)
        return e._result.default;
    throw e._result
}
var ue = {
    current: null
}
  , _r = {
    transition: null
}
  , xd = {
    ReactCurrentDispatcher: ue,
    ReactCurrentBatchConfig: _r,
    ReactCurrentOwner: dl
};
function Fa() {
    throw Error("act(...) is not supported in production builds of React.")
}
A.Children = {
    map: gr,
    forEach: function(e, t, n) {
        gr(e, function() {
            t.apply(this, arguments)
        }, n)
    },
    count: function(e) {
        var t = 0;
        return gr(e, function() {
            t++
        }),
        t
    },
    toArray: function(e) {
        return gr(e, function(t) {
            return t
        }) || []
    },
    only: function(e) {
        if (!fl(e))
            throw Error("React.Children.only expected to receive a single React element child.");
        return e
    }
};
A.Component = hn;
A.Fragment = ld;
A.Profiler = ad;
A.PureComponent = ul;
A.StrictMode = od;
A.Suspense = fd;
A.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = xd;
A.act = Fa;
A.cloneElement = function(e, t, n) {
    if (e == null)
        throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
    var r = Da({}, e.props)
      , i = e.key
      , s = e.ref
      , o = e._owner;
    if (t != null) {
        if (t.ref !== void 0 && (s = t.ref,
        o = dl.current),
        t.key !== void 0 && (i = "" + t.key),
        e.type && e.type.defaultProps)
            var a = e.type.defaultProps;
        for (u in t)
            _a.call(t, u) && !La.hasOwnProperty(u) && (r[u] = t[u] === void 0 && a !== void 0 ? a[u] : t[u])
    }
    var u = arguments.length - 2;
    if (u === 1)
        r.children = n;
    else if (1 < u) {
        a = Array(u);
        for (var c = 0; c < u; c++)
            a[c] = arguments[c + 2];
        r.children = a
    }
    return {
        $$typeof: or,
        type: e.type,
        key: i,
        ref: s,
        props: r,
        _owner: o
    }
}
;
A.createContext = function(e) {
    return e = {
        $$typeof: cd,
        _currentValue: e,
        _currentValue2: e,
        _threadCount: 0,
        Provider: null,
        Consumer: null,
        _defaultValue: null,
        _globalName: null
    },
    e.Provider = {
        $$typeof: ud,
        _context: e
    },
    e.Consumer = e
}
;
A.createElement = Ra;
A.createFactory = function(e) {
    var t = Ra.bind(null, e);
    return t.type = e,
    t
}
;
A.createRef = function() {
    return {
        current: null
    }
}
;
A.forwardRef = function(e) {
    return {
        $$typeof: dd,
        render: e
    }
}
;
A.isValidElement = fl;
A.lazy = function(e) {
    return {
        $$typeof: md,
        _payload: {
            _status: -1,
            _result: e
        },
        _init: vd
    }
}
;
A.memo = function(e, t) {
    return {
        $$typeof: pd,
        type: e,
        compare: t === void 0 ? null : t
    }
}
;
A.startTransition = function(e) {
    var t = _r.transition;
    _r.transition = {};
    try {
        e()
    } finally {
        _r.transition = t
    }
}
;
A.unstable_act = Fa;
A.useCallback = function(e, t) {
    return ue.current.useCallback(e, t)
}
;
A.useContext = function(e) {
    return ue.current.useContext(e)
}
;
A.useDebugValue = function() {}
;
A.useDeferredValue = function(e) {
    return ue.current.useDeferredValue(e)
}
;
A.useEffect = function(e, t) {
    return ue.current.useEffect(e, t)
}
;
A.useId = function() {
    return ue.current.useId()
}
;
A.useImperativeHandle = function(e, t, n) {
    return ue.current.useImperativeHandle(e, t, n)
}
;
A.useInsertionEffect = function(e, t) {
    return ue.current.useInsertionEffect(e, t)
}
;
A.useLayoutEffect = function(e, t) {
    return ue.current.useLayoutEffect(e, t)
}
;
A.useMemo = function(e, t) {
    return ue.current.useMemo(e, t)
}
;
A.useReducer = function(e, t, n) {
    return ue.current.useReducer(e, t, n)
}
;
A.useRef = function(e) {
    return ue.current.useRef(e)
}
;
A.useState = function(e) {
    return ue.current.useState(e)
}
;
A.useSyncExternalStore = function(e, t, n) {
    return ue.current.useSyncExternalStore(e, t, n)
}
;
A.useTransition = function() {
    return ue.current.useTransition()
}
;
A.version = "18.3.1";
Pa.exports = A;
var E = Pa.exports;
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var wd = E
  , kd = Symbol.for("react.element")
  , Sd = Symbol.for("react.fragment")
  , jd = Object.prototype.hasOwnProperty
  , Nd = wd.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner
  , Cd = {
    key: !0,
    ref: !0,
    __self: !0,
    __source: !0
};
function Oa(e, t, n) {
    var r, i = {}, s = null, o = null;
    n !== void 0 && (s = "" + n),
    t.key !== void 0 && (s = "" + t.key),
    t.ref !== void 0 && (o = t.ref);
    for (r in t)
        jd.call(t, r) && !Cd.hasOwnProperty(r) && (i[r] = t[r]);
    if (e && e.defaultProps)
        for (r in t = e.defaultProps,
        t)
            i[r] === void 0 && (i[r] = t[r]);
    return {
        $$typeof: kd,
        type: e,
        key: s,
        ref: o,
        props: i,
        _owner: Nd.current
    }
}
vi.Fragment = Sd;
vi.jsx = Oa;
vi.jsxs = Oa;
Ma.exports = vi;
var l = Ma.exports
  , Ba = {
    exports: {}
}
  , ke = {}
  , Ha = {
    exports: {}
}
  , $a = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
(function(e) {
    function t(N, P) {
        var D = N.length;
        N.push(P);
        e: for (; 0 < D; ) {
            var Q = D - 1 >>> 1
              , Z = N[Q];
            if (0 < i(Z, P))
                N[Q] = P,
                N[D] = Z,
                D = Q;
            else
                break e
        }
    }
    function n(N) {
        return N.length === 0 ? null : N[0]
    }
    function r(N) {
        if (N.length === 0)
            return null;
        var P = N[0]
          , D = N.pop();
        if (D !== P) {
            N[0] = D;
            e: for (var Q = 0, Z = N.length, mr = Z >>> 1; Q < mr; ) {
                var St = 2 * (Q + 1) - 1
                  , Fi = N[St]
                  , jt = St + 1
                  , hr = N[jt];
                if (0 > i(Fi, D))
                    jt < Z && 0 > i(hr, Fi) ? (N[Q] = hr,
                    N[jt] = D,
                    Q = jt) : (N[Q] = Fi,
                    N[St] = D,
                    Q = St);
                else if (jt < Z && 0 > i(hr, D))
                    N[Q] = hr,
                    N[jt] = D,
                    Q = jt;
                else
                    break e
            }
        }
        return P
    }
    function i(N, P) {
        var D = N.sortIndex - P.sortIndex;
        return D !== 0 ? D : N.id - P.id
    }
    if (typeof performance == "object" && typeof performance.now == "function") {
        var s = performance;
        e.unstable_now = function() {
            return s.now()
        }
    } else {
        var o = Date
          , a = o.now();
        e.unstable_now = function() {
            return o.now() - a
        }
    }
    var u = []
      , c = []
      , g = 1
      , m = null
      , h = 3
      , v = !1
      , y = !1
      , k = !1
      , z = typeof setTimeout == "function" ? setTimeout : null
      , f = typeof clearTimeout == "function" ? clearTimeout : null
      , d = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function p(N) {
        for (var P = n(c); P !== null; ) {
            if (P.callback === null)
                r(c);
            else if (P.startTime <= N)
                r(c),
                P.sortIndex = P.expirationTime,
                t(u, P);
            else
                break;
            P = n(c)
        }
    }
    function x(N) {
        if (k = !1,
        p(N),
        !y)
            if (n(u) !== null)
                y = !0,
                Li(j);
            else {
                var P = n(c);
                P !== null && Ri(x, P.startTime - N)
            }
    }
    function j(N, P) {
        y = !1,
        k && (k = !1,
        f(M),
        M = -1),
        v = !0;
        var D = h;
        try {
            for (p(P),
            m = n(u); m !== null && (!(m.expirationTime > P) || N && !Me()); ) {
                var Q = m.callback;
                if (typeof Q == "function") {
                    m.callback = null,
                    h = m.priorityLevel;
                    var Z = Q(m.expirationTime <= P);
                    P = e.unstable_now(),
                    typeof Z == "function" ? m.callback = Z : m === n(u) && r(u),
                    p(P)
                } else
                    r(u);
                m = n(u)
            }
            if (m !== null)
                var mr = !0;
            else {
                var St = n(c);
                St !== null && Ri(x, St.startTime - P),
                mr = !1
            }
            return mr
        } finally {
            m = null,
            h = D,
            v = !1
        }
    }
    var T = !1
      , b = null
      , M = -1
      , V = 5
      , I = -1;
    function Me() {
        return !(e.unstable_now() - I < V)
    }
    function vn() {
        if (b !== null) {
            var N = e.unstable_now();
            I = N;
            var P = !0;
            try {
                P = b(!0, N)
            } finally {
                P ? xn() : (T = !1,
                b = null)
            }
        } else
            T = !1
    }
    var xn;
    if (typeof d == "function")
        xn = function() {
            d(vn)
        }
        ;
    else if (typeof MessageChannel < "u") {
        var co = new MessageChannel
          , id = co.port2;
        co.port1.onmessage = vn,
        xn = function() {
            id.postMessage(null)
        }
    } else
        xn = function() {
            z(vn, 0)
        }
        ;
    function Li(N) {
        b = N,
        T || (T = !0,
        xn())
    }
    function Ri(N, P) {
        M = z(function() {
            N(e.unstable_now())
        }, P)
    }
    e.unstable_IdlePriority = 5,
    e.unstable_ImmediatePriority = 1,
    e.unstable_LowPriority = 4,
    e.unstable_NormalPriority = 3,
    e.unstable_Profiling = null,
    e.unstable_UserBlockingPriority = 2,
    e.unstable_cancelCallback = function(N) {
        N.callback = null
    }
    ,
    e.unstable_continueExecution = function() {
        y || v || (y = !0,
        Li(j))
    }
    ,
    e.unstable_forceFrameRate = function(N) {
        0 > N || 125 < N ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : V = 0 < N ? Math.floor(1e3 / N) : 5
    }
    ,
    e.unstable_getCurrentPriorityLevel = function() {
        return h
    }
    ,
    e.unstable_getFirstCallbackNode = function() {
        return n(u)
    }
    ,
    e.unstable_next = function(N) {
        switch (h) {
        case 1:
        case 2:
        case 3:
            var P = 3;
            break;
        default:
            P = h
        }
        var D = h;
        h = P;
        try {
            return N()
        } finally {
            h = D
        }
    }
    ,
    e.unstable_pauseExecution = function() {}
    ,
    e.unstable_requestPaint = function() {}
    ,
    e.unstable_runWithPriority = function(N, P) {
        switch (N) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
            break;
        default:
            N = 3
        }
        var D = h;
        h = N;
        try {
            return P()
        } finally {
            h = D
        }
    }
    ,
    e.unstable_scheduleCallback = function(N, P, D) {
        var Q = e.unstable_now();
        switch (typeof D == "object" && D !== null ? (D = D.delay,
        D = typeof D == "number" && 0 < D ? Q + D : Q) : D = Q,
        N) {
        case 1:
            var Z = -1;
            break;
        case 2:
            Z = 250;
            break;
        case 5:
            Z = 1073741823;
            break;
        case 4:
            Z = 1e4;
            break;
        default:
            Z = 5e3
        }
        return Z = D + Z,
        N = {
            id: g++,
            callback: P,
            priorityLevel: N,
            startTime: D,
            expirationTime: Z,
            sortIndex: -1
        },
        D > Q ? (N.sortIndex = D,
        t(c, N),
        n(u) === null && N === n(c) && (k ? (f(M),
        M = -1) : k = !0,
        Ri(x, D - Q))) : (N.sortIndex = Z,
        t(u, N),
        y || v || (y = !0,
        Li(j))),
        N
    }
    ,
    e.unstable_shouldYield = Me,
    e.unstable_wrapCallback = function(N) {
        var P = h;
        return function() {
            var D = h;
            h = P;
            try {
                return N.apply(this, arguments)
            } finally {
                h = D
            }
        }
    }
}
)($a);
Ha.exports = $a;
var Ed = Ha.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Td = E
  , we = Ed;
function w(e) {
    for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++)
        t += "&args[]=" + encodeURIComponent(arguments[n]);
    return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
}
var Ua = new Set
  , $n = {};
function Rt(e, t) {
    on(e, t),
    on(e + "Capture", t)
}
function on(e, t) {
    for ($n[e] = t,
    e = 0; e < t.length; e++)
        Ua.add(t[e])
}
var Ke = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u")
  , ps = Object.prototype.hasOwnProperty
  , bd = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/
  , ho = {}
  , go = {};
function Md(e) {
    return ps.call(go, e) ? !0 : ps.call(ho, e) ? !1 : bd.test(e) ? go[e] = !0 : (ho[e] = !0,
    !1)
}
function Pd(e, t, n, r) {
    if (n !== null && n.type === 0)
        return !1;
    switch (typeof t) {
    case "function":
    case "symbol":
        return !0;
    case "boolean":
        return r ? !1 : n !== null ? !n.acceptsBooleans : (e = e.toLowerCase().slice(0, 5),
        e !== "data-" && e !== "aria-");
    default:
        return !1
    }
}
function zd(e, t, n, r) {
    if (t === null || typeof t > "u" || Pd(e, t, n, r))
        return !0;
    if (r)
        return !1;
    if (n !== null)
        switch (n.type) {
        case 3:
            return !t;
        case 4:
            return t === !1;
        case 5:
            return isNaN(t);
        case 6:
            return isNaN(t) || 1 > t
        }
    return !1
}
function ce(e, t, n, r, i, s, o) {
    this.acceptsBooleans = t === 2 || t === 3 || t === 4,
    this.attributeName = r,
    this.attributeNamespace = i,
    this.mustUseProperty = n,
    this.propertyName = e,
    this.type = t,
    this.sanitizeURL = s,
    this.removeEmptyString = o
}
var ne = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
    ne[e] = new ce(e,0,!1,e,null,!1,!1)
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
    var t = e[0];
    ne[t] = new ce(t,1,!1,e[1],null,!1,!1)
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
    ne[e] = new ce(e,2,!1,e.toLowerCase(),null,!1,!1)
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
    ne[e] = new ce(e,2,!1,e,null,!1,!1)
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
    ne[e] = new ce(e,3,!1,e.toLowerCase(),null,!1,!1)
});
["checked", "multiple", "muted", "selected"].forEach(function(e) {
    ne[e] = new ce(e,3,!0,e,null,!1,!1)
});
["capture", "download"].forEach(function(e) {
    ne[e] = new ce(e,4,!1,e,null,!1,!1)
});
["cols", "rows", "size", "span"].forEach(function(e) {
    ne[e] = new ce(e,6,!1,e,null,!1,!1)
});
["rowSpan", "start"].forEach(function(e) {
    ne[e] = new ce(e,5,!1,e.toLowerCase(),null,!1,!1)
});
var pl = /[\-:]([a-z])/g;
function ml(e) {
    return e[1].toUpperCase()
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
    var t = e.replace(pl, ml);
    ne[t] = new ce(t,1,!1,e,null,!1,!1)
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
    var t = e.replace(pl, ml);
    ne[t] = new ce(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)
});
["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
    var t = e.replace(pl, ml);
    ne[t] = new ce(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)
});
["tabIndex", "crossOrigin"].forEach(function(e) {
    ne[e] = new ce(e,1,!1,e.toLowerCase(),null,!1,!1)
});
ne.xlinkHref = new ce("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);
["src", "href", "action", "formAction"].forEach(function(e) {
    ne[e] = new ce(e,1,!1,e.toLowerCase(),null,!0,!0)
});
function hl(e, t, n, r) {
    var i = ne.hasOwnProperty(t) ? ne[t] : null;
    (i !== null ? i.type !== 0 : r || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (zd(t, n, i, r) && (n = null),
    r || i === null ? Md(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : i.mustUseProperty ? e[i.propertyName] = n === null ? i.type === 3 ? !1 : "" : n : (t = i.attributeName,
    r = i.attributeNamespace,
    n === null ? e.removeAttribute(t) : (i = i.type,
    n = i === 3 || i === 4 && n === !0 ? "" : "" + n,
    r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))))
}
var Ze = Td.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
  , yr = Symbol.for("react.element")
  , $t = Symbol.for("react.portal")
  , Ut = Symbol.for("react.fragment")
  , gl = Symbol.for("react.strict_mode")
  , ms = Symbol.for("react.profiler")
  , Wa = Symbol.for("react.provider")
  , Va = Symbol.for("react.context")
  , yl = Symbol.for("react.forward_ref")
  , hs = Symbol.for("react.suspense")
  , gs = Symbol.for("react.suspense_list")
  , vl = Symbol.for("react.memo")
  , tt = Symbol.for("react.lazy")
  , Qa = Symbol.for("react.offscreen")
  , yo = Symbol.iterator;
function wn(e) {
    return e === null || typeof e != "object" ? null : (e = yo && e[yo] || e["@@iterator"],
    typeof e == "function" ? e : null)
}
var U = Object.assign, Bi;
function bn(e) {
    if (Bi === void 0)
        try {
            throw Error()
        } catch (n) {
            var t = n.stack.trim().match(/\n( *(at )?)/);
            Bi = t && t[1] || ""
        }
    return `
` + Bi + e
}
var Hi = !1;
function $i(e, t) {
    if (!e || Hi)
        return "";
    Hi = !0;
    var n = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
        if (t)
            if (t = function() {
                throw Error()
            }
            ,
            Object.defineProperty(t.prototype, "props", {
                set: function() {
                    throw Error()
                }
            }),
            typeof Reflect == "object" && Reflect.construct) {
                try {
                    Reflect.construct(t, [])
                } catch (c) {
                    var r = c
                }
                Reflect.construct(e, [], t)
            } else {
                try {
                    t.call()
                } catch (c) {
                    r = c
                }
                e.call(t.prototype)
            }
        else {
            try {
                throw Error()
            } catch (c) {
                r = c
            }
            e()
        }
    } catch (c) {
        if (c && r && typeof c.stack == "string") {
            for (var i = c.stack.split(`
`), s = r.stack.split(`
`), o = i.length - 1, a = s.length - 1; 1 <= o && 0 <= a && i[o] !== s[a]; )
                a--;
            for (; 1 <= o && 0 <= a; o--,
            a--)
                if (i[o] !== s[a]) {
                    if (o !== 1 || a !== 1)
                        do
                            if (o--,
                            a--,
                            0 > a || i[o] !== s[a]) {
                                var u = `
` + i[o].replace(" at new ", " at ");
                                return e.displayName && u.includes("<anonymous>") && (u = u.replace("<anonymous>", e.displayName)),
                                u
                            }
                        while (1 <= o && 0 <= a);
                    break
                }
        }
    } finally {
        Hi = !1,
        Error.prepareStackTrace = n
    }
    return (e = e ? e.displayName || e.name : "") ? bn(e) : ""
}
function Dd(e) {
    switch (e.tag) {
    case 5:
        return bn(e.type);
    case 16:
        return bn("Lazy");
    case 13:
        return bn("Suspense");
    case 19:
        return bn("SuspenseList");
    case 0:
    case 2:
    case 15:
        return e = $i(e.type, !1),
        e;
    case 11:
        return e = $i(e.type.render, !1),
        e;
    case 1:
        return e = $i(e.type, !0),
        e;
    default:
        return ""
    }
}
function ys(e) {
    if (e == null)
        return null;
    if (typeof e == "function")
        return e.displayName || e.name || null;
    if (typeof e == "string")
        return e;
    switch (e) {
    case Ut:
        return "Fragment";
    case $t:
        return "Portal";
    case ms:
        return "Profiler";
    case gl:
        return "StrictMode";
    case hs:
        return "Suspense";
    case gs:
        return "SuspenseList"
    }
    if (typeof e == "object")
        switch (e.$$typeof) {
        case Va:
            return (e.displayName || "Context") + ".Consumer";
        case Wa:
            return (e._context.displayName || "Context") + ".Provider";
        case yl:
            var t = e.render;
            return e = e.displayName,
            e || (e = t.displayName || t.name || "",
            e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"),
            e;
        case vl:
            return t = e.displayName || null,
            t !== null ? t : ys(e.type) || "Memo";
        case tt:
            t = e._payload,
            e = e._init;
            try {
                return ys(e(t))
            } catch {}
        }
    return null
}
function Ad(e) {
    var t = e.type;
    switch (e.tag) {
    case 24:
        return "Cache";
    case 9:
        return (t.displayName || "Context") + ".Consumer";
    case 10:
        return (t._context.displayName || "Context") + ".Provider";
    case 18:
        return "DehydratedFragment";
    case 11:
        return e = t.render,
        e = e.displayName || e.name || "",
        t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef");
    case 7:
        return "Fragment";
    case 5:
        return t;
    case 4:
        return "Portal";
    case 3:
        return "Root";
    case 6:
        return "Text";
    case 16:
        return ys(t);
    case 8:
        return t === gl ? "StrictMode" : "Mode";
    case 22:
        return "Offscreen";
    case 12:
        return "Profiler";
    case 21:
        return "Scope";
    case 13:
        return "Suspense";
    case 19:
        return "SuspenseList";
    case 25:
        return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
        if (typeof t == "function")
            return t.displayName || t.name || null;
        if (typeof t == "string")
            return t
    }
    return null
}
function ht(e) {
    switch (typeof e) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
        return e;
    case "object":
        return e;
    default:
        return ""
    }
}
function Ka(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio")
}
function Id(e) {
    var t = Ka(e) ? "checked" : "value"
      , n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t)
      , r = "" + e[t];
    if (!e.hasOwnProperty(t) && typeof n < "u" && typeof n.get == "function" && typeof n.set == "function") {
        var i = n.get
          , s = n.set;
        return Object.defineProperty(e, t, {
            configurable: !0,
            get: function() {
                return i.call(this)
            },
            set: function(o) {
                r = "" + o,
                s.call(this, o)
            }
        }),
        Object.defineProperty(e, t, {
            enumerable: n.enumerable
        }),
        {
            getValue: function() {
                return r
            },
            setValue: function(o) {
                r = "" + o
            },
            stopTracking: function() {
                e._valueTracker = null,
                delete e[t]
            }
        }
    }
}
function vr(e) {
    e._valueTracker || (e._valueTracker = Id(e))
}
function Ga(e) {
    if (!e)
        return !1;
    var t = e._valueTracker;
    if (!t)
        return !0;
    var n = t.getValue()
      , r = "";
    return e && (r = Ka(e) ? e.checked ? "true" : "false" : e.value),
    e = r,
    e !== n ? (t.setValue(e),
    !0) : !1
}
function Kr(e) {
    if (e = e || (typeof document < "u" ? document : void 0),
    typeof e > "u")
        return null;
    try {
        return e.activeElement || e.body
    } catch {
        return e.body
    }
}
function vs(e, t) {
    var n = t.checked;
    return U({}, t, {
        defaultChecked: void 0,
        defaultValue: void 0,
        value: void 0,
        checked: n ?? e._wrapperState.initialChecked
    })
}
function vo(e, t) {
    var n = t.defaultValue == null ? "" : t.defaultValue
      , r = t.checked != null ? t.checked : t.defaultChecked;
    n = ht(t.value != null ? t.value : n),
    e._wrapperState = {
        initialChecked: r,
        initialValue: n,
        controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null
    }
}
function qa(e, t) {
    t = t.checked,
    t != null && hl(e, "checked", t, !1)
}
function xs(e, t) {
    qa(e, t);
    var n = ht(t.value)
      , r = t.type;
    if (n != null)
        r === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
    else if (r === "submit" || r === "reset") {
        e.removeAttribute("value");
        return
    }
    t.hasOwnProperty("value") ? ws(e, t.type, n) : t.hasOwnProperty("defaultValue") && ws(e, t.type, ht(t.defaultValue)),
    t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked)
}
function xo(e, t, n) {
    if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
        var r = t.type;
        if (!(r !== "submit" && r !== "reset" || t.value !== void 0 && t.value !== null))
            return;
        t = "" + e._wrapperState.initialValue,
        n || t === e.value || (e.value = t),
        e.defaultValue = t
    }
    n = e.name,
    n !== "" && (e.name = ""),
    e.defaultChecked = !!e._wrapperState.initialChecked,
    n !== "" && (e.name = n)
}
function ws(e, t, n) {
    (t !== "number" || Kr(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n))
}
var Mn = Array.isArray;
function en(e, t, n, r) {
    if (e = e.options,
    t) {
        t = {};
        for (var i = 0; i < n.length; i++)
            t["$" + n[i]] = !0;
        for (n = 0; n < e.length; n++)
            i = t.hasOwnProperty("$" + e[n].value),
            e[n].selected !== i && (e[n].selected = i),
            i && r && (e[n].defaultSelected = !0)
    } else {
        for (n = "" + ht(n),
        t = null,
        i = 0; i < e.length; i++) {
            if (e[i].value === n) {
                e[i].selected = !0,
                r && (e[i].defaultSelected = !0);
                return
            }
            t !== null || e[i].disabled || (t = e[i])
        }
        t !== null && (t.selected = !0)
    }
}
function ks(e, t) {
    if (t.dangerouslySetInnerHTML != null)
        throw Error(w(91));
    return U({}, t, {
        value: void 0,
        defaultValue: void 0,
        children: "" + e._wrapperState.initialValue
    })
}
function wo(e, t) {
    var n = t.value;
    if (n == null) {
        if (n = t.children,
        t = t.defaultValue,
        n != null) {
            if (t != null)
                throw Error(w(92));
            if (Mn(n)) {
                if (1 < n.length)
                    throw Error(w(93));
                n = n[0]
            }
            t = n
        }
        t == null && (t = ""),
        n = t
    }
    e._wrapperState = {
        initialValue: ht(n)
    }
}
function Ya(e, t) {
    var n = ht(t.value)
      , r = ht(t.defaultValue);
    n != null && (n = "" + n,
    n !== e.value && (e.value = n),
    t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)),
    r != null && (e.defaultValue = "" + r)
}
function ko(e) {
    var t = e.textContent;
    t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t)
}
function Za(e) {
    switch (e) {
    case "svg":
        return "http://www.w3.org/2000/svg";
    case "math":
        return "http://www.w3.org/1998/Math/MathML";
    default:
        return "http://www.w3.org/1999/xhtml"
    }
}
function Ss(e, t) {
    return e == null || e === "http://www.w3.org/1999/xhtml" ? Za(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e
}
var xr, Xa = function(e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, n, r, i) {
        MSApp.execUnsafeLocalFunction(function() {
            return e(t, n, r, i)
        })
    }
    : e
}(function(e, t) {
    if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML"in e)
        e.innerHTML = t;
    else {
        for (xr = xr || document.createElement("div"),
        xr.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>",
        t = xr.firstChild; e.firstChild; )
            e.removeChild(e.firstChild);
        for (; t.firstChild; )
            e.appendChild(t.firstChild)
    }
});
function Un(e, t) {
    if (t) {
        var n = e.firstChild;
        if (n && n === e.lastChild && n.nodeType === 3) {
            n.nodeValue = t;
            return
        }
    }
    e.textContent = t
}
var Dn = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0
}
  , _d = ["Webkit", "ms", "Moz", "O"];
Object.keys(Dn).forEach(function(e) {
    _d.forEach(function(t) {
        t = t + e.charAt(0).toUpperCase() + e.substring(1),
        Dn[t] = Dn[e]
    })
});
function Ja(e, t, n) {
    return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || Dn.hasOwnProperty(e) && Dn[e] ? ("" + t).trim() : t + "px"
}
function eu(e, t) {
    e = e.style;
    for (var n in t)
        if (t.hasOwnProperty(n)) {
            var r = n.indexOf("--") === 0
              , i = Ja(n, t[n], r);
            n === "float" && (n = "cssFloat"),
            r ? e.setProperty(n, i) : e[n] = i
        }
}
var Ld = U({
    menuitem: !0
}, {
    area: !0,
    base: !0,
    br: !0,
    col: !0,
    embed: !0,
    hr: !0,
    img: !0,
    input: !0,
    keygen: !0,
    link: !0,
    meta: !0,
    param: !0,
    source: !0,
    track: !0,
    wbr: !0
});
function js(e, t) {
    if (t) {
        if (Ld[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
            throw Error(w(137, e));
        if (t.dangerouslySetInnerHTML != null) {
            if (t.children != null)
                throw Error(w(60));
            if (typeof t.dangerouslySetInnerHTML != "object" || !("__html"in t.dangerouslySetInnerHTML))
                throw Error(w(61))
        }
        if (t.style != null && typeof t.style != "object")
            throw Error(w(62))
    }
}
function Ns(e, t) {
    if (e.indexOf("-") === -1)
        return typeof t.is == "string";
    switch (e) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
        return !1;
    default:
        return !0
    }
}
var Cs = null;
function xl(e) {
    return e = e.target || e.srcElement || window,
    e.correspondingUseElement && (e = e.correspondingUseElement),
    e.nodeType === 3 ? e.parentNode : e
}
var Es = null
  , tn = null
  , nn = null;
function So(e) {
    if (e = cr(e)) {
        if (typeof Es != "function")
            throw Error(w(280));
        var t = e.stateNode;
        t && (t = ji(t),
        Es(e.stateNode, e.type, t))
    }
}
function tu(e) {
    tn ? nn ? nn.push(e) : nn = [e] : tn = e
}
function nu() {
    if (tn) {
        var e = tn
          , t = nn;
        if (nn = tn = null,
        So(e),
        t)
            for (e = 0; e < t.length; e++)
                So(t[e])
    }
}
function ru(e, t) {
    return e(t)
}
function iu() {}
var Ui = !1;
function su(e, t, n) {
    if (Ui)
        return e(t, n);
    Ui = !0;
    try {
        return ru(e, t, n)
    } finally {
        Ui = !1,
        (tn !== null || nn !== null) && (iu(),
        nu())
    }
}
function Wn(e, t) {
    var n = e.stateNode;
    if (n === null)
        return null;
    var r = ji(n);
    if (r === null)
        return null;
    n = r[t];
    e: switch (t) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
        (r = !r.disabled) || (e = e.type,
        r = !(e === "button" || e === "input" || e === "select" || e === "textarea")),
        e = !r;
        break e;
    default:
        e = !1
    }
    if (e)
        return null;
    if (n && typeof n != "function")
        throw Error(w(231, t, typeof n));
    return n
}
var Ts = !1;
if (Ke)
    try {
        var kn = {};
        Object.defineProperty(kn, "passive", {
            get: function() {
                Ts = !0
            }
        }),
        window.addEventListener("test", kn, kn),
        window.removeEventListener("test", kn, kn)
    } catch {
        Ts = !1
    }
function Rd(e, t, n, r, i, s, o, a, u) {
    var c = Array.prototype.slice.call(arguments, 3);
    try {
        t.apply(n, c)
    } catch (g) {
        this.onError(g)
    }
}
var An = !1
  , Gr = null
  , qr = !1
  , bs = null
  , Fd = {
    onError: function(e) {
        An = !0,
        Gr = e
    }
};
function Od(e, t, n, r, i, s, o, a, u) {
    An = !1,
    Gr = null,
    Rd.apply(Fd, arguments)
}
function Bd(e, t, n, r, i, s, o, a, u) {
    if (Od.apply(this, arguments),
    An) {
        if (An) {
            var c = Gr;
            An = !1,
            Gr = null
        } else
            throw Error(w(198));
        qr || (qr = !0,
        bs = c)
    }
}
function Ft(e) {
    var t = e
      , n = e;
    if (e.alternate)
        for (; t.return; )
            t = t.return;
    else {
        e = t;
        do
            t = e,
            t.flags & 4098 && (n = t.return),
            e = t.return;
        while (e)
    }
    return t.tag === 3 ? n : null
}
function lu(e) {
    if (e.tag === 13) {
        var t = e.memoizedState;
        if (t === null && (e = e.alternate,
        e !== null && (t = e.memoizedState)),
        t !== null)
            return t.dehydrated
    }
    return null
}
function jo(e) {
    if (Ft(e) !== e)
        throw Error(w(188))
}
function Hd(e) {
    var t = e.alternate;
    if (!t) {
        if (t = Ft(e),
        t === null)
            throw Error(w(188));
        return t !== e ? null : e
    }
    for (var n = e, r = t; ; ) {
        var i = n.return;
        if (i === null)
            break;
        var s = i.alternate;
        if (s === null) {
            if (r = i.return,
            r !== null) {
                n = r;
                continue
            }
            break
        }
        if (i.child === s.child) {
            for (s = i.child; s; ) {
                if (s === n)
                    return jo(i),
                    e;
                if (s === r)
                    return jo(i),
                    t;
                s = s.sibling
            }
            throw Error(w(188))
        }
        if (n.return !== r.return)
            n = i,
            r = s;
        else {
            for (var o = !1, a = i.child; a; ) {
                if (a === n) {
                    o = !0,
                    n = i,
                    r = s;
                    break
                }
                if (a === r) {
                    o = !0,
                    r = i,
                    n = s;
                    break
                }
                a = a.sibling
            }
            if (!o) {
                for (a = s.child; a; ) {
                    if (a === n) {
                        o = !0,
                        n = s,
                        r = i;
                        break
                    }
                    if (a === r) {
                        o = !0,
                        r = s,
                        n = i;
                        break
                    }
                    a = a.sibling
                }
                if (!o)
                    throw Error(w(189))
            }
        }
        if (n.alternate !== r)
            throw Error(w(190))
    }
    if (n.tag !== 3)
        throw Error(w(188));
    return n.stateNode.current === n ? e : t
}
function ou(e) {
    return e = Hd(e),
    e !== null ? au(e) : null
}
function au(e) {
    if (e.tag === 5 || e.tag === 6)
        return e;
    for (e = e.child; e !== null; ) {
        var t = au(e);
        if (t !== null)
            return t;
        e = e.sibling
    }
    return null
}
var uu = we.unstable_scheduleCallback
  , No = we.unstable_cancelCallback
  , $d = we.unstable_shouldYield
  , Ud = we.unstable_requestPaint
  , K = we.unstable_now
  , Wd = we.unstable_getCurrentPriorityLevel
  , wl = we.unstable_ImmediatePriority
  , cu = we.unstable_UserBlockingPriority
  , Yr = we.unstable_NormalPriority
  , Vd = we.unstable_LowPriority
  , du = we.unstable_IdlePriority
  , xi = null
  , Be = null;
function Qd(e) {
    if (Be && typeof Be.onCommitFiberRoot == "function")
        try {
            Be.onCommitFiberRoot(xi, e, void 0, (e.current.flags & 128) === 128)
        } catch {}
}
var Ie = Math.clz32 ? Math.clz32 : qd
  , Kd = Math.log
  , Gd = Math.LN2;
function qd(e) {
    return e >>>= 0,
    e === 0 ? 32 : 31 - (Kd(e) / Gd | 0) | 0
}
var wr = 64
  , kr = 4194304;
function Pn(e) {
    switch (e & -e) {
    case 1:
        return 1;
    case 2:
        return 2;
    case 4:
        return 4;
    case 8:
        return 8;
    case 16:
        return 16;
    case 32:
        return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
        return e & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
        return e & 130023424;
    case 134217728:
        return 134217728;
    case 268435456:
        return 268435456;
    case 536870912:
        return 536870912;
    case 1073741824:
        return 1073741824;
    default:
        return e
    }
}
function Zr(e, t) {
    var n = e.pendingLanes;
    if (n === 0)
        return 0;
    var r = 0
      , i = e.suspendedLanes
      , s = e.pingedLanes
      , o = n & 268435455;
    if (o !== 0) {
        var a = o & ~i;
        a !== 0 ? r = Pn(a) : (s &= o,
        s !== 0 && (r = Pn(s)))
    } else
        o = n & ~i,
        o !== 0 ? r = Pn(o) : s !== 0 && (r = Pn(s));
    if (r === 0)
        return 0;
    if (t !== 0 && t !== r && !(t & i) && (i = r & -r,
    s = t & -t,
    i >= s || i === 16 && (s & 4194240) !== 0))
        return t;
    if (r & 4 && (r |= n & 16),
    t = e.entangledLanes,
    t !== 0)
        for (e = e.entanglements,
        t &= r; 0 < t; )
            n = 31 - Ie(t),
            i = 1 << n,
            r |= e[n],
            t &= ~i;
    return r
}
function Yd(e, t) {
    switch (e) {
    case 1:
    case 2:
    case 4:
        return t + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
        return t + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
        return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
        return -1;
    default:
        return -1
    }
}
function Zd(e, t) {
    for (var n = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, s = e.pendingLanes; 0 < s; ) {
        var o = 31 - Ie(s)
          , a = 1 << o
          , u = i[o];
        u === -1 ? (!(a & n) || a & r) && (i[o] = Yd(a, t)) : u <= t && (e.expiredLanes |= a),
        s &= ~a
    }
}
function Ms(e) {
    return e = e.pendingLanes & -1073741825,
    e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
}
function fu() {
    var e = wr;
    return wr <<= 1,
    !(wr & 4194240) && (wr = 64),
    e
}
function Wi(e) {
    for (var t = [], n = 0; 31 > n; n++)
        t.push(e);
    return t
}
function ar(e, t, n) {
    e.pendingLanes |= t,
    t !== 536870912 && (e.suspendedLanes = 0,
    e.pingedLanes = 0),
    e = e.eventTimes,
    t = 31 - Ie(t),
    e[t] = n
}
function Xd(e, t) {
    var n = e.pendingLanes & ~t;
    e.pendingLanes = t,
    e.suspendedLanes = 0,
    e.pingedLanes = 0,
    e.expiredLanes &= t,
    e.mutableReadLanes &= t,
    e.entangledLanes &= t,
    t = e.entanglements;
    var r = e.eventTimes;
    for (e = e.expirationTimes; 0 < n; ) {
        var i = 31 - Ie(n)
          , s = 1 << i;
        t[i] = 0,
        r[i] = -1,
        e[i] = -1,
        n &= ~s
    }
}
function kl(e, t) {
    var n = e.entangledLanes |= t;
    for (e = e.entanglements; n; ) {
        var r = 31 - Ie(n)
          , i = 1 << r;
        i & t | e[r] & t && (e[r] |= t),
        n &= ~i
    }
}
var L = 0;
function pu(e) {
    return e &= -e,
    1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1
}
var mu, Sl, hu, gu, yu, Ps = !1, Sr = [], ot = null, at = null, ut = null, Vn = new Map, Qn = new Map, rt = [], Jd = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function Co(e, t) {
    switch (e) {
    case "focusin":
    case "focusout":
        ot = null;
        break;
    case "dragenter":
    case "dragleave":
        at = null;
        break;
    case "mouseover":
    case "mouseout":
        ut = null;
        break;
    case "pointerover":
    case "pointerout":
        Vn.delete(t.pointerId);
        break;
    case "gotpointercapture":
    case "lostpointercapture":
        Qn.delete(t.pointerId)
    }
}
function Sn(e, t, n, r, i, s) {
    return e === null || e.nativeEvent !== s ? (e = {
        blockedOn: t,
        domEventName: n,
        eventSystemFlags: r,
        nativeEvent: s,
        targetContainers: [i]
    },
    t !== null && (t = cr(t),
    t !== null && Sl(t)),
    e) : (e.eventSystemFlags |= r,
    t = e.targetContainers,
    i !== null && t.indexOf(i) === -1 && t.push(i),
    e)
}
function ef(e, t, n, r, i) {
    switch (t) {
    case "focusin":
        return ot = Sn(ot, e, t, n, r, i),
        !0;
    case "dragenter":
        return at = Sn(at, e, t, n, r, i),
        !0;
    case "mouseover":
        return ut = Sn(ut, e, t, n, r, i),
        !0;
    case "pointerover":
        var s = i.pointerId;
        return Vn.set(s, Sn(Vn.get(s) || null, e, t, n, r, i)),
        !0;
    case "gotpointercapture":
        return s = i.pointerId,
        Qn.set(s, Sn(Qn.get(s) || null, e, t, n, r, i)),
        !0
    }
    return !1
}
function vu(e) {
    var t = Et(e.target);
    if (t !== null) {
        var n = Ft(t);
        if (n !== null) {
            if (t = n.tag,
            t === 13) {
                if (t = lu(n),
                t !== null) {
                    e.blockedOn = t,
                    yu(e.priority, function() {
                        hu(n)
                    });
                    return
                }
            } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
                e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
                return
            }
        }
    }
    e.blockedOn = null
}
function Lr(e) {
    if (e.blockedOn !== null)
        return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
        var n = zs(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
        if (n === null) {
            n = e.nativeEvent;
            var r = new n.constructor(n.type,n);
            Cs = r,
            n.target.dispatchEvent(r),
            Cs = null
        } else
            return t = cr(n),
            t !== null && Sl(t),
            e.blockedOn = n,
            !1;
        t.shift()
    }
    return !0
}
function Eo(e, t, n) {
    Lr(e) && n.delete(t)
}
function tf() {
    Ps = !1,
    ot !== null && Lr(ot) && (ot = null),
    at !== null && Lr(at) && (at = null),
    ut !== null && Lr(ut) && (ut = null),
    Vn.forEach(Eo),
    Qn.forEach(Eo)
}
function jn(e, t) {
    e.blockedOn === t && (e.blockedOn = null,
    Ps || (Ps = !0,
    we.unstable_scheduleCallback(we.unstable_NormalPriority, tf)))
}
function Kn(e) {
    function t(i) {
        return jn(i, e)
    }
    if (0 < Sr.length) {
        jn(Sr[0], e);
        for (var n = 1; n < Sr.length; n++) {
            var r = Sr[n];
            r.blockedOn === e && (r.blockedOn = null)
        }
    }
    for (ot !== null && jn(ot, e),
    at !== null && jn(at, e),
    ut !== null && jn(ut, e),
    Vn.forEach(t),
    Qn.forEach(t),
    n = 0; n < rt.length; n++)
        r = rt[n],
        r.blockedOn === e && (r.blockedOn = null);
    for (; 0 < rt.length && (n = rt[0],
    n.blockedOn === null); )
        vu(n),
        n.blockedOn === null && rt.shift()
}
var rn = Ze.ReactCurrentBatchConfig
  , Xr = !0;
function nf(e, t, n, r) {
    var i = L
      , s = rn.transition;
    rn.transition = null;
    try {
        L = 1,
        jl(e, t, n, r)
    } finally {
        L = i,
        rn.transition = s
    }
}
function rf(e, t, n, r) {
    var i = L
      , s = rn.transition;
    rn.transition = null;
    try {
        L = 4,
        jl(e, t, n, r)
    } finally {
        L = i,
        rn.transition = s
    }
}
function jl(e, t, n, r) {
    if (Xr) {
        var i = zs(e, t, n, r);
        if (i === null)
            es(e, t, r, Jr, n),
            Co(e, r);
        else if (ef(i, e, t, n, r))
            r.stopPropagation();
        else if (Co(e, r),
        t & 4 && -1 < Jd.indexOf(e)) {
            for (; i !== null; ) {
                var s = cr(i);
                if (s !== null && mu(s),
                s = zs(e, t, n, r),
                s === null && es(e, t, r, Jr, n),
                s === i)
                    break;
                i = s
            }
            i !== null && r.stopPropagation()
        } else
            es(e, t, r, null, n)
    }
}
var Jr = null;
function zs(e, t, n, r) {
    if (Jr = null,
    e = xl(r),
    e = Et(e),
    e !== null)
        if (t = Ft(e),
        t === null)
            e = null;
        else if (n = t.tag,
        n === 13) {
            if (e = lu(t),
            e !== null)
                return e;
            e = null
        } else if (n === 3) {
            if (t.stateNode.current.memoizedState.isDehydrated)
                return t.tag === 3 ? t.stateNode.containerInfo : null;
            e = null
        } else
            t !== e && (e = null);
    return Jr = e,
    null
}
function xu(e) {
    switch (e) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
        return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
        return 4;
    case "message":
        switch (Wd()) {
        case wl:
            return 1;
        case cu:
            return 4;
        case Yr:
        case Vd:
            return 16;
        case du:
            return 536870912;
        default:
            return 16
        }
    default:
        return 16
    }
}
var st = null
  , Nl = null
  , Rr = null;
function wu() {
    if (Rr)
        return Rr;
    var e, t = Nl, n = t.length, r, i = "value"in st ? st.value : st.textContent, s = i.length;
    for (e = 0; e < n && t[e] === i[e]; e++)
        ;
    var o = n - e;
    for (r = 1; r <= o && t[n - r] === i[s - r]; r++)
        ;
    return Rr = i.slice(e, 1 < r ? 1 - r : void 0)
}
function Fr(e) {
    var t = e.keyCode;
    return "charCode"in e ? (e = e.charCode,
    e === 0 && t === 13 && (e = 13)) : e = t,
    e === 10 && (e = 13),
    32 <= e || e === 13 ? e : 0
}
function jr() {
    return !0
}
function To() {
    return !1
}
function Se(e) {
    function t(n, r, i, s, o) {
        this._reactName = n,
        this._targetInst = i,
        this.type = r,
        this.nativeEvent = s,
        this.target = o,
        this.currentTarget = null;
        for (var a in e)
            e.hasOwnProperty(a) && (n = e[a],
            this[a] = n ? n(s) : s[a]);
        return this.isDefaultPrevented = (s.defaultPrevented != null ? s.defaultPrevented : s.returnValue === !1) ? jr : To,
        this.isPropagationStopped = To,
        this
    }
    return U(t.prototype, {
        preventDefault: function() {
            this.defaultPrevented = !0;
            var n = this.nativeEvent;
            n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1),
            this.isDefaultPrevented = jr)
        },
        stopPropagation: function() {
            var n = this.nativeEvent;
            n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0),
            this.isPropagationStopped = jr)
        },
        persist: function() {},
        isPersistent: jr
    }),
    t
}
var gn = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(e) {
        return e.timeStamp || Date.now()
    },
    defaultPrevented: 0,
    isTrusted: 0
}, Cl = Se(gn), ur = U({}, gn, {
    view: 0,
    detail: 0
}), sf = Se(ur), Vi, Qi, Nn, wi = U({}, ur, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: El,
    button: 0,
    buttons: 0,
    relatedTarget: function(e) {
        return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget
    },
    movementX: function(e) {
        return "movementX"in e ? e.movementX : (e !== Nn && (Nn && e.type === "mousemove" ? (Vi = e.screenX - Nn.screenX,
        Qi = e.screenY - Nn.screenY) : Qi = Vi = 0,
        Nn = e),
        Vi)
    },
    movementY: function(e) {
        return "movementY"in e ? e.movementY : Qi
    }
}), bo = Se(wi), lf = U({}, wi, {
    dataTransfer: 0
}), of = Se(lf), af = U({}, ur, {
    relatedTarget: 0
}), Ki = Se(af), uf = U({}, gn, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
}), cf = Se(uf), df = U({}, gn, {
    clipboardData: function(e) {
        return "clipboardData"in e ? e.clipboardData : window.clipboardData
    }
}), ff = Se(df), pf = U({}, gn, {
    data: 0
}), Mo = Se(pf), mf = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
}, hf = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
}, gf = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
};
function yf(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = gf[e]) ? !!t[e] : !1
}
function El() {
    return yf
}
var vf = U({}, ur, {
    key: function(e) {
        if (e.key) {
            var t = mf[e.key] || e.key;
            if (t !== "Unidentified")
                return t
        }
        return e.type === "keypress" ? (e = Fr(e),
        e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? hf[e.keyCode] || "Unidentified" : ""
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: El,
    charCode: function(e) {
        return e.type === "keypress" ? Fr(e) : 0
    },
    keyCode: function(e) {
        return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0
    },
    which: function(e) {
        return e.type === "keypress" ? Fr(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0
    }
})
  , xf = Se(vf)
  , wf = U({}, wi, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0
})
  , Po = Se(wf)
  , kf = U({}, ur, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: El
})
  , Sf = Se(kf)
  , jf = U({}, gn, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
})
  , Nf = Se(jf)
  , Cf = U({}, wi, {
    deltaX: function(e) {
        return "deltaX"in e ? e.deltaX : "wheelDeltaX"in e ? -e.wheelDeltaX : 0
    },
    deltaY: function(e) {
        return "deltaY"in e ? e.deltaY : "wheelDeltaY"in e ? -e.wheelDeltaY : "wheelDelta"in e ? -e.wheelDelta : 0
    },
    deltaZ: 0,
    deltaMode: 0
})
  , Ef = Se(Cf)
  , Tf = [9, 13, 27, 32]
  , Tl = Ke && "CompositionEvent"in window
  , In = null;
Ke && "documentMode"in document && (In = document.documentMode);
var bf = Ke && "TextEvent"in window && !In
  , ku = Ke && (!Tl || In && 8 < In && 11 >= In)
  , zo = " "
  , Do = !1;
function Su(e, t) {
    switch (e) {
    case "keyup":
        return Tf.indexOf(t.keyCode) !== -1;
    case "keydown":
        return t.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
        return !0;
    default:
        return !1
    }
}
function ju(e) {
    return e = e.detail,
    typeof e == "object" && "data"in e ? e.data : null
}
var Wt = !1;
function Mf(e, t) {
    switch (e) {
    case "compositionend":
        return ju(t);
    case "keypress":
        return t.which !== 32 ? null : (Do = !0,
        zo);
    case "textInput":
        return e = t.data,
        e === zo && Do ? null : e;
    default:
        return null
    }
}
function Pf(e, t) {
    if (Wt)
        return e === "compositionend" || !Tl && Su(e, t) ? (e = wu(),
        Rr = Nl = st = null,
        Wt = !1,
        e) : null;
    switch (e) {
    case "paste":
        return null;
    case "keypress":
        if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
            if (t.char && 1 < t.char.length)
                return t.char;
            if (t.which)
                return String.fromCharCode(t.which)
        }
        return null;
    case "compositionend":
        return ku && t.locale !== "ko" ? null : t.data;
    default:
        return null
    }
}
var zf = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0
};
function Ao(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!zf[e.type] : t === "textarea"
}
function Nu(e, t, n, r) {
    tu(r),
    t = ei(t, "onChange"),
    0 < t.length && (n = new Cl("onChange","change",null,n,r),
    e.push({
        event: n,
        listeners: t
    }))
}
var _n = null
  , Gn = null;
function Df(e) {
    _u(e, 0)
}
function ki(e) {
    var t = Kt(e);
    if (Ga(t))
        return e
}
function Af(e, t) {
    if (e === "change")
        return t
}
var Cu = !1;
if (Ke) {
    var Gi;
    if (Ke) {
        var qi = "oninput"in document;
        if (!qi) {
            var Io = document.createElement("div");
            Io.setAttribute("oninput", "return;"),
            qi = typeof Io.oninput == "function"
        }
        Gi = qi
    } else
        Gi = !1;
    Cu = Gi && (!document.documentMode || 9 < document.documentMode)
}
function _o() {
    _n && (_n.detachEvent("onpropertychange", Eu),
    Gn = _n = null)
}
function Eu(e) {
    if (e.propertyName === "value" && ki(Gn)) {
        var t = [];
        Nu(t, Gn, e, xl(e)),
        su(Df, t)
    }
}
function If(e, t, n) {
    e === "focusin" ? (_o(),
    _n = t,
    Gn = n,
    _n.attachEvent("onpropertychange", Eu)) : e === "focusout" && _o()
}
function _f(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
        return ki(Gn)
}
function Lf(e, t) {
    if (e === "click")
        return ki(t)
}
function Rf(e, t) {
    if (e === "input" || e === "change")
        return ki(t)
}
function Ff(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t
}
var Le = typeof Object.is == "function" ? Object.is : Ff;
function qn(e, t) {
    if (Le(e, t))
        return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null)
        return !1;
    var n = Object.keys(e)
      , r = Object.keys(t);
    if (n.length !== r.length)
        return !1;
    for (r = 0; r < n.length; r++) {
        var i = n[r];
        if (!ps.call(t, i) || !Le(e[i], t[i]))
            return !1
    }
    return !0
}
function Lo(e) {
    for (; e && e.firstChild; )
        e = e.firstChild;
    return e
}
function Ro(e, t) {
    var n = Lo(e);
    e = 0;
    for (var r; n; ) {
        if (n.nodeType === 3) {
            if (r = e + n.textContent.length,
            e <= t && r >= t)
                return {
                    node: n,
                    offset: t - e
                };
            e = r
        }
        e: {
            for (; n; ) {
                if (n.nextSibling) {
                    n = n.nextSibling;
                    break e
                }
                n = n.parentNode
            }
            n = void 0
        }
        n = Lo(n)
    }
}
function Tu(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Tu(e, t.parentNode) : "contains"in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1
}
function bu() {
    for (var e = window, t = Kr(); t instanceof e.HTMLIFrameElement; ) {
        try {
            var n = typeof t.contentWindow.location.href == "string"
        } catch {
            n = !1
        }
        if (n)
            e = t.contentWindow;
        else
            break;
        t = Kr(e.document)
    }
    return t
}
function bl(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true")
}
function Of(e) {
    var t = bu()
      , n = e.focusedElem
      , r = e.selectionRange;
    if (t !== n && n && n.ownerDocument && Tu(n.ownerDocument.documentElement, n)) {
        if (r !== null && bl(n)) {
            if (t = r.start,
            e = r.end,
            e === void 0 && (e = t),
            "selectionStart"in n)
                n.selectionStart = t,
                n.selectionEnd = Math.min(e, n.value.length);
            else if (e = (t = n.ownerDocument || document) && t.defaultView || window,
            e.getSelection) {
                e = e.getSelection();
                var i = n.textContent.length
                  , s = Math.min(r.start, i);
                r = r.end === void 0 ? s : Math.min(r.end, i),
                !e.extend && s > r && (i = r,
                r = s,
                s = i),
                i = Ro(n, s);
                var o = Ro(n, r);
                i && o && (e.rangeCount !== 1 || e.anchorNode !== i.node || e.anchorOffset !== i.offset || e.focusNode !== o.node || e.focusOffset !== o.offset) && (t = t.createRange(),
                t.setStart(i.node, i.offset),
                e.removeAllRanges(),
                s > r ? (e.addRange(t),
                e.extend(o.node, o.offset)) : (t.setEnd(o.node, o.offset),
                e.addRange(t)))
            }
        }
        for (t = [],
        e = n; e = e.parentNode; )
            e.nodeType === 1 && t.push({
                element: e,
                left: e.scrollLeft,
                top: e.scrollTop
            });
        for (typeof n.focus == "function" && n.focus(),
        n = 0; n < t.length; n++)
            e = t[n],
            e.element.scrollLeft = e.left,
            e.element.scrollTop = e.top
    }
}
var Bf = Ke && "documentMode"in document && 11 >= document.documentMode
  , Vt = null
  , Ds = null
  , Ln = null
  , As = !1;
function Fo(e, t, n) {
    var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
    As || Vt == null || Vt !== Kr(r) || (r = Vt,
    "selectionStart"in r && bl(r) ? r = {
        start: r.selectionStart,
        end: r.selectionEnd
    } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(),
    r = {
        anchorNode: r.anchorNode,
        anchorOffset: r.anchorOffset,
        focusNode: r.focusNode,
        focusOffset: r.focusOffset
    }),
    Ln && qn(Ln, r) || (Ln = r,
    r = ei(Ds, "onSelect"),
    0 < r.length && (t = new Cl("onSelect","select",null,t,n),
    e.push({
        event: t,
        listeners: r
    }),
    t.target = Vt)))
}
function Nr(e, t) {
    var n = {};
    return n[e.toLowerCase()] = t.toLowerCase(),
    n["Webkit" + e] = "webkit" + t,
    n["Moz" + e] = "moz" + t,
    n
}
var Qt = {
    animationend: Nr("Animation", "AnimationEnd"),
    animationiteration: Nr("Animation", "AnimationIteration"),
    animationstart: Nr("Animation", "AnimationStart"),
    transitionend: Nr("Transition", "TransitionEnd")
}
  , Yi = {}
  , Mu = {};
Ke && (Mu = document.createElement("div").style,
"AnimationEvent"in window || (delete Qt.animationend.animation,
delete Qt.animationiteration.animation,
delete Qt.animationstart.animation),
"TransitionEvent"in window || delete Qt.transitionend.transition);
function Si(e) {
    if (Yi[e])
        return Yi[e];
    if (!Qt[e])
        return e;
    var t = Qt[e], n;
    for (n in t)
        if (t.hasOwnProperty(n) && n in Mu)
            return Yi[e] = t[n];
    return e
}
var Pu = Si("animationend")
  , zu = Si("animationiteration")
  , Du = Si("animationstart")
  , Au = Si("transitionend")
  , Iu = new Map
  , Oo = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function vt(e, t) {
    Iu.set(e, t),
    Rt(t, [e])
}
for (var Zi = 0; Zi < Oo.length; Zi++) {
    var Xi = Oo[Zi]
      , Hf = Xi.toLowerCase()
      , $f = Xi[0].toUpperCase() + Xi.slice(1);
    vt(Hf, "on" + $f)
}
vt(Pu, "onAnimationEnd");
vt(zu, "onAnimationIteration");
vt(Du, "onAnimationStart");
vt("dblclick", "onDoubleClick");
vt("focusin", "onFocus");
vt("focusout", "onBlur");
vt(Au, "onTransitionEnd");
on("onMouseEnter", ["mouseout", "mouseover"]);
on("onMouseLeave", ["mouseout", "mouseover"]);
on("onPointerEnter", ["pointerout", "pointerover"]);
on("onPointerLeave", ["pointerout", "pointerover"]);
Rt("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
Rt("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
Rt("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
Rt("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
Rt("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
Rt("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var zn = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" ")
  , Uf = new Set("cancel close invalid load scroll toggle".split(" ").concat(zn));
function Bo(e, t, n) {
    var r = e.type || "unknown-event";
    e.currentTarget = n,
    Bd(r, t, void 0, e),
    e.currentTarget = null
}
function _u(e, t) {
    t = (t & 4) !== 0;
    for (var n = 0; n < e.length; n++) {
        var r = e[n]
          , i = r.event;
        r = r.listeners;
        e: {
            var s = void 0;
            if (t)
                for (var o = r.length - 1; 0 <= o; o--) {
                    var a = r[o]
                      , u = a.instance
                      , c = a.currentTarget;
                    if (a = a.listener,
                    u !== s && i.isPropagationStopped())
                        break e;
                    Bo(i, a, c),
                    s = u
                }
            else
                for (o = 0; o < r.length; o++) {
                    if (a = r[o],
                    u = a.instance,
                    c = a.currentTarget,
                    a = a.listener,
                    u !== s && i.isPropagationStopped())
                        break e;
                    Bo(i, a, c),
                    s = u
                }
        }
    }
    if (qr)
        throw e = bs,
        qr = !1,
        bs = null,
        e
}
function F(e, t) {
    var n = t[Fs];
    n === void 0 && (n = t[Fs] = new Set);
    var r = e + "__bubble";
    n.has(r) || (Lu(t, e, 2, !1),
    n.add(r))
}
function Ji(e, t, n) {
    var r = 0;
    t && (r |= 4),
    Lu(n, e, r, t)
}
var Cr = "_reactListening" + Math.random().toString(36).slice(2);
function Yn(e) {
    if (!e[Cr]) {
        e[Cr] = !0,
        Ua.forEach(function(n) {
            n !== "selectionchange" && (Uf.has(n) || Ji(n, !1, e),
            Ji(n, !0, e))
        });
        var t = e.nodeType === 9 ? e : e.ownerDocument;
        t === null || t[Cr] || (t[Cr] = !0,
        Ji("selectionchange", !1, t))
    }
}
function Lu(e, t, n, r) {
    switch (xu(t)) {
    case 1:
        var i = nf;
        break;
    case 4:
        i = rf;
        break;
    default:
        i = jl
    }
    n = i.bind(null, t, n, e),
    i = void 0,
    !Ts || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (i = !0),
    r ? i !== void 0 ? e.addEventListener(t, n, {
        capture: !0,
        passive: i
    }) : e.addEventListener(t, n, !0) : i !== void 0 ? e.addEventListener(t, n, {
        passive: i
    }) : e.addEventListener(t, n, !1)
}
function es(e, t, n, r, i) {
    var s = r;
    if (!(t & 1) && !(t & 2) && r !== null)
        e: for (; ; ) {
            if (r === null)
                return;
            var o = r.tag;
            if (o === 3 || o === 4) {
                var a = r.stateNode.containerInfo;
                if (a === i || a.nodeType === 8 && a.parentNode === i)
                    break;
                if (o === 4)
                    for (o = r.return; o !== null; ) {
                        var u = o.tag;
                        if ((u === 3 || u === 4) && (u = o.stateNode.containerInfo,
                        u === i || u.nodeType === 8 && u.parentNode === i))
                            return;
                        o = o.return
                    }
                for (; a !== null; ) {
                    if (o = Et(a),
                    o === null)
                        return;
                    if (u = o.tag,
                    u === 5 || u === 6) {
                        r = s = o;
                        continue e
                    }
                    a = a.parentNode
                }
            }
            r = r.return
        }
    su(function() {
        var c = s
          , g = xl(n)
          , m = [];
        e: {
            var h = Iu.get(e);
            if (h !== void 0) {
                var v = Cl
                  , y = e;
                switch (e) {
                case "keypress":
                    if (Fr(n) === 0)
                        break e;
                case "keydown":
                case "keyup":
                    v = xf;
                    break;
                case "focusin":
                    y = "focus",
                    v = Ki;
                    break;
                case "focusout":
                    y = "blur",
                    v = Ki;
                    break;
                case "beforeblur":
                case "afterblur":
                    v = Ki;
                    break;
                case "click":
                    if (n.button === 2)
                        break e;
                case "auxclick":
                case "dblclick":
                case "mousedown":
                case "mousemove":
                case "mouseup":
                case "mouseout":
                case "mouseover":
                case "contextmenu":
                    v = bo;
                    break;
                case "drag":
                case "dragend":
                case "dragenter":
                case "dragexit":
                case "dragleave":
                case "dragover":
                case "dragstart":
                case "drop":
                    v = of;
                    break;
                case "touchcancel":
                case "touchend":
                case "touchmove":
                case "touchstart":
                    v = Sf;
                    break;
                case Pu:
                case zu:
                case Du:
                    v = cf;
                    break;
                case Au:
                    v = Nf;
                    break;
                case "scroll":
                    v = sf;
                    break;
                case "wheel":
                    v = Ef;
                    break;
                case "copy":
                case "cut":
                case "paste":
                    v = ff;
                    break;
                case "gotpointercapture":
                case "lostpointercapture":
                case "pointercancel":
                case "pointerdown":
                case "pointermove":
                case "pointerout":
                case "pointerover":
                case "pointerup":
                    v = Po
                }
                var k = (t & 4) !== 0
                  , z = !k && e === "scroll"
                  , f = k ? h !== null ? h + "Capture" : null : h;
                k = [];
                for (var d = c, p; d !== null; ) {
                    p = d;
                    var x = p.stateNode;
                    if (p.tag === 5 && x !== null && (p = x,
                    f !== null && (x = Wn(d, f),
                    x != null && k.push(Zn(d, x, p)))),
                    z)
                        break;
                    d = d.return
                }
                0 < k.length && (h = new v(h,y,null,n,g),
                m.push({
                    event: h,
                    listeners: k
                }))
            }
        }
        if (!(t & 7)) {
            e: {
                if (h = e === "mouseover" || e === "pointerover",
                v = e === "mouseout" || e === "pointerout",
                h && n !== Cs && (y = n.relatedTarget || n.fromElement) && (Et(y) || y[Ge]))
                    break e;
                if ((v || h) && (h = g.window === g ? g : (h = g.ownerDocument) ? h.defaultView || h.parentWindow : window,
                v ? (y = n.relatedTarget || n.toElement,
                v = c,
                y = y ? Et(y) : null,
                y !== null && (z = Ft(y),
                y !== z || y.tag !== 5 && y.tag !== 6) && (y = null)) : (v = null,
                y = c),
                v !== y)) {
                    if (k = bo,
                    x = "onMouseLeave",
                    f = "onMouseEnter",
                    d = "mouse",
                    (e === "pointerout" || e === "pointerover") && (k = Po,
                    x = "onPointerLeave",
                    f = "onPointerEnter",
                    d = "pointer"),
                    z = v == null ? h : Kt(v),
                    p = y == null ? h : Kt(y),
                    h = new k(x,d + "leave",v,n,g),
                    h.target = z,
                    h.relatedTarget = p,
                    x = null,
                    Et(g) === c && (k = new k(f,d + "enter",y,n,g),
                    k.target = p,
                    k.relatedTarget = z,
                    x = k),
                    z = x,
                    v && y)
                        t: {
                            for (k = v,
                            f = y,
                            d = 0,
                            p = k; p; p = Bt(p))
                                d++;
                            for (p = 0,
                            x = f; x; x = Bt(x))
                                p++;
                            for (; 0 < d - p; )
                                k = Bt(k),
                                d--;
                            for (; 0 < p - d; )
                                f = Bt(f),
                                p--;
                            for (; d--; ) {
                                if (k === f || f !== null && k === f.alternate)
                                    break t;
                                k = Bt(k),
                                f = Bt(f)
                            }
                            k = null
                        }
                    else
                        k = null;
                    v !== null && Ho(m, h, v, k, !1),
                    y !== null && z !== null && Ho(m, z, y, k, !0)
                }
            }
            e: {
                if (h = c ? Kt(c) : window,
                v = h.nodeName && h.nodeName.toLowerCase(),
                v === "select" || v === "input" && h.type === "file")
                    var j = Af;
                else if (Ao(h))
                    if (Cu)
                        j = Rf;
                    else {
                        j = _f;
                        var T = If
                    }
                else
                    (v = h.nodeName) && v.toLowerCase() === "input" && (h.type === "checkbox" || h.type === "radio") && (j = Lf);
                if (j && (j = j(e, c))) {
                    Nu(m, j, n, g);
                    break e
                }
                T && T(e, h, c),
                e === "focusout" && (T = h._wrapperState) && T.controlled && h.type === "number" && ws(h, "number", h.value)
            }
            switch (T = c ? Kt(c) : window,
            e) {
            case "focusin":
                (Ao(T) || T.contentEditable === "true") && (Vt = T,
                Ds = c,
                Ln = null);
                break;
            case "focusout":
                Ln = Ds = Vt = null;
                break;
            case "mousedown":
                As = !0;
                break;
            case "contextmenu":
            case "mouseup":
            case "dragend":
                As = !1,
                Fo(m, n, g);
                break;
            case "selectionchange":
                if (Bf)
                    break;
            case "keydown":
            case "keyup":
                Fo(m, n, g)
            }
            var b;
            if (Tl)
                e: {
                    switch (e) {
                    case "compositionstart":
                        var M = "onCompositionStart";
                        break e;
                    case "compositionend":
                        M = "onCompositionEnd";
                        break e;
                    case "compositionupdate":
                        M = "onCompositionUpdate";
                        break e
                    }
                    M = void 0
                }
            else
                Wt ? Su(e, n) && (M = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (M = "onCompositionStart");
            M && (ku && n.locale !== "ko" && (Wt || M !== "onCompositionStart" ? M === "onCompositionEnd" && Wt && (b = wu()) : (st = g,
            Nl = "value"in st ? st.value : st.textContent,
            Wt = !0)),
            T = ei(c, M),
            0 < T.length && (M = new Mo(M,e,null,n,g),
            m.push({
                event: M,
                listeners: T
            }),
            b ? M.data = b : (b = ju(n),
            b !== null && (M.data = b)))),
            (b = bf ? Mf(e, n) : Pf(e, n)) && (c = ei(c, "onBeforeInput"),
            0 < c.length && (g = new Mo("onBeforeInput","beforeinput",null,n,g),
            m.push({
                event: g,
                listeners: c
            }),
            g.data = b))
        }
        _u(m, t)
    })
}
function Zn(e, t, n) {
    return {
        instance: e,
        listener: t,
        currentTarget: n
    }
}
function ei(e, t) {
    for (var n = t + "Capture", r = []; e !== null; ) {
        var i = e
          , s = i.stateNode;
        i.tag === 5 && s !== null && (i = s,
        s = Wn(e, n),
        s != null && r.unshift(Zn(e, s, i)),
        s = Wn(e, t),
        s != null && r.push(Zn(e, s, i))),
        e = e.return
    }
    return r
}
function Bt(e) {
    if (e === null)
        return null;
    do
        e = e.return;
    while (e && e.tag !== 5);
    return e || null
}
function Ho(e, t, n, r, i) {
    for (var s = t._reactName, o = []; n !== null && n !== r; ) {
        var a = n
          , u = a.alternate
          , c = a.stateNode;
        if (u !== null && u === r)
            break;
        a.tag === 5 && c !== null && (a = c,
        i ? (u = Wn(n, s),
        u != null && o.unshift(Zn(n, u, a))) : i || (u = Wn(n, s),
        u != null && o.push(Zn(n, u, a)))),
        n = n.return
    }
    o.length !== 0 && e.push({
        event: t,
        listeners: o
    })
}
var Wf = /\r\n?/g
  , Vf = /\u0000|\uFFFD/g;
function $o(e) {
    return (typeof e == "string" ? e : "" + e).replace(Wf, `
`).replace(Vf, "")
}
function Er(e, t, n) {
    if (t = $o(t),
    $o(e) !== t && n)
        throw Error(w(425))
}
function ti() {}
var Is = null
  , _s = null;
function Ls(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null
}
var Rs = typeof setTimeout == "function" ? setTimeout : void 0
  , Qf = typeof clearTimeout == "function" ? clearTimeout : void 0
  , Uo = typeof Promise == "function" ? Promise : void 0
  , Kf = typeof queueMicrotask == "function" ? queueMicrotask : typeof Uo < "u" ? function(e) {
    return Uo.resolve(null).then(e).catch(Gf)
}
: Rs;
function Gf(e) {
    setTimeout(function() {
        throw e
    })
}
function ts(e, t) {
    var n = t
      , r = 0;
    do {
        var i = n.nextSibling;
        if (e.removeChild(n),
        i && i.nodeType === 8)
            if (n = i.data,
            n === "/$") {
                if (r === 0) {
                    e.removeChild(i),
                    Kn(t);
                    return
                }
                r--
            } else
                n !== "$" && n !== "$?" && n !== "$!" || r++;
        n = i
    } while (n);
    Kn(t)
}
function ct(e) {
    for (; e != null; e = e.nextSibling) {
        var t = e.nodeType;
        if (t === 1 || t === 3)
            break;
        if (t === 8) {
            if (t = e.data,
            t === "$" || t === "$!" || t === "$?")
                break;
            if (t === "/$")
                return null
        }
    }
    return e
}
function Wo(e) {
    e = e.previousSibling;
    for (var t = 0; e; ) {
        if (e.nodeType === 8) {
            var n = e.data;
            if (n === "$" || n === "$!" || n === "$?") {
                if (t === 0)
                    return e;
                t--
            } else
                n === "/$" && t++
        }
        e = e.previousSibling
    }
    return null
}
var yn = Math.random().toString(36).slice(2)
  , Oe = "__reactFiber$" + yn
  , Xn = "__reactProps$" + yn
  , Ge = "__reactContainer$" + yn
  , Fs = "__reactEvents$" + yn
  , qf = "__reactListeners$" + yn
  , Yf = "__reactHandles$" + yn;
function Et(e) {
    var t = e[Oe];
    if (t)
        return t;
    for (var n = e.parentNode; n; ) {
        if (t = n[Ge] || n[Oe]) {
            if (n = t.alternate,
            t.child !== null || n !== null && n.child !== null)
                for (e = Wo(e); e !== null; ) {
                    if (n = e[Oe])
                        return n;
                    e = Wo(e)
                }
            return t
        }
        e = n,
        n = e.parentNode
    }
    return null
}
function cr(e) {
    return e = e[Oe] || e[Ge],
    !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e
}
function Kt(e) {
    if (e.tag === 5 || e.tag === 6)
        return e.stateNode;
    throw Error(w(33))
}
function ji(e) {
    return e[Xn] || null
}
var Os = []
  , Gt = -1;
function xt(e) {
    return {
        current: e
    }
}
function O(e) {
    0 > Gt || (e.current = Os[Gt],
    Os[Gt] = null,
    Gt--)
}
function R(e, t) {
    Gt++,
    Os[Gt] = e.current,
    e.current = t
}
var gt = {}
  , le = xt(gt)
  , pe = xt(!1)
  , Dt = gt;
function an(e, t) {
    var n = e.type.contextTypes;
    if (!n)
        return gt;
    var r = e.stateNode;
    if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
        return r.__reactInternalMemoizedMaskedChildContext;
    var i = {}, s;
    for (s in n)
        i[s] = t[s];
    return r && (e = e.stateNode,
    e.__reactInternalMemoizedUnmaskedChildContext = t,
    e.__reactInternalMemoizedMaskedChildContext = i),
    i
}
function me(e) {
    return e = e.childContextTypes,
    e != null
}
function ni() {
    O(pe),
    O(le)
}
function Vo(e, t, n) {
    if (le.current !== gt)
        throw Error(w(168));
    R(le, t),
    R(pe, n)
}
function Ru(e, t, n) {
    var r = e.stateNode;
    if (t = t.childContextTypes,
    typeof r.getChildContext != "function")
        return n;
    r = r.getChildContext();
    for (var i in r)
        if (!(i in t))
            throw Error(w(108, Ad(e) || "Unknown", i));
    return U({}, n, r)
}
function ri(e) {
    return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || gt,
    Dt = le.current,
    R(le, e),
    R(pe, pe.current),
    !0
}
function Qo(e, t, n) {
    var r = e.stateNode;
    if (!r)
        throw Error(w(169));
    n ? (e = Ru(e, t, Dt),
    r.__reactInternalMemoizedMergedChildContext = e,
    O(pe),
    O(le),
    R(le, e)) : O(pe),
    R(pe, n)
}
var Ue = null
  , Ni = !1
  , ns = !1;
function Fu(e) {
    Ue === null ? Ue = [e] : Ue.push(e)
}
function Zf(e) {
    Ni = !0,
    Fu(e)
}
function wt() {
    if (!ns && Ue !== null) {
        ns = !0;
        var e = 0
          , t = L;
        try {
            var n = Ue;
            for (L = 1; e < n.length; e++) {
                var r = n[e];
                do
                    r = r(!0);
                while (r !== null)
            }
            Ue = null,
            Ni = !1
        } catch (i) {
            throw Ue !== null && (Ue = Ue.slice(e + 1)),
            uu(wl, wt),
            i
        } finally {
            L = t,
            ns = !1
        }
    }
    return null
}
var qt = []
  , Yt = 0
  , ii = null
  , si = 0
  , je = []
  , Ne = 0
  , At = null
  , We = 1
  , Ve = "";
function Nt(e, t) {
    qt[Yt++] = si,
    qt[Yt++] = ii,
    ii = e,
    si = t
}
function Ou(e, t, n) {
    je[Ne++] = We,
    je[Ne++] = Ve,
    je[Ne++] = At,
    At = e;
    var r = We;
    e = Ve;
    var i = 32 - Ie(r) - 1;
    r &= ~(1 << i),
    n += 1;
    var s = 32 - Ie(t) + i;
    if (30 < s) {
        var o = i - i % 5;
        s = (r & (1 << o) - 1).toString(32),
        r >>= o,
        i -= o,
        We = 1 << 32 - Ie(t) + i | n << i | r,
        Ve = s + e
    } else
        We = 1 << s | n << i | r,
        Ve = e
}
function Ml(e) {
    e.return !== null && (Nt(e, 1),
    Ou(e, 1, 0))
}
function Pl(e) {
    for (; e === ii; )
        ii = qt[--Yt],
        qt[Yt] = null,
        si = qt[--Yt],
        qt[Yt] = null;
    for (; e === At; )
        At = je[--Ne],
        je[Ne] = null,
        Ve = je[--Ne],
        je[Ne] = null,
        We = je[--Ne],
        je[Ne] = null
}
var xe = null
  , ve = null
  , B = !1
  , Ae = null;
function Bu(e, t) {
    var n = Ce(5, null, null, 0);
    n.elementType = "DELETED",
    n.stateNode = t,
    n.return = e,
    t = e.deletions,
    t === null ? (e.deletions = [n],
    e.flags |= 16) : t.push(n)
}
function Ko(e, t) {
    switch (e.tag) {
    case 5:
        var n = e.type;
        return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t,
        t !== null ? (e.stateNode = t,
        xe = e,
        ve = ct(t.firstChild),
        !0) : !1;
    case 6:
        return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t,
        t !== null ? (e.stateNode = t,
        xe = e,
        ve = null,
        !0) : !1;
    case 13:
        return t = t.nodeType !== 8 ? null : t,
        t !== null ? (n = At !== null ? {
            id: We,
            overflow: Ve
        } : null,
        e.memoizedState = {
            dehydrated: t,
            treeContext: n,
            retryLane: 1073741824
        },
        n = Ce(18, null, null, 0),
        n.stateNode = t,
        n.return = e,
        e.child = n,
        xe = e,
        ve = null,
        !0) : !1;
    default:
        return !1
    }
}
function Bs(e) {
    return (e.mode & 1) !== 0 && (e.flags & 128) === 0
}
function Hs(e) {
    if (B) {
        var t = ve;
        if (t) {
            var n = t;
            if (!Ko(e, t)) {
                if (Bs(e))
                    throw Error(w(418));
                t = ct(n.nextSibling);
                var r = xe;
                t && Ko(e, t) ? Bu(r, n) : (e.flags = e.flags & -4097 | 2,
                B = !1,
                xe = e)
            }
        } else {
            if (Bs(e))
                throw Error(w(418));
            e.flags = e.flags & -4097 | 2,
            B = !1,
            xe = e
        }
    }
}
function Go(e) {
    for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; )
        e = e.return;
    xe = e
}
function Tr(e) {
    if (e !== xe)
        return !1;
    if (!B)
        return Go(e),
        B = !0,
        !1;
    var t;
    if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type,
    t = t !== "head" && t !== "body" && !Ls(e.type, e.memoizedProps)),
    t && (t = ve)) {
        if (Bs(e))
            throw Hu(),
            Error(w(418));
        for (; t; )
            Bu(e, t),
            t = ct(t.nextSibling)
    }
    if (Go(e),
    e.tag === 13) {
        if (e = e.memoizedState,
        e = e !== null ? e.dehydrated : null,
        !e)
            throw Error(w(317));
        e: {
            for (e = e.nextSibling,
            t = 0; e; ) {
                if (e.nodeType === 8) {
                    var n = e.data;
                    if (n === "/$") {
                        if (t === 0) {
                            ve = ct(e.nextSibling);
                            break e
                        }
                        t--
                    } else
                        n !== "$" && n !== "$!" && n !== "$?" || t++
                }
                e = e.nextSibling
            }
            ve = null
        }
    } else
        ve = xe ? ct(e.stateNode.nextSibling) : null;
    return !0
}
function Hu() {
    for (var e = ve; e; )
        e = ct(e.nextSibling)
}
function un() {
    ve = xe = null,
    B = !1
}
function zl(e) {
    Ae === null ? Ae = [e] : Ae.push(e)
}
var Xf = Ze.ReactCurrentBatchConfig;
function Cn(e, t, n) {
    if (e = n.ref,
    e !== null && typeof e != "function" && typeof e != "object") {
        if (n._owner) {
            if (n = n._owner,
            n) {
                if (n.tag !== 1)
                    throw Error(w(309));
                var r = n.stateNode
            }
            if (!r)
                throw Error(w(147, e));
            var i = r
              , s = "" + e;
            return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === s ? t.ref : (t = function(o) {
                var a = i.refs;
                o === null ? delete a[s] : a[s] = o
            }
            ,
            t._stringRef = s,
            t)
        }
        if (typeof e != "string")
            throw Error(w(284));
        if (!n._owner)
            throw Error(w(290, e))
    }
    return e
}
function br(e, t) {
    throw e = Object.prototype.toString.call(t),
    Error(w(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e))
}
function qo(e) {
    var t = e._init;
    return t(e._payload)
}
function $u(e) {
    function t(f, d) {
        if (e) {
            var p = f.deletions;
            p === null ? (f.deletions = [d],
            f.flags |= 16) : p.push(d)
        }
    }
    function n(f, d) {
        if (!e)
            return null;
        for (; d !== null; )
            t(f, d),
            d = d.sibling;
        return null
    }
    function r(f, d) {
        for (f = new Map; d !== null; )
            d.key !== null ? f.set(d.key, d) : f.set(d.index, d),
            d = d.sibling;
        return f
    }
    function i(f, d) {
        return f = mt(f, d),
        f.index = 0,
        f.sibling = null,
        f
    }
    function s(f, d, p) {
        return f.index = p,
        e ? (p = f.alternate,
        p !== null ? (p = p.index,
        p < d ? (f.flags |= 2,
        d) : p) : (f.flags |= 2,
        d)) : (f.flags |= 1048576,
        d)
    }
    function o(f) {
        return e && f.alternate === null && (f.flags |= 2),
        f
    }
    function a(f, d, p, x) {
        return d === null || d.tag !== 6 ? (d = us(p, f.mode, x),
        d.return = f,
        d) : (d = i(d, p),
        d.return = f,
        d)
    }
    function u(f, d, p, x) {
        var j = p.type;
        return j === Ut ? g(f, d, p.props.children, x, p.key) : d !== null && (d.elementType === j || typeof j == "object" && j !== null && j.$$typeof === tt && qo(j) === d.type) ? (x = i(d, p.props),
        x.ref = Cn(f, d, p),
        x.return = f,
        x) : (x = Vr(p.type, p.key, p.props, null, f.mode, x),
        x.ref = Cn(f, d, p),
        x.return = f,
        x)
    }
    function c(f, d, p, x) {
        return d === null || d.tag !== 4 || d.stateNode.containerInfo !== p.containerInfo || d.stateNode.implementation !== p.implementation ? (d = cs(p, f.mode, x),
        d.return = f,
        d) : (d = i(d, p.children || []),
        d.return = f,
        d)
    }
    function g(f, d, p, x, j) {
        return d === null || d.tag !== 7 ? (d = Pt(p, f.mode, x, j),
        d.return = f,
        d) : (d = i(d, p),
        d.return = f,
        d)
    }
    function m(f, d, p) {
        if (typeof d == "string" && d !== "" || typeof d == "number")
            return d = us("" + d, f.mode, p),
            d.return = f,
            d;
        if (typeof d == "object" && d !== null) {
            switch (d.$$typeof) {
            case yr:
                return p = Vr(d.type, d.key, d.props, null, f.mode, p),
                p.ref = Cn(f, null, d),
                p.return = f,
                p;
            case $t:
                return d = cs(d, f.mode, p),
                d.return = f,
                d;
            case tt:
                var x = d._init;
                return m(f, x(d._payload), p)
            }
            if (Mn(d) || wn(d))
                return d = Pt(d, f.mode, p, null),
                d.return = f,
                d;
            br(f, d)
        }
        return null
    }
    function h(f, d, p, x) {
        var j = d !== null ? d.key : null;
        if (typeof p == "string" && p !== "" || typeof p == "number")
            return j !== null ? null : a(f, d, "" + p, x);
        if (typeof p == "object" && p !== null) {
            switch (p.$$typeof) {
            case yr:
                return p.key === j ? u(f, d, p, x) : null;
            case $t:
                return p.key === j ? c(f, d, p, x) : null;
            case tt:
                return j = p._init,
                h(f, d, j(p._payload), x)
            }
            if (Mn(p) || wn(p))
                return j !== null ? null : g(f, d, p, x, null);
            br(f, p)
        }
        return null
    }
    function v(f, d, p, x, j) {
        if (typeof x == "string" && x !== "" || typeof x == "number")
            return f = f.get(p) || null,
            a(d, f, "" + x, j);
        if (typeof x == "object" && x !== null) {
            switch (x.$$typeof) {
            case yr:
                return f = f.get(x.key === null ? p : x.key) || null,
                u(d, f, x, j);
            case $t:
                return f = f.get(x.key === null ? p : x.key) || null,
                c(d, f, x, j);
            case tt:
                var T = x._init;
                return v(f, d, p, T(x._payload), j)
            }
            if (Mn(x) || wn(x))
                return f = f.get(p) || null,
                g(d, f, x, j, null);
            br(d, x)
        }
        return null
    }
    function y(f, d, p, x) {
        for (var j = null, T = null, b = d, M = d = 0, V = null; b !== null && M < p.length; M++) {
            b.index > M ? (V = b,
            b = null) : V = b.sibling;
            var I = h(f, b, p[M], x);
            if (I === null) {
                b === null && (b = V);
                break
            }
            e && b && I.alternate === null && t(f, b),
            d = s(I, d, M),
            T === null ? j = I : T.sibling = I,
            T = I,
            b = V
        }
        if (M === p.length)
            return n(f, b),
            B && Nt(f, M),
            j;
        if (b === null) {
            for (; M < p.length; M++)
                b = m(f, p[M], x),
                b !== null && (d = s(b, d, M),
                T === null ? j = b : T.sibling = b,
                T = b);
            return B && Nt(f, M),
            j
        }
        for (b = r(f, b); M < p.length; M++)
            V = v(b, f, M, p[M], x),
            V !== null && (e && V.alternate !== null && b.delete(V.key === null ? M : V.key),
            d = s(V, d, M),
            T === null ? j = V : T.sibling = V,
            T = V);
        return e && b.forEach(function(Me) {
            return t(f, Me)
        }),
        B && Nt(f, M),
        j
    }
    function k(f, d, p, x) {
        var j = wn(p);
        if (typeof j != "function")
            throw Error(w(150));
        if (p = j.call(p),
        p == null)
            throw Error(w(151));
        for (var T = j = null, b = d, M = d = 0, V = null, I = p.next(); b !== null && !I.done; M++,
        I = p.next()) {
            b.index > M ? (V = b,
            b = null) : V = b.sibling;
            var Me = h(f, b, I.value, x);
            if (Me === null) {
                b === null && (b = V);
                break
            }
            e && b && Me.alternate === null && t(f, b),
            d = s(Me, d, M),
            T === null ? j = Me : T.sibling = Me,
            T = Me,
            b = V
        }
        if (I.done)
            return n(f, b),
            B && Nt(f, M),
            j;
        if (b === null) {
            for (; !I.done; M++,
            I = p.next())
                I = m(f, I.value, x),
                I !== null && (d = s(I, d, M),
                T === null ? j = I : T.sibling = I,
                T = I);
            return B && Nt(f, M),
            j
        }
        for (b = r(f, b); !I.done; M++,
        I = p.next())
            I = v(b, f, M, I.value, x),
            I !== null && (e && I.alternate !== null && b.delete(I.key === null ? M : I.key),
            d = s(I, d, M),
            T === null ? j = I : T.sibling = I,
            T = I);
        return e && b.forEach(function(vn) {
            return t(f, vn)
        }),
        B && Nt(f, M),
        j
    }
    function z(f, d, p, x) {
        if (typeof p == "object" && p !== null && p.type === Ut && p.key === null && (p = p.props.children),
        typeof p == "object" && p !== null) {
            switch (p.$$typeof) {
            case yr:
                e: {
                    for (var j = p.key, T = d; T !== null; ) {
                        if (T.key === j) {
                            if (j = p.type,
                            j === Ut) {
                                if (T.tag === 7) {
                                    n(f, T.sibling),
                                    d = i(T, p.props.children),
                                    d.return = f,
                                    f = d;
                                    break e
                                }
                            } else if (T.elementType === j || typeof j == "object" && j !== null && j.$$typeof === tt && qo(j) === T.type) {
                                n(f, T.sibling),
                                d = i(T, p.props),
                                d.ref = Cn(f, T, p),
                                d.return = f,
                                f = d;
                                break e
                            }
                            n(f, T);
                            break
                        } else
                            t(f, T);
                        T = T.sibling
                    }
                    p.type === Ut ? (d = Pt(p.props.children, f.mode, x, p.key),
                    d.return = f,
                    f = d) : (x = Vr(p.type, p.key, p.props, null, f.mode, x),
                    x.ref = Cn(f, d, p),
                    x.return = f,
                    f = x)
                }
                return o(f);
            case $t:
                e: {
                    for (T = p.key; d !== null; ) {
                        if (d.key === T)
                            if (d.tag === 4 && d.stateNode.containerInfo === p.containerInfo && d.stateNode.implementation === p.implementation) {
                                n(f, d.sibling),
                                d = i(d, p.children || []),
                                d.return = f,
                                f = d;
                                break e
                            } else {
                                n(f, d);
                                break
                            }
                        else
                            t(f, d);
                        d = d.sibling
                    }
                    d = cs(p, f.mode, x),
                    d.return = f,
                    f = d
                }
                return o(f);
            case tt:
                return T = p._init,
                z(f, d, T(p._payload), x)
            }
            if (Mn(p))
                return y(f, d, p, x);
            if (wn(p))
                return k(f, d, p, x);
            br(f, p)
        }
        return typeof p == "string" && p !== "" || typeof p == "number" ? (p = "" + p,
        d !== null && d.tag === 6 ? (n(f, d.sibling),
        d = i(d, p),
        d.return = f,
        f = d) : (n(f, d),
        d = us(p, f.mode, x),
        d.return = f,
        f = d),
        o(f)) : n(f, d)
    }
    return z
}
var cn = $u(!0)
  , Uu = $u(!1)
  , li = xt(null)
  , oi = null
  , Zt = null
  , Dl = null;
function Al() {
    Dl = Zt = oi = null
}
function Il(e) {
    var t = li.current;
    O(li),
    e._currentValue = t
}
function $s(e, t, n) {
    for (; e !== null; ) {
        var r = e.alternate;
        if ((e.childLanes & t) !== t ? (e.childLanes |= t,
        r !== null && (r.childLanes |= t)) : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t),
        e === n)
            break;
        e = e.return
    }
}
function sn(e, t) {
    oi = e,
    Dl = Zt = null,
    e = e.dependencies,
    e !== null && e.firstContext !== null && (e.lanes & t && (fe = !0),
    e.firstContext = null)
}
function Te(e) {
    var t = e._currentValue;
    if (Dl !== e)
        if (e = {
            context: e,
            memoizedValue: t,
            next: null
        },
        Zt === null) {
            if (oi === null)
                throw Error(w(308));
            Zt = e,
            oi.dependencies = {
                lanes: 0,
                firstContext: e
            }
        } else
            Zt = Zt.next = e;
    return t
}
var Tt = null;
function _l(e) {
    Tt === null ? Tt = [e] : Tt.push(e)
}
function Wu(e, t, n, r) {
    var i = t.interleaved;
    return i === null ? (n.next = n,
    _l(t)) : (n.next = i.next,
    i.next = n),
    t.interleaved = n,
    qe(e, r)
}
function qe(e, t) {
    e.lanes |= t;
    var n = e.alternate;
    for (n !== null && (n.lanes |= t),
    n = e,
    e = e.return; e !== null; )
        e.childLanes |= t,
        n = e.alternate,
        n !== null && (n.childLanes |= t),
        n = e,
        e = e.return;
    return n.tag === 3 ? n.stateNode : null
}
var nt = !1;
function Ll(e) {
    e.updateQueue = {
        baseState: e.memoizedState,
        firstBaseUpdate: null,
        lastBaseUpdate: null,
        shared: {
            pending: null,
            interleaved: null,
            lanes: 0
        },
        effects: null
    }
}
function Vu(e, t) {
    e = e.updateQueue,
    t.updateQueue === e && (t.updateQueue = {
        baseState: e.baseState,
        firstBaseUpdate: e.firstBaseUpdate,
        lastBaseUpdate: e.lastBaseUpdate,
        shared: e.shared,
        effects: e.effects
    })
}
function Qe(e, t) {
    return {
        eventTime: e,
        lane: t,
        tag: 0,
        payload: null,
        callback: null,
        next: null
    }
}
function dt(e, t, n) {
    var r = e.updateQueue;
    if (r === null)
        return null;
    if (r = r.shared,
    _ & 2) {
        var i = r.pending;
        return i === null ? t.next = t : (t.next = i.next,
        i.next = t),
        r.pending = t,
        qe(e, n)
    }
    return i = r.interleaved,
    i === null ? (t.next = t,
    _l(r)) : (t.next = i.next,
    i.next = t),
    r.interleaved = t,
    qe(e, n)
}
function Or(e, t, n) {
    if (t = t.updateQueue,
    t !== null && (t = t.shared,
    (n & 4194240) !== 0)) {
        var r = t.lanes;
        r &= e.pendingLanes,
        n |= r,
        t.lanes = n,
        kl(e, n)
    }
}
function Yo(e, t) {
    var n = e.updateQueue
      , r = e.alternate;
    if (r !== null && (r = r.updateQueue,
    n === r)) {
        var i = null
          , s = null;
        if (n = n.firstBaseUpdate,
        n !== null) {
            do {
                var o = {
                    eventTime: n.eventTime,
                    lane: n.lane,
                    tag: n.tag,
                    payload: n.payload,
                    callback: n.callback,
                    next: null
                };
                s === null ? i = s = o : s = s.next = o,
                n = n.next
            } while (n !== null);
            s === null ? i = s = t : s = s.next = t
        } else
            i = s = t;
        n = {
            baseState: r.baseState,
            firstBaseUpdate: i,
            lastBaseUpdate: s,
            shared: r.shared,
            effects: r.effects
        },
        e.updateQueue = n;
        return
    }
    e = n.lastBaseUpdate,
    e === null ? n.firstBaseUpdate = t : e.next = t,
    n.lastBaseUpdate = t
}
function ai(e, t, n, r) {
    var i = e.updateQueue;
    nt = !1;
    var s = i.firstBaseUpdate
      , o = i.lastBaseUpdate
      , a = i.shared.pending;
    if (a !== null) {
        i.shared.pending = null;
        var u = a
          , c = u.next;
        u.next = null,
        o === null ? s = c : o.next = c,
        o = u;
        var g = e.alternate;
        g !== null && (g = g.updateQueue,
        a = g.lastBaseUpdate,
        a !== o && (a === null ? g.firstBaseUpdate = c : a.next = c,
        g.lastBaseUpdate = u))
    }
    if (s !== null) {
        var m = i.baseState;
        o = 0,
        g = c = u = null,
        a = s;
        do {
            var h = a.lane
              , v = a.eventTime;
            if ((r & h) === h) {
                g !== null && (g = g.next = {
                    eventTime: v,
                    lane: 0,
                    tag: a.tag,
                    payload: a.payload,
                    callback: a.callback,
                    next: null
                });
                e: {
                    var y = e
                      , k = a;
                    switch (h = t,
                    v = n,
                    k.tag) {
                    case 1:
                        if (y = k.payload,
                        typeof y == "function") {
                            m = y.call(v, m, h);
                            break e
                        }
                        m = y;
                        break e;
                    case 3:
                        y.flags = y.flags & -65537 | 128;
                    case 0:
                        if (y = k.payload,
                        h = typeof y == "function" ? y.call(v, m, h) : y,
                        h == null)
                            break e;
                        m = U({}, m, h);
                        break e;
                    case 2:
                        nt = !0
                    }
                }
                a.callback !== null && a.lane !== 0 && (e.flags |= 64,
                h = i.effects,
                h === null ? i.effects = [a] : h.push(a))
            } else
                v = {
                    eventTime: v,
                    lane: h,
                    tag: a.tag,
                    payload: a.payload,
                    callback: a.callback,
                    next: null
                },
                g === null ? (c = g = v,
                u = m) : g = g.next = v,
                o |= h;
            if (a = a.next,
            a === null) {
                if (a = i.shared.pending,
                a === null)
                    break;
                h = a,
                a = h.next,
                h.next = null,
                i.lastBaseUpdate = h,
                i.shared.pending = null
            }
        } while (!0);
        if (g === null && (u = m),
        i.baseState = u,
        i.firstBaseUpdate = c,
        i.lastBaseUpdate = g,
        t = i.shared.interleaved,
        t !== null) {
            i = t;
            do
                o |= i.lane,
                i = i.next;
            while (i !== t)
        } else
            s === null && (i.shared.lanes = 0);
        _t |= o,
        e.lanes = o,
        e.memoizedState = m
    }
}
function Zo(e, t, n) {
    if (e = t.effects,
    t.effects = null,
    e !== null)
        for (t = 0; t < e.length; t++) {
            var r = e[t]
              , i = r.callback;
            if (i !== null) {
                if (r.callback = null,
                r = n,
                typeof i != "function")
                    throw Error(w(191, i));
                i.call(r)
            }
        }
}
var dr = {}
  , He = xt(dr)
  , Jn = xt(dr)
  , er = xt(dr);
function bt(e) {
    if (e === dr)
        throw Error(w(174));
    return e
}
function Rl(e, t) {
    switch (R(er, t),
    R(Jn, e),
    R(He, dr),
    e = t.nodeType,
    e) {
    case 9:
    case 11:
        t = (t = t.documentElement) ? t.namespaceURI : Ss(null, "");
        break;
    default:
        e = e === 8 ? t.parentNode : t,
        t = e.namespaceURI || null,
        e = e.tagName,
        t = Ss(t, e)
    }
    O(He),
    R(He, t)
}
function dn() {
    O(He),
    O(Jn),
    O(er)
}
function Qu(e) {
    bt(er.current);
    var t = bt(He.current)
      , n = Ss(t, e.type);
    t !== n && (R(Jn, e),
    R(He, n))
}
function Fl(e) {
    Jn.current === e && (O(He),
    O(Jn))
}
var H = xt(0);
function ui(e) {
    for (var t = e; t !== null; ) {
        if (t.tag === 13) {
            var n = t.memoizedState;
            if (n !== null && (n = n.dehydrated,
            n === null || n.data === "$?" || n.data === "$!"))
                return t
        } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
            if (t.flags & 128)
                return t
        } else if (t.child !== null) {
            t.child.return = t,
            t = t.child;
            continue
        }
        if (t === e)
            break;
        for (; t.sibling === null; ) {
            if (t.return === null || t.return === e)
                return null;
            t = t.return
        }
        t.sibling.return = t.return,
        t = t.sibling
    }
    return null
}
var rs = [];
function Ol() {
    for (var e = 0; e < rs.length; e++)
        rs[e]._workInProgressVersionPrimary = null;
    rs.length = 0
}
var Br = Ze.ReactCurrentDispatcher
  , is = Ze.ReactCurrentBatchConfig
  , It = 0
  , $ = null
  , q = null
  , X = null
  , ci = !1
  , Rn = !1
  , tr = 0
  , Jf = 0;
function re() {
    throw Error(w(321))
}
function Bl(e, t) {
    if (t === null)
        return !1;
    for (var n = 0; n < t.length && n < e.length; n++)
        if (!Le(e[n], t[n]))
            return !1;
    return !0
}
function Hl(e, t, n, r, i, s) {
    if (It = s,
    $ = t,
    t.memoizedState = null,
    t.updateQueue = null,
    t.lanes = 0,
    Br.current = e === null || e.memoizedState === null ? rp : ip,
    e = n(r, i),
    Rn) {
        s = 0;
        do {
            if (Rn = !1,
            tr = 0,
            25 <= s)
                throw Error(w(301));
            s += 1,
            X = q = null,
            t.updateQueue = null,
            Br.current = sp,
            e = n(r, i)
        } while (Rn)
    }
    if (Br.current = di,
    t = q !== null && q.next !== null,
    It = 0,
    X = q = $ = null,
    ci = !1,
    t)
        throw Error(w(300));
    return e
}
function $l() {
    var e = tr !== 0;
    return tr = 0,
    e
}
function Fe() {
    var e = {
        memoizedState: null,
        baseState: null,
        baseQueue: null,
        queue: null,
        next: null
    };
    return X === null ? $.memoizedState = X = e : X = X.next = e,
    X
}
function be() {
    if (q === null) {
        var e = $.alternate;
        e = e !== null ? e.memoizedState : null
    } else
        e = q.next;
    var t = X === null ? $.memoizedState : X.next;
    if (t !== null)
        X = t,
        q = e;
    else {
        if (e === null)
            throw Error(w(310));
        q = e,
        e = {
            memoizedState: q.memoizedState,
            baseState: q.baseState,
            baseQueue: q.baseQueue,
            queue: q.queue,
            next: null
        },
        X === null ? $.memoizedState = X = e : X = X.next = e
    }
    return X
}
function nr(e, t) {
    return typeof t == "function" ? t(e) : t
}
function ss(e) {
    var t = be()
      , n = t.queue;
    if (n === null)
        throw Error(w(311));
    n.lastRenderedReducer = e;
    var r = q
      , i = r.baseQueue
      , s = n.pending;
    if (s !== null) {
        if (i !== null) {
            var o = i.next;
            i.next = s.next,
            s.next = o
        }
        r.baseQueue = i = s,
        n.pending = null
    }
    if (i !== null) {
        s = i.next,
        r = r.baseState;
        var a = o = null
          , u = null
          , c = s;
        do {
            var g = c.lane;
            if ((It & g) === g)
                u !== null && (u = u.next = {
                    lane: 0,
                    action: c.action,
                    hasEagerState: c.hasEagerState,
                    eagerState: c.eagerState,
                    next: null
                }),
                r = c.hasEagerState ? c.eagerState : e(r, c.action);
            else {
                var m = {
                    lane: g,
                    action: c.action,
                    hasEagerState: c.hasEagerState,
                    eagerState: c.eagerState,
                    next: null
                };
                u === null ? (a = u = m,
                o = r) : u = u.next = m,
                $.lanes |= g,
                _t |= g
            }
            c = c.next
        } while (c !== null && c !== s);
        u === null ? o = r : u.next = a,
        Le(r, t.memoizedState) || (fe = !0),
        t.memoizedState = r,
        t.baseState = o,
        t.baseQueue = u,
        n.lastRenderedState = r
    }
    if (e = n.interleaved,
    e !== null) {
        i = e;
        do
            s = i.lane,
            $.lanes |= s,
            _t |= s,
            i = i.next;
        while (i !== e)
    } else
        i === null && (n.lanes = 0);
    return [t.memoizedState, n.dispatch]
}
function ls(e) {
    var t = be()
      , n = t.queue;
    if (n === null)
        throw Error(w(311));
    n.lastRenderedReducer = e;
    var r = n.dispatch
      , i = n.pending
      , s = t.memoizedState;
    if (i !== null) {
        n.pending = null;
        var o = i = i.next;
        do
            s = e(s, o.action),
            o = o.next;
        while (o !== i);
        Le(s, t.memoizedState) || (fe = !0),
        t.memoizedState = s,
        t.baseQueue === null && (t.baseState = s),
        n.lastRenderedState = s
    }
    return [s, r]
}
function Ku() {}
function Gu(e, t) {
    var n = $
      , r = be()
      , i = t()
      , s = !Le(r.memoizedState, i);
    if (s && (r.memoizedState = i,
    fe = !0),
    r = r.queue,
    Ul(Zu.bind(null, n, r, e), [e]),
    r.getSnapshot !== t || s || X !== null && X.memoizedState.tag & 1) {
        if (n.flags |= 2048,
        rr(9, Yu.bind(null, n, r, i, t), void 0, null),
        J === null)
            throw Error(w(349));
        It & 30 || qu(n, t, i)
    }
    return i
}
function qu(e, t, n) {
    e.flags |= 16384,
    e = {
        getSnapshot: t,
        value: n
    },
    t = $.updateQueue,
    t === null ? (t = {
        lastEffect: null,
        stores: null
    },
    $.updateQueue = t,
    t.stores = [e]) : (n = t.stores,
    n === null ? t.stores = [e] : n.push(e))
}
function Yu(e, t, n, r) {
    t.value = n,
    t.getSnapshot = r,
    Xu(t) && Ju(e)
}
function Zu(e, t, n) {
    return n(function() {
        Xu(t) && Ju(e)
    })
}
function Xu(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
        var n = t();
        return !Le(e, n)
    } catch {
        return !0
    }
}
function Ju(e) {
    var t = qe(e, 1);
    t !== null && _e(t, e, 1, -1)
}
function Xo(e) {
    var t = Fe();
    return typeof e == "function" && (e = e()),
    t.memoizedState = t.baseState = e,
    e = {
        pending: null,
        interleaved: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: nr,
        lastRenderedState: e
    },
    t.queue = e,
    e = e.dispatch = np.bind(null, $, e),
    [t.memoizedState, e]
}
function rr(e, t, n, r) {
    return e = {
        tag: e,
        create: t,
        destroy: n,
        deps: r,
        next: null
    },
    t = $.updateQueue,
    t === null ? (t = {
        lastEffect: null,
        stores: null
    },
    $.updateQueue = t,
    t.lastEffect = e.next = e) : (n = t.lastEffect,
    n === null ? t.lastEffect = e.next = e : (r = n.next,
    n.next = e,
    e.next = r,
    t.lastEffect = e)),
    e
}
function ec() {
    return be().memoizedState
}
function Hr(e, t, n, r) {
    var i = Fe();
    $.flags |= e,
    i.memoizedState = rr(1 | t, n, void 0, r === void 0 ? null : r)
}
function Ci(e, t, n, r) {
    var i = be();
    r = r === void 0 ? null : r;
    var s = void 0;
    if (q !== null) {
        var o = q.memoizedState;
        if (s = o.destroy,
        r !== null && Bl(r, o.deps)) {
            i.memoizedState = rr(t, n, s, r);
            return
        }
    }
    $.flags |= e,
    i.memoizedState = rr(1 | t, n, s, r)
}
function Jo(e, t) {
    return Hr(8390656, 8, e, t)
}
function Ul(e, t) {
    return Ci(2048, 8, e, t)
}
function tc(e, t) {
    return Ci(4, 2, e, t)
}
function nc(e, t) {
    return Ci(4, 4, e, t)
}
function rc(e, t) {
    if (typeof t == "function")
        return e = e(),
        t(e),
        function() {
            t(null)
        }
        ;
    if (t != null)
        return e = e(),
        t.current = e,
        function() {
            t.current = null
        }
}
function ic(e, t, n) {
    return n = n != null ? n.concat([e]) : null,
    Ci(4, 4, rc.bind(null, t, e), n)
}
function Wl() {}
function sc(e, t) {
    var n = be();
    t = t === void 0 ? null : t;
    var r = n.memoizedState;
    return r !== null && t !== null && Bl(t, r[1]) ? r[0] : (n.memoizedState = [e, t],
    e)
}
function lc(e, t) {
    var n = be();
    t = t === void 0 ? null : t;
    var r = n.memoizedState;
    return r !== null && t !== null && Bl(t, r[1]) ? r[0] : (e = e(),
    n.memoizedState = [e, t],
    e)
}
function oc(e, t, n) {
    return It & 21 ? (Le(n, t) || (n = fu(),
    $.lanes |= n,
    _t |= n,
    e.baseState = !0),
    t) : (e.baseState && (e.baseState = !1,
    fe = !0),
    e.memoizedState = n)
}
function ep(e, t) {
    var n = L;
    L = n !== 0 && 4 > n ? n : 4,
    e(!0);
    var r = is.transition;
    is.transition = {};
    try {
        e(!1),
        t()
    } finally {
        L = n,
        is.transition = r
    }
}
function ac() {
    return be().memoizedState
}
function tp(e, t, n) {
    var r = pt(e);
    if (n = {
        lane: r,
        action: n,
        hasEagerState: !1,
        eagerState: null,
        next: null
    },
    uc(e))
        cc(t, n);
    else if (n = Wu(e, t, n, r),
    n !== null) {
        var i = ae();
        _e(n, e, r, i),
        dc(n, t, r)
    }
}
function np(e, t, n) {
    var r = pt(e)
      , i = {
        lane: r,
        action: n,
        hasEagerState: !1,
        eagerState: null,
        next: null
    };
    if (uc(e))
        cc(t, i);
    else {
        var s = e.alternate;
        if (e.lanes === 0 && (s === null || s.lanes === 0) && (s = t.lastRenderedReducer,
        s !== null))
            try {
                var o = t.lastRenderedState
                  , a = s(o, n);
                if (i.hasEagerState = !0,
                i.eagerState = a,
                Le(a, o)) {
                    var u = t.interleaved;
                    u === null ? (i.next = i,
                    _l(t)) : (i.next = u.next,
                    u.next = i),
                    t.interleaved = i;
                    return
                }
            } catch {} finally {}
        n = Wu(e, t, i, r),
        n !== null && (i = ae(),
        _e(n, e, r, i),
        dc(n, t, r))
    }
}
function uc(e) {
    var t = e.alternate;
    return e === $ || t !== null && t === $
}
function cc(e, t) {
    Rn = ci = !0;
    var n = e.pending;
    n === null ? t.next = t : (t.next = n.next,
    n.next = t),
    e.pending = t
}
function dc(e, t, n) {
    if (n & 4194240) {
        var r = t.lanes;
        r &= e.pendingLanes,
        n |= r,
        t.lanes = n,
        kl(e, n)
    }
}
var di = {
    readContext: Te,
    useCallback: re,
    useContext: re,
    useEffect: re,
    useImperativeHandle: re,
    useInsertionEffect: re,
    useLayoutEffect: re,
    useMemo: re,
    useReducer: re,
    useRef: re,
    useState: re,
    useDebugValue: re,
    useDeferredValue: re,
    useTransition: re,
    useMutableSource: re,
    useSyncExternalStore: re,
    useId: re,
    unstable_isNewReconciler: !1
}
  , rp = {
    readContext: Te,
    useCallback: function(e, t) {
        return Fe().memoizedState = [e, t === void 0 ? null : t],
        e
    },
    useContext: Te,
    useEffect: Jo,
    useImperativeHandle: function(e, t, n) {
        return n = n != null ? n.concat([e]) : null,
        Hr(4194308, 4, rc.bind(null, t, e), n)
    },
    useLayoutEffect: function(e, t) {
        return Hr(4194308, 4, e, t)
    },
    useInsertionEffect: function(e, t) {
        return Hr(4, 2, e, t)
    },
    useMemo: function(e, t) {
        var n = Fe();
        return t = t === void 0 ? null : t,
        e = e(),
        n.memoizedState = [e, t],
        e
    },
    useReducer: function(e, t, n) {
        var r = Fe();
        return t = n !== void 0 ? n(t) : t,
        r.memoizedState = r.baseState = t,
        e = {
            pending: null,
            interleaved: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: e,
            lastRenderedState: t
        },
        r.queue = e,
        e = e.dispatch = tp.bind(null, $, e),
        [r.memoizedState, e]
    },
    useRef: function(e) {
        var t = Fe();
        return e = {
            current: e
        },
        t.memoizedState = e
    },
    useState: Xo,
    useDebugValue: Wl,
    useDeferredValue: function(e) {
        return Fe().memoizedState = e
    },
    useTransition: function() {
        var e = Xo(!1)
          , t = e[0];
        return e = ep.bind(null, e[1]),
        Fe().memoizedState = e,
        [t, e]
    },
    useMutableSource: function() {},
    useSyncExternalStore: function(e, t, n) {
        var r = $
          , i = Fe();
        if (B) {
            if (n === void 0)
                throw Error(w(407));
            n = n()
        } else {
            if (n = t(),
            J === null)
                throw Error(w(349));
            It & 30 || qu(r, t, n)
        }
        i.memoizedState = n;
        var s = {
            value: n,
            getSnapshot: t
        };
        return i.queue = s,
        Jo(Zu.bind(null, r, s, e), [e]),
        r.flags |= 2048,
        rr(9, Yu.bind(null, r, s, n, t), void 0, null),
        n
    },
    useId: function() {
        var e = Fe()
          , t = J.identifierPrefix;
        if (B) {
            var n = Ve
              , r = We;
            n = (r & ~(1 << 32 - Ie(r) - 1)).toString(32) + n,
            t = ":" + t + "R" + n,
            n = tr++,
            0 < n && (t += "H" + n.toString(32)),
            t += ":"
        } else
            n = Jf++,
            t = ":" + t + "r" + n.toString(32) + ":";
        return e.memoizedState = t
    },
    unstable_isNewReconciler: !1
}
  , ip = {
    readContext: Te,
    useCallback: sc,
    useContext: Te,
    useEffect: Ul,
    useImperativeHandle: ic,
    useInsertionEffect: tc,
    useLayoutEffect: nc,
    useMemo: lc,
    useReducer: ss,
    useRef: ec,
    useState: function() {
        return ss(nr)
    },
    useDebugValue: Wl,
    useDeferredValue: function(e) {
        var t = be();
        return oc(t, q.memoizedState, e)
    },
    useTransition: function() {
        var e = ss(nr)[0]
          , t = be().memoizedState;
        return [e, t]
    },
    useMutableSource: Ku,
    useSyncExternalStore: Gu,
    useId: ac,
    unstable_isNewReconciler: !1
}
  , sp = {
    readContext: Te,
    useCallback: sc,
    useContext: Te,
    useEffect: Ul,
    useImperativeHandle: ic,
    useInsertionEffect: tc,
    useLayoutEffect: nc,
    useMemo: lc,
    useReducer: ls,
    useRef: ec,
    useState: function() {
        return ls(nr)
    },
    useDebugValue: Wl,
    useDeferredValue: function(e) {
        var t = be();
        return q === null ? t.memoizedState = e : oc(t, q.memoizedState, e)
    },
    useTransition: function() {
        var e = ls(nr)[0]
          , t = be().memoizedState;
        return [e, t]
    },
    useMutableSource: Ku,
    useSyncExternalStore: Gu,
    useId: ac,
    unstable_isNewReconciler: !1
};
function ze(e, t) {
    if (e && e.defaultProps) {
        t = U({}, t),
        e = e.defaultProps;
        for (var n in e)
            t[n] === void 0 && (t[n] = e[n]);
        return t
    }
    return t
}
function Us(e, t, n, r) {
    t = e.memoizedState,
    n = n(r, t),
    n = n == null ? t : U({}, t, n),
    e.memoizedState = n,
    e.lanes === 0 && (e.updateQueue.baseState = n)
}
var Ei = {
    isMounted: function(e) {
        return (e = e._reactInternals) ? Ft(e) === e : !1
    },
    enqueueSetState: function(e, t, n) {
        e = e._reactInternals;
        var r = ae()
          , i = pt(e)
          , s = Qe(r, i);
        s.payload = t,
        n != null && (s.callback = n),
        t = dt(e, s, i),
        t !== null && (_e(t, e, i, r),
        Or(t, e, i))
    },
    enqueueReplaceState: function(e, t, n) {
        e = e._reactInternals;
        var r = ae()
          , i = pt(e)
          , s = Qe(r, i);
        s.tag = 1,
        s.payload = t,
        n != null && (s.callback = n),
        t = dt(e, s, i),
        t !== null && (_e(t, e, i, r),
        Or(t, e, i))
    },
    enqueueForceUpdate: function(e, t) {
        e = e._reactInternals;
        var n = ae()
          , r = pt(e)
          , i = Qe(n, r);
        i.tag = 2,
        t != null && (i.callback = t),
        t = dt(e, i, r),
        t !== null && (_e(t, e, r, n),
        Or(t, e, r))
    }
};
function ea(e, t, n, r, i, s, o) {
    return e = e.stateNode,
    typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, s, o) : t.prototype && t.prototype.isPureReactComponent ? !qn(n, r) || !qn(i, s) : !0
}
function fc(e, t, n) {
    var r = !1
      , i = gt
      , s = t.contextType;
    return typeof s == "object" && s !== null ? s = Te(s) : (i = me(t) ? Dt : le.current,
    r = t.contextTypes,
    s = (r = r != null) ? an(e, i) : gt),
    t = new t(n,s),
    e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null,
    t.updater = Ei,
    e.stateNode = t,
    t._reactInternals = e,
    r && (e = e.stateNode,
    e.__reactInternalMemoizedUnmaskedChildContext = i,
    e.__reactInternalMemoizedMaskedChildContext = s),
    t
}
function ta(e, t, n, r) {
    e = t.state,
    typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r),
    typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r),
    t.state !== e && Ei.enqueueReplaceState(t, t.state, null)
}
function Ws(e, t, n, r) {
    var i = e.stateNode;
    i.props = n,
    i.state = e.memoizedState,
    i.refs = {},
    Ll(e);
    var s = t.contextType;
    typeof s == "object" && s !== null ? i.context = Te(s) : (s = me(t) ? Dt : le.current,
    i.context = an(e, s)),
    i.state = e.memoizedState,
    s = t.getDerivedStateFromProps,
    typeof s == "function" && (Us(e, t, s, n),
    i.state = e.memoizedState),
    typeof t.getDerivedStateFromProps == "function" || typeof i.getSnapshotBeforeUpdate == "function" || typeof i.UNSAFE_componentWillMount != "function" && typeof i.componentWillMount != "function" || (t = i.state,
    typeof i.componentWillMount == "function" && i.componentWillMount(),
    typeof i.UNSAFE_componentWillMount == "function" && i.UNSAFE_componentWillMount(),
    t !== i.state && Ei.enqueueReplaceState(i, i.state, null),
    ai(e, n, i, r),
    i.state = e.memoizedState),
    typeof i.componentDidMount == "function" && (e.flags |= 4194308)
}
function fn(e, t) {
    try {
        var n = ""
          , r = t;
        do
            n += Dd(r),
            r = r.return;
        while (r);
        var i = n
    } catch (s) {
        i = `
Error generating stack: ` + s.message + `
` + s.stack
    }
    return {
        value: e,
        source: t,
        stack: i,
        digest: null
    }
}
function os(e, t, n) {
    return {
        value: e,
        source: null,
        stack: n ?? null,
        digest: t ?? null
    }
}
function Vs(e, t) {
    try {
        console.error(t.value)
    } catch (n) {
        setTimeout(function() {
            throw n
        })
    }
}
var lp = typeof WeakMap == "function" ? WeakMap : Map;
function pc(e, t, n) {
    n = Qe(-1, n),
    n.tag = 3,
    n.payload = {
        element: null
    };
    var r = t.value;
    return n.callback = function() {
        pi || (pi = !0,
        tl = r),
        Vs(e, t)
    }
    ,
    n
}
function mc(e, t, n) {
    n = Qe(-1, n),
    n.tag = 3;
    var r = e.type.getDerivedStateFromError;
    if (typeof r == "function") {
        var i = t.value;
        n.payload = function() {
            return r(i)
        }
        ,
        n.callback = function() {
            Vs(e, t)
        }
    }
    var s = e.stateNode;
    return s !== null && typeof s.componentDidCatch == "function" && (n.callback = function() {
        Vs(e, t),
        typeof r != "function" && (ft === null ? ft = new Set([this]) : ft.add(this));
        var o = t.stack;
        this.componentDidCatch(t.value, {
            componentStack: o !== null ? o : ""
        })
    }
    ),
    n
}
function na(e, t, n) {
    var r = e.pingCache;
    if (r === null) {
        r = e.pingCache = new lp;
        var i = new Set;
        r.set(t, i)
    } else
        i = r.get(t),
        i === void 0 && (i = new Set,
        r.set(t, i));
    i.has(n) || (i.add(n),
    e = wp.bind(null, e, t, n),
    t.then(e, e))
}
function ra(e) {
    do {
        var t;
        if ((t = e.tag === 13) && (t = e.memoizedState,
        t = t !== null ? t.dehydrated !== null : !0),
        t)
            return e;
        e = e.return
    } while (e !== null);
    return null
}
function ia(e, t, n, r, i) {
    return e.mode & 1 ? (e.flags |= 65536,
    e.lanes = i,
    e) : (e === t ? e.flags |= 65536 : (e.flags |= 128,
    n.flags |= 131072,
    n.flags &= -52805,
    n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = Qe(-1, 1),
    t.tag = 2,
    dt(n, t, 1))),
    n.lanes |= 1),
    e)
}
var op = Ze.ReactCurrentOwner
  , fe = !1;
function oe(e, t, n, r) {
    t.child = e === null ? Uu(t, null, n, r) : cn(t, e.child, n, r)
}
function sa(e, t, n, r, i) {
    n = n.render;
    var s = t.ref;
    return sn(t, i),
    r = Hl(e, t, n, r, s, i),
    n = $l(),
    e !== null && !fe ? (t.updateQueue = e.updateQueue,
    t.flags &= -2053,
    e.lanes &= ~i,
    Ye(e, t, i)) : (B && n && Ml(t),
    t.flags |= 1,
    oe(e, t, r, i),
    t.child)
}
function la(e, t, n, r, i) {
    if (e === null) {
        var s = n.type;
        return typeof s == "function" && !Xl(s) && s.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15,
        t.type = s,
        hc(e, t, s, r, i)) : (e = Vr(n.type, null, r, t, t.mode, i),
        e.ref = t.ref,
        e.return = t,
        t.child = e)
    }
    if (s = e.child,
    !(e.lanes & i)) {
        var o = s.memoizedProps;
        if (n = n.compare,
        n = n !== null ? n : qn,
        n(o, r) && e.ref === t.ref)
            return Ye(e, t, i)
    }
    return t.flags |= 1,
    e = mt(s, r),
    e.ref = t.ref,
    e.return = t,
    t.child = e
}
function hc(e, t, n, r, i) {
    if (e !== null) {
        var s = e.memoizedProps;
        if (qn(s, r) && e.ref === t.ref)
            if (fe = !1,
            t.pendingProps = r = s,
            (e.lanes & i) !== 0)
                e.flags & 131072 && (fe = !0);
            else
                return t.lanes = e.lanes,
                Ye(e, t, i)
    }
    return Qs(e, t, n, r, i)
}
function gc(e, t, n) {
    var r = t.pendingProps
      , i = r.children
      , s = e !== null ? e.memoizedState : null;
    if (r.mode === "hidden")
        if (!(t.mode & 1))
            t.memoizedState = {
                baseLanes: 0,
                cachePool: null,
                transitions: null
            },
            R(Jt, ye),
            ye |= n;
        else {
            if (!(n & 1073741824))
                return e = s !== null ? s.baseLanes | n : n,
                t.lanes = t.childLanes = 1073741824,
                t.memoizedState = {
                    baseLanes: e,
                    cachePool: null,
                    transitions: null
                },
                t.updateQueue = null,
                R(Jt, ye),
                ye |= e,
                null;
            t.memoizedState = {
                baseLanes: 0,
                cachePool: null,
                transitions: null
            },
            r = s !== null ? s.baseLanes : n,
            R(Jt, ye),
            ye |= r
        }
    else
        s !== null ? (r = s.baseLanes | n,
        t.memoizedState = null) : r = n,
        R(Jt, ye),
        ye |= r;
    return oe(e, t, i, n),
    t.child
}
function yc(e, t) {
    var n = t.ref;
    (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512,
    t.flags |= 2097152)
}
function Qs(e, t, n, r, i) {
    var s = me(n) ? Dt : le.current;
    return s = an(t, s),
    sn(t, i),
    n = Hl(e, t, n, r, s, i),
    r = $l(),
    e !== null && !fe ? (t.updateQueue = e.updateQueue,
    t.flags &= -2053,
    e.lanes &= ~i,
    Ye(e, t, i)) : (B && r && Ml(t),
    t.flags |= 1,
    oe(e, t, n, i),
    t.child)
}
function oa(e, t, n, r, i) {
    if (me(n)) {
        var s = !0;
        ri(t)
    } else
        s = !1;
    if (sn(t, i),
    t.stateNode === null)
        $r(e, t),
        fc(t, n, r),
        Ws(t, n, r, i),
        r = !0;
    else if (e === null) {
        var o = t.stateNode
          , a = t.memoizedProps;
        o.props = a;
        var u = o.context
          , c = n.contextType;
        typeof c == "object" && c !== null ? c = Te(c) : (c = me(n) ? Dt : le.current,
        c = an(t, c));
        var g = n.getDerivedStateFromProps
          , m = typeof g == "function" || typeof o.getSnapshotBeforeUpdate == "function";
        m || typeof o.UNSAFE_componentWillReceiveProps != "function" && typeof o.componentWillReceiveProps != "function" || (a !== r || u !== c) && ta(t, o, r, c),
        nt = !1;
        var h = t.memoizedState;
        o.state = h,
        ai(t, r, o, i),
        u = t.memoizedState,
        a !== r || h !== u || pe.current || nt ? (typeof g == "function" && (Us(t, n, g, r),
        u = t.memoizedState),
        (a = nt || ea(t, n, a, r, h, u, c)) ? (m || typeof o.UNSAFE_componentWillMount != "function" && typeof o.componentWillMount != "function" || (typeof o.componentWillMount == "function" && o.componentWillMount(),
        typeof o.UNSAFE_componentWillMount == "function" && o.UNSAFE_componentWillMount()),
        typeof o.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof o.componentDidMount == "function" && (t.flags |= 4194308),
        t.memoizedProps = r,
        t.memoizedState = u),
        o.props = r,
        o.state = u,
        o.context = c,
        r = a) : (typeof o.componentDidMount == "function" && (t.flags |= 4194308),
        r = !1)
    } else {
        o = t.stateNode,
        Vu(e, t),
        a = t.memoizedProps,
        c = t.type === t.elementType ? a : ze(t.type, a),
        o.props = c,
        m = t.pendingProps,
        h = o.context,
        u = n.contextType,
        typeof u == "object" && u !== null ? u = Te(u) : (u = me(n) ? Dt : le.current,
        u = an(t, u));
        var v = n.getDerivedStateFromProps;
        (g = typeof v == "function" || typeof o.getSnapshotBeforeUpdate == "function") || typeof o.UNSAFE_componentWillReceiveProps != "function" && typeof o.componentWillReceiveProps != "function" || (a !== m || h !== u) && ta(t, o, r, u),
        nt = !1,
        h = t.memoizedState,
        o.state = h,
        ai(t, r, o, i);
        var y = t.memoizedState;
        a !== m || h !== y || pe.current || nt ? (typeof v == "function" && (Us(t, n, v, r),
        y = t.memoizedState),
        (c = nt || ea(t, n, c, r, h, y, u) || !1) ? (g || typeof o.UNSAFE_componentWillUpdate != "function" && typeof o.componentWillUpdate != "function" || (typeof o.componentWillUpdate == "function" && o.componentWillUpdate(r, y, u),
        typeof o.UNSAFE_componentWillUpdate == "function" && o.UNSAFE_componentWillUpdate(r, y, u)),
        typeof o.componentDidUpdate == "function" && (t.flags |= 4),
        typeof o.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof o.componentDidUpdate != "function" || a === e.memoizedProps && h === e.memoizedState || (t.flags |= 4),
        typeof o.getSnapshotBeforeUpdate != "function" || a === e.memoizedProps && h === e.memoizedState || (t.flags |= 1024),
        t.memoizedProps = r,
        t.memoizedState = y),
        o.props = r,
        o.state = y,
        o.context = u,
        r = c) : (typeof o.componentDidUpdate != "function" || a === e.memoizedProps && h === e.memoizedState || (t.flags |= 4),
        typeof o.getSnapshotBeforeUpdate != "function" || a === e.memoizedProps && h === e.memoizedState || (t.flags |= 1024),
        r = !1)
    }
    return Ks(e, t, n, r, s, i)
}
function Ks(e, t, n, r, i, s) {
    yc(e, t);
    var o = (t.flags & 128) !== 0;
    if (!r && !o)
        return i && Qo(t, n, !1),
        Ye(e, t, s);
    r = t.stateNode,
    op.current = t;
    var a = o && typeof n.getDerivedStateFromError != "function" ? null : r.render();
    return t.flags |= 1,
    e !== null && o ? (t.child = cn(t, e.child, null, s),
    t.child = cn(t, null, a, s)) : oe(e, t, a, s),
    t.memoizedState = r.state,
    i && Qo(t, n, !0),
    t.child
}
function vc(e) {
    var t = e.stateNode;
    t.pendingContext ? Vo(e, t.pendingContext, t.pendingContext !== t.context) : t.context && Vo(e, t.context, !1),
    Rl(e, t.containerInfo)
}
function aa(e, t, n, r, i) {
    return un(),
    zl(i),
    t.flags |= 256,
    oe(e, t, n, r),
    t.child
}
var Gs = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0
};
function qs(e) {
    return {
        baseLanes: e,
        cachePool: null,
        transitions: null
    }
}
function xc(e, t, n) {
    var r = t.pendingProps, i = H.current, s = !1, o = (t.flags & 128) !== 0, a;
    if ((a = o) || (a = e !== null && e.memoizedState === null ? !1 : (i & 2) !== 0),
    a ? (s = !0,
    t.flags &= -129) : (e === null || e.memoizedState !== null) && (i |= 1),
    R(H, i & 1),
    e === null)
        return Hs(t),
        e = t.memoizedState,
        e !== null && (e = e.dehydrated,
        e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1,
        null) : (o = r.children,
        e = r.fallback,
        s ? (r = t.mode,
        s = t.child,
        o = {
            mode: "hidden",
            children: o
        },
        !(r & 1) && s !== null ? (s.childLanes = 0,
        s.pendingProps = o) : s = Mi(o, r, 0, null),
        e = Pt(e, r, n, null),
        s.return = t,
        e.return = t,
        s.sibling = e,
        t.child = s,
        t.child.memoizedState = qs(n),
        t.memoizedState = Gs,
        e) : Vl(t, o));
    if (i = e.memoizedState,
    i !== null && (a = i.dehydrated,
    a !== null))
        return ap(e, t, o, r, a, i, n);
    if (s) {
        s = r.fallback,
        o = t.mode,
        i = e.child,
        a = i.sibling;
        var u = {
            mode: "hidden",
            children: r.children
        };
        return !(o & 1) && t.child !== i ? (r = t.child,
        r.childLanes = 0,
        r.pendingProps = u,
        t.deletions = null) : (r = mt(i, u),
        r.subtreeFlags = i.subtreeFlags & 14680064),
        a !== null ? s = mt(a, s) : (s = Pt(s, o, n, null),
        s.flags |= 2),
        s.return = t,
        r.return = t,
        r.sibling = s,
        t.child = r,
        r = s,
        s = t.child,
        o = e.child.memoizedState,
        o = o === null ? qs(n) : {
            baseLanes: o.baseLanes | n,
            cachePool: null,
            transitions: o.transitions
        },
        s.memoizedState = o,
        s.childLanes = e.childLanes & ~n,
        t.memoizedState = Gs,
        r
    }
    return s = e.child,
    e = s.sibling,
    r = mt(s, {
        mode: "visible",
        children: r.children
    }),
    !(t.mode & 1) && (r.lanes = n),
    r.return = t,
    r.sibling = null,
    e !== null && (n = t.deletions,
    n === null ? (t.deletions = [e],
    t.flags |= 16) : n.push(e)),
    t.child = r,
    t.memoizedState = null,
    r
}
function Vl(e, t) {
    return t = Mi({
        mode: "visible",
        children: t
    }, e.mode, 0, null),
    t.return = e,
    e.child = t
}
function Mr(e, t, n, r) {
    return r !== null && zl(r),
    cn(t, e.child, null, n),
    e = Vl(t, t.pendingProps.children),
    e.flags |= 2,
    t.memoizedState = null,
    e
}
function ap(e, t, n, r, i, s, o) {
    if (n)
        return t.flags & 256 ? (t.flags &= -257,
        r = os(Error(w(422))),
        Mr(e, t, o, r)) : t.memoizedState !== null ? (t.child = e.child,
        t.flags |= 128,
        null) : (s = r.fallback,
        i = t.mode,
        r = Mi({
            mode: "visible",
            children: r.children
        }, i, 0, null),
        s = Pt(s, i, o, null),
        s.flags |= 2,
        r.return = t,
        s.return = t,
        r.sibling = s,
        t.child = r,
        t.mode & 1 && cn(t, e.child, null, o),
        t.child.memoizedState = qs(o),
        t.memoizedState = Gs,
        s);
    if (!(t.mode & 1))
        return Mr(e, t, o, null);
    if (i.data === "$!") {
        if (r = i.nextSibling && i.nextSibling.dataset,
        r)
            var a = r.dgst;
        return r = a,
        s = Error(w(419)),
        r = os(s, r, void 0),
        Mr(e, t, o, r)
    }
    if (a = (o & e.childLanes) !== 0,
    fe || a) {
        if (r = J,
        r !== null) {
            switch (o & -o) {
            case 4:
                i = 2;
                break;
            case 16:
                i = 8;
                break;
            case 64:
            case 128:
            case 256:
            case 512:
            case 1024:
            case 2048:
            case 4096:
            case 8192:
            case 16384:
            case 32768:
            case 65536:
            case 131072:
            case 262144:
            case 524288:
            case 1048576:
            case 2097152:
            case 4194304:
            case 8388608:
            case 16777216:
            case 33554432:
            case 67108864:
                i = 32;
                break;
            case 536870912:
                i = 268435456;
                break;
            default:
                i = 0
            }
            i = i & (r.suspendedLanes | o) ? 0 : i,
            i !== 0 && i !== s.retryLane && (s.retryLane = i,
            qe(e, i),
            _e(r, e, i, -1))
        }
        return Zl(),
        r = os(Error(w(421))),
        Mr(e, t, o, r)
    }
    return i.data === "$?" ? (t.flags |= 128,
    t.child = e.child,
    t = kp.bind(null, e),
    i._reactRetry = t,
    null) : (e = s.treeContext,
    ve = ct(i.nextSibling),
    xe = t,
    B = !0,
    Ae = null,
    e !== null && (je[Ne++] = We,
    je[Ne++] = Ve,
    je[Ne++] = At,
    We = e.id,
    Ve = e.overflow,
    At = t),
    t = Vl(t, r.children),
    t.flags |= 4096,
    t)
}
function ua(e, t, n) {
    e.lanes |= t;
    var r = e.alternate;
    r !== null && (r.lanes |= t),
    $s(e.return, t, n)
}
function as(e, t, n, r, i) {
    var s = e.memoizedState;
    s === null ? e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: r,
        tail: n,
        tailMode: i
    } : (s.isBackwards = t,
    s.rendering = null,
    s.renderingStartTime = 0,
    s.last = r,
    s.tail = n,
    s.tailMode = i)
}
function wc(e, t, n) {
    var r = t.pendingProps
      , i = r.revealOrder
      , s = r.tail;
    if (oe(e, t, r.children, n),
    r = H.current,
    r & 2)
        r = r & 1 | 2,
        t.flags |= 128;
    else {
        if (e !== null && e.flags & 128)
            e: for (e = t.child; e !== null; ) {
                if (e.tag === 13)
                    e.memoizedState !== null && ua(e, n, t);
                else if (e.tag === 19)
                    ua(e, n, t);
                else if (e.child !== null) {
                    e.child.return = e,
                    e = e.child;
                    continue
                }
                if (e === t)
                    break e;
                for (; e.sibling === null; ) {
                    if (e.return === null || e.return === t)
                        break e;
                    e = e.return
                }
                e.sibling.return = e.return,
                e = e.sibling
            }
        r &= 1
    }
    if (R(H, r),
    !(t.mode & 1))
        t.memoizedState = null;
    else
        switch (i) {
        case "forwards":
            for (n = t.child,
            i = null; n !== null; )
                e = n.alternate,
                e !== null && ui(e) === null && (i = n),
                n = n.sibling;
            n = i,
            n === null ? (i = t.child,
            t.child = null) : (i = n.sibling,
            n.sibling = null),
            as(t, !1, i, n, s);
            break;
        case "backwards":
            for (n = null,
            i = t.child,
            t.child = null; i !== null; ) {
                if (e = i.alternate,
                e !== null && ui(e) === null) {
                    t.child = i;
                    break
                }
                e = i.sibling,
                i.sibling = n,
                n = i,
                i = e
            }
            as(t, !0, n, null, s);
            break;
        case "together":
            as(t, !1, null, null, void 0);
            break;
        default:
            t.memoizedState = null
        }
    return t.child
}
function $r(e, t) {
    !(t.mode & 1) && e !== null && (e.alternate = null,
    t.alternate = null,
    t.flags |= 2)
}
function Ye(e, t, n) {
    if (e !== null && (t.dependencies = e.dependencies),
    _t |= t.lanes,
    !(n & t.childLanes))
        return null;
    if (e !== null && t.child !== e.child)
        throw Error(w(153));
    if (t.child !== null) {
        for (e = t.child,
        n = mt(e, e.pendingProps),
        t.child = n,
        n.return = t; e.sibling !== null; )
            e = e.sibling,
            n = n.sibling = mt(e, e.pendingProps),
            n.return = t;
        n.sibling = null
    }
    return t.child
}
function up(e, t, n) {
    switch (t.tag) {
    case 3:
        vc(t),
        un();
        break;
    case 5:
        Qu(t);
        break;
    case 1:
        me(t.type) && ri(t);
        break;
    case 4:
        Rl(t, t.stateNode.containerInfo);
        break;
    case 10:
        var r = t.type._context
          , i = t.memoizedProps.value;
        R(li, r._currentValue),
        r._currentValue = i;
        break;
    case 13:
        if (r = t.memoizedState,
        r !== null)
            return r.dehydrated !== null ? (R(H, H.current & 1),
            t.flags |= 128,
            null) : n & t.child.childLanes ? xc(e, t, n) : (R(H, H.current & 1),
            e = Ye(e, t, n),
            e !== null ? e.sibling : null);
        R(H, H.current & 1);
        break;
    case 19:
        if (r = (n & t.childLanes) !== 0,
        e.flags & 128) {
            if (r)
                return wc(e, t, n);
            t.flags |= 128
        }
        if (i = t.memoizedState,
        i !== null && (i.rendering = null,
        i.tail = null,
        i.lastEffect = null),
        R(H, H.current),
        r)
            break;
        return null;
    case 22:
    case 23:
        return t.lanes = 0,
        gc(e, t, n)
    }
    return Ye(e, t, n)
}
var kc, Ys, Sc, jc;
kc = function(e, t) {
    for (var n = t.child; n !== null; ) {
        if (n.tag === 5 || n.tag === 6)
            e.appendChild(n.stateNode);
        else if (n.tag !== 4 && n.child !== null) {
            n.child.return = n,
            n = n.child;
            continue
        }
        if (n === t)
            break;
        for (; n.sibling === null; ) {
            if (n.return === null || n.return === t)
                return;
            n = n.return
        }
        n.sibling.return = n.return,
        n = n.sibling
    }
}
;
Ys = function() {}
;
Sc = function(e, t, n, r) {
    var i = e.memoizedProps;
    if (i !== r) {
        e = t.stateNode,
        bt(He.current);
        var s = null;
        switch (n) {
        case "input":
            i = vs(e, i),
            r = vs(e, r),
            s = [];
            break;
        case "select":
            i = U({}, i, {
                value: void 0
            }),
            r = U({}, r, {
                value: void 0
            }),
            s = [];
            break;
        case "textarea":
            i = ks(e, i),
            r = ks(e, r),
            s = [];
            break;
        default:
            typeof i.onClick != "function" && typeof r.onClick == "function" && (e.onclick = ti)
        }
        js(n, r);
        var o;
        n = null;
        for (c in i)
            if (!r.hasOwnProperty(c) && i.hasOwnProperty(c) && i[c] != null)
                if (c === "style") {
                    var a = i[c];
                    for (o in a)
                        a.hasOwnProperty(o) && (n || (n = {}),
                        n[o] = "")
                } else
                    c !== "dangerouslySetInnerHTML" && c !== "children" && c !== "suppressContentEditableWarning" && c !== "suppressHydrationWarning" && c !== "autoFocus" && ($n.hasOwnProperty(c) ? s || (s = []) : (s = s || []).push(c, null));
        for (c in r) {
            var u = r[c];
            if (a = i != null ? i[c] : void 0,
            r.hasOwnProperty(c) && u !== a && (u != null || a != null))
                if (c === "style")
                    if (a) {
                        for (o in a)
                            !a.hasOwnProperty(o) || u && u.hasOwnProperty(o) || (n || (n = {}),
                            n[o] = "");
                        for (o in u)
                            u.hasOwnProperty(o) && a[o] !== u[o] && (n || (n = {}),
                            n[o] = u[o])
                    } else
                        n || (s || (s = []),
                        s.push(c, n)),
                        n = u;
                else
                    c === "dangerouslySetInnerHTML" ? (u = u ? u.__html : void 0,
                    a = a ? a.__html : void 0,
                    u != null && a !== u && (s = s || []).push(c, u)) : c === "children" ? typeof u != "string" && typeof u != "number" || (s = s || []).push(c, "" + u) : c !== "suppressContentEditableWarning" && c !== "suppressHydrationWarning" && ($n.hasOwnProperty(c) ? (u != null && c === "onScroll" && F("scroll", e),
                    s || a === u || (s = [])) : (s = s || []).push(c, u))
        }
        n && (s = s || []).push("style", n);
        var c = s;
        (t.updateQueue = c) && (t.flags |= 4)
    }
}
;
jc = function(e, t, n, r) {
    n !== r && (t.flags |= 4)
}
;
function En(e, t) {
    if (!B)
        switch (e.tailMode) {
        case "hidden":
            t = e.tail;
            for (var n = null; t !== null; )
                t.alternate !== null && (n = t),
                t = t.sibling;
            n === null ? e.tail = null : n.sibling = null;
            break;
        case "collapsed":
            n = e.tail;
            for (var r = null; n !== null; )
                n.alternate !== null && (r = n),
                n = n.sibling;
            r === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : r.sibling = null
        }
}
function ie(e) {
    var t = e.alternate !== null && e.alternate.child === e.child
      , n = 0
      , r = 0;
    if (t)
        for (var i = e.child; i !== null; )
            n |= i.lanes | i.childLanes,
            r |= i.subtreeFlags & 14680064,
            r |= i.flags & 14680064,
            i.return = e,
            i = i.sibling;
    else
        for (i = e.child; i !== null; )
            n |= i.lanes | i.childLanes,
            r |= i.subtreeFlags,
            r |= i.flags,
            i.return = e,
            i = i.sibling;
    return e.subtreeFlags |= r,
    e.childLanes = n,
    t
}
function cp(e, t, n) {
    var r = t.pendingProps;
    switch (Pl(t),
    t.tag) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
        return ie(t),
        null;
    case 1:
        return me(t.type) && ni(),
        ie(t),
        null;
    case 3:
        return r = t.stateNode,
        dn(),
        O(pe),
        O(le),
        Ol(),
        r.pendingContext && (r.context = r.pendingContext,
        r.pendingContext = null),
        (e === null || e.child === null) && (Tr(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024,
        Ae !== null && (il(Ae),
        Ae = null))),
        Ys(e, t),
        ie(t),
        null;
    case 5:
        Fl(t);
        var i = bt(er.current);
        if (n = t.type,
        e !== null && t.stateNode != null)
            Sc(e, t, n, r, i),
            e.ref !== t.ref && (t.flags |= 512,
            t.flags |= 2097152);
        else {
            if (!r) {
                if (t.stateNode === null)
                    throw Error(w(166));
                return ie(t),
                null
            }
            if (e = bt(He.current),
            Tr(t)) {
                r = t.stateNode,
                n = t.type;
                var s = t.memoizedProps;
                switch (r[Oe] = t,
                r[Xn] = s,
                e = (t.mode & 1) !== 0,
                n) {
                case "dialog":
                    F("cancel", r),
                    F("close", r);
                    break;
                case "iframe":
                case "object":
                case "embed":
                    F("load", r);
                    break;
                case "video":
                case "audio":
                    for (i = 0; i < zn.length; i++)
                        F(zn[i], r);
                    break;
                case "source":
                    F("error", r);
                    break;
                case "img":
                case "image":
                case "link":
                    F("error", r),
                    F("load", r);
                    break;
                case "details":
                    F("toggle", r);
                    break;
                case "input":
                    vo(r, s),
                    F("invalid", r);
                    break;
                case "select":
                    r._wrapperState = {
                        wasMultiple: !!s.multiple
                    },
                    F("invalid", r);
                    break;
                case "textarea":
                    wo(r, s),
                    F("invalid", r)
                }
                js(n, s),
                i = null;
                for (var o in s)
                    if (s.hasOwnProperty(o)) {
                        var a = s[o];
                        o === "children" ? typeof a == "string" ? r.textContent !== a && (s.suppressHydrationWarning !== !0 && Er(r.textContent, a, e),
                        i = ["children", a]) : typeof a == "number" && r.textContent !== "" + a && (s.suppressHydrationWarning !== !0 && Er(r.textContent, a, e),
                        i = ["children", "" + a]) : $n.hasOwnProperty(o) && a != null && o === "onScroll" && F("scroll", r)
                    }
                switch (n) {
                case "input":
                    vr(r),
                    xo(r, s, !0);
                    break;
                case "textarea":
                    vr(r),
                    ko(r);
                    break;
                case "select":
                case "option":
                    break;
                default:
                    typeof s.onClick == "function" && (r.onclick = ti)
                }
                r = i,
                t.updateQueue = r,
                r !== null && (t.flags |= 4)
            } else {
                o = i.nodeType === 9 ? i : i.ownerDocument,
                e === "http://www.w3.org/1999/xhtml" && (e = Za(n)),
                e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = o.createElement("div"),
                e.innerHTML = "<script><\/script>",
                e = e.removeChild(e.firstChild)) : typeof r.is == "string" ? e = o.createElement(n, {
                    is: r.is
                }) : (e = o.createElement(n),
                n === "select" && (o = e,
                r.multiple ? o.multiple = !0 : r.size && (o.size = r.size))) : e = o.createElementNS(e, n),
                e[Oe] = t,
                e[Xn] = r,
                kc(e, t, !1, !1),
                t.stateNode = e;
                e: {
                    switch (o = Ns(n, r),
                    n) {
                    case "dialog":
                        F("cancel", e),
                        F("close", e),
                        i = r;
                        break;
                    case "iframe":
                    case "object":
                    case "embed":
                        F("load", e),
                        i = r;
                        break;
                    case "video":
                    case "audio":
                        for (i = 0; i < zn.length; i++)
                            F(zn[i], e);
                        i = r;
                        break;
                    case "source":
                        F("error", e),
                        i = r;
                        break;
                    case "img":
                    case "image":
                    case "link":
                        F("error", e),
                        F("load", e),
                        i = r;
                        break;
                    case "details":
                        F("toggle", e),
                        i = r;
                        break;
                    case "input":
                        vo(e, r),
                        i = vs(e, r),
                        F("invalid", e);
                        break;
                    case "option":
                        i = r;
                        break;
                    case "select":
                        e._wrapperState = {
                            wasMultiple: !!r.multiple
                        },
                        i = U({}, r, {
                            value: void 0
                        }),
                        F("invalid", e);
                        break;
                    case "textarea":
                        wo(e, r),
                        i = ks(e, r),
                        F("invalid", e);
                        break;
                    default:
                        i = r
                    }
                    js(n, i),
                    a = i;
                    for (s in a)
                        if (a.hasOwnProperty(s)) {
                            var u = a[s];
                            s === "style" ? eu(e, u) : s === "dangerouslySetInnerHTML" ? (u = u ? u.__html : void 0,
                            u != null && Xa(e, u)) : s === "children" ? typeof u == "string" ? (n !== "textarea" || u !== "") && Un(e, u) : typeof u == "number" && Un(e, "" + u) : s !== "suppressContentEditableWarning" && s !== "suppressHydrationWarning" && s !== "autoFocus" && ($n.hasOwnProperty(s) ? u != null && s === "onScroll" && F("scroll", e) : u != null && hl(e, s, u, o))
                        }
                    switch (n) {
                    case "input":
                        vr(e),
                        xo(e, r, !1);
                        break;
                    case "textarea":
                        vr(e),
                        ko(e);
                        break;
                    case "option":
                        r.value != null && e.setAttribute("value", "" + ht(r.value));
                        break;
                    case "select":
                        e.multiple = !!r.multiple,
                        s = r.value,
                        s != null ? en(e, !!r.multiple, s, !1) : r.defaultValue != null && en(e, !!r.multiple, r.defaultValue, !0);
                        break;
                    default:
                        typeof i.onClick == "function" && (e.onclick = ti)
                    }
                    switch (n) {
                    case "button":
                    case "input":
                    case "select":
                    case "textarea":
                        r = !!r.autoFocus;
                        break e;
                    case "img":
                        r = !0;
                        break e;
                    default:
                        r = !1
                    }
                }
                r && (t.flags |= 4)
            }
            t.ref !== null && (t.flags |= 512,
            t.flags |= 2097152)
        }
        return ie(t),
        null;
    case 6:
        if (e && t.stateNode != null)
            jc(e, t, e.memoizedProps, r);
        else {
            if (typeof r != "string" && t.stateNode === null)
                throw Error(w(166));
            if (n = bt(er.current),
            bt(He.current),
            Tr(t)) {
                if (r = t.stateNode,
                n = t.memoizedProps,
                r[Oe] = t,
                (s = r.nodeValue !== n) && (e = xe,
                e !== null))
                    switch (e.tag) {
                    case 3:
                        Er(r.nodeValue, n, (e.mode & 1) !== 0);
                        break;
                    case 5:
                        e.memoizedProps.suppressHydrationWarning !== !0 && Er(r.nodeValue, n, (e.mode & 1) !== 0)
                    }
                s && (t.flags |= 4)
            } else
                r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r),
                r[Oe] = t,
                t.stateNode = r
        }
        return ie(t),
        null;
    case 13:
        if (O(H),
        r = t.memoizedState,
        e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
            if (B && ve !== null && t.mode & 1 && !(t.flags & 128))
                Hu(),
                un(),
                t.flags |= 98560,
                s = !1;
            else if (s = Tr(t),
            r !== null && r.dehydrated !== null) {
                if (e === null) {
                    if (!s)
                        throw Error(w(318));
                    if (s = t.memoizedState,
                    s = s !== null ? s.dehydrated : null,
                    !s)
                        throw Error(w(317));
                    s[Oe] = t
                } else
                    un(),
                    !(t.flags & 128) && (t.memoizedState = null),
                    t.flags |= 4;
                ie(t),
                s = !1
            } else
                Ae !== null && (il(Ae),
                Ae = null),
                s = !0;
            if (!s)
                return t.flags & 65536 ? t : null
        }
        return t.flags & 128 ? (t.lanes = n,
        t) : (r = r !== null,
        r !== (e !== null && e.memoizedState !== null) && r && (t.child.flags |= 8192,
        t.mode & 1 && (e === null || H.current & 1 ? Y === 0 && (Y = 3) : Zl())),
        t.updateQueue !== null && (t.flags |= 4),
        ie(t),
        null);
    case 4:
        return dn(),
        Ys(e, t),
        e === null && Yn(t.stateNode.containerInfo),
        ie(t),
        null;
    case 10:
        return Il(t.type._context),
        ie(t),
        null;
    case 17:
        return me(t.type) && ni(),
        ie(t),
        null;
    case 19:
        if (O(H),
        s = t.memoizedState,
        s === null)
            return ie(t),
            null;
        if (r = (t.flags & 128) !== 0,
        o = s.rendering,
        o === null)
            if (r)
                En(s, !1);
            else {
                if (Y !== 0 || e !== null && e.flags & 128)
                    for (e = t.child; e !== null; ) {
                        if (o = ui(e),
                        o !== null) {
                            for (t.flags |= 128,
                            En(s, !1),
                            r = o.updateQueue,
                            r !== null && (t.updateQueue = r,
                            t.flags |= 4),
                            t.subtreeFlags = 0,
                            r = n,
                            n = t.child; n !== null; )
                                s = n,
                                e = r,
                                s.flags &= 14680066,
                                o = s.alternate,
                                o === null ? (s.childLanes = 0,
                                s.lanes = e,
                                s.child = null,
                                s.subtreeFlags = 0,
                                s.memoizedProps = null,
                                s.memoizedState = null,
                                s.updateQueue = null,
                                s.dependencies = null,
                                s.stateNode = null) : (s.childLanes = o.childLanes,
                                s.lanes = o.lanes,
                                s.child = o.child,
                                s.subtreeFlags = 0,
                                s.deletions = null,
                                s.memoizedProps = o.memoizedProps,
                                s.memoizedState = o.memoizedState,
                                s.updateQueue = o.updateQueue,
                                s.type = o.type,
                                e = o.dependencies,
                                s.dependencies = e === null ? null : {
                                    lanes: e.lanes,
                                    firstContext: e.firstContext
                                }),
                                n = n.sibling;
                            return R(H, H.current & 1 | 2),
                            t.child
                        }
                        e = e.sibling
                    }
                s.tail !== null && K() > pn && (t.flags |= 128,
                r = !0,
                En(s, !1),
                t.lanes = 4194304)
            }
        else {
            if (!r)
                if (e = ui(o),
                e !== null) {
                    if (t.flags |= 128,
                    r = !0,
                    n = e.updateQueue,
                    n !== null && (t.updateQueue = n,
                    t.flags |= 4),
                    En(s, !0),
                    s.tail === null && s.tailMode === "hidden" && !o.alternate && !B)
                        return ie(t),
                        null
                } else
                    2 * K() - s.renderingStartTime > pn && n !== 1073741824 && (t.flags |= 128,
                    r = !0,
                    En(s, !1),
                    t.lanes = 4194304);
            s.isBackwards ? (o.sibling = t.child,
            t.child = o) : (n = s.last,
            n !== null ? n.sibling = o : t.child = o,
            s.last = o)
        }
        return s.tail !== null ? (t = s.tail,
        s.rendering = t,
        s.tail = t.sibling,
        s.renderingStartTime = K(),
        t.sibling = null,
        n = H.current,
        R(H, r ? n & 1 | 2 : n & 1),
        t) : (ie(t),
        null);
    case 22:
    case 23:
        return Yl(),
        r = t.memoizedState !== null,
        e !== null && e.memoizedState !== null !== r && (t.flags |= 8192),
        r && t.mode & 1 ? ye & 1073741824 && (ie(t),
        t.subtreeFlags & 6 && (t.flags |= 8192)) : ie(t),
        null;
    case 24:
        return null;
    case 25:
        return null
    }
    throw Error(w(156, t.tag))
}
function dp(e, t) {
    switch (Pl(t),
    t.tag) {
    case 1:
        return me(t.type) && ni(),
        e = t.flags,
        e & 65536 ? (t.flags = e & -65537 | 128,
        t) : null;
    case 3:
        return dn(),
        O(pe),
        O(le),
        Ol(),
        e = t.flags,
        e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128,
        t) : null;
    case 5:
        return Fl(t),
        null;
    case 13:
        if (O(H),
        e = t.memoizedState,
        e !== null && e.dehydrated !== null) {
            if (t.alternate === null)
                throw Error(w(340));
            un()
        }
        return e = t.flags,
        e & 65536 ? (t.flags = e & -65537 | 128,
        t) : null;
    case 19:
        return O(H),
        null;
    case 4:
        return dn(),
        null;
    case 10:
        return Il(t.type._context),
        null;
    case 22:
    case 23:
        return Yl(),
        null;
    case 24:
        return null;
    default:
        return null
    }
}
var Pr = !1
  , se = !1
  , fp = typeof WeakSet == "function" ? WeakSet : Set
  , S = null;
function Xt(e, t) {
    var n = e.ref;
    if (n !== null)
        if (typeof n == "function")
            try {
                n(null)
            } catch (r) {
                W(e, t, r)
            }
        else
            n.current = null
}
function Zs(e, t, n) {
    try {
        n()
    } catch (r) {
        W(e, t, r)
    }
}
var ca = !1;
function pp(e, t) {
    if (Is = Xr,
    e = bu(),
    bl(e)) {
        if ("selectionStart"in e)
            var n = {
                start: e.selectionStart,
                end: e.selectionEnd
            };
        else
            e: {
                n = (n = e.ownerDocument) && n.defaultView || window;
                var r = n.getSelection && n.getSelection();
                if (r && r.rangeCount !== 0) {
                    n = r.anchorNode;
                    var i = r.anchorOffset
                      , s = r.focusNode;
                    r = r.focusOffset;
                    try {
                        n.nodeType,
                        s.nodeType
                    } catch {
                        n = null;
                        break e
                    }
                    var o = 0
                      , a = -1
                      , u = -1
                      , c = 0
                      , g = 0
                      , m = e
                      , h = null;
                    t: for (; ; ) {
                        for (var v; m !== n || i !== 0 && m.nodeType !== 3 || (a = o + i),
                        m !== s || r !== 0 && m.nodeType !== 3 || (u = o + r),
                        m.nodeType === 3 && (o += m.nodeValue.length),
                        (v = m.firstChild) !== null; )
                            h = m,
                            m = v;
                        for (; ; ) {
                            if (m === e)
                                break t;
                            if (h === n && ++c === i && (a = o),
                            h === s && ++g === r && (u = o),
                            (v = m.nextSibling) !== null)
                                break;
                            m = h,
                            h = m.parentNode
                        }
                        m = v
                    }
                    n = a === -1 || u === -1 ? null : {
                        start: a,
                        end: u
                    }
                } else
                    n = null
            }
        n = n || {
            start: 0,
            end: 0
        }
    } else
        n = null;
    for (_s = {
        focusedElem: e,
        selectionRange: n
    },
    Xr = !1,
    S = t; S !== null; )
        if (t = S,
        e = t.child,
        (t.subtreeFlags & 1028) !== 0 && e !== null)
            e.return = t,
            S = e;
        else
            for (; S !== null; ) {
                t = S;
                try {
                    var y = t.alternate;
                    if (t.flags & 1024)
                        switch (t.tag) {
                        case 0:
                        case 11:
                        case 15:
                            break;
                        case 1:
                            if (y !== null) {
                                var k = y.memoizedProps
                                  , z = y.memoizedState
                                  , f = t.stateNode
                                  , d = f.getSnapshotBeforeUpdate(t.elementType === t.type ? k : ze(t.type, k), z);
                                f.__reactInternalSnapshotBeforeUpdate = d
                            }
                            break;
                        case 3:
                            var p = t.stateNode.containerInfo;
                            p.nodeType === 1 ? p.textContent = "" : p.nodeType === 9 && p.documentElement && p.removeChild(p.documentElement);
                            break;
                        case 5:
                        case 6:
                        case 4:
                        case 17:
                            break;
                        default:
                            throw Error(w(163))
                        }
                } catch (x) {
                    W(t, t.return, x)
                }
                if (e = t.sibling,
                e !== null) {
                    e.return = t.return,
                    S = e;
                    break
                }
                S = t.return
            }
    return y = ca,
    ca = !1,
    y
}
function Fn(e, t, n) {
    var r = t.updateQueue;
    if (r = r !== null ? r.lastEffect : null,
    r !== null) {
        var i = r = r.next;
        do {
            if ((i.tag & e) === e) {
                var s = i.destroy;
                i.destroy = void 0,
                s !== void 0 && Zs(t, n, s)
            }
            i = i.next
        } while (i !== r)
    }
}
function Ti(e, t) {
    if (t = t.updateQueue,
    t = t !== null ? t.lastEffect : null,
    t !== null) {
        var n = t = t.next;
        do {
            if ((n.tag & e) === e) {
                var r = n.create;
                n.destroy = r()
            }
            n = n.next
        } while (n !== t)
    }
}
function Xs(e) {
    var t = e.ref;
    if (t !== null) {
        var n = e.stateNode;
        switch (e.tag) {
        case 5:
            e = n;
            break;
        default:
            e = n
        }
        typeof t == "function" ? t(e) : t.current = e
    }
}
function Nc(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null,
    Nc(t)),
    e.child = null,
    e.deletions = null,
    e.sibling = null,
    e.tag === 5 && (t = e.stateNode,
    t !== null && (delete t[Oe],
    delete t[Xn],
    delete t[Fs],
    delete t[qf],
    delete t[Yf])),
    e.stateNode = null,
    e.return = null,
    e.dependencies = null,
    e.memoizedProps = null,
    e.memoizedState = null,
    e.pendingProps = null,
    e.stateNode = null,
    e.updateQueue = null
}
function Cc(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 4
}
function da(e) {
    e: for (; ; ) {
        for (; e.sibling === null; ) {
            if (e.return === null || Cc(e.return))
                return null;
            e = e.return
        }
        for (e.sibling.return = e.return,
        e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
            if (e.flags & 2 || e.child === null || e.tag === 4)
                continue e;
            e.child.return = e,
            e = e.child
        }
        if (!(e.flags & 2))
            return e.stateNode
    }
}
function Js(e, t, n) {
    var r = e.tag;
    if (r === 5 || r === 6)
        e = e.stateNode,
        t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode,
        t.insertBefore(e, n)) : (t = n,
        t.appendChild(e)),
        n = n._reactRootContainer,
        n != null || t.onclick !== null || (t.onclick = ti));
    else if (r !== 4 && (e = e.child,
    e !== null))
        for (Js(e, t, n),
        e = e.sibling; e !== null; )
            Js(e, t, n),
            e = e.sibling
}
function el(e, t, n) {
    var r = e.tag;
    if (r === 5 || r === 6)
        e = e.stateNode,
        t ? n.insertBefore(e, t) : n.appendChild(e);
    else if (r !== 4 && (e = e.child,
    e !== null))
        for (el(e, t, n),
        e = e.sibling; e !== null; )
            el(e, t, n),
            e = e.sibling
}
var ee = null
  , De = !1;
function Je(e, t, n) {
    for (n = n.child; n !== null; )
        Ec(e, t, n),
        n = n.sibling
}
function Ec(e, t, n) {
    if (Be && typeof Be.onCommitFiberUnmount == "function")
        try {
            Be.onCommitFiberUnmount(xi, n)
        } catch {}
    switch (n.tag) {
    case 5:
        se || Xt(n, t);
    case 6:
        var r = ee
          , i = De;
        ee = null,
        Je(e, t, n),
        ee = r,
        De = i,
        ee !== null && (De ? (e = ee,
        n = n.stateNode,
        e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : ee.removeChild(n.stateNode));
        break;
    case 18:
        ee !== null && (De ? (e = ee,
        n = n.stateNode,
        e.nodeType === 8 ? ts(e.parentNode, n) : e.nodeType === 1 && ts(e, n),
        Kn(e)) : ts(ee, n.stateNode));
        break;
    case 4:
        r = ee,
        i = De,
        ee = n.stateNode.containerInfo,
        De = !0,
        Je(e, t, n),
        ee = r,
        De = i;
        break;
    case 0:
    case 11:
    case 14:
    case 15:
        if (!se && (r = n.updateQueue,
        r !== null && (r = r.lastEffect,
        r !== null))) {
            i = r = r.next;
            do {
                var s = i
                  , o = s.destroy;
                s = s.tag,
                o !== void 0 && (s & 2 || s & 4) && Zs(n, t, o),
                i = i.next
            } while (i !== r)
        }
        Je(e, t, n);
        break;
    case 1:
        if (!se && (Xt(n, t),
        r = n.stateNode,
        typeof r.componentWillUnmount == "function"))
            try {
                r.props = n.memoizedProps,
                r.state = n.memoizedState,
                r.componentWillUnmount()
            } catch (a) {
                W(n, t, a)
            }
        Je(e, t, n);
        break;
    case 21:
        Je(e, t, n);
        break;
    case 22:
        n.mode & 1 ? (se = (r = se) || n.memoizedState !== null,
        Je(e, t, n),
        se = r) : Je(e, t, n);
        break;
    default:
        Je(e, t, n)
    }
}
function fa(e) {
    var t = e.updateQueue;
    if (t !== null) {
        e.updateQueue = null;
        var n = e.stateNode;
        n === null && (n = e.stateNode = new fp),
        t.forEach(function(r) {
            var i = Sp.bind(null, e, r);
            n.has(r) || (n.add(r),
            r.then(i, i))
        })
    }
}
function Pe(e, t) {
    var n = t.deletions;
    if (n !== null)
        for (var r = 0; r < n.length; r++) {
            var i = n[r];
            try {
                var s = e
                  , o = t
                  , a = o;
                e: for (; a !== null; ) {
                    switch (a.tag) {
                    case 5:
                        ee = a.stateNode,
                        De = !1;
                        break e;
                    case 3:
                        ee = a.stateNode.containerInfo,
                        De = !0;
                        break e;
                    case 4:
                        ee = a.stateNode.containerInfo,
                        De = !0;
                        break e
                    }
                    a = a.return
                }
                if (ee === null)
                    throw Error(w(160));
                Ec(s, o, i),
                ee = null,
                De = !1;
                var u = i.alternate;
                u !== null && (u.return = null),
                i.return = null
            } catch (c) {
                W(i, t, c)
            }
        }
    if (t.subtreeFlags & 12854)
        for (t = t.child; t !== null; )
            Tc(t, e),
            t = t.sibling
}
function Tc(e, t) {
    var n = e.alternate
      , r = e.flags;
    switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
        if (Pe(t, e),
        Re(e),
        r & 4) {
            try {
                Fn(3, e, e.return),
                Ti(3, e)
            } catch (k) {
                W(e, e.return, k)
            }
            try {
                Fn(5, e, e.return)
            } catch (k) {
                W(e, e.return, k)
            }
        }
        break;
    case 1:
        Pe(t, e),
        Re(e),
        r & 512 && n !== null && Xt(n, n.return);
        break;
    case 5:
        if (Pe(t, e),
        Re(e),
        r & 512 && n !== null && Xt(n, n.return),
        e.flags & 32) {
            var i = e.stateNode;
            try {
                Un(i, "")
            } catch (k) {
                W(e, e.return, k)
            }
        }
        if (r & 4 && (i = e.stateNode,
        i != null)) {
            var s = e.memoizedProps
              , o = n !== null ? n.memoizedProps : s
              , a = e.type
              , u = e.updateQueue;
            if (e.updateQueue = null,
            u !== null)
                try {
                    a === "input" && s.type === "radio" && s.name != null && qa(i, s),
                    Ns(a, o);
                    var c = Ns(a, s);
                    for (o = 0; o < u.length; o += 2) {
                        var g = u[o]
                          , m = u[o + 1];
                        g === "style" ? eu(i, m) : g === "dangerouslySetInnerHTML" ? Xa(i, m) : g === "children" ? Un(i, m) : hl(i, g, m, c)
                    }
                    switch (a) {
                    case "input":
                        xs(i, s);
                        break;
                    case "textarea":
                        Ya(i, s);
                        break;
                    case "select":
                        var h = i._wrapperState.wasMultiple;
                        i._wrapperState.wasMultiple = !!s.multiple;
                        var v = s.value;
                        v != null ? en(i, !!s.multiple, v, !1) : h !== !!s.multiple && (s.defaultValue != null ? en(i, !!s.multiple, s.defaultValue, !0) : en(i, !!s.multiple, s.multiple ? [] : "", !1))
                    }
                    i[Xn] = s
                } catch (k) {
                    W(e, e.return, k)
                }
        }
        break;
    case 6:
        if (Pe(t, e),
        Re(e),
        r & 4) {
            if (e.stateNode === null)
                throw Error(w(162));
            i = e.stateNode,
            s = e.memoizedProps;
            try {
                i.nodeValue = s
            } catch (k) {
                W(e, e.return, k)
            }
        }
        break;
    case 3:
        if (Pe(t, e),
        Re(e),
        r & 4 && n !== null && n.memoizedState.isDehydrated)
            try {
                Kn(t.containerInfo)
            } catch (k) {
                W(e, e.return, k)
            }
        break;
    case 4:
        Pe(t, e),
        Re(e);
        break;
    case 13:
        Pe(t, e),
        Re(e),
        i = e.child,
        i.flags & 8192 && (s = i.memoizedState !== null,
        i.stateNode.isHidden = s,
        !s || i.alternate !== null && i.alternate.memoizedState !== null || (Gl = K())),
        r & 4 && fa(e);
        break;
    case 22:
        if (g = n !== null && n.memoizedState !== null,
        e.mode & 1 ? (se = (c = se) || g,
        Pe(t, e),
        se = c) : Pe(t, e),
        Re(e),
        r & 8192) {
            if (c = e.memoizedState !== null,
            (e.stateNode.isHidden = c) && !g && e.mode & 1)
                for (S = e,
                g = e.child; g !== null; ) {
                    for (m = S = g; S !== null; ) {
                        switch (h = S,
                        v = h.child,
                        h.tag) {
                        case 0:
                        case 11:
                        case 14:
                        case 15:
                            Fn(4, h, h.return);
                            break;
                        case 1:
                            Xt(h, h.return);
                            var y = h.stateNode;
                            if (typeof y.componentWillUnmount == "function") {
                                r = h,
                                n = h.return;
                                try {
                                    t = r,
                                    y.props = t.memoizedProps,
                                    y.state = t.memoizedState,
                                    y.componentWillUnmount()
                                } catch (k) {
                                    W(r, n, k)
                                }
                            }
                            break;
                        case 5:
                            Xt(h, h.return);
                            break;
                        case 22:
                            if (h.memoizedState !== null) {
                                ma(m);
                                continue
                            }
                        }
                        v !== null ? (v.return = h,
                        S = v) : ma(m)
                    }
                    g = g.sibling
                }
            e: for (g = null,
            m = e; ; ) {
                if (m.tag === 5) {
                    if (g === null) {
                        g = m;
                        try {
                            i = m.stateNode,
                            c ? (s = i.style,
                            typeof s.setProperty == "function" ? s.setProperty("display", "none", "important") : s.display = "none") : (a = m.stateNode,
                            u = m.memoizedProps.style,
                            o = u != null && u.hasOwnProperty("display") ? u.display : null,
                            a.style.display = Ja("display", o))
                        } catch (k) {
                            W(e, e.return, k)
                        }
                    }
                } else if (m.tag === 6) {
                    if (g === null)
                        try {
                            m.stateNode.nodeValue = c ? "" : m.memoizedProps
                        } catch (k) {
                            W(e, e.return, k)
                        }
                } else if ((m.tag !== 22 && m.tag !== 23 || m.memoizedState === null || m === e) && m.child !== null) {
                    m.child.return = m,
                    m = m.child;
                    continue
                }
                if (m === e)
                    break e;
                for (; m.sibling === null; ) {
                    if (m.return === null || m.return === e)
                        break e;
                    g === m && (g = null),
                    m = m.return
                }
                g === m && (g = null),
                m.sibling.return = m.return,
                m = m.sibling
            }
        }
        break;
    case 19:
        Pe(t, e),
        Re(e),
        r & 4 && fa(e);
        break;
    case 21:
        break;
    default:
        Pe(t, e),
        Re(e)
    }
}
function Re(e) {
    var t = e.flags;
    if (t & 2) {
        try {
            e: {
                for (var n = e.return; n !== null; ) {
                    if (Cc(n)) {
                        var r = n;
                        break e
                    }
                    n = n.return
                }
                throw Error(w(160))
            }
            switch (r.tag) {
            case 5:
                var i = r.stateNode;
                r.flags & 32 && (Un(i, ""),
                r.flags &= -33);
                var s = da(e);
                el(e, s, i);
                break;
            case 3:
            case 4:
                var o = r.stateNode.containerInfo
                  , a = da(e);
                Js(e, a, o);
                break;
            default:
                throw Error(w(161))
            }
        } catch (u) {
            W(e, e.return, u)
        }
        e.flags &= -3
    }
    t & 4096 && (e.flags &= -4097)
}
function mp(e, t, n) {
    S = e,
    bc(e)
}
function bc(e, t, n) {
    for (var r = (e.mode & 1) !== 0; S !== null; ) {
        var i = S
          , s = i.child;
        if (i.tag === 22 && r) {
            var o = i.memoizedState !== null || Pr;
            if (!o) {
                var a = i.alternate
                  , u = a !== null && a.memoizedState !== null || se;
                a = Pr;
                var c = se;
                if (Pr = o,
                (se = u) && !c)
                    for (S = i; S !== null; )
                        o = S,
                        u = o.child,
                        o.tag === 22 && o.memoizedState !== null ? ha(i) : u !== null ? (u.return = o,
                        S = u) : ha(i);
                for (; s !== null; )
                    S = s,
                    bc(s),
                    s = s.sibling;
                S = i,
                Pr = a,
                se = c
            }
            pa(e)
        } else
            i.subtreeFlags & 8772 && s !== null ? (s.return = i,
            S = s) : pa(e)
    }
}
function pa(e) {
    for (; S !== null; ) {
        var t = S;
        if (t.flags & 8772) {
            var n = t.alternate;
            try {
                if (t.flags & 8772)
                    switch (t.tag) {
                    case 0:
                    case 11:
                    case 15:
                        se || Ti(5, t);
                        break;
                    case 1:
                        var r = t.stateNode;
                        if (t.flags & 4 && !se)
                            if (n === null)
                                r.componentDidMount();
                            else {
                                var i = t.elementType === t.type ? n.memoizedProps : ze(t.type, n.memoizedProps);
                                r.componentDidUpdate(i, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate)
                            }
                        var s = t.updateQueue;
                        s !== null && Zo(t, s, r);
                        break;
                    case 3:
                        var o = t.updateQueue;
                        if (o !== null) {
                            if (n = null,
                            t.child !== null)
                                switch (t.child.tag) {
                                case 5:
                                    n = t.child.stateNode;
                                    break;
                                case 1:
                                    n = t.child.stateNode
                                }
                            Zo(t, o, n)
                        }
                        break;
                    case 5:
                        var a = t.stateNode;
                        if (n === null && t.flags & 4) {
                            n = a;
                            var u = t.memoizedProps;
                            switch (t.type) {
                            case "button":
                            case "input":
                            case "select":
                            case "textarea":
                                u.autoFocus && n.focus();
                                break;
                            case "img":
                                u.src && (n.src = u.src)
                            }
                        }
                        break;
                    case 6:
                        break;
                    case 4:
                        break;
                    case 12:
                        break;
                    case 13:
                        if (t.memoizedState === null) {
                            var c = t.alternate;
                            if (c !== null) {
                                var g = c.memoizedState;
                                if (g !== null) {
                                    var m = g.dehydrated;
                                    m !== null && Kn(m)
                                }
                            }
                        }
                        break;
                    case 19:
                    case 17:
                    case 21:
                    case 22:
                    case 23:
                    case 25:
                        break;
                    default:
                        throw Error(w(163))
                    }
                se || t.flags & 512 && Xs(t)
            } catch (h) {
                W(t, t.return, h)
            }
        }
        if (t === e) {
            S = null;
            break
        }
        if (n = t.sibling,
        n !== null) {
            n.return = t.return,
            S = n;
            break
        }
        S = t.return
    }
}
function ma(e) {
    for (; S !== null; ) {
        var t = S;
        if (t === e) {
            S = null;
            break
        }
        var n = t.sibling;
        if (n !== null) {
            n.return = t.return,
            S = n;
            break
        }
        S = t.return
    }
}
function ha(e) {
    for (; S !== null; ) {
        var t = S;
        try {
            switch (t.tag) {
            case 0:
            case 11:
            case 15:
                var n = t.return;
                try {
                    Ti(4, t)
                } catch (u) {
                    W(t, n, u)
                }
                break;
            case 1:
                var r = t.stateNode;
                if (typeof r.componentDidMount == "function") {
                    var i = t.return;
                    try {
                        r.componentDidMount()
                    } catch (u) {
                        W(t, i, u)
                    }
                }
                var s = t.return;
                try {
                    Xs(t)
                } catch (u) {
                    W(t, s, u)
                }
                break;
            case 5:
                var o = t.return;
                try {
                    Xs(t)
                } catch (u) {
                    W(t, o, u)
                }
            }
        } catch (u) {
            W(t, t.return, u)
        }
        if (t === e) {
            S = null;
            break
        }
        var a = t.sibling;
        if (a !== null) {
            a.return = t.return,
            S = a;
            break
        }
        S = t.return
    }
}
var hp = Math.ceil
  , fi = Ze.ReactCurrentDispatcher
  , Ql = Ze.ReactCurrentOwner
  , Ee = Ze.ReactCurrentBatchConfig
  , _ = 0
  , J = null
  , G = null
  , te = 0
  , ye = 0
  , Jt = xt(0)
  , Y = 0
  , ir = null
  , _t = 0
  , bi = 0
  , Kl = 0
  , On = null
  , de = null
  , Gl = 0
  , pn = 1 / 0
  , $e = null
  , pi = !1
  , tl = null
  , ft = null
  , zr = !1
  , lt = null
  , mi = 0
  , Bn = 0
  , nl = null
  , Ur = -1
  , Wr = 0;
function ae() {
    return _ & 6 ? K() : Ur !== -1 ? Ur : Ur = K()
}
function pt(e) {
    return e.mode & 1 ? _ & 2 && te !== 0 ? te & -te : Xf.transition !== null ? (Wr === 0 && (Wr = fu()),
    Wr) : (e = L,
    e !== 0 || (e = window.event,
    e = e === void 0 ? 16 : xu(e.type)),
    e) : 1
}
function _e(e, t, n, r) {
    if (50 < Bn)
        throw Bn = 0,
        nl = null,
        Error(w(185));
    ar(e, n, r),
    (!(_ & 2) || e !== J) && (e === J && (!(_ & 2) && (bi |= n),
    Y === 4 && it(e, te)),
    he(e, r),
    n === 1 && _ === 0 && !(t.mode & 1) && (pn = K() + 500,
    Ni && wt()))
}
function he(e, t) {
    var n = e.callbackNode;
    Zd(e, t);
    var r = Zr(e, e === J ? te : 0);
    if (r === 0)
        n !== null && No(n),
        e.callbackNode = null,
        e.callbackPriority = 0;
    else if (t = r & -r,
    e.callbackPriority !== t) {
        if (n != null && No(n),
        t === 1)
            e.tag === 0 ? Zf(ga.bind(null, e)) : Fu(ga.bind(null, e)),
            Kf(function() {
                !(_ & 6) && wt()
            }),
            n = null;
        else {
            switch (pu(r)) {
            case 1:
                n = wl;
                break;
            case 4:
                n = cu;
                break;
            case 16:
                n = Yr;
                break;
            case 536870912:
                n = du;
                break;
            default:
                n = Yr
            }
            n = Lc(n, Mc.bind(null, e))
        }
        e.callbackPriority = t,
        e.callbackNode = n
    }
}
function Mc(e, t) {
    if (Ur = -1,
    Wr = 0,
    _ & 6)
        throw Error(w(327));
    var n = e.callbackNode;
    if (ln() && e.callbackNode !== n)
        return null;
    var r = Zr(e, e === J ? te : 0);
    if (r === 0)
        return null;
    if (r & 30 || r & e.expiredLanes || t)
        t = hi(e, r);
    else {
        t = r;
        var i = _;
        _ |= 2;
        var s = zc();
        (J !== e || te !== t) && ($e = null,
        pn = K() + 500,
        Mt(e, t));
        do
            try {
                vp();
                break
            } catch (a) {
                Pc(e, a)
            }
        while (!0);
        Al(),
        fi.current = s,
        _ = i,
        G !== null ? t = 0 : (J = null,
        te = 0,
        t = Y)
    }
    if (t !== 0) {
        if (t === 2 && (i = Ms(e),
        i !== 0 && (r = i,
        t = rl(e, i))),
        t === 1)
            throw n = ir,
            Mt(e, 0),
            it(e, r),
            he(e, K()),
            n;
        if (t === 6)
            it(e, r);
        else {
            if (i = e.current.alternate,
            !(r & 30) && !gp(i) && (t = hi(e, r),
            t === 2 && (s = Ms(e),
            s !== 0 && (r = s,
            t = rl(e, s))),
            t === 1))
                throw n = ir,
                Mt(e, 0),
                it(e, r),
                he(e, K()),
                n;
            switch (e.finishedWork = i,
            e.finishedLanes = r,
            t) {
            case 0:
            case 1:
                throw Error(w(345));
            case 2:
                Ct(e, de, $e);
                break;
            case 3:
                if (it(e, r),
                (r & 130023424) === r && (t = Gl + 500 - K(),
                10 < t)) {
                    if (Zr(e, 0) !== 0)
                        break;
                    if (i = e.suspendedLanes,
                    (i & r) !== r) {
                        ae(),
                        e.pingedLanes |= e.suspendedLanes & i;
                        break
                    }
                    e.timeoutHandle = Rs(Ct.bind(null, e, de, $e), t);
                    break
                }
                Ct(e, de, $e);
                break;
            case 4:
                if (it(e, r),
                (r & 4194240) === r)
                    break;
                for (t = e.eventTimes,
                i = -1; 0 < r; ) {
                    var o = 31 - Ie(r);
                    s = 1 << o,
                    o = t[o],
                    o > i && (i = o),
                    r &= ~s
                }
                if (r = i,
                r = K() - r,
                r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * hp(r / 1960)) - r,
                10 < r) {
                    e.timeoutHandle = Rs(Ct.bind(null, e, de, $e), r);
                    break
                }
                Ct(e, de, $e);
                break;
            case 5:
                Ct(e, de, $e);
                break;
            default:
                throw Error(w(329))
            }
        }
    }
    return he(e, K()),
    e.callbackNode === n ? Mc.bind(null, e) : null
}
function rl(e, t) {
    var n = On;
    return e.current.memoizedState.isDehydrated && (Mt(e, t).flags |= 256),
    e = hi(e, t),
    e !== 2 && (t = de,
    de = n,
    t !== null && il(t)),
    e
}
function il(e) {
    de === null ? de = e : de.push.apply(de, e)
}
function gp(e) {
    for (var t = e; ; ) {
        if (t.flags & 16384) {
            var n = t.updateQueue;
            if (n !== null && (n = n.stores,
            n !== null))
                for (var r = 0; r < n.length; r++) {
                    var i = n[r]
                      , s = i.getSnapshot;
                    i = i.value;
                    try {
                        if (!Le(s(), i))
                            return !1
                    } catch {
                        return !1
                    }
                }
        }
        if (n = t.child,
        t.subtreeFlags & 16384 && n !== null)
            n.return = t,
            t = n;
        else {
            if (t === e)
                break;
            for (; t.sibling === null; ) {
                if (t.return === null || t.return === e)
                    return !0;
                t = t.return
            }
            t.sibling.return = t.return,
            t = t.sibling
        }
    }
    return !0
}
function it(e, t) {
    for (t &= ~Kl,
    t &= ~bi,
    e.suspendedLanes |= t,
    e.pingedLanes &= ~t,
    e = e.expirationTimes; 0 < t; ) {
        var n = 31 - Ie(t)
          , r = 1 << n;
        e[n] = -1,
        t &= ~r
    }
}
function ga(e) {
    if (_ & 6)
        throw Error(w(327));
    ln();
    var t = Zr(e, 0);
    if (!(t & 1))
        return he(e, K()),
        null;
    var n = hi(e, t);
    if (e.tag !== 0 && n === 2) {
        var r = Ms(e);
        r !== 0 && (t = r,
        n = rl(e, r))
    }
    if (n === 1)
        throw n = ir,
        Mt(e, 0),
        it(e, t),
        he(e, K()),
        n;
    if (n === 6)
        throw Error(w(345));
    return e.finishedWork = e.current.alternate,
    e.finishedLanes = t,
    Ct(e, de, $e),
    he(e, K()),
    null
}
function ql(e, t) {
    var n = _;
    _ |= 1;
    try {
        return e(t)
    } finally {
        _ = n,
        _ === 0 && (pn = K() + 500,
        Ni && wt())
    }
}
function Lt(e) {
    lt !== null && lt.tag === 0 && !(_ & 6) && ln();
    var t = _;
    _ |= 1;
    var n = Ee.transition
      , r = L;
    try {
        if (Ee.transition = null,
        L = 1,
        e)
            return e()
    } finally {
        L = r,
        Ee.transition = n,
        _ = t,
        !(_ & 6) && wt()
    }
}
function Yl() {
    ye = Jt.current,
    O(Jt)
}
function Mt(e, t) {
    e.finishedWork = null,
    e.finishedLanes = 0;
    var n = e.timeoutHandle;
    if (n !== -1 && (e.timeoutHandle = -1,
    Qf(n)),
    G !== null)
        for (n = G.return; n !== null; ) {
            var r = n;
            switch (Pl(r),
            r.tag) {
            case 1:
                r = r.type.childContextTypes,
                r != null && ni();
                break;
            case 3:
                dn(),
                O(pe),
                O(le),
                Ol();
                break;
            case 5:
                Fl(r);
                break;
            case 4:
                dn();
                break;
            case 13:
                O(H);
                break;
            case 19:
                O(H);
                break;
            case 10:
                Il(r.type._context);
                break;
            case 22:
            case 23:
                Yl()
            }
            n = n.return
        }
    if (J = e,
    G = e = mt(e.current, null),
    te = ye = t,
    Y = 0,
    ir = null,
    Kl = bi = _t = 0,
    de = On = null,
    Tt !== null) {
        for (t = 0; t < Tt.length; t++)
            if (n = Tt[t],
            r = n.interleaved,
            r !== null) {
                n.interleaved = null;
                var i = r.next
                  , s = n.pending;
                if (s !== null) {
                    var o = s.next;
                    s.next = i,
                    r.next = o
                }
                n.pending = r
            }
        Tt = null
    }
    return e
}
function Pc(e, t) {
    do {
        var n = G;
        try {
            if (Al(),
            Br.current = di,
            ci) {
                for (var r = $.memoizedState; r !== null; ) {
                    var i = r.queue;
                    i !== null && (i.pending = null),
                    r = r.next
                }
                ci = !1
            }
            if (It = 0,
            X = q = $ = null,
            Rn = !1,
            tr = 0,
            Ql.current = null,
            n === null || n.return === null) {
                Y = 1,
                ir = t,
                G = null;
                break
            }
            e: {
                var s = e
                  , o = n.return
                  , a = n
                  , u = t;
                if (t = te,
                a.flags |= 32768,
                u !== null && typeof u == "object" && typeof u.then == "function") {
                    var c = u
                      , g = a
                      , m = g.tag;
                    if (!(g.mode & 1) && (m === 0 || m === 11 || m === 15)) {
                        var h = g.alternate;
                        h ? (g.updateQueue = h.updateQueue,
                        g.memoizedState = h.memoizedState,
                        g.lanes = h.lanes) : (g.updateQueue = null,
                        g.memoizedState = null)
                    }
                    var v = ra(o);
                    if (v !== null) {
                        v.flags &= -257,
                        ia(v, o, a, s, t),
                        v.mode & 1 && na(s, c, t),
                        t = v,
                        u = c;
                        var y = t.updateQueue;
                        if (y === null) {
                            var k = new Set;
                            k.add(u),
                            t.updateQueue = k
                        } else
                            y.add(u);
                        break e
                    } else {
                        if (!(t & 1)) {
                            na(s, c, t),
                            Zl();
                            break e
                        }
                        u = Error(w(426))
                    }
                } else if (B && a.mode & 1) {
                    var z = ra(o);
                    if (z !== null) {
                        !(z.flags & 65536) && (z.flags |= 256),
                        ia(z, o, a, s, t),
                        zl(fn(u, a));
                        break e
                    }
                }
                s = u = fn(u, a),
                Y !== 4 && (Y = 2),
                On === null ? On = [s] : On.push(s),
                s = o;
                do {
                    switch (s.tag) {
                    case 3:
                        s.flags |= 65536,
                        t &= -t,
                        s.lanes |= t;
                        var f = pc(s, u, t);
                        Yo(s, f);
                        break e;
                    case 1:
                        a = u;
                        var d = s.type
                          , p = s.stateNode;
                        if (!(s.flags & 128) && (typeof d.getDerivedStateFromError == "function" || p !== null && typeof p.componentDidCatch == "function" && (ft === null || !ft.has(p)))) {
                            s.flags |= 65536,
                            t &= -t,
                            s.lanes |= t;
                            var x = mc(s, a, t);
                            Yo(s, x);
                            break e
                        }
                    }
                    s = s.return
                } while (s !== null)
            }
            Ac(n)
        } catch (j) {
            t = j,
            G === n && n !== null && (G = n = n.return);
            continue
        }
        break
    } while (!0)
}
function zc() {
    var e = fi.current;
    return fi.current = di,
    e === null ? di : e
}
function Zl() {
    (Y === 0 || Y === 3 || Y === 2) && (Y = 4),
    J === null || !(_t & 268435455) && !(bi & 268435455) || it(J, te)
}
function hi(e, t) {
    var n = _;
    _ |= 2;
    var r = zc();
    (J !== e || te !== t) && ($e = null,
    Mt(e, t));
    do
        try {
            yp();
            break
        } catch (i) {
            Pc(e, i)
        }
    while (!0);
    if (Al(),
    _ = n,
    fi.current = r,
    G !== null)
        throw Error(w(261));
    return J = null,
    te = 0,
    Y
}
function yp() {
    for (; G !== null; )
        Dc(G)
}
function vp() {
    for (; G !== null && !$d(); )
        Dc(G)
}
function Dc(e) {
    var t = _c(e.alternate, e, ye);
    e.memoizedProps = e.pendingProps,
    t === null ? Ac(e) : G = t,
    Ql.current = null
}
function Ac(e) {
    var t = e;
    do {
        var n = t.alternate;
        if (e = t.return,
        t.flags & 32768) {
            if (n = dp(n, t),
            n !== null) {
                n.flags &= 32767,
                G = n;
                return
            }
            if (e !== null)
                e.flags |= 32768,
                e.subtreeFlags = 0,
                e.deletions = null;
            else {
                Y = 6,
                G = null;
                return
            }
        } else if (n = cp(n, t, ye),
        n !== null) {
            G = n;
            return
        }
        if (t = t.sibling,
        t !== null) {
            G = t;
            return
        }
        G = t = e
    } while (t !== null);
    Y === 0 && (Y = 5)
}
function Ct(e, t, n) {
    var r = L
      , i = Ee.transition;
    try {
        Ee.transition = null,
        L = 1,
        xp(e, t, n, r)
    } finally {
        Ee.transition = i,
        L = r
    }
    return null
}
function xp(e, t, n, r) {
    do
        ln();
    while (lt !== null);
    if (_ & 6)
        throw Error(w(327));
    n = e.finishedWork;
    var i = e.finishedLanes;
    if (n === null)
        return null;
    if (e.finishedWork = null,
    e.finishedLanes = 0,
    n === e.current)
        throw Error(w(177));
    e.callbackNode = null,
    e.callbackPriority = 0;
    var s = n.lanes | n.childLanes;
    if (Xd(e, s),
    e === J && (G = J = null,
    te = 0),
    !(n.subtreeFlags & 2064) && !(n.flags & 2064) || zr || (zr = !0,
    Lc(Yr, function() {
        return ln(),
        null
    })),
    s = (n.flags & 15990) !== 0,
    n.subtreeFlags & 15990 || s) {
        s = Ee.transition,
        Ee.transition = null;
        var o = L;
        L = 1;
        var a = _;
        _ |= 4,
        Ql.current = null,
        pp(e, n),
        Tc(n, e),
        Of(_s),
        Xr = !!Is,
        _s = Is = null,
        e.current = n,
        mp(n),
        Ud(),
        _ = a,
        L = o,
        Ee.transition = s
    } else
        e.current = n;
    if (zr && (zr = !1,
    lt = e,
    mi = i),
    s = e.pendingLanes,
    s === 0 && (ft = null),
    Qd(n.stateNode),
    he(e, K()),
    t !== null)
        for (r = e.onRecoverableError,
        n = 0; n < t.length; n++)
            i = t[n],
            r(i.value, {
                componentStack: i.stack,
                digest: i.digest
            });
    if (pi)
        throw pi = !1,
        e = tl,
        tl = null,
        e;
    return mi & 1 && e.tag !== 0 && ln(),
    s = e.pendingLanes,
    s & 1 ? e === nl ? Bn++ : (Bn = 0,
    nl = e) : Bn = 0,
    wt(),
    null
}
function ln() {
    if (lt !== null) {
        var e = pu(mi)
          , t = Ee.transition
          , n = L;
        try {
            if (Ee.transition = null,
            L = 16 > e ? 16 : e,
            lt === null)
                var r = !1;
            else {
                if (e = lt,
                lt = null,
                mi = 0,
                _ & 6)
                    throw Error(w(331));
                var i = _;
                for (_ |= 4,
                S = e.current; S !== null; ) {
                    var s = S
                      , o = s.child;
                    if (S.flags & 16) {
                        var a = s.deletions;
                        if (a !== null) {
                            for (var u = 0; u < a.length; u++) {
                                var c = a[u];
                                for (S = c; S !== null; ) {
                                    var g = S;
                                    switch (g.tag) {
                                    case 0:
                                    case 11:
                                    case 15:
                                        Fn(8, g, s)
                                    }
                                    var m = g.child;
                                    if (m !== null)
                                        m.return = g,
                                        S = m;
                                    else
                                        for (; S !== null; ) {
                                            g = S;
                                            var h = g.sibling
                                              , v = g.return;
                                            if (Nc(g),
                                            g === c) {
                                                S = null;
                                                break
                                            }
                                            if (h !== null) {
                                                h.return = v,
                                                S = h;
                                                break
                                            }
                                            S = v
                                        }
                                }
                            }
                            var y = s.alternate;
                            if (y !== null) {
                                var k = y.child;
                                if (k !== null) {
                                    y.child = null;
                                    do {
                                        var z = k.sibling;
                                        k.sibling = null,
                                        k = z
                                    } while (k !== null)
                                }
                            }
                            S = s
                        }
                    }
                    if (s.subtreeFlags & 2064 && o !== null)
                        o.return = s,
                        S = o;
                    else
                        e: for (; S !== null; ) {
                            if (s = S,
                            s.flags & 2048)
                                switch (s.tag) {
                                case 0:
                                case 11:
                                case 15:
                                    Fn(9, s, s.return)
                                }
                            var f = s.sibling;
                            if (f !== null) {
                                f.return = s.return,
                                S = f;
                                break e
                            }
                            S = s.return
                        }
                }
                var d = e.current;
                for (S = d; S !== null; ) {
                    o = S;
                    var p = o.child;
                    if (o.subtreeFlags & 2064 && p !== null)
                        p.return = o,
                        S = p;
                    else
                        e: for (o = d; S !== null; ) {
                            if (a = S,
                            a.flags & 2048)
                                try {
                                    switch (a.tag) {
                                    case 0:
                                    case 11:
                                    case 15:
                                        Ti(9, a)
                                    }
                                } catch (j) {
                                    W(a, a.return, j)
                                }
                            if (a === o) {
                                S = null;
                                break e
                            }
                            var x = a.sibling;
                            if (x !== null) {
                                x.return = a.return,
                                S = x;
                                break e
                            }
                            S = a.return
                        }
                }
                if (_ = i,
                wt(),
                Be && typeof Be.onPostCommitFiberRoot == "function")
                    try {
                        Be.onPostCommitFiberRoot(xi, e)
                    } catch {}
                r = !0
            }
            return r
        } finally {
            L = n,
            Ee.transition = t
        }
    }
    return !1
}
function ya(e, t, n) {
    t = fn(n, t),
    t = pc(e, t, 1),
    e = dt(e, t, 1),
    t = ae(),
    e !== null && (ar(e, 1, t),
    he(e, t))
}
function W(e, t, n) {
    if (e.tag === 3)
        ya(e, e, n);
    else
        for (; t !== null; ) {
            if (t.tag === 3) {
                ya(t, e, n);
                break
            } else if (t.tag === 1) {
                var r = t.stateNode;
                if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (ft === null || !ft.has(r))) {
                    e = fn(n, e),
                    e = mc(t, e, 1),
                    t = dt(t, e, 1),
                    e = ae(),
                    t !== null && (ar(t, 1, e),
                    he(t, e));
                    break
                }
            }
            t = t.return
        }
}
function wp(e, t, n) {
    var r = e.pingCache;
    r !== null && r.delete(t),
    t = ae(),
    e.pingedLanes |= e.suspendedLanes & n,
    J === e && (te & n) === n && (Y === 4 || Y === 3 && (te & 130023424) === te && 500 > K() - Gl ? Mt(e, 0) : Kl |= n),
    he(e, t)
}
function Ic(e, t) {
    t === 0 && (e.mode & 1 ? (t = kr,
    kr <<= 1,
    !(kr & 130023424) && (kr = 4194304)) : t = 1);
    var n = ae();
    e = qe(e, t),
    e !== null && (ar(e, t, n),
    he(e, n))
}
function kp(e) {
    var t = e.memoizedState
      , n = 0;
    t !== null && (n = t.retryLane),
    Ic(e, n)
}
function Sp(e, t) {
    var n = 0;
    switch (e.tag) {
    case 13:
        var r = e.stateNode
          , i = e.memoizedState;
        i !== null && (n = i.retryLane);
        break;
    case 19:
        r = e.stateNode;
        break;
    default:
        throw Error(w(314))
    }
    r !== null && r.delete(t),
    Ic(e, n)
}
var _c;
_c = function(e, t, n) {
    if (e !== null)
        if (e.memoizedProps !== t.pendingProps || pe.current)
            fe = !0;
        else {
            if (!(e.lanes & n) && !(t.flags & 128))
                return fe = !1,
                up(e, t, n);
            fe = !!(e.flags & 131072)
        }
    else
        fe = !1,
        B && t.flags & 1048576 && Ou(t, si, t.index);
    switch (t.lanes = 0,
    t.tag) {
    case 2:
        var r = t.type;
        $r(e, t),
        e = t.pendingProps;
        var i = an(t, le.current);
        sn(t, n),
        i = Hl(null, t, r, e, i, n);
        var s = $l();
        return t.flags |= 1,
        typeof i == "object" && i !== null && typeof i.render == "function" && i.$$typeof === void 0 ? (t.tag = 1,
        t.memoizedState = null,
        t.updateQueue = null,
        me(r) ? (s = !0,
        ri(t)) : s = !1,
        t.memoizedState = i.state !== null && i.state !== void 0 ? i.state : null,
        Ll(t),
        i.updater = Ei,
        t.stateNode = i,
        i._reactInternals = t,
        Ws(t, r, e, n),
        t = Ks(null, t, r, !0, s, n)) : (t.tag = 0,
        B && s && Ml(t),
        oe(null, t, i, n),
        t = t.child),
        t;
    case 16:
        r = t.elementType;
        e: {
            switch ($r(e, t),
            e = t.pendingProps,
            i = r._init,
            r = i(r._payload),
            t.type = r,
            i = t.tag = Np(r),
            e = ze(r, e),
            i) {
            case 0:
                t = Qs(null, t, r, e, n);
                break e;
            case 1:
                t = oa(null, t, r, e, n);
                break e;
            case 11:
                t = sa(null, t, r, e, n);
                break e;
            case 14:
                t = la(null, t, r, ze(r.type, e), n);
                break e
            }
            throw Error(w(306, r, ""))
        }
        return t;
    case 0:
        return r = t.type,
        i = t.pendingProps,
        i = t.elementType === r ? i : ze(r, i),
        Qs(e, t, r, i, n);
    case 1:
        return r = t.type,
        i = t.pendingProps,
        i = t.elementType === r ? i : ze(r, i),
        oa(e, t, r, i, n);
    case 3:
        e: {
            if (vc(t),
            e === null)
                throw Error(w(387));
            r = t.pendingProps,
            s = t.memoizedState,
            i = s.element,
            Vu(e, t),
            ai(t, r, null, n);
            var o = t.memoizedState;
            if (r = o.element,
            s.isDehydrated)
                if (s = {
                    element: r,
                    isDehydrated: !1,
                    cache: o.cache,
                    pendingSuspenseBoundaries: o.pendingSuspenseBoundaries,
                    transitions: o.transitions
                },
                t.updateQueue.baseState = s,
                t.memoizedState = s,
                t.flags & 256) {
                    i = fn(Error(w(423)), t),
                    t = aa(e, t, r, n, i);
                    break e
                } else if (r !== i) {
                    i = fn(Error(w(424)), t),
                    t = aa(e, t, r, n, i);
                    break e
                } else
                    for (ve = ct(t.stateNode.containerInfo.firstChild),
                    xe = t,
                    B = !0,
                    Ae = null,
                    n = Uu(t, null, r, n),
                    t.child = n; n; )
                        n.flags = n.flags & -3 | 4096,
                        n = n.sibling;
            else {
                if (un(),
                r === i) {
                    t = Ye(e, t, n);
                    break e
                }
                oe(e, t, r, n)
            }
            t = t.child
        }
        return t;
    case 5:
        return Qu(t),
        e === null && Hs(t),
        r = t.type,
        i = t.pendingProps,
        s = e !== null ? e.memoizedProps : null,
        o = i.children,
        Ls(r, i) ? o = null : s !== null && Ls(r, s) && (t.flags |= 32),
        yc(e, t),
        oe(e, t, o, n),
        t.child;
    case 6:
        return e === null && Hs(t),
        null;
    case 13:
        return xc(e, t, n);
    case 4:
        return Rl(t, t.stateNode.containerInfo),
        r = t.pendingProps,
        e === null ? t.child = cn(t, null, r, n) : oe(e, t, r, n),
        t.child;
    case 11:
        return r = t.type,
        i = t.pendingProps,
        i = t.elementType === r ? i : ze(r, i),
        sa(e, t, r, i, n);
    case 7:
        return oe(e, t, t.pendingProps, n),
        t.child;
    case 8:
        return oe(e, t, t.pendingProps.children, n),
        t.child;
    case 12:
        return oe(e, t, t.pendingProps.children, n),
        t.child;
    case 10:
        e: {
            if (r = t.type._context,
            i = t.pendingProps,
            s = t.memoizedProps,
            o = i.value,
            R(li, r._currentValue),
            r._currentValue = o,
            s !== null)
                if (Le(s.value, o)) {
                    if (s.children === i.children && !pe.current) {
                        t = Ye(e, t, n);
                        break e
                    }
                } else
                    for (s = t.child,
                    s !== null && (s.return = t); s !== null; ) {
                        var a = s.dependencies;
                        if (a !== null) {
                            o = s.child;
                            for (var u = a.firstContext; u !== null; ) {
                                if (u.context === r) {
                                    if (s.tag === 1) {
                                        u = Qe(-1, n & -n),
                                        u.tag = 2;
                                        var c = s.updateQueue;
                                        if (c !== null) {
                                            c = c.shared;
                                            var g = c.pending;
                                            g === null ? u.next = u : (u.next = g.next,
                                            g.next = u),
                                            c.pending = u
                                        }
                                    }
                                    s.lanes |= n,
                                    u = s.alternate,
                                    u !== null && (u.lanes |= n),
                                    $s(s.return, n, t),
                                    a.lanes |= n;
                                    break
                                }
                                u = u.next
                            }
                        } else if (s.tag === 10)
                            o = s.type === t.type ? null : s.child;
                        else if (s.tag === 18) {
                            if (o = s.return,
                            o === null)
                                throw Error(w(341));
                            o.lanes |= n,
                            a = o.alternate,
                            a !== null && (a.lanes |= n),
                            $s(o, n, t),
                            o = s.sibling
                        } else
                            o = s.child;
                        if (o !== null)
                            o.return = s;
                        else
                            for (o = s; o !== null; ) {
                                if (o === t) {
                                    o = null;
                                    break
                                }
                                if (s = o.sibling,
                                s !== null) {
                                    s.return = o.return,
                                    o = s;
                                    break
                                }
                                o = o.return
                            }
                        s = o
                    }
            oe(e, t, i.children, n),
            t = t.child
        }
        return t;
    case 9:
        return i = t.type,
        r = t.pendingProps.children,
        sn(t, n),
        i = Te(i),
        r = r(i),
        t.flags |= 1,
        oe(e, t, r, n),
        t.child;
    case 14:
        return r = t.type,
        i = ze(r, t.pendingProps),
        i = ze(r.type, i),
        la(e, t, r, i, n);
    case 15:
        return hc(e, t, t.type, t.pendingProps, n);
    case 17:
        return r = t.type,
        i = t.pendingProps,
        i = t.elementType === r ? i : ze(r, i),
        $r(e, t),
        t.tag = 1,
        me(r) ? (e = !0,
        ri(t)) : e = !1,
        sn(t, n),
        fc(t, r, i),
        Ws(t, r, i, n),
        Ks(null, t, r, !0, e, n);
    case 19:
        return wc(e, t, n);
    case 22:
        return gc(e, t, n)
    }
    throw Error(w(156, t.tag))
}
;
function Lc(e, t) {
    return uu(e, t)
}
function jp(e, t, n, r) {
    this.tag = e,
    this.key = n,
    this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null,
    this.index = 0,
    this.ref = null,
    this.pendingProps = t,
    this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null,
    this.mode = r,
    this.subtreeFlags = this.flags = 0,
    this.deletions = null,
    this.childLanes = this.lanes = 0,
    this.alternate = null
}
function Ce(e, t, n, r) {
    return new jp(e,t,n,r)
}
function Xl(e) {
    return e = e.prototype,
    !(!e || !e.isReactComponent)
}
function Np(e) {
    if (typeof e == "function")
        return Xl(e) ? 1 : 0;
    if (e != null) {
        if (e = e.$$typeof,
        e === yl)
            return 11;
        if (e === vl)
            return 14
    }
    return 2
}
function mt(e, t) {
    var n = e.alternate;
    return n === null ? (n = Ce(e.tag, t, e.key, e.mode),
    n.elementType = e.elementType,
    n.type = e.type,
    n.stateNode = e.stateNode,
    n.alternate = e,
    e.alternate = n) : (n.pendingProps = t,
    n.type = e.type,
    n.flags = 0,
    n.subtreeFlags = 0,
    n.deletions = null),
    n.flags = e.flags & 14680064,
    n.childLanes = e.childLanes,
    n.lanes = e.lanes,
    n.child = e.child,
    n.memoizedProps = e.memoizedProps,
    n.memoizedState = e.memoizedState,
    n.updateQueue = e.updateQueue,
    t = e.dependencies,
    n.dependencies = t === null ? null : {
        lanes: t.lanes,
        firstContext: t.firstContext
    },
    n.sibling = e.sibling,
    n.index = e.index,
    n.ref = e.ref,
    n
}
function Vr(e, t, n, r, i, s) {
    var o = 2;
    if (r = e,
    typeof e == "function")
        Xl(e) && (o = 1);
    else if (typeof e == "string")
        o = 5;
    else
        e: switch (e) {
        case Ut:
            return Pt(n.children, i, s, t);
        case gl:
            o = 8,
            i |= 8;
            break;
        case ms:
            return e = Ce(12, n, t, i | 2),
            e.elementType = ms,
            e.lanes = s,
            e;
        case hs:
            return e = Ce(13, n, t, i),
            e.elementType = hs,
            e.lanes = s,
            e;
        case gs:
            return e = Ce(19, n, t, i),
            e.elementType = gs,
            e.lanes = s,
            e;
        case Qa:
            return Mi(n, i, s, t);
        default:
            if (typeof e == "object" && e !== null)
                switch (e.$$typeof) {
                case Wa:
                    o = 10;
                    break e;
                case Va:
                    o = 9;
                    break e;
                case yl:
                    o = 11;
                    break e;
                case vl:
                    o = 14;
                    break e;
                case tt:
                    o = 16,
                    r = null;
                    break e
                }
            throw Error(w(130, e == null ? e : typeof e, ""))
        }
    return t = Ce(o, n, t, i),
    t.elementType = e,
    t.type = r,
    t.lanes = s,
    t
}
function Pt(e, t, n, r) {
    return e = Ce(7, e, r, t),
    e.lanes = n,
    e
}
function Mi(e, t, n, r) {
    return e = Ce(22, e, r, t),
    e.elementType = Qa,
    e.lanes = n,
    e.stateNode = {
        isHidden: !1
    },
    e
}
function us(e, t, n) {
    return e = Ce(6, e, null, t),
    e.lanes = n,
    e
}
function cs(e, t, n) {
    return t = Ce(4, e.children !== null ? e.children : [], e.key, t),
    t.lanes = n,
    t.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        implementation: e.implementation
    },
    t
}
function Cp(e, t, n, r, i) {
    this.tag = t,
    this.containerInfo = e,
    this.finishedWork = this.pingCache = this.current = this.pendingChildren = null,
    this.timeoutHandle = -1,
    this.callbackNode = this.pendingContext = this.context = null,
    this.callbackPriority = 0,
    this.eventTimes = Wi(0),
    this.expirationTimes = Wi(-1),
    this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0,
    this.entanglements = Wi(0),
    this.identifierPrefix = r,
    this.onRecoverableError = i,
    this.mutableSourceEagerHydrationData = null
}
function Jl(e, t, n, r, i, s, o, a, u) {
    return e = new Cp(e,t,n,a,u),
    t === 1 ? (t = 1,
    s === !0 && (t |= 8)) : t = 0,
    s = Ce(3, null, null, t),
    e.current = s,
    s.stateNode = e,
    s.memoizedState = {
        element: r,
        isDehydrated: n,
        cache: null,
        transitions: null,
        pendingSuspenseBoundaries: null
    },
    Ll(s),
    e
}
function Ep(e, t, n) {
    var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
        $$typeof: $t,
        key: r == null ? null : "" + r,
        children: e,
        containerInfo: t,
        implementation: n
    }
}
function Rc(e) {
    if (!e)
        return gt;
    e = e._reactInternals;
    e: {
        if (Ft(e) !== e || e.tag !== 1)
            throw Error(w(170));
        var t = e;
        do {
            switch (t.tag) {
            case 3:
                t = t.stateNode.context;
                break e;
            case 1:
                if (me(t.type)) {
                    t = t.stateNode.__reactInternalMemoizedMergedChildContext;
                    break e
                }
            }
            t = t.return
        } while (t !== null);
        throw Error(w(171))
    }
    if (e.tag === 1) {
        var n = e.type;
        if (me(n))
            return Ru(e, n, t)
    }
    return t
}
function Fc(e, t, n, r, i, s, o, a, u) {
    return e = Jl(n, r, !0, e, i, s, o, a, u),
    e.context = Rc(null),
    n = e.current,
    r = ae(),
    i = pt(n),
    s = Qe(r, i),
    s.callback = t ?? null,
    dt(n, s, i),
    e.current.lanes = i,
    ar(e, i, r),
    he(e, r),
    e
}
function Pi(e, t, n, r) {
    var i = t.current
      , s = ae()
      , o = pt(i);
    return n = Rc(n),
    t.context === null ? t.context = n : t.pendingContext = n,
    t = Qe(s, o),
    t.payload = {
        element: e
    },
    r = r === void 0 ? null : r,
    r !== null && (t.callback = r),
    e = dt(i, t, o),
    e !== null && (_e(e, i, o, s),
    Or(e, i, o)),
    o
}
function gi(e) {
    if (e = e.current,
    !e.child)
        return null;
    switch (e.child.tag) {
    case 5:
        return e.child.stateNode;
    default:
        return e.child.stateNode
    }
}
function va(e, t) {
    if (e = e.memoizedState,
    e !== null && e.dehydrated !== null) {
        var n = e.retryLane;
        e.retryLane = n !== 0 && n < t ? n : t
    }
}
function eo(e, t) {
    va(e, t),
    (e = e.alternate) && va(e, t)
}
function Tp() {
    return null
}
var Oc = typeof reportError == "function" ? reportError : function(e) {
    console.error(e)
}
;
function to(e) {
    this._internalRoot = e
}
zi.prototype.render = to.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null)
        throw Error(w(409));
    Pi(e, t, null, null)
}
;
zi.prototype.unmount = to.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
        this._internalRoot = null;
        var t = e.containerInfo;
        Lt(function() {
            Pi(null, e, null, null)
        }),
        t[Ge] = null
    }
}
;
function zi(e) {
    this._internalRoot = e
}
zi.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
        var t = gu();
        e = {
            blockedOn: null,
            target: e,
            priority: t
        };
        for (var n = 0; n < rt.length && t !== 0 && t < rt[n].priority; n++)
            ;
        rt.splice(n, 0, e),
        n === 0 && vu(e)
    }
}
;
function no(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11)
}
function Di(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "))
}
function xa() {}
function bp(e, t, n, r, i) {
    if (i) {
        if (typeof r == "function") {
            var s = r;
            r = function() {
                var c = gi(o);
                s.call(c)
            }
        }
        var o = Fc(t, r, e, 0, null, !1, !1, "", xa);
        return e._reactRootContainer = o,
        e[Ge] = o.current,
        Yn(e.nodeType === 8 ? e.parentNode : e),
        Lt(),
        o
    }
    for (; i = e.lastChild; )
        e.removeChild(i);
    if (typeof r == "function") {
        var a = r;
        r = function() {
            var c = gi(u);
            a.call(c)
        }
    }
    var u = Jl(e, 0, !1, null, null, !1, !1, "", xa);
    return e._reactRootContainer = u,
    e[Ge] = u.current,
    Yn(e.nodeType === 8 ? e.parentNode : e),
    Lt(function() {
        Pi(t, u, n, r)
    }),
    u
}
function Ai(e, t, n, r, i) {
    var s = n._reactRootContainer;
    if (s) {
        var o = s;
        if (typeof i == "function") {
            var a = i;
            i = function() {
                var u = gi(o);
                a.call(u)
            }
        }
        Pi(t, o, e, i)
    } else
        o = bp(n, t, e, i, r);
    return gi(o)
}
mu = function(e) {
    switch (e.tag) {
    case 3:
        var t = e.stateNode;
        if (t.current.memoizedState.isDehydrated) {
            var n = Pn(t.pendingLanes);
            n !== 0 && (kl(t, n | 1),
            he(t, K()),
            !(_ & 6) && (pn = K() + 500,
            wt()))
        }
        break;
    case 13:
        Lt(function() {
            var r = qe(e, 1);
            if (r !== null) {
                var i = ae();
                _e(r, e, 1, i)
            }
        }),
        eo(e, 1)
    }
}
;
Sl = function(e) {
    if (e.tag === 13) {
        var t = qe(e, 134217728);
        if (t !== null) {
            var n = ae();
            _e(t, e, 134217728, n)
        }
        eo(e, 134217728)
    }
}
;
hu = function(e) {
    if (e.tag === 13) {
        var t = pt(e)
          , n = qe(e, t);
        if (n !== null) {
            var r = ae();
            _e(n, e, t, r)
        }
        eo(e, t)
    }
}
;
gu = function() {
    return L
}
;
yu = function(e, t) {
    var n = L;
    try {
        return L = e,
        t()
    } finally {
        L = n
    }
}
;
Es = function(e, t, n) {
    switch (t) {
    case "input":
        if (xs(e, n),
        t = n.name,
        n.type === "radio" && t != null) {
            for (n = e; n.parentNode; )
                n = n.parentNode;
            for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'),
            t = 0; t < n.length; t++) {
                var r = n[t];
                if (r !== e && r.form === e.form) {
                    var i = ji(r);
                    if (!i)
                        throw Error(w(90));
                    Ga(r),
                    xs(r, i)
                }
            }
        }
        break;
    case "textarea":
        Ya(e, n);
        break;
    case "select":
        t = n.value,
        t != null && en(e, !!n.multiple, t, !1)
    }
}
;
ru = ql;
iu = Lt;
var Mp = {
    usingClientEntryPoint: !1,
    Events: [cr, Kt, ji, tu, nu, ql]
}
  , Tn = {
    findFiberByHostInstance: Et,
    bundleType: 0,
    version: "18.3.1",
    rendererPackageName: "react-dom"
}
  , Pp = {
    bundleType: Tn.bundleType,
    version: Tn.version,
    rendererPackageName: Tn.rendererPackageName,
    rendererConfig: Tn.rendererConfig,
    overrideHookState: null,
    overrideHookStateDeletePath: null,
    overrideHookStateRenamePath: null,
    overrideProps: null,
    overridePropsDeletePath: null,
    overridePropsRenamePath: null,
    setErrorHandler: null,
    setSuspenseHandler: null,
    scheduleUpdate: null,
    currentDispatcherRef: Ze.ReactCurrentDispatcher,
    findHostInstanceByFiber: function(e) {
        return e = ou(e),
        e === null ? null : e.stateNode
    },
    findFiberByHostInstance: Tn.findFiberByHostInstance || Tp,
    findHostInstancesForRefresh: null,
    scheduleRefresh: null,
    scheduleRoot: null,
    setRefreshHandler: null,
    getCurrentFiber: null,
    reconcilerVersion: "18.3.1-next-f1338f8080-20240426"
};
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Dr = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Dr.isDisabled && Dr.supportsFiber)
        try {
            xi = Dr.inject(Pp),
            Be = Dr
        } catch {}
}
ke.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Mp;
ke.createPortal = function(e, t) {
    var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!no(t))
        throw Error(w(200));
    return Ep(e, t, null, n)
}
;
ke.createRoot = function(e, t) {
    if (!no(e))
        throw Error(w(299));
    var n = !1
      , r = ""
      , i = Oc;
    return t != null && (t.unstable_strictMode === !0 && (n = !0),
    t.identifierPrefix !== void 0 && (r = t.identifierPrefix),
    t.onRecoverableError !== void 0 && (i = t.onRecoverableError)),
    t = Jl(e, 1, !1, null, null, n, !1, r, i),
    e[Ge] = t.current,
    Yn(e.nodeType === 8 ? e.parentNode : e),
    new to(t)
}
;
ke.findDOMNode = function(e) {
    if (e == null)
        return null;
    if (e.nodeType === 1)
        return e;
    var t = e._reactInternals;
    if (t === void 0)
        throw typeof e.render == "function" ? Error(w(188)) : (e = Object.keys(e).join(","),
        Error(w(268, e)));
    return e = ou(t),
    e = e === null ? null : e.stateNode,
    e
}
;
ke.flushSync = function(e) {
    return Lt(e)
}
;
ke.hydrate = function(e, t, n) {
    if (!Di(t))
        throw Error(w(200));
    return Ai(null, e, t, !0, n)
}
;
ke.hydrateRoot = function(e, t, n) {
    if (!no(e))
        throw Error(w(405));
    var r = n != null && n.hydratedSources || null
      , i = !1
      , s = ""
      , o = Oc;
    if (n != null && (n.unstable_strictMode === !0 && (i = !0),
    n.identifierPrefix !== void 0 && (s = n.identifierPrefix),
    n.onRecoverableError !== void 0 && (o = n.onRecoverableError)),
    t = Fc(t, null, e, 1, n ?? null, i, !1, s, o),
    e[Ge] = t.current,
    Yn(e),
    r)
        for (e = 0; e < r.length; e++)
            n = r[e],
            i = n._getVersion,
            i = i(n._source),
            t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, i] : t.mutableSourceEagerHydrationData.push(n, i);
    return new zi(t)
}
;
ke.render = function(e, t, n) {
    if (!Di(t))
        throw Error(w(200));
    return Ai(null, e, t, !1, n)
}
;
ke.unmountComponentAtNode = function(e) {
    if (!Di(e))
        throw Error(w(40));
    return e._reactRootContainer ? (Lt(function() {
        Ai(null, null, e, !1, function() {
            e._reactRootContainer = null,
            e[Ge] = null
        })
    }),
    !0) : !1
}
;
ke.unstable_batchedUpdates = ql;
ke.unstable_renderSubtreeIntoContainer = function(e, t, n, r) {
    if (!Di(n))
        throw Error(w(200));
    if (e == null || e._reactInternals === void 0)
        throw Error(w(38));
    return Ai(e, t, n, !1, r)
}
;
ke.version = "18.3.1-next-f1338f8080-20240426";
function Bc() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
        try {
            __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Bc)
        } catch (e) {
            console.error(e)
        }
}
Bc(),
Ba.exports = ke;
var zp = Ba.exports, Hc, wa = zp;
Hc = wa.createRoot,
wa.hydrateRoot;
const Ot = {
    appName: "LifeGuard AI",
    tagline: "Your intelligent first-aid companion",
    home: "Home",
    guide: "Injury Guide",
    assistant: "AI Assistant",
    emergency: "Emergency",
    medicines: "Medicines",
    tools: "Health Tools",
    learning: "Learning Center",
    settings: "Settings",
    creators: "Creators",
    search: "Search",
    searchPlaceholder: "Search injuries, conditions, or topics...",
    sos: "SOS",
    dailyTip: "Daily Health Tip",
    quickGuide: "Quick Emergency Guide",
    categories: "Categories",
    symptoms: "Symptoms",
    immediateSteps: "Immediate First-Aid Steps",
    doNot: "Things NOT to Do",
    whenToCall: "When to Call Emergency Services",
    recoveryTips: "Recovery Tips",
    preventionTips: "Prevention Tips",
    readAloud: "Read Aloud",
    stop: "Stop",
    disclaimer: "For first-aid education and guidance only. Always contact emergency services for serious conditions.",
    disclaimerFull: "This app is for first-aid education and guidance only. It is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of a qualified healthcare provider with any questions about a medical condition. In a life-threatening emergency, contact your local emergency services immediately.",
    callEmergency: "Call Emergency",
    nearbyHospitals: "Nearby Hospitals",
    voiceInput: "Voice Input",
    send: "Send",
    typeMessage: "Describe your symptoms or injury...",
    aiDisclaimer: "I cannot diagnose medical conditions. This guidance is for educational purposes only. If symptoms suggest a serious or life-threatening condition, contact emergency services immediately.",
    aiIntro: "Hi! Describe your injury or symptoms and I will suggest first-aid steps. How can I help?",
    darkMode: "Dark Mode",
    lightMode: "Light Mode",
    largeText: "Large Text",
    language: "Language",
    notifications: "Notification Reminders",
    theme: "Theme",
    bmi: "BMI Calculator",
    waterIntake: "Water Intake Calculator",
    heartRate: "Heart Rate Info",
    bloodPressure: "Blood Pressure Info",
    firstAidKit: "First-Aid Kit Checklist",
    learnMore: "Learn More",
    viewAll: "View All",
    back: "Back",
    commonUses: "Common Uses",
    sideEffects: "Common Side Effects",
    warnings: "Important Warnings",
    dosing: "Typical Dosing",
    consultProfessional: "Always read the official label and consult a healthcare professional."
}
  , Dp = {
    ...Ot,
    appName: "LifeGuard IA",
    tagline: "Su compañero inteligente de primeros auxilios",
    home: "Inicio",
    guide: "Guía de Lesiones",
    assistant: "Asistente IA",
    emergency: "Emergencia",
    medicines: "Medicinas",
    tools: "Herramientas",
    learning: "Aprendizaje",
    settings: "Ajustes",
    searchPlaceholder: "Buscar lesiones, condiciones o temas...",
    sos: "SOS",
    dailyTip: "Consejo de Salud Diario",
    quickGuide: "Guía Rápida de Emergencia",
    categories: "Categorías",
    symptoms: "Síntomas",
    immediateSteps: "Pasos Inmediatos de Primeros Auxilios",
    doNot: "Lo que NO debes hacer",
    whenToCall: "Cuándo llamar a emergencias",
    recoveryTips: "Consejos de Recuperación",
    preventionTips: "Consejos de Prevención",
    readAloud: "Leer en voz alta",
    stop: "Detener",
    disclaimer: "Solo para educación y guía de primeros auxilios. Contacta siempre a emergencias.",
    callEmergency: "Llamar a Emergencia",
    typeMessage: "Describe tus síntomas o lesión...",
    aiIntro: "¡Hola! Describe tu lesión o síntomas y sugeriré pasos de primeros auxilios.",
    darkMode: "Modo Oscuro",
    lightMode: "Modo Claro",
    largeText: "Texto Grande",
    language: "Idioma",
    notifications: "Recordatorios"
}
  , Ap = {
    ...Ot,
    appName: "LifeGuard IA",
    tagline: "Votre compagnien intelligent de premiers secours",
    home: "Accueil",
    guide: "Guide des Blessures",
    assistant: "Assistant IA",
    emergency: "Urgence",
    medicines: "Médicaments",
    tools: "Outils",
    learning: "Apprentissage",
    settings: "Paramètres",
    searchPlaceholder: "Rechercher blessures, conditions ou sujets...",
    sos: "SOS",
    dailyTip: "Conseil Santé du Jour",
    quickGuide: "Guide d'Urgence Rapide",
    categories: "Catégories",
    symptoms: "Symptômes",
    immediateSteps: "Premiers Secours Immédiats",
    doNot: "À NE PAS faire",
    whenToCall: "Quand appeler les urgences",
    recoveryTips: "Conseils de Récupération",
    preventionTips: "Conseils de Prévention",
    readAloud: "Lire à voix haute",
    stop: "Arrêter",
    disclaimer: "Pour l'éducation et les conseils de premiers secours uniquement.",
    callEmergency: "Appeler l'Urgence",
    typeMessage: "Décrivez vos symptômes ou blessure...",
    aiIntro: "Bonjour ! Décrivez votre blessure et je suggérerai des premiers secours.",
    darkMode: "Mode Sombre",
    lightMode: "Mode Clair",
    largeText: "Grand Texte",
    language: "Langue",
    notifications: "Rappels"
}
  , Ip = {
    ...Ot,
    appName: "LifeGuard KI",
    tagline: "Dein intelligenter Erste-Hilfe-Begleiter",
    home: "Start",
    guide: "Verletzungs-Guide",
    assistant: "KI-Assistent",
    emergency: "Notfall",
    medicines: "Medikamente",
    tools: "Werkzeuge",
    learning: "Lernen",
    settings: "Einstellungen",
    searchPlaceholder: "Verletzungen, Zustände oder Themen suchen...",
    sos: "SOS",
    dailyTip: "Gesundheitstipp des Tages",
    quickGuide: "Schneller Notfall-Guide",
    categories: "Kategorien",
    symptoms: "Symptome",
    immediateSteps: "Sofortige Erste-Hilfe-Maßnahmen",
    doNot: "Was Sie NICHT tun sollten",
    whenToCall: "Wann den Notruf wählen",
    recoveryTips: "Genesungstipps",
    preventionTips: "Präventionstipps",
    readAloud: "Vorlesen",
    stop: "Stopp",
    disclaimer: "Nur für Erste-Hilfe-Ausbildung und Beratung.",
    callEmergency: "Notruf wählen",
    typeMessage: "Beschreiben Sie Ihre Symptome oder Verletzung...",
    aiIntro: "Hallo! Beschreibe deine Verletzung und ich schlage Erste-Hilfe-Schritte vor.",
    darkMode: "Dunkelmodus",
    lightMode: "Hellmodus",
    largeText: "Großer Text",
    language: "Sprache",
    notifications: "Erinnerungen"
}
  , _p = {
    ...Ot,
    appName: "लाइफगार्ड AI",
    tagline: "आपका बुद्धिमान प्राथमिक चिकित्सा साथी",
    home: "होम",
    guide: "चोट गाइड",
    assistant: "AI सहायक",
    emergency: "आपातकाल",
    medicines: "दवाएं",
    tools: "उपकरण",
    learning: "शिक्षा केंद्र",
    settings: "सेटिंग्स",
    searchPlaceholder: "चोट, स्थिति, या विषय खोजें...",
    sos: "SOS",
    dailyTip: "दैनिक स्वास्थ्य टिप",
    quickGuide: "त्वरित आपातकाल गाइड",
    categories: "श्रेणियां",
    symptoms: "लक्षण",
    immediateSteps: "तत्काल प्राथमिक चिकित्सा कदम",
    doNot: "जो न करें",
    whenToCall: "आपातकालीन सेवाओं को कब बुलाएं",
    recoveryTips: "रिकवरी टिप्स",
    preventionTips: "रोकथाम टिप्स",
    readAloud: "जोर से पढ़ें",
    stop: "रोकें",
    disclaimer: "केवल प्राथमिक चिकित्सा शिक्षा के लिए। गंभीर स्थिति में आपातकालीन सेवाओं से संपर्क करें।",
    callEmergency: "आपातकालीन कॉल",
    typeMessage: "अपने लक्षण या चोट का वर्णन करें...",
    aiIntro: "नमस्ते! अपनी चोट का वर्णन करें और मैं प्राथमिक चिकित्सा सुझाऊंगा।",
    darkMode: "डार्क मोड",
    lightMode: "लाइट मोड",
    largeText: "बड़ा टेक्स्ट",
    language: "भाषा",
    notifications: "अनुस्मारक"
}
  , Lp = {
    ...Ot,
    appName: "لايف جارد AI",
    tagline: "رفيقك الذكي للإسعافات الأولية",
    home: "الرئيسية",
    guide: "دليل الإصابات",
    assistant: "مساعد AI",
    emergency: "طوارئ",
    medicines: "الأدوية",
    tools: "أدوات",
    learning: "مركز التعلم",
    settings: "الإعدادات",
    searchPlaceholder: "ابحث عن الإصابات أو الحالات...",
    sos: "SOS",
    dailyTip: "نصيحة صحية يومية",
    quickGuide: "دليل طوارئ سريع",
    categories: "الفئات",
    symptoms: "الأعراض",
    immediateSteps: "خطوات الإسعافات الأولية الفورية",
    doNot: "ما لا يجب فعله",
    whenToCall: "متى تتصل بالطوارئ",
    recoveryTips: "نصائح التعافي",
    preventionTips: "نصائح الوقاية",
    readAloud: "قراءة بصوت عالٍ",
    stop: "إيقاف",
    disclaimer: "للتعليم والإرشاد في الإسعافات الأولية فقط.",
    callEmergency: "اتصل بالطوارئ",
    typeMessage: "صف أعراضك أو إصابتك...",
    aiIntro: "مرحباً! صف إصابتك وسأقترح خطوات الإسعافات الأولية.",
    darkMode: "الوضع الداكن",
    lightMode: "الوضع الفاتح",
    largeText: "نص كبير",
    language: "اللغة",
    notifications: "تذكيرات"
}
  , Rp = {
    ...Ot,
    appName: "LifeGuard AI",
    tagline: "您的智能急救伴侣",
    home: "首页",
    guide: "伤害指南",
    assistant: "AI助手",
    emergency: "紧急",
    medicines: "药物",
    tools: "工具",
    learning: "学习中心",
    settings: "设置",
    searchPlaceholder: "搜索伤害、状况或主题...",
    sos: "SOS",
    dailyTip: "每日健康提示",
    quickGuide: "快速急救指南",
    categories: "类别",
    symptoms: "症状",
    immediateSteps: "即时急救步骤",
    doNot: "不要做的事",
    whenToCall: "何时拨打急救电话",
    recoveryTips: "恢复提示",
    preventionTips: "预防提示",
    readAloud: "朗读",
    stop: "停止",
    disclaimer: "仅供急救教育和指导使用。",
    callEmergency: "拨打急救",
    typeMessage: "描述您的症状或伤害...",
    aiIntro: "您好！描述您的伤害，我会建议急救步骤。",
    darkMode: "深色模式",
    lightMode: "浅色模式",
    largeText: "大字体",
    language: "语言",
    notifications: "提醒"
}
  , ka = {
    en: Ot,
    es: Dp,
    fr: Ap,
    de: Ip,
    hi: _p,
    ar: Lp,
    zh: Rp
}
  , Fp = [{
    code: "en",
    label: "English",
    flag: "🇬🇧"
}]
  , $c = E.createContext(null);
function Op({children: e}) {
    const [t,n] = E.useState( () => localStorage.getItem("lg-theme") || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"))
      , [r,i] = E.useState( () => localStorage.getItem("lg-lang") || "en")
      , [s,o] = E.useState( () => localStorage.getItem("lg-large") === "true")
      , [a,u] = E.useState( () => localStorage.getItem("lg-notif") === "true");
    E.useEffect( () => {
        const g = document.documentElement;
        t === "dark" ? g.classList.add("dark") : g.classList.remove("dark"),
        localStorage.setItem("lg-theme", t)
    }
    , [t]),
    E.useEffect( () => {
        document.documentElement.lang = r,
        localStorage.setItem("lg-lang", r)
    }
    , [r]),
    E.useEffect( () => {
        document.documentElement.classList.toggle("text-large", s),
        localStorage.setItem("lg-large", String(s))
    }
    , [s]),
    E.useEffect( () => {
        localStorage.setItem("lg-notif", String(a))
    }
    , [a]);
    const c = g => ka[r][g] || ka.en[g] || g;
    return l.jsx($c.Provider, {
        value: {
            theme: t,
            toggleTheme: () => n(g => g === "light" ? "dark" : "light"),
            language: r,
            setLanguage: i,
            largeText: s,
            toggleLargeText: () => o(g => !g),
            notifications: a,
            toggleNotifications: () => u(g => !g),
            t: c
        },
        children: e
    })
}
function ge() {
    const e = E.useContext($c);
    if (!e)
        throw new Error("useApp must be used within AppProvider");
    return e
}
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var Bp = {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round"
};
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Hp = e => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase().trim()
  , C = (e, t) => {
    const n = E.forwardRef( ({color: r="currentColor", size: i=24, strokeWidth: s=2, absoluteStrokeWidth: o, className: a="", children: u, ...c}, g) => E.createElement("svg", {
        ref: g,
        ...Bp,
        width: i,
        height: i,
        stroke: r,
        strokeWidth: o ? Number(s) * 24 / Number(i) : s,
        className: ["lucide", `lucide-${Hp(e)}`, a].join(" "),
        ...c
    }, [...t.map( ([m,h]) => E.createElement(m, h)), ...Array.isArray(u) ? u : [u]]));
    return n.displayName = `${e}`,
    n
}
;
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ro = C("Activity", [["path", {
    d: "M22 12h-4l-3 9L9 3l-3 9H2",
    key: "d5dnw9"
}]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const mn = C("AlertTriangle", [["path", {
    d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z",
    key: "c3ski4"
}], ["path", {
    d: "M12 9v4",
    key: "juzpu7"
}], ["path", {
    d: "M12 17h.01",
    key: "p32p05"
}]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $p = C("ArrowRight", [["path", {
    d: "M5 12h14",
    key: "1ays0h"
}], ["path", {
    d: "m12 5 7 7-7 7",
    key: "xquz4c"
}]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const sl = C("Award", [["circle", {
    cx: "12",
    cy: "8",
    r: "6",
    key: "1vp47v"
}], ["path", {
    d: "M15.477 12.89 17 22l-5-3-5 3 1.523-9.11",
    key: "em7aur"
}]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Uc = C("Baby", [["path", {
    d: "M9 12h.01",
    key: "157uk2"
}], ["path", {
    d: "M15 12h.01",
    key: "1k8ypt"
}], ["path", {
    d: "M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5",
    key: "1u7htd"
}], ["path", {
    d: "M19 6.3a9 9 0 0 1 1.8 3.9 2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1",
    key: "5yv0yz"
}]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Sa = C("Bell", [["path", {
    d: "M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9",
    key: "1qo2s2"
}], ["path", {
    d: "M10.3 21a1.94 1.94 0 0 0 3.4 0",
    key: "qgo35s"
}]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const fr = C("BookOpen", [["path", {
    d: "M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z",
    key: "vv98re"
}], ["path", {
    d: "M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z",
    key: "1cyq3y"
}]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Qr = C("Bot", [["path", {
    d: "M12 8V4H8",
    key: "hb8ula"
}], ["rect", {
    width: "16",
    height: "12",
    x: "4",
    y: "8",
    rx: "2",
    key: "enze0r"
}], ["path", {
    d: "M2 14h2",
    key: "vft8re"
}], ["path", {
    d: "M20 14h2",
    key: "4cs60a"
}], ["path", {
    d: "M15 13v2",
    key: "1xurst"
}], ["path", {
    d: "M9 13v2",
    key: "rq6x2g"
}]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Up = C("Brain", [["path", {
    d: "M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z",
    key: "l5xja"
}], ["path", {
    d: "M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z",
    key: "ep3f8r"
}], ["path", {
    d: "M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4",
    key: "1p4c4q"
}], ["path", {
    d: "M17.599 6.5a3 3 0 0 0 .399-1.375",
    key: "tmeiqw"
}], ["path", {
    d: "M6.003 5.125A3 3 0 0 0 6.401 6.5",
    key: "105sqy"
}], ["path", {
    d: "M3.477 10.896a4 4 0 0 1 .585-.396",
    key: "ql3yin"
}], ["path", {
    d: "M19.938 10.5a4 4 0 0 1 .585.396",
    key: "1qfode"
}], ["path", {
    d: "M6 18a4 4 0 0 1-1.967-.516",
    key: "2e4loj"
}], ["path", {
    d: "M19.967 17.484A4 4 0 0 1 18 18",
    key: "159ez6"
}]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Wc = C("Bug", [["path", {
    d: "m8 2 1.88 1.88",
    key: "fmnt4t"
}], ["path", {
    d: "M14.12 3.88 16 2",
    key: "qol33r"
}], ["path", {
    d: "M9 7.13v-1a3.003 3.003 0 1 1 6 0v1",
    key: "d7y7pr"
}], ["path", {
    d: "M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6",
    key: "xs1cw7"
}], ["path", {
    d: "M12 20v-9",
    key: "1qisl0"
}], ["path", {
    d: "M6.53 9C4.6 8.8 3 7.1 3 5",
    key: "32zzws"
}], ["path", {
    d: "M6 13H2",
    key: "82j7cp"
}], ["path", {
    d: "M3 21c0-2.1 1.7-3.9 3.8-4",
    key: "4p0ekp"
}], ["path", {
    d: "M20.97 5c0 2.1-1.6 3.8-3.5 4",
    key: "18gb23"
}], ["path", {
    d: "M22 13h-4",
    key: "1jl80f"
}], ["path", {
    d: "M17.2 17c2.1.1 3.8 1.9 3.8 4",
    key: "k3fwyw"
}]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Wp = C("Building2", [["path", {
    d: "M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z",
    key: "1b4qmf"
}], ["path", {
    d: "M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2",
    key: "i71pzd"
}], ["path", {
    d: "M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2",
    key: "10jefs"
}], ["path", {
    d: "M10 6h4",
    key: "1itunk"
}], ["path", {
    d: "M10 10h4",
    key: "tcdvrf"
}], ["path", {
    d: "M10 14h4",
    key: "kelpxr"
}], ["path", {
    d: "M10 18h4",
    key: "1ulq68"
}]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Vp = C("Calculator", [["rect", {
    width: "16",
    height: "20",
    x: "4",
    y: "2",
    rx: "2",
    key: "1nb95v"
}], ["line", {
    x1: "8",
    x2: "16",
    y1: "6",
    y2: "6",
    key: "x4nwl0"
}], ["line", {
    x1: "16",
    x2: "16",
    y1: "14",
    y2: "18",
    key: "wjye3r"
}], ["path", {
    d: "M16 10h.01",
    key: "1m94wz"
}], ["path", {
    d: "M12 10h.01",
    key: "1nrarc"
}], ["path", {
    d: "M8 10h.01",
    key: "19clt8"
}], ["path", {
    d: "M12 14h.01",
    key: "1etili"
}], ["path", {
    d: "M8 14h.01",
    key: "6423bh"
}], ["path", {
    d: "M12 18h.01",
    key: "mhygvu"
}], ["path", {
    d: "M8 18h.01",
    key: "lrp35t"
}]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ii = C("CheckCircle2", [["circle", {
    cx: "12",
    cy: "12",
    r: "10",
    key: "1mglay"
}], ["path", {
    d: "m9 12 2 2 4-4",
    key: "dzmm74"
}]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Qp = C("Check", [["path", {
    d: "M20 6 9 17l-5-5",
    key: "1gmf2c"
}]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Kp = C("ChevronDown", [["path", {
    d: "m6 9 6 6 6-6",
    key: "qrunsl"
}]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const io = C("ChevronLeft", [["path", {
    d: "m15 18-6-6 6-6",
    key: "1wnfg3"
}]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ll = C("ChevronRight", [["path", {
    d: "m9 18 6-6-6-6",
    key: "mthhwq"
}]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Gp = C("ClipboardCheck", [["rect", {
    width: "8",
    height: "4",
    x: "8",
    y: "2",
    rx: "1",
    ry: "1",
    key: "tgr4d6"
}], ["path", {
    d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",
    key: "116196"
}], ["path", {
    d: "m9 14 2 2 4-4",
    key: "df797q"
}]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const qp = C("Clock", [["circle", {
    cx: "12",
    cy: "12",
    r: "10",
    key: "1mglay"
}], ["polyline", {
    points: "12 6 12 12 16 14",
    key: "68esgv"
}]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Vc = C("CloudRain", [["path", {
    d: "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242",
    key: "1pljnt"
}], ["path", {
    d: "M16 14v6",
    key: "1j4efv"
}], ["path", {
    d: "M8 14v6",
    key: "17c4r9"
}], ["path", {
    d: "M12 16v6",
    key: "c8a4gj"
}]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const pr = C("Cross", [["path", {
    d: "M11 2a2 2 0 0 0-2 2v5H4a2 2 0 0 0-2 2v2c0 1.1.9 2 2 2h5v5c0 1.1.9 2 2 2h2a2 2 0 0 0 2-2v-5h5a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-5V4a2 2 0 0 0-2-2h-2z",
    key: "1t5g7j"
}]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _i = C("Droplet", [["path", {
    d: "M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z",
    key: "c7niix"
}]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Yp = C("Eye", [["path", {
    d: "M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z",
    key: "rwhkz3"
}], ["circle", {
    cx: "12",
    cy: "12",
    r: "3",
    key: "1v7zrd"
}]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Qc = C("Flame", [["path", {
    d: "M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z",
    key: "96xj49"
}]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Zp = C("Gauge", [["path", {
    d: "m12 14 4-4",
    key: "9kzdfg"
}], ["path", {
    d: "M3.34 19a10 10 0 1 1 17.32 0",
    key: "19p75a"
}]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Xp = C("Globe", [["circle", {
    cx: "12",
    cy: "12",
    r: "10",
    key: "1mglay"
}], ["path", {
    d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",
    key: "13o1zl"
}], ["path", {
    d: "M2 12h20",
    key: "9i4pu4"
}]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const so = C("GraduationCap", [["path", {
    d: "M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z",
    key: "j76jl0"
}], ["path", {
    d: "M22 10v6",
    key: "1lu8f3"
}], ["path", {
    d: "M6 12.5V16a6 3 0 0 0 12 0v-3.5",
    key: "1r8lef"
}]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const yt = C("HeartPulse", [["path", {
    d: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",
    key: "c3ymky"
}], ["path", {
    d: "M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27",
    key: "1uw2ng"
}]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const lo = C("Heart", [["path", {
    d: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",
    key: "c3ymky"
}]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Jp = C("Home", [["path", {
    d: "m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
    key: "y5dka4"
}], ["polyline", {
    points: "9 22 9 12 15 12 15 22",
    key: "e2us08"
}]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ja = C("Info", [["circle", {
    cx: "12",
    cy: "12",
    r: "10",
    key: "1mglay"
}], ["path", {
    d: "M12 16v-4",
    key: "1dtifu"
}], ["path", {
    d: "M12 8h.01",
    key: "e9boi3"
}]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const em = C("Lightbulb", [["path", {
    d: "M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5",
    key: "1gvzjb"
}], ["path", {
    d: "M9 18h6",
    key: "x1upvd"
}], ["path", {
    d: "M10 22h4",
    key: "ceow96"
}]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const tm = C("MapPin", [["path", {
    d: "M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z",
    key: "2oe9fu"
}], ["circle", {
    cx: "12",
    cy: "10",
    r: "3",
    key: "ilqhr7"
}]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const nm = C("Menu", [["line", {
    x1: "4",
    x2: "20",
    y1: "12",
    y2: "12",
    key: "1e0a9i"
}], ["line", {
    x1: "4",
    x2: "20",
    y1: "6",
    y2: "6",
    key: "1owob3"
}], ["line", {
    x1: "4",
    x2: "20",
    y1: "18",
    y2: "18",
    key: "yk5zj1"
}]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const rm = C("Mic", [["path", {
    d: "M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z",
    key: "131961"
}], ["path", {
    d: "M19 10v2a7 7 0 0 1-14 0v-2",
    key: "1vc78b"
}], ["line", {
    x1: "12",
    x2: "12",
    y1: "19",
    y2: "22",
    key: "x3vr5v"
}]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const yi = C("Moon", [["path", {
    d: "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z",
    key: "a7tn18"
}]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const im = C("Navigation", [["polygon", {
    points: "3 11 22 2 13 21 11 13 3 11",
    key: "1ltx0t"
}]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const sm = C("Palette", [["circle", {
    cx: "13.5",
    cy: "6.5",
    r: ".5",
    fill: "currentColor",
    key: "1okk4w"
}], ["circle", {
    cx: "17.5",
    cy: "10.5",
    r: ".5",
    fill: "currentColor",
    key: "f64h9f"
}], ["circle", {
    cx: "8.5",
    cy: "7.5",
    r: ".5",
    fill: "currentColor",
    key: "fotxhn"
}], ["circle", {
    cx: "6.5",
    cy: "12.5",
    r: ".5",
    fill: "currentColor",
    key: "qy21gx"
}], ["path", {
    d: "M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z",
    key: "12rzf8"
}]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Hn = C("Phone", [["path", {
    d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",
    key: "foiqr5"
}]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ol = C("Pill", [["path", {
    d: "m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z",
    key: "wa1lgi"
}], ["path", {
    d: "m8.5 8.5 7 7",
    key: "rvfmvr"
}]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const oo = C("Search", [["circle", {
    cx: "11",
    cy: "11",
    r: "8",
    key: "4ej97u"
}], ["path", {
    d: "m21 21-4.3-4.3",
    key: "1qie3q"
}]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const lm = C("Send", [["path", {
    d: "m22 2-7 20-4-9-9-4Z",
    key: "1q3vgg"
}], ["path", {
    d: "M22 2 11 13",
    key: "nzbqef"
}]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Kc = C("Settings", [["path", {
    d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",
    key: "1qme2f"
}], ["circle", {
    cx: "12",
    cy: "12",
    r: "3",
    key: "1v7zrd"
}]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const om = C("ShieldAlert", [["path", {
    d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
    key: "oel41y"
}], ["path", {
    d: "M12 8v4",
    key: "1got3b"
}], ["path", {
    d: "M12 16h.01",
    key: "1drbdi"
}]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const al = C("ShieldCheck", [["path", {
    d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
    key: "oel41y"
}], ["path", {
    d: "m9 12 2 2 4-4",
    key: "dzmm74"
}]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const sr = C("ShieldPlus", [["path", {
    d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
    key: "oel41y"
}], ["path", {
    d: "M9 12h6",
    key: "1c52cq"
}], ["path", {
    d: "M12 9v6",
    key: "199k2o"
}]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Na = C("Siren", [["path", {
    d: "M7 18v-6a5 5 0 1 1 10 0v6",
    key: "pcx96s"
}], ["path", {
    d: "M5 21a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-1a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2z",
    key: "1b4s83"
}], ["path", {
    d: "M21 12h1",
    key: "jtio3y"
}], ["path", {
    d: "M18.5 4.5 18 5",
    key: "g5sp9y"
}], ["path", {
    d: "M2 12h1",
    key: "1uaihz"
}], ["path", {
    d: "M12 2v1",
    key: "11qlp1"
}], ["path", {
    d: "m4.929 4.929.707.707",
    key: "1i51kw"
}], ["path", {
    d: "M12 12v6",
    key: "3ahymv"
}]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const am = C("Skull", [["circle", {
    cx: "9",
    cy: "12",
    r: "1",
    key: "1vctgf"
}], ["circle", {
    cx: "15",
    cy: "12",
    r: "1",
    key: "1tmaij"
}], ["path", {
    d: "M8 20v2h8v-2",
    key: "ded4og"
}], ["path", {
    d: "m12.5 17-.5-1-.5 1h1z",
    key: "3me087"
}], ["path", {
    d: "M16 20a2 2 0 0 0 1.56-3.25 8 8 0 1 0-11.12 0A2 2 0 0 0 8 20",
    key: "xq9p5u"
}]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const um = C("Snowflake", [["line", {
    x1: "2",
    x2: "22",
    y1: "12",
    y2: "12",
    key: "1dnqot"
}], ["line", {
    x1: "12",
    x2: "12",
    y1: "2",
    y2: "22",
    key: "7eqyqh"
}], ["path", {
    d: "m20 16-4-4 4-4",
    key: "rquw4f"
}], ["path", {
    d: "m4 8 4 4-4 4",
    key: "12s3z9"
}], ["path", {
    d: "m16 4-4 4-4-4",
    key: "1tumq1"
}], ["path", {
    d: "m8 20 4-4 4 4",
    key: "9p200w"
}]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const cm = C("Sparkles", [["path", {
    d: "m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z",
    key: "17u4zn"
}], ["path", {
    d: "M5 3v4",
    key: "bklmnn"
}], ["path", {
    d: "M19 17v4",
    key: "iiml17"
}], ["path", {
    d: "M3 5h4",
    key: "nem4j1"
}], ["path", {
    d: "M17 19h4",
    key: "lbex7p"
}]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const dm = C("Square", [["rect", {
    width: "18",
    height: "18",
    x: "3",
    y: "3",
    rx: "2",
    key: "afitv7"
}]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const fm = C("Stethoscope", [["path", {
    d: "M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3",
    key: "1jd90r"
}], ["path", {
    d: "M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4",
    key: "126ukv"
}], ["circle", {
    cx: "20",
    cy: "10",
    r: "2",
    key: "ts1r5v"
}]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const lr = C("Sun", [["circle", {
    cx: "12",
    cy: "12",
    r: "4",
    key: "4exip2"
}], ["path", {
    d: "M12 2v2",
    key: "tus03m"
}], ["path", {
    d: "M12 20v2",
    key: "1lh1kg"
}], ["path", {
    d: "m4.93 4.93 1.41 1.41",
    key: "149t6j"
}], ["path", {
    d: "m17.66 17.66 1.41 1.41",
    key: "ptbguv"
}], ["path", {
    d: "M2 12h2",
    key: "1t8f8n"
}], ["path", {
    d: "M20 12h2",
    key: "1q8mjw"
}], ["path", {
    d: "m6.34 17.66-1.41 1.41",
    key: "1m8zz5"
}], ["path", {
    d: "m19.07 4.93-1.41 1.41",
    key: "1shlcs"
}]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ao = C("Trophy", [["path", {
    d: "M6 9H4.5a2.5 2.5 0 0 1 0-5H6",
    key: "17hqa7"
}], ["path", {
    d: "M18 9h1.5a2.5 2.5 0 0 0 0-5H18",
    key: "lmptdp"
}], ["path", {
    d: "M4 22h16",
    key: "57wxv0"
}], ["path", {
    d: "M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22",
    key: "1nw9bq"
}], ["path", {
    d: "M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22",
    key: "1np0yb"
}], ["path", {
    d: "M18 2H6v7a6 6 0 0 0 12 0V2Z",
    key: "u46fv3"
}]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ca = C("Type", [["polyline", {
    points: "4 7 4 4 20 4 20 7",
    key: "1nosan"
}], ["line", {
    x1: "9",
    x2: "15",
    y1: "20",
    y2: "20",
    key: "swin9y"
}], ["line", {
    x1: "12",
    x2: "12",
    y1: "4",
    y2: "20",
    key: "1tx1rr"
}]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const pm = C("User", [["path", {
    d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",
    key: "975kel"
}], ["circle", {
    cx: "12",
    cy: "7",
    r: "4",
    key: "17ys0d"
}]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Gc = C("Users", [["path", {
    d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",
    key: "1yyitq"
}], ["circle", {
    cx: "9",
    cy: "7",
    r: "4",
    key: "nufk8"
}], ["path", {
    d: "M22 21v-2a4 4 0 0 0-3-3.87",
    key: "kshegd"
}], ["path", {
    d: "M16 3.13a4 4 0 0 1 0 7.75",
    key: "1da9ce"
}]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const mm = C("Volume2", [["polygon", {
    points: "11 5 6 9 2 9 2 15 6 15 11 19 11 5",
    key: "16drj5"
}], ["path", {
    d: "M15.54 8.46a5 5 0 0 1 0 7.07",
    key: "ltjumu"
}], ["path", {
    d: "M19.07 4.93a10 10 0 0 1 0 14.14",
    key: "1kegas"
}]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const hm = C("Waves", [["path", {
    d: "M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1",
    key: "knzxuh"
}], ["path", {
    d: "M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1",
    key: "2jd2cc"
}], ["path", {
    d: "M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1",
    key: "rd2r6e"
}]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const qc = C("Wind", [["path", {
    d: "M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2",
    key: "1k4u03"
}], ["path", {
    d: "M9.6 4.6A2 2 0 1 1 11 8H2",
    key: "b7d0fd"
}], ["path", {
    d: "M12.6 19.4A2 2 0 1 0 14 16H2",
    key: "1p5cb3"
}]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Yc = C("Wrench", [["path", {
    d: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z",
    key: "cbrjhi"
}]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Zc = C("XCircle", [["circle", {
    cx: "12",
    cy: "12",
    r: "10",
    key: "1mglay"
}], ["path", {
    d: "m15 9-6 6",
    key: "1uzhvr"
}], ["path", {
    d: "m9 9 6 6",
    key: "z0biqf"
}]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Xc = C("X", [["path", {
    d: "M18 6 6 18",
    key: "1bl5f8"
}], ["path", {
    d: "m6 6 12 12",
    key: "d8bk6v"
}]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const gm = C("Zap", [["polygon", {
    points: "13 2 3 14 12 14 11 22 21 10 12 10 13 2",
    key: "45s27k"
}]])
  , ym = [{
    page: "home",
    icon: Jp,
    key: "home"
}, {
    page: "guide",
    icon: fr,
    key: "guide"
}, {
    page: "assistant",
    icon: Qr,
    key: "assistant"
}, {
    page: "emergency",
    icon: Hn,
    key: "emergency"
}, {
    page: "medicines",
    icon: ol,
    key: "medicines"
}, {
    page: "tools",
    icon: Yc,
    key: "tools"
}, {
    page: "learning",
    icon: so,
    key: "learning"
}, {
    page: "creators",
    icon: Gc,
    key: "creators"
}, {
    page: "settings",
    icon: Kc,
    key: "settings"
}];
function vm({current: e, onNavigate: t}) {
    const {t: n, theme: r, toggleTheme: i} = ge()
      , [s,o] = E.useState(!1);
    E.useEffect( () => {
        o(!1)
    }
    , [e]);
    const a = m => {
        t(m)
    }
    ;
    return l.jsxs(l.Fragment, {
        children: [l.jsxs("div", {
            className: "lg:hidden fixed top-0 left-0 right-0 z-40 glass px-4 py-3 flex items-center justify-between",
            children: [l.jsx("button", {
                onClick: () => o(!0),
                className: "p-2 rounded-xl hover:bg-white/10 transition",
                children: l.jsx(nm, {
                    className: "w-6 h-6"
                })
            }), l.jsxs("div", {
                className: "flex items-center gap-2",
                children: [l.jsx("div", {
                    className: "w-8 h-8 rounded-xl gradient-bg-primary flex items-center justify-center",
                    children: l.jsx(yt, {
                        className: "w-5 h-5 text-white"
                    })
                }), l.jsx("span", {
                    className: "font-display font-bold text-lg gradient-text",
                    children: n("appName")
                })]
            }), l.jsx("button", {
                onClick: i,
                className: "p-2 rounded-xl hover:bg-white/10 transition",
                children: r === "dark" ? l.jsx(lr, {
                    className: "w-5 h-5"
                }) : l.jsx(yi, {
                    className: "w-5 h-5"
                })
            })]
        }), s && l.jsxs("div", {
            className: "lg:hidden fixed inset-0 z-50 animate-fade-in",
            children: [l.jsx("div", {
                className: "absolute inset-0 bg-black/50 backdrop-blur-sm",
                onClick: () => o(!1)
            }), l.jsxs("div", {
                className: "absolute left-0 top-0 bottom-0 w-72 glass p-4 overflow-y-auto animate-slide-in-left",
                children: [l.jsxs("div", {
                    className: "flex items-center justify-between mb-8",
                    children: [l.jsx(u, {}), l.jsx("button", {
                        onClick: () => o(!1),
                        className: "p-2 rounded-xl hover:bg-white/10",
                        children: l.jsx(Xc, {
                            className: "w-5 h-5"
                        })
                    })]
                }), l.jsx(c, {
                    current: e,
                    onNavigate: a
                })]
            })]
        }), l.jsxs("aside", {
            className: "hidden lg:flex flex-col fixed left-0 top-0 bottom-0 w-64 glass p-5 z-30",
            children: [l.jsx("div", {
                className: "mb-8",
                children: l.jsx(u, {})
            }), l.jsx("nav", {
                className: "flex-1",
                children: l.jsx(c, {
                    current: e,
                    onNavigate: a
                })
            }), l.jsx(g, {})]
        })]
    });
    function u() {
        return l.jsxs("div", {
            className: "flex items-center gap-3",
            children: [l.jsx("div", {
                className: "w-11 h-11 rounded-2xl gradient-bg-primary flex items-center justify-center shadow-glow animate-pulse-glow",
                children: l.jsx(yt, {
                    className: "w-6 h-6 text-white"
                })
            }), l.jsxs("div", {
                children: [l.jsx("h1", {
                    className: "font-display font-bold text-lg gradient-text leading-tight",
                    children: n("appName")
                }), l.jsx("p", {
                    className: "text-[10px] text-slate-500 dark:text-slate-400 leading-tight",
                    children: n("tagline")
                })]
            })]
        })
    }
    function c({current: m, onNavigate: h}) {
        return l.jsx("ul", {
            className: "space-y-1",
            children: ym.map(v => {
                const y = m === v.page;
                return l.jsx("li", {
                    children: l.jsxs("button", {
                        onClick: () => h(v.page),
                        className: `w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 ${y ? "gradient-bg-primary text-white shadow-lg" : "text-slate-600 dark:text-slate-300 hover:bg-primary-50 dark:hover:bg-white/5"}`,
                        children: [l.jsx(v.icon, {
                            className: "w-5 h-5 shrink-0"
                        }), l.jsx("span", {
                            className: "font-medium text-sm",
                            children: n(v.key)
                        })]
                    })
                }, v.page)
            }
            )
        })
    }
    function g() {
        const {theme: m, toggleTheme: h} = ge();
        return l.jsxs("button", {
            onClick: h,
            className: "w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-slate-600 dark:text-slate-300 hover:bg-primary-50 dark:hover:bg-white/5 transition",
            children: [m === "dark" ? l.jsx(lr, {
                className: "w-5 h-5"
            }) : l.jsx(yi, {
                className: "w-5 h-5"
            }), l.jsx("span", {
                className: "font-medium text-sm",
                children: n(m === "dark" ? "lightMode" : "darkMode")
            })]
        })
    }
}
function Xe({compact: e=!1}) {
    const {t} = ge();
    return e ? l.jsxs("div", {
        className: "glass-card px-4 py-3 flex items-start gap-3 text-xs text-slate-600 dark:text-slate-300",
        children: [l.jsx(mn, {
            className: "w-4 h-4 text-accent-500 shrink-0 mt-0.5"
        }), l.jsx("p", {
            children: t("disclaimer")
        })]
    }) : l.jsxs("div", {
        className: "glass-card p-5 flex items-start gap-4",
        children: [l.jsx("div", {
            className: "w-10 h-10 rounded-2xl gradient-bg-danger flex items-center justify-center shrink-0",
            children: l.jsx(mn, {
                className: "w-5 h-5 text-white"
            })
        }), l.jsxs("div", {
            children: [l.jsx("h3", {
                className: "font-display font-semibold mb-1",
                children: "Important Disclaimer"
            }), l.jsx("p", {
                className: "text-sm text-slate-600 dark:text-slate-300 leading-relaxed",
                children: t("disclaimerFull")
            })]
        })]
    })
}
function xm({open: e, onClose: t, children: n, title: r}) {
    return e ? l.jsxs("div", {
        className: "fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in",
        children: [l.jsx("div", {
            className: "absolute inset-0 bg-black/50 backdrop-blur-sm",
            onClick: t
        }), l.jsxs("div", {
            className: "relative glass-card p-6 w-full max-w-lg max-h-[85vh] overflow-y-auto animate-scale-in",
            children: [l.jsxs("div", {
                className: "flex items-center justify-between mb-4",
                children: [r && l.jsx("h3", {
                    className: "font-display text-xl font-semibold",
                    children: r
                }), l.jsx("button", {
                    onClick: t,
                    className: "ml-auto p-2 rounded-xl hover:bg-slate-200 dark:hover:bg-white/10 transition",
                    children: l.jsx(Xc, {
                        className: "w-5 h-5"
                    })
                })]
            }), n]
        })]
    }) : null
}
function kt({title: e, subtitle: t, icon: n}) {
    return l.jsxs("div", {
        className: "flex items-center gap-3 mb-6",
        children: [n && l.jsx("div", {
            className: "w-12 h-12 rounded-2xl gradient-bg-primary flex items-center justify-center shadow-lg",
            children: l.jsx(n, {
                className: "w-6 h-6 text-white"
            })
        }), l.jsxs("div", {
            children: [l.jsx("h2", {
                className: "font-display text-2xl font-bold",
                children: e
            }), t && l.jsx("p", {
                className: "text-sm text-slate-500 dark:text-slate-400",
                children: t
            })]
        })]
    })
}
function Jc({severity: e}) {
    const t = {
        mild: {
            label: "Mild",
            class: "bg-success-100 text-success-700 dark:bg-success-500/20 dark:text-success-400"
        },
        moderate: {
            label: "Moderate",
            class: "bg-warning-100 text-warning-600 dark:bg-warning-500/20 dark:text-warning-400"
        },
        severe: {
            label: "Severe",
            class: "bg-accent-100 text-accent-700 dark:bg-accent-500/20 dark:text-accent-400"
        },
        critical: {
            label: "Critical",
            class: "bg-danger-100 text-danger-700 dark:bg-danger-500/20 dark:text-danger-400"
        }
    }
      , n = t[e] || t.moderate;
    return l.jsx("span", {
        className: `text-xs font-semibold px-3 py-1 rounded-full ${n.class}`,
        children: n.label
    })
}
function wm() {
    return l.jsxs(l.Fragment, {
        children: [l.jsx("div", {
            className: "bg-blob bg-primary-400",
            style: {
                width: 400,
                height: 400,
                top: -100,
                left: -100
            }
        }), l.jsx("div", {
            className: "bg-blob bg-secondary-400",
            style: {
                width: 350,
                height: 350,
                bottom: -80,
                right: -80
            }
        }), l.jsx("div", {
            className: "bg-blob bg-accent-300",
            style: {
                width: 300,
                height: 300,
                top: "40%",
                right: "20%",
                opacity: .15
            }
        })]
    })
}
const ed = [{
    id: "trauma",
    name: "Trauma & Wounds",
    icon: "Cross"
}, {
    id: "burns",
    name: "Burns & Temperature",
    icon: "Flame"
}, {
    id: "cardiac",
    name: "Cardiac & Neuro",
    icon: "HeartPulse"
}, {
    id: "environmental",
    name: "Environmental",
    icon: "Sun"
}, {
    id: "bites",
    name: "Bites & Stings",
    icon: "Bug"
}, {
    id: "breathing",
    name: "Breathing & Allergic",
    icon: "Wind"
}, {
    id: "pediatric",
    name: "Pediatric & General",
    icon: "Baby"
}]
  , zt = [{
    id: "cuts-bleeding",
    name: "Cuts and Bleeding",
    category: "trauma",
    icon: "Droplet",
    severity: "moderate",
    description: "Minor to moderate cuts and bleeding wounds that require basic first aid.",
    symptoms: ["Visible cut or laceration on the skin", "Bleeding from the wound", "Pain or tenderness", "Redness around the wound"],
    immediateSteps: ["Wash your hands thoroughly before treating the wound.", "Apply direct, firm pressure to the wound with a clean cloth or gauze.", "Elevate the injured area above the level of the heart if possible.", "Clean the wound gently with cool water once bleeding slows.", "Apply an antibiotic ointment and cover with a sterile bandage."],
    doNot: ["Do not remove an embedded object — pad around it instead.", "Do not use harsh chemicals like alcohol or hydrogen peroxide on the wound.", "Do not tie a tourniquet unless trained and bleeding is life-threatening."],
    whenToCall: ["Bleeding is severe or does not stop after 10 minutes of pressure.", "The wound is deep, large, or has a visible foreign object.", "Signs of infection develop (redness, swelling, pus, fever)."],
    recoveryTips: ["Keep the wound clean and dry", "Change the bandage daily", "Watch for signs of infection"],
    preventionTips: ["Keep sharp objects stored safely", "Wear protective gloves when handling sharp items", "Keep work areas well-lit and clutter-free"]
}, {
    id: "burns",
    name: "Burns",
    category: "burns",
    icon: "Flame",
    severity: "moderate",
    description: "Thermal, chemical, or electrical burns to the skin.",
    symptoms: ["Redness or blistering of the skin", "Pain or burning sensation", "Swelling", "Peeling or charred skin in severe cases"],
    immediateSteps: ["Cool the burn immediately under cool (not cold) running water for 10–20 minutes.", "Remove jewelry or tight clothing near the burn before swelling starts.", "Cover the burn loosely with a sterile, non-stick dressing or clean plastic film.", "Take over-the-counter pain relief if needed."],
    doNot: ["Do not apply ice, butter, toothpaste, or any home remedies to the burn.", "Do not break blisters that form.", "Do not peel off clothing stuck to the burn."],
    whenToCall: ["The burn is larger than the palm of your hand.", "The burn is on the face, hands, feet, groin, or a major joint.", "The burn is deep, charred, or appears white and leathery."],
    recoveryTips: ["Keep the area clean", "Avoid sun exposure on the burn", "Do not scratch healing skin"],
    preventionTips: ["Use oven mitts and pot holders", "Set your water heater to a safe temperature", "Keep hot liquids away from children"]
}, {
    id: "fractures",
    name: "Fractures",
    category: "trauma",
    icon: "Bone",
    severity: "severe",
    description: "Broken or cracked bones that require immobilization.",
    symptoms: ["Severe pain at the injury site", "Swelling or bruising", "Visible deformity", "Inability to move or bear weight", "A snapping sound at the time of injury"],
    immediateSteps: ["Keep the person still and do not try to realign the bone.", "Immobilize the injured area with a splint or sling.", "Apply a cold pack wrapped in cloth to reduce swelling.", "Support the injury above heart level if possible.", "Treat for shock if needed: lay the person flat and keep them warm."],
    doNot: ["Do not move the person if a neck, back, or head injury is suspected.", "Do not try to push a bone back into place.", "Do not eat or drink anything in case surgery is needed."],
    whenToCall: ["All suspected fractures require medical evaluation.", "Call emergency services immediately for neck, back, skull, or pelvic fractures.", "If the limb is blue, cold, or numb, treat it as an emergency."],
    recoveryTips: ["Follow the cast or splint care instructions", "Elevate the limb to reduce swelling", "Attend all follow-up appointments"],
    preventionTips: ["Wear seatbelts and helmets", "Use proper safety gear in sports", "Keep floors dry and clutter-free to prevent falls"]
}, {
    id: "sprains-strains",
    name: "Sprains and Strains",
    category: "trauma",
    icon: "Activity",
    severity: "mild",
    description: "Stretching or tearing of ligaments (sprain) or muscles/tendons (strain).",
    symptoms: ["Pain and tenderness", "Swelling and bruising", "Limited ability to move the joint", 'A "pop" sensation at the time of injury'],
    immediateSteps: ["Rest the injured area and stop the activity.", "Apply ice wrapped in a cloth for 15–20 minutes every 2–3 hours.", "Compress with an elastic bandage, not too tight.", "Elevate the injury above heart level."],
    doNot: ["Do not apply heat in the first 48 hours.", "Do not wrap the bandage so tight that it cuts off circulation.", 'Do not try to "walk it off" if you cannot bear weight.'],
    whenToCall: ["You cannot bear any weight on the limb.", 'You heard a "pop" and the joint feels unstable.', "There is severe swelling or obvious deformity."],
    recoveryTips: ["Gradually return to activity", "Do gentle range-of-motion exercises", "Strengthen the area to prevent recurrence"],
    preventionTips: ["Warm up before exercise", "Wear proper footwear", "Strengthen muscles with regular training"]
}, {
    id: "nosebleeds",
    name: "Nosebleeds",
    category: "trauma",
    icon: "Wind",
    severity: "mild",
    description: "Bleeding from the nose, often from dry air or minor trauma.",
    symptoms: ["Blood flowing from one or both nostrils", "Drip of blood down the throat", "Feeling of fullness in the nose"],
    immediateSteps: ["Sit upright and lean slightly forward, not back.", "Pinch the soft part of the nose firmly for 10–15 minutes without releasing.", "Breathe through the mouth.", "Apply a cold compress to the bridge of the nose."],
    doNot: ["Do not tilt the head back — blood can run down the throat.", "Do not blow your nose right after the bleeding stops.", "Do not pack the nose with tissue or cotton."],
    whenToCall: ["Bleeding does not stop after 20–30 minutes of pressure.", "Bleeding is very heavy or caused by a serious injury.", "You feel dizzy or faint."],
    recoveryTips: ["Avoid nose-picking for a few days", "Keep the nasal passages moist", "Avoid strenuous activity for 24 hours"],
    preventionTips: ["Use a humidifier in dry weather", "Avoid picking or blowing the nose forcefully", "Wear protective gear in contact sports"]
}, {
    id: "choking",
    name: "Choking",
    category: "breathing",
    icon: "Wind",
    severity: "critical",
    description: "Blockage of the airway preventing normal breathing.",
    symptoms: ["Inability to speak or cough", "Clutching the throat (universal sign)", "Weak or no breathing", "Bluish lips or skin", "Panic"],
    immediateSteps: ['Ask "Are you choking?" If they cannot answer or cough, act immediately.', "Stand behind the person and give 5 back blows between the shoulder blades.", "If ineffective, give 5 abdominal thrusts (Heimlich maneuver) above the navel.", "Alternate between 5 back blows and 5 abdominal thrusts.", "If the person becomes unconscious, start CPR and call emergency services."],
    doNot: ["Do not perform abdominal thrusts on infants under 1 year — use chest thrusts instead.", "Do not give anything to eat or drink.", "Do not leave the person alone at any point."],
    whenToCall: ["Call emergency services immediately when choking is severe.", "If the person becomes unconscious.", "Even after the object is expelled, seek medical evaluation."],
    recoveryTips: ["Seek a medical check after a serious choking event", "Watch for breathing difficulties"],
    preventionTips: ["Chew food thoroughly", "Avoid talking or laughing with a full mouth", "Keep small objects away from children"]
}, {
    id: "heart-attack",
    name: "Heart Attack Warning Signs",
    category: "cardiac",
    icon: "HeartPulse",
    severity: "critical",
    description: "A blockage of blood flow to the heart muscle. A medical emergency.",
    symptoms: ["Chest pain or pressure lasting more than a few minutes", "Pain spreading to the arm, jaw, neck, or back", "Shortness of breath", "Cold sweat, nausea, or lightheadedness", "Pain may differ in women — fatigue, nausea, back pain"],
    immediateSteps: ["Call emergency services immediately — every minute counts.", "Have the person sit down, stay calm, and rest.", "If prescribed and available, help them take nitroglycerin or aspirin (unless allergic).", "Loosen tight clothing.", "If the person becomes unconscious and stops breathing, begin CPR."],
    doNot: ["Do not drive yourself — have someone else drive or wait for an ambulance.", 'Do not delay calling emergency services to "see if it passes".', "Do not give food or drink."],
    whenToCall: ["Call emergency services immediately at the first sign of a heart attack. Do not wait."],
    recoveryTips: ["Follow the cardiac rehabilitation plan", "Take all prescribed medications", "Adopt a heart-healthy lifestyle"],
    preventionTips: ["Maintain a healthy weight", "Exercise regularly", "Manage stress and blood pressure", "Avoid smoking"]
}, {
    id: "stroke-fast",
    name: "Stroke Warning Signs (FAST)",
    category: "cardiac",
    icon: "Brain",
    severity: "critical",
    description: "A disruption of blood flow to the brain. Use the FAST method to recognize it.",
    symptoms: ["F — Face drooping on one side", "A — Arm weakness (cannot raise both arms)", "S — Speech difficulty (slurred or strange)", "T — Time to call emergency services immediately"],
    immediateSteps: ["Call emergency services immediately — note the time symptoms started.", "Keep the person calm and lying down with the head slightly raised.", "Do not give food, drink, or medication.", "If unconscious but breathing, place in the recovery position.", "Monitor breathing and be ready to start CPR if needed."],
    doNot: ["Do not delay — treatment is time-sensitive.", "Do not give aspirin unless advised by emergency services.", "Do not let the person drive themselves."],
    whenToCall: ["Call emergency services immediately if any FAST sign is present. Every minute matters."],
    recoveryTips: ["Follow the rehabilitation plan", "Attend physical, speech, or occupational therapy", "Take prescribed medications consistently"],
    preventionTips: ["Control blood pressure and diabetes", "Avoid smoking", "Maintain a healthy diet and activity level"]
}, {
    id: "fainting",
    name: "Fainting",
    category: "cardiac",
    icon: "Moon",
    severity: "moderate",
    description: "A brief loss of consciousness, often from low blood flow to the brain.",
    symptoms: ["Sudden lightheadedness or dizziness", "Pale, clammy skin", "Blurred or tunnel vision", "Nausea", "Brief loss of consciousness"],
    immediateSteps: ["Lay the person flat on their back.", "Elevate their legs about 30 cm (12 inches) to improve blood flow.", "Loosen any tight clothing.", "Check breathing and keep the airway open.", "Keep them lying down for at least 10–15 minutes after they wake."],
    doNot: ["Do not sit the person up or stand them up quickly.", "Do not splash cold water or slap their face.", "Do not give food or drink until fully alert."],
    whenToCall: ["The person does not regain consciousness within 1 minute.", "They have chest pain, difficulty breathing, or an irregular heartbeat.", "They are injured in the fall or have a seizure."],
    recoveryTips: ["Stand up slowly after resting", "Stay hydrated", "Identify and avoid triggers"],
    preventionTips: ["Stand up slowly", "Stay hydrated", "Avoid standing for long periods in heat"]
}, {
    id: "seizures",
    name: "Seizures",
    category: "cardiac",
    icon: "Zap",
    severity: "severe",
    description: "Sudden, uncontrolled electrical disturbance in the brain.",
    symptoms: ["Loss of consciousness or awareness", "Uncontrollable jerking movements", "Stiffening of the body", "Confusion after the episode", "Biting the tongue or cheek"],
    immediateSteps: ["Stay calm and time the seizure.", "Clear the area of hard or sharp objects.", "Gently guide the person to the floor and cushion their head.", "Once jerking stops, roll them onto their side (recovery position).", "Stay with them until fully alert."],
    doNot: ["Do not hold the person down or restrain them.", "Do not put anything in their mouth.", "Do not give food or water until fully alert."],
    whenToCall: ["The seizure lasts more than 5 minutes.", "They have difficulty breathing after the seizure.", "It is their first seizure, or seizures repeat without recovery."],
    recoveryTips: ["Rest after the episode", "Follow the prescribed treatment plan", "Track seizure triggers"],
    preventionTips: ["Take medication as prescribed", "Get enough sleep", "Avoid known triggers like flashing lights"]
}, {
    id: "heat-stroke",
    name: "Heat Stroke",
    category: "environmental",
    icon: "Sun",
    severity: "critical",
    description: "A life-threatening condition from the body overheating.",
    symptoms: ["High body temperature (40°C / 104°F or above)", "Hot, dry, or flushed skin", "Confusion or agitation", "Rapid pulse", "Loss of consciousness or seizures"],
    immediateSteps: ["Call emergency services immediately.", "Move the person to a cool, shaded area.", "Remove excess clothing.", "Cool the body rapidly: spray with cool water, fan, and apply ice packs to neck, armpits, and groin.", "If unconscious, place in the recovery position and monitor breathing."],
    doNot: ["Do not give fluids if the person is unconscious or confused.", "Do not use very cold water immersion for elderly patients without guidance.", "Do not delay calling emergency services."],
    whenToCall: ["Call emergency services immediately — heat stroke is life-threatening."],
    recoveryTips: ["Rest in a cool environment for several days", "Rehydrate gradually", "Avoid heat exposure until fully recovered"],
    preventionTips: ["Stay hydrated in hot weather", "Avoid strenuous activity during peak heat", "Wear light, loose clothing"]
}, {
    id: "heat-exhaustion",
    name: "Heat Exhaustion",
    category: "environmental",
    icon: "ThermometerSun",
    severity: "moderate",
    description: "A heat-related condition that can progress to heat stroke if untreated.",
    symptoms: ["Heavy sweating", "Weakness or fatigue", "Dizziness or headache", "Nausea or vomiting", "Cool, moist skin with goosebumps", "Rapid, weak pulse"],
    immediateSteps: ["Move to a cool, shaded, or air-conditioned place.", "Lie down and elevate the legs slightly.", "Loosen tight clothing.", "Drink cool water or a sports drink in small sips.", "Cool the body with a damp cloth or shower."],
    doNot: ["Do not ignore symptoms — heat exhaustion can become heat stroke.", "Do not drink very cold fluids too fast.", "Do not return to heat exposure until fully recovered."],
    whenToCall: ["Symptoms do not improve within 30–60 minutes.", "Confusion, fainting, or a high body temperature develops (call for heat stroke)."],
    recoveryTips: ["Rest for the remainder of the day", "Rehydrate fully", "Avoid heat for 24–48 hours"],
    preventionTips: ["Drink plenty of fluids in hot weather", "Take breaks in the shade", "Avoid heavy activity during peak heat"]
}, {
    id: "hypothermia",
    name: "Hypothermia",
    category: "environmental",
    icon: "Snowflake",
    severity: "severe",
    description: "A dangerously low body temperature from cold exposure.",
    symptoms: ["Shivering", "Cold, pale skin", "Slurred speech or mumbling", "Confusion or drowsiness", "Slow, shallow breathing", "Clumsy movements"],
    immediateSteps: ["Move the person to a warm, dry place.", "Remove wet clothing and replace with dry, warm layers.", "Cover the head, neck, and body with warm blankets.", "Offer warm (not hot) sweet drinks if fully alert.", "Use body heat or warm packs to the core — not the limbs."],
    doNot: ["Do not rub or massage the limbs.", "Do not apply direct heat like a hot bath or heating pad.", "Do not give alcohol."],
    whenToCall: ["The person is confused, drowsy, or unconscious.", "Shivering has stopped but the person is still cold.", "Body temperature appears very low."],
    recoveryTips: ["Warm up gradually", "Monitor for irregular heartbeat", "Seek medical evaluation after significant hypothermia"],
    preventionTips: ["Dress in layers in cold weather", "Stay dry", "Carry emergency blankets in cold regions"]
}, {
    id: "snake-bites",
    name: "Snake Bites",
    category: "bites",
    icon: "Bug",
    severity: "critical",
    description: "Bites from venomous or non-venomous snakes requiring urgent care.",
    symptoms: ["Two puncture wounds", "Pain, swelling, or redness at the site", "Nausea or vomiting", "Difficulty breathing", "Drooping eyelids or blurred vision", "Metallic or rubber taste in the mouth"],
    immediateSteps: ["Call emergency services immediately.", "Keep the person calm and still — movement spreads venom faster.", "Keep the bitten limb still and below heart level.", "Remove rings, watches, and tight clothing near the bite.", "Note the time of the bite and the snake's appearance if safe."],
    doNot: ["Do not cut the wound or try to suck out the venom.", "Do not apply a tourniquet or ice.", "Do not give alcohol or caffeine.", "Do not try to capture the snake."],
    whenToCall: ["Call emergency services immediately for all suspected venomous snake bites."],
    recoveryTips: ["Follow hospital treatment and antivenom guidance", "Rest the affected limb", "Watch for delayed reactions"],
    preventionTips: ["Wear boots and long pants in snake areas", "Use a flashlight at night", "Do not reach into unseen areas"]
}, {
    id: "dog-bites",
    name: "Dog Bites",
    category: "bites",
    icon: "Bug",
    severity: "moderate",
    description: "Bites from dogs that can cause wounds and infection risk.",
    symptoms: ["Puncture wounds or lacerations", "Bleeding", "Pain and swelling", "Redness or warmth around the wound"],
    immediateSteps: ["Wash the wound thoroughly with soap and running water for several minutes.", "Apply gentle pressure with a clean cloth to stop minor bleeding.", "Cover with a sterile bandage.", "Seek medical advice — rabies and tetanus risk must be assessed."],
    doNot: ["Do not close the wound with tape or glue.", "Do not ignore deep puncture wounds.", "Do not assume the dog is vaccinated without confirmation."],
    whenToCall: ["The bite is deep, large, or on the face, hand, or foot.", "You do not know the dog or its vaccination status.", "Signs of infection develop."],
    recoveryTips: ["Keep the wound clean", "Complete any prescribed antibiotics", "Monitor for infection"],
    preventionTips: ["Do not approach unfamiliar dogs", "Never leave young children alone with dogs", "Respect a dog's body language"]
}, {
    id: "insect-stings",
    name: "Insect Stings",
    category: "bites",
    icon: "Bug",
    severity: "mild",
    description: "Stings from bees, wasps, or hornets causing local or allergic reactions.",
    symptoms: ["Sharp pain at the sting site", "Redness and swelling", "Itching", "A small white spot where the stinger entered"],
    immediateSteps: ["Move to a safe area away from the insect.", "Scrape the stinger out sideways with a card — do not pinch.", "Wash the area with soap and water.", "Apply a cold compress to reduce swelling.", "Take an antihistamine if needed for itching."],
    doNot: ["Do not use tweezers to pull the stinger — it can squeeze more venom in.", "Do not scratch the area."],
    whenToCall: ["Signs of a severe allergic reaction appear: swelling of the face, throat, or tongue, difficulty breathing, or dizziness.", "Multiple stings occur.", "The sting is inside the mouth or throat."],
    recoveryTips: ["Keep the area clean", "Apply hydrocortisone cream for itching", "Watch for delayed allergy signs"],
    preventionTips: ["Avoid bright clothing and perfumes outdoors", "Do not disturb nests", "Wear shoes in grass"]
}, {
    id: "eye-injuries",
    name: "Eye Injuries",
    category: "trauma",
    icon: "Eye",
    severity: "severe",
    description: "Injuries to the eye from foreign objects, chemicals, or trauma.",
    symptoms: ["Pain or discomfort in the eye", "Redness or watering", "Blurred or reduced vision", "Sensitivity to light", "Visible foreign object or bleeding"],
    immediateSteps: ["Do not rub the eye.", "For a foreign object, flush the eye gently with clean water or saline.", "For chemical exposure, flush the eye continuously with water for at least 15 minutes.", "Cover the eye loosely with a sterile pad or clean cloth."],
    doNot: ["Do not remove an object embedded in the eye.", "Do not apply pressure to the eye.", "Do not stop flushing a chemical burn early."],
    whenToCall: ["A chemical exposure occurred — flush and call emergency services.", "Vision is reduced or lost.", "An object is embedded in the eye."],
    recoveryTips: ["Follow medical advice for eye protection", "Avoid screen time if advised", "Use prescribed eye drops"],
    preventionTips: ["Wear safety goggles for hazardous tasks", "Keep chemicals labeled and stored safely", "Take screen breaks"]
}, {
    id: "head-injuries",
    name: "Head Injuries",
    category: "trauma",
    icon: "Brain",
    severity: "severe",
    description: "Injury to the head that may involve the brain — monitor closely.",
    symptoms: ["Headache", "Nausea or vomiting", "Confusion or memory loss", "Drowsiness or difficulty waking", "Clear fluid from the ear or nose", "Unequal pupil size"],
    immediateSteps: ["Keep the person still and calm.", "Apply a cold compress to the area — not direct pressure if a fracture is suspected.", "Monitor their level of consciousness closely.", "If drowsy or vomiting, place in the recovery position."],
    doNot: ["Do not move the person if a neck injury is possible.", "Do not give food or drink.", "Do not leave them alone, especially overnight."],
    whenToCall: ["The person lost consciousness, even briefly.", "There is vomiting, confusion, or worsening headache.", "There is clear fluid from the ear or nose, or bruising around the eyes."],
    recoveryTips: ["Rest and avoid screens initially", "Gradually return to activity", "Follow concussion return-to-play guidance"],
    preventionTips: ["Wear helmets for cycling and sports", "Use seatbelts", "Childproof stairs and windows"]
}, {
    id: "poisoning",
    name: "Poisoning",
    category: "environmental",
    icon: "Skull",
    severity: "critical",
    description: "Exposure to a harmful substance by swallowing, breathing, or skin contact.",
    symptoms: ["Nausea or vomiting", "Abdominal pain", "Drowsiness or confusion", "Burns around the mouth", "Difficulty breathing", "Seizures or unconsciousness"],
    immediateSteps: ["Call your local poison control center or emergency services immediately.", "Move the person to fresh air if inhalation is suspected.", "Remove contaminated clothing and rinse the skin if a chemical is involved.", "Save the container or label to share with emergency services."],
    doNot: ["Do not induce vomiting unless told to by poison control.", "Do not give anything to eat or drink unless advised.", "Do not try to neutralize the poison yourself."],
    whenToCall: ["Call emergency services or poison control immediately for any suspected poisoning."],
    recoveryTips: ["Follow all medical guidance", "Attend follow-up checks", "Identify and secure the source"],
    preventionTips: ["Store chemicals and medicines in locked cabinets", "Keep products in original labeled containers", "Use child-resistant packaging"]
}, {
    id: "electric-shock",
    name: "Electric Shock",
    category: "environmental",
    icon: "Zap",
    severity: "critical",
    description: "Injury from contact with an electrical current.",
    symptoms: ["Burns at the entry and exit points", "Muscle pain or spasms", "Numbness or tingling", "Irregular heartbeat", "Difficulty breathing", "Unconsciousness"],
    immediateSteps: ["Do not touch the person until the power source is off.", "Turn off the power at the main switch or use a non-conductive object to separate them.", "Call emergency services immediately.", "Once safe, check breathing and start CPR if needed.", "Treat burns and keep the person still."],
    doNot: ["Do not touch the person while they are still in contact with the current.", "Do not use wet or metal objects to move them.", "Do not move the person unnecessarily — spinal injury is possible."],
    whenToCall: ["Call emergency services for all significant electric shocks, even if the person feels fine."],
    recoveryTips: ["Monitor for heart rhythm changes", "Treat burns as advised", "Attend medical follow-up"],
    preventionTips: ["Keep electrical devices away from water", "Use child-proof outlet covers", "Have wiring inspected regularly"]
}, {
    id: "drowning",
    name: "Drowning",
    category: "environmental",
    icon: "Waves",
    severity: "critical",
    description: "Respiratory impairment from submersion in water.",
    symptoms: ["Coughing or gasping", "Blue lips or skin", "Confusion or lethargy", "Vomiting", "Unconsciousness", "No breathing"],
    immediateSteps: ["Call emergency services immediately.", "Remove the person from the water only if safe to do so.", "Check breathing — if not breathing, begin CPR immediately, starting with rescue breaths.", "Continue CPR until emergency help arrives or the person breathes.", "Keep the person warm and on their side if breathing returns."],
    doNot: ["Do not enter dangerous water to rescue — use a reaching or throwing aid.", "Do not do abdominal thrusts to remove water.", "Do not assume the person is fine after coughing — seek medical evaluation."],
    whenToCall: ["Call emergency services for any drowning event, even if the person seems to recover."],
    recoveryTips: ["Seek medical evaluation for all drowning events", "Watch for delayed breathing problems", "Rest and recover fully"],
    preventionTips: ["Learn to swim", "Supervise children near water", "Wear life jackets", "Avoid alcohol near water"]
}, {
    id: "allergic-reactions",
    name: "Allergic Reactions",
    category: "breathing",
    icon: "Wind",
    severity: "severe",
    description: "Reactions ranging from mild to life-threatening anaphylaxis.",
    symptoms: ["Hives or rash", "Itching or swelling", "Sneezing or watery eyes", "Swelling of lips, tongue, or throat", "Wheezing or difficulty breathing", "Dizziness or collapse"],
    immediateSteps: ["For mild reactions, give an antihistamine and remove the trigger if known.", "For severe reactions (anaphylaxis), use an epinephrine auto-injector immediately.", "Call emergency services after using the auto-injector.", "Lay the person flat with legs raised unless breathing is easier sitting up.", "Be ready to start CPR if needed."],
    doNot: ["Do not delay using an epinephrine auto-injector if anaphylaxis is suspected.", "Do not assume symptoms will pass on their own.", "Do not give oral medication if the throat is swelling."],
    whenToCall: ["There is any swelling of the face, lips, tongue, or throat.", "There is difficulty breathing or wheezing.", "The person feels faint or collapses."],
    recoveryTips: ["Carry an epinephrine auto-injector if prescribed", "Identify and avoid triggers", "Wear medical identification"],
    preventionTips: ["Know your allergens", "Read food labels carefully", "Carry emergency medication"]
}, {
    id: "asthma-attacks",
    name: "Asthma Attacks",
    category: "breathing",
    icon: "Wind",
    severity: "severe",
    description: "A sudden worsening of asthma symptoms causing breathing difficulty.",
    symptoms: ["Wheezing or whistling breath", "Shortness of breath", "Chest tightness", "Coughing", "Difficulty speaking in full sentences", "Blue lips or fingertips in severe cases"],
    immediateSteps: ["Help the person sit upright and stay calm.", "Help them use their reliever inhaler (usually blue) — 1 puff every 30–60 seconds, up to 10 puffs.", "Loosen tight clothing.", "If there is no improvement or symptoms worsen, call emergency services."],
    doNot: ["Do not let the person lie flat.", "Do not take them outside into cold or dry air.", "Do not assume the attack will pass without medication."],
    whenToCall: ["The inhaler is not helping or symptoms worsen.", "The person cannot speak in full sentences.", "Lips or fingertips turn blue."],
    recoveryTips: ["Follow the asthma action plan", "Use preventer inhalers as prescribed", "Identify and avoid triggers"],
    preventionTips: ["Use preventer medication regularly", "Avoid known triggers", "Get an annual flu vaccine"]
}, {
    id: "diabetic-emergencies",
    name: "Diabetic Emergencies",
    category: "breathing",
    icon: "Droplet",
    severity: "severe",
    description: "Low (hypoglycemia) or high (hyperglycemia) blood sugar emergencies.",
    symptoms: ["Hypoglycemia: sweating, shaking, confusion, hunger, drowsiness", "Slurred speech or unusual behavior", "Hyperglycemia: extreme thirst, frequent urination, fruity breath", "Drowsiness or unconsciousness"],
    immediateSteps: ["If conscious and hypoglycemia is suspected, give fast-acting sugar (juice, glucose tablets, candy).", "Wait 10–15 minutes and recheck — repeat if still low.", "Follow with a longer-acting carbohydrate like bread or biscuits.", "If unconscious, place in the recovery position and call emergency services immediately."],
    doNot: ["Do not give food or drink to an unconscious person.", "Do not give insulin unless you are certain blood sugar is high.", "Do not delay calling emergency services if the person is drowsy."],
    whenToCall: ["The person becomes unconscious.", "They do not improve after treatment.", "You are unsure whether it is high or low blood sugar."],
    recoveryTips: ["Follow the diabetes management plan", "Monitor blood sugar regularly", "Carry fast-acting sugar"],
    preventionTips: ["Eat meals on a regular schedule", "Monitor blood sugar as advised", "Carry a diabetes ID"]
}, {
    id: "cpr-guidance",
    name: "CPR Guidance (Educational Overview)",
    category: "cardiac",
    icon: "HeartPulse",
    severity: "critical",
    description: "An educational overview of CPR. Hands-on training with a certified instructor is strongly recommended.",
    symptoms: ["The person is unresponsive", "They are not breathing normally", "No pulse is detectable"],
    immediateSteps: ["Check for responsiveness and normal breathing.", "Call emergency services and ask for an AED if available.", "Place the heel of one hand on the center of the chest, the other on top.", "Push hard and fast — at least 5 cm deep, 100–120 compressions per minute.", "Allow the chest to fully recoil between compressions.", "If trained, give 30 compressions followed by 2 rescue breaths.", "Use an AED as soon as it arrives and follow its voice prompts."],
    doNot: ["Do not stop CPR until help arrives, the person responds, or you are too exhausted.", "Do not lean on the chest between compressions.", "This overview does not replace certified CPR training."],
    whenToCall: ["Call emergency services immediately for any unresponsive person not breathing normally."],
    recoveryTips: ["Encourage all responders to seek support after a CPR event", "Get certified in CPR and first aid"],
    preventionTips: ["Learn CPR through a certified course", "Know the location of AEDs in your area", "Encourage family to learn CPR too"]
}];
function uo(e) {
    return zt.find(t => t.id === e)
}
const td = [{
    country: "United States / Canada",
    code: "US",
    flag: "🇺🇸",
    numbers: [{
        label: "General Emergency",
        number: "911"
    }, {
        label: "Poison Control",
        number: "1-800-222-1222"
    }]
}, {
    country: "United Kingdom",
    code: "GB",
    flag: "🇬🇧",
    numbers: [{
        label: "General Emergency",
        number: "999"
    }, {
        label: "Non-emergency",
        number: "111"
    }]
}, {
    country: "European Union",
    code: "EU",
    flag: "🇪🇺",
    numbers: [{
        label: "General Emergency",
        number: "112"
    }]
}, {
    country: "Australia",
    code: "AU",
    flag: "🇦🇺",
    numbers: [{
        label: "General Emergency",
        number: "000"
    }, {
        label: "Mobile Emergency",
        number: "112"
    }]
}, {
    country: "India",
    code: "IN",
    flag: "🇮🇳",
    numbers: [{
        label: "General Emergency",
        number: "112"
    }, {
        label: "Ambulance",
        number: "108"
    }]
}, {
    country: "Japan",
    code: "JP",
    flag: "🇯🇵",
    numbers: [{
        label: "Police",
        number: "110"
    }, {
        label: "Ambulance / Fire",
        number: "119"
    }]
}, {
    country: "UAE",
    code: "AE",
    flag: "🇦🇪",
    numbers: [{
        label: "General Emergency",
        number: "999"
    }, {
        label: "Ambulance",
        number: "998"
    }]
}, {
    country: "Brazil",
    code: "BR",
    flag: "🇧🇷",
    numbers: [{
        label: "General Emergency",
        number: "192"
    }]
}]
  , Ea = ["Drink at least 8 glasses of water a day to stay properly hydrated.", "Wash your hands for at least 20 seconds to prevent the spread of germs.", "Learn basic CPR — it can double or triple a cardiac arrest victim's chance of survival.", "Keep a well-stocked first-aid kit at home, in the car, and when travelling.", "Know your blood pressure numbers — high blood pressure often has no symptoms.", "In an emergency, staying calm helps you think clearly and act faster.", "Always check the expiry date on medicines before use.", "A balanced diet with fruits and vegetables supports your immune system.", "Stretching daily improves circulation and reduces injury risk.", "Know the FAST signs of stroke — quick action saves brains and lives.", "Never ignore severe or sudden chest pain — seek help immediately.", "Apply sunscreen with at least SPF 30 to protect your skin.", "Get 7–9 hours of sleep — rest is essential for recovery and focus.", "Take regular screen breaks to protect your eyes and posture.", "Keep emergency numbers saved in your phone and visible at home."];
function km() {
    const e = Math.floor(Date.now() / 864e5);
    return Ea[e % Ea.length]
}
const Sm = {
    Activity: ro,
    Flame: Qc,
    HeartPulse: yt,
    Sun: lr,
    Bug: Wc,
    Wind: qc,
    Baby: Uc,
    Cross: pr,
    Droplet: _i,
    ShieldPlus: sr
};
function jm({onNavigate: e, onSelectInjury: t}) {
    const {t: n} = ge()
      , [r,i] = E.useState("")
      , [s,o] = E.useState(!1)
      , a = r ? zt.filter(c => c.name.toLowerCase().includes(r.toLowerCase()) || c.description.toLowerCase().includes(r.toLowerCase())) : []
      , u = ["heart-attack", "stroke-fast", "choking", "cpr-guidance", "burns", "cuts-bleeding"];
    return l.jsxs("div", {
        className: "page-enter space-y-8",
        children: [l.jsxs("div", {
            className: "relative overflow-hidden rounded-3xl gradient-bg-hero p-8 md:p-12 text-white shadow-2xl",
            children: [l.jsx("div", {
                className: "absolute inset-0 opacity-20",
                style: {
                    backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px)",
                    backgroundSize: "24px 24px"
                }
            }), l.jsxs("div", {
                className: "relative z-10 max-w-2xl",
                children: [l.jsxs("div", {
                    className: "inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-sm mb-4 animate-fade-in",
                    children: [l.jsx(yt, {
                        className: "w-4 h-4"
                    }), l.jsx("span", {
                        className: "text-sm font-medium",
                        children: n("tagline")
                    })]
                }), l.jsx("h1", {
                    className: "font-display text-3xl md:text-5xl font-bold mb-3 animate-fade-in-up",
                    children: "Be ready when seconds count"
                }), l.jsx("p", {
                    className: "text-white/80 text-base md:text-lg mb-6 animate-fade-in-up",
                    style: {
                        animationDelay: "0.1s"
                    },
                    children: "Trusted first-aid guidance for everyday injuries and emergencies — clear, calm, and always in your pocket."
                }), l.jsxs("div", {
                    className: "relative max-w-xl animate-fade-in-up",
                    style: {
                        animationDelay: "0.15s"
                    },
                    children: [l.jsx(oo, {
                        className: "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"
                    }), l.jsx("input", {
                        value: r,
                        onChange: c => i(c.target.value),
                        placeholder: n("searchPlaceholder"),
                        className: "w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/90 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-white shadow-lg"
                    }), r.trim() && l.jsx("div", {
                        className: "absolute top-full left-0 right-0 mt-2 glass rounded-2xl overflow-hidden z-20 max-h-72 overflow-y-auto",
                        children: a.length > 0 ? a.map(c => l.jsxs("button", {
                            onClick: () => {
                                t(c.id),
                                i("")
                            }
                            ,
                            className: "w-full text-left px-4 py-3 hover:bg-primary-50 dark:hover:bg-white/5 flex items-center gap-3 text-slate-700 dark:text-slate-200",
                            children: [l.jsx("span", {
                                className: "text-sm font-medium",
                                children: c.name
                            }), l.jsx(ll, {
                                className: "w-4 h-4 ml-auto text-slate-400"
                            })]
                        }, c.id)) : l.jsxs("div", {
                            className: "px-4 py-3 text-sm text-slate-500 dark:text-slate-400",
                            children: ['No guide found for "', r, '". Try a different term, or ask the AI Assistant.']
                        })
                    })]
                })]
            })]
        }), l.jsxs("div", {
            className: "grid md:grid-cols-3 gap-5",
            children: [l.jsxs("button", {
                onClick: () => o(!0),
                className: "md:col-span-1 glass-card p-6 text-left group hover:shadow-glow transition-all",
                children: [l.jsx("div", {
                    className: "w-14 h-14 rounded-2xl gradient-bg-danger flex items-center justify-center mb-4 animate-pulse-glow",
                    children: l.jsx(Na, {
                        className: "w-7 h-7 text-white"
                    })
                }), l.jsx("h3", {
                    className: "font-display text-xl font-bold mb-1",
                    children: "Emergency SOS"
                }), l.jsx("p", {
                    className: "text-sm text-slate-500 dark:text-slate-400",
                    children: "Quick access to emergency numbers and guidance."
                })]
            }), l.jsxs("button", {
                onClick: () => e("assistant"),
                className: "glass-card p-6 text-left group hover:shadow-glow transition-all",
                children: [l.jsx("div", {
                    className: "w-14 h-14 rounded-2xl gradient-bg-primary flex items-center justify-center mb-4",
                    children: l.jsx(ro, {
                        className: "w-7 h-7 text-white"
                    })
                }), l.jsx("h3", {
                    className: "font-display text-xl font-bold mb-1",
                    children: "AI Assistant"
                }), l.jsx("p", {
                    className: "text-sm text-slate-500 dark:text-slate-400",
                    children: "Describe symptoms and get instant first-aid guidance."
                })]
            }), l.jsxs("button", {
                onClick: () => e("tools"),
                className: "glass-card p-6 text-left group hover:shadow-glow transition-all",
                children: [l.jsx("div", {
                    className: "w-14 h-14 rounded-2xl bg-gradient-to-br from-secondary-400 to-primary-500 flex items-center justify-center mb-4",
                    children: l.jsx(sr, {
                        className: "w-7 h-7 text-white"
                    })
                }), l.jsx("h3", {
                    className: "font-display text-xl font-bold mb-1",
                    children: "Health Tools"
                }), l.jsx("p", {
                    className: "text-sm text-slate-500 dark:text-slate-400",
                    children: "BMI, hydration, heart rate, and a first-aid kit checklist."
                })]
            })]
        }), l.jsxs("section", {
            children: [l.jsxs("div", {
                className: "flex items-center justify-between mb-5",
                children: [l.jsx("h2", {
                    className: "font-display text-2xl font-bold",
                    children: n("categories")
                }), l.jsxs("button", {
                    onClick: () => e("guide"),
                    className: "text-sm font-semibold text-primary-600 dark:text-primary-400 flex items-center gap-1 hover:gap-2 transition-all",
                    children: [n("viewAll"), " ", l.jsx($p, {
                        className: "w-4 h-4"
                    })]
                })]
            }), l.jsx("div", {
                className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4",
                children: ed.map( (c, g) => {
                    const m = Sm[c.icon] || pr
                      , h = zt.filter(v => v.category === c.id).length;
                    return l.jsxs("button", {
                        onClick: () => e("guide"),
                        className: "glass-card p-5 text-left animate-fade-in-up hover:shadow-glow",
                        style: {
                            animationDelay: `${g * .05}s`
                        },
                        children: [l.jsx("div", {
                            className: "w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-500/20 dark:to-secondary-500/20 flex items-center justify-center mb-3",
                            children: l.jsx(m, {
                                className: "w-6 h-6 text-primary-600 dark:text-primary-400"
                            })
                        }), l.jsx("h3", {
                            className: "font-semibold text-sm mb-1",
                            children: c.name
                        }), l.jsxs("p", {
                            className: "text-xs text-slate-500 dark:text-slate-400",
                            children: [h, " guides"]
                        })]
                    }, c.id)
                }
                )
            })]
        }), l.jsxs("div", {
            className: "grid md:grid-cols-2 gap-5",
            children: [l.jsxs("div", {
                className: "glass-card p-6",
                children: [l.jsxs("div", {
                    className: "flex items-center gap-3 mb-3",
                    children: [l.jsx("div", {
                        className: "w-10 h-10 rounded-xl bg-gradient-to-br from-accent-400 to-accent-600 flex items-center justify-center",
                        children: l.jsx(em, {
                            className: "w-5 h-5 text-white"
                        })
                    }), l.jsx("h3", {
                        className: "font-display text-lg font-bold",
                        children: n("dailyTip")
                    })]
                }), l.jsx("p", {
                    className: "text-slate-600 dark:text-slate-300 leading-relaxed",
                    children: km()
                })]
            }), l.jsxs("div", {
                className: "glass-card p-6",
                children: [l.jsxs("h3", {
                    className: "font-display text-lg font-bold mb-4 flex items-center gap-2",
                    children: [l.jsx(Na, {
                        className: "w-5 h-5 text-danger-500"
                    }), " ", n("quickGuide")]
                }), l.jsx("div", {
                    className: "space-y-2",
                    children: u.map(c => {
                        const g = zt.find(m => m.id === c);
                        return g ? l.jsxs("button", {
                            onClick: () => t(c),
                            className: "w-full flex items-center justify-between px-4 py-2.5 rounded-xl hover:bg-primary-50 dark:hover:bg-white/5 transition text-left",
                            children: [l.jsx("span", {
                                className: "text-sm font-medium",
                                children: g.name
                            }), l.jsx(ll, {
                                className: "w-4 h-4 text-slate-400"
                            })]
                        }, c) : null
                    }
                    )
                })]
            })]
        }), l.jsx(Xe, {}), s && l.jsx(Nm, {
            onClose: () => o(!1),
            onSelectInjury: t
        })]
    })
}
function Nm({onClose: e, onSelectInjury: t}) {
    const {t: n} = ge()
      , r = ["heart-attack", "stroke-fast", "choking", "cpr-guidance", "severe-bleeding"];
    return l.jsx(xm, {
        open: !0,
        onClose: e,
        title: "Emergency SOS",
        children: l.jsxs("div", {
            className: "space-y-4",
            children: [l.jsxs("div", {
                className: "rounded-2xl gradient-bg-danger p-4 text-white",
                children: [l.jsx("p", {
                    className: "font-semibold mb-1",
                    children: "If someone is unconscious, not breathing, or in a life-threatening condition:"
                }), l.jsx("p", {
                    className: "text-sm text-white/90",
                    children: "Call your local emergency number immediately and follow dispatcher instructions."
                })]
            }), l.jsxs("div", {
                children: [l.jsx("h4", {
                    className: "font-semibold text-sm mb-2",
                    children: "Emergency Numbers"
                }), l.jsx("div", {
                    className: "grid grid-cols-2 gap-2",
                    children: td.slice(0, 6).map(i => l.jsxs("div", {
                        className: "glass rounded-xl p-3",
                        children: [l.jsxs("p", {
                            className: "text-xs text-slate-500 dark:text-slate-400",
                            children: [i.flag, " ", i.country]
                        }), i.numbers.map(s => l.jsx("a", {
                            href: `tel:${s.number}`,
                            className: "block text-lg font-bold text-danger-600 dark:text-danger-400 hover:underline",
                            children: s.number
                        }, s.number))]
                    }, i.code))
                })]
            }), l.jsxs("div", {
                children: [l.jsx("h4", {
                    className: "font-semibold text-sm mb-2",
                    children: "Critical Guides"
                }), l.jsx("div", {
                    className: "space-y-1.5",
                    children: r.map(i => {
                        const s = zt.find(o => o.id === i);
                        return s ? l.jsx("button", {
                            onClick: () => {
                                t(i),
                                e()
                            }
                            ,
                            className: "w-full text-left px-3 py-2 rounded-xl hover:bg-primary-50 dark:hover:bg-white/5 text-sm font-medium",
                            children: s.name
                        }, i) : null
                    }
                    )
                })]
            }), l.jsx("p", {
                className: "text-xs text-slate-500 dark:text-slate-400 text-center",
                children: n("disclaimer")
            })]
        })
    })
}
function Cm() {
    const [e,t] = E.useState(!1)
      , [n] = E.useState( () => typeof window < "u" && "speechSynthesis"in window)
      , r = E.useRef(null)
      , i = E.useCallback(o => {
        if (!n)
            return;
        window.speechSynthesis.cancel();
        const a = o.replace(/[#*_`>-]/g, "").replace(/\n+/g, ". ")
          , u = new SpeechSynthesisUtterance(a);
        u.rate = .95,
        u.pitch = 1,
        u.onend = () => t(!1),
        u.onerror = () => t(!1),
        r.current = u,
        t(!0),
        window.speechSynthesis.speak(u)
    }
    , [n])
      , s = E.useCallback( () => {
        n && (window.speechSynthesis.cancel(),
        t(!1))
    }
    , [n]);
    return E.useEffect( () => () => {
        n && window.speechSynthesis.cancel()
    }
    , [n]),
    {
        speaking: e,
        speak: i,
        stop: s,
        supported: n
    }
}
function Em(e) {
    const [t,n] = E.useState(!1)
      , [r] = E.useState( () => typeof window < "u" && ("SpeechRecognition"in window || "webkitSpeechRecognition"in window))
      , i = E.useRef(null)
      , s = E.useCallback( () => {
        if (!r)
            return;
        const a = window.SpeechRecognition || window.webkitSpeechRecognition
          , u = new a;
        u.lang = "en-US",
        u.interimResults = !1,
        u.maxAlternatives = 1,
        u.onresult = c => {
            const g = c.results[0][0].transcript;
            e(g)
        }
        ,
        u.onend = () => n(!1),
        u.onerror = () => n(!1),
        i.current = u,
        u.start(),
        n(!0)
    }
    , [r, e])
      , o = E.useCallback( () => {
        var a;
        (a = i.current) == null || a.stop(),
        n(!1)
    }
    , []);
    return {
        listening: t,
        start: s,
        stop: o,
        supported: r
    }
}
const nd = {
    Activity: ro,
    Flame: Qc,
    HeartPulse: lo,
    Sun: lr,
    Bug: Wc,
    Wind: qc,
    Baby: Uc,
    Cross: pr,
    Droplet: _i,
    ShieldPlus: sr,
    Brain: Up,
    Eye: Yp,
    Zap: gm,
    Snowflake: um,
    Waves: hm,
    Skull: am,
    Moon: yi
};
function Tm({selectedId: e, onSelectInjury: t, onBack: n}) {
    return e && uo(e) ? l.jsx(Mm, {
        injuryId: e,
        onBack: n
    }) : l.jsx(bm, {
        onSelectInjury: t
    })
}
function bm({onSelectInjury: e}) {
    const {t} = ge()
      , [n,r] = E.useState("")
      , [i,s] = E.useState(null)
      , o = zt.filter(a => {
        const u = !n || a.name.toLowerCase().includes(n.toLowerCase()) || a.description.toLowerCase().includes(n.toLowerCase())
          , c = !i || a.category === i;
        return u && c
    }
    );
    return l.jsxs("div", {
        className: "page-enter space-y-6",
        children: [l.jsx(kt, {
            title: t("guide"),
            subtitle: "Clear, step-by-step first-aid guidance for common injuries",
            icon: fr
        }), l.jsxs("div", {
            className: "relative",
            children: [l.jsx(oo, {
                className: "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"
            }), l.jsx("input", {
                value: n,
                onChange: a => r(a.target.value),
                placeholder: t("searchPlaceholder"),
                className: "w-full pl-12 pr-4 py-3.5 rounded-2xl glass focus:outline-none focus:ring-2 focus:ring-primary-400"
            })]
        }), l.jsxs("div", {
            className: "flex flex-wrap gap-2",
            children: [l.jsx("button", {
                onClick: () => s(null),
                className: `px-4 py-2 rounded-full text-sm font-medium transition ${i ? "glass text-slate-600 dark:text-slate-300" : "gradient-bg-primary text-white"}`,
                children: "All"
            }), ed.map(a => l.jsx("button", {
                onClick: () => s(a.id),
                className: `px-4 py-2 rounded-full text-sm font-medium transition ${i === a.id ? "gradient-bg-primary text-white" : "glass text-slate-600 dark:text-slate-300"}`,
                children: a.name
            }, a.id))]
        }), l.jsx("div", {
            className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-4",
            children: o.map( (a, u) => {
                const c = nd[a.icon] || pr;
                return l.jsxs("button", {
                    onClick: () => e(a.id),
                    className: "glass-card p-5 text-left animate-fade-in-up hover:shadow-glow",
                    style: {
                        animationDelay: `${u * .04}s`
                    },
                    children: [l.jsxs("div", {
                        className: "flex items-start justify-between mb-3",
                        children: [l.jsx("div", {
                            className: "w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-500/20 dark:to-secondary-500/20 flex items-center justify-center",
                            children: l.jsx(c, {
                                className: "w-6 h-6 text-primary-600 dark:text-primary-400"
                            })
                        }), l.jsx(Jc, {
                            severity: a.severity
                        })]
                    }), l.jsx("h3", {
                        className: "font-semibold mb-1",
                        children: a.name
                    }), l.jsx("p", {
                        className: "text-xs text-slate-500 dark:text-slate-400 line-clamp-2",
                        children: a.description
                    })]
                }, a.id)
            }
            )
        }), o.length === 0 && l.jsx("div", {
            className: "glass-card p-10 text-center text-slate-500 dark:text-slate-400",
            children: "No guides found. Try a different search."
        }), l.jsx(Xe, {})]
    })
}
function Mm({injuryId: e, onBack: t}) {
    const {t: n} = ge()
      , r = uo(e)
      , {speaking: i, speak: s, stop: o, supported: a} = Cm()
      , u = nd[r.icon] || pr
      , c = `${r.name}. ${r.description}. Symptoms. ${r.symptoms.join(", ")}. Immediate first-aid steps. ${r.immediateSteps.join(", ")}. Things not to do. ${r.doNot.join(", ")}. When to call emergency services. ${r.whenToCall.join(", ")}. Recovery tips. ${r.recoveryTips.join(", ")}. Prevention tips. ${r.preventionTips.join(", ")}.`;
    return l.jsxs("div", {
        className: "page-enter space-y-6 max-w-3xl mx-auto",
        children: [l.jsxs("button", {
            onClick: t,
            className: "flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-primary-600 transition",
            children: [l.jsx(io, {
                className: "w-4 h-4"
            }), " ", n("back")]
        }), l.jsxs("div", {
            className: "glass-card p-6 md:p-8",
            children: [l.jsxs("div", {
                className: "flex items-start gap-4 mb-4",
                children: [l.jsx("div", {
                    className: "w-16 h-16 rounded-3xl gradient-bg-primary flex items-center justify-center shrink-0",
                    children: l.jsx(u, {
                        className: "w-8 h-8 text-white"
                    })
                }), l.jsxs("div", {
                    className: "flex-1",
                    children: [l.jsxs("div", {
                        className: "flex items-center gap-3 flex-wrap mb-1",
                        children: [l.jsx("h1", {
                            className: "font-display text-2xl font-bold",
                            children: r.name
                        }), l.jsx(Jc, {
                            severity: r.severity
                        })]
                    }), l.jsx("p", {
                        className: "text-sm text-slate-500 dark:text-slate-400",
                        children: r.description
                    })]
                })]
            }), a && l.jsx("button", {
                onClick: () => i ? o() : s(c),
                className: `flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition ${i ? "bg-danger-500 text-white" : "gradient-bg-primary text-white"}`,
                children: i ? l.jsxs(l.Fragment, {
                    children: [l.jsx(dm, {
                        className: "w-4 h-4"
                    }), " ", n("stop")]
                }) : l.jsxs(l.Fragment, {
                    children: [l.jsx(mm, {
                        className: "w-4 h-4"
                    }), " ", n("readAloud")]
                })
            })]
        }), l.jsx(Ht, {
            icon: mn,
            title: n("symptoms"),
            items: r.symptoms,
            color: "accent"
        }), l.jsx(Ht, {
            icon: Ii,
            title: n("immediateSteps"),
            items: r.immediateSteps,
            color: "success",
            numbered: !0
        }), l.jsx(Ht, {
            icon: Zc,
            title: n("doNot"),
            items: r.doNot,
            color: "danger"
        }), l.jsx(Ht, {
            icon: Hn,
            title: n("whenToCall"),
            items: r.whenToCall,
            color: "danger"
        }), l.jsx(Ht, {
            icon: lo,
            title: n("recoveryTips"),
            items: r.recoveryTips,
            color: "primary"
        }), l.jsx(Ht, {
            icon: om,
            title: n("preventionTips"),
            items: r.preventionTips,
            color: "secondary"
        }), l.jsx(Xe, {})]
    })
}
function Ht({icon: e, title: t, items: n, color: r, numbered: i}) {
    const s = {
        primary: "from-primary-400 to-primary-600",
        secondary: "from-secondary-400 to-secondary-600",
        success: "from-success-400 to-success-600",
        danger: "from-danger-400 to-danger-600",
        accent: "from-accent-400 to-accent-600"
    };
    return l.jsxs("div", {
        className: "glass-card p-6",
        children: [l.jsxs("div", {
            className: "flex items-center gap-3 mb-4",
            children: [l.jsx("div", {
                className: `w-10 h-10 rounded-xl bg-gradient-to-br ${s[r]} flex items-center justify-center`,
                children: l.jsx(e, {
                    className: "w-5 h-5 text-white"
                })
            }), l.jsx("h2", {
                className: "font-display text-lg font-bold",
                children: t
            })]
        }), l.jsx("ul", {
            className: "space-y-2.5",
            children: n.map( (o, a) => l.jsxs("li", {
                className: "flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300",
                children: [i ? l.jsx("span", {
                    className: "w-6 h-6 rounded-full gradient-bg-primary text-white text-xs font-bold flex items-center justify-center shrink-0",
                    children: a + 1
                }) : l.jsx("span", {
                    className: `w-2 h-2 rounded-full bg-gradient-to-br ${s[r]} shrink-0 mt-1.5`
                }), l.jsx("span", {
                    className: "leading-relaxed",
                    children: o
                })]
            }, a))
        })]
    })
}
function Pm({onSelectInjury: e}) {
    const {t} = ge()
      , [n,r] = E.useState([{
        role: "assistant",
        content: t("aiIntro"),
        suggestions: ["I have a burn", "Someone is choking", "I feel chest pain", "My child has a fever"]
    }])
      , [i,s] = E.useState("")
      , [o,a] = E.useState(!1)
      , u = E.useRef(null)
      , {listening: c, start: g, stop: m, supported: h} = Em(y => {
        s(y)
    }
    );
    E.useEffect( () => {
        var y;
        (y = u.current) == null || y.scrollTo({
            top: u.current.scrollHeight,
            behavior: "smooth"
        })
    }
    , [n, o]);
    const v = y => {
        if (!y.trim())
            return;
        const k = {
            role: "user",
            content: y
        };
        r(z => [...z, k]),
        s(""),
        a(!0),
        setTimeout( () => {
            const z = zm(y);
            r(f => [...f, z]),
            a(!1)
        }
        , 700)
    }
    ;
    return l.jsxs("div", {
        className: "page-enter space-y-6 max-w-3xl mx-auto h-[calc(100vh-8rem)] lg:h-[calc(100vh-4rem)] flex flex-col",
        children: [l.jsx(kt, {
            title: t("assistant"),
            subtitle: "Describe your symptoms — I'll suggest first-aid steps",
            icon: Qr
        }), l.jsxs("div", {
            className: "glass-card flex-1 flex flex-col overflow-hidden",
            children: [l.jsxs("div", {
                className: "flex-1 overflow-y-auto p-5 space-y-4",
                ref: u,
                children: [n.map( (y, k) => l.jsxs("div", {
                    className: `flex gap-3 ${y.role === "user" ? "flex-row-reverse" : ""} animate-fade-in-up`,
                    children: [l.jsx("div", {
                        className: `w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${y.role === "assistant" ? "gradient-bg-primary" : "bg-slate-200 dark:bg-white/10"}`,
                        children: y.role === "assistant" ? l.jsx(Qr, {
                            className: "w-5 h-5 text-white"
                        }) : l.jsx(pm, {
                            className: "w-5 h-5 text-slate-600 dark:text-slate-300"
                        })
                    }), l.jsxs("div", {
                        className: `max-w-[80%] ${y.role === "user" ? "items-end" : ""}`,
                        children: [l.jsx("div", {
                            className: `rounded-2xl px-4 py-3 ${y.role === "assistant" ? "glass" : "gradient-bg-primary text-white"}`,
                            children: l.jsx("p", {
                                className: "text-sm leading-relaxed whitespace-pre-line",
                                children: y.content
                            })
                        }), y.injuryId && l.jsxs("button", {
                            onClick: () => e(y.injuryId),
                            className: "mt-2 flex items-center gap-1 text-sm font-semibold text-primary-600 dark:text-primary-400 hover:gap-2 transition-all",
                            children: ["View full guide ", l.jsx(ll, {
                                className: "w-4 h-4"
                            })]
                        }), y.suggestions && l.jsx("div", {
                            className: "flex flex-wrap gap-2 mt-2",
                            children: y.suggestions.map(z => l.jsx("button", {
                                onClick: () => v(z),
                                className: "px-3 py-1.5 rounded-full text-xs font-medium glass hover:shadow-glow transition",
                                children: z
                            }, z))
                        })]
                    })]
                }, k)), o && l.jsxs("div", {
                    className: "flex gap-3 animate-fade-in",
                    children: [l.jsx("div", {
                        className: "w-9 h-9 rounded-xl gradient-bg-primary flex items-center justify-center shrink-0",
                        children: l.jsx(Qr, {
                            className: "w-5 h-5 text-white"
                        })
                    }), l.jsx("div", {
                        className: "glass rounded-2xl px-4 py-3 flex gap-1",
                        children: [0, 1, 2].map(y => l.jsx("span", {
                            className: "w-2 h-2 rounded-full bg-slate-400 animate-bounce",
                            style: {
                                animationDelay: `${y * .15}s`
                            }
                        }, y))
                    })]
                })]
            }), l.jsx("div", {
                className: "p-4 border-t border-slate-200/50 dark:border-white/5",
                children: l.jsxs("div", {
                    className: "flex items-center gap-2",
                    children: [h && l.jsx("button", {
                        onClick: () => c ? m() : g(),
                        className: `p-3 rounded-2xl transition ${c ? "bg-danger-500 text-white animate-pulse" : "glass hover:shadow-glow"}`,
                        title: t("voiceInput"),
                        children: l.jsx(rm, {
                            className: "w-5 h-5"
                        })
                    }), l.jsx("input", {
                        value: i,
                        onChange: y => s(y.target.value),
                        onKeyDown: y => y.key === "Enter" && v(i),
                        placeholder: t("typeMessage"),
                        className: "flex-1 px-4 py-3 rounded-2xl glass focus:outline-none focus:ring-2 focus:ring-primary-400"
                    }), l.jsx("button", {
                        onClick: () => v(i),
                        className: "p-3 rounded-2xl gradient-bg-primary text-white hover:shadow-glow transition active:scale-95",
                        children: l.jsx(lm, {
                            className: "w-5 h-5"
                        })
                    })]
                })
            })]
        }), l.jsxs("div", {
            className: "glass-card p-4 flex items-start gap-3",
            children: [l.jsx(mn, {
                className: "w-5 h-5 text-accent-500 shrink-0 mt-0.5"
            }), l.jsx("p", {
                className: "text-xs text-slate-600 dark:text-slate-300",
                children: t("aiDisclaimer")
            })]
        })]
    })
}
function zm(e) {
    const t = e.toLowerCase()
      , n = "I cannot diagnose medical conditions. This guidance is for education only."
      , r = {
        "chest pain": "heart-attack",
        "heart attack": "heart-attack",
        stroke: "stroke-fast",
        choking: "choking",
        "not breathing": "cpr-guidance",
        unconscious: "cpr-guidance",
        collapse: "cpr-guidance",
        anaphylaxis: "allergic-reactions",
        "severe allergic": "allergic-reactions",
        drowning: "drowning",
        electric: "electric-shock",
        poison: "poisoning",
        snake: "snake-bites"
    };
    for (const [s,o] of Object.entries(r))
        if (t.includes(s)) {
            const a = uo(o);
            return {
                role: "assistant",
                content: `This sounds potentially serious. ${n} If this is a life-threatening emergency, call your local emergency number immediately.

Based on what you described, here is first-aid guidance for **${a.name}**:

${a.immediateSteps.slice(0, 3).map( (u, c) => `${c + 1}. ${u}`).join(`
`)}

Can you share more — when did this start, and is the person conscious and breathing?`,
                suggestions: ["They are conscious", "They are not breathing", "Call emergency numbers"],
                injuryId: o
            }
        }
    const i = zt.find(s => {
        const o = s.name.toLowerCase();
        return t.includes(o) || s.symptoms.some(a => a.toLowerCase().split(" ").some(u => u.length > 4 && t.includes(u)))
    }
    );
    return i ? {
        role: "assistant",
        content: `Based on what you described, this may relate to **${i.name}**. ${n}

Here are the first immediate steps:
${i.immediateSteps.slice(0, 3).map( (s, o) => `${o + 1}. ${s}`).join(`
`)}

Could you tell me more about how it happened and how severe it feels?`,
        suggestions: ["It is mild", "It is severe", "Show me the full guide"],
        injuryId: i.id
    } : t.length < 15 ? {
        role: "assistant",
        content: "I want to help you safely. Could you describe what happened in a bit more detail? For example: what body part is affected, how it happened, and how the person feels right now.",
        suggestions: ["I have a burn", "I have a cut", "Someone fell", "Difficulty breathing"]
    } : {
        role: "assistant",
        content: `Thank you for describing that. ${n}

I could not match that to a specific guide. Could you tell me which area is affected (e.g. skin, breathing, head, limb) and whether it seems mild or severe? If you think this is an emergency, please call your local emergency number right away.`,
        suggestions: ["Show me all guides", "Call emergency numbers"]
    }
}
function Dm() {
    const {t: e} = ge();
    return l.jsxs("div", {
        className: "page-enter space-y-6",
        children: [l.jsx(kt, {
            title: e("emergency"),
            subtitle: "Country-specific emergency numbers and nearby help",
            icon: Hn
        }), l.jsxs("div", {
            className: "glass-card p-6 gradient-bg-danger text-white",
            children: [l.jsx("h3", {
                className: "font-display text-xl font-bold mb-1",
                children: "In a life-threatening emergency"
            }), l.jsx("p", {
                className: "text-white/90 text-sm mb-4",
                children: "Call your local emergency number immediately. Stay on the line and follow the dispatcher's instructions."
            }), l.jsxs("a", {
                href: "tel:112",
                className: "inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white text-danger-600 font-bold text-lg hover:scale-105 transition shadow-lg",
                children: [l.jsx(Hn, {
                    className: "w-5 h-5"
                }), " Call 112 (Universal)"]
            })]
        }), l.jsxs("div", {
            children: [l.jsx("h3", {
                className: "font-display text-lg font-bold mb-4",
                children: "Emergency Numbers by Country"
            }), l.jsx("div", {
                className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-4",
                children: td.map(t => l.jsxs("div", {
                    className: "glass-card p-5",
                    children: [l.jsxs("div", {
                        className: "flex items-center gap-2 mb-3",
                        children: [l.jsx("span", {
                            className: "text-2xl",
                            children: t.flag
                        }), l.jsx("h4", {
                            className: "font-semibold",
                            children: t.country
                        })]
                    }), l.jsx("div", {
                        className: "space-y-2",
                        children: t.numbers.map(n => l.jsxs("a", {
                            href: `tel:${n.number}`,
                            className: "flex items-center justify-between px-3 py-2 rounded-xl bg-danger-50 dark:bg-danger-500/10 hover:scale-[1.02] transition",
                            children: [l.jsx("span", {
                                className: "text-sm text-slate-600 dark:text-slate-300",
                                children: n.label
                            }), l.jsxs("span", {
                                className: "font-bold text-danger-600 dark:text-danger-400 flex items-center gap-1",
                                children: [l.jsx(Hn, {
                                    className: "w-3.5 h-3.5"
                                }), " ", n.number]
                            })]
                        }, n.number))
                    })]
                }, t.code))
            })]
        }), l.jsxs("div", {
            className: "glass-card p-6",
            children: [l.jsxs("div", {
                className: "flex items-center gap-3 mb-3",
                children: [l.jsx("div", {
                    className: "w-10 h-10 rounded-xl bg-gradient-to-br from-primary-400 to-secondary-500 flex items-center justify-center",
                    children: l.jsx(Wp, {
                        className: "w-5 h-5 text-white"
                    })
                }), l.jsx("h3", {
                    className: "font-display text-lg font-bold",
                    children: e("nearbyHospitals")
                })]
            }), l.jsx("p", {
                className: "text-sm text-slate-500 dark:text-slate-400 mb-4",
                children: "Find hospitals and emergency rooms near you using Google Maps."
            }), l.jsxs("div", {
                className: "flex flex-wrap gap-3",
                children: [l.jsxs("a", {
                    href: "https://www.google.com/maps/search/hospital+near+me",
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "btn-primary flex items-center gap-2",
                    children: [l.jsx(tm, {
                        className: "w-4 h-4"
                    }), " Hospitals near me"]
                }), l.jsxs("a", {
                    href: "https://www.google.com/maps/search/emergency+room+near+me",
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "glass-card px-5 py-3 flex items-center gap-2 font-semibold",
                    children: [l.jsx(im, {
                        className: "w-4 h-4"
                    }), " Emergency rooms"]
                })]
            })]
        }), l.jsx(Xe, {})]
    })
}
const Ta = [{
    id: "paracetamol",
    name: "Paracetamol (Acetaminophen)",
    category: "Pain Relief",
    commonUses: ["Mild to moderate pain", "Fever reduction", "Headaches and body aches"],
    dosing: "Adults: 500–1000 mg every 4–6 hours, max 4000 mg per day. Children: dose by weight — follow the label carefully.",
    sideEffects: ["Rare in correct doses", "Nausea", "Allergic rash (rare)"],
    warnings: ["Do not exceed the daily limit — liver damage can occur", "Avoid alcohol", "Check other products for hidden paracetamol"]
}, {
    id: "ibuprofen",
    name: "Ibuprofen",
    category: "Pain Relief (NSAID)",
    commonUses: ["Pain", "Inflammation", "Fever", "Period pain"],
    dosing: "Adults: 200–400 mg every 4–6 hours with food, max 1200 mg per day without prescription. Children: follow age-appropriate dosing.",
    sideEffects: ["Stomach upset", "Heartburn", "Dizziness"],
    warnings: ["Take with food", "Avoid in stomach ulcers", "Not for those with kidney issues or in late pregnancy", "Do not combine with other NSAIDs"]
}, {
    id: "aspirin",
    name: "Aspirin",
    category: "Pain Relief (NSAID)",
    commonUses: ["Pain and fever", "Low-dose for heart attack prevention (as advised by a doctor)"],
    dosing: "Pain: 300–900 mg every 4–6 hours, max 4000 mg per day. Low-dose cardiac use: only as prescribed.",
    sideEffects: ["Stomach irritation", "Increased bleeding risk", "Tinnitus at high doses"],
    warnings: ["Never give to children under 16 (Reye's syndrome risk)", "Avoid in bleeding disorders", "Take with food"]
}, {
    id: "antihistamine",
    name: "Antihistamines (e.g. Cetirizine, Loratadine)",
    category: "Allergy",
    commonUses: ["Allergic reactions", "Hay fever", "Skin rashes and hives", "Itching"],
    dosing: "Adults: typically 10 mg once daily for cetirizine or loratadine. Children: follow age-specific label dosing.",
    sideEffects: ["Drowsiness (less with newer types)", "Dry mouth", "Headache"],
    warnings: ["Some types cause drowsiness — check before driving", "Consult a doctor if pregnant", "Not for severe anaphylaxis — use epinephrine"]
}, {
    id: "oral-rehydration",
    name: "Oral Rehydration Salts (ORS)",
    category: "Hydration",
    commonUses: ["Dehydration from diarrhea or vomiting", "Heat-related fluid loss"],
    dosing: "Dissolve one sachet in the stated volume of clean water. Sip gradually. Follow package instructions.",
    sideEffects: ["None when used correctly", "Nausea if taken too fast"],
    warnings: ["Use only clean water", "Seek medical help if dehydration is severe or persistent", "Not a substitute for IV fluids in severe cases"]
}, {
    id: "antacid",
    name: "Antacids",
    category: "Digestive",
    commonUses: ["Heartburn", "Indigestion", "Acid reflux"],
    dosing: "Follow the product label. Typically taken after meals and at bedtime.",
    sideEffects: ["Constipation or diarrhea", "Bloating", "Gas"],
    warnings: ["Consult a doctor if used frequently", "Can interact with other medications — space doses apart", "Not for long-term use without advice"]
}, {
    id: "hydrocortisone-cream",
    name: "Hydrocortisone Cream (Topical)",
    category: "Skin Care",
    commonUses: ["Mild skin inflammation", "Insect bites", "Mild eczema or rashes"],
    dosing: "Apply a thin layer to the affected area 1–2 times daily for short periods (usually up to 7 days).",
    sideEffects: ["Skin thinning with overuse", "Irritation or burning"],
    warnings: ["Do not use on broken skin or the face without advice", "Avoid prolonged use", "Not for young children without guidance"]
}, {
    id: "epinephrine-autoinjector",
    name: "Epinephrine Auto-Injector",
    category: "Emergency Allergy",
    commonUses: ["Severe allergic reactions (anaphylaxis)", "Emergency use for known severe allergies"],
    dosing: "Use as prescribed — typically injected into the outer thigh. Follow the device instructions exactly.",
    sideEffects: ["Rapid heartbeat", "Anxiety or shakiness", "Headache"],
    warnings: ["Always call emergency services after use", "Carry it at all times if prescribed", "Ensure family and friends know how to use it"]
}]
  , Am = "This information is for general education only. Always read the official medicine label, follow the dosing instructions, and consult a qualified healthcare professional before taking or giving any medication.";
function Im() {
    var o;
    const {t: e} = ge()
      , [t,n] = E.useState("")
      , [r,i] = E.useState(((o = Ta[0]) == null ? void 0 : o.id) || null)
      , s = Ta.filter(a => !t || a.name.toLowerCase().includes(t.toLowerCase()) || a.category.toLowerCase().includes(t.toLowerCase()));
    return l.jsxs("div", {
        className: "page-enter space-y-6",
        children: [l.jsx(kt, {
            title: e("medicines"),
            subtitle: "Basic information for common over-the-counter medicines",
            icon: ol
        }), l.jsxs("div", {
            className: "glass-card p-4 flex items-start gap-3",
            children: [l.jsx(ja, {
                className: "w-5 h-5 text-primary-500 shrink-0 mt-0.5"
            }), l.jsx("p", {
                className: "text-sm text-slate-600 dark:text-slate-300",
                children: Am
            })]
        }), l.jsxs("div", {
            className: "relative",
            children: [l.jsx(oo, {
                className: "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"
            }), l.jsx("input", {
                value: t,
                onChange: a => n(a.target.value),
                placeholder: "Search medicines...",
                className: "w-full pl-12 pr-4 py-3.5 rounded-2xl glass focus:outline-none focus:ring-2 focus:ring-primary-400"
            })]
        }), l.jsx("div", {
            className: "space-y-3",
            children: s.map(a => {
                const u = r === a.id;
                return l.jsxs("div", {
                    className: "glass-card overflow-hidden",
                    children: [l.jsxs("button", {
                        onClick: () => i(u ? null : a.id),
                        className: "w-full flex items-center gap-4 p-5 text-left",
                        children: [l.jsx("div", {
                            className: "w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-500/20 dark:to-secondary-500/20 flex items-center justify-center shrink-0",
                            children: l.jsx(ol, {
                                className: "w-6 h-6 text-primary-600 dark:text-primary-400"
                            })
                        }), l.jsxs("div", {
                            className: "flex-1",
                            children: [l.jsx("h3", {
                                className: "font-semibold",
                                children: a.name
                            }), l.jsx("p", {
                                className: "text-xs text-slate-500 dark:text-slate-400",
                                children: a.category
                            })]
                        }), l.jsx(Kp, {
                            className: `w-5 h-5 text-slate-400 transition-transform ${u ? "rotate-180" : ""}`
                        })]
                    }), u && l.jsxs("div", {
                        className: "px-5 pb-5 space-y-4 animate-fade-in",
                        children: [l.jsx(Ar, {
                            icon: Ii,
                            color: "success",
                            title: e("commonUses"),
                            items: a.commonUses
                        }), l.jsx(Ar, {
                            icon: ja,
                            color: "primary",
                            title: e("dosing"),
                            text: a.dosing
                        }), l.jsx(Ar, {
                            icon: mn,
                            color: "accent",
                            title: e("sideEffects"),
                            items: a.sideEffects
                        }), l.jsx(Ar, {
                            icon: mn,
                            color: "danger",
                            title: e("warnings"),
                            items: a.warnings
                        }), l.jsx("p", {
                            className: "text-xs text-slate-500 dark:text-slate-400 italic",
                            children: e("consultProfessional")
                        })]
                    })]
                }, a.id)
            }
            )
        }), l.jsx(Xe, {})]
    })
}
function Ar({icon: e, color: t, title: n, items: r, text: i}) {
    const s = {
        success: "text-success-600",
        primary: "text-primary-600",
        accent: "text-accent-600",
        danger: "text-danger-600"
    };
    return l.jsxs("div", {
        children: [l.jsxs("h4", {
            className: `flex items-center gap-2 font-semibold text-sm mb-2 ${s[t]}`,
            children: [l.jsx(e, {
                className: "w-4 h-4"
            }), " ", n]
        }), i && l.jsx("p", {
            className: "text-sm text-slate-600 dark:text-slate-300 leading-relaxed",
            children: i
        }), r && l.jsx("ul", {
            className: "space-y-1",
            children: r.map( (o, a) => l.jsxs("li", {
                className: "text-sm text-slate-600 dark:text-slate-300 flex items-start gap-2",
                children: [l.jsx("span", {
                    className: `w-1.5 h-1.5 rounded-full ${s[t].replace("text", "bg")} shrink-0 mt-1.5`
                }), o]
            }, a))
        })]
    })
}
const ds = [{
    id: "bandages",
    name: "Adhesive bandages (assorted sizes)",
    category: "Wound Care",
    essential: !0
}, {
    id: "gauze",
    name: "Sterile gauze pads and rolls",
    category: "Wound Care",
    essential: !0
}, {
    id: "tape",
    name: "Medical adhesive tape",
    category: "Wound Care",
    essential: !0
}, {
    id: "scissors",
    name: "Scissors and tweezers",
    category: "Tools",
    essential: !0
}, {
    id: "antiseptic",
    name: "Antiseptic wipes or solution",
    category: "Wound Care",
    essential: !0
}, {
    id: "gloves",
    name: "Disposable gloves",
    category: "Tools",
    essential: !0
}, {
    id: "crepe",
    name: "Crepe bandages for sprains",
    category: "Wound Care",
    essential: !1
}, {
    id: "burn-dressing",
    name: "Sterile burn dressings",
    category: "Burn Care",
    essential: !1
}, {
    id: "thermometer",
    name: "Digital thermometer",
    category: "Tools",
    essential: !0
}, {
    id: "paracetamol",
    name: "Paracetamol / pain relievers",
    category: "Medication",
    essential: !0
}, {
    id: "antihistamine",
    name: "Antihistamine tablets",
    category: "Medication",
    essential: !1
}, {
    id: "ors",
    name: "Oral rehydration salts",
    category: "Medication",
    essential: !1
}, {
    id: "cold-pack",
    name: "Instant cold packs",
    category: "Tools",
    essential: !1
}, {
    id: "cpr-mask",
    name: "CPR face shield or mask",
    category: "Tools",
    essential: !1
}, {
    id: "blanket",
    name: "Emergency foil blanket",
    category: "Tools",
    essential: !1
}, {
    id: "flashlight",
    name: "Flashlight and spare batteries",
    category: "Tools",
    essential: !1
}, {
    id: "first-aid-guide",
    name: "First-aid instruction booklet",
    category: "Reference",
    essential: !1
}, {
    id: "emergency-numbers",
    name: "List of emergency phone numbers",
    category: "Reference",
    essential: !0
}];
function _m() {
    const {t: e} = ge()
      , [t,n] = E.useState("bmi")
      , r = [{
        id: "bmi",
        label: e("bmi"),
        icon: Vp
    }, {
        id: "water",
        label: e("waterIntake"),
        icon: _i
    }, {
        id: "heart",
        label: e("heartRate"),
        icon: yt
    }, {
        id: "bp",
        label: e("bloodPressure"),
        icon: Zp
    }, {
        id: "kit",
        label: e("firstAidKit"),
        icon: Gp
    }];
    return l.jsxs("div", {
        className: "page-enter space-y-6",
        children: [l.jsx(kt, {
            title: e("tools"),
            subtitle: "Quick health calculators and checklists",
            icon: Yc
        }), l.jsx("div", {
            className: "flex flex-wrap gap-2",
            children: r.map(i => l.jsxs("button", {
                onClick: () => n(i.id),
                className: `flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-medium transition ${t === i.id ? "gradient-bg-primary text-white shadow-lg" : "glass text-slate-600 dark:text-slate-300"}`,
                children: [l.jsx(i.icon, {
                    className: "w-4 h-4"
                }), " ", i.label]
            }, i.id))
        }), l.jsxs("div", {
            className: "animate-fade-in",
            children: [t === "bmi" && l.jsx(Lm, {}), t === "water" && l.jsx(Rm, {}), t === "heart" && l.jsx(Fm, {}), t === "bp" && l.jsx(Om, {}), t === "kit" && l.jsx(Bm, {})]
        }), l.jsx(Xe, {})]
    })
}
function Lm() {
    const [e,t] = E.useState("")
      , [n,r] = E.useState("")
      , i = parseFloat(e) / 100
      , s = parseFloat(n)
      , o = i && s ? s / (i * i) : 0
      , a = o < 18.5 ? "Underweight" : o < 25 ? "Healthy" : o < 30 ? "Overweight" : "Obese"
      , u = o < 18.5 ? "text-accent-500" : o < 25 ? "text-success-500" : o < 30 ? "text-warning-500" : "text-danger-500";
    return l.jsxs("div", {
        className: "glass-card p-6 max-w-md",
        children: [l.jsx("h3", {
            className: "font-display text-lg font-bold mb-4",
            children: "BMI Calculator"
        }), l.jsxs("div", {
            className: "space-y-4",
            children: [l.jsxs("div", {
                children: [l.jsx("label", {
                    className: "text-sm font-medium block mb-1",
                    children: "Height (cm)"
                }), l.jsx("input", {
                    type: "number",
                    value: e,
                    onChange: c => t(c.target.value),
                    className: "w-full px-4 py-3 rounded-xl glass focus:outline-none focus:ring-2 focus:ring-primary-400"
                })]
            }), l.jsxs("div", {
                children: [l.jsx("label", {
                    className: "text-sm font-medium block mb-1",
                    children: "Weight (kg)"
                }), l.jsx("input", {
                    type: "number",
                    value: n,
                    onChange: c => r(c.target.value),
                    className: "w-full px-4 py-3 rounded-xl glass focus:outline-none focus:ring-2 focus:ring-primary-400"
                })]
            }), o > 0 && l.jsxs("div", {
                className: "text-center p-4 rounded-2xl glass animate-scale-in",
                children: [l.jsx("p", {
                    className: "text-4xl font-bold font-display gradient-text",
                    children: o.toFixed(1)
                }), l.jsx("p", {
                    className: `font-semibold ${u}`,
                    children: a
                })]
            })]
        })]
    })
}
function Rm() {
    const [e,t] = E.useState("")
      , n = parseFloat(e)
      , r = n ? (n * .033).toFixed(1) : "0"
      , i = n ? Math.round(n * .033 * 1e3 / 250) : 0;
    return l.jsxs("div", {
        className: "glass-card p-6 max-w-md",
        children: [l.jsx("h3", {
            className: "font-display text-lg font-bold mb-4",
            children: "Water Intake Calculator"
        }), l.jsxs("div", {
            children: [l.jsx("label", {
                className: "text-sm font-medium block mb-1",
                children: "Body Weight (kg)"
            }), l.jsx("input", {
                type: "number",
                value: e,
                onChange: s => t(s.target.value),
                className: "w-full px-4 py-3 rounded-xl glass focus:outline-none focus:ring-2 focus:ring-primary-400"
            })]
        }), n > 0 && l.jsxs("div", {
            className: "mt-4 p-4 rounded-2xl glass text-center animate-scale-in",
            children: [l.jsx(_i, {
                className: "w-10 h-10 mx-auto text-primary-500 mb-2"
            }), l.jsxs("p", {
                className: "text-3xl font-bold font-display gradient-text",
                children: [r, " L"]
            }), l.jsxs("p", {
                className: "text-sm text-slate-500 dark:text-slate-400",
                children: ["About ", i, " glasses per day"]
            })]
        })]
    })
}
function Fm() {
    const e = [{
        label: "Resting (Adult)",
        range: "60–100 bpm",
        color: "success"
    }, {
        label: "Resting (Athlete)",
        range: "40–60 bpm",
        color: "primary"
    }, {
        label: "Target Exercise (Moderate)",
        range: "50–70% of max",
        color: "accent"
    }, {
        label: "Target Exercise (Vigorous)",
        range: "70–85% of max",
        color: "warning"
    }, {
        label: "Max (approx)",
        range: "220 − age",
        color: "danger"
    }];
    return l.jsxs("div", {
        className: "glass-card p-6 max-w-md",
        children: [l.jsx("h3", {
            className: "font-display text-lg font-bold mb-4",
            children: "Heart Rate Information"
        }), l.jsx("div", {
            className: "space-y-3",
            children: e.map(t => l.jsxs("div", {
                className: "flex items-center justify-between p-3 rounded-xl glass",
                children: [l.jsx("span", {
                    className: "text-sm text-slate-600 dark:text-slate-300",
                    children: t.label
                }), l.jsx("span", {
                    className: "font-semibold text-primary-600 dark:text-primary-400",
                    children: t.range
                })]
            }, t.label))
        }), l.jsx("p", {
            className: "text-xs text-slate-500 dark:text-slate-400 mt-4",
            children: "Consult a doctor if your resting heart rate is consistently outside 60–100 bpm."
        })]
    })
}
function Om() {
    const e = [{
        label: "Normal",
        range: "Below 120 / 80",
        color: "success"
    }, {
        label: "Elevated",
        range: "120–129 / below 80",
        color: "primary"
    }, {
        label: "High (Stage 1)",
        range: "130–139 / 80–89",
        color: "accent"
    }, {
        label: "High (Stage 2)",
        range: "140+ / 90+",
        color: "warning"
    }, {
        label: "Hypertensive Crisis",
        range: "180+ / 120+",
        color: "danger"
    }];
    return l.jsxs("div", {
        className: "glass-card p-6 max-w-md",
        children: [l.jsx("h3", {
            className: "font-display text-lg font-bold mb-4",
            children: "Blood Pressure Information"
        }), l.jsx("div", {
            className: "space-y-3",
            children: e.map(t => l.jsxs("div", {
                className: "flex items-center justify-between p-3 rounded-xl glass",
                children: [l.jsx("span", {
                    className: "text-sm text-slate-600 dark:text-slate-300",
                    children: t.label
                }), l.jsx("span", {
                    className: "font-semibold text-primary-600 dark:text-primary-400",
                    children: t.range
                })]
            }, t.label))
        }), l.jsx("p", {
            className: "text-xs text-slate-500 dark:text-slate-400 mt-4",
            children: "Have your blood pressure checked regularly by a healthcare professional."
        })]
    })
}
function Bm() {
    const [e,t] = E.useState([])
      , n = s => t(o => o.includes(s) ? o.filter(a => a !== s) : [...o, s])
      , r = ds.filter(s => s.essential)
      , i = ds.filter(s => !s.essential);
    return l.jsxs("div", {
        className: "glass-card p-6 max-w-2xl",
        children: [l.jsx("h3", {
            className: "font-display text-lg font-bold mb-4",
            children: "First-Aid Kit Checklist"
        }), l.jsx("p", {
            className: "text-sm text-slate-500 dark:text-slate-400 mb-4",
            children: "Tap items as you add them to your kit."
        }), l.jsx("h4", {
            className: "font-semibold text-sm mb-2 text-danger-600 dark:text-danger-400",
            children: "Essential"
        }), l.jsx("div", {
            className: "grid sm:grid-cols-2 gap-2 mb-4",
            children: r.map(s => l.jsx(ba, {
                item: s,
                checked: e.includes(s.id),
                onToggle: () => n(s.id)
            }, s.id))
        }), l.jsx("h4", {
            className: "font-semibold text-sm mb-2 text-primary-600 dark:text-primary-400",
            children: "Recommended"
        }), l.jsx("div", {
            className: "grid sm:grid-cols-2 gap-2",
            children: i.map(s => l.jsx(ba, {
                item: s,
                checked: e.includes(s.id),
                onToggle: () => n(s.id)
            }, s.id))
        }), l.jsx("div", {
            className: "mt-4 p-3 rounded-xl glass text-center",
            children: l.jsxs("span", {
                className: "text-sm font-semibold gradient-text",
                children: [e.length, " / ", ds.length, " items"]
            })
        })]
    })
}
function ba({item: e, checked: t, onToggle: n}) {
    return l.jsxs("button", {
        onClick: n,
        className: `flex items-center gap-3 p-3 rounded-xl transition ${t ? "bg-success-100 dark:bg-success-500/20" : "glass"}`,
        children: [l.jsx("div", {
            className: `w-5 h-5 rounded-md flex items-center justify-center transition ${t ? "gradient-bg-primary" : "border-2 border-slate-300 dark:border-white/20"}`,
            children: t && l.jsx(Qp, {
                className: "w-3.5 h-3.5 text-white"
            })
        }), l.jsx("span", {
            className: `text-sm text-left ${t ? "line-through text-slate-400" : "text-slate-700 dark:text-slate-200"}`,
            children: e.name
        })]
    })
}
const fs = [{
    id: "cpr-basics",
    title: "CPR Basics",
    icon: "HeartPulse",
    description: "Understand the fundamentals of cardiopulmonary resuscitation.",
    duration: "10 min",
    content: [{
        heading: "What is CPR?",
        body: "CPR is a life-saving technique used when someone's breathing or heartbeat has stopped. It combines chest compressions and rescue breaths to keep oxygen flowing to the brain."
    }, {
        heading: "When to use it",
        body: "Use CPR when a person is unresponsive and not breathing normally. Act quickly — every minute without CPR reduces survival chances."
    }, {
        heading: "The basics",
        body: "Push hard and fast in the center of the chest — at least 5 cm deep and 100–120 times per minute. Allow the chest to fully recoil between compressions."
    }, {
        heading: "AEDs",
        body: "An Automated External Defibrillator can restart the heart. Use it as soon as it arrives and follow its voice prompts. It is designed for anyone to use."
    }, {
        heading: "Get trained",
        body: "This overview does not replace hands-on training. Take a certified CPR and first-aid course to practice on manikins with a qualified instructor."
    }]
}, {
    id: "first-aid-tutorials",
    title: "First-Aid Tutorials",
    icon: "BookOpen",
    description: "Step-by-step guides for common injuries and emergencies.",
    duration: "15 min",
    content: [{
        heading: "The DRABC approach",
        body: "Danger, Response, Airway, Breathing, Circulation. Always check for danger first, then responsiveness, then open the airway and check breathing before treating."
    }, {
        heading: "Bleeding control",
        body: "Apply firm, direct pressure with a clean cloth and elevate the limb. Most bleeding stops with sustained pressure."
    }, {
        heading: "Burns",
        body: "Cool under running water for at least 10 minutes. Never apply ice, butter, or toothpaste."
    }, {
        heading: "Fractures",
        body: "Immobilize the limb without trying to realign the bone. Support it and seek medical help."
    }, {
        heading: "Practice makes perfect",
        body: "Review these guides regularly so the steps come naturally when seconds count."
    }]
}, {
    id: "emergency-preparedness",
    title: "Emergency Preparedness",
    icon: "ShieldCheck",
    description: "Be ready at home, work, and on the go.",
    duration: "12 min",
    content: [{
        heading: "Make a plan",
        body: "Create a family emergency plan with meeting points, contacts, and evacuation routes. Practice it twice a year."
    }, {
        heading: "Build a kit",
        body: "Keep a kit with water, non-perishable food, a flashlight, batteries, a first-aid kit, medications, and copies of important documents."
    }, {
        heading: "Stay informed",
        body: "Know the risks in your area and sign up for local emergency alerts."
    }, {
        heading: "Emergency contacts",
        body: "Save key numbers in your phone and post them visibly at home. Teach children how to call for help."
    }]
}, {
    id: "disaster-survival",
    title: "Disaster Survival Basics",
    icon: "CloudRain",
    description: "Essential knowledge for natural disasters and extreme situations.",
    duration: "14 min",
    content: [{
        heading: "Earthquakes",
        body: "Drop, Cover, and Hold On. Stay away from windows and heavy furniture. After shaking stops, evacuate carefully."
    }, {
        heading: "Floods",
        body: "Move to higher ground immediately. Never walk or drive through floodwater — even shallow water can sweep you away."
    }, {
        heading: "Fires",
        body: "Get out fast and stay out. Crawl low under smoke and feel doors before opening. Have a meeting point outside."
    }, {
        heading: "Storms",
        body: "Stay indoors, away from windows. Keep a battery-powered radio and emergency supplies ready."
    }, {
        heading: "After a disaster",
        body: "Check for injuries, listen to authorities, and avoid damaged structures. Help neighbors when it is safe."
    }]
}]
  , et = [{
    id: "q1",
    module: "cpr-basics",
    question: "How deep should chest compressions be for an adult during CPR?",
    options: ["About 2 cm", "At least 5 cm", "10 cm", "As deep as possible"],
    correct: 1,
    explanation: "Adult chest compressions should be at least 5 cm deep, allowing full recoil between compressions."
}, {
    id: "q2",
    module: "cpr-basics",
    question: "What is the recommended rate for chest compressions?",
    options: ["40–60 per minute", "60–80 per minute", "100–120 per minute", "As fast as possible"],
    correct: 2,
    explanation: "The recommended rate is 100–120 compressions per minute."
}, {
    id: "q3",
    module: "first-aid-tutorials",
    question: "What is the first thing you should check at an emergency scene?",
    options: ["The victim's pulse", "Danger to yourself", "Calling for help", "The victim's name"],
    correct: 1,
    explanation: "Always check for danger first to ensure the scene is safe before approaching."
}, {
    id: "q4",
    module: "first-aid-tutorials",
    question: "How long should you cool a burn under running water?",
    options: ["1 minute", "5 minutes", "At least 10–20 minutes", "Until it stops hurting"],
    correct: 2,
    explanation: "Cool a burn under running water for at least 10–20 minutes to reduce tissue damage."
}, {
    id: "q5",
    module: "emergency-preparedness",
    question: "How often should you practice your family emergency plan?",
    options: ["Never", "Once a year", "Twice a year", "Every week"],
    correct: 2,
    explanation: "Practicing twice a year keeps the plan fresh for everyone."
}, {
    id: "q6",
    module: "disaster-survival",
    question: "What should you do during an earthquake?",
    options: ["Run outside immediately", "Drop, Cover, and Hold On", "Stand in a doorway", "Get in a car"],
    correct: 1,
    explanation: "Drop, Cover, and Hold On protects you from falling debris."
}, {
    id: "q7",
    module: "disaster-survival",
    question: "What should you never do during a flood?",
    options: ["Move to higher ground", "Walk or drive through floodwater", "Listen to alerts", "Keep a radio handy"],
    correct: 1,
    explanation: "Never walk or drive through floodwater — even shallow water can be dangerous."
}, {
    id: "q8",
    module: "first-aid-tutorials",
    question: "What does FAST stand for in stroke recognition?",
    options: ["Fast Action Speed Test", "Face, Arm, Speech, Time", "First Aid Safety Team", "Focus, Act, Stay, Treat"],
    correct: 1,
    explanation: "FAST = Face drooping, Arm weakness, Speech difficulty, Time to call emergency services."
}]
  , Hm = [{
    id: "first-aid",
    name: "First Responder",
    icon: "ShieldPlus",
    description: "Completed the First-Aid Tutorials module"
}, {
    id: "cpr",
    name: "Heart Saver",
    icon: "HeartPulse",
    description: "Completed the CPR Basics module"
}, {
    id: "prepared",
    name: "Always Ready",
    icon: "ShieldCheck",
    description: "Completed Emergency Preparedness"
}, {
    id: "survivor",
    name: "Survivor",
    icon: "CloudRain",
    description: "Completed Disaster Survival Basics"
}, {
    id: "quiz-master",
    name: "Quiz Master",
    icon: "Trophy",
    description: "Scored 100% on a quiz"
}, {
    id: "scholar",
    name: "Scholar",
    icon: "GraduationCap",
    description: "Completed all learning modules"
}]
  , rd = {
    HeartPulse: yt,
    BookOpen: fr,
    ShieldCheck: al,
    CloudRain: Vc
}
  , $m = {
    ShieldPlus: al,
    HeartPulse: yt,
    ShieldCheck: al,
    CloudRain: Vc,
    Trophy: ao,
    GraduationCap: so
};
function Um() {
    const {t: e} = ge()
      , [t,n] = E.useState("modules")
      , [r,i] = E.useState(null)
      , [s,o] = E.useState( () => JSON.parse(localStorage.getItem("lg-completed") || "[]"))
      , [a,u] = E.useState( () => JSON.parse(localStorage.getItem("lg-badges") || "[]"));
    E.useEffect( () => {
        localStorage.setItem("lg-completed", JSON.stringify(s))
    }
    , [s]),
    E.useEffect( () => {
        localStorage.setItem("lg-badges", JSON.stringify(a))
    }
    , [a]);
    const c = m => {
        o(y => y.includes(m) ? y : [...y, m]);
        const v = {
            "cpr-basics": "cpr",
            "first-aid-tutorials": "first-aid",
            "emergency-preparedness": "prepared",
            "disaster-survival": "survivor"
        }[m];
        v && u(y => y.includes(v) ? y : [...y, v]),
        s.length + 1 >= fs.length && u(y => y.includes("scholar") ? y : [...y, "scholar"])
    }
      , g = m => {
        m && u(h => h.includes("quiz-master") ? h : [...h, "quiz-master"])
    }
    ;
    if (t === "module" && r) {
        const m = fs.find(h => h.id === r);
        return l.jsx(Wm, {
            mod: m,
            onBack: () => n("modules"),
            onComplete: () => {
                c(m.id),
                n("modules")
            }
        })
    }
    return t === "quiz" ? l.jsx(Vm, {
        onBack: () => n("modules"),
        onComplete: g
    }) : l.jsxs("div", {
        className: "page-enter space-y-6",
        children: [l.jsx(kt, {
            title: e("learning"),
            subtitle: "Learn first-aid, CPR, and emergency preparedness",
            icon: so
        }), l.jsx("div", {
            className: "grid md:grid-cols-2 lg:grid-cols-3 gap-4",
            children: fs.map( (m, h) => {
                const v = rd[m.icon] || fr
                  , y = s.includes(m.id);
                return l.jsxs("button", {
                    onClick: () => {
                        i(m.id),
                        n("module")
                    }
                    ,
                    className: "glass-card p-5 text-left animate-fade-in-up hover:shadow-glow",
                    style: {
                        animationDelay: `${h * .05}s`
                    },
                    children: [l.jsxs("div", {
                        className: "flex items-start justify-between mb-3",
                        children: [l.jsx("div", {
                            className: "w-12 h-12 rounded-2xl gradient-bg-primary flex items-center justify-center",
                            children: l.jsx(v, {
                                className: "w-6 h-6 text-white"
                            })
                        }), y && l.jsx(Ii, {
                            className: "w-5 h-5 text-success-500"
                        })]
                    }), l.jsx("h3", {
                        className: "font-semibold mb-1",
                        children: m.title
                    }), l.jsx("p", {
                        className: "text-xs text-slate-500 dark:text-slate-400 mb-2",
                        children: m.description
                    }), l.jsxs("span", {
                        className: "text-xs text-slate-400 flex items-center gap-1",
                        children: [l.jsx(qp, {
                            className: "w-3 h-3"
                        }), " ", m.duration]
                    })]
                }, m.id)
            }
            )
        }), l.jsxs("button", {
            onClick: () => n("quiz"),
            className: "glass-card p-6 w-full text-left flex items-center gap-4 hover:shadow-glow transition",
            children: [l.jsx("div", {
                className: "w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-400 to-accent-600 flex items-center justify-center",
                children: l.jsx(ao, {
                    className: "w-7 h-7 text-white"
                })
            }), l.jsxs("div", {
                children: [l.jsx("h3", {
                    className: "font-display text-lg font-bold",
                    children: "Health Quiz"
                }), l.jsx("p", {
                    className: "text-sm text-slate-500 dark:text-slate-400",
                    children: "Test your knowledge and earn badges"
                })]
            })]
        }), l.jsxs("div", {
            children: [l.jsxs("h3", {
                className: "font-display text-lg font-bold mb-4 flex items-center gap-2",
                children: [l.jsx(sl, {
                    className: "w-5 h-5 text-accent-500"
                }), " Achievement Badges"]
            }), l.jsx("div", {
                className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3",
                children: Hm.map(m => {
                    const h = a.includes(m.id)
                      , v = $m[m.icon] || sl;
                    return l.jsxs("div", {
                        className: `glass-card p-4 text-center transition ${h ? "opacity-100" : "opacity-40 grayscale"}`,
                        children: [l.jsx("div", {
                            className: `w-12 h-12 rounded-2xl mx-auto mb-2 flex items-center justify-center ${h ? "gradient-bg-primary" : "bg-slate-300 dark:bg-white/10"}`,
                            children: l.jsx(v, {
                                className: `w-6 h-6 ${h ? "text-white" : "text-slate-500"}`
                            })
                        }), l.jsx("p", {
                            className: "text-xs font-semibold",
                            children: m.name
                        }), l.jsx("p", {
                            className: "text-[10px] text-slate-500 dark:text-slate-400",
                            children: m.description
                        })]
                    }, m.id)
                }
                )
            })]
        }), l.jsx(Xe, {})]
    })
}
function Wm({mod: e, onBack: t, onComplete: n}) {
    const r = rd[e.icon] || fr;
    return l.jsxs("div", {
        className: "page-enter space-y-5 max-w-2xl mx-auto",
        children: [l.jsxs("button", {
            onClick: t,
            className: "flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-primary-600 transition",
            children: [l.jsx(io, {
                className: "w-4 h-4"
            }), " Back to Learning"]
        }), l.jsxs("div", {
            className: "glass-card p-6 md:p-8",
            children: [l.jsx("div", {
                className: "w-16 h-16 rounded-3xl gradient-bg-primary flex items-center justify-center mb-4",
                children: l.jsx(r, {
                    className: "w-8 h-8 text-white"
                })
            }), l.jsx("h1", {
                className: "font-display text-2xl font-bold mb-1",
                children: e.title
            }), l.jsx("p", {
                className: "text-sm text-slate-500 dark:text-slate-400 mb-6",
                children: e.description
            }), l.jsx("div", {
                className: "space-y-5",
                children: e.content.map( (i, s) => l.jsxs("div", {
                    className: "animate-fade-in-up",
                    style: {
                        animationDelay: `${s * .1}s`
                    },
                    children: [l.jsx("h3", {
                        className: "font-semibold text-primary-600 dark:text-primary-400 mb-1",
                        children: i.heading
                    }), l.jsx("p", {
                        className: "text-sm text-slate-600 dark:text-slate-300 leading-relaxed",
                        children: i.body
                    })]
                }, s))
            }), l.jsx("button", {
                onClick: n,
                className: "btn-primary mt-6 w-full",
                children: "Mark as Complete"
            })]
        })]
    })
}
function Vm({onBack: e, onComplete: t}) {
    const [n,r] = E.useState(0)
      , [i,s] = E.useState(null)
      , [o,a] = E.useState(0)
      , [u,c] = E.useState(!1)
      , [g,m] = E.useState(!1)
      , h = et[n]
      , v = () => {
        i !== null && (c(!0),
        i === h.correct && a(k => k + 1))
    }
      , y = () => {
        n + 1 >= et.length ? (m(!0),
        t(o === et.length)) : (r(k => k + 1),
        s(null),
        c(!1))
    }
    ;
    if (g) {
        const k = o === et.length;
        return l.jsx("div", {
            className: "page-enter max-w-md mx-auto text-center space-y-4",
            children: l.jsxs("div", {
                className: "glass-card p-8 animate-bounce-in",
                children: [l.jsx("div", {
                    className: `w-20 h-20 rounded-3xl mx-auto mb-4 flex items-center justify-center ${k ? "gradient-bg-primary" : "bg-gradient-to-br from-accent-400 to-accent-600"}`,
                    children: l.jsx(ao, {
                        className: "w-10 h-10 text-white"
                    })
                }), l.jsx("h2", {
                    className: "font-display text-2xl font-bold mb-2",
                    children: "Quiz Complete!"
                }), l.jsxs("p", {
                    className: "text-4xl font-bold gradient-text mb-1",
                    children: [o, " / ", et.length]
                }), l.jsx("p", {
                    className: "text-sm text-slate-500 dark:text-slate-400",
                    children: k ? "Perfect score! You earned the Quiz Master badge." : "Keep learning to earn more badges!"
                }), l.jsx("button", {
                    onClick: e,
                    className: "btn-primary mt-6",
                    children: "Back to Learning"
                })]
            })
        })
    }
    return l.jsxs("div", {
        className: "page-enter max-w-xl mx-auto space-y-4",
        children: [l.jsxs("button", {
            onClick: e,
            className: "flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-primary-600 transition",
            children: [l.jsx(io, {
                className: "w-4 h-4"
            }), " Exit Quiz"]
        }), l.jsxs("div", {
            className: "glass-card p-6",
            children: [l.jsxs("div", {
                className: "flex items-center justify-between mb-4",
                children: [l.jsxs("span", {
                    className: "text-sm font-semibold text-slate-500 dark:text-slate-400",
                    children: ["Question ", n + 1, " of ", et.length]
                }), l.jsxs("span", {
                    className: "text-sm font-semibold text-primary-600",
                    children: ["Score: ", o]
                })]
            }), l.jsx("div", {
                className: "w-full h-2 rounded-full bg-slate-200 dark:bg-white/10 mb-6",
                children: l.jsx("div", {
                    className: "h-full rounded-full gradient-bg-primary transition-all",
                    style: {
                        width: `${n / et.length * 100}%`
                    }
                })
            }), l.jsx("h3", {
                className: "font-display text-lg font-bold mb-4",
                children: h.question
            }), l.jsx("div", {
                className: "space-y-2",
                children: h.options.map( (k, z) => {
                    const f = z === h.correct
                      , d = i === z;
                    let p = "glass hover:shadow-glow";
                    return u && (f ? p = "bg-success-100 dark:bg-success-500/20 border-2 border-success-500" : d ? p = "bg-danger-100 dark:bg-danger-500/20 border-2 border-danger-500" : p = "glass opacity-60"),
                    l.jsxs("button", {
                        onClick: () => !u && s(z),
                        disabled: u,
                        className: `w-full flex items-center gap-3 p-4 rounded-xl text-left text-sm transition ${p}`,
                        children: [l.jsx("span", {
                            className: "w-6 h-6 rounded-full bg-white/50 dark:bg-white/10 flex items-center justify-center text-xs font-bold shrink-0",
                            children: String.fromCharCode(65 + z)
                        }), l.jsx("span", {
                            className: "flex-1",
                            children: k
                        }), u && f && l.jsx(Ii, {
                            className: "w-5 h-5 text-success-500"
                        }), u && d && !f && l.jsx(Zc, {
                            className: "w-5 h-5 text-danger-500"
                        })]
                    }, z)
                }
                )
            }), u && l.jsx("div", {
                className: "mt-4 p-3 rounded-xl glass text-sm text-slate-600 dark:text-slate-300 animate-fade-in",
                children: h.explanation
            }), u ? l.jsx("button", {
                onClick: y,
                className: "btn-primary mt-6 w-full",
                children: n + 1 >= et.length ? "See Results" : "Next Question"
            }) : l.jsx("button", {
                onClick: v,
                disabled: i === null,
                className: "btn-primary mt-6 w-full disabled:opacity-50",
                children: "Submit Answer"
            })]
        })]
    })
}
function Qm() {
    const {t: e, theme: t, toggleTheme: n, language: r, setLanguage: i, largeText: s, toggleLargeText: o, notifications: a, toggleNotifications: u} = ge();
    return l.jsxs("div", {
        className: "page-enter space-y-6 max-w-2xl",
        children: [l.jsx(kt, {
            title: e("settings"),
            subtitle: "Customize your experience",
            icon: Kc
        }), l.jsxs("div", {
            className: "glass-card p-6",
            children: [l.jsxs("h3", {
                className: "font-display text-lg font-bold mb-4 flex items-center gap-2",
                children: [l.jsx(sm, {
                    className: "w-5 h-5 text-primary-500"
                }), " ", e("theme")]
            }), l.jsxs("button", {
                onClick: n,
                className: "w-full flex items-center justify-between p-4 rounded-2xl glass hover:shadow-glow transition",
                children: [l.jsxs("div", {
                    className: "flex items-center gap-3",
                    children: [t === "dark" ? l.jsx(yi, {
                        className: "w-5 h-5 text-primary-500"
                    }) : l.jsx(lr, {
                        className: "w-5 h-5 text-accent-500"
                    }), l.jsx("span", {
                        className: "font-medium",
                        children: e(t === "dark" ? "darkMode" : "lightMode")
                    })]
                }), l.jsx("div", {
                    className: `w-12 h-7 rounded-full p-1 transition ${t === "dark" ? "gradient-bg-primary" : "bg-slate-300"}`,
                    children: l.jsx("div", {
                        className: `w-5 h-5 rounded-full bg-white transition-transform ${t === "dark" ? "translate-x-5" : ""}`
                    })
                })]
            })]
        }), l.jsxs("div", {
            className: "glass-card p-6",
            children: [l.jsxs("h3", {
                className: "font-display text-lg font-bold mb-4 flex items-center gap-2",
                children: [l.jsx(Ca, {
                    className: "w-5 h-5 text-primary-500"
                }), " Accessibility"]
            }), l.jsxs("button", {
                onClick: o,
                className: "w-full flex items-center justify-between p-4 rounded-2xl glass hover:shadow-glow transition",
                children: [l.jsxs("div", {
                    className: "flex items-center gap-3",
                    children: [l.jsx(Ca, {
                        className: "w-5 h-5 text-primary-500"
                    }), l.jsx("span", {
                        className: "font-medium",
                        children: e("largeText")
                    })]
                }), l.jsx("div", {
                    className: `w-12 h-7 rounded-full p-1 transition ${s ? "gradient-bg-primary" : "bg-slate-300"}`,
                    children: l.jsx("div", {
                        className: `w-5 h-5 rounded-full bg-white transition-transform ${s ? "translate-x-5" : ""}`
                    })
                })]
            })]
        }), l.jsxs("div", {
            className: "glass-card p-6",
            children: [l.jsxs("h3", {
                className: "font-display text-lg font-bold mb-4 flex items-center gap-2",
                children: [l.jsx(Xp, {
                    className: "w-5 h-5 text-primary-500"
                }), " ", e("language")]
            }), l.jsx("div", {
                className: "grid grid-cols-2 sm:grid-cols-3 gap-2",
                children: Fp.map(c => l.jsxs("button", {
                    onClick: () => i(c.code),
                    className: `flex items-center gap-2 p-3 rounded-xl text-sm font-medium transition ${r === c.code ? "gradient-bg-primary text-white shadow-lg" : "glass text-slate-600 dark:text-slate-300"}`,
                    children: [l.jsx("span", {
                        className: "text-lg",
                        children: c.flag
                    }), l.jsx("span", {
                        children: c.label
                    })]
                }, c.code))
            })]
        }), l.jsxs("div", {
            className: "glass-card p-6",
            children: [l.jsxs("h3", {
                className: "font-display text-lg font-bold mb-4 flex items-center gap-2",
                children: [l.jsx(Sa, {
                    className: "w-5 h-5 text-primary-500"
                }), " Notifications"]
            }), l.jsxs("button", {
                onClick: u,
                className: "w-full flex items-center justify-between p-4 rounded-2xl glass hover:shadow-glow transition",
                children: [l.jsxs("div", {
                    className: "flex items-center gap-3",
                    children: [l.jsx(Sa, {
                        className: "w-5 h-5 text-primary-500"
                    }), l.jsx("span", {
                        className: "font-medium",
                        children: e("notifications")
                    })]
                }), l.jsx("div", {
                    className: `w-12 h-7 rounded-full p-1 transition ${a ? "gradient-bg-primary" : "bg-slate-300"}`,
                    children: l.jsx("div", {
                        className: `w-5 h-5 rounded-full bg-white transition-transform ${a ? "translate-x-5" : ""}`
                    })
                })]
            }), a && l.jsx("p", {
                className: "text-xs text-slate-500 dark:text-slate-400 mt-2",
                children: "Daily health tips and reminders will be saved to your device."
            })]
        }), l.jsx(Xe, {})]
    })
}
function Km() {
    const {t: e} = ge()
      , t = [{
        name: "Udayveer",
        role: "Co-Creator & Developer",
        bio: "Designed and built the LifeGuard AI app — crafting the interface, first-aid guides, and the AI assistant to make emergency guidance accessible to everyone.",
        icon: fm,
        gradient: "from-primary-400 to-primary-600"
    }, {
        name: "Jagrit Jain",
        role: "Co-Creator & Developer",
        bio: "Co-developed the app — contributing to the health tools, learning center, and the educational content that powers the first-aid experience.",
        icon: sr,
        gradient: "from-secondary-400 to-secondary-600"
    }];
    return l.jsxs("div", {
        className: "page-enter space-y-6 max-w-3xl mx-auto",
        children: [l.jsx(kt, {
            title: e("creators"),
            subtitle: "The people behind LifeGuard AI",
            icon: Gc
        }), l.jsxs("div", {
            className: "glass-card p-6 md:p-8 text-center",
            children: [l.jsx("div", {
                className: "w-16 h-16 rounded-3xl gradient-bg-primary flex items-center justify-center mx-auto mb-4 animate-float",
                children: l.jsx(yt, {
                    className: "w-8 h-8 text-white"
                })
            }), l.jsx("h2", {
                className: "font-display text-2xl font-bold mb-2",
                children: "Built with care for safety"
            }), l.jsx("p", {
                className: "text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl mx-auto",
                children: "LifeGuard AI was created to help people respond quickly and confidently to common injuries and medical emergencies. This project was developed for a science exhibition, prioritizing user safety, accessibility, and a polished experience."
            })]
        }), l.jsx("div", {
            className: "grid sm:grid-cols-2 gap-5",
            children: t.map( (n, r) => {
                const i = n.icon;
                return l.jsxs("div", {
                    className: "glass-card p-6 text-center animate-fade-in-up hover:shadow-glow transition",
                    style: {
                        animationDelay: `${r * .1}s`
                    },
                    children: [l.jsx("div", {
                        className: `w-20 h-20 rounded-3xl bg-gradient-to-br ${n.gradient} flex items-center justify-center mx-auto mb-4 shadow-lg`,
                        children: l.jsx(i, {
                            className: "w-10 h-10 text-white"
                        })
                    }), l.jsx("h3", {
                        className: "font-display text-xl font-bold mb-1",
                        children: n.name
                    }), l.jsx("p", {
                        className: "text-sm font-semibold text-primary-600 dark:text-primary-400 mb-3",
                        children: n.role
                    }), l.jsx("p", {
                        className: "text-sm text-slate-600 dark:text-slate-300 leading-relaxed",
                        children: n.bio
                    })]
                }, n.name)
            }
            )
        }), l.jsxs("div", {
            className: "glass-card p-6",
            children: [l.jsxs("div", {
                className: "flex items-center gap-3 mb-4",
                children: [l.jsx("div", {
                    className: "w-10 h-10 rounded-xl bg-gradient-to-br from-accent-400 to-accent-600 flex items-center justify-center",
                    children: l.jsx(cm, {
                        className: "w-5 h-5 text-white"
                    })
                }), l.jsx("h3", {
                    className: "font-display text-lg font-bold",
                    children: "Our Mission"
                })]
            }), l.jsx("p", {
                className: "text-sm text-slate-600 dark:text-slate-300 leading-relaxed",
                children: "To make reliable, easy-to-understand first-aid guidance available to everyone — anytime, anywhere, even offline. We believe that clear information and calm guidance can make a real difference when seconds count."
            }), l.jsx("div", {
                className: "grid grid-cols-3 gap-3 mt-5",
                children: [{
                    icon: sr,
                    label: "Safety First"
                }, {
                    icon: lo,
                    label: "Accessible Care"
                }, {
                    icon: sl,
                    label: "Educational"
                }].map(n => {
                    const r = n.icon;
                    return l.jsxs("div", {
                        className: "glass rounded-2xl p-4 text-center",
                        children: [l.jsx(r, {
                            className: "w-6 h-6 text-primary-500 mx-auto mb-2"
                        }), l.jsx("p", {
                            className: "text-xs font-semibold text-slate-600 dark:text-slate-300",
                            children: n.label
                        })]
                    }, n.label)
                }
                )
            })]
        }), l.jsx(Xe, {})]
    })
}
function Gm() {
    const [e,t] = E.useState("home")
      , [n,r] = E.useState(null)
      , i = o => {
        t(o),
        o !== "guide" && r(null),
        window.scrollTo({
            top: 0,
            behavior: "auto"
        })
    }
      , s = o => {
        r(o),
        t("guide"),
        window.scrollTo({
            top: 0,
            behavior: "auto"
        })
    }
    ;
    return l.jsxs("div", {
        className: "min-h-screen relative overflow-x-hidden",
        children: [l.jsx(wm, {}), l.jsx(vm, {
            current: e,
            onNavigate: i
        }), l.jsxs("main", {
            className: "lg:ml-64 pt-16 lg:pt-0 px-4 md:px-8 py-6 lg:py-8 relative z-10 max-w-7xl mx-auto",
            children: [e === "home" && l.jsx(jm, {
                onNavigate: i,
                onSelectInjury: s
            }), e === "guide" && l.jsx(Tm, {
                selectedId: n,
                onSelectInjury: s,
                onBack: () => r(null)
            }), e === "assistant" && l.jsx(Pm, {
                onSelectInjury: s
            }), e === "emergency" && l.jsx(Dm, {}), e === "medicines" && l.jsx(Im, {}), e === "tools" && l.jsx(_m, {}), e === "learning" && l.jsx(Um, {}), e === "settings" && l.jsx(Qm, {}), e === "creators" && l.jsx(Km, {})]
        })]
    })
}
function qm() {
    return E.useEffect( () => {
        "serviceWorker"in navigator && navigator.serviceWorker.register("/sw.js").catch( () => {}
        )
    }
    , []),
    l.jsx(Op, {
        children: l.jsx(Gm, {})
    })
}
Hc(document.getElementById("root")).render(l.jsx(E.StrictMode, {
    children: l.jsx(qm, {})
}));

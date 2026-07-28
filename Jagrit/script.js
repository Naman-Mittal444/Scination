(function() {
    const t = document.createElement("link").relList;
    if (t && t.supports && t.supports("modulepreload"))
        return;
    for (const s of document.querySelectorAll('link[rel="modulepreload"]'))
        r(s);
    new MutationObserver(s => {
        for (const l of s)
            if (l.type === "childList")
                for (const i of l.addedNodes)
                    i.tagName === "LINK" && i.rel === "modulepreload" && r(i)
    }
    ).observe(document, {
        childList: !0,
        subtree: !0
    });
    function n(s) {
        const l = {};
        return s.integrity && (l.integrity = s.integrity),
        s.referrerPolicy && (l.referrerPolicy = s.referrerPolicy),
        s.crossOrigin === "use-credentials" ? l.credentials = "include" : s.crossOrigin === "anonymous" ? l.credentials = "omit" : l.credentials = "same-origin",
        l
    }
    function r(s) {
        if (s.ep)
            return;
        s.ep = !0;
        const l = n(s);
        fetch(s.href, l)
    }
}
)();
var Ha = {
    exports: {}
}
  , bs = {}
  , Va = {
    exports: {}
}
  , I = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ar = Symbol.for("react.element")
  , yd = Symbol.for("react.portal")
  , gd = Symbol.for("react.fragment")
  , xd = Symbol.for("react.strict_mode")
  , vd = Symbol.for("react.profiler")
  , wd = Symbol.for("react.provider")
  , kd = Symbol.for("react.context")
  , bd = Symbol.for("react.forward_ref")
  , Nd = Symbol.for("react.suspense")
  , jd = Symbol.for("react.memo")
  , Sd = Symbol.for("react.lazy")
  , xi = Symbol.iterator;
function Cd(e) {
    return e === null || typeof e != "object" ? null : (e = xi && e[xi] || e["@@iterator"],
    typeof e == "function" ? e : null)
}
var Ba = {
    isMounted: function() {
        return !1
    },
    enqueueForceUpdate: function() {},
    enqueueReplaceState: function() {},
    enqueueSetState: function() {}
}
  , qa = Object.assign
  , Qa = {};
function gn(e, t, n) {
    this.props = e,
    this.context = t,
    this.refs = Qa,
    this.updater = n || Ba
}
gn.prototype.isReactComponent = {};
gn.prototype.setState = function(e, t) {
    if (typeof e != "object" && typeof e != "function" && e != null)
        throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, e, t, "setState")
}
;
gn.prototype.forceUpdate = function(e) {
    this.updater.enqueueForceUpdate(this, e, "forceUpdate")
}
;
function Ya() {}
Ya.prototype = gn.prototype;
function go(e, t, n) {
    this.props = e,
    this.context = t,
    this.refs = Qa,
    this.updater = n || Ba
}
var xo = go.prototype = new Ya;
xo.constructor = go;
qa(xo, gn.prototype);
xo.isPureReactComponent = !0;
var vi = Array.isArray
  , Ka = Object.prototype.hasOwnProperty
  , vo = {
    current: null
}
  , Ga = {
    key: !0,
    ref: !0,
    __self: !0,
    __source: !0
};
function Xa(e, t, n) {
    var r, s = {}, l = null, i = null;
    if (t != null)
        for (r in t.ref !== void 0 && (i = t.ref),
        t.key !== void 0 && (l = "" + t.key),
        t)
            Ka.call(t, r) && !Ga.hasOwnProperty(r) && (s[r] = t[r]);
    var a = arguments.length - 2;
    if (a === 1)
        s.children = n;
    else if (1 < a) {
        for (var c = Array(a), u = 0; u < a; u++)
            c[u] = arguments[u + 2];
        s.children = c
    }
    if (e && e.defaultProps)
        for (r in a = e.defaultProps,
        a)
            s[r] === void 0 && (s[r] = a[r]);
    return {
        $$typeof: ar,
        type: e,
        key: l,
        ref: i,
        props: s,
        _owner: vo.current
    }
}
function Ed(e, t) {
    return {
        $$typeof: ar,
        type: e.type,
        key: t,
        ref: e.ref,
        props: e.props,
        _owner: e._owner
    }
}
function wo(e) {
    return typeof e == "object" && e !== null && e.$$typeof === ar
}
function Pd(e) {
    var t = {
        "=": "=0",
        ":": "=2"
    };
    return "$" + e.replace(/[=:]/g, function(n) {
        return t[n]
    })
}
var wi = /\/+/g;
function Hs(e, t) {
    return typeof e == "object" && e !== null && e.key != null ? Pd("" + e.key) : t.toString(36)
}
function Fr(e, t, n, r, s) {
    var l = typeof e;
    (l === "undefined" || l === "boolean") && (e = null);
    var i = !1;
    if (e === null)
        i = !0;
    else
        switch (l) {
        case "string":
        case "number":
            i = !0;
            break;
        case "object":
            switch (e.$$typeof) {
            case ar:
            case yd:
                i = !0
            }
        }
    if (i)
        return i = e,
        s = s(i),
        e = r === "" ? "." + Hs(i, 0) : r,
        vi(s) ? (n = "",
        e != null && (n = e.replace(wi, "$&/") + "/"),
        Fr(s, t, n, "", function(u) {
            return u
        })) : s != null && (wo(s) && (s = Ed(s, n + (!s.key || i && i.key === s.key ? "" : ("" + s.key).replace(wi, "$&/") + "/") + e)),
        t.push(s)),
        1;
    if (i = 0,
    r = r === "" ? "." : r + ":",
    vi(e))
        for (var a = 0; a < e.length; a++) {
            l = e[a];
            var c = r + Hs(l, a);
            i += Fr(l, t, n, c, s)
        }
    else if (c = Cd(e),
    typeof c == "function")
        for (e = c.call(e),
        a = 0; !(l = e.next()).done; )
            l = l.value,
            c = r + Hs(l, a++),
            i += Fr(l, t, n, c, s);
    else if (l === "object")
        throw t = String(e),
        Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
    return i
}
function gr(e, t, n) {
    if (e == null)
        return e;
    var r = []
      , s = 0;
    return Fr(e, r, "", "", function(l) {
        return t.call(n, l, s++)
    }),
    r
}
function Td(e) {
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
  , Or = {
    transition: null
}
  , Md = {
    ReactCurrentDispatcher: ue,
    ReactCurrentBatchConfig: Or,
    ReactCurrentOwner: vo
};
function Za() {
    throw Error("act(...) is not supported in production builds of React.")
}
I.Children = {
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
        if (!wo(e))
            throw Error("React.Children.only expected to receive a single React element child.");
        return e
    }
};
I.Component = gn;
I.Fragment = gd;
I.Profiler = vd;
I.PureComponent = go;
I.StrictMode = xd;
I.Suspense = Nd;
I.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Md;
I.act = Za;
I.cloneElement = function(e, t, n) {
    if (e == null)
        throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
    var r = qa({}, e.props)
      , s = e.key
      , l = e.ref
      , i = e._owner;
    if (t != null) {
        if (t.ref !== void 0 && (l = t.ref,
        i = vo.current),
        t.key !== void 0 && (s = "" + t.key),
        e.type && e.type.defaultProps)
            var a = e.type.defaultProps;
        for (c in t)
            Ka.call(t, c) && !Ga.hasOwnProperty(c) && (r[c] = t[c] === void 0 && a !== void 0 ? a[c] : t[c])
    }
    var c = arguments.length - 2;
    if (c === 1)
        r.children = n;
    else if (1 < c) {
        a = Array(c);
        for (var u = 0; u < c; u++)
            a[u] = arguments[u + 2];
        r.children = a
    }
    return {
        $$typeof: ar,
        type: e.type,
        key: s,
        ref: l,
        props: r,
        _owner: i
    }
}
;
I.createContext = function(e) {
    return e = {
        $$typeof: kd,
        _currentValue: e,
        _currentValue2: e,
        _threadCount: 0,
        Provider: null,
        Consumer: null,
        _defaultValue: null,
        _globalName: null
    },
    e.Provider = {
        $$typeof: wd,
        _context: e
    },
    e.Consumer = e
}
;
I.createElement = Xa;
I.createFactory = function(e) {
    var t = Xa.bind(null, e);
    return t.type = e,
    t
}
;
I.createRef = function() {
    return {
        current: null
    }
}
;
I.forwardRef = function(e) {
    return {
        $$typeof: bd,
        render: e
    }
}
;
I.isValidElement = wo;
I.lazy = function(e) {
    return {
        $$typeof: Sd,
        _payload: {
            _status: -1,
            _result: e
        },
        _init: Td
    }
}
;
I.memo = function(e, t) {
    return {
        $$typeof: jd,
        type: e,
        compare: t === void 0 ? null : t
    }
}
;
I.startTransition = function(e) {
    var t = Or.transition;
    Or.transition = {};
    try {
        e()
    } finally {
        Or.transition = t
    }
}
;
I.unstable_act = Za;
I.useCallback = function(e, t) {
    return ue.current.useCallback(e, t)
}
;
I.useContext = function(e) {
    return ue.current.useContext(e)
}
;
I.useDebugValue = function() {}
;
I.useDeferredValue = function(e) {
    return ue.current.useDeferredValue(e)
}
;
I.useEffect = function(e, t) {
    return ue.current.useEffect(e, t)
}
;
I.useId = function() {
    return ue.current.useId()
}
;
I.useImperativeHandle = function(e, t, n) {
    return ue.current.useImperativeHandle(e, t, n)
}
;
I.useInsertionEffect = function(e, t) {
    return ue.current.useInsertionEffect(e, t)
}
;
I.useLayoutEffect = function(e, t) {
    return ue.current.useLayoutEffect(e, t)
}
;
I.useMemo = function(e, t) {
    return ue.current.useMemo(e, t)
}
;
I.useReducer = function(e, t, n) {
    return ue.current.useReducer(e, t, n)
}
;
I.useRef = function(e) {
    return ue.current.useRef(e)
}
;
I.useState = function(e) {
    return ue.current.useState(e)
}
;
I.useSyncExternalStore = function(e, t, n) {
    return ue.current.useSyncExternalStore(e, t, n)
}
;
I.useTransition = function() {
    return ue.current.useTransition()
}
;
I.version = "18.3.1";
Va.exports = I;
var b = Va.exports;
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var _d = b
  , zd = Symbol.for("react.element")
  , Ld = Symbol.for("react.fragment")
  , Id = Object.prototype.hasOwnProperty
  , Ad = _d.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner
  , Rd = {
    key: !0,
    ref: !0,
    __self: !0,
    __source: !0
};
function Ja(e, t, n) {
    var r, s = {}, l = null, i = null;
    n !== void 0 && (l = "" + n),
    t.key !== void 0 && (l = "" + t.key),
    t.ref !== void 0 && (i = t.ref);
    for (r in t)
        Id.call(t, r) && !Rd.hasOwnProperty(r) && (s[r] = t[r]);
    if (e && e.defaultProps)
        for (r in t = e.defaultProps,
        t)
            s[r] === void 0 && (s[r] = t[r]);
    return {
        $$typeof: zd,
        type: e,
        key: l,
        ref: i,
        props: s,
        _owner: Ad.current
    }
}
bs.Fragment = Ld;
bs.jsx = Ja;
bs.jsxs = Ja;
Ha.exports = bs;
var o = Ha.exports
  , ec = {
    exports: {}
}
  , be = {}
  , tc = {
    exports: {}
}
  , nc = {};
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
    function t(P, _) {
        var L = P.length;
        P.push(_);
        e: for (; 0 < L; ) {
            var Q = L - 1 >>> 1
              , Z = P[Q];
            if (0 < s(Z, _))
                P[Q] = _,
                P[L] = Z,
                L = Q;
            else
                break e
        }
    }
    function n(P) {
        return P.length === 0 ? null : P[0]
    }
    function r(P) {
        if (P.length === 0)
            return null;
        var _ = P[0]
          , L = P.pop();
        if (L !== _) {
            P[0] = L;
            e: for (var Q = 0, Z = P.length, mr = Z >>> 1; Q < mr; ) {
                var Nt = 2 * (Q + 1) - 1
                  , Ws = P[Nt]
                  , jt = Nt + 1
                  , yr = P[jt];
                if (0 > s(Ws, L))
                    jt < Z && 0 > s(yr, Ws) ? (P[Q] = yr,
                    P[jt] = L,
                    Q = jt) : (P[Q] = Ws,
                    P[Nt] = L,
                    Q = Nt);
                else if (jt < Z && 0 > s(yr, L))
                    P[Q] = yr,
                    P[jt] = L,
                    Q = jt;
                else
                    break e
            }
        }
        return _
    }
    function s(P, _) {
        var L = P.sortIndex - _.sortIndex;
        return L !== 0 ? L : P.id - _.id
    }
    if (typeof performance == "object" && typeof performance.now == "function") {
        var l = performance;
        e.unstable_now = function() {
            return l.now()
        }
    } else {
        var i = Date
          , a = i.now();
        e.unstable_now = function() {
            return i.now() - a
        }
    }
    var c = []
      , u = []
      , h = 1
      , y = null
      , m = 3
      , w = !1
      , g = !1
      , x = !1
      , j = typeof setTimeout == "function" ? setTimeout : null
      , d = typeof clearTimeout == "function" ? clearTimeout : null
      , p = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function f(P) {
        for (var _ = n(u); _ !== null; ) {
            if (_.callback === null)
                r(u);
            else if (_.startTime <= P)
                r(u),
                _.sortIndex = _.expirationTime,
                t(c, _);
            else
                break;
            _ = n(u)
        }
    }
    function v(P) {
        if (x = !1,
        f(P),
        !g)
            if (n(c) !== null)
                g = !0,
                Us(N);
            else {
                var _ = n(u);
                _ !== null && $s(v, _.startTime - P)
            }
    }
    function N(P, _) {
        g = !1,
        x && (x = !1,
        d(M),
        M = -1),
        w = !0;
        var L = m;
        try {
            for (f(_),
            y = n(c); y !== null && (!(y.expirationTime > _) || P && !_e()); ) {
                var Q = y.callback;
                if (typeof Q == "function") {
                    y.callback = null,
                    m = y.priorityLevel;
                    var Z = Q(y.expirationTime <= _);
                    _ = e.unstable_now(),
                    typeof Z == "function" ? y.callback = Z : y === n(c) && r(c),
                    f(_)
                } else
                    r(c);
                y = n(c)
            }
            if (y !== null)
                var mr = !0;
            else {
                var Nt = n(u);
                Nt !== null && $s(v, Nt.startTime - _),
                mr = !1
            }
            return mr
        } finally {
            y = null,
            m = L,
            w = !1
        }
    }
    var S = !1
      , E = null
      , M = -1
      , q = 5
      , A = -1;
    function _e() {
        return !(e.unstable_now() - A < q)
    }
    function wn() {
        if (E !== null) {
            var P = e.unstable_now();
            A = P;
            var _ = !0;
            try {
                _ = E(!0, P)
            } finally {
                _ ? kn() : (S = !1,
                E = null)
            }
        } else
            S = !1
    }
    var kn;
    if (typeof p == "function")
        kn = function() {
            p(wn)
        }
        ;
    else if (typeof MessageChannel < "u") {
        var gi = new MessageChannel
          , md = gi.port2;
        gi.port1.onmessage = wn,
        kn = function() {
            md.postMessage(null)
        }
    } else
        kn = function() {
            j(wn, 0)
        }
        ;
    function Us(P) {
        E = P,
        S || (S = !0,
        kn())
    }
    function $s(P, _) {
        M = j(function() {
            P(e.unstable_now())
        }, _)
    }
    e.unstable_IdlePriority = 5,
    e.unstable_ImmediatePriority = 1,
    e.unstable_LowPriority = 4,
    e.unstable_NormalPriority = 3,
    e.unstable_Profiling = null,
    e.unstable_UserBlockingPriority = 2,
    e.unstable_cancelCallback = function(P) {
        P.callback = null
    }
    ,
    e.unstable_continueExecution = function() {
        g || w || (g = !0,
        Us(N))
    }
    ,
    e.unstable_forceFrameRate = function(P) {
        0 > P || 125 < P ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : q = 0 < P ? Math.floor(1e3 / P) : 5
    }
    ,
    e.unstable_getCurrentPriorityLevel = function() {
        return m
    }
    ,
    e.unstable_getFirstCallbackNode = function() {
        return n(c)
    }
    ,
    e.unstable_next = function(P) {
        switch (m) {
        case 1:
        case 2:
        case 3:
            var _ = 3;
            break;
        default:
            _ = m
        }
        var L = m;
        m = _;
        try {
            return P()
        } finally {
            m = L
        }
    }
    ,
    e.unstable_pauseExecution = function() {}
    ,
    e.unstable_requestPaint = function() {}
    ,
    e.unstable_runWithPriority = function(P, _) {
        switch (P) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
            break;
        default:
            P = 3
        }
        var L = m;
        m = P;
        try {
            return _()
        } finally {
            m = L
        }
    }
    ,
    e.unstable_scheduleCallback = function(P, _, L) {
        var Q = e.unstable_now();
        switch (typeof L == "object" && L !== null ? (L = L.delay,
        L = typeof L == "number" && 0 < L ? Q + L : Q) : L = Q,
        P) {
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
        return Z = L + Z,
        P = {
            id: h++,
            callback: _,
            priorityLevel: P,
            startTime: L,
            expirationTime: Z,
            sortIndex: -1
        },
        L > Q ? (P.sortIndex = L,
        t(u, P),
        n(c) === null && P === n(u) && (x ? (d(M),
        M = -1) : x = !0,
        $s(v, L - Q))) : (P.sortIndex = Z,
        t(c, P),
        g || w || (g = !0,
        Us(N))),
        P
    }
    ,
    e.unstable_shouldYield = _e,
    e.unstable_wrapCallback = function(P) {
        var _ = m;
        return function() {
            var L = m;
            m = _;
            try {
                return P.apply(this, arguments)
            } finally {
                m = L
            }
        }
    }
}
)(nc);
tc.exports = nc;
var Fd = tc.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Od = b
  , ke = Fd;
function k(e) {
    for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++)
        t += "&args[]=" + encodeURIComponent(arguments[n]);
    return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
}
var rc = new Set
  , Vn = {};
function Dt(e, t) {
    an(e, t),
    an(e + "Capture", t)
}
function an(e, t) {
    for (Vn[e] = t,
    e = 0; e < t.length; e++)
        rc.add(t[e])
}
var Ze = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u")
  , xl = Object.prototype.hasOwnProperty
  , Dd = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/
  , ki = {}
  , bi = {};
function Ud(e) {
    return xl.call(bi, e) ? !0 : xl.call(ki, e) ? !1 : Dd.test(e) ? bi[e] = !0 : (ki[e] = !0,
    !1)
}
function $d(e, t, n, r) {
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
function Wd(e, t, n, r) {
    if (t === null || typeof t > "u" || $d(e, t, n, r))
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
function de(e, t, n, r, s, l, i) {
    this.acceptsBooleans = t === 2 || t === 3 || t === 4,
    this.attributeName = r,
    this.attributeNamespace = s,
    this.mustUseProperty = n,
    this.propertyName = e,
    this.type = t,
    this.sanitizeURL = l,
    this.removeEmptyString = i
}
var re = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
    re[e] = new de(e,0,!1,e,null,!1,!1)
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
    var t = e[0];
    re[t] = new de(t,1,!1,e[1],null,!1,!1)
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
    re[e] = new de(e,2,!1,e.toLowerCase(),null,!1,!1)
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
    re[e] = new de(e,2,!1,e,null,!1,!1)
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
    re[e] = new de(e,3,!1,e.toLowerCase(),null,!1,!1)
});
["checked", "multiple", "muted", "selected"].forEach(function(e) {
    re[e] = new de(e,3,!0,e,null,!1,!1)
});
["capture", "download"].forEach(function(e) {
    re[e] = new de(e,4,!1,e,null,!1,!1)
});
["cols", "rows", "size", "span"].forEach(function(e) {
    re[e] = new de(e,6,!1,e,null,!1,!1)
});
["rowSpan", "start"].forEach(function(e) {
    re[e] = new de(e,5,!1,e.toLowerCase(),null,!1,!1)
});
var ko = /[\-:]([a-z])/g;
function bo(e) {
    return e[1].toUpperCase()
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
    var t = e.replace(ko, bo);
    re[t] = new de(t,1,!1,e,null,!1,!1)
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
    var t = e.replace(ko, bo);
    re[t] = new de(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)
});
["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
    var t = e.replace(ko, bo);
    re[t] = new de(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)
});
["tabIndex", "crossOrigin"].forEach(function(e) {
    re[e] = new de(e,1,!1,e.toLowerCase(),null,!1,!1)
});
re.xlinkHref = new de("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);
["src", "href", "action", "formAction"].forEach(function(e) {
    re[e] = new de(e,1,!1,e.toLowerCase(),null,!0,!0)
});
function No(e, t, n, r) {
    var s = re.hasOwnProperty(t) ? re[t] : null;
    (s !== null ? s.type !== 0 : r || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (Wd(t, n, s, r) && (n = null),
    r || s === null ? Ud(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : s.mustUseProperty ? e[s.propertyName] = n === null ? s.type === 3 ? !1 : "" : n : (t = s.attributeName,
    r = s.attributeNamespace,
    n === null ? e.removeAttribute(t) : (s = s.type,
    n = s === 3 || s === 4 && n === !0 ? "" : "" + n,
    r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))))
}
var nt = Od.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
  , xr = Symbol.for("react.element")
  , Ht = Symbol.for("react.portal")
  , Vt = Symbol.for("react.fragment")
  , jo = Symbol.for("react.strict_mode")
  , vl = Symbol.for("react.profiler")
  , sc = Symbol.for("react.provider")
  , lc = Symbol.for("react.context")
  , So = Symbol.for("react.forward_ref")
  , wl = Symbol.for("react.suspense")
  , kl = Symbol.for("react.suspense_list")
  , Co = Symbol.for("react.memo")
  , st = Symbol.for("react.lazy")
  , oc = Symbol.for("react.offscreen")
  , Ni = Symbol.iterator;
function bn(e) {
    return e === null || typeof e != "object" ? null : (e = Ni && e[Ni] || e["@@iterator"],
    typeof e == "function" ? e : null)
}
var V = Object.assign, Vs;
function _n(e) {
    if (Vs === void 0)
        try {
            throw Error()
        } catch (n) {
            var t = n.stack.trim().match(/\n( *(at )?)/);
            Vs = t && t[1] || ""
        }
    return `
` + Vs + e
}
var Bs = !1;
function qs(e, t) {
    if (!e || Bs)
        return "";
    Bs = !0;
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
                } catch (u) {
                    var r = u
                }
                Reflect.construct(e, [], t)
            } else {
                try {
                    t.call()
                } catch (u) {
                    r = u
                }
                e.call(t.prototype)
            }
        else {
            try {
                throw Error()
            } catch (u) {
                r = u
            }
            e()
        }
    } catch (u) {
        if (u && r && typeof u.stack == "string") {
            for (var s = u.stack.split(`
`), l = r.stack.split(`
`), i = s.length - 1, a = l.length - 1; 1 <= i && 0 <= a && s[i] !== l[a]; )
                a--;
            for (; 1 <= i && 0 <= a; i--,
            a--)
                if (s[i] !== l[a]) {
                    if (i !== 1 || a !== 1)
                        do
                            if (i--,
                            a--,
                            0 > a || s[i] !== l[a]) {
                                var c = `
` + s[i].replace(" at new ", " at ");
                                return e.displayName && c.includes("<anonymous>") && (c = c.replace("<anonymous>", e.displayName)),
                                c
                            }
                        while (1 <= i && 0 <= a);
                    break
                }
        }
    } finally {
        Bs = !1,
        Error.prepareStackTrace = n
    }
    return (e = e ? e.displayName || e.name : "") ? _n(e) : ""
}
function Hd(e) {
    switch (e.tag) {
    case 5:
        return _n(e.type);
    case 16:
        return _n("Lazy");
    case 13:
        return _n("Suspense");
    case 19:
        return _n("SuspenseList");
    case 0:
    case 2:
    case 15:
        return e = qs(e.type, !1),
        e;
    case 11:
        return e = qs(e.type.render, !1),
        e;
    case 1:
        return e = qs(e.type, !0),
        e;
    default:
        return ""
    }
}
function bl(e) {
    if (e == null)
        return null;
    if (typeof e == "function")
        return e.displayName || e.name || null;
    if (typeof e == "string")
        return e;
    switch (e) {
    case Vt:
        return "Fragment";
    case Ht:
        return "Portal";
    case vl:
        return "Profiler";
    case jo:
        return "StrictMode";
    case wl:
        return "Suspense";
    case kl:
        return "SuspenseList"
    }
    if (typeof e == "object")
        switch (e.$$typeof) {
        case lc:
            return (e.displayName || "Context") + ".Consumer";
        case sc:
            return (e._context.displayName || "Context") + ".Provider";
        case So:
            var t = e.render;
            return e = e.displayName,
            e || (e = t.displayName || t.name || "",
            e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"),
            e;
        case Co:
            return t = e.displayName || null,
            t !== null ? t : bl(e.type) || "Memo";
        case st:
            t = e._payload,
            e = e._init;
            try {
                return bl(e(t))
            } catch {}
        }
    return null
}
function Vd(e) {
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
        return bl(t);
    case 8:
        return t === jo ? "StrictMode" : "Mode";
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
function xt(e) {
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
function ic(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio")
}
function Bd(e) {
    var t = ic(e) ? "checked" : "value"
      , n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t)
      , r = "" + e[t];
    if (!e.hasOwnProperty(t) && typeof n < "u" && typeof n.get == "function" && typeof n.set == "function") {
        var s = n.get
          , l = n.set;
        return Object.defineProperty(e, t, {
            configurable: !0,
            get: function() {
                return s.call(this)
            },
            set: function(i) {
                r = "" + i,
                l.call(this, i)
            }
        }),
        Object.defineProperty(e, t, {
            enumerable: n.enumerable
        }),
        {
            getValue: function() {
                return r
            },
            setValue: function(i) {
                r = "" + i
            },
            stopTracking: function() {
                e._valueTracker = null,
                delete e[t]
            }
        }
    }
}
function vr(e) {
    e._valueTracker || (e._valueTracker = Bd(e))
}
function ac(e) {
    if (!e)
        return !1;
    var t = e._valueTracker;
    if (!t)
        return !0;
    var n = t.getValue()
      , r = "";
    return e && (r = ic(e) ? e.checked ? "true" : "false" : e.value),
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
function Nl(e, t) {
    var n = t.checked;
    return V({}, t, {
        defaultChecked: void 0,
        defaultValue: void 0,
        value: void 0,
        checked: n ?? e._wrapperState.initialChecked
    })
}
function ji(e, t) {
    var n = t.defaultValue == null ? "" : t.defaultValue
      , r = t.checked != null ? t.checked : t.defaultChecked;
    n = xt(t.value != null ? t.value : n),
    e._wrapperState = {
        initialChecked: r,
        initialValue: n,
        controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null
    }
}
function cc(e, t) {
    t = t.checked,
    t != null && No(e, "checked", t, !1)
}
function jl(e, t) {
    cc(e, t);
    var n = xt(t.value)
      , r = t.type;
    if (n != null)
        r === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
    else if (r === "submit" || r === "reset") {
        e.removeAttribute("value");
        return
    }
    t.hasOwnProperty("value") ? Sl(e, t.type, n) : t.hasOwnProperty("defaultValue") && Sl(e, t.type, xt(t.defaultValue)),
    t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked)
}
function Si(e, t, n) {
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
function Sl(e, t, n) {
    (t !== "number" || Kr(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n))
}
var zn = Array.isArray;
function tn(e, t, n, r) {
    if (e = e.options,
    t) {
        t = {};
        for (var s = 0; s < n.length; s++)
            t["$" + n[s]] = !0;
        for (n = 0; n < e.length; n++)
            s = t.hasOwnProperty("$" + e[n].value),
            e[n].selected !== s && (e[n].selected = s),
            s && r && (e[n].defaultSelected = !0)
    } else {
        for (n = "" + xt(n),
        t = null,
        s = 0; s < e.length; s++) {
            if (e[s].value === n) {
                e[s].selected = !0,
                r && (e[s].defaultSelected = !0);
                return
            }
            t !== null || e[s].disabled || (t = e[s])
        }
        t !== null && (t.selected = !0)
    }
}
function Cl(e, t) {
    if (t.dangerouslySetInnerHTML != null)
        throw Error(k(91));
    return V({}, t, {
        value: void 0,
        defaultValue: void 0,
        children: "" + e._wrapperState.initialValue
    })
}
function Ci(e, t) {
    var n = t.value;
    if (n == null) {
        if (n = t.children,
        t = t.defaultValue,
        n != null) {
            if (t != null)
                throw Error(k(92));
            if (zn(n)) {
                if (1 < n.length)
                    throw Error(k(93));
                n = n[0]
            }
            t = n
        }
        t == null && (t = ""),
        n = t
    }
    e._wrapperState = {
        initialValue: xt(n)
    }
}
function uc(e, t) {
    var n = xt(t.value)
      , r = xt(t.defaultValue);
    n != null && (n = "" + n,
    n !== e.value && (e.value = n),
    t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)),
    r != null && (e.defaultValue = "" + r)
}
function Ei(e) {
    var t = e.textContent;
    t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t)
}
function dc(e) {
    switch (e) {
    case "svg":
        return "http://www.w3.org/2000/svg";
    case "math":
        return "http://www.w3.org/1998/Math/MathML";
    default:
        return "http://www.w3.org/1999/xhtml"
    }
}
function El(e, t) {
    return e == null || e === "http://www.w3.org/1999/xhtml" ? dc(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e
}
var wr, pc = function(e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, n, r, s) {
        MSApp.execUnsafeLocalFunction(function() {
            return e(t, n, r, s)
        })
    }
    : e
}(function(e, t) {
    if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML"in e)
        e.innerHTML = t;
    else {
        for (wr = wr || document.createElement("div"),
        wr.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>",
        t = wr.firstChild; e.firstChild; )
            e.removeChild(e.firstChild);
        for (; t.firstChild; )
            e.appendChild(t.firstChild)
    }
});
function Bn(e, t) {
    if (t) {
        var n = e.firstChild;
        if (n && n === e.lastChild && n.nodeType === 3) {
            n.nodeValue = t;
            return
        }
    }
    e.textContent = t
}
var An = {
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
  , qd = ["Webkit", "ms", "Moz", "O"];
Object.keys(An).forEach(function(e) {
    qd.forEach(function(t) {
        t = t + e.charAt(0).toUpperCase() + e.substring(1),
        An[t] = An[e]
    })
});
function fc(e, t, n) {
    return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || An.hasOwnProperty(e) && An[e] ? ("" + t).trim() : t + "px"
}
function hc(e, t) {
    e = e.style;
    for (var n in t)
        if (t.hasOwnProperty(n)) {
            var r = n.indexOf("--") === 0
              , s = fc(n, t[n], r);
            n === "float" && (n = "cssFloat"),
            r ? e.setProperty(n, s) : e[n] = s
        }
}
var Qd = V({
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
function Pl(e, t) {
    if (t) {
        if (Qd[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
            throw Error(k(137, e));
        if (t.dangerouslySetInnerHTML != null) {
            if (t.children != null)
                throw Error(k(60));
            if (typeof t.dangerouslySetInnerHTML != "object" || !("__html"in t.dangerouslySetInnerHTML))
                throw Error(k(61))
        }
        if (t.style != null && typeof t.style != "object")
            throw Error(k(62))
    }
}
function Tl(e, t) {
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
var Ml = null;
function Eo(e) {
    return e = e.target || e.srcElement || window,
    e.correspondingUseElement && (e = e.correspondingUseElement),
    e.nodeType === 3 ? e.parentNode : e
}
var _l = null
  , nn = null
  , rn = null;
function Pi(e) {
    if (e = dr(e)) {
        if (typeof _l != "function")
            throw Error(k(280));
        var t = e.stateNode;
        t && (t = Es(t),
        _l(e.stateNode, e.type, t))
    }
}
function mc(e) {
    nn ? rn ? rn.push(e) : rn = [e] : nn = e
}
function yc() {
    if (nn) {
        var e = nn
          , t = rn;
        if (rn = nn = null,
        Pi(e),
        t)
            for (e = 0; e < t.length; e++)
                Pi(t[e])
    }
}
function gc(e, t) {
    return e(t)
}
function xc() {}
var Qs = !1;
function vc(e, t, n) {
    if (Qs)
        return e(t, n);
    Qs = !0;
    try {
        return gc(e, t, n)
    } finally {
        Qs = !1,
        (nn !== null || rn !== null) && (xc(),
        yc())
    }
}
function qn(e, t) {
    var n = e.stateNode;
    if (n === null)
        return null;
    var r = Es(n);
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
        throw Error(k(231, t, typeof n));
    return n
}
var zl = !1;
if (Ze)
    try {
        var Nn = {};
        Object.defineProperty(Nn, "passive", {
            get: function() {
                zl = !0
            }
        }),
        window.addEventListener("test", Nn, Nn),
        window.removeEventListener("test", Nn, Nn)
    } catch {
        zl = !1
    }
function Yd(e, t, n, r, s, l, i, a, c) {
    var u = Array.prototype.slice.call(arguments, 3);
    try {
        t.apply(n, u)
    } catch (h) {
        this.onError(h)
    }
}
var Rn = !1
  , Gr = null
  , Xr = !1
  , Ll = null
  , Kd = {
    onError: function(e) {
        Rn = !0,
        Gr = e
    }
};
function Gd(e, t, n, r, s, l, i, a, c) {
    Rn = !1,
    Gr = null,
    Yd.apply(Kd, arguments)
}
function Xd(e, t, n, r, s, l, i, a, c) {
    if (Gd.apply(this, arguments),
    Rn) {
        if (Rn) {
            var u = Gr;
            Rn = !1,
            Gr = null
        } else
            throw Error(k(198));
        Xr || (Xr = !0,
        Ll = u)
    }
}
function Ut(e) {
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
function wc(e) {
    if (e.tag === 13) {
        var t = e.memoizedState;
        if (t === null && (e = e.alternate,
        e !== null && (t = e.memoizedState)),
        t !== null)
            return t.dehydrated
    }
    return null
}
function Ti(e) {
    if (Ut(e) !== e)
        throw Error(k(188))
}
function Zd(e) {
    var t = e.alternate;
    if (!t) {
        if (t = Ut(e),
        t === null)
            throw Error(k(188));
        return t !== e ? null : e
    }
    for (var n = e, r = t; ; ) {
        var s = n.return;
        if (s === null)
            break;
        var l = s.alternate;
        if (l === null) {
            if (r = s.return,
            r !== null) {
                n = r;
                continue
            }
            break
        }
        if (s.child === l.child) {
            for (l = s.child; l; ) {
                if (l === n)
                    return Ti(s),
                    e;
                if (l === r)
                    return Ti(s),
                    t;
                l = l.sibling
            }
            throw Error(k(188))
        }
        if (n.return !== r.return)
            n = s,
            r = l;
        else {
            for (var i = !1, a = s.child; a; ) {
                if (a === n) {
                    i = !0,
                    n = s,
                    r = l;
                    break
                }
                if (a === r) {
                    i = !0,
                    r = s,
                    n = l;
                    break
                }
                a = a.sibling
            }
            if (!i) {
                for (a = l.child; a; ) {
                    if (a === n) {
                        i = !0,
                        n = l,
                        r = s;
                        break
                    }
                    if (a === r) {
                        i = !0,
                        r = l,
                        n = s;
                        break
                    }
                    a = a.sibling
                }
                if (!i)
                    throw Error(k(189))
            }
        }
        if (n.alternate !== r)
            throw Error(k(190))
    }
    if (n.tag !== 3)
        throw Error(k(188));
    return n.stateNode.current === n ? e : t
}
function kc(e) {
    return e = Zd(e),
    e !== null ? bc(e) : null
}
function bc(e) {
    if (e.tag === 5 || e.tag === 6)
        return e;
    for (e = e.child; e !== null; ) {
        var t = bc(e);
        if (t !== null)
            return t;
        e = e.sibling
    }
    return null
}
var Nc = ke.unstable_scheduleCallback
  , Mi = ke.unstable_cancelCallback
  , Jd = ke.unstable_shouldYield
  , ep = ke.unstable_requestPaint
  , Y = ke.unstable_now
  , tp = ke.unstable_getCurrentPriorityLevel
  , Po = ke.unstable_ImmediatePriority
  , jc = ke.unstable_UserBlockingPriority
  , Zr = ke.unstable_NormalPriority
  , np = ke.unstable_LowPriority
  , Sc = ke.unstable_IdlePriority
  , Ns = null
  , Be = null;
function rp(e) {
    if (Be && typeof Be.onCommitFiberRoot == "function")
        try {
            Be.onCommitFiberRoot(Ns, e, void 0, (e.current.flags & 128) === 128)
        } catch {}
}
var Fe = Math.clz32 ? Math.clz32 : op
  , sp = Math.log
  , lp = Math.LN2;
function op(e) {
    return e >>>= 0,
    e === 0 ? 32 : 31 - (sp(e) / lp | 0) | 0
}
var kr = 64
  , br = 4194304;
function Ln(e) {
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
function Jr(e, t) {
    var n = e.pendingLanes;
    if (n === 0)
        return 0;
    var r = 0
      , s = e.suspendedLanes
      , l = e.pingedLanes
      , i = n & 268435455;
    if (i !== 0) {
        var a = i & ~s;
        a !== 0 ? r = Ln(a) : (l &= i,
        l !== 0 && (r = Ln(l)))
    } else
        i = n & ~s,
        i !== 0 ? r = Ln(i) : l !== 0 && (r = Ln(l));
    if (r === 0)
        return 0;
    if (t !== 0 && t !== r && !(t & s) && (s = r & -r,
    l = t & -t,
    s >= l || s === 16 && (l & 4194240) !== 0))
        return t;
    if (r & 4 && (r |= n & 16),
    t = e.entangledLanes,
    t !== 0)
        for (e = e.entanglements,
        t &= r; 0 < t; )
            n = 31 - Fe(t),
            s = 1 << n,
            r |= e[n],
            t &= ~s;
    return r
}
function ip(e, t) {
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
function ap(e, t) {
    for (var n = e.suspendedLanes, r = e.pingedLanes, s = e.expirationTimes, l = e.pendingLanes; 0 < l; ) {
        var i = 31 - Fe(l)
          , a = 1 << i
          , c = s[i];
        c === -1 ? (!(a & n) || a & r) && (s[i] = ip(a, t)) : c <= t && (e.expiredLanes |= a),
        l &= ~a
    }
}
function Il(e) {
    return e = e.pendingLanes & -1073741825,
    e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
}
function Cc() {
    var e = kr;
    return kr <<= 1,
    !(kr & 4194240) && (kr = 64),
    e
}
function Ys(e) {
    for (var t = [], n = 0; 31 > n; n++)
        t.push(e);
    return t
}
function cr(e, t, n) {
    e.pendingLanes |= t,
    t !== 536870912 && (e.suspendedLanes = 0,
    e.pingedLanes = 0),
    e = e.eventTimes,
    t = 31 - Fe(t),
    e[t] = n
}
function cp(e, t) {
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
        var s = 31 - Fe(n)
          , l = 1 << s;
        t[s] = 0,
        r[s] = -1,
        e[s] = -1,
        n &= ~l
    }
}
function To(e, t) {
    var n = e.entangledLanes |= t;
    for (e = e.entanglements; n; ) {
        var r = 31 - Fe(n)
          , s = 1 << r;
        s & t | e[r] & t && (e[r] |= t),
        n &= ~s
    }
}
var F = 0;
function Ec(e) {
    return e &= -e,
    1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1
}
var Pc, Mo, Tc, Mc, _c, Al = !1, Nr = [], ut = null, dt = null, pt = null, Qn = new Map, Yn = new Map, ot = [], up = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function _i(e, t) {
    switch (e) {
    case "focusin":
    case "focusout":
        ut = null;
        break;
    case "dragenter":
    case "dragleave":
        dt = null;
        break;
    case "mouseover":
    case "mouseout":
        pt = null;
        break;
    case "pointerover":
    case "pointerout":
        Qn.delete(t.pointerId);
        break;
    case "gotpointercapture":
    case "lostpointercapture":
        Yn.delete(t.pointerId)
    }
}
function jn(e, t, n, r, s, l) {
    return e === null || e.nativeEvent !== l ? (e = {
        blockedOn: t,
        domEventName: n,
        eventSystemFlags: r,
        nativeEvent: l,
        targetContainers: [s]
    },
    t !== null && (t = dr(t),
    t !== null && Mo(t)),
    e) : (e.eventSystemFlags |= r,
    t = e.targetContainers,
    s !== null && t.indexOf(s) === -1 && t.push(s),
    e)
}
function dp(e, t, n, r, s) {
    switch (t) {
    case "focusin":
        return ut = jn(ut, e, t, n, r, s),
        !0;
    case "dragenter":
        return dt = jn(dt, e, t, n, r, s),
        !0;
    case "mouseover":
        return pt = jn(pt, e, t, n, r, s),
        !0;
    case "pointerover":
        var l = s.pointerId;
        return Qn.set(l, jn(Qn.get(l) || null, e, t, n, r, s)),
        !0;
    case "gotpointercapture":
        return l = s.pointerId,
        Yn.set(l, jn(Yn.get(l) || null, e, t, n, r, s)),
        !0
    }
    return !1
}
function zc(e) {
    var t = Pt(e.target);
    if (t !== null) {
        var n = Ut(t);
        if (n !== null) {
            if (t = n.tag,
            t === 13) {
                if (t = wc(n),
                t !== null) {
                    e.blockedOn = t,
                    _c(e.priority, function() {
                        Tc(n)
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
function Dr(e) {
    if (e.blockedOn !== null)
        return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
        var n = Rl(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
        if (n === null) {
            n = e.nativeEvent;
            var r = new n.constructor(n.type,n);
            Ml = r,
            n.target.dispatchEvent(r),
            Ml = null
        } else
            return t = dr(n),
            t !== null && Mo(t),
            e.blockedOn = n,
            !1;
        t.shift()
    }
    return !0
}
function zi(e, t, n) {
    Dr(e) && n.delete(t)
}
function pp() {
    Al = !1,
    ut !== null && Dr(ut) && (ut = null),
    dt !== null && Dr(dt) && (dt = null),
    pt !== null && Dr(pt) && (pt = null),
    Qn.forEach(zi),
    Yn.forEach(zi)
}
function Sn(e, t) {
    e.blockedOn === t && (e.blockedOn = null,
    Al || (Al = !0,
    ke.unstable_scheduleCallback(ke.unstable_NormalPriority, pp)))
}
function Kn(e) {
    function t(s) {
        return Sn(s, e)
    }
    if (0 < Nr.length) {
        Sn(Nr[0], e);
        for (var n = 1; n < Nr.length; n++) {
            var r = Nr[n];
            r.blockedOn === e && (r.blockedOn = null)
        }
    }
    for (ut !== null && Sn(ut, e),
    dt !== null && Sn(dt, e),
    pt !== null && Sn(pt, e),
    Qn.forEach(t),
    Yn.forEach(t),
    n = 0; n < ot.length; n++)
        r = ot[n],
        r.blockedOn === e && (r.blockedOn = null);
    for (; 0 < ot.length && (n = ot[0],
    n.blockedOn === null); )
        zc(n),
        n.blockedOn === null && ot.shift()
}
var sn = nt.ReactCurrentBatchConfig
  , es = !0;
function fp(e, t, n, r) {
    var s = F
      , l = sn.transition;
    sn.transition = null;
    try {
        F = 1,
        _o(e, t, n, r)
    } finally {
        F = s,
        sn.transition = l
    }
}
function hp(e, t, n, r) {
    var s = F
      , l = sn.transition;
    sn.transition = null;
    try {
        F = 4,
        _o(e, t, n, r)
    } finally {
        F = s,
        sn.transition = l
    }
}
function _o(e, t, n, r) {
    if (es) {
        var s = Rl(e, t, n, r);
        if (s === null)
            sl(e, t, r, ts, n),
            _i(e, r);
        else if (dp(s, e, t, n, r))
            r.stopPropagation();
        else if (_i(e, r),
        t & 4 && -1 < up.indexOf(e)) {
            for (; s !== null; ) {
                var l = dr(s);
                if (l !== null && Pc(l),
                l = Rl(e, t, n, r),
                l === null && sl(e, t, r, ts, n),
                l === s)
                    break;
                s = l
            }
            s !== null && r.stopPropagation()
        } else
            sl(e, t, r, null, n)
    }
}
var ts = null;
function Rl(e, t, n, r) {
    if (ts = null,
    e = Eo(r),
    e = Pt(e),
    e !== null)
        if (t = Ut(e),
        t === null)
            e = null;
        else if (n = t.tag,
        n === 13) {
            if (e = wc(t),
            e !== null)
                return e;
            e = null
        } else if (n === 3) {
            if (t.stateNode.current.memoizedState.isDehydrated)
                return t.tag === 3 ? t.stateNode.containerInfo : null;
            e = null
        } else
            t !== e && (e = null);
    return ts = e,
    null
}
function Lc(e) {
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
        switch (tp()) {
        case Po:
            return 1;
        case jc:
            return 4;
        case Zr:
        case np:
            return 16;
        case Sc:
            return 536870912;
        default:
            return 16
        }
    default:
        return 16
    }
}
var at = null
  , zo = null
  , Ur = null;
function Ic() {
    if (Ur)
        return Ur;
    var e, t = zo, n = t.length, r, s = "value"in at ? at.value : at.textContent, l = s.length;
    for (e = 0; e < n && t[e] === s[e]; e++)
        ;
    var i = n - e;
    for (r = 1; r <= i && t[n - r] === s[l - r]; r++)
        ;
    return Ur = s.slice(e, 1 < r ? 1 - r : void 0)
}
function $r(e) {
    var t = e.keyCode;
    return "charCode"in e ? (e = e.charCode,
    e === 0 && t === 13 && (e = 13)) : e = t,
    e === 10 && (e = 13),
    32 <= e || e === 13 ? e : 0
}
function jr() {
    return !0
}
function Li() {
    return !1
}
function Ne(e) {
    function t(n, r, s, l, i) {
        this._reactName = n,
        this._targetInst = s,
        this.type = r,
        this.nativeEvent = l,
        this.target = i,
        this.currentTarget = null;
        for (var a in e)
            e.hasOwnProperty(a) && (n = e[a],
            this[a] = n ? n(l) : l[a]);
        return this.isDefaultPrevented = (l.defaultPrevented != null ? l.defaultPrevented : l.returnValue === !1) ? jr : Li,
        this.isPropagationStopped = Li,
        this
    }
    return V(t.prototype, {
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
var xn = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(e) {
        return e.timeStamp || Date.now()
    },
    defaultPrevented: 0,
    isTrusted: 0
}, Lo = Ne(xn), ur = V({}, xn, {
    view: 0,
    detail: 0
}), mp = Ne(ur), Ks, Gs, Cn, js = V({}, ur, {
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
    getModifierState: Io,
    button: 0,
    buttons: 0,
    relatedTarget: function(e) {
        return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget
    },
    movementX: function(e) {
        return "movementX"in e ? e.movementX : (e !== Cn && (Cn && e.type === "mousemove" ? (Ks = e.screenX - Cn.screenX,
        Gs = e.screenY - Cn.screenY) : Gs = Ks = 0,
        Cn = e),
        Ks)
    },
    movementY: function(e) {
        return "movementY"in e ? e.movementY : Gs
    }
}), Ii = Ne(js), yp = V({}, js, {
    dataTransfer: 0
}), gp = Ne(yp), xp = V({}, ur, {
    relatedTarget: 0
}), Xs = Ne(xp), vp = V({}, xn, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
}), wp = Ne(vp), kp = V({}, xn, {
    clipboardData: function(e) {
        return "clipboardData"in e ? e.clipboardData : window.clipboardData
    }
}), bp = Ne(kp), Np = V({}, xn, {
    data: 0
}), Ai = Ne(Np), jp = {
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
}, Sp = {
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
}, Cp = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
};
function Ep(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = Cp[e]) ? !!t[e] : !1
}
function Io() {
    return Ep
}
var Pp = V({}, ur, {
    key: function(e) {
        if (e.key) {
            var t = jp[e.key] || e.key;
            if (t !== "Unidentified")
                return t
        }
        return e.type === "keypress" ? (e = $r(e),
        e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Sp[e.keyCode] || "Unidentified" : ""
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Io,
    charCode: function(e) {
        return e.type === "keypress" ? $r(e) : 0
    },
    keyCode: function(e) {
        return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0
    },
    which: function(e) {
        return e.type === "keypress" ? $r(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0
    }
})
  , Tp = Ne(Pp)
  , Mp = V({}, js, {
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
  , Ri = Ne(Mp)
  , _p = V({}, ur, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Io
})
  , zp = Ne(_p)
  , Lp = V({}, xn, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
})
  , Ip = Ne(Lp)
  , Ap = V({}, js, {
    deltaX: function(e) {
        return "deltaX"in e ? e.deltaX : "wheelDeltaX"in e ? -e.wheelDeltaX : 0
    },
    deltaY: function(e) {
        return "deltaY"in e ? e.deltaY : "wheelDeltaY"in e ? -e.wheelDeltaY : "wheelDelta"in e ? -e.wheelDelta : 0
    },
    deltaZ: 0,
    deltaMode: 0
})
  , Rp = Ne(Ap)
  , Fp = [9, 13, 27, 32]
  , Ao = Ze && "CompositionEvent"in window
  , Fn = null;
Ze && "documentMode"in document && (Fn = document.documentMode);
var Op = Ze && "TextEvent"in window && !Fn
  , Ac = Ze && (!Ao || Fn && 8 < Fn && 11 >= Fn)
  , Fi = " "
  , Oi = !1;
function Rc(e, t) {
    switch (e) {
    case "keyup":
        return Fp.indexOf(t.keyCode) !== -1;
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
function Fc(e) {
    return e = e.detail,
    typeof e == "object" && "data"in e ? e.data : null
}
var Bt = !1;
function Dp(e, t) {
    switch (e) {
    case "compositionend":
        return Fc(t);
    case "keypress":
        return t.which !== 32 ? null : (Oi = !0,
        Fi);
    case "textInput":
        return e = t.data,
        e === Fi && Oi ? null : e;
    default:
        return null
    }
}
function Up(e, t) {
    if (Bt)
        return e === "compositionend" || !Ao && Rc(e, t) ? (e = Ic(),
        Ur = zo = at = null,
        Bt = !1,
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
        return Ac && t.locale !== "ko" ? null : t.data;
    default:
        return null
    }
}
var $p = {
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
function Di(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!$p[e.type] : t === "textarea"
}
function Oc(e, t, n, r) {
    mc(r),
    t = ns(t, "onChange"),
    0 < t.length && (n = new Lo("onChange","change",null,n,r),
    e.push({
        event: n,
        listeners: t
    }))
}
var On = null
  , Gn = null;
function Wp(e) {
    Kc(e, 0)
}
function Ss(e) {
    var t = Yt(e);
    if (ac(t))
        return e
}
function Hp(e, t) {
    if (e === "change")
        return t
}
var Dc = !1;
if (Ze) {
    var Zs;
    if (Ze) {
        var Js = "oninput"in document;
        if (!Js) {
            var Ui = document.createElement("div");
            Ui.setAttribute("oninput", "return;"),
            Js = typeof Ui.oninput == "function"
        }
        Zs = Js
    } else
        Zs = !1;
    Dc = Zs && (!document.documentMode || 9 < document.documentMode)
}
function $i() {
    On && (On.detachEvent("onpropertychange", Uc),
    Gn = On = null)
}
function Uc(e) {
    if (e.propertyName === "value" && Ss(Gn)) {
        var t = [];
        Oc(t, Gn, e, Eo(e)),
        vc(Wp, t)
    }
}
function Vp(e, t, n) {
    e === "focusin" ? ($i(),
    On = t,
    Gn = n,
    On.attachEvent("onpropertychange", Uc)) : e === "focusout" && $i()
}
function Bp(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
        return Ss(Gn)
}
function qp(e, t) {
    if (e === "click")
        return Ss(t)
}
function Qp(e, t) {
    if (e === "input" || e === "change")
        return Ss(t)
}
function Yp(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t
}
var De = typeof Object.is == "function" ? Object.is : Yp;
function Xn(e, t) {
    if (De(e, t))
        return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null)
        return !1;
    var n = Object.keys(e)
      , r = Object.keys(t);
    if (n.length !== r.length)
        return !1;
    for (r = 0; r < n.length; r++) {
        var s = n[r];
        if (!xl.call(t, s) || !De(e[s], t[s]))
            return !1
    }
    return !0
}
function Wi(e) {
    for (; e && e.firstChild; )
        e = e.firstChild;
    return e
}
function Hi(e, t) {
    var n = Wi(e);
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
        n = Wi(n)
    }
}
function $c(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? $c(e, t.parentNode) : "contains"in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1
}
function Wc() {
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
function Ro(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true")
}
function Kp(e) {
    var t = Wc()
      , n = e.focusedElem
      , r = e.selectionRange;
    if (t !== n && n && n.ownerDocument && $c(n.ownerDocument.documentElement, n)) {
        if (r !== null && Ro(n)) {
            if (t = r.start,
            e = r.end,
            e === void 0 && (e = t),
            "selectionStart"in n)
                n.selectionStart = t,
                n.selectionEnd = Math.min(e, n.value.length);
            else if (e = (t = n.ownerDocument || document) && t.defaultView || window,
            e.getSelection) {
                e = e.getSelection();
                var s = n.textContent.length
                  , l = Math.min(r.start, s);
                r = r.end === void 0 ? l : Math.min(r.end, s),
                !e.extend && l > r && (s = r,
                r = l,
                l = s),
                s = Hi(n, l);
                var i = Hi(n, r);
                s && i && (e.rangeCount !== 1 || e.anchorNode !== s.node || e.anchorOffset !== s.offset || e.focusNode !== i.node || e.focusOffset !== i.offset) && (t = t.createRange(),
                t.setStart(s.node, s.offset),
                e.removeAllRanges(),
                l > r ? (e.addRange(t),
                e.extend(i.node, i.offset)) : (t.setEnd(i.node, i.offset),
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
var Gp = Ze && "documentMode"in document && 11 >= document.documentMode
  , qt = null
  , Fl = null
  , Dn = null
  , Ol = !1;
function Vi(e, t, n) {
    var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
    Ol || qt == null || qt !== Kr(r) || (r = qt,
    "selectionStart"in r && Ro(r) ? r = {
        start: r.selectionStart,
        end: r.selectionEnd
    } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(),
    r = {
        anchorNode: r.anchorNode,
        anchorOffset: r.anchorOffset,
        focusNode: r.focusNode,
        focusOffset: r.focusOffset
    }),
    Dn && Xn(Dn, r) || (Dn = r,
    r = ns(Fl, "onSelect"),
    0 < r.length && (t = new Lo("onSelect","select",null,t,n),
    e.push({
        event: t,
        listeners: r
    }),
    t.target = qt)))
}
function Sr(e, t) {
    var n = {};
    return n[e.toLowerCase()] = t.toLowerCase(),
    n["Webkit" + e] = "webkit" + t,
    n["Moz" + e] = "moz" + t,
    n
}
var Qt = {
    animationend: Sr("Animation", "AnimationEnd"),
    animationiteration: Sr("Animation", "AnimationIteration"),
    animationstart: Sr("Animation", "AnimationStart"),
    transitionend: Sr("Transition", "TransitionEnd")
}
  , el = {}
  , Hc = {};
Ze && (Hc = document.createElement("div").style,
"AnimationEvent"in window || (delete Qt.animationend.animation,
delete Qt.animationiteration.animation,
delete Qt.animationstart.animation),
"TransitionEvent"in window || delete Qt.transitionend.transition);
function Cs(e) {
    if (el[e])
        return el[e];
    if (!Qt[e])
        return e;
    var t = Qt[e], n;
    for (n in t)
        if (t.hasOwnProperty(n) && n in Hc)
            return el[e] = t[n];
    return e
}
var Vc = Cs("animationend")
  , Bc = Cs("animationiteration")
  , qc = Cs("animationstart")
  , Qc = Cs("transitionend")
  , Yc = new Map
  , Bi = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function wt(e, t) {
    Yc.set(e, t),
    Dt(t, [e])
}
for (var tl = 0; tl < Bi.length; tl++) {
    var nl = Bi[tl]
      , Xp = nl.toLowerCase()
      , Zp = nl[0].toUpperCase() + nl.slice(1);
    wt(Xp, "on" + Zp)
}
wt(Vc, "onAnimationEnd");
wt(Bc, "onAnimationIteration");
wt(qc, "onAnimationStart");
wt("dblclick", "onDoubleClick");
wt("focusin", "onFocus");
wt("focusout", "onBlur");
wt(Qc, "onTransitionEnd");
an("onMouseEnter", ["mouseout", "mouseover"]);
an("onMouseLeave", ["mouseout", "mouseover"]);
an("onPointerEnter", ["pointerout", "pointerover"]);
an("onPointerLeave", ["pointerout", "pointerover"]);
Dt("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
Dt("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
Dt("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
Dt("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
Dt("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
Dt("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var In = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" ")
  , Jp = new Set("cancel close invalid load scroll toggle".split(" ").concat(In));
function qi(e, t, n) {
    var r = e.type || "unknown-event";
    e.currentTarget = n,
    Xd(r, t, void 0, e),
    e.currentTarget = null
}
function Kc(e, t) {
    t = (t & 4) !== 0;
    for (var n = 0; n < e.length; n++) {
        var r = e[n]
          , s = r.event;
        r = r.listeners;
        e: {
            var l = void 0;
            if (t)
                for (var i = r.length - 1; 0 <= i; i--) {
                    var a = r[i]
                      , c = a.instance
                      , u = a.currentTarget;
                    if (a = a.listener,
                    c !== l && s.isPropagationStopped())
                        break e;
                    qi(s, a, u),
                    l = c
                }
            else
                for (i = 0; i < r.length; i++) {
                    if (a = r[i],
                    c = a.instance,
                    u = a.currentTarget,
                    a = a.listener,
                    c !== l && s.isPropagationStopped())
                        break e;
                    qi(s, a, u),
                    l = c
                }
        }
    }
    if (Xr)
        throw e = Ll,
        Xr = !1,
        Ll = null,
        e
}
function D(e, t) {
    var n = t[Hl];
    n === void 0 && (n = t[Hl] = new Set);
    var r = e + "__bubble";
    n.has(r) || (Gc(t, e, 2, !1),
    n.add(r))
}
function rl(e, t, n) {
    var r = 0;
    t && (r |= 4),
    Gc(n, e, r, t)
}
var Cr = "_reactListening" + Math.random().toString(36).slice(2);
function Zn(e) {
    if (!e[Cr]) {
        e[Cr] = !0,
        rc.forEach(function(n) {
            n !== "selectionchange" && (Jp.has(n) || rl(n, !1, e),
            rl(n, !0, e))
        });
        var t = e.nodeType === 9 ? e : e.ownerDocument;
        t === null || t[Cr] || (t[Cr] = !0,
        rl("selectionchange", !1, t))
    }
}
function Gc(e, t, n, r) {
    switch (Lc(t)) {
    case 1:
        var s = fp;
        break;
    case 4:
        s = hp;
        break;
    default:
        s = _o
    }
    n = s.bind(null, t, n, e),
    s = void 0,
    !zl || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (s = !0),
    r ? s !== void 0 ? e.addEventListener(t, n, {
        capture: !0,
        passive: s
    }) : e.addEventListener(t, n, !0) : s !== void 0 ? e.addEventListener(t, n, {
        passive: s
    }) : e.addEventListener(t, n, !1)
}
function sl(e, t, n, r, s) {
    var l = r;
    if (!(t & 1) && !(t & 2) && r !== null)
        e: for (; ; ) {
            if (r === null)
                return;
            var i = r.tag;
            if (i === 3 || i === 4) {
                var a = r.stateNode.containerInfo;
                if (a === s || a.nodeType === 8 && a.parentNode === s)
                    break;
                if (i === 4)
                    for (i = r.return; i !== null; ) {
                        var c = i.tag;
                        if ((c === 3 || c === 4) && (c = i.stateNode.containerInfo,
                        c === s || c.nodeType === 8 && c.parentNode === s))
                            return;
                        i = i.return
                    }
                for (; a !== null; ) {
                    if (i = Pt(a),
                    i === null)
                        return;
                    if (c = i.tag,
                    c === 5 || c === 6) {
                        r = l = i;
                        continue e
                    }
                    a = a.parentNode
                }
            }
            r = r.return
        }
    vc(function() {
        var u = l
          , h = Eo(n)
          , y = [];
        e: {
            var m = Yc.get(e);
            if (m !== void 0) {
                var w = Lo
                  , g = e;
                switch (e) {
                case "keypress":
                    if ($r(n) === 0)
                        break e;
                case "keydown":
                case "keyup":
                    w = Tp;
                    break;
                case "focusin":
                    g = "focus",
                    w = Xs;
                    break;
                case "focusout":
                    g = "blur",
                    w = Xs;
                    break;
                case "beforeblur":
                case "afterblur":
                    w = Xs;
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
                    w = Ii;
                    break;
                case "drag":
                case "dragend":
                case "dragenter":
                case "dragexit":
                case "dragleave":
                case "dragover":
                case "dragstart":
                case "drop":
                    w = gp;
                    break;
                case "touchcancel":
                case "touchend":
                case "touchmove":
                case "touchstart":
                    w = zp;
                    break;
                case Vc:
                case Bc:
                case qc:
                    w = wp;
                    break;
                case Qc:
                    w = Ip;
                    break;
                case "scroll":
                    w = mp;
                    break;
                case "wheel":
                    w = Rp;
                    break;
                case "copy":
                case "cut":
                case "paste":
                    w = bp;
                    break;
                case "gotpointercapture":
                case "lostpointercapture":
                case "pointercancel":
                case "pointerdown":
                case "pointermove":
                case "pointerout":
                case "pointerover":
                case "pointerup":
                    w = Ri
                }
                var x = (t & 4) !== 0
                  , j = !x && e === "scroll"
                  , d = x ? m !== null ? m + "Capture" : null : m;
                x = [];
                for (var p = u, f; p !== null; ) {
                    f = p;
                    var v = f.stateNode;
                    if (f.tag === 5 && v !== null && (f = v,
                    d !== null && (v = qn(p, d),
                    v != null && x.push(Jn(p, v, f)))),
                    j)
                        break;
                    p = p.return
                }
                0 < x.length && (m = new w(m,g,null,n,h),
                y.push({
                    event: m,
                    listeners: x
                }))
            }
        }
        if (!(t & 7)) {
            e: {
                if (m = e === "mouseover" || e === "pointerover",
                w = e === "mouseout" || e === "pointerout",
                m && n !== Ml && (g = n.relatedTarget || n.fromElement) && (Pt(g) || g[Je]))
                    break e;
                if ((w || m) && (m = h.window === h ? h : (m = h.ownerDocument) ? m.defaultView || m.parentWindow : window,
                w ? (g = n.relatedTarget || n.toElement,
                w = u,
                g = g ? Pt(g) : null,
                g !== null && (j = Ut(g),
                g !== j || g.tag !== 5 && g.tag !== 6) && (g = null)) : (w = null,
                g = u),
                w !== g)) {
                    if (x = Ii,
                    v = "onMouseLeave",
                    d = "onMouseEnter",
                    p = "mouse",
                    (e === "pointerout" || e === "pointerover") && (x = Ri,
                    v = "onPointerLeave",
                    d = "onPointerEnter",
                    p = "pointer"),
                    j = w == null ? m : Yt(w),
                    f = g == null ? m : Yt(g),
                    m = new x(v,p + "leave",w,n,h),
                    m.target = j,
                    m.relatedTarget = f,
                    v = null,
                    Pt(h) === u && (x = new x(d,p + "enter",g,n,h),
                    x.target = f,
                    x.relatedTarget = j,
                    v = x),
                    j = v,
                    w && g)
                        t: {
                            for (x = w,
                            d = g,
                            p = 0,
                            f = x; f; f = Wt(f))
                                p++;
                            for (f = 0,
                            v = d; v; v = Wt(v))
                                f++;
                            for (; 0 < p - f; )
                                x = Wt(x),
                                p--;
                            for (; 0 < f - p; )
                                d = Wt(d),
                                f--;
                            for (; p--; ) {
                                if (x === d || d !== null && x === d.alternate)
                                    break t;
                                x = Wt(x),
                                d = Wt(d)
                            }
                            x = null
                        }
                    else
                        x = null;
                    w !== null && Qi(y, m, w, x, !1),
                    g !== null && j !== null && Qi(y, j, g, x, !0)
                }
            }
            e: {
                if (m = u ? Yt(u) : window,
                w = m.nodeName && m.nodeName.toLowerCase(),
                w === "select" || w === "input" && m.type === "file")
                    var N = Hp;
                else if (Di(m))
                    if (Dc)
                        N = Qp;
                    else {
                        N = Bp;
                        var S = Vp
                    }
                else
                    (w = m.nodeName) && w.toLowerCase() === "input" && (m.type === "checkbox" || m.type === "radio") && (N = qp);
                if (N && (N = N(e, u))) {
                    Oc(y, N, n, h);
                    break e
                }
                S && S(e, m, u),
                e === "focusout" && (S = m._wrapperState) && S.controlled && m.type === "number" && Sl(m, "number", m.value)
            }
            switch (S = u ? Yt(u) : window,
            e) {
            case "focusin":
                (Di(S) || S.contentEditable === "true") && (qt = S,
                Fl = u,
                Dn = null);
                break;
            case "focusout":
                Dn = Fl = qt = null;
                break;
            case "mousedown":
                Ol = !0;
                break;
            case "contextmenu":
            case "mouseup":
            case "dragend":
                Ol = !1,
                Vi(y, n, h);
                break;
            case "selectionchange":
                if (Gp)
                    break;
            case "keydown":
            case "keyup":
                Vi(y, n, h)
            }
            var E;
            if (Ao)
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
                Bt ? Rc(e, n) && (M = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (M = "onCompositionStart");
            M && (Ac && n.locale !== "ko" && (Bt || M !== "onCompositionStart" ? M === "onCompositionEnd" && Bt && (E = Ic()) : (at = h,
            zo = "value"in at ? at.value : at.textContent,
            Bt = !0)),
            S = ns(u, M),
            0 < S.length && (M = new Ai(M,e,null,n,h),
            y.push({
                event: M,
                listeners: S
            }),
            E ? M.data = E : (E = Fc(n),
            E !== null && (M.data = E)))),
            (E = Op ? Dp(e, n) : Up(e, n)) && (u = ns(u, "onBeforeInput"),
            0 < u.length && (h = new Ai("onBeforeInput","beforeinput",null,n,h),
            y.push({
                event: h,
                listeners: u
            }),
            h.data = E))
        }
        Kc(y, t)
    })
}
function Jn(e, t, n) {
    return {
        instance: e,
        listener: t,
        currentTarget: n
    }
}
function ns(e, t) {
    for (var n = t + "Capture", r = []; e !== null; ) {
        var s = e
          , l = s.stateNode;
        s.tag === 5 && l !== null && (s = l,
        l = qn(e, n),
        l != null && r.unshift(Jn(e, l, s)),
        l = qn(e, t),
        l != null && r.push(Jn(e, l, s))),
        e = e.return
    }
    return r
}
function Wt(e) {
    if (e === null)
        return null;
    do
        e = e.return;
    while (e && e.tag !== 5);
    return e || null
}
function Qi(e, t, n, r, s) {
    for (var l = t._reactName, i = []; n !== null && n !== r; ) {
        var a = n
          , c = a.alternate
          , u = a.stateNode;
        if (c !== null && c === r)
            break;
        a.tag === 5 && u !== null && (a = u,
        s ? (c = qn(n, l),
        c != null && i.unshift(Jn(n, c, a))) : s || (c = qn(n, l),
        c != null && i.push(Jn(n, c, a)))),
        n = n.return
    }
    i.length !== 0 && e.push({
        event: t,
        listeners: i
    })
}
var ef = /\r\n?/g
  , tf = /\u0000|\uFFFD/g;
function Yi(e) {
    return (typeof e == "string" ? e : "" + e).replace(ef, `
`).replace(tf, "")
}
function Er(e, t, n) {
    if (t = Yi(t),
    Yi(e) !== t && n)
        throw Error(k(425))
}
function rs() {}
var Dl = null
  , Ul = null;
function $l(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null
}
var Wl = typeof setTimeout == "function" ? setTimeout : void 0
  , nf = typeof clearTimeout == "function" ? clearTimeout : void 0
  , Ki = typeof Promise == "function" ? Promise : void 0
  , rf = typeof queueMicrotask == "function" ? queueMicrotask : typeof Ki < "u" ? function(e) {
    return Ki.resolve(null).then(e).catch(sf)
}
: Wl;
function sf(e) {
    setTimeout(function() {
        throw e
    })
}
function ll(e, t) {
    var n = t
      , r = 0;
    do {
        var s = n.nextSibling;
        if (e.removeChild(n),
        s && s.nodeType === 8)
            if (n = s.data,
            n === "/$") {
                if (r === 0) {
                    e.removeChild(s),
                    Kn(t);
                    return
                }
                r--
            } else
                n !== "$" && n !== "$?" && n !== "$!" || r++;
        n = s
    } while (n);
    Kn(t)
}
function ft(e) {
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
function Gi(e) {
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
var vn = Math.random().toString(36).slice(2)
  , He = "__reactFiber$" + vn
  , er = "__reactProps$" + vn
  , Je = "__reactContainer$" + vn
  , Hl = "__reactEvents$" + vn
  , lf = "__reactListeners$" + vn
  , of = "__reactHandles$" + vn;
function Pt(e) {
    var t = e[He];
    if (t)
        return t;
    for (var n = e.parentNode; n; ) {
        if (t = n[Je] || n[He]) {
            if (n = t.alternate,
            t.child !== null || n !== null && n.child !== null)
                for (e = Gi(e); e !== null; ) {
                    if (n = e[He])
                        return n;
                    e = Gi(e)
                }
            return t
        }
        e = n,
        n = e.parentNode
    }
    return null
}
function dr(e) {
    return e = e[He] || e[Je],
    !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e
}
function Yt(e) {
    if (e.tag === 5 || e.tag === 6)
        return e.stateNode;
    throw Error(k(33))
}
function Es(e) {
    return e[er] || null
}
var Vl = []
  , Kt = -1;
function kt(e) {
    return {
        current: e
    }
}
function U(e) {
    0 > Kt || (e.current = Vl[Kt],
    Vl[Kt] = null,
    Kt--)
}
function O(e, t) {
    Kt++,
    Vl[Kt] = e.current,
    e.current = t
}
var vt = {}
  , ie = kt(vt)
  , he = kt(!1)
  , Lt = vt;
function cn(e, t) {
    var n = e.type.contextTypes;
    if (!n)
        return vt;
    var r = e.stateNode;
    if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
        return r.__reactInternalMemoizedMaskedChildContext;
    var s = {}, l;
    for (l in n)
        s[l] = t[l];
    return r && (e = e.stateNode,
    e.__reactInternalMemoizedUnmaskedChildContext = t,
    e.__reactInternalMemoizedMaskedChildContext = s),
    s
}
function me(e) {
    return e = e.childContextTypes,
    e != null
}
function ss() {
    U(he),
    U(ie)
}
function Xi(e, t, n) {
    if (ie.current !== vt)
        throw Error(k(168));
    O(ie, t),
    O(he, n)
}
function Xc(e, t, n) {
    var r = e.stateNode;
    if (t = t.childContextTypes,
    typeof r.getChildContext != "function")
        return n;
    r = r.getChildContext();
    for (var s in r)
        if (!(s in t))
            throw Error(k(108, Vd(e) || "Unknown", s));
    return V({}, n, r)
}
function ls(e) {
    return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || vt,
    Lt = ie.current,
    O(ie, e),
    O(he, he.current),
    !0
}
function Zi(e, t, n) {
    var r = e.stateNode;
    if (!r)
        throw Error(k(169));
    n ? (e = Xc(e, t, Lt),
    r.__reactInternalMemoizedMergedChildContext = e,
    U(he),
    U(ie),
    O(ie, e)) : U(he),
    O(he, n)
}
var Ye = null
  , Ps = !1
  , ol = !1;
function Zc(e) {
    Ye === null ? Ye = [e] : Ye.push(e)
}
function af(e) {
    Ps = !0,
    Zc(e)
}
function bt() {
    if (!ol && Ye !== null) {
        ol = !0;
        var e = 0
          , t = F;
        try {
            var n = Ye;
            for (F = 1; e < n.length; e++) {
                var r = n[e];
                do
                    r = r(!0);
                while (r !== null)
            }
            Ye = null,
            Ps = !1
        } catch (s) {
            throw Ye !== null && (Ye = Ye.slice(e + 1)),
            Nc(Po, bt),
            s
        } finally {
            F = t,
            ol = !1
        }
    }
    return null
}
var Gt = []
  , Xt = 0
  , os = null
  , is = 0
  , je = []
  , Se = 0
  , It = null
  , Ke = 1
  , Ge = "";
function St(e, t) {
    Gt[Xt++] = is,
    Gt[Xt++] = os,
    os = e,
    is = t
}
function Jc(e, t, n) {
    je[Se++] = Ke,
    je[Se++] = Ge,
    je[Se++] = It,
    It = e;
    var r = Ke;
    e = Ge;
    var s = 32 - Fe(r) - 1;
    r &= ~(1 << s),
    n += 1;
    var l = 32 - Fe(t) + s;
    if (30 < l) {
        var i = s - s % 5;
        l = (r & (1 << i) - 1).toString(32),
        r >>= i,
        s -= i,
        Ke = 1 << 32 - Fe(t) + s | n << s | r,
        Ge = l + e
    } else
        Ke = 1 << l | n << s | r,
        Ge = e
}
function Fo(e) {
    e.return !== null && (St(e, 1),
    Jc(e, 1, 0))
}
function Oo(e) {
    for (; e === os; )
        os = Gt[--Xt],
        Gt[Xt] = null,
        is = Gt[--Xt],
        Gt[Xt] = null;
    for (; e === It; )
        It = je[--Se],
        je[Se] = null,
        Ge = je[--Se],
        je[Se] = null,
        Ke = je[--Se],
        je[Se] = null
}
var we = null
  , ve = null
  , $ = !1
  , Re = null;
function eu(e, t) {
    var n = Ce(5, null, null, 0);
    n.elementType = "DELETED",
    n.stateNode = t,
    n.return = e,
    t = e.deletions,
    t === null ? (e.deletions = [n],
    e.flags |= 16) : t.push(n)
}
function Ji(e, t) {
    switch (e.tag) {
    case 5:
        var n = e.type;
        return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t,
        t !== null ? (e.stateNode = t,
        we = e,
        ve = ft(t.firstChild),
        !0) : !1;
    case 6:
        return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t,
        t !== null ? (e.stateNode = t,
        we = e,
        ve = null,
        !0) : !1;
    case 13:
        return t = t.nodeType !== 8 ? null : t,
        t !== null ? (n = It !== null ? {
            id: Ke,
            overflow: Ge
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
        we = e,
        ve = null,
        !0) : !1;
    default:
        return !1
    }
}
function Bl(e) {
    return (e.mode & 1) !== 0 && (e.flags & 128) === 0
}
function ql(e) {
    if ($) {
        var t = ve;
        if (t) {
            var n = t;
            if (!Ji(e, t)) {
                if (Bl(e))
                    throw Error(k(418));
                t = ft(n.nextSibling);
                var r = we;
                t && Ji(e, t) ? eu(r, n) : (e.flags = e.flags & -4097 | 2,
                $ = !1,
                we = e)
            }
        } else {
            if (Bl(e))
                throw Error(k(418));
            e.flags = e.flags & -4097 | 2,
            $ = !1,
            we = e
        }
    }
}
function ea(e) {
    for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; )
        e = e.return;
    we = e
}
function Pr(e) {
    if (e !== we)
        return !1;
    if (!$)
        return ea(e),
        $ = !0,
        !1;
    var t;
    if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type,
    t = t !== "head" && t !== "body" && !$l(e.type, e.memoizedProps)),
    t && (t = ve)) {
        if (Bl(e))
            throw tu(),
            Error(k(418));
        for (; t; )
            eu(e, t),
            t = ft(t.nextSibling)
    }
    if (ea(e),
    e.tag === 13) {
        if (e = e.memoizedState,
        e = e !== null ? e.dehydrated : null,
        !e)
            throw Error(k(317));
        e: {
            for (e = e.nextSibling,
            t = 0; e; ) {
                if (e.nodeType === 8) {
                    var n = e.data;
                    if (n === "/$") {
                        if (t === 0) {
                            ve = ft(e.nextSibling);
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
        ve = we ? ft(e.stateNode.nextSibling) : null;
    return !0
}
function tu() {
    for (var e = ve; e; )
        e = ft(e.nextSibling)
}
function un() {
    ve = we = null,
    $ = !1
}
function Do(e) {
    Re === null ? Re = [e] : Re.push(e)
}
var cf = nt.ReactCurrentBatchConfig;
function En(e, t, n) {
    if (e = n.ref,
    e !== null && typeof e != "function" && typeof e != "object") {
        if (n._owner) {
            if (n = n._owner,
            n) {
                if (n.tag !== 1)
                    throw Error(k(309));
                var r = n.stateNode
            }
            if (!r)
                throw Error(k(147, e));
            var s = r
              , l = "" + e;
            return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === l ? t.ref : (t = function(i) {
                var a = s.refs;
                i === null ? delete a[l] : a[l] = i
            }
            ,
            t._stringRef = l,
            t)
        }
        if (typeof e != "string")
            throw Error(k(284));
        if (!n._owner)
            throw Error(k(290, e))
    }
    return e
}
function Tr(e, t) {
    throw e = Object.prototype.toString.call(t),
    Error(k(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e))
}
function ta(e) {
    var t = e._init;
    return t(e._payload)
}
function nu(e) {
    function t(d, p) {
        if (e) {
            var f = d.deletions;
            f === null ? (d.deletions = [p],
            d.flags |= 16) : f.push(p)
        }
    }
    function n(d, p) {
        if (!e)
            return null;
        for (; p !== null; )
            t(d, p),
            p = p.sibling;
        return null
    }
    function r(d, p) {
        for (d = new Map; p !== null; )
            p.key !== null ? d.set(p.key, p) : d.set(p.index, p),
            p = p.sibling;
        return d
    }
    function s(d, p) {
        return d = gt(d, p),
        d.index = 0,
        d.sibling = null,
        d
    }
    function l(d, p, f) {
        return d.index = f,
        e ? (f = d.alternate,
        f !== null ? (f = f.index,
        f < p ? (d.flags |= 2,
        p) : f) : (d.flags |= 2,
        p)) : (d.flags |= 1048576,
        p)
    }
    function i(d) {
        return e && d.alternate === null && (d.flags |= 2),
        d
    }
    function a(d, p, f, v) {
        return p === null || p.tag !== 6 ? (p = fl(f, d.mode, v),
        p.return = d,
        p) : (p = s(p, f),
        p.return = d,
        p)
    }
    function c(d, p, f, v) {
        var N = f.type;
        return N === Vt ? h(d, p, f.props.children, v, f.key) : p !== null && (p.elementType === N || typeof N == "object" && N !== null && N.$$typeof === st && ta(N) === p.type) ? (v = s(p, f.props),
        v.ref = En(d, p, f),
        v.return = d,
        v) : (v = Yr(f.type, f.key, f.props, null, d.mode, v),
        v.ref = En(d, p, f),
        v.return = d,
        v)
    }
    function u(d, p, f, v) {
        return p === null || p.tag !== 4 || p.stateNode.containerInfo !== f.containerInfo || p.stateNode.implementation !== f.implementation ? (p = hl(f, d.mode, v),
        p.return = d,
        p) : (p = s(p, f.children || []),
        p.return = d,
        p)
    }
    function h(d, p, f, v, N) {
        return p === null || p.tag !== 7 ? (p = zt(f, d.mode, v, N),
        p.return = d,
        p) : (p = s(p, f),
        p.return = d,
        p)
    }
    function y(d, p, f) {
        if (typeof p == "string" && p !== "" || typeof p == "number")
            return p = fl("" + p, d.mode, f),
            p.return = d,
            p;
        if (typeof p == "object" && p !== null) {
            switch (p.$$typeof) {
            case xr:
                return f = Yr(p.type, p.key, p.props, null, d.mode, f),
                f.ref = En(d, null, p),
                f.return = d,
                f;
            case Ht:
                return p = hl(p, d.mode, f),
                p.return = d,
                p;
            case st:
                var v = p._init;
                return y(d, v(p._payload), f)
            }
            if (zn(p) || bn(p))
                return p = zt(p, d.mode, f, null),
                p.return = d,
                p;
            Tr(d, p)
        }
        return null
    }
    function m(d, p, f, v) {
        var N = p !== null ? p.key : null;
        if (typeof f == "string" && f !== "" || typeof f == "number")
            return N !== null ? null : a(d, p, "" + f, v);
        if (typeof f == "object" && f !== null) {
            switch (f.$$typeof) {
            case xr:
                return f.key === N ? c(d, p, f, v) : null;
            case Ht:
                return f.key === N ? u(d, p, f, v) : null;
            case st:
                return N = f._init,
                m(d, p, N(f._payload), v)
            }
            if (zn(f) || bn(f))
                return N !== null ? null : h(d, p, f, v, null);
            Tr(d, f)
        }
        return null
    }
    function w(d, p, f, v, N) {
        if (typeof v == "string" && v !== "" || typeof v == "number")
            return d = d.get(f) || null,
            a(p, d, "" + v, N);
        if (typeof v == "object" && v !== null) {
            switch (v.$$typeof) {
            case xr:
                return d = d.get(v.key === null ? f : v.key) || null,
                c(p, d, v, N);
            case Ht:
                return d = d.get(v.key === null ? f : v.key) || null,
                u(p, d, v, N);
            case st:
                var S = v._init;
                return w(d, p, f, S(v._payload), N)
            }
            if (zn(v) || bn(v))
                return d = d.get(f) || null,
                h(p, d, v, N, null);
            Tr(p, v)
        }
        return null
    }
    function g(d, p, f, v) {
        for (var N = null, S = null, E = p, M = p = 0, q = null; E !== null && M < f.length; M++) {
            E.index > M ? (q = E,
            E = null) : q = E.sibling;
            var A = m(d, E, f[M], v);
            if (A === null) {
                E === null && (E = q);
                break
            }
            e && E && A.alternate === null && t(d, E),
            p = l(A, p, M),
            S === null ? N = A : S.sibling = A,
            S = A,
            E = q
        }
        if (M === f.length)
            return n(d, E),
            $ && St(d, M),
            N;
        if (E === null) {
            for (; M < f.length; M++)
                E = y(d, f[M], v),
                E !== null && (p = l(E, p, M),
                S === null ? N = E : S.sibling = E,
                S = E);
            return $ && St(d, M),
            N
        }
        for (E = r(d, E); M < f.length; M++)
            q = w(E, d, M, f[M], v),
            q !== null && (e && q.alternate !== null && E.delete(q.key === null ? M : q.key),
            p = l(q, p, M),
            S === null ? N = q : S.sibling = q,
            S = q);
        return e && E.forEach(function(_e) {
            return t(d, _e)
        }),
        $ && St(d, M),
        N
    }
    function x(d, p, f, v) {
        var N = bn(f);
        if (typeof N != "function")
            throw Error(k(150));
        if (f = N.call(f),
        f == null)
            throw Error(k(151));
        for (var S = N = null, E = p, M = p = 0, q = null, A = f.next(); E !== null && !A.done; M++,
        A = f.next()) {
            E.index > M ? (q = E,
            E = null) : q = E.sibling;
            var _e = m(d, E, A.value, v);
            if (_e === null) {
                E === null && (E = q);
                break
            }
            e && E && _e.alternate === null && t(d, E),
            p = l(_e, p, M),
            S === null ? N = _e : S.sibling = _e,
            S = _e,
            E = q
        }
        if (A.done)
            return n(d, E),
            $ && St(d, M),
            N;
        if (E === null) {
            for (; !A.done; M++,
            A = f.next())
                A = y(d, A.value, v),
                A !== null && (p = l(A, p, M),
                S === null ? N = A : S.sibling = A,
                S = A);
            return $ && St(d, M),
            N
        }
        for (E = r(d, E); !A.done; M++,
        A = f.next())
            A = w(E, d, M, A.value, v),
            A !== null && (e && A.alternate !== null && E.delete(A.key === null ? M : A.key),
            p = l(A, p, M),
            S === null ? N = A : S.sibling = A,
            S = A);
        return e && E.forEach(function(wn) {
            return t(d, wn)
        }),
        $ && St(d, M),
        N
    }
    function j(d, p, f, v) {
        if (typeof f == "object" && f !== null && f.type === Vt && f.key === null && (f = f.props.children),
        typeof f == "object" && f !== null) {
            switch (f.$$typeof) {
            case xr:
                e: {
                    for (var N = f.key, S = p; S !== null; ) {
                        if (S.key === N) {
                            if (N = f.type,
                            N === Vt) {
                                if (S.tag === 7) {
                                    n(d, S.sibling),
                                    p = s(S, f.props.children),
                                    p.return = d,
                                    d = p;
                                    break e
                                }
                            } else if (S.elementType === N || typeof N == "object" && N !== null && N.$$typeof === st && ta(N) === S.type) {
                                n(d, S.sibling),
                                p = s(S, f.props),
                                p.ref = En(d, S, f),
                                p.return = d,
                                d = p;
                                break e
                            }
                            n(d, S);
                            break
                        } else
                            t(d, S);
                        S = S.sibling
                    }
                    f.type === Vt ? (p = zt(f.props.children, d.mode, v, f.key),
                    p.return = d,
                    d = p) : (v = Yr(f.type, f.key, f.props, null, d.mode, v),
                    v.ref = En(d, p, f),
                    v.return = d,
                    d = v)
                }
                return i(d);
            case Ht:
                e: {
                    for (S = f.key; p !== null; ) {
                        if (p.key === S)
                            if (p.tag === 4 && p.stateNode.containerInfo === f.containerInfo && p.stateNode.implementation === f.implementation) {
                                n(d, p.sibling),
                                p = s(p, f.children || []),
                                p.return = d,
                                d = p;
                                break e
                            } else {
                                n(d, p);
                                break
                            }
                        else
                            t(d, p);
                        p = p.sibling
                    }
                    p = hl(f, d.mode, v),
                    p.return = d,
                    d = p
                }
                return i(d);
            case st:
                return S = f._init,
                j(d, p, S(f._payload), v)
            }
            if (zn(f))
                return g(d, p, f, v);
            if (bn(f))
                return x(d, p, f, v);
            Tr(d, f)
        }
        return typeof f == "string" && f !== "" || typeof f == "number" ? (f = "" + f,
        p !== null && p.tag === 6 ? (n(d, p.sibling),
        p = s(p, f),
        p.return = d,
        d = p) : (n(d, p),
        p = fl(f, d.mode, v),
        p.return = d,
        d = p),
        i(d)) : n(d, p)
    }
    return j
}
var dn = nu(!0)
  , ru = nu(!1)
  , as = kt(null)
  , cs = null
  , Zt = null
  , Uo = null;
function $o() {
    Uo = Zt = cs = null
}
function Wo(e) {
    var t = as.current;
    U(as),
    e._currentValue = t
}
function Ql(e, t, n) {
    for (; e !== null; ) {
        var r = e.alternate;
        if ((e.childLanes & t) !== t ? (e.childLanes |= t,
        r !== null && (r.childLanes |= t)) : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t),
        e === n)
            break;
        e = e.return
    }
}
function ln(e, t) {
    cs = e,
    Uo = Zt = null,
    e = e.dependencies,
    e !== null && e.firstContext !== null && (e.lanes & t && (fe = !0),
    e.firstContext = null)
}
function Pe(e) {
    var t = e._currentValue;
    if (Uo !== e)
        if (e = {
            context: e,
            memoizedValue: t,
            next: null
        },
        Zt === null) {
            if (cs === null)
                throw Error(k(308));
            Zt = e,
            cs.dependencies = {
                lanes: 0,
                firstContext: e
            }
        } else
            Zt = Zt.next = e;
    return t
}
var Tt = null;
function Ho(e) {
    Tt === null ? Tt = [e] : Tt.push(e)
}
function su(e, t, n, r) {
    var s = t.interleaved;
    return s === null ? (n.next = n,
    Ho(t)) : (n.next = s.next,
    s.next = n),
    t.interleaved = n,
    et(e, r)
}
function et(e, t) {
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
var lt = !1;
function Vo(e) {
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
function lu(e, t) {
    e = e.updateQueue,
    t.updateQueue === e && (t.updateQueue = {
        baseState: e.baseState,
        firstBaseUpdate: e.firstBaseUpdate,
        lastBaseUpdate: e.lastBaseUpdate,
        shared: e.shared,
        effects: e.effects
    })
}
function Xe(e, t) {
    return {
        eventTime: e,
        lane: t,
        tag: 0,
        payload: null,
        callback: null,
        next: null
    }
}
function ht(e, t, n) {
    var r = e.updateQueue;
    if (r === null)
        return null;
    if (r = r.shared,
    R & 2) {
        var s = r.pending;
        return s === null ? t.next = t : (t.next = s.next,
        s.next = t),
        r.pending = t,
        et(e, n)
    }
    return s = r.interleaved,
    s === null ? (t.next = t,
    Ho(r)) : (t.next = s.next,
    s.next = t),
    r.interleaved = t,
    et(e, n)
}
function Wr(e, t, n) {
    if (t = t.updateQueue,
    t !== null && (t = t.shared,
    (n & 4194240) !== 0)) {
        var r = t.lanes;
        r &= e.pendingLanes,
        n |= r,
        t.lanes = n,
        To(e, n)
    }
}
function na(e, t) {
    var n = e.updateQueue
      , r = e.alternate;
    if (r !== null && (r = r.updateQueue,
    n === r)) {
        var s = null
          , l = null;
        if (n = n.firstBaseUpdate,
        n !== null) {
            do {
                var i = {
                    eventTime: n.eventTime,
                    lane: n.lane,
                    tag: n.tag,
                    payload: n.payload,
                    callback: n.callback,
                    next: null
                };
                l === null ? s = l = i : l = l.next = i,
                n = n.next
            } while (n !== null);
            l === null ? s = l = t : l = l.next = t
        } else
            s = l = t;
        n = {
            baseState: r.baseState,
            firstBaseUpdate: s,
            lastBaseUpdate: l,
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
function us(e, t, n, r) {
    var s = e.updateQueue;
    lt = !1;
    var l = s.firstBaseUpdate
      , i = s.lastBaseUpdate
      , a = s.shared.pending;
    if (a !== null) {
        s.shared.pending = null;
        var c = a
          , u = c.next;
        c.next = null,
        i === null ? l = u : i.next = u,
        i = c;
        var h = e.alternate;
        h !== null && (h = h.updateQueue,
        a = h.lastBaseUpdate,
        a !== i && (a === null ? h.firstBaseUpdate = u : a.next = u,
        h.lastBaseUpdate = c))
    }
    if (l !== null) {
        var y = s.baseState;
        i = 0,
        h = u = c = null,
        a = l;
        do {
            var m = a.lane
              , w = a.eventTime;
            if ((r & m) === m) {
                h !== null && (h = h.next = {
                    eventTime: w,
                    lane: 0,
                    tag: a.tag,
                    payload: a.payload,
                    callback: a.callback,
                    next: null
                });
                e: {
                    var g = e
                      , x = a;
                    switch (m = t,
                    w = n,
                    x.tag) {
                    case 1:
                        if (g = x.payload,
                        typeof g == "function") {
                            y = g.call(w, y, m);
                            break e
                        }
                        y = g;
                        break e;
                    case 3:
                        g.flags = g.flags & -65537 | 128;
                    case 0:
                        if (g = x.payload,
                        m = typeof g == "function" ? g.call(w, y, m) : g,
                        m == null)
                            break e;
                        y = V({}, y, m);
                        break e;
                    case 2:
                        lt = !0
                    }
                }
                a.callback !== null && a.lane !== 0 && (e.flags |= 64,
                m = s.effects,
                m === null ? s.effects = [a] : m.push(a))
            } else
                w = {
                    eventTime: w,
                    lane: m,
                    tag: a.tag,
                    payload: a.payload,
                    callback: a.callback,
                    next: null
                },
                h === null ? (u = h = w,
                c = y) : h = h.next = w,
                i |= m;
            if (a = a.next,
            a === null) {
                if (a = s.shared.pending,
                a === null)
                    break;
                m = a,
                a = m.next,
                m.next = null,
                s.lastBaseUpdate = m,
                s.shared.pending = null
            }
        } while (!0);
        if (h === null && (c = y),
        s.baseState = c,
        s.firstBaseUpdate = u,
        s.lastBaseUpdate = h,
        t = s.shared.interleaved,
        t !== null) {
            s = t;
            do
                i |= s.lane,
                s = s.next;
            while (s !== t)
        } else
            l === null && (s.shared.lanes = 0);
        Rt |= i,
        e.lanes = i,
        e.memoizedState = y
    }
}
function ra(e, t, n) {
    if (e = t.effects,
    t.effects = null,
    e !== null)
        for (t = 0; t < e.length; t++) {
            var r = e[t]
              , s = r.callback;
            if (s !== null) {
                if (r.callback = null,
                r = n,
                typeof s != "function")
                    throw Error(k(191, s));
                s.call(r)
            }
        }
}
var pr = {}
  , qe = kt(pr)
  , tr = kt(pr)
  , nr = kt(pr);
function Mt(e) {
    if (e === pr)
        throw Error(k(174));
    return e
}
function Bo(e, t) {
    switch (O(nr, t),
    O(tr, e),
    O(qe, pr),
    e = t.nodeType,
    e) {
    case 9:
    case 11:
        t = (t = t.documentElement) ? t.namespaceURI : El(null, "");
        break;
    default:
        e = e === 8 ? t.parentNode : t,
        t = e.namespaceURI || null,
        e = e.tagName,
        t = El(t, e)
    }
    U(qe),
    O(qe, t)
}
function pn() {
    U(qe),
    U(tr),
    U(nr)
}
function ou(e) {
    Mt(nr.current);
    var t = Mt(qe.current)
      , n = El(t, e.type);
    t !== n && (O(tr, e),
    O(qe, n))
}
function qo(e) {
    tr.current === e && (U(qe),
    U(tr))
}
var W = kt(0);
function ds(e) {
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
var il = [];
function Qo() {
    for (var e = 0; e < il.length; e++)
        il[e]._workInProgressVersionPrimary = null;
    il.length = 0
}
var Hr = nt.ReactCurrentDispatcher
  , al = nt.ReactCurrentBatchConfig
  , At = 0
  , H = null
  , G = null
  , J = null
  , ps = !1
  , Un = !1
  , rr = 0
  , uf = 0;
function se() {
    throw Error(k(321))
}
function Yo(e, t) {
    if (t === null)
        return !1;
    for (var n = 0; n < t.length && n < e.length; n++)
        if (!De(e[n], t[n]))
            return !1;
    return !0
}
function Ko(e, t, n, r, s, l) {
    if (At = l,
    H = t,
    t.memoizedState = null,
    t.updateQueue = null,
    t.lanes = 0,
    Hr.current = e === null || e.memoizedState === null ? hf : mf,
    e = n(r, s),
    Un) {
        l = 0;
        do {
            if (Un = !1,
            rr = 0,
            25 <= l)
                throw Error(k(301));
            l += 1,
            J = G = null,
            t.updateQueue = null,
            Hr.current = yf,
            e = n(r, s)
        } while (Un)
    }
    if (Hr.current = fs,
    t = G !== null && G.next !== null,
    At = 0,
    J = G = H = null,
    ps = !1,
    t)
        throw Error(k(300));
    return e
}
function Go() {
    var e = rr !== 0;
    return rr = 0,
    e
}
function We() {
    var e = {
        memoizedState: null,
        baseState: null,
        baseQueue: null,
        queue: null,
        next: null
    };
    return J === null ? H.memoizedState = J = e : J = J.next = e,
    J
}
function Te() {
    if (G === null) {
        var e = H.alternate;
        e = e !== null ? e.memoizedState : null
    } else
        e = G.next;
    var t = J === null ? H.memoizedState : J.next;
    if (t !== null)
        J = t,
        G = e;
    else {
        if (e === null)
            throw Error(k(310));
        G = e,
        e = {
            memoizedState: G.memoizedState,
            baseState: G.baseState,
            baseQueue: G.baseQueue,
            queue: G.queue,
            next: null
        },
        J === null ? H.memoizedState = J = e : J = J.next = e
    }
    return J
}
function sr(e, t) {
    return typeof t == "function" ? t(e) : t
}
function cl(e) {
    var t = Te()
      , n = t.queue;
    if (n === null)
        throw Error(k(311));
    n.lastRenderedReducer = e;
    var r = G
      , s = r.baseQueue
      , l = n.pending;
    if (l !== null) {
        if (s !== null) {
            var i = s.next;
            s.next = l.next,
            l.next = i
        }
        r.baseQueue = s = l,
        n.pending = null
    }
    if (s !== null) {
        l = s.next,
        r = r.baseState;
        var a = i = null
          , c = null
          , u = l;
        do {
            var h = u.lane;
            if ((At & h) === h)
                c !== null && (c = c.next = {
                    lane: 0,
                    action: u.action,
                    hasEagerState: u.hasEagerState,
                    eagerState: u.eagerState,
                    next: null
                }),
                r = u.hasEagerState ? u.eagerState : e(r, u.action);
            else {
                var y = {
                    lane: h,
                    action: u.action,
                    hasEagerState: u.hasEagerState,
                    eagerState: u.eagerState,
                    next: null
                };
                c === null ? (a = c = y,
                i = r) : c = c.next = y,
                H.lanes |= h,
                Rt |= h
            }
            u = u.next
        } while (u !== null && u !== l);
        c === null ? i = r : c.next = a,
        De(r, t.memoizedState) || (fe = !0),
        t.memoizedState = r,
        t.baseState = i,
        t.baseQueue = c,
        n.lastRenderedState = r
    }
    if (e = n.interleaved,
    e !== null) {
        s = e;
        do
            l = s.lane,
            H.lanes |= l,
            Rt |= l,
            s = s.next;
        while (s !== e)
    } else
        s === null && (n.lanes = 0);
    return [t.memoizedState, n.dispatch]
}
function ul(e) {
    var t = Te()
      , n = t.queue;
    if (n === null)
        throw Error(k(311));
    n.lastRenderedReducer = e;
    var r = n.dispatch
      , s = n.pending
      , l = t.memoizedState;
    if (s !== null) {
        n.pending = null;
        var i = s = s.next;
        do
            l = e(l, i.action),
            i = i.next;
        while (i !== s);
        De(l, t.memoizedState) || (fe = !0),
        t.memoizedState = l,
        t.baseQueue === null && (t.baseState = l),
        n.lastRenderedState = l
    }
    return [l, r]
}
function iu() {}
function au(e, t) {
    var n = H
      , r = Te()
      , s = t()
      , l = !De(r.memoizedState, s);
    if (l && (r.memoizedState = s,
    fe = !0),
    r = r.queue,
    Xo(du.bind(null, n, r, e), [e]),
    r.getSnapshot !== t || l || J !== null && J.memoizedState.tag & 1) {
        if (n.flags |= 2048,
        lr(9, uu.bind(null, n, r, s, t), void 0, null),
        ee === null)
            throw Error(k(349));
        At & 30 || cu(n, t, s)
    }
    return s
}
function cu(e, t, n) {
    e.flags |= 16384,
    e = {
        getSnapshot: t,
        value: n
    },
    t = H.updateQueue,
    t === null ? (t = {
        lastEffect: null,
        stores: null
    },
    H.updateQueue = t,
    t.stores = [e]) : (n = t.stores,
    n === null ? t.stores = [e] : n.push(e))
}
function uu(e, t, n, r) {
    t.value = n,
    t.getSnapshot = r,
    pu(t) && fu(e)
}
function du(e, t, n) {
    return n(function() {
        pu(t) && fu(e)
    })
}
function pu(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
        var n = t();
        return !De(e, n)
    } catch {
        return !0
    }
}
function fu(e) {
    var t = et(e, 1);
    t !== null && Oe(t, e, 1, -1)
}
function sa(e) {
    var t = We();
    return typeof e == "function" && (e = e()),
    t.memoizedState = t.baseState = e,
    e = {
        pending: null,
        interleaved: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: sr,
        lastRenderedState: e
    },
    t.queue = e,
    e = e.dispatch = ff.bind(null, H, e),
    [t.memoizedState, e]
}
function lr(e, t, n, r) {
    return e = {
        tag: e,
        create: t,
        destroy: n,
        deps: r,
        next: null
    },
    t = H.updateQueue,
    t === null ? (t = {
        lastEffect: null,
        stores: null
    },
    H.updateQueue = t,
    t.lastEffect = e.next = e) : (n = t.lastEffect,
    n === null ? t.lastEffect = e.next = e : (r = n.next,
    n.next = e,
    e.next = r,
    t.lastEffect = e)),
    e
}
function hu() {
    return Te().memoizedState
}
function Vr(e, t, n, r) {
    var s = We();
    H.flags |= e,
    s.memoizedState = lr(1 | t, n, void 0, r === void 0 ? null : r)
}
function Ts(e, t, n, r) {
    var s = Te();
    r = r === void 0 ? null : r;
    var l = void 0;
    if (G !== null) {
        var i = G.memoizedState;
        if (l = i.destroy,
        r !== null && Yo(r, i.deps)) {
            s.memoizedState = lr(t, n, l, r);
            return
        }
    }
    H.flags |= e,
    s.memoizedState = lr(1 | t, n, l, r)
}
function la(e, t) {
    return Vr(8390656, 8, e, t)
}
function Xo(e, t) {
    return Ts(2048, 8, e, t)
}
function mu(e, t) {
    return Ts(4, 2, e, t)
}
function yu(e, t) {
    return Ts(4, 4, e, t)
}
function gu(e, t) {
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
function xu(e, t, n) {
    return n = n != null ? n.concat([e]) : null,
    Ts(4, 4, gu.bind(null, t, e), n)
}
function Zo() {}
function vu(e, t) {
    var n = Te();
    t = t === void 0 ? null : t;
    var r = n.memoizedState;
    return r !== null && t !== null && Yo(t, r[1]) ? r[0] : (n.memoizedState = [e, t],
    e)
}
function wu(e, t) {
    var n = Te();
    t = t === void 0 ? null : t;
    var r = n.memoizedState;
    return r !== null && t !== null && Yo(t, r[1]) ? r[0] : (e = e(),
    n.memoizedState = [e, t],
    e)
}
function ku(e, t, n) {
    return At & 21 ? (De(n, t) || (n = Cc(),
    H.lanes |= n,
    Rt |= n,
    e.baseState = !0),
    t) : (e.baseState && (e.baseState = !1,
    fe = !0),
    e.memoizedState = n)
}
function df(e, t) {
    var n = F;
    F = n !== 0 && 4 > n ? n : 4,
    e(!0);
    var r = al.transition;
    al.transition = {};
    try {
        e(!1),
        t()
    } finally {
        F = n,
        al.transition = r
    }
}
function bu() {
    return Te().memoizedState
}
function pf(e, t, n) {
    var r = yt(e);
    if (n = {
        lane: r,
        action: n,
        hasEagerState: !1,
        eagerState: null,
        next: null
    },
    Nu(e))
        ju(t, n);
    else if (n = su(e, t, n, r),
    n !== null) {
        var s = ce();
        Oe(n, e, r, s),
        Su(n, t, r)
    }
}
function ff(e, t, n) {
    var r = yt(e)
      , s = {
        lane: r,
        action: n,
        hasEagerState: !1,
        eagerState: null,
        next: null
    };
    if (Nu(e))
        ju(t, s);
    else {
        var l = e.alternate;
        if (e.lanes === 0 && (l === null || l.lanes === 0) && (l = t.lastRenderedReducer,
        l !== null))
            try {
                var i = t.lastRenderedState
                  , a = l(i, n);
                if (s.hasEagerState = !0,
                s.eagerState = a,
                De(a, i)) {
                    var c = t.interleaved;
                    c === null ? (s.next = s,
                    Ho(t)) : (s.next = c.next,
                    c.next = s),
                    t.interleaved = s;
                    return
                }
            } catch {} finally {}
        n = su(e, t, s, r),
        n !== null && (s = ce(),
        Oe(n, e, r, s),
        Su(n, t, r))
    }
}
function Nu(e) {
    var t = e.alternate;
    return e === H || t !== null && t === H
}
function ju(e, t) {
    Un = ps = !0;
    var n = e.pending;
    n === null ? t.next = t : (t.next = n.next,
    n.next = t),
    e.pending = t
}
function Su(e, t, n) {
    if (n & 4194240) {
        var r = t.lanes;
        r &= e.pendingLanes,
        n |= r,
        t.lanes = n,
        To(e, n)
    }
}
var fs = {
    readContext: Pe,
    useCallback: se,
    useContext: se,
    useEffect: se,
    useImperativeHandle: se,
    useInsertionEffect: se,
    useLayoutEffect: se,
    useMemo: se,
    useReducer: se,
    useRef: se,
    useState: se,
    useDebugValue: se,
    useDeferredValue: se,
    useTransition: se,
    useMutableSource: se,
    useSyncExternalStore: se,
    useId: se,
    unstable_isNewReconciler: !1
}
  , hf = {
    readContext: Pe,
    useCallback: function(e, t) {
        return We().memoizedState = [e, t === void 0 ? null : t],
        e
    },
    useContext: Pe,
    useEffect: la,
    useImperativeHandle: function(e, t, n) {
        return n = n != null ? n.concat([e]) : null,
        Vr(4194308, 4, gu.bind(null, t, e), n)
    },
    useLayoutEffect: function(e, t) {
        return Vr(4194308, 4, e, t)
    },
    useInsertionEffect: function(e, t) {
        return Vr(4, 2, e, t)
    },
    useMemo: function(e, t) {
        var n = We();
        return t = t === void 0 ? null : t,
        e = e(),
        n.memoizedState = [e, t],
        e
    },
    useReducer: function(e, t, n) {
        var r = We();
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
        e = e.dispatch = pf.bind(null, H, e),
        [r.memoizedState, e]
    },
    useRef: function(e) {
        var t = We();
        return e = {
            current: e
        },
        t.memoizedState = e
    },
    useState: sa,
    useDebugValue: Zo,
    useDeferredValue: function(e) {
        return We().memoizedState = e
    },
    useTransition: function() {
        var e = sa(!1)
          , t = e[0];
        return e = df.bind(null, e[1]),
        We().memoizedState = e,
        [t, e]
    },
    useMutableSource: function() {},
    useSyncExternalStore: function(e, t, n) {
        var r = H
          , s = We();
        if ($) {
            if (n === void 0)
                throw Error(k(407));
            n = n()
        } else {
            if (n = t(),
            ee === null)
                throw Error(k(349));
            At & 30 || cu(r, t, n)
        }
        s.memoizedState = n;
        var l = {
            value: n,
            getSnapshot: t
        };
        return s.queue = l,
        la(du.bind(null, r, l, e), [e]),
        r.flags |= 2048,
        lr(9, uu.bind(null, r, l, n, t), void 0, null),
        n
    },
    useId: function() {
        var e = We()
          , t = ee.identifierPrefix;
        if ($) {
            var n = Ge
              , r = Ke;
            n = (r & ~(1 << 32 - Fe(r) - 1)).toString(32) + n,
            t = ":" + t + "R" + n,
            n = rr++,
            0 < n && (t += "H" + n.toString(32)),
            t += ":"
        } else
            n = uf++,
            t = ":" + t + "r" + n.toString(32) + ":";
        return e.memoizedState = t
    },
    unstable_isNewReconciler: !1
}
  , mf = {
    readContext: Pe,
    useCallback: vu,
    useContext: Pe,
    useEffect: Xo,
    useImperativeHandle: xu,
    useInsertionEffect: mu,
    useLayoutEffect: yu,
    useMemo: wu,
    useReducer: cl,
    useRef: hu,
    useState: function() {
        return cl(sr)
    },
    useDebugValue: Zo,
    useDeferredValue: function(e) {
        var t = Te();
        return ku(t, G.memoizedState, e)
    },
    useTransition: function() {
        var e = cl(sr)[0]
          , t = Te().memoizedState;
        return [e, t]
    },
    useMutableSource: iu,
    useSyncExternalStore: au,
    useId: bu,
    unstable_isNewReconciler: !1
}
  , yf = {
    readContext: Pe,
    useCallback: vu,
    useContext: Pe,
    useEffect: Xo,
    useImperativeHandle: xu,
    useInsertionEffect: mu,
    useLayoutEffect: yu,
    useMemo: wu,
    useReducer: ul,
    useRef: hu,
    useState: function() {
        return ul(sr)
    },
    useDebugValue: Zo,
    useDeferredValue: function(e) {
        var t = Te();
        return G === null ? t.memoizedState = e : ku(t, G.memoizedState, e)
    },
    useTransition: function() {
        var e = ul(sr)[0]
          , t = Te().memoizedState;
        return [e, t]
    },
    useMutableSource: iu,
    useSyncExternalStore: au,
    useId: bu,
    unstable_isNewReconciler: !1
};
function Ie(e, t) {
    if (e && e.defaultProps) {
        t = V({}, t),
        e = e.defaultProps;
        for (var n in e)
            t[n] === void 0 && (t[n] = e[n]);
        return t
    }
    return t
}
function Yl(e, t, n, r) {
    t = e.memoizedState,
    n = n(r, t),
    n = n == null ? t : V({}, t, n),
    e.memoizedState = n,
    e.lanes === 0 && (e.updateQueue.baseState = n)
}
var Ms = {
    isMounted: function(e) {
        return (e = e._reactInternals) ? Ut(e) === e : !1
    },
    enqueueSetState: function(e, t, n) {
        e = e._reactInternals;
        var r = ce()
          , s = yt(e)
          , l = Xe(r, s);
        l.payload = t,
        n != null && (l.callback = n),
        t = ht(e, l, s),
        t !== null && (Oe(t, e, s, r),
        Wr(t, e, s))
    },
    enqueueReplaceState: function(e, t, n) {
        e = e._reactInternals;
        var r = ce()
          , s = yt(e)
          , l = Xe(r, s);
        l.tag = 1,
        l.payload = t,
        n != null && (l.callback = n),
        t = ht(e, l, s),
        t !== null && (Oe(t, e, s, r),
        Wr(t, e, s))
    },
    enqueueForceUpdate: function(e, t) {
        e = e._reactInternals;
        var n = ce()
          , r = yt(e)
          , s = Xe(n, r);
        s.tag = 2,
        t != null && (s.callback = t),
        t = ht(e, s, r),
        t !== null && (Oe(t, e, r, n),
        Wr(t, e, r))
    }
};
function oa(e, t, n, r, s, l, i) {
    return e = e.stateNode,
    typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, l, i) : t.prototype && t.prototype.isPureReactComponent ? !Xn(n, r) || !Xn(s, l) : !0
}
function Cu(e, t, n) {
    var r = !1
      , s = vt
      , l = t.contextType;
    return typeof l == "object" && l !== null ? l = Pe(l) : (s = me(t) ? Lt : ie.current,
    r = t.contextTypes,
    l = (r = r != null) ? cn(e, s) : vt),
    t = new t(n,l),
    e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null,
    t.updater = Ms,
    e.stateNode = t,
    t._reactInternals = e,
    r && (e = e.stateNode,
    e.__reactInternalMemoizedUnmaskedChildContext = s,
    e.__reactInternalMemoizedMaskedChildContext = l),
    t
}
function ia(e, t, n, r) {
    e = t.state,
    typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r),
    typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r),
    t.state !== e && Ms.enqueueReplaceState(t, t.state, null)
}
function Kl(e, t, n, r) {
    var s = e.stateNode;
    s.props = n,
    s.state = e.memoizedState,
    s.refs = {},
    Vo(e);
    var l = t.contextType;
    typeof l == "object" && l !== null ? s.context = Pe(l) : (l = me(t) ? Lt : ie.current,
    s.context = cn(e, l)),
    s.state = e.memoizedState,
    l = t.getDerivedStateFromProps,
    typeof l == "function" && (Yl(e, t, l, n),
    s.state = e.memoizedState),
    typeof t.getDerivedStateFromProps == "function" || typeof s.getSnapshotBeforeUpdate == "function" || typeof s.UNSAFE_componentWillMount != "function" && typeof s.componentWillMount != "function" || (t = s.state,
    typeof s.componentWillMount == "function" && s.componentWillMount(),
    typeof s.UNSAFE_componentWillMount == "function" && s.UNSAFE_componentWillMount(),
    t !== s.state && Ms.enqueueReplaceState(s, s.state, null),
    us(e, n, s, r),
    s.state = e.memoizedState),
    typeof s.componentDidMount == "function" && (e.flags |= 4194308)
}
function fn(e, t) {
    try {
        var n = ""
          , r = t;
        do
            n += Hd(r),
            r = r.return;
        while (r);
        var s = n
    } catch (l) {
        s = `
Error generating stack: ` + l.message + `
` + l.stack
    }
    return {
        value: e,
        source: t,
        stack: s,
        digest: null
    }
}
function dl(e, t, n) {
    return {
        value: e,
        source: null,
        stack: n ?? null,
        digest: t ?? null
    }
}
function Gl(e, t) {
    try {
        console.error(t.value)
    } catch (n) {
        setTimeout(function() {
            throw n
        })
    }
}
var gf = typeof WeakMap == "function" ? WeakMap : Map;
function Eu(e, t, n) {
    n = Xe(-1, n),
    n.tag = 3,
    n.payload = {
        element: null
    };
    var r = t.value;
    return n.callback = function() {
        ms || (ms = !0,
        oo = r),
        Gl(e, t)
    }
    ,
    n
}
function Pu(e, t, n) {
    n = Xe(-1, n),
    n.tag = 3;
    var r = e.type.getDerivedStateFromError;
    if (typeof r == "function") {
        var s = t.value;
        n.payload = function() {
            return r(s)
        }
        ,
        n.callback = function() {
            Gl(e, t)
        }
    }
    var l = e.stateNode;
    return l !== null && typeof l.componentDidCatch == "function" && (n.callback = function() {
        Gl(e, t),
        typeof r != "function" && (mt === null ? mt = new Set([this]) : mt.add(this));
        var i = t.stack;
        this.componentDidCatch(t.value, {
            componentStack: i !== null ? i : ""
        })
    }
    ),
    n
}
function aa(e, t, n) {
    var r = e.pingCache;
    if (r === null) {
        r = e.pingCache = new gf;
        var s = new Set;
        r.set(t, s)
    } else
        s = r.get(t),
        s === void 0 && (s = new Set,
        r.set(t, s));
    s.has(n) || (s.add(n),
    e = _f.bind(null, e, t, n),
    t.then(e, e))
}
function ca(e) {
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
function ua(e, t, n, r, s) {
    return e.mode & 1 ? (e.flags |= 65536,
    e.lanes = s,
    e) : (e === t ? e.flags |= 65536 : (e.flags |= 128,
    n.flags |= 131072,
    n.flags &= -52805,
    n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = Xe(-1, 1),
    t.tag = 2,
    ht(n, t, 1))),
    n.lanes |= 1),
    e)
}
var xf = nt.ReactCurrentOwner
  , fe = !1;
function ae(e, t, n, r) {
    t.child = e === null ? ru(t, null, n, r) : dn(t, e.child, n, r)
}
function da(e, t, n, r, s) {
    n = n.render;
    var l = t.ref;
    return ln(t, s),
    r = Ko(e, t, n, r, l, s),
    n = Go(),
    e !== null && !fe ? (t.updateQueue = e.updateQueue,
    t.flags &= -2053,
    e.lanes &= ~s,
    tt(e, t, s)) : ($ && n && Fo(t),
    t.flags |= 1,
    ae(e, t, r, s),
    t.child)
}
function pa(e, t, n, r, s) {
    if (e === null) {
        var l = n.type;
        return typeof l == "function" && !oi(l) && l.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15,
        t.type = l,
        Tu(e, t, l, r, s)) : (e = Yr(n.type, null, r, t, t.mode, s),
        e.ref = t.ref,
        e.return = t,
        t.child = e)
    }
    if (l = e.child,
    !(e.lanes & s)) {
        var i = l.memoizedProps;
        if (n = n.compare,
        n = n !== null ? n : Xn,
        n(i, r) && e.ref === t.ref)
            return tt(e, t, s)
    }
    return t.flags |= 1,
    e = gt(l, r),
    e.ref = t.ref,
    e.return = t,
    t.child = e
}
function Tu(e, t, n, r, s) {
    if (e !== null) {
        var l = e.memoizedProps;
        if (Xn(l, r) && e.ref === t.ref)
            if (fe = !1,
            t.pendingProps = r = l,
            (e.lanes & s) !== 0)
                e.flags & 131072 && (fe = !0);
            else
                return t.lanes = e.lanes,
                tt(e, t, s)
    }
    return Xl(e, t, n, r, s)
}
function Mu(e, t, n) {
    var r = t.pendingProps
      , s = r.children
      , l = e !== null ? e.memoizedState : null;
    if (r.mode === "hidden")
        if (!(t.mode & 1))
            t.memoizedState = {
                baseLanes: 0,
                cachePool: null,
                transitions: null
            },
            O(en, xe),
            xe |= n;
        else {
            if (!(n & 1073741824))
                return e = l !== null ? l.baseLanes | n : n,
                t.lanes = t.childLanes = 1073741824,
                t.memoizedState = {
                    baseLanes: e,
                    cachePool: null,
                    transitions: null
                },
                t.updateQueue = null,
                O(en, xe),
                xe |= e,
                null;
            t.memoizedState = {
                baseLanes: 0,
                cachePool: null,
                transitions: null
            },
            r = l !== null ? l.baseLanes : n,
            O(en, xe),
            xe |= r
        }
    else
        l !== null ? (r = l.baseLanes | n,
        t.memoizedState = null) : r = n,
        O(en, xe),
        xe |= r;
    return ae(e, t, s, n),
    t.child
}
function _u(e, t) {
    var n = t.ref;
    (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512,
    t.flags |= 2097152)
}
function Xl(e, t, n, r, s) {
    var l = me(n) ? Lt : ie.current;
    return l = cn(t, l),
    ln(t, s),
    n = Ko(e, t, n, r, l, s),
    r = Go(),
    e !== null && !fe ? (t.updateQueue = e.updateQueue,
    t.flags &= -2053,
    e.lanes &= ~s,
    tt(e, t, s)) : ($ && r && Fo(t),
    t.flags |= 1,
    ae(e, t, n, s),
    t.child)
}
function fa(e, t, n, r, s) {
    if (me(n)) {
        var l = !0;
        ls(t)
    } else
        l = !1;
    if (ln(t, s),
    t.stateNode === null)
        Br(e, t),
        Cu(t, n, r),
        Kl(t, n, r, s),
        r = !0;
    else if (e === null) {
        var i = t.stateNode
          , a = t.memoizedProps;
        i.props = a;
        var c = i.context
          , u = n.contextType;
        typeof u == "object" && u !== null ? u = Pe(u) : (u = me(n) ? Lt : ie.current,
        u = cn(t, u));
        var h = n.getDerivedStateFromProps
          , y = typeof h == "function" || typeof i.getSnapshotBeforeUpdate == "function";
        y || typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function" || (a !== r || c !== u) && ia(t, i, r, u),
        lt = !1;
        var m = t.memoizedState;
        i.state = m,
        us(t, r, i, s),
        c = t.memoizedState,
        a !== r || m !== c || he.current || lt ? (typeof h == "function" && (Yl(t, n, h, r),
        c = t.memoizedState),
        (a = lt || oa(t, n, a, r, m, c, u)) ? (y || typeof i.UNSAFE_componentWillMount != "function" && typeof i.componentWillMount != "function" || (typeof i.componentWillMount == "function" && i.componentWillMount(),
        typeof i.UNSAFE_componentWillMount == "function" && i.UNSAFE_componentWillMount()),
        typeof i.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof i.componentDidMount == "function" && (t.flags |= 4194308),
        t.memoizedProps = r,
        t.memoizedState = c),
        i.props = r,
        i.state = c,
        i.context = u,
        r = a) : (typeof i.componentDidMount == "function" && (t.flags |= 4194308),
        r = !1)
    } else {
        i = t.stateNode,
        lu(e, t),
        a = t.memoizedProps,
        u = t.type === t.elementType ? a : Ie(t.type, a),
        i.props = u,
        y = t.pendingProps,
        m = i.context,
        c = n.contextType,
        typeof c == "object" && c !== null ? c = Pe(c) : (c = me(n) ? Lt : ie.current,
        c = cn(t, c));
        var w = n.getDerivedStateFromProps;
        (h = typeof w == "function" || typeof i.getSnapshotBeforeUpdate == "function") || typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function" || (a !== y || m !== c) && ia(t, i, r, c),
        lt = !1,
        m = t.memoizedState,
        i.state = m,
        us(t, r, i, s);
        var g = t.memoizedState;
        a !== y || m !== g || he.current || lt ? (typeof w == "function" && (Yl(t, n, w, r),
        g = t.memoizedState),
        (u = lt || oa(t, n, u, r, m, g, c) || !1) ? (h || typeof i.UNSAFE_componentWillUpdate != "function" && typeof i.componentWillUpdate != "function" || (typeof i.componentWillUpdate == "function" && i.componentWillUpdate(r, g, c),
        typeof i.UNSAFE_componentWillUpdate == "function" && i.UNSAFE_componentWillUpdate(r, g, c)),
        typeof i.componentDidUpdate == "function" && (t.flags |= 4),
        typeof i.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof i.componentDidUpdate != "function" || a === e.memoizedProps && m === e.memoizedState || (t.flags |= 4),
        typeof i.getSnapshotBeforeUpdate != "function" || a === e.memoizedProps && m === e.memoizedState || (t.flags |= 1024),
        t.memoizedProps = r,
        t.memoizedState = g),
        i.props = r,
        i.state = g,
        i.context = c,
        r = u) : (typeof i.componentDidUpdate != "function" || a === e.memoizedProps && m === e.memoizedState || (t.flags |= 4),
        typeof i.getSnapshotBeforeUpdate != "function" || a === e.memoizedProps && m === e.memoizedState || (t.flags |= 1024),
        r = !1)
    }
    return Zl(e, t, n, r, l, s)
}
function Zl(e, t, n, r, s, l) {
    _u(e, t);
    var i = (t.flags & 128) !== 0;
    if (!r && !i)
        return s && Zi(t, n, !1),
        tt(e, t, l);
    r = t.stateNode,
    xf.current = t;
    var a = i && typeof n.getDerivedStateFromError != "function" ? null : r.render();
    return t.flags |= 1,
    e !== null && i ? (t.child = dn(t, e.child, null, l),
    t.child = dn(t, null, a, l)) : ae(e, t, a, l),
    t.memoizedState = r.state,
    s && Zi(t, n, !0),
    t.child
}
function zu(e) {
    var t = e.stateNode;
    t.pendingContext ? Xi(e, t.pendingContext, t.pendingContext !== t.context) : t.context && Xi(e, t.context, !1),
    Bo(e, t.containerInfo)
}
function ha(e, t, n, r, s) {
    return un(),
    Do(s),
    t.flags |= 256,
    ae(e, t, n, r),
    t.child
}
var Jl = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0
};
function eo(e) {
    return {
        baseLanes: e,
        cachePool: null,
        transitions: null
    }
}
function Lu(e, t, n) {
    var r = t.pendingProps, s = W.current, l = !1, i = (t.flags & 128) !== 0, a;
    if ((a = i) || (a = e !== null && e.memoizedState === null ? !1 : (s & 2) !== 0),
    a ? (l = !0,
    t.flags &= -129) : (e === null || e.memoizedState !== null) && (s |= 1),
    O(W, s & 1),
    e === null)
        return ql(t),
        e = t.memoizedState,
        e !== null && (e = e.dehydrated,
        e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1,
        null) : (i = r.children,
        e = r.fallback,
        l ? (r = t.mode,
        l = t.child,
        i = {
            mode: "hidden",
            children: i
        },
        !(r & 1) && l !== null ? (l.childLanes = 0,
        l.pendingProps = i) : l = Ls(i, r, 0, null),
        e = zt(e, r, n, null),
        l.return = t,
        e.return = t,
        l.sibling = e,
        t.child = l,
        t.child.memoizedState = eo(n),
        t.memoizedState = Jl,
        e) : Jo(t, i));
    if (s = e.memoizedState,
    s !== null && (a = s.dehydrated,
    a !== null))
        return vf(e, t, i, r, a, s, n);
    if (l) {
        l = r.fallback,
        i = t.mode,
        s = e.child,
        a = s.sibling;
        var c = {
            mode: "hidden",
            children: r.children
        };
        return !(i & 1) && t.child !== s ? (r = t.child,
        r.childLanes = 0,
        r.pendingProps = c,
        t.deletions = null) : (r = gt(s, c),
        r.subtreeFlags = s.subtreeFlags & 14680064),
        a !== null ? l = gt(a, l) : (l = zt(l, i, n, null),
        l.flags |= 2),
        l.return = t,
        r.return = t,
        r.sibling = l,
        t.child = r,
        r = l,
        l = t.child,
        i = e.child.memoizedState,
        i = i === null ? eo(n) : {
            baseLanes: i.baseLanes | n,
            cachePool: null,
            transitions: i.transitions
        },
        l.memoizedState = i,
        l.childLanes = e.childLanes & ~n,
        t.memoizedState = Jl,
        r
    }
    return l = e.child,
    e = l.sibling,
    r = gt(l, {
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
function Jo(e, t) {
    return t = Ls({
        mode: "visible",
        children: t
    }, e.mode, 0, null),
    t.return = e,
    e.child = t
}
function Mr(e, t, n, r) {
    return r !== null && Do(r),
    dn(t, e.child, null, n),
    e = Jo(t, t.pendingProps.children),
    e.flags |= 2,
    t.memoizedState = null,
    e
}
function vf(e, t, n, r, s, l, i) {
    if (n)
        return t.flags & 256 ? (t.flags &= -257,
        r = dl(Error(k(422))),
        Mr(e, t, i, r)) : t.memoizedState !== null ? (t.child = e.child,
        t.flags |= 128,
        null) : (l = r.fallback,
        s = t.mode,
        r = Ls({
            mode: "visible",
            children: r.children
        }, s, 0, null),
        l = zt(l, s, i, null),
        l.flags |= 2,
        r.return = t,
        l.return = t,
        r.sibling = l,
        t.child = r,
        t.mode & 1 && dn(t, e.child, null, i),
        t.child.memoizedState = eo(i),
        t.memoizedState = Jl,
        l);
    if (!(t.mode & 1))
        return Mr(e, t, i, null);
    if (s.data === "$!") {
        if (r = s.nextSibling && s.nextSibling.dataset,
        r)
            var a = r.dgst;
        return r = a,
        l = Error(k(419)),
        r = dl(l, r, void 0),
        Mr(e, t, i, r)
    }
    if (a = (i & e.childLanes) !== 0,
    fe || a) {
        if (r = ee,
        r !== null) {
            switch (i & -i) {
            case 4:
                s = 2;
                break;
            case 16:
                s = 8;
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
                s = 32;
                break;
            case 536870912:
                s = 268435456;
                break;
            default:
                s = 0
            }
            s = s & (r.suspendedLanes | i) ? 0 : s,
            s !== 0 && s !== l.retryLane && (l.retryLane = s,
            et(e, s),
            Oe(r, e, s, -1))
        }
        return li(),
        r = dl(Error(k(421))),
        Mr(e, t, i, r)
    }
    return s.data === "$?" ? (t.flags |= 128,
    t.child = e.child,
    t = zf.bind(null, e),
    s._reactRetry = t,
    null) : (e = l.treeContext,
    ve = ft(s.nextSibling),
    we = t,
    $ = !0,
    Re = null,
    e !== null && (je[Se++] = Ke,
    je[Se++] = Ge,
    je[Se++] = It,
    Ke = e.id,
    Ge = e.overflow,
    It = t),
    t = Jo(t, r.children),
    t.flags |= 4096,
    t)
}
function ma(e, t, n) {
    e.lanes |= t;
    var r = e.alternate;
    r !== null && (r.lanes |= t),
    Ql(e.return, t, n)
}
function pl(e, t, n, r, s) {
    var l = e.memoizedState;
    l === null ? e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: r,
        tail: n,
        tailMode: s
    } : (l.isBackwards = t,
    l.rendering = null,
    l.renderingStartTime = 0,
    l.last = r,
    l.tail = n,
    l.tailMode = s)
}
function Iu(e, t, n) {
    var r = t.pendingProps
      , s = r.revealOrder
      , l = r.tail;
    if (ae(e, t, r.children, n),
    r = W.current,
    r & 2)
        r = r & 1 | 2,
        t.flags |= 128;
    else {
        if (e !== null && e.flags & 128)
            e: for (e = t.child; e !== null; ) {
                if (e.tag === 13)
                    e.memoizedState !== null && ma(e, n, t);
                else if (e.tag === 19)
                    ma(e, n, t);
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
    if (O(W, r),
    !(t.mode & 1))
        t.memoizedState = null;
    else
        switch (s) {
        case "forwards":
            for (n = t.child,
            s = null; n !== null; )
                e = n.alternate,
                e !== null && ds(e) === null && (s = n),
                n = n.sibling;
            n = s,
            n === null ? (s = t.child,
            t.child = null) : (s = n.sibling,
            n.sibling = null),
            pl(t, !1, s, n, l);
            break;
        case "backwards":
            for (n = null,
            s = t.child,
            t.child = null; s !== null; ) {
                if (e = s.alternate,
                e !== null && ds(e) === null) {
                    t.child = s;
                    break
                }
                e = s.sibling,
                s.sibling = n,
                n = s,
                s = e
            }
            pl(t, !0, n, null, l);
            break;
        case "together":
            pl(t, !1, null, null, void 0);
            break;
        default:
            t.memoizedState = null
        }
    return t.child
}
function Br(e, t) {
    !(t.mode & 1) && e !== null && (e.alternate = null,
    t.alternate = null,
    t.flags |= 2)
}
function tt(e, t, n) {
    if (e !== null && (t.dependencies = e.dependencies),
    Rt |= t.lanes,
    !(n & t.childLanes))
        return null;
    if (e !== null && t.child !== e.child)
        throw Error(k(153));
    if (t.child !== null) {
        for (e = t.child,
        n = gt(e, e.pendingProps),
        t.child = n,
        n.return = t; e.sibling !== null; )
            e = e.sibling,
            n = n.sibling = gt(e, e.pendingProps),
            n.return = t;
        n.sibling = null
    }
    return t.child
}
function wf(e, t, n) {
    switch (t.tag) {
    case 3:
        zu(t),
        un();
        break;
    case 5:
        ou(t);
        break;
    case 1:
        me(t.type) && ls(t);
        break;
    case 4:
        Bo(t, t.stateNode.containerInfo);
        break;
    case 10:
        var r = t.type._context
          , s = t.memoizedProps.value;
        O(as, r._currentValue),
        r._currentValue = s;
        break;
    case 13:
        if (r = t.memoizedState,
        r !== null)
            return r.dehydrated !== null ? (O(W, W.current & 1),
            t.flags |= 128,
            null) : n & t.child.childLanes ? Lu(e, t, n) : (O(W, W.current & 1),
            e = tt(e, t, n),
            e !== null ? e.sibling : null);
        O(W, W.current & 1);
        break;
    case 19:
        if (r = (n & t.childLanes) !== 0,
        e.flags & 128) {
            if (r)
                return Iu(e, t, n);
            t.flags |= 128
        }
        if (s = t.memoizedState,
        s !== null && (s.rendering = null,
        s.tail = null,
        s.lastEffect = null),
        O(W, W.current),
        r)
            break;
        return null;
    case 22:
    case 23:
        return t.lanes = 0,
        Mu(e, t, n)
    }
    return tt(e, t, n)
}
var Au, to, Ru, Fu;
Au = function(e, t) {
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
to = function() {}
;
Ru = function(e, t, n, r) {
    var s = e.memoizedProps;
    if (s !== r) {
        e = t.stateNode,
        Mt(qe.current);
        var l = null;
        switch (n) {
        case "input":
            s = Nl(e, s),
            r = Nl(e, r),
            l = [];
            break;
        case "select":
            s = V({}, s, {
                value: void 0
            }),
            r = V({}, r, {
                value: void 0
            }),
            l = [];
            break;
        case "textarea":
            s = Cl(e, s),
            r = Cl(e, r),
            l = [];
            break;
        default:
            typeof s.onClick != "function" && typeof r.onClick == "function" && (e.onclick = rs)
        }
        Pl(n, r);
        var i;
        n = null;
        for (u in s)
            if (!r.hasOwnProperty(u) && s.hasOwnProperty(u) && s[u] != null)
                if (u === "style") {
                    var a = s[u];
                    for (i in a)
                        a.hasOwnProperty(i) && (n || (n = {}),
                        n[i] = "")
                } else
                    u !== "dangerouslySetInnerHTML" && u !== "children" && u !== "suppressContentEditableWarning" && u !== "suppressHydrationWarning" && u !== "autoFocus" && (Vn.hasOwnProperty(u) ? l || (l = []) : (l = l || []).push(u, null));
        for (u in r) {
            var c = r[u];
            if (a = s != null ? s[u] : void 0,
            r.hasOwnProperty(u) && c !== a && (c != null || a != null))
                if (u === "style")
                    if (a) {
                        for (i in a)
                            !a.hasOwnProperty(i) || c && c.hasOwnProperty(i) || (n || (n = {}),
                            n[i] = "");
                        for (i in c)
                            c.hasOwnProperty(i) && a[i] !== c[i] && (n || (n = {}),
                            n[i] = c[i])
                    } else
                        n || (l || (l = []),
                        l.push(u, n)),
                        n = c;
                else
                    u === "dangerouslySetInnerHTML" ? (c = c ? c.__html : void 0,
                    a = a ? a.__html : void 0,
                    c != null && a !== c && (l = l || []).push(u, c)) : u === "children" ? typeof c != "string" && typeof c != "number" || (l = l || []).push(u, "" + c) : u !== "suppressContentEditableWarning" && u !== "suppressHydrationWarning" && (Vn.hasOwnProperty(u) ? (c != null && u === "onScroll" && D("scroll", e),
                    l || a === c || (l = [])) : (l = l || []).push(u, c))
        }
        n && (l = l || []).push("style", n);
        var u = l;
        (t.updateQueue = u) && (t.flags |= 4)
    }
}
;
Fu = function(e, t, n, r) {
    n !== r && (t.flags |= 4)
}
;
function Pn(e, t) {
    if (!$)
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
function le(e) {
    var t = e.alternate !== null && e.alternate.child === e.child
      , n = 0
      , r = 0;
    if (t)
        for (var s = e.child; s !== null; )
            n |= s.lanes | s.childLanes,
            r |= s.subtreeFlags & 14680064,
            r |= s.flags & 14680064,
            s.return = e,
            s = s.sibling;
    else
        for (s = e.child; s !== null; )
            n |= s.lanes | s.childLanes,
            r |= s.subtreeFlags,
            r |= s.flags,
            s.return = e,
            s = s.sibling;
    return e.subtreeFlags |= r,
    e.childLanes = n,
    t
}
function kf(e, t, n) {
    var r = t.pendingProps;
    switch (Oo(t),
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
        return le(t),
        null;
    case 1:
        return me(t.type) && ss(),
        le(t),
        null;
    case 3:
        return r = t.stateNode,
        pn(),
        U(he),
        U(ie),
        Qo(),
        r.pendingContext && (r.context = r.pendingContext,
        r.pendingContext = null),
        (e === null || e.child === null) && (Pr(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024,
        Re !== null && (co(Re),
        Re = null))),
        to(e, t),
        le(t),
        null;
    case 5:
        qo(t);
        var s = Mt(nr.current);
        if (n = t.type,
        e !== null && t.stateNode != null)
            Ru(e, t, n, r, s),
            e.ref !== t.ref && (t.flags |= 512,
            t.flags |= 2097152);
        else {
            if (!r) {
                if (t.stateNode === null)
                    throw Error(k(166));
                return le(t),
                null
            }
            if (e = Mt(qe.current),
            Pr(t)) {
                r = t.stateNode,
                n = t.type;
                var l = t.memoizedProps;
                switch (r[He] = t,
                r[er] = l,
                e = (t.mode & 1) !== 0,
                n) {
                case "dialog":
                    D("cancel", r),
                    D("close", r);
                    break;
                case "iframe":
                case "object":
                case "embed":
                    D("load", r);
                    break;
                case "video":
                case "audio":
                    for (s = 0; s < In.length; s++)
                        D(In[s], r);
                    break;
                case "source":
                    D("error", r);
                    break;
                case "img":
                case "image":
                case "link":
                    D("error", r),
                    D("load", r);
                    break;
                case "details":
                    D("toggle", r);
                    break;
                case "input":
                    ji(r, l),
                    D("invalid", r);
                    break;
                case "select":
                    r._wrapperState = {
                        wasMultiple: !!l.multiple
                    },
                    D("invalid", r);
                    break;
                case "textarea":
                    Ci(r, l),
                    D("invalid", r)
                }
                Pl(n, l),
                s = null;
                for (var i in l)
                    if (l.hasOwnProperty(i)) {
                        var a = l[i];
                        i === "children" ? typeof a == "string" ? r.textContent !== a && (l.suppressHydrationWarning !== !0 && Er(r.textContent, a, e),
                        s = ["children", a]) : typeof a == "number" && r.textContent !== "" + a && (l.suppressHydrationWarning !== !0 && Er(r.textContent, a, e),
                        s = ["children", "" + a]) : Vn.hasOwnProperty(i) && a != null && i === "onScroll" && D("scroll", r)
                    }
                switch (n) {
                case "input":
                    vr(r),
                    Si(r, l, !0);
                    break;
                case "textarea":
                    vr(r),
                    Ei(r);
                    break;
                case "select":
                case "option":
                    break;
                default:
                    typeof l.onClick == "function" && (r.onclick = rs)
                }
                r = s,
                t.updateQueue = r,
                r !== null && (t.flags |= 4)
            } else {
                i = s.nodeType === 9 ? s : s.ownerDocument,
                e === "http://www.w3.org/1999/xhtml" && (e = dc(n)),
                e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = i.createElement("div"),
                e.innerHTML = "<script><\/script>",
                e = e.removeChild(e.firstChild)) : typeof r.is == "string" ? e = i.createElement(n, {
                    is: r.is
                }) : (e = i.createElement(n),
                n === "select" && (i = e,
                r.multiple ? i.multiple = !0 : r.size && (i.size = r.size))) : e = i.createElementNS(e, n),
                e[He] = t,
                e[er] = r,
                Au(e, t, !1, !1),
                t.stateNode = e;
                e: {
                    switch (i = Tl(n, r),
                    n) {
                    case "dialog":
                        D("cancel", e),
                        D("close", e),
                        s = r;
                        break;
                    case "iframe":
                    case "object":
                    case "embed":
                        D("load", e),
                        s = r;
                        break;
                    case "video":
                    case "audio":
                        for (s = 0; s < In.length; s++)
                            D(In[s], e);
                        s = r;
                        break;
                    case "source":
                        D("error", e),
                        s = r;
                        break;
                    case "img":
                    case "image":
                    case "link":
                        D("error", e),
                        D("load", e),
                        s = r;
                        break;
                    case "details":
                        D("toggle", e),
                        s = r;
                        break;
                    case "input":
                        ji(e, r),
                        s = Nl(e, r),
                        D("invalid", e);
                        break;
                    case "option":
                        s = r;
                        break;
                    case "select":
                        e._wrapperState = {
                            wasMultiple: !!r.multiple
                        },
                        s = V({}, r, {
                            value: void 0
                        }),
                        D("invalid", e);
                        break;
                    case "textarea":
                        Ci(e, r),
                        s = Cl(e, r),
                        D("invalid", e);
                        break;
                    default:
                        s = r
                    }
                    Pl(n, s),
                    a = s;
                    for (l in a)
                        if (a.hasOwnProperty(l)) {
                            var c = a[l];
                            l === "style" ? hc(e, c) : l === "dangerouslySetInnerHTML" ? (c = c ? c.__html : void 0,
                            c != null && pc(e, c)) : l === "children" ? typeof c == "string" ? (n !== "textarea" || c !== "") && Bn(e, c) : typeof c == "number" && Bn(e, "" + c) : l !== "suppressContentEditableWarning" && l !== "suppressHydrationWarning" && l !== "autoFocus" && (Vn.hasOwnProperty(l) ? c != null && l === "onScroll" && D("scroll", e) : c != null && No(e, l, c, i))
                        }
                    switch (n) {
                    case "input":
                        vr(e),
                        Si(e, r, !1);
                        break;
                    case "textarea":
                        vr(e),
                        Ei(e);
                        break;
                    case "option":
                        r.value != null && e.setAttribute("value", "" + xt(r.value));
                        break;
                    case "select":
                        e.multiple = !!r.multiple,
                        l = r.value,
                        l != null ? tn(e, !!r.multiple, l, !1) : r.defaultValue != null && tn(e, !!r.multiple, r.defaultValue, !0);
                        break;
                    default:
                        typeof s.onClick == "function" && (e.onclick = rs)
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
        return le(t),
        null;
    case 6:
        if (e && t.stateNode != null)
            Fu(e, t, e.memoizedProps, r);
        else {
            if (typeof r != "string" && t.stateNode === null)
                throw Error(k(166));
            if (n = Mt(nr.current),
            Mt(qe.current),
            Pr(t)) {
                if (r = t.stateNode,
                n = t.memoizedProps,
                r[He] = t,
                (l = r.nodeValue !== n) && (e = we,
                e !== null))
                    switch (e.tag) {
                    case 3:
                        Er(r.nodeValue, n, (e.mode & 1) !== 0);
                        break;
                    case 5:
                        e.memoizedProps.suppressHydrationWarning !== !0 && Er(r.nodeValue, n, (e.mode & 1) !== 0)
                    }
                l && (t.flags |= 4)
            } else
                r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r),
                r[He] = t,
                t.stateNode = r
        }
        return le(t),
        null;
    case 13:
        if (U(W),
        r = t.memoizedState,
        e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
            if ($ && ve !== null && t.mode & 1 && !(t.flags & 128))
                tu(),
                un(),
                t.flags |= 98560,
                l = !1;
            else if (l = Pr(t),
            r !== null && r.dehydrated !== null) {
                if (e === null) {
                    if (!l)
                        throw Error(k(318));
                    if (l = t.memoizedState,
                    l = l !== null ? l.dehydrated : null,
                    !l)
                        throw Error(k(317));
                    l[He] = t
                } else
                    un(),
                    !(t.flags & 128) && (t.memoizedState = null),
                    t.flags |= 4;
                le(t),
                l = !1
            } else
                Re !== null && (co(Re),
                Re = null),
                l = !0;
            if (!l)
                return t.flags & 65536 ? t : null
        }
        return t.flags & 128 ? (t.lanes = n,
        t) : (r = r !== null,
        r !== (e !== null && e.memoizedState !== null) && r && (t.child.flags |= 8192,
        t.mode & 1 && (e === null || W.current & 1 ? X === 0 && (X = 3) : li())),
        t.updateQueue !== null && (t.flags |= 4),
        le(t),
        null);
    case 4:
        return pn(),
        to(e, t),
        e === null && Zn(t.stateNode.containerInfo),
        le(t),
        null;
    case 10:
        return Wo(t.type._context),
        le(t),
        null;
    case 17:
        return me(t.type) && ss(),
        le(t),
        null;
    case 19:
        if (U(W),
        l = t.memoizedState,
        l === null)
            return le(t),
            null;
        if (r = (t.flags & 128) !== 0,
        i = l.rendering,
        i === null)
            if (r)
                Pn(l, !1);
            else {
                if (X !== 0 || e !== null && e.flags & 128)
                    for (e = t.child; e !== null; ) {
                        if (i = ds(e),
                        i !== null) {
                            for (t.flags |= 128,
                            Pn(l, !1),
                            r = i.updateQueue,
                            r !== null && (t.updateQueue = r,
                            t.flags |= 4),
                            t.subtreeFlags = 0,
                            r = n,
                            n = t.child; n !== null; )
                                l = n,
                                e = r,
                                l.flags &= 14680066,
                                i = l.alternate,
                                i === null ? (l.childLanes = 0,
                                l.lanes = e,
                                l.child = null,
                                l.subtreeFlags = 0,
                                l.memoizedProps = null,
                                l.memoizedState = null,
                                l.updateQueue = null,
                                l.dependencies = null,
                                l.stateNode = null) : (l.childLanes = i.childLanes,
                                l.lanes = i.lanes,
                                l.child = i.child,
                                l.subtreeFlags = 0,
                                l.deletions = null,
                                l.memoizedProps = i.memoizedProps,
                                l.memoizedState = i.memoizedState,
                                l.updateQueue = i.updateQueue,
                                l.type = i.type,
                                e = i.dependencies,
                                l.dependencies = e === null ? null : {
                                    lanes: e.lanes,
                                    firstContext: e.firstContext
                                }),
                                n = n.sibling;
                            return O(W, W.current & 1 | 2),
                            t.child
                        }
                        e = e.sibling
                    }
                l.tail !== null && Y() > hn && (t.flags |= 128,
                r = !0,
                Pn(l, !1),
                t.lanes = 4194304)
            }
        else {
            if (!r)
                if (e = ds(i),
                e !== null) {
                    if (t.flags |= 128,
                    r = !0,
                    n = e.updateQueue,
                    n !== null && (t.updateQueue = n,
                    t.flags |= 4),
                    Pn(l, !0),
                    l.tail === null && l.tailMode === "hidden" && !i.alternate && !$)
                        return le(t),
                        null
                } else
                    2 * Y() - l.renderingStartTime > hn && n !== 1073741824 && (t.flags |= 128,
                    r = !0,
                    Pn(l, !1),
                    t.lanes = 4194304);
            l.isBackwards ? (i.sibling = t.child,
            t.child = i) : (n = l.last,
            n !== null ? n.sibling = i : t.child = i,
            l.last = i)
        }
        return l.tail !== null ? (t = l.tail,
        l.rendering = t,
        l.tail = t.sibling,
        l.renderingStartTime = Y(),
        t.sibling = null,
        n = W.current,
        O(W, r ? n & 1 | 2 : n & 1),
        t) : (le(t),
        null);
    case 22:
    case 23:
        return si(),
        r = t.memoizedState !== null,
        e !== null && e.memoizedState !== null !== r && (t.flags |= 8192),
        r && t.mode & 1 ? xe & 1073741824 && (le(t),
        t.subtreeFlags & 6 && (t.flags |= 8192)) : le(t),
        null;
    case 24:
        return null;
    case 25:
        return null
    }
    throw Error(k(156, t.tag))
}
function bf(e, t) {
    switch (Oo(t),
    t.tag) {
    case 1:
        return me(t.type) && ss(),
        e = t.flags,
        e & 65536 ? (t.flags = e & -65537 | 128,
        t) : null;
    case 3:
        return pn(),
        U(he),
        U(ie),
        Qo(),
        e = t.flags,
        e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128,
        t) : null;
    case 5:
        return qo(t),
        null;
    case 13:
        if (U(W),
        e = t.memoizedState,
        e !== null && e.dehydrated !== null) {
            if (t.alternate === null)
                throw Error(k(340));
            un()
        }
        return e = t.flags,
        e & 65536 ? (t.flags = e & -65537 | 128,
        t) : null;
    case 19:
        return U(W),
        null;
    case 4:
        return pn(),
        null;
    case 10:
        return Wo(t.type._context),
        null;
    case 22:
    case 23:
        return si(),
        null;
    case 24:
        return null;
    default:
        return null
    }
}
var _r = !1
  , oe = !1
  , Nf = typeof WeakSet == "function" ? WeakSet : Set
  , C = null;
function Jt(e, t) {
    var n = e.ref;
    if (n !== null)
        if (typeof n == "function")
            try {
                n(null)
            } catch (r) {
                B(e, t, r)
            }
        else
            n.current = null
}
function no(e, t, n) {
    try {
        n()
    } catch (r) {
        B(e, t, r)
    }
}
var ya = !1;
function jf(e, t) {
    if (Dl = es,
    e = Wc(),
    Ro(e)) {
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
                    var s = r.anchorOffset
                      , l = r.focusNode;
                    r = r.focusOffset;
                    try {
                        n.nodeType,
                        l.nodeType
                    } catch {
                        n = null;
                        break e
                    }
                    var i = 0
                      , a = -1
                      , c = -1
                      , u = 0
                      , h = 0
                      , y = e
                      , m = null;
                    t: for (; ; ) {
                        for (var w; y !== n || s !== 0 && y.nodeType !== 3 || (a = i + s),
                        y !== l || r !== 0 && y.nodeType !== 3 || (c = i + r),
                        y.nodeType === 3 && (i += y.nodeValue.length),
                        (w = y.firstChild) !== null; )
                            m = y,
                            y = w;
                        for (; ; ) {
                            if (y === e)
                                break t;
                            if (m === n && ++u === s && (a = i),
                            m === l && ++h === r && (c = i),
                            (w = y.nextSibling) !== null)
                                break;
                            y = m,
                            m = y.parentNode
                        }
                        y = w
                    }
                    n = a === -1 || c === -1 ? null : {
                        start: a,
                        end: c
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
    for (Ul = {
        focusedElem: e,
        selectionRange: n
    },
    es = !1,
    C = t; C !== null; )
        if (t = C,
        e = t.child,
        (t.subtreeFlags & 1028) !== 0 && e !== null)
            e.return = t,
            C = e;
        else
            for (; C !== null; ) {
                t = C;
                try {
                    var g = t.alternate;
                    if (t.flags & 1024)
                        switch (t.tag) {
                        case 0:
                        case 11:
                        case 15:
                            break;
                        case 1:
                            if (g !== null) {
                                var x = g.memoizedProps
                                  , j = g.memoizedState
                                  , d = t.stateNode
                                  , p = d.getSnapshotBeforeUpdate(t.elementType === t.type ? x : Ie(t.type, x), j);
                                d.__reactInternalSnapshotBeforeUpdate = p
                            }
                            break;
                        case 3:
                            var f = t.stateNode.containerInfo;
                            f.nodeType === 1 ? f.textContent = "" : f.nodeType === 9 && f.documentElement && f.removeChild(f.documentElement);
                            break;
                        case 5:
                        case 6:
                        case 4:
                        case 17:
                            break;
                        default:
                            throw Error(k(163))
                        }
                } catch (v) {
                    B(t, t.return, v)
                }
                if (e = t.sibling,
                e !== null) {
                    e.return = t.return,
                    C = e;
                    break
                }
                C = t.return
            }
    return g = ya,
    ya = !1,
    g
}
function $n(e, t, n) {
    var r = t.updateQueue;
    if (r = r !== null ? r.lastEffect : null,
    r !== null) {
        var s = r = r.next;
        do {
            if ((s.tag & e) === e) {
                var l = s.destroy;
                s.destroy = void 0,
                l !== void 0 && no(t, n, l)
            }
            s = s.next
        } while (s !== r)
    }
}
function _s(e, t) {
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
function ro(e) {
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
function Ou(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null,
    Ou(t)),
    e.child = null,
    e.deletions = null,
    e.sibling = null,
    e.tag === 5 && (t = e.stateNode,
    t !== null && (delete t[He],
    delete t[er],
    delete t[Hl],
    delete t[lf],
    delete t[of])),
    e.stateNode = null,
    e.return = null,
    e.dependencies = null,
    e.memoizedProps = null,
    e.memoizedState = null,
    e.pendingProps = null,
    e.stateNode = null,
    e.updateQueue = null
}
function Du(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 4
}
function ga(e) {
    e: for (; ; ) {
        for (; e.sibling === null; ) {
            if (e.return === null || Du(e.return))
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
function so(e, t, n) {
    var r = e.tag;
    if (r === 5 || r === 6)
        e = e.stateNode,
        t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode,
        t.insertBefore(e, n)) : (t = n,
        t.appendChild(e)),
        n = n._reactRootContainer,
        n != null || t.onclick !== null || (t.onclick = rs));
    else if (r !== 4 && (e = e.child,
    e !== null))
        for (so(e, t, n),
        e = e.sibling; e !== null; )
            so(e, t, n),
            e = e.sibling
}
function lo(e, t, n) {
    var r = e.tag;
    if (r === 5 || r === 6)
        e = e.stateNode,
        t ? n.insertBefore(e, t) : n.appendChild(e);
    else if (r !== 4 && (e = e.child,
    e !== null))
        for (lo(e, t, n),
        e = e.sibling; e !== null; )
            lo(e, t, n),
            e = e.sibling
}
var te = null
  , Ae = !1;
function rt(e, t, n) {
    for (n = n.child; n !== null; )
        Uu(e, t, n),
        n = n.sibling
}
function Uu(e, t, n) {
    if (Be && typeof Be.onCommitFiberUnmount == "function")
        try {
            Be.onCommitFiberUnmount(Ns, n)
        } catch {}
    switch (n.tag) {
    case 5:
        oe || Jt(n, t);
    case 6:
        var r = te
          , s = Ae;
        te = null,
        rt(e, t, n),
        te = r,
        Ae = s,
        te !== null && (Ae ? (e = te,
        n = n.stateNode,
        e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : te.removeChild(n.stateNode));
        break;
    case 18:
        te !== null && (Ae ? (e = te,
        n = n.stateNode,
        e.nodeType === 8 ? ll(e.parentNode, n) : e.nodeType === 1 && ll(e, n),
        Kn(e)) : ll(te, n.stateNode));
        break;
    case 4:
        r = te,
        s = Ae,
        te = n.stateNode.containerInfo,
        Ae = !0,
        rt(e, t, n),
        te = r,
        Ae = s;
        break;
    case 0:
    case 11:
    case 14:
    case 15:
        if (!oe && (r = n.updateQueue,
        r !== null && (r = r.lastEffect,
        r !== null))) {
            s = r = r.next;
            do {
                var l = s
                  , i = l.destroy;
                l = l.tag,
                i !== void 0 && (l & 2 || l & 4) && no(n, t, i),
                s = s.next
            } while (s !== r)
        }
        rt(e, t, n);
        break;
    case 1:
        if (!oe && (Jt(n, t),
        r = n.stateNode,
        typeof r.componentWillUnmount == "function"))
            try {
                r.props = n.memoizedProps,
                r.state = n.memoizedState,
                r.componentWillUnmount()
            } catch (a) {
                B(n, t, a)
            }
        rt(e, t, n);
        break;
    case 21:
        rt(e, t, n);
        break;
    case 22:
        n.mode & 1 ? (oe = (r = oe) || n.memoizedState !== null,
        rt(e, t, n),
        oe = r) : rt(e, t, n);
        break;
    default:
        rt(e, t, n)
    }
}
function xa(e) {
    var t = e.updateQueue;
    if (t !== null) {
        e.updateQueue = null;
        var n = e.stateNode;
        n === null && (n = e.stateNode = new Nf),
        t.forEach(function(r) {
            var s = Lf.bind(null, e, r);
            n.has(r) || (n.add(r),
            r.then(s, s))
        })
    }
}
function ze(e, t) {
    var n = t.deletions;
    if (n !== null)
        for (var r = 0; r < n.length; r++) {
            var s = n[r];
            try {
                var l = e
                  , i = t
                  , a = i;
                e: for (; a !== null; ) {
                    switch (a.tag) {
                    case 5:
                        te = a.stateNode,
                        Ae = !1;
                        break e;
                    case 3:
                        te = a.stateNode.containerInfo,
                        Ae = !0;
                        break e;
                    case 4:
                        te = a.stateNode.containerInfo,
                        Ae = !0;
                        break e
                    }
                    a = a.return
                }
                if (te === null)
                    throw Error(k(160));
                Uu(l, i, s),
                te = null,
                Ae = !1;
                var c = s.alternate;
                c !== null && (c.return = null),
                s.return = null
            } catch (u) {
                B(s, t, u)
            }
        }
    if (t.subtreeFlags & 12854)
        for (t = t.child; t !== null; )
            $u(t, e),
            t = t.sibling
}
function $u(e, t) {
    var n = e.alternate
      , r = e.flags;
    switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
        if (ze(t, e),
        Ue(e),
        r & 4) {
            try {
                $n(3, e, e.return),
                _s(3, e)
            } catch (x) {
                B(e, e.return, x)
            }
            try {
                $n(5, e, e.return)
            } catch (x) {
                B(e, e.return, x)
            }
        }
        break;
    case 1:
        ze(t, e),
        Ue(e),
        r & 512 && n !== null && Jt(n, n.return);
        break;
    case 5:
        if (ze(t, e),
        Ue(e),
        r & 512 && n !== null && Jt(n, n.return),
        e.flags & 32) {
            var s = e.stateNode;
            try {
                Bn(s, "")
            } catch (x) {
                B(e, e.return, x)
            }
        }
        if (r & 4 && (s = e.stateNode,
        s != null)) {
            var l = e.memoizedProps
              , i = n !== null ? n.memoizedProps : l
              , a = e.type
              , c = e.updateQueue;
            if (e.updateQueue = null,
            c !== null)
                try {
                    a === "input" && l.type === "radio" && l.name != null && cc(s, l),
                    Tl(a, i);
                    var u = Tl(a, l);
                    for (i = 0; i < c.length; i += 2) {
                        var h = c[i]
                          , y = c[i + 1];
                        h === "style" ? hc(s, y) : h === "dangerouslySetInnerHTML" ? pc(s, y) : h === "children" ? Bn(s, y) : No(s, h, y, u)
                    }
                    switch (a) {
                    case "input":
                        jl(s, l);
                        break;
                    case "textarea":
                        uc(s, l);
                        break;
                    case "select":
                        var m = s._wrapperState.wasMultiple;
                        s._wrapperState.wasMultiple = !!l.multiple;
                        var w = l.value;
                        w != null ? tn(s, !!l.multiple, w, !1) : m !== !!l.multiple && (l.defaultValue != null ? tn(s, !!l.multiple, l.defaultValue, !0) : tn(s, !!l.multiple, l.multiple ? [] : "", !1))
                    }
                    s[er] = l
                } catch (x) {
                    B(e, e.return, x)
                }
        }
        break;
    case 6:
        if (ze(t, e),
        Ue(e),
        r & 4) {
            if (e.stateNode === null)
                throw Error(k(162));
            s = e.stateNode,
            l = e.memoizedProps;
            try {
                s.nodeValue = l
            } catch (x) {
                B(e, e.return, x)
            }
        }
        break;
    case 3:
        if (ze(t, e),
        Ue(e),
        r & 4 && n !== null && n.memoizedState.isDehydrated)
            try {
                Kn(t.containerInfo)
            } catch (x) {
                B(e, e.return, x)
            }
        break;
    case 4:
        ze(t, e),
        Ue(e);
        break;
    case 13:
        ze(t, e),
        Ue(e),
        s = e.child,
        s.flags & 8192 && (l = s.memoizedState !== null,
        s.stateNode.isHidden = l,
        !l || s.alternate !== null && s.alternate.memoizedState !== null || (ni = Y())),
        r & 4 && xa(e);
        break;
    case 22:
        if (h = n !== null && n.memoizedState !== null,
        e.mode & 1 ? (oe = (u = oe) || h,
        ze(t, e),
        oe = u) : ze(t, e),
        Ue(e),
        r & 8192) {
            if (u = e.memoizedState !== null,
            (e.stateNode.isHidden = u) && !h && e.mode & 1)
                for (C = e,
                h = e.child; h !== null; ) {
                    for (y = C = h; C !== null; ) {
                        switch (m = C,
                        w = m.child,
                        m.tag) {
                        case 0:
                        case 11:
                        case 14:
                        case 15:
                            $n(4, m, m.return);
                            break;
                        case 1:
                            Jt(m, m.return);
                            var g = m.stateNode;
                            if (typeof g.componentWillUnmount == "function") {
                                r = m,
                                n = m.return;
                                try {
                                    t = r,
                                    g.props = t.memoizedProps,
                                    g.state = t.memoizedState,
                                    g.componentWillUnmount()
                                } catch (x) {
                                    B(r, n, x)
                                }
                            }
                            break;
                        case 5:
                            Jt(m, m.return);
                            break;
                        case 22:
                            if (m.memoizedState !== null) {
                                wa(y);
                                continue
                            }
                        }
                        w !== null ? (w.return = m,
                        C = w) : wa(y)
                    }
                    h = h.sibling
                }
            e: for (h = null,
            y = e; ; ) {
                if (y.tag === 5) {
                    if (h === null) {
                        h = y;
                        try {
                            s = y.stateNode,
                            u ? (l = s.style,
                            typeof l.setProperty == "function" ? l.setProperty("display", "none", "important") : l.display = "none") : (a = y.stateNode,
                            c = y.memoizedProps.style,
                            i = c != null && c.hasOwnProperty("display") ? c.display : null,
                            a.style.display = fc("display", i))
                        } catch (x) {
                            B(e, e.return, x)
                        }
                    }
                } else if (y.tag === 6) {
                    if (h === null)
                        try {
                            y.stateNode.nodeValue = u ? "" : y.memoizedProps
                        } catch (x) {
                            B(e, e.return, x)
                        }
                } else if ((y.tag !== 22 && y.tag !== 23 || y.memoizedState === null || y === e) && y.child !== null) {
                    y.child.return = y,
                    y = y.child;
                    continue
                }
                if (y === e)
                    break e;
                for (; y.sibling === null; ) {
                    if (y.return === null || y.return === e)
                        break e;
                    h === y && (h = null),
                    y = y.return
                }
                h === y && (h = null),
                y.sibling.return = y.return,
                y = y.sibling
            }
        }
        break;
    case 19:
        ze(t, e),
        Ue(e),
        r & 4 && xa(e);
        break;
    case 21:
        break;
    default:
        ze(t, e),
        Ue(e)
    }
}
function Ue(e) {
    var t = e.flags;
    if (t & 2) {
        try {
            e: {
                for (var n = e.return; n !== null; ) {
                    if (Du(n)) {
                        var r = n;
                        break e
                    }
                    n = n.return
                }
                throw Error(k(160))
            }
            switch (r.tag) {
            case 5:
                var s = r.stateNode;
                r.flags & 32 && (Bn(s, ""),
                r.flags &= -33);
                var l = ga(e);
                lo(e, l, s);
                break;
            case 3:
            case 4:
                var i = r.stateNode.containerInfo
                  , a = ga(e);
                so(e, a, i);
                break;
            default:
                throw Error(k(161))
            }
        } catch (c) {
            B(e, e.return, c)
        }
        e.flags &= -3
    }
    t & 4096 && (e.flags &= -4097)
}
function Sf(e, t, n) {
    C = e,
    Wu(e)
}
function Wu(e, t, n) {
    for (var r = (e.mode & 1) !== 0; C !== null; ) {
        var s = C
          , l = s.child;
        if (s.tag === 22 && r) {
            var i = s.memoizedState !== null || _r;
            if (!i) {
                var a = s.alternate
                  , c = a !== null && a.memoizedState !== null || oe;
                a = _r;
                var u = oe;
                if (_r = i,
                (oe = c) && !u)
                    for (C = s; C !== null; )
                        i = C,
                        c = i.child,
                        i.tag === 22 && i.memoizedState !== null ? ka(s) : c !== null ? (c.return = i,
                        C = c) : ka(s);
                for (; l !== null; )
                    C = l,
                    Wu(l),
                    l = l.sibling;
                C = s,
                _r = a,
                oe = u
            }
            va(e)
        } else
            s.subtreeFlags & 8772 && l !== null ? (l.return = s,
            C = l) : va(e)
    }
}
function va(e) {
    for (; C !== null; ) {
        var t = C;
        if (t.flags & 8772) {
            var n = t.alternate;
            try {
                if (t.flags & 8772)
                    switch (t.tag) {
                    case 0:
                    case 11:
                    case 15:
                        oe || _s(5, t);
                        break;
                    case 1:
                        var r = t.stateNode;
                        if (t.flags & 4 && !oe)
                            if (n === null)
                                r.componentDidMount();
                            else {
                                var s = t.elementType === t.type ? n.memoizedProps : Ie(t.type, n.memoizedProps);
                                r.componentDidUpdate(s, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate)
                            }
                        var l = t.updateQueue;
                        l !== null && ra(t, l, r);
                        break;
                    case 3:
                        var i = t.updateQueue;
                        if (i !== null) {
                            if (n = null,
                            t.child !== null)
                                switch (t.child.tag) {
                                case 5:
                                    n = t.child.stateNode;
                                    break;
                                case 1:
                                    n = t.child.stateNode
                                }
                            ra(t, i, n)
                        }
                        break;
                    case 5:
                        var a = t.stateNode;
                        if (n === null && t.flags & 4) {
                            n = a;
                            var c = t.memoizedProps;
                            switch (t.type) {
                            case "button":
                            case "input":
                            case "select":
                            case "textarea":
                                c.autoFocus && n.focus();
                                break;
                            case "img":
                                c.src && (n.src = c.src)
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
                            var u = t.alternate;
                            if (u !== null) {
                                var h = u.memoizedState;
                                if (h !== null) {
                                    var y = h.dehydrated;
                                    y !== null && Kn(y)
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
                        throw Error(k(163))
                    }
                oe || t.flags & 512 && ro(t)
            } catch (m) {
                B(t, t.return, m)
            }
        }
        if (t === e) {
            C = null;
            break
        }
        if (n = t.sibling,
        n !== null) {
            n.return = t.return,
            C = n;
            break
        }
        C = t.return
    }
}
function wa(e) {
    for (; C !== null; ) {
        var t = C;
        if (t === e) {
            C = null;
            break
        }
        var n = t.sibling;
        if (n !== null) {
            n.return = t.return,
            C = n;
            break
        }
        C = t.return
    }
}
function ka(e) {
    for (; C !== null; ) {
        var t = C;
        try {
            switch (t.tag) {
            case 0:
            case 11:
            case 15:
                var n = t.return;
                try {
                    _s(4, t)
                } catch (c) {
                    B(t, n, c)
                }
                break;
            case 1:
                var r = t.stateNode;
                if (typeof r.componentDidMount == "function") {
                    var s = t.return;
                    try {
                        r.componentDidMount()
                    } catch (c) {
                        B(t, s, c)
                    }
                }
                var l = t.return;
                try {
                    ro(t)
                } catch (c) {
                    B(t, l, c)
                }
                break;
            case 5:
                var i = t.return;
                try {
                    ro(t)
                } catch (c) {
                    B(t, i, c)
                }
            }
        } catch (c) {
            B(t, t.return, c)
        }
        if (t === e) {
            C = null;
            break
        }
        var a = t.sibling;
        if (a !== null) {
            a.return = t.return,
            C = a;
            break
        }
        C = t.return
    }
}
var Cf = Math.ceil
  , hs = nt.ReactCurrentDispatcher
  , ei = nt.ReactCurrentOwner
  , Ee = nt.ReactCurrentBatchConfig
  , R = 0
  , ee = null
  , K = null
  , ne = 0
  , xe = 0
  , en = kt(0)
  , X = 0
  , or = null
  , Rt = 0
  , zs = 0
  , ti = 0
  , Wn = null
  , pe = null
  , ni = 0
  , hn = 1 / 0
  , Qe = null
  , ms = !1
  , oo = null
  , mt = null
  , zr = !1
  , ct = null
  , ys = 0
  , Hn = 0
  , io = null
  , qr = -1
  , Qr = 0;
function ce() {
    return R & 6 ? Y() : qr !== -1 ? qr : qr = Y()
}
function yt(e) {
    return e.mode & 1 ? R & 2 && ne !== 0 ? ne & -ne : cf.transition !== null ? (Qr === 0 && (Qr = Cc()),
    Qr) : (e = F,
    e !== 0 || (e = window.event,
    e = e === void 0 ? 16 : Lc(e.type)),
    e) : 1
}
function Oe(e, t, n, r) {
    if (50 < Hn)
        throw Hn = 0,
        io = null,
        Error(k(185));
    cr(e, n, r),
    (!(R & 2) || e !== ee) && (e === ee && (!(R & 2) && (zs |= n),
    X === 4 && it(e, ne)),
    ye(e, r),
    n === 1 && R === 0 && !(t.mode & 1) && (hn = Y() + 500,
    Ps && bt()))
}
function ye(e, t) {
    var n = e.callbackNode;
    ap(e, t);
    var r = Jr(e, e === ee ? ne : 0);
    if (r === 0)
        n !== null && Mi(n),
        e.callbackNode = null,
        e.callbackPriority = 0;
    else if (t = r & -r,
    e.callbackPriority !== t) {
        if (n != null && Mi(n),
        t === 1)
            e.tag === 0 ? af(ba.bind(null, e)) : Zc(ba.bind(null, e)),
            rf(function() {
                !(R & 6) && bt()
            }),
            n = null;
        else {
            switch (Ec(r)) {
            case 1:
                n = Po;
                break;
            case 4:
                n = jc;
                break;
            case 16:
                n = Zr;
                break;
            case 536870912:
                n = Sc;
                break;
            default:
                n = Zr
            }
            n = Gu(n, Hu.bind(null, e))
        }
        e.callbackPriority = t,
        e.callbackNode = n
    }
}
function Hu(e, t) {
    if (qr = -1,
    Qr = 0,
    R & 6)
        throw Error(k(327));
    var n = e.callbackNode;
    if (on() && e.callbackNode !== n)
        return null;
    var r = Jr(e, e === ee ? ne : 0);
    if (r === 0)
        return null;
    if (r & 30 || r & e.expiredLanes || t)
        t = gs(e, r);
    else {
        t = r;
        var s = R;
        R |= 2;
        var l = Bu();
        (ee !== e || ne !== t) && (Qe = null,
        hn = Y() + 500,
        _t(e, t));
        do
            try {
                Tf();
                break
            } catch (a) {
                Vu(e, a)
            }
        while (!0);
        $o(),
        hs.current = l,
        R = s,
        K !== null ? t = 0 : (ee = null,
        ne = 0,
        t = X)
    }
    if (t !== 0) {
        if (t === 2 && (s = Il(e),
        s !== 0 && (r = s,
        t = ao(e, s))),
        t === 1)
            throw n = or,
            _t(e, 0),
            it(e, r),
            ye(e, Y()),
            n;
        if (t === 6)
            it(e, r);
        else {
            if (s = e.current.alternate,
            !(r & 30) && !Ef(s) && (t = gs(e, r),
            t === 2 && (l = Il(e),
            l !== 0 && (r = l,
            t = ao(e, l))),
            t === 1))
                throw n = or,
                _t(e, 0),
                it(e, r),
                ye(e, Y()),
                n;
            switch (e.finishedWork = s,
            e.finishedLanes = r,
            t) {
            case 0:
            case 1:
                throw Error(k(345));
            case 2:
                Ct(e, pe, Qe);
                break;
            case 3:
                if (it(e, r),
                (r & 130023424) === r && (t = ni + 500 - Y(),
                10 < t)) {
                    if (Jr(e, 0) !== 0)
                        break;
                    if (s = e.suspendedLanes,
                    (s & r) !== r) {
                        ce(),
                        e.pingedLanes |= e.suspendedLanes & s;
                        break
                    }
                    e.timeoutHandle = Wl(Ct.bind(null, e, pe, Qe), t);
                    break
                }
                Ct(e, pe, Qe);
                break;
            case 4:
                if (it(e, r),
                (r & 4194240) === r)
                    break;
                for (t = e.eventTimes,
                s = -1; 0 < r; ) {
                    var i = 31 - Fe(r);
                    l = 1 << i,
                    i = t[i],
                    i > s && (s = i),
                    r &= ~l
                }
                if (r = s,
                r = Y() - r,
                r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * Cf(r / 1960)) - r,
                10 < r) {
                    e.timeoutHandle = Wl(Ct.bind(null, e, pe, Qe), r);
                    break
                }
                Ct(e, pe, Qe);
                break;
            case 5:
                Ct(e, pe, Qe);
                break;
            default:
                throw Error(k(329))
            }
        }
    }
    return ye(e, Y()),
    e.callbackNode === n ? Hu.bind(null, e) : null
}
function ao(e, t) {
    var n = Wn;
    return e.current.memoizedState.isDehydrated && (_t(e, t).flags |= 256),
    e = gs(e, t),
    e !== 2 && (t = pe,
    pe = n,
    t !== null && co(t)),
    e
}
function co(e) {
    pe === null ? pe = e : pe.push.apply(pe, e)
}
function Ef(e) {
    for (var t = e; ; ) {
        if (t.flags & 16384) {
            var n = t.updateQueue;
            if (n !== null && (n = n.stores,
            n !== null))
                for (var r = 0; r < n.length; r++) {
                    var s = n[r]
                      , l = s.getSnapshot;
                    s = s.value;
                    try {
                        if (!De(l(), s))
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
    for (t &= ~ti,
    t &= ~zs,
    e.suspendedLanes |= t,
    e.pingedLanes &= ~t,
    e = e.expirationTimes; 0 < t; ) {
        var n = 31 - Fe(t)
          , r = 1 << n;
        e[n] = -1,
        t &= ~r
    }
}
function ba(e) {
    if (R & 6)
        throw Error(k(327));
    on();
    var t = Jr(e, 0);
    if (!(t & 1))
        return ye(e, Y()),
        null;
    var n = gs(e, t);
    if (e.tag !== 0 && n === 2) {
        var r = Il(e);
        r !== 0 && (t = r,
        n = ao(e, r))
    }
    if (n === 1)
        throw n = or,
        _t(e, 0),
        it(e, t),
        ye(e, Y()),
        n;
    if (n === 6)
        throw Error(k(345));
    return e.finishedWork = e.current.alternate,
    e.finishedLanes = t,
    Ct(e, pe, Qe),
    ye(e, Y()),
    null
}
function ri(e, t) {
    var n = R;
    R |= 1;
    try {
        return e(t)
    } finally {
        R = n,
        R === 0 && (hn = Y() + 500,
        Ps && bt())
    }
}
function Ft(e) {
    ct !== null && ct.tag === 0 && !(R & 6) && on();
    var t = R;
    R |= 1;
    var n = Ee.transition
      , r = F;
    try {
        if (Ee.transition = null,
        F = 1,
        e)
            return e()
    } finally {
        F = r,
        Ee.transition = n,
        R = t,
        !(R & 6) && bt()
    }
}
function si() {
    xe = en.current,
    U(en)
}
function _t(e, t) {
    e.finishedWork = null,
    e.finishedLanes = 0;
    var n = e.timeoutHandle;
    if (n !== -1 && (e.timeoutHandle = -1,
    nf(n)),
    K !== null)
        for (n = K.return; n !== null; ) {
            var r = n;
            switch (Oo(r),
            r.tag) {
            case 1:
                r = r.type.childContextTypes,
                r != null && ss();
                break;
            case 3:
                pn(),
                U(he),
                U(ie),
                Qo();
                break;
            case 5:
                qo(r);
                break;
            case 4:
                pn();
                break;
            case 13:
                U(W);
                break;
            case 19:
                U(W);
                break;
            case 10:
                Wo(r.type._context);
                break;
            case 22:
            case 23:
                si()
            }
            n = n.return
        }
    if (ee = e,
    K = e = gt(e.current, null),
    ne = xe = t,
    X = 0,
    or = null,
    ti = zs = Rt = 0,
    pe = Wn = null,
    Tt !== null) {
        for (t = 0; t < Tt.length; t++)
            if (n = Tt[t],
            r = n.interleaved,
            r !== null) {
                n.interleaved = null;
                var s = r.next
                  , l = n.pending;
                if (l !== null) {
                    var i = l.next;
                    l.next = s,
                    r.next = i
                }
                n.pending = r
            }
        Tt = null
    }
    return e
}
function Vu(e, t) {
    do {
        var n = K;
        try {
            if ($o(),
            Hr.current = fs,
            ps) {
                for (var r = H.memoizedState; r !== null; ) {
                    var s = r.queue;
                    s !== null && (s.pending = null),
                    r = r.next
                }
                ps = !1
            }
            if (At = 0,
            J = G = H = null,
            Un = !1,
            rr = 0,
            ei.current = null,
            n === null || n.return === null) {
                X = 1,
                or = t,
                K = null;
                break
            }
            e: {
                var l = e
                  , i = n.return
                  , a = n
                  , c = t;
                if (t = ne,
                a.flags |= 32768,
                c !== null && typeof c == "object" && typeof c.then == "function") {
                    var u = c
                      , h = a
                      , y = h.tag;
                    if (!(h.mode & 1) && (y === 0 || y === 11 || y === 15)) {
                        var m = h.alternate;
                        m ? (h.updateQueue = m.updateQueue,
                        h.memoizedState = m.memoizedState,
                        h.lanes = m.lanes) : (h.updateQueue = null,
                        h.memoizedState = null)
                    }
                    var w = ca(i);
                    if (w !== null) {
                        w.flags &= -257,
                        ua(w, i, a, l, t),
                        w.mode & 1 && aa(l, u, t),
                        t = w,
                        c = u;
                        var g = t.updateQueue;
                        if (g === null) {
                            var x = new Set;
                            x.add(c),
                            t.updateQueue = x
                        } else
                            g.add(c);
                        break e
                    } else {
                        if (!(t & 1)) {
                            aa(l, u, t),
                            li();
                            break e
                        }
                        c = Error(k(426))
                    }
                } else if ($ && a.mode & 1) {
                    var j = ca(i);
                    if (j !== null) {
                        !(j.flags & 65536) && (j.flags |= 256),
                        ua(j, i, a, l, t),
                        Do(fn(c, a));
                        break e
                    }
                }
                l = c = fn(c, a),
                X !== 4 && (X = 2),
                Wn === null ? Wn = [l] : Wn.push(l),
                l = i;
                do {
                    switch (l.tag) {
                    case 3:
                        l.flags |= 65536,
                        t &= -t,
                        l.lanes |= t;
                        var d = Eu(l, c, t);
                        na(l, d);
                        break e;
                    case 1:
                        a = c;
                        var p = l.type
                          , f = l.stateNode;
                        if (!(l.flags & 128) && (typeof p.getDerivedStateFromError == "function" || f !== null && typeof f.componentDidCatch == "function" && (mt === null || !mt.has(f)))) {
                            l.flags |= 65536,
                            t &= -t,
                            l.lanes |= t;
                            var v = Pu(l, a, t);
                            na(l, v);
                            break e
                        }
                    }
                    l = l.return
                } while (l !== null)
            }
            Qu(n)
        } catch (N) {
            t = N,
            K === n && n !== null && (K = n = n.return);
            continue
        }
        break
    } while (!0)
}
function Bu() {
    var e = hs.current;
    return hs.current = fs,
    e === null ? fs : e
}
function li() {
    (X === 0 || X === 3 || X === 2) && (X = 4),
    ee === null || !(Rt & 268435455) && !(zs & 268435455) || it(ee, ne)
}
function gs(e, t) {
    var n = R;
    R |= 2;
    var r = Bu();
    (ee !== e || ne !== t) && (Qe = null,
    _t(e, t));
    do
        try {
            Pf();
            break
        } catch (s) {
            Vu(e, s)
        }
    while (!0);
    if ($o(),
    R = n,
    hs.current = r,
    K !== null)
        throw Error(k(261));
    return ee = null,
    ne = 0,
    X
}
function Pf() {
    for (; K !== null; )
        qu(K)
}
function Tf() {
    for (; K !== null && !Jd(); )
        qu(K)
}
function qu(e) {
    var t = Ku(e.alternate, e, xe);
    e.memoizedProps = e.pendingProps,
    t === null ? Qu(e) : K = t,
    ei.current = null
}
function Qu(e) {
    var t = e;
    do {
        var n = t.alternate;
        if (e = t.return,
        t.flags & 32768) {
            if (n = bf(n, t),
            n !== null) {
                n.flags &= 32767,
                K = n;
                return
            }
            if (e !== null)
                e.flags |= 32768,
                e.subtreeFlags = 0,
                e.deletions = null;
            else {
                X = 6,
                K = null;
                return
            }
        } else if (n = kf(n, t, xe),
        n !== null) {
            K = n;
            return
        }
        if (t = t.sibling,
        t !== null) {
            K = t;
            return
        }
        K = t = e
    } while (t !== null);
    X === 0 && (X = 5)
}
function Ct(e, t, n) {
    var r = F
      , s = Ee.transition;
    try {
        Ee.transition = null,
        F = 1,
        Mf(e, t, n, r)
    } finally {
        Ee.transition = s,
        F = r
    }
    return null
}
function Mf(e, t, n, r) {
    do
        on();
    while (ct !== null);
    if (R & 6)
        throw Error(k(327));
    n = e.finishedWork;
    var s = e.finishedLanes;
    if (n === null)
        return null;
    if (e.finishedWork = null,
    e.finishedLanes = 0,
    n === e.current)
        throw Error(k(177));
    e.callbackNode = null,
    e.callbackPriority = 0;
    var l = n.lanes | n.childLanes;
    if (cp(e, l),
    e === ee && (K = ee = null,
    ne = 0),
    !(n.subtreeFlags & 2064) && !(n.flags & 2064) || zr || (zr = !0,
    Gu(Zr, function() {
        return on(),
        null
    })),
    l = (n.flags & 15990) !== 0,
    n.subtreeFlags & 15990 || l) {
        l = Ee.transition,
        Ee.transition = null;
        var i = F;
        F = 1;
        var a = R;
        R |= 4,
        ei.current = null,
        jf(e, n),
        $u(n, e),
        Kp(Ul),
        es = !!Dl,
        Ul = Dl = null,
        e.current = n,
        Sf(n),
        ep(),
        R = a,
        F = i,
        Ee.transition = l
    } else
        e.current = n;
    if (zr && (zr = !1,
    ct = e,
    ys = s),
    l = e.pendingLanes,
    l === 0 && (mt = null),
    rp(n.stateNode),
    ye(e, Y()),
    t !== null)
        for (r = e.onRecoverableError,
        n = 0; n < t.length; n++)
            s = t[n],
            r(s.value, {
                componentStack: s.stack,
                digest: s.digest
            });
    if (ms)
        throw ms = !1,
        e = oo,
        oo = null,
        e;
    return ys & 1 && e.tag !== 0 && on(),
    l = e.pendingLanes,
    l & 1 ? e === io ? Hn++ : (Hn = 0,
    io = e) : Hn = 0,
    bt(),
    null
}
function on() {
    if (ct !== null) {
        var e = Ec(ys)
          , t = Ee.transition
          , n = F;
        try {
            if (Ee.transition = null,
            F = 16 > e ? 16 : e,
            ct === null)
                var r = !1;
            else {
                if (e = ct,
                ct = null,
                ys = 0,
                R & 6)
                    throw Error(k(331));
                var s = R;
                for (R |= 4,
                C = e.current; C !== null; ) {
                    var l = C
                      , i = l.child;
                    if (C.flags & 16) {
                        var a = l.deletions;
                        if (a !== null) {
                            for (var c = 0; c < a.length; c++) {
                                var u = a[c];
                                for (C = u; C !== null; ) {
                                    var h = C;
                                    switch (h.tag) {
                                    case 0:
                                    case 11:
                                    case 15:
                                        $n(8, h, l)
                                    }
                                    var y = h.child;
                                    if (y !== null)
                                        y.return = h,
                                        C = y;
                                    else
                                        for (; C !== null; ) {
                                            h = C;
                                            var m = h.sibling
                                              , w = h.return;
                                            if (Ou(h),
                                            h === u) {
                                                C = null;
                                                break
                                            }
                                            if (m !== null) {
                                                m.return = w,
                                                C = m;
                                                break
                                            }
                                            C = w
                                        }
                                }
                            }
                            var g = l.alternate;
                            if (g !== null) {
                                var x = g.child;
                                if (x !== null) {
                                    g.child = null;
                                    do {
                                        var j = x.sibling;
                                        x.sibling = null,
                                        x = j
                                    } while (x !== null)
                                }
                            }
                            C = l
                        }
                    }
                    if (l.subtreeFlags & 2064 && i !== null)
                        i.return = l,
                        C = i;
                    else
                        e: for (; C !== null; ) {
                            if (l = C,
                            l.flags & 2048)
                                switch (l.tag) {
                                case 0:
                                case 11:
                                case 15:
                                    $n(9, l, l.return)
                                }
                            var d = l.sibling;
                            if (d !== null) {
                                d.return = l.return,
                                C = d;
                                break e
                            }
                            C = l.return
                        }
                }
                var p = e.current;
                for (C = p; C !== null; ) {
                    i = C;
                    var f = i.child;
                    if (i.subtreeFlags & 2064 && f !== null)
                        f.return = i,
                        C = f;
                    else
                        e: for (i = p; C !== null; ) {
                            if (a = C,
                            a.flags & 2048)
                                try {
                                    switch (a.tag) {
                                    case 0:
                                    case 11:
                                    case 15:
                                        _s(9, a)
                                    }
                                } catch (N) {
                                    B(a, a.return, N)
                                }
                            if (a === i) {
                                C = null;
                                break e
                            }
                            var v = a.sibling;
                            if (v !== null) {
                                v.return = a.return,
                                C = v;
                                break e
                            }
                            C = a.return
                        }
                }
                if (R = s,
                bt(),
                Be && typeof Be.onPostCommitFiberRoot == "function")
                    try {
                        Be.onPostCommitFiberRoot(Ns, e)
                    } catch {}
                r = !0
            }
            return r
        } finally {
            F = n,
            Ee.transition = t
        }
    }
    return !1
}
function Na(e, t, n) {
    t = fn(n, t),
    t = Eu(e, t, 1),
    e = ht(e, t, 1),
    t = ce(),
    e !== null && (cr(e, 1, t),
    ye(e, t))
}
function B(e, t, n) {
    if (e.tag === 3)
        Na(e, e, n);
    else
        for (; t !== null; ) {
            if (t.tag === 3) {
                Na(t, e, n);
                break
            } else if (t.tag === 1) {
                var r = t.stateNode;
                if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (mt === null || !mt.has(r))) {
                    e = fn(n, e),
                    e = Pu(t, e, 1),
                    t = ht(t, e, 1),
                    e = ce(),
                    t !== null && (cr(t, 1, e),
                    ye(t, e));
                    break
                }
            }
            t = t.return
        }
}
function _f(e, t, n) {
    var r = e.pingCache;
    r !== null && r.delete(t),
    t = ce(),
    e.pingedLanes |= e.suspendedLanes & n,
    ee === e && (ne & n) === n && (X === 4 || X === 3 && (ne & 130023424) === ne && 500 > Y() - ni ? _t(e, 0) : ti |= n),
    ye(e, t)
}
function Yu(e, t) {
    t === 0 && (e.mode & 1 ? (t = br,
    br <<= 1,
    !(br & 130023424) && (br = 4194304)) : t = 1);
    var n = ce();
    e = et(e, t),
    e !== null && (cr(e, t, n),
    ye(e, n))
}
function zf(e) {
    var t = e.memoizedState
      , n = 0;
    t !== null && (n = t.retryLane),
    Yu(e, n)
}
function Lf(e, t) {
    var n = 0;
    switch (e.tag) {
    case 13:
        var r = e.stateNode
          , s = e.memoizedState;
        s !== null && (n = s.retryLane);
        break;
    case 19:
        r = e.stateNode;
        break;
    default:
        throw Error(k(314))
    }
    r !== null && r.delete(t),
    Yu(e, n)
}
var Ku;
Ku = function(e, t, n) {
    if (e !== null)
        if (e.memoizedProps !== t.pendingProps || he.current)
            fe = !0;
        else {
            if (!(e.lanes & n) && !(t.flags & 128))
                return fe = !1,
                wf(e, t, n);
            fe = !!(e.flags & 131072)
        }
    else
        fe = !1,
        $ && t.flags & 1048576 && Jc(t, is, t.index);
    switch (t.lanes = 0,
    t.tag) {
    case 2:
        var r = t.type;
        Br(e, t),
        e = t.pendingProps;
        var s = cn(t, ie.current);
        ln(t, n),
        s = Ko(null, t, r, e, s, n);
        var l = Go();
        return t.flags |= 1,
        typeof s == "object" && s !== null && typeof s.render == "function" && s.$$typeof === void 0 ? (t.tag = 1,
        t.memoizedState = null,
        t.updateQueue = null,
        me(r) ? (l = !0,
        ls(t)) : l = !1,
        t.memoizedState = s.state !== null && s.state !== void 0 ? s.state : null,
        Vo(t),
        s.updater = Ms,
        t.stateNode = s,
        s._reactInternals = t,
        Kl(t, r, e, n),
        t = Zl(null, t, r, !0, l, n)) : (t.tag = 0,
        $ && l && Fo(t),
        ae(null, t, s, n),
        t = t.child),
        t;
    case 16:
        r = t.elementType;
        e: {
            switch (Br(e, t),
            e = t.pendingProps,
            s = r._init,
            r = s(r._payload),
            t.type = r,
            s = t.tag = Af(r),
            e = Ie(r, e),
            s) {
            case 0:
                t = Xl(null, t, r, e, n);
                break e;
            case 1:
                t = fa(null, t, r, e, n);
                break e;
            case 11:
                t = da(null, t, r, e, n);
                break e;
            case 14:
                t = pa(null, t, r, Ie(r.type, e), n);
                break e
            }
            throw Error(k(306, r, ""))
        }
        return t;
    case 0:
        return r = t.type,
        s = t.pendingProps,
        s = t.elementType === r ? s : Ie(r, s),
        Xl(e, t, r, s, n);
    case 1:
        return r = t.type,
        s = t.pendingProps,
        s = t.elementType === r ? s : Ie(r, s),
        fa(e, t, r, s, n);
    case 3:
        e: {
            if (zu(t),
            e === null)
                throw Error(k(387));
            r = t.pendingProps,
            l = t.memoizedState,
            s = l.element,
            lu(e, t),
            us(t, r, null, n);
            var i = t.memoizedState;
            if (r = i.element,
            l.isDehydrated)
                if (l = {
                    element: r,
                    isDehydrated: !1,
                    cache: i.cache,
                    pendingSuspenseBoundaries: i.pendingSuspenseBoundaries,
                    transitions: i.transitions
                },
                t.updateQueue.baseState = l,
                t.memoizedState = l,
                t.flags & 256) {
                    s = fn(Error(k(423)), t),
                    t = ha(e, t, r, n, s);
                    break e
                } else if (r !== s) {
                    s = fn(Error(k(424)), t),
                    t = ha(e, t, r, n, s);
                    break e
                } else
                    for (ve = ft(t.stateNode.containerInfo.firstChild),
                    we = t,
                    $ = !0,
                    Re = null,
                    n = ru(t, null, r, n),
                    t.child = n; n; )
                        n.flags = n.flags & -3 | 4096,
                        n = n.sibling;
            else {
                if (un(),
                r === s) {
                    t = tt(e, t, n);
                    break e
                }
                ae(e, t, r, n)
            }
            t = t.child
        }
        return t;
    case 5:
        return ou(t),
        e === null && ql(t),
        r = t.type,
        s = t.pendingProps,
        l = e !== null ? e.memoizedProps : null,
        i = s.children,
        $l(r, s) ? i = null : l !== null && $l(r, l) && (t.flags |= 32),
        _u(e, t),
        ae(e, t, i, n),
        t.child;
    case 6:
        return e === null && ql(t),
        null;
    case 13:
        return Lu(e, t, n);
    case 4:
        return Bo(t, t.stateNode.containerInfo),
        r = t.pendingProps,
        e === null ? t.child = dn(t, null, r, n) : ae(e, t, r, n),
        t.child;
    case 11:
        return r = t.type,
        s = t.pendingProps,
        s = t.elementType === r ? s : Ie(r, s),
        da(e, t, r, s, n);
    case 7:
        return ae(e, t, t.pendingProps, n),
        t.child;
    case 8:
        return ae(e, t, t.pendingProps.children, n),
        t.child;
    case 12:
        return ae(e, t, t.pendingProps.children, n),
        t.child;
    case 10:
        e: {
            if (r = t.type._context,
            s = t.pendingProps,
            l = t.memoizedProps,
            i = s.value,
            O(as, r._currentValue),
            r._currentValue = i,
            l !== null)
                if (De(l.value, i)) {
                    if (l.children === s.children && !he.current) {
                        t = tt(e, t, n);
                        break e
                    }
                } else
                    for (l = t.child,
                    l !== null && (l.return = t); l !== null; ) {
                        var a = l.dependencies;
                        if (a !== null) {
                            i = l.child;
                            for (var c = a.firstContext; c !== null; ) {
                                if (c.context === r) {
                                    if (l.tag === 1) {
                                        c = Xe(-1, n & -n),
                                        c.tag = 2;
                                        var u = l.updateQueue;
                                        if (u !== null) {
                                            u = u.shared;
                                            var h = u.pending;
                                            h === null ? c.next = c : (c.next = h.next,
                                            h.next = c),
                                            u.pending = c
                                        }
                                    }
                                    l.lanes |= n,
                                    c = l.alternate,
                                    c !== null && (c.lanes |= n),
                                    Ql(l.return, n, t),
                                    a.lanes |= n;
                                    break
                                }
                                c = c.next
                            }
                        } else if (l.tag === 10)
                            i = l.type === t.type ? null : l.child;
                        else if (l.tag === 18) {
                            if (i = l.return,
                            i === null)
                                throw Error(k(341));
                            i.lanes |= n,
                            a = i.alternate,
                            a !== null && (a.lanes |= n),
                            Ql(i, n, t),
                            i = l.sibling
                        } else
                            i = l.child;
                        if (i !== null)
                            i.return = l;
                        else
                            for (i = l; i !== null; ) {
                                if (i === t) {
                                    i = null;
                                    break
                                }
                                if (l = i.sibling,
                                l !== null) {
                                    l.return = i.return,
                                    i = l;
                                    break
                                }
                                i = i.return
                            }
                        l = i
                    }
            ae(e, t, s.children, n),
            t = t.child
        }
        return t;
    case 9:
        return s = t.type,
        r = t.pendingProps.children,
        ln(t, n),
        s = Pe(s),
        r = r(s),
        t.flags |= 1,
        ae(e, t, r, n),
        t.child;
    case 14:
        return r = t.type,
        s = Ie(r, t.pendingProps),
        s = Ie(r.type, s),
        pa(e, t, r, s, n);
    case 15:
        return Tu(e, t, t.type, t.pendingProps, n);
    case 17:
        return r = t.type,
        s = t.pendingProps,
        s = t.elementType === r ? s : Ie(r, s),
        Br(e, t),
        t.tag = 1,
        me(r) ? (e = !0,
        ls(t)) : e = !1,
        ln(t, n),
        Cu(t, r, s),
        Kl(t, r, s, n),
        Zl(null, t, r, !0, e, n);
    case 19:
        return Iu(e, t, n);
    case 22:
        return Mu(e, t, n)
    }
    throw Error(k(156, t.tag))
}
;
function Gu(e, t) {
    return Nc(e, t)
}
function If(e, t, n, r) {
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
    return new If(e,t,n,r)
}
function oi(e) {
    return e = e.prototype,
    !(!e || !e.isReactComponent)
}
function Af(e) {
    if (typeof e == "function")
        return oi(e) ? 1 : 0;
    if (e != null) {
        if (e = e.$$typeof,
        e === So)
            return 11;
        if (e === Co)
            return 14
    }
    return 2
}
function gt(e, t) {
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
function Yr(e, t, n, r, s, l) {
    var i = 2;
    if (r = e,
    typeof e == "function")
        oi(e) && (i = 1);
    else if (typeof e == "string")
        i = 5;
    else
        e: switch (e) {
        case Vt:
            return zt(n.children, s, l, t);
        case jo:
            i = 8,
            s |= 8;
            break;
        case vl:
            return e = Ce(12, n, t, s | 2),
            e.elementType = vl,
            e.lanes = l,
            e;
        case wl:
            return e = Ce(13, n, t, s),
            e.elementType = wl,
            e.lanes = l,
            e;
        case kl:
            return e = Ce(19, n, t, s),
            e.elementType = kl,
            e.lanes = l,
            e;
        case oc:
            return Ls(n, s, l, t);
        default:
            if (typeof e == "object" && e !== null)
                switch (e.$$typeof) {
                case sc:
                    i = 10;
                    break e;
                case lc:
                    i = 9;
                    break e;
                case So:
                    i = 11;
                    break e;
                case Co:
                    i = 14;
                    break e;
                case st:
                    i = 16,
                    r = null;
                    break e
                }
            throw Error(k(130, e == null ? e : typeof e, ""))
        }
    return t = Ce(i, n, t, s),
    t.elementType = e,
    t.type = r,
    t.lanes = l,
    t
}
function zt(e, t, n, r) {
    return e = Ce(7, e, r, t),
    e.lanes = n,
    e
}
function Ls(e, t, n, r) {
    return e = Ce(22, e, r, t),
    e.elementType = oc,
    e.lanes = n,
    e.stateNode = {
        isHidden: !1
    },
    e
}
function fl(e, t, n) {
    return e = Ce(6, e, null, t),
    e.lanes = n,
    e
}
function hl(e, t, n) {
    return t = Ce(4, e.children !== null ? e.children : [], e.key, t),
    t.lanes = n,
    t.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        implementation: e.implementation
    },
    t
}
function Rf(e, t, n, r, s) {
    this.tag = t,
    this.containerInfo = e,
    this.finishedWork = this.pingCache = this.current = this.pendingChildren = null,
    this.timeoutHandle = -1,
    this.callbackNode = this.pendingContext = this.context = null,
    this.callbackPriority = 0,
    this.eventTimes = Ys(0),
    this.expirationTimes = Ys(-1),
    this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0,
    this.entanglements = Ys(0),
    this.identifierPrefix = r,
    this.onRecoverableError = s,
    this.mutableSourceEagerHydrationData = null
}
function ii(e, t, n, r, s, l, i, a, c) {
    return e = new Rf(e,t,n,a,c),
    t === 1 ? (t = 1,
    l === !0 && (t |= 8)) : t = 0,
    l = Ce(3, null, null, t),
    e.current = l,
    l.stateNode = e,
    l.memoizedState = {
        element: r,
        isDehydrated: n,
        cache: null,
        transitions: null,
        pendingSuspenseBoundaries: null
    },
    Vo(l),
    e
}
function Ff(e, t, n) {
    var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
        $$typeof: Ht,
        key: r == null ? null : "" + r,
        children: e,
        containerInfo: t,
        implementation: n
    }
}
function Xu(e) {
    if (!e)
        return vt;
    e = e._reactInternals;
    e: {
        if (Ut(e) !== e || e.tag !== 1)
            throw Error(k(170));
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
        throw Error(k(171))
    }
    if (e.tag === 1) {
        var n = e.type;
        if (me(n))
            return Xc(e, n, t)
    }
    return t
}
function Zu(e, t, n, r, s, l, i, a, c) {
    return e = ii(n, r, !0, e, s, l, i, a, c),
    e.context = Xu(null),
    n = e.current,
    r = ce(),
    s = yt(n),
    l = Xe(r, s),
    l.callback = t ?? null,
    ht(n, l, s),
    e.current.lanes = s,
    cr(e, s, r),
    ye(e, r),
    e
}
function Is(e, t, n, r) {
    var s = t.current
      , l = ce()
      , i = yt(s);
    return n = Xu(n),
    t.context === null ? t.context = n : t.pendingContext = n,
    t = Xe(l, i),
    t.payload = {
        element: e
    },
    r = r === void 0 ? null : r,
    r !== null && (t.callback = r),
    e = ht(s, t, i),
    e !== null && (Oe(e, s, i, l),
    Wr(e, s, i)),
    i
}
function xs(e) {
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
function ja(e, t) {
    if (e = e.memoizedState,
    e !== null && e.dehydrated !== null) {
        var n = e.retryLane;
        e.retryLane = n !== 0 && n < t ? n : t
    }
}
function ai(e, t) {
    ja(e, t),
    (e = e.alternate) && ja(e, t)
}
function Of() {
    return null
}
var Ju = typeof reportError == "function" ? reportError : function(e) {
    console.error(e)
}
;
function ci(e) {
    this._internalRoot = e
}
As.prototype.render = ci.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null)
        throw Error(k(409));
    Is(e, t, null, null)
}
;
As.prototype.unmount = ci.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
        this._internalRoot = null;
        var t = e.containerInfo;
        Ft(function() {
            Is(null, e, null, null)
        }),
        t[Je] = null
    }
}
;
function As(e) {
    this._internalRoot = e
}
As.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
        var t = Mc();
        e = {
            blockedOn: null,
            target: e,
            priority: t
        };
        for (var n = 0; n < ot.length && t !== 0 && t < ot[n].priority; n++)
            ;
        ot.splice(n, 0, e),
        n === 0 && zc(e)
    }
}
;
function ui(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11)
}
function Rs(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "))
}
function Sa() {}
function Df(e, t, n, r, s) {
    if (s) {
        if (typeof r == "function") {
            var l = r;
            r = function() {
                var u = xs(i);
                l.call(u)
            }
        }
        var i = Zu(t, r, e, 0, null, !1, !1, "", Sa);
        return e._reactRootContainer = i,
        e[Je] = i.current,
        Zn(e.nodeType === 8 ? e.parentNode : e),
        Ft(),
        i
    }
    for (; s = e.lastChild; )
        e.removeChild(s);
    if (typeof r == "function") {
        var a = r;
        r = function() {
            var u = xs(c);
            a.call(u)
        }
    }
    var c = ii(e, 0, !1, null, null, !1, !1, "", Sa);
    return e._reactRootContainer = c,
    e[Je] = c.current,
    Zn(e.nodeType === 8 ? e.parentNode : e),
    Ft(function() {
        Is(t, c, n, r)
    }),
    c
}
function Fs(e, t, n, r, s) {
    var l = n._reactRootContainer;
    if (l) {
        var i = l;
        if (typeof s == "function") {
            var a = s;
            s = function() {
                var c = xs(i);
                a.call(c)
            }
        }
        Is(t, i, e, s)
    } else
        i = Df(n, t, e, s, r);
    return xs(i)
}
Pc = function(e) {
    switch (e.tag) {
    case 3:
        var t = e.stateNode;
        if (t.current.memoizedState.isDehydrated) {
            var n = Ln(t.pendingLanes);
            n !== 0 && (To(t, n | 1),
            ye(t, Y()),
            !(R & 6) && (hn = Y() + 500,
            bt()))
        }
        break;
    case 13:
        Ft(function() {
            var r = et(e, 1);
            if (r !== null) {
                var s = ce();
                Oe(r, e, 1, s)
            }
        }),
        ai(e, 1)
    }
}
;
Mo = function(e) {
    if (e.tag === 13) {
        var t = et(e, 134217728);
        if (t !== null) {
            var n = ce();
            Oe(t, e, 134217728, n)
        }
        ai(e, 134217728)
    }
}
;
Tc = function(e) {
    if (e.tag === 13) {
        var t = yt(e)
          , n = et(e, t);
        if (n !== null) {
            var r = ce();
            Oe(n, e, t, r)
        }
        ai(e, t)
    }
}
;
Mc = function() {
    return F
}
;
_c = function(e, t) {
    var n = F;
    try {
        return F = e,
        t()
    } finally {
        F = n
    }
}
;
_l = function(e, t, n) {
    switch (t) {
    case "input":
        if (jl(e, n),
        t = n.name,
        n.type === "radio" && t != null) {
            for (n = e; n.parentNode; )
                n = n.parentNode;
            for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'),
            t = 0; t < n.length; t++) {
                var r = n[t];
                if (r !== e && r.form === e.form) {
                    var s = Es(r);
                    if (!s)
                        throw Error(k(90));
                    ac(r),
                    jl(r, s)
                }
            }
        }
        break;
    case "textarea":
        uc(e, n);
        break;
    case "select":
        t = n.value,
        t != null && tn(e, !!n.multiple, t, !1)
    }
}
;
gc = ri;
xc = Ft;
var Uf = {
    usingClientEntryPoint: !1,
    Events: [dr, Yt, Es, mc, yc, ri]
}
  , Tn = {
    findFiberByHostInstance: Pt,
    bundleType: 0,
    version: "18.3.1",
    rendererPackageName: "react-dom"
}
  , $f = {
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
    currentDispatcherRef: nt.ReactCurrentDispatcher,
    findHostInstanceByFiber: function(e) {
        return e = kc(e),
        e === null ? null : e.stateNode
    },
    findFiberByHostInstance: Tn.findFiberByHostInstance || Of,
    findHostInstancesForRefresh: null,
    scheduleRefresh: null,
    scheduleRoot: null,
    setRefreshHandler: null,
    getCurrentFiber: null,
    reconcilerVersion: "18.3.1-next-f1338f8080-20240426"
};
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Lr = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Lr.isDisabled && Lr.supportsFiber)
        try {
            Ns = Lr.inject($f),
            Be = Lr
        } catch {}
}
be.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Uf;
be.createPortal = function(e, t) {
    var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!ui(t))
        throw Error(k(200));
    return Ff(e, t, null, n)
}
;
be.createRoot = function(e, t) {
    if (!ui(e))
        throw Error(k(299));
    var n = !1
      , r = ""
      , s = Ju;
    return t != null && (t.unstable_strictMode === !0 && (n = !0),
    t.identifierPrefix !== void 0 && (r = t.identifierPrefix),
    t.onRecoverableError !== void 0 && (s = t.onRecoverableError)),
    t = ii(e, 1, !1, null, null, n, !1, r, s),
    e[Je] = t.current,
    Zn(e.nodeType === 8 ? e.parentNode : e),
    new ci(t)
}
;
be.findDOMNode = function(e) {
    if (e == null)
        return null;
    if (e.nodeType === 1)
        return e;
    var t = e._reactInternals;
    if (t === void 0)
        throw typeof e.render == "function" ? Error(k(188)) : (e = Object.keys(e).join(","),
        Error(k(268, e)));
    return e = kc(t),
    e = e === null ? null : e.stateNode,
    e
}
;
be.flushSync = function(e) {
    return Ft(e)
}
;
be.hydrate = function(e, t, n) {
    if (!Rs(t))
        throw Error(k(200));
    return Fs(null, e, t, !0, n)
}
;
be.hydrateRoot = function(e, t, n) {
    if (!ui(e))
        throw Error(k(405));
    var r = n != null && n.hydratedSources || null
      , s = !1
      , l = ""
      , i = Ju;
    if (n != null && (n.unstable_strictMode === !0 && (s = !0),
    n.identifierPrefix !== void 0 && (l = n.identifierPrefix),
    n.onRecoverableError !== void 0 && (i = n.onRecoverableError)),
    t = Zu(t, null, e, 1, n ?? null, s, !1, l, i),
    e[Je] = t.current,
    Zn(e),
    r)
        for (e = 0; e < r.length; e++)
            n = r[e],
            s = n._getVersion,
            s = s(n._source),
            t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, s] : t.mutableSourceEagerHydrationData.push(n, s);
    return new As(t)
}
;
be.render = function(e, t, n) {
    if (!Rs(t))
        throw Error(k(200));
    return Fs(null, e, t, !1, n)
}
;
be.unmountComponentAtNode = function(e) {
    if (!Rs(e))
        throw Error(k(40));
    return e._reactRootContainer ? (Ft(function() {
        Fs(null, null, e, !1, function() {
            e._reactRootContainer = null,
            e[Je] = null
        })
    }),
    !0) : !1
}
;
be.unstable_batchedUpdates = ri;
be.unstable_renderSubtreeIntoContainer = function(e, t, n, r) {
    if (!Rs(n))
        throw Error(k(200));
    if (e == null || e._reactInternals === void 0)
        throw Error(k(38));
    return Fs(e, t, n, !1, r)
}
;
be.version = "18.3.1-next-f1338f8080-20240426";
function ed() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
        try {
            __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(ed)
        } catch (e) {
            console.error(e)
        }
}
ed(),
ec.exports = be;
var Wf = ec.exports, td, Ca = Wf;
td = Ca.createRoot,
Ca.hydrateRoot;
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var Hf = {
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
const Vf = e => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase().trim()
  , T = (e, t) => {
    const n = b.forwardRef( ({color: r="currentColor", size: s=24, strokeWidth: l=2, absoluteStrokeWidth: i, className: a="", children: c, ...u}, h) => b.createElement("svg", {
        ref: h,
        ...Hf,
        width: s,
        height: s,
        stroke: r,
        strokeWidth: i ? Number(l) * 24 / Number(s) : l,
        className: ["lucide", `lucide-${Vf(e)}`, a].join(" "),
        ...u
    }, [...t.map( ([y,m]) => b.createElement(y, m)), ...Array.isArray(c) ? c : [c]]));
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
const uo = T("Activity", [["path", {
    d: "M22 12h-4l-3 9L9 3l-3 9H2",
    key: "d5dnw9"
}]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Bf = T("AlertTriangle", [["path", {
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
const qf = T("ArrowRight", [["path", {
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
const Qf = T("ArrowUp", [["path", {
    d: "m5 12 7-7 7 7",
    key: "hav0vg"
}], ["path", {
    d: "M12 19V5",
    key: "x0mq9r"
}]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const vs = T("Award", [["circle", {
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
const Yf = T("BarChart3", [["path", {
    d: "M3 3v18h18",
    key: "1s2lah"
}], ["path", {
    d: "M18 17V9",
    key: "2bz60n"
}], ["path", {
    d: "M13 17V5",
    key: "1frdt8"
}], ["path", {
    d: "M8 17v-3",
    key: "17ska0"
}]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Kf = T("Binary", [["rect", {
    x: "14",
    y: "14",
    width: "4",
    height: "6",
    rx: "2",
    key: "p02svl"
}], ["rect", {
    x: "6",
    y: "4",
    width: "4",
    height: "6",
    rx: "2",
    key: "xm4xkj"
}], ["path", {
    d: "M6 20h4",
    key: "1i6q5t"
}], ["path", {
    d: "M14 10h4",
    key: "ru81e7"
}], ["path", {
    d: "M6 14h2v6",
    key: "16z9wg"
}], ["path", {
    d: "M14 4h2v6",
    key: "1idq9u"
}]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Gf = T("BookOpenCheck", [["path", {
    d: "M8 3H2v15h7c1.7 0 3 1.3 3 3V7c0-2.2-1.8-4-4-4Z",
    key: "1i8u0n"
}], ["path", {
    d: "m16 12 2 2 4-4",
    key: "mdajum"
}], ["path", {
    d: "M22 6V3h-6c-2.2 0-4 1.8-4 4v14c0-1.7 1.3-3 3-3h7v-2.3",
    key: "jb5l51"
}]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Xf = T("BookOpen", [["path", {
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
const po = T("Bot", [["path", {
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
const ws = T("Brain", [["path", {
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
const nd = T("Bug", [["path", {
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
const rd = T("CheckCircle2", [["circle", {
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
const fo = T("CheckSquare", [["path", {
    d: "m9 11 3 3L22 4",
    key: "1pflzl"
}], ["path", {
    d: "M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11",
    key: "1jnkn4"
}]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ir = T("Check", [["path", {
    d: "M20 6 9 17l-5-5",
    key: "1gmf2c"
}]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Zf = T("ChevronRight", [["path", {
    d: "m9 18 6-6-6-6",
    key: "mthhwq"
}]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ks = T("ClipboardCheck", [["rect", {
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
const Ea = T("Code2", [["path", {
    d: "m18 16 4-4-4-4",
    key: "1inbqp"
}], ["path", {
    d: "m6 8-4 4 4 4",
    key: "15zrgr"
}], ["path", {
    d: "m14.5 4-5 16",
    key: "e7oirm"
}]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const sd = T("Copy", [["rect", {
    width: "14",
    height: "14",
    x: "8",
    y: "8",
    rx: "2",
    ry: "2",
    key: "17jyea"
}], ["path", {
    d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",
    key: "zix9uf"
}]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ho = T("Cpu", [["rect", {
    x: "4",
    y: "4",
    width: "16",
    height: "16",
    rx: "2",
    key: "1vbyd7"
}], ["rect", {
    x: "9",
    y: "9",
    width: "6",
    height: "6",
    key: "o3kz5p"
}], ["path", {
    d: "M15 2v2",
    key: "13l42r"
}], ["path", {
    d: "M15 20v2",
    key: "15mkzm"
}], ["path", {
    d: "M2 15h2",
    key: "1gxd5l"
}], ["path", {
    d: "M2 9h2",
    key: "1bbxkp"
}], ["path", {
    d: "M20 15h2",
    key: "19e6y8"
}], ["path", {
    d: "M20 9h2",
    key: "19tzq7"
}], ["path", {
    d: "M9 2v2",
    key: "165o2o"
}], ["path", {
    d: "M9 20v2",
    key: "i2bqo8"
}]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Jf = T("Download", [["path", {
    d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",
    key: "ih7n3h"
}], ["polyline", {
    points: "7 10 12 15 17 10",
    key: "2ggqvy"
}], ["line", {
    x1: "12",
    x2: "12",
    y1: "15",
    y2: "3",
    key: "1vk2je"
}]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const di = T("Eye", [["path", {
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
const eh = T("FileLock2", [["path", {
    d: "M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v1",
    key: "jmtmu2"
}], ["path", {
    d: "M14 2v4a2 2 0 0 0 2 2h4",
    key: "tnqrlb"
}], ["rect", {
    width: "8",
    height: "5",
    x: "2",
    y: "13",
    rx: "1",
    key: "10y5wo"
}], ["path", {
    d: "M8 13v-2a2 2 0 1 0-4 0v2",
    key: "1pdxzg"
}]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const th = T("FlaskConical", [["path", {
    d: "M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2",
    key: "pzvekw"
}], ["path", {
    d: "M8.5 2h7",
    key: "csnxdl"
}], ["path", {
    d: "M7 16h10",
    key: "wp8him"
}]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const nh = T("Gift", [["rect", {
    x: "3",
    y: "8",
    width: "18",
    height: "4",
    rx: "1",
    key: "bkv52"
}], ["path", {
    d: "M12 8v13",
    key: "1c76mn"
}], ["path", {
    d: "M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7",
    key: "6wjy6b"
}], ["path", {
    d: "M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5",
    key: "1ihvrl"
}]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const rh = T("Github", [["path", {
    d: "M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4",
    key: "tonef"
}], ["path", {
    d: "M9 18c-4.51 2-5-2-7-2",
    key: "9comsn"
}]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ld = T("Globe", [["circle", {
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
const sh = T("HardDriveDownload", [["path", {
    d: "M12 2v8",
    key: "1q4o3n"
}], ["path", {
    d: "m16 6-4 4-4-4",
    key: "6wukr"
}], ["rect", {
    width: "20",
    height: "8",
    x: "2",
    y: "14",
    rx: "2",
    key: "w68u3i"
}], ["path", {
    d: "M6 18h.01",
    key: "uhywen"
}], ["path", {
    d: "M10 18h.01",
    key: "h775k"
}]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const lh = T("Info", [["circle", {
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
const $t = T("KeyRound", [["path", {
    d: "M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z",
    key: "167ctg"
}], ["circle", {
    cx: "16.5",
    cy: "7.5",
    r: ".5",
    fill: "currentColor",
    key: "w0ekpg"
}]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Pa = T("Lightbulb", [["path", {
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
const oh = T("Linkedin", [["path", {
    d: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z",
    key: "c2jq9f"
}], ["rect", {
    width: "4",
    height: "12",
    x: "2",
    y: "9",
    key: "mk3on5"
}], ["circle", {
    cx: "4",
    cy: "4",
    r: "2",
    key: "bt5ra8"
}]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const mn = T("Lock", [["rect", {
    width: "18",
    height: "11",
    x: "3",
    y: "11",
    rx: "2",
    ry: "2",
    key: "1w4ew1"
}], ["path", {
    d: "M7 11V7a5 5 0 0 1 10 0v4",
    key: "fwvmzm"
}]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ih = T("LogIn", [["path", {
    d: "M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4",
    key: "u53s6r"
}], ["polyline", {
    points: "10 17 15 12 10 7",
    key: "1ail0h"
}], ["line", {
    x1: "15",
    x2: "3",
    y1: "12",
    y2: "12",
    key: "v6grx8"
}]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const fr = T("Mail", [["rect", {
    width: "20",
    height: "16",
    x: "2",
    y: "4",
    rx: "2",
    key: "18n3k1"
}], ["path", {
    d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",
    key: "1ocrg3"
}]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ah = T("Menu", [["line", {
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
const ch = T("MessageSquareWarning", [["path", {
    d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
    key: "1lielz"
}], ["path", {
    d: "M12 7v2",
    key: "stiyo7"
}], ["path", {
    d: "M12 13h.01",
    key: "y0uutt"
}]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const uh = T("MicOff", [["line", {
    x1: "2",
    x2: "22",
    y1: "2",
    y2: "22",
    key: "a6p6uj"
}], ["path", {
    d: "M18.89 13.23A7.12 7.12 0 0 0 19 12v-2",
    key: "80xlxr"
}], ["path", {
    d: "M5 10v2a7 7 0 0 0 12 5",
    key: "p2k8kg"
}], ["path", {
    d: "M15 9.34V5a3 3 0 0 0-5.68-1.33",
    key: "1gzdoj"
}], ["path", {
    d: "M9 9v3a3 3 0 0 0 5.12 2.12",
    key: "r2i35w"
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
const dh = T("Mic", [["path", {
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
const pi = T("Network", [["rect", {
    x: "16",
    y: "16",
    width: "6",
    height: "6",
    rx: "1",
    key: "4q2zg0"
}], ["rect", {
    x: "2",
    y: "16",
    width: "6",
    height: "6",
    rx: "1",
    key: "8cvhb9"
}], ["rect", {
    x: "9",
    y: "2",
    width: "6",
    height: "6",
    rx: "1",
    key: "1egb70"
}], ["path", {
    d: "M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3",
    key: "1jsf9p"
}], ["path", {
    d: "M12 12V8",
    key: "2874zd"
}]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ph = T("Palette", [["circle", {
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
const od = T("Play", [["polygon", {
    points: "5 3 19 12 5 21 5 3",
    key: "191637"
}]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Os = T("RefreshCw", [["path", {
    d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",
    key: "v9h5vc"
}], ["path", {
    d: "M21 3v5h-5",
    key: "1q7to0"
}], ["path", {
    d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",
    key: "3uifl3"
}], ["path", {
    d: "M8 16H3v5",
    key: "1cv678"
}]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const fi = T("RotateCcw", [["path", {
    d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",
    key: "1357e3"
}], ["path", {
    d: "M3 3v5h5",
    key: "1xhq8a"
}]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const fh = T("Search", [["circle", {
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
const hh = T("Send", [["path", {
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
const hi = T("ServerCrash", [["path", {
    d: "M6 10H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2",
    key: "4b9dqc"
}], ["path", {
    d: "M6 14H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-2",
    key: "22nnkd"
}], ["path", {
    d: "M6 6h.01",
    key: "1utrut"
}], ["path", {
    d: "M6 18h.01",
    key: "uhywen"
}], ["path", {
    d: "m13 6-4 6h6l-4 6",
    key: "14hqih"
}]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const mi = T("ShieldAlert", [["path", {
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
const Ot = T("ShieldCheck", [["path", {
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
const id = T("ShieldX", [["path", {
    d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
    key: "oel41y"
}], ["path", {
    d: "m14.5 9.5-5 5",
    key: "17q4r4"
}], ["path", {
    d: "m9.5 9.5 5 5",
    key: "18nt4w"
}]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const yn = T("Shield", [["path", {
    d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
    key: "oel41y"
}]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const mh = T("Smartphone", [["rect", {
    width: "14",
    height: "20",
    x: "5",
    y: "2",
    rx: "2",
    ry: "2",
    key: "1yt0o3"
}], ["path", {
    d: "M12 18h.01",
    key: "mhygvu"
}]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const yh = T("Sparkles", [["path", {
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
const gh = T("Square", [["rect", {
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
const ad = T("Terminal", [["polyline", {
    points: "4 17 10 11 4 5",
    key: "akl6gq"
}], ["line", {
    x1: "12",
    x2: "20",
    y1: "19",
    y2: "19",
    key: "q2wloq"
}]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const xh = T("Trophy", [["path", {
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
const vh = T("Twitter", [["path", {
    d: "M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z",
    key: "pff0z6"
}]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const cd = T("Unlock", [["rect", {
    width: "18",
    height: "11",
    x: "3",
    y: "11",
    rx: "2",
    ry: "2",
    key: "1w4ew1"
}], ["path", {
    d: "M7 11V7a5 5 0 0 1 9.9-1",
    key: "1mm8w8"
}]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const wh = T("User", [["path", {
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
const ud = T("Users", [["path", {
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
const kh = T("Volume2", [["polygon", {
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
const bh = T("VolumeX", [["polygon", {
    points: "11 5 6 9 2 9 2 15 6 15 11 19 11 5",
    key: "16drj5"
}], ["line", {
    x1: "22",
    x2: "16",
    y1: "9",
    y2: "15",
    key: "1ewh16"
}], ["line", {
    x1: "16",
    x2: "22",
    y1: "9",
    y2: "15",
    key: "5ykzw1"
}]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const mo = T("Wand2", [["path", {
    d: "m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72Z",
    key: "1bcowg"
}], ["path", {
    d: "m14 7 3 3",
    key: "1r5n42"
}], ["path", {
    d: "M5 6v4",
    key: "ilb8ba"
}], ["path", {
    d: "M19 14v4",
    key: "blhpug"
}], ["path", {
    d: "M10 2v2",
    key: "7u0qdc"
}], ["path", {
    d: "M7 8H3",
    key: "zfb6yr"
}], ["path", {
    d: "M21 16h-4",
    key: "1cnmox"
}], ["path", {
    d: "M11 3H9",
    key: "1obp7u"
}]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const hr = T("X", [["path", {
    d: "M18 6 6 18",
    key: "1bl5f8"
}], ["path", {
    d: "m6 6 12 12",
    key: "d8bk6v"
}]]);
function Nh({onDone: e}) {
    const [t,n] = b.useState(0)
      , [r,s] = b.useState([])
      , l = ["> booting kernel modules...", "> mounting encrypted volumes...", "> loading threat intelligence database...", "> establishing secure tunnel...", "> calibrating intrusion detection...", "> system ready."];
    return b.useEffect( () => {
        let i = 0;
        const a = setInterval( () => {
            i += Math.random() * 9 + 4,
            i >= 100 && (i = 100,
            clearInterval(a),
            setTimeout(e, 600)),
            n(Math.floor(i))
        }
        , 180);
        let c = 0;
        const u = setInterval( () => {
            c < l.length ? (s(h => [...h, l[c]]),
            c++) : clearInterval(u)
        }
        , 360);
        return () => {
            clearInterval(a),
            clearInterval(u)
        }
    }
    , [e]),
    o.jsxs("div", {
        className: "fixed inset-0 z-[100] flex flex-col items-center justify-center bg-cyber-black px-6",
        children: [o.jsx("div", {
            className: "hex-grid absolute inset-0 opacity-30"
        }), o.jsxs("div", {
            className: "relative z-10 flex flex-col items-center",
            children: [o.jsxs("div", {
                className: "relative mb-6 h-24 w-24",
                children: [o.jsx("div", {
                    className: "absolute inset-0 animate-spin-slow rounded-full border-2 border-cyber-cyan/30 border-t-cyber-cyan"
                }), o.jsx("div", {
                    className: "absolute inset-3 animate-spin-rev rounded-full border-2 border-cyber-purple/30 border-b-cyber-purple"
                }), o.jsx("div", {
                    className: "absolute inset-0 grid place-items-center",
                    children: o.jsx(yn, {
                        className: "h-10 w-10 text-cyber-cyan drop-shadow-[0_0_14px_rgba(34,211,238,0.9)]"
                    })
                })]
            }), o.jsxs("h1", {
                className: "section-title text-center text-xl text-cyber-cyan neon-text sm:text-2xl",
                children: ["Initializing Cyber Security System", o.jsx("span", {
                    className: "type-caret"
                })]
            }), o.jsx("div", {
                className: "mt-6 h-2 w-72 overflow-hidden rounded-full bg-cyber-deep sm:w-96",
                children: o.jsx("div", {
                    className: "h-full rounded-full bg-gradient-to-r from-cyber-cyan to-cyber-purple transition-all duration-200",
                    style: {
                        width: `${t}%`,
                        boxShadow: "0 0 12px rgba(34,211,238,0.7)"
                    }
                })
            }), o.jsxs("p", {
                className: "mt-2 font-mono text-xs text-cyber-cyan/80",
                children: [t, "%"]
            }), o.jsx("div", {
                className: "mt-6 h-28 w-72 overflow-hidden rounded-md border border-cyber-cyan/20 bg-black/50 p-3 font-mono text-[11px] leading-relaxed text-cyber-green/80 sm:w-96",
                children: r.map( (i, a) => o.jsx("div", {
                    className: "animate-fade-in",
                    children: i
                }, a))
            })]
        })]
    })
}
function jh() {
    const e = b.useRef(null);
    return b.useEffect( () => {
        const t = e.current;
        if (!t)
            return;
        const n = t.getContext("2d");
        if (!n)
            return;
        let r = t.width = window.innerWidth
          , s = t.height = window.innerHeight;
        const l = window.matchMedia("(prefers-reduced-motion: reduce)").matches
          , i = Math.floor(r / 16)
          , a = new Array(i).fill(0).map( () => Math.random() * -50)
          , c = "01"
          , u = r / i
          , h = []
          , y = Math.min(70, Math.floor(r * s / 22e3));
        for (let j = 0; j < y; j++)
            h.push({
                x: Math.random() * r,
                y: Math.random() * s,
                vx: (Math.random() - .5) * .35,
                vy: (Math.random() - .5) * .35,
                r: Math.random() * 1.8 + .6
            });
        let m = 0
          , w = 0;
        const g = () => {
            if (w++,
            n.fillStyle = "rgba(3, 6, 15, 0.28)",
            n.fillRect(0, 0, r, s),
            w % 2 === 0) {
                n.font = '14px "Share Tech Mono", monospace';
                for (let j = 0; j < i; j++) {
                    const d = a[j] * 16
                      , p = j * u
                      , f = Math.random() < .04;
                    n.fillStyle = f ? "rgba(103, 232, 249, 0.95)" : "rgba(34, 211, 238, 0.55)",
                    n.fillText(c[Math.floor(Math.random() * 2)], p, d),
                    d > s && Math.random() > .975 && (a[j] = 0),
                    a[j] += .6
                }
            }
            for (let j = 0; j < h.length; j++) {
                const d = h[j];
                w % 3 === 0 && (d.x += d.vx,
                d.y += d.vy,
                (d.x < 0 || d.x > r) && (d.vx *= -1),
                (d.y < 0 || d.y > s) && (d.vy *= -1)),
                n.beginPath(),
                n.arc(d.x, d.y, d.r, 0, Math.PI * 2),
                n.fillStyle = "rgba(168, 85, 247, 0.7)",
                n.fill();
                for (let p = j + 1; p < h.length; p++) {
                    const f = h[p]
                      , v = d.x - f.x
                      , N = d.y - f.y
                      , S = v * v + N * N;
                    if (S < 130 * 130) {
                        const E = 1 - Math.sqrt(S) / 130;
                        n.strokeStyle = `rgba(34, 211, 238, ${E * .22})`,
                        n.lineWidth = .6,
                        n.beginPath(),
                        n.moveTo(d.x, d.y),
                        n.lineTo(f.x, f.y),
                        n.stroke()
                    }
                }
            }
            m = requestAnimationFrame(g)
        }
        ;
        l ? (n.fillStyle = "rgba(3, 6, 15, 1)",
        n.fillRect(0, 0, r, s)) : m = requestAnimationFrame(g);
        const x = () => {
            r = t.width = window.innerWidth,
            s = t.height = window.innerHeight
        }
        ;
        return window.addEventListener("resize", x),
        () => {
            cancelAnimationFrame(m),
            window.removeEventListener("resize", x)
        }
    }
    , []),
    o.jsxs("div", {
        className: "fixed inset-0 -z-10 overflow-hidden bg-cyber-black",
        children: [o.jsx("canvas", {
            ref: e,
            className: "absolute inset-0 h-full w-full"
        }), o.jsx("div", {
            className: "hex-grid absolute inset-0 opacity-40"
        }), o.jsx("div", {
            className: "absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-cyber-cyan/10 blur-[120px]"
        }), o.jsx("div", {
            className: "absolute -right-24 top-2/3 h-[28rem] w-[28rem] rounded-full bg-cyber-purple/10 blur-[130px]"
        }), o.jsx("div", {
            className: "absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-cyber-blue/10 blur-[120px]"
        }), o.jsx("div", {
            className: "absolute left-[6%] top-[18%] hidden lg:block",
            children: o.jsxs("div", {
                className: "relative h-40 w-40 animate-float",
                children: [o.jsx("div", {
                    className: "absolute inset-0 animate-spin-slow rounded-full border border-cyber-cyan/30",
                    style: {
                        borderTopColor: "rgba(34,211,238,0.9)"
                    }
                }), o.jsx("div", {
                    className: "absolute inset-3 animate-spin-rev rounded-full border border-cyber-purple/30",
                    style: {
                        borderRightColor: "rgba(168,85,247,0.9)"
                    }
                }), o.jsx("div", {
                    className: "absolute inset-0 grid place-items-center",
                    children: o.jsx(yn, {
                        className: "h-12 w-12 text-cyber-cyan drop-shadow-[0_0_12px_rgba(34,211,238,0.8)]"
                    })
                })]
            })
        }), o.jsx("div", {
            className: "absolute right-[8%] top-[12%] hidden lg:block",
            children: o.jsx("div", {
                className: "animate-float glass flex h-20 w-20 items-center justify-center rounded-2xl",
                style: {
                    animationDelay: "1.2s"
                },
                children: o.jsx(mn, {
                    className: "h-9 w-9 text-cyber-green drop-shadow-[0_0_10px_rgba(52,211,153,0.8)]"
                })
            })
        }), o.jsx("div", {
            className: "absolute bottom-[12%] left-[12%] hidden xl:block",
            children: o.jsxs("div", {
                className: "relative h-32 w-32",
                children: [o.jsx("div", {
                    className: "absolute inset-0 animate-spin-slow rounded-full border-2 border-dashed border-cyber-cyan/40"
                }), o.jsx("div", {
                    className: "absolute inset-4 animate-spin-rev rounded-full border border-cyber-purple/40"
                }), o.jsx("div", {
                    className: "absolute inset-0 grid place-items-center",
                    children: o.jsx(ld, {
                        className: "h-12 w-12 text-cyber-cyan/80 drop-shadow-[0_0_10px_rgba(34,211,238,0.7)]"
                    })
                })]
            })
        }), o.jsx(Mn, {
            className: "left-[20%] top-[60%]",
            delay: "2s",
            children: o.jsx($t, {
                className: "h-7 w-7 text-cyber-amber"
            })
        }), o.jsx(Mn, {
            className: "right-[18%] top-[55%]",
            delay: "0.5s",
            children: o.jsx(pi, {
                className: "h-7 w-7 text-cyber-cyan"
            })
        }), o.jsx(Mn, {
            className: "left-[45%] top-[8%]",
            delay: "1.6s",
            children: o.jsx(ho, {
                className: "h-6 w-6 text-cyber-purple"
            })
        }), o.jsx(Mn, {
            className: "right-[30%] bottom-[20%]",
            delay: "2.4s",
            children: o.jsx(Kf, {
                className: "h-6 w-6 text-cyber-green"
            })
        }), o.jsx(Mn, {
            className: "left-[8%] bottom-[8%]",
            delay: "3s",
            children: o.jsx(ad, {
                className: "h-6 w-6 text-cyber-cyan/80"
            })
        }), o.jsx("div", {
            className: "absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-cyber-black/80"
        })]
    })
}
function Mn({children: e, className: t, delay: n}) {
    return o.jsx("div", {
        className: `absolute hidden md:block ${t}`,
        style: {
            animationDelay: n
        },
        children: o.jsx("div", {
            className: "animate-float glass flex h-12 w-12 items-center justify-center rounded-xl",
            children: e
        })
    })
}
let ml = null
  , dd = !1;
function Sh(e) {
    dd = e
}
function Ch() {
    if (typeof window > "u")
        return null;
    if (!ml) {
        const e = window.AudioContext || window.webkitAudioContext;
        if (!e)
            return null;
        ml = new e
    }
    return ml
}
function z(e) {
    if (!dd)
        return;
    const t = Ch();
    if (!t)
        return;
    t.state === "suspended" && t.resume();
    const n = t.currentTime
      , r = t.createOscillator()
      , s = t.createGain();
    r.connect(s),
    s.connect(t.destination);
    const i = {
        click: {
            f: 520,
            type: "square",
            dur: .05,
            vol: .04
        },
        type: {
            f: 660,
            type: "square",
            dur: .03,
            vol: .02
        },
        success: {
            f: 880,
            type: "sine",
            dur: .18,
            vol: .06
        },
        unlock: {
            f: 740,
            type: "triangle",
            dur: .25,
            vol: .06
        },
        error: {
            f: 180,
            type: "sawtooth",
            dur: .22,
            vol: .05
        },
        alert: {
            f: 320,
            type: "square",
            dur: .14,
            vol: .05
        }
    }[e];
    r.type = i.type,
    r.frequency.setValueAtTime(i.f, n),
    (e === "success" || e === "unlock") && r.frequency.linearRampToValueAtTime(i.f * 1.5, n + i.dur),
    e === "error" && r.frequency.linearRampToValueAtTime(i.f * .5, n + i.dur),
    s.gain.setValueAtTime(i.vol, n),
    s.gain.exponentialRampToValueAtTime(1e-4, n + i.dur),
    r.start(n),
    r.stop(n + i.dur + .02)
}
function Eh() {
    const [e,t] = b.useState(!1)
      , n = b.useRef(e);
    return n.current = e,
    {
        on: e,
        toggle: () => {
            const s = !n.current;
            t(s),
            Sh(s),
            s && z("unlock")
        }
    }
}
const pd = b.createContext({
    page: "home",
    navigate: () => {}
});
function yi() {
    return b.useContext(pd)
}
const Ta = [{
    id: "home",
    label: "Home"
}, {
    id: "assistant",
    label: "AI Assistant"
}, {
    id: "password-checker",
    label: "Password Checker"
}, {
    id: "phishing",
    label: "Phishing"
}, {
    id: "quiz",
    label: "Quiz"
}, {
    id: "scam",
    label: "Spot Scam"
}, {
    id: "generator",
    label: "Generator"
}, {
    id: "simulation",
    label: "Simulation"
}, {
    id: "mindmap",
    label: "Mind Map"
}, {
    id: "stats",
    label: "Stats & Timeline"
}, {
    id: "checklist",
    label: "Checklist"
}, {
    id: "creators",
    label: "Creators"
}];
function Ph({soundOn: e, onToggleSound: t}) {
    const {page: n, navigate: r} = yi()
      , [s,l] = b.useState(!1)
      , [i,a] = b.useState(!1);
    b.useEffect( () => {
        const u = () => l(window.scrollY > 40);
        return u(),
        window.addEventListener("scroll", u),
        () => window.removeEventListener("scroll", u)
    }
    , []);
    const c = u => {
        z("click"),
        a(!1),
        r(u)
    }
    ;
    return o.jsxs("header", {
        className: `fixed inset-x-0 top-0 z-50 transition-all duration-300 ${s ? "glass-strong border-b border-cyber-cyan/20 py-2" : "bg-transparent py-3"}`,
        children: [o.jsxs("nav", {
            className: "mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6",
            children: [o.jsxs("button", {
                onClick: () => c("home"),
                className: "flex items-center gap-2",
                children: [o.jsx(yn, {
                    className: "h-7 w-7 text-cyber-cyan drop-shadow-[0_0_8px_rgba(34,211,238,0.7)]"
                }), o.jsxs("span", {
                    className: "section-title text-sm tracking-widest text-cyber-cyan sm:text-base",
                    children: ["CYBER", o.jsx("span", {
                        className: "text-cyber-purple",
                        children: "SEC"
                    })]
                })]
            }), o.jsx("div", {
                className: "hidden items-center gap-1 xl:flex",
                children: Ta.map(u => o.jsxs("button", {
                    onClick: () => c(u.id),
                    className: `rounded-md px-2.5 py-1.5 text-xs transition-all hover:text-cyber-cyan ${n === u.id ? "text-cyber-cyan" : "text-slate-300"}`,
                    children: [u.label, n === u.id && o.jsx("span", {
                        className: "mt-0.5 block h-0.5 w-full rounded-full bg-cyber-cyan"
                    })]
                }, u.id))
            }), o.jsxs("div", {
                className: "flex items-center gap-2",
                children: [o.jsx("button", {
                    onClick: t,
                    "aria-label": "Toggle cyber sound effects",
                    className: "glass flex h-9 w-9 items-center justify-center rounded-lg text-cyber-cyan transition hover:border-cyber-cyan",
                    children: e ? o.jsx(kh, {
                        className: "h-4 w-4"
                    }) : o.jsx(bh, {
                        className: "h-4 w-4"
                    })
                }), o.jsx("button", {
                    onClick: () => {
                        z("click"),
                        a(u => !u)
                    }
                    ,
                    "aria-label": "Menu",
                    className: "glass flex h-9 w-9 items-center justify-center rounded-lg text-cyber-cyan xl:hidden",
                    children: i ? o.jsx(hr, {
                        className: "h-4 w-4"
                    }) : o.jsx(ah, {
                        className: "h-4 w-4"
                    })
                })]
            })]
        }), i && o.jsx("div", {
            className: "mx-4 mt-2 grid grid-cols-2 gap-1 rounded-xl glass-strong p-3 xl:hidden",
            children: Ta.map(u => o.jsx("button", {
                onClick: () => c(u.id),
                className: `rounded-md px-3 py-2 text-left text-sm transition hover:bg-cyber-cyan/10 ${n === u.id ? "text-cyber-cyan" : "text-slate-300"}`,
                children: u.label
            }, u.id))
        })]
    })
}
function Me() {
    const e = b.useRef(null);
    return b.useEffect( () => {
        const t = e.current;
        if (!t)
            return;
        const n = new IntersectionObserver(r => {
            r.forEach(s => {
                s.isIntersecting && (s.target.classList.add("is-visible"),
                n.unobserve(s.target))
            }
            )
        }
        ,{
            threshold: .12
        });
        return n.observe(t),
        () => n.disconnect()
    }
    , []),
    e
}
function Th(e, t=1800, n=!1) {
    const [r,s] = b.useState(0);
    return b.useEffect( () => {
        if (!n)
            return;
        let l = 0;
        const i = performance.now()
          , a = c => {
            const u = Math.min(1, (c - i) / t)
              , h = 1 - Math.pow(1 - u, 3);
            s(e * h),
            u < 1 ? l = requestAnimationFrame(a) : s(e)
        }
        ;
        return l = requestAnimationFrame(a),
        () => cancelAnimationFrame(l)
    }
    , [e, t, n]),
    r
}
function Mh(e, t=40, n=!0) {
    const [r,s] = b.useState("")
      , [l,i] = b.useState(!1);
    return b.useEffect( () => {
        if (!n)
            return;
        let a = 0, c;
        const u = () => {
            a <= e.length ? (s(e.slice(0, a)),
            a++,
            c = setTimeout(u, t)) : i(!0)
        }
        ;
        return u(),
        () => clearTimeout(c)
    }
    , [e, t, n]),
    {
        out: r,
        done: l
    }
}
const Ma = "Every click matters. Every password matters. Learn how hackers attack and how you can stay protected.";
function _a() {
    const {out: e} = Mh(Ma, 28)
      , [t,n] = b.useState(!1);
    b.useEffect( () => {
        const l = setTimeout( () => n(!0), 2200);
        return () => clearTimeout(l)
    }
    , []);
    const {navigate: r} = yi()
      , s = l => {
        z("click"),
        r(l)
    }
    ;
    return o.jsxs("section", {
        id: "home",
        className: "relative flex min-h-screen items-center px-4 pt-28 sm:px-6",
        children: [o.jsxs("div", {
            className: "mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-2",
            children: [o.jsxs("div", {
                className: "text-center lg:text-left",
                children: [o.jsxs("div", {
                    className: "mb-5 inline-flex items-center gap-2 rounded-full border border-cyber-cyan/30 bg-cyber-cyan/5 px-4 py-1.5 font-mono text-xs text-cyber-cyan",
                    children: [o.jsx("span", {
                        className: "h-2 w-2 animate-pulse rounded-full bg-cyber-green"
                    }), "SYSTEM ONLINE • SCIENCE EXHIBITION PROJECT"]
                }), o.jsxs("h1", {
                    className: "section-title text-4xl leading-tight sm:text-6xl xl:text-7xl",
                    children: [o.jsx("span", {
                        className: "neon-text text-cyber-cyan",
                        children: "CYBER"
                    }), " ", o.jsx("span", {
                        className: "neon-text-purple text-cyber-purple",
                        children: "SECURITY"
                    })]
                }), o.jsx("p", {
                    className: "mt-4 font-orbitron text-lg text-slate-200 sm:text-2xl",
                    children: "Protect Yourself Before It's Too Late."
                }), o.jsx("p", {
                    className: `mx-auto mt-5 max-w-xl text-sm text-slate-300 sm:text-base lg:mx-0 ${e.length === Ma.length ? "" : "type-caret"}`,
                    children: e
                }), o.jsxs("div", {
                    className: `mt-8 flex flex-wrap justify-center gap-3 transition-all duration-700 lg:justify-start ${t ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`,
                    children: [o.jsxs("button", {
                        onClick: () => s("assistant"),
                        className: "btn-cyber flex items-center gap-2",
                        children: [o.jsx(ws, {
                            className: "h-4 w-4"
                        }), " Start Learning"]
                    }), o.jsxs("button", {
                        onClick: () => s("quiz"),
                        className: "btn-ghost flex items-center gap-2",
                        children: [o.jsx(ks, {
                            className: "h-4 w-4"
                        }), " Test Yourself"]
                    }), o.jsxs("button", {
                        onClick: () => s("assistant"),
                        className: "btn-ghost flex items-center gap-2",
                        children: [o.jsx(ho, {
                            className: "h-4 w-4"
                        }), " Ask AI"]
                    })]
                }), o.jsxs("div", {
                    className: "mt-10 flex flex-wrap justify-center gap-6 text-center lg:justify-start",
                    children: [o.jsx(yl, {
                        icon: o.jsx(mn, {
                            className: "h-5 w-5 text-cyber-green"
                        }),
                        value: "12+",
                        label: "Interactive Tools"
                    }), o.jsx(yl, {
                        icon: o.jsx(yn, {
                            className: "h-5 w-5 text-cyber-cyan"
                        }),
                        value: "20",
                        label: "Quiz Questions"
                    }), o.jsx(yl, {
                        icon: o.jsx(Xf, {
                            className: "h-5 w-5 text-cyber-purple"
                        }),
                        value: "100%",
                        label: "Free & Safe"
                    })]
                })]
            }), o.jsx("div", {
                className: "relative hidden h-[26rem] items-center justify-center lg:flex",
                children: o.jsxs("div", {
                    className: "relative h-72 w-72",
                    children: [o.jsx("div", {
                        className: "absolute inset-0 animate-spin-slow rounded-full border-2 border-cyber-cyan/30 border-t-cyber-cyan"
                    }), o.jsx("div", {
                        className: "absolute inset-6 animate-spin-rev rounded-full border-2 border-cyber-purple/40 border-r-cyber-purple"
                    }), o.jsx("div", {
                        className: "absolute inset-12 animate-spin-slow rounded-full border border-cyber-green/30 border-b-cyber-green"
                    }), o.jsx("div", {
                        className: "absolute inset-0 grid place-items-center",
                        children: o.jsx("div", {
                            className: "glass-strong neon-border flex h-32 w-32 items-center justify-center rounded-3xl",
                            children: o.jsx(yn, {
                                className: "h-16 w-16 text-cyber-cyan drop-shadow-[0_0_18px_rgba(34,211,238,1)]"
                            })
                        })
                    }), o.jsx(Ir, {
                        className: "left-0 top-1/2 -translate-y-1/2",
                        children: o.jsx(mn, {
                            className: "h-5 w-5 text-cyber-green"
                        })
                    }), o.jsx(Ir, {
                        className: "right-0 top-1/2 -translate-y-1/2",
                        children: o.jsx(ws, {
                            className: "h-5 w-5 text-cyber-purple"
                        })
                    }), o.jsx(Ir, {
                        className: "left-1/2 top-0 -translate-x-1/2",
                        children: o.jsx(ad, {
                            className: "h-5 w-5 text-cyber-cyan"
                        })
                    }), o.jsx(Ir, {
                        className: "left-1/2 bottom-0 -translate-x-1/2",
                        children: o.jsx(ho, {
                            className: "h-5 w-5 text-cyber-amber"
                        })
                    })]
                })
            })]
        }), o.jsx("button", {
            onClick: () => s("assistant"),
            className: "absolute bottom-6 left-1/2 -translate-x-1/2 text-cyber-cyan/70 transition hover:text-cyber-cyan",
            "aria-label": "Explore tools",
            children: o.jsxs("div", {
                className: "flex flex-col items-center gap-1",
                children: [o.jsx("span", {
                    className: "font-mono text-[10px] tracking-widest",
                    children: "EXPLORE"
                }), o.jsx("div", {
                    className: "flex h-9 w-5 items-start justify-center rounded-full border border-cyber-cyan/40 p-1",
                    children: o.jsx("div", {
                        className: "h-2 w-1 animate-bounce rounded-full bg-cyber-cyan"
                    })
                })]
            })
        }), o.jsx(zh, {})]
    })
}
const _h = [{
    id: "assistant",
    label: "CyberGuard AI",
    desc: "Ask any cyber security question",
    icon: o.jsx(ws, {
        className: "h-6 w-6"
    }),
    color: "#22d3ee"
}, {
    id: "password-checker",
    label: "Password Checker",
    desc: "Test how strong your password is",
    icon: o.jsx($t, {
        className: "h-6 w-6"
    }),
    color: "#34d399"
}, {
    id: "phishing",
    label: "Phishing Detector",
    desc: "Spot safe vs scam emails",
    icon: o.jsx(fr, {
        className: "h-6 w-6"
    }),
    color: "#fbbf24"
}, {
    id: "quiz",
    label: "Cyber Quiz",
    desc: "20 questions + certificate",
    icon: o.jsx(ks, {
        className: "h-6 w-6"
    }),
    color: "#a855f7"
}, {
    id: "scam",
    label: "Spot The Scam",
    desc: "Find red flags on fake sites",
    icon: o.jsx(di, {
        className: "h-6 w-6"
    }),
    color: "#f43f5e"
}, {
    id: "generator",
    label: "Password Generator",
    desc: "Create ultra-secure passwords",
    icon: o.jsx(mo, {
        className: "h-6 w-6"
    }),
    color: "#22d3ee"
}, {
    id: "simulation",
    label: "Attack Simulation",
    desc: "Watch a hack, then block it",
    icon: o.jsx(od, {
        className: "h-6 w-6"
    }),
    color: "#f43f5e"
}, {
    id: "mindmap",
    label: "Mind Map",
    desc: "Explore cyber topics visually",
    icon: o.jsx(pi, {
        className: "h-6 w-6"
    }),
    color: "#a855f7"
}, {
    id: "stats",
    label: "Stats & Timeline",
    desc: "Live counters + history",
    icon: o.jsx(Yf, {
        className: "h-6 w-6"
    }),
    color: "#22d3ee"
}, {
    id: "checklist",
    label: "Checklist & Badges",
    desc: "Track your safety + earn badges",
    icon: o.jsx(fo, {
        className: "h-6 w-6"
    }),
    color: "#34d399"
}, {
    id: "creators",
    label: "Creators",
    desc: "Meet the team",
    icon: o.jsx(ud, {
        className: "h-6 w-6"
    }),
    color: "#fbbf24"
}];
function zh() {
    const {navigate: e} = yi()
      , t = n => {
        z("click"),
        e(n)
    }
    ;
    return o.jsxs("div", {
        className: "mx-auto mt-8 max-w-7xl px-1",
        children: [o.jsx("p", {
            className: "mb-4 text-center font-orbitron text-sm uppercase tracking-widest text-cyber-cyan",
            children: "Interactive Tools & Activities"
        }), o.jsx("div", {
            className: "grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4",
            children: _h.map(n => o.jsxs("button", {
                onClick: () => t(n.id),
                className: "glass glass-hover group flex flex-col items-start gap-3 rounded-2xl p-4 text-left",
                children: [o.jsx("div", {
                    className: "grid h-11 w-11 place-items-center rounded-xl transition-transform group-hover:scale-110",
                    style: {
                        background: `${n.color}1a`,
                        color: n.color
                    },
                    children: n.icon
                }), o.jsxs("div", {
                    children: [o.jsx("p", {
                        className: "font-orbitron text-sm text-white",
                        children: n.label
                    }), o.jsx("p", {
                        className: "mt-0.5 text-xs text-slate-400",
                        children: n.desc
                    })]
                }), o.jsx(qf, {
                    className: "ml-auto h-4 w-4 text-slate-500 transition group-hover:translate-x-1 group-hover:text-cyber-cyan"
                })]
            }, n.id))
        })]
    })
}
function yl({icon: e, value: t, label: n}) {
    return o.jsxs("div", {
        className: "flex items-center gap-3",
        children: [o.jsx("div", {
            className: "glass flex h-10 w-10 items-center justify-center rounded-lg",
            children: e
        }), o.jsxs("div", {
            className: "text-left",
            children: [o.jsx("div", {
                className: "font-orbitron text-lg text-white",
                children: t
            }), o.jsx("div", {
                className: "text-[11px] uppercase tracking-wider text-slate-400",
                children: n
            })]
        })]
    })
}
function Ir({children: e, className: t}) {
    return o.jsx("div", {
        className: `absolute ${t}`,
        children: o.jsx("div", {
            className: "glass animate-float flex h-9 w-9 items-center justify-center rounded-lg",
            children: e
        })
    })
}
const Lh = [{
    keywords: ["phishing", "phish", "fake email", "scam email"],
    title: "Phishing",
    answer: `Phishing is when attackers send fake emails, messages, or websites that look real to trick you into giving away passwords, OTPs, or bank details.

Signs to spot it:
• Urgent language ("act now or lose your account")
• Spelling and grammar mistakes
• Links that do not match the real website
• Requests for passwords or OTPs

Rule: Real companies never ask for your password or OTP by email. When in doubt, do not click — go to the website directly.`,
    followups: ["How do I spot a phishing email?", "What is social engineering?"]
}, {
    keywords: ["malware", "virus", "trojan", "spyware", "worm"],
    title: "Malware",
    answer: `Malware is short for "malicious software" — any program made to harm or spy on your device.

Common types:
• Virus: attaches to files and spreads
• Worm: spreads on its own across networks
• Trojan: pretends to be a safe app
• Spyware: secretly watches what you do

You usually get malware by downloading bad files, clicking fake links, or using infected USB drives. A good antivirus and keeping software updated stops most malware.`,
    followups: ["What is ransomware?", "How do antivirus programs work?"]
}, {
    keywords: ["ransomware", "ransom", "encrypt files"],
    title: "Ransomware",
    answer: `Ransomware is a type of malware that locks or encrypts your files, then demands money (the "ransom") to unlock them.

It often spreads through fake email attachments, infected downloads, or outdated software.

How to stay safe:
• Keep regular backups (offline or in the cloud)
• Update your software regularly
• Do not open attachments from unknown senders

Important: Even if you pay, there is no guarantee you will get your files back. Backups are your best defence.`,
    followups: ["What is malware?", "Why should I update software?"]
}, {
    keywords: ["ethical hacking", "white hat", "penetration", "pentest", "bug bounty"],
    title: "Ethical Hacking",
    answer: `Ethical hacking is hacking done with permission to find and fix security weaknesses before criminals can exploit them.

These hackers are called "white-hat" hackers. The bad ones are "black-hat".

They do things like:
• Penetration testing — pretending to attack a system to find holes
• Bug bounty programs — companies pay rewards for reported flaws

Ethical hacking is legal because the hacker has permission. It helps make apps and websites safer for everyone.`,
    followups: ["What is cyber law?", "How do firewalls work?"]
}, {
    keywords: ["password", "passcode", "strong password", "weak password"],
    title: "Password Security",
    answer: `A strong password is your first line of defence.

Make passwords strong by:
• Using 12+ characters (length beats complexity)
• Mixing uppercase, lowercase, numbers, and symbols
• Avoiding names, birthdays, and common words like "password"
• Using a different password for every account

Use a password manager to remember them all. Never write passwords on sticky notes or share them with friends.`,
    followups: ["What is 2FA?", "How do password managers work?"]
}, {
    keywords: ["social engineering", "manipulation", "pretexting", "baiting"],
    title: "Social Engineering",
    answer: `Social engineering is when attackers trick people — not machines — into breaking security rules.

Examples:
• Someone calls pretending to be "IT support" and asks for your password
• A USB drive left in a parking lot, hoping you plug it in
• A fake story ("pretexting") to earn your trust

Defence: always verify who is asking, never share secrets under pressure, and remember that real support staff never need your password.`,
    followups: ["What is phishing?", "What is identity theft?"]
}, {
    keywords: ["privacy", "online privacy", "tracking", "cookies", "data collection"],
    title: "Online Privacy",
    answer: `Online privacy means controlling what information about you is collected, shared, and seen on the internet.

Tips:
• Check app permissions (camera, location, contacts)
• Use private/incognito browsing for sensitive searches
• Review social media privacy settings
• Be careful what you post — your digital footprint is permanent

The less personal data you share, the harder it is for attackers to target you.`,
    followups: ["What is a digital footprint?", "How does a VPN help privacy?"]
}, {
    keywords: ["vpn", "virtual private network", "tunnel"],
    title: "VPN",
    answer: `A VPN (Virtual Private Network) creates an encrypted tunnel between your device and the internet.

Benefits:
• Hides your real IP address and location
• Protects your data on public WiFi
• Stops outsiders from spying on your traffic

A VPN does not make you anonymous for serious crimes — but it greatly improves everyday privacy and security, especially on open WiFi.`,
    followups: ["What are public WiFi risks?", "What is encryption?"]
}, {
    keywords: ["encryption", "decrypt", "cipher", "encrypted"],
    title: "Encryption",
    answer: `Encryption scrambles readable data into coded form using a key. Only someone with the correct key can decode it.

You use it every day:
• HTTPS (the padlock in your browser) encrypts web traffic
• Messaging apps encrypt your chats
• VPNs encrypt your whole connection

Without the key, encrypted data looks like random gibberish — which is why it protects passwords, messages, and files even if someone steals them.`,
    followups: ["What is a VPN?", "How does HTTPS work?"]
}, {
    keywords: ["digital footprint", "footprint", "online trail"],
    title: "Digital Footprints",
    answer: `Your digital footprint is the trail of data you leave behind every time you go online — posts, searches, logins, photos, and comments.

Once something is online, it is very hard to fully delete. Future schools and employers may see it.

Be smart:
• Think before you post
• Keep personal details private
• Review old accounts and delete ones you no longer use`,
    followups: ["What is online privacy?", "What is identity theft?"]
}, {
    keywords: ["safe browsing", "https", "padlock", "secure website", "malicious site"],
    title: "Safe Browsing",
    answer: `Safe browsing means visiting only trustworthy websites and avoiding dangerous ones.

Check before you enter passwords:
• Look for "https" and a padlock icon in the address bar
• Check the URL spelling carefully (amaz0n vs amazon)
• Avoid clicking popups and banner ads
• Use a modern browser with built-in protection

When a site feels off — too many popups, weird spelling, impossible offers — close the tab.`,
    followups: ["What is phishing?", "How do I spot a scam site?"]
}, {
    keywords: ["cyber law", "cyber laws", "law", "legal", "it act"],
    title: "Cyber Laws",
    answer: `Cyber laws are legal rules that deal with crime and behaviour on the internet.

They cover things like:
• Hacking and unauthorised access
• Online fraud and identity theft
• Spreading malware or ransomware
• Privacy and data protection

In India, the main law is the Information Technology Act, 2000 (with later amendments). Breaking these laws can lead to fines and prison — so "just exploring" someone else's account without permission is a crime.`,
    followups: ["What is ethical hacking?", "What is identity theft?"]
}, {
    keywords: ["data protection", "personal data", "gdpr", "data privacy"],
    title: "Data Protection",
    answer: `Data protection means keeping personal information safe from loss, theft, and misuse.

Companies should:
• Collect only what they need
• Store it encrypted
• Let you see and delete your data

You can protect your own data by sharing less online, using strong passwords and 2FA, and reading privacy policies of apps you trust with sensitive info.`,
    followups: ["What is online privacy?", "What is encryption?"]
}, {
    keywords: ["public wifi", "open wifi", "cafe wifi", "free wifi"],
    title: "Public WiFi Risks",
    answer: `Public WiFi (cafes, airports, malls) is usually open and unencrypted, so others on the same network can spy on your traffic.

Risks:
• Attackers can intercept passwords and messages
• Fake "Free WiFi" hotspots can steal your data

Stay safe:
• Avoid banking or logging into accounts on public WiFi
• Use a VPN if you must connect
• Turn off auto-connect to open networks
• Prefer your mobile data for sensitive tasks`,
    followups: ["What is a VPN?", "What is encryption?"]
}, {
    keywords: ["2fa", "two factor", "two-factor", "mfa", "otp", "one time password"],
    title: "Two-Factor Authentication",
    answer: `2FA adds a second step to logging in, so a stolen password alone is not enough.

Steps usually are:
1. Your password (something you know)
2. A code from your phone or an app (something you have)

So even if someone learns your password, they still cannot get in without the second factor. Turn on 2FA for email, banking, and social media. Never share the OTP with anyone — real support will never ask for it.`,
    followups: ["What is password security?", "What is phishing?"]
}, {
    keywords: ["identity theft", "impersonation", "stolen identity"],
    title: "Identity Theft",
    answer: `Identity theft is when someone steals your personal information (name, ID, bank details, photos) to impersonate you — usually to commit fraud.

How it happens:
• Phishing and data breaches
• Oversharing on social media
• Lost documents or phones

Protect yourself:
• Share as little personal data as possible
• Use strong passwords and 2FA
• Shred or securely delete old documents
• Check bank statements regularly`,
    followups: ["What is phishing?", "What is online privacy?"]
}, {
    keywords: ["firewall", "network protection"],
    title: "Firewalls",
    answer: `A firewall is a security barrier that controls traffic going in and out of a network based on rules.

It can be:
• Hardware (a device on your network)
• Software (built into your computer or router)

Firewalls block suspicious connections while letting safe traffic through — they are the first line of defence for networks. Your computer and router usually have one built in; keep it turned on.`,
    followups: ["What is network security?", "What is a VPN?"]
}, {
    keywords: ["antivirus", "anti-virus", "malware scanner"],
    title: "Antivirus",
    answer: `Antivirus software scans your device to find and remove malicious programs.

It works by:
• Comparing files against known malware "signatures"
• Watching for suspicious behaviour (heuristics)
• Scanning new downloads in real time

Keep your antivirus updated so it recognises the newest threats. Most modern operating systems include one (like Windows Defender) — make sure it is turned on.`,
    followups: ["What is malware?", "Why update software?"]
}, {
    keywords: ["hi", "hello", "hey", "help", "start"],
    title: "Welcome",
    answer: `Hi! I am CyberGuard AI. I can explain cyber security topics in simple words — phishing, malware, ransomware, passwords, 2FA, VPNs, encryption, ethical hacking, cyber laws, and more.

Ask me a question or tap a suggested topic below to begin.`,
    followups: ["What is phishing?", "How do I make a strong password?", "What is ransomware?"]
}]
  , fd = "I am designed only to help with Cyber Security. Ask me about phishing, malware, passwords, 2FA, VPNs, encryption, ethical hacking, cyber laws, and similar topics.";
function Ih(e) {
    const t = e.toLowerCase();
    for (const n of Lh)
        if (n.keywords.some(r => t.includes(r)))
            return {
                title: n.title,
                answer: n.answer,
                followups: n.followups,
                offTopic: !1
            };
    return {
        title: "Out of scope",
        answer: fd,
        followups: ["What is phishing?", "What is 2FA?"],
        offTopic: !0
    }
}
const Ah = ["What is phishing?", "How do I make a strong password?", "What is ransomware?", "Explain 2FA", "What is a VPN?", "What is encryption?", "Tell me about ethical hacking", "What are public WiFi risks?", "What is social engineering?", "Explain cyber laws"];
function za() {
    if (typeof window > "u")
        return null;
    const e = window;
    return e.SpeechRecognition || e.webkitSpeechRecognition || null
}
const Rh = {
    role: "ai",
    text: "Hello! I am CyberGuard AI, your cyber security assistant. Ask me anything about staying safe online — phishing, passwords, malware, 2FA, VPNs, encryption, and more."
};
function Fh() {
    const e = Me()
      , [t,n] = b.useState([Rh])
      , [r,s] = b.useState("")
      , [l,i] = b.useState(!1)
      , [a,c] = b.useState(!1)
      , [u,h] = b.useState(null)
      , y = b.useRef(null)
      , m = b.useRef(null)
      , w = typeof window < "u" && !!za();
    b.useEffect( () => {
        var d;
        (d = y.current) == null || d.scrollTo({
            top: y.current.scrollHeight,
            behavior: "smooth"
        })
    }
    , [t, l]),
    b.useEffect( () => () => {
        var d;
        try {
            (d = m.current) == null || d.stop()
        } catch {}
    }
    , []);
    const g = () => {
        var d;
        try {
            (d = m.current) == null || d.stop()
        } catch {}
        m.current = null,
        c(!1)
    }
      , x = () => {
        const d = za();
        if (!d) {
            h("Voice input is not supported in this browser. Try Chrome on desktop or Android."),
            z("error");
            return
        }
        h(null);
        const p = new d;
        p.lang = "en-US",
        p.interimResults = !0,
        p.continuous = !1;
        let f = "";
        p.onresult = v => {
            for (let N = 0; N < v.results.length; N++) {
                const E = v.results[N][0].transcript;
                f += E
            }
            s(f.trim())
        }
        ,
        p.onerror = () => {
            h("Could not hear you clearly. Check your microphone and try again."),
            c(!1),
            z("error")
        }
        ,
        p.onend = () => {
            c(!1),
            m.current = null
        }
        ,
        m.current = p,
        c(!0),
        z("click");
        try {
            p.start()
        } catch {
            c(!1)
        }
    }
      , j = d => {
        const p = d.trim();
        if (!p || l)
            return;
        z("click"),
        n(N => [...N, {
            role: "user",
            text: p
        }]),
        s(""),
        i(!0);
        const f = Ih(p)
          , v = Math.min(1600, 500 + f.answer.length * 4);
        setTimeout( () => {
            z(f.offTopic ? "error" : "success"),
            i(!1),
            n(N => [...N, {
                role: "ai",
                text: f.answer,
                offTopic: f.offTopic
            }])
        }
        , v)
    }
    ;
    return o.jsx("section", {
        id: "assistant",
        className: "relative min-h-screen px-4 py-28 pb-32 sm:px-6",
        children: o.jsxs("div", {
            ref: e,
            className: "reveal mx-auto max-w-5xl",
            children: [o.jsx(ge, {
                icon: o.jsx(ws, {
                    className: "h-5 w-5"
                }),
                kicker: "AI ASSISTANT",
                title: "CyberGuard AI",
                subtitle: "Ask any cyber security question and get a simple, student-friendly answer. I only help with cyber security topics."
            }), o.jsxs("div", {
                className: "mt-8 grid gap-6 lg:grid-cols-[1fr_280px]",
                children: [o.jsxs("div", {
                    className: "glass-strong flex h-[34rem] flex-col overflow-hidden rounded-2xl",
                    children: [o.jsxs("div", {
                        className: "flex items-center gap-3 border-b border-cyber-cyan/20 bg-cyber-cyan/5 px-4 py-3",
                        children: [o.jsxs("div", {
                            className: "relative",
                            children: [o.jsx("div", {
                                className: "grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-cyber-cyan to-cyber-purple",
                                children: o.jsx(po, {
                                    className: "h-5 w-5 text-cyber-black"
                                })
                            }), o.jsx("span", {
                                className: "absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-cyber-panel bg-cyber-green"
                            })]
                        }), o.jsxs("div", {
                            children: [o.jsx("p", {
                                className: "font-orbitron text-sm text-white",
                                children: "CyberGuard AI"
                            }), o.jsx("p", {
                                className: "font-mono text-[10px] text-cyber-green",
                                children: "● online • secure channel"
                            })]
                        })]
                    }), o.jsxs("div", {
                        ref: y,
                        className: "flex-1 space-y-3 overflow-y-auto px-4 py-4",
                        children: [t.map( (d, p) => o.jsx(Oh, {
                            msg: d
                        }, p)), l && o.jsxs("div", {
                            className: "flex items-center gap-2 text-slate-400",
                            children: [o.jsx("div", {
                                className: "grid h-8 w-8 place-items-center rounded-full bg-cyber-cyan/20",
                                children: o.jsx(po, {
                                    className: "h-4 w-4 text-cyber-cyan"
                                })
                            }), o.jsxs("div", {
                                className: "flex gap-1",
                                children: [o.jsx(gl, {
                                    d: "0s"
                                }), o.jsx(gl, {
                                    d: "0.2s"
                                }), o.jsx(gl, {
                                    d: "0.4s"
                                })]
                            })]
                        })]
                    }), o.jsxs("form", {
                        onSubmit: d => {
                            d.preventDefault(),
                            a && g(),
                            j(r)
                        }
                        ,
                        className: "flex flex-col gap-2 border-t border-cyber-cyan/20 p-3",
                        children: [u && o.jsxs("p", {
                            className: "animate-fade-in rounded-md border border-cyber-amber/40 bg-cyber-amber/10 px-3 py-1.5 font-mono text-[11px] text-cyber-amber",
                            children: ["⚠ ", u]
                        }), a && o.jsx("p", {
                            className: "animate-fade-in rounded-md border border-cyber-red/40 bg-cyber-red/10 px-3 py-1.5 font-mono text-[11px] text-cyber-red",
                            children: "🎙 Listening... speak your cyber security question"
                        }), o.jsxs("div", {
                            className: "flex items-center gap-2",
                            children: [o.jsx("input", {
                                value: r,
                                onChange: d => s(d.target.value),
                                placeholder: "Ask about phishing, passwords, VPNs...",
                                className: "input-cyber flex-1"
                            }), o.jsx("button", {
                                type: "button",
                                onClick: () => a ? g() : x(),
                                disabled: !w,
                                title: w ? "Speak your question" : "Voice input not supported in this browser",
                                "aria-label": a ? "Stop listening" : "Start voice input",
                                className: `flex items-center justify-center rounded-lg border px-3 py-2 transition disabled:cursor-not-allowed disabled:opacity-40 ${a ? "border-cyber-red bg-cyber-red/20 text-cyber-red animate-pulse-glow" : "border-cyber-cyan/50 text-cyber-cyan hover:border-cyber-cyan hover:bg-cyber-cyan/10"}`,
                                children: a ? o.jsx(uh, {
                                    className: "h-4 w-4"
                                }) : o.jsx(dh, {
                                    className: "h-4 w-4"
                                })
                            }), o.jsx("button", {
                                type: "submit",
                                className: "btn-cyber flex items-center gap-1 px-3 py-2",
                                disabled: !r.trim(),
                                children: o.jsx(hh, {
                                    className: "h-4 w-4"
                                })
                            })]
                        })]
                    })]
                }), o.jsxs("div", {
                    className: "space-y-3",
                    children: [o.jsxs("div", {
                        className: "glass rounded-2xl p-4",
                        children: [o.jsxs("p", {
                            className: "mb-3 flex items-center gap-2 font-orbitron text-sm text-cyber-cyan",
                            children: [o.jsx(yh, {
                                className: "h-4 w-4"
                            }), " Suggested topics"]
                        }), o.jsx("div", {
                            className: "flex flex-col gap-2",
                            children: Ah.map(d => o.jsx("button", {
                                onClick: () => j(d),
                                className: "rounded-lg border border-cyber-cyan/20 bg-cyber-deep/40 px-3 py-2 text-left text-xs text-slate-300 transition hover:border-cyber-cyan/60 hover:text-cyber-cyan",
                                children: d
                            }, d))
                        })]
                    }), o.jsxs("div", {
                        className: "glass rounded-2xl p-4 font-mono text-[11px] leading-relaxed text-slate-400",
                        children: [o.jsx("p", {
                            className: "mb-1 text-cyber-amber",
                            children: "⚠ Scope notice"
                        }), fd]
                    }), o.jsxs("div", {
                        className: "glass rounded-2xl p-4 font-mono text-[11px] leading-relaxed text-slate-400",
                        children: [o.jsx("p", {
                            className: "mb-1 text-cyber-cyan",
                            children: "🎙 Voice input"
                        }), w ? "Tap the mic next to the text box and speak your question. Your voice is processed by your browser only." : "Voice input is not available in this browser. Try Chrome on desktop or Android."]
                    })]
                })]
            })]
        })
    })
}
function Oh({msg: e}) {
    const t = e.role === "user";
    return o.jsxs("div", {
        className: `flex gap-2 ${t ? "flex-row-reverse" : ""}`,
        children: [o.jsx("div", {
            className: `grid h-8 w-8 shrink-0 place-items-center rounded-full ${t ? "bg-cyber-purple/30" : "bg-gradient-to-br from-cyber-cyan to-cyber-purple"}`,
            children: t ? o.jsx(wh, {
                className: "h-4 w-4 text-white"
            }) : o.jsx(po, {
                className: "h-4 w-4 text-cyber-black"
            })
        }), o.jsx("div", {
            className: `max-w-[80%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm ${t ? "bg-cyber-purple/20 text-white" : e.offTopic ? "border border-cyber-amber/40 bg-cyber-amber/10 text-cyber-amber" : "border border-cyber-cyan/20 bg-cyber-deep/60 text-slate-200"}`,
            children: e.text
        })]
    })
}
function gl({d: e}) {
    return o.jsx("span", {
        className: "h-2 w-2 animate-bounce rounded-full bg-cyber-cyan",
        style: {
            animationDelay: e
        }
    })
}
function ge({icon: e, kicker: t, title: n, subtitle: r}) {
    return o.jsxs("div", {
        className: "text-center",
        children: [o.jsxs("div", {
            className: "mb-3 inline-flex items-center gap-2 rounded-full border border-cyber-cyan/30 bg-cyber-cyan/5 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-cyber-cyan",
            children: [e, " ", t]
        }), o.jsx("h2", {
            className: "section-title text-3xl text-white sm:text-4xl",
            children: o.jsx("span", {
                className: "neon-text text-cyber-cyan",
                children: n
            })
        }), r && o.jsx("p", {
            className: "mx-auto mt-3 max-w-2xl text-sm text-slate-300 sm:text-base",
            children: r
        })]
    })
}
const $e = [{
    q: "What is phishing?",
    options: ["A type of computer virus", "A fake message tricking you into sharing private info", "A method to speed up your internet", "A kind of firewall"],
    answer: 1,
    explain: "Phishing uses fake emails or websites to trick people into giving away passwords, OTPs, or bank details."
}, {
    q: "Which password is the strongest?",
    options: ["password123", "MyDog2010", "P@ssw0rd", "B7$kQ!9mZ#2x"],
    answer: 3,
    explain: "Long, random passwords with a mix of upper, lower, numbers, and symbols are hardest to crack."
}, {
    q: "What does 2FA stand for?",
    options: ["Two-Factor Authentication", "Two Free Accounts", "Two-File Access", "Two-Form Attack"],
    answer: 0,
    explain: "Two-Factor Authentication adds a second step (like an OTP) so a stolen password alone is not enough."
}, {
    q: "Ransomware is malware that…",
    options: ["Speeds up your computer", "Encrypts your files and demands money", "Cleans your browser", "Updates your antivirus"],
    answer: 1,
    explain: "Ransomware locks/encrypts your files and asks for payment to unlock them. Regular backups defeat it."
}, {
    q: "A safe website URL should start with…",
    options: ["http://", "https://", "ftp://", "www."],
    answer: 1,
    explain: 'The "s" in https means the connection is encrypted. Always check before entering passwords.'
}, {
    q: "Public WiFi is risky because…",
    options: ["It is always slow", "Others on the same network can spy on your data", "It uses more battery", "It blocks websites"],
    answer: 1,
    explain: "On open public WiFi, attackers can intercept unencrypted traffic. Use a VPN or avoid sensitive logins."
}, {
    q: "Social engineering attacks mainly target…",
    options: ["Hardware", "Software bugs", "Human trust and behaviour", "Internet cables"],
    answer: 2,
    explain: "Social engineering manipulates people — not machines — into breaking security rules."
}, {
    q: "What is a VPN used for?",
    options: ["To make your computer faster", "To encrypt your internet connection and hide your IP", "To download more files", "To block ads only"],
    answer: 1,
    explain: "A VPN creates an encrypted tunnel, protecting your data and hiding your real location."
}, {
    q: "Which is a sign of a phishing email?",
    options: ["A greeting with your full name from a known service", "Urgent threats and spelling mistakes asking for passwords", "An email from your saved contact", "A newsletter you subscribed to"],
    answer: 1,
    explain: "Urgency, threats, bad grammar, and requests for passwords/OTPs are classic phishing signs."
}, {
    q: "Encryption is the process of…",
    options: ["Deleting files", "Scrambling data so only authorised people can read it", "Compressing videos", "Speeding up WiFi"],
    answer: 1,
    explain: "Encryption turns readable data into coded form using a key. Only someone with the key can decode it."
}, {
    q: 'A "digital footprint" is…',
    options: ["The size of your hard drive", "The trail of data you leave online", "A type of computer virus", "The speed of your internet"],
    answer: 1,
    explain: "Every post, search, and login adds to your digital footprint. Think before you share."
}, {
    q: "Which is safest for passwords?",
    options: ["Writing them on a sticky note", "Using the same one everywhere", "A reputable password manager", "Sharing them with friends"],
    answer: 2,
    explain: "A password manager creates and remembers strong, unique passwords for every account."
}, {
    q: "An OTP should be…",
    options: ["Shared with anyone who asks", "Kept private, never shared", "Posted on social media", "Emailed to friends"],
    answer: 1,
    explain: "An OTP (one-time password) is a secret. No real company will ever ask you to share it."
}, {
    q: "A firewall is used to…",
    options: ["Cool your computer", "Block or allow network traffic based on rules", "Print documents", "Charge your phone"],
    answer: 1,
    explain: "A firewall monitors incoming and outgoing traffic and blocks suspicious connections."
}, {
    q: "Ethical hacking is…",
    options: ["Hacking for fun", "Hacking with permission to find and fix weaknesses", "Stealing data", "Deleting files"],
    answer: 1,
    explain: "Ethical (white-hat) hackers are hired to find vulnerabilities so they can be fixed before criminals exploit them."
}, {
    q: "The Morris Worm (1988) is famous for being…",
    options: ["The first major internet worm", "The first antivirus", "The first VPN", "The first browser"],
    answer: 0,
    explain: "The Morris Worm was one of the first worms spread across the internet, raising awareness of cyber security."
}, {
    q: "Updating software regularly is important because updates…",
    options: ["Slow your device", "Fix security holes and bugs", "Delete your photos", "Use more internet"],
    answer: 1,
    explain: "Updates patch vulnerabilities that attackers could exploit. Install them promptly."
}, {
    q: "Identity theft means…",
    options: ["Losing your phone", "Someone stealing your personal info to impersonate you", "Forgetting your password", "Breaking your laptop"],
    answer: 1,
    explain: "Identity theft uses stolen data (name, ID, bank) to commit fraud. Guard your personal details."
}, {
    q: 'If a popup says "Your phone has 5 viruses! Click to clean!" you should…',
    options: ["Click it immediately", "Close it — it is a scam", "Share it with friends", "Pay for the cleaner"],
    answer: 1,
    explain: "Fake virus popups create panic to push you into installing malware or paying. Just close the tab."
}, {
    q: "A good habit for online accounts is…",
    options: ["Reuse one password", "Use unique passwords + 2FA everywhere", "Save passwords in browser notes", "Disable all security"],
    answer: 1,
    explain: "Unique passwords plus 2FA means a single breach cannot unlock your other accounts."
}]
  , La = [{
    from: "security@paypaI-service.com",
    subject: "Urgent: Your account will be closed in 24 hours!",
    body: "Dear costumer, we detected suspisious activity on your account. Click here http://paypai-verify.tk to verify your identity now or your account will be PERMANENTLY closed. Do not ignore this warning!!!",
    isPhishing: !0,
    reasons: ['Sender uses a capital "I" instead of "l" (paypaI) to look like PayPal.', 'Urgent threat ("24 hours", "PERMANENTLY closed") to create panic.', 'Spelling mistakes: "costumer", "suspisious".', "Suspicious link ending in .tk instead of paypal.com."]
}, {
    from: "noreply@github.com",
    subject: "New sign-in to your account",
    body: "Hi, we noticed a new sign-in to your GitHub account from a MacBook in London, UK on July 26. If this was you, no action is needed. If not, please review your account security.",
    isPhishing: !1,
    reasons: ["Real GitHub domain (github.com).", "No request for password or OTP.", "No urgent threats or suspicious links.", "Clear, correct English with no pressure."]
}, {
    from: "winner@lottery-international.xyz",
    subject: "CONGRATULATIONS!!! You won $850,000 USD",
    body: "You have been selected as winner of the Microsoft International Lottery 2024!!! To claim your prize send your full name, bank details, and a $250 processing fee to claims@lottery-international.xyz.",
    isPhishing: !0,
    reasons: ["You did not enter any lottery — too good to be true.", 'Asks for bank details and an upfront "processing fee".', "Free .xyz domain pretending to be Microsoft.", "Excessive exclamation marks and pressure."]
}, {
    from: "hr@yourcompany.com",
    subject: "Payslip for July 2024",
    body: "Hello, please find attached your payslip for July 2024. The file is password protected with your employee ID as shown in the portal. Let me know if you have any questions.",
    isPhishing: !1,
    reasons: ["Sent from a known internal company address.", "No request for credentials or money.", "Normal tone, no urgency or threats.", "References real internal systems."]
}, {
    from: "support@amaz0n-secure.com",
    subject: "Order #88421 suspended — confirm delivery",
    body: "Dear buyer, your recent order is suspended due to payment verification failure. Confirm your card details and billing address within 2 hours or the order will be cancelled: http://amaz0n-secure.com/verify",
    isPhishing: !0,
    reasons: ['"amaz0n" uses a zero instead of the letter "o".', "Fake domain (amaz0n-secure.com) is not amazon.com.", "Asks for card and billing details via a link.", "Artificial 2-hour deadline to pressure you."]
}, {
    from: "newsletter@bookstore.com",
    subject: "July picks: 3 new sci-fi releases",
    body: "Hi reader, here are our top 3 new sci-fi releases this month. Tap any title to read a sample chapter. You are receiving this because you opted in at checkout. Unsubscribe anytime at the bottom.",
    isPhishing: !1,
    reasons: ["Legitimate newsletter you opted into.", "No request for passwords or payment.", "Includes an unsubscribe option.", "Plain, honest language with no threats."]
}]
  , Ia = [{
    name: "Fake Bank Login",
    url: "www.bank-secure-login.tk",
    https: !1,
    prompt: "Find every suspicious element on this fake banking page.",
    suspects: [{
        id: "url",
        label: "Fake URL",
        detail: ".tk domains and hyphenated names are common in phishing."
    }, {
        id: "http",
        label: "No HTTPS",
        detail: "Real banks always use a padlock (https). This one does not."
    }, {
        id: "popup",
        label: "Popup offer",
        detail: '"Win an iPhone" popups never appear on real bank sites.'
    }, {
        id: "grammar",
        label: "Grammar error",
        detail: '"Kindly fill you details" — banks do not write like this.'
    }, {
        id: "offer",
        label: "Scam offer",
        detail: '"Verify and get $500 free" — banks do not give away money.'
    }]
}, {
    name: "Fake Shopping Site",
    url: "amaz0n-deals.shop",
    https: !0,
    prompt: "This site looks like a real shop but is not. Spot the red flags.",
    suspects: [{
        id: "url",
        label: "Fake URL",
        detail: '"amaz0n" uses a zero. Real Amazon is amazon.com.'
    }, {
        id: "offer",
        label: "Too-good price",
        detail: "A $1200 phone for $49 is a classic scam price."
    }, {
        id: "grammar",
        label: "Grammar error",
        detail: '"Shiping in 2 day" — poor spelling on a "global" store.'
    }, {
        id: "popup",
        label: "Fake popup",
        detail: '"You are visitor 1,000,000!" popups are always scams.'
    }, {
        id: "login",
        label: "Fake login",
        detail: "Login form steals credentials for the real Amazon."
    }]
}, {
    name: "Fake Prize Email Link",
    url: "claim-your-prize.win",
    https: !1,
    prompt: 'You clicked a "you won" link. What is wrong with this landing page?',
    suspects: [{
        id: "url",
        label: "Fake URL",
        detail: ".win domains are heavily used for prize scams."
    }, {
        id: "http",
        label: "No HTTPS",
        detail: "No padlock means data can be intercepted."
    }, {
        id: "offer",
        label: "Scam offer",
        detail: "You did not enter a contest — the prize is fake."
    }, {
        id: "popup",
        label: "Pressure popup",
        detail: '"Claim in 5 minutes!" is designed to make you panic.'
    }, {
        id: "grammar",
        label: "Grammar error",
        detail: '"You has been selected" is broken English.'
    }]
}]
  , Aa = [{
    year: "1988",
    title: "Morris Worm",
    text: "One of the first internet worms, infecting ~10% of computers online. It showed how fast malware could spread."
}, {
    year: "2000",
    title: "ILOVEYOU",
    text: 'A "love letter" email worm infected millions of PCs in hours, causing billions in damage worldwide.'
}, {
    year: "2017",
    title: "WannaCry",
    text: "Ransomware that hit 200,000+ computers in 150 countries, including hospitals, by locking files for ransom."
}, {
    year: "2020",
    title: "SolarWinds",
    text: "A supply-chain attack slipped malware into trusted software updates, compromising major firms and governments."
}, {
    year: "2024+",
    title: "Modern AI Cyber Threats",
    text: "AI now powers deepfake scams, automated phishing, and smart malware — while defenders also use AI to detect them."
}]
  , Le = [{
    name: "Network Security",
    color: "#22d3ee",
    info: "Protecting data as it travels across networks.",
    points: ["Firewalls filter traffic", "Intrusion detection systems", "Secure Wi-Fi (WPA2/WPA3)"]
}, {
    name: "Cloud Security",
    color: "#a855f7",
    info: "Keeping data safe when stored on cloud services.",
    points: ["Strong account passwords + 2FA", "Encryption at rest and in transit", "Shared responsibility with provider"]
}, {
    name: "Password Safety",
    color: "#34d399",
    info: "Creating and managing passwords that resist cracking.",
    points: ["Length beats complexity", "Unique password per account", "Use a password manager"]
}, {
    name: "Malware",
    color: "#f43f5e",
    info: "Malicious software that harms or spies on devices.",
    points: ["Viruses, worms, trojans, spyware", "Spread via downloads and links", "Antivirus + updates stop most"]
}, {
    name: "Phishing",
    color: "#fbbf24",
    info: "Fake messages that trick people into giving up data.",
    points: ["Check sender and links", "Beware urgency and threats", "Never share OTPs"]
}, {
    name: "Firewalls",
    color: "#22d3ee",
    info: "Barriers that control traffic in and out of a network.",
    points: ["Hardware or software based", "Block suspicious connections", "First line of defense"]
}, {
    name: "Encryption",
    color: "#a855f7",
    info: "Scrambling data so only authorised people can read it.",
    points: ["Uses secret keys", "Protects messages and files", "Backbone of HTTPS and VPNs"]
}, {
    name: "Antivirus",
    color: "#34d399",
    info: "Software that detects and removes malicious programs.",
    points: ["Scans files in real time", "Heuristic + signature detection", "Keep definitions updated"]
}, {
    name: "VPN",
    color: "#22d3ee",
    info: "Encrypted tunnel that protects your internet connection.",
    points: ["Hides your IP address", "Secures data on public WiFi", "Bypasses some restrictions"]
}, {
    name: "Social Engineering",
    color: "#fbbf24",
    info: "Tricking people — not machines — into breaking rules.",
    points: ["Pretexting and baiting", "Phone and in-person scams", "Verify before you trust"]
}, {
    name: "Ethical Hacking",
    color: "#34d399",
    info: "Hacking with permission to find and fix weaknesses.",
    points: ["White-hat hackers", "Penetration testing", "Bounty programs"]
}, {
    name: "Cyber Laws",
    color: "#a855f7",
    info: "Legal rules that govern cyber crime and data protection.",
    points: ["Punish hacking and fraud", "Protect personal data", "Vary by country"]
}]
  , Ar = ['Never share your OTP with anyone — not even "support".', "Always hover over a link to check the real address before clicking.", "Use a long, unique password for every important account.", "Enable Two-Factor Authentication wherever it is offered.", "Update your software regularly to close security holes.", "Avoid public WiFi for banking or logging into accounts.", "Lock your phone with a PIN, fingerprint, or face unlock.", "Back up important files so ransomware cannot hold them hostage.", 'Check the URL for "https" and a padlock before entering passwords.', "Do not install apps from outside the official app store.", "Log out of accounts on shared or public computers.", "Think before you post — your digital footprint is permanent."]
  , Dh = [{
    id: "pwmaster",
    name: "Password Master",
    icon: "key",
    hint: "Generate a strong password"
}, {
    id: "phishhunter",
    name: "Phishing Hunter",
    icon: "fish",
    hint: "Catch 3 phishing emails"
}, {
    id: "defender",
    name: "Cyber Defender",
    icon: "shield",
    hint: "Complete the checklist"
}, {
    id: "expert",
    name: "Security Expert",
    icon: "brain",
    hint: "Score 80%+ on the quiz"
}, {
    id: "quizchamp",
    name: "Quiz Champion",
    icon: "trophy",
    hint: "Finish all 20 quiz questions"
}]
  , Uh = [{
    label: "Cyber attacks detected today",
    base: 184320,
    perSec: 23,
    icon: "activity"
}, {
    label: "Phishing attempts blocked",
    base: 96240,
    perSec: 18,
    icon: "mail"
}, {
    label: "Malware samples blocked",
    base: 51190,
    perSec: 11,
    icon: "bug"
}, {
    label: "Passwords leaked in breaches",
    base: 7845,
    perSec: 7,
    icon: "key"
}]
  , hd = "cyber-badges"
  , yo = new Set;
let Et = new Set($h());
function $h() {
    try {
        const e = localStorage.getItem(hd);
        return e ? JSON.parse(e) : []
    } catch {
        return []
    }
}
function Wh() {
    try {
        localStorage.setItem(hd, JSON.stringify([...Et]))
    } catch {}
    yo.forEach(e => e(Et))
}
function Ds() {
    const [e,t] = b.useState(Et);
    return b.useEffect( () => {
        const n = r => t(new Set(r));
        return yo.add(n),
        () => {
            yo.delete(n)
        }
    }
    , []),
    {
        unlocked: e,
        unlock: n => {
            Et.has(n) || (Et = new Set(Et).add(n),
            Wh())
        }
        ,
        isUnlocked: n => Et.has(n)
    }
}
const Hh = Dh
  , Vh = ["password", "123456", "qwerty", "admin", "letmein", "welcome", "iloveyou", "monkey", "dragon", "football", "login", "abc123", "password1", "12345678", "1234567890"];
function Bh(e) {
    const t = e.length
      , n = /[A-Z]/.test(e)
      , r = /[a-z]/.test(e)
      , s = /[0-9]/.test(e)
      , l = /[^A-Za-z0-9]/.test(e)
      , i = e.toLowerCase()
      , a = Vh.find(d => i.includes(d))
      , c = /(.)\1\1/.test(e) || /(.{2,})\1\1/.test(e)
      , u = "0123456789abcdefghijklmnopqrstuvwxyz";
    let h = !1;
    for (let d = 0; d + 3 <= i.length; d++) {
        const p = i.slice(d, d + 4);
        if (u.includes(p) || u.includes(p.split("").reverse().join(""))) {
            h = !0;
            break
        }
    }
    let y = 0;
    n && (y += 26),
    r && (y += 26),
    s && (y += 10),
    l && (y += 33),
    y === 0 && (y = 1);
    const w = Math.pow(y, t) / 2 / 1e10
      , g = qh(w);
    let x = 0;
    t >= 8 && (x += 1),
    t >= 12 && (x += 1),
    t >= 16 && (x += 1),
    n && r && (x += 1),
    s && (x += 1),
    l && (x += 1),
    a && (x -= 3),
    c && (x -= 1),
    h && (x -= 1),
    t === 0 && (x = 0);
    const j = t === 0 ? {
        label: "—",
        pct: 0,
        color: "#475569",
        crack: "—",
        prob: "—"
    } : x >= 7 ? {
        label: "Excellent",
        pct: 100,
        color: "#34d399",
        crack: g,
        prob: "1%"
    } : x >= 5 ? {
        label: "Strong",
        pct: 82,
        color: "#22d3ee",
        crack: g,
        prob: "10%"
    } : x >= 3 ? {
        label: "Medium",
        pct: 58,
        color: "#fbbf24",
        crack: g,
        prob: "45%"
    } : x >= 1 ? {
        label: "Weak",
        pct: 34,
        color: "#f97316",
        crack: g,
        prob: "80%"
    } : {
        label: "Very Weak",
        pct: 14,
        color: "#f43f5e",
        crack: g,
        prob: "99%"
    };
    return {
        len: t,
        hasUpper: n,
        hasLower: r,
        hasNum: s,
        hasSym: l,
        commonHit: a,
        repeated: c,
        seqHit: h,
        level: j
    }
}
function qh(e) {
    if (!isFinite(e) || e <= 0)
        return "0 seconds";
    if (e < 1)
        return "Instantly";
    if (e < 60)
        return `${Math.round(e)} seconds`;
    if (e < 3600)
        return `${Math.round(e / 60)} minutes`;
    if (e < 86400)
        return `${Math.round(e / 3600)} hours`;
    if (e < 31536e3)
        return `${Math.round(e / 86400)} days`;
    const t = e / 31536e3;
    return t < 1e3 ? `${Math.round(t)} years` : t < 1e6 ? `${Math.round(t / 1e3)} thousand years` : t < 1e9 ? `${Math.round(t / 1e6)} million years` : t < 1e12 ? `${Math.round(t / 1e9)} billion years` : "10 Billion+ Years"
}
function Qh() {
    const e = Me()
      , [t,n] = b.useState("")
      , [r,s] = b.useState(!1)
      , [l,i] = b.useState(!1)
      , {unlock: a} = Ds()
      , c = b.useRef(!1)
      , u = b.useMemo( () => Bh(t), [t])
      , h = u.level.label === "Excellent"
      , y = u.level.label === "Very Weak" || u.level.label === "Weak"
      , m = [{
        ok: u.len >= 12,
        label: "At least 12 characters"
    }, {
        ok: u.hasUpper,
        label: "Uppercase letter"
    }, {
        ok: u.hasLower,
        label: "Lowercase letter"
    }, {
        ok: u.hasNum,
        label: "Number"
    }, {
        ok: u.hasSym,
        label: "Symbol"
    }, {
        ok: !u.commonHit,
        label: "No common word"
    }, {
        ok: !u.repeated,
        label: "No repeated patterns"
    }, {
        ok: !u.seqHit,
        label: "No simple sequences"
    }]
      , w = async () => {
        if (t)
            try {
                await navigator.clipboard.writeText(t),
                i(!0),
                z("success"),
                setTimeout( () => i(!1), 1500)
            } catch {}
    }
    ;
    return o.jsx("section", {
        id: "password-checker",
        className: "relative min-h-screen px-4 py-28 pb-32 sm:px-6",
        children: o.jsxs("div", {
            ref: e,
            className: "reveal mx-auto max-w-4xl",
            children: [o.jsx(ge, {
                icon: o.jsx($t, {
                    className: "h-5 w-5"
                }),
                kicker: "LIVE TOOL",
                title: "Password Strength Checker",
                subtitle: "Type any password to see how strong it is, how long a hacker would need to crack it, and the chance of being cracked. Nothing leaves your device."
            }), o.jsxs("div", {
                className: "mt-8 glass-strong rounded-2xl p-5 sm:p-7",
                children: [o.jsx("label", {
                    className: "mb-2 block font-mono text-xs uppercase tracking-widest text-cyber-cyan",
                    children: "Enter a password"
                }), o.jsxs("div", {
                    className: "flex items-stretch gap-2",
                    children: [o.jsxs("div", {
                        className: "relative flex-1",
                        children: [o.jsx("input", {
                            type: r ? "text" : "password",
                            value: t,
                            onChange: g => {
                                n(g.target.value),
                                g.target.value.length > 0 && z("type")
                            }
                            ,
                            placeholder: "Try: P@ssw0rd or B7$kQ!9mZ#2x",
                            className: "input-cyber pr-20 font-mono",
                            autoComplete: "off",
                            spellCheck: !1
                        }), o.jsxs("div", {
                            className: "absolute right-2 top-1/2 flex -translate-y-1/2 gap-1",
                            children: [o.jsx("button", {
                                onClick: () => s(g => !g),
                                className: "rounded px-2 py-1 font-mono text-[10px] text-cyber-cyan hover:bg-cyber-cyan/10",
                                type: "button",
                                children: r ? "HIDE" : "SHOW"
                            }), o.jsx("button", {
                                onClick: w,
                                className: "rounded px-1.5 py-1 text-cyber-cyan hover:bg-cyber-cyan/10",
                                type: "button",
                                "aria-label": "Copy",
                                children: l ? o.jsx(ir, {
                                    className: "h-3.5 w-3.5 text-cyber-green"
                                }) : o.jsx(sd, {
                                    className: "h-3.5 w-3.5"
                                })
                            })]
                        })]
                    }), o.jsx("button", {
                        onClick: () => n(""),
                        className: "btn-ghost px-3",
                        type: "button",
                        "aria-label": "Clear",
                        children: o.jsx(Os, {
                            className: "h-4 w-4"
                        })
                    })]
                }), o.jsxs("div", {
                    className: "mt-6",
                    children: [o.jsxs("div", {
                        className: "mb-2 flex items-center justify-between",
                        children: [o.jsx("span", {
                            className: "font-orbitron text-sm",
                            style: {
                                color: u.level.color
                            },
                            children: u.level.label
                        }), o.jsxs("span", {
                            className: "font-mono text-xs text-slate-400",
                            children: ["Crack probability: ", u.level.prob]
                        })]
                    }), o.jsx("div", {
                        className: "h-3 overflow-hidden rounded-full bg-cyber-deep",
                        children: o.jsx("div", {
                            className: "h-full rounded-full transition-all duration-500",
                            style: {
                                width: `${u.level.pct}%`,
                                background: `linear-gradient(90deg, ${u.level.color}, ${u.level.color}cc)`,
                                boxShadow: `0 0 14px ${u.level.color}99`
                            }
                        })
                    }), o.jsxs("div", {
                        className: "mt-1 flex justify-between font-mono text-[10px] text-slate-500",
                        children: [o.jsx("span", {
                            children: "Very Weak"
                        }), o.jsx("span", {
                            children: "Weak"
                        }), o.jsx("span", {
                            children: "Medium"
                        }), o.jsx("span", {
                            children: "Strong"
                        }), o.jsx("span", {
                            children: "Excellent"
                        })]
                    })]
                }), o.jsxs("div", {
                    className: "mt-5 grid gap-3 sm:grid-cols-2",
                    children: [o.jsxs("div", {
                        className: "glass rounded-xl p-4",
                        children: [o.jsx("p", {
                            className: "font-mono text-[10px] uppercase tracking-widest text-slate-400",
                            children: "Estimated Hacker Cracking Time"
                        }), o.jsx("p", {
                            className: "mt-1 font-orbitron text-xl",
                            style: {
                                color: u.level.color
                            },
                            children: u.level.crack
                        })]
                    }), o.jsxs("div", {
                        className: "glass rounded-xl p-4",
                        children: [o.jsx("p", {
                            className: "font-mono text-[10px] uppercase tracking-widest text-slate-400",
                            children: "Crack Probability"
                        }), o.jsx("p", {
                            className: "mt-1 font-orbitron text-xl",
                            style: {
                                color: u.level.color
                            },
                            children: u.level.prob
                        })]
                    })]
                }), o.jsx("div", {
                    className: "mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4",
                    children: m.map(g => o.jsxs("div", {
                        className: `flex items-center gap-2 rounded-lg border px-3 py-2 text-xs transition ${g.ok ? "border-cyber-green/40 bg-cyber-green/10 text-cyber-green" : "border-slate-700 bg-slate-900/40 text-slate-500"}`,
                        children: [g.ok ? o.jsx(ir, {
                            className: "h-3.5 w-3.5 shrink-0"
                        }) : o.jsx(hr, {
                            className: "h-3.5 w-3.5 shrink-0"
                        }), o.jsx("span", {
                            className: "leading-tight",
                            children: g.label
                        })]
                    }, g.label))
                }), t.length > 0 && o.jsxs("div", {
                    className: "mt-5",
                    children: [h && o.jsx(Yh, {
                        onShown: () => {
                            c.current || (c.current = !0,
                            a("pwmaster"))
                        }
                    }), y && o.jsx(Kh, {}), u.commonHit && o.jsxs("p", {
                        className: "mt-2 font-mono text-xs text-cyber-amber",
                        children: ['⚠ Contains the common word "', u.commonHit, '" — easily guessed.']
                    }), u.seqHit && o.jsx("p", {
                        className: "mt-1 font-mono text-xs text-cyber-amber",
                        children: '⚠ Contains a simple sequence (like "abcd" or "1234").'
                    })]
                })]
            }), o.jsx("p", {
                className: "mt-3 text-center font-mono text-[10px] text-slate-500",
                children: "🔒 Your password is analysed only inside your browser. It is never sent anywhere."
            })]
        })
    })
}
function Yh({onShown: e}) {
    return b.useEffect( () => {
        e()
    }
    , [e]),
    o.jsxs("div", {
        className: "animate-fade-up flex items-center gap-3 rounded-xl border border-cyber-green/50 bg-cyber-green/10 p-4",
        children: [o.jsx(Ot, {
            className: "h-8 w-8 shrink-0 text-cyber-green drop-shadow-[0_0_10px_rgba(52,211,153,0.8)]"
        }), o.jsxs("div", {
            children: [o.jsx("p", {
                className: "font-orbitron text-lg text-cyber-green",
                children: "🎉 Congratulations!"
            }), o.jsx("p", {
                className: "text-sm text-cyber-green/90",
                children: "This password is extremely difficult to crack. Great job!"
            })]
        })]
    })
}
function Kh() {
    return o.jsxs("div", {
        className: "animate-fade-up flex items-center gap-3 rounded-xl border border-cyber-red/50 bg-cyber-red/10 p-4",
        children: [o.jsx(mi, {
            className: "h-8 w-8 shrink-0 text-cyber-red drop-shadow-[0_0_10px_rgba(244,63,94,0.8)]"
        }), o.jsxs("div", {
            children: [o.jsx("p", {
                className: "font-orbitron text-lg text-cyber-red",
                children: "⚠ Warning"
            }), o.jsx("p", {
                className: "text-sm text-cyber-red/90",
                children: "Your password can be cracked very quickly. Improve it."
            })]
        })]
    })
}
function Ra(e) {
    const t = [...e];
    for (let n = t.length - 1; n > 0; n--) {
        const r = Math.floor(Math.random() * (n + 1));
        [t[n],t[r]] = [t[r], t[n]]
    }
    return t
}
function Gh() {
    const e = Me()
      , [t,n] = b.useState( () => Ra(La))
      , [r,s] = b.useState(0)
      , [l,i] = b.useState(null)
      , [a,c] = b.useState(0)
      , {unlock: u} = Ds()
      , h = t[r]
      , y = b.useCallback(j => {
        if (l !== null)
            return;
        i(j);
        const d = j === h.isPhishing;
        if (z(d ? "success" : "error"),
        d) {
            const p = a + 1;
            c(p),
            p >= 3 && u("phishhunter")
        }
    }
    , [l, h, a, u])
      , m = () => {
        z("click"),
        i(null),
        s(j => (j + 1) % t.length)
    }
      , w = () => {
        z("click"),
        n(Ra(La)),
        s(0),
        i(null),
        c(0)
    }
      , g = l !== null
      , x = g && l === h.isPhishing;
    return o.jsx("section", {
        id: "phishing",
        className: "relative min-h-screen px-4 py-28 pb-32 sm:px-6",
        children: o.jsxs("div", {
            ref: e,
            className: "reveal mx-auto max-w-3xl",
            children: [o.jsx(ge, {
                icon: o.jsx(fr, {
                    className: "h-5 w-5"
                }),
                kicker: "INTERACTIVE",
                title: "Phishing Email Detector",
                subtitle: "Read each email carefully, then decide: is it Safe or Phishing? You get an instant explanation."
            }), o.jsxs("div", {
                className: "mt-8 glass-strong overflow-hidden rounded-2xl",
                children: [o.jsxs("div", {
                    className: "flex items-center justify-between border-b border-cyber-cyan/20 bg-cyber-deep/50 px-4 py-2 font-mono text-xs text-slate-400",
                    children: [o.jsxs("span", {
                        children: ["EMAIL ", r + 1, " / ", t.length]
                    }), o.jsxs("span", {
                        className: "text-cyber-green",
                        children: ["✔ ", a, " correct"]
                    })]
                }), o.jsxs("div", {
                    className: "p-5",
                    children: [o.jsxs("div", {
                        className: "mb-3 grid grid-cols-1 gap-1 border-b border-slate-700 pb-3 text-sm",
                        children: [o.jsxs("div", {
                            className: "flex gap-2",
                            children: [o.jsx("span", {
                                className: "w-16 shrink-0 font-mono text-[11px] text-slate-500",
                                children: "FROM"
                            }), o.jsx("span", {
                                className: "font-mono text-cyber-cyan",
                                children: h.from
                            })]
                        }), o.jsxs("div", {
                            className: "flex gap-2",
                            children: [o.jsx("span", {
                                className: "w-16 shrink-0 font-mono text-[11px] text-slate-500",
                                children: "SUBJECT"
                            }), o.jsx("span", {
                                className: "text-slate-200",
                                children: h.subject
                            })]
                        })]
                    }), o.jsx("p", {
                        className: "whitespace-pre-wrap rounded-lg bg-cyber-deep/40 p-4 text-sm leading-relaxed text-slate-300",
                        children: h.body
                    }), o.jsxs("div", {
                        className: "mt-5 flex flex-wrap gap-3",
                        children: [o.jsxs("button", {
                            onClick: () => y(!1),
                            disabled: g,
                            className: `flex items-center gap-2 rounded-lg border px-5 py-2.5 font-orbitron text-sm transition disabled:opacity-60 ${g && !h.isPhishing ? "border-cyber-green bg-cyber-green/20 text-cyber-green" : "border-cyber-green/50 text-cyber-green hover:bg-cyber-green/10"}`,
                            children: [o.jsx(Ot, {
                                className: "h-4 w-4"
                            }), " Safe"]
                        }), o.jsxs("button", {
                            onClick: () => y(!0),
                            disabled: g,
                            className: `flex items-center gap-2 rounded-lg border px-5 py-2.5 font-orbitron text-sm transition disabled:opacity-60 ${g && h.isPhishing ? "border-cyber-red bg-cyber-red/20 text-cyber-red" : "border-cyber-red/50 text-cyber-red hover:bg-cyber-red/10"}`,
                            children: [o.jsx(mi, {
                                className: "h-4 w-4"
                            }), " Phishing"]
                        })]
                    }), g && o.jsxs("div", {
                        className: `mt-5 animate-fade-up rounded-xl border p-4 ${x ? "border-cyber-green/50 bg-cyber-green/10" : "border-cyber-red/50 bg-cyber-red/10"}`,
                        children: [o.jsxs("div", {
                            className: "mb-2 flex items-center gap-2 font-orbitron text-sm",
                            children: [x ? o.jsx(rd, {
                                className: "h-5 w-5 text-cyber-green"
                            }) : o.jsx(Bf, {
                                className: "h-5 w-5 text-cyber-red"
                            }), o.jsxs("span", {
                                className: x ? "text-cyber-green" : "text-cyber-red",
                                children: [x ? "Correct!" : "Not quite.", " This email is", " ", h.isPhishing ? "PHISHING" : "SAFE", "."]
                            })]
                        }), o.jsx("ul", {
                            className: "space-y-1.5 text-sm text-slate-300",
                            children: h.reasons.map(j => o.jsxs("li", {
                                className: "flex gap-2",
                                children: [o.jsx("span", {
                                    className: h.isPhishing ? "text-cyber-red" : "text-cyber-green",
                                    children: "•"
                                }), o.jsx("span", {
                                    children: j
                                })]
                            }, j))
                        })]
                    }), o.jsxs("div", {
                        className: "mt-5 flex justify-end gap-2",
                        children: [g && o.jsx("button", {
                            onClick: m,
                            className: "btn-cyber flex items-center gap-2 text-sm",
                            children: "Next email →"
                        }), o.jsxs("button", {
                            onClick: w,
                            className: "btn-ghost flex items-center gap-2 text-sm",
                            children: [o.jsx(Os, {
                                className: "h-4 w-4"
                            }), " Reset"]
                        })]
                    })]
                })]
            })]
        })
    })
}
function Xh() {
    const e = Me()
      , [t,n] = b.useState(!1)
      , [r,s] = b.useState(0)
      , [l,i] = b.useState(null)
      , [a,c] = b.useState(0)
      , [u,h] = b.useState([])
      , [y,m] = b.useState(!1)
      , {unlock: w} = Ds()
      , g = $e[r]
      , x = v => {
        if (l !== null)
            return;
        i(v);
        const N = v === g.answer;
        z(N ? "success" : "error"),
        N && c(S => S + 1),
        h(S => [...S, v])
    }
      , j = () => {
        if (z("click"),
        r + 1 < $e.length)
            s(v => v + 1),
            i(null);
        else {
            const v = a;
            m(!0),
            Math.round(v / $e.length * 100) >= 80 && w("expert"),
            w("quizchamp")
        }
    }
      , d = () => {
        z("click"),
        n(!1),
        s(0),
        i(null),
        c(0),
        h([]),
        m(!1)
    }
      , p = Math.round(a / $e.length * 100)
      , f = p >= 70;
    return o.jsx("section", {
        id: "quiz",
        className: "relative min-h-screen px-4 py-28 pb-32 sm:px-6",
        children: o.jsxs("div", {
            ref: e,
            className: "reveal mx-auto max-w-3xl",
            children: [o.jsx(ge, {
                icon: o.jsx(ks, {
                    className: "h-5 w-5"
                }),
                kicker: "TEST YOURSELF",
                title: "Cyber Security Quiz",
                subtitle: "20 questions on phishing, passwords, malware, and more. Score 70%+ to earn the Cyber Awareness Champion certificate."
            }), o.jsxs("div", {
                className: "mt-8 glass-strong rounded-2xl p-5 sm:p-7",
                children: [!t && !y && o.jsxs("div", {
                    className: "text-center",
                    children: [o.jsx("div", {
                        className: "mx-auto mb-5 grid h-20 w-20 place-items-center rounded-2xl bg-gradient-to-br from-cyber-cyan/30 to-cyber-purple/30",
                        children: o.jsx(ks, {
                            className: "h-10 w-10 text-cyber-cyan"
                        })
                    }), o.jsx("p", {
                        className: "mb-1 font-orbitron text-xl text-white",
                        children: "Ready to test your knowledge?"
                    }), o.jsxs("p", {
                        className: "mb-6 text-sm text-slate-300",
                        children: [$e.length, " questions • instant scoring • animated certificate"]
                    }), o.jsx("button", {
                        onClick: () => {
                            z("click"),
                            n(!0)
                        }
                        ,
                        className: "btn-cyber",
                        children: "Start Quiz"
                    })]
                }), t && !y && o.jsxs("div", {
                    children: [o.jsxs("div", {
                        className: "mb-4 flex items-center justify-between",
                        children: [o.jsxs("span", {
                            className: "font-mono text-xs text-cyber-cyan",
                            children: ["Q", r + 1, " / ", $e.length]
                        }), o.jsxs("span", {
                            className: "font-mono text-xs text-cyber-green",
                            children: ["Score: ", a]
                        })]
                    }), o.jsx("div", {
                        className: "mb-5 h-1.5 overflow-hidden rounded-full bg-cyber-deep",
                        children: o.jsx("div", {
                            className: "h-full rounded-full bg-gradient-to-r from-cyber-cyan to-cyber-purple transition-all duration-300",
                            style: {
                                width: `${(r + (l !== null ? 1 : 0)) / $e.length * 100}%`
                            }
                        })
                    }), o.jsx("p", {
                        className: "mb-4 text-lg font-medium text-white",
                        children: g.q
                    }), o.jsx("div", {
                        className: "grid gap-2.5",
                        children: g.options.map( (v, N) => {
                            const S = N === g.answer
                              , E = N === l;
                            let M = "border-cyber-cyan/20 hover:border-cyber-cyan/60 bg-cyber-deep/40 text-slate-200";
                            return l !== null && (S ? M = "border-cyber-green bg-cyber-green/15 text-cyber-green" : E ? M = "border-cyber-red bg-cyber-red/15 text-cyber-red" : M = "border-slate-700 bg-slate-900/30 text-slate-500"),
                            o.jsxs("button", {
                                onClick: () => x(N),
                                disabled: l !== null,
                                className: `flex items-center justify-between rounded-lg border px-4 py-3 text-left text-sm transition ${M}`,
                                children: [o.jsx("span", {
                                    children: v
                                }), l !== null && S && o.jsx(ir, {
                                    className: "h-4 w-4 shrink-0"
                                }), l !== null && E && !S && o.jsx(hr, {
                                    className: "h-4 w-4 shrink-0"
                                })]
                            }, N)
                        }
                        )
                    }), l !== null && o.jsxs("div", {
                        className: "mt-4 animate-fade-up rounded-lg border border-cyber-cyan/20 bg-cyber-deep/50 p-3 text-sm text-slate-300",
                        children: [o.jsx("span", {
                            className: "font-orbitron text-cyber-cyan",
                            children: "Explanation: "
                        }), g.explain]
                    }), o.jsx("div", {
                        className: "mt-5 flex justify-end",
                        children: o.jsxs("button", {
                            onClick: j,
                            disabled: l === null,
                            className: "btn-cyber flex items-center gap-2 disabled:opacity-40",
                            children: [r + 1 < $e.length ? "Next" : "See Results", " ", o.jsx(Zf, {
                                className: "h-4 w-4"
                            })]
                        })
                    })]
                }), y && o.jsxs("div", {
                    className: "text-center",
                    children: [o.jsx("div", {
                        className: "mb-4 flex justify-center",
                        children: o.jsxs("div", {
                            className: `relative ${f ? "animate-float" : ""}`,
                            children: [o.jsx("div", {
                                className: "grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br from-cyber-amber/40 to-cyber-purple/40",
                                children: o.jsx(xh, {
                                    className: "h-12 w-12 text-cyber-amber drop-shadow-[0_0_12px_rgba(251,191,36,0.8)]"
                                })
                            }), f && o.jsxs(o.Fragment, {
                                children: [o.jsx("span", {
                                    className: "absolute -left-3 top-2 animate-float text-2xl",
                                    style: {
                                        animationDelay: "0.4s"
                                    },
                                    children: "✨"
                                }), o.jsx("span", {
                                    className: "absolute -right-3 top-6 animate-float text-2xl",
                                    style: {
                                        animationDelay: "0.8s"
                                    },
                                    children: "✨"
                                })]
                            })]
                        })
                    }), o.jsxs("p", {
                        className: "font-orbitron text-2xl text-white",
                        children: [a, " / ", $e.length]
                    }), o.jsxs("p", {
                        className: "mb-1 font-orbitron text-lg",
                        style: {
                            color: f ? "#34d399" : "#fbbf24"
                        },
                        children: [p, "% ", f ? "— Passed!" : "— Keep practising"]
                    }), f ? o.jsx(Zh, {
                        score: a,
                        total: $e.length,
                        pct: p
                    }) : o.jsx("p", {
                        className: "mt-4 text-sm text-slate-300",
                        children: "You need 70% to earn the certificate. Review the topics and try again!"
                    }), o.jsxs("button", {
                        onClick: d,
                        className: "mt-6 btn-ghost flex items-center gap-2",
                        children: [o.jsx(fi, {
                            className: "h-4 w-4"
                        }), " Retake Quiz"]
                    })]
                })]
            })]
        })
    })
}
function Zh({score: e, total: t, pct: n}) {
    const r = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });
    return o.jsxs("div", {
        className: "mx-auto mt-6 max-w-lg animate-fade-up rounded-2xl border-2 border-cyber-amber/50 bg-gradient-to-br from-cyber-panel to-cyber-deep p-6 text-left shadow-glow",
        children: [o.jsxs("div", {
            className: "flex items-center justify-between border-b border-cyber-amber/30 pb-3",
            children: [o.jsxs("div", {
                className: "flex items-center gap-2",
                children: [o.jsx(vs, {
                    className: "h-6 w-6 text-cyber-amber"
                }), o.jsx("span", {
                    className: "font-orbitron text-sm text-cyber-amber",
                    children: "CERTIFICATE OF ACHIEVEMENT"
                })]
            }), o.jsxs("span", {
                className: "font-mono text-[10px] text-slate-400",
                children: ["ID #", Date.now().toString(36).toUpperCase()]
            })]
        }), o.jsx("p", {
            className: "mt-4 text-center text-xs uppercase tracking-widest text-slate-400",
            children: "This certifies that"
        }), o.jsx("p", {
            className: "mt-1 text-center font-orbitron text-2xl text-white",
            children: "Cyber Explorer"
        }), o.jsx("p", {
            className: "mt-3 text-center text-xs uppercase tracking-widest text-slate-400",
            children: "has successfully completed the"
        }), o.jsx("p", {
            className: "mt-1 text-center font-orbitron text-lg text-cyber-cyan",
            children: "Cyber Awareness Champion"
        }), o.jsxs("p", {
            className: "mt-3 text-center text-sm text-slate-300",
            children: ["Scoring ", e, "/", t, " (", n, "%) in the Cyber Security Awareness Quiz"]
        }), o.jsxs("div", {
            className: "mt-5 flex items-end justify-between border-t border-cyber-amber/30 pt-3 font-mono text-[10px] text-slate-400",
            children: [o.jsx("span", {
                children: r
            }), o.jsx("span", {
                className: "text-cyber-amber",
                children: "CyberGuard AI"
            })]
        })]
    })
}
const Jh = {
    url: o.jsx(mi, {
        className: "h-4 w-4"
    }),
    http: o.jsx(cd, {
        className: "h-4 w-4"
    }),
    popup: o.jsx(ch, {
        className: "h-4 w-4"
    }),
    grammar: o.jsx(di, {
        className: "h-4 w-4"
    }),
    offer: o.jsx(nh, {
        className: "h-4 w-4"
    }),
    login: o.jsx(ih, {
        className: "h-4 w-4"
    })
};
function em() {
    const e = Me()
      , [t,n] = b.useState(0)
      , [r,s] = b.useState(new Set)
      , [l,i] = b.useState(0)
      , [a,c] = b.useState(!1)
      , u = Ia[t]
      , h = r.size === u.suspects.length
      , y = x => {
        if (r.has(x) || a)
            return;
        u.suspects.some(d => d.id === x) ? (z("success"),
        s(d => new Set(d).add(x))) : (z("error"),
        i(d => d + 1))
    }
      , m = () => {
        z("click"),
        t + 1 < Ia.length ? (n(x => x + 1),
        s(new Set),
        i(0),
        c(!1)) : (n(0),
        s(new Set),
        i(0),
        c(!1))
    }
      , w = () => {
        z("click"),
        n(0),
        s(new Set),
        i(0),
        c(!1)
    }
      , g = Math.max(0, u.suspects.length - l);
    return o.jsx("section", {
        id: "scam",
        className: "relative min-h-screen px-4 py-28 pb-32 sm:px-6",
        children: o.jsxs("div", {
            ref: e,
            className: "reveal mx-auto max-w-4xl",
            children: [o.jsx(ge, {
                icon: o.jsx(di, {
                    className: "h-5 w-5"
                }),
                kicker: "CHALLENGE",
                title: "Spot The Scam",
                subtitle: "Look at the fake website preview. Click every suspicious part you can find. Then review what you missed."
            }), o.jsxs("div", {
                className: "mt-8 glass-strong rounded-2xl p-5",
                children: [o.jsxs("div", {
                    className: "mb-4 flex flex-wrap items-center justify-between gap-3",
                    children: [o.jsxs("div", {
                        children: [o.jsxs("p", {
                            className: "font-orbitron text-sm text-cyber-cyan",
                            children: ["Challenge ", t + 1, ": ", u.name]
                        }), o.jsx("p", {
                            className: "text-xs text-slate-400",
                            children: u.prompt
                        })]
                    }), o.jsxs("span", {
                        className: "font-mono text-xs text-cyber-green",
                        children: ["Found ", r.size, "/", u.suspects.length]
                    })]
                }), o.jsxs("div", {
                    className: "overflow-hidden rounded-xl border border-cyber-cyan/20 bg-cyber-deep",
                    children: [o.jsxs("div", {
                        className: "flex items-center gap-2 border-b border-cyber-cyan/15 bg-cyber-black/60 px-3 py-2",
                        children: [o.jsxs("div", {
                            className: "flex gap-1.5",
                            children: [o.jsx("span", {
                                className: "h-2.5 w-2.5 rounded-full bg-cyber-red"
                            }), o.jsx("span", {
                                className: "h-2.5 w-2.5 rounded-full bg-cyber-amber"
                            }), o.jsx("span", {
                                className: "h-2.5 w-2.5 rounded-full bg-cyber-green"
                            })]
                        }), o.jsxs("div", {
                            className: "ml-2 flex flex-1 items-center gap-2 rounded-md bg-cyber-deep px-3 py-1 font-mono text-xs",
                            children: [u.https ? o.jsx(mn, {
                                className: "h-3 w-3 text-cyber-green"
                            }) : o.jsx(cd, {
                                className: "h-3 w-3 text-cyber-red"
                            }), o.jsxs("span", {
                                className: u.https ? "text-cyber-green" : "text-cyber-red",
                                children: [u.https ? "https" : "http", "://", u.url]
                            })]
                        })]
                    }), o.jsxs("div", {
                        className: "relative p-5 font-sans",
                        children: [o.jsx(Fa, {
                            id: "url",
                            label: "URL bar",
                            found: r,
                            onClick: y,
                            className: "left-2 top-12 h-6 w-[55%]"
                        }), o.jsx(Fa, {
                            id: "http",
                            label: "No HTTPS",
                            found: r,
                            onClick: y,
                            className: "left-2 top-9 h-3 w-[14%]"
                        }), o.jsxs("div", {
                            className: "mx-auto max-w-md space-y-4 text-center",
                            children: [o.jsx("div", {
                                className: "text-2xl font-bold text-white",
                                children: u.name
                            }), t === 0 && o.jsx(tm, {
                                onSpot: y,
                                found: r
                            }), t === 1 && o.jsx(nm, {
                                onSpot: y,
                                found: r
                            }), t === 2 && o.jsx(rm, {
                                onSpot: y,
                                found: r
                            })]
                        })]
                    })]
                }), o.jsx("div", {
                    className: "mt-4 grid gap-2 sm:grid-cols-2",
                    children: u.suspects.map(x => {
                        const j = r.has(x.id);
                        return o.jsxs("div", {
                            className: `flex items-start gap-2 rounded-lg border px-3 py-2 text-xs transition ${j || a ? j ? "border-cyber-green/50 bg-cyber-green/10 text-cyber-green" : "border-cyber-red/40 bg-cyber-red/10 text-cyber-red" : "border-slate-700 bg-slate-900/30 text-slate-500"}`,
                            children: [o.jsx("span", {
                                className: "mt-0.5",
                                children: Jh[x.id]
                            }), o.jsxs("div", {
                                children: [o.jsx("p", {
                                    className: "font-medium",
                                    children: j || a ? x.label : "???"
                                }), (j || a) && o.jsx("p", {
                                    className: "mt-0.5 text-slate-400",
                                    children: x.detail
                                })]
                            }), j && o.jsx(ir, {
                                className: "ml-auto h-4 w-4"
                            }), a && !j && o.jsx(hr, {
                                className: "ml-auto h-4 w-4"
                            })]
                        }, x.id)
                    }
                    )
                }), o.jsxs("div", {
                    className: "mt-5 flex flex-wrap justify-between gap-2",
                    children: [o.jsxs("button", {
                        onClick: w,
                        className: "btn-ghost flex items-center gap-2 text-sm",
                        children: [o.jsx(fi, {
                            className: "h-4 w-4"
                        }), " Restart"]
                    }), !h && !a ? o.jsx("button", {
                        onClick: () => {
                            z("click"),
                            c(!0)
                        }
                        ,
                        className: "btn-ghost text-sm",
                        children: "Reveal answers"
                    }) : o.jsx("button", {
                        onClick: m,
                        className: "btn-cyber flex items-center gap-2 text-sm",
                        children: "Next challenge →"
                    })]
                }), a && o.jsxs("p", {
                    className: "mt-3 text-center font-mono text-sm text-cyber-cyan",
                    children: ["You spotted ", r.size, " of ", u.suspects.length, " red flags. Score: ", g, "/", u.suspects.length]
                })]
            })]
        })
    })
}
function Fa({id: e, label: t, found: n, onClick: r, className: s}) {
    const l = n.has(e);
    return ["url", "http", "popup", "grammar", "offer", "login"].includes(e) ? o.jsx("button", {
        onClick: () => r(e),
        title: t,
        className: `absolute rounded-md border-2 border-dashed transition ${l ? "border-cyber-green bg-cyber-green/20" : "border-transparent hover:border-cyber-cyan/70 hover:bg-cyber-cyan/10"} ${s}`
    }) : null
}
function tm({onSpot: e, found: t}) {
    return o.jsxs("div", {
        className: "space-y-3",
        children: [o.jsx(Ve, {
            id: "offer",
            found: t,
            onSpot: e,
            className: "rounded-lg bg-cyber-amber/15 p-2 text-xs text-cyber-amber",
            children: "🎁 Verify your account and get $500 free!"
        }), o.jsxs("div", {
            className: "rounded-lg border border-slate-700 p-4 text-left",
            children: [o.jsx(Ve, {
                id: "grammar",
                found: t,
                onSpot: e,
                className: "text-sm text-slate-200",
                children: "Kindly fill you details below to unlock you account:"
            }), o.jsx("input", {
                placeholder: "Card number",
                className: "mt-3 w-full rounded bg-cyber-black/60 px-3 py-2 text-xs text-slate-200 outline-none focus:border focus:border-cyber-cyan/50"
            }), o.jsx("input", {
                placeholder: "PIN",
                type: "password",
                className: "mt-2 w-full rounded bg-cyber-black/60 px-3 py-2 text-xs text-slate-200 outline-none focus:border focus:border-cyber-cyan/50"
            }), o.jsx("button", {
                type: "button",
                onClick: () => z("click"),
                className: "mt-3 w-full rounded bg-cyber-cyan/30 py-2 text-xs text-cyber-cyan transition hover:bg-cyber-cyan/50",
                children: "Submit"
            })]
        }), o.jsx(Ve, {
            id: "popup",
            found: t,
            onSpot: e,
            className: "rounded-lg border border-cyber-red/40 bg-cyber-red/10 p-2 text-xs text-cyber-red",
            children: "🎉 Congratulations! You won an iPhone. Click OK to claim!"
        })]
    })
}
function nm({onSpot: e, found: t}) {
    return o.jsxs("div", {
        className: "space-y-3",
        children: [o.jsxs("div", {
            className: "rounded-lg bg-cyber-deep p-3 text-left",
            children: [o.jsx("div", {
                className: "h-24 w-full rounded bg-gradient-to-br from-cyber-purple/30 to-cyber-cyan/20"
            }), o.jsx(Ve, {
                id: "offer",
                found: t,
                onSpot: e,
                className: "mt-2 text-left text-sm text-cyber-green",
                children: "SuperPhone Pro 15 — Only $49 (was $1200)"
            }), o.jsx(Ve, {
                id: "grammar",
                found: t,
                onSpot: e,
                className: "mt-1 text-left text-xs text-slate-300",
                children: "Shiping in 2 day worldwide. Buy now stock limited!"
            })]
        }), o.jsx(Ve, {
            id: "login",
            found: t,
            onSpot: e,
            className: "rounded-lg border border-cyber-cyan/20 bg-cyber-deep p-3 text-xs text-slate-300",
            children: "Sign in with your Amazon account to checkout →"
        }), o.jsx(Ve, {
            id: "popup",
            found: t,
            onSpot: e,
            className: "rounded-lg border border-cyber-red/40 bg-cyber-red/10 p-2 text-xs text-cyber-red",
            children: "🎉 You are visitor 1,000,000! You won a $500 gift card!"
        })]
    })
}
function rm({onSpot: e, found: t}) {
    return o.jsxs("div", {
        className: "space-y-3",
        children: [o.jsx("div", {
            className: "text-3xl",
            children: "🎉🏆🎉"
        }), o.jsx(Ve, {
            id: "offer",
            found: t,
            onSpot: e,
            className: "text-lg text-cyber-amber",
            children: "You won $850,000 in the International Lottery!"
        }), o.jsx(Ve, {
            id: "grammar",
            found: t,
            onSpot: e,
            className: "text-sm text-slate-200",
            children: "Dear winner, you has been selected. Enter your bank details to claim."
        }), o.jsx("input", {
            placeholder: "Bank account number",
            className: "w-full rounded bg-cyber-black/60 px-3 py-2 text-xs text-slate-200 outline-none focus:border focus:border-cyber-cyan/50"
        }), o.jsx(Ve, {
            id: "popup",
            found: t,
            onSpot: e,
            className: "rounded-lg border border-cyber-red/40 bg-cyber-red/10 p-2 text-xs text-cyber-red",
            children: "⏰ Claim your prize in 5 minutes or it will be given to someone else!"
        })]
    })
}
function Ve({id: e, found: t, onSpot: n, className: r, children: s}) {
    const l = t.has(e);
    return o.jsx("button", {
        onClick: () => n(e),
        className: `relative block w-full rounded-md text-left transition ${l ? "border-2 border-dashed border-cyber-green bg-cyber-green/15" : "border-2 border-dashed border-transparent hover:border-cyber-cyan/70 hover:bg-cyber-cyan/10"} ${r}`,
        children: s
    })
}
const sm = "ABCDEFGHJKLMNPQRSTUVWXYZ"
  , Oa = "abcdefghijkmnopqrstuvwxyz"
  , lm = "23456789"
  , om = "!@#$%^&*()-_=+[]{};:,.?";
function im(e) {
    return e[Math.floor(Math.random() * e.length)]
}
function am(e, t) {
    let n = "";
    t.upper && (n += sm),
    t.lower && (n += Oa),
    t.num && (n += lm),
    t.sym && (n += om),
    n || (n = Oa);
    let r = "";
    for (let s = 0; s < e; s++)
        r += im(n);
    return r
}
function cm() {
    const e = Me()
      , [t,n] = b.useState(16)
      , [r,s] = b.useState({
        upper: !0,
        lower: !0,
        num: !0,
        sym: !0
    })
      , [l,i] = b.useState("")
      , [a,c] = b.useState(!1)
      , u = b.useCallback( () => {
        i(am(t, r)),
        z("unlock")
    }
    , [t, r]);
    b.useEffect( () => {
        u()
    }
    , [u]);
    const h = async () => {
        if (l)
            try {
                await navigator.clipboard.writeText(l),
                c(!0),
                z("success"),
                setTimeout( () => c(!1), 1500)
            } catch {}
    }
      , y = m => {
        s(w => {
            const g = {
                ...w,
                [m]: !w[m]
            };
            return !g.upper && !g.lower && !g.num && !g.sym && (g[m] = !0),
            g
        }
        )
    }
    ;
    return o.jsx("section", {
        id: "generator",
        className: "relative min-h-screen px-4 py-28 pb-32 sm:px-6",
        children: o.jsxs("div", {
            ref: e,
            className: "reveal mx-auto max-w-3xl",
            children: [o.jsx(ge, {
                icon: o.jsx(mo, {
                    className: "h-5 w-5"
                }),
                kicker: "LIVE TOOL",
                title: "Password Generator",
                subtitle: "Create ultra-secure passwords instantly. Choose the length and which character types to include."
            }), o.jsxs("div", {
                className: "mt-8 glass-strong rounded-2xl p-5 sm:p-7",
                children: [o.jsxs("div", {
                    className: "flex items-stretch gap-2",
                    children: [o.jsx("div", {
                        className: "flex flex-1 items-center justify-center rounded-xl border border-cyber-cyan/30 bg-cyber-deep/60 p-4",
                        children: o.jsx("code", {
                            className: "break-all text-center font-mono text-lg text-cyber-green sm:text-2xl",
                            children: l
                        })
                    }), o.jsxs("div", {
                        className: "flex flex-col gap-2",
                        children: [o.jsx("button", {
                            onClick: h,
                            className: "btn-cyber flex items-center gap-1 px-3 py-2",
                            "aria-label": "Copy",
                            children: a ? o.jsx(ir, {
                                className: "h-4 w-4 text-cyber-green"
                            }) : o.jsx(sd, {
                                className: "h-4 w-4"
                            })
                        }), o.jsx("button", {
                            onClick: u,
                            className: "btn-ghost flex items-center gap-1 px-3 py-2",
                            "aria-label": "Regenerate",
                            children: o.jsx(Os, {
                                className: "h-4 w-4"
                            })
                        })]
                    })]
                }), a && o.jsx("p", {
                    className: "mt-2 text-center font-mono text-xs text-cyber-green",
                    children: "Copied to clipboard!"
                }), o.jsxs("div", {
                    className: "mt-6",
                    children: [o.jsxs("div", {
                        className: "mb-2 flex items-center justify-between",
                        children: [o.jsx("label", {
                            className: "font-mono text-xs uppercase tracking-widest text-cyber-cyan",
                            children: "Length"
                        }), o.jsx("span", {
                            className: "font-orbitron text-lg text-white",
                            children: t
                        })]
                    }), o.jsx("input", {
                        type: "range",
                        min: 8,
                        max: 32,
                        value: t,
                        onChange: m => n(Number(m.target.value)),
                        className: "w-full accent-cyber-cyan"
                    }), o.jsxs("div", {
                        className: "mt-1 flex justify-between font-mono text-[10px] text-slate-500",
                        children: [o.jsx("span", {
                            children: "8"
                        }), o.jsx("span", {
                            children: "32"
                        })]
                    })]
                }), o.jsx("div", {
                    className: "mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4",
                    children: [["upper", "A-Z Uppercase"], ["lower", "a-z Lowercase"], ["num", "0-9 Numbers"], ["sym", "!@# Symbols"]].map( ([m,w]) => o.jsx("button", {
                        onClick: () => y(m),
                        className: `rounded-lg border px-3 py-2.5 text-xs transition ${r[m] ? "border-cyber-cyan bg-cyber-cyan/15 text-cyber-cyan" : "border-slate-700 bg-slate-900/30 text-slate-500"}`,
                        children: w
                    }, m))
                }), o.jsxs("button", {
                    onClick: u,
                    className: "mt-6 w-full btn-cyber flex items-center justify-center gap-2",
                    children: [o.jsx(mo, {
                        className: "h-4 w-4"
                    }), " Generate New Password"]
                })]
            })]
        })
    })
}
const Da = [{
    id: "target",
    label: "Target account found",
    icon: o.jsx(hi, {
        className: "h-5 w-5"
    }),
    desc: 'Attacker scans for a weak account: password "123456", no 2FA.'
}, {
    id: "guess",
    label: "Password guessed",
    icon: o.jsx($t, {
        className: "h-5 w-5"
    }),
    desc: "In 2 seconds the password is cracked with a dictionary attack."
}, {
    id: "phish",
    label: "Phishing email opened",
    icon: o.jsx(fr, {
        className: "h-5 w-5"
    }),
    desc: "A fake email tricks the user into clicking a malicious link."
}, {
    id: "malware",
    label: "Malware installed",
    icon: o.jsx(nd, {
        className: "h-5 w-5"
    }),
    desc: "The link downloads ransomware onto the device."
}, {
    id: "encrypt",
    label: "Files encrypted",
    icon: o.jsx(eh, {
        className: "h-5 w-5"
    }),
    desc: "All files are locked and a ransom is demanded."
}]
  , Ua = [{
    id: "strong-target",
    label: "Target account found",
    icon: o.jsx(hi, {
        className: "h-5 w-5"
    }),
    desc: "Attacker scans the account: strong password + 2FA enabled."
}, {
    id: "strong-guess",
    label: "Password guess FAILED",
    icon: o.jsx(id, {
        className: "h-5 w-5"
    }),
    desc: "After billions of guesses, the password is still uncracked."
}, {
    id: "strong-phish",
    label: "Phishing blocked",
    icon: o.jsx(Ot, {
        className: "h-5 w-5"
    }),
    desc: "Safe browsing + email filters block the fake link."
}, {
    id: "strong-result",
    label: "Attack blocked",
    icon: o.jsx(rd, {
        className: "h-5 w-5"
    }),
    desc: "2FA, strong password, and safe browsing stop the attack completely."
}];
function um() {
    const e = Me()
      , [t,n] = b.useState(null)
      , [r,s] = b.useState("idle")
      , [l,i] = b.useState(-1)
      , a = b.useRef([])
      , c = () => {
        a.current.forEach(clearTimeout),
        a.current = []
    }
    ;
    b.useEffect( () => () => c(), []);
    const u = g => {
        c(),
        z("click"),
        n(g),
        s("idle"),
        i(-1);
        const x = g === "weak" ? Da : Ua
          , j = g === "weak" ? "result" : "strong-result";
        x.forEach( (d, p) => {
            a.current.push(setTimeout( () => {
                s(d.id),
                i(p),
                z(g === "weak" ? "error" : "success")
            }
            , 900 * (p + 1)))
        }
        ),
        a.current.push(setTimeout( () => {
            s(j),
            z(g === "weak" ? "alert" : "unlock")
        }
        , 900 * (x.length + 1)))
    }
      , h = () => {
        c(),
        z("click"),
        n(null),
        s("idle"),
        i(-1)
    }
      , y = t === "weak" ? Da : t === "strong" ? Ua : []
      , m = r === "result" || r === "strong-result"
      , w = r === "strong-result";
    return o.jsx("section", {
        id: "simulation",
        className: "relative min-h-screen px-4 py-28 pb-32 sm:px-6",
        children: o.jsxs("div", {
            ref: e,
            className: "reveal mx-auto max-w-4xl",
            children: [o.jsx(ge, {
                icon: o.jsx(od, {
                    className: "h-5 w-5"
                }),
                kicker: "SAFE SIMULATION",
                title: "Cyber Attack Simulation",
                subtitle: "Watch how an attacker targets a weak account — then replay with strong security to see the attack blocked. This is a safe, educational animation."
            }), o.jsxs("div", {
                className: "mt-8 glass-strong rounded-2xl p-5 sm:p-7",
                children: [!t && o.jsxs("div", {
                    className: "text-center",
                    children: [o.jsx("p", {
                        className: "mb-5 text-sm text-slate-300",
                        children: "Choose a scenario to simulate:"
                    }), o.jsxs("div", {
                        className: "flex flex-wrap justify-center gap-3",
                        children: [o.jsxs("button", {
                            onClick: () => u("weak"),
                            className: "flex items-center gap-2 rounded-xl border border-cyber-red/50 bg-cyber-red/10 px-5 py-3 font-orbitron text-sm text-cyber-red transition hover:bg-cyber-red/20",
                            children: [o.jsx(id, {
                                className: "h-5 w-5"
                            }), " Weak Account"]
                        }), o.jsxs("button", {
                            onClick: () => u("strong"),
                            className: "flex items-center gap-2 rounded-xl border border-cyber-green/50 bg-cyber-green/10 px-5 py-3 font-orbitron text-sm text-cyber-green transition hover:bg-cyber-green/20",
                            children: [o.jsx(Ot, {
                                className: "h-5 w-5"
                            }), " Strong Account"]
                        })]
                    })]
                }), t && o.jsxs("div", {
                    children: [o.jsxs("div", {
                        className: "mb-4 flex items-center justify-between",
                        children: [o.jsxs("span", {
                            className: `font-orbitron text-sm ${t === "weak" ? "text-cyber-red" : "text-cyber-green"}`,
                            children: ["Scenario: ", t === "weak" ? "Weak Account" : "Strong Account (2FA + Strong Password + Safe Browsing)"]
                        }), o.jsxs("button", {
                            onClick: h,
                            className: "btn-ghost flex items-center gap-1 text-xs",
                            children: [o.jsx(fi, {
                                className: "h-3.5 w-3.5"
                            }), " Reset"]
                        })]
                    }), o.jsx("div", {
                        className: "relative mb-5 grid place-items-center rounded-xl border border-cyber-cyan/20 bg-cyber-deep/60 p-6",
                        children: o.jsxs("div", {
                            className: "flex items-center gap-6",
                            children: [o.jsx($a, {
                                icon: o.jsx(hi, {
                                    className: "h-7 w-7 text-cyber-purple"
                                }),
                                label: "Attacker",
                                glow: "purple"
                            }), o.jsx(dm, {
                                active: r !== "idle" && r !== "strong-result",
                                blocked: w
                            }), o.jsx($a, {
                                icon: t === "weak" ? o.jsx(mn, {
                                    className: "h-7 w-7 text-cyber-red"
                                }) : o.jsx(Ot, {
                                    className: "h-7 w-7 text-cyber-green"
                                }),
                                label: "You",
                                glow: t === "weak" ? "red" : "green",
                                pulse: r !== "idle"
                            })]
                        })
                    }), o.jsx("div", {
                        className: "space-y-2",
                        children: y.map( (g, x) => {
                            const j = x === l || m && x === y.length - 1
                              , d = x < l || m;
                            return o.jsxs("div", {
                                className: `flex items-center gap-3 rounded-lg border px-4 py-3 transition-all duration-300 ${j ? t === "weak" ? "border-cyber-red bg-cyber-red/15" : "border-cyber-green bg-cyber-green/15" : d ? "border-cyber-cyan/20 bg-cyber-deep/40 opacity-70" : "border-slate-800 bg-slate-900/20 opacity-40"}`,
                                children: [o.jsx("span", {
                                    className: j ? t === "weak" ? "text-cyber-red" : "text-cyber-green" : "text-slate-500",
                                    children: g.icon
                                }), o.jsxs("div", {
                                    className: "flex-1",
                                    children: [o.jsx("p", {
                                        className: `font-orbitron text-sm ${j ? "text-white" : "text-slate-400"}`,
                                        children: g.label
                                    }), o.jsx("p", {
                                        className: "text-xs text-slate-400",
                                        children: g.desc
                                    })]
                                }), j && o.jsx("span", {
                                    className: "font-mono text-[10px] text-cyber-cyan",
                                    children: t === "weak" ? "●●●" : "✓✓✓"
                                })]
                            }, g.id)
                        }
                        )
                    }), m && o.jsxs("div", {
                        className: `mt-5 animate-fade-up rounded-xl border p-4 text-center ${w ? "border-cyber-green/60 bg-cyber-green/10" : "border-cyber-red/60 bg-cyber-red/10"}`,
                        children: [o.jsx("p", {
                            className: `font-orbitron text-lg ${w ? "text-cyber-green" : "text-cyber-red"}`,
                            children: w ? "✓ Attack Blocked!" : "✗ Attack Succeeded"
                        }), o.jsx("p", {
                            className: "mt-1 text-sm text-slate-300",
                            children: w ? "Strong password + 2FA + safe browsing stopped every stage of the attack." : "A weak password and no 2FA let the attacker in within seconds. Use strong security!"
                        }), o.jsx("button", {
                            onClick: () => u(w ? "weak" : "strong"),
                            className: "mt-3 btn-cyber text-sm",
                            children: w ? "Replay with weak account" : "Replay with strong account"
                        })]
                    })]
                })]
            })]
        })
    })
}
function $a({icon: e, label: t, glow: n, pulse: r}) {
    const s = n === "red" ? "shadow-glow-red" : n === "green" ? "shadow-glow-green" : n === "purple" ? "shadow-glow-purple" : "";
    return o.jsxs("div", {
        className: "flex flex-col items-center gap-2",
        children: [o.jsx("div", {
            className: `grid h-16 w-16 place-items-center rounded-2xl glass ${s} ${r ? "animate-pulse-glow" : ""}`,
            children: e
        }), o.jsx("span", {
            className: "font-mono text-[10px] uppercase tracking-widest text-slate-400",
            children: t
        })]
    })
}
function dm({active: e, blocked: t}) {
    return o.jsxs("div", {
        className: "relative h-1 w-16 overflow-hidden rounded-full bg-cyber-deep sm:w-28",
        children: [o.jsx("div", {
            className: `h-full transition-all duration-500 ${t ? "bg-cyber-red" : e ? "bg-cyber-green" : "bg-slate-700"}`,
            style: {
                width: e ? "100%" : "0%",
                boxShadow: e ? `0 0 10px ${t ? "#f43f5e" : "#34d399"}` : "none"
            }
        }), e && !t && o.jsx("div", {
            className: "absolute inset-y-0 left-0 w-3 animate-shimmer rounded-full bg-white/40",
            style: {
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)",
                backgroundSize: "200% 100%"
            }
        })]
    })
}
function pm() {
    const e = Me()
      , [t,n] = b.useState(null)
      , r = {
        x: 50,
        y: 50
    }
      , s = 38;
    return o.jsx("section", {
        id: "mindmap",
        className: "relative min-h-screen px-4 py-28 pb-32 sm:px-6",
        children: o.jsxs("div", {
            ref: e,
            className: "reveal mx-auto max-w-5xl",
            children: [o.jsx(ge, {
                icon: o.jsx(pi, {
                    className: "h-5 w-5"
                }),
                kicker: "EXPLORE",
                title: "Cyber Security Mind Map",
                subtitle: "Click any branch to expand it and learn more. Tap the centre to close."
            }), o.jsxs("div", {
                className: "mt-8 glass-strong rounded-2xl p-4 sm:p-6",
                children: [o.jsxs("div", {
                    className: "relative mx-auto aspect-square w-full max-w-2xl",
                    children: [o.jsx("svg", {
                        className: "absolute inset-0 h-full w-full",
                        viewBox: "0 0 100 100",
                        preserveAspectRatio: "none",
                        children: Le.map( (l, i) => {
                            const a = i / Le.length * Math.PI * 2 - Math.PI / 2
                              , c = r.x + Math.cos(a) * s
                              , u = r.y + Math.sin(a) * s;
                            return o.jsx("line", {
                                x1: r.x,
                                y1: r.y,
                                x2: c,
                                y2: u,
                                stroke: t === i ? Le[i].color : "rgba(34,211,238,0.2)",
                                strokeWidth: t === i ? .5 : .25,
                                strokeDasharray: t === i ? "0" : "1 1"
                            }, i)
                        }
                        )
                    }), o.jsx("button", {
                        onClick: () => {
                            z("click"),
                            n(null)
                        }
                        ,
                        className: "absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2",
                        children: o.jsx("div", {
                            className: "grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-cyber-cyan to-cyber-purple text-center shadow-glow sm:h-24 sm:w-24",
                            children: o.jsx("span", {
                                className: "px-1 font-orbitron text-[10px] font-bold leading-tight text-cyber-black sm:text-xs",
                                children: "CYBER SECURITY"
                            })
                        })
                    }), Le.map( (l, i) => {
                        const a = i / Le.length * Math.PI * 2 - Math.PI / 2
                          , c = r.x + Math.cos(a) * s
                          , u = r.y + Math.sin(a) * s
                          , h = t === i;
                        return o.jsx("button", {
                            onClick: () => {
                                z("click"),
                                n(h ? null : i)
                            }
                            ,
                            className: "absolute z-20 -translate-x-1/2 -translate-y-1/2 transition-transform duration-300",
                            style: {
                                left: `${c}%`,
                                top: `${u}%`,
                                transform: `translate(-50%, -50%) scale(${h ? 1.15 : 1})`
                            },
                            children: o.jsx("div", {
                                className: "glass flex h-16 items-center justify-center rounded-xl px-2 text-center transition-all sm:h-20 sm:px-3",
                                style: {
                                    borderColor: h ? l.color : "rgba(34,211,238,0.2)",
                                    boxShadow: h ? `0 0 22px ${l.color}66` : "none"
                                },
                                children: o.jsx("span", {
                                    className: "font-orbitron text-[8px] leading-tight sm:text-[10px]",
                                    style: {
                                        color: h ? l.color : "#cbd5e1"
                                    },
                                    children: l.name
                                })
                            })
                        }, l.name)
                    }
                    )]
                }), t !== null ? o.jsxs("div", {
                    className: "mt-6 animate-fade-up rounded-xl border p-5",
                    style: {
                        borderColor: `${Le[t].color}66`
                    },
                    children: [o.jsxs("div", {
                        className: "mb-2 flex items-center justify-between",
                        children: [o.jsx("h3", {
                            className: "font-orbitron text-lg",
                            style: {
                                color: Le[t].color
                            },
                            children: Le[t].name
                        }), o.jsx("button", {
                            onClick: () => {
                                z("click"),
                                n(null)
                            }
                            ,
                            className: "text-slate-400 hover:text-white",
                            children: o.jsx(hr, {
                                className: "h-4 w-4"
                            })
                        })]
                    }), o.jsx("p", {
                        className: "text-sm text-slate-200",
                        children: Le[t].info
                    }), o.jsx("ul", {
                        className: "mt-3 grid gap-2 sm:grid-cols-3",
                        children: Le[t].points.map(l => o.jsxs("li", {
                            className: "flex items-center gap-2 rounded-lg bg-cyber-deep/50 px-3 py-2 text-xs text-slate-300",
                            children: [o.jsx("span", {
                                style: {
                                    color: Le[t].color
                                },
                                children: "▸"
                            }), " ", l]
                        }, l))
                    })]
                }) : o.jsx("p", {
                    className: "mt-6 text-center font-mono text-xs text-slate-500",
                    children: "↑ Click a branch node to expand its details"
                })]
            })]
        })
    })
}
const fm = {
    activity: o.jsx(uo, {
        className: "h-5 w-5"
    }),
    mail: o.jsx(fr, {
        className: "h-5 w-5"
    }),
    bug: o.jsx(nd, {
        className: "h-5 w-5"
    }),
    key: o.jsx($t, {
        className: "h-5 w-5"
    })
};
function hm() {
    const e = Me()
      , [t,n] = b.useState( () => Math.floor(Math.random() * Ar.length))
      , r = () => {
        z("click");
        let s = Math.floor(Math.random() * Ar.length);
        s === t && (s = (s + 1) % Ar.length),
        n(s)
    }
    ;
    return o.jsx("section", {
        className: "relative min-h-screen px-4 py-28 pb-32 sm:px-6",
        children: o.jsxs("div", {
            ref: e,
            className: "reveal mx-auto max-w-6xl space-y-12",
            children: [o.jsxs("div", {
                className: "mx-auto max-w-2xl",
                children: [o.jsx(ge, {
                    icon: o.jsx(Pa, {
                        className: "h-5 w-5"
                    }),
                    kicker: "DAILY CYBER TIP",
                    title: "Tip of the Visit",
                    subtitle: "A new tip every time you load the page — refresh for another."
                }), o.jsxs("div", {
                    className: "mt-6 glass-strong rounded-2xl p-6 text-center",
                    children: [o.jsx("div", {
                        className: "mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-cyber-amber/15",
                        children: o.jsx(Pa, {
                            className: "h-7 w-7 text-cyber-amber drop-shadow-[0_0_8px_rgba(251,191,36,0.7)]"
                        })
                    }), o.jsxs("p", {
                        className: "animate-fade-in font-orbitron text-lg text-cyber-amber",
                        children: ['"', Ar[t], '"']
                    }, t), o.jsxs("button", {
                        onClick: r,
                        className: "mt-4 btn-ghost flex items-center gap-2 text-sm",
                        children: [o.jsx(Os, {
                            className: "h-4 w-4"
                        }), " New tip"]
                    })]
                })]
            }), o.jsxs("div", {
                children: [o.jsx(ge, {
                    icon: o.jsx(uo, {
                        className: "h-5 w-5"
                    }),
                    kicker: "LIVE COUNTER",
                    title: "Live Cyber Threat Counter",
                    subtitle: "Simulated counters showing the scale of global cyber threats for learning purposes."
                }), o.jsx("div", {
                    className: "mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
                    children: Uh.map( (s, l) => o.jsx(mm, {
                        counter: s,
                        delay: l * 250
                    }, s.label))
                }), o.jsxs("p", {
                    className: "mt-4 flex items-center justify-center gap-2 text-center font-mono text-[11px] text-slate-500",
                    children: [o.jsx(lh, {
                        className: "h-3.5 w-3.5"
                    }), " These are simulated, educational demo values — not real-time data."]
                })]
            }), o.jsxs("div", {
                id: "timeline",
                children: [o.jsx(ge, {
                    icon: o.jsx(uo, {
                        className: "h-5 w-5"
                    }),
                    kicker: "HISTORY",
                    title: "Cyber Security Timeline",
                    subtitle: "Major cyber attacks that changed how we think about security. Click an event for details."
                }), o.jsx(ym, {})]
            })]
        })
    })
}
function mm({counter: e, delay: t}) {
    const [n,r] = b.useState(!1)
      , [s,l] = b.useState(0)
      , i = Me()
      , a = Th(e.base + s, 2e3, n);
    return b.useEffect( () => {
        const c = setTimeout( () => r(!0), t);
        return () => clearTimeout(c)
    }
    , [t]),
    b.useEffect( () => {
        if (!n)
            return;
        const c = setInterval( () => l(u => u + e.perSec), 1e3);
        return () => clearInterval(c)
    }
    , [n, e.perSec]),
    o.jsxs("div", {
        ref: i,
        className: "reveal glass glass-hover rounded-2xl p-5",
        children: [o.jsxs("div", {
            className: "mb-3 flex items-center justify-between",
            children: [o.jsx("div", {
                className: "grid h-10 w-10 place-items-center rounded-lg bg-cyber-cyan/15 text-cyber-cyan",
                children: fm[e.icon]
            }), o.jsx("span", {
                className: "h-2 w-2 animate-pulse rounded-full bg-cyber-red"
            })]
        }), o.jsx("p", {
            className: "font-orbitron text-2xl text-white tabular-nums",
            children: Math.floor(a).toLocaleString()
        }), o.jsx("p", {
            className: "mt-1 text-xs text-slate-400",
            children: e.label
        })]
    })
}
function ym() {
    const [e,t] = b.useState(0);
    return o.jsx("div", {
        className: "mt-6 space-y-1",
        children: Aa.map( (n, r) => {
            const s = e === r;
            return o.jsxs("div", {
                className: "relative pl-10 sm:pl-14",
                children: [r < Aa.length - 1 && o.jsx("span", {
                    className: "absolute left-[14px] top-8 h-full w-px bg-gradient-to-b from-cyber-cyan/60 to-cyber-purple/30 sm:left-[18px]"
                }), o.jsx("button", {
                    onClick: () => {
                        z("click"),
                        t(s ? null : r)
                    }
                    ,
                    className: `absolute left-0 top-1.5 grid h-7 w-7 place-items-center rounded-full border-2 transition sm:h-9 sm:w-9 ${s ? "border-cyber-cyan bg-cyber-cyan text-cyber-black" : "border-cyber-cyan/40 bg-cyber-deep text-cyber-cyan"}`,
                    children: o.jsx("span", {
                        className: "h-2 w-2 rounded-full bg-current"
                    })
                }), o.jsxs("button", {
                    onClick: () => {
                        z("click"),
                        t(s ? null : r)
                    }
                    ,
                    className: `mb-1 w-full rounded-xl border p-4 text-left transition ${s ? "border-cyber-cyan/50 bg-cyber-deep/60" : "border-cyber-cyan/15 bg-cyber-deep/30 hover:border-cyber-cyan/40"}`,
                    children: [o.jsxs("div", {
                        className: "flex items-center justify-between",
                        children: [o.jsx("span", {
                            className: "font-orbitron text-lg text-cyber-cyan",
                            children: n.year
                        }), o.jsx("span", {
                            className: "font-orbitron text-sm text-white",
                            children: n.title
                        })]
                    }), s && o.jsx("p", {
                        className: "mt-2 animate-fade-in text-sm text-slate-300",
                        children: n.text
                    })]
                })]
            }, n.year)
        }
        )
    })
}
const Rr = [{
    id: "pw",
    label: "Set a strong, unique password",
    icon: o.jsx($t, {
        className: "h-5 w-5"
    })
}, {
    id: "2fa",
    label: "Enabled Two-Factor Authentication",
    icon: o.jsx(mh, {
        className: "h-5 w-5"
    })
}, {
    id: "update",
    label: "Updated software to the latest version",
    icon: o.jsx(Jf, {
        className: "h-5 w-5"
    })
}, {
    id: "av",
    label: "Installed / enabled antivirus",
    icon: o.jsx(Ot, {
        className: "h-5 w-5"
    })
}, {
    id: "backup",
    label: "Completed a file backup",
    icon: o.jsx(sh, {
        className: "h-5 w-5"
    })
}, {
    id: "browser",
    label: "Using a safe, up-to-date browser",
    icon: o.jsx(ld, {
        className: "h-5 w-5"
    })
}]
  , gm = {
    key: o.jsx($t, {
        className: "h-7 w-7"
    }),
    fish: o.jsx(mn, {
        className: "h-7 w-7"
    }),
    shield: o.jsx(Ot, {
        className: "h-7 w-7"
    }),
    brain: o.jsx(vs, {
        className: "h-7 w-7"
    }),
    trophy: o.jsx(vs, {
        className: "h-7 w-7"
    })
};
function xm() {
    const e = Me()
      , [t,n] = b.useState(new Set)
      , {unlocked: r, unlock: s} = Ds()
      , l = a => {
        n(c => {
            const u = new Set(c);
            return u.has(a) ? u.delete(a) : (u.add(a),
            z("success")),
            u.size === Rr.length && s("defender"),
            u
        }
        ),
        t.has(a) && z("click")
    }
      , i = Math.round(t.size / Rr.length * 100);
    return o.jsx("section", {
        id: "checklist",
        className: "relative min-h-screen px-4 py-28 pb-32 sm:px-6",
        children: o.jsxs("div", {
            ref: e,
            className: "reveal mx-auto max-w-5xl space-y-12",
            children: [o.jsxs("div", {
                children: [o.jsx(ge, {
                    icon: o.jsx(fo, {
                        className: "h-5 w-5"
                    }),
                    kicker: "STAY SAFE",
                    title: "Cyber Safety Checklist",
                    subtitle: "Tick off each step to harden your own security. The progress bar fills as you go."
                }), o.jsxs("div", {
                    className: "mt-8 glass-strong rounded-2xl p-5 sm:p-7",
                    children: [o.jsxs("div", {
                        className: "mb-4",
                        children: [o.jsxs("div", {
                            className: "mb-2 flex items-center justify-between font-mono text-xs",
                            children: [o.jsx("span", {
                                className: "text-cyber-cyan",
                                children: "Progress"
                            }), o.jsxs("span", {
                                className: "text-white",
                                children: [t.size, "/", Rr.length, " • ", i, "%"]
                            })]
                        }), o.jsx("div", {
                            className: "h-3 overflow-hidden rounded-full bg-cyber-deep",
                            children: o.jsx("div", {
                                className: "h-full rounded-full bg-gradient-to-r from-cyber-green to-cyber-cyan transition-all duration-500",
                                style: {
                                    width: `${i}%`,
                                    boxShadow: "0 0 12px rgba(52,211,153,0.6)"
                                }
                            })
                        })]
                    }), o.jsx("div", {
                        className: "grid gap-2 sm:grid-cols-2",
                        children: Rr.map(a => {
                            const c = t.has(a.id);
                            return o.jsxs("button", {
                                onClick: () => l(a.id),
                                className: `flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition ${c ? "border-cyber-green/50 bg-cyber-green/10 text-cyber-green" : "border-cyber-cyan/20 bg-cyber-deep/40 text-slate-200 hover:border-cyber-cyan/50"}`,
                                children: [o.jsx("span", {
                                    className: c ? "text-cyber-green" : "text-cyber-cyan",
                                    children: a.icon
                                }), o.jsx("span", {
                                    className: "flex-1 text-sm",
                                    children: a.label
                                }), c ? o.jsx(fo, {
                                    className: "h-5 w-5 text-cyber-green"
                                }) : o.jsx(gh, {
                                    className: "h-5 w-5 text-slate-600"
                                })]
                            }, a.id)
                        }
                        )
                    }), i === 100 && o.jsx("p", {
                        className: "mt-4 animate-fade-up rounded-lg border border-cyber-green/50 bg-cyber-green/10 p-3 text-center font-orbitron text-sm text-cyber-green",
                        children: "✓ Your cyber defenses are fully reinforced. Great work, Cyber Defender!"
                    })]
                })]
            }), o.jsxs("div", {
                children: [o.jsx(ge, {
                    icon: o.jsx(vs, {
                        className: "h-5 w-5"
                    }),
                    kicker: "ACHIEVEMENTS",
                    title: "Unlock Badges",
                    subtitle: "Complete activities across the site to earn cyber security badges."
                }), o.jsx("div", {
                    className: "mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5",
                    children: Hh.map(a => {
                        const c = r.has(a.id);
                        return o.jsxs("div", {
                            className: `glass rounded-2xl p-5 text-center transition-all duration-300 ${c ? "border-cyber-amber/60 shadow-glow" : "opacity-60 grayscale"}`,
                            children: [o.jsx("div", {
                                className: `mx-auto mb-3 grid h-16 w-16 place-items-center rounded-2xl ${c ? "bg-gradient-to-br from-cyber-amber/30 to-cyber-purple/30" : "bg-slate-800/60"}`,
                                children: o.jsx("span", {
                                    className: c ? "text-cyber-amber drop-shadow-[0_0_8px_rgba(251,191,36,0.7)]" : "text-slate-500",
                                    children: gm[a.icon]
                                })
                            }), o.jsx("p", {
                                className: `font-orbitron text-xs ${c ? "text-cyber-amber" : "text-slate-400"}`,
                                children: a.name
                            }), o.jsx("p", {
                                className: "mt-1 text-[10px] text-slate-500",
                                children: c ? "Unlocked" : a.hint
                            })]
                        }, a.id)
                    }
                    )
                })]
            })]
        })
    })
}
const vm = [{
    name: "Udayveer",
    roles: ["Project Developer", "Cyber Security Research", "UI Designer"],
    icons: [o.jsx(Ea, {
        className: "h-4 w-4"
    }), o.jsx(fh, {
        className: "h-4 w-4"
    }), o.jsx(ph, {
        className: "h-4 w-4"
    })],
    color: "#22d3ee",
    initial: "U"
}, {
    name: "Jagrit",
    roles: ["Project Developer", "Research & Testing", "Content Support"],
    icons: [o.jsx(Ea, {
        className: "h-4 w-4"
    }), o.jsx(th, {
        className: "h-4 w-4"
    }), o.jsx(Gf, {
        className: "h-4 w-4"
    })],
    color: "#a855f7",
    initial: "J"
}];
function wm() {
    const e = Me();
    return o.jsx("section", {
        id: "creators",
        className: "relative min-h-screen px-4 py-28 pb-32 sm:px-6",
        children: o.jsxs("div", {
            ref: e,
            className: "reveal mx-auto max-w-4xl",
            children: [o.jsx(ge, {
                icon: o.jsx(ud, {
                    className: "h-5 w-5"
                }),
                kicker: "THE TEAM",
                title: "Creators",
                subtitle: "The students behind this Cyber Security Science Exhibition project."
            }), o.jsx("div", {
                className: "mt-8 grid gap-6 sm:grid-cols-2",
                children: vm.map(t => o.jsxs("div", {
                    className: "glass glass-hover group relative overflow-hidden rounded-2xl p-6 text-center",
                    children: [o.jsx("div", {
                        className: "pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100",
                        style: {
                            boxShadow: `0 0 30px ${t.color}55, inset 0 0 20px ${t.color}22`
                        }
                    }), o.jsxs("div", {
                        className: "relative",
                        children: [o.jsxs("div", {
                            className: "relative mx-auto mb-4 h-24 w-24",
                            children: [o.jsx("div", {
                                className: "absolute inset-0 animate-spin-slow rounded-full border-2",
                                style: {
                                    borderTopColor: t.color,
                                    borderRightColor: "transparent",
                                    borderLeftColor: "transparent",
                                    borderBottomColor: `${t.color}44`
                                }
                            }), o.jsx("div", {
                                className: "absolute inset-2 animate-spin-rev rounded-full border",
                                style: {
                                    borderColor: "transparent",
                                    borderTopColor: `${t.color}88`
                                }
                            }), o.jsx("div", {
                                className: "absolute inset-3 grid place-items-center rounded-full font-orbitron text-3xl font-bold",
                                style: {
                                    color: t.color,
                                    background: "rgba(3,8,20,0.8)"
                                },
                                children: t.initial
                            })]
                        }), o.jsx("h3", {
                            className: "font-orbitron text-xl text-white",
                            children: t.name
                        }), o.jsx("div", {
                            className: "mt-3 flex flex-col items-stretch gap-2",
                            children: t.roles.map( (n, r) => o.jsxs("div", {
                                className: "flex items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm",
                                style: {
                                    borderColor: `${t.color}33`,
                                    color: "#cbd5e1",
                                    background: "rgba(3,8,20,0.4)"
                                },
                                children: [o.jsx("span", {
                                    style: {
                                        color: t.color
                                    },
                                    children: t.icons[r]
                                }), n]
                            }, n))
                        })]
                    })]
                }, t.name))
            })]
        })
    })
}
function km() {
    const [e,t] = b.useState(!1);
    b.useEffect( () => {
        const r = () => t(window.scrollY > 500);
        return window.addEventListener("scroll", r),
        () => window.removeEventListener("scroll", r)
    }
    , []);
    const n = () => {
        z("click"),
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }
    ;
    return o.jsxs("footer", {
        className: "relative mt-10 border-t border-cyber-cyan/20 px-4 py-12 sm:px-6",
        children: [o.jsxs("div", {
            className: "mx-auto max-w-5xl text-center",
            children: [o.jsxs("div", {
                className: "mb-4 flex items-center justify-center gap-2",
                children: [o.jsx(yn, {
                    className: "h-6 w-6 text-cyber-cyan drop-shadow-[0_0_8px_rgba(34,211,238,0.7)]"
                }), o.jsxs("span", {
                    className: "section-title text-sm tracking-widest text-cyber-cyan",
                    children: ["CYBER", o.jsx("span", {
                        className: "text-cyber-purple",
                        children: "SEC"
                    })]
                })]
            }), o.jsx("blockquote", {
                className: "mx-auto mb-6 max-w-2xl font-orbitron text-lg text-slate-200",
                children: `"Cyber Security is not just about technology, it's about awareness."`
            }), o.jsx("div", {
                className: "mb-6 flex items-center justify-center gap-3",
                children: [rh, vh, oh, fr].map( (r, s) => o.jsx("button", {
                    onClick: () => z("click"),
                    className: "glass glass-hover grid h-10 w-10 place-items-center rounded-lg text-cyber-cyan",
                    "aria-label": "Social link (demo)",
                    children: o.jsx(r, {
                        className: "h-4 w-4"
                    })
                }, s))
            }), o.jsxs("div", {
                className: "flex flex-wrap items-center justify-center gap-x-4 gap-y-1 font-mono text-[11px] text-slate-500",
                children: [o.jsx("span", {
                    children: "Science Exhibition Project"
                }), o.jsx("span", {
                    className: "hidden sm:inline",
                    children: "•"
                }), o.jsx("span", {
                    children: "By Udayveer & Jagrit"
                }), o.jsx("span", {
                    className: "hidden sm:inline",
                    children: "•"
                }), o.jsx("span", {
                    children: "Educational use only • Simulated data"
                })]
            })]
        }), e && o.jsx("button", {
            onClick: n,
            "aria-label": "Back to top",
            className: "fixed bottom-6 right-6 z-40 grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-cyber-cyan to-cyber-purple text-cyber-black shadow-glow transition-transform hover:scale-110",
            children: o.jsx(Qf, {
                className: "h-5 w-5"
            })
        })]
    })
}
function Wa() {
    const e = window.location.hash.replace(/^#\/?/, "");
    return ["home", "assistant", "password-checker", "phishing", "quiz", "scam", "generator", "simulation", "mindmap", "stats", "checklist", "creators"].includes(e) ? e : "home"
}
function bm() {
    const [e,t] = b.useState(!0)
      , [n,r] = b.useState( () => typeof window < "u" ? Wa() : "home")
      , [s,l] = b.useState(0)
      , {on: i, toggle: a} = Eh();
    b.useEffect( () => {
        document.body.style.overflow = e ? "hidden" : ""
    }
    , [e]),
    b.useEffect( () => {
        const h = () => {
            r(Wa()),
            l(y => y + 1),
            window.scrollTo({
                top: 0
            })
        }
        ;
        return window.addEventListener("hashchange", h),
        () => window.removeEventListener("hashchange", h)
    }
    , []);
    const c = b.useCallback(h => {
        if (h === n) {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
            return
        }
        window.location.hash = `/${h}`
    }
    , [n])
      , u = () => {
        switch (n) {
        case "home":
            return o.jsx(_a, {});
        case "assistant":
            return o.jsx(Fh, {});
        case "password-checker":
            return o.jsx(Qh, {});
        case "phishing":
            return o.jsx(Gh, {});
        case "quiz":
            return o.jsx(Xh, {});
        case "scam":
            return o.jsx(em, {});
        case "generator":
            return o.jsx(cm, {});
        case "simulation":
            return o.jsx(um, {});
        case "mindmap":
            return o.jsx(pm, {});
        case "stats":
            return o.jsx(hm, {});
        case "checklist":
            return o.jsx(xm, {});
        case "creators":
            return o.jsx(wm, {});
        default:
            return o.jsx(_a, {})
        }
    }
    ;
    return o.jsxs(pd.Provider, {
        value: {
            page: n,
            navigate: c
        },
        children: [e && o.jsx(Nh, {
            onDone: () => t(!1)
        }), o.jsx(jh, {}), o.jsxs("div", {
            className: `relative transition-opacity duration-700 ${e ? "opacity-0" : "opacity-100"}`,
            children: [o.jsx(Ph, {
                soundOn: i,
                onToggleSound: a
            }), o.jsx("main", {
                className: "animate-fade-in",
                children: u()
            }, s), o.jsx(km, {})]
        })]
    })
}
td(document.getElementById("root")).render(o.jsx(b.StrictMode, {
    children: o.jsx(bm, {})
}));

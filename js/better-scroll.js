<<<<<<< HEAD
/*!
 * better-normal-scroll v1.9.1
 * (c) 2016-2018 ustbhuangyi
 * Released under the MIT License.
 */
! function(t, i) { "object" == typeof exports && "undefined" != typeof module ? module.exports = i() : "function" == typeof define && define.amd ? define(i) : t.BScroll = i() }(this, function() {
    "use strict";

    function t() { return window.performance && window.performance.now ? window.performance.now() + window.performance.timing.navigationStart : +new Date }

    function i(t) { for (var i = arguments.length, e = Array(i > 1 ? i - 1 : 0), s = 1; s < i; s++) e[s - 1] = arguments[s]; for (var o = 0; o < e.length; o++) { var n = e[o]; for (var r in n) t[r] = n[r] } return t }

    function e(t) { return void 0 === t || null === t }

    function s(t) { return !1 !== Y && ("standard" === Y ? "transitionEnd" === t ? "transitionend" : t : Y + t.charAt(0).toUpperCase() + t.substr(1)) }

    function o(t, i, e, s) { t.addEventListener(i, e, { passive: !1, capture: !!s }) }

    function n(t, i, e, s) { t.removeEventListener(i, e, { passive: !1, capture: !!s }) }

    function r(t) { for (var i = 0, e = 0; t;) i -= t.offsetLeft, e -= t.offsetTop, t = t.offsetParent; return { left: i, top: e } }

    function h(t) { if (t instanceof window.SVGElement) { var i = t.getBoundingClientRect(); return { top: i.top, left: i.left, width: i.width, height: i.height } } return { top: t.offsetTop, left: t.offsetLeft, width: t.offsetWidth, height: t.offsetHeight } }

    function a(t, i) {
        for (var e in i)
            if (i[e].test(t[e])) return !0;
        return !1
    }

    function l(t, i) {
        var e = document.createEvent("Event");
        e.initEvent(i, !0, !0), e.pageX = t.pageX, e.pageY = t.pageY, t.target.dispatchEvent(e)
    }

    function c(t) {
        function e() {
            (n = document.createEvent("Event")).initEvent(r, h, a), i(n, o)
        }
        var s = void 0;
        "mouseup" === t.type || "mousecancel" === t.type ? s = t : "touchend" !== t.type && "touchcancel" !== t.type || (s = t.changedTouches[0]);
        var o = {};
        s && (o.screenX = s.screenX || 0, o.screenY = s.screenY || 0, o.clientX = s.clientX || 0, o.clientY = s.clientY || 0);
        var n = void 0,
            r = "click",
            h = !0,
            a = !0;
        if ("undefined" != typeof MouseEvent) try { n = new MouseEvent(r, i({ bubbles: h, cancelable: a }, o)) } catch (t) { e() } else e();
        n.forwardedTouchEvent = !0, n._constructed = !0, t.target.dispatchEvent(n)
    }

    function p(t, i) { i.firstChild ? u(t, i.firstChild) : i.appendChild(t) }

    function u(t, i) { i.parentNode.insertBefore(t, i) }

    function d(t, i) { t.removeChild(i) }

    function f(t, i, e, s, o, n) {
        var r = t - i,
            h = Math.abs(r) / e,
            a = n.deceleration,
            l = n.itemHeight,
            c = n.swipeBounceTime,
            p = n.wheel,
            u = n.swipeTime,
            d = p ? 4 : 15,
            f = t + h / a * (r < 0 ? -1 : 1);
        return p && l && (f = Math.round(f / l) * l), f < s ? (f = o ? Math.max(s - o / 4, s - o / d * h) : s, u = c) : f > 0 && (f = o ? Math.min(o / 4, o / d * h) : 0, u = c), { destination: Math.round(f), duration: u }
    }

    function g() {}

    function m(t) { console.error("[BScroll warn]: " + t) }

    function v(t, i) { if (!t) throw new Error("[BScroll] " + i) }

    function y(t) {
        var i = document.createElement("div"),
            e = document.createElement("div");
        return i.style.cssText = "position:absolute;z-index:9999;pointerEvents:none", e.style.cssText = "box-sizing:border-box;position:absolute;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);border-radius:3px;", e.className = "bscroll-indicator", "horizontal" === t ? (i.style.cssText += ";height:7px;left:2px;right:2px;bottom:0", e.style.height = "100%", i.className = "bscroll-horizontal-scrollbar") : (i.style.cssText += ";width:7px;bottom:2px;top:2px;right:1px", e.style.width = "100%", i.className = "bscroll-vertical-scrollbar"), i.style.cssText += ";overflow:hidden", i.appendChild(e), i
    }

    function w(t, i) { this.wrapper = i.el, this.wrapperStyle = this.wrapper.style, this.indicator = this.wrapper.children[0], this.indicatorStyle = this.indicator.style, this.scroller = t, this.direction = i.direction, i.fade ? (this.visible = 0, this.wrapperStyle.opacity = "0") : this.visible = 1, this.sizeRatioX = 1, this.sizeRatioY = 1, this.maxPosX = 0, this.maxPosY = 0, this.x = 0, this.y = 0, i.interactive && this._addDOMEvents() }

    function x(t, i) { this.wrapper = "string" == typeof t ? document.querySelector(t) : t, this.wrapper || m("Can not resolve the wrapper DOM."), this.scroller = this.wrapper.children[0], this.scroller || m("The wrapper need at least one child element to be scroller."), this.scrollerStyle = this.scroller.style, this._init(t, i) }
    var T = function() {
            function t(t, i) {
                var e = [],
                    s = !0,
                    o = !1,
                    n = void 0;
                try { for (var r, h = t[Symbol.iterator](); !(s = (r = h.next()).done) && (e.push(r.value), !i || e.length !== i); s = !0); } catch (t) { o = !0, n = t } finally { try {!s && h.return && h.return() } finally { if (o) throw n } }
                return e
            }
            return function(i, e) { if (Array.isArray(i)) return i; if (Symbol.iterator in Object(i)) return t(i, e); throw new TypeError("Invalid attempt to destructure non-iterable instance") }
        }(),
        b = function(t) { if (Array.isArray(t)) { for (var i = 0, e = Array(t.length); i < t.length; i++) e[i] = t[i]; return e } return Array.from(t) },
        _ = "undefined" != typeof window,
        S = _ && navigator.userAgent.toLowerCase(),
        P = S && /wechatdevtools/.test(S),
        M = S && S.indexOf("android") > 0,
        X = _ && document.createElement("div").style,
        Y = function() {
            if (!_) return !1;
            var t = { webkit: "webkitTransform", Moz: "MozTransform", O: "OTransform", ms: "msTransform", standard: "transform" };
            for (var i in t)
                if (void 0 !== X[t[i]]) return i;
            return !1
        }(),
        D = s("transform"),
        E = _ && s("perspective") in X,
        k = _ && ("ontouchstart" in window || P),
        W = !1 !== D,
        H = _ && s("transition") in X,
        O = { transform: D, transitionTimingFunction: s("transitionTimingFunction"), transitionDuration: s("transitionDuration"), transitionProperty: s("transitionProperty"), transitionDelay: s("transitionDelay"), transformOrigin: s("transformOrigin"), transitionEnd: s("transitionEnd") },
        L = 1,
        z = { touchstart: L, touchmove: L, touchend: L, mousedown: 2, mousemove: 2, mouseup: 2 },
        C = { startX: 0, startY: 0, scrollX: !1, scrollY: !0, freeScroll: !1, directionLockThreshold: 5, eventPassthrough: "", click: !1, tap: !1, bounce: !0, bounceTime: 800, momentum: !0, momentumLimitTime: 300, momentumLimitDistance: 15, swipeTime: 2500, swipeBounceTime: 500, deceleration: .001, flickLimitTime: 200, flickLimitDistance: 100, resizePolling: 60, probeType: 0, preventDefault: !0, preventDefaultException: { tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/ }, HWCompositing: !0, useTransition: !0, useTransform: !0, bindToWrapper: !1, disableMouse: k, disableTouch: !k, observeDOM: !0, autoBlur: !0, wheel: !1, snap: !1, scrollbar: !1, pullDownRefresh: !1, pullUpLoad: !1, mouseWheel: !1, stopPropagation: !1 },
        A = { swipe: { style: "cubic-bezier(0.23, 1, 0.32, 1)", fn: function(t) { return 1 + --t * t * t * t * t } }, swipeBounce: { style: "cubic-bezier(0.25, 0.46, 0.45, 0.94)", fn: function(t) { return t * (2 - t) } }, bounce: { style: "cubic-bezier(0.165, 0.84, 0.44, 1)", fn: function(t) { return 1 - --t * t * t * t } } },
        I = _ ? window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || function(t) { return window.setTimeout(t, (t.interval || 100 / 60) / 2) } : g,
        F = _ ? window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || function(t) { window.clearTimeout(t) } : g,
        R = 1,
        U = -1,
        B = 1,
        N = -1,
        V = 1,
        q = 3;
    return w.prototype.handleEvent = function(t) {
            switch (t.type) {
                case "touchstart":
                case "mousedown":
                    this._start(t);
                    break;
                case "touchmove":
                case "mousemove":
                    this._move(t);
                    break;
                case "touchend":
                case "mouseup":
                case "touchcancel":
                case "mousecancel":
                    this._end(t)
            }
        }, w.prototype.refresh = function() { this.transitionTime(), this._calculate(), this.updatePosition() }, w.prototype.fade = function(t, i) {
            var e = this;
            if (!i || this.visible) {
                var s = t ? 250 : 500;
                t = t ? "1" : "0", this.wrapperStyle[O.transitionDuration] = s + "ms", clearTimeout(this.fadeTimeout), this.fadeTimeout = setTimeout(function() { e.wrapperStyle.opacity = t, e.visible = +t }, 0)
            }
        }, w.prototype.updatePosition = function() {
            if ("vertical" === this.direction) {
                var t = Math.round(this.sizeRatioY * this.scroller.y);
                if (t < 0) {
                    this.transitionTime(500);
                    var i = Math.max(this.indicatorHeight + 3 * t, 8);
                    this.indicatorStyle.height = i + "px", t = 0
                } else if (t > this.maxPosY) {
                    this.transitionTime(500);
                    var e = Math.max(this.indicatorHeight - 3 * (t - this.maxPosY), 8);
                    this.indicatorStyle.height = e + "px", t = this.maxPosY + this.indicatorHeight - e
                } else this.indicatorStyle.height = this.indicatorHeight + "px";
                this.y = t, this.scroller.options.useTransform ? this.indicatorStyle[O.transform] = "translateY(" + t + "px)" + this.scroller.translateZ : this.indicatorStyle.top = t + "px"
            } else {
                var s = Math.round(this.sizeRatioX * this.scroller.x);
                if (s < 0) {
                    this.transitionTime(500);
                    var o = Math.max(this.indicatorWidth + 3 * s, 8);
                    this.indicatorStyle.width = o + "px", s = 0
                } else if (s > this.maxPosX) {
                    this.transitionTime(500);
                    var n = Math.max(this.indicatorWidth - 3 * (s - this.maxPosX), 8);
                    this.indicatorStyle.width = n + "px", s = this.maxPosX + this.indicatorWidth - n
                } else this.indicatorStyle.width = this.indicatorWidth + "px";
                this.x = s, this.scroller.options.useTransform ? this.indicatorStyle[O.transform] = "translateX(" + s + "px)" + this.scroller.translateZ : this.indicatorStyle.left = s + "px"
            }
        }, w.prototype.transitionTime = function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
            this.indicatorStyle[O.transitionDuration] = t + "ms"
        }, w.prototype.transitionTimingFunction = function(t) { this.indicatorStyle[O.transitionTimingFunction] = t }, w.prototype.destroy = function() { this._removeDOMEvents(), this.wrapper.parentNode.removeChild(this.wrapper) }, w.prototype._start = function(i) {
            var e = i.touches ? i.touches[0] : i;
            i.preventDefault(), i.stopPropagation(), this.transitionTime(), this.initiated = !0, this.moved = !1, this.lastPointX = e.pageX, this.lastPointY = e.pageY, this.startTime = t(), this._handleMoveEvents(o), this.scroller.trigger("beforeScrollStart")
        }, w.prototype._move = function(t) {
            var i = t.touches ? t.touches[0] : t;
            t.preventDefault(), t.stopPropagation(), this.moved || this.scroller.trigger("scrollStart"), this.moved = !0;
            var e = i.pageX - this.lastPointX;
            this.lastPointX = i.pageX;
            var s = i.pageY - this.lastPointY;
            this.lastPointY = i.pageY;
            var o = this.x + e,
                n = this.y + s;
            this._pos(o, n)
        }, w.prototype._end = function(t) {
            if (this.initiated) {
                this.initiated = !1, t.preventDefault(), t.stopPropagation(), this._handleMoveEvents(n);
                var i = this.scroller.options.snap;
                if (i) {
                    var e = i.speed,
                        s = i.easing,
                        o = void 0 === s ? A.bounce : s,
                        r = this.scroller._nearestSnap(this.scroller.x, this.scroller.y),
                        h = e || Math.max(Math.max(Math.min(Math.abs(this.scroller.x - r.x), 1e3), Math.min(Math.abs(this.scroller.y - r.y), 1e3)), 300);
                    this.scroller.x === r.x && this.scroller.y === r.y || (this.scroller.directionX = 0, this.scroller.directionY = 0, this.scroller.currentPage = r, this.scroller.scrollTo(r.x, r.y, h, o))
                }
                this.moved && this.scroller.trigger("scrollEnd", { x: this.scroller.x, y: this.scroller.y })
            }
        }, w.prototype._pos = function(t, i) { t < 0 ? t = 0 : t > this.maxPosX && (t = this.maxPosX), i < 0 ? i = 0 : i > this.maxPosY && (i = this.maxPosY), t = Math.round(t / this.sizeRatioX), i = Math.round(i / this.sizeRatioY), this.scroller.scrollTo(t, i), this.scroller.trigger("scroll", { x: this.scroller.x, y: this.scroller.y }) }, w.prototype._calculate = function() {
            if ("vertical" === this.direction) {
                var t = this.wrapper.clientHeight;
                this.indicatorHeight = Math.max(Math.round(t * t / (this.scroller.scrollerHeight || t || 1)), 8), this.indicatorStyle.height = this.indicatorHeight + "px", this.maxPosY = t - this.indicatorHeight, this.sizeRatioY = this.maxPosY / this.scroller.maxScrollY
            } else {
                var i = this.wrapper.clientWidth;
                this.indicatorWidth = Math.max(Math.round(i * i / (this.scroller.scrollerWidth || i || 1)), 8), this.indicatorStyle.width = this.indicatorWidth + "px", this.maxPosX = i - this.indicatorWidth, this.sizeRatioX = this.maxPosX / this.scroller.maxScrollX
            }
        }, w.prototype._addDOMEvents = function() {
            var t = o;
            this._handleDOMEvents(t)
        }, w.prototype._removeDOMEvents = function() {
            var t = n;
            this._handleDOMEvents(t), this._handleMoveEvents(t)
        }, w.prototype._handleMoveEvents = function(t) { this.scroller.options.disableTouch || t(window, "touchmove", this), this.scroller.options.disableMouse || t(window, "mousemove", this) }, w.prototype._handleDOMEvents = function(t) { this.scroller.options.disableTouch || (t(this.indicator, "touchstart", this), t(window, "touchend", this)), this.scroller.options.disableMouse || (t(this.indicator, "mousedown", this), t(window, "mouseup", this)) },
        function(t) {
            t.prototype._init = function(t, i) { this._handleOptions(i), this._events = {}, this.x = 0, this.y = 0, this.directionX = 0, this.directionY = 0, this._addDOMEvents(), this._initExtFeatures(), this._watchTransition(), this.options.observeDOM && this._initDOMObserver(), this.options.autoBlur && this._handleAutoBlur(), this.refresh(), this.options.snap || this.scrollTo(this.options.startX, this.options.startY), this.enable() }, t.prototype._handleOptions = function(t) { this.options = i({}, C, t), this.translateZ = this.options.HWCompositing && E ? " translateZ(0)" : "", this.options.useTransition = this.options.useTransition && H, this.options.useTransform = this.options.useTransform && W, this.options.preventDefault = !this.options.eventPassthrough && this.options.preventDefault, this.options.scrollX = "horizontal" !== this.options.eventPassthrough && this.options.scrollX, this.options.scrollY = "vertical" !== this.options.eventPassthrough && this.options.scrollY, this.options.freeScroll = this.options.freeScroll && !this.options.eventPassthrough, this.options.directionLockThreshold = this.options.eventPassthrough ? 0 : this.options.directionLockThreshold, !0 === this.options.tap && (this.options.tap = "tap") }, t.prototype._addDOMEvents = function() {
                var t = o;
                this._handleDOMEvents(t)
            }, t.prototype._removeDOMEvents = function() {
                var t = n;
                this._handleDOMEvents(t)
            }, t.prototype._handleDOMEvents = function(t) {
                var i = this.options.bindToWrapper ? this.wrapper : window;
                t(window, "orientationchange", this), t(window, "resize", this), this.options.click && t(this.wrapper, "click", this, !0), this.options.disableMouse || (t(this.wrapper, "mousedown", this), t(i, "mousemove", this), t(i, "mousecancel", this), t(i, "mouseup", this)), k && !this.options.disableTouch && (t(this.wrapper, "touchstart", this), t(i, "touchmove", this), t(i, "touchcancel", this), t(i, "touchend", this)), t(this.scroller, O.transitionEnd, this)
            }, t.prototype._initExtFeatures = function() { this.options.snap && this._initSnap(), this.options.scrollbar && this._initScrollbar(), this.options.pullUpLoad && this._initPullUp(), this.options.pullDownRefresh && this._initPullDown(), this.options.wheel && this._initWheel(), this.options.mouseWheel && this._initMouseWheel() }, t.prototype._watchTransition = function() {
                if ("function" == typeof Object.defineProperty) {
                    var t = this,
                        i = !1;
                    Object.defineProperty(this, "isInTransition", { get: function() { return i }, set: function(e) { i = e; for (var s = t.scroller.children.length ? t.scroller.children : [t.scroller], o = i && !t.pulling ? "none" : "auto", n = 0; n < s.length; n++) s[n].style.pointerEvents = o } })
                }
            }, t.prototype._handleAutoBlur = function() { this.on("beforeScrollStart", function() { var t = document.activeElement;!t || "INPUT" !== t.tagName && "TEXTAREA" !== t.tagName || t.blur() }) }, t.prototype._initDOMObserver = function() {
                var t = this;
                if ("undefined" != typeof MutationObserver) {
                    var i = void 0,
                        e = new MutationObserver(function(e) {
                            if (!t._shouldNotRefresh()) {
                                for (var s = !1, o = !1, n = 0; n < e.length; n++) { var r = e[n]; if ("attributes" !== r.type) { s = !0; break } if (r.target !== t.scroller) { o = !0; break } }
                                s ? t.refresh() : o && (clearTimeout(i), i = setTimeout(function() { t._shouldNotRefresh() || t.refresh() }, 60))
                            }
                        }),
                        s = { attributes: !0, childList: !0, subtree: !0 };
                    e.observe(this.scroller, s), this.on("destroy", function() { e.disconnect() })
                } else this._checkDOMUpdate()
            }, t.prototype._shouldNotRefresh = function() { var t = this.x > 0 || this.x < this.maxScrollX || this.y > 0 || this.y < this.maxScrollY; return this.isInTransition || this.stopFromTransition || t }, t.prototype._checkDOMUpdate = function() {
                function t() {
                    if (!this.destroyed) {
                        var t = (e = h(this.scroller)).width,
                            n = e.height;
                        s === t && o === n || this.refresh(), s = t, o = n, i.call(this)
                    }
                }

                function i() {
                    var i = this;
                    setTimeout(function() { t.call(i) }, 1e3)
                }
                var e = h(this.scroller),
                    s = e.width,
                    o = e.height;
                i.call(this)
            }, t.prototype.handleEvent = function(t) {
                switch (t.type) {
                    case "touchstart":
                    case "mousedown":
                        this._start(t);
                        break;
                    case "touchmove":
                    case "mousemove":
                        this._move(t);
                        break;
                    case "touchend":
                    case "mouseup":
                    case "touchcancel":
                    case "mousecancel":
                        this._end(t);
                        break;
                    case "orientationchange":
                    case "resize":
                        this._resize();
                        break;
                    case "transitionend":
                    case "webkitTransitionEnd":
                    case "oTransitionEnd":
                    case "MSTransitionEnd":
                        this._transitionEnd(t);
                        break;
                    case "click":
                        this.enabled && !t._constructed && (a(t.target, this.options.preventDefaultException) || (t.preventDefault(), t.stopPropagation()));
                        break;
                    case "wheel":
                    case "DOMMouseScroll":
                    case "mousewheel":
                        this._onMouseWheel(t)
                }
            }, t.prototype.refresh = function() {
                var t = h(this.wrapper);
                this.wrapperWidth = t.width, this.wrapperHeight = t.height;
                var i = h(this.scroller);
                this.scrollerWidth = i.width, this.scrollerHeight = i.height;
                var e = this.options.wheel;
                e ? (this.items = this.scroller.children, this.options.itemHeight = this.itemHeight = this.items.length ? this.scrollerHeight / this.items.length : 0, void 0 === this.selectedIndex && (this.selectedIndex = e.selectedIndex || 0), this.options.startY = -this.selectedIndex * this.itemHeight, this.maxScrollX = 0, this.maxScrollY = -this.itemHeight * (this.items.length - 1)) : (this.maxScrollX = this.wrapperWidth - this.scrollerWidth, this.maxScrollY = this.wrapperHeight - this.scrollerHeight), this.hasHorizontalScroll = this.options.scrollX && this.maxScrollX < 0, this.hasVerticalScroll = this.options.scrollY && this.maxScrollY < 0, this.hasHorizontalScroll || (this.maxScrollX = 0, this.scrollerWidth = this.wrapperWidth), this.hasVerticalScroll || (this.maxScrollY = 0, this.scrollerHeight = this.wrapperHeight), this.endTime = 0, this.directionX = 0, this.directionY = 0, this.wrapperOffset = r(this.wrapper), this.trigger("refresh"), this.resetPosition()
            }, t.prototype.enable = function() { this.enabled = !0 }, t.prototype.disable = function() { this.enabled = !1 }
        }(x),
        function(i) {
            i.prototype._start = function(i) {
                var e = z[i.type];
                if ((e === L || 0 === i.button) && !(!this.enabled || this.destroyed || this.initiated && this.initiated !== e)) {
                    this.initiated = e, this.options.preventDefault && !a(i.target, this.options.preventDefaultException) && i.preventDefault(), this.options.stopPropagation && i.stopPropagation(), this.moved = !1, this.distX = 0, this.distY = 0, this.directionX = 0, this.directionY = 0, this.movingDirectionX = 0, this.movingDirectionY = 0, this.directionLocked = 0, this._transitionTime(), this.startTime = t(), this.options.wheel && (this.target = i.target), this.stop();
                    var s = i.touches ? i.touches[0] : i;
                    this.startX = this.x, this.startY = this.y, this.absStartX = this.x, this.absStartY = this.y, this.pointX = s.pageX, this.pointY = s.pageY, this.trigger("beforeScrollStart")
                }
            }, i.prototype._move = function(i) {
                if (this.enabled && !this.destroyed && z[i.type] === this.initiated) {
                    this.options.preventDefault && i.preventDefault(), this.options.stopPropagation && i.stopPropagation();
                    var e = i.touches ? i.touches[0] : i,
                        s = e.pageX - this.pointX,
                        o = e.pageY - this.pointY;
                    this.pointX = e.pageX, this.pointY = e.pageY, this.distX += s, this.distY += o;
                    var n = Math.abs(this.distX),
                        r = Math.abs(this.distY),
                        h = t();
                    if (!(h - this.endTime > this.options.momentumLimitTime && r < this.options.momentumLimitDistance && n < this.options.momentumLimitDistance)) {
                        if (this.directionLocked || this.options.freeScroll || (n > r + this.options.directionLockThreshold ? this.directionLocked = "h" : r >= n + this.options.directionLockThreshold ? this.directionLocked = "v" : this.directionLocked = "n"), "h" === this.directionLocked) {
                            if ("vertical" === this.options.eventPassthrough) i.preventDefault();
                            else if ("horizontal" === this.options.eventPassthrough) return void(this.initiated = !1);
                            o = 0
                        } else if ("v" === this.directionLocked) {
                            if ("horizontal" === this.options.eventPassthrough) i.preventDefault();
                            else if ("vertical" === this.options.eventPassthrough) return void(this.initiated = !1);
                            s = 0
                        }
                        s = this.hasHorizontalScroll ? s : 0, o = this.hasVerticalScroll ? o : 0, this.movingDirectionX = s > 0 ? N : s < 0 ? B : 0, this.movingDirectionY = o > 0 ? U : o < 0 ? R : 0;
                        var a = this.x + s,
                            l = this.y + o;
                        (a > 0 || a < this.maxScrollX) && (a = this.options.bounce ? this.x + s / 3 : a > 0 ? 0 : this.maxScrollX), (l > 0 || l < this.maxScrollY) && (l = this.options.bounce ? this.y + o / 3 : l > 0 ? 0 : this.maxScrollY), this.moved || (this.moved = !0, this.trigger("scrollStart")), this._translate(a, l), h - this.startTime > this.options.momentumLimitTime && (this.startTime = h, this.startX = this.x, this.startY = this.y, this.options.probeType === V && this.trigger("scroll", { x: this.x, y: this.y })), this.options.probeType > V && this.trigger("scroll", { x: this.x, y: this.y });
                        var c = document.documentElement.scrollLeft || window.pageXOffset || document.body.scrollLeft,
                            p = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop,
                            u = this.pointX - c,
                            d = this.pointY - p;
                        (u > document.documentElement.clientWidth - this.options.momentumLimitDistance || u < this.options.momentumLimitDistance || d < this.options.momentumLimitDistance || d > document.documentElement.clientHeight - this.options.momentumLimitDistance) && this._end(i)
                    }
                }
            }, i.prototype._end = function(i) {
                if (this.enabled && !this.destroyed && z[i.type] === this.initiated) {
                    this.initiated = !1, this.options.preventDefault && !a(i.target, this.options.preventDefaultException) && i.preventDefault(), this.options.stopPropagation && i.stopPropagation(), this.trigger("touchEnd", { x: this.x, y: this.y }), this.isInTransition = !1;
                    var e = Math.round(this.x),
                        s = Math.round(this.y),
                        o = e - this.absStartX,
                        n = s - this.absStartY;
                    if (this.directionX = o > 0 ? N : o < 0 ? B : 0, this.directionY = n > 0 ? U : n < 0 ? R : 0, !this.options.pullDownRefresh || !this._checkPullDown())
                        if (this._checkClick(i)) this.trigger("scrollCancel");
                        else if (!this.resetPosition(this.options.bounceTime, A.bounce)) {
                        this.scrollTo(e, s), this.endTime = t();
                        var r = this.endTime - this.startTime,
                            h = Math.abs(e - this.startX),
                            l = Math.abs(s - this.startY);
                        if (this._events.flick && r < this.options.flickLimitTime && h < this.options.flickLimitDistance && l < this.options.flickLimitDistance) this.trigger("flick");
                        else {
                            var c = 0;
                            if (this.options.momentum && r < this.options.momentumLimitTime && (l > this.options.momentumLimitDistance || h > this.options.momentumLimitDistance)) {
                                var p = this.hasHorizontalScroll ? f(this.x, this.startX, r, this.maxScrollX, this.options.bounce ? this.wrapperWidth : 0, this.options) : { destination: e, duration: 0 },
                                    u = this.hasVerticalScroll ? f(this.y, this.startY, r, this.maxScrollY, this.options.bounce ? this.wrapperHeight : 0, this.options) : { destination: s, duration: 0 };
                                e = p.destination, s = u.destination, c = Math.max(p.duration, u.duration), this.isInTransition = !0
                            } else this.options.wheel && (s = Math.round(s / this.itemHeight) * this.itemHeight, c = this.options.wheel.adjustTime || 400);
                            var d = A.swipe;
                            if (this.options.snap) {
                                var g = this._nearestSnap(e, s);
                                this.currentPage = g, c = this.options.snapSpeed || Math.max(Math.max(Math.min(Math.abs(e - g.x), 1e3), Math.min(Math.abs(s - g.y), 1e3)), 300), e = g.x, s = g.y, this.directionX = 0, this.directionY = 0, d = this.options.snap.easing || A.bounce
                            }
                            if (e !== this.x || s !== this.y) return (e > 0 || e < this.maxScrollX || s > 0 || s < this.maxScrollY) && (d = A.swipeBounce), void this.scrollTo(e, s, c, d);
                            this.options.wheel && (this.selectedIndex = Math.round(Math.abs(this.y / this.itemHeight))), this.trigger("scrollEnd", { x: this.x, y: this.y })
                        }
                    }
                }
            }, i.prototype._checkClick = function(t) {
                var i = this.stopFromTransition && !this.pulling;
                if (this.stopFromTransition = !1, !this.moved) {
                    if (this.options.wheel) {
                        if (this.target && this.target.className === this.options.wheel.wheelWrapperClass) {
                            var e = Math.abs(Math.round(this.y / this.itemHeight)),
                                s = Math.round((this.pointY + r(this.target).top - this.itemHeight / 2) / this.itemHeight);
                            this.target = this.items[e + s]
                        }
                        return this.scrollToElement(this.target, this.options.wheel.adjustTime || 400, !0, !0, A.swipe), !0
                    }
                    return !i && (this.options.tap && l(t, this.options.tap), this.options.click && !a(t.target, this.options.preventDefaultException) && c(t), !0)
                }
                return !1
            }, i.prototype._resize = function() {
                var t = this;
                this.enabled && (M && (this.wrapper.scrollTop = 0), clearTimeout(this.resizeTimeout), this.resizeTimeout = setTimeout(function() { t.refresh() }, this.options.resizePolling))
            }, i.prototype._startProbe = function() {
                function t() {
                    var e = i.getComputedPosition();
                    i.trigger("scroll", e), i.isInTransition ? i.probeTimer = I(t) : i.trigger("scrollEnd", e)
                }
                F(this.probeTimer), this.probeTimer = I(t);
                var i = this
            }, i.prototype._transitionProperty = function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "transform";
                this.scrollerStyle[O.transitionProperty] = t
            }, i.prototype._transitionTime = function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
                if (this.scrollerStyle[O.transitionDuration] = t + "ms", this.options.wheel)
                    for (var i = 0; i < this.items.length; i++) this.items[i].style[O.transitionDuration] = t + "ms";
                if (this.indicators)
                    for (var e = 0; e < this.indicators.length; e++) this.indicators[e].transitionTime(t)
            }, i.prototype._transitionTimingFunction = function(t) {
                if (this.scrollerStyle[O.transitionTimingFunction] = t, this.options.wheel)
                    for (var i = 0; i < this.items.length; i++) this.items[i].style[O.transitionTimingFunction] = t;
                if (this.indicators)
                    for (var e = 0; e < this.indicators.length; e++) this.indicators[e].transitionTimingFunction(t)
            }, i.prototype._transitionEnd = function(t) { t.target === this.scroller && this.isInTransition && (this._transitionTime(), this.pulling || this.resetPosition(this.options.bounceTime, A.bounce) || (this.isInTransition = !1, this.options.probeType !== q && this.trigger("scrollEnd", { x: this.x, y: this.y }))) }, i.prototype._translate = function(t, i) {
                if (v(!e(t) && !e(i), "Oops! translate x or y is null or undefined. please check your code."), this.options.useTransform ? this.scrollerStyle[O.transform] = "translate(" + t + "px," + i + "px)" + this.translateZ : (t = Math.round(t), i = Math.round(i), this.scrollerStyle.left = t + "px", this.scrollerStyle.top = i + "px"), this.options.wheel)
                    for (var s = this.options.wheel.rotate, o = void 0 === s ? 25 : s, n = 0; n < this.items.length; n++) {
                        var r = o * (i / this.itemHeight + n);
                        this.items[n].style[O.transform] = "rotateX(" + r + "deg)"
                    }
                if (this.x = t, this.y = i, this.indicators)
                    for (var h = 0; h < this.indicators.length; h++) this.indicators[h].updatePosition()
            }, i.prototype._animate = function(i, e, s, o) {
                function n() {
                    var p = t();
                    if (p >= c) return r.isAnimating = !1, r._translate(i, e), void(r.pulling || r.resetPosition(r.options.bounceTime) || r.trigger("scrollEnd", { x: r.x, y: r.y }));
                    var u = o(p = (p - l) / s),
                        d = (i - h) * u + h,
                        f = (e - a) * u + a;
                    r._translate(d, f), r.isAnimating && (r.animateTimer = I(n)), r.options.probeType === q && r.trigger("scroll", { x: r.x, y: r.y })
                }
                var r = this,
                    h = this.x,
                    a = this.y,
                    l = t(),
                    c = l + s;
                this.isAnimating = !0, F(this.animateTimer), n()
            }, i.prototype.scrollBy = function(t, i) {
                var e = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0,
                    s = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : A.bounce;
                t = this.x + t, i = this.y + i, this.scrollTo(t, i, e, s)
            }, i.prototype.scrollTo = function(t, i) {
                var e = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0,
                    s = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : A.bounce;
                this.isInTransition = this.options.useTransition && e > 0 && (t !== this.x || i !== this.y), !e || this.options.useTransition ? (this._transitionProperty(), this._transitionTimingFunction(s.style), this._transitionTime(e), this._translate(t, i), e && this.options.probeType === q && this._startProbe(), this.options.wheel && (i > 0 ? this.selectedIndex = 0 : i < this.maxScrollY ? this.selectedIndex = this.items.length - 1 : this.selectedIndex = Math.round(Math.abs(i / this.itemHeight)))) : this._animate(t, i, e, s.fn)
            }, i.prototype.scrollToElement = function(t, i, e, s, o) {
                if (t && (t = t.nodeType ? t : this.scroller.querySelector(t), !this.options.wheel || t.className === this.options.wheel.wheelItemClass)) {
                    var n = r(t);
                    n.left -= this.wrapperOffset.left, n.top -= this.wrapperOffset.top, !0 === e && (e = Math.round(t.offsetWidth / 2 - this.wrapper.offsetWidth / 2)), !0 === s && (s = Math.round(t.offsetHeight / 2 - this.wrapper.offsetHeight / 2)), n.left -= e || 0, n.top -= s || 0, n.left = n.left > 0 ? 0 : n.left < this.maxScrollX ? this.maxScrollX : n.left, n.top = n.top > 0 ? 0 : n.top < this.maxScrollY ? this.maxScrollY : n.top, this.options.wheel && (n.top = Math.round(n.top / this.itemHeight) * this.itemHeight), this.scrollTo(n.left, n.top, i, o)
                }
            }, i.prototype.resetPosition = function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
                    i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : A.bounce,
                    e = this.x,
                    s = Math.round(e);
                !this.hasHorizontalScroll || s > 0 ? e = 0 : s < this.maxScrollX && (e = this.maxScrollX);
                var o = this.y,
                    n = Math.round(o);
                return !this.hasVerticalScroll || n > 0 ? o = 0 : n < this.maxScrollY && (o = this.maxScrollY), (e !== this.x || o !== this.y) && (this.scrollTo(e, o, t, i), !0)
            }, i.prototype.getComputedPosition = function() {
                var t = window.getComputedStyle(this.scroller, null),
                    i = void 0,
                    e = void 0;
                return this.options.useTransform ? (i = +((t = t[O.transform].split(")")[0].split(", "))[12] || t[4]), e = +(t[13] || t[5])) : (i = +t.left.replace(/[^-\d.]/g, ""), e = +t.top.replace(/[^-\d.]/g, "")), { x: i, y: e }
            }, i.prototype.stop = function() {
                if (this.options.useTransition && this.isInTransition) {
                    this.isInTransition = !1;
                    var t = this.getComputedPosition();
                    this._translate(t.x, t.y), this.options.wheel ? this.target = this.items[Math.round(-t.y / this.itemHeight)] : this.trigger("scrollEnd", { x: this.x, y: this.y }), this.stopFromTransition = !0
                } else !this.options.useTransition && this.isAnimating && (this.isAnimating = !1, this.trigger("scrollEnd", { x: this.x, y: this.y }), this.stopFromTransition = !0)
            }, i.prototype.destroy = function() { this.destroyed = !0, this.trigger("destroy"), this._removeDOMEvents(), this._events = {} }
        }(x),
        function(t) {
            t.prototype.on = function(t, i) {
                var e = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : this;
                this._events[t] || (this._events[t] = []), this._events[t].push([i, e])
            }, t.prototype.once = function(t, i) {
                function e() { this.off(t, e), i.apply(s, arguments) }
                var s = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : this;
                e.fn = i, this.on(t, e)
            }, t.prototype.off = function(t, i) {
                var e = this._events[t];
                if (e)
                    for (var s = e.length; s--;)(e[s][0] === i || e[s][0] && e[s][0].fn === i) && (e[s][0] = void 0)
            }, t.prototype.trigger = function(t) {
                var i = this._events[t];
                if (i)
                    for (var e = i.length, s = [].concat(b(i)), o = 0; o < e; o++) {
                        var n = s[o],
                            r = T(n, 2),
                            h = r[0],
                            a = r[1];
                        h && h.apply(a, [].slice.call(arguments, 1))
                    }
            }
        }(x),
        function(t) {
            t.prototype._initSnap = function() {
                var t = this;
                this.currentPage = {};
                var i = this.options.snap;
                if (i.loop) {
                    var e = this.scroller.children;
                    e.length > 1 ? (p(e[e.length - 1].cloneNode(!0), this.scroller), this.scroller.appendChild(e[1].cloneNode(!0))) : i.loop = !1
                }
                var s = i.el;
                "string" == typeof s && (s = this.scroller.querySelectorAll(s)), this.on("refresh", function() {
                    if (t.pages = [], t.wrapperWidth && t.wrapperHeight && t.scrollerWidth && t.scrollerHeight) {
                        var e = i.stepX || t.wrapperWidth,
                            o = i.stepY || t.wrapperHeight,
                            n = 0,
                            r = void 0,
                            a = void 0,
                            l = void 0,
                            c = 0,
                            p = void 0,
                            u = 0,
                            d = void 0,
                            f = void 0;
                        if (s)
                            for (p = s.length, d = -1; c < p; c++) f = h(s[c]), (0 === c || f.left <= h(s[c - 1]).left) && (u = 0, d++), t.pages[u] || (t.pages[u] = []), n = Math.max(-f.left, t.maxScrollX), r = Math.max(-f.top, t.maxScrollY), a = n - Math.round(f.width / 2), l = r - Math.round(f.height / 2), t.pages[u][d] = { x: n, y: r, width: f.width, height: f.height, cx: a, cy: l }, n > t.maxScrollX && u++;
                        else
                            for (a = Math.round(e / 2), l = Math.round(o / 2); n > -t.scrollerWidth;) {
                                for (t.pages[c] = [], p = 0, r = 0; r > -t.scrollerHeight;) t.pages[c][p] = { x: Math.max(n, t.maxScrollX), y: Math.max(r, t.maxScrollY), width: e, height: o, cx: n - a, cy: r - l }, r -= o, p++;
                                n -= e, c++
                            }
                        t._checkSnapLoop();
                        var g = i._loopX ? 1 : 0,
                            m = i._loopY ? 1 : 0;
                        t._goToPage(t.currentPage.pageX || g, t.currentPage.pageY || m, 0);
                        var v = i.threshold;
                        v % 1 == 0 ? (t.snapThresholdX = v, t.snapThresholdY = v) : (t.snapThresholdX = Math.round(t.pages[t.currentPage.pageX][t.currentPage.pageY].width * v), t.snapThresholdY = Math.round(t.pages[t.currentPage.pageX][t.currentPage.pageY].height * v))
                    }
                }), this.on("scrollEnd", function() { i.loop && (i._loopX ? (0 === t.currentPage.pageX && t._goToPage(t.pages.length - 2, t.currentPage.pageY, 0), t.currentPage.pageX === t.pages.length - 1 && t._goToPage(1, t.currentPage.pageY, 0)) : (0 === t.currentPage.pageY && t._goToPage(t.currentPage.pageX, t.pages[0].length - 2, 0), t.currentPage.pageY === t.pages[0].length - 1 && t._goToPage(t.currentPage.pageX, 1, 0))) }), !1 !== i.listenFlick && this.on("flick", function() {
                    var e = i.speed || Math.max(Math.max(Math.min(Math.abs(t.x - t.startX), 1e3), Math.min(Math.abs(t.y - t.startY), 1e3)), 300);
                    t._goToPage(t.currentPage.pageX + t.directionX, t.currentPage.pageY + t.directionY, e)
                }), this.on("destroy", function() {
                    if (i.loop) {
                        var e = t.scroller.children;
                        e.length > 2 && (d(t.scroller, e[e.length - 1]), d(t.scroller, e[0]))
                    }
                })
            }, t.prototype._checkSnapLoop = function() {
                var t = this.options.snap;
                t.loop && this.pages && (this.pages.length > 1 && (t._loopX = !0), this.pages[0] && this.pages[0].length > 1 && (t._loopY = !0), t._loopX && t._loopY && m("Loop does not support two direction at the same time."))
            }, t.prototype._nearestSnap = function(t, i) {
                if (!this.pages.length) return { x: 0, y: 0, pageX: 0, pageY: 0 };
                var e = 0;
                if (Math.abs(t - this.absStartX) <= this.snapThresholdX && Math.abs(i - this.absStartY) <= this.snapThresholdY) return this.currentPage;
                t > 0 ? t = 0 : t < this.maxScrollX && (t = this.maxScrollX), i > 0 ? i = 0 : i < this.maxScrollY && (i = this.maxScrollY);
                for (var s = this.pages.length; e < s; e++)
                    if (t >= this.pages[e][0].cx) { t = this.pages[e][0].x; break }
                s = this.pages[e].length;
                for (var o = 0; o < s; o++)
                    if (i >= this.pages[0][o].cy) { i = this.pages[0][o].y; break }
                return e === this.currentPage.pageX && ((e += this.directionX) < 0 ? e = 0 : e >= this.pages.length && (e = this.pages.length - 1), t = this.pages[e][0].x), o === this.currentPage.pageY && ((o += this.directionY) < 0 ? o = 0 : o >= this.pages[0].length && (o = this.pages[0].length - 1), i = this.pages[0][o].y), { x: t, y: i, pageX: e, pageY: o }
            }, t.prototype._goToPage = function(t) {
                var i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
                    e = arguments[2],
                    s = arguments[3],
                    o = this.options.snap;
                if (o && this.pages && (s = s || o.easing || A.bounce, t >= this.pages.length ? t = this.pages.length - 1 : t < 0 && (t = 0), this.pages[t])) {
                    i >= this.pages[t].length ? i = this.pages[t].length - 1 : i < 0 && (i = 0);
                    var n = this.pages[t][i].x,
                        r = this.pages[t][i].y;
                    e = void 0 === e ? o.speed || Math.max(Math.max(Math.min(Math.abs(n - this.x), 1e3), Math.min(Math.abs(r - this.y), 1e3)), 300) : e, this.currentPage = { x: n, y: r, pageX: t, pageY: i }, this.scrollTo(n, r, e, s)
                }
            }, t.prototype.goToPage = function(t, i, e, s) {
                var o = this.options.snap;
                if (o) {
                    if (o.loop) {
                        var n = void 0;
                        o._loopX ? (t >= (n = this.pages.length - 2) ? t = n - 1 : t < 0 && (t = 0), t += 1) : (i >= (n = this.pages[0].length - 2) ? i = n - 1 : i < 0 && (i = 0), i += 1)
                    }
                    this._goToPage(t, i, e, s)
                }
            }, t.prototype.next = function(t, i) {
                if (this.options.snap) {
                    var e = this.currentPage.pageX,
                        s = this.currentPage.pageY;
                    ++e >= this.pages.length && this.hasVerticalScroll && (e = 0, s++), this._goToPage(e, s, t, i)
                }
            }, t.prototype.prev = function(t, i) {
                if (this.options.snap) {
                    var e = this.currentPage.pageX,
                        s = this.currentPage.pageY;
                    --e < 0 && this.hasVerticalScroll && (e = 0, s--), this._goToPage(e, s, t, i)
                }
            }, t.prototype.getCurrentPage = function() { var t = this.options.snap; return t ? t.loop ? t._loopX ? i({}, this.currentPage, { pageX: this.currentPage.pageX - 1 }) : i({}, this.currentPage, { pageY: this.currentPage.pageY - 1 }) : this.currentPage : null }
        }(x),
        function(t) {
            t.prototype.wheelTo = function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
                this.options.wheel && (this.y = -t * this.itemHeight, this.scrollTo(0, this.y))
            }, t.prototype.getSelectedIndex = function() { return this.options.wheel && this.selectedIndex }, t.prototype._initWheel = function() {
                var t = this.options.wheel;
                t.wheelWrapperClass || (t.wheelWrapperClass = "wheel-scroll"), t.wheelItemClass || (t.wheelItemClass = "wheel-item"), void 0 === t.selectedIndex && (t.selectedIndex = 0, m("wheel option selectedIndex is required!"))
            }
        }(x),
        function(t) {
            t.prototype._initScrollbar = function() {
                var t = this,
                    i = this.options.scrollbar,
                    e = i.fade,
                    s = void 0 === e || e,
                    o = i.interactive,
                    n = void 0 !== o && o;
                this.indicators = [];
                var r = void 0;
                this.options.scrollX && (r = { el: y("horizontal"), direction: "horizontal", fade: s, interactive: n }, this._insertScrollBar(r.el), this.indicators.push(new w(this, r))), this.options.scrollY && (r = { el: y("vertical"), direction: "vertical", fade: s, interactive: n }, this._insertScrollBar(r.el), this.indicators.push(new w(this, r))), this.on("refresh", function() { for (var i = 0; i < t.indicators.length; i++) t.indicators[i].refresh() }), s && (this.on("scrollEnd", function() { for (var i = 0; i < t.indicators.length; i++) t.indicators[i].fade() }), this.on("scrollCancel", function() { for (var i = 0; i < t.indicators.length; i++) t.indicators[i].fade() }), this.on("scrollStart", function() { for (var i = 0; i < t.indicators.length; i++) t.indicators[i].fade(!0) }), this.on("beforeScrollStart", function() { for (var i = 0; i < t.indicators.length; i++) t.indicators[i].fade(!0, !0) })), this.on("destroy", function() { t._removeScrollBars() })
            }, t.prototype._insertScrollBar = function(t) { this.wrapper.appendChild(t) }, t.prototype._removeScrollBars = function() { for (var t = 0; t < this.indicators.length; t++) this.indicators[t].destroy() }
        }(x),
        function(t) {
            t.prototype._initPullDown = function() { this.options.probeType = q }, t.prototype._checkPullDown = function() {
                var t = this.options.pullDownRefresh,
                    i = t.threshold,
                    e = void 0 === i ? 90 : i,
                    s = t.stop,
                    o = void 0 === s ? 40 : s;
                return !(this.directionY !== U || this.y < e) && (this.pulling || (this.pulling = !0, this.trigger("pullingDown")), this.scrollTo(this.x, o, this.options.bounceTime, A.bounce), this.pulling)
            }, t.prototype.finishPullDown = function() { this.pulling = !1, this.resetPosition(this.options.bounceTime, A.bounce) }, t.prototype.openPullDown = function() {
                var t = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
                this.options.pullDownRefresh = t, this._initPullDown()
            }, t.prototype.closePullDown = function() { this.options.pullDownRefresh = !1 }
        }(x),
        function(t) {
            t.prototype._initPullUp = function() { this.options.probeType = q, this.pullupWatching = !1, this._watchPullUp() }, t.prototype._watchPullUp = function() { this.pullupWatching || (this.pullupWatching = !0, this.on("scroll", this._checkToEnd)) }, t.prototype._checkToEnd = function(t) {
                var i = this,
                    e = this.options.pullUpLoad.threshold,
                    s = void 0 === e ? 0 : e;
                this.movingDirectionY === R && t.y <= this.maxScrollY + s && (this.once("scrollEnd", function() { i.pullupWatching = !1 }), this.trigger("pullingUp"), this.off("scroll", this._checkToEnd))
            }, t.prototype.finishPullUp = function() {
                var t = this;
                this.pullupWatching ? this.once("scrollEnd", function() { t._watchPullUp() }) : this._watchPullUp()
            }, t.prototype.openPullUp = function() {
                var t = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
                this.options.pullUpLoad = t, this._initPullUp()
            }, t.prototype.closePullUp = function() { this.options.pullUpLoad = !1, this.pullupWatching && (this.pullupWatching = !1, this.off("scroll", this._checkToEnd)) }
        }(x),
        function(t) {
            t.prototype._initMouseWheel = function() {
                var t = this;
                this._handleMouseWheelEvent(o), this.on("destroy", function() { clearTimeout(t.mouseWheelTimer), t._handleMouseWheelEvent(n) }), this.firstWheelOpreation = !0
            }, t.prototype._handleMouseWheelEvent = function(t) { t(this.wrapper, "wheel", this), t(this.wrapper, "mousewheel", this), t(this.wrapper, "DOMMouseScroll", this) }, t.prototype._onMouseWheel = function(t) {
                var i = this;
                if (this.enabled) {
                    t.preventDefault(), this.firstWheelOpreation && this.trigger("scrollStart"), this.firstWheelOpreation = !1, clearTimeout(this.mouseWheelTimer), this.mouseWheelTimer = setTimeout(function() { i.options.snap || i.trigger("scrollEnd", { x: i.x, y: i.y }), i.firstWheelOpreation = !0 }, 400);
                    var e = this.options.mouseWheel,
                        s = e.speed,
                        o = void 0 === s ? 20 : s,
                        n = e.invert,
                        r = void 0 !== n && n,
                        h = void 0,
                        a = void 0;
                    switch (!0) {
                        case "deltaX" in t:
                            1 === t.deltaMode ? (h = -t.deltaX * o, a = -t.deltaY * o) : (h = -t.deltaX, a = -t.deltaY);
                            break;
                        case "wheelDeltaX" in t:
                            h = t.wheelDeltaX / 120 * o, a = t.wheelDeltaY / 120 * o;
                            break;
                        case "wheelDelta" in t:
                            h = a = t.wheelDelta / 120 * o;
                            break;
                        case "detail" in t:
                            h = a = -t.detail / 3 * o;
                            break;
                        default:
                            return
                    }
                    var l = r ? -1 : 1;
                    h *= l, a *= l, this.hasVerticalScroll || (h = a, a = 0);
                    var c = void 0,
                        p = void 0;
                    if (this.options.snap) return c = this.currentPage.pageX, p = this.currentPage.pageY, h > 0 ? c-- : h < 0 && c++, a > 0 ? p-- : a < 0 && p++, void this._goToPage(c, p);
                    c = this.x + Math.round(this.hasHorizontalScroll ? h : 0), p = this.y + Math.round(this.hasVerticalScroll ? a : 0), this.directionX = h > 0 ? -1 : h < 0 ? 1 : 0, this.directionY = a > 0 ? -1 : a < 0 ? 1 : 0, c > 0 ? c = 0 : c < this.maxScrollX && (c = this.maxScrollX), p > 0 ? p = 0 : p < this.maxScrollY && (p = this.maxScrollY), this.scrollTo(c, p), this.trigger("scroll", { x: this.x, y: this.y })
                }
            }
        }(x), x.Version = "1.9.1", x
});
=======
!function(t,i){"object"==typeof exports&&"undefined"!=typeof module?module.exports=i():"function"==typeof define&&define.amd?define(i):t.BScroll=i()}(this,function(){"use strict";function g(){return window.performance&&window.performance.now?window.performance.now()+window.performance.timing.navigationStart:+new Date}function a(t){for(var i=arguments.length,e=Array(1<i?i-1:0),s=1;s<i;s++)e[s-1]=arguments[s];for(var o=0;o<e.length;o++){var n=e[o];for(var r in n)t[r]=n[r]}return t}function h(t){return null==t}function t(t){return!1!==k&&("standard"===k?"transitionEnd"===t?"transitionend":t:k+t.charAt(0).toUpperCase()+t.substr(1))}function e(t,i,e,s){t.addEventListener(i,e,{passive:!1,capture:!!s})}function l(t,i,e,s){t.removeEventListener(i,e,{passive:!1,capture:!!s})}function c(t){for(var i=0,e=0;t;)i-=t.offsetLeft,e-=t.offsetTop,t=t.offsetParent;return{left:i,top:e}}function v(t){if(t instanceof window.SVGElement){var i=t.getBoundingClientRect();return{top:i.top,left:i.left,width:i.width,height:i.height}}return{top:t.offsetTop,left:t.offsetLeft,width:t.offsetWidth,height:t.offsetHeight}}function d(t,i){for(var e in i)if(i[e].test(t[e]))return!0;return!1}function n(t,i){t.removeChild(i)}function f(t,i,e,s,o,n){var r=t-i,h=Math.abs(r)/e,a=n.deceleration,l=n.itemHeight,c=n.swipeBounceTime,p=n.wheel,u=n.swipeTime,d=p?4:15,g=t+h/a*(r<0?-1:1);return p&&l&&(g=Math.round(g/l)*l),g<s?(g=o?Math.max(s-o/4,s-o/d*h):s,u=c):0<g&&(g=o?Math.min(o/4,o/d*h):0,u=c),{destination:Math.round(g),duration:u}}function i(){}function s(t){console.error("[BScroll warn]: "+t)}function p(t){var i=document.createElement("div"),e=document.createElement("div");return i.style.cssText="position:absolute;z-index:9999;pointerEvents:none",e.style.cssText="box-sizing:border-box;position:absolute;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);border-radius:3px;",e.className="bscroll-indicator",i.className="horizontal"===t?(i.style.cssText+=";height:7px;left:2px;right:2px;bottom:0",e.style.height="100%","bscroll-horizontal-scrollbar"):(i.style.cssText+=";width:7px;bottom:2px;top:2px;right:1px",e.style.width="100%","bscroll-vertical-scrollbar"),i.style.cssText+=";overflow:hidden",i.appendChild(e),i}function u(t,i){this.wrapper=i.el,this.wrapperStyle=this.wrapper.style,this.indicator=this.wrapper.children[0],this.indicatorStyle=this.indicator.style,this.scroller=t,this.direction=i.direction,i.fade?(this.visible=0,this.wrapperStyle.opacity="0"):this.visible=1,this.sizeRatioX=1,this.sizeRatioY=1,this.maxPosX=0,this.maxPosY=0,this.x=0,this.y=0,i.interactive&&this._addDOMEvents()}function o(t,i){this.wrapper="string"==typeof t?document.querySelector(t):t,this.wrapper||s("Can not resolve the wrapper DOM."),this.scroller=this.wrapper.children[0],this.scroller||s("The wrapper need at least one child element to be scroller."),this.scrollerStyle=this.scroller.style,this._init(t,i)}var r,m,y,w,x,T,b,_,S,P=function(t,i){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return function(t,i){var e=[],s=!0,o=!1,n=void 0;try{for(var r,h=t[Symbol.iterator]();!(s=(r=h.next()).done)&&(e.push(r.value),!i||e.length!==i);s=!0);}catch(t){o=!0,n=t}finally{try{!s&&h.return&&h.return()}finally{if(o)throw n}}return e}(t,i);throw new TypeError("Invalid attempt to destructure non-iterable instance")},M="undefined"!=typeof window,X=M&&navigator.userAgent.toLowerCase(),Y=X&&/wechatdevtools/.test(X),D=X&&0<X.indexOf("android"),E=M&&document.createElement("div").style,k=function(){if(!M)return!1;var t={webkit:"webkitTransform",Moz:"MozTransform",O:"OTransform",ms:"msTransform",standard:"transform"};for(var i in t)if(void 0!==E[t[i]])return i;return!1}(),W=t("transform"),H=M&&t("perspective")in E,O=M&&("ontouchstart"in window||Y),L=!1!==W,z=M&&t("transition")in E,C={transform:W,transitionTimingFunction:t("transitionTimingFunction"),transitionDuration:t("transitionDuration"),transitionProperty:t("transitionProperty"),transitionDelay:t("transitionDelay"),transformOrigin:t("transformOrigin"),transitionEnd:t("transitionEnd")},A={touchstart:1,touchmove:1,touchend:1,mousedown:2,mousemove:2,mouseup:2},I={startX:0,startY:0,scrollX:!1,scrollY:!0,freeScroll:!1,directionLockThreshold:5,eventPassthrough:"",click:!1,tap:!1,bounce:!0,bounceTime:800,momentum:!0,momentumLimitTime:300,momentumLimitDistance:15,swipeTime:2500,swipeBounceTime:500,deceleration:.001,flickLimitTime:200,flickLimitDistance:100,resizePolling:60,probeType:0,preventDefault:!0,preventDefaultException:{tagName:/^(INPUT|TEXTAREA|BUTTON|SELECT)$/},HWCompositing:!0,useTransition:!0,useTransform:!0,bindToWrapper:!1,disableMouse:O,disableTouch:!O,observeDOM:!0,autoBlur:!0,wheel:!1,snap:!1,scrollbar:!1,pullDownRefresh:!1,pullUpLoad:!1,mouseWheel:!1,stopPropagation:!1},F={swipe:{style:"cubic-bezier(0.23, 1, 0.32, 1)",fn:function(t){return 1+--t*t*t*t*t}},swipeBounce:{style:"cubic-bezier(0.25, 0.46, 0.45, 0.94)",fn:function(t){return t*(2-t)}},bounce:{style:"cubic-bezier(0.165, 0.84, 0.44, 1)",fn:function(t){return 1- --t*t*t*t}}},R=M?window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||function(t){return window.setTimeout(t,(t.interval||100/60)/2)}:i,U=M?window.cancelAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame||window.oCancelAnimationFrame||function(t){window.clearTimeout(t)}:i;return u.prototype.handleEvent=function(t){switch(t.type){case"touchstart":case"mousedown":this._start(t);break;case"touchmove":case"mousemove":this._move(t);break;case"touchend":case"mouseup":case"touchcancel":case"mousecancel":this._end(t)}},u.prototype.refresh=function(){this.transitionTime(),this._calculate(),this.updatePosition()},u.prototype.fade=function(t,i){var e=this;if(!i||this.visible){var s=t?250:500;t=t?"1":"0",this.wrapperStyle[C.transitionDuration]=s+"ms",clearTimeout(this.fadeTimeout),this.fadeTimeout=setTimeout(function(){e.wrapperStyle.opacity=t,e.visible=+t},0)}},u.prototype.updatePosition=function(){if("vertical"===this.direction){var t=Math.round(this.sizeRatioY*this.scroller.y);if(t<0){this.transitionTime(500);var i=Math.max(this.indicatorHeight+3*t,8);this.indicatorStyle.height=i+"px",t=0}else if(t>this.maxPosY){this.transitionTime(500);var e=Math.max(this.indicatorHeight-3*(t-this.maxPosY),8);this.indicatorStyle.height=e+"px",t=this.maxPosY+this.indicatorHeight-e}else this.indicatorStyle.height=this.indicatorHeight+"px";this.y=t,this.scroller.options.useTransform?this.indicatorStyle[C.transform]="translateY("+t+"px)"+this.scroller.translateZ:this.indicatorStyle.top=t+"px"}else{var s=Math.round(this.sizeRatioX*this.scroller.x);if(s<0){this.transitionTime(500);var o=Math.max(this.indicatorWidth+3*s,8);this.indicatorStyle.width=o+"px",s=0}else if(s>this.maxPosX){this.transitionTime(500);var n=Math.max(this.indicatorWidth-3*(s-this.maxPosX),8);this.indicatorStyle.width=n+"px",s=this.maxPosX+this.indicatorWidth-n}else this.indicatorStyle.width=this.indicatorWidth+"px";this.x=s,this.scroller.options.useTransform?this.indicatorStyle[C.transform]="translateX("+s+"px)"+this.scroller.translateZ:this.indicatorStyle.left=s+"px"}},u.prototype.transitionTime=function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:0;this.indicatorStyle[C.transitionDuration]=t+"ms"},u.prototype.transitionTimingFunction=function(t){this.indicatorStyle[C.transitionTimingFunction]=t},u.prototype.destroy=function(){this._removeDOMEvents(),this.wrapper.parentNode.removeChild(this.wrapper)},u.prototype._start=function(t){var i=t.touches?t.touches[0]:t;t.preventDefault(),t.stopPropagation(),this.transitionTime(),this.initiated=!0,this.moved=!1,this.lastPointX=i.pageX,this.lastPointY=i.pageY,this.startTime=g(),this._handleMoveEvents(e),this.scroller.trigger("beforeScrollStart")},u.prototype._move=function(t){var i=t.touches?t.touches[0]:t;t.preventDefault(),t.stopPropagation(),this.moved||this.scroller.trigger("scrollStart"),this.moved=!0;var e=i.pageX-this.lastPointX;this.lastPointX=i.pageX;var s=i.pageY-this.lastPointY;this.lastPointY=i.pageY;var o=this.x+e,n=this.y+s;this._pos(o,n)},u.prototype._end=function(t){if(this.initiated){this.initiated=!1,t.preventDefault(),t.stopPropagation(),this._handleMoveEvents(l);var i=this.scroller.options.snap;if(i){var e=i.speed,s=i.easing,o=void 0===s?F.bounce:s,n=this.scroller._nearestSnap(this.scroller.x,this.scroller.y),r=e||Math.max(Math.max(Math.min(Math.abs(this.scroller.x-n.x),1e3),Math.min(Math.abs(this.scroller.y-n.y),1e3)),300);this.scroller.x===n.x&&this.scroller.y===n.y||(this.scroller.directionX=0,this.scroller.directionY=0,this.scroller.currentPage=n,this.scroller.scrollTo(n.x,n.y,r,o))}this.moved&&this.scroller.trigger("scrollEnd",{x:this.scroller.x,y:this.scroller.y})}},u.prototype._pos=function(t,i){t<0?t=0:t>this.maxPosX&&(t=this.maxPosX),i<0?i=0:i>this.maxPosY&&(i=this.maxPosY),t=Math.round(t/this.sizeRatioX),i=Math.round(i/this.sizeRatioY),this.scroller.scrollTo(t,i),this.scroller.trigger("scroll",{x:this.scroller.x,y:this.scroller.y})},u.prototype._calculate=function(){if("vertical"===this.direction){var t=this.wrapper.clientHeight;this.indicatorHeight=Math.max(Math.round(t*t/(this.scroller.scrollerHeight||t||1)),8),this.indicatorStyle.height=this.indicatorHeight+"px",this.maxPosY=t-this.indicatorHeight,this.sizeRatioY=this.maxPosY/this.scroller.maxScrollY}else{var i=this.wrapper.clientWidth;this.indicatorWidth=Math.max(Math.round(i*i/(this.scroller.scrollerWidth||i||1)),8),this.indicatorStyle.width=this.indicatorWidth+"px",this.maxPosX=i-this.indicatorWidth,this.sizeRatioX=this.maxPosX/this.scroller.maxScrollX}},u.prototype._addDOMEvents=function(){var t=e;this._handleDOMEvents(t)},u.prototype._removeDOMEvents=function(){var t=l;this._handleDOMEvents(t),this._handleMoveEvents(t)},u.prototype._handleMoveEvents=function(t){this.scroller.options.disableTouch||t(window,"touchmove",this),this.scroller.options.disableMouse||t(window,"mousemove",this)},u.prototype._handleDOMEvents=function(t){this.scroller.options.disableTouch||(t(this.indicator,"touchstart",this),t(window,"touchend",this)),this.scroller.options.disableMouse||(t(this.indicator,"mousedown",this),t(window,"mouseup",this))},(S=o).prototype._init=function(t,i){this._handleOptions(i),this._events={},this.x=0,this.y=0,this.directionX=0,this.directionY=0,this._addDOMEvents(),this._initExtFeatures(),this._watchTransition(),this.options.observeDOM&&this._initDOMObserver(),this.options.autoBlur&&this._handleAutoBlur(),this.refresh(),this.options.snap||this.scrollTo(this.options.startX,this.options.startY),this.enable()},S.prototype._handleOptions=function(t){this.options=a({},I,t),this.translateZ=this.options.HWCompositing&&H?" translateZ(0)":"",this.options.useTransition=this.options.useTransition&&z,this.options.useTransform=this.options.useTransform&&L,this.options.preventDefault=!this.options.eventPassthrough&&this.options.preventDefault,this.options.scrollX="horizontal"!==this.options.eventPassthrough&&this.options.scrollX,this.options.scrollY="vertical"!==this.options.eventPassthrough&&this.options.scrollY,this.options.freeScroll=this.options.freeScroll&&!this.options.eventPassthrough,this.options.directionLockThreshold=this.options.eventPassthrough?0:this.options.directionLockThreshold,!0===this.options.tap&&(this.options.tap="tap")},S.prototype._addDOMEvents=function(){var t=e;this._handleDOMEvents(t)},S.prototype._removeDOMEvents=function(){var t=l;this._handleDOMEvents(t)},S.prototype._handleDOMEvents=function(t){var i=this.options.bindToWrapper?this.wrapper:window;t(window,"orientationchange",this),t(window,"resize",this),this.options.click&&t(this.wrapper,"click",this,!0),this.options.disableMouse||(t(this.wrapper,"mousedown",this),t(i,"mousemove",this),t(i,"mousecancel",this),t(i,"mouseup",this)),O&&!this.options.disableTouch&&(t(this.wrapper,"touchstart",this),t(i,"touchmove",this),t(i,"touchcancel",this),t(i,"touchend",this)),t(this.scroller,C.transitionEnd,this)},S.prototype._initExtFeatures=function(){this.options.snap&&this._initSnap(),this.options.scrollbar&&this._initScrollbar(),this.options.pullUpLoad&&this._initPullUp(),this.options.pullDownRefresh&&this._initPullDown(),this.options.wheel&&this._initWheel(),this.options.mouseWheel&&this._initMouseWheel()},S.prototype._watchTransition=function(){if("function"==typeof Object.defineProperty){var o=this,n=!1;Object.defineProperty(this,"isInTransition",{get:function(){return n},set:function(t){n=t;for(var i=o.scroller.children.length?o.scroller.children:[o.scroller],e=n&&!o.pulling?"none":"auto",s=0;s<i.length;s++)i[s].style.pointerEvents=e}})}},S.prototype._handleAutoBlur=function(){this.on("beforeScrollStart",function(){var t=document.activeElement;!t||"INPUT"!==t.tagName&&"TEXTAREA"!==t.tagName||t.blur()})},S.prototype._initDOMObserver=function(){var n=this;if("undefined"!=typeof MutationObserver){var r=void 0,t=new MutationObserver(function(t){if(!n._shouldNotRefresh()){for(var i=!1,e=!1,s=0;s<t.length;s++){var o=t[s];if("attributes"!==o.type){i=!0;break}if(o.target!==n.scroller){e=!0;break}}i?n.refresh():e&&(clearTimeout(r),r=setTimeout(function(){n._shouldNotRefresh()||n.refresh()},60))}});t.observe(this.scroller,{attributes:!0,childList:!0,subtree:!0}),this.on("destroy",function(){t.disconnect()})}else this._checkDOMUpdate()},S.prototype._shouldNotRefresh=function(){var t=0<this.x||this.x<this.maxScrollX||0<this.y||this.y<this.maxScrollY;return this.isInTransition||this.stopFromTransition||t},S.prototype._checkDOMUpdate=function(){function e(){var t=this;setTimeout(function(){(function(){if(!this.destroyed){var t=(s=v(this.scroller)).width,i=s.height;o===t&&n===i||this.refresh(),o=t,n=i,e.call(this)}}).call(t)},1e3)}var s=v(this.scroller),o=s.width,n=s.height;e.call(this)},S.prototype.handleEvent=function(t){switch(t.type){case"touchstart":case"mousedown":this._start(t);break;case"touchmove":case"mousemove":this._move(t);break;case"touchend":case"mouseup":case"touchcancel":case"mousecancel":this._end(t);break;case"orientationchange":case"resize":this._resize();break;case"transitionend":case"webkitTransitionEnd":case"oTransitionEnd":case"MSTransitionEnd":this._transitionEnd(t);break;case"click":this.enabled&&!t._constructed&&(d(t.target,this.options.preventDefaultException)||(t.preventDefault(),t.stopPropagation()));break;case"wheel":case"DOMMouseScroll":case"mousewheel":this._onMouseWheel(t)}},S.prototype.refresh=function(){var t=v(this.wrapper);this.wrapperWidth=t.width,this.wrapperHeight=t.height;var i=v(this.scroller);this.scrollerWidth=i.width,this.scrollerHeight=i.height;var e=this.options.wheel;this.maxScrollY=e?(this.items=this.scroller.children,this.options.itemHeight=this.itemHeight=this.items.length?this.scrollerHeight/this.items.length:0,void 0===this.selectedIndex&&(this.selectedIndex=e.selectedIndex||0),this.options.startY=-this.selectedIndex*this.itemHeight,this.maxScrollX=0,-this.itemHeight*(this.items.length-1)):(this.maxScrollX=this.wrapperWidth-this.scrollerWidth,this.wrapperHeight-this.scrollerHeight),this.hasHorizontalScroll=this.options.scrollX&&this.maxScrollX<0,this.hasVerticalScroll=this.options.scrollY&&this.maxScrollY<0,this.hasHorizontalScroll||(this.maxScrollX=0,this.scrollerWidth=this.wrapperWidth),this.hasVerticalScroll||(this.maxScrollY=0,this.scrollerHeight=this.wrapperHeight),this.endTime=0,this.directionX=0,this.directionY=0,this.wrapperOffset=c(this.wrapper),this.trigger("refresh"),this.resetPosition()},S.prototype.enable=function(){this.enabled=!0},S.prototype.disable=function(){this.enabled=!1},(_=o).prototype._start=function(t){var i=A[t.type];if((1===i||0===t.button)&&!(!this.enabled||this.destroyed||this.initiated&&this.initiated!==i)){this.initiated=i,this.options.preventDefault&&!d(t.target,this.options.preventDefaultException)&&t.preventDefault(),this.options.stopPropagation&&t.stopPropagation(),this.moved=!1,this.distX=0,this.distY=0,this.directionX=0,this.directionY=0,this.movingDirectionX=0,this.movingDirectionY=0,this.directionLocked=0,this._transitionTime(),this.startTime=g(),this.options.wheel&&(this.target=t.target),this.stop();var e=t.touches?t.touches[0]:t;this.startX=this.x,this.startY=this.y,this.absStartX=this.x,this.absStartY=this.y,this.pointX=e.pageX,this.pointY=e.pageY,this.trigger("beforeScrollStart")}},_.prototype._move=function(t){if(this.enabled&&!this.destroyed&&A[t.type]===this.initiated){this.options.preventDefault&&t.preventDefault(),this.options.stopPropagation&&t.stopPropagation();var i=t.touches?t.touches[0]:t,e=i.pageX-this.pointX,s=i.pageY-this.pointY;this.pointX=i.pageX,this.pointY=i.pageY,this.distX+=e,this.distY+=s;var o=Math.abs(this.distX),n=Math.abs(this.distY),r=g();if(!(r-this.endTime>this.options.momentumLimitTime&&n<this.options.momentumLimitDistance&&o<this.options.momentumLimitDistance)){if(this.directionLocked||this.options.freeScroll||(o>n+this.options.directionLockThreshold?this.directionLocked="h":n>=o+this.options.directionLockThreshold?this.directionLocked="v":this.directionLocked="n"),"h"===this.directionLocked){if("vertical"===this.options.eventPassthrough)t.preventDefault();else if("horizontal"===this.options.eventPassthrough)return void(this.initiated=!1);s=0}else if("v"===this.directionLocked){if("horizontal"===this.options.eventPassthrough)t.preventDefault();else if("vertical"===this.options.eventPassthrough)return void(this.initiated=!1);e=0}e=this.hasHorizontalScroll?e:0,s=this.hasVerticalScroll?s:0,this.movingDirectionX=0<e?-1:e<0?1:0,this.movingDirectionY=0<s?-1:s<0?1:0;var h=this.x+e,a=this.y+s;(0<h||h<this.maxScrollX)&&(h=this.options.bounce?this.x+e/3:0<h?0:this.maxScrollX),(0<a||a<this.maxScrollY)&&(a=this.options.bounce?this.y+s/3:0<a?0:this.maxScrollY),this.moved||(this.moved=!0,this.trigger("scrollStart")),this._translate(h,a),r-this.startTime>this.options.momentumLimitTime&&(this.startTime=r,this.startX=this.x,this.startY=this.y,1===this.options.probeType&&this.trigger("scroll",{x:this.x,y:this.y})),1<this.options.probeType&&this.trigger("scroll",{x:this.x,y:this.y});var l=document.documentElement.scrollLeft||window.pageXOffset||document.body.scrollLeft,c=document.documentElement.scrollTop||window.pageYOffset||document.body.scrollTop,p=this.pointX-l,u=this.pointY-c;(p>document.documentElement.clientWidth-this.options.momentumLimitDistance||p<this.options.momentumLimitDistance||u<this.options.momentumLimitDistance||u>document.documentElement.clientHeight-this.options.momentumLimitDistance)&&this._end(t)}}},_.prototype._end=function(t){if(this.enabled&&!this.destroyed&&A[t.type]===this.initiated){this.initiated=!1,this.options.preventDefault&&!d(t.target,this.options.preventDefaultException)&&t.preventDefault(),this.options.stopPropagation&&t.stopPropagation(),this.trigger("touchEnd",{x:this.x,y:this.y}),this.isInTransition=!1;var i=Math.round(this.x),e=Math.round(this.y),s=i-this.absStartX,o=e-this.absStartY;if(this.directionX=0<s?-1:s<0?1:0,this.directionY=0<o?-1:o<0?1:0,!this.options.pullDownRefresh||!this._checkPullDown())if(this._checkClick(t))this.trigger("scrollCancel");else if(!this.resetPosition(this.options.bounceTime,F.bounce)){this.scrollTo(i,e),this.endTime=g();var n=this.endTime-this.startTime,r=Math.abs(i-this.startX),h=Math.abs(e-this.startY);if(this._events.flick&&n<this.options.flickLimitTime&&r<this.options.flickLimitDistance&&h<this.options.flickLimitDistance)this.trigger("flick");else{var a=0;if(this.options.momentum&&n<this.options.momentumLimitTime&&(h>this.options.momentumLimitDistance||r>this.options.momentumLimitDistance)){var l=this.hasHorizontalScroll?f(this.x,this.startX,n,this.maxScrollX,this.options.bounce?this.wrapperWidth:0,this.options):{destination:i,duration:0},c=this.hasVerticalScroll?f(this.y,this.startY,n,this.maxScrollY,this.options.bounce?this.wrapperHeight:0,this.options):{destination:e,duration:0};i=l.destination,e=c.destination,a=Math.max(l.duration,c.duration),this.isInTransition=!0}else this.options.wheel&&(e=Math.round(e/this.itemHeight)*this.itemHeight,a=this.options.wheel.adjustTime||400);var p=F.swipe;if(this.options.snap){var u=this._nearestSnap(i,e);this.currentPage=u,a=this.options.snapSpeed||Math.max(Math.max(Math.min(Math.abs(i-u.x),1e3),Math.min(Math.abs(e-u.y),1e3)),300),i=u.x,e=u.y,this.directionX=0,this.directionY=0,p=this.options.snap.easing||F.bounce}if(i!==this.x||e!==this.y)return(0<i||i<this.maxScrollX||0<e||e<this.maxScrollY)&&(p=F.swipeBounce),void this.scrollTo(i,e,a,p);this.options.wheel&&(this.selectedIndex=Math.round(Math.abs(this.y/this.itemHeight))),this.trigger("scrollEnd",{x:this.x,y:this.y})}}}},_.prototype._checkClick=function(t){var i,e,s,o=this.stopFromTransition&&!this.pulling;if(this.stopFromTransition=!1,this.moved)return!1;if(this.options.wheel){if(this.target&&this.target.className===this.options.wheel.wheelWrapperClass){var n=Math.abs(Math.round(this.y/this.itemHeight)),r=Math.round((this.pointY+c(this.target).top-this.itemHeight/2)/this.itemHeight);this.target=this.items[n+r]}return this.scrollToElement(this.target,this.options.wheel.adjustTime||400,!0,!0,F.swipe),!0}return!o&&(this.options.tap&&(i=t,e=this.options.tap,(s=document.createEvent("Event")).initEvent(e,!0,!0),s.pageX=i.pageX,s.pageY=i.pageY,i.target.dispatchEvent(s)),this.options.click&&!d(t.target,this.options.preventDefaultException)&&function(t){function i(){(o=document.createEvent("Event")).initEvent(n,r,h),a(o,s)}var e=void 0;"mouseup"===t.type||"mousecancel"===t.type?e=t:"touchend"!==t.type&&"touchcancel"!==t.type||(e=t.changedTouches[0]);var s={};e&&(s.screenX=e.screenX||0,s.screenY=e.screenY||0,s.clientX=e.clientX||0,s.clientY=e.clientY||0);var o=void 0,n="click",r=!0,h=!0;if("undefined"!=typeof MouseEvent)try{o=new MouseEvent(n,a({bubbles:r,cancelable:h},s))}catch(t){i()}else i();o.forwardedTouchEvent=!0,o._constructed=!0,t.target.dispatchEvent(o)}(t),!0)},_.prototype._resize=function(){var t=this;this.enabled&&(D&&(this.wrapper.scrollTop=0),clearTimeout(this.resizeTimeout),this.resizeTimeout=setTimeout(function(){t.refresh()},this.options.resizePolling))},_.prototype._startProbe=function(){U(this.probeTimer),this.probeTimer=R(function t(){var i=e.getComputedPosition();e.trigger("scroll",i),e.isInTransition?e.probeTimer=R(t):e.trigger("scrollEnd",i)});var e=this},_.prototype._transitionProperty=function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:"transform";this.scrollerStyle[C.transitionProperty]=t},_.prototype._transitionTime=function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:0;if(this.scrollerStyle[C.transitionDuration]=t+"ms",this.options.wheel)for(var i=0;i<this.items.length;i++)this.items[i].style[C.transitionDuration]=t+"ms";if(this.indicators)for(var e=0;e<this.indicators.length;e++)this.indicators[e].transitionTime(t)},_.prototype._transitionTimingFunction=function(t){if(this.scrollerStyle[C.transitionTimingFunction]=t,this.options.wheel)for(var i=0;i<this.items.length;i++)this.items[i].style[C.transitionTimingFunction]=t;if(this.indicators)for(var e=0;e<this.indicators.length;e++)this.indicators[e].transitionTimingFunction(t)},_.prototype._transitionEnd=function(t){t.target===this.scroller&&this.isInTransition&&(this._transitionTime(),this.pulling||this.resetPosition(this.options.bounceTime,F.bounce)||(this.isInTransition=!1,3!==this.options.probeType&&this.trigger("scrollEnd",{x:this.x,y:this.y})))},_.prototype._translate=function(t,i){if(function(t,i){if(!t)throw new Error("[BScroll] "+i)}(!h(t)&&!h(i),"Oops! translate x or y is null or undefined. please check your code."),this.options.useTransform?this.scrollerStyle[C.transform]="translate("+t+"px,"+i+"px)"+this.translateZ:(t=Math.round(t),i=Math.round(i),this.scrollerStyle.left=t+"px",this.scrollerStyle.top=i+"px"),this.options.wheel)for(var e=this.options.wheel.rotate,s=void 0===e?25:e,o=0;o<this.items.length;o++){var n=s*(i/this.itemHeight+o);this.items[o].style[C.transform]="rotateX("+n+"deg)"}if(this.x=t,this.y=i,this.indicators)for(var r=0;r<this.indicators.length;r++)this.indicators[r].updatePosition()},_.prototype._animate=function(n,r,h,a){var l=this,c=this.x,p=this.y,u=g(),d=u+h;this.isAnimating=!0,U(this.animateTimer),function t(){var i=g();if(d<=i)return l.isAnimating=!1,l._translate(n,r),void(l.pulling||l.resetPosition(l.options.bounceTime)||l.trigger("scrollEnd",{x:l.x,y:l.y}));var e=a(i=(i-u)/h),s=(n-c)*e+c,o=(r-p)*e+p;l._translate(s,o),l.isAnimating&&(l.animateTimer=R(t)),3===l.options.probeType&&l.trigger("scroll",{x:l.x,y:l.y})}()},_.prototype.scrollBy=function(t,i){var e=2<arguments.length&&void 0!==arguments[2]?arguments[2]:0,s=3<arguments.length&&void 0!==arguments[3]?arguments[3]:F.bounce;t=this.x+t,i=this.y+i,this.scrollTo(t,i,e,s)},_.prototype.scrollTo=function(t,i){var e=2<arguments.length&&void 0!==arguments[2]?arguments[2]:0,s=3<arguments.length&&void 0!==arguments[3]?arguments[3]:F.bounce;this.isInTransition=this.options.useTransition&&0<e&&(t!==this.x||i!==this.y),!e||this.options.useTransition?(this._transitionProperty(),this._transitionTimingFunction(s.style),this._transitionTime(e),this._translate(t,i),e&&3===this.options.probeType&&this._startProbe(),this.options.wheel&&(0<i?this.selectedIndex=0:i<this.maxScrollY?this.selectedIndex=this.items.length-1:this.selectedIndex=Math.round(Math.abs(i/this.itemHeight)))):this._animate(t,i,e,s.fn)},_.prototype.scrollToElement=function(t,i,e,s,o){if(t&&(t=t.nodeType?t:this.scroller.querySelector(t),!this.options.wheel||t.className===this.options.wheel.wheelItemClass)){var n=c(t);n.left-=this.wrapperOffset.left,n.top-=this.wrapperOffset.top,!0===e&&(e=Math.round(t.offsetWidth/2-this.wrapper.offsetWidth/2)),!0===s&&(s=Math.round(t.offsetHeight/2-this.wrapper.offsetHeight/2)),n.left-=e||0,n.top-=s||0,n.left=0<n.left?0:n.left<this.maxScrollX?this.maxScrollX:n.left,n.top=0<n.top?0:n.top<this.maxScrollY?this.maxScrollY:n.top,this.options.wheel&&(n.top=Math.round(n.top/this.itemHeight)*this.itemHeight),this.scrollTo(n.left,n.top,i,o)}},_.prototype.resetPosition=function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:0,i=1<arguments.length&&void 0!==arguments[1]?arguments[1]:F.bounce,e=this.x,s=Math.round(e);!this.hasHorizontalScroll||0<s?e=0:s<this.maxScrollX&&(e=this.maxScrollX);var o=this.y,n=Math.round(o);return!this.hasVerticalScroll||0<n?o=0:n<this.maxScrollY&&(o=this.maxScrollY),(e!==this.x||o!==this.y)&&(this.scrollTo(e,o,t,i),!0)},_.prototype.getComputedPosition=function(){var t=window.getComputedStyle(this.scroller,null),i=void 0,e=void 0;return e=this.options.useTransform?(i=+((t=t[C.transform].split(")")[0].split(", "))[12]||t[4]),+(t[13]||t[5])):(i=+t.left.replace(/[^-\d.]/g,""),+t.top.replace(/[^-\d.]/g,"")),{x:i,y:e}},_.prototype.stop=function(){if(this.options.useTransition&&this.isInTransition){this.isInTransition=!1;var t=this.getComputedPosition();this._translate(t.x,t.y),this.options.wheel?this.target=this.items[Math.round(-t.y/this.itemHeight)]:this.trigger("scrollEnd",{x:this.x,y:this.y}),this.stopFromTransition=!0}else!this.options.useTransition&&this.isAnimating&&(this.isAnimating=!1,this.trigger("scrollEnd",{x:this.x,y:this.y}),this.stopFromTransition=!0)},_.prototype.destroy=function(){this.destroyed=!0,this.trigger("destroy"),this._removeDOMEvents(),this._events={}},(b=o).prototype.on=function(t,i){var e=2<arguments.length&&void 0!==arguments[2]?arguments[2]:this;this._events[t]||(this._events[t]=[]),this._events[t].push([i,e])},b.prototype.once=function(t,i){function e(){this.off(t,e),i.apply(s,arguments)}var s=2<arguments.length&&void 0!==arguments[2]?arguments[2]:this;e.fn=i,this.on(t,e)},b.prototype.off=function(t,i){var e=this._events[t];if(e)for(var s=e.length;s--;)(e[s][0]===i||e[s][0]&&e[s][0].fn===i)&&(e[s][0]=void 0)},b.prototype.trigger=function(t){var i=this._events[t];if(i)for(var e=i.length,s=[].concat(function(t){if(Array.isArray(t)){for(var i=0,e=Array(t.length);i<t.length;i++)e[i]=t[i];return e}return Array.from(t)}(i)),o=0;o<e;o++){var n=s[o],r=P(n,2),h=r[0],a=r[1];h&&h.apply(a,[].slice.call(arguments,1))}},(T=o).prototype._initSnap=function(){var g=this;this.currentPage={};var t,i,e,s,f=this.options.snap;if(f.loop){var o=this.scroller.children;1<o.length?(t=o[o.length-1].cloneNode(!0),(i=this.scroller).firstChild?(e=t,(s=i.firstChild).parentNode.insertBefore(e,s)):i.appendChild(t),this.scroller.appendChild(o[1].cloneNode(!0))):f.loop=!1}var m=f.el;"string"==typeof m&&(m=this.scroller.querySelectorAll(m)),this.on("refresh",function(){if(g.pages=[],g.wrapperWidth&&g.wrapperHeight&&g.scrollerWidth&&g.scrollerHeight){var t=f.stepX||g.wrapperWidth,i=f.stepY||g.wrapperHeight,e=0,s=void 0,o=void 0,n=void 0,r=0,h=void 0,a=0,l=void 0,c=void 0;if(m)for(h=m.length,l=-1;r<h;r++)c=v(m[r]),(0===r||c.left<=v(m[r-1]).left)&&(a=0,l++),g.pages[a]||(g.pages[a]=[]),e=Math.max(-c.left,g.maxScrollX),s=Math.max(-c.top,g.maxScrollY),o=e-Math.round(c.width/2),n=s-Math.round(c.height/2),g.pages[a][l]={x:e,y:s,width:c.width,height:c.height,cx:o,cy:n},e>g.maxScrollX&&a++;else for(o=Math.round(t/2),n=Math.round(i/2);e>-g.scrollerWidth;){for(g.pages[r]=[],s=h=0;s>-g.scrollerHeight;)g.pages[r][h]={x:Math.max(e,g.maxScrollX),y:Math.max(s,g.maxScrollY),width:t,height:i,cx:e-o,cy:s-n},s-=i,h++;e-=t,r++}g._checkSnapLoop();var p=f._loopX?1:0,u=f._loopY?1:0;g._goToPage(g.currentPage.pageX||p,g.currentPage.pageY||u,0);var d=f.threshold;g.snapThresholdY=d%1==0?g.snapThresholdX=d:(g.snapThresholdX=Math.round(g.pages[g.currentPage.pageX][g.currentPage.pageY].width*d),Math.round(g.pages[g.currentPage.pageX][g.currentPage.pageY].height*d))}}),this.on("scrollEnd",function(){f.loop&&(f._loopX?(0===g.currentPage.pageX&&g._goToPage(g.pages.length-2,g.currentPage.pageY,0),g.currentPage.pageX===g.pages.length-1&&g._goToPage(1,g.currentPage.pageY,0)):(0===g.currentPage.pageY&&g._goToPage(g.currentPage.pageX,g.pages[0].length-2,0),g.currentPage.pageY===g.pages[0].length-1&&g._goToPage(g.currentPage.pageX,1,0)))}),!1!==f.listenFlick&&this.on("flick",function(){var t=f.speed||Math.max(Math.max(Math.min(Math.abs(g.x-g.startX),1e3),Math.min(Math.abs(g.y-g.startY),1e3)),300);g._goToPage(g.currentPage.pageX+g.directionX,g.currentPage.pageY+g.directionY,t)}),this.on("destroy",function(){if(f.loop){var t=g.scroller.children;2<t.length&&(n(g.scroller,t[t.length-1]),n(g.scroller,t[0]))}})},T.prototype._checkSnapLoop=function(){var t=this.options.snap;t.loop&&this.pages&&(1<this.pages.length&&(t._loopX=!0),this.pages[0]&&1<this.pages[0].length&&(t._loopY=!0),t._loopX&&t._loopY&&s("Loop does not support two direction at the same time."))},T.prototype._nearestSnap=function(t,i){if(!this.pages.length)return{x:0,y:0,pageX:0,pageY:0};var e=0;if(Math.abs(t-this.absStartX)<=this.snapThresholdX&&Math.abs(i-this.absStartY)<=this.snapThresholdY)return this.currentPage;0<t?t=0:t<this.maxScrollX&&(t=this.maxScrollX),0<i?i=0:i<this.maxScrollY&&(i=this.maxScrollY);for(var s=this.pages.length;e<s;e++)if(t>=this.pages[e][0].cx){t=this.pages[e][0].x;break}s=this.pages[e].length;for(var o=0;o<s;o++)if(i>=this.pages[0][o].cy){i=this.pages[0][o].y;break}return e===this.currentPage.pageX&&((e+=this.directionX)<0?e=0:e>=this.pages.length&&(e=this.pages.length-1),t=this.pages[e][0].x),o===this.currentPage.pageY&&((o+=this.directionY)<0?o=0:o>=this.pages[0].length&&(o=this.pages[0].length-1),i=this.pages[0][o].y),{x:t,y:i,pageX:e,pageY:o}},T.prototype._goToPage=function(t){var i=1<arguments.length&&void 0!==arguments[1]?arguments[1]:0,e=arguments[2],s=arguments[3],o=this.options.snap;if(o&&this.pages&&(s=s||o.easing||F.bounce,t>=this.pages.length?t=this.pages.length-1:t<0&&(t=0),this.pages[t])){i>=this.pages[t].length?i=this.pages[t].length-1:i<0&&(i=0);var n=this.pages[t][i].x,r=this.pages[t][i].y;e=void 0===e?o.speed||Math.max(Math.max(Math.min(Math.abs(n-this.x),1e3),Math.min(Math.abs(r-this.y),1e3)),300):e,this.currentPage={x:n,y:r,pageX:t,pageY:i},this.scrollTo(n,r,e,s)}},T.prototype.goToPage=function(t,i,e,s){var o=this.options.snap;if(o){if(o.loop){var n=void 0;o._loopX?(t>=(n=this.pages.length-2)?t=n-1:t<0&&(t=0),t+=1):(i>=(n=this.pages[0].length-2)?i=n-1:i<0&&(i=0),i+=1)}this._goToPage(t,i,e,s)}},T.prototype.next=function(t,i){if(this.options.snap){var e=this.currentPage.pageX,s=this.currentPage.pageY;++e>=this.pages.length&&this.hasVerticalScroll&&(e=0,s++),this._goToPage(e,s,t,i)}},T.prototype.prev=function(t,i){if(this.options.snap){var e=this.currentPage.pageX,s=this.currentPage.pageY;--e<0&&this.hasVerticalScroll&&(e=0,s--),this._goToPage(e,s,t,i)}},T.prototype.getCurrentPage=function(){var t=this.options.snap;return t?t.loop?t._loopX?a({},this.currentPage,{pageX:this.currentPage.pageX-1}):a({},this.currentPage,{pageY:this.currentPage.pageY-1}):this.currentPage:null},(x=o).prototype.wheelTo=function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:0;this.options.wheel&&(this.y=-t*this.itemHeight,this.scrollTo(0,this.y))},x.prototype.getSelectedIndex=function(){return this.options.wheel&&this.selectedIndex},x.prototype._initWheel=function(){var t=this.options.wheel;t.wheelWrapperClass||(t.wheelWrapperClass="wheel-scroll"),t.wheelItemClass||(t.wheelItemClass="wheel-item"),void 0===t.selectedIndex&&(t.selectedIndex=0,s("wheel option selectedIndex is required!"))},(w=o).prototype._initScrollbar=function(){var i=this,t=this.options.scrollbar,e=t.fade,s=void 0===e||e,o=t.interactive,n=void 0!==o&&o;this.indicators=[];var r=void 0;this.options.scrollX&&(r={el:p("horizontal"),direction:"horizontal",fade:s,interactive:n},this._insertScrollBar(r.el),this.indicators.push(new u(this,r))),this.options.scrollY&&(r={el:p("vertical"),direction:"vertical",fade:s,interactive:n},this._insertScrollBar(r.el),this.indicators.push(new u(this,r))),this.on("refresh",function(){for(var t=0;t<i.indicators.length;t++)i.indicators[t].refresh()}),s&&(this.on("scrollEnd",function(){for(var t=0;t<i.indicators.length;t++)i.indicators[t].fade()}),this.on("scrollCancel",function(){for(var t=0;t<i.indicators.length;t++)i.indicators[t].fade()}),this.on("scrollStart",function(){for(var t=0;t<i.indicators.length;t++)i.indicators[t].fade(!0)}),this.on("beforeScrollStart",function(){for(var t=0;t<i.indicators.length;t++)i.indicators[t].fade(!0,!0)})),this.on("destroy",function(){i._removeScrollBars()})},w.prototype._insertScrollBar=function(t){this.wrapper.appendChild(t)},w.prototype._removeScrollBars=function(){for(var t=0;t<this.indicators.length;t++)this.indicators[t].destroy()},(y=o).prototype._initPullDown=function(){this.options.probeType=3},y.prototype._checkPullDown=function(){var t=this.options.pullDownRefresh,i=t.threshold,e=void 0===i?90:i,s=t.stop,o=void 0===s?40:s;return!(-1!==this.directionY||this.y<e)&&(this.pulling||(this.pulling=!0,this.trigger("pullingDown")),this.scrollTo(this.x,o,this.options.bounceTime,F.bounce),this.pulling)},y.prototype.finishPullDown=function(){this.pulling=!1,this.resetPosition(this.options.bounceTime,F.bounce)},y.prototype.openPullDown=function(){var t=!(0<arguments.length&&void 0!==arguments[0])||arguments[0];this.options.pullDownRefresh=t,this._initPullDown()},y.prototype.closePullDown=function(){this.options.pullDownRefresh=!1},(m=o).prototype._initPullUp=function(){this.options.probeType=3,this.pullupWatching=!1,this._watchPullUp()},m.prototype._watchPullUp=function(){this.pullupWatching||(this.pullupWatching=!0,this.on("scroll",this._checkToEnd))},m.prototype._checkToEnd=function(t){var i=this,e=this.options.pullUpLoad.threshold,s=void 0===e?0:e;1===this.movingDirectionY&&t.y<=this.maxScrollY+s&&(this.once("scrollEnd",function(){i.pullupWatching=!1}),this.trigger("pullingUp"),this.off("scroll",this._checkToEnd))},m.prototype.finishPullUp=function(){var t=this;this.pullupWatching?this.once("scrollEnd",function(){t._watchPullUp()}):this._watchPullUp()},m.prototype.openPullUp=function(){var t=!(0<arguments.length&&void 0!==arguments[0])||arguments[0];this.options.pullUpLoad=t,this._initPullUp()},m.prototype.closePullUp=function(){this.options.pullUpLoad=!1,this.pullupWatching&&(this.pullupWatching=!1,this.off("scroll",this._checkToEnd))},(r=o).prototype._initMouseWheel=function(){var t=this;this._handleMouseWheelEvent(e),this.on("destroy",function(){clearTimeout(t.mouseWheelTimer),t._handleMouseWheelEvent(l)}),this.firstWheelOpreation=!0},r.prototype._handleMouseWheelEvent=function(t){t(this.wrapper,"wheel",this),t(this.wrapper,"mousewheel",this),t(this.wrapper,"DOMMouseScroll",this)},r.prototype._onMouseWheel=function(t){var i=this;if(this.enabled){t.preventDefault(),this.firstWheelOpreation&&this.trigger("scrollStart"),this.firstWheelOpreation=!1,clearTimeout(this.mouseWheelTimer),this.mouseWheelTimer=setTimeout(function(){i.options.snap||i.trigger("scrollEnd",{x:i.x,y:i.y}),i.firstWheelOpreation=!0},400);var e=this.options.mouseWheel,s=e.speed,o=void 0===s?20:s,n=e.invert,r=void 0!==n&&n,h=void 0,a=void 0;switch(!0){case"deltaX"in t:a=1===t.deltaMode?(h=-t.deltaX*o,-t.deltaY*o):(h=-t.deltaX,-t.deltaY);break;case"wheelDeltaX"in t:h=t.wheelDeltaX/120*o,a=t.wheelDeltaY/120*o;break;case"wheelDelta"in t:h=a=t.wheelDelta/120*o;break;case"detail"in t:h=a=-t.detail/3*o;break;default:return}var l=r?-1:1;h*=l,a*=l,this.hasVerticalScroll||(h=a,a=0);var c=void 0,p=void 0;if(this.options.snap)return c=this.currentPage.pageX,p=this.currentPage.pageY,0<h?c--:h<0&&c++,0<a?p--:a<0&&p++,void this._goToPage(c,p);c=this.x+Math.round(this.hasHorizontalScroll?h:0),p=this.y+Math.round(this.hasVerticalScroll?a:0),this.directionX=0<h?-1:h<0?1:0,this.directionY=0<a?-1:a<0?1:0,0<c?c=0:c<this.maxScrollX&&(c=this.maxScrollX),0<p?p=0:p<this.maxScrollY&&(p=this.maxScrollY),this.scrollTo(c,p),this.trigger("scroll",{x:this.x,y:this.y})}},o.Version="1.9.1",o});
>>>>>>> li

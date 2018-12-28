(function(d, f) {
    var s = d.document;
    var c = s.documentElement;
    var m = s.querySelector('meta[name="viewport"]');
    var n = s.querySelector('meta[name="flexible"]');
    var a = 0;
    var r = 0;
    var b = 0;
    var l;
    var e = f.flexible || (f.flexible = {});
    if (n) {
        var j = n.getAttribute("content");
        if (j) {
            var q = j.match(/initial\-dpr=([\d\.]+)/);
            var h = j.match(/maximum\-dpr=([\d\.]+)/);
            if (q) {
                a = parseFloat(q[1]);
                r = parseFloat((1 / a).toFixed(2))
            }
            if (h) {
                a = parseFloat(h[1]);
                r = parseFloat((1 / a).toFixed(2))
            }
        }
    }
    if (!a && !r) {
        var p = d.navigator.appVersion.match(/android/gi);
        var o = d.navigator.appVersion.match(/iphone/gi);
        var k = d.devicePixelRatio;
        if (k >= 3 && (!a || a >= 3)) { a = 3 } else { if (k >= 2 && (!a || a >= 2)) { a = 2 } else { a = 1 } }
        r = 1 / a
    }
    c.setAttribute("data-dpr", a);
    m = s.createElement("meta");
    m.setAttribute("name", "viewport");
    m.setAttribute("content", "width=device-width, initial-scale=" + r + ", maximum-scale=" + r + ", minimum-scale=" + r + ", user-scalable=no");
    if (c.firstElementChild) { c.firstElementChild.appendChild(m) } else {
        var g = s.createElement("div");
        g.appendChild(m);
        s.write(g.innerHTML)
    }

    function i() {
        var u = c.getBoundingClientRect().width;
        if (u / a > 540) { u = 540 * a }
        var w = u / 10;
        c.style.fontSize = w + "px";
        e.rem = d.rem = w;
        var v = parseFloat(c.style.fontSize),
            t = parseFloat(window.getComputedStyle(c).getPropertyValue("font-size"));
        console.log("flexible.refreshRem: fontSize && finalFontSize => ", v, t);
        if (v !== t) {
            c.style.fontSize = v * (v / t) + "px";
            console.log("flexible.refreshRem.fixed: fontSize  => ", c.style.fontSize)
        }
    }
    d.addEventListener("resize", function() {
        clearTimeout(l);
        l = setTimeout(i, 300)
    }, false);
    d.addEventListener("pageshow", function(t) {
        if (t.persisted) {
            clearTimeout(l);
            l = setTimeout(i, 300)
        }
    }, false);
    if (s.readyState === "complete") { s.body.style.fontSize = 12 * a + "px" } else { s.addEventListener("DOMContentLoaded", function(t) { s.body.style.fontSize = 12 * a + "px" }, false) }
    i();
    e.dpr = d.dpr = a;
    e.refreshRem = i;
    e.rem2px = function(u) { var t = parseFloat(u) * this.rem; if (typeof u === "string" && u.match(/rem$/)) { t += "px" } return t };
    e.px2rem = function(u) { var t = parseFloat(u) / this.rem; if (typeof u === "string" && u.match(/px$/)) { t += "rem" } return t }
})(window, window["lib"] || (window["lib"] = {}));
! function(n, e) { var t, i = n.document,
        a = i.documentElement,
        r = i.querySelector('meta[name="viewport"]'),
        o = i.querySelector('meta[name="flexible"]'),
        l = 0,
        s = 0,
        d = e.flexible || (e.flexible = {}); if (o) { var m = o.getAttribute("content"); if (m) { var p = m.match(/initial\-dpr=([\d\.]+)/),
                f = m.match(/maximum\-dpr=([\d\.]+)/);
            p && (l = parseFloat(p[1]), s = parseFloat((1 / l).toFixed(2))), f && (l = parseFloat(f[1]), s = parseFloat((1 / l).toFixed(2))) } } if (!l && !s) { n.navigator.appVersion.match(/android/gi), n.navigator.appVersion.match(/iphone/gi); var c = n.devicePixelRatio;
        s = 1 / (l = 3 <= c && (!l || 3 <= l) ? 3 : 2 <= c && (!l || 2 <= l) ? 2 : 1) } if (a.setAttribute("data-dpr", l), (r = i.createElement("meta")).setAttribute("name", "viewport"), r.setAttribute("content", "width=device-width, initial-scale=" + s + ", maximum-scale=" + s + ", minimum-scale=" + s + ", user-scalable=no"), a.firstElementChild) a.firstElementChild.appendChild(r);
    else { var u = i.createElement("div");
        u.appendChild(r), i.write(u.innerHTML) }

    function h() { var e = a.getBoundingClientRect().width;
        540 < e / l && (e = 540 * l); var t = e / 10;
        a.style.fontSize = t + "px", d.rem = n.rem = t; var i = parseFloat(a.style.fontSize),
            r = parseFloat(window.getComputedStyle(a).getPropertyValue("font-size"));
        console.log("flexible.refreshRem: fontSize && finalFontSize => ", i, r), i !== r && (a.style.fontSize = i * (i / r) + "px", console.log("flexible.refreshRem.fixed: fontSize  => ", a.style.fontSize)) }
    n.addEventListener("resize", function() { clearTimeout(t), t = setTimeout(h, 300) }, !1), n.addEventListener("pageshow", function(e) { e.persisted && (clearTimeout(t), t = setTimeout(h, 300)) }, !1), "complete" === i.readyState ? i.body.style.fontSize = 12 * l + "px" : i.addEventListener("DOMContentLoaded", function(e) { i.body.style.fontSize = 12 * l + "px" }, !1), h(), d.dpr = n.dpr = l, d.refreshRem = h, d.rem2px = function(e) { var t = parseFloat(e) * this.rem; return "string" == typeof e && e.match(/rem$/) && (t += "px"), t }, d.px2rem = function(e) { var t = parseFloat(e) / this.rem; return "string" == typeof e && e.match(/px$/) && (t += "rem"), t } }(window, window.lib || (window.lib = {}));
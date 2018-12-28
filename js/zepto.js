<<<<<<< HEAD
/* Zepto v1.2.0 - zepto event ajax form ie - zeptojs.com/license */
(function(global, factory) {
    if (typeof define === 'function' && define.amd)
        define(function() { return factory(global) })
    else
        factory(global)
}(this, function(window) {
    var Zepto = (function() {
        var undefined, key, $, classList, emptyArray = [],
            concat = emptyArray.concat,
            filter = emptyArray.filter,
            slice = emptyArray.slice,
            document = window.document,
            elementDisplay = {},
            classCache = {},
            cssNumber = { 'column-count': 1, 'columns': 1, 'font-weight': 1, 'line-height': 1, 'opacity': 1, 'z-index': 1, 'zoom': 1 },
            fragmentRE = /^\s*<(\w+|!)[^>]*>/,
            singleTagRE = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
            tagExpanderRE = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
            rootNodeRE = /^(?:body|html)$/i,
            capitalRE = /([A-Z])/g,

            // special attributes that should be get/set via method calls
            methodAttributes = ['val', 'css', 'html', 'text', 'data', 'width', 'height', 'offset'],

            adjacencyOperators = ['after', 'prepend', 'before', 'append'],
            table = document.createElement('table'),
            tableRow = document.createElement('tr'),
            containers = {
                'tr': document.createElement('tbody'),
                'tbody': table,
                'thead': table,
                'tfoot': table,
                'td': tableRow,
                'th': tableRow,
                '*': document.createElement('div')
            },
            readyRE = /complete|loaded|interactive/,
            simpleSelectorRE = /^[\w-]*$/,
            class2type = {},
            toString = class2type.toString,
            zepto = {},
            camelize, uniq,
            tempParent = document.createElement('div'),
            propMap = {
                'tabindex': 'tabIndex',
                'readonly': 'readOnly',
                'for': 'htmlFor',
                'class': 'className',
                'maxlength': 'maxLength',
                'cellspacing': 'cellSpacing',
                'cellpadding': 'cellPadding',
                'rowspan': 'rowSpan',
                'colspan': 'colSpan',
                'usemap': 'useMap',
                'frameborder': 'frameBorder',
                'contenteditable': 'contentEditable'
            },
            isArray = Array.isArray ||
            function(object) { return object instanceof Array }

        zepto.matches = function(element, selector) {
            if (!selector || !element || element.nodeType !== 1) return false
            var matchesSelector = element.matches || element.webkitMatchesSelector ||
                element.mozMatchesSelector || element.oMatchesSelector ||
                element.matchesSelector
            if (matchesSelector) return matchesSelector.call(element, selector)
                // fall back to performing a selector:
            var match, parent = element.parentNode,
                temp = !parent
            if (temp)(parent = tempParent).appendChild(element)
            match = ~zepto.qsa(parent, selector).indexOf(element)
            temp && tempParent.removeChild(element)
            return match
        }

        function type(obj) {
            return obj == null ? String(obj) :
                class2type[toString.call(obj)] || "object"
        }

        function isFunction(value) { return type(value) == "function" }

        function isWindow(obj) { return obj != null && obj == obj.window }

        function isDocument(obj) { return obj != null && obj.nodeType == obj.DOCUMENT_NODE }

        function isObject(obj) { return type(obj) == "object" }

        function isPlainObject(obj) {
            return isObject(obj) && !isWindow(obj) && Object.getPrototypeOf(obj) == Object.prototype
        }

        function likeArray(obj) {
            var length = !!obj && 'length' in obj && obj.length,
                type = $.type(obj)

            return 'function' != type && !isWindow(obj) && (
                'array' == type || length === 0 ||
                (typeof length == 'number' && length > 0 && (length - 1) in obj)
            )
        }

        function compact(array) { return filter.call(array, function(item) { return item != null }) }

        function flatten(array) { return array.length > 0 ? $.fn.concat.apply([], array) : array }
        camelize = function(str) { return str.replace(/-+(.)?/g, function(match, chr) { return chr ? chr.toUpperCase() : '' }) }

        function dasherize(str) {
            return str.replace(/::/g, '/')
                .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
                .replace(/([a-z\d])([A-Z])/g, '$1_$2')
                .replace(/_/g, '-')
                .toLowerCase()
        }
        uniq = function(array) { return filter.call(array, function(item, idx) { return array.indexOf(item) == idx }) }

        function classRE(name) {
            return name in classCache ?
                classCache[name] : (classCache[name] = new RegExp('(^|\\s)' + name + '(\\s|$)'))
        }

        function maybeAddPx(name, value) {
            return (typeof value == "number" && !cssNumber[dasherize(name)]) ? value + "px" : value
        }

        function defaultDisplay(nodeName) {
            var element, display
            if (!elementDisplay[nodeName]) {
                element = document.createElement(nodeName)
                document.body.appendChild(element)
                display = getComputedStyle(element, '').getPropertyValue("display")
                element.parentNode.removeChild(element)
                display == "none" && (display = "block")
                elementDisplay[nodeName] = display
            }
            return elementDisplay[nodeName]
        }

        function children(element) {
            return 'children' in element ?
                slice.call(element.children) :
                $.map(element.childNodes, function(node) { if (node.nodeType == 1) return node })
        }

        function Z(dom, selector) {
            var i, len = dom ? dom.length : 0
            for (i = 0; i < len; i++) this[i] = dom[i]
            this.length = len
            this.selector = selector || ''
        }

        // `$.zepto.fragment` takes a html string and an optional tag name
        // to generate DOM nodes from the given html string.
        // The generated DOM nodes are returned as an array.
        // This function can be overridden in plugins for example to make
        // it compatible with browsers that don't support the DOM fully.
        zepto.fragment = function(html, name, properties) {
            var dom, nodes, container

            // A special case optimization for a single tag
            if (singleTagRE.test(html)) dom = $(document.createElement(RegExp.$1))

            if (!dom) {
                if (html.replace) html = html.replace(tagExpanderRE, "<$1></$2>")
                if (name === undefined) name = fragmentRE.test(html) && RegExp.$1
                if (!(name in containers)) name = '*'

                container = containers[name]
                container.innerHTML = '' + html
                dom = $.each(slice.call(container.childNodes), function() {
                    container.removeChild(this)
                })
            }

            if (isPlainObject(properties)) {
                nodes = $(dom)
                $.each(properties, function(key, value) {
                    if (methodAttributes.indexOf(key) > -1) nodes[key](value)
                    else nodes.attr(key, value)
                })
            }

            return dom
        }

        // `$.zepto.Z` swaps out the prototype of the given `dom` array
        // of nodes with `$.fn` and thus supplying all the Zepto functions
        // to the array. This method can be overridden in plugins.
        zepto.Z = function(dom, selector) {
            return new Z(dom, selector)
        }

        // `$.zepto.isZ` should return `true` if the given object is a Zepto
        // collection. This method can be overridden in plugins.
        zepto.isZ = function(object) {
            return object instanceof zepto.Z
        }

        // `$.zepto.init` is Zepto's counterpart to jQuery's `$.fn.init` and
        // takes a CSS selector and an optional context (and handles various
        // special cases).
        // This method can be overridden in plugins.
        zepto.init = function(selector, context) {
            var dom
                // If nothing given, return an empty Zepto collection
            if (!selector) return zepto.Z()
                // Optimize for string selectors
            else if (typeof selector == 'string') {
                selector = selector.trim()
                    // If it's a html fragment, create nodes from it
                    // Note: In both Chrome 21 and Firefox 15, DOM error 12
                    // is thrown if the fragment doesn't begin with <
                if (selector[0] == '<' && fragmentRE.test(selector))
                    dom = zepto.fragment(selector, RegExp.$1, context), selector = null
                    // If there's a context, create a collection on that context first, and select
                    // nodes from there
                else if (context !== undefined) return $(context).find(selector)
                    // If it's a CSS selector, use it to select nodes.
                else dom = zepto.qsa(document, selector)
            }
            // If a function is given, call it when the DOM is ready
            else if (isFunction(selector)) return $(document).ready(selector)
                // If a Zepto collection is given, just return it
            else if (zepto.isZ(selector)) return selector
            else {
                // normalize array if an array of nodes is given
                if (isArray(selector)) dom = compact(selector)
                    // Wrap DOM nodes.
                else if (isObject(selector))
                    dom = [selector], selector = null
                    // If it's a html fragment, create nodes from it
                else if (fragmentRE.test(selector))
                    dom = zepto.fragment(selector.trim(), RegExp.$1, context), selector = null
                    // If there's a context, create a collection on that context first, and select
                    // nodes from there
                else if (context !== undefined) return $(context).find(selector)
                    // And last but no least, if it's a CSS selector, use it to select nodes.
                else dom = zepto.qsa(document, selector)
            }
            // create a new Zepto collection from the nodes found
            return zepto.Z(dom, selector)
        }

        // `$` will be the base `Zepto` object. When calling this
        // function just call `$.zepto.init, which makes the implementation
        // details of selecting nodes and creating Zepto collections
        // patchable in plugins.
        $ = function(selector, context) {
            return zepto.init(selector, context)
        }

        function extend(target, source, deep) {
            for (key in source)
                if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
                    if (isPlainObject(source[key]) && !isPlainObject(target[key]))
                        target[key] = {}
                    if (isArray(source[key]) && !isArray(target[key]))
                        target[key] = []
                    extend(target[key], source[key], deep)
                } else if (source[key] !== undefined) target[key] = source[key]
        }

        // Copy all but undefined properties from one or more
        // objects to the `target` object.
        $.extend = function(target) {
            var deep, args = slice.call(arguments, 1)
            if (typeof target == 'boolean') {
                deep = target
                target = args.shift()
            }
            args.forEach(function(arg) { extend(target, arg, deep) })
            return target
        }

        // `$.zepto.qsa` is Zepto's CSS selector implementation which
        // uses `document.querySelectorAll` and optimizes for some special cases, like `#id`.
        // This method can be overridden in plugins.
        zepto.qsa = function(element, selector) {
            var found,
                maybeID = selector[0] == '#',
                maybeClass = !maybeID && selector[0] == '.',
                nameOnly = maybeID || maybeClass ? selector.slice(1) : selector, // Ensure that a 1 char tag name still gets checked
                isSimple = simpleSelectorRE.test(nameOnly)
            return (element.getElementById && isSimple && maybeID) ? // Safari DocumentFragment doesn't have getElementById
                ((found = element.getElementById(nameOnly)) ? [found] : []) :
                (element.nodeType !== 1 && element.nodeType !== 9 && element.nodeType !== 11) ? [] :
                slice.call(
                    isSimple && !maybeID && element.getElementsByClassName ? // DocumentFragment doesn't have getElementsByClassName/TagName
                    maybeClass ? element.getElementsByClassName(nameOnly) : // If it's simple, it could be a class
                    element.getElementsByTagName(selector) : // Or a tag
                    element.querySelectorAll(selector) // Or it's not simple, and we need to query all
                )
        }

        function filtered(nodes, selector) {
            return selector == null ? $(nodes) : $(nodes).filter(selector)
        }

        $.contains = document.documentElement.contains ?
            function(parent, node) {
                return parent !== node && parent.contains(node)
            } :
            function(parent, node) {
                while (node && (node = node.parentNode))
                    if (node === parent) return true
                return false
            }

        function funcArg(context, arg, idx, payload) {
            return isFunction(arg) ? arg.call(context, idx, payload) : arg
        }

        function setAttribute(node, name, value) {
            value == null ? node.removeAttribute(name) : node.setAttribute(name, value)
        }

        // access className property while respecting SVGAnimatedString
        function className(node, value) {
            var klass = node.className || '',
                svg = klass && klass.baseVal !== undefined

            if (value === undefined) return svg ? klass.baseVal : klass
            svg ? (klass.baseVal = value) : (node.className = value)
        }

        // "true"  => true
        // "false" => false
        // "null"  => null
        // "42"    => 42
        // "42.5"  => 42.5
        // "08"    => "08"
        // JSON    => parse if valid
        // String  => self
        function deserializeValue(value) {
            try {
                return value ?
                    value == "true" ||
                    (value == "false" ? false :
                        value == "null" ? null :
                        +value + "" == value ? +value :
                        /^[\[\{]/.test(value) ? $.parseJSON(value) :
                        value) :
                    value
            } catch (e) {
                return value
            }
        }

        $.type = type
        $.isFunction = isFunction
        $.isWindow = isWindow
        $.isArray = isArray
        $.isPlainObject = isPlainObject

        $.isEmptyObject = function(obj) {
            var name
            for (name in obj) return false
            return true
        }

        $.isNumeric = function(val) {
            var num = Number(val),
                type = typeof val
            return val != null && type != 'boolean' &&
                (type != 'string' || val.length) &&
                !isNaN(num) && isFinite(num) || false
        }

        $.inArray = function(elem, array, i) {
            return emptyArray.indexOf.call(array, elem, i)
        }

        $.camelCase = camelize
        $.trim = function(str) {
            return str == null ? "" : String.prototype.trim.call(str)
        }

        // plugin compatibility
        $.uuid = 0
        $.support = {}
        $.expr = {}
        $.noop = function() {}

        $.map = function(elements, callback) {
            var value, values = [],
                i, key
            if (likeArray(elements))
                for (i = 0; i < elements.length; i++) {
                    value = callback(elements[i], i)
                    if (value != null) values.push(value)
                }
            else
                for (key in elements) {
                    value = callback(elements[key], key)
                    if (value != null) values.push(value)
                }
            return flatten(values)
        }

        $.each = function(elements, callback) {
            var i, key
            if (likeArray(elements)) {
                for (i = 0; i < elements.length; i++)
                    if (callback.call(elements[i], i, elements[i]) === false) return elements
            } else {
                for (key in elements)
                    if (callback.call(elements[key], key, elements[key]) === false) return elements
            }

            return elements
        }

        $.grep = function(elements, callback) {
            return filter.call(elements, callback)
        }

        if (window.JSON) $.parseJSON = JSON.parse

        // Populate the class2type map
        $.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
            class2type["[object " + name + "]"] = name.toLowerCase()
        })

        // Define methods that will be available on all
        // Zepto collections
        $.fn = {
            constructor: zepto.Z,
            length: 0,

            // Because a collection acts like an array
            // copy over these useful array functions.
            forEach: emptyArray.forEach,
            reduce: emptyArray.reduce,
            push: emptyArray.push,
            sort: emptyArray.sort,
            splice: emptyArray.splice,
            indexOf: emptyArray.indexOf,
            concat: function() {
                var i, value, args = []
                for (i = 0; i < arguments.length; i++) {
                    value = arguments[i]
                    args[i] = zepto.isZ(value) ? value.toArray() : value
                }
                return concat.apply(zepto.isZ(this) ? this.toArray() : this, args)
            },

            // `map` and `slice` in the jQuery API work differently
            // from their array counterparts
            map: function(fn) {
                return $($.map(this, function(el, i) { return fn.call(el, i, el) }))
            },
            slice: function() {
                return $(slice.apply(this, arguments))
            },

            ready: function(callback) {
                // need to check if document.body exists for IE as that browser reports
                // document ready when it hasn't yet created the body element
                if (readyRE.test(document.readyState) && document.body) callback($)
                else document.addEventListener('DOMContentLoaded', function() { callback($) }, false)
                return this
            },
            get: function(idx) {
                return idx === undefined ? slice.call(this) : this[idx >= 0 ? idx : idx + this.length]
            },
            toArray: function() { return this.get() },
            size: function() {
                return this.length
            },
            remove: function() {
                return this.each(function() {
                    if (this.parentNode != null)
                        this.parentNode.removeChild(this)
                })
            },
            each: function(callback) {
                emptyArray.every.call(this, function(el, idx) {
                    return callback.call(el, idx, el) !== false
                })
                return this
            },
            filter: function(selector) {
                if (isFunction(selector)) return this.not(this.not(selector))
                return $(filter.call(this, function(element) {
                    return zepto.matches(element, selector)
                }))
            },
            add: function(selector, context) {
                return $(uniq(this.concat($(selector, context))))
            },
            is: function(selector) {
                return this.length > 0 && zepto.matches(this[0], selector)
            },
            not: function(selector) {
                var nodes = []
                if (isFunction(selector) && selector.call !== undefined)
                    this.each(function(idx) {
                        if (!selector.call(this, idx)) nodes.push(this)
                    })
                else {
                    var excludes = typeof selector == 'string' ? this.filter(selector) :
                        (likeArray(selector) && isFunction(selector.item)) ? slice.call(selector) : $(selector)
                    this.forEach(function(el) {
                        if (excludes.indexOf(el) < 0) nodes.push(el)
                    })
                }
                return $(nodes)
            },
            has: function(selector) {
                return this.filter(function() {
                    return isObject(selector) ?
                        $.contains(this, selector) :
                        $(this).find(selector).size()
                })
            },
            eq: function(idx) {
                return idx === -1 ? this.slice(idx) : this.slice(idx, +idx + 1)
            },
            first: function() {
                var el = this[0]
                return el && !isObject(el) ? el : $(el)
            },
            last: function() {
                var el = this[this.length - 1]
                return el && !isObject(el) ? el : $(el)
            },
            find: function(selector) {
                var result, $this = this
                if (!selector) result = $()
                else if (typeof selector == 'object')
                    result = $(selector).filter(function() {
                        var node = this
                        return emptyArray.some.call($this, function(parent) {
                            return $.contains(parent, node)
                        })
                    })
                else if (this.length == 1) result = $(zepto.qsa(this[0], selector))
                else result = this.map(function() { return zepto.qsa(this, selector) })
                return result
            },
            closest: function(selector, context) {
                var nodes = [],
                    collection = typeof selector == 'object' && $(selector)
                this.each(function(_, node) {
                    while (node && !(collection ? collection.indexOf(node) >= 0 : zepto.matches(node, selector)))
                        node = node !== context && !isDocument(node) && node.parentNode
                    if (node && nodes.indexOf(node) < 0) nodes.push(node)
                })
                return $(nodes)
            },
            parents: function(selector) {
                var ancestors = [],
                    nodes = this
                while (nodes.length > 0)
                    nodes = $.map(nodes, function(node) {
                        if ((node = node.parentNode) && !isDocument(node) && ancestors.indexOf(node) < 0) {
                            ancestors.push(node)
                            return node
                        }
                    })
                return filtered(ancestors, selector)
            },
            parent: function(selector) {
                return filtered(uniq(this.pluck('parentNode')), selector)
            },
            children: function(selector) {
                return filtered(this.map(function() { return children(this) }), selector)
            },
            contents: function() {
                return this.map(function() { return this.contentDocument || slice.call(this.childNodes) })
            },
            siblings: function(selector) {
                return filtered(this.map(function(i, el) {
                    return filter.call(children(el.parentNode), function(child) { return child !== el })
                }), selector)
            },
            empty: function() {
                return this.each(function() { this.innerHTML = '' })
            },
            // `pluck` is borrowed from Prototype.js
            pluck: function(property) {
                return $.map(this, function(el) { return el[property] })
            },
            show: function() {
                return this.each(function() {
                    this.style.display == "none" && (this.style.display = '')
                    if (getComputedStyle(this, '').getPropertyValue("display") == "none")
                        this.style.display = defaultDisplay(this.nodeName)
                })
            },
            replaceWith: function(newContent) {
                return this.before(newContent).remove()
            },
            wrap: function(structure) {
                var func = isFunction(structure)
                if (this[0] && !func)
                    var dom = $(structure).get(0),
                        clone = dom.parentNode || this.length > 1

                return this.each(function(index) {
                    $(this).wrapAll(
                        func ? structure.call(this, index) :
                        clone ? dom.cloneNode(true) : dom
                    )
                })
            },
            wrapAll: function(structure) {
                if (this[0]) {
                    $(this[0]).before(structure = $(structure))
                    var children
                        // drill down to the inmost element
                    while ((children = structure.children()).length) structure = children.first()
                    $(structure).append(this)
                }
                return this
            },
            wrapInner: function(structure) {
                var func = isFunction(structure)
                return this.each(function(index) {
                    var self = $(this),
                        contents = self.contents(),
                        dom = func ? structure.call(this, index) : structure
                    contents.length ? contents.wrapAll(dom) : self.append(dom)
                })
            },
            unwrap: function() {
                this.parent().each(function() {
                    $(this).replaceWith($(this).children())
                })
                return this
            },
            clone: function() {
                return this.map(function() { return this.cloneNode(true) })
            },
            hide: function() {
                return this.css("display", "none")
            },
            toggle: function(setting) {
                return this.each(function() {
                    var el = $(this);
                    (setting === undefined ? el.css("display") == "none" : setting) ? el.show(): el.hide()
                })
            },
            prev: function(selector) { return $(this.pluck('previousElementSibling')).filter(selector || '*') },
            next: function(selector) { return $(this.pluck('nextElementSibling')).filter(selector || '*') },
            html: function(html) {
                return 0 in arguments ?
                    this.each(function(idx) {
                        var originHtml = this.innerHTML
                        $(this).empty().append(funcArg(this, html, idx, originHtml))
                    }) :
                    (0 in this ? this[0].innerHTML : null)
            },
            text: function(text) {
                return 0 in arguments ?
                    this.each(function(idx) {
                        var newText = funcArg(this, text, idx, this.textContent)
                        this.textContent = newText == null ? '' : '' + newText
                    }) :
                    (0 in this ? this.pluck('textContent').join("") : null)
            },
            attr: function(name, value) {
                var result
                return (typeof name == 'string' && !(1 in arguments)) ?
                    (0 in this && this[0].nodeType == 1 && (result = this[0].getAttribute(name)) != null ? result : undefined) :
                    this.each(function(idx) {
                        if (this.nodeType !== 1) return
                        if (isObject(name))
                            for (key in name) setAttribute(this, key, name[key])
                        else setAttribute(this, name, funcArg(this, value, idx, this.getAttribute(name)))
                    })
            },
            removeAttr: function(name) {
                return this.each(function() {
                    this.nodeType === 1 && name.split(' ').forEach(function(attribute) {
                        setAttribute(this, attribute)
                    }, this)
                })
            },
            prop: function(name, value) {
                name = propMap[name] || name
                return (1 in arguments) ?
                    this.each(function(idx) {
                        this[name] = funcArg(this, value, idx, this[name])
                    }) :
                    (this[0] && this[0][name])
            },
            removeProp: function(name) {
                name = propMap[name] || name
                return this.each(function() { delete this[name] })
            },
            data: function(name, value) {
                var attrName = 'data-' + name.replace(capitalRE, '-$1').toLowerCase()

                var data = (1 in arguments) ?
                    this.attr(attrName, value) :
                    this.attr(attrName)

                return data !== null ? deserializeValue(data) : undefined
            },
            val: function(value) {
                if (0 in arguments) {
                    if (value == null) value = ""
                    return this.each(function(idx) {
                        this.value = funcArg(this, value, idx, this.value)
                    })
                } else {
                    return this[0] && (this[0].multiple ?
                        $(this[0]).find('option').filter(function() { return this.selected }).pluck('value') :
                        this[0].value)
                }
            },
            offset: function(coordinates) {
                if (coordinates) return this.each(function(index) {
                    var $this = $(this),
                        coords = funcArg(this, coordinates, index, $this.offset()),
                        parentOffset = $this.offsetParent().offset(),
                        props = {
                            top: coords.top - parentOffset.top,
                            left: coords.left - parentOffset.left
                        }

                    if ($this.css('position') == 'static') props['position'] = 'relative'
                    $this.css(props)
                })
                if (!this.length) return null
                if (document.documentElement !== this[0] && !$.contains(document.documentElement, this[0]))
                    return { top: 0, left: 0 }
                var obj = this[0].getBoundingClientRect()
                return {
                    left: obj.left + window.pageXOffset,
                    top: obj.top + window.pageYOffset,
                    width: Math.round(obj.width),
                    height: Math.round(obj.height)
                }
            },
            css: function(property, value) {
                if (arguments.length < 2) {
                    var element = this[0]
                    if (typeof property == 'string') {
                        if (!element) return
                        return element.style[camelize(property)] || getComputedStyle(element, '').getPropertyValue(property)
                    } else if (isArray(property)) {
                        if (!element) return
                        var props = {}
                        var computedStyle = getComputedStyle(element, '')
                        $.each(property, function(_, prop) {
                            props[prop] = (element.style[camelize(prop)] || computedStyle.getPropertyValue(prop))
                        })
                        return props
                    }
                }

                var css = ''
                if (type(property) == 'string') {
                    if (!value && value !== 0)
                        this.each(function() { this.style.removeProperty(dasherize(property)) })
                    else
                        css = dasherize(property) + ":" + maybeAddPx(property, value)
                } else {
                    for (key in property)
                        if (!property[key] && property[key] !== 0)
                            this.each(function() { this.style.removeProperty(dasherize(key)) })
                        else
                            css += dasherize(key) + ':' + maybeAddPx(key, property[key]) + ';'
                }

                return this.each(function() { this.style.cssText += ';' + css })
            },
            index: function(element) {
                return element ? this.indexOf($(element)[0]) : this.parent().children().indexOf(this[0])
            },
            hasClass: function(name) {
                if (!name) return false
                return emptyArray.some.call(this, function(el) {
                    return this.test(className(el))
                }, classRE(name))
            },
            addClass: function(name) {
                if (!name) return this
                return this.each(function(idx) {
                    if (!('className' in this)) return
                    classList = []
                    var cls = className(this),
                        newName = funcArg(this, name, idx, cls)
                    newName.split(/\s+/g).forEach(function(klass) {
                        if (!$(this).hasClass(klass)) classList.push(klass)
                    }, this)
                    classList.length && className(this, cls + (cls ? " " : "") + classList.join(" "))
                })
            },
            removeClass: function(name) {
                return this.each(function(idx) {
                    if (!('className' in this)) return
                    if (name === undefined) return className(this, '')
                    classList = className(this)
                    funcArg(this, name, idx, classList).split(/\s+/g).forEach(function(klass) {
                        classList = classList.replace(classRE(klass), " ")
                    })
                    className(this, classList.trim())
                })
            },
            toggleClass: function(name, when) {
                if (!name) return this
                return this.each(function(idx) {
                    var $this = $(this),
                        names = funcArg(this, name, idx, className(this))
                    names.split(/\s+/g).forEach(function(klass) {
                        (when === undefined ? !$this.hasClass(klass) : when) ?
                        $this.addClass(klass): $this.removeClass(klass)
                    })
                })
            },
            scrollTop: function(value) {
                if (!this.length) return
                var hasScrollTop = 'scrollTop' in this[0]
                if (value === undefined) return hasScrollTop ? this[0].scrollTop : this[0].pageYOffset
                return this.each(hasScrollTop ?
                    function() { this.scrollTop = value } :
                    function() { this.scrollTo(this.scrollX, value) })
            },
            scrollLeft: function(value) {
                if (!this.length) return
                var hasScrollLeft = 'scrollLeft' in this[0]
                if (value === undefined) return hasScrollLeft ? this[0].scrollLeft : this[0].pageXOffset
                return this.each(hasScrollLeft ?
                    function() { this.scrollLeft = value } :
                    function() { this.scrollTo(value, this.scrollY) })
            },
            position: function() {
                if (!this.length) return

                var elem = this[0],
                    // Get *real* offsetParent
                    offsetParent = this.offsetParent(),
                    // Get correct offsets
                    offset = this.offset(),
                    parentOffset = rootNodeRE.test(offsetParent[0].nodeName) ? { top: 0, left: 0 } : offsetParent.offset()

                // Subtract element margins
                // note: when an element has margin: auto the offsetLeft and marginLeft
                // are the same in Safari causing offset.left to incorrectly be 0
                offset.top -= parseFloat($(elem).css('margin-top')) || 0
                offset.left -= parseFloat($(elem).css('margin-left')) || 0

                // Add offsetParent borders
                parentOffset.top += parseFloat($(offsetParent[0]).css('border-top-width')) || 0
                parentOffset.left += parseFloat($(offsetParent[0]).css('border-left-width')) || 0

                // Subtract the two offsets
                return {
                    top: offset.top - parentOffset.top,
                    left: offset.left - parentOffset.left
                }
            },
            offsetParent: function() {
                return this.map(function() {
                    var parent = this.offsetParent || document.body
                    while (parent && !rootNodeRE.test(parent.nodeName) && $(parent).css("position") == "static")
                        parent = parent.offsetParent
                    return parent
                })
            }
        }

        // for now
        $.fn.detach = $.fn.remove

        // Generate the `width` and `height` functions
        ;
        ['width', 'height'].forEach(function(dimension) {
            var dimensionProperty =
                dimension.replace(/./, function(m) { return m[0].toUpperCase() })

            $.fn[dimension] = function(value) {
                var offset, el = this[0]
                if (value === undefined) return isWindow(el) ? el['inner' + dimensionProperty] :
                    isDocument(el) ? el.documentElement['scroll' + dimensionProperty] :
                    (offset = this.offset()) && offset[dimension]
                else return this.each(function(idx) {
                    el = $(this)
                    el.css(dimension, funcArg(this, value, idx, el[dimension]()))
                })
            }
        })

        function traverseNode(node, fun) {
            fun(node)
            for (var i = 0, len = node.childNodes.length; i < len; i++)
                traverseNode(node.childNodes[i], fun)
        }

        // Generate the `after`, `prepend`, `before`, `append`,
        // `insertAfter`, `insertBefore`, `appendTo`, and `prependTo` methods.
        adjacencyOperators.forEach(function(operator, operatorIndex) {
            var inside = operatorIndex % 2 //=> prepend, append

            $.fn[operator] = function() {
                // arguments can be nodes, arrays of nodes, Zepto objects and HTML strings
                var argType, nodes = $.map(arguments, function(arg) {
                        var arr = []
                        argType = type(arg)
                        if (argType == "array") {
                            arg.forEach(function(el) {
                                if (el.nodeType !== undefined) return arr.push(el)
                                else if ($.zepto.isZ(el)) return arr = arr.concat(el.get())
                                arr = arr.concat(zepto.fragment(el))
                            })
                            return arr
                        }
                        return argType == "object" || arg == null ?
                            arg : zepto.fragment(arg)
                    }),
                    parent, copyByClone = this.length > 1
                if (nodes.length < 1) return this

                return this.each(function(_, target) {
                    parent = inside ? target : target.parentNode

                    // convert all methods to a "before" operation
                    target = operatorIndex == 0 ? target.nextSibling :
                        operatorIndex == 1 ? target.firstChild :
                        operatorIndex == 2 ? target :
                        null

                    var parentInDocument = $.contains(document.documentElement, parent)

                    nodes.forEach(function(node) {
                        if (copyByClone) node = node.cloneNode(true)
                        else if (!parent) return $(node).remove()

                        parent.insertBefore(node, target)
                        if (parentInDocument) traverseNode(node, function(el) {
                            if (el.nodeName != null && el.nodeName.toUpperCase() === 'SCRIPT' &&
                                (!el.type || el.type === 'text/javascript') && !el.src) {
                                var target = el.ownerDocument ? el.ownerDocument.defaultView : window
                                target['eval'].call(target, el.innerHTML)
                            }
                        })
                    })
                })
            }

            // after    => insertAfter
            // prepend  => prependTo
            // before   => insertBefore
            // append   => appendTo
            $.fn[inside ? operator + 'To' : 'insert' + (operatorIndex ? 'Before' : 'After')] = function(html) {
                $(html)[operator](this)
                return this
            }
        })

        zepto.Z.prototype = Z.prototype = $.fn

        // Export internal API functions in the `$.zepto` namespace
        zepto.uniq = uniq
        zepto.deserializeValue = deserializeValue
        $.zepto = zepto

        return $
    })()

    window.Zepto = Zepto
    window.$ === undefined && (window.$ = Zepto)

    ;
    (function($) {
        var _zid = 1,
            undefined,
            slice = Array.prototype.slice,
            isFunction = $.isFunction,
            isString = function(obj) { return typeof obj == 'string' },
            handlers = {},
            specialEvents = {},
            focusinSupported = 'onfocusin' in window,
            focus = { focus: 'focusin', blur: 'focusout' },
            hover = { mouseenter: 'mouseover', mouseleave: 'mouseout' }

        specialEvents.click = specialEvents.mousedown = specialEvents.mouseup = specialEvents.mousemove = 'MouseEvents'

        function zid(element) {
            return element._zid || (element._zid = _zid++)
        }

        function findHandlers(element, event, fn, selector) {
            event = parse(event)
            if (event.ns) var matcher = matcherFor(event.ns)
            return (handlers[zid(element)] || []).filter(function(handler) {
                return handler &&
                    (!event.e || handler.e == event.e) &&
                    (!event.ns || matcher.test(handler.ns)) &&
                    (!fn || zid(handler.fn) === zid(fn)) &&
                    (!selector || handler.sel == selector)
            })
        }

        function parse(event) {
            var parts = ('' + event).split('.')
            return { e: parts[0], ns: parts.slice(1).sort().join(' ') }
        }

        function matcherFor(ns) {
            return new RegExp('(?:^| )' + ns.replace(' ', ' .* ?') + '(?: |$)')
        }

        function eventCapture(handler, captureSetting) {
            return handler.del &&
                (!focusinSupported && (handler.e in focus)) ||
                !!captureSetting
        }

        function realEvent(type) {
            return hover[type] || (focusinSupported && focus[type]) || type
        }

        function add(element, events, fn, data, selector, delegator, capture) {
            var id = zid(element),
                set = (handlers[id] || (handlers[id] = []))
            events.split(/\s/).forEach(function(event) {
                if (event == 'ready') return $(document).ready(fn)
                var handler = parse(event)
                handler.fn = fn
                handler.sel = selector
                    // emulate mouseenter, mouseleave
                if (handler.e in hover) fn = function(e) {
                    var related = e.relatedTarget
                    if (!related || (related !== this && !$.contains(this, related)))
                        return handler.fn.apply(this, arguments)
                }
                handler.del = delegator
                var callback = delegator || fn
                handler.proxy = function(e) {
                    e = compatible(e)
                    if (e.isImmediatePropagationStopped()) return
                    e.data = data
                    var result = callback.apply(element, e._args == undefined ? [e] : [e].concat(e._args))
                    if (result === false) e.preventDefault(), e.stopPropagation()
                    return result
                }
                handler.i = set.length
                set.push(handler)
                if ('addEventListener' in element)
                    element.addEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture))
            })
        }

        function remove(element, events, fn, selector, capture) {
            var id = zid(element);
            (events || '').split(/\s/).forEach(function(event) {
                findHandlers(element, event, fn, selector).forEach(function(handler) {
                    delete handlers[id][handler.i]
                    if ('removeEventListener' in element)
                        element.removeEventListener(realEvent(handler.e), handler.proxy, eventCapture(handler, capture))
                })
            })
        }

        $.event = { add: add, remove: remove }

        $.proxy = function(fn, context) {
            var args = (2 in arguments) && slice.call(arguments, 2)
            if (isFunction(fn)) {
                var proxyFn = function() { return fn.apply(context, args ? args.concat(slice.call(arguments)) : arguments) }
                proxyFn._zid = zid(fn)
                return proxyFn
            } else if (isString(context)) {
                if (args) {
                    args.unshift(fn[context], fn)
                    return $.proxy.apply(null, args)
                } else {
                    return $.proxy(fn[context], fn)
                }
            } else {
                throw new TypeError("expected function")
            }
        }

        $.fn.bind = function(event, data, callback) {
            return this.on(event, data, callback)
        }
        $.fn.unbind = function(event, callback) {
            return this.off(event, callback)
        }
        $.fn.one = function(event, selector, data, callback) {
            return this.on(event, selector, data, callback, 1)
        }

        var returnTrue = function() { return true },
            returnFalse = function() { return false },
            ignoreProperties = /^([A-Z]|returnValue$|layer[XY]$|webkitMovement[XY]$)/,
            eventMethods = {
                preventDefault: 'isDefaultPrevented',
                stopImmediatePropagation: 'isImmediatePropagationStopped',
                stopPropagation: 'isPropagationStopped'
            }

        function compatible(event, source) {
            if (source || !event.isDefaultPrevented) {
                source || (source = event)

                $.each(eventMethods, function(name, predicate) {
                    var sourceMethod = source[name]
                    event[name] = function() {
                        this[predicate] = returnTrue
                        return sourceMethod && sourceMethod.apply(source, arguments)
                    }
                    event[predicate] = returnFalse
                })

                event.timeStamp || (event.timeStamp = Date.now())

                if (source.defaultPrevented !== undefined ? source.defaultPrevented :
                    'returnValue' in source ? source.returnValue === false :
                    source.getPreventDefault && source.getPreventDefault())
                    event.isDefaultPrevented = returnTrue
            }
            return event
        }

        function createProxy(event) {
            var key, proxy = { originalEvent: event }
            for (key in event)
                if (!ignoreProperties.test(key) && event[key] !== undefined) proxy[key] = event[key]

            return compatible(proxy, event)
        }

        $.fn.delegate = function(selector, event, callback) {
            return this.on(event, selector, callback)
        }
        $.fn.undelegate = function(selector, event, callback) {
            return this.off(event, selector, callback)
        }

        $.fn.live = function(event, callback) {
            $(document.body).delegate(this.selector, event, callback)
            return this
        }
        $.fn.die = function(event, callback) {
            $(document.body).undelegate(this.selector, event, callback)
            return this
        }

        $.fn.on = function(event, selector, data, callback, one) {
            var autoRemove, delegator, $this = this
            if (event && !isString(event)) {
                $.each(event, function(type, fn) {
                    $this.on(type, selector, data, fn, one)
                })
                return $this
            }

            if (!isString(selector) && !isFunction(callback) && callback !== false)
                callback = data, data = selector, selector = undefined
            if (callback === undefined || data === false)
                callback = data, data = undefined

            if (callback === false) callback = returnFalse

            return $this.each(function(_, element) {
                if (one) autoRemove = function(e) {
                    remove(element, e.type, callback)
                    return callback.apply(this, arguments)
                }

                if (selector) delegator = function(e) {
                    var evt, match = $(e.target).closest(selector, element).get(0)
                    if (match && match !== element) {
                        evt = $.extend(createProxy(e), { currentTarget: match, liveFired: element })
                        return (autoRemove || callback).apply(match, [evt].concat(slice.call(arguments, 1)))
                    }
                }

                add(element, event, callback, data, selector, delegator || autoRemove)
            })
        }
        $.fn.off = function(event, selector, callback) {
            var $this = this
            if (event && !isString(event)) {
                $.each(event, function(type, fn) {
                    $this.off(type, selector, fn)
                })
                return $this
            }

            if (!isString(selector) && !isFunction(callback) && callback !== false)
                callback = selector, selector = undefined

            if (callback === false) callback = returnFalse

            return $this.each(function() {
                remove(this, event, callback, selector)
            })
        }

        $.fn.trigger = function(event, args) {
            event = (isString(event) || $.isPlainObject(event)) ? $.Event(event) : compatible(event)
            event._args = args
            return this.each(function() {
                // handle focus(), blur() by calling them directly
                if (event.type in focus && typeof this[event.type] == "function") this[event.type]()
                    // items in the collection might not be DOM elements
                else if ('dispatchEvent' in this) this.dispatchEvent(event)
                else $(this).triggerHandler(event, args)
            })
        }

        // triggers event handlers on current element just as if an event occurred,
        // doesn't trigger an actual event, doesn't bubble
        $.fn.triggerHandler = function(event, args) {
            var e, result
            this.each(function(i, element) {
                e = createProxy(isString(event) ? $.Event(event) : event)
                e._args = args
                e.target = element
                $.each(findHandlers(element, event.type || event), function(i, handler) {
                    result = handler.proxy(e)
                    if (e.isImmediatePropagationStopped()) return false
                })
            })
            return result
        }

        // shortcut methods for `.bind(event, fn)` for each event type
        ;
        ('focusin focusout focus blur load resize scroll unload click dblclick ' +
            'mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave ' +
            'change select keydown keypress keyup error').split(' ').forEach(function(event) {
            $.fn[event] = function(callback) {
                return (0 in arguments) ?
                    this.bind(event, callback) :
                    this.trigger(event)
            }
        })

        $.Event = function(type, props) {
            if (!isString(type)) props = type, type = props.type
            var event = document.createEvent(specialEvents[type] || 'Events'),
                bubbles = true
            if (props)
                for (var name in props)(name == 'bubbles') ? (bubbles = !!props[name]) : (event[name] = props[name])
            event.initEvent(type, bubbles, true)
            return compatible(event)
        }

    })(Zepto)

    ;
    (function($) {
        var jsonpID = +new Date(),
            document = window.document,
            key,
            name,
            rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
            scriptTypeRE = /^(?:text|application)\/javascript/i,
            xmlTypeRE = /^(?:text|application)\/xml/i,
            jsonType = 'application/json',
            htmlType = 'text/html',
            blankRE = /^\s*$/,
            originAnchor = document.createElement('a')

        originAnchor.href = window.location.href

        // trigger a custom event and return false if it was cancelled
        function triggerAndReturn(context, eventName, data) {
            var event = $.Event(eventName)
            $(context).trigger(event, data)
            return !event.isDefaultPrevented()
        }

        // trigger an Ajax "global" event
        function triggerGlobal(settings, context, eventName, data) {
            if (settings.global) return triggerAndReturn(context || document, eventName, data)
        }

        // Number of active Ajax requests
        $.active = 0

        function ajaxStart(settings) {
            if (settings.global && $.active++ === 0) triggerGlobal(settings, null, 'ajaxStart')
        }

        function ajaxStop(settings) {
            if (settings.global && !(--$.active)) triggerGlobal(settings, null, 'ajaxStop')
        }

        // triggers an extra global event "ajaxBeforeSend" that's like "ajaxSend" but cancelable
        function ajaxBeforeSend(xhr, settings) {
            var context = settings.context
            if (settings.beforeSend.call(context, xhr, settings) === false ||
                triggerGlobal(settings, context, 'ajaxBeforeSend', [xhr, settings]) === false)
                return false

            triggerGlobal(settings, context, 'ajaxSend', [xhr, settings])
        }

        function ajaxSuccess(data, xhr, settings, deferred) {
            var context = settings.context,
                status = 'success'
            settings.success.call(context, data, status, xhr)
            if (deferred) deferred.resolveWith(context, [data, status, xhr])
            triggerGlobal(settings, context, 'ajaxSuccess', [xhr, settings, data])
            ajaxComplete(status, xhr, settings)
        }
        // type: "timeout", "error", "abort", "parsererror"
        function ajaxError(error, type, xhr, settings, deferred) {
            var context = settings.context
            settings.error.call(context, xhr, type, error)
            if (deferred) deferred.rejectWith(context, [xhr, type, error])
            triggerGlobal(settings, context, 'ajaxError', [xhr, settings, error || type])
            ajaxComplete(type, xhr, settings)
        }
        // status: "success", "notmodified", "error", "timeout", "abort", "parsererror"
        function ajaxComplete(status, xhr, settings) {
            var context = settings.context
            settings.complete.call(context, xhr, status)
            triggerGlobal(settings, context, 'ajaxComplete', [xhr, settings])
            ajaxStop(settings)
        }

        function ajaxDataFilter(data, type, settings) {
            if (settings.dataFilter == empty) return data
            var context = settings.context
            return settings.dataFilter.call(context, data, type)
        }

        // Empty function, used as default callback
        function empty() {}

        $.ajaxJSONP = function(options, deferred) {
            if (!('type' in options)) return $.ajax(options)

            var _callbackName = options.jsonpCallback,
                callbackName = ($.isFunction(_callbackName) ?
                    _callbackName() : _callbackName) || ('Zepto' + (jsonpID++)),
                script = document.createElement('script'),
                originalCallback = window[callbackName],
                responseData,
                abort = function(errorType) {
                    $(script).triggerHandler('error', errorType || 'abort')
                },
                xhr = { abort: abort },
                abortTimeout

            if (deferred) deferred.promise(xhr)

            $(script).on('load error', function(e, errorType) {
                clearTimeout(abortTimeout)
                $(script).off().remove()

                if (e.type == 'error' || !responseData) {
                    ajaxError(null, errorType || 'error', xhr, options, deferred)
                } else {
                    ajaxSuccess(responseData[0], xhr, options, deferred)
                }

                window[callbackName] = originalCallback
                if (responseData && $.isFunction(originalCallback))
                    originalCallback(responseData[0])

                originalCallback = responseData = undefined
            })

            if (ajaxBeforeSend(xhr, options) === false) {
                abort('abort')
                return xhr
            }

            window[callbackName] = function() {
                responseData = arguments
            }

            script.src = options.url.replace(/\?(.+)=\?/, '?$1=' + callbackName)
            document.head.appendChild(script)

            if (options.timeout > 0) abortTimeout = setTimeout(function() {
                abort('timeout')
            }, options.timeout)

            return xhr
        }

        $.ajaxSettings = {
            // Default type of request
            type: 'GET',
            // Callback that is executed before request
            beforeSend: empty,
            // Callback that is executed if the request succeeds
            success: empty,
            // Callback that is executed the the server drops error
            error: empty,
            // Callback that is executed on request complete (both: error and success)
            complete: empty,
            // The context for the callbacks
            context: null,
            // Whether to trigger "global" Ajax events
            global: true,
            // Transport
            xhr: function() {
                return new window.XMLHttpRequest()
            },
            // MIME types mapping
            // IIS returns Javascript as "application/x-javascript"
            accepts: {
                script: 'text/javascript, application/javascript, application/x-javascript',
                json: jsonType,
                xml: 'application/xml, text/xml',
                html: htmlType,
                text: 'text/plain'
            },
            // Whether the request is to another domain
            crossDomain: false,
            // Default timeout
            timeout: 0,
            // Whether data should be serialized to string
            processData: true,
            // Whether the browser should be allowed to cache GET responses
            cache: true,
            //Used to handle the raw response data of XMLHttpRequest.
            //This is a pre-filtering function to sanitize the response.
            //The sanitized response should be returned
            dataFilter: empty
        }

        function mimeToDataType(mime) {
            if (mime) mime = mime.split(';', 2)[0]
            return mime && (mime == htmlType ? 'html' :
                mime == jsonType ? 'json' :
                scriptTypeRE.test(mime) ? 'script' :
                xmlTypeRE.test(mime) && 'xml') || 'text'
        }

        function appendQuery(url, query) {
            if (query == '') return url
            return (url + '&' + query).replace(/[&?]{1,2}/, '?')
        }

        // serialize payload and append it to the URL for GET requests
        function serializeData(options) {
            if (options.processData && options.data && $.type(options.data) != "string")
                options.data = $.param(options.data, options.traditional)
            if (options.data && (!options.type || options.type.toUpperCase() == 'GET' || 'jsonp' == options.dataType))
                options.url = appendQuery(options.url, options.data), options.data = undefined
        }

        $.ajax = function(options) {
            var settings = $.extend({}, options || {}),
                deferred = $.Deferred && $.Deferred(),
                urlAnchor, hashIndex
            for (key in $.ajaxSettings)
                if (settings[key] === undefined) settings[key] = $.ajaxSettings[key]

            ajaxStart(settings)

            if (!settings.crossDomain) {
                urlAnchor = document.createElement('a')
                urlAnchor.href = settings.url
                    // cleans up URL for .href (IE only), see https://github.com/madrobby/zepto/pull/1049
                urlAnchor.href = urlAnchor.href
                settings.crossDomain = (originAnchor.protocol + '//' + originAnchor.host) !== (urlAnchor.protocol + '//' + urlAnchor.host)
            }

            if (!settings.url) settings.url = window.location.toString()
            if ((hashIndex = settings.url.indexOf('#')) > -1) settings.url = settings.url.slice(0, hashIndex)
            serializeData(settings)

            var dataType = settings.dataType,
                hasPlaceholder = /\?.+=\?/.test(settings.url)
            if (hasPlaceholder) dataType = 'jsonp'

            if (settings.cache === false || (
                    (!options || options.cache !== true) &&
                    ('script' == dataType || 'jsonp' == dataType)
                ))
                settings.url = appendQuery(settings.url, '_=' + Date.now())

            if ('jsonp' == dataType) {
                if (!hasPlaceholder)
                    settings.url = appendQuery(settings.url,
                        settings.jsonp ? (settings.jsonp + '=?') : settings.jsonp === false ? '' : 'callback=?')
                return $.ajaxJSONP(settings, deferred)
            }

            var mime = settings.accepts[dataType],
                headers = {},
                setHeader = function(name, value) { headers[name.toLowerCase()] = [name, value] },
                protocol = /^([\w-]+:)\/\//.test(settings.url) ? RegExp.$1 : window.location.protocol,
                xhr = settings.xhr(),
                nativeSetHeader = xhr.setRequestHeader,
                abortTimeout

            if (deferred) deferred.promise(xhr)

            if (!settings.crossDomain) setHeader('X-Requested-With', 'XMLHttpRequest')
            setHeader('Accept', mime || '*/*')
            if (mime = settings.mimeType || mime) {
                if (mime.indexOf(',') > -1) mime = mime.split(',', 2)[0]
                xhr.overrideMimeType && xhr.overrideMimeType(mime)
            }
            if (settings.contentType || (settings.contentType !== false && settings.data && settings.type.toUpperCase() != 'GET'))
                setHeader('Content-Type', settings.contentType || 'application/x-www-form-urlencoded')

            if (settings.headers)
                for (name in settings.headers) setHeader(name, settings.headers[name])
            xhr.setRequestHeader = setHeader

            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4) {
                    xhr.onreadystatechange = empty
                    clearTimeout(abortTimeout)
                    var result, error = false
                    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304 || (xhr.status == 0 && protocol == 'file:')) {
                        dataType = dataType || mimeToDataType(settings.mimeType || xhr.getResponseHeader('content-type'))

                        if (xhr.responseType == 'arraybuffer' || xhr.responseType == 'blob')
                            result = xhr.response
                        else {
                            result = xhr.responseText

                            try {
                                // http://perfectionkills.com/global-eval-what-are-the-options/
                                // sanitize response accordingly if data filter callback provided
                                result = ajaxDataFilter(result, dataType, settings)
                                if (dataType == 'script')(1, eval)(result)
                                else if (dataType == 'xml') result = xhr.responseXML
                                else if (dataType == 'json') result = blankRE.test(result) ? null : $.parseJSON(result)
                            } catch (e) { error = e }

                            if (error) return ajaxError(error, 'parsererror', xhr, settings, deferred)
                        }

                        ajaxSuccess(result, xhr, settings, deferred)
                    } else {
                        ajaxError(xhr.statusText || null, xhr.status ? 'error' : 'abort', xhr, settings, deferred)
                    }
                }
            }

            if (ajaxBeforeSend(xhr, settings) === false) {
                xhr.abort()
                ajaxError(null, 'abort', xhr, settings, deferred)
                return xhr
            }

            var async = 'async' in settings ? settings.async : true
            xhr.open(settings.type, settings.url, async, settings.username, settings.password)

            if (settings.xhrFields)
                for (name in settings.xhrFields) xhr[name] = settings.xhrFields[name]

            for (name in headers) nativeSetHeader.apply(xhr, headers[name])

            if (settings.timeout > 0) abortTimeout = setTimeout(function() {
                xhr.onreadystatechange = empty
                xhr.abort()
                ajaxError(null, 'timeout', xhr, settings, deferred)
            }, settings.timeout)

            // avoid sending empty string (#319)
            xhr.send(settings.data ? settings.data : null)
            return xhr
        }

        // handle optional data/success arguments
        function parseArguments(url, data, success, dataType) {
            if ($.isFunction(data)) dataType = success, success = data, data = undefined
            if (!$.isFunction(success)) dataType = success, success = undefined
            return {
                url: url,
                data: data,
                success: success,
                dataType: dataType
            }
        }

        $.get = function( /* url, data, success, dataType */ ) {
            return $.ajax(parseArguments.apply(null, arguments))
        }

        $.post = function( /* url, data, success, dataType */ ) {
            var options = parseArguments.apply(null, arguments)
            options.type = 'POST'
            return $.ajax(options)
        }

        $.getJSON = function( /* url, data, success */ ) {
            var options = parseArguments.apply(null, arguments)
            options.dataType = 'json'
            return $.ajax(options)
        }

        $.fn.load = function(url, data, success) {
            if (!this.length) return this
            var self = this,
                parts = url.split(/\s/),
                selector,
                options = parseArguments(url, data, success),
                callback = options.success
            if (parts.length > 1) options.url = parts[0], selector = parts[1]
            options.success = function(response) {
                self.html(selector ?
                    $('<div>').html(response.replace(rscript, "")).find(selector) :
                    response)
                callback && callback.apply(self, arguments)
            }
            $.ajax(options)
            return this
        }

        var escape = encodeURIComponent

        function serialize(params, obj, traditional, scope) {
            var type, array = $.isArray(obj),
                hash = $.isPlainObject(obj)
            $.each(obj, function(key, value) {
                type = $.type(value)
                if (scope) key = traditional ? scope :
                    scope + '[' + (hash || type == 'object' || type == 'array' ? key : '') + ']'
                    // handle data in serializeArray() format
                if (!scope && array) params.add(value.name, value.value)
                    // recurse into nested objects
                else if (type == "array" || (!traditional && type == "object"))
                    serialize(params, value, traditional, key)
                else params.add(key, value)
            })
        }

        $.param = function(obj, traditional) {
            var params = []
            params.add = function(key, value) {
                if ($.isFunction(value)) value = value()
                if (value == null) value = ""
                this.push(escape(key) + '=' + escape(value))
            }
            serialize(params, obj, traditional)
            return params.join('&').replace(/%20/g, '+')
        }
    })(Zepto)

    ;
    (function($) {
        $.fn.serializeArray = function() {
            var name, type, result = [],
                add = function(value) {
                    if (value.forEach) return value.forEach(add)
                    result.push({ name: name, value: value })
                }
            if (this[0]) $.each(this[0].elements, function(_, field) {
                type = field.type, name = field.name
                if (name && field.nodeName.toLowerCase() != 'fieldset' &&
                    !field.disabled && type != 'submit' && type != 'reset' && type != 'button' && type != 'file' &&
                    ((type != 'radio' && type != 'checkbox') || field.checked))
                    add($(field).val())
            })
            return result
        }

        $.fn.serialize = function() {
            var result = []
            this.serializeArray().forEach(function(elm) {
                result.push(encodeURIComponent(elm.name) + '=' + encodeURIComponent(elm.value))
            })
            return result.join('&')
        }

        $.fn.submit = function(callback) {
            if (0 in arguments) this.bind('submit', callback)
            else if (this.length) {
                var event = $.Event('submit')
                this.eq(0).trigger(event)
                if (!event.isDefaultPrevented()) this.get(0).submit()
            }
            return this
        }

    })(Zepto)

    ;
    (function() {
        // getComputedStyle shouldn't freak out when called
        // without a valid element as argument
        try {
            getComputedStyle(undefined)
        } catch (e) {
            var nativeGetComputedStyle = getComputedStyle
            window.getComputedStyle = function(element, pseudoElement) {
                try {
                    return nativeGetComputedStyle(element, pseudoElement)
                } catch (e) {
                    return null
                }
            }
        }
    })()
    return Zepto
}));


//     Zepto.js
//     (c) 2010-2016 Thomas Fuchs
//     Zepto.js may be freely distributed under the MIT license.

;
(function($) {
    var touch = {},
        touchTimeout, tapTimeout, swipeTimeout, longTapTimeout,
        longTapDelay = 750,
        gesture,
        down, up, move,
        eventMap,
        initialized = false

    function swipeDirection(x1, x2, y1, y2) {
        return Math.abs(x1 - x2) >=
            Math.abs(y1 - y2) ? (x1 - x2 > 0 ? 'Left' : 'Right') : (y1 - y2 > 0 ? 'Up' : 'Down')
    }

    function longTap() {
        longTapTimeout = null
        if (touch.last) {
            touch.el.trigger('longTap')
            touch = {}
        }
    }

    function cancelLongTap() {
        if (longTapTimeout) clearTimeout(longTapTimeout)
        longTapTimeout = null
    }

    function cancelAll() {
        if (touchTimeout) clearTimeout(touchTimeout)
        if (tapTimeout) clearTimeout(tapTimeout)
        if (swipeTimeout) clearTimeout(swipeTimeout)
        if (longTapTimeout) clearTimeout(longTapTimeout)
        touchTimeout = tapTimeout = swipeTimeout = longTapTimeout = null
        touch = {}
    }

    function isPrimaryTouch(event) {
        return (event.pointerType == 'touch' ||
                event.pointerType == event.MSPOINTER_TYPE_TOUCH) &&
            event.isPrimary
    }

    function isPointerEventType(e, type) {
        return (e.type == 'pointer' + type ||
            e.type.toLowerCase() == 'mspointer' + type)
    }

    // helper function for tests, so they check for different APIs
    function unregisterTouchEvents() {
        if (!initialized) return
        $(document).off(eventMap.down, down)
            .off(eventMap.up, up)
            .off(eventMap.move, move)
            .off(eventMap.cancel, cancelAll)
        $(window).off('scroll', cancelAll)
        cancelAll()
        initialized = false
    }

    function setup(__eventMap) {
        var now, delta, deltaX = 0,
            deltaY = 0,
            firstTouch, _isPointerType

        unregisterTouchEvents()

        eventMap = (__eventMap && ('down' in __eventMap)) ? __eventMap :
            ('ontouchstart' in document ? {
                    'down': 'touchstart',
                    'up': 'touchend',
                    'move': 'touchmove',
                    'cancel': 'touchcancel'
                } :
                'onpointerdown' in document ? {
                    'down': 'pointerdown',
                    'up': 'pointerup',
                    'move': 'pointermove',
                    'cancel': 'pointercancel'
                } :
                'onmspointerdown' in document ? {
                    'down': 'MSPointerDown',
                    'up': 'MSPointerUp',
                    'move': 'MSPointerMove',
                    'cancel': 'MSPointerCancel'
                } : false)

        // No API availables for touch events
        if (!eventMap) return

        if ('MSGesture' in window) {
            gesture = new MSGesture()
            gesture.target = document.body

            $(document)
                .bind('MSGestureEnd', function(e) {
                    var swipeDirectionFromVelocity =
                        e.velocityX > 1 ? 'Right' : e.velocityX < -1 ? 'Left' : e.velocityY > 1 ? 'Down' : e.velocityY < -1 ? 'Up' : null
                    if (swipeDirectionFromVelocity) {
                        touch.el.trigger('swipe')
                        touch.el.trigger('swipe' + swipeDirectionFromVelocity)
                    }
                })
        }

        down = function(e) {
            if ((_isPointerType = isPointerEventType(e, 'down')) &&
                !isPrimaryTouch(e)) return
            firstTouch = _isPointerType ? e : e.touches[0]
            if (e.touches && e.touches.length === 1 && touch.x2) {
                // Clear out touch movement data if we have it sticking around
                // This can occur if touchcancel doesn't fire due to preventDefault, etc.
                touch.x2 = undefined
                touch.y2 = undefined
            }
            now = Date.now()
            delta = now - (touch.last || now)
            touch.el = $('tagName' in firstTouch.target ?
                firstTouch.target : firstTouch.target.parentNode)
            touchTimeout && clearTimeout(touchTimeout)
            touch.x1 = firstTouch.pageX
            touch.y1 = firstTouch.pageY
            if (delta > 0 && delta <= 250) touch.isDoubleTap = true
            touch.last = now
            longTapTimeout = setTimeout(longTap, longTapDelay)
                // adds the current touch contact for IE gesture recognition
            if (gesture && _isPointerType) gesture.addPointer(e.pointerId)
        }

        move = function(e) {
            if ((_isPointerType = isPointerEventType(e, 'move')) &&
                !isPrimaryTouch(e)) return
            firstTouch = _isPointerType ? e : e.touches[0]
            cancelLongTap()
            touch.x2 = firstTouch.pageX
            touch.y2 = firstTouch.pageY

            deltaX += Math.abs(touch.x1 - touch.x2)
            deltaY += Math.abs(touch.y1 - touch.y2)
        }

        up = function(e) {
            if ((_isPointerType = isPointerEventType(e, 'up')) &&
                !isPrimaryTouch(e)) return
            cancelLongTap()

            // swipe
            if ((touch.x2 && Math.abs(touch.x1 - touch.x2) > 30) ||
                (touch.y2 && Math.abs(touch.y1 - touch.y2) > 30))

                swipeTimeout = setTimeout(function() {
                if (touch.el) {
                    touch.el.trigger('swipe')
                    touch.el.trigger('swipe' + (swipeDirection(touch.x1, touch.x2, touch.y1, touch.y2)))
                }
                touch = {}
            }, 0)

            // normal tap
            else if ('last' in touch)
            // don't fire tap when delta position changed by more than 30 pixels,
            // for instance when moving to a point and back to origin
                if (deltaX < 30 && deltaY < 30) {
                    // delay by one tick so we can cancel the 'tap' event if 'scroll' fires
                    // ('tap' fires before 'scroll')
                    tapTimeout = setTimeout(function() {

                        // trigger universal 'tap' with the option to cancelTouch()
                        // (cancelTouch cancels processing of single vs double taps for faster 'tap' response)
                        var event = $.Event('tap')
                        event.cancelTouch = cancelAll
                            // [by paper] fix -> "TypeError: 'undefined' is not an object (evaluating 'touch.el.trigger'), when double tap
                        if (touch.el) touch.el.trigger(event)

                        // trigger double tap immediately
                        if (touch.isDoubleTap) {
                            if (touch.el) touch.el.trigger('doubleTap')
                            touch = {}
                        }

                        // trigger single tap after 250ms of inactivity
                        else {
                            touchTimeout = setTimeout(function() {
                                touchTimeout = null
                                if (touch.el) touch.el.trigger('singleTap')
                                touch = {}
                            }, 250)
                        }
                    }, 0)
                } else {
                    touch = {}
                }
            deltaX = deltaY = 0
        }

        $(document).on(eventMap.up, up)
            .on(eventMap.down, down)
            .on(eventMap.move, move)

        // when the browser window loses focus,
        // for example when a modal dialog is shown,
        // cancel all ongoing events
        $(document).on(eventMap.cancel, cancelAll)

        // scrolling the window indicates intention of the user
        // to scroll, not tap or swipe, so cancel all ongoing events
        $(window).on('scroll', cancelAll)

        initialized = true
    }

    ;
    ['swipe', 'swipeLeft', 'swipeRight', 'swipeUp', 'swipeDown',
        'doubleTap', 'tap', 'singleTap', 'longTap'
    ].forEach(function(eventName) {
        $.fn[eventName] = function(callback) { return this.on(eventName, callback) }
    })

    $.touch = { setup: setup }

    $(document).ready(setup)
})(Zepto)
=======
!function(t,e){"function"==typeof define&&define.amd?define(function(){return e(t)}):e(t)}(this,function(c){var Uj,d=function(){var u,a,l,i,s,n,r=[],o=r.concat,h=r.filter,f=r.slice,p=c.document,d={},e={},m={"column-count":1,columns:1,"font-weight":1,"line-height":1,opacity:1,"z-index":1,zoom:1},v=/^\s*<(\w+|!)[^>]*>/,g=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,y=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,j=/^(?:body|html)$/i,x=/([A-Z])/g,b=["val","css","html","text","data","width","height","offset"],t=p.createElement("table"),$=p.createElement("tr"),E={tr:p.createElement("tbody"),tbody:t,thead:t,tfoot:t,td:$,th:$,"*":p.createElement("div")},w=/complete|loaded|interactive/,T=/^[\w-]*$/,S={},C=S.toString,B={},N=p.createElement("div"),O={tabindex:"tabIndex",readonly:"readOnly",for:"htmlFor",class:"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},P=Array.isArray||function(t){return t instanceof Array};function D(t){return null==t?String(t):S[C.call(t)]||"object"}function M(t){return"function"==D(t)}function F(t){return null!=t&&t==t.window}function L(t){return null!=t&&t.nodeType==t.DOCUMENT_NODE}function A(t){return"object"==D(t)}function Y(t){return A(t)&&!F(t)&&Object.getPrototypeOf(t)==Object.prototype}function R(t){var e=!!t&&"length"in t&&t.length,n=l.type(t);return"function"!=n&&!F(t)&&("array"==n||0===e||"number"==typeof e&&0<e&&e-1 in t)}function _(t){return t.replace(/::/g,"/").replace(/([A-Z]+)([A-Z][a-z])/g,"$1_$2").replace(/([a-z\d])([A-Z])/g,"$1_$2").replace(/_/g,"-").toLowerCase()}function U(t){return t in e?e[t]:e[t]=new RegExp("(^|\\s)"+t+"(\\s|$)")}function k(t,e){return"number"!=typeof e||m[_(t)]?e:e+"px"}function Z(t){return"children"in t?f.call(t.children):l.map(t.childNodes,function(t){if(1==t.nodeType)return t})}function V(t,e){var n,i=t?t.length:0;for(n=0;n<i;n++)this[n]=t[n];this.length=i,this.selector=e||""}function z(t,e){return null==e?l(t):l(t).filter(e)}function H(t,e,n,i){return M(e)?e.call(t,n,i):e}function I(t,e,n){null==n?t.removeAttribute(e):t.setAttribute(e,n)}function q(t,e){var n=t.className||"",i=n&&n.baseVal!==u;if(e===u)return i?n.baseVal:n;i?n.baseVal=e:t.className=e}function W(e){try{return e?"true"==e||"false"!=e&&("null"==e?null:+e+""==e?+e:/^[\[\{]/.test(e)?l.parseJSON(e):e):e}catch(t){return e}}return B.matches=function(t,e){if(!e||!t||1!==t.nodeType)return!1;var n=t.matches||t.webkitMatchesSelector||t.mozMatchesSelector||t.oMatchesSelector||t.matchesSelector;if(n)return n.call(t,e);var i,r=t.parentNode,o=!r;return o&&(r=N).appendChild(t),i=~B.qsa(r,e).indexOf(t),o&&N.removeChild(t),i},s=function(t){return t.replace(/-+(.)?/g,function(t,e){return e?e.toUpperCase():""})},n=function(n){return h.call(n,function(t,e){return n.indexOf(t)==e})},B.fragment=function(t,e,n){var i,r,o;return g.test(t)&&(i=l(p.createElement(RegExp.$1))),i||(t.replace&&(t=t.replace(y,"<$1></$2>")),e===u&&(e=v.test(t)&&RegExp.$1),e in E||(e="*"),(o=E[e]).innerHTML=""+t,i=l.each(f.call(o.childNodes),function(){o.removeChild(this)})),Y(n)&&(r=l(i),l.each(n,function(t,e){-1<b.indexOf(t)?r[t](e):r.attr(t,e)})),i},B.Z=function(t,e){return new V(t,e)},B.isZ=function(t){return t instanceof B.Z},B.init=function(t,e){var n,i;if(!t)return B.Z();if("string"==typeof t)if("<"==(t=t.trim())[0]&&v.test(t))n=B.fragment(t,RegExp.$1,e),t=null;else{if(e!==u)return l(e).find(t);n=B.qsa(p,t)}else{if(M(t))return l(p).ready(t);if(B.isZ(t))return t;if(P(t))i=t,n=h.call(i,function(t){return null!=t});else if(A(t))n=[t],t=null;else if(v.test(t))n=B.fragment(t.trim(),RegExp.$1,e),t=null;else{if(e!==u)return l(e).find(t);n=B.qsa(p,t)}}return B.Z(n,t)},(l=function(t,e){return B.init(t,e)}).extend=function(e){var n,t=f.call(arguments,1);return"boolean"==typeof e&&(n=e,e=t.shift()),t.forEach(function(t){!function t(e,n,i){for(a in n)i&&(Y(n[a])||P(n[a]))?(Y(n[a])&&!Y(e[a])&&(e[a]={}),P(n[a])&&!P(e[a])&&(e[a]=[]),t(e[a],n[a],i)):n[a]!==u&&(e[a]=n[a])}(e,t,n)}),e},B.qsa=function(t,e){var n,i="#"==e[0],r=!i&&"."==e[0],o=i||r?e.slice(1):e,a=T.test(o);return t.getElementById&&a&&i?(n=t.getElementById(o))?[n]:[]:1!==t.nodeType&&9!==t.nodeType&&11!==t.nodeType?[]:f.call(a&&!i&&t.getElementsByClassName?r?t.getElementsByClassName(o):t.getElementsByTagName(e):t.querySelectorAll(e))},l.contains=p.documentElement.contains?function(t,e){return t!==e&&t.contains(e)}:function(t,e){for(;e&&(e=e.parentNode);)if(e===t)return!0;return!1},l.type=D,l.isFunction=M,l.isWindow=F,l.isArray=P,l.isPlainObject=Y,l.isEmptyObject=function(t){var e;for(e in t)return!1;return!0},l.isNumeric=function(t){var e=Number(t),n=typeof t;return null!=t&&"boolean"!=n&&("string"!=n||t.length)&&!isNaN(e)&&isFinite(e)||!1},l.inArray=function(t,e,n){return r.indexOf.call(e,t,n)},l.camelCase=s,l.trim=function(t){return null==t?"":String.prototype.trim.call(t)},l.uuid=0,l.support={},l.expr={},l.noop=function(){},l.map=function(t,e){var n,i,r,o,a=[];if(R(t))for(i=0;i<t.length;i++)null!=(n=e(t[i],i))&&a.push(n);else for(r in t)null!=(n=e(t[r],r))&&a.push(n);return 0<(o=a).length?l.fn.concat.apply([],o):o},l.each=function(t,e){var n,i;if(R(t)){for(n=0;n<t.length;n++)if(!1===e.call(t[n],n,t[n]))return t}else for(i in t)if(!1===e.call(t[i],i,t[i]))return t;return t},l.grep=function(t,e){return h.call(t,e)},c.JSON&&(l.parseJSON=JSON.parse),l.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(t,e){S["[object "+e+"]"]=e.toLowerCase()}),l.fn={constructor:B.Z,length:0,forEach:r.forEach,reduce:r.reduce,push:r.push,sort:r.sort,splice:r.splice,indexOf:r.indexOf,concat:function(){var t,e,n=[];for(t=0;t<arguments.length;t++)e=arguments[t],n[t]=B.isZ(e)?e.toArray():e;return o.apply(B.isZ(this)?this.toArray():this,n)},map:function(n){return l(l.map(this,function(t,e){return n.call(t,e,t)}))},slice:function(){return l(f.apply(this,arguments))},ready:function(t){return w.test(p.readyState)&&p.body?t(l):p.addEventListener("DOMContentLoaded",function(){t(l)},!1),this},get:function(t){return t===u?f.call(this):this[0<=t?t:t+this.length]},toArray:function(){return this.get()},size:function(){return this.length},remove:function(){return this.each(function(){null!=this.parentNode&&this.parentNode.removeChild(this)})},each:function(n){return r.every.call(this,function(t,e){return!1!==n.call(t,e,t)}),this},filter:function(e){return M(e)?this.not(this.not(e)):l(h.call(this,function(t){return B.matches(t,e)}))},add:function(t,e){return l(n(this.concat(l(t,e))))},is:function(t){return 0<this.length&&B.matches(this[0],t)},not:function(e){var n=[];if(M(e)&&e.call!==u)this.each(function(t){e.call(this,t)||n.push(this)});else{var i="string"==typeof e?this.filter(e):R(e)&&M(e.item)?f.call(e):l(e);this.forEach(function(t){i.indexOf(t)<0&&n.push(t)})}return l(n)},has:function(t){return this.filter(function(){return A(t)?l.contains(this,t):l(this).find(t).size()})},eq:function(t){return-1===t?this.slice(t):this.slice(t,+t+1)},first:function(){var t=this[0];return t&&!A(t)?t:l(t)},last:function(){var t=this[this.length-1];return t&&!A(t)?t:l(t)},find:function(t){var n=this;return t?"object"==typeof t?l(t).filter(function(){var e=this;return r.some.call(n,function(t){return l.contains(t,e)})}):1==this.length?l(B.qsa(this[0],t)):this.map(function(){return B.qsa(this,t)}):l()},closest:function(n,i){var r=[],o="object"==typeof n&&l(n);return this.each(function(t,e){for(;e&&!(o?0<=o.indexOf(e):B.matches(e,n));)e=e!==i&&!L(e)&&e.parentNode;e&&r.indexOf(e)<0&&r.push(e)}),l(r)},parents:function(t){for(var e=[],n=this;0<n.length;)n=l.map(n,function(t){if((t=t.parentNode)&&!L(t)&&e.indexOf(t)<0)return e.push(t),t});return z(e,t)},parent:function(t){return z(n(this.pluck("parentNode")),t)},children:function(t){return z(this.map(function(){return Z(this)}),t)},contents:function(){return this.map(function(){return this.contentDocument||f.call(this.childNodes)})},siblings:function(t){return z(this.map(function(t,e){return h.call(Z(e.parentNode),function(t){return t!==e})}),t)},empty:function(){return this.each(function(){this.innerHTML=""})},pluck:function(e){return l.map(this,function(t){return t[e]})},show:function(){return this.each(function(){var t,e,n;"none"==this.style.display&&(this.style.display=""),"none"==getComputedStyle(this,"").getPropertyValue("display")&&(this.style.display=(t=this.nodeName,d[t]||(e=p.createElement(t),p.body.appendChild(e),n=getComputedStyle(e,"").getPropertyValue("display"),e.parentNode.removeChild(e),"none"==n&&(n="block"),d[t]=n),d[t]))})},replaceWith:function(t){return this.before(t).remove()},wrap:function(e){var n=M(e);if(this[0]&&!n)var i=l(e).get(0),r=i.parentNode||1<this.length;return this.each(function(t){l(this).wrapAll(n?e.call(this,t):r?i.cloneNode(!0):i)})},wrapAll:function(t){if(this[0]){var e;for(l(this[0]).before(t=l(t));(e=t.children()).length;)t=e.first();l(t).append(this)}return this},wrapInner:function(r){var o=M(r);return this.each(function(t){var e=l(this),n=e.contents(),i=o?r.call(this,t):r;n.length?n.wrapAll(i):e.append(i)})},unwrap:function(){return this.parent().each(function(){l(this).replaceWith(l(this).children())}),this},clone:function(){return this.map(function(){return this.cloneNode(!0)})},hide:function(){return this.css("display","none")},toggle:function(e){return this.each(function(){var t=l(this);(e===u?"none"==t.css("display"):e)?t.show():t.hide()})},prev:function(t){return l(this.pluck("previousElementSibling")).filter(t||"*")},next:function(t){return l(this.pluck("nextElementSibling")).filter(t||"*")},html:function(n){return 0 in arguments?this.each(function(t){var e=this.innerHTML;l(this).empty().append(H(this,n,t,e))}):0 in this?this[0].innerHTML:null},text:function(n){return 0 in arguments?this.each(function(t){var e=H(this,n,t,this.textContent);this.textContent=null==e?"":""+e}):0 in this?this.pluck("textContent").join(""):null},attr:function(e,n){var t;return"string"!=typeof e||1 in arguments?this.each(function(t){if(1===this.nodeType)if(A(e))for(a in e)I(this,a,e[a]);else I(this,e,H(this,n,t,this.getAttribute(e)))}):0 in this&&1==this[0].nodeType&&null!=(t=this[0].getAttribute(e))?t:u},removeAttr:function(t){return this.each(function(){1===this.nodeType&&t.split(" ").forEach(function(t){I(this,t)},this)})},prop:function(e,n){return e=O[e]||e,1 in arguments?this.each(function(t){this[e]=H(this,n,t,this[e])}):this[0]&&this[0][e]},removeProp:function(t){return t=O[t]||t,this.each(function(){delete this[t]})},data:function(t,e){var n="data-"+t.replace(x,"-$1").toLowerCase(),i=1 in arguments?this.attr(n,e):this.attr(n);return null!==i?W(i):u},val:function(e){return 0 in arguments?(null==e&&(e=""),this.each(function(t){this.value=H(this,e,t,this.value)})):this[0]&&(this[0].multiple?l(this[0]).find("option").filter(function(){return this.selected}).pluck("value"):this[0].value)},offset:function(o){if(o)return this.each(function(t){var e=l(this),n=H(this,o,t,e.offset()),i=e.offsetParent().offset(),r={top:n.top-i.top,left:n.left-i.left};"static"==e.css("position")&&(r.position="relative"),e.css(r)});if(!this.length)return null;if(p.documentElement!==this[0]&&!l.contains(p.documentElement,this[0]))return{top:0,left:0};var t=this[0].getBoundingClientRect();return{left:t.left+c.pageXOffset,top:t.top+c.pageYOffset,width:Math.round(t.width),height:Math.round(t.height)}},css:function(t,e){if(arguments.length<2){var n=this[0];if("string"==typeof t){if(!n)return;return n.style[s(t)]||getComputedStyle(n,"").getPropertyValue(t)}if(P(t)){if(!n)return;var i={},r=getComputedStyle(n,"");return l.each(t,function(t,e){i[e]=n.style[s(e)]||r.getPropertyValue(e)}),i}}var o="";if("string"==D(t))e||0===e?o=_(t)+":"+k(t,e):this.each(function(){this.style.removeProperty(_(t))});else for(a in t)t[a]||0===t[a]?o+=_(a)+":"+k(a,t[a])+";":this.each(function(){this.style.removeProperty(_(a))});return this.each(function(){this.style.cssText+=";"+o})},index:function(t){return t?this.indexOf(l(t)[0]):this.parent().children().indexOf(this[0])},hasClass:function(t){return!!t&&r.some.call(this,function(t){return this.test(q(t))},U(t))},addClass:function(n){return n?this.each(function(t){if("className"in this){i=[];var e=q(this);H(this,n,t,e).split(/\s+/g).forEach(function(t){l(this).hasClass(t)||i.push(t)},this),i.length&&q(this,e+(e?" ":"")+i.join(" "))}}):this},removeClass:function(e){return this.each(function(t){if("className"in this){if(e===u)return q(this,"");i=q(this),H(this,e,t,i).split(/\s+/g).forEach(function(t){i=i.replace(U(t)," ")}),q(this,i.trim())}})},toggleClass:function(n,i){return n?this.each(function(t){var e=l(this);H(this,n,t,q(this)).split(/\s+/g).forEach(function(t){(i===u?!e.hasClass(t):i)?e.addClass(t):e.removeClass(t)})}):this},scrollTop:function(t){if(this.length){var e="scrollTop"in this[0];return t===u?e?this[0].scrollTop:this[0].pageYOffset:this.each(e?function(){this.scrollTop=t}:function(){this.scrollTo(this.scrollX,t)})}},scrollLeft:function(t){if(this.length){var e="scrollLeft"in this[0];return t===u?e?this[0].scrollLeft:this[0].pageXOffset:this.each(e?function(){this.scrollLeft=t}:function(){this.scrollTo(t,this.scrollY)})}},position:function(){if(this.length){var t=this[0],e=this.offsetParent(),n=this.offset(),i=j.test(e[0].nodeName)?{top:0,left:0}:e.offset();return n.top-=parseFloat(l(t).css("margin-top"))||0,n.left-=parseFloat(l(t).css("margin-left"))||0,i.top+=parseFloat(l(e[0]).css("border-top-width"))||0,i.left+=parseFloat(l(e[0]).css("border-left-width"))||0,{top:n.top-i.top,left:n.left-i.left}}},offsetParent:function(){return this.map(function(){for(var t=this.offsetParent||p.body;t&&!j.test(t.nodeName)&&"static"==l(t).css("position");)t=t.offsetParent;return t})}},l.fn.detach=l.fn.remove,["width","height"].forEach(function(i){var r=i.replace(/./,function(t){return t[0].toUpperCase()});l.fn[i]=function(e){var t,n=this[0];return e===u?F(n)?n["inner"+r]:L(n)?n.documentElement["scroll"+r]:(t=this.offset())&&t[i]:this.each(function(t){(n=l(this)).css(i,H(this,e,t,n[i]()))})}}),["after","prepend","before","append"].forEach(function(e,a){var s=a%2;l.fn[e]=function(){var n,i,r=l.map(arguments,function(t){var e=[];return"array"==(n=D(t))?(t.forEach(function(t){return t.nodeType!==u?e.push(t):l.zepto.isZ(t)?e=e.concat(t.get()):void(e=e.concat(B.fragment(t)))}),e):"object"==n||null==t?t:B.fragment(t)}),o=1<this.length;return r.length<1?this:this.each(function(t,e){i=s?e:e.parentNode,e=0==a?e.nextSibling:1==a?e.firstChild:2==a?e:null;var n=l.contains(p.documentElement,i);r.forEach(function(t){if(o)t=t.cloneNode(!0);else if(!i)return l(t).remove();i.insertBefore(t,e),n&&function t(e,n){n(e);for(var i=0,r=e.childNodes.length;i<r;i++)t(e.childNodes[i],n)}(t,function(t){if(!(null==t.nodeName||"SCRIPT"!==t.nodeName.toUpperCase()||t.type&&"text/javascript"!==t.type||t.src)){var e=t.ownerDocument?t.ownerDocument.defaultView:c;e.eval.call(e,t.innerHTML)}})})})},l.fn[s?e+"To":"insert"+(a?"Before":"After")]=function(t){return l(t)[e](this),this}}),B.Z.prototype=V.prototype=l.fn,B.uniq=n,B.deserializeValue=W,l.zepto=B,l}();return c.Zepto=d,void 0===c.$&&(c.$=d),function(l){var h,e=1,u=Array.prototype.slice,f=l.isFunction,p=function(t){return"string"==typeof t},d={},o={},n="onfocusin"in c,i={focus:"focusin",blur:"focusout"},m={mouseenter:"mouseover",mouseleave:"mouseout"};function v(t){return t._zid||(t._zid=e++)}function a(t,e,n,i){if((e=g(e)).ns)var r=(o=e.ns,new RegExp("(?:^| )"+o.replace(" "," .* ?")+"(?: |$)"));var o;return(d[v(t)]||[]).filter(function(t){return t&&(!e.e||t.e==e.e)&&(!e.ns||r.test(t.ns))&&(!n||v(t.fn)===v(n))&&(!i||t.sel==i)})}function g(t){var e=(""+t).split(".");return{e:e[0],ns:e.slice(1).sort().join(" ")}}function y(t,e){return t.del&&!n&&t.e in i||!!e}function j(t){return m[t]||n&&i[t]||t}function x(r,t,e,o,a,s,c){var n=v(r),u=d[n]||(d[n]=[]);t.split(/\s/).forEach(function(t){if("ready"==t)return l(document).ready(e);var n=g(t);n.fn=e,n.sel=a,n.e in m&&(e=function(t){var e=t.relatedTarget;if(!e||e!==this&&!l.contains(this,e))return n.fn.apply(this,arguments)});var i=(n.del=s)||e;n.proxy=function(t){if(!(t=E(t)).isImmediatePropagationStopped()){t.data=o;var e=i.apply(r,t._args==h?[t]:[t].concat(t._args));return!1===e&&(t.preventDefault(),t.stopPropagation()),e}},n.i=u.length,u.push(n),"addEventListener"in r&&r.addEventListener(j(n.e),n.proxy,y(n,c))})}function b(e,t,n,i,r){var o=v(e);(t||"").split(/\s/).forEach(function(t){a(e,t,n,i).forEach(function(t){delete d[o][t.i],"removeEventListener"in e&&e.removeEventListener(j(t.e),t.proxy,y(t,r))})})}o.click=o.mousedown=o.mouseup=o.mousemove="MouseEvents",l.event={add:x,remove:b},l.proxy=function(t,e){var n=2 in arguments&&u.call(arguments,2);if(f(t)){var i=function(){return t.apply(e,n?n.concat(u.call(arguments)):arguments)};return i._zid=v(t),i}if(p(e))return n?(n.unshift(t[e],t),l.proxy.apply(null,n)):l.proxy(t[e],t);throw new TypeError("expected function")},l.fn.bind=function(t,e,n){return this.on(t,e,n)},l.fn.unbind=function(t,e){return this.off(t,e)},l.fn.one=function(t,e,n,i){return this.on(t,e,n,i,1)};var s=function(){return!0},$=function(){return!1},r=/^([A-Z]|returnValue$|layer[XY]$|webkitMovement[XY]$)/,t={preventDefault:"isDefaultPrevented",stopImmediatePropagation:"isImmediatePropagationStopped",stopPropagation:"isPropagationStopped"};function E(i,r){return!r&&i.isDefaultPrevented||(r||(r=i),l.each(t,function(t,e){var n=r[t];i[t]=function(){return this[e]=s,n&&n.apply(r,arguments)},i[e]=$}),i.timeStamp||(i.timeStamp=Date.now()),(r.defaultPrevented!==h?r.defaultPrevented:"returnValue"in r?!1===r.returnValue:r.getPreventDefault&&r.getPreventDefault())&&(i.isDefaultPrevented=s)),i}function w(t){var e,n={originalEvent:t};for(e in t)r.test(e)||t[e]===h||(n[e]=t[e]);return E(n,t)}l.fn.delegate=function(t,e,n){return this.on(e,t,n)},l.fn.undelegate=function(t,e,n){return this.off(e,t,n)},l.fn.live=function(t,e){return l(document.body).delegate(this.selector,t,e),this},l.fn.die=function(t,e){return l(document.body).undelegate(this.selector,t,e),this},l.fn.on=function(e,r,n,o,a){var s,c,i=this;return e&&!p(e)?(l.each(e,function(t,e){i.on(t,r,n,e,a)}),i):(p(r)||f(o)||!1===o||(o=n,n=r,r=h),o!==h&&!1!==n||(o=n,n=h),!1===o&&(o=$),i.each(function(t,i){a&&(s=function(t){return b(i,t.type,o),o.apply(this,arguments)}),r&&(c=function(t){var e,n=l(t.target).closest(r,i).get(0);if(n&&n!==i)return e=l.extend(w(t),{currentTarget:n,liveFired:i}),(s||o).apply(n,[e].concat(u.call(arguments,1)))}),x(i,e,o,n,r,c||s)}))},l.fn.off=function(t,n,e){var i=this;return t&&!p(t)?(l.each(t,function(t,e){i.off(t,n,e)}),i):(p(n)||f(e)||!1===e||(e=n,n=h),!1===e&&(e=$),i.each(function(){b(this,t,e,n)}))},l.fn.trigger=function(t,e){return(t=p(t)||l.isPlainObject(t)?l.Event(t):E(t))._args=e,this.each(function(){t.type in i&&"function"==typeof this[t.type]?this[t.type]():"dispatchEvent"in this?this.dispatchEvent(t):l(this).triggerHandler(t,e)})},l.fn.triggerHandler=function(n,i){var r,o;return this.each(function(t,e){(r=w(p(n)?l.Event(n):n))._args=i,r.target=e,l.each(a(e,n.type||n),function(t,e){if(o=e.proxy(r),r.isImmediatePropagationStopped())return!1})}),o},"focusin focusout focus blur load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function(e){l.fn[e]=function(t){return 0 in arguments?this.bind(e,t):this.trigger(e)}}),l.Event=function(t,e){p(t)||(t=(e=t).type);var n=document.createEvent(o[t]||"Events"),i=!0;if(e)for(var r in e)"bubbles"==r?i=!!e[r]:n[r]=e[r];return n.initEvent(t,i,!0),E(n)}}(d),function(Bh){var Eh,Fh,Ch=+new Date,Dh=c.document,Gh=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,Hh=/^(?:text|application)\/javascript/i,Ih=/^(?:text|application)\/xml/i,Jh="application/json",Kh="text/html",Lh=/^\s*$/,Mh=Dh.createElement("a");function Oh(t,e,n,i){if(t.global)return r=e||Dh,o=n,a=i,s=Bh.Event(o),Bh(r).trigger(s,a),!s.isDefaultPrevented();var r,o,a,s}function Rh(t,e){var n=e.context;if(!1===e.beforeSend.call(n,t,e)||!1===Oh(e,n,"ajaxBeforeSend",[t,e]))return!1;Oh(e,n,"ajaxSend",[t,e])}function Sh(t,e,n,i){var r=n.context,o="success";n.success.call(r,t,o,e),i&&i.resolveWith(r,[t,o,e]),Oh(n,r,"ajaxSuccess",[e,n,t]),Uh(o,e,n)}function Th(t,e,n,i,r){var o=i.context;i.error.call(o,n,e,t),r&&r.rejectWith(o,[n,e,t]),Oh(i,o,"ajaxError",[n,i,t||e]),Uh(e,n,i)}function Uh(t,e,n){var i,r=n.context;n.complete.call(r,e,t),Oh(n,r,"ajaxComplete",[e,n]),(i=n).global&&!--Bh.active&&Oh(i,null,"ajaxStop")}function Wh(){}function Yh(t,e){return""==e?t:(t+"&"+e).replace(/[&?]{1,2}/,"?")}function $h(t,e,n,i){return Bh.isFunction(e)&&(i=n,n=e,e=void 0),Bh.isFunction(n)||(i=n,n=void 0),{url:t,data:e,success:n,dataType:i}}Mh.href=c.location.href,Bh.active=0,Bh.ajaxJSONP=function(n,i){if(!("type"in n))return Bh.ajax(n);var r,o,t=n.jsonpCallback,a=(Bh.isFunction(t)?t():t)||"Zepto"+Ch++,s=Dh.createElement("script"),u=c[a],e=function(t){Bh(s).triggerHandler("error",t||"abort")},l={abort:e};return i&&i.promise(l),Bh(s).on("load error",function(t,e){clearTimeout(o),Bh(s).off().remove(),"error"!=t.type&&r?Sh(r[0],l,n,i):Th(null,e||"error",l,n,i),c[a]=u,r&&Bh.isFunction(u)&&u(r[0]),u=r=void 0}),!1===Rh(l,n)?e("abort"):(c[a]=function(){r=arguments},s.src=n.url.replace(/\?(.+)=\?/,"?$1="+a),Dh.head.appendChild(s),0<n.timeout&&(o=setTimeout(function(){e("timeout")},n.timeout))),l},Bh.ajaxSettings={type:"GET",beforeSend:Wh,success:Wh,error:Wh,complete:Wh,context:null,global:!0,xhr:function(){return new c.XMLHttpRequest},accepts:{script:"text/javascript, application/javascript, application/x-javascript",json:Jh,xml:"application/xml, text/xml",html:Kh,text:"text/plain"},crossDomain:!1,timeout:0,processData:!0,cache:!0,dataFilter:Wh},Bh.ajax=function(Zi){var aj,bj,ji,Yi,$i=Bh.extend({},Zi||{}),_i=Bh.Deferred&&Bh.Deferred();for(Eh in Bh.ajaxSettings)void 0===$i[Eh]&&($i[Eh]=Bh.ajaxSettings[Eh]);(ji=$i).global&&0==Bh.active++&&Oh(ji,null,"ajaxStart"),$i.crossDomain||((aj=Dh.createElement("a")).href=$i.url,aj.href=aj.href,$i.crossDomain=Mh.protocol+"//"+Mh.host!=aj.protocol+"//"+aj.host),$i.url||($i.url=c.location.toString()),-1<(bj=$i.url.indexOf("#"))&&($i.url=$i.url.slice(0,bj)),(Yi=$i).processData&&Yi.data&&"string"!=Bh.type(Yi.data)&&(Yi.data=Bh.param(Yi.data,Yi.traditional)),!Yi.data||Yi.type&&"GET"!=Yi.type.toUpperCase()&&"jsonp"!=Yi.dataType||(Yi.url=Yh(Yi.url,Yi.data),Yi.data=void 0);var cj=$i.dataType,dj=/\?.+=\?/.test($i.url);if(dj&&(cj="jsonp"),!1!==$i.cache&&(Zi&&!0===Zi.cache||"script"!=cj&&"jsonp"!=cj)||($i.url=Yh($i.url,"_="+Date.now())),"jsonp"==cj)return dj||($i.url=Yh($i.url,$i.jsonp?$i.jsonp+"=?":!1===$i.jsonp?"":"callback=?")),Bh.ajaxJSONP($i,_i);var kj,ej=$i.accepts[cj],fj={},gj=function(t,e){fj[t.toLowerCase()]=[t,e]},hj=/^([\w-]+:)\/\//.test($i.url)?RegExp.$1:c.location.protocol,ij=$i.xhr(),jj=ij.setRequestHeader;if(_i&&_i.promise(ij),$i.crossDomain||gj("X-Requested-With","XMLHttpRequest"),gj("Accept",ej||"*/*"),(ej=$i.mimeType||ej)&&(-1<ej.indexOf(",")&&(ej=ej.split(",",2)[0]),ij.overrideMimeType&&ij.overrideMimeType(ej)),($i.contentType||!1!==$i.contentType&&$i.data&&"GET"!=$i.type.toUpperCase())&&gj("Content-Type",$i.contentType||"application/x-www-form-urlencoded"),$i.headers)for(Fh in $i.headers)gj(Fh,$i.headers[Fh]);if(ij.setRequestHeader=gj,!(ij.onreadystatechange=function(){if(4==ij.readyState){ij.onreadystatechange=Wh,clearTimeout(kj);var oj,pj=!1;if(200<=ij.status&&ij.status<300||304==ij.status||0==ij.status&&"file:"==hj){if(cj=cj||((Vi=$i.mimeType||ij.getResponseHeader("content-type"))&&(Vi=Vi.split(";",2)[0]),Vi&&(Vi==Kh?"html":Vi==Jh?"json":Hh.test(Vi)?"script":Ih.test(Vi)&&"xml")||"text"),"arraybuffer"==ij.responseType||"blob"==ij.responseType)oj=ij.response;else{oj=ij.responseText;try{oj=function(t,e,n){if(n.dataFilter==Wh)return t;var i=n.context;return n.dataFilter.call(i,t,e)}(oj,cj,$i),"script"==cj?eval(oj):"xml"==cj?oj=ij.responseXML:"json"==cj&&(oj=Lh.test(oj)?null:Bh.parseJSON(oj))}catch(t){pj=t}if(pj)return Th(pj,"parsererror",ij,$i,_i)}Sh(oj,ij,$i,_i)}else Th(ij.statusText||null,ij.status?"error":"abort",ij,$i,_i)}var Vi})===Rh(ij,$i))return ij.abort(),Th(null,"abort",ij,$i,_i),ij;var lj=!("async"in $i)||$i.async;if(ij.open($i.type,$i.url,lj,$i.username,$i.password),$i.xhrFields)for(Fh in $i.xhrFields)ij[Fh]=$i.xhrFields[Fh];for(Fh in fj)jj.apply(ij,fj[Fh]);return 0<$i.timeout&&(kj=setTimeout(function(){ij.onreadystatechange=Wh,ij.abort(),Th(null,"timeout",ij,$i,_i)},$i.timeout)),ij.send($i.data?$i.data:null),ij},Bh.get=function(){return Bh.ajax($h.apply(null,arguments))},Bh.post=function(){var t=$h.apply(null,arguments);return t.type="POST",Bh.ajax(t)},Bh.getJSON=function(){var t=$h.apply(null,arguments);return t.dataType="json",Bh.ajax(t)},Bh.fn.load=function(t,e,n){if(!this.length)return this;var i,r=this,o=t.split(/\s/),a=$h(t,e,n),s=a.success;return 1<o.length&&(a.url=o[0],i=o[1]),a.success=function(t){r.html(i?Bh("<div>").html(t.replace(Gh,"")).find(i):t),s&&s.apply(r,arguments)},Bh.ajax(a),this};var _h=encodeURIComponent;Bh.param=function(t,e){var n=[];return n.add=function(t,e){Bh.isFunction(e)&&(e=e()),null==e&&(e=""),this.push(_h(t)+"="+_h(e))},function n(i,t,r,o){var a,s=Bh.isArray(t),c=Bh.isPlainObject(t);Bh.each(t,function(t,e){a=Bh.type(e),o&&(t=r?o:o+"["+(c||"object"==a||"array"==a?t:"")+"]"),!o&&s?i.add(e.name,e.value):"array"==a||!r&&"object"==a?n(i,e,r,t):i.add(t,e)})}(n,t,e),n.join("&").replace(/%20/g,"+")}}(d),(Uj=d).fn.serializeArray=function(){var n,i,e=[],r=function(t){if(t.forEach)return t.forEach(r);e.push({name:n,value:t})};return this[0]&&Uj.each(this[0].elements,function(t,e){i=e.type,(n=e.name)&&"fieldset"!=e.nodeName.toLowerCase()&&!e.disabled&&"submit"!=i&&"reset"!=i&&"button"!=i&&"file"!=i&&("radio"!=i&&"checkbox"!=i||e.checked)&&r(Uj(e).val())}),e},Uj.fn.serialize=function(){var e=[];return this.serializeArray().forEach(function(t){e.push(encodeURIComponent(t.name)+"="+encodeURIComponent(t.value))}),e.join("&")},Uj.fn.submit=function(t){if(0 in arguments)this.bind("submit",t);else if(this.length){var e=Uj.Event("submit");this.eq(0).trigger(e),e.isDefaultPrevented()||this.get(0).submit()}return this},function(){try{getComputedStyle(void 0)}catch(t){var n=getComputedStyle;c.getComputedStyle=function(t,e){try{return n(t,e)}catch(t){return null}}}}(),d}),function(s){var c,u,l,h,f,p,d,m,v,g={},y=!1;function j(){h=null,g.last&&(g.el.trigger("longTap"),g={})}function x(){h&&clearTimeout(h),h=null}function b(){c&&clearTimeout(c),u&&clearTimeout(u),l&&clearTimeout(l),h&&clearTimeout(h),c=u=l=h=null,g={}}function $(t){return("touch"==t.pointerType||t.pointerType==t.MSPOINTER_TYPE_TOUCH)&&t.isPrimary}function E(t,e){return t.type=="pointer"+e||t.type.toLowerCase()=="mspointer"+e}function t(t){var e,n,i,r,o=0,a=0;y&&(s(document).off(v.down,p).off(v.up,d).off(v.move,m).off(v.cancel,b),s(window).off("scroll",b),b(),y=!1),(v=t&&"down"in t?t:"ontouchstart"in document?{down:"touchstart",up:"touchend",move:"touchmove",cancel:"touchcancel"}:"onpointerdown"in document?{down:"pointerdown",up:"pointerup",move:"pointermove",cancel:"pointercancel"}:"onmspointerdown"in document&&{down:"MSPointerDown",up:"MSPointerUp",move:"MSPointerMove",cancel:"MSPointerCancel"})&&("MSGesture"in window&&((f=new MSGesture).target=document.body,s(document).bind("MSGestureEnd",function(t){var e=1<t.velocityX?"Right":t.velocityX<-1?"Left":1<t.velocityY?"Down":t.velocityY<-1?"Up":null;e&&(g.el.trigger("swipe"),g.el.trigger("swipe"+e))})),p=function(t){(r=E(t,"down"))&&!$(t)||(i=r?t:t.touches[0],t.touches&&1===t.touches.length&&g.x2&&(g.x2=void 0,g.y2=void 0),e=Date.now(),n=e-(g.last||e),g.el=s("tagName"in i.target?i.target:i.target.parentNode),c&&clearTimeout(c),g.x1=i.pageX,g.y1=i.pageY,0<n&&n<=250&&(g.isDoubleTap=!0),g.last=e,h=setTimeout(j,750),f&&r&&f.addPointer(t.pointerId))},m=function(t){(r=E(t,"move"))&&!$(t)||(i=r?t:t.touches[0],x(),g.x2=i.pageX,g.y2=i.pageY,o+=Math.abs(g.x1-g.x2),a+=Math.abs(g.y1-g.y2))},d=function(t){(r=E(t,"up"))&&!$(t)||(x(),g.x2&&30<Math.abs(g.x1-g.x2)||g.y2&&30<Math.abs(g.y1-g.y2)?l=setTimeout(function(){var t,e,n,i;g.el&&(g.el.trigger("swipe"),g.el.trigger("swipe"+(t=g.x1,e=g.x2,n=g.y1,i=g.y2,Math.abs(t-e)>=Math.abs(n-i)?0<t-e?"Left":"Right":0<n-i?"Up":"Down"))),g={}},0):"last"in g&&(o<30&&a<30?u=setTimeout(function(){var t=s.Event("tap");t.cancelTouch=b,g.el&&g.el.trigger(t),g.isDoubleTap?(g.el&&g.el.trigger("doubleTap"),g={}):c=setTimeout(function(){c=null,g.el&&g.el.trigger("singleTap"),g={}},250)},0):g={}),o=a=0)},s(document).on(v.up,d).on(v.down,p).on(v.move,m),s(document).on(v.cancel,b),s(window).on("scroll",b),y=!0)}["swipe","swipeLeft","swipeRight","swipeUp","swipeDown","doubleTap","tap","singleTap","longTap"].forEach(function(e){s.fn[e]=function(t){return this.on(e,t)}}),s.touch={setup:t},s(document).ready(t)}(Zepto);
>>>>>>> li

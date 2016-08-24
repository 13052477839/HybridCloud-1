//===========================
// metro UI define widget
//===========================
var widget_uuid = 0,
    widget_slice = Array.prototype.slice;

$.cleanData = (function (orig) {
    return function (elems) {
        var events, elem, i;
        for (i = 0; (elem = elems[i]) != null; i++) {
            try {

                // Only trigger remove when necessary to save time
                events = $._data(elem, "events");
                if (events && events.remove) {
                    $(elem).triggerHandler("remove");
                }

                // http://bugs.$.com/ticket/8235
            } catch (e) {
            }
        }
        orig(elems);
    };
})($.cleanData);

$.widget = function (name, base, prototype) {
    var fullName, existingConstructor, constructor, basePrototype,
    // proxiedPrototype allows the provided prototype to remain unmodified
    // so that it can be used as a mixin for multiple widgets (#8876)
        proxiedPrototype = {},
        namespace = name.split(".")[0];

    name = name.split(".")[1];
    fullName = namespace + "-" + name;

    if (!prototype) {
        prototype = base;
        base = $.Widget;
    }

    // create selector for plugin
    $.expr[":"][fullName.toLowerCase()] = function (elem) {
        return !!$.data(elem, fullName);
    };

    $[namespace] = $[namespace] || {};
    existingConstructor = $[namespace][name];
    constructor = $[namespace][name] = function (options, element) {
        // allow instantiation without "new" keyword
        if (!this._createWidget) {
            return new constructor(options, element);
        }

        // allow instantiation without initializing for simple inheritance
        // must use "new" keyword (the code above always passes args)
        if (arguments.length) {
            this._createWidget(options, element);
        }
    };
    // extend with the existing constructor to carry over any static properties
    $.extend(constructor, existingConstructor, {
        version: prototype.version,
        // copy the object used to create the prototype in case we need to
        // redefine the widget later
        _proto: $.extend({}, prototype),
        // track widgets that inherit from this widget in case this widget is
        // redefined after a widget inherits from it
        _childConstructors: []
    });

    basePrototype = new base();
    // we need to make the options hash a property directly on the new instance
    // otherwise we'll modify the options hash on the prototype that we're
    // inheriting from
    basePrototype.options = $.widget.extend({}, basePrototype.options);
    $.each(prototype, function (prop, value) {
        if (!$.isFunction(value)) {
            proxiedPrototype[prop] = value;
            return;
        }
        proxiedPrototype[prop] = (function () {
            var _super = function () {
                    return base.prototype[prop].apply(this, arguments);
                },
                _superApply = function (args) {
                    return base.prototype[prop].apply(this, args);
                };
            return function () {
                var __super = this._super,
                    __superApply = this._superApply,
                    returnValue;

                this._super = _super;
                this._superApply = _superApply;

                returnValue = value.apply(this, arguments);

                this._super = __super;
                this._superApply = __superApply;

                return returnValue;
            };
        })();
    });
    constructor.prototype = $.widget.extend(basePrototype, {
        // TODO: remove support for widgetEventPrefix
        // always use the name + a colon as the prefix, e.g., draggable:start
        // don't prefix for widgets that aren't DOM-based
        widgetEventPrefix: existingConstructor ? (basePrototype.widgetEventPrefix || name) : name
    }, proxiedPrototype, {
        constructor: constructor,
        namespace: namespace,
        widgetName: name,
        widgetFullName: fullName
    });

    // If this widget is being redefined then we need to find all widgets that
    // are inheriting from it and redefine all of them so that they inherit from
    // the new version of this widget. We're essentially trying to replace one
    // level in the prototype chain.
    if (existingConstructor) {
        $.each(existingConstructor._childConstructors, function (i, child) {
            var childPrototype = child.prototype;

            // redefine the child widget using the same prototype that was
            // originally used, but inherit from the new version of the base
            $.widget(childPrototype.namespace + "." + childPrototype.widgetName, constructor, child._proto);
        });
        // remove the list of existing child constructors from the old constructor
        // so the old child constructors can be garbage collected
        delete existingConstructor._childConstructors;
    } else {
        base._childConstructors.push(constructor);
    }

    $.widget.bridge(name, constructor);

    return constructor;
};

$.widget.extend = function (target) {
    var input = widget_slice.call(arguments, 1),
        inputIndex = 0,
        inputLength = input.length,
        key,
        value;
    for (; inputIndex < inputLength; inputIndex++) {
        for (key in input[inputIndex]) {
            value = input[inputIndex][key];
            if (input[inputIndex].hasOwnProperty(key) && value !== undefined) {
                // Clone objects
                if ($.isPlainObject(value)) {
                    target[key] = $.isPlainObject(target[key]) ?
                        $.widget.extend({}, target[key], value) :
                        // Don't extend strings, arrays, etc. with objects
                        $.widget.extend({}, value);
                    // Copy everything else by reference
                } else {
                    target[key] = value;
                }
            }
        }
    }
    return target;
};

$.widget.bridge = function (name, object) {
    var fullName = object.prototype.widgetFullName || name;
    $.fn[name] = function (options) {
        var isMethodCall = typeof options === "string",
            args = widget_slice.call(arguments, 1),
            returnValue = this;

        if (isMethodCall) {
            this.each(function () {
                var methodValue,
                    instance = $.data(this, fullName);
                if (options === "instance") {
                    returnValue = instance;
                    return false;
                }
                if (!instance) {
                    return $.error("cannot call methods on " + name + " prior to initialization; " +
                        "attempted to call method '" + options + "'");
                }
                if (!$.isFunction(instance[options]) || options.charAt(0) === "_") {
                    return $.error("no such method '" + options + "' for " + name + " widget instance");
                }
                methodValue = instance[options].apply(instance, args);
                if (methodValue !== instance && methodValue !== undefined) {
                    returnValue = methodValue && methodValue.jquery ?
                        returnValue.pushStack(methodValue.get()) :
                        methodValue;
                    return false;
                }
            });
        } else {

            // Allow multiple hashes to be passed on init
            if (args.length) {
                options = $.widget.extend.apply(null, [options].concat(args));
            }

            this.each(function () {
                var instance = $.data(this, fullName);
                if (instance) {
                    instance.option(options || {});
                    if (instance._init) {
                        instance._init();
                    }
                } else {
                    $.data(this, fullName, new object(options, this));
                }
            });
        }

        return returnValue;
    };
};

$.Widget = function (/* options, element */) {
};
$.Widget._childConstructors = [];

$.Widget.prototype = {
    widgetName: "widget",
    widgetEventPrefix: "",
    defaultElement: "<div>",
    options: {
        disabled: false,

        // callbacks
        create: null
    },
    _createWidget: function (options, element) {
        element = $(element || this.defaultElement || this)[0];
        this.element = $(element);
        this.uuid = widget_uuid++;
        this.eventNamespace = "." + this.widgetName + this.uuid;

        this.bindings = $();
        this.hoverable = $();
        this.focusable = $();

        if (element !== this) {
            $.data(element, this.widgetFullName, this);
            this._on(true, this.element, {
                remove: function (event) {
                    if (event.target === element) {
                        this.destroy();
                    }
                }
            });
            this.document = $(element.style ?
                // element within the document
                element.ownerDocument :
                // element is window or document
            element.document || element);
            this.window = $(this.document[0].defaultView || this.document[0].parentWindow);
        }

        this.options = $.widget.extend({},
            this.options,
            this._getCreateOptions(),
            options);

        this._create();
        this._trigger("create", null, this._getCreateEventData());
        this._init();
    },
    _getCreateOptions: $.noop,
    _getCreateEventData: $.noop,
    _create: $.noop,
    _init: $.noop,

    destroy: function () {
        this._destroy();
        // we can probably remove the unbind calls in 2.0
        // all event bindings should go through this._on()
        this.element
            .unbind(this.eventNamespace)
            .removeData(this.widgetFullName)
            // support: jquery <1.6.3
            // http://bugs.jquery.com/ticket/9413
            .removeData($.camelCase(this.widgetFullName));
        this.widget()
            .unbind(this.eventNamespace)
            .removeAttr("aria-disabled")
            .removeClass(
                this.widgetFullName + "-disabled " +
                "ui-state-disabled");

        // clean up events and states
        this.bindings.unbind(this.eventNamespace);
        this.hoverable.removeClass("ui-state-hover");
        this.focusable.removeClass("ui-state-focus");
    },
    _destroy: $.noop,

    widget: function () {
        return this.element;
    },

    option: function (key, value) {
        var options = key,
            parts,
            curOption,
            i;

        if (arguments.length === 0) {
            // don't return a reference to the internal hash
            return $.widget.extend({}, this.options);
        }

        if (typeof key === "string") {
            // handle nested keys, e.g., "foo.bar" => { foo: { bar: ___ } }
            options = {};
            parts = key.split(".");
            key = parts.shift();
            if (parts.length) {
                curOption = options[key] = $.widget.extend({}, this.options[key]);
                for (i = 0; i < parts.length - 1; i++) {
                    curOption[parts[i]] = curOption[parts[i]] || {};
                    curOption = curOption[parts[i]];
                }
                key = parts.pop();
                if (arguments.length === 1) {
                    return curOption[key] === undefined ? null : curOption[key];
                }
                curOption[key] = value;
            } else {
                if (arguments.length === 1) {
                    return this.options[key] === undefined ? null : this.options[key];
                }
                options[key] = value;
            }
        }

        this._setOptions(options);

        return this;
    },
    _setOptions: function (options) {
        var key;

        for (key in options) {
            this._setOption(key, options[key]);
        }

        return this;
    },
    _setOption: function (key, value) {
        this.options[key] = value;

        if (key === "disabled") {
            this.widget()
                .toggleClass(this.widgetFullName + "-disabled", !!value);

            // If the widget is becoming disabled, then nothing is interactive
            if (value) {
                this.hoverable.removeClass("ui-state-hover");
                this.focusable.removeClass("ui-state-focus");
            }
        }

        return this;
    },

    enable: function () {
        return this._setOptions({disabled: false});
    },
    disable: function () {
        return this._setOptions({disabled: true});
    },

    _on: function (suppressDisabledCheck, element, handlers) {
        var delegateElement,
            instance = this;

        // no suppressDisabledCheck flag, shuffle arguments
        if (typeof suppressDisabledCheck !== "boolean") {
            handlers = element;
            element = suppressDisabledCheck;
            suppressDisabledCheck = false;
        }

        // no element argument, shuffle and use this.element
        if (!handlers) {
            handlers = element;
            element = this.element;
            delegateElement = this.widget();
        } else {
            element = delegateElement = $(element);
            this.bindings = this.bindings.add(element);
        }

        $.each(handlers, function (event, handler) {
            function handlerProxy() {
                // allow widgets to customize the disabled handling
                // - disabled as an array instead of boolean
                // - disabled class as method for disabling individual parts
                if (!suppressDisabledCheck &&
                    ( instance.options.disabled === true ||
                    $(this).hasClass("ui-state-disabled") )) {
                    return;
                }
                return ( typeof handler === "string" ? instance[handler] : handler )
                    .apply(instance, arguments);
            }

            // copy the guid so direct unbinding works
            if (typeof handler !== "string") {
                handlerProxy.guid = handler.guid =
                    handler.guid || handlerProxy.guid || $.guid++;
            }

            var match = event.match(/^([\w:-]*)\s*(.*)$/),
                eventName = match[1] + instance.eventNamespace,
                selector = match[2];
            if (selector) {
                delegateElement.delegate(selector, eventName, handlerProxy);
            } else {
                element.bind(eventName, handlerProxy);
            }
        });
    },

    _off: function (element, eventName) {
        eventName = (eventName || "").split(" ").join(this.eventNamespace + " ") +
            this.eventNamespace;
        element.unbind(eventName).undelegate(eventName);

        // Clear the stack to avoid memory leaks (#10056)
        this.bindings = $(this.bindings.not(element).get());
        this.focusable = $(this.focusable.not(element).get());
        this.hoverable = $(this.hoverable.not(element).get());
    },

    _delay: function (handler, delay) {
        function handlerProxy() {
            return ( typeof handler === "string" ? instance[handler] : handler )
                .apply(instance, arguments);
        }

        var instance = this;
        return setTimeout(handlerProxy, delay || 0);
    },

    _hoverable: function (element) {
        this.hoverable = this.hoverable.add(element);
        this._on(element, {
            mouseenter: function (event) {
                $(event.currentTarget).addClass("ui-state-hover");
            },
            mouseleave: function (event) {
                $(event.currentTarget).removeClass("ui-state-hover");
            }
        });
    },

    _focusable: function (element) {
        this.focusable = this.focusable.add(element);
        this._on(element, {
            focusin: function (event) {
                $(event.currentTarget).addClass("ui-state-focus");
            },
            focusout: function (event) {
                $(event.currentTarget).removeClass("ui-state-focus");
            }
        });
    },

    _trigger: function (type, event, data) {
        var prop, orig,
            callback = this.options[type];

        data = data || {};
        event = $.Event(event);
        event.type = ( type === this.widgetEventPrefix ?
            type :
        this.widgetEventPrefix + type ).toLowerCase();
        // the original event may come from any element
        // so we need to reset the target on the new event
        event.target = this.element[0];

        // copy original event properties over to the new event
        orig = event.originalEvent;
        if (orig) {
            for (prop in orig) {
                if (!( prop in event )) {
                    event[prop] = orig[prop];
                }
            }
        }

        this.element.trigger(event, data);
        return !( $.isFunction(callback) &&
        callback.apply(this.element[0], [event].concat(data)) === false ||
        event.isDefaultPrevented() );
    }
};

$.each({show: "fadeIn", hide: "fadeOut"}, function (method, defaultEffect) {
    $.Widget.prototype["_" + method] = function (element, options, callback) {
        if (typeof options === "string") {
            options = {effect: options};
        }
        var hasOptions,
            effectName = !options ?
                method :
                options === true || typeof options === "number" ?
                    defaultEffect :
                options.effect || defaultEffect;
        options = options || {};
        if (typeof options === "number") {
            options = {duration: options};
        }
        hasOptions = !$.isEmptyObject(options);
        options.complete = callback;
        if (options.delay) {
            element.delay(options.delay);
        }
        if (hasOptions && $.effects && $.effects.effect[effectName]) {
            element[method](options);
        } else if (effectName !== method && element[effectName]) {
            element[effectName](options.duration, options.easing, callback);
        } else {
            element.queue(function (next) {
                $(this)[method]();
                if (callback) {
                    callback.call(element[0]);
                }
                next();
            });
        }
    };
});

var widget = $.widget;

//===========================
// metro UI init widgets
//===========================
$.Metro = function (params) {
    params = $.extend({}, params);
};
$.Metro.initWidgets = function () {
    var widgets = $("[data-role]");

    $.each(widgets, function () {
        var $this = $(this), w = this;
        var roles = $this.data('role').split(/\s*,\s*/);
        roles.map(function (func) {
            try {
                if ($.fn[func] !== undefined && $this.data(func + '-initiated') !== true) {
                    $.fn[func].call($this);
                    $this.data(func + '-initiated', true);
                }
            } catch (e) {
                if (window.METRO_DEBUG) {
                    console.log(e.message, e.stack);
                }
            }
        });
    });
};
$.Metro.initWidgets();

//===========================
// metro UI notify
//===========================
var _notify_container = false;
var _notifies = [];

var Notify = {

    _container: null,
    _notify: null,
    _timer: null,

    version: "3.0.0",

    options: {
        icon: '', // to be implemented
        caption: '',
        content: '',
        shadow: true,
        width: 'auto',
        height: 'auto',
        style: false, // {background: '', color: ''}
        position: 'right', //right, left
        timeout: 3000,
        keepOpen: false,
        type: 'default' //default, success, alert, info, warning
    },

    init: function (options) {
        this.options = $.extend({}, this.options, options);
        this._build();
        return this;
    },

    _build: function () {
        var that = this, o = this.options;

        this._container = _notify_container || $("<div/>").addClass("notify-container").appendTo('body');
        _notify_container = this._container;

        if (o.content === '' || o.content === undefined) {
            return false;
        }

        this._notify = $("<div/>").addClass("notify");

        if (o.type !== 'default') {
            this._notify.addClass(o.type);
        }

        if (o.shadow) {
            this._notify.addClass("shadow");
        }
        if (o.style && o.style.background !== undefined) {
            this._notify.css("background-color", o.style.background);
        }
        if (o.style && o.style.color !== undefined) {
            this._notify.css("color", o.style.color);
        }

        // add Icon
        if (o.icon !== '') {
            var icon = $(o.icon).addClass('notify-icon').appendTo(this._notify);
        }

        // add title
        if (o.caption !== '' && o.caption !== undefined) {
            $("<div/>").addClass("notify-title").html(o.caption).appendTo(this._notify);
        }
        // add content
        if (o.content !== '' && o.content !== undefined) {
            $("<div/>").addClass("notify-text").html(o.content).appendTo(this._notify);
        }

        // add closer
        var closer = $("<span/>").addClass("notify-closer").appendTo(this._notify);
        closer.on('click', function () {
            that.close(0);
        });

        if (o.width !== 'auto') {
            this._notify.css('min-width', o.width);
        }
        if (o.height !== 'auto') {
            this._notify.css('min-height', o.height);
        }

        this._notify.hide().appendTo(this._container).fadeIn('slow');
        _notifies.push(this._notify);

        if (!o.keepOpen) {
            this.close(o.timeout);
        }

    },

    close: function (timeout) {
        var self = this;

        if (timeout === undefined) {
            return this._hide();
        }

        setTimeout(function () {
            self._hide();
        }, timeout);

        return this;
    },

    _hide: function () {
        var that = this;

        if (this._notify !== undefined) {
            this._notify.fadeOut('slow', function () {
                $(this).remove();
                _notifies.splice(_notifies.indexOf(that._notify), 1);
            });
            return this;
        } else {
            return false;
        }
    },

    closeAll: function () {
        _notifies.forEach(function (notEntry) {
            notEntry.hide('slow', function () {
                notEntry.remove();
                _notifies.splice(_notifies.indexOf(notEntry), 1);
            });
        });
        return this;
    }
};

$.Notify = function (options) {
    return Object.create(Notify).init(options);
};

$.Notify.show = function (message, title, icon) {
    return $.Notify({
        content: message,
        caption: title,
        icon: icon
    });
};


//===========================
// metro UI stepper
//===========================
$.widget("metro.stepper", {

    version: "3.0.0",

    options: {
        steps: 3,
        start: 1,
        type: 'default',
        clickable: true,
        onStep: function (index, step) {
        },
        onStepClick: function (index, step) {
        }
    },

    _create: function () {
        var element = this.element, o = this.options, element_id = element.attr('id');

        $.each(element.data(), function (key, value) {
            if (key in o) {
                try {
                    o[key] = $.parseJSON(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });

        if (!element.hasClass('stepper')) {
            element.addClass('stepper');
        }
        if (element_id === undefined) {
            element_id = window.uniqueId(this.widgetName + '_');
            element.attr('id', element_id);
        }

        this._createStepper();
        if (o.clickable) {
            this._createEvents();
        }
        this._positioningSteps();
        this._stepTo(o.start);

        element.data('stepper', this);

    },

    _createEvents: function () {
        var that = this, element = this.element, o = this.options;
        element.on('click', 'li', function (e) {
            var step = $(this).data('step');


            if (typeof o.onStepClick === 'function') {
                o.onStepClick(step - 1, step);
            } else {
                if (typeof window[o.onStepClick] === 'function') {
                    window[o.onStepClick](step - 1, step);
                } else {
                    var result = eval("(function(){" + o.onStepClick + "})");
                    result.call(step - 1, step);
                }
            }

            element.trigger("stepclick", step);
        });
    },

    _createStepper: function () {
        var element = this.element, o = this.options;
        var i, ul, li;

        ul = $("<ul/>");

        switch (o.type) {
            case 'diamond':
                element.addClass('diamond');
                break;
            case 'cycle':
                element.addClass('cycle');
                break;
        }

        for (i = 0; i < o.steps; i++) {
            li = $("<li/>").data('step', i + 1).appendTo(ul);
        }
        ul.appendTo(element);
    },

    _positioningSteps: function () {
        var that = this, element = this.element, o = this.options,
            steps = element.find("li"),
            element_width = element.width(),
            steps_length = steps.length - 1,
            step_width = $(steps[0]).width();

        $.each(steps, function (i, step) {
            var left = i === 0 ? 0 : (element_width - step_width) / steps_length * i;
            $(step).animate({
                left: left
            });
        });
    },

    _stepTo: function (step) {
        var element = this.element, o = this.options;
        var steps = element.find("li");

        steps.removeClass('current').removeClass('complete');

        $.each(steps, function (i, s) {
            if (i < step - 1) {
                $(s).addClass('complete');
            }
            if (i === step - 1) {
                $(s).addClass('current');

                if (typeof o.onStep === 'function') {
                    o.onStep(i + 1, s);
                } else {
                    if (typeof window[o.onStep] === 'function') {
                        window[o.onStep](i + 1, s);
                    } else {
                        var result = eval("(function(){" + o.onStep + "})");
                        result.call(i + 1, s);
                    }
                }
            }
        });
    },

    stepTo: function (step) {
        this._stepTo(step);
    },

    first: function () {
        var o = this.options;
        o.start = 1;
        this._stepTo(o.start);
    },

    last: function () {
        var element = this.element, o = this.options;
        var steps = element.find("li");

        o.start = steps.length;
        this._stepTo(o.start);
    },

    next: function () {
        var element = this.element, o = this.options;
        var steps = element.find("li");

        if (o.start + 1 > steps.length) {
            return;
        }

        o.start++;
        this._stepTo(o.start);
    },

    prior: function () {
        var o = this.options;

        if (o.start - 1 === 0) {
            return;
        }

        o.start--;
        this._stepTo(o.start);
    },

    _destroy: function () {
    },

    _setOption: function (key, value) {
        this._super('_setOption', key, value);
    }
});
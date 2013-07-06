module.exports = exports = x;
exports.Xemitter = Xemitter;

var EE = require('event-emitter')
	// , inherits = require('inherits')
	, counter  = 0
	, listenMethods = { listenTo: 'on', listenToOnce: 'once' }
	;

function id (pre) {
	return (pre || '') + (counter++);
}

function extend (obj) {
	var extras = Array.prototype.slice(1).reverse();
	extras.forEach(function (extra) {
		Object.keys(extra).forEach(function (key, i, ex) {
			obj[prop] = ex[key];
		});
	});
	return obj;
}

function x (obj) {
	if (obj === undefined) {
		return new Xemitter;
	} else if (typeof obj === 'object') {
		extend(obj, Xemitter.prototype);
		Xemitter.call(obj);
	} else if (typeof obj === 'function') {
		extend(obj.prototype, Xemitter.prototype);
		Xemitter.call(obj.prototype);
	}
	return obj;
}

function Xemitter () {
	if (!(this instanceof Xemitter)) {
		return new Xemitter;
	}
	EE.call(this);
	obj._listeners = {};
	return this;
}

extend(Xemitter.prototype, EE.prototype);

_.each(listenMethods, function(implementation, method) {
  Events[method] = function(obj, name, callback) {
    var listeners = this._listeners || (this._listeners = {});
    var id = obj._listenerId || (obj._listenerId = _.uniqueId('l'));
    listeners[id] = obj;
    if (typeof name === 'object') callback = this;
    obj[implementation](name, callback, this);
    return this;
  };
});

Object.keys(listenMethods).forEach(function (methName, i, methods) {
	Xemitter.prototype[methName] = function (obj, name, cb) {
		var id;
		if (typeof obj[methods[methName]] !== 'function') {
			return this;
		}
		id = obj._listenerId || (obj._listenerId = id('l'));
		this.listeners[id] = obj
		obj[methods[methName]](name, cb, this);
		return this;
	};
	
});

Xemitter.prototype.listenTo
!function(){let t,e,i,n,r,s,o,l,a,h,u,d,c,g,f;function _(t){return t&&t.__esModule?t.default:t}var m=/**
 * @module ol/format/KML
 *//**
 * @module ol/Feature
 *//**
 * @module ol/Object
 *//**
 * @module ol/events/Event
 *//**
 * @classdesc
 * Stripped down implementation of the W3C DOM Level 2 Event interface.
 * See https://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-interface.
 *
 * This implementation only provides `type` and `target` properties, and
 * `stopPropagation` and `preventDefault` methods. It is meant as base class
 * for higher level events defined in the library, and works with
 * {@link module:ol/events/Target~Target}.
 */class{/**
   * @param {string} type Type.
   */constructor(t){/**
     * @type {boolean}
     */this.propagationStopped,/**
     * @type {boolean}
     */this.defaultPrevented,/**
     * The event type.
     * @type {string}
     * @api
     */this.type=t,/**
     * The event target.
     * @type {Object}
     * @api
     */this.target=null}/**
   * Prevent default. This means that no emulated `click`, `singleclick` or `doubleclick` events
   * will be fired.
   * @api
   */preventDefault(){this.defaultPrevented=!0}/**
   * Stop event propagation.
   * @api
   */stopPropagation(){this.propagationStopped=!0}},p/**
 * @typedef {'propertychange'} Types
 */={/**
   * Triggered when a property is changed.
   * @event module:ol/Object.ObjectEvent#propertychange
   * @api
   */PROPERTYCHANGE:"propertychange"},y=/**
 * @module ol/Observable
 *//**
 * @module ol/events/Target
 *//**
 * @module ol/Disposable
 *//**
 * @classdesc
 * Objects that need to clean up after themselves.
 */class{constructor(){/**
     * The object has already been disposed.
     * @type {boolean}
     * @protected
     */this.disposed=!1}/**
   * Clean up.
   */dispose(){this.disposed||(this.disposed=!0,this.disposeInternal())}/**
   * Extension point for disposable objects.
   * @protected
   */disposeInternal(){}};function x(t,e){return t>e?1:t<e?-1:0}function v(t,e,i){if(t[0]<=e)return 0;let n=t.length;if(e<=t[n-1])return n-1;if("function"==typeof i){for(let r=1;r<n;++r){let n=t[r];if(n===e)return r;if(n<e){if(i(e,t[r-1],n)>0)return r-1;return r}}return n-1}if(i>0){for(let i=1;i<n;++i)if(t[i]<e)return i-1;return n-1}if(i<0){for(let i=1;i<n;++i)if(t[i]<=e)return i;return n-1}for(let i=1;i<n;++i){if(t[i]==e)return i;if(t[i]<e){if(t[i-1]-e<e-t[i])return i-1;return i}}return n-1}function E(t,e){let i=Array.isArray(e)?e:[e],n=i.length;for(let e=0;e<n;e++)t[t.length]=i[e]}function C(t,e){let i=t.length;if(i!==e.length)return!1;for(let n=0;n<i;n++)if(t[n]!==e[n])return!1;return!0}function S(){return!0}function R(){return!1}function w(){}/**
 * @module ol/obj
 *//**
 * Removes all properties from an object.
 * @param {Object} object The object to clear.
 */function T(t){for(let e in t)delete t[e]}function I(t){let e;for(e in t)return!1;return!e}var M=/**
 * @typedef {EventTarget|Target} EventTargetLike
 *//**
 * @classdesc
 * A simplified implementation of the W3C DOM Level 2 EventTarget interface.
 * See https://www.w3.org/TR/2000/REC-DOM-Level-2-Events-20001113/events.html#Events-EventTarget.
 *
 * There are two important simplifications compared to the specification:
 *
 * 1. The handling of `useCapture` in `addEventListener` and
 *    `removeEventListener`. There is no real capture model.
 * 2. The handling of `stopPropagation` and `preventDefault` on `dispatchEvent`.
 *    There is no event target hierarchy. When a listener calls
 *    `stopPropagation` or `preventDefault` on an event object, it means that no
 *    more listeners after this one will be called. Same as when the listener
 *    returns false.
 */class extends y{/**
   * @param {*} [target] Default event target for dispatched events.
   */constructor(t){super(),/**
     * @private
     * @type {*}
     */this.eventTarget_=t,/**
     * @private
     * @type {Object<string, number>}
     */this.pendingRemovals_=null,/**
     * @private
     * @type {Object<string, number>}
     */this.dispatching_=null,/**
     * @private
     * @type {Object<string, Array<import("../events.js").Listener>>}
     */this.listeners_=null}/**
   * @param {string} type Type.
   * @param {import("../events.js").Listener} listener Listener.
   */addEventListener(t,e){if(!t||!e)return;let i=this.listeners_||(this.listeners_={}),n=i[t]||(i[t]=[]);n.includes(e)||n.push(e)}/**
   * Dispatches an event and calls all listeners listening for events
   * of this type. The event parameter can either be a string or an
   * Object with a `type` property.
   *
   * @param {import("./Event.js").default|string} event Event object.
   * @return {boolean|undefined} `false` if anyone called preventDefault on the
   *     event object or if any of the listeners returned false.
   * @api
   */dispatchEvent(t){let e;let i="string"==typeof t,n=i?t:t.type,r=this.listeners_&&this.listeners_[n];if(!r)return;let s=i?new m(t):/** @type {Event} */t;s.target||(s.target=this.eventTarget_||this);let o=this.dispatching_||(this.dispatching_={}),l=this.pendingRemovals_||(this.pendingRemovals_={});n in o||(o[n]=0,l[n]=0),++o[n];for(let t=0,i=r.length;t<i;++t)if(!1===(e="handleEvent"in r[t]?/** @type {import("../events.js").ListenerObject} */r[t].handleEvent(s):/** @type {import("../events.js").ListenerFunction} */r[t].call(this,s))||s.propagationStopped){e=!1;break}if(0==--o[n]){let t=l[n];for(delete l[n];t--;)this.removeEventListener(n,w);delete o[n]}return e}/**
   * Clean up.
   */disposeInternal(){this.listeners_&&T(this.listeners_)}/**
   * Get the listeners for a specified event type. Listeners are returned in the
   * order that they will be called in.
   *
   * @param {string} type Type.
   * @return {Array<import("../events.js").Listener>|undefined} Listeners.
   */getListeners(t){return this.listeners_&&this.listeners_[t]||void 0}/**
   * @param {string} [type] Type. If not provided,
   *     `true` will be returned if this event target has any listeners.
   * @return {boolean} Has listeners.
   */hasListener(t){return!!this.listeners_&&(t?t in this.listeners_:Object.keys(this.listeners_).length>0)}/**
   * @param {string} type Type.
   * @param {import("../events.js").Listener} listener Listener.
   */removeEventListener(t,e){let i=this.listeners_&&this.listeners_[t];if(i){let n=i.indexOf(e);-1!==n&&(this.pendingRemovals_&&t in this.pendingRemovals_?(// make listener a no-op, and remove later in #dispatchEvent()
i[n]=w,++this.pendingRemovals_[t]):(i.splice(n,1),0===i.length&&delete this.listeners_[t]))}}},L={/**
   * Generic change event. Triggered when the revision counter is increased.
   * @event module:ol/events/Event~BaseEvent#change
   * @api
   */CHANGE:"change",/**
   * Generic error event. Triggered when an error occurs.
   * @event module:ol/events/Event~BaseEvent#error
   * @api
   */ERROR:"error",CONTEXTMENU:"contextmenu",CLICK:"click",DBLCLICK:"dblclick",KEYDOWN:"keydown",KEYPRESS:"keypress",LOAD:"load",TOUCHMOVE:"touchmove",WHEEL:"wheel"};/**
 * @module ol/events
 */function b(t,e,i,n,r){if(n&&n!==t&&(i=i.bind(n)),r){let n=i;i=function(){t.removeEventListener(e,i),n.apply(this,arguments)}}let s={target:t,type:e,listener:i};return t.addEventListener(e,i),s}function A(t){t&&t.target&&(t.target.removeEventListener(t.type,t.listener),T(t))}/***
 * @template {string} Type
 * @template {Event|import("./events/Event.js").default} EventClass
 * @template Return
 * @typedef {(type: Type, listener: (event: EventClass) => ?) => Return} OnSignature
 *//***
 * @template {string} Type
 * @template Return
 * @typedef {(type: Type[], listener: (event: Event|import("./events/Event").default) => ?) => Return extends void ? void : Return[]} CombinedOnSignature
 *//**
 * @typedef {'change'|'error'} EventTypes
 *//***
 * @template Return
 * @typedef {OnSignature<EventTypes, import("./events/Event.js").default, Return> & CombinedOnSignature<EventTypes, Return>} ObservableOnSignature
 *//**
 * @classdesc
 * Abstract base class; normally only used for creating subclasses and not
 * instantiated in apps.
 * An event target providing convenient methods for listener registration
 * and unregistration. A generic `change` event is always available through
 * {@link module:ol/Observable~Observable#changed}.
 *
 * @fires import("./events/Event.js").default
 * @api
 */class P extends M{constructor(){super(),this.on=/** @type {ObservableOnSignature<import("./events").EventsKey>} */this.onInternal,this.once=/** @type {ObservableOnSignature<import("./events").EventsKey>} */this.onceInternal,this.un=/** @type {ObservableOnSignature<void>} */this.unInternal,/**
     * @private
     * @type {number}
     */this.revision_=0}/**
   * Increases the revision counter and dispatches a 'change' event.
   * @api
   */changed(){++this.revision_,this.dispatchEvent(L.CHANGE)}/**
   * Get the version number for this object.  Each time the object is modified,
   * its version number will be incremented.
   * @return {number} Revision.
   * @api
   */getRevision(){return this.revision_}/**
   * @param {string|Array<string>} type Type.
   * @param {function((Event|import("./events/Event").default)): ?} listener Listener.
   * @return {import("./events.js").EventsKey|Array<import("./events.js").EventsKey>} Event key.
   * @protected
   */onInternal(t,e){if(Array.isArray(t)){let i=t.length,n=Array(i);for(let r=0;r<i;++r)n[r]=b(this,t[r],e);return n}return b(this,/** @type {string} */t,e)}/**
   * @param {string|Array<string>} type Type.
   * @param {function((Event|import("./events/Event").default)): ?} listener Listener.
   * @return {import("./events.js").EventsKey|Array<import("./events.js").EventsKey>} Event key.
   * @protected
   */onceInternal(t,e){let i;if(Array.isArray(t)){let n=t.length;i=Array(n);for(let r=0;r<n;++r)i[r]=b(this,t[r],e,void 0,!0)}else i=b(this,/** @type {string} */t,e,void 0,!0);return(/** @type {Object} */e.ol_key=i,i)}/**
   * Unlisten for a certain type of event.
   * @param {string|Array<string>} type Type.
   * @param {function((Event|import("./events/Event").default)): ?} listener Listener.
   * @protected
   */unInternal(t,e){let i=/** @type {Object} */e.ol_key;if(i)!function(t){if(Array.isArray(t))for(let e=0,i=t.length;e<i;++e)A(t[e]);else A(/** @type {import("./events.js").EventsKey} */t)}(i);else if(Array.isArray(t))for(let i=0,n=t.length;i<n;++i)this.removeEventListener(t[i],e);else this.removeEventListener(t,e)}}/**
 * Listen for a certain type of event.
 * @function
 * @param {string|Array<string>} type The event type or array of event types.
 * @param {function((Event|import("./events/Event").default)): ?} listener The listener function.
 * @return {import("./events.js").EventsKey|Array<import("./events.js").EventsKey>} Unique key for the listener. If
 *     called with an array of event types as the first argument, the return
 *     will be an array of keys.
 * @api
 */P.prototype.on,/**
 * Listen once for a certain type of event.
 * @function
 * @param {string|Array<string>} type The event type or array of event types.
 * @param {function((Event|import("./events/Event").default)): ?} listener The listener function.
 * @return {import("./events.js").EventsKey|Array<import("./events.js").EventsKey>} Unique key for the listener. If
 *     called with an array of event types as the first argument, the return
 *     will be an array of keys.
 * @api
 */P.prototype.once,/**
 * Unlisten for a certain type of event.
 * @function
 * @param {string|Array<string>} type The event type or array of event types.
 * @param {function((Event|import("./events/Event").default)): ?} listener The listener function.
 * @api
 */P.prototype.un;var F=P;/**
 * @module ol/util
 *//**
 * @return {never} Any return.
 */function O(){throw Error("Unimplemented abstract method.")}/**
 * Counter for getUid.
 * @type {number}
 * @private
 */let D=0;function k(t){return t.ol_uid||(t.ol_uid=String(++D))}class N extends m{/**
   * @param {string} type The event type.
   * @param {string} key The property name.
   * @param {*} oldValue The old value for `key`.
   */constructor(t,e,i){super(t),/**
     * The name of the property whose value is changing.
     * @type {string}
     * @api
     */this.key=e,/**
     * The old value. To get the new value use `e.target.get(e.key)` where
     * `e` is the event object.
     * @type {*}
     * @api
     */this.oldValue=i}}var G=/***
 * @template Return
 * @typedef {import("./Observable").OnSignature<import("./Observable").EventTypes, import("./events/Event.js").default, Return> &
 *    import("./Observable").OnSignature<import("./ObjectEventType").Types, ObjectEvent, Return> &
 *    import("./Observable").CombinedOnSignature<import("./Observable").EventTypes|import("./ObjectEventType").Types, Return>} ObjectOnSignature
 *//**
 * @classdesc
 * Abstract base class; normally only used for creating subclasses and not
 * instantiated in apps.
 * Most non-trivial classes inherit from this.
 *
 * This extends {@link module:ol/Observable~Observable} with observable
 * properties, where each property is observable as well as the object as a
 * whole.
 *
 * Classes that inherit from this have pre-defined properties, to which you can
 * add your owns. The pre-defined properties are listed in this documentation as
 * 'Observable Properties', and have their own accessors; for example,
 * {@link module:ol/Map~Map} has a `target` property, accessed with
 * `getTarget()` and changed with `setTarget()`. Not all properties are however
 * settable. There are also general-purpose accessors `get()` and `set()`. For
 * example, `get('target')` is equivalent to `getTarget()`.
 *
 * The `set` accessors trigger a change event, and you can monitor this by
 * registering a listener. For example, {@link module:ol/View~View} has a
 * `center` property, so `view.on('change:center', function(evt) {...});` would
 * call the function whenever the value of the center property changes. Within
 * the function, `evt.target` would be the view, so `evt.target.getCenter()`
 * would return the new center.
 *
 * You can add your own observable properties with
 * `object.set('prop', 'value')`, and retrieve that with `object.get('prop')`.
 * You can listen for changes on that property value with
 * `object.on('change:prop', listener)`. You can get a list of all
 * properties with {@link module:ol/Object~BaseObject#getProperties}.
 *
 * Note that the observable properties are separate from standard JS properties.
 * You can, for example, give your map object a title with
 * `map.title='New title'` and with `map.set('title', 'Another title')`. The
 * first will be a `hasOwnProperty`; the second will appear in
 * `getProperties()`. Only the second is observable.
 *
 * Properties can be deleted by using the unset method. E.g.
 * object.unset('foo').
 *
 * @fires ObjectEvent
 * @api
 */class extends F{/**
   * @param {Object<string, *>} [values] An object with key-value pairs.
   */constructor(t){super(),/***
     * @type {ObjectOnSignature<import("./events").EventsKey>}
     */this.on,/***
     * @type {ObjectOnSignature<import("./events").EventsKey>}
     */this.once,/***
     * @type {ObjectOnSignature<void>}
     */this.un,k(this),/**
     * @private
     * @type {Object<string, *>}
     */this.values_=null,void 0!==t&&this.setProperties(t)}/**
   * Gets a value.
   * @param {string} key Key name.
   * @return {*} Value.
   * @api
   */get(t){let e;return this.values_&&this.values_.hasOwnProperty(t)&&(e=this.values_[t]),e}/**
   * Get a list of object property names.
   * @return {Array<string>} List of property names.
   * @api
   */getKeys(){return this.values_&&Object.keys(this.values_)||[]}/**
   * Get an object of all property names and values.
   * @return {Object<string, *>} Object.
   * @api
   */getProperties(){return this.values_&&Object.assign({},this.values_)||{}}/**
   * Get an object of all property names and values.
   * @return {Object<string, *>?} Object.
   */getPropertiesInternal(){return this.values_}/**
   * @return {boolean} The object has properties.
   */hasProperties(){return!!this.values_}/**
   * @param {string} key Key name.
   * @param {*} oldValue Old value.
   */notify(t,e){let i;i=`change:${t}`,this.hasListener(i)&&this.dispatchEvent(new N(i,t,e)),i=p.PROPERTYCHANGE,this.hasListener(i)&&this.dispatchEvent(new N(i,t,e))}/**
   * @param {string} key Key name.
   * @param {import("./events.js").Listener} listener Listener.
   */addChangeListener(t,e){this.addEventListener(`change:${t}`,e)}/**
   * @param {string} key Key name.
   * @param {import("./events.js").Listener} listener Listener.
   */removeChangeListener(t,e){this.removeEventListener(`change:${t}`,e)}/**
   * Sets a value.
   * @param {string} key Key name.
   * @param {*} value Value.
   * @param {boolean} [silent] Update without triggering an event.
   * @api
   */set(t,e,i){let n=this.values_||(this.values_={});if(i)n[t]=e;else{let i=n[t];n[t]=e,i!==e&&this.notify(t,i)}}/**
   * Sets a collection of key-value pairs.  Note that this changes any existing
   * properties and adds new ones (it does not remove any existing properties).
   * @param {Object<string, *>} values Values.
   * @param {boolean} [silent] Update without triggering an event.
   * @api
   */setProperties(t,e){for(let i in t)this.set(i,t[i],e)}/**
   * Apply any properties from another object without triggering events.
   * @param {BaseObject} source The source object.
   * @protected
   */applyProperties(t){t.values_&&Object.assign(this.values_||(this.values_={}),t.values_)}/**
   * Unsets a property.
   * @param {string} key Key name.
   * @param {boolean} [silent] Unset without triggering an event.
   * @api
   */unset(t,e){if(this.values_&&t in this.values_){let i=this.values_[t];delete this.values_[t],I(this.values_)&&(this.values_=null),e||this.notify(t,i)}}};/**
 * @module ol/asserts
 *//**
 * @param {*} assertion Assertion we expected to be truthy.
 * @param {string} errorMessage Error message.
 */function z(t,e){if(!t)throw Error(e)}/**
 * @typedef {typeof Feature|typeof import("./render/Feature.js").default} FeatureClass
 *//**
 * @typedef {Feature|import("./render/Feature.js").default} FeatureLike
 *//***
 * @template Return
 * @typedef {import("./Observable").OnSignature<import("./Observable").EventTypes, import("./events/Event.js").default, Return> &
 *   import("./Observable").OnSignature<import("./ObjectEventType").Types|'change:geometry', import("./Object").ObjectEvent, Return> &
 *   import("./Observable").CombinedOnSignature<import("./Observable").EventTypes|import("./ObjectEventType").Types
 *     |'change:geometry', Return>} FeatureOnSignature
 *//***
 * @template Geometry
 * @typedef {Object<string, *> & { geometry?: Geometry }} ObjectWithGeometry
 *//**
 * @classdesc
 * A vector object for geographic features with a geometry and other
 * attribute properties, similar to the features in vector file formats like
 * GeoJSON.
 *
 * Features can be styled individually with `setStyle`; otherwise they use the
 * style of their vector layer.
 *
 * Note that attribute properties are set as {@link module:ol/Object~BaseObject} properties on
 * the feature object, so they are observable, and have get/set accessors.
 *
 * Typically, a feature has a single geometry property. You can set the
 * geometry using the `setGeometry` method and get it with `getGeometry`.
 * It is possible to store more than one geometry on a feature using attribute
 * properties. By default, the geometry used for rendering is identified by
 * the property name `geometry`. If you want to use another geometry property
 * for rendering, use the `setGeometryName` method to change the attribute
 * property associated with the geometry for the feature.  For example:
 *
 * ```js
 *
 * import Feature from 'ol/Feature.js';
 * import Polygon from 'ol/geom/Polygon.js';
 * import Point from 'ol/geom/Point.js';
 *
 * const feature = new Feature({
 *   geometry: new Polygon(polyCoords),
 *   labelPoint: new Point(labelCoords),
 *   name: 'My Polygon',
 * });
 *
 * // get the polygon geometry
 * const poly = feature.getGeometry();
 *
 * // Render the feature as a point using the coordinates from labelPoint
 * feature.setGeometryName('labelPoint');
 *
 * // get the point geometry
 * const point = feature.getGeometry();
 * ```
 *
 * @api
 * @template {import("./geom/Geometry.js").default} [Geometry=import("./geom/Geometry.js").default]
 */class X extends G{/**
   * @param {Geometry|ObjectWithGeometry<Geometry>} [geometryOrProperties]
   *     You may pass a Geometry object directly, or an object literal containing
   *     properties. If you pass an object literal, you may include a Geometry
   *     associated with a `geometry` key.
   */constructor(t){super(),/***
     * @type {FeatureOnSignature<import("./events").EventsKey>}
     */this.on,/***
     * @type {FeatureOnSignature<import("./events").EventsKey>}
     */this.once,/***
     * @type {FeatureOnSignature<void>}
     */this.un,/**
     * @private
     * @type {number|string|undefined}
     */this.id_=void 0,/**
     * @type {string}
     * @private
     */this.geometryName_="geometry",/**
     * User provided style.
     * @private
     * @type {import("./style/Style.js").StyleLike}
     */this.style_=null,/**
     * @private
     * @type {import("./style/Style.js").StyleFunction|undefined}
     */this.styleFunction_=void 0,/**
     * @private
     * @type {?import("./events.js").EventsKey}
     */this.geometryChangeKey_=null,this.addChangeListener(this.geometryName_,this.handleGeometryChanged_),t&&("function"==typeof /** @type {?} */t.getSimplifiedGeometry?this.setGeometry(/** @type {Geometry} */t):this.setProperties(t))}/**
   * Clone this feature. If the original feature has a geometry it
   * is also cloned. The feature id is not set in the clone.
   * @return {Feature<Geometry>} The clone.
   * @api
   */clone(){let t=/** @type {Feature<Geometry>} */new X(this.hasProperties()?this.getProperties():null);t.setGeometryName(this.getGeometryName());let e=this.getGeometry();e&&t.setGeometry(/** @type {Geometry} */e.clone());let i=this.getStyle();return i&&t.setStyle(i),t}/**
   * Get the feature's default geometry.  A feature may have any number of named
   * geometries.  The "default" geometry (the one that is rendered by default) is
   * set when calling {@link module:ol/Feature~Feature#setGeometry}.
   * @return {Geometry|undefined} The default geometry for the feature.
   * @api
   * @observable
   */getGeometry(){return /** @type {Geometry|undefined} */this.get(this.geometryName_)}/**
   * Get the feature identifier.  This is a stable identifier for the feature and
   * is either set when reading data from a remote source or set explicitly by
   * calling {@link module:ol/Feature~Feature#setId}.
   * @return {number|string|undefined} Id.
   * @api
   */getId(){return this.id_}/**
   * Get the name of the feature's default geometry.  By default, the default
   * geometry is named `geometry`.
   * @return {string} Get the property name associated with the default geometry
   *     for this feature.
   * @api
   */getGeometryName(){return this.geometryName_}/**
   * Get the feature's style. Will return what was provided to the
   * {@link module:ol/Feature~Feature#setStyle} method.
   * @return {import("./style/Style.js").StyleLike|undefined} The feature style.
   * @api
   */getStyle(){return this.style_}/**
   * Get the feature's style function.
   * @return {import("./style/Style.js").StyleFunction|undefined} Return a function
   * representing the current style of this feature.
   * @api
   */getStyleFunction(){return this.styleFunction_}/**
   * @private
   */handleGeometryChange_(){this.changed()}/**
   * @private
   */handleGeometryChanged_(){this.geometryChangeKey_&&(A(this.geometryChangeKey_),this.geometryChangeKey_=null);let t=this.getGeometry();t&&(this.geometryChangeKey_=b(t,L.CHANGE,this.handleGeometryChange_,this)),this.changed()}/**
   * Set the default geometry for the feature.  This will update the property
   * with the name returned by {@link module:ol/Feature~Feature#getGeometryName}.
   * @param {Geometry|undefined} geometry The new geometry.
   * @api
   * @observable
   */setGeometry(t){this.set(this.geometryName_,t)}/**
   * Set the style for the feature to override the layer style.  This can be a
   * single style object, an array of styles, or a function that takes a
   * resolution and returns an array of styles. To unset the feature style, call
   * `setStyle()` without arguments or a falsey value.
   * @param {import("./style/Style.js").StyleLike} [style] Style for this feature.
   * @api
   * @fires module:ol/events/Event~BaseEvent#event:change
   */setStyle(t){let e;this.style_=t,this.styleFunction_=t?"function"==typeof t?t:(Array.isArray(t)?e=t:(z("function"==typeof /** @type {?} */t.getZIndex,"Expected an `ol/style/Style` or an array of `ol/style/Style.js`"),e=[t]),function(){return e}):void 0,this.changed()}/**
   * Set the feature id.  The feature id is considered stable and may be used when
   * requesting features or comparing identifiers returned from a remote source.
   * The feature id can be used with the
   * {@link module:ol/source/Vector~VectorSource#getFeatureById} method.
   * @param {number|string|undefined} id The feature id.
   * @api
   * @fires module:ol/events/Event~BaseEvent#event:change
   */setId(t){this.id_=t,this.changed()}/**
   * Set the property name to be used when getting the feature's default geometry.
   * When calling {@link module:ol/Feature~Feature#getGeometry}, the value of the property with
   * this name will be returned.
   * @param {string} name The property name of the default geometry.
   * @api
   */setGeometryName(t){this.removeChangeListener(this.geometryName_,this.handleGeometryChanged_),this.geometryName_=t,this.addChangeListener(this.geometryName_,this.handleGeometryChanged_),this.handleGeometryChanged_()}}/**
 * @module ol/style/Fill
 *//**
 * @typedef {Object} Options
 * @property {import("../color.js").Color|import("../colorlike.js").ColorLike|null} [color=null] A color, gradient or pattern.
 * See {@link module:ol/color~Color} and {@link module:ol/colorlike~ColorLike} for possible formats.
 * Default null; if null, the Canvas/renderer default black will be used.
 *//**
 * @classdesc
 * Set fill style for vector features.
 * @api
 */class W{/**
   * @param {Options} [options] Options.
   */constructor(t){t=t||{},/**
     * @private
     * @type {import("../color.js").Color|import("../colorlike.js").ColorLike|null}
     */this.color_=void 0!==t.color?t.color:null}/**
   * Clones the style. The color is not cloned if it is an {@link module:ol/colorlike~ColorLike}.
   * @return {Fill} The cloned style.
   * @api
   */clone(){let t=this.getColor();return new W({color:Array.isArray(t)?t.slice():t||void 0})}/**
   * Get the fill color.
   * @return {import("../color.js").Color|import("../colorlike.js").ColorLike|null} Color.
   * @api
   */getColor(){return this.color_}/**
   * Set the color.
   *
   * @param {import("../color.js").Color|import("../colorlike.js").ColorLike|null} color Color.
   * @api
   */setColor(t){this.color_=t}}/**
 * @module ol/geom/GeometryCollection
 *//**
 * @module ol/geom/Geometry
 *//**
 * @module ol/transform
 *//**
 * @module ol/has
 */let Y="undefined"!=typeof navigator&&void 0!==navigator.userAgent?navigator.userAgent.toLowerCase():"",U=Y.includes("firefox"),j=Y.includes("safari")&&!Y.includes("chrom");j&&(Y.includes("version/15.4")||/cpu (os|iphone os) 15_4 like mac os x/.test(Y));let B=Y.includes("webkit")&&!Y.includes("edge"),K=Y.includes("macintosh"),Z="undefined"!=typeof devicePixelRatio?devicePixelRatio:1,V="undefined"!=typeof WorkerGlobalScope&&"undefined"!=typeof OffscreenCanvas&&self instanceof WorkerGlobalScope,H="undefined"!=typeof Image&&Image.prototype.decode,q=function(){let t=!1;try{let e=Object.defineProperty({},"passive",{get:function(){t=!0}});window.addEventListener("_",null,e),window.removeEventListener("_",null,e)}catch(t){// passive not supported
}return t}();function J(){return[1,0,0,1,0,0]}function $(t,e){let i=e[0],n=e[1];return e[0]=t[0]*i+t[2]*n+t[4],e[1]=t[1]*i+t[3]*n+t[5],e}function Q(t,e,i,n,r,s,o,l){let a=Math.sin(s),h=Math.cos(s);return t[0]=n*h,t[1]=r*a,t[2]=-n*a,t[3]=r*h,t[4]=o*n*h-l*n*a+e,t[5]=o*r*a+l*r*h+i,t}function tt(t,e){let i=e[0]*e[3]-e[1]*e[2];z(0!==i,"Transformation matrix cannot be inverted");let n=e[0],r=e[1],s=e[2],o=e[3],l=e[4],a=e[5];return t[0]=o/i,t[1]=-r/i,t[2]=-s/i,t[3]=n/i,t[4]=(s*a-o*l)/i,t[5]=-(n*a-r*l)/i,t}function te(e){let i="matrix("+e.join(", ")+")";if(V)return i;let n=t||(t=document.createElement("div"));return n.style.transform=i,n.style.transform}/**
 * @module ol/extent
 *//**
 * @module ol/extent/Relationship
 *//**
 * Relationship to an extent.
 * @enum {number}
 */var ti={UNKNOWN:0,INTERSECTING:1,ABOVE:2,RIGHT:4,BELOW:8,LEFT:16};function tn(t){let e=td();for(let i=0,n=t.length;i<n;++i)tp(e,t[i]);return e}function tr(t,e,i){return i?(i[0]=t[0]-e,i[1]=t[1]-e,i[2]=t[2]+e,i[3]=t[3]+e,i):[t[0]-e,t[1]-e,t[2]+e,t[3]+e]}function ts(t,e){return e?(e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3],e):t.slice()}function to(t,e,i){let n,r;return(n=e<t[0]?t[0]-e:t[2]<e?e-t[2]:0)*n+(r=i<t[1]?t[1]-i:t[3]<i?i-t[3]:0)*r}function tl(t,e){return th(t,e[0],e[1])}function ta(t,e){return t[0]<=e[0]&&e[2]<=t[2]&&t[1]<=e[1]&&e[3]<=t[3]}function th(t,e,i){return t[0]<=e&&e<=t[2]&&t[1]<=i&&i<=t[3]}function tu(t,e){let i=t[0],n=t[1],r=t[2],s=t[3],o=e[0],l=e[1],a=ti.UNKNOWN;return o<i?a|=ti.LEFT:o>r&&(a|=ti.RIGHT),l<n?a|=ti.BELOW:l>s&&(a|=ti.ABOVE),a===ti.UNKNOWN&&(a=ti.INTERSECTING),a}function td(){return[1/0,1/0,-1/0,-1/0]}function tc(t,e,i,n,r){return r?(r[0]=t,r[1]=e,r[2]=i,r[3]=n,r):[t,e,i,n]}function tg(t){return tc(1/0,1/0,-1/0,-1/0,t)}function tf(t,e,i,n,r){let s=tg(r);return ty(s,t,e,i,n)}function t_(t,e){return t[0]==e[0]&&t[2]==e[2]&&t[1]==e[1]&&t[3]==e[3]}function tm(t,e){return e[0]<t[0]&&(t[0]=e[0]),e[2]>t[2]&&(t[2]=e[2]),e[1]<t[1]&&(t[1]=e[1]),e[3]>t[3]&&(t[3]=e[3]),t}function tp(t,e){e[0]<t[0]&&(t[0]=e[0]),e[0]>t[2]&&(t[2]=e[0]),e[1]<t[1]&&(t[1]=e[1]),e[1]>t[3]&&(t[3]=e[1])}function ty(t,e,i,n,r){for(;i<n;i+=r){var s,o;s=e[i],o=e[i+1],t[0]=Math.min(t[0],s),t[1]=Math.min(t[1],o),t[2]=Math.max(t[2],s),t[3]=Math.max(t[3],o)}return t}function tx(t,e){let i;return!!((i=e(tE(t)))||(i=e(tC(t)))||(i=e(tL(t)))||(i=e(tM(t))))&&i}function tv(t){let e=0;return tP(t)||(e=tb(t)*tT(t)),e}function tE(t){return[t[0],t[1]]}function tC(t){return[t[2],t[1]]}function tS(t){return[(t[0]+t[2])/2,(t[1]+t[3])/2]}function tR(t,e,i,n,r){let[s,o,l,a,h,u,d,c]=tw(t,e,i,n);return tc(Math.min(s,l,h,d),Math.min(o,a,u,c),Math.max(s,l,h,d),Math.max(o,a,u,c),r)}function tw(t,e,i,n){let r=e*n[0]/2,s=e*n[1]/2,o=Math.cos(i),l=Math.sin(i),a=r*o,h=r*l,u=s*o,d=s*l,c=t[0],g=t[1];return[c-a+d,g-h-u,c-a-d,g-h+u,c+a-d,g+h+u,c+a+d,g+h-u,c-a+d,g-h-u]}function tT(t){return t[3]-t[1]}function tI(t,e,i){let n=i||td();return tA(t,e)?(t[0]>e[0]?n[0]=t[0]:n[0]=e[0],t[1]>e[1]?n[1]=t[1]:n[1]=e[1],t[2]<e[2]?n[2]=t[2]:n[2]=e[2],t[3]<e[3]?n[3]=t[3]:n[3]=e[3]):tg(n),n}function tM(t){return[t[0],t[3]]}function tL(t){return[t[2],t[3]]}function tb(t){return t[2]-t[0]}function tA(t,e){return t[0]<=e[2]&&t[2]>=e[0]&&t[1]<=e[3]&&t[3]>=e[1]}function tP(t){return t[2]<t[0]||t[3]<t[1]}function tF(t,e){let i=e.getExtent(),n=tS(t);if(e.canWrapX()&&(n[0]<i[0]||n[0]>=i[2])){let e=tb(i),r=Math.floor((n[0]-i[0])/e),s=r*e;t[0]-=s,t[2]-=s}return t}let tO={// use the radius of the Normal sphere
radians:6370997/(2*Math.PI),degrees:2*Math.PI*6370997/360,ft:.3048,m:1,"us-ft":1200/3937};var tD=/**
 * @typedef {Object} Options
 * @property {string} code The SRS identifier code, e.g. `EPSG:4326`.
 * @property {import("./Units.js").Units} [units] Units. Required unless a
 * proj4 projection is defined for `code`.
 * @property {import("../extent.js").Extent} [extent] The validity extent for the SRS.
 * @property {string} [axisOrientation='enu'] The axis orientation as specified in Proj4.
 * @property {boolean} [global=false] Whether the projection is valid for the whole globe.
 * @property {number} [metersPerUnit] The meters per unit for the SRS.
 * If not provided, the `units` are used to get the meters per unit from the {@link METERS_PER_UNIT}
 * lookup table.
 * @property {import("../extent.js").Extent} [worldExtent] The world extent for the SRS.
 * @property {function(number, import("../coordinate.js").Coordinate):number} [getPointResolution]
 * Function to determine resolution at a point. The function is called with a
 * `number` view resolution and a {@link module:ol/coordinate~Coordinate} as arguments, and returns
 * the `number` resolution in projection units at the passed coordinate. If this is `undefined`,
 * the default {@link module:ol/proj.getPointResolution} function will be used.
 *//**
 * @classdesc
 * Projection definition class. One of these is created for each projection
 * supported in the application and stored in the {@link module:ol/proj} namespace.
 * You can use these in applications, but this is not required, as API params
 * and options use {@link module:ol/proj~ProjectionLike} which means the simple string
 * code will suffice.
 *
 * You can use {@link module:ol/proj.get} to retrieve the object for a particular
 * projection.
 *
 * The library includes definitions for `EPSG:4326` and `EPSG:3857`, together
 * with the following aliases:
 * * `EPSG:4326`: CRS:84, urn:ogc:def:crs:EPSG:6.6:4326,
 *     urn:ogc:def:crs:OGC:1.3:CRS84, urn:ogc:def:crs:OGC:2:84,
 *     http://www.opengis.net/gml/srs/epsg.xml#4326,
 *     urn:x-ogc:def:crs:EPSG:4326
 * * `EPSG:3857`: EPSG:102100, EPSG:102113, EPSG:900913,
 *     urn:ogc:def:crs:EPSG:6.18:3:3857,
 *     http://www.opengis.net/gml/srs/epsg.xml#3857
 *
 * If you use [proj4js](https://github.com/proj4js/proj4js), aliases can
 * be added using `proj4.defs()`. After all required projection definitions are
 * added, call the {@link module:ol/proj/proj4.register} function.
 *
 * @api
 */class{/**
   * @param {Options} options Projection options.
   */constructor(t){/**
     * @private
     * @type {string}
     */this.code_=t.code,/**
     * Units of projected coordinates. When set to `TILE_PIXELS`, a
     * `this.extent_` and `this.worldExtent_` must be configured properly for each
     * tile.
     * @private
     * @type {import("./Units.js").Units}
     */this.units_=/** @type {import("./Units.js").Units} */t.units,/**
     * Validity extent of the projection in projected coordinates. For projections
     * with `TILE_PIXELS` units, this is the extent of the tile in
     * tile pixel space.
     * @private
     * @type {import("../extent.js").Extent}
     */this.extent_=void 0!==t.extent?t.extent:null,/**
     * Extent of the world in EPSG:4326. For projections with
     * `TILE_PIXELS` units, this is the extent of the tile in
     * projected coordinate space.
     * @private
     * @type {import("../extent.js").Extent}
     */this.worldExtent_=void 0!==t.worldExtent?t.worldExtent:null,/**
     * @private
     * @type {string}
     */this.axisOrientation_=void 0!==t.axisOrientation?t.axisOrientation:"enu",/**
     * @private
     * @type {boolean}
     */this.global_=void 0!==t.global&&t.global,/**
     * @private
     * @type {boolean}
     */this.canWrapX_=!!(this.global_&&this.extent_),/**
     * @private
     * @type {function(number, import("../coordinate.js").Coordinate):number|undefined}
     */this.getPointResolutionFunc_=t.getPointResolution,/**
     * @private
     * @type {import("../tilegrid/TileGrid.js").default}
     */this.defaultTileGrid_=null,/**
     * @private
     * @type {number|undefined}
     */this.metersPerUnit_=t.metersPerUnit}/**
   * @return {boolean} The projection is suitable for wrapping the x-axis
   */canWrapX(){return this.canWrapX_}/**
   * Get the code for this projection, e.g. 'EPSG:4326'.
   * @return {string} Code.
   * @api
   */getCode(){return this.code_}/**
   * Get the validity extent for this projection.
   * @return {import("../extent.js").Extent} Extent.
   * @api
   */getExtent(){return this.extent_}/**
   * Get the units of this projection.
   * @return {import("./Units.js").Units} Units.
   * @api
   */getUnits(){return this.units_}/**
   * Get the amount of meters per unit of this projection.  If the projection is
   * not configured with `metersPerUnit` or a units identifier, the return is
   * `undefined`.
   * @return {number|undefined} Meters.
   * @api
   */getMetersPerUnit(){return this.metersPerUnit_||tO[this.units_]}/**
   * Get the world extent for this projection.
   * @return {import("../extent.js").Extent} Extent.
   * @api
   */getWorldExtent(){return this.worldExtent_}/**
   * Get the axis orientation of this projection.
   * Example values are:
   * enu - the default easting, northing, elevation.
   * neu - northing, easting, up - useful for "lat/long" geographic coordinates,
   *     or south orientated transverse mercator.
   * wnu - westing, northing, up - some planetary coordinate systems have
   *     "west positive" coordinate systems
   * @return {string} Axis orientation.
   * @api
   */getAxisOrientation(){return this.axisOrientation_}/**
   * Is this projection a global projection which spans the whole world?
   * @return {boolean} Whether the projection is global.
   * @api
   */isGlobal(){return this.global_}/**
   * Set if the projection is a global projection which spans the whole world
   * @param {boolean} global Whether the projection is global.
   * @api
   */setGlobal(t){this.global_=t,this.canWrapX_=!!(t&&this.extent_)}/**
   * @return {import("../tilegrid/TileGrid.js").default} The default tile grid.
   */getDefaultTileGrid(){return this.defaultTileGrid_}/**
   * @param {import("../tilegrid/TileGrid.js").default} tileGrid The default tile grid.
   */setDefaultTileGrid(t){this.defaultTileGrid_=t}/**
   * Set the validity extent for this projection.
   * @param {import("../extent.js").Extent} extent Extent.
   * @api
   */setExtent(t){this.extent_=t,this.canWrapX_=!!(this.global_&&t)}/**
   * Set the world extent for this projection.
   * @param {import("../extent.js").Extent} worldExtent World extent
   *     [minlon, minlat, maxlon, maxlat].
   * @api
   */setWorldExtent(t){this.worldExtent_=t}/**
   * Set the getPointResolution function (see {@link module:ol/proj.getPointResolution}
   * for this projection.
   * @param {function(number, import("../coordinate.js").Coordinate):number} func Function
   * @api
   */setGetPointResolution(t){this.getPointResolutionFunc_=t}/**
   * Get the custom point resolution function for this projection (if set).
   * @return {function(number, import("../coordinate.js").Coordinate):number|undefined} The custom point
   * resolution function (if set).
   */getPointResolutionFunc(){return this.getPointResolutionFunc_}};let tk=6378137*Math.PI,tN=[-tk,-tk,tk,tk],tG=[-180,-85,180,85],tz=6378137*Math.log(Math.tan(Math.PI/2));/**
 * @classdesc
 * Projection object for web/spherical Mercator (EPSG:3857).
 */class tX extends tD{/**
   * @param {string} code Code.
   */constructor(t){super({code:t,units:"m",extent:tN,global:!0,worldExtent:tG,getPointResolution:function(t,e){return t/Math.cosh(e[1]/6378137)}})}}let tW=[new tX("EPSG:3857"),new tX("EPSG:102100"),new tX("EPSG:102113"),new tX("EPSG:900913"),new tX("http://www.opengis.net/def/crs/EPSG/0/3857"),new tX("http://www.opengis.net/gml/srs/epsg.xml#3857")],tY=[-180,-90,180,90],tU=6378137*Math.PI/180;/**
 * @classdesc
 * Projection object for WGS84 geographic coordinates (EPSG:4326).
 *
 * Note that OpenLayers does not strictly comply with the EPSG definition.
 * The EPSG registry defines 4326 as a CRS for Latitude,Longitude (y,x).
 * OpenLayers treats EPSG:4326 as a pseudo-projection, with x,y coordinates.
 */class tj extends tD{/**
   * @param {string} code Code.
   * @param {string} [axisOrientation] Axis orientation.
   */constructor(t,e){super({code:t,units:"degrees",extent:tY,axisOrientation:e,global:!0,metersPerUnit:tU,worldExtent:tY})}}let tB=[new tj("CRS:84"),new tj("EPSG:4326","neu"),new tj("urn:ogc:def:crs:OGC:1.3:CRS84"),new tj("urn:ogc:def:crs:OGC:2:84"),new tj("http://www.opengis.net/def/crs/OGC/1.3/CRS84"),new tj("http://www.opengis.net/gml/srs/epsg.xml#4326","neu"),new tj("http://www.opengis.net/def/crs/EPSG/0/4326","neu")],tK={},tZ={};function tV(t,e,i){let n=t.getCode(),r=e.getCode();n in tZ||(tZ[n]={}),tZ[n][r]=i}/**
 * @module ol/math
 *//**
 * Takes a number and clamps it to within the provided bounds.
 * @param {number} value The input number.
 * @param {number} min The minimum value to return.
 * @param {number} max The maximum value to return.
 * @return {number} The input number if it is within bounds, or the nearest
 *     number within the bounds.
 */function tH(t,e,i){return Math.min(Math.max(t,e),i)}function tq(t,e,i,n){let r=i-t,s=n-e;return r*r+s*s}function tJ(t){return 180*t/Math.PI}function t$(t){return t*Math.PI/180}function tQ(t,e){let i=t%e;return i*e<0?i+e:i}function t0(t,e){let i=Math.pow(10,e);return Math.round(t*i)/i}function t1(t,e){return Math.floor(t0(t,e))}function t2(t,e){return Math.ceil(t0(t,e))}function t3(t,e){let i=!0;for(let n=t.length-1;n>=0;--n)if(t[n]!=e[n]){i=!1;break}return i}function t5(t,e){let i=Math.cos(e),n=Math.sin(e),r=t[0]*i-t[1]*n,s=t[1]*i+t[0]*n;return t[0]=r,t[1]=s,t}function t4(t,e){if(e.canWrapX()){let i=tb(e.getExtent()),n=function(t,e,i){let n=e.getExtent(),r=0;return e.canWrapX()&&(t[0]<n[0]||t[0]>n[2])&&(i=i||tb(n),r=Math.floor((t[0]-n[0])/i)),r}(t,e,i);n&&(t[0]-=n*i)}return t}function t6(t,e,i){i=i||6371008.8;let n=t$(t[1]),r=t$(e[1]),s=(r-n)/2,o=t$(e[0]-t[0])/2,l=Math.sin(s)*Math.sin(s)+Math.sin(o)*Math.sin(o)*Math.cos(n)*Math.cos(r);return 2*i*Math.atan2(Math.sqrt(l),Math.sqrt(1-l))}function t8(...t){console.warn(...t)}let t7=!0;function t9(t){t7=!(void 0===t||t)}function et(t,e){if(void 0!==e)for(let i=0,n=t.length;i<n;++i)e[i]=t[i];else e=t.slice();return e}function ee(t,e){if(void 0!==e&&t!==e){for(let i=0,n=t.length;i<n;++i)e[i]=t[i];t=e}return t}function ei(t){tK[t.getCode()]=t,tV(t,t,et)}function en(t){return"string"==typeof t?tK[/** @type {string} */t]||tK[t.replace(/urn:(x-)?ogc:def:crs:EPSG:(.*:)?(\w+)$/,"EPSG:$3")]||null:/** @type {Projection} */t||null}function er(t,e,i,n){let r;t=en(t);let s=t.getPointResolutionFunc();if(s){if(r=s(e,i),n&&n!==t.getUnits()){let e=t.getMetersPerUnit();e&&(r=r*e/tO[n])}}else{let s=t.getUnits();if(("degrees"!=s||n)&&"degrees"!=n){// Estimate point resolution by transforming the center pixel to EPSG:4326,
// measuring its width and height on the normal sphere, and taking the
// average of the width and height.
let o=ea(t,en("EPSG:4326"));if(o===ee&&"degrees"!==s)r=e*t.getMetersPerUnit();else{let t=[i[0]-e/2,i[1],i[0]+e/2,i[1],i[0],i[1]-e/2,i[0],i[1]+e/2];t=o(t,t,2);let n=t6(t.slice(0,2),t.slice(2,4)),s=t6(t.slice(4,6),t.slice(6,8));r=(n+s)/2}let l=n?tO[n]:t.getMetersPerUnit();void 0!==l&&(r/=l)}else r=e}return r}function es(t){!function(t){t.forEach(ei)}(t),t.forEach(function(e){t.forEach(function(t){e!==t&&tV(e,t,et)})})}function eo(t,e){return t?"string"==typeof t?en(t):/** @type {Projection} */t:en(e)}function el(t,e){if(t===e)return!0;let i=t.getUnits()===e.getUnits();if(t.getCode()===e.getCode())return i;let n=ea(t,e);return n===et&&i}function ea(t,e){let i;let n=t.getCode(),r=e.getCode(),s=(n in tZ&&r in tZ[n]&&(i=tZ[n][r]),i);return s||(s=ee),s}function eh(t,e){let i=en(t),n=en(e);return ea(i,n)}function eu(t,e,i){let n=eh(e,i);return n(t,void 0,t.length)}function ed(t,e){return t7&&!t3(t,[0,0])&&t[0]>=-180&&t[0]<=180&&t[1]>=-90&&t[1]<=90&&(t7=!1,t8("Call useGeographic() from ol/proj once to work with [longitude, latitude] coordinates.")),t}/**
 * @module ol/geom/flat/transform
 *//**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {import("../../transform.js").Transform} transform Transform.
 * @param {Array<number>} [dest] Destination.
 * @return {Array<number>} Transformed coordinates.
 */function ec(t,e,i,n,r,s){s=s||[];let o=0;for(let l=e;l<i;l+=n){let e=t[l],i=t[l+1];s[o++]=r[0]*e+r[2]*i+r[4],s[o++]=r[1]*e+r[3]*i+r[5]}return s&&s.length!=o&&(s.length=o),s}function eg(t,e,i,n,r,s,o){o=o||[];let l=Math.cos(r),a=Math.sin(r),h=s[0],u=s[1],d=0;for(let r=e;r<i;r+=n){let e=t[r]-h,i=t[r+1]-u;o[d++]=h+e*l-i*a,o[d++]=u+e*a+i*l;for(let e=r+2;e<r+n;++e)o[d++]=t[e]}return o&&o.length!=d&&(o.length=d),o}// Add transformations that don't alter coordinates to convert within set of
// projections with equal meaning.
es(tW),es(tB),// Add transformations to convert EPSG:4326 like coordinates to EPSG:3857 like
// coordinates and back.
function(t,e,i,n){t.forEach(function(t){e.forEach(function(e){tV(t,e,i),tV(e,t,n)})})}(tB,tW,function(t,e,i){let n=t.length;i=i>1?i:2,void 0===e&&(e=i>2?t.slice():Array(n));for(let r=0;r<n;r+=i){e[r]=tk*t[r]/180;let i=6378137*Math.log(Math.tan(Math.PI*(+t[r+1]+90)/360));i>tz?i=tz:i<-tz&&(i=-tz),e[r+1]=i}return e},function(t,e,i){let n=t.length;i=i>1?i:2,void 0===e&&(e=i>2?t.slice():Array(n));for(let r=0;r<n;r+=i)e[r]=180*t[r]/tk,e[r+1]=360*Math.atan(Math.exp(t[r+1]/6378137))/Math.PI-90;return e});/**
 * @typedef {'XY' | 'XYZ' | 'XYM' | 'XYZM'} GeometryLayout
 * The coordinate layout for geometries, indicating whether a 3rd or 4th z ('Z')
 * or measure ('M') coordinate is available.
 *//**
 * @typedef {'Point' | 'LineString' | 'LinearRing' | 'Polygon' | 'MultiPoint' | 'MultiLineString' | 'MultiPolygon' | 'GeometryCollection' | 'Circle'} Type
 * The geometry type.  One of `'Point'`, `'LineString'`, `'LinearRing'`,
 * `'Polygon'`, `'MultiPoint'`, `'MultiLineString'`, `'MultiPolygon'`,
 * `'GeometryCollection'`, or `'Circle'`.
 *//**
 * @type {import("../transform.js").Transform}
 */let ef=J();var e_=/**
 * @classdesc
 * Abstract base class; normally only used for creating subclasses and not
 * instantiated in apps.
 * Base class for vector geometries.
 *
 * To get notified of changes to the geometry, register a listener for the
 * generic `change` event on your geometry instance.
 *
 * @abstract
 * @api
 */class extends G{constructor(){var t;let e,i,n,r;super(),/**
     * @private
     * @type {import("../extent.js").Extent}
     */this.extent_=td(),/**
     * @private
     * @type {number}
     */this.extentRevision_=-1,/**
     * @protected
     * @type {number}
     */this.simplifiedGeometryMaxMinSquaredTolerance=0,/**
     * @protected
     * @type {number}
     */this.simplifiedGeometryRevision=0,/**
     * Get a transformed and simplified version of the geometry.
     * @abstract
     * @param {number} revision The geometry revision.
     * @param {number} squaredTolerance Squared tolerance.
     * @param {import("../proj.js").TransformFunction} [transform] Optional transform function.
     * @return {Geometry} Simplified geometry.
     */this.simplifyTransformedInternal=(t=function(t,e,i){if(!i)return this.getSimplifiedGeometry(e);let n=this.clone();return n.applyTransform(i),n.getSimplifiedGeometry(e)},r=!1,function(){let s=Array.prototype.slice.call(arguments);return r&&this===n&&C(s,i)||(r=!0,n=this,i=s,e=t.apply(this,arguments)),e})}/**
   * Get a transformed and simplified version of the geometry.
   * @abstract
   * @param {number} squaredTolerance Squared tolerance.
   * @param {import("../proj.js").TransformFunction} [transform] Optional transform function.
   * @return {Geometry} Simplified geometry.
   */simplifyTransformed(t,e){return this.simplifyTransformedInternal(this.getRevision(),t,e)}/**
   * Make a complete copy of the geometry.
   * @abstract
   * @return {!Geometry} Clone.
   */clone(){return O()}/**
   * @abstract
   * @param {number} x X.
   * @param {number} y Y.
   * @param {import("../coordinate.js").Coordinate} closestPoint Closest point.
   * @param {number} minSquaredDistance Minimum squared distance.
   * @return {number} Minimum squared distance.
   */closestPointXY(t,e,i,n){return O()}/**
   * @param {number} x X.
   * @param {number} y Y.
   * @return {boolean} Contains (x, y).
   */containsXY(t,e){let i=this.getClosestPoint([t,e]);return i[0]===t&&i[1]===e}/**
   * Return the closest point of the geometry to the passed point as
   * {@link module:ol/coordinate~Coordinate coordinate}.
   * @param {import("../coordinate.js").Coordinate} point Point.
   * @param {import("../coordinate.js").Coordinate} [closestPoint] Closest point.
   * @return {import("../coordinate.js").Coordinate} Closest point.
   * @api
   */getClosestPoint(t,e){return e=e||[NaN,NaN],this.closestPointXY(t[0],t[1],e,1/0),e}/**
   * Returns true if this geometry includes the specified coordinate. If the
   * coordinate is on the boundary of the geometry, returns false.
   * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
   * @return {boolean} Contains coordinate.
   * @api
   */intersectsCoordinate(t){return this.containsXY(t[0],t[1])}/**
   * @abstract
   * @param {import("../extent.js").Extent} extent Extent.
   * @protected
   * @return {import("../extent.js").Extent} extent Extent.
   */computeExtent(t){return O()}/**
   * Get the extent of the geometry.
   * @param {import("../extent.js").Extent} [extent] Extent.
   * @return {import("../extent.js").Extent} extent Extent.
   * @api
   */getExtent(t){var e;if(this.extentRevision_!=this.getRevision()){let t=this.computeExtent(this.extent_);(isNaN(t[0])||isNaN(t[1]))&&tg(t),this.extentRevision_=this.getRevision()}return e=this.extent_,t?(t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t):e}/**
   * Rotate the geometry around a given coordinate. This modifies the geometry
   * coordinates in place.
   * @abstract
   * @param {number} angle Rotation angle in radians.
   * @param {import("../coordinate.js").Coordinate} anchor The rotation center.
   * @api
   */rotate(t,e){O()}/**
   * Scale the geometry (with an optional origin).  This modifies the geometry
   * coordinates in place.
   * @abstract
   * @param {number} sx The scaling factor in the x-direction.
   * @param {number} [sy] The scaling factor in the y-direction (defaults to sx).
   * @param {import("../coordinate.js").Coordinate} [anchor] The scale origin (defaults to the center
   *     of the geometry extent).
   * @api
   */scale(t,e,i){O()}/**
   * Create a simplified version of this geometry.  For linestrings, this uses
   * the [Douglas Peucker](https://en.wikipedia.org/wiki/Ramer-Douglas-Peucker_algorithm)
   * algorithm.  For polygons, a quantization-based
   * simplification is used to preserve topology.
   * @param {number} tolerance The tolerance distance for simplification.
   * @return {Geometry} A new, simplified version of the original geometry.
   * @api
   */simplify(t){return this.getSimplifiedGeometry(t*t)}/**
   * Create a simplified version of this geometry using the Douglas Peucker
   * algorithm.
   * See https://en.wikipedia.org/wiki/Ramer-Douglas-Peucker_algorithm.
   * @abstract
   * @param {number} squaredTolerance Squared tolerance.
   * @return {Geometry} Simplified geometry.
   */getSimplifiedGeometry(t){return O()}/**
   * Get the type of this geometry.
   * @abstract
   * @return {Type} Geometry type.
   */getType(){return O()}/**
   * Apply a transform function to the coordinates of the geometry.
   * The geometry is modified in place.
   * If you do not want the geometry modified in place, first `clone()` it and
   * then use this function on the clone.
   * @abstract
   * @param {import("../proj.js").TransformFunction} transformFn Transform function.
   * Called with a flat array of geometry coordinates.
   */applyTransform(t){O()}/**
   * Test if the geometry and the passed extent intersect.
   * @abstract
   * @param {import("../extent.js").Extent} extent Extent.
   * @return {boolean} `true` if the geometry and the extent intersect.
   */intersectsExtent(t){return O()}/**
   * Translate the geometry.  This modifies the geometry coordinates in place.  If
   * instead you want a new geometry, first `clone()` this geometry.
   * @abstract
   * @param {number} deltaX Delta X.
   * @param {number} deltaY Delta Y.
   * @api
   */translate(t,e){O()}/**
   * Transform each coordinate of the geometry from one coordinate reference
   * system to another. The geometry is modified in place.
   * For example, a line will be transformed to a line and a circle to a circle.
   * If you do not want the geometry modified in place, first `clone()` it and
   * then use this function on the clone.
   *
   * @param {import("../proj.js").ProjectionLike} source The current projection.  Can be a
   *     string identifier or a {@link module:ol/proj/Projection~Projection} object.
   * @param {import("../proj.js").ProjectionLike} destination The desired projection.  Can be a
   *     string identifier or a {@link module:ol/proj/Projection~Projection} object.
   * @return {Geometry} This geometry.  Note that original geometry is
   *     modified in place.
   * @api
   */transform(t,e){/** @type {import("../proj/Projection.js").default} */let i=en(t),n="tile-pixels"==i.getUnits()?function(t,n,r){let s=i.getExtent(),o=i.getWorldExtent(),l=tT(o)/tT(s);return Q(ef,o[0],o[3],l,-l,0,0,0),ec(t,0,t.length,r,ef,n),eh(i,e)(t,n,r)}:eh(i,e);return this.applyTransform(n),this}};/**
 * @classdesc
 * An array of {@link module:ol/geom/Geometry~Geometry} objects.
 *
 * @api
 */class em extends e_{/**
   * @param {Array<Geometry>} [geometries] Geometries.
   */constructor(t){super(),/**
     * @private
     * @type {Array<Geometry>}
     */this.geometries_=t||null,/**
     * @type {Array<import("../events.js").EventsKey>}
     */this.changeEventsKeys_=[],this.listenGeometriesChange_()}/**
   * @private
   */unlistenGeometriesChange_(){this.changeEventsKeys_.forEach(A),this.changeEventsKeys_.length=0}/**
   * @private
   */listenGeometriesChange_(){if(this.geometries_)for(let t=0,e=this.geometries_.length;t<e;++t)this.changeEventsKeys_.push(b(this.geometries_[t],L.CHANGE,this.changed,this))}/**
   * Make a complete copy of the geometry.
   * @return {!GeometryCollection} Clone.
   * @api
   */clone(){let t=new em(null);return t.setGeometries(this.geometries_),t.applyProperties(this),t}/**
   * @param {number} x X.
   * @param {number} y Y.
   * @param {import("../coordinate.js").Coordinate} closestPoint Closest point.
   * @param {number} minSquaredDistance Minimum squared distance.
   * @return {number} Minimum squared distance.
   */closestPointXY(t,e,i,n){if(n<to(this.getExtent(),t,e))return n;let r=this.geometries_;for(let s=0,o=r.length;s<o;++s)n=r[s].closestPointXY(t,e,i,n);return n}/**
   * @param {number} x X.
   * @param {number} y Y.
   * @return {boolean} Contains (x, y).
   */containsXY(t,e){let i=this.geometries_;for(let n=0,r=i.length;n<r;++n)if(i[n].containsXY(t,e))return!0;return!1}/**
   * @param {import("../extent.js").Extent} extent Extent.
   * @protected
   * @return {import("../extent.js").Extent} extent Extent.
   */computeExtent(t){tg(t);let e=this.geometries_;for(let i=0,n=e.length;i<n;++i)tm(t,e[i].getExtent());return t}/**
   * Return the geometries that make up this geometry collection.
   * @return {Array<Geometry>} Geometries.
   * @api
   */getGeometries(){return ep(this.geometries_)}/**
   * @return {Array<Geometry>} Geometries.
   */getGeometriesArray(){return this.geometries_}/**
   * @return {Array<Geometry>} Geometries.
   */getGeometriesArrayRecursive(){/** @type {Array<Geometry>} */let t=[],e=this.geometries_;for(let i=0,n=e.length;i<n;++i)e[i].getType()===this.getType()?t=t.concat(/** @type {GeometryCollection} */e[i].getGeometriesArrayRecursive()):t.push(e[i]);return t}/**
   * Create a simplified version of this geometry using the Douglas Peucker algorithm.
   * @param {number} squaredTolerance Squared tolerance.
   * @return {GeometryCollection} Simplified GeometryCollection.
   */getSimplifiedGeometry(t){if(this.simplifiedGeometryRevision!==this.getRevision()&&(this.simplifiedGeometryMaxMinSquaredTolerance=0,this.simplifiedGeometryRevision=this.getRevision()),t<0||0!==this.simplifiedGeometryMaxMinSquaredTolerance&&t<this.simplifiedGeometryMaxMinSquaredTolerance)return this;let e=[],i=this.geometries_,n=!1;for(let r=0,s=i.length;r<s;++r){let s=i[r],o=s.getSimplifiedGeometry(t);e.push(o),o!==s&&(n=!0)}if(n){let t=new em(null);return t.setGeometriesArray(e),t}return this.simplifiedGeometryMaxMinSquaredTolerance=t,this}/**
   * Get the type of this geometry.
   * @return {import("./Geometry.js").Type} Geometry type.
   * @api
   */getType(){return"GeometryCollection"}/**
   * Test if the geometry and the passed extent intersect.
   * @param {import("../extent.js").Extent} extent Extent.
   * @return {boolean} `true` if the geometry and the extent intersect.
   * @api
   */intersectsExtent(t){let e=this.geometries_;for(let i=0,n=e.length;i<n;++i)if(e[i].intersectsExtent(t))return!0;return!1}/**
   * @return {boolean} Is empty.
   */isEmpty(){return 0===this.geometries_.length}/**
   * Rotate the geometry around a given coordinate. This modifies the geometry
   * coordinates in place.
   * @param {number} angle Rotation angle in radians.
   * @param {import("../coordinate.js").Coordinate} anchor The rotation center.
   * @api
   */rotate(t,e){let i=this.geometries_;for(let n=0,r=i.length;n<r;++n)i[n].rotate(t,e);this.changed()}/**
   * Scale the geometry (with an optional origin).  This modifies the geometry
   * coordinates in place.
   * @abstract
   * @param {number} sx The scaling factor in the x-direction.
   * @param {number} [sy] The scaling factor in the y-direction (defaults to sx).
   * @param {import("../coordinate.js").Coordinate} [anchor] The scale origin (defaults to the center
   *     of the geometry extent).
   * @api
   */scale(t,e,i){i||(i=tS(this.getExtent()));let n=this.geometries_;for(let r=0,s=n.length;r<s;++r)n[r].scale(t,e,i);this.changed()}/**
   * Set the geometries that make up this geometry collection.
   * @param {Array<Geometry>} geometries Geometries.
   * @api
   */setGeometries(t){this.setGeometriesArray(ep(t))}/**
   * @param {Array<Geometry>} geometries Geometries.
   */setGeometriesArray(t){this.unlistenGeometriesChange_(),this.geometries_=t,this.listenGeometriesChange_(),this.changed()}/**
   * Apply a transform function to the coordinates of the geometry.
   * The geometry is modified in place.
   * If you do not want the geometry modified in place, first `clone()` it and
   * then use this function on the clone.
   * @param {import("../proj.js").TransformFunction} transformFn Transform function.
   * Called with a flat array of geometry coordinates.
   * @api
   */applyTransform(t){let e=this.geometries_;for(let i=0,n=e.length;i<n;++i)e[i].applyTransform(t);this.changed()}/**
   * Translate the geometry.  This modifies the geometry coordinates in place.  If
   * instead you want a new geometry, first `clone()` this geometry.
   * @param {number} deltaX Delta X.
   * @param {number} deltaY Delta Y.
   * @api
   */translate(t,e){let i=this.geometries_;for(let n=0,r=i.length;n<r;++n)i[n].translate(t,e);this.changed()}/**
   * Clean up.
   */disposeInternal(){this.unlistenGeometriesChange_(),super.disposeInternal()}}/**
 * @param {Array<Geometry>} geometries Geometries.
 * @return {Array<Geometry>} Cloned geometries.
 */function ep(t){let e=[];for(let i=0,n=t.length;i<n;++i)e.push(t[i].clone());return e}/**
 * @module ol/style/Icon
 *//**
 * @module ol/ImageState
 *//**
 * @enum {number}
 */var ey={IDLE:0,LOADING:1,LOADED:2,ERROR:3};function ex(t){return t[0]>0&&t[1]>0}function ev(t,e){return Array.isArray(t)?t:(void 0===e?e=[t,t]:(e[0]=t,e[1]=t),e)}/**
 * @typedef {Object} Options
 * @property {number} opacity Opacity.
 * @property {boolean} rotateWithView If the image should get rotated with the view.
 * @property {number} rotation Rotation.
 * @property {number|import("../size.js").Size} scale Scale.
 * @property {Array<number>} displacement Displacement.
 * @property {"declutter"|"obstacle"|"none"|undefined} declutterMode Declutter mode: `declutter`, `obstacle`, 'none *//**
 * @classdesc
 * A base class used for creating subclasses and not instantiated in
 * apps. Base class for {@link module:ol/style/Icon~Icon}, {@link module:ol/style/Circle~CircleStyle} and
 * {@link module:ol/style/RegularShape~RegularShape}.
 * @abstract
 * @api
 */class eE{/**
   * @param {Options} options Options.
   */constructor(t){/**
     * @private
     * @type {number}
     */this.opacity_=t.opacity,/**
     * @private
     * @type {boolean}
     */this.rotateWithView_=t.rotateWithView,/**
     * @private
     * @type {number}
     */this.rotation_=t.rotation,/**
     * @private
     * @type {number|import("../size.js").Size}
     */this.scale_=t.scale,/**
     * @private
     * @type {import("../size.js").Size}
     */this.scaleArray_=ev(t.scale),/**
     * @private
     * @type {Array<number>}
     */this.displacement_=t.displacement,/**
     * @private
     * @type {"declutter"|"obstacle"|"none"|undefined}
     */this.declutterMode_=t.declutterMode}/**
   * Clones the style.
   * @return {ImageStyle} The cloned style.
   * @api
   */clone(){let t=this.getScale();return new eE({opacity:this.getOpacity(),scale:Array.isArray(t)?t.slice():t,rotation:this.getRotation(),rotateWithView:this.getRotateWithView(),displacement:this.getDisplacement().slice(),declutterMode:this.getDeclutterMode()})}/**
   * Get the symbolizer opacity.
   * @return {number} Opacity.
   * @api
   */getOpacity(){return this.opacity_}/**
   * Determine whether the symbolizer rotates with the map.
   * @return {boolean} Rotate with map.
   * @api
   */getRotateWithView(){return this.rotateWithView_}/**
   * Get the symoblizer rotation.
   * @return {number} Rotation.
   * @api
   */getRotation(){return this.rotation_}/**
   * Get the symbolizer scale.
   * @return {number|import("../size.js").Size} Scale.
   * @api
   */getScale(){return this.scale_}/**
   * Get the symbolizer scale array.
   * @return {import("../size.js").Size} Scale array.
   */getScaleArray(){return this.scaleArray_}/**
   * Get the displacement of the shape
   * @return {Array<number>} Shape's center displacement
   * @api
   */getDisplacement(){return this.displacement_}/**
   * Get the declutter mode of the shape
   * @return {"declutter"|"obstacle"|"none"|undefined} Shape's declutter mode
   * @api
   */getDeclutterMode(){return this.declutterMode_}/**
   * Get the anchor point in pixels. The anchor determines the center point for the
   * symbolizer.
   * @abstract
   * @return {Array<number>} Anchor.
   */getAnchor(){return O()}/**
   * Get the image element for the symbolizer.
   * @abstract
   * @param {number} pixelRatio Pixel ratio.
   * @return {import('../DataTile.js').ImageLike} Image element.
   */getImage(t){return O()}/**
   * @abstract
   * @return {import('../DataTile.js').ImageLike} Image element.
   */getHitDetectionImage(){return O()}/**
   * Get the image pixel ratio.
   * @param {number} pixelRatio Pixel ratio.
   * @return {number} Pixel ratio.
   */getPixelRatio(t){return 1}/**
   * @abstract
   * @return {import("../ImageState.js").default} Image state.
   */getImageState(){return O()}/**
   * @abstract
   * @return {import("../size.js").Size} Image size.
   */getImageSize(){return O()}/**
   * Get the origin of the symbolizer.
   * @abstract
   * @return {Array<number>} Origin.
   */getOrigin(){return O()}/**
   * Get the size of the symbolizer (in pixels).
   * @abstract
   * @return {import("../size.js").Size} Size.
   */getSize(){return O()}/**
   * Set the displacement.
   *
   * @param {Array<number>} displacement Displacement.
   * @api
   */setDisplacement(t){this.displacement_=t}/**
   * Set the opacity.
   *
   * @param {number} opacity Opacity.
   * @api
   */setOpacity(t){this.opacity_=t}/**
   * Set whether to rotate the style with the view.
   *
   * @param {boolean} rotateWithView Rotate with map.
   * @api
   */setRotateWithView(t){this.rotateWithView_=t}/**
   * Set the rotation.
   *
   * @param {number} rotation Rotation.
   * @api
   */setRotation(t){this.rotation_=t}/**
   * Set the scale.
   *
   * @param {number|import("../size.js").Size} scale Scale.
   * @api
   */setScale(t){this.scale_=t,this.scaleArray_=ev(t)}/**
   * @abstract
   * @param {function(import("../events/Event.js").default): void} listener Listener function.
   */listenImageChange(t){O()}/**
   * Load not yet loaded URI.
   * @abstract
   */load(){O()}/**
   * @abstract
   * @param {function(import("../events/Event.js").default): void} listener Listener function.
   */unlistenImageChange(t){O()}}var eC=eE;/**
 * @module ol/color
 *//**
 * A color represented as a short array [red, green, blue, alpha].
 * red, green, and blue should be integers in the range 0..255 inclusive.
 * alpha should be a float in the range 0..1 inclusive. If no alpha value is
 * given then `1` will be used.
 * @typedef {Array<number>} Color
 * @api
 *//**
 * This RegExp matches # followed by 3, 4, 6, or 8 hex digits.
 * @const
 * @type {RegExp}
 * @private
 */let eS=/^#([a-f0-9]{3}|[a-f0-9]{4}(?:[a-f0-9]{2}){0,2})$/i,eR=/^([a-z]*)$|^hsla?\(.*\)$/i;function ew(t){return"string"==typeof t?t:eL(t)}let eT=function(){/**
   * @type {Object<string, Color>}
   */let t={},e=0;return(/**
     * @param {string} s String.
     * @return {Color} Color.
     */function(i){let n;if(t.hasOwnProperty(i))n=t[i];else{if(e>=1024){let i=0;for(let n in t)(3&i++)==0&&(delete t[n],--e)}n=/**
 * @param {string} s String.
 * @private
 * @return {Color} Color.
 */function(t){let e,i,n,r,s;if(eR.exec(t)&&(t=/**
 * Return named color as an rgba string.
 * @param {string} color Named color.
 * @return {string} Rgb string.
 */function(t){let e=document.createElement("div");if(e.style.color=t,""!==e.style.color){document.body.appendChild(e);let t=getComputedStyle(e).color;return document.body.removeChild(e),t}return""}(t)),eS.exec(t)){let o;// hex
let l=t.length-1;// number of hex digits
o=l<=4?1:2;let a=4===l||8===l;e=parseInt(t.substr(1+0*o,o),16),i=parseInt(t.substr(1+1*o,o),16),n=parseInt(t.substr(1+2*o,o),16),r=a?parseInt(t.substr(1+3*o,o),16):255,1==o&&(e=(e<<4)+e,i=(i<<4)+i,n=(n<<4)+n,a&&(r=(r<<4)+r)),s=[e,i,n,r/255]}else if(t.startsWith("rgba("))eM(// rgba()
s=t.slice(5,-1).split(",").map(Number));else if(t.startsWith("rgb("))// rgb()
(s=t.slice(4,-1).split(",").map(Number)).push(1),eM(s);else throw Error("Invalid color");return s}(i),t[i]=n,++e}return n})}();function eI(t){return Array.isArray(t)?t:eT(t)}function eM(t){return t[0]=tH(t[0]+.5|0,0,255),t[1]=tH(t[1]+.5|0,0,255),t[2]=tH(t[2]+.5|0,0,255),t[3]=tH(t[3],0,1),t}function eL(t){let e=t[0];e!=(0|e)&&(e=e+.5|0);let i=t[1];i!=(0|i)&&(i=i+.5|0);let n=t[2];n!=(0|n)&&(n=n+.5|0);let r=void 0===t[3]?1:Math.round(100*t[3])/100;return"rgba("+e+","+i+","+n+","+r+")"}/**
 * @module ol/style/IconImage
 */function eb(t,e,i,n){/** @type {HTMLCanvasElement|OffscreenCanvas} */let r;//FIXME Allow OffscreenCanvasRenderingContext2D as return type
return r=i&&i.length?i.shift():V?new OffscreenCanvas(t||300,e||300):document.createElement("canvas"),t&&(r.width=t),e&&(r.height=e),/** @type {CanvasRenderingContext2D} */r.getContext("2d",n)}function eA(t){let e=t.canvas;e.width=1,e.height=1,t.clearRect(0,0,1,1)}function eP(t,e){let i=e.parentNode;i&&i.replaceChild(t,e)}function eF(t){return t&&t.parentNode?t.parentNode.removeChild(t):null}/**
 * @param {string} src Src.
 * @param {?string} crossOrigin Cross origin.
 * @param {import("../color.js").Color} color Color.
 * @return {string} Cache key.
 */function eO(t,e,i){let n=i?ew(i):"null";return e+":"+t+":"+n}let eD=new /**
 * @module ol/style/IconImageCache
 *//**
 * @classdesc
 * Singleton class. Available through {@link module:ol/style/IconImageCache.shared}.
 */class{constructor(){/**
     * @type {!Object<string, import("./IconImage.js").default>}
     * @private
     */this.cache_={},/**
     * @type {number}
     * @private
     */this.cacheSize_=0,/**
     * @type {number}
     * @private
     */this.maxCacheSize_=32}/**
   * FIXME empty description for jsdoc
   */clear(){this.cache_={},this.cacheSize_=0}/**
   * @return {boolean} Can expire cache.
   */canExpireCache(){return this.cacheSize_>this.maxCacheSize_}/**
   * FIXME empty description for jsdoc
   */expire(){if(this.canExpireCache()){let t=0;for(let e in this.cache_){let i=this.cache_[e];(3&t++)==0&&!i.hasListener()&&(delete this.cache_[e],--this.cacheSize_)}}}/**
   * @param {string} src Src.
   * @param {?string} crossOrigin Cross origin.
   * @param {import("../color.js").Color} color Color.
   * @return {import("./IconImage.js").default} Icon image.
   */get(t,e,i){let n=eO(t,e,i);return n in this.cache_?this.cache_[n]:null}/**
   * @param {string} src Src.
   * @param {?string} crossOrigin Cross origin.
   * @param {import("../color.js").Color} color Color.
   * @param {import("./IconImage.js").default} iconImage Icon image.
   */set(t,e,i,n){let r=eO(t,e,i);this.cache_[r]=n,++this.cacheSize_}/**
   * Set the cache size of the icon cache. Default is `32`. Change this value when
   * your map uses more than 32 different icon images and you are not caching icon
   * styles on the application level.
   * @param {number} maxCacheSize Cache max size.
   * @api
   */setSize(t){this.maxCacheSize_=t,this.expire()}},ek=null;class eN extends M{/**
   * @param {HTMLImageElement|HTMLCanvasElement|ImageBitmap} image Image.
   * @param {string|undefined} src Src.
   * @param {?string} crossOrigin Cross origin.
   * @param {import("../ImageState.js").default} imageState Image state.
   * @param {import("../color.js").Color} color Color.
   */constructor(t,e,i,n,r){super(),/**
     * @private
     * @type {HTMLImageElement|HTMLCanvasElement|ImageBitmap}
     */this.hitDetectionImage_=null,/**
     * @private
     * @type {HTMLImageElement|HTMLCanvasElement|ImageBitmap}
     */this.image_=t,/**
     * @private
     * @type {string|null}
     */this.crossOrigin_=i,/**
     * @private
     * @type {Object<number, HTMLCanvasElement>}
     */this.canvas_={},/**
     * @private
     * @type {import("../color.js").Color}
     */this.color_=r,/**
     * @private
     * @type {import("../ImageState.js").default}
     */this.imageState_=void 0===n?ey.IDLE:n,/**
     * @private
     * @type {import("../size.js").Size|null}
     */this.size_=t&&t.width&&t.height?[t.width,t.height]:null,/**
     * @private
     * @type {string|undefined}
     */this.src_=e,/**
     * @private
     */this.tainted_}/**
   * @private
   */initializeImage_(){this.image_=new Image,null!==this.crossOrigin_&&(this.image_.crossOrigin=this.crossOrigin_)}/**
   * @private
   * @return {boolean} The image canvas is tainted.
   */isTainted_(){if(void 0===this.tainted_&&this.imageState_===ey.LOADED){ek||(ek=eb(1,1,void 0,{willReadFrequently:!0})),ek.drawImage(this.image_,0,0);try{ek.getImageData(0,0,1,1),this.tainted_=!1}catch(t){ek=null,this.tainted_=!0}}return!0===this.tainted_}/**
   * @private
   */dispatchChangeEvent_(){this.dispatchEvent(L.CHANGE)}/**
   * @private
   */handleImageError_(){this.imageState_=ey.ERROR,this.dispatchChangeEvent_()}/**
   * @private
   */handleImageLoad_(){this.imageState_=ey.LOADED,this.size_=[this.image_.width,this.image_.height],this.dispatchChangeEvent_()}/**
   * @param {number} pixelRatio Pixel ratio.
   * @return {HTMLImageElement|HTMLCanvasElement|ImageBitmap} Image or Canvas element or image bitmap.
   */getImage(t){return this.image_||this.initializeImage_(),this.replaceColor_(t),this.canvas_[t]?this.canvas_[t]:this.image_}/**
   * @param {number} pixelRatio Pixel ratio.
   * @return {number} Image or Canvas element.
   */getPixelRatio(t){return this.replaceColor_(t),this.canvas_[t]?t:1}/**
   * @return {import("../ImageState.js").default} Image state.
   */getImageState(){return this.imageState_}/**
   * @return {HTMLImageElement|HTMLCanvasElement|ImageBitmap} Image element.
   */getHitDetectionImage(){if(this.image_||this.initializeImage_(),!this.hitDetectionImage_){if(this.isTainted_()){let t=this.size_[0],e=this.size_[1],i=eb(t,e);i.fillRect(0,0,t,e),this.hitDetectionImage_=i.canvas}else this.hitDetectionImage_=this.image_}return this.hitDetectionImage_}/**
   * Get the size of the icon (in pixels).
   * @return {import("../size.js").Size} Image size.
   */getSize(){return this.size_}/**
   * @return {string|undefined} Image src.
   */getSrc(){return this.src_}/**
   * Load not yet loaded URI.
   */load(){if(this.imageState_===ey.IDLE){this.image_||this.initializeImage_(),this.imageState_=ey.LOADING;try{void 0!==this.src_&&/** @type {HTMLImageElement} */(this.image_.src=this.src_)}catch(t){this.handleImageError_()}if(this.image_ instanceof HTMLImageElement){var t,e,i;(t=this.image_,(e=this.src_)&&(t.src=e),new Promise(H?(e,i)=>t.decode().then(()=>e(t),i):(e,n)=>{function r(){o(),e(t)}function s(){o(),n(Error("Image load error"))}function o(){t.removeEventListener("load",r),t.removeEventListener("error",s)}t.addEventListener("load",r),t.addEventListener("error",s),i&&(t.src=i)})).then(t=>{this.image_=t,this.handleImageLoad_()}).catch(this.handleImageError_.bind(this))}}}/**
   * @param {number} pixelRatio Pixel ratio.
   * @private
   */replaceColor_(t){if(!this.color_||this.canvas_[t]||this.imageState_!==ey.LOADED)return;let e=this.image_,i=document.createElement("canvas");i.width=Math.ceil(e.width*t),i.height=Math.ceil(e.height*t);let n=i.getContext("2d");n.scale(t,t),n.drawImage(e,0,0),n.globalCompositeOperation="multiply",n.fillStyle=ew(this.color_),n.fillRect(0,0,i.width/t,i.height/t),n.globalCompositeOperation="destination-in",n.drawImage(e,0,0),this.canvas_[t]=i}}/**
 * @typedef {'fraction' | 'pixels'} IconAnchorUnits
 * Anchor unit can be either a fraction of the icon size or in pixels.
 *//**
 * @typedef {'bottom-left' | 'bottom-right' | 'top-left' | 'top-right'} IconOrigin
 * Icon origin. One of 'bottom-left', 'bottom-right', 'top-left', 'top-right'.
 *//**
 * @typedef {Object} Options
 * @property {Array<number>} [anchor=[0.5, 0.5]] Anchor. Default value is the icon center.
 * @property {IconOrigin} [anchorOrigin='top-left'] Origin of the anchor: `bottom-left`, `bottom-right`,
 * `top-left` or `top-right`.
 * @property {IconAnchorUnits} [anchorXUnits='fraction'] Units in which the anchor x value is
 * specified. A value of `'fraction'` indicates the x value is a fraction of the icon. A value of `'pixels'` indicates
 * the x value in pixels.
 * @property {IconAnchorUnits} [anchorYUnits='fraction'] Units in which the anchor y value is
 * specified. A value of `'fraction'` indicates the y value is a fraction of the icon. A value of `'pixels'` indicates
 * the y value in pixels.
 * @property {import("../color.js").Color|string} [color] Color to tint the icon. If not specified,
 * the icon will be left as is.
 * @property {null|string} [crossOrigin] The `crossOrigin` attribute for loaded images. Note that you must provide a
 * `crossOrigin` value if you want to access pixel data with the Canvas renderer.
 * See https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image for more detail.
 * @property {HTMLImageElement|HTMLCanvasElement|ImageBitmap} [img] Image object for the icon.
 * @property {Array<number>} [displacement=[0, 0]] Displacement of the icon in pixels.
 * Positive values will shift the icon right and up.
 * @property {number} [opacity=1] Opacity of the icon.
 * @property {number} [width] The width of the icon in pixels. This can't be used together with `scale`.
 * @property {number} [height] The height of the icon in pixels. This can't be used together with `scale`.
 * @property {number|import("../size.js").Size} [scale=1] Scale.
 * @property {boolean} [rotateWithView=false] Whether to rotate the icon with the view.
 * @property {number} [rotation=0] Rotation in radians (positive rotation clockwise).
 * @property {Array<number>} [offset=[0, 0]] Offset which, together with `size` and `offsetOrigin`, defines the
 * sub-rectangle to use from the original (sprite) image.
 * @property {IconOrigin} [offsetOrigin='top-left'] Origin of the offset: `bottom-left`, `bottom-right`,
 * `top-left` or `top-right`.
 * @property {import("../size.js").Size} [size] Icon size in pixels. Used together with `offset` to define the
 * sub-rectangle to use from the original (sprite) image.
 * @property {string} [src] Image source URI.
 * @property {"declutter"|"obstacle"|"none"|undefined} [declutterMode] Declutter mode.
 *//**
 * @param {number} width The width.
 * @param {number} height The height.
 * @param {number|undefined} wantedWidth The wanted width.
 * @param {number|undefined} wantedHeight The wanted height.
 * @return {number|Array<number>} The scale.
 */function eG(t,e,i,n){return void 0!==i&&void 0!==n?[i/t,n/e]:void 0!==i?i/t:void 0!==n?n/e:1}/**
 * @classdesc
 * Set icon style for vector features.
 * @api
 */class ez extends eC{/**
   * @param {Options} [options] Options.
   */constructor(t){var e,i,n,r;let s,o;t=t||{};/**
     * @type {number}
     */let l=void 0!==t.opacity?t.opacity:1,a=void 0!==t.rotation?t.rotation:0,h=void 0!==t.scale?t.scale:1,u=void 0!==t.rotateWithView&&t.rotateWithView;super({opacity:l,rotation:a,scale:h,displacement:void 0!==t.displacement?t.displacement:[0,0],rotateWithView:u,declutterMode:t.declutterMode}),/**
     * @private
     * @type {Array<number>}
     */this.anchor_=void 0!==t.anchor?t.anchor:[.5,.5],/**
     * @private
     * @type {Array<number>}
     */this.normalizedAnchor_=null,/**
     * @private
     * @type {IconOrigin}
     */this.anchorOrigin_=void 0!==t.anchorOrigin?t.anchorOrigin:"top-left",/**
     * @private
     * @type {IconAnchorUnits}
     */this.anchorXUnits_=void 0!==t.anchorXUnits?t.anchorXUnits:"fraction",/**
     * @private
     * @type {IconAnchorUnits}
     */this.anchorYUnits_=void 0!==t.anchorYUnits?t.anchorYUnits:"fraction",/**
     * @private
     * @type {?string}
     */this.crossOrigin_=void 0!==t.crossOrigin?t.crossOrigin:null;let d=void 0!==t.img?t.img:null,c=t.src;/**
     * Calculate the scale if width or height were given.
     */if(z(!(void 0!==c&&d),"`image` and `src` cannot be provided at the same time"),(void 0===c||0===c.length)&&d&&(c=/** @type {HTMLImageElement} */d.src||k(d)),z(void 0!==c&&c.length>0,"A defined and non-empty `src` or `image` must be provided"),z(!((void 0!==t.width||void 0!==t.height)&&void 0!==t.scale),"`width` or `height` cannot be provided together with `scale`"),void 0!==t.src?s=ey.IDLE:void 0!==d&&(s=d instanceof HTMLImageElement?d.complete?d.src?ey.LOADED:ey.IDLE:ey.LOADING:ey.LOADED),/**
     * @private
     * @type {import("../color.js").Color}
     */this.color_=void 0!==t.color?eI(t.color):null,/**
     * @private
     * @type {import("./IconImage.js").default}
     */this.iconImage_=(e=/** @type {string} */c,i=this.crossOrigin_,n=s,r=this.color_,(o=void 0===e?void 0:eD.get(e,i,r))||(o=new eN(d,d instanceof HTMLImageElement?d.src||void 0:e,i,n,r),eD.set(e,i,r,o)),o),/**
     * @private
     * @type {Array<number>}
     */this.offset_=void 0!==t.offset?t.offset:[0,0],/**
     * @private
     * @type {IconOrigin}
     */this.offsetOrigin_=void 0!==t.offsetOrigin?t.offsetOrigin:"top-left",/**
     * @private
     * @type {Array<number>}
     */this.origin_=null,/**
     * @private
     * @type {import("../size.js").Size}
     */this.size_=void 0!==t.size?t.size:null,void 0!==t.width||void 0!==t.height){let e,i;if(t.size)[e,i]=t.size;else{let n=this.getImage(1);if(n.width&&n.height)e=n.width,i=n.height;else if(n instanceof HTMLImageElement){this.initialOptions_=t;let e=()=>{if(this.unlistenImageChange(e),!this.initialOptions_)return;let i=this.iconImage_.getSize();this.setScale(eG(i[0],i[1],t.width,t.height))};this.listenImageChange(e);return}}void 0!==e&&this.setScale(eG(e,i,t.width,t.height))}}/**
   * Clones the style. The underlying Image/HTMLCanvasElement is not cloned.
   * @return {Icon} The cloned style.
   * @api
   */clone(){let t,e,i;return this.initialOptions_?(e=this.initialOptions_.width,i=this.initialOptions_.height):t=Array.isArray(t=this.getScale())?t.slice():t,new ez({anchor:this.anchor_.slice(),anchorOrigin:this.anchorOrigin_,anchorXUnits:this.anchorXUnits_,anchorYUnits:this.anchorYUnits_,color:this.color_&&this.color_.slice?this.color_.slice():this.color_||void 0,crossOrigin:this.crossOrigin_,offset:this.offset_.slice(),offsetOrigin:this.offsetOrigin_,opacity:this.getOpacity(),rotateWithView:this.getRotateWithView(),rotation:this.getRotation(),scale:t,width:e,height:i,size:null!==this.size_?this.size_.slice():void 0,src:this.getSrc(),displacement:this.getDisplacement().slice(),declutterMode:this.getDeclutterMode()})}/**
   * Get the anchor point in pixels. The anchor determines the center point for the
   * symbolizer.
   * @return {Array<number>} Anchor.
   * @api
   */getAnchor(){let t=this.normalizedAnchor_;if(!t){t=this.anchor_;let e=this.getSize();if("fraction"==this.anchorXUnits_||"fraction"==this.anchorYUnits_){if(!e)return null;t=this.anchor_.slice(),"fraction"==this.anchorXUnits_&&(t[0]*=e[0]),"fraction"==this.anchorYUnits_&&(t[1]*=e[1])}if("top-left"!=this.anchorOrigin_){if(!e)return null;t===this.anchor_&&(t=this.anchor_.slice()),("top-right"==this.anchorOrigin_||"bottom-right"==this.anchorOrigin_)&&(t[0]=-t[0]+e[0]),("bottom-left"==this.anchorOrigin_||"bottom-right"==this.anchorOrigin_)&&(t[1]=-t[1]+e[1])}this.normalizedAnchor_=t}let e=this.getDisplacement(),i=this.getScaleArray();// anchor is scaled by renderer but displacement should not be scaled
// so divide by scale here
return[t[0]-e[0]/i[0],t[1]+e[1]/i[1]]}/**
   * Set the anchor point. The anchor determines the center point for the
   * symbolizer.
   *
   * @param {Array<number>} anchor Anchor.
   * @api
   */setAnchor(t){this.anchor_=t,this.normalizedAnchor_=null}/**
   * Get the icon color.
   * @return {import("../color.js").Color} Color.
   * @api
   */getColor(){return this.color_}/**
   * Get the image icon.
   * @param {number} pixelRatio Pixel ratio.
   * @return {HTMLImageElement|HTMLCanvasElement|ImageBitmap} Image or Canvas element. If the Icon
   * style was configured with `src` or with a not let loaded `img`, an `ImageBitmap` will be returned.
   * @api
   */getImage(t){return this.iconImage_.getImage(t)}/**
   * Get the pixel ratio.
   * @param {number} pixelRatio Pixel ratio.
   * @return {number} The pixel ratio of the image.
   * @api
   */getPixelRatio(t){return this.iconImage_.getPixelRatio(t)}/**
   * @return {import("../size.js").Size} Image size.
   */getImageSize(){return this.iconImage_.getSize()}/**
   * @return {import("../ImageState.js").default} Image state.
   */getImageState(){return this.iconImage_.getImageState()}/**
   * @return {HTMLImageElement|HTMLCanvasElement|ImageBitmap} Image element.
   */getHitDetectionImage(){return this.iconImage_.getHitDetectionImage()}/**
   * Get the origin of the symbolizer.
   * @return {Array<number>} Origin.
   * @api
   */getOrigin(){if(this.origin_)return this.origin_;let t=this.offset_;if("top-left"!=this.offsetOrigin_){let e=this.getSize(),i=this.iconImage_.getSize();if(!e||!i)return null;t=t.slice(),("top-right"==this.offsetOrigin_||"bottom-right"==this.offsetOrigin_)&&(t[0]=i[0]-e[0]-t[0]),("bottom-left"==this.offsetOrigin_||"bottom-right"==this.offsetOrigin_)&&(t[1]=i[1]-e[1]-t[1])}return this.origin_=t,this.origin_}/**
   * Get the image URL.
   * @return {string|undefined} Image src.
   * @api
   */getSrc(){return this.iconImage_.getSrc()}/**
   * Get the size of the icon (in pixels).
   * @return {import("../size.js").Size} Image size.
   * @api
   */getSize(){return this.size_?this.size_:this.iconImage_.getSize()}/**
   * Get the width of the icon (in pixels). Will return undefined when the icon image is not yet loaded.
   * @return {number} Icon width (in pixels).
   * @api
   */getWidth(){let t=this.getScaleArray();return this.size_?this.size_[0]*t[0]:this.iconImage_.getImageState()==ey.LOADED?this.iconImage_.getSize()[0]*t[0]:void 0}/**
   * Get the height of the icon (in pixels). Will return undefined when the icon image is not yet loaded.
   * @return {number} Icon height (in pixels).
   * @api
   */getHeight(){let t=this.getScaleArray();return this.size_?this.size_[1]*t[1]:this.iconImage_.getImageState()==ey.LOADED?this.iconImage_.getSize()[1]*t[1]:void 0}/**
   * Set the scale.
   *
   * @param {number|import("../size.js").Size} scale Scale.
   * @api
   */setScale(t){delete this.initialOptions_,super.setScale(t)}/**
   * @param {function(import("../events/Event.js").default): void} listener Listener function.
   */listenImageChange(t){this.iconImage_.addEventListener(L.CHANGE,t)}/**
   * Load not yet loaded URI.
   * When rendering a feature with an icon style, the vector renderer will
   * automatically call this method. However, you might want to call this
   * method yourself for preloading or other purposes.
   * @api
   */load(){this.iconImage_.load()}/**
   * @param {function(import("../events/Event.js").default): void} listener Listener function.
   */unlistenImageChange(t){this.iconImage_.removeEventListener(L.CHANGE,t)}}function eX(t){let e;return"XY"==t?e=2:"XYZ"==t||"XYM"==t?e=3:"XYZM"==t&&(e=4),/** @type {number} */e}var eW=/**
 * @module ol/geom/LineString
 *//**
 * @module ol/geom/SimpleGeometry
 *//**
 * @classdesc
 * Abstract base class; only used for creating subclasses; do not instantiate
 * in apps, as cannot be rendered.
 *
 * @abstract
 * @api
 */class extends e_{constructor(){super(),/**
     * @protected
     * @type {import("./Geometry.js").GeometryLayout}
     */this.layout="XY",/**
     * @protected
     * @type {number}
     */this.stride=2,/**
     * @protected
     * @type {Array<number>}
     */this.flatCoordinates=null}/**
   * @param {import("../extent.js").Extent} extent Extent.
   * @protected
   * @return {import("../extent.js").Extent} extent Extent.
   */computeExtent(t){return tf(this.flatCoordinates,0,this.flatCoordinates.length,this.stride,t)}/**
   * @abstract
   * @return {Array<*> | null} Coordinates.
   */getCoordinates(){return O()}/**
   * Return the first coordinate of the geometry.
   * @return {import("../coordinate.js").Coordinate} First coordinate.
   * @api
   */getFirstCoordinate(){return this.flatCoordinates.slice(0,this.stride)}/**
   * @return {Array<number>} Flat coordinates.
   */getFlatCoordinates(){return this.flatCoordinates}/**
   * Return the last coordinate of the geometry.
   * @return {import("../coordinate.js").Coordinate} Last point.
   * @api
   */getLastCoordinate(){return this.flatCoordinates.slice(this.flatCoordinates.length-this.stride)}/**
   * Return the {@link import("./Geometry.js").GeometryLayout layout} of the geometry.
   * @return {import("./Geometry.js").GeometryLayout} Layout.
   * @api
   */getLayout(){return this.layout}/**
   * Create a simplified version of this geometry using the Douglas Peucker algorithm.
   * @param {number} squaredTolerance Squared tolerance.
   * @return {SimpleGeometry} Simplified geometry.
   */getSimplifiedGeometry(t){// If squaredTolerance is negative or if we know that simplification will not
// have any effect then just return this.
if(this.simplifiedGeometryRevision!==this.getRevision()&&(this.simplifiedGeometryMaxMinSquaredTolerance=0,this.simplifiedGeometryRevision=this.getRevision()),t<0||0!==this.simplifiedGeometryMaxMinSquaredTolerance&&t<=this.simplifiedGeometryMaxMinSquaredTolerance)return this;let e=this.getSimplifiedGeometryInternal(t),i=e.getFlatCoordinates();return i.length<this.flatCoordinates.length?e:(// Simplification did not actually remove any coordinates.  We now know
// that any calls to getSimplifiedGeometry with a squaredTolerance less
// than or equal to the current squaredTolerance will also not have any
// effect.  This allows us to short circuit simplification (saving CPU
// cycles) and prevents the cache of simplified geometries from filling
// up with useless identical copies of this geometry (saving memory).
this.simplifiedGeometryMaxMinSquaredTolerance=t,this)}/**
   * @param {number} squaredTolerance Squared tolerance.
   * @return {SimpleGeometry} Simplified geometry.
   * @protected
   */getSimplifiedGeometryInternal(t){return this}/**
   * @return {number} Stride.
   */getStride(){return this.stride}/**
   * @param {import("./Geometry.js").GeometryLayout} layout Layout.
   * @param {Array<number>} flatCoordinates Flat coordinates.
   */setFlatCoordinates(t,e){this.stride=eX(t),this.layout=t,this.flatCoordinates=e}/**
   * @abstract
   * @param {!Array<*>} coordinates Coordinates.
   * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
   */setCoordinates(t,e){O()}/**
   * @param {import("./Geometry.js").GeometryLayout|undefined} layout Layout.
   * @param {Array<*>} coordinates Coordinates.
   * @param {number} nesting Nesting.
   * @protected
   */setLayout(t,e,i){/** @type {number} */let n;if(t)n=eX(t);else{var r;let s;for(let t=0;t<i;++t){if(0===e.length){this.layout="XY",this.stride=2;return}e=/** @type {Array} */e[0]}2==(r=n=e.length)?s="XY":3==r?s="XYZ":4==r&&(s="XYZM"),t=/** @type {import("./Geometry.js").GeometryLayout} */s}this.layout=t,this.stride=n}/**
   * Apply a transform function to the coordinates of the geometry.
   * The geometry is modified in place.
   * If you do not want the geometry modified in place, first `clone()` it and
   * then use this function on the clone.
   * @param {import("../proj.js").TransformFunction} transformFn Transform function.
   * Called with a flat array of geometry coordinates.
   * @api
   */applyTransform(t){this.flatCoordinates&&(t(this.flatCoordinates,this.flatCoordinates,this.stride),this.changed())}/**
   * Rotate the geometry around a given coordinate. This modifies the geometry
   * coordinates in place.
   * @param {number} angle Rotation angle in counter-clockwise radians.
   * @param {import("../coordinate.js").Coordinate} anchor The rotation center.
   * @api
   */rotate(t,e){let i=this.getFlatCoordinates();if(i){let n=this.getStride();eg(i,0,i.length,n,t,e,i),this.changed()}}/**
   * Scale the geometry (with an optional origin).  This modifies the geometry
   * coordinates in place.
   * @param {number} sx The scaling factor in the x-direction.
   * @param {number} [sy] The scaling factor in the y-direction (defaults to sx).
   * @param {import("../coordinate.js").Coordinate} [anchor] The scale origin (defaults to the center
   *     of the geometry extent).
   * @api
   */scale(t,e,i){void 0===e&&(e=t),i||(i=tS(this.getExtent()));let n=this.getFlatCoordinates();if(n){let r=this.getStride();!function(t,e,i,n,r,s,o,l){l=l||[];let a=o[0],h=o[1],u=0;for(let e=0;e<i;e+=n){let i=t[e]-a,o=t[e+1]-h;l[u++]=a+r*i,l[u++]=h+s*o;for(let i=e+2;i<e+n;++i)l[u++]=t[i]}l&&l.length!=u&&(l.length=u)}(n,0,n.length,r,t,e,i,n),this.changed()}}/**
   * Translate the geometry.  This modifies the geometry coordinates in place.  If
   * instead you want a new geometry, first `clone()` this geometry.
   * @param {number} deltaX Delta X.
   * @param {number} deltaY Delta Y.
   * @api
   */translate(t,e){let i=this.getFlatCoordinates();if(i){let n=this.getStride();!function(t,e,i,n,r,s,o){o=o||[];let l=0;for(let e=0;e<i;e+=n){o[l++]=t[e]+r,o[l++]=t[e+1]+s;for(let i=e+2;i<e+n;++i)o[l++]=t[i]}o&&o.length!=l&&(o.length=l)}(i,0,i.length,n,t,e,i),this.changed()}}};/**
 * @module ol/geom/flat/closest
 *//**
 * Returns the point on the 2D line segment flatCoordinates[offset1] to
 * flatCoordinates[offset2] that is closest to the point (x, y).  Extra
 * dimensions are linearly interpolated.
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset1 Offset 1.
 * @param {number} offset2 Offset 2.
 * @param {number} stride Stride.
 * @param {number} x X.
 * @param {number} y Y.
 * @param {Array<number>} closestPoint Closest point.
 */function eY(t,e,i,n,r,s,o){let l;let a=t[e],h=t[e+1],u=t[i]-a,d=t[i+1]-h;if(0===u&&0===d)l=e;else{let g=((r-a)*u+(s-h)*d)/(u*u+d*d);if(g>1)l=i;else if(g>0){for(let r=0;r<n;++r){var c;o[r]=(c=t[e+r])+g*(t[i+r]-c)}o.length=n;return}else l=e}for(let e=0;e<n;++e)o[e]=t[l+e];o.length=n}function eU(t,e,i,n,r){let s=t[e],o=t[e+1];for(e+=n;e<i;e+=n){let i=t[e],n=t[e+1],l=tq(s,o,i,n);l>r&&(r=l),s=i,o=n}return r}function ej(t,e,i,n,r){for(let s=0,o=i.length;s<o;++s){let o=i[s];r=eU(t,e,o,n,r),e=o}return r}function eB(t,e,i,n,r,s,o,l,a,h,u){let d,c;if(e==i)return h;if(0===r){if(// All points are identical, so just test the first point.
(c=tq(o,l,t[e],t[e+1]))<h){for(d=0;d<n;++d)a[d]=t[e+d];return a.length=n,c}return h}u=u||[NaN,NaN];let g=e+n;for(;g<i;)if(eY(t,g-n,g,n,o,l,u),(c=tq(o,l,u[0],u[1]))<h){for(d=0,h=c;d<n;++d)a[d]=u[d];a.length=n,g+=n}else // points cannot be any closer than the closest point we have found so
// far.  We know this because we know how close the current point is, how
// close the closest point we have found so far is, and the maximum
// distance between consecutive points.  For example, if we're currently
// at distance 10, the best we've found so far is 3, and that the maximum
// distance between consecutive points is 2, then we'll need to skip at
// least (10 - 3) / 2 == 3 (rounded down) points to have any chance of
// finding a closer point.  We use Math.max(..., 1) to ensure that we
// always advance at least one point, to avoid an infinite loop.
g+=n*Math.max((Math.sqrt(c)-Math.sqrt(h))/r|0,1);if(s&&(// Check the closing segment.
eY(t,i-n,e,n,o,l,u),(c=tq(o,l,u[0],u[1]))<h)){for(d=0,h=c;d<n;++d)a[d]=u[d];a.length=n}return h}function eK(t,e,i,n,r,s,o,l,a,h,u){u=u||[NaN,NaN];for(let d=0,c=i.length;d<c;++d){let c=i[d];h=eB(t,e,c,n,r,s,o,l,a,h,u),e=c}return h}function eZ(t,e,i,n){for(let r=0,s=i.length;r<s;++r){let s=i[r];for(let i=0;i<n;++i)t[e++]=s[i]}return e}function eV(t,e,i,n,r){r=r||[];let s=0;for(let o=0,l=i.length;o<l;++o){let l=eZ(t,e,i[o],n);r[s++]=l,e=l}return r.length=s,r}function eH(t,e,i,n,r,s,o){let l=(i-e)/n;if(l<3){for(;e<i;e+=n)s[o++]=t[e],s[o++]=t[e+1];return o}/** @type {Array<number>} */let a=Array(l);a[0]=1,a[l-1]=1;/** @type {Array<number>} */let h=[e,i-n],u=0;for(;h.length>0;){let i=h.pop(),s=h.pop(),o=0,l=t[s],d=t[s+1],c=t[i],g=t[i+1];for(let e=s+n;e<i;e+=n){let i=t[e],n=t[e+1],r=function(t,e,i,n,r,s){let o=r-i,l=s-n;if(0!==o||0!==l){let a=((t-i)*o+(e-n)*l)/(o*o+l*l);a>1?(i=r,n=s):a>0&&(i+=o*a,n+=l*a)}return tq(t,e,i,n)}(i,n,l,d,c,g);r>o&&(u=e,o=r)}o>r&&(a[(u-e)/n]=1,s+n<u&&h.push(s,u),u+n<i&&h.push(u,i))}for(let i=0;i<l;++i)a[i]&&(s[o++]=t[e+i*n],s[o++]=t[e+i*n+1]);return o}function eq(t,e){return e*Math.round(t/e)}function eJ(t,e,i,n,r,s,o,l){for(let a=0,h=i.length;a<h;++a){let h=i[a];o=function(t,e,i,n,r,s,o){let l,a;// do nothing if the line is empty
if(e==i)return o;// snap the first coordinate (P1)
let h=eq(t[e],r),u=eq(t[e+1],r);e+=n,// add the first coordinate to the output
s[o++]=h,s[o++]=u;do if(l=eq(t[e],r),a=eq(t[e+1],r),(e+=n)==i)return(// all coordinates snap to the same value, the line collapses to a point
// push the last snapped value anyway to ensure that the output contains
// at least two points
// FIXME should we really return at least two points anyway?
s[o++]=l,s[o++]=a,o);while(l==h&&a==u)for(;e<i;){// snap the next coordinate (P3)
let i=eq(t[e],r),d=eq(t[e+1],r);// skip P3 if it is equal to P2
if(e+=n,i==l&&d==a)continue;// calculate the delta between P1 and P2
let c=l-h,g=a-u,f=i-h,_=d-u;// if P1, P2, and P3 are colinear and P3 is further from P1 than P2 is from
// P1 in the same direction then P2 is on the straight line between P1 and
// P3
if(c*_==g*f&&(c<0&&f<c||c==f||c>0&&f>c)&&(g<0&&_<g||g==_||g>0&&_>g)){// discard P2 and set P2 = P3
l=i,a=d;continue}// either P1, P2, and P3 are not colinear, or they are colinear but P3 is
// between P3 and P1 or on the opposite half of the line to P2.  add P2,
// and continue with P1 = P2 and P2 = P3
s[o++]=l,s[o++]=a,h=l,u=a,l=i,a=d}return(// add the last point (P2)
s[o++]=l,s[o++]=a,o)}(t,e,h,n,r,s,o),l.push(o),e=h}return o}/**
 * @module ol/geom/flat/segments
 *//**
 * This function calls `callback` for each segment of the flat coordinates
 * array. If the callback returns a truthy value the function returns that
 * value immediately. Otherwise the function returns `false`.
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {function(import("../../coordinate.js").Coordinate, import("../../coordinate.js").Coordinate): T} callback Function
 *     called for each segment.
 * @return {T|boolean} Value.
 * @template T
 */function e$(t,e,i,n,r){let s;for(e+=n;e<i;e+=n)if(s=r(t.slice(e-n,e),t.slice(e,e+n)))return s;return!1}/**
 * @module ol/geom/flat/inflate
 *//**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {Array<import("../../coordinate.js").Coordinate>} [coordinates] Coordinates.
 * @return {Array<import("../../coordinate.js").Coordinate>} Coordinates.
 */function eQ(t,e,i,n,r){r=void 0!==r?r:[];let s=0;for(let o=e;o<i;o+=n)r[s++]=t.slice(o,o+n);return r.length=s,r}function e0(t,e,i,n,r){r=void 0!==r?r:[];let s=0;for(let o=0,l=i.length;o<l;++o){let l=i[o];r[s++]=eQ(t,e,l,n,r[s]),e=l}return r.length=s,r}function e1(t,e,i,n,r){r=void 0!==r?r:[];let s=0;for(let o=0,l=i.length;o<l;++o){let l=i[o];r[s++]=1===l.length&&l[0]===e?[]:e0(t,e,l,n,r[s]),e=l[l.length-1]}return r.length=s,r}/**
 * @module ol/geom/flat/interpolate
 */function e2(t,e,i,n,r,s,o){let l,a;let h=(i-e)/n;if(1===h)l=e;else if(2===h)l=e,a=r;else if(0!==h){let s=t[e],o=t[e+1],h=0,u=[0];for(let r=e+n;r<i;r+=n){let e=t[r],i=t[r+1];h+=Math.sqrt((e-s)*(e-s)+(i-o)*(i-o)),u.push(h),s=e,o=i}let d=r*h,c=/**
 * @module ol/functions
 *//**
 * @module ol/array
 *//**
 * Performs a binary search on the provided sorted list and returns the index of the item if found. If it can't be found it'll return -1.
 * https://github.com/darkskyapp/binary-search
 *
 * @param {Array<*>} haystack Items to search through.
 * @param {*} needle The item to look for.
 * @param {Function} [comparator] Comparator function.
 * @return {number} The index of the item if found, -1 if not.
 */function(t,e,i){let n,r;i=i||x;let s=0,o=t.length,l=!1;for(;s<o;)(r=+i(t[/* Note that "(low + high) >>> 1" may overflow, and results in a typecast
     * to double (which gives the wrong results). */n=s+(o-s>>1)],e))<0?/* Too low. */s=n+1:(/* Key found or too high */o=n,l=!r);/* Key not found. */return l?s:~s}(u,d);c<0?(a=(d-u[-c-2])/(u[-c-1]-u[-c-2]),l=e+(-c-2)*n):l=e+c*n}o=o>1?o:2,s=s||Array(o);for(let e=0;e<o;++e){var u;s[e]=void 0===l?NaN:void 0===a?t[l+e]:(u=t[l+e])+a*(t[l+n+e]-u)}return s}function e3(t,e,i,n,r,s){let o;if(i==e)return null;if(r<t[e+n-1])return s?((o=t.slice(e,e+n))[n-1]=r,o):null;if(t[i-1]<r)return s?((o=t.slice(i-n,i))[n-1]=r,o):null;// FIXME use O(1) search
if(r==t[e+n-1])return t.slice(e,e+n);let l=e/n,a=i/n;for(;l<a;){let e=l+a>>1;r<t[(e+1)*n-1]?a=e:l=e+1}let h=t[l*n-1];if(r==h)return t.slice((l-1)*n,(l-1)*n+n);let u=t[(l+1)*n-1],d=(r-h)/(u-h);o=[];for(let e=0;e<n-1;++e){var c;o.push((c=t[(l-1)*n+e])+d*(t[l*n+e]-c))}return o.push(r),o}function e5(t,e,i,n,r,s){// https://geomalgorithms.com/a03-_inclusion.html
// Copyright 2000 softSurfer, 2012 Dan Sunday
// This code may be freely used and modified for any purpose
// providing that this copyright notice is included with it.
// SoftSurfer makes no warranty for this code, and cannot be held
// liable for any real or imagined damage resulting from its use.
// Users of this code must verify correctness for their application.
let o=0,l=t[i-n],a=t[i-n+1];for(;e<i;e+=n){let i=t[e],n=t[e+1];a<=s?n>s&&(i-l)*(s-a)-(r-l)*(n-a)>0&&o++:n<=s&&(i-l)*(s-a)-(r-l)*(n-a)<0&&o--,l=i,a=n}return 0!==o}function e4(t,e,i,n,r,s){if(0===i.length||!e5(t,e,i[0],n,r,s))return!1;for(let e=1,o=i.length;e<o;++e)if(e5(t,i[e-1],i[e],n,r,s))return!1;return!0}function e6(t,e,i,n,r){let s=ty(td(),t,e,i,n);return!!tA(r,s)&&(!!ta(r,s)||s[0]>=r[0]&&s[2]<=r[2]||s[1]>=r[1]&&s[3]<=r[3]||e$(t,e,i,n,/**
     * @param {import("../../coordinate.js").Coordinate} point1 Start point.
     * @param {import("../../coordinate.js").Coordinate} point2 End point.
     * @return {boolean} `true` if the segment and the extent intersect,
     *     `false` otherwise.
     */function(t,e){return function(t,e,i){let n=!1,r=tu(t,e),s=tu(t,i);if(r===ti.INTERSECTING||s===ti.INTERSECTING)n=!0;else{let o,l;let a=t[0],h=t[1],u=t[2],d=t[3],c=e[0],g=e[1],f=i[0],_=i[1],m=(_-g)/(f-c);s&ti.ABOVE&&!(r&ti.ABOVE)&&(n=// potentially intersects top
(o=f-(_-d)/m)>=a&&o<=u),n||!(s&ti.RIGHT)||r&ti.RIGHT||(n=// potentially intersects right
(l=_-(f-u)*m)>=h&&l<=d),n||!(s&ti.BELOW)||r&ti.BELOW||(n=// potentially intersects bottom
(o=f-(_-h)/m)>=a&&o<=u),n||!(s&ti.LEFT)||r&ti.LEFT||(n=// potentially intersects left
(l=_-(f-a)*m)>=h&&l<=d)}return n}(r,t,e)}))}function e8(t,e,i,n,r){return!!(e6(t,e,i,n,r)||e5(t,e,i,n,r[0],r[1])||e5(t,e,i,n,r[0],r[3])||e5(t,e,i,n,r[2],r[1])||e5(t,e,i,n,r[2],r[3]))}function e7(t,e,i,n,r){if(!e8(t,e,i[0],n,r))return!1;if(1===i.length)return!0;for(let e=1,s=i.length;e<s;++e)if(/**
 * @module ol/geom/flat/intersectsextent
 *//**
 * @module ol/geom/flat/contains
 */function(t,e,i,n,r){let s=tx(r,/**
     * @param {import("../../coordinate.js").Coordinate} coordinate Coordinate.
     * @return {boolean} Contains (x, y).
     */function(r){return!e5(t,e,i,n,r[0],r[1])});return!s}(t,i[e-1],i[e],n,r)&&!e6(t,i[e-1],i[e],n,r))return!1;return!0}/**
 * @module ol/geom/flat/length
 *//**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @return {number} Length.
 */function e9(t,e,i,n){let r=t[e],s=t[e+1],o=0;for(let l=e+n;l<i;l+=n){let e=t[l],i=t[l+1];o+=Math.sqrt((e-r)*(e-r)+(i-s)*(i-s)),r=e,s=i}return o}/**
 * @classdesc
 * Linestring geometry.
 *
 * @api
 */class it extends eW{/**
   * @param {Array<import("../coordinate.js").Coordinate>|Array<number>} coordinates Coordinates.
   *     For internal use, flat coordinates in combination with `layout` are also accepted.
   * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
   */constructor(t,e){super(),/**
     * @private
     * @type {import("../coordinate.js").Coordinate}
     */this.flatMidpoint_=null,/**
     * @private
     * @type {number}
     */this.flatMidpointRevision_=-1,/**
     * @private
     * @type {number}
     */this.maxDelta_=-1,/**
     * @private
     * @type {number}
     */this.maxDeltaRevision_=-1,void 0===e||Array.isArray(t[0])?this.setCoordinates(/** @type {Array<import("../coordinate.js").Coordinate>} */t,e):this.setFlatCoordinates(e,/** @type {Array<number>} */t)}/**
   * Append the passed coordinate to the coordinates of the linestring.
   * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
   * @api
   */appendCoordinate(t){this.flatCoordinates?E(this.flatCoordinates,t):this.flatCoordinates=t.slice(),this.changed()}/**
   * Make a complete copy of the geometry.
   * @return {!LineString} Clone.
   * @api
   */clone(){let t=new it(this.flatCoordinates.slice(),this.layout);return t.applyProperties(this),t}/**
   * @param {number} x X.
   * @param {number} y Y.
   * @param {import("../coordinate.js").Coordinate} closestPoint Closest point.
   * @param {number} minSquaredDistance Minimum squared distance.
   * @return {number} Minimum squared distance.
   */closestPointXY(t,e,i,n){return n<to(this.getExtent(),t,e)?n:(this.maxDeltaRevision_!=this.getRevision()&&(this.maxDelta_=Math.sqrt(eU(this.flatCoordinates,0,this.flatCoordinates.length,this.stride,0)),this.maxDeltaRevision_=this.getRevision()),eB(this.flatCoordinates,0,this.flatCoordinates.length,this.stride,this.maxDelta_,!1,t,e,i,n))}/**
   * Iterate over each segment, calling the provided callback.
   * If the callback returns a truthy value the function returns that
   * value immediately. Otherwise the function returns `false`.
   *
   * @param {function(this: S, import("../coordinate.js").Coordinate, import("../coordinate.js").Coordinate): T} callback Function
   *     called for each segment. The function will receive two arguments, the start and end coordinates of the segment.
   * @return {T|boolean} Value.
   * @template T,S
   * @api
   */forEachSegment(t){return e$(this.flatCoordinates,0,this.flatCoordinates.length,this.stride,t)}/**
   * Returns the coordinate at `m` using linear interpolation, or `null` if no
   * such coordinate exists.
   *
   * `extrapolate` controls extrapolation beyond the range of Ms in the
   * MultiLineString. If `extrapolate` is `true` then Ms less than the first
   * M will return the first coordinate and Ms greater than the last M will
   * return the last coordinate.
   *
   * @param {number} m M.
   * @param {boolean} [extrapolate] Extrapolate. Default is `false`.
   * @return {import("../coordinate.js").Coordinate|null} Coordinate.
   * @api
   */getCoordinateAtM(t,e){return"XYM"!=this.layout&&"XYZM"!=this.layout?null:(e=void 0!==e&&e,e3(this.flatCoordinates,0,this.flatCoordinates.length,this.stride,t,e))}/**
   * Return the coordinates of the linestring.
   * @return {Array<import("../coordinate.js").Coordinate>} Coordinates.
   * @api
   */getCoordinates(){return eQ(this.flatCoordinates,0,this.flatCoordinates.length,this.stride)}/**
   * Return the coordinate at the provided fraction along the linestring.
   * The `fraction` is a number between 0 and 1, where 0 is the start of the
   * linestring and 1 is the end.
   * @param {number} fraction Fraction.
   * @param {import("../coordinate.js").Coordinate} [dest] Optional coordinate whose values will
   *     be modified. If not provided, a new coordinate will be returned.
   * @return {import("../coordinate.js").Coordinate} Coordinate of the interpolated point.
   * @api
   */getCoordinateAt(t,e){return e2(this.flatCoordinates,0,this.flatCoordinates.length,this.stride,t,e,this.stride)}/**
   * Return the length of the linestring on projected plane.
   * @return {number} Length (on projected plane).
   * @api
   */getLength(){return e9(this.flatCoordinates,0,this.flatCoordinates.length,this.stride)}/**
   * @return {Array<number>} Flat midpoint.
   */getFlatMidpoint(){return this.flatMidpointRevision_!=this.getRevision()&&(this.flatMidpoint_=this.getCoordinateAt(.5,this.flatMidpoint_),this.flatMidpointRevision_=this.getRevision()),this.flatMidpoint_}/**
   * @param {number} squaredTolerance Squared tolerance.
   * @return {LineString} Simplified LineString.
   * @protected
   */getSimplifiedGeometryInternal(t){let e=[];return e.length=eH(this.flatCoordinates,0,this.flatCoordinates.length,this.stride,t,e,0),new it(e,"XY")}/**
   * Get the type of this geometry.
   * @return {import("./Geometry.js").Type} Geometry type.
   * @api
   */getType(){return"LineString"}/**
   * Test if the geometry and the passed extent intersect.
   * @param {import("../extent.js").Extent} extent Extent.
   * @return {boolean} `true` if the geometry and the extent intersect.
   * @api
   */intersectsExtent(t){return e6(this.flatCoordinates,0,this.flatCoordinates.length,this.stride,t)}/**
   * Set the coordinates of the linestring.
   * @param {!Array<import("../coordinate.js").Coordinate>} coordinates Coordinates.
   * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
   * @api
   */setCoordinates(t,e){this.setLayout(e,t,1),this.flatCoordinates||(this.flatCoordinates=[]),this.flatCoordinates.length=eZ(this.flatCoordinates,0,t,this.stride),this.changed()}}/**
 * @module ol/geom/MultiLineString
 *//**
 * @classdesc
 * Multi-linestring geometry.
 *
 * @api
 */class ie extends eW{/**
   * @param {Array<Array<import("../coordinate.js").Coordinate>|LineString>|Array<number>} coordinates
   *     Coordinates or LineString geometries. (For internal use, flat coordinates in
   *     combination with `layout` and `ends` are also accepted.)
   * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
   * @param {Array<number>} [ends] Flat coordinate ends for internal use.
   */constructor(t,e,i){if(super(),/**
     * @type {Array<number>}
     * @private
     */this.ends_=[],/**
     * @private
     * @type {number}
     */this.maxDelta_=-1,/**
     * @private
     * @type {number}
     */this.maxDeltaRevision_=-1,Array.isArray(t[0]))this.setCoordinates(/** @type {Array<Array<import("../coordinate.js").Coordinate>>} */t,e);else if(void 0!==e&&i)this.setFlatCoordinates(e,/** @type {Array<number>} */t),this.ends_=i;else{let e=this.getLayout(),i=[],n=[];for(let r=0,s=/** @type {Array<LineString>} */t.length;r<s;++r){let s=t[r];0===r&&(e=s.getLayout()),E(i,s.getFlatCoordinates()),n.push(i.length)}this.setFlatCoordinates(e,i),this.ends_=n}}/**
   * Append the passed linestring to the multilinestring.
   * @param {LineString} lineString LineString.
   * @api
   */appendLineString(t){this.flatCoordinates?E(this.flatCoordinates,t.getFlatCoordinates().slice()):this.flatCoordinates=t.getFlatCoordinates().slice(),this.ends_.push(this.flatCoordinates.length),this.changed()}/**
   * Make a complete copy of the geometry.
   * @return {!MultiLineString} Clone.
   * @api
   */clone(){let t=new ie(this.flatCoordinates.slice(),this.layout,this.ends_.slice());return t.applyProperties(this),t}/**
   * @param {number} x X.
   * @param {number} y Y.
   * @param {import("../coordinate.js").Coordinate} closestPoint Closest point.
   * @param {number} minSquaredDistance Minimum squared distance.
   * @return {number} Minimum squared distance.
   */closestPointXY(t,e,i,n){return n<to(this.getExtent(),t,e)?n:(this.maxDeltaRevision_!=this.getRevision()&&(this.maxDelta_=Math.sqrt(ej(this.flatCoordinates,0,this.ends_,this.stride,0)),this.maxDeltaRevision_=this.getRevision()),eK(this.flatCoordinates,0,this.ends_,this.stride,this.maxDelta_,!1,t,e,i,n))}/**
   * Returns the coordinate at `m` using linear interpolation, or `null` if no
   * such coordinate exists.
   *
   * `extrapolate` controls extrapolation beyond the range of Ms in the
   * MultiLineString. If `extrapolate` is `true` then Ms less than the first
   * M will return the first coordinate and Ms greater than the last M will
   * return the last coordinate.
   *
   * `interpolate` controls interpolation between consecutive LineStrings
   * within the MultiLineString. If `interpolate` is `true` the coordinates
   * will be linearly interpolated between the last coordinate of one LineString
   * and the first coordinate of the next LineString.  If `interpolate` is
   * `false` then the function will return `null` for Ms falling between
   * LineStrings.
   *
   * @param {number} m M.
   * @param {boolean} [extrapolate] Extrapolate. Default is `false`.
   * @param {boolean} [interpolate] Interpolate. Default is `false`.
   * @return {import("../coordinate.js").Coordinate|null} Coordinate.
   * @api
   */getCoordinateAtM(t,e,i){return"XYM"!=this.layout&&"XYZM"!=this.layout||0===this.flatCoordinates.length?null:(e=void 0!==e&&e,i=void 0!==i&&i,function(t,e,i,n,r,s,o){let l;if(o)return e3(t,e,i[i.length-1],n,r,s);if(r<t[n-1])return s?((l=t.slice(0,n))[n-1]=r,l):null;if(t[t.length-1]<r)return s?((l=t.slice(t.length-n))[n-1]=r,l):null;for(let s=0,o=i.length;s<o;++s){let o=i[s];if(e!=o){if(r<t[e+n-1])return null;if(r<=t[o-1])return e3(t,e,o,n,r,!1);e=o}}return null}(this.flatCoordinates,0,this.ends_,this.stride,t,e,i))}/**
   * Return the coordinates of the multilinestring.
   * @return {Array<Array<import("../coordinate.js").Coordinate>>} Coordinates.
   * @api
   */getCoordinates(){return e0(this.flatCoordinates,0,this.ends_,this.stride)}/**
   * @return {Array<number>} Ends.
   */getEnds(){return this.ends_}/**
   * Return the linestring at the specified index.
   * @param {number} index Index.
   * @return {LineString} LineString.
   * @api
   */getLineString(t){return t<0||this.ends_.length<=t?null:new it(this.flatCoordinates.slice(0===t?0:this.ends_[t-1],this.ends_[t]),this.layout)}/**
   * Return the linestrings of this multilinestring.
   * @return {Array<LineString>} LineStrings.
   * @api
   */getLineStrings(){let t=this.flatCoordinates,e=this.ends_,i=this.layout,n=[],r=0;for(let s=0,o=e.length;s<o;++s){let o=e[s],l=new it(t.slice(r,o),i);n.push(l),r=o}return n}/**
   * @return {Array<number>} Flat midpoints.
   */getFlatMidpoints(){let t=[],e=this.flatCoordinates,i=0,n=this.ends_,r=this.stride;for(let s=0,o=n.length;s<o;++s){let o=n[s],l=e2(e,i,o,r,.5);E(t,l),i=o}return t}/**
   * @param {number} squaredTolerance Squared tolerance.
   * @return {MultiLineString} Simplified MultiLineString.
   * @protected
   */getSimplifiedGeometryInternal(t){let e=[],i=[];return e.length=function(t,e,i,n,r,s,o,l){for(let a=0,h=i.length;a<h;++a){let h=i[a];o=eH(t,e,h,n,r,s,o),l.push(o),e=h}return o}(this.flatCoordinates,0,this.ends_,this.stride,t,e,0,i),new ie(e,"XY",i)}/**
   * Get the type of this geometry.
   * @return {import("./Geometry.js").Type} Geometry type.
   * @api
   */getType(){return"MultiLineString"}/**
   * Test if the geometry and the passed extent intersect.
   * @param {import("../extent.js").Extent} extent Extent.
   * @return {boolean} `true` if the geometry and the extent intersect.
   * @api
   */intersectsExtent(t){return function(t,e,i,n,r){for(let s=0,o=i.length;s<o;++s){if(e6(t,e,i[s],n,r))return!0;e=i[s]}return!1}(this.flatCoordinates,0,this.ends_,this.stride,t)}/**
   * Set the coordinates of the multilinestring.
   * @param {!Array<Array<import("../coordinate.js").Coordinate>>} coordinates Coordinates.
   * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
   * @api
   */setCoordinates(t,e){this.setLayout(e,t,2),this.flatCoordinates||(this.flatCoordinates=[]);let i=eV(this.flatCoordinates,0,t,this.stride,this.ends_);this.flatCoordinates.length=0===i.length?0:i[i.length-1],this.changed()}}/**
 * @module ol/geom/MultiPoint
 *//**
 * @module ol/geom/Point
 *//**
 * @classdesc
 * Point geometry.
 *
 * @api
 */class ii extends eW{/**
   * @param {import("../coordinate.js").Coordinate} coordinates Coordinates.
   * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
   */constructor(t,e){super(),this.setCoordinates(t,e)}/**
   * Make a complete copy of the geometry.
   * @return {!Point} Clone.
   * @api
   */clone(){let t=new ii(this.flatCoordinates.slice(),this.layout);return t.applyProperties(this),t}/**
   * @param {number} x X.
   * @param {number} y Y.
   * @param {import("../coordinate.js").Coordinate} closestPoint Closest point.
   * @param {number} minSquaredDistance Minimum squared distance.
   * @return {number} Minimum squared distance.
   */closestPointXY(t,e,i,n){let r=this.flatCoordinates,s=tq(t,e,r[0],r[1]);if(s<n){let t=this.stride;for(let e=0;e<t;++e)i[e]=r[e];return i.length=t,s}return n}/**
   * Return the coordinate of the point.
   * @return {import("../coordinate.js").Coordinate} Coordinates.
   * @api
   */getCoordinates(){return this.flatCoordinates?this.flatCoordinates.slice():[]}/**
   * @param {import("../extent.js").Extent} extent Extent.
   * @protected
   * @return {import("../extent.js").Extent} extent Extent.
   */computeExtent(t){return function(t,e){let i=t[0],n=t[1];return tc(i,n,i,n,e)}(this.flatCoordinates,t)}/**
   * Get the type of this geometry.
   * @return {import("./Geometry.js").Type} Geometry type.
   * @api
   */getType(){return"Point"}/**
   * Test if the geometry and the passed extent intersect.
   * @param {import("../extent.js").Extent} extent Extent.
   * @return {boolean} `true` if the geometry and the extent intersect.
   * @api
   */intersectsExtent(t){return th(t,this.flatCoordinates[0],this.flatCoordinates[1])}/**
   * @param {!Array<*>} coordinates Coordinates.
   * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
   * @api
   */setCoordinates(t,e){this.setLayout(e,t,0),this.flatCoordinates||(this.flatCoordinates=[]),this.flatCoordinates.length=/**
 * @module ol/geom/flat/deflate
 *//**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {import("../../coordinate.js").Coordinate} coordinate Coordinate.
 * @param {number} stride Stride.
 * @return {number} offset Offset.
 */function(t,e,i,n){for(let n=0,r=i.length;n<r;++n)t[e++]=i[n];return e}(this.flatCoordinates,0,t,this.stride),this.changed()}}/**
 * @classdesc
 * Multi-point geometry.
 *
 * @api
 */class ir extends eW{/**
   * @param {Array<import("../coordinate.js").Coordinate>|Array<number>} coordinates Coordinates.
   *     For internal use, flat coordinates in combination with `layout` are also accepted.
   * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
   */constructor(t,e){super(),e&&!Array.isArray(t[0])?this.setFlatCoordinates(e,/** @type {Array<number>} */t):this.setCoordinates(/** @type {Array<import("../coordinate.js").Coordinate>} */t,e)}/**
   * Append the passed point to this multipoint.
   * @param {Point} point Point.
   * @api
   */appendPoint(t){this.flatCoordinates?E(this.flatCoordinates,t.getFlatCoordinates()):this.flatCoordinates=t.getFlatCoordinates().slice(),this.changed()}/**
   * Make a complete copy of the geometry.
   * @return {!MultiPoint} Clone.
   * @api
   */clone(){let t=new ir(this.flatCoordinates.slice(),this.layout);return t.applyProperties(this),t}/**
   * @param {number} x X.
   * @param {number} y Y.
   * @param {import("../coordinate.js").Coordinate} closestPoint Closest point.
   * @param {number} minSquaredDistance Minimum squared distance.
   * @return {number} Minimum squared distance.
   */closestPointXY(t,e,i,n){if(n<to(this.getExtent(),t,e))return n;let r=this.flatCoordinates,s=this.stride;for(let o=0,l=r.length;o<l;o+=s){let l=tq(t,e,r[o],r[o+1]);if(l<n){n=l;for(let t=0;t<s;++t)i[t]=r[o+t];i.length=s}}return n}/**
   * Return the coordinates of the multipoint.
   * @return {Array<import("../coordinate.js").Coordinate>} Coordinates.
   * @api
   */getCoordinates(){return eQ(this.flatCoordinates,0,this.flatCoordinates.length,this.stride)}/**
   * Return the point at the specified index.
   * @param {number} index Index.
   * @return {Point} Point.
   * @api
   */getPoint(t){let e=this.flatCoordinates?this.flatCoordinates.length/this.stride:0;return t<0||e<=t?null:new ii(this.flatCoordinates.slice(t*this.stride,(t+1)*this.stride),this.layout)}/**
   * Return the points of this multipoint.
   * @return {Array<Point>} Points.
   * @api
   */getPoints(){let t=this.flatCoordinates,e=this.layout,i=this.stride,n=[];for(let r=0,s=t.length;r<s;r+=i){let s=new ii(t.slice(r,r+i),e);n.push(s)}return n}/**
   * Get the type of this geometry.
   * @return {import("./Geometry.js").Type} Geometry type.
   * @api
   */getType(){return"MultiPoint"}/**
   * Test if the geometry and the passed extent intersect.
   * @param {import("../extent.js").Extent} extent Extent.
   * @return {boolean} `true` if the geometry and the extent intersect.
   * @api
   */intersectsExtent(t){let e=this.flatCoordinates,i=this.stride;for(let n=0,r=e.length;n<r;n+=i){let i=e[n],r=e[n+1];if(th(t,i,r))return!0}return!1}/**
   * Set the coordinates of the multipoint.
   * @param {!Array<import("../coordinate.js").Coordinate>} coordinates Coordinates.
   * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
   * @api
   */setCoordinates(t,e){this.setLayout(e,t,1),this.flatCoordinates||(this.flatCoordinates=[]),this.flatCoordinates.length=eZ(this.flatCoordinates,0,t,this.stride),this.changed()}}/**
 * @module ol/geom/MultiPolygon
 *//**
 * @module ol/geom/Polygon
 *//**
 * @module ol/geom/LinearRing
 *//**
 * @module ol/geom/flat/area
 *//**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @return {number} Area.
 */function is(t,e,i,n){let r=0,s=t[i-n],o=t[i-n+1];for(;e<i;e+=n){let i=t[e],n=t[e+1];r+=o*i-s*n,s=i,o=n}return r/2}function io(t,e,i,n){let r=0;for(let s=0,o=i.length;s<o;++s){let o=i[s];r+=is(t,e,o,n),e=o}return r}/**
 * @classdesc
 * Linear ring geometry. Only used as part of polygon; cannot be rendered
 * on its own.
 *
 * @api
 */class il extends eW{/**
   * @param {Array<import("../coordinate.js").Coordinate>|Array<number>} coordinates Coordinates.
   *     For internal use, flat coordinates in combination with `layout` are also accepted.
   * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
   */constructor(t,e){super(),/**
     * @private
     * @type {number}
     */this.maxDelta_=-1,/**
     * @private
     * @type {number}
     */this.maxDeltaRevision_=-1,void 0===e||Array.isArray(t[0])?this.setCoordinates(/** @type {Array<import("../coordinate.js").Coordinate>} */t,e):this.setFlatCoordinates(e,/** @type {Array<number>} */t)}/**
   * Make a complete copy of the geometry.
   * @return {!LinearRing} Clone.
   * @api
   */clone(){return new il(this.flatCoordinates.slice(),this.layout)}/**
   * @param {number} x X.
   * @param {number} y Y.
   * @param {import("../coordinate.js").Coordinate} closestPoint Closest point.
   * @param {number} minSquaredDistance Minimum squared distance.
   * @return {number} Minimum squared distance.
   */closestPointXY(t,e,i,n){return n<to(this.getExtent(),t,e)?n:(this.maxDeltaRevision_!=this.getRevision()&&(this.maxDelta_=Math.sqrt(eU(this.flatCoordinates,0,this.flatCoordinates.length,this.stride,0)),this.maxDeltaRevision_=this.getRevision()),eB(this.flatCoordinates,0,this.flatCoordinates.length,this.stride,this.maxDelta_,!0,t,e,i,n))}/**
   * Return the area of the linear ring on projected plane.
   * @return {number} Area (on projected plane).
   * @api
   */getArea(){return is(this.flatCoordinates,0,this.flatCoordinates.length,this.stride)}/**
   * Return the coordinates of the linear ring.
   * @return {Array<import("../coordinate.js").Coordinate>} Coordinates.
   * @api
   */getCoordinates(){return eQ(this.flatCoordinates,0,this.flatCoordinates.length,this.stride)}/**
   * @param {number} squaredTolerance Squared tolerance.
   * @return {LinearRing} Simplified LinearRing.
   * @protected
   */getSimplifiedGeometryInternal(t){let e=[];return e.length=eH(this.flatCoordinates,0,this.flatCoordinates.length,this.stride,t,e,0),new il(e,"XY")}/**
   * Get the type of this geometry.
   * @return {import("./Geometry.js").Type} Geometry type.
   * @api
   */getType(){return"LinearRing"}/**
   * Test if the geometry and the passed extent intersect.
   * @param {import("../extent.js").Extent} extent Extent.
   * @return {boolean} `true` if the geometry and the extent intersect.
   * @api
   */intersectsExtent(t){return!1}/**
   * Set the coordinates of the linear ring.
   * @param {!Array<import("../coordinate.js").Coordinate>} coordinates Coordinates.
   * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
   * @api
   */setCoordinates(t,e){this.setLayout(e,t,1),this.flatCoordinates||(this.flatCoordinates=[]),this.flatCoordinates.length=eZ(this.flatCoordinates,0,t,this.stride),this.changed()}}/**
 * @module ol/geom/flat/interiorpoint
 */function ia(t,e,i,n,r,s,o){let l,a,h,u,d,c,g;let f=r[s+1],_=[];// Calculate intersections with the horizontal line
for(let r=0,s=i.length;r<s;++r){let s=i[r];for(u=t[s-n],c=t[s-n+1],l=e;l<s;l+=n)d=t[l],g=t[l+1],(f<=c&&g<=f||c<=f&&f<=g)&&(h=(f-c)/(g-c)*(d-u)+u,_.push(h)),u=d,c=g}// Find the longest segment of the horizontal line that has its center point
// inside the linear ring.
let m=NaN,p=-1/0;for(_.sort(x),u=_[0],l=1,a=_.length;l<a;++l){d=_[l];let r=Math.abs(d-u);r>p&&e4(t,e,i,n,h=(u+d)/2,f)&&(m=h,p=r),u=d}return(isNaN(m)&&// ring.  Use the center of the the linear ring's extent.
(m=r[s]),o)?(o.push(m,f,p),o):[m,f,p]}function ih(t,e,i,n){// https://stackoverflow.com/q/1165647/clockwise-method#1165943
// https://github.com/OSGeo/gdal/blob/master/gdal/ogr/ogrlinearring.cpp
let r=0,s=t[i-n],o=t[i-n+1];for(;e<i;e+=n){let i=t[e],n=t[e+1];r+=(i-s)*(n+o),s=i,o=n}return 0===r?void 0:r>0}function iu(t,e,i,n,r){r=void 0!==r&&r;for(let s=0,o=i.length;s<o;++s){let o=i[s],l=ih(t,e,o,n);if(0===s){if(r&&l||!r&&!l)return!1}else if(r&&!l||!r&&l)return!1;e=o}return!0}function id(t,e,i,n,r){r=void 0!==r&&r;for(let s=0,o=i.length;s<o;++s){let o=i[s],l=ih(t,e,o,n),a=0===s?r&&l||!r&&!l:r&&!l||!r&&l;a&&/**
 * @module ol/geom/flat/orient
 *//**
 * @module ol/geom/flat/reverse
 *//**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 */function(t,e,i,n){for(;e<i-n;){for(let r=0;r<n;++r){let s=t[e+r];t[e+r]=t[i-n+r],t[i-n+r]=s}e+=n,i-=n}}(t,e,o,n),e=o}return e}function ic(t,e,i,n,r){for(let s=0,o=i.length;s<o;++s)e=id(t,e,i[s],n,r);return e}/**
 * @classdesc
 * Polygon geometry.
 *
 * @api
 */class ig extends eW{/**
   * @param {!Array<Array<import("../coordinate.js").Coordinate>>|!Array<number>} coordinates
   *     Array of linear rings that define the polygon. The first linear ring of the
   *     array defines the outer-boundary or surface of the polygon. Each subsequent
   *     linear ring defines a hole in the surface of the polygon. A linear ring is
   *     an array of vertices' coordinates where the first coordinate and the last are
   *     equivalent. (For internal use, flat coordinates in combination with
   *     `layout` and `ends` are also accepted.)
   * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
   * @param {Array<number>} [ends] Ends (for internal use with flat coordinates).
   */constructor(t,e,i){super(),/**
     * @type {Array<number>}
     * @private
     */this.ends_=[],/**
     * @private
     * @type {number}
     */this.flatInteriorPointRevision_=-1,/**
     * @private
     * @type {import("../coordinate.js").Coordinate}
     */this.flatInteriorPoint_=null,/**
     * @private
     * @type {number}
     */this.maxDelta_=-1,/**
     * @private
     * @type {number}
     */this.maxDeltaRevision_=-1,/**
     * @private
     * @type {number}
     */this.orientedRevision_=-1,/**
     * @private
     * @type {Array<number>}
     */this.orientedFlatCoordinates_=null,void 0!==e&&i?(this.setFlatCoordinates(e,/** @type {Array<number>} */t),this.ends_=i):this.setCoordinates(/** @type {Array<Array<import("../coordinate.js").Coordinate>>} */t,e)}/**
   * Append the passed linear ring to this polygon.
   * @param {LinearRing} linearRing Linear ring.
   * @api
   */appendLinearRing(t){this.flatCoordinates?E(this.flatCoordinates,t.getFlatCoordinates()):this.flatCoordinates=t.getFlatCoordinates().slice(),this.ends_.push(this.flatCoordinates.length),this.changed()}/**
   * Make a complete copy of the geometry.
   * @return {!Polygon} Clone.
   * @api
   */clone(){let t=new ig(this.flatCoordinates.slice(),this.layout,this.ends_.slice());return t.applyProperties(this),t}/**
   * @param {number} x X.
   * @param {number} y Y.
   * @param {import("../coordinate.js").Coordinate} closestPoint Closest point.
   * @param {number} minSquaredDistance Minimum squared distance.
   * @return {number} Minimum squared distance.
   */closestPointXY(t,e,i,n){return n<to(this.getExtent(),t,e)?n:(this.maxDeltaRevision_!=this.getRevision()&&(this.maxDelta_=Math.sqrt(ej(this.flatCoordinates,0,this.ends_,this.stride,0)),this.maxDeltaRevision_=this.getRevision()),eK(this.flatCoordinates,0,this.ends_,this.stride,this.maxDelta_,!0,t,e,i,n))}/**
   * @param {number} x X.
   * @param {number} y Y.
   * @return {boolean} Contains (x, y).
   */containsXY(t,e){return e4(this.getOrientedFlatCoordinates(),0,this.ends_,this.stride,t,e)}/**
   * Return the area of the polygon on projected plane.
   * @return {number} Area (on projected plane).
   * @api
   */getArea(){return io(this.getOrientedFlatCoordinates(),0,this.ends_,this.stride)}/**
   * Get the coordinate array for this geometry.  This array has the structure
   * of a GeoJSON coordinate array for polygons.
   *
   * @param {boolean} [right] Orient coordinates according to the right-hand
   *     rule (counter-clockwise for exterior and clockwise for interior rings).
   *     If `false`, coordinates will be oriented according to the left-hand rule
   *     (clockwise for exterior and counter-clockwise for interior rings).
   *     By default, coordinate orientation will depend on how the geometry was
   *     constructed.
   * @return {Array<Array<import("../coordinate.js").Coordinate>>} Coordinates.
   * @api
   */getCoordinates(t){let e;return void 0!==t?id(e=this.getOrientedFlatCoordinates().slice(),0,this.ends_,this.stride,t):e=this.flatCoordinates,e0(e,0,this.ends_,this.stride)}/**
   * @return {Array<number>} Ends.
   */getEnds(){return this.ends_}/**
   * @return {Array<number>} Interior point.
   */getFlatInteriorPoint(){if(this.flatInteriorPointRevision_!=this.getRevision()){let t=tS(this.getExtent());this.flatInteriorPoint_=ia(this.getOrientedFlatCoordinates(),0,this.ends_,this.stride,t,0),this.flatInteriorPointRevision_=this.getRevision()}return this.flatInteriorPoint_}/**
   * Return an interior point of the polygon.
   * @return {Point} Interior point as XYM coordinate, where M is the
   * length of the horizontal intersection that the point belongs to.
   * @api
   */getInteriorPoint(){return new ii(this.getFlatInteriorPoint(),"XYM")}/**
   * Return the number of rings of the polygon,  this includes the exterior
   * ring and any interior rings.
   *
   * @return {number} Number of rings.
   * @api
   */getLinearRingCount(){return this.ends_.length}/**
   * Return the Nth linear ring of the polygon geometry. Return `null` if the
   * given index is out of range.
   * The exterior linear ring is available at index `0` and the interior rings
   * at index `1` and beyond.
   *
   * @param {number} index Index.
   * @return {LinearRing|null} Linear ring.
   * @api
   */getLinearRing(t){return t<0||this.ends_.length<=t?null:new il(this.flatCoordinates.slice(0===t?0:this.ends_[t-1],this.ends_[t]),this.layout)}/**
   * Return the linear rings of the polygon.
   * @return {Array<LinearRing>} Linear rings.
   * @api
   */getLinearRings(){let t=this.layout,e=this.flatCoordinates,i=this.ends_,n=[],r=0;for(let s=0,o=i.length;s<o;++s){let o=i[s],l=new il(e.slice(r,o),t);n.push(l),r=o}return n}/**
   * @return {Array<number>} Oriented flat coordinates.
   */getOrientedFlatCoordinates(){if(this.orientedRevision_!=this.getRevision()){let t=this.flatCoordinates;iu(t,0,this.ends_,this.stride)?this.orientedFlatCoordinates_=t:(this.orientedFlatCoordinates_=t.slice(),this.orientedFlatCoordinates_.length=id(this.orientedFlatCoordinates_,0,this.ends_,this.stride)),this.orientedRevision_=this.getRevision()}return this.orientedFlatCoordinates_}/**
   * @param {number} squaredTolerance Squared tolerance.
   * @return {Polygon} Simplified Polygon.
   * @protected
   */getSimplifiedGeometryInternal(t){let e=[],i=[];return e.length=eJ(this.flatCoordinates,0,this.ends_,this.stride,Math.sqrt(t),e,0,i),new ig(e,"XY",i)}/**
   * Get the type of this geometry.
   * @return {import("./Geometry.js").Type} Geometry type.
   * @api
   */getType(){return"Polygon"}/**
   * Test if the geometry and the passed extent intersect.
   * @param {import("../extent.js").Extent} extent Extent.
   * @return {boolean} `true` if the geometry and the extent intersect.
   * @api
   */intersectsExtent(t){return e7(this.getOrientedFlatCoordinates(),0,this.ends_,this.stride,t)}/**
   * Set the coordinates of the polygon.
   * @param {!Array<Array<import("../coordinate.js").Coordinate>>} coordinates Coordinates.
   * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
   * @api
   */setCoordinates(t,e){this.setLayout(e,t,2),this.flatCoordinates||(this.flatCoordinates=[]);let i=eV(this.flatCoordinates,0,t,this.stride,this.ends_);this.flatCoordinates.length=0===i.length?0:i[i.length-1],this.changed()}}function i_(t){if(tP(t))throw Error("Cannot create polygon from empty extent");let e=t[0],i=t[1],n=t[2],r=t[3],s=[e,i,e,r,n,r,n,i,e,i];return new ig(s,"XY",[s.length])}/**
 * @classdesc
 * Multi-polygon geometry.
 *
 * @api
 */class im extends eW{/**
   * @param {Array<Array<Array<import("../coordinate.js").Coordinate>>|Polygon>|Array<number>} coordinates Coordinates.
   *     For internal use, flat coordinates in combination with `layout` and `endss` are also accepted.
   * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
   * @param {Array<Array<number>>} [endss] Array of ends for internal use with flat coordinates.
   */constructor(t,e,i){if(super(),/**
     * @type {Array<Array<number>>}
     * @private
     */this.endss_=[],/**
     * @private
     * @type {number}
     */this.flatInteriorPointsRevision_=-1,/**
     * @private
     * @type {Array<number>}
     */this.flatInteriorPoints_=null,/**
     * @private
     * @type {number}
     */this.maxDelta_=-1,/**
     * @private
     * @type {number}
     */this.maxDeltaRevision_=-1,/**
     * @private
     * @type {number}
     */this.orientedRevision_=-1,/**
     * @private
     * @type {Array<number>}
     */this.orientedFlatCoordinates_=null,!i&&!Array.isArray(t[0])){let n=this.getLayout(),r=/** @type {Array<Polygon>} */t,s=[],o=[];for(let t=0,e=r.length;t<e;++t){let e=r[t];0===t&&(n=e.getLayout());let i=s.length,l=e.getEnds();for(let t=0,e=l.length;t<e;++t)l[t]+=i;E(s,e.getFlatCoordinates()),o.push(l)}e=n,t=s,i=o}void 0!==e&&i?(this.setFlatCoordinates(e,/** @type {Array<number>} */t),this.endss_=i):this.setCoordinates(/** @type {Array<Array<Array<import("../coordinate.js").Coordinate>>>} */t,e)}/**
   * Append the passed polygon to this multipolygon.
   * @param {Polygon} polygon Polygon.
   * @api
   */appendPolygon(t){/** @type {Array<number>} */let e;if(this.flatCoordinates){let i=this.flatCoordinates.length;E(this.flatCoordinates,t.getFlatCoordinates()),e=t.getEnds().slice();for(let t=0,n=e.length;t<n;++t)e[t]+=i}else this.flatCoordinates=t.getFlatCoordinates().slice(),e=t.getEnds().slice(),this.endss_.push();this.endss_.push(e),this.changed()}/**
   * Make a complete copy of the geometry.
   * @return {!MultiPolygon} Clone.
   * @api
   */clone(){let t=this.endss_.length,e=Array(t);for(let i=0;i<t;++i)e[i]=this.endss_[i].slice();let i=new im(this.flatCoordinates.slice(),this.layout,e);return i.applyProperties(this),i}/**
   * @param {number} x X.
   * @param {number} y Y.
   * @param {import("../coordinate.js").Coordinate} closestPoint Closest point.
   * @param {number} minSquaredDistance Minimum squared distance.
   * @return {number} Minimum squared distance.
   */closestPointXY(t,e,i,n){return n<to(this.getExtent(),t,e)?n:(this.maxDeltaRevision_!=this.getRevision()&&(this.maxDelta_=Math.sqrt(function(t,e,i,n,r){for(let s=0,o=i.length;s<o;++s){let o=i[s];r=ej(t,e,o,n,r),e=o[o.length-1]}return r}(this.flatCoordinates,0,this.endss_,this.stride,0)),this.maxDeltaRevision_=this.getRevision()),function(t,e,i,n,r,s,o,l,a,h,u){u=u||[NaN,NaN];for(let d=0,c=i.length;d<c;++d){let c=i[d];h=eK(t,e,c,n,r,s,o,l,a,h,u),e=c[c.length-1]}return h}(this.getOrientedFlatCoordinates(),0,this.endss_,this.stride,this.maxDelta_,!0,t,e,i,n))}/**
   * @param {number} x X.
   * @param {number} y Y.
   * @return {boolean} Contains (x, y).
   */containsXY(t,e){return function(t,e,i,n,r,s){if(0===i.length)return!1;for(let o=0,l=i.length;o<l;++o){let l=i[o];if(e4(t,e,l,n,r,s))return!0;e=l[l.length-1]}return!1}(this.getOrientedFlatCoordinates(),0,this.endss_,this.stride,t,e)}/**
   * Return the area of the multipolygon on projected plane.
   * @return {number} Area (on projected plane).
   * @api
   */getArea(){return function(t,e,i,n){let r=0;for(let s=0,o=i.length;s<o;++s){let o=i[s];r+=io(t,e,o,n),e=o[o.length-1]}return r}(this.getOrientedFlatCoordinates(),0,this.endss_,this.stride)}/**
   * Get the coordinate array for this geometry.  This array has the structure
   * of a GeoJSON coordinate array for multi-polygons.
   *
   * @param {boolean} [right] Orient coordinates according to the right-hand
   *     rule (counter-clockwise for exterior and clockwise for interior rings).
   *     If `false`, coordinates will be oriented according to the left-hand rule
   *     (clockwise for exterior and counter-clockwise for interior rings).
   *     By default, coordinate orientation will depend on how the geometry was
   *     constructed.
   * @return {Array<Array<Array<import("../coordinate.js").Coordinate>>>} Coordinates.
   * @api
   */getCoordinates(t){let e;return void 0!==t?ic(e=this.getOrientedFlatCoordinates().slice(),0,this.endss_,this.stride,t):e=this.flatCoordinates,e1(e,0,this.endss_,this.stride)}/**
   * @return {Array<Array<number>>} Endss.
   */getEndss(){return this.endss_}/**
   * @return {Array<number>} Flat interior points.
   */getFlatInteriorPoints(){if(this.flatInteriorPointsRevision_!=this.getRevision()){let t=/**
 * @module ol/geom/flat/center
 */function(t,e,i,n){let r=[],s=td();for(let o=0,l=i.length;o<l;++o){let l=i[o];s=tf(t,e,l[0],n),r.push((s[0]+s[2])/2,(s[1]+s[3])/2),e=l[l.length-1]}return r}(this.flatCoordinates,0,this.endss_,this.stride);this.flatInteriorPoints_=function(t,e,i,n,r){let s=[];for(let o=0,l=i.length;o<l;++o){let l=i[o];s=ia(t,e,l,n,r,2*o,s),e=l[l.length-1]}return s}(this.getOrientedFlatCoordinates(),0,this.endss_,this.stride,t),this.flatInteriorPointsRevision_=this.getRevision()}return this.flatInteriorPoints_}/**
   * Return the interior points as {@link module:ol/geom/MultiPoint~MultiPoint multipoint}.
   * @return {MultiPoint} Interior points as XYM coordinates, where M is
   * the length of the horizontal intersection that the point belongs to.
   * @api
   */getInteriorPoints(){return new ir(this.getFlatInteriorPoints().slice(),"XYM")}/**
   * @return {Array<number>} Oriented flat coordinates.
   */getOrientedFlatCoordinates(){if(this.orientedRevision_!=this.getRevision()){let t=this.flatCoordinates;!function(t,e,i,n,r){for(let r=0,s=i.length;r<s;++r){let s=i[r];if(!iu(t,e,s,n,void 0))return!1;s.length&&(e=s[s.length-1])}return!0}(t,0,this.endss_,this.stride)?(this.orientedFlatCoordinates_=t.slice(),this.orientedFlatCoordinates_.length=ic(this.orientedFlatCoordinates_,0,this.endss_,this.stride)):this.orientedFlatCoordinates_=t,this.orientedRevision_=this.getRevision()}return this.orientedFlatCoordinates_}/**
   * @param {number} squaredTolerance Squared tolerance.
   * @return {MultiPolygon} Simplified MultiPolygon.
   * @protected
   */getSimplifiedGeometryInternal(t){let e=[],i=[];return e.length=function(t,e,i,n,r,s,o,l){for(let a=0,h=i.length;a<h;++a){let h=i[a],u=[];o=eJ(t,e,h,n,r,s,o,u),l.push(u),e=h[h.length-1]}return o}(this.flatCoordinates,0,this.endss_,this.stride,Math.sqrt(t),e,0,i),new im(e,"XY",i)}/**
   * Return the polygon at the specified index.
   * @param {number} index Index.
   * @return {Polygon} Polygon.
   * @api
   */getPolygon(t){let e;if(t<0||this.endss_.length<=t)return null;if(0===t)e=0;else{let i=this.endss_[t-1];e=i[i.length-1]}let i=this.endss_[t].slice(),n=i[i.length-1];if(0!==e)for(let t=0,n=i.length;t<n;++t)i[t]-=e;return new ig(this.flatCoordinates.slice(e,n),this.layout,i)}/**
   * Return the polygons of this multipolygon.
   * @return {Array<Polygon>} Polygons.
   * @api
   */getPolygons(){let t=this.layout,e=this.flatCoordinates,i=this.endss_,n=[],r=0;for(let s=0,o=i.length;s<o;++s){let o=i[s].slice(),l=o[o.length-1];if(0!==r)for(let t=0,e=o.length;t<e;++t)o[t]-=r;let a=new ig(e.slice(r,l),t,o);n.push(a),r=l}return n}/**
   * Get the type of this geometry.
   * @return {import("./Geometry.js").Type} Geometry type.
   * @api
   */getType(){return"MultiPolygon"}/**
   * Test if the geometry and the passed extent intersect.
   * @param {import("../extent.js").Extent} extent Extent.
   * @return {boolean} `true` if the geometry and the extent intersect.
   * @api
   */intersectsExtent(t){return function(t,e,i,n,r){for(let s=0,o=i.length;s<o;++s){let o=i[s];if(e7(t,e,o,n,r))return!0;e=o[o.length-1]}return!1}(this.getOrientedFlatCoordinates(),0,this.endss_,this.stride,t)}/**
   * Set the coordinates of the multipolygon.
   * @param {!Array<Array<Array<import("../coordinate.js").Coordinate>>>} coordinates Coordinates.
   * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
   * @api
   */setCoordinates(t,e){this.setLayout(e,t,3),this.flatCoordinates||(this.flatCoordinates=[]);let i=function(t,e,i,n,r){r=r||[];let s=0;for(let o=0,l=i.length;o<l;++o){let l=eV(t,e,i[o],n,r[s]);0===l.length&&(l[0]=e),r[s++]=l,e=l[l.length-1]}return r.length=s,r}(this.flatCoordinates,0,t,this.stride,this.endss_);if(0===i.length)this.flatCoordinates.length=0;else{let t=i[i.length-1];this.flatCoordinates.length=0===t.length?0:t[t.length-1]}this.changed()}}/**
 * @module ol/style/Stroke
 *//**
 * @typedef {Object} Options
 * @property {import("../color.js").Color|import("../colorlike.js").ColorLike} [color] A color, gradient or pattern.
 * See {@link module:ol/color~Color} and {@link module:ol/colorlike~ColorLike} for possible formats.
 * Default null; if null, the Canvas/renderer default black will be used.
 * @property {CanvasLineCap} [lineCap='round'] Line cap style: `butt`, `round`, or `square`.
 * @property {CanvasLineJoin} [lineJoin='round'] Line join style: `bevel`, `round`, or `miter`.
 * @property {Array<number>} [lineDash] Line dash pattern. Default is `null` (no dash).
 * @property {number} [lineDashOffset=0] Line dash offset.
 * @property {number} [miterLimit=10] Miter limit.
 * @property {number} [width] Width.
 *//**
 * @classdesc
 * Set stroke style for vector features.
 * Note that the defaults given are the Canvas defaults, which will be used if
 * option is not defined. The `get` functions return whatever was entered in
 * the options; they will not return the default.
 * @api
 */class ip{/**
   * @param {Options} [options] Options.
   */constructor(t){t=t||{},/**
     * @private
     * @type {import("../color.js").Color|import("../colorlike.js").ColorLike}
     */this.color_=void 0!==t.color?t.color:null,/**
     * @private
     * @type {CanvasLineCap|undefined}
     */this.lineCap_=t.lineCap,/**
     * @private
     * @type {Array<number>|null}
     */this.lineDash_=void 0!==t.lineDash?t.lineDash:null,/**
     * @private
     * @type {number|undefined}
     */this.lineDashOffset_=t.lineDashOffset,/**
     * @private
     * @type {CanvasLineJoin|undefined}
     */this.lineJoin_=t.lineJoin,/**
     * @private
     * @type {number|undefined}
     */this.miterLimit_=t.miterLimit,/**
     * @private
     * @type {number|undefined}
     */this.width_=t.width}/**
   * Clones the style.
   * @return {Stroke} The cloned style.
   * @api
   */clone(){let t=this.getColor();return new ip({color:Array.isArray(t)?t.slice():t||void 0,lineCap:this.getLineCap(),lineDash:this.getLineDash()?this.getLineDash().slice():void 0,lineDashOffset:this.getLineDashOffset(),lineJoin:this.getLineJoin(),miterLimit:this.getMiterLimit(),width:this.getWidth()})}/**
   * Get the stroke color.
   * @return {import("../color.js").Color|import("../colorlike.js").ColorLike} Color.
   * @api
   */getColor(){return this.color_}/**
   * Get the line cap type for the stroke.
   * @return {CanvasLineCap|undefined} Line cap.
   * @api
   */getLineCap(){return this.lineCap_}/**
   * Get the line dash style for the stroke.
   * @return {Array<number>|null} Line dash.
   * @api
   */getLineDash(){return this.lineDash_}/**
   * Get the line dash offset for the stroke.
   * @return {number|undefined} Line dash offset.
   * @api
   */getLineDashOffset(){return this.lineDashOffset_}/**
   * Get the line join type for the stroke.
   * @return {CanvasLineJoin|undefined} Line join.
   * @api
   */getLineJoin(){return this.lineJoin_}/**
   * Get the miter limit for the stroke.
   * @return {number|undefined} Miter limit.
   * @api
   */getMiterLimit(){return this.miterLimit_}/**
   * Get the stroke width.
   * @return {number|undefined} Width.
   * @api
   */getWidth(){return this.width_}/**
   * Set the color.
   *
   * @param {import("../color.js").Color|import("../colorlike.js").ColorLike} color Color.
   * @api
   */setColor(t){this.color_=t}/**
   * Set the line cap.
   *
   * @param {CanvasLineCap|undefined} lineCap Line cap.
   * @api
   */setLineCap(t){this.lineCap_=t}/**
   * Set the line dash.
   *
   * @param {Array<number>|null} lineDash Line dash.
   * @api
   */setLineDash(t){this.lineDash_=t}/**
   * Set the line dash offset.
   *
   * @param {number|undefined} lineDashOffset Line dash offset.
   * @api
   */setLineDashOffset(t){this.lineDashOffset_=t}/**
   * Set the line join.
   *
   * @param {CanvasLineJoin|undefined} lineJoin Line join.
   * @api
   */setLineJoin(t){this.lineJoin_=t}/**
   * Set the miter limit.
   *
   * @param {number|undefined} miterLimit Miter limit.
   * @api
   */setMiterLimit(t){this.miterLimit_=t}/**
   * Set the width.
   *
   * @param {number|undefined} width Width.
   * @api
   */setWidth(t){this.width_=t}}/**
 * @module ol/style/Style
 *//**
 * @module ol/style/Circle
 *//**
 * @module ol/style/RegularShape
 *//**
 * @module ol/colorlike
 */function iy(t){return Array.isArray(t)?eL(t):t}/**
 * @module ol/render/canvas
 *//**
 * @module ol/css
 *//**
 * @typedef {Object} FontParameters
 * @property {string} style Style.
 * @property {string} variant Variant.
 * @property {string} weight Weight.
 * @property {string} size Size.
 * @property {string} lineHeight LineHeight.
 * @property {string} family Family.
 * @property {Array<string>} families Families.
 *//**
 * The CSS class for hidden feature.
 *
 * @const
 * @type {string}
 */let ix="ol-hidden",iv="ol-unselectable",iE="ol-control",iC="ol-collapsed",iS=RegExp("^\\s*(?=(?:(?:[-a-z]+\\s*){0,2}(italic|oblique))?)(?=(?:(?:[-a-z]+\\s*){0,2}(small-caps))?)(?=(?:(?:[-a-z]+\\s*){0,2}(bold(?:er)?|lighter|[1-9]00 ))?)(?:(?:normal|\\1|\\2|\\3)\\s*){0,3}((?:xx?-)?(?:small|large)|medium|smaller|larger|[\\.\\d]+(?:\\%|in|[cem]m|ex|p[ctx]))(?:\\s*\\/\\s*(normal|[\\.\\d]+(?:\\%|in|[cem]m|ex|p[ctx])?))?\\s*([-,\\\"\\'\\sa-z]+?)\\s*$","i"),iR=["style","variant","weight","size","lineHeight","family"],iw=function(t){let e=t.match(iS);if(!e)return null;let i=/** @type {FontParameters} */{lineHeight:"normal",size:"1.2em",style:"normal",weight:"normal",variant:"normal"};for(let t=0,n=iR.length;t<n;++t){let n=e[t+1];void 0!==n&&(i[iR[t]]=n)}return i.families=i.family.split(/,\s?/),i},iT="10px sans-serif",iI="#000",iM="round",iL=[],ib="round",iA="#000",iP="center",iF="middle",iO=[0,0,0,0],iD=new G,ik=null,iN={},iG=function(){let t,i;let n="32px ",r=["monospace","serif"],s=r.length,o="wmytzilWMYTZIL@#/&?$%10";/**
   * @param {string} fontStyle Css font-style
   * @param {string} fontWeight Css font-weight
   * @param {*} fontFamily Css font-family
   * @return {boolean} Font with style and weight is available
   */function l(t,e,l){let a=!0;for(let h=0;h<s;++h){let s=r[h];if(i=iW(t+" "+e+" "+n+s,o),l!=s){let r=iW(t+" "+e+" "+n+l+","+s,o);// If width and referenceWidth are the same, then the fallback was used
// instead of the font we wanted, so the font is not available.
a=a&&r!=i}}return!!a}function a(){let i=!0,n=iD.getKeys();for(let t=0,r=n.length;t<r;++t){let r=n[t];100>iD.get(r)&&(l.apply(this,r.split("\n"))?(T(iN),// Make sure that loaded fonts are picked up by Safari
ik=null,e=void 0,iD.set(r,100)):(iD.set(r,iD.get(r)+1,!0),i=!1))}i&&(clearInterval(t),t=void 0)}return function(e){let i=iw(e);if(!i)return;let n=i.families;for(let e=0,r=n.length;e<r;++e){let r=n[e],s=i.style+"\n"+i.weight+"\n"+r;void 0!==iD.get(s)||(iD.set(s,100,!0),l(i.style,i.weight,r)||(iD.set(s,0,!0),void 0===t&&(t=setInterval(a,32))))}}}(),iz=function(t){let e=iN[t];if(void 0==e){if(V){let i=iw(t),n=iX(t,"Žg"),r=isNaN(Number(i.lineHeight))?1.2:Number(i.lineHeight);e=r*(n.actualBoundingBoxAscent+n.actualBoundingBoxDescent)}else c||((c=document.createElement("div")).innerHTML="M",c.style.minHeight="0",c.style.maxHeight="none",c.style.height="auto",c.style.padding="0",c.style.border="none",c.style.position="absolute",c.style.display="block",c.style.left="-99999px"),c.style.font=t,document.body.appendChild(c),e=c.offsetHeight,document.body.removeChild(c);iN[t]=e}return e};/**
 * @param {string} font Font.
 * @param {string} text Text.
 * @return {TextMetrics} Text metrics.
 */function iX(t,i){return ik||(ik=eb(1,1)),t!=e&&(ik.font=t,e=ik.font),ik.measureText(i)}function iW(t,e){return iX(t,e).width}function iY(t,e,i){if(e in i)return i[e];let n=e.split("\n").reduce((e,i)=>Math.max(e,iW(t,i)),0);return i[e]=n,n}/**
 * Specify radius for regular polygons, or radius1 and radius2 for stars.
 * @typedef {Object} Options
 * @property {import("./Fill.js").default} [fill] Fill style.
 * @property {number} points Number of points for stars and regular polygons. In case of a polygon, the number of points
 * is the number of sides.
 * @property {number} [radius] Radius of a regular polygon.
 * @property {number} [radius1] First radius of a star. Ignored if radius is set.
 * @property {number} [radius2] Second radius of a star.
 * @property {number} [angle=0] Shape's angle in radians. A value of 0 will have one of the shape's points facing up.
 * @property {Array<number>} [displacement=[0, 0]] Displacement of the shape in pixels.
 * Positive values will shift the shape right and up.
 * @property {import("./Stroke.js").default} [stroke] Stroke style.
 * @property {number} [rotation=0] Rotation in radians (positive rotation clockwise).
 * @property {boolean} [rotateWithView=false] Whether to rotate the shape with the view.
 * @property {number|import("../size.js").Size} [scale=1] Scale. Unless two dimensional scaling is required a better
 * result may be obtained with appropriate settings for `radius`, `radius1` and `radius2`.
 * @property {"declutter"|"obstacle"|"none"|undefined} [declutterMode] Declutter mode.
 *//**
 * @typedef {Object} RenderOptions
 * @property {import("../colorlike.js").ColorLike} [strokeStyle] StrokeStyle.
 * @property {number} strokeWidth StrokeWidth.
 * @property {number} size Size.
 * @property {CanvasLineCap} lineCap LineCap.
 * @property {Array<number>|null} lineDash LineDash.
 * @property {number} lineDashOffset LineDashOffset.
 * @property {CanvasLineJoin} lineJoin LineJoin.
 * @property {number} miterLimit MiterLimit.
 *//**
 * @classdesc
 * Set regular shape style for vector features. The resulting shape will be
 * a regular polygon when `radius` is provided, or a star when `radius1` and
 * `radius2` are provided.
 * @api
 */class iU extends eC{/**
   * @param {Options} options Options.
   */constructor(t){/**
     * @type {boolean}
     */let e=void 0!==t.rotateWithView&&t.rotateWithView;super({opacity:1,rotateWithView:e,rotation:void 0!==t.rotation?t.rotation:0,scale:void 0!==t.scale?t.scale:1,displacement:void 0!==t.displacement?t.displacement:[0,0],declutterMode:t.declutterMode}),/**
     * @private
     * @type {Object<number, HTMLCanvasElement>}
     */this.canvas_=void 0,/**
     * @private
     * @type {HTMLCanvasElement}
     */this.hitDetectionCanvas_=null,/**
     * @private
     * @type {import("./Fill.js").default}
     */this.fill_=void 0!==t.fill?t.fill:null,/**
     * @private
     * @type {Array<number>}
     */this.origin_=[0,0],/**
     * @private
     * @type {number}
     */this.points_=t.points,/**
     * @protected
     * @type {number}
     */this.radius_=void 0!==t.radius?t.radius:t.radius1,/**
     * @private
     * @type {number|undefined}
     */this.radius2_=t.radius2,/**
     * @private
     * @type {number}
     */this.angle_=void 0!==t.angle?t.angle:0,/**
     * @private
     * @type {import("./Stroke.js").default}
     */this.stroke_=void 0!==t.stroke?t.stroke:null,/**
     * @private
     * @type {import("../size.js").Size}
     */this.size_=null,/**
     * @private
     * @type {RenderOptions}
     */this.renderOptions_=null,this.render()}/**
   * Clones the style.
   * @return {RegularShape} The cloned style.
   * @api
   */clone(){let t=this.getScale(),e=new iU({fill:this.getFill()?this.getFill().clone():void 0,points:this.getPoints(),radius:this.getRadius(),radius2:this.getRadius2(),angle:this.getAngle(),stroke:this.getStroke()?this.getStroke().clone():void 0,rotation:this.getRotation(),rotateWithView:this.getRotateWithView(),scale:Array.isArray(t)?t.slice():t,displacement:this.getDisplacement().slice(),declutterMode:this.getDeclutterMode()});return e.setOpacity(this.getOpacity()),e}/**
   * Get the anchor point in pixels. The anchor determines the center point for the
   * symbolizer.
   * @return {Array<number>} Anchor.
   * @api
   */getAnchor(){let t=this.size_;if(!t)return null;let e=this.getDisplacement(),i=this.getScaleArray();// anchor is scaled by renderer but displacement should not be scaled
// so divide by scale here
return[t[0]/2-e[0]/i[0],t[1]/2+e[1]/i[1]]}/**
   * Get the angle used in generating the shape.
   * @return {number} Shape's rotation in radians.
   * @api
   */getAngle(){return this.angle_}/**
   * Get the fill style for the shape.
   * @return {import("./Fill.js").default} Fill style.
   * @api
   */getFill(){return this.fill_}/**
   * Set the fill style.
   * @param {import("./Fill.js").default} fill Fill style.
   * @api
   */setFill(t){this.fill_=t,this.render()}/**
   * @return {HTMLCanvasElement} Image element.
   */getHitDetectionImage(){return this.hitDetectionCanvas_||this.createHitDetectionCanvas_(this.renderOptions_),this.hitDetectionCanvas_}/**
   * Get the image icon.
   * @param {number} pixelRatio Pixel ratio.
   * @return {HTMLCanvasElement} Image or Canvas element.
   * @api
   */getImage(t){let e=this.canvas_[t];if(!e){let i=this.renderOptions_,n=eb(i.size*t,i.size*t);this.draw_(i,n,t),e=n.canvas,this.canvas_[t]=e}return e}/**
   * Get the image pixel ratio.
   * @param {number} pixelRatio Pixel ratio.
   * @return {number} Pixel ratio.
   */getPixelRatio(t){return t}/**
   * @return {import("../size.js").Size} Image size.
   */getImageSize(){return this.size_}/**
   * @return {import("../ImageState.js").default} Image state.
   */getImageState(){return ey.LOADED}/**
   * Get the origin of the symbolizer.
   * @return {Array<number>} Origin.
   * @api
   */getOrigin(){return this.origin_}/**
   * Get the number of points for generating the shape.
   * @return {number} Number of points for stars and regular polygons.
   * @api
   */getPoints(){return this.points_}/**
   * Get the (primary) radius for the shape.
   * @return {number} Radius.
   * @api
   */getRadius(){return this.radius_}/**
   * Get the secondary radius for the shape.
   * @return {number|undefined} Radius2.
   * @api
   */getRadius2(){return this.radius2_}/**
   * Get the size of the symbolizer (in pixels).
   * @return {import("../size.js").Size} Size.
   * @api
   */getSize(){return this.size_}/**
   * Get the stroke style for the shape.
   * @return {import("./Stroke.js").default} Stroke style.
   * @api
   */getStroke(){return this.stroke_}/**
   * Set the stroke style.
   * @param {import("./Stroke.js").default} stroke Stroke style.
   * @api
   */setStroke(t){this.stroke_=t,this.render()}/**
   * @param {function(import("../events/Event.js").default): void} listener Listener function.
   */listenImageChange(t){}/**
   * Load not yet loaded URI.
   */load(){}/**
   * @param {function(import("../events/Event.js").default): void} listener Listener function.
   */unlistenImageChange(t){}/**
   * Calculate additional canvas size needed for the miter.
   * @param {string} lineJoin Line join
   * @param {number} strokeWidth Stroke width
   * @param {number} miterLimit Miter limit
   * @return {number} Additional canvas size needed
   * @private
   */calculateLineJoinSize_(t,e,i){if(0===e||this.points_===1/0||"bevel"!==t&&"miter"!==t)return e;// m  | ^
// i  | |\                  .
// t >|  #\
// e  | |\ \              .
// r      \s\
//      |  \t\          .                 .
//          \r\                      .   .
//      |    \o\      .          .  . . .
//          e \k\            .  .    . .
//      |      \e\  .    .  .       . .
//       d      \ \  .  .          . .
//      | _ _a_ _\#  .            . .
//   r1          / `             . .
//      |                       . .
//       b     /               . .
//      |                     . .
//           / r2            . .
//      |                        .   .
//         /                           .   .
//      |α                                   .   .
//       /                                         .   .
//      ° center
let n=this.radius_,r=void 0===this.radius2_?n:this.radius2_;if(n<r){let t=n;n=r,r=t}let s=void 0===this.radius2_?this.points_:2*this.points_,o=2*Math.PI/s,l=r*Math.sin(o),a=Math.sqrt(r*r-l*l),h=n-a,u=Math.sqrt(l*l+h*h),d=u/l;if("miter"===t&&d<=i)return d*e;// Calculate the distance from center to the stroke corner where
// it was cut short because of the miter limit.
//              l
//        ----+---- <= distance from center to here is maxr
//       /####|k ##\
//      /#####^#####\
//     /#### /+\# s #\
//    /### h/+++\# t #\
//   /### t/+++++\# r #\
//  /### a/+++++++\# o #\
// /### p/++ fill +\# k #\
///#### /+++++^+++++\# e #\
//#####/+++++/+\+++++\#####\
let c=e/2/d,g=e/2*(h/u),f=Math.sqrt((n+c)*(n+c)+g*g),_=f-n;if(void 0===this.radius2_||"bevel"===t)return 2*_;// If outer miter is over the miter limit the inner miter may reach through the
// center and be longer than the bevel, same calculation as above but swap r1 / r2.
let m=n*Math.sin(o),p=Math.sqrt(n*n-m*m),y=r-p,x=Math.sqrt(m*m+y*y)/m;if(x<=i){let t=x*e/2-r-n;return 2*Math.max(_,t)}return 2*_}/**
   * @return {RenderOptions}  The render options
   * @protected
   */createRenderOptions(){let t,e=iM,i=ib,n=0,r=null,s=0,o=0;this.stroke_&&(null===(t=this.stroke_.getColor())&&(t=iA),t=iy(t),void 0===(o=this.stroke_.getWidth())&&(o=1),r=this.stroke_.getLineDash(),s=this.stroke_.getLineDashOffset(),void 0===(i=this.stroke_.getLineJoin())&&(i=ib),void 0===(e=this.stroke_.getLineCap())&&(e=iM),void 0===(n=this.stroke_.getMiterLimit())&&(n=10));let l=this.calculateLineJoinSize_(i,o,n),a=Math.max(this.radius_,this.radius2_||0);return{strokeStyle:t,strokeWidth:o,size:Math.ceil(2*a+l),lineCap:e,lineDash:r,lineDashOffset:s,lineJoin:i,miterLimit:n}}/**
   * @protected
   */render(){this.renderOptions_=this.createRenderOptions();let t=this.renderOptions_.size;this.canvas_={},this.size_=[t,t]}/**
   * @private
   * @param {RenderOptions} renderOptions Render options.
   * @param {CanvasRenderingContext2D} context The rendering context.
   * @param {number} pixelRatio The pixel ratio.
   */draw_(t,e,i){if(e.scale(i,i),// set origin to canvas center
e.translate(t.size/2,t.size/2),this.createPath_(e),this.fill_){let t=this.fill_.getColor();null===t&&(t=iI),e.fillStyle=iy(t),e.fill()}this.stroke_&&(e.strokeStyle=t.strokeStyle,e.lineWidth=t.strokeWidth,t.lineDash&&(e.setLineDash(t.lineDash),e.lineDashOffset=t.lineDashOffset),e.lineCap=t.lineCap,e.lineJoin=t.lineJoin,e.miterLimit=t.miterLimit,e.stroke())}/**
   * @private
   * @param {RenderOptions} renderOptions Render options.
   */createHitDetectionCanvas_(t){if(this.fill_){let e=this.fill_.getColor(),i=0;if("string"==typeof e&&(e=eI(e)),null===e?i=1:Array.isArray(e)&&(i=4===e.length?e[3]:1),0===i){// if a transparent fill style is set, create an extra hit-detection image
// with a default fill style
let e=eb(t.size,t.size);this.hitDetectionCanvas_=e.canvas,this.drawHitDetectionCanvas_(t,e)}}this.hitDetectionCanvas_||(this.hitDetectionCanvas_=this.getImage(1))}/**
   * @private
   * @param {CanvasRenderingContext2D} context The context to draw in.
   */createPath_(t){let e=this.points_,i=this.radius_;if(e===1/0)t.arc(0,0,i,0,2*Math.PI);else{let n=void 0===this.radius2_?i:this.radius2_;void 0!==this.radius2_&&(e*=2);let r=this.angle_-Math.PI/2,s=2*Math.PI/e;for(let o=0;o<e;o++){let e=r+o*s,l=o%2==0?i:n;t.lineTo(l*Math.cos(e),l*Math.sin(e))}t.closePath()}}/**
   * @private
   * @param {RenderOptions} renderOptions Render options.
   * @param {CanvasRenderingContext2D} context The context.
   */drawHitDetectionCanvas_(t,e){// set origin to canvas center
e.translate(t.size/2,t.size/2),this.createPath_(e),e.fillStyle=iI,e.fill(),this.stroke_&&(e.strokeStyle=t.strokeStyle,e.lineWidth=t.strokeWidth,t.lineDash&&(e.setLineDash(t.lineDash),e.lineDashOffset=t.lineDashOffset),e.lineJoin=t.lineJoin,e.miterLimit=t.miterLimit,e.stroke())}}var ij=iU;/**
 * @typedef {Object} Options
 * @property {import("./Fill.js").default} [fill] Fill style.
 * @property {number} radius Circle radius.
 * @property {import("./Stroke.js").default} [stroke] Stroke style.
 * @property {Array<number>} [displacement=[0,0]] displacement
 * @property {number|import("../size.js").Size} [scale=1] Scale. A two dimensional scale will produce an ellipse.
 * Unless two dimensional scaling is required a better result may be obtained with an appropriate setting for `radius`.
 * @property {number} [rotation=0] Rotation in radians
 * (positive rotation clockwise, meaningful only when used in conjunction with a two dimensional scale).
 * @property {boolean} [rotateWithView=false] Whether to rotate the shape with the view
 * (meaningful only when used in conjunction with a two dimensional scale).
 * @property {"declutter"|"obstacle"|"none"|undefined} [declutterMode] Declutter mode
 *//**
 * @classdesc
 * Set circle style for vector features.
 * @api
 */class iB extends ij{/**
   * @param {Options} [options] Options.
   */constructor(t){t=t||{radius:5},super({points:1/0,fill:t.fill,radius:t.radius,stroke:t.stroke,scale:void 0!==t.scale?t.scale:1,rotation:void 0!==t.rotation?t.rotation:0,rotateWithView:void 0!==t.rotateWithView&&t.rotateWithView,displacement:void 0!==t.displacement?t.displacement:[0,0],declutterMode:t.declutterMode})}/**
   * Clones the style.
   * @return {CircleStyle} The cloned style.
   * @api
   */clone(){let t=this.getScale(),e=new iB({fill:this.getFill()?this.getFill().clone():void 0,stroke:this.getStroke()?this.getStroke().clone():void 0,radius:this.getRadius(),scale:Array.isArray(t)?t.slice():t,rotation:this.getRotation(),rotateWithView:this.getRotateWithView(),displacement:this.getDisplacement().slice(),declutterMode:this.getDeclutterMode()});return e.setOpacity(this.getOpacity()),e}/**
   * Set the circle radius.
   *
   * @param {number} radius Circle radius.
   * @api
   */setRadius(t){this.radius_=t,this.render()}}/**
 * A function that takes an {@link module:ol/Feature~Feature} and a `{number}`
 * representing the view's resolution. The function should return a
 * {@link module:ol/style/Style~Style} or an array of them. This way e.g. a
 * vector layer can be styled. If the function returns `undefined`, the
 * feature will not be rendered.
 *
 * @typedef {function(import("../Feature.js").FeatureLike, number):(Style|Array<Style>|void)} StyleFunction
 *//**
 * A {@link Style}, an array of {@link Style}, or a {@link StyleFunction}.
 * @typedef {Style|Array<Style>|StyleFunction} StyleLike
 *//**
 * A function that takes an {@link module:ol/Feature~Feature} as argument and returns an
 * {@link module:ol/geom/Geometry~Geometry} that will be rendered and styled for the feature.
 *
 * @typedef {function(import("../Feature.js").FeatureLike):
 *     (import("../geom/Geometry.js").default|import("../render/Feature.js").default|undefined)} GeometryFunction
 *//**
 * Custom renderer function. Takes two arguments:
 *
 * 1. The pixel coordinates of the geometry in GeoJSON notation.
 * 2. The {@link module:ol/render~State} of the layer renderer.
 *
 * @typedef {function((import("../coordinate.js").Coordinate|Array<import("../coordinate.js").Coordinate>|Array<Array<import("../coordinate.js").Coordinate>>|Array<Array<Array<import("../coordinate.js").Coordinate>>>),import("../render.js").State): void} RenderFunction
 *//**
 * @typedef {Object} Options
 * @property {string|import("../geom/Geometry.js").default|GeometryFunction} [geometry] Feature property or geometry
 * or function returning a geometry to render for this style.
 * @property {import("./Fill.js").default} [fill] Fill style.
 * @property {import("./Image.js").default} [image] Image style.
 * @property {RenderFunction} [renderer] Custom renderer. When configured, `fill`, `stroke` and `image` will be
 * ignored, and the provided function will be called with each render frame for each geometry.
 * @property {RenderFunction} [hitDetectionRenderer] Custom renderer for hit detection. If provided will be used
 * in hit detection rendering.
 * @property {import("./Stroke.js").default} [stroke] Stroke style.
 * @property {import("./Text.js").default} [text] Text style.
 * @property {number} [zIndex] Z index.
 *//**
 * @classdesc
 * Container for vector feature rendering styles. Any changes made to the style
 * or its children through `set*()` methods will not take effect until the
 * feature or layer that uses the style is re-rendered.
 *
 * ## Feature styles
 *
 * If no style is defined, the following default style is used:
 * ```js
 *  import {Circle, Fill, Stroke, Style} from 'ol/style.js';
 *
 *  const fill = new Fill({
 *    color: 'rgba(255,255,255,0.4)',
 *  });
 *  const stroke = new Stroke({
 *    color: '#3399CC',
 *    width: 1.25,
 *  });
 *  const styles = [
 *    new Style({
 *      image: new Circle({
 *        fill: fill,
 *        stroke: stroke,
 *        radius: 5,
 *      }),
 *      fill: fill,
 *      stroke: stroke,
 *    }),
 *  ];
 * ```
 *
 * A separate editing style has the following defaults:
 * ```js
 *  import {Circle, Fill, Stroke, Style} from 'ol/style.js';
 *
 *  const styles = {};
 *  const white = [255, 255, 255, 1];
 *  const blue = [0, 153, 255, 1];
 *  const width = 3;
 *  styles['Polygon'] = [
 *    new Style({
 *      fill: new Fill({
 *        color: [255, 255, 255, 0.5],
 *      }),
 *    }),
 *  ];
 *  styles['MultiPolygon'] =
 *      styles['Polygon'];
 *  styles['LineString'] = [
 *    new Style({
 *      stroke: new Stroke({
 *        color: white,
 *        width: width + 2,
 *      }),
 *    }),
 *    new Style({
 *      stroke: new Stroke({
 *        color: blue,
 *        width: width,
 *      }),
 *    }),
 *  ];
 *  styles['MultiLineString'] = styles['LineString'];
 *
 *  styles['Circle'] = styles['Polygon'].concat(
 *    styles['LineString']
 *  );
 *
 *  styles['Point'] = [
 *    new Style({
 *      image: new Circle({
 *        radius: width * 2,
 *        fill: new Fill({
 *          color: blue,
 *        }),
 *        stroke: new Stroke({
 *          color: white,
 *          width: width / 2,
 *        }),
 *      }),
 *      zIndex: Infinity,
 *    }),
 *  ];
 *  styles['MultiPoint'] =
 *      styles['Point'];
 *  styles['GeometryCollection'] =
 *      styles['Polygon'].concat(
 *          styles['LineString'],
 *          styles['Point']
 *      );
 * ```
 *
 * @api
 */class iK{/**
   * @param {Options} [options] Style options.
   */constructor(t){t=t||{},/**
     * @private
     * @type {string|import("../geom/Geometry.js").default|GeometryFunction}
     */this.geometry_=null,/**
     * @private
     * @type {!GeometryFunction}
     */this.geometryFunction_=iH,void 0!==t.geometry&&this.setGeometry(t.geometry),/**
     * @private
     * @type {import("./Fill.js").default}
     */this.fill_=void 0!==t.fill?t.fill:null,/**
     * @private
     * @type {import("./Image.js").default}
     */this.image_=void 0!==t.image?t.image:null,/**
     * @private
     * @type {RenderFunction|null}
     */this.renderer_=void 0!==t.renderer?t.renderer:null,/**
     * @private
     * @type {RenderFunction|null}
     */this.hitDetectionRenderer_=void 0!==t.hitDetectionRenderer?t.hitDetectionRenderer:null,/**
     * @private
     * @type {import("./Stroke.js").default}
     */this.stroke_=void 0!==t.stroke?t.stroke:null,/**
     * @private
     * @type {import("./Text.js").default}
     */this.text_=void 0!==t.text?t.text:null,/**
     * @private
     * @type {number|undefined}
     */this.zIndex_=t.zIndex}/**
   * Clones the style.
   * @return {Style} The cloned style.
   * @api
   */clone(){let t=this.getGeometry();return t&&"object"==typeof t&&(t=/** @type {import("../geom/Geometry.js").default} */t.clone()),new iK({geometry:t,fill:this.getFill()?this.getFill().clone():void 0,image:this.getImage()?this.getImage().clone():void 0,renderer:this.getRenderer(),stroke:this.getStroke()?this.getStroke().clone():void 0,text:this.getText()?this.getText().clone():void 0,zIndex:this.getZIndex()})}/**
   * Get the custom renderer function that was configured with
   * {@link #setRenderer} or the `renderer` constructor option.
   * @return {RenderFunction|null} Custom renderer function.
   * @api
   */getRenderer(){return this.renderer_}/**
   * Sets a custom renderer function for this style. When set, `fill`, `stroke`
   * and `image` options of the style will be ignored.
   * @param {RenderFunction|null} renderer Custom renderer function.
   * @api
   */setRenderer(t){this.renderer_=t}/**
   * Sets a custom renderer function for this style used
   * in hit detection.
   * @param {RenderFunction|null} renderer Custom renderer function.
   * @api
   */setHitDetectionRenderer(t){this.hitDetectionRenderer_=t}/**
   * Get the custom renderer function that was configured with
   * {@link #setHitDetectionRenderer} or the `hitDetectionRenderer` constructor option.
   * @return {RenderFunction|null} Custom renderer function.
   * @api
   */getHitDetectionRenderer(){return this.hitDetectionRenderer_}/**
   * Get the geometry to be rendered.
   * @return {string|import("../geom/Geometry.js").default|GeometryFunction}
   * Feature property or geometry or function that returns the geometry that will
   * be rendered with this style.
   * @api
   */getGeometry(){return this.geometry_}/**
   * Get the function used to generate a geometry for rendering.
   * @return {!GeometryFunction} Function that is called with a feature
   * and returns the geometry to render instead of the feature's geometry.
   * @api
   */getGeometryFunction(){return this.geometryFunction_}/**
   * Get the fill style.
   * @return {import("./Fill.js").default} Fill style.
   * @api
   */getFill(){return this.fill_}/**
   * Set the fill style.
   * @param {import("./Fill.js").default} fill Fill style.
   * @api
   */setFill(t){this.fill_=t}/**
   * Get the image style.
   * @return {import("./Image.js").default} Image style.
   * @api
   */getImage(){return this.image_}/**
   * Set the image style.
   * @param {import("./Image.js").default} image Image style.
   * @api
   */setImage(t){this.image_=t}/**
   * Get the stroke style.
   * @return {import("./Stroke.js").default} Stroke style.
   * @api
   */getStroke(){return this.stroke_}/**
   * Set the stroke style.
   * @param {import("./Stroke.js").default} stroke Stroke style.
   * @api
   */setStroke(t){this.stroke_=t}/**
   * Get the text style.
   * @return {import("./Text.js").default} Text style.
   * @api
   */getText(){return this.text_}/**
   * Set the text style.
   * @param {import("./Text.js").default} text Text style.
   * @api
   */setText(t){this.text_=t}/**
   * Get the z-index for the style.
   * @return {number|undefined} ZIndex.
   * @api
   */getZIndex(){return this.zIndex_}/**
   * Set a geometry that is rendered instead of the feature's geometry.
   *
   * @param {string|import("../geom/Geometry.js").default|GeometryFunction} geometry
   *     Feature property or geometry or function returning a geometry to render
   *     for this style.
   * @api
   */setGeometry(t){"function"==typeof t?this.geometryFunction_=t:"string"==typeof t?this.geometryFunction_=function(e){return /** @type {import("../geom/Geometry.js").default} */e.get(t)}:t?void 0!==t&&(this.geometryFunction_=function(){return /** @type {import("../geom/Geometry.js").default} */t}):this.geometryFunction_=iH,this.geometry_=t}/**
   * Set the z-index.
   *
   * @param {number|undefined} zIndex ZIndex.
   * @api
   */setZIndex(t){this.zIndex_=t}}/**
 * @type {Array<Style>|null}
 */let iZ=null;function iV(t,e){// We don't use an immediately-invoked function
// and a closure so we don't get an error at script evaluation time in
// browsers that do not support Canvas. (import("./Circle.js").CircleStyle does
// canvas.getContext('2d') at construction time, which will cause an.error
// in such browsers.)
if(!iZ){let t=new W({color:"rgba(255,255,255,0.4)"}),e=new ip({color:"#3399CC",width:1.25});iZ=[new iK({image:new iB({fill:t,stroke:e,radius:5}),fill:t,stroke:e})]}return iZ}/**
 * Function that is called with a feature and returns its default geometry.
 * @param {import("../Feature.js").FeatureLike} feature Feature to get the geometry for.
 * @return {import("../geom/Geometry.js").default|import("../render/Feature.js").default|undefined} Geometry to render.
 */function iH(t){return t.getGeometry()}/**
 * @typedef {Object} Options
 * @property {string} [font] Font style as CSS `font` value, see:
 * https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/font. Default is `'10px sans-serif'`
 * @property {number} [maxAngle=Math.PI/4] When `placement` is set to `'line'`, allow a maximum angle between adjacent characters.
 * The expected value is in radians, and the default is 45° (`Math.PI / 4`).
 * @property {number} [offsetX=0] Horizontal text offset in pixels. A positive will shift the text right.
 * @property {number} [offsetY=0] Vertical text offset in pixels. A positive will shift the text down.
 * @property {boolean} [overflow=false] For polygon labels or when `placement` is set to `'line'`, allow text to exceed
 * the width of the polygon at the label position or the length of the path that it follows.
 * @property {TextPlacement} [placement='point'] Text placement.
 * @property {number} [repeat] Repeat interval. When set, the text will be repeated at this interval, which specifies
 * the distance between two text anchors in pixels. Only available when `placement` is set to `'line'`. Overrides 'textAlign'.
 * @property {number|import("../size.js").Size} [scale] Scale.
 * @property {boolean} [rotateWithView=false] Whether to rotate the text with the view.
 * @property {number} [rotation=0] Rotation in radians (positive rotation clockwise).
 * @property {string|Array<string>} [text] Text content or rich text content. For plain text provide a string, which can
 * contain line breaks (`\n`). For rich text provide an array of text/font tuples. A tuple consists of the text to
 * render and the font to use (or `''` to use the text style's font). A line break has to be a separate tuple (i.e. `'\n', ''`).
 * **Example:** `['foo', 'bold 10px sans-serif', ' bar', 'italic 10px sans-serif', ' baz', '']` will yield "**foo** *bar* baz".
 * **Note:** Rich text is not supported for `placement: 'line'` or the immediate rendering API.
 * @property {CanvasTextAlign} [textAlign] Text alignment. Possible values: `'left'`, `'right'`, `'center'`, `'end'` or `'start'`.
 * Default is `'center'` for `placement: 'point'`. For `placement: 'line'`, the default is to let the renderer choose a
 * placement where `maxAngle` is not exceeded.
 * @property {TextJustify} [justify] Text justification within the text box.
 * If not set, text is justified towards the `textAlign` anchor.
 * Otherwise, use options `'left'`, `'center'`, or `'right'` to justify the text within the text box.
 * **Note:** `justify` is ignored for immediate rendering and also for `placement: 'line'`.
 * @property {CanvasTextBaseline} [textBaseline='middle'] Text base line. Possible values: `'bottom'`, `'top'`, `'middle'`, `'alphabetic'`,
 * `'hanging'`, `'ideographic'`.
 * @property {import("./Fill.js").default|null} [fill] Fill style. If none is provided, we'll use a dark fill-style (#333). Specify `null` for no fill.
 * @property {import("./Stroke.js").default} [stroke] Stroke style.
 * @property {import("./Fill.js").default} [backgroundFill] Fill style for the text background when `placement` is
 * `'point'`. Default is no fill.
 * @property {import("./Stroke.js").default} [backgroundStroke] Stroke style for the text background  when `placement`
 * is `'point'`. Default is no stroke.
 * @property {Array<number>} [padding=[0, 0, 0, 0]] Padding in pixels around the text for decluttering and background. The order of
 * values in the array is `[top, right, bottom, left]`.
 *//**
 * @classdesc
 * Set text style for vector features.
 * @api
 */class iq{/**
   * @param {Options} [options] Options.
   */constructor(t){t=t||{},/**
     * @private
     * @type {string|undefined}
     */this.font_=t.font,/**
     * @private
     * @type {number|undefined}
     */this.rotation_=t.rotation,/**
     * @private
     * @type {boolean|undefined}
     */this.rotateWithView_=t.rotateWithView,/**
     * @private
     * @type {number|import("../size.js").Size|undefined}
     */this.scale_=t.scale,/**
     * @private
     * @type {import("../size.js").Size}
     */this.scaleArray_=ev(void 0!==t.scale?t.scale:1),/**
     * @private
     * @type {string|Array<string>|undefined}
     */this.text_=t.text,/**
     * @private
     * @type {CanvasTextAlign|undefined}
     */this.textAlign_=t.textAlign,/**
     * @private
     * @type {TextJustify|undefined}
     */this.justify_=t.justify,/**
     * @private
     * @type {number|undefined}
     */this.repeat_=t.repeat,/**
     * @private
     * @type {CanvasTextBaseline|undefined}
     */this.textBaseline_=t.textBaseline,/**
     * @private
     * @type {import("./Fill.js").default}
     */this.fill_=void 0!==t.fill?t.fill:new W({color:"#333"}),/**
     * @private
     * @type {number}
     */this.maxAngle_=void 0!==t.maxAngle?t.maxAngle:Math.PI/4,/**
     * @private
     * @type {TextPlacement}
     */this.placement_=void 0!==t.placement?t.placement:"point",/**
     * @private
     * @type {boolean}
     */this.overflow_=!!t.overflow,/**
     * @private
     * @type {import("./Stroke.js").default}
     */this.stroke_=void 0!==t.stroke?t.stroke:null,/**
     * @private
     * @type {number}
     */this.offsetX_=void 0!==t.offsetX?t.offsetX:0,/**
     * @private
     * @type {number}
     */this.offsetY_=void 0!==t.offsetY?t.offsetY:0,/**
     * @private
     * @type {import("./Fill.js").default}
     */this.backgroundFill_=t.backgroundFill?t.backgroundFill:null,/**
     * @private
     * @type {import("./Stroke.js").default}
     */this.backgroundStroke_=t.backgroundStroke?t.backgroundStroke:null,/**
     * @private
     * @type {Array<number>|null}
     */this.padding_=void 0===t.padding?null:t.padding}/**
   * Clones the style.
   * @return {Text} The cloned style.
   * @api
   */clone(){let t=this.getScale();return new iq({font:this.getFont(),placement:this.getPlacement(),repeat:this.getRepeat(),maxAngle:this.getMaxAngle(),overflow:this.getOverflow(),rotation:this.getRotation(),rotateWithView:this.getRotateWithView(),scale:Array.isArray(t)?t.slice():t,text:this.getText(),textAlign:this.getTextAlign(),justify:this.getJustify(),textBaseline:this.getTextBaseline(),fill:this.getFill()?this.getFill().clone():void 0,stroke:this.getStroke()?this.getStroke().clone():void 0,offsetX:this.getOffsetX(),offsetY:this.getOffsetY(),backgroundFill:this.getBackgroundFill()?this.getBackgroundFill().clone():void 0,backgroundStroke:this.getBackgroundStroke()?this.getBackgroundStroke().clone():void 0,padding:this.getPadding()||void 0})}/**
   * Get the `overflow` configuration.
   * @return {boolean} Let text overflow the length of the path they follow.
   * @api
   */getOverflow(){return this.overflow_}/**
   * Get the font name.
   * @return {string|undefined} Font.
   * @api
   */getFont(){return this.font_}/**
   * Get the maximum angle between adjacent characters.
   * @return {number} Angle in radians.
   * @api
   */getMaxAngle(){return this.maxAngle_}/**
   * Get the label placement.
   * @return {TextPlacement} Text placement.
   * @api
   */getPlacement(){return this.placement_}/**
   * Get the repeat interval of the text.
   * @return {number|undefined} Repeat interval in pixels.
   * @api
   */getRepeat(){return this.repeat_}/**
   * Get the x-offset for the text.
   * @return {number} Horizontal text offset.
   * @api
   */getOffsetX(){return this.offsetX_}/**
   * Get the y-offset for the text.
   * @return {number} Vertical text offset.
   * @api
   */getOffsetY(){return this.offsetY_}/**
   * Get the fill style for the text.
   * @return {import("./Fill.js").default} Fill style.
   * @api
   */getFill(){return this.fill_}/**
   * Determine whether the text rotates with the map.
   * @return {boolean|undefined} Rotate with map.
   * @api
   */getRotateWithView(){return this.rotateWithView_}/**
   * Get the text rotation.
   * @return {number|undefined} Rotation.
   * @api
   */getRotation(){return this.rotation_}/**
   * Get the text scale.
   * @return {number|import("../size.js").Size|undefined} Scale.
   * @api
   */getScale(){return this.scale_}/**
   * Get the symbolizer scale array.
   * @return {import("../size.js").Size} Scale array.
   */getScaleArray(){return this.scaleArray_}/**
   * Get the stroke style for the text.
   * @return {import("./Stroke.js").default} Stroke style.
   * @api
   */getStroke(){return this.stroke_}/**
   * Get the text to be rendered.
   * @return {string|Array<string>|undefined} Text.
   * @api
   */getText(){return this.text_}/**
   * Get the text alignment.
   * @return {CanvasTextAlign|undefined} Text align.
   * @api
   */getTextAlign(){return this.textAlign_}/**
   * Get the justification.
   * @return {TextJustify|undefined} Justification.
   * @api
   */getJustify(){return this.justify_}/**
   * Get the text baseline.
   * @return {CanvasTextBaseline|undefined} Text baseline.
   * @api
   */getTextBaseline(){return this.textBaseline_}/**
   * Get the background fill style for the text.
   * @return {import("./Fill.js").default} Fill style.
   * @api
   */getBackgroundFill(){return this.backgroundFill_}/**
   * Get the background stroke style for the text.
   * @return {import("./Stroke.js").default} Stroke style.
   * @api
   */getBackgroundStroke(){return this.backgroundStroke_}/**
   * Get the padding for the text.
   * @return {Array<number>|null} Padding.
   * @api
   */getPadding(){return this.padding_}/**
   * Set the `overflow` property.
   *
   * @param {boolean} overflow Let text overflow the path that it follows.
   * @api
   */setOverflow(t){this.overflow_=t}/**
   * Set the font.
   *
   * @param {string|undefined} font Font.
   * @api
   */setFont(t){this.font_=t}/**
   * Set the maximum angle between adjacent characters.
   *
   * @param {number} maxAngle Angle in radians.
   * @api
   */setMaxAngle(t){this.maxAngle_=t}/**
   * Set the x offset.
   *
   * @param {number} offsetX Horizontal text offset.
   * @api
   */setOffsetX(t){this.offsetX_=t}/**
   * Set the y offset.
   *
   * @param {number} offsetY Vertical text offset.
   * @api
   */setOffsetY(t){this.offsetY_=t}/**
   * Set the text placement.
   *
   * @param {TextPlacement} placement Placement.
   * @api
   */setPlacement(t){this.placement_=t}/**
   * Set the repeat interval of the text.
   * @param {number|undefined} [repeat] Repeat interval in pixels.
   * @api
   */setRepeat(t){this.repeat_=t}/**
   * Set whether to rotate the text with the view.
   *
   * @param {boolean} rotateWithView Rotate with map.
   * @api
   */setRotateWithView(t){this.rotateWithView_=t}/**
   * Set the fill.
   *
   * @param {import("./Fill.js").default} fill Fill style.
   * @api
   */setFill(t){this.fill_=t}/**
   * Set the rotation.
   *
   * @param {number|undefined} rotation Rotation.
   * @api
   */setRotation(t){this.rotation_=t}/**
   * Set the scale.
   *
   * @param {number|import("../size.js").Size|undefined} scale Scale.
   * @api
   */setScale(t){this.scale_=t,this.scaleArray_=ev(void 0!==t?t:1)}/**
   * Set the stroke.
   *
   * @param {import("./Stroke.js").default} stroke Stroke style.
   * @api
   */setStroke(t){this.stroke_=t}/**
   * Set the text.
   *
   * @param {string|Array<string>|undefined} text Text.
   * @api
   */setText(t){this.text_=t}/**
   * Set the text alignment.
   *
   * @param {CanvasTextAlign|undefined} textAlign Text align.
   * @api
   */setTextAlign(t){this.textAlign_=t}/**
   * Set the justification.
   *
   * @param {TextJustify|undefined} justify Justification.
   * @api
   */setJustify(t){this.justify_=t}/**
   * Set the text baseline.
   *
   * @param {CanvasTextBaseline|undefined} textBaseline Text baseline.
   * @api
   */setTextBaseline(t){this.textBaseline_=t}/**
   * Set the background fill.
   *
   * @param {import("./Fill.js").default} fill Fill style.
   * @api
   */setBackgroundFill(t){this.backgroundFill_=t}/**
   * Set the background stroke.
   *
   * @param {import("./Stroke.js").default} stroke Stroke style.
   * @api
   */setBackgroundStroke(t){this.backgroundStroke_=t}/**
   * Set the padding (`[top, right, bottom, left]`).
   *
   * @param {Array<number>|null} padding Padding.
   * @api
   */setPadding(t){this.padding_=t}}var iJ=/**
 * @module ol/format/XMLFeature
 *//**
 * @module ol/format/Feature
 *//**
 * @typedef {Object} ReadOptions
 * @property {import("../proj.js").ProjectionLike} [dataProjection] Projection of the data we are reading.
 * If not provided, the projection will be derived from the data (where possible) or
 * the `dataProjection` of the format is assigned (where set). If the projection
 * can not be derived from the data and if no `dataProjection` is set for a format,
 * the features will not be reprojected.
 * @property {import("../extent.js").Extent} [extent] Tile extent in map units of the tile being read.
 * This is only required when reading data with tile pixels as geometry units. When configured,
 * a `dataProjection` with `TILE_PIXELS` as `units` and the tile's pixel extent as `extent` needs to be
 * provided.
 * @property {import("../proj.js").ProjectionLike} [featureProjection] Projection of the feature geometries
 * created by the format reader. If not provided, features will be returned in the
 * `dataProjection`.
 *//**
 * @typedef {Object} WriteOptions
 * @property {import("../proj.js").ProjectionLike} [dataProjection] Projection of the data we are writing.
 * If not provided, the `dataProjection` of the format is assigned (where set).
 * If no `dataProjection` is set for a format, the features will be returned
 * in the `featureProjection`.
 * @property {import("../proj.js").ProjectionLike} [featureProjection] Projection of the feature geometries
 * that will be serialized by the format writer. If not provided, geometries are assumed
 * to be in the `dataProjection` if that is set; in other words, they are not transformed.
 * @property {boolean} [rightHanded] When writing geometries, follow the right-hand
 * rule for linear ring orientation.  This means that polygons will have counter-clockwise
 * exterior rings and clockwise interior rings.  By default, coordinates are serialized
 * as they are provided at construction.  If `true`, the right-hand rule will
 * be applied.  If `false`, the left-hand rule will be applied (clockwise for
 * exterior and counter-clockwise for interior rings).  Note that not all
 * formats support this.  The GeoJSON format does use this property when writing
 * geometries.
 * @property {number} [decimals] Maximum number of decimal places for coordinates.
 * Coordinates are stored internally as floats, but floating-point arithmetic can create
 * coordinates with a large number of decimal places, not generally wanted on output.
 * Set a number here to round coordinates. Can also be used to ensure that
 * coordinates read in can be written back out with the same number of decimals.
 * Default is no rounding.
 *//**
 * @typedef {'arraybuffer' | 'json' | 'text' | 'xml'} Type
 *//**
 * @classdesc
 * Abstract base class; normally only used for creating subclasses and not
 * instantiated in apps.
 * Base class for feature formats.
 * {@link module:ol/format/Feature~FeatureFormat} subclasses provide the ability to decode and encode
 * {@link module:ol/Feature~Feature} objects from a variety of commonly used geospatial
 * file formats.  See the documentation for each format for more details.
 *
 * @abstract
 * @api
 */class{constructor(){/**
     * @protected
     * @type {import("../proj/Projection.js").default|undefined}
     */this.dataProjection=void 0,/**
     * @protected
     * @type {import("../proj/Projection.js").default|undefined}
     */this.defaultFeatureProjection=void 0,/**
     * A list media types supported by the format in descending order of preference.
     * @type {Array<string>}
     */this.supportedMediaTypes=null}/**
   * Adds the data projection to the read options.
   * @param {Document|Element|Object|string} source Source.
   * @param {ReadOptions} [options] Options.
   * @return {ReadOptions|undefined} Options.
   * @protected
   */getReadOptions(t,e){if(e){let i=e.dataProjection?en(e.dataProjection):this.readProjection(t);e.extent&&i&&"tile-pixels"===i.getUnits()&&(i=en(i)).setWorldExtent(e.extent),e={dataProjection:i,featureProjection:e.featureProjection}}return this.adaptOptions(e)}/**
   * Sets the `dataProjection` on the options, if no `dataProjection`
   * is set.
   * @param {WriteOptions|ReadOptions|undefined} options
   *     Options.
   * @protected
   * @return {WriteOptions|ReadOptions|undefined}
   *     Updated options.
   */adaptOptions(t){return Object.assign({dataProjection:this.dataProjection,featureProjection:this.defaultFeatureProjection},t)}/**
   * @abstract
   * @return {Type} The format type.
   */getType(){return O()}/**
   * Read a single feature from a source.
   *
   * @abstract
   * @param {Document|Element|Object|string} source Source.
   * @param {ReadOptions} [options] Read options.
   * @return {import("../Feature.js").FeatureLike} Feature.
   */readFeature(t,e){return O()}/**
   * Read all features from a source.
   *
   * @abstract
   * @param {Document|Element|ArrayBuffer|Object|string} source Source.
   * @param {ReadOptions} [options] Read options.
   * @return {Array<import("../Feature.js").FeatureLike>} Features.
   */readFeatures(t,e){return O()}/**
   * Read a single geometry from a source.
   *
   * @abstract
   * @param {Document|Element|Object|string} source Source.
   * @param {ReadOptions} [options] Read options.
   * @return {import("../geom/Geometry.js").default} Geometry.
   */readGeometry(t,e){return O()}/**
   * Read the projection from a source.
   *
   * @abstract
   * @param {Document|Element|Object|string} source Source.
   * @return {import("../proj/Projection.js").default|undefined} Projection.
   */readProjection(t){return O()}/**
   * Encode a feature in this format.
   *
   * @abstract
   * @param {import("../Feature.js").default} feature Feature.
   * @param {WriteOptions} [options] Write options.
   * @return {string|ArrayBuffer} Result.
   */writeFeature(t,e){return O()}/**
   * Encode an array of features in this format.
   *
   * @abstract
   * @param {Array<import("../Feature.js").default>} features Features.
   * @param {WriteOptions} [options] Write options.
   * @return {string|ArrayBuffer} Result.
   */writeFeatures(t,e){return O()}/**
   * Write a single geometry in this format.
   *
   * @abstract
   * @param {import("../geom/Geometry.js").default} geometry Geometry.
   * @param {WriteOptions} [options] Write options.
   * @return {string|ArrayBuffer} Result.
   */writeGeometry(t,e){return O()}};function i$(t,e,i){let n;let r=i?en(i.featureProjection):null,s=i?en(i.dataProjection):null;if(n=r&&s&&!el(r,s)?(e?t.clone():t).transform(e?r:s,e?s:r):t,e&&i&&/** @type {WriteOptions} */void 0!==i.decimals){let e=Math.pow(10,/** @type {WriteOptions} */i.decimals);n===t&&(n=t.clone()),n.applyTransform(function(t){for(let i=0,n=t.length;i<n;++i)t[i]=Math.round(t[i]*e)/e;return t})}return n}/**
 * @module ol/xml
 */let iQ="http://www.w3.org/2001/XMLSchema-instance";function i0(t,e){return no().createElementNS(t,e)}function i1(t,e){return(function t(e,i,n){if(e.nodeType==Node.CDATA_SECTION_NODE||e.nodeType==Node.TEXT_NODE)i?n.push(String(e.nodeValue).replace(/(\r\n|\r|\n)/g,"")):n.push(e.nodeValue);else{let r;for(r=e.firstChild;r;r=r.nextSibling)t(r,i,n)}return n})(t,e,[]).join("")}function i2(t){return"documentElement"in t}function i3(t){return new DOMParser().parseFromString(t,"application/xml")}function i5(t,e){return(/**
     * @param {Node} node Node.
     * @param {Array<*>} objectStack Object stack.
     */function(i,n){let r=t.call(void 0!==e?e:this,i,n);if(void 0!==r){let t=/** @type {Array<*>} */n[n.length-1];E(t,r)}})}function i4(t,e){return(/**
     * @param {Element} node Node.
     * @param {Array<*>} objectStack Object stack.
     */function(i,n){let r=t.call(void 0!==e?e:this,i,n);if(void 0!==r){let t=/** @type {Array<*>} */n[n.length-1];t.push(r)}})}function i6(t,e){return(/**
     * @param {Node} node Node.
     * @param {Array<*>} objectStack Object stack.
     */function(i,n){let r=t.call(void 0!==e?e:this,i,n);void 0!==r&&(n[n.length-1]=r)})}function i8(t,e,i){return(/**
     * @param {Element} node Node.
     * @param {Array<*>} objectStack Object stack.
     */function(n,r){let s=t.call(void 0!==i?i:this,n,r);if(void 0!==s){let t=/** @type {!Object} */r[r.length-1],i=void 0!==e?e:n.localName;t[i]=s}})}function i7(t,e){return function(i,n,r){t.call(void 0!==e?e:this,i,n,r);let s=/** @type {NodeStackItem} */r[r.length-1],o=s.node;o.appendChild(i)}}function i9(t,e){return(/**
     * @param {*} value Value.
     * @param {Array<*>} objectStack Object stack.
     * @param {string} [newNodeName] Node name.
     * @return {Node} Node.
     */function(i,n,r){let s=/** @type {NodeStackItem} */n[n.length-1],o=s.node,l=t;void 0===l&&(l=r);let a=void 0!==e?e:o.namespaceURI;return i0(a,/** @type {string} */l)})}let nt=i9();function ne(t,e){let i=e.length,n=Array(i);for(let r=0;r<i;++r)n[r]=t[e[r]];return n}function ni(t,e,i){let n,r;for(n=0,i=void 0!==i?i:{},r=t.length;n<r;++n)i[t[n]]=e;return i}function nn(t,e,i,n){let r;for(r=e.firstElementChild;r;r=r.nextElementSibling){let e=t[r.namespaceURI];if(void 0!==e){let t=e[r.localName];void 0!==t&&t.call(n,r,i)}}}function nr(t,e,i,n,r){return n.push(t),nn(e,i,n,r),/** @type {T} */n.pop()}function ns(t,e,i,n,r,s,o){return r.push(t),!function(t,e,i,n,r,s){let o,l;let a=(void 0!==r?r:i).length;for(let h=0;h<a;++h)void 0!==(o=i[h])&&void 0!==(l=e.call(void 0!==s?s:this,o,n,void 0!==r?r[h]:void 0))&&t[l.namespaceURI][l.localName].call(s,l,o,n)}(e,i,n,r,s,o),/** @type {O|undefined} */r.pop()}function no(){return void 0===f&&"undefined"!=typeof document&&(f=document.implementation.createDocument("","",null)),f}var nl=/**
 * @classdesc
 * Abstract base class; normally only used for creating subclasses and not
 * instantiated in apps.
 * Base class for XML feature formats.
 *
 * @abstract
 */class extends iJ{constructor(){super(),/**
     * @type {XMLSerializer}
     * @private
     */this.xmlSerializer_=(void 0===g&&"undefined"!=typeof XMLSerializer&&(g=new XMLSerializer),g)}/**
   * @return {import("./Feature.js").Type} Format.
   */getType(){return"xml"}/**
   * Read a single feature.
   *
   * @param {Document|Element|Object|string} source Source.
   * @param {import("./Feature.js").ReadOptions} [options] Read options.
   * @return {import("../Feature.js").default} Feature.
   * @api
   */readFeature(t,e){if(!t)return null;if("string"==typeof t){let i=i3(t);return this.readFeatureFromDocument(i,e)}return i2(t)?this.readFeatureFromDocument(/** @type {Document} */t,e):this.readFeatureFromNode(/** @type {Element} */t,e)}/**
   * @param {Document} doc Document.
   * @param {import("./Feature.js").ReadOptions} [options] Options.
   * @return {import("../Feature.js").default} Feature.
   */readFeatureFromDocument(t,e){let i=this.readFeaturesFromDocument(t,e);return i.length>0?i[0]:null}/**
   * @param {Element} node Node.
   * @param {import("./Feature.js").ReadOptions} [options] Options.
   * @return {import("../Feature.js").default} Feature.
   */readFeatureFromNode(t,e){return null;// not implemented
}/**
   * Read all features from a feature collection.
   *
   * @param {Document|Element|Object|string} source Source.
   * @param {import("./Feature.js").ReadOptions} [options] Options.
   * @return {Array<import("../Feature.js").default>} Features.
   * @api
   */readFeatures(t,e){if(!t)return[];if("string"==typeof t){let i=i3(t);return this.readFeaturesFromDocument(i,e)}return i2(t)?this.readFeaturesFromDocument(/** @type {Document} */t,e):this.readFeaturesFromNode(/** @type {Element} */t,e)}/**
   * @param {Document} doc Document.
   * @param {import("./Feature.js").ReadOptions} [options] Options.
   * @protected
   * @return {Array<import("../Feature.js").default>} Features.
   */readFeaturesFromDocument(t,e){/** @type {Array<import("../Feature.js").default>} */let i=[];for(let n=t.firstChild;n;n=n.nextSibling)n.nodeType==Node.ELEMENT_NODE&&E(i,this.readFeaturesFromNode(/** @type {Element} */n,e));return i}/**
   * @abstract
   * @param {Element} node Node.
   * @param {import("./Feature.js").ReadOptions} [options] Options.
   * @protected
   * @return {Array<import("../Feature.js").default>} Features.
   */readFeaturesFromNode(t,e){return O()}/**
   * Read a single geometry from a source.
   *
   * @param {Document|Element|Object|string} source Source.
   * @param {import("./Feature.js").ReadOptions} [options] Read options.
   * @return {import("../geom/Geometry.js").default} Geometry.
   */readGeometry(t,e){if(!t)return null;if("string"==typeof t){let i=i3(t);return this.readGeometryFromDocument(i,e)}return i2(t)?this.readGeometryFromDocument(/** @type {Document} */t,e):this.readGeometryFromNode(/** @type {Element} */t,e)}/**
   * @param {Document} doc Document.
   * @param {import("./Feature.js").ReadOptions} [options] Options.
   * @protected
   * @return {import("../geom/Geometry.js").default} Geometry.
   */readGeometryFromDocument(t,e){return null;// not implemented
}/**
   * @param {Element} node Node.
   * @param {import("./Feature.js").ReadOptions} [options] Options.
   * @protected
   * @return {import("../geom/Geometry.js").default} Geometry.
   */readGeometryFromNode(t,e){return null;// not implemented
}/**
   * Read the projection from the source.
   *
   * @param {Document|Element|Object|string} source Source.
   * @return {import("../proj/Projection.js").default} Projection.
   * @api
   */readProjection(t){if(!t)return null;if("string"==typeof t){let e=i3(t);return this.readProjectionFromDocument(e)}return i2(t)?this.readProjectionFromDocument(/** @type {Document} */t):this.readProjectionFromNode(/** @type {Element} */t)}/**
   * @param {Document} doc Document.
   * @protected
   * @return {import("../proj/Projection.js").default} Projection.
   */readProjectionFromDocument(t){return this.dataProjection}/**
   * @param {Element} node Node.
   * @protected
   * @return {import("../proj/Projection.js").default} Projection.
   */readProjectionFromNode(t){return this.dataProjection}/**
   * Encode a feature as string.
   *
   * @param {import("../Feature.js").default} feature Feature.
   * @param {import("./Feature.js").WriteOptions} [options] Write options.
   * @return {string} Encoded feature.
   */writeFeature(t,e){let i=this.writeFeatureNode(t,e);return this.xmlSerializer_.serializeToString(i)}/**
   * @param {import("../Feature.js").default} feature Feature.
   * @param {import("./Feature.js").WriteOptions} [options] Options.
   * @protected
   * @return {Node} Node.
   */writeFeatureNode(t,e){return null;// not implemented
}/**
   * Encode an array of features as string.
   *
   * @param {Array<import("../Feature.js").default>} features Features.
   * @param {import("./Feature.js").WriteOptions} [options] Write options.
   * @return {string} Result.
   * @api
   */writeFeatures(t,e){let i=this.writeFeaturesNode(t,e);return this.xmlSerializer_.serializeToString(i)}/**
   * @param {Array<import("../Feature.js").default>} features Features.
   * @param {import("./Feature.js").WriteOptions} [options] Options.
   * @return {Node} Node.
   */writeFeaturesNode(t,e){return null;// not implemented
}/**
   * Encode a geometry as string.
   *
   * @param {import("../geom/Geometry.js").default} geometry Geometry.
   * @param {import("./Feature.js").WriteOptions} [options] Write options.
   * @return {string} Encoded geometry.
   */writeGeometry(t,e){let i=this.writeGeometryNode(t,e);return this.xmlSerializer_.serializeToString(i)}/**
   * @param {import("../geom/Geometry.js").default} geometry Geometry.
   * @param {import("./Feature.js").WriteOptions} [options] Options.
   * @return {Node} Node.
   */writeGeometryNode(t,e){return null;// not implemented
}};/**
 * @module ol/format/xsd
 */function na(t){let e=i1(t,!1);return function(t){let e=/^\s*(true|1)|(false|0)\s*$/.exec(t);if(e)return void 0!==e[1]}(e)}function nh(t){let e=i1(t,!1);return function(t){// FIXME check spec
let e=/^\s*([+\-]?\d*\.?\d+(?:e[+\-]?\d+)?)\s*$/i.exec(t);if(e)return parseFloat(e[1])}(e)}function nu(t){return i1(t,!1).trim()}function nd(t,e){ng(t,e?"1":"0")}function nc(t,e){let i=e.toPrecision();t.appendChild(no().createTextNode(i))}function ng(t,e){t.appendChild(no().createTextNode(e))}/**
 * @typedef {Object} Vec2
 * @property {number} x X coordinate.
 * @property {import("../style/Icon.js").IconAnchorUnits} xunits Units of x.
 * @property {number} y Y coordinate.
 * @property {import("../style/Icon.js").IconAnchorUnits} yunits Units of Y.
 * @property {import("../style/Icon.js").IconOrigin} [origin] Origin.
 *//**
 * @typedef {Object} GxTrackObject
 * @property {Array<Array<number>>} coordinates Coordinates.
 * @property {Array<number>} whens Whens.
 *//**
 * @const
 * @type {Array<string>}
 */let nf=["http://www.google.com/kml/ext/2.2"],n_=[null,"http://earth.google.com/kml/2.0","http://earth.google.com/kml/2.1","http://earth.google.com/kml/2.2","http://www.opengis.net/kml/2.2"],nm={fraction:"fraction",pixels:"pixels",insetPixels:"pixels"},np=ni(n_,{ExtendedData:n9,Region:rt,MultiGeometry:i8(n0,"geometry"),LineString:i8(nJ,"geometry"),LinearRing:i8(n$,"geometry"),Point:i8(n1,"geometry"),Polygon:i8(n3,"geometry"),Style:i8(n4),StyleMap:/**
 * @this {KML}
 * @param {Element} node Node.
 * @param {Array<*>} objectStack Object stack.
 */function(t,e){let i=nN.call(this,t,e);if(!i)return;let n=e[e.length-1];if(Array.isArray(i))n.Style=i;else if("string"==typeof i)n.styleUrl=i;else throw Error("`styleMapValue` has an unknown type")},address:i8(nu),description:i8(nu),name:i8(nu),open:i8(na),phoneNumber:i8(nu),styleUrl:i8(nO),visibility:i8(na)},ni(nf,{MultiTrack:i8(/**
 * @param {Element} node Node.
 * @param {Array<*>} objectStack Object stack.
 * @return {MultiLineString|undefined} MultiLineString.
 */function(t,e){let i=nr([],nj,t,e);if(i)return new ie(i)},"geometry"),Track:i8(nK,"geometry")})),ny=ni(n_,{ExtendedData:n9,Region:rt,Link:/**
 * @param {Element} node Node.
 * @param {Array<*>} objectStack Object stack.
 */function(t,e){nn(nx,t,e)},address:i8(nu),description:i8(nu),name:i8(nu),open:i8(na),phoneNumber:i8(nu),visibility:i8(na)}),nx=ni(n_,{href:i8(nF)}),nv=ni(n_,{Altitude:i8(nh),Longitude:i8(nh),Latitude:i8(nh),Tilt:i8(nh),AltitudeMode:i8(nu),Heading:i8(nh),Roll:i8(nh)}),nE=ni(n_,{LatLonAltBox:/**
 * @param {Element} node Node.
 * @param {Array<*>} objectStack Object stack.
 */function(t,e){let i=nr({},rn,t,e);if(!i)return;let n=/** @type {Object} */e[e.length-1],r=[parseFloat(i.west),parseFloat(i.south),parseFloat(i.east),parseFloat(i.north)];n.extent=r,n.altitudeMode=i.altitudeMode,n.minAltitude=parseFloat(i.minAltitude),n.maxAltitude=parseFloat(i.maxAltitude)},Lod:/**
 * @param {Element} node Node.
 * @param {Array<*>} objectStack Object stack.
 */function(t,e){let i=nr({},rr,t,e);if(!i)return;let n=/** @type {Object} */e[e.length-1];n.minLodPixels=parseFloat(i.minLodPixels),n.maxLodPixels=parseFloat(i.maxLodPixels),n.minFadeExtent=parseFloat(i.minFadeExtent),n.maxFadeExtent=parseFloat(i.maxFadeExtent)}}),nC=ni(n_,["Document","Placemark"]),nS=ni(n_,{Document:i7(/**
 * @param {Element} node Node.
 * @param {Array<Feature>} features Features.
 * @param {Array<*>} objectStack Object stack.
 * @this {KML}
 */function(t,e,i){ns({node:t},rh,ru,e,i,void 0,this)}),Placemark:i7(rO)}),nR=null,nw=null,nT=null,nI=null,nM=null;/**
 * Function that returns the scale needed to normalize an icon image to 32 pixels.
 * @param {import("../size.js").Size} size Image size.
 * @return {number} Scale.
 */function nL(t){return 32/Math.min(t[0],t[1])}/**
 * A function that takes a url `{string}` and returns a url `{string}`.
 * Might be used to change an icon path or to substitute a
 * data url obtained from a KMZ array buffer.
 *
 * @typedef {function(string):string} IconUrlFunction
 * @api
 *//**
 * Function that returns a url unchanged.
 * @param {string} href Input url.
 * @return {string} Output url.
 */function nb(t){return t}/**
 * @param {Node} node Node.
 * @return {import("../color.js").Color|undefined} Color.
 */function nA(t){let e=i1(t,!1),i=/^\s*#?\s*([0-9A-Fa-f]{8})\s*$/.exec(e);if(i){let t=i[1];return[parseInt(t.substr(6,2),16),parseInt(t.substr(4,2),16),parseInt(t.substr(2,2),16),parseInt(t.substr(0,2),16)/255]}}function nP(t){let e,i=i1(t,!1),n=[];// The KML specification states that coordinate tuples should not include
// spaces, but we tolerate them.
i=i.replace(/\s*,\s*/g,",");let r=/^\s*([+\-]?\d*\.?\d+(?:e[+\-]?\d+)?),([+\-]?\d*\.?\d+(?:e[+\-]?\d+)?)(?:\s+|,|$)(?:([+\-]?\d*\.?\d+(?:e[+\-]?\d+)?)(?:\s+|$))?\s*/i;for(;e=r.exec(i);){let t=parseFloat(e[1]),r=parseFloat(e[2]),s=e[3]?parseFloat(e[3]):0;n.push(t,r,s),i=i.substr(e[0].length)}if(""===i)return n}/**
 * @param {Node} node Node.
 * @return {string} URI.
 */function nF(t){let e=i1(t,!1).trim(),i=t.baseURI;if(i&&"about:blank"!=i||(i=window.location.href),i){let t=new URL(e,i);return t.href}return e}/**
 * @param {Node} node Node.
 * @return {string} URI.
 */function nO(t){// KML files in the wild occasionally forget the leading
// `#` on styleUrlsdefined in the same document.
let e=i1(t,!1).trim().replace(/^(?!.*#)/,"#"),i=t.baseURI;if(i&&"about:blank"!=i||(i=window.location.href),i){let t=new URL(e,i);return t.href}return e}/**
 * @param {Node} node Node.
 * @return {number|undefined} Scale.
 */function nD(t){return nh(t)}/**
 * @const
 * @type {Object<string, Object<string, import("../xml.js").Parser>>}
 */// @ts-ignore
let nk=ni(n_,{Pair:/**
 * @param {Element} node Node.
 * @param {Array<*>} objectStack Object stack.
 */function(t,e){let i=nr({},re,t,e,this);if(!i)return;let n=/** @type {string|undefined} */i.key;if(n&&"normal"==n){let t=/** @type {string|undefined} */i.styleUrl;t&&(e[e.length-1]=t);let n=/** @type {Style} */i.Style;n&&(e[e.length-1]=n)}}});/**
 * @this {KML}
 * @param {Element} node Node.
 * @param {Array<*>} objectStack Object stack.
 * @return {Array<Style>|string|undefined} StyleMap.
 */function nN(t,e){return nr(void 0,nk,t,e,this)}/**
 * @const
 * @type {Object<string, Object<string, import("../xml.js").Parser>>}
 */// @ts-ignore
let nG=ni(n_,{Icon:i8(/**
 * @param {Element} node Node.
 * @param {Array<*>} objectStack Object stack.
 * @return {Object} Icon object.
 */function(t,e){let i=nr({},nZ,t,e);return i||null}),color:i8(nA),heading:i8(nh),hotSpot:i8(/**
 * @param {Element} node Node.
 * @return {Vec2} Vec2.
 */function(t){let e=t.getAttribute("xunits"),i=t.getAttribute("yunits");return{x:parseFloat(t.getAttribute("x")),xunits:nm[e],y:parseFloat(t.getAttribute("y")),yunits:nm[i],origin:"insetPixels"!==e?"insetPixels"!==i?"bottom-left":"top-left":"insetPixels"!==i?"bottom-right":"top-right"}}),scale:i8(nD)}),nz=ni(n_,{color:i8(nA),scale:i8(nD)}),nX=ni(n_,{color:i8(nA),width:i8(nh)}),nW=ni(n_,{color:i8(nA),fill:i8(na),outline:i8(na)}),nY=ni(n_,{coordinates:i6(nP)});/**
 * @param {Element} node Node.
 * @param {Array<*>} objectStack Object stack.
 * @return {Array<number>} LinearRing flat coordinates.
 */function nU(t,e){return nr(null,nY,t,e)}/**
 * @const
 * @type {Object<string, Object<string, import("../xml.js").Parser>>}
 */// @ts-ignore
let nj=ni(nf,{Track:i4(nK)}),nB=ni(n_,{when:/**
 * @param {Node} node Node.
 * @param {Array<*>} objectStack Object stack.
 */function(t,e){let i=/** @type {GxTrackObject} */e[e.length-1],n=i.whens,r=i1(t,!1),s=Date.parse(r);n.push(isNaN(s)?0:s)}},ni(nf,{coord:/**
 * @param {Node} node Node.
 * @param {Array<*>} objectStack Object stack.
 */function(t,e){let i=/** @type {GxTrackObject} */e[e.length-1],n=i.coordinates,r=i1(t,!1),s=/^\s*([+\-]?\d+(?:\.\d*)?(?:e[+\-]?\d*)?)\s+([+\-]?\d+(?:\.\d*)?(?:e[+\-]?\d*)?)\s+([+\-]?\d+(?:\.\d*)?(?:e[+\-]?\d*)?)\s*$/i.exec(r);if(s){let t=parseFloat(s[1]),e=parseFloat(s[2]),i=parseFloat(s[3]);n.push([t,e,i])}else n.push([])}}));/**
 * @param {Element} node Node.
 * @param {Array<*>} objectStack Object stack.
 * @return {LineString|undefined} LineString.
 */function nK(t,e){let i=nr(/** @type {GxTrackObject} */{coordinates:[],whens:[]},nB,t,e);if(!i)return;let n=[],r=i.coordinates,s=i.whens;for(let t=0,e=Math.min(r.length,s.length);t<e;++t)3==r[t].length&&n.push(r[t][0],r[t][1],r[t][2],s[t]);return new it(n,"XYZM")}/**
 * @const
 * @type {Object<string, Object<string, import("../xml.js").Parser>>}
 */// @ts-ignore
let nZ=ni(n_,{href:i8(nF)},ni(nf,{x:i8(nh),y:i8(nh),w:i8(nh),h:i8(nh)})),nV=ni(n_,{coordinates:i6(nP)});/**
 * @param {Element} node Node.
 * @param {Array<*>} objectStack Object stack.
 * @return {Array<number>} Flat coordinates.
 */function nH(t,e){return nr(null,nV,t,e)}/**
 * @const
 * @type {Object<string, Object<string, import("../xml.js").Parser>>}
 */// @ts-ignore
let nq=ni(n_,{extrude:i8(na),tessellate:i8(na),altitudeMode:i8(nu)});/**
 * @param {Element} node Node.
 * @param {Array<*>} objectStack Object stack.
 * @return {LineString|undefined} LineString.
 */function nJ(t,e){let i=nr({},nq,t,e),n=nH(t,e);if(n){let t=new it(n,"XYZ");return t.setProperties(i,!0),t}}/**
 * @param {Element} node Node.
 * @param {Array<*>} objectStack Object stack.
 * @return {Polygon|undefined} Polygon.
 */function n$(t,e){let i=nr({},nq,t,e),n=nH(t,e);if(n){let t=new ig(n,"XYZ",[n.length]);return t.setProperties(i,!0),t}}/**
 * @const
 * @type {Object<string, Object<string, import("../xml.js").Parser>>}
 */// @ts-ignore
let nQ=ni(n_,{LineString:i4(nJ),LinearRing:i4(n$),MultiGeometry:i4(n0),Point:i4(n1),Polygon:i4(n3)});/**
 * @param {Element} node Node.
 * @param {Array<*>} objectStack Object stack.
 * @return {import("../geom/Geometry.js").default} Geometry.
 */function n0(t,e){let i;let n=nr([],nQ,t,e);if(!n)return null;if(0===n.length)return new em(n);let r=!0,s=n[0].getType();for(let t=1,e=n.length;t<e;++t)if((0,n[t]).getType()!=s){r=!1;break}if(r){let t,e;if("Point"==s){let r=n[0];t=r.getLayout(),e=r.getFlatCoordinates();for(let t=1,i=n.length;t<i;++t)E(e,(0,n[t]).getFlatCoordinates());n6(i=new ir(e,t),n)}else if("LineString"==s)n6(i=new ie(n),n);else if("Polygon"==s)n6(i=new im(n),n);else if("GeometryCollection"==s)i=new em(n);else throw Error("Unknown geometry type found")}else i=new em(n);return /** @type {import("../geom/Geometry.js").default} */i}/**
 * @param {Element} node Node.
 * @param {Array<*>} objectStack Object stack.
 * @return {Point|undefined} Point.
 */function n1(t,e){let i=nr({},nq,t,e),n=nH(t,e);if(n){let t=new ii(n,"XYZ");return t.setProperties(i,!0),t}}/**
 * @const
 * @type {Object<string, Object<string, import("../xml.js").Parser>>}
 */// @ts-ignore
let n2=ni(n_,{innerBoundaryIs:/**
 * @param {Element} node Node.
 * @param {Array<*>} objectStack Object stack.
 */function(t,e){let i=nr(/** @type {Array<Array<number>>} */[],rs,t,e);if(i.length>0){let t=/** @type {Array<Array<number>>} */e[e.length-1];t.push(...i)}},outerBoundaryIs:/**
 * @param {Element} node Node.
 * @param {Array<*>} objectStack Object stack.
 */function(t,e){/** @type {Array<number>|undefined} */let i=nr(void 0,ro,t,e);if(i){let t=/** @type {Array<Array<number>>} */e[e.length-1];t[0]=i}}});/**
 * @param {Element} node Node.
 * @param {Array<*>} objectStack Object stack.
 * @return {Polygon|undefined} Polygon.
 */function n3(t,e){let i=nr(/** @type {Object<string,*>} */{},nq,t,e),n=nr([null],n2,t,e);if(n&&n[0]){let t=n[0],e=[t.length];for(let i=1,r=n.length;i<r;++i)E(t,n[i]),e.push(t.length);let r=new ig(t,"XYZ",e);return r.setProperties(i,!0),r}}/**
 * @const
 * @type {Object<string, Object<string, import("../xml.js").Parser>>}
 */// @ts-ignore
let n5=ni(n_,{IconStyle:/**
 * @this {KML}
 * @param {Element} node Node.
 * @param {Array<*>} objectStack Object stack.
 */function(t,e){let i,h,u,d,c,g,f;// FIXME refreshMode
// FIXME refreshInterval
// FIXME viewRefreshTime
// FIXME viewBoundScale
// FIXME viewFormat
// FIXME httpQuery
let _=nr({},nG,t,e);if(!_)return;let m=/** @type {Object} */e[e.length-1],p="Icon"in _?_.Icon:{},y=!("Icon"in _)||Object.keys(p).length>0,x=/** @type {string|undefined} */p.href;x?i=x:y&&(i=l);/** @type {import('../style/Icon.js').IconOrigin|undefined} */let v="bottom-left",E=/** @type {Vec2|undefined} */_.hotSpot;E?(h=[E.x,E.y],u=E.xunits,d=E.yunits,v=E.origin):/^https?:\/\/maps\.(?:google|gstatic)\.com\//.test(i)&&(i.includes("pushpin")?(h=n,u=r,d=s):i.includes("arrow-reverse")?(h=[54,42],u=r,d=s):i.includes("paddle")&&(h=[32,1],u=r,d=s));let C=/** @type {number|undefined} */p.x,S=/** @type {number|undefined} */p.y;void 0!==C&&void 0!==S&&(c=[C,S]);let R=/** @type {number|undefined} */p.w,w=/** @type {number|undefined} */p.h;void 0!==R&&void 0!==w&&(g=[R,w]);let T=/** @type {number} */_.heading;void 0!==T&&(f=t$(T));let I=/** @type {number|undefined} */_.scale,M=/** @type {Array<number>|undefined} */_.color;if(y){i==l&&(g=o);let t=new ez({anchor:h,anchorOrigin:v,anchorXUnits:u,anchorYUnits:d,crossOrigin:this.crossOrigin_,offset:c,offsetOrigin:"bottom-left",rotation:f,scale:I,size:g,src:this.iconUrlFunction_(i),color:M}),e=t.getScaleArray()[0],n=t.getSize();if(null===n){let i=t.getImageState();if(i===ey.IDLE||i===ey.LOADING){let n=function(){let i=t.getImageState();if(!(i===ey.IDLE||i===ey.LOADING)){let i=t.getSize();if(i&&2==i.length){let n=nL(i);t.setScale(e*n)}t.unlistenImageChange(n)}};t.listenImageChange(n),i===ey.IDLE&&t.load()}}else if(2==n.length){let i=nL(n);t.setScale(e*i)}m.imageStyle=t}else m.imageStyle=a},LabelStyle:/**
 * @param {Element} node Node.
 * @param {Array<*>} objectStack Object stack.
 */function(t,e){// FIXME colorMode
let n=nr({},nz,t,e);if(!n)return;let r=e[e.length-1],s=new iq({fill:new W({color:/** @type {import("../color.js").Color} */"color"in n?n.color:i}),scale:/** @type {number|undefined} */n.scale});r.textStyle=s},LineStyle:/**
 * @param {Element} node Node.
 * @param {Array<*>} objectStack Object stack.
 */function(t,e){// FIXME colorMode
// FIXME gx:outerColor
// FIXME gx:outerWidth
// FIXME gx:physicalWidth
// FIXME gx:labelVisibility
let n=nr({},nX,t,e);if(!n)return;let r=e[e.length-1],s=new ip({color:/** @type {import("../color.js").Color} */"color"in n?n.color:i,width:/** @type {number} */"width"in n?n.width:1});r.strokeStyle=s},PolyStyle:/**
 * @param {Element} node Node.
 * @param {Array<*>} objectStack Object stack.
 */function(t,e){// FIXME colorMode
let n=nr({},nW,t,e);if(!n)return;let r=e[e.length-1],s=new W({color:/** @type {import("../color.js").Color} */"color"in n?n.color:i});r.fillStyle=s;let o=/** @type {boolean|undefined} */n.fill;void 0!==o&&(r.fill=o);let l=/** @type {boolean|undefined} */n.outline;void 0!==l&&(r.outline=l)}});/**
 * @this {KML}
 * @param {Element} node Node.
 * @param {Array<*>} objectStack Object stack.
 * @return {Array<Style>} Style.
 */function n4(t,e){let i;let n=nr({},n5,t,e,this);if(!n)return null;let r=/** @type {Fill} */"fillStyle"in n?n.fillStyle:nR,s=/** @type {boolean|undefined} */n.fill;void 0===s||s||(r=null),"imageStyle"in n?n.imageStyle!=a&&(i=/** @type {import("../style/Image.js").default} */n.imageStyle):i=nw;let o=/** @type {Text} */"textStyle"in n?n.textStyle:nI,l=/** @type {Stroke} */"strokeStyle"in n?n.strokeStyle:nT,h=/** @type {boolean|undefined} */n.outline;return void 0===h||h?[new iK({fill:r,image:i,stroke:l,text:o,zIndex:void 0})]:[new iK({geometry:function(t){let e=t.getGeometry(),i=e.getType();return"GeometryCollection"===i?new em(/** @type {import("../geom/GeometryCollection").default} */e.getGeometriesArrayRecursive().filter(function(t){let e=t.getType();return"Polygon"!==e&&"MultiPolygon"!==e})):"Polygon"!==i&&"MultiPolygon"!==i?e:void 0},fill:r,image:i,stroke:l,text:o,zIndex:void 0}),new iK({geometry:function(t){let e=t.getGeometry(),i=e.getType();return"GeometryCollection"===i?new em(/** @type {import("../geom/GeometryCollection").default} */e.getGeometriesArrayRecursive().filter(function(t){let e=t.getType();return"Polygon"===e||"MultiPolygon"===e})):"Polygon"===i||"MultiPolygon"===i?e:void 0},fill:r,stroke:null,zIndex:void 0})]}/**
 * Reads an array of geometries and creates arrays for common geometry
 * properties. Then sets them to the multi geometry.
 * @param {MultiPoint|MultiLineString|MultiPolygon} multiGeometry A multi-geometry.
 * @param {Array<import("../geom/Geometry.js").default>} geometries List of geometries.
 */function n6(t,e){let i,n,r;let s=e.length,o=Array(e.length),l=Array(e.length),a=Array(e.length);i=!1,n=!1,r=!1;for(let t=0;t<s;++t){let s=e[t];o[t]=s.get("extrude"),l[t]=s.get("tessellate"),a[t]=s.get("altitudeMode"),i=i||void 0!==o[t],n=n||void 0!==l[t],r=r||a[t]}i&&t.set("extrude",o),n&&t.set("tessellate",l),r&&t.set("altitudeMode",a)}/**
 * @const
 * @type {Object<string, Object<string, import("../xml.js").Parser>>}
 */// @ts-ignore
let n8=ni(n_,{displayName:i8(nu),value:i8(nu)}),n7=ni(n_,{Data:/**
 * @param {Element} node Node.
 * @param {Array<*>} objectStack Object stack.
 */function(t,e){let i=t.getAttribute("name");nn(n8,t,e);let n=/** @type {Object} */e[e.length-1];i&&n.displayName?n[i]={value:n.value,displayName:n.displayName,toString:function(){return n.value}}:null!==i?n[i]=n.value:null!==n.displayName&&(n[n.displayName]=n.value),delete n.value},SchemaData:/**
 * @param {Element} node Node.
 * @param {Array<*>} objectStack Object stack.
 */function(t,e){nn(ri,t,e)}});/**
 * @param {Element} node Node.
 * @param {Array<*>} objectStack Object stack.
 */function n9(t,e){nn(n7,t,e)}/**
 * @param {Element} node Node.
 * @param {Array<*>} objectStack Object stack.
 */function rt(t,e){nn(nE,t,e)}/**
 * @const
 * @type {Object<string, Object<string, import("../xml.js").Parser>>}
 */// @ts-ignore
let re=ni(n_,{Style:i8(n4),key:i8(nu),styleUrl:i8(nO)}),ri=ni(n_,{SimpleData:/**
 * @param {Element} node Node.
 * @param {Array<*>} objectStack Object stack.
 */function(t,e){let i=t.getAttribute("name");if(null!==i){let n=nu(t),r=/** @type {Object} */e[e.length-1];r[i]=n}}}),rn=ni(n_,{altitudeMode:i8(nu),minAltitude:i8(nh),maxAltitude:i8(nh),north:i8(nh),south:i8(nh),east:i8(nh),west:i8(nh)}),rr=ni(n_,{minLodPixels:i8(nh),maxLodPixels:i8(nh),minFadeExtent:i8(nh),maxFadeExtent:i8(nh)}),rs=ni(n_,{// KML spec only allows one LinearRing  per innerBoundaryIs, but Google Earth
// allows multiple, so we parse multiple here too.
LinearRing:i4(nU)}),ro=ni(n_,{LinearRing:i6(nU)});/**
 * @param {Node} node Node to append a TextNode with the color to.
 * @param {import("../color.js").Color|string} color Color.
 */function rl(t,e){let i=eI(e),n=4==i.length?i[3]:1,r=[255*n,i[2],i[1],i[0]];for(let t=0;t<4;++t){let e=Math.floor(/** @type {number} */r[t]).toString(16);r[t]=1==e.length?"0"+e:e}ng(t,r.join(""))}/**
 * @const
 * @type {Object<string, Object<string, import("../xml.js").Serializer>>}
 */// @ts-ignore
let ra=ni(n_,{Data:i7(/**
 * @param {Element} node Node.
 * @param {{name: *, value: *}} pair Name value pair.
 * @param {Array<*>} objectStack Object stack.
 */function(t,e,i){t.setAttribute("name",e.name);let /** @type {import("../xml.js").NodeStackItem} */n={node:t},r=e.value;"object"==typeof r?(null!==r&&r.displayName&&ns(n,ra,nt,[r.displayName],i,["displayName"]),null!==r&&r.value&&ns(n,ra,nt,[r.value],i,["value"])):ns(n,ra,nt,[r],i,["value"])}),value:i7(/**
 * @param {Node} node Node to append a CDATA Section with the value to.
 * @param {string} value Value.
 */function(t,e){ng(t,e)}),displayName:i7(/**
 * @param {Node} node Node to append a TextNode with the name to.
 * @param {string} name DisplayName.
 */function(t,e){!function(t,e){t.appendChild(no().createCDATASection(e))}(t,e)})}),rh=ni(n_,{Placemark:i7(rO)}),ru=function(t,e,i){let n=e[e.length-1].node;return i0(n.namespaceURI,"Placemark")},rd=i9("Data"),rc=ni(n_,["href"],ni(nf,["x","y","w","h"])),rg=ni(n_,{href:i7(ng)},ni(nf,{x:i7(nc),y:i7(nc),w:i7(nc),h:i7(nc)})),rf=function(t,e,i){return i0(nf[0],"gx:"+i)},r_=ni(n_,["scale","heading","Icon","color","hotSpot"]),rm=ni(n_,{Icon:i7(/**
 * @param {Element} node Node.
 * @param {Object} icon Icon object.
 * @param {Array<*>} objectStack Object stack.
 */function(t,e,i){let /** @type {import("../xml.js").NodeStackItem} */n={node:t},r=i[i.length-1].node,s=rc[r.namespaceURI],o=ne(e,s);ns(n,rg,nt,o,i,s),ns(n,rg,rf,o=ne(e,s=rc[nf[0]]),i,s)}),color:i7(rl),heading:i7(nc),hotSpot:i7(/**
 * @param {Element} node Node to append a TextNode with the Vec2 to.
 * @param {Vec2} vec2 Vec2.
 */function(t,e){t.setAttribute("x",String(e.x)),t.setAttribute("y",String(e.y)),t.setAttribute("xunits",e.xunits),t.setAttribute("yunits",e.yunits)}),scale:i7(rj)}),rp=ni(n_,["color","scale"]),ry=ni(n_,{color:i7(rl),scale:i7(rj)}),rx=ni(n_,["color","width"]),rv=ni(n_,{color:i7(rl),width:i7(nc)}),rE={Point:"Point",LineString:"LineString",LinearRing:"LinearRing",Polygon:"Polygon",MultiPoint:"MultiGeometry",MultiLineString:"MultiGeometry",MultiPolygon:"MultiGeometry",GeometryCollection:"MultiGeometry"},rC=function(t,e,i){if(t){let i=e[e.length-1].node;return i0(i.namespaceURI,rE[/** @type {import("../geom/Geometry.js").default} */t.getType()])}},rS=i9("Point"),rR=i9("LineString"),rw=i9("LinearRing"),rT=i9("Polygon"),rI=ni(n_,{LineString:i7(rN),Point:i7(rN),Polygon:i7(rY),GeometryCollection:i7(rM)});/**
 * @param {Element} node Node.
 * @param {import("../geom/Geometry.js").default} geometry Geometry.
 * @param {Array<*>} objectStack Object stack.
 */function rM(t,e,i){let n;let r=e.getType(),s=[];if("GeometryCollection"===r)/** @type {GeometryCollection} */e.getGeometriesArrayRecursive().forEach(function(t){let e=t.getType();if("MultiPoint"===e)s=s.concat(/** @type {MultiPoint} */t.getPoints());else if("MultiLineString"===e)s=s.concat(/** @type {MultiLineString} */t.getLineStrings());else if("MultiPolygon"===e)s=s.concat(/** @type {MultiPolygon} */t.getPolygons());else if("Point"===e||"LineString"===e||"Polygon"===e)s.push(t);else throw Error("Unknown geometry type")}),n=rC;else if("MultiPoint"===r)s=/** @type {MultiPoint} */e.getPoints(),n=rS;else if("MultiLineString"===r)s=/** @type {MultiLineString} */e.getLineStrings(),n=rR;else if("MultiPolygon"===r)s=/** @type {MultiPolygon} */e.getPolygons(),n=rT;else throw Error("Unknown geometry type");ns({node:t},rI,n,s,i)}/**
 * @const
 * @type {Object<string, Object<string, import("../xml.js").Serializer>>}
 */// @ts-ignore
let rL=ni(n_,{LinearRing:i7(rN)});/**
 * @param {Element} node Node.
 * @param {import("../geom/LinearRing.js").default} linearRing Linear ring.
 * @param {Array<*>} objectStack Object stack.
 */function rb(t,e,i){ns({node:t},rL,rw,[e],i)}/**
 * @const
 * @type {Object<string, Object<string, import("../xml.js").Serializer>>}
 */// @ts-ignore
let rA=ni(n_,{ExtendedData:i7(/**
 * @param {Element} node Node.
 * @param {{names: Array<string>, values: (Array<*>)}} namesAndValues Names and values.
 * @param {Array<*>} objectStack Object stack.
 */function(t,e,i){let /** @type {import("../xml.js").NodeStackItem} */n={node:t},r=e.names,s=e.values,o=r.length;for(let t=0;t<o;t++)ns(n,ra,rd,[{name:r[t],value:s[t]}],i)}),MultiGeometry:i7(rM),LineString:i7(rN),LinearRing:i7(rN),Point:i7(rN),Polygon:i7(rY),Style:i7(/**
 * @param {Element} node Node.
 * @param {Object<string, Array<Style>>} styles Styles.
 * @param {Array<*>} objectStack Object stack.
 */function(t,e,i){let n={};if(e.pointStyles.length){let t=e.pointStyles[0].getText();t&&(n.LabelStyle=t);let i=e.pointStyles[0].getImage();i&&"function"==typeof /** @type {?} */i.getSrc&&(n.IconStyle=i)}if(e.lineStyles.length){let t=e.lineStyles[0].getStroke();t&&(n.LineStyle=t)}if(e.polyStyles.length){let t=e.polyStyles[0].getStroke();t&&!n.LineStyle&&(n.LineStyle=t),n.PolyStyle=e.polyStyles[0]}let r=i[i.length-1].node,s=rB[r.namespaceURI],o=ne(n,s);ns({node:t},rK,nt,o,i,s)}),address:i7(ng),description:i7(ng),name:i7(ng),open:i7(nd),phoneNumber:i7(ng),styleUrl:i7(ng),visibility:i7(nd)}),rP=ni(n_,["name","open","visibility","address","phoneNumber","description","styleUrl","Style"]),rF=i9("ExtendedData");/**
 * FIXME currently we do serialize arbitrary/custom feature properties
 * (ExtendedData).
 * @param {Element} node Node.
 * @param {Feature} feature Feature.
 * @param {Array<*>} objectStack Object stack.
 * @this {KML}
 */function rO(t,e,i){let /** @type {import("../xml.js").NodeStackItem} */n={node:t};e.getId()&&t.setAttribute("id",/** @type {string} */e.getId());// serialize properties (properties unknown to KML are not serialized)
let r=e.getProperties(),s={address:1,description:1,name:1,open:1,phoneNumber:1,styleUrl:1,visibility:1};s[e.getGeometryName()]=1;let o=Object.keys(r||{}).sort().filter(function(t){return!s[t]}),l=e.getStyleFunction();if(l){// FIXME the styles returned by the style function are supposed to be
// resolution-independent here
let t=l(e,0);if(t){let i=Array.isArray(t)?t:[t],n=i;if(e.getGeometry()&&(n=i.filter(function(t){let i=t.getGeometryFunction()(e);if(i){let t=i.getType();return"GeometryCollection"===t?/** @type {GeometryCollection} */i.getGeometriesArrayRecursive().filter(function(t){let e=t.getType();return"Point"===e||"MultiPoint"===e}).length:"Point"===t||"MultiPoint"===t}})),this.writeStyles_){let t=i,s=i;e.getGeometry()&&(t=i.filter(function(t){let i=t.getGeometryFunction()(e);if(i){let t=i.getType();return"GeometryCollection"===t?/** @type {GeometryCollection} */i.getGeometriesArrayRecursive().filter(function(t){let e=t.getType();return"LineString"===e||"MultiLineString"===e}).length:"LineString"===t||"MultiLineString"===t}}),s=i.filter(function(t){let i=t.getGeometryFunction()(e);if(i){let t=i.getType();return"GeometryCollection"===t?/** @type {GeometryCollection} */i.getGeometriesArrayRecursive().filter(function(t){let e=t.getType();return"Polygon"===e||"MultiPolygon"===e}).length:"Polygon"===t||"MultiPolygon"===t}})),r.Style={pointStyles:n,lineStyles:t,polyStyles:s}}if(n.length&&void 0===r.name){let t=n[0].getText();t&&(r.name=t.getText())}}}let a=i[i.length-1].node,h=rP[a.namespaceURI],u=ne(r,h);if(ns(n,rA,nt,u,i,h),o.length>0){let t=ne(r,o);ns(n,rA,rF,[{names:o,values:t}],i)}// serialize geometry
let d=/** @type {import("./Feature.js").WriteOptions} */i[0],c=e.getGeometry();c&&(c=i$(c,!0,d)),ns(n,rA,rC,[c],i)}/**
 * @const
 * @type {Object<string, Array<string>>}
 */// @ts-ignore
let rD=ni(n_,["extrude","tessellate","altitudeMode","coordinates"]),rk=ni(n_,{extrude:i7(nd),tessellate:i7(nd),altitudeMode:i7(ng),coordinates:i7(/**
 * @param {Node} node Node to append a TextNode with the coordinates to.
 * @param {Array<number>} coordinates Coordinates.
 * @param {Array<*>} objectStack Object stack.
 */function(t,e,i){let n;let r=i[i.length-1],s=r.layout,o=r.stride;if("XY"==s||"XYM"==s)n=2;else if("XYZ"==s||"XYZM"==s)n=3;else throw Error("Invalid geometry layout");let l=e.length,a="";if(l>0){a+=e[0];for(let t=1;t<n;++t)a+=","+e[t];for(let t=o;t<l;t+=o){a+=" "+e[t];for(let i=1;i<n;++i)a+=","+e[t+i]}}ng(t,a)})});/**
 * @param {Element} node Node.
 * @param {import("../geom/SimpleGeometry.js").default} geometry Geometry.
 * @param {Array<*>} objectStack Object stack.
 */function rN(t,e,i){let n=e.getFlatCoordinates(),/** @type {import("../xml.js").NodeStackItem} */r={node:t};r.layout=e.getLayout(),r.stride=e.getStride();// serialize properties (properties unknown to KML are not serialized)
let s=e.getProperties();s.coordinates=n;let o=i[i.length-1].node,l=rD[o.namespaceURI],a=ne(s,l);ns(r,rk,nt,a,i,l)}/**
 * @const
 * @type {Object<string, Array<string>>}
 */// @ts-ignore
let rG=ni(n_,["color","fill","outline"]),rz=ni(n_,{outerBoundaryIs:i7(rb),innerBoundaryIs:i7(rb)}),rX=i9("innerBoundaryIs"),rW=i9("outerBoundaryIs");/**
 * @param {Element} node Node.
 * @param {Polygon} polygon Polygon.
 * @param {Array<*>} objectStack Object stack.
 */function rY(t,e,i){let n=e.getLinearRings(),r=n.shift(),/** @type {import("../xml.js").NodeStackItem} */s={node:t};ns(s,rz,rX,n,i),ns(s,rz,rW,[r],i)}/**
 * @const
 * @type {Object<string, Object<string, import("../xml.js").Serializer>>}
 */// @ts-ignore
let rU=ni(n_,{color:i7(rl),fill:i7(nd),outline:i7(nd)});/**
 * @param {Node} node Node to append a TextNode with the scale to.
 * @param {number|undefined} scale Scale.
 */function rj(t,e){nc(t,Math.round(1e6*e)/1e6)}/**
 * @const
 * @type {Object<string, Array<string>>}
 */// @ts-ignore
let rB=ni(n_,["IconStyle","LabelStyle","LineStyle","PolyStyle"]),rK=ni(n_,{IconStyle:i7(/**
 * @param {Element} node Node.
 * @param {import("../style/Icon.js").default} style Icon style.
 * @param {Array<*>} objectStack Object stack.
 */function(t,e,i){let /** @type {Object<string, any>} */n={},r=e.getSrc(),s=e.getSize(),l=e.getImageSize(),a={href:r};if(s){a.w=s[0],a.h=s[1];let t=e.getAnchor(),i=e.getOrigin();// top-left
if(i&&l&&0!==i[0]&&i[1]!==s[1]&&(a.x=i[0],a.y=l[1]-(i[1]+s[1])),t&&(t[0]!==s[0]/2||t[1]!==s[1]/2)){let /** @type {Vec2} */e={x:t[0],xunits:"pixels",y:s[1]-t[1],yunits:"pixels"};n.hotSpot=e}}n.Icon=a;let h=e.getScaleArray()[0],u=s;if(null===u&&(u=o),2==u.length){let t=nL(u);h/=t}1!==h&&(n.scale=h);let d=e.getRotation();0!==d&&(n.heading=d);let c=e.getColor();c&&(n.color=c);let g=i[i.length-1].node,f=r_[g.namespaceURI],_=ne(n,f);ns({node:t},rm,nt,_,i,f)}),LabelStyle:i7(/**
 * @param {Element} node Node.
 * @param {Text} style style.
 * @param {Array<*>} objectStack Object stack.
 */function(t,e,i){let n={},r=e.getFill();r&&(n.color=r.getColor());let s=e.getScale();s&&1!==s&&(n.scale=s);let o=i[i.length-1].node,l=rp[o.namespaceURI],a=ne(n,l);ns({node:t},ry,nt,a,i,l)}),LineStyle:i7(/**
 * @param {Element} node Node.
 * @param {Stroke} style style.
 * @param {Array<*>} objectStack Object stack.
 */function(t,e,i){let n={color:e.getColor(),width:Number(e.getWidth())||1},r=i[i.length-1].node,s=rx[r.namespaceURI],o=ne(n,s);ns({node:t},rv,nt,o,i,s)}),PolyStyle:i7(/**
 * @param {Element} node Node.
 * @param {Style} style Style.
 * @param {Array<*>} objectStack Object stack.
 */function(t,e,i){let n=e.getFill(),r=e.getStroke(),s={color:n?n.getColor():void 0,fill:!!n&&void 0,outline:!!r&&void 0},o=i[i.length-1].node,l=rG[o.namespaceURI],a=ne(s,l);ns({node:t},rU,nt,a,i,l)})});var rZ=/**
 * @typedef {Object} Options
 * @property {boolean} [extractStyles=true] Extract styles from the KML.
 * @property {boolean} [showPointNames=true] Show names as labels for placemarks which contain points.
 * @property {Array<Style>} [defaultStyle] Default style. The
 * default default style is the same as Google Earth.
 * @property {boolean} [writeStyles=true] Write styles into KML.
 * @property {null|string} [crossOrigin='anonymous'] The `crossOrigin` attribute for loaded images. Note that you must provide a
 * `crossOrigin` value if you want to access pixel data with the Canvas renderer.
 * @property {IconUrlFunction} [iconUrlFunction] Function that takes a url string and returns a url string.
 * Might be used to change an icon path or to substitute a data url obtained from a KMZ array buffer.
 *//**
 * @classdesc
 * Feature format for reading and writing data in the KML format.
 *
 * {@link module:ol/format/KML~KML#readFeature} will read the first feature from
 * a KML source.
 *
 * MultiGeometries are converted into GeometryCollections if they are a mix of
 * geometry types, and into MultiPoint/MultiLineString/MultiPolygon if they are
 * all of the same type.
 *
 * @api
 */class extends nl{/**
   * @param {Options} [options] Options.
   */constructor(t){super(),t=t||{},nM||(i=[255,255,255,1],nR=new W({color:i}),n=[20,2],r="pixels",s="pixels",o=[64,64],l="https://maps.google.com/mapfiles/kml/pushpin/ylw-pushpin.png",nw=new ez({anchor:n,anchorOrigin:"bottom-left",anchorXUnits:r,anchorYUnits:s,crossOrigin:"anonymous",rotation:0,scale:nL(o),size:o,src:l}),a="NO_IMAGE",nT=new ip({color:i,width:1}),h=new ip({color:[51,51,51,1],width:2}),nI=new iq({font:"bold 16px Helvetica",fill:nR,stroke:h,scale:.8}),nM=[new iK({fill:nR,image:nw,text:nI,stroke:nT,zIndex:0})]),/**
     * @type {import("../proj/Projection.js").default}
     */this.dataProjection=en("EPSG:4326"),/**
     * @private
     * @type {Array<Style>}
     */this.defaultStyle_=t.defaultStyle?t.defaultStyle:nM,/**
     * @private
     * @type {boolean}
     */this.extractStyles_=void 0===t.extractStyles||t.extractStyles,/**
     * @type {boolean}
     */this.writeStyles_=void 0===t.writeStyles||t.writeStyles,/**
     * @private
     * @type {!Object<string, (Array<Style>|string)>}
     */this.sharedStyles_={},/**
     * @private
     * @type {boolean}
     */this.showPointNames_=void 0===t.showPointNames||t.showPointNames,/**
     * @type {null|string}
     */this.crossOrigin_=void 0!==t.crossOrigin?t.crossOrigin:"anonymous",/**
     * @type {IconUrlFunction}
     */this.iconUrlFunction_=t.iconUrlFunction?t.iconUrlFunction:nb,this.supportedMediaTypes=["application/vnd.google-earth.kml+xml"]}/**
   * @param {Node} node Node.
   * @param {Array<*>} objectStack Object stack.
   * @private
   * @return {Array<Feature>|undefined} Features.
   */readDocumentOrFolder_(t,e){// FIXME use scope somehow
let i=ni(n_,{Document:i5(this.readDocumentOrFolder_,this),Folder:i5(this.readDocumentOrFolder_,this),Placemark:i4(this.readPlacemark_,this),Style:this.readSharedStyle_.bind(this),StyleMap:this.readSharedStyleMap_.bind(this)}),n=nr([],i,t,e,this);if(n)return n}/**
   * @param {Element} node Node.
   * @param {Array<*>} objectStack Object stack.
   * @private
   * @return {Feature|undefined} Feature.
   */readPlacemark_(t,e){let i=nr({geometry:null},np,t,e,this);if(!i)return;let n=new X,r=t.getAttribute("id");null!==r&&n.setId(r);let s=/** @type {import("./Feature.js").ReadOptions} */e[0],o=i.geometry;if(o&&i$(o,!1,s),n.setGeometry(o),delete i.geometry,this.extractStyles_){var l,a,d;let t=i.Style,e=i.styleUrl,r=(l=this.defaultStyle_,a=this.sharedStyles_,d=this.showPointNames_,/**
     * @param {Feature} feature feature.
     * @param {number} resolution Resolution.
     * @return {Array<Style>|Style} Style.
     */function(i,n){let r=d,s="",o=[];if(r){let t=i.getGeometry();if(t){if(t instanceof em)r=(o=t.getGeometriesArrayRecursive().filter(function(t){let e=t.getType();return"Point"===e||"MultiPoint"===e})).length>0;else{let e=t.getType();r="Point"===e||"MultiPoint"===e}}}r&&(s=/** @type {string} */i.get("name"),(r=r&&!!s)&&/&[^&]+;/.test(s)&&(u||(u=document.createElement("textarea")),u.innerHTML=s,s=u.value));let c=l;if(t?c=t:e&&(c=/**
 * @param {Array<Style>|string|undefined} styleValue Style value.
 * @param {Array<Style>} defaultStyle Default style.
 * @param {!Object<string, (Array<Style>|string)>} sharedStyles
 * Shared styles.
 * @return {Array<Style>} Style.
 */function t(e,i,n){return Array.isArray(e)?e:"string"==typeof e?t(n[e],i,n):i}(e,l,a)),r){let t=/**
 * @param {Style|undefined} foundStyle Style.
 * @param {string} name Name.
 * @return {Style} style Style.
 */function(t,e){let i=[0,0],n="start",r=t.getImage();if(r){let t=r.getSize();if(t&&2==t.length){let e=r.getScaleArray(),s=r.getAnchor();// Offset the label to be centered to the right of the icon,
// if there is one.
i[0]=e[0]*(t[0]-s[0]),i[1]=e[1]*(t[1]/2-s[1]),n="left"}}let s=t.getText();s?(// clone the text style, customizing it with name, alignments and offset.
// Note that kml does not support many text options that OpenLayers does (rotation, textBaseline).
(s=s.clone()).setFont(s.getFont()||nI.getFont()),s.setScale(s.getScale()||nI.getScale()),s.setFill(s.getFill()||nI.getFill()),s.setStroke(s.getStroke()||h)):s=nI.clone(),s.setText(e),s.setOffsetX(i[0]),s.setOffsetY(i[1]),s.setTextAlign(n);let o=new iK({image:r,text:s});return o}(c[0],s);if(o.length>0){// in multigeometries restrict the name style to points and create a
// style without image or text for geometries requiring fill or stroke
// including any polygon specific style if there is one
t.setGeometry(new em(o));let e=new iK({geometry:c[0].getGeometry(),image:null,fill:c[0].getFill(),stroke:c[0].getStroke(),text:null});return[t,e].concat(c.slice(1))}return t}return c});n.setStyle(r)}return delete i.Style,// we do not remove the styleUrl property from the object, so it
// gets stored on feature when setProperties is called
n.setProperties(i,!0),n}/**
   * @param {Element} node Node.
   * @param {Array<*>} objectStack Object stack.
   * @private
   */readSharedStyle_(t,e){let i=t.getAttribute("id");if(null!==i){let n=n4.call(this,t,e);if(n){let e;let r=t.baseURI;if(r&&"about:blank"!=r||(r=window.location.href),r){let t=new URL("#"+i,r);e=t.href}else e="#"+i;this.sharedStyles_[e]=n}}}/**
   * @param {Element} node Node.
   * @param {Array<*>} objectStack Object stack.
   * @private
   */readSharedStyleMap_(t,e){let i;let n=t.getAttribute("id");if(null===n)return;let r=nN.call(this,t,e);if(!r)return;let s=t.baseURI;if(s&&"about:blank"!=s||(s=window.location.href),s){let t=new URL("#"+n,s);i=t.href}else i="#"+n;this.sharedStyles_[i]=r}/**
   * @param {Element} node Node.
   * @param {import("./Feature.js").ReadOptions} [options] Options.
   * @return {import("../Feature.js").default} Feature.
   */readFeatureFromNode(t,e){if(!n_.includes(t.namespaceURI))return null;let i=this.readPlacemark_(t,[this.getReadOptions(t,e)]);return i||null}/**
   * @protected
   * @param {Element} node Node.
   * @param {import("./Feature.js").ReadOptions} [options] Options.
   * @return {Array<import("../Feature.js").default>} Features.
   */readFeaturesFromNode(t,e){let i;if(!n_.includes(t.namespaceURI))return[];let n=t.localName;if("Document"==n||"Folder"==n)return(i=this.readDocumentOrFolder_(t,[this.getReadOptions(t,e)]))?i:[];if("Placemark"==n){let i=this.readPlacemark_(t,[this.getReadOptions(t,e)]);return i?[i]:[]}if("kml"==n){i=[];for(let n=t.firstElementChild;n;n=n.nextElementSibling){let t=this.readFeaturesFromNode(n,e);t&&E(i,t)}return i}return[]}/**
   * Read the name of the KML.
   *
   * @param {Document|Element|string} source Source.
   * @return {string|undefined} Name.
   * @api
   */readName(t){if(t){if("string"==typeof t){let e=i3(t);return this.readNameFromDocument(e)}return i2(t)?this.readNameFromDocument(/** @type {Document} */t):this.readNameFromNode(/** @type {Element} */t)}}/**
   * @param {Document} doc Document.
   * @return {string|undefined} Name.
   */readNameFromDocument(t){for(let e=/** @type {Node} */t.firstChild;e;e=e.nextSibling)if(e.nodeType==Node.ELEMENT_NODE){let t=this.readNameFromNode(/** @type {Element} */e);if(t)return t}}/**
   * @param {Element} node Node.
   * @return {string|undefined} Name.
   */readNameFromNode(t){for(let e=t.firstElementChild;e;e=e.nextElementSibling)if(n_.includes(e.namespaceURI)&&"name"==e.localName)return nu(e);for(let e=t.firstElementChild;e;e=e.nextElementSibling){let t=e.localName;if(n_.includes(e.namespaceURI)&&("Document"==t||"Folder"==t||"Placemark"==t||"kml"==t)){let t=this.readNameFromNode(e);if(t)return t}}}/**
   * Read the network links of the KML.
   *
   * @param {Document|Element|string} source Source.
   * @return {Array<Object>} Network links.
   * @api
   */readNetworkLinks(t){let e=[];if("string"==typeof t){let i=i3(t);E(e,this.readNetworkLinksFromDocument(i))}else i2(t)?E(e,this.readNetworkLinksFromDocument(/** @type {Document} */t)):E(e,this.readNetworkLinksFromNode(/** @type {Element} */t));return e}/**
   * @param {Document} doc Document.
   * @return {Array<Object>} Network links.
   */readNetworkLinksFromDocument(t){let e=[];for(let i=/** @type {Node} */t.firstChild;i;i=i.nextSibling)i.nodeType==Node.ELEMENT_NODE&&E(e,this.readNetworkLinksFromNode(/** @type {Element} */i));return e}/**
   * @param {Element} node Node.
   * @return {Array<Object>} Network links.
   */readNetworkLinksFromNode(t){let e=[];for(let i=t.firstElementChild;i;i=i.nextElementSibling)if(n_.includes(i.namespaceURI)&&"NetworkLink"==i.localName){let t=nr({},ny,i,[]);e.push(t)}for(let i=t.firstElementChild;i;i=i.nextElementSibling){let t=i.localName;n_.includes(i.namespaceURI)&&("Document"==t||"Folder"==t||"kml"==t)&&E(e,this.readNetworkLinksFromNode(i))}return e}/**
   * Read the regions of the KML.
   *
   * @param {Document|Element|string} source Source.
   * @return {Array<Object>} Regions.
   * @api
   */readRegion(t){let e=[];if("string"==typeof t){let i=i3(t);E(e,this.readRegionFromDocument(i))}else i2(t)?E(e,this.readRegionFromDocument(/** @type {Document} */t)):E(e,this.readRegionFromNode(/** @type {Element} */t));return e}/**
   * @param {Document} doc Document.
   * @return {Array<Object>} Region.
   */readRegionFromDocument(t){let e=[];for(let i=/** @type {Node} */t.firstChild;i;i=i.nextSibling)i.nodeType==Node.ELEMENT_NODE&&E(e,this.readRegionFromNode(/** @type {Element} */i));return e}/**
   * @param {Element} node Node.
   * @return {Array<Object>} Region.
   * @api
   */readRegionFromNode(t){let e=[];for(let i=t.firstElementChild;i;i=i.nextElementSibling)if(n_.includes(i.namespaceURI)&&"Region"==i.localName){let t=nr({},nE,i,[]);e.push(t)}for(let i=t.firstElementChild;i;i=i.nextElementSibling){let t=i.localName;n_.includes(i.namespaceURI)&&("Document"==t||"Folder"==t||"kml"==t)&&E(e,this.readRegionFromNode(i))}return e}/**
   * @typedef {Object} KMLCamera Specifies the observer's viewpoint and associated view parameters.
   * @property {number} [Latitude] Latitude of the camera.
   * @property {number} [Longitude] Longitude of the camera.
   * @property {number} [Altitude] Altitude of the camera.
   * @property {string} [AltitudeMode] Floor-related altitude mode.
   * @property {number} [Heading] Horizontal camera rotation.
   * @property {number} [Tilt] Lateral camera rotation.
   * @property {number} [Roll] Vertical camera rotation.
   *//**
   * Read the cameras of the KML.
   *
   * @param {Document|Element|string} source Source.
   * @return {Array<KMLCamera>} Cameras.
   * @api
   */readCamera(t){let e=[];if("string"==typeof t){let i=i3(t);E(e,this.readCameraFromDocument(i))}else i2(t)?E(e,this.readCameraFromDocument(/** @type {Document} */t)):E(e,this.readCameraFromNode(/** @type {Element} */t));return e}/**
   * @param {Document} doc Document.
   * @return {Array<KMLCamera>} Cameras.
   */readCameraFromDocument(t){let e=[];for(let i=/** @type {Node} */t.firstChild;i;i=i.nextSibling)i.nodeType===Node.ELEMENT_NODE&&E(e,this.readCameraFromNode(/** @type {Element} */i));return e}/**
   * @param {Element} node Node.
   * @return {Array<KMLCamera>} Cameras.
   * @api
   */readCameraFromNode(t){let e=[];for(let i=t.firstElementChild;i;i=i.nextElementSibling)if(n_.includes(i.namespaceURI)&&"Camera"===i.localName){let t=nr({},nv,i,[]);e.push(t)}for(let i=t.firstElementChild;i;i=i.nextElementSibling){let t=i.localName;n_.includes(i.namespaceURI)&&("Document"===t||"Folder"===t||"Placemark"===t||"kml"===t)&&E(e,this.readCameraFromNode(i))}return e}/**
   * Encode an array of features in the KML format as an XML node. GeometryCollections,
   * MultiPoints, MultiLineStrings, and MultiPolygons are output as MultiGeometries.
   *
   * @param {Array<Feature>} features Features.
   * @param {import("./Feature.js").WriteOptions} [options] Options.
   * @return {Node} Node.
   * @api
   */writeFeaturesNode(t,e){e=this.adaptOptions(e);let i=i0(n_[4],"kml"),n="http://www.w3.org/2000/xmlns/";i.setAttributeNS(n,"xmlns:gx",nf[0]),i.setAttributeNS(n,"xmlns:xsi",iQ),i.setAttributeNS(iQ,"xsi:schemaLocation","http://www.opengis.net/kml/2.2 https://developers.google.com/kml/schema/kml22gx.xsd");/** @type {!Object<string, (Array<Feature>|Feature|undefined)>} */let r={};t.length>1?r.Document=t:1==t.length&&(r.Placemark=t[0]);let s=nC[i.namespaceURI],o=ne(r,s);return ns({node:i},nS,nt,o,[e],s,this),i}},rV={/**
   * Triggered when an item is added to the collection.
   * @event module:ol/Collection.CollectionEvent#add
   * @api
   */ADD:"add",/**
   * Triggered when an item is removed from the collection.
   * @event module:ol/Collection.CollectionEvent#remove
   * @api
   */REMOVE:"remove"};/**
 * @enum {string}
 * @private
 */let rH={LENGTH:"length"};class rq extends m{/**
   * @param {import("./CollectionEventType.js").default} type Type.
   * @param {T} element Element.
   * @param {number} index The index of the added or removed element.
   */constructor(t,e,i){super(t),/**
     * The element that is added to or removed from the collection.
     * @type {T}
     * @api
     */this.element=e,/**
     * The index of the added or removed element.
     * @type {number}
     * @api
     */this.index=i}}var rJ=/***
 * @template T
 * @template Return
 * @typedef {import("./Observable").OnSignature<import("./Observable").EventTypes, import("./events/Event.js").default, Return> &
 *   import("./Observable").OnSignature<import("./ObjectEventType").Types|'change:length', import("./Object").ObjectEvent, Return> &
 *   import("./Observable").OnSignature<'add'|'remove', CollectionEvent<T>, Return> &
 *   import("./Observable").CombinedOnSignature<import("./Observable").EventTypes|import("./ObjectEventType").Types|
 *     'change:length'|'add'|'remove',Return>} CollectionOnSignature
 *//**
 * @typedef {Object} Options
 * @property {boolean} [unique=false] Disallow the same item from being added to
 * the collection twice.
 *//**
 * @classdesc
 * An expanded version of standard JS Array, adding convenience methods for
 * manipulation. Add and remove changes to the Collection trigger a Collection
 * event. Note that this does not cover changes to the objects _within_ the
 * Collection; they trigger events on the appropriate object, not on the
 * Collection as a whole.
 *
 * @fires CollectionEvent
 *
 * @template T
 * @api
 */class extends G{/**
   * @param {Array<T>} [array] Array.
   * @param {Options} [options] Collection options.
   */constructor(t,e){if(super(),/***
     * @type {CollectionOnSignature<T, import("./events").EventsKey>}
     */this.on,/***
     * @type {CollectionOnSignature<T, import("./events").EventsKey>}
     */this.once,/***
     * @type {CollectionOnSignature<T, void>}
     */this.un,e=e||{},/**
     * @private
     * @type {boolean}
     */this.unique_=!!e.unique,/**
     * @private
     * @type {!Array<T>}
     */this.array_=t||[],this.unique_)for(let t=0,e=this.array_.length;t<e;++t)this.assertUnique_(this.array_[t],t);this.updateLength_()}/**
   * Remove all elements from the collection.
   * @api
   */clear(){for(;this.getLength()>0;)this.pop()}/**
   * Add elements to the collection.  This pushes each item in the provided array
   * to the end of the collection.
   * @param {!Array<T>} arr Array.
   * @return {Collection<T>} This collection.
   * @api
   */extend(t){for(let e=0,i=t.length;e<i;++e)this.push(t[e]);return this}/**
   * Iterate over each element, calling the provided callback.
   * @param {function(T, number, Array<T>): *} f The function to call
   *     for every element. This function takes 3 arguments (the element, the
   *     index and the array). The return value is ignored.
   * @api
   */forEach(t){let e=this.array_;for(let i=0,n=e.length;i<n;++i)t(e[i],i,e)}/**
   * Get a reference to the underlying Array object. Warning: if the array
   * is mutated, no events will be dispatched by the collection, and the
   * collection's "length" property won't be in sync with the actual length
   * of the array.
   * @return {!Array<T>} Array.
   * @api
   */getArray(){return this.array_}/**
   * Get the element at the provided index.
   * @param {number} index Index.
   * @return {T} Element.
   * @api
   */item(t){return this.array_[t]}/**
   * Get the length of this collection.
   * @return {number} The length of the array.
   * @observable
   * @api
   */getLength(){return this.get(rH.LENGTH)}/**
   * Insert an element at the provided index.
   * @param {number} index Index.
   * @param {T} elem Element.
   * @api
   */insertAt(t,e){if(t<0||t>this.getLength())throw Error("Index out of bounds: "+t);this.unique_&&this.assertUnique_(e),this.array_.splice(t,0,e),this.updateLength_(),this.dispatchEvent(new rq(rV.ADD,e,t))}/**
   * Remove the last element of the collection and return it.
   * Return `undefined` if the collection is empty.
   * @return {T|undefined} Element.
   * @api
   */pop(){return this.removeAt(this.getLength()-1)}/**
   * Insert the provided element at the end of the collection.
   * @param {T} elem Element.
   * @return {number} New length of the collection.
   * @api
   */push(t){this.unique_&&this.assertUnique_(t);let e=this.getLength();return this.insertAt(e,t),this.getLength()}/**
   * Remove the first occurrence of an element from the collection.
   * @param {T} elem Element.
   * @return {T|undefined} The removed element or undefined if none found.
   * @api
   */remove(t){let e=this.array_;for(let i=0,n=e.length;i<n;++i)if(e[i]===t)return this.removeAt(i)}/**
   * Remove the element at the provided index and return it.
   * Return `undefined` if the collection does not contain this index.
   * @param {number} index Index.
   * @return {T|undefined} Value.
   * @api
   */removeAt(t){if(t<0||t>=this.getLength())return;let e=this.array_[t];return this.array_.splice(t,1),this.updateLength_(),this.dispatchEvent(/** @type {CollectionEvent<T>} */new rq(rV.REMOVE,e,t)),e}/**
   * Set the element at the provided index.
   * @param {number} index Index.
   * @param {T} elem Element.
   * @api
   */setAt(t,e){let i=this.getLength();if(t>=i){this.insertAt(t,e);return}if(t<0)throw Error("Index out of bounds: "+t);this.unique_&&this.assertUnique_(e,t);let n=this.array_[t];this.array_[t]=e,this.dispatchEvent(/** @type {CollectionEvent<T>} */new rq(rV.REMOVE,n,t)),this.dispatchEvent(/** @type {CollectionEvent<T>} */new rq(rV.ADD,e,t))}/**
   * @private
   */updateLength_(){this.set(rH.LENGTH,this.array_.length)}/**
   * @private
   * @param {T} elem Element.
   * @param {number} [except] Optional index to ignore.
   */assertUnique_(t,e){for(let i=0,n=this.array_.length;i<n;++i)if(this.array_[i]===t&&i!==e)throw Error("Duplicate item added to a unique collection")}},r$={OPACITY:"opacity",VISIBLE:"visible",EXTENT:"extent",Z_INDEX:"zIndex",MAX_RESOLUTION:"maxResolution",MIN_RESOLUTION:"minResolution",MAX_ZOOM:"maxZoom",MIN_ZOOM:"minZoom",SOURCE:"source",MAP:"map"},rQ=/**
 * A css color, or a function called with a view resolution returning a css color.
 *
 * @typedef {string|function(number):string} BackgroundColor
 * @api
 *//**
 * @typedef {import("../ObjectEventType").Types|'change:extent'|'change:maxResolution'|'change:maxZoom'|
 *    'change:minResolution'|'change:minZoom'|'change:opacity'|'change:visible'|'change:zIndex'} BaseLayerObjectEventTypes
 *//***
 * @template Return
 * @typedef {import("../Observable").OnSignature<import("../Observable").EventTypes, import("../events/Event.js").default, Return> &
 *   import("../Observable").OnSignature<BaseLayerObjectEventTypes, import("../Object").ObjectEvent, Return> &
 *   import("../Observable").CombinedOnSignature<import("../Observable").EventTypes|BaseLayerObjectEventTypes, Return>} BaseLayerOnSignature
 *//**
 * @typedef {Object} Options
 * @property {string} [className='ol-layer'] A CSS class name to set to the layer element.
 * @property {number} [opacity=1] Opacity (0, 1).
 * @property {boolean} [visible=true] Visibility.
 * @property {import("../extent.js").Extent} [extent] The bounding extent for layer rendering.  The layer will not be
 * rendered outside of this extent.
 * @property {number | undefined} [zIndex] The z-index for layer rendering.  At rendering time, the layers
 * will be ordered, first by Z-index and then by position. When `undefined`, a `zIndex` of 0 is assumed
 * for layers that are added to the map's `layers` collection, or `Infinity` when the layer's `setMap()`
 * method was used.
 * @property {number} [minResolution] The minimum resolution (inclusive) at which this layer will be
 * visible.
 * @property {number} [maxResolution] The maximum resolution (exclusive) below which this layer will
 * be visible.
 * @property {number} [minZoom] The minimum view zoom level (exclusive) above which this layer will be
 * visible.
 * @property {number} [maxZoom] The maximum view zoom level (inclusive) at which this layer will
 * be visible.
 * @property {BackgroundColor} [background] Background color for the layer. If not specified, no background
 * will be rendered.
 * @property {Object<string, *>} [properties] Arbitrary observable properties. Can be accessed with `#get()` and `#set()`.
 *//**
 * @classdesc
 * Abstract base class; normally only used for creating subclasses and not
 * instantiated in apps.
 * Note that with {@link module:ol/layer/Base~BaseLayer} and all its subclasses, any property set in
 * the options is set as a {@link module:ol/Object~BaseObject} property on the layer object, so
 * is observable, and has get/set accessors.
 *
 * @api
 */class extends G{/**
   * @param {Options} options Layer options.
   */constructor(t){super(),/***
     * @type {BaseLayerOnSignature<import("../events").EventsKey>}
     */this.on,/***
     * @type {BaseLayerOnSignature<import("../events").EventsKey>}
     */this.once,/***
     * @type {BaseLayerOnSignature<void>}
     */this.un,/**
     * @type {BackgroundColor|false}
     * @private
     */this.background_=t.background;/**
     * @type {Object<string, *>}
     */let e=Object.assign({},t);"object"==typeof t.properties&&(delete e.properties,Object.assign(e,t.properties)),e[r$.OPACITY]=void 0!==t.opacity?t.opacity:1,z("number"==typeof e[r$.OPACITY],"Layer opacity must be a number"),e[r$.VISIBLE]=void 0===t.visible||t.visible,e[r$.Z_INDEX]=t.zIndex,e[r$.MAX_RESOLUTION]=void 0!==t.maxResolution?t.maxResolution:1/0,e[r$.MIN_RESOLUTION]=void 0!==t.minResolution?t.minResolution:0,e[r$.MIN_ZOOM]=void 0!==t.minZoom?t.minZoom:-1/0,e[r$.MAX_ZOOM]=void 0!==t.maxZoom?t.maxZoom:1/0,/**
     * @type {string}
     * @private
     */this.className_=void 0!==e.className?e.className:"ol-layer",delete e.className,this.setProperties(e),/**
     * @type {import("./Layer.js").State}
     * @private
     */this.state_=null}/**
   * Get the background for this layer.
   * @return {BackgroundColor|false} Layer background.
   */getBackground(){return this.background_}/**
   * @return {string} CSS class name.
   */getClassName(){return this.className_}/**
   * This method is not meant to be called by layers or layer renderers because the state
   * is incorrect if the layer is included in a layer group.
   *
   * @param {boolean} [managed] Layer is managed.
   * @return {import("./Layer.js").State} Layer state.
   */getLayerState(t){/** @type {import("./Layer.js").State} */let e=this.state_||/** @type {?} */{layer:this,managed:void 0===t||t},i=this.getZIndex();return e.opacity=tH(Math.round(100*this.getOpacity())/100,0,1),e.visible=this.getVisible(),e.extent=this.getExtent(),e.zIndex=void 0!==i||e.managed?i:1/0,e.maxResolution=this.getMaxResolution(),e.minResolution=Math.max(this.getMinResolution(),0),e.minZoom=this.getMinZoom(),e.maxZoom=this.getMaxZoom(),this.state_=e,e}/**
   * @abstract
   * @param {Array<import("./Layer.js").default>} [array] Array of layers (to be
   *     modified in place).
   * @return {Array<import("./Layer.js").default>} Array of layers.
   */getLayersArray(t){return O()}/**
   * @abstract
   * @param {Array<import("./Layer.js").State>} [states] Optional list of layer
   *     states (to be modified in place).
   * @return {Array<import("./Layer.js").State>} List of layer states.
   */getLayerStatesArray(t){return O()}/**
   * Return the {@link module:ol/extent~Extent extent} of the layer or `undefined` if it
   * will be visible regardless of extent.
   * @return {import("../extent.js").Extent|undefined} The layer extent.
   * @observable
   * @api
   */getExtent(){return /** @type {import("../extent.js").Extent|undefined} */this.get(r$.EXTENT)}/**
   * Return the maximum resolution of the layer. Returns Infinity if
   * the layer has no maximum resolution set.
   * @return {number} The maximum resolution of the layer.
   * @observable
   * @api
   */getMaxResolution(){return /** @type {number} */this.get(r$.MAX_RESOLUTION)}/**
   * Return the minimum resolution of the layer. Returns 0 if
   * the layer has no minimum resolution set.
   * @return {number} The minimum resolution of the layer.
   * @observable
   * @api
   */getMinResolution(){return /** @type {number} */this.get(r$.MIN_RESOLUTION)}/**
   * Return the minimum zoom level of the layer. Returns -Infinity if
   * the layer has no minimum zoom set.
   * @return {number} The minimum zoom level of the layer.
   * @observable
   * @api
   */getMinZoom(){return /** @type {number} */this.get(r$.MIN_ZOOM)}/**
   * Return the maximum zoom level of the layer. Returns Infinity if
   * the layer has no maximum zoom set.
   * @return {number} The maximum zoom level of the layer.
   * @observable
   * @api
   */getMaxZoom(){return /** @type {number} */this.get(r$.MAX_ZOOM)}/**
   * Return the opacity of the layer (between 0 and 1).
   * @return {number} The opacity of the layer.
   * @observable
   * @api
   */getOpacity(){return /** @type {number} */this.get(r$.OPACITY)}/**
   * @abstract
   * @return {import("../source/Source.js").State} Source state.
   */getSourceState(){return O()}/**
   * Return the value of this layer's `visible` property. To find out whether the layer
   * is visible on a map, use `isVisible()` instead.
   * @return {boolean} The value of the `visible` property of the layer.
   * @observable
   * @api
   */getVisible(){return /** @type {boolean} */this.get(r$.VISIBLE)}/**
   * Return the Z-index of the layer, which is used to order layers before
   * rendering. Returns undefined if the layer is unmanaged.
   * @return {number|undefined} The Z-index of the layer.
   * @observable
   * @api
   */getZIndex(){return /** @type {number|undefined} */this.get(r$.Z_INDEX)}/**
   * Sets the background color.
   * @param {BackgroundColor} [background] Background color.
   */setBackground(t){this.background_=t,this.changed()}/**
   * Set the extent at which the layer is visible.  If `undefined`, the layer
   * will be visible at all extents.
   * @param {import("../extent.js").Extent|undefined} extent The extent of the layer.
   * @observable
   * @api
   */setExtent(t){this.set(r$.EXTENT,t)}/**
   * Set the maximum resolution at which the layer is visible.
   * @param {number} maxResolution The maximum resolution of the layer.
   * @observable
   * @api
   */setMaxResolution(t){this.set(r$.MAX_RESOLUTION,t)}/**
   * Set the minimum resolution at which the layer is visible.
   * @param {number} minResolution The minimum resolution of the layer.
   * @observable
   * @api
   */setMinResolution(t){this.set(r$.MIN_RESOLUTION,t)}/**
   * Set the maximum zoom (exclusive) at which the layer is visible.
   * Note that the zoom levels for layer visibility are based on the
   * view zoom level, which may be different from a tile source zoom level.
   * @param {number} maxZoom The maximum zoom of the layer.
   * @observable
   * @api
   */setMaxZoom(t){this.set(r$.MAX_ZOOM,t)}/**
   * Set the minimum zoom (inclusive) at which the layer is visible.
   * Note that the zoom levels for layer visibility are based on the
   * view zoom level, which may be different from a tile source zoom level.
   * @param {number} minZoom The minimum zoom of the layer.
   * @observable
   * @api
   */setMinZoom(t){this.set(r$.MIN_ZOOM,t)}/**
   * Set the opacity of the layer, allowed values range from 0 to 1.
   * @param {number} opacity The opacity of the layer.
   * @observable
   * @api
   */setOpacity(t){z("number"==typeof t,"Layer opacity must be a number"),this.set(r$.OPACITY,t)}/**
   * Set the visibility of the layer (`true` or `false`).
   * @param {boolean} visible The visibility of the layer.
   * @observable
   * @api
   */setVisible(t){this.set(r$.VISIBLE,t)}/**
   * Set Z-index of the layer, which is used to order layers before rendering.
   * The default Z-index is 0.
   * @param {number} zindex The z-index of the layer.
   * @observable
   * @api
   */setZIndex(t){this.set(r$.Z_INDEX,t)}/**
   * Clean up.
   */disposeInternal(){this.state_&&(this.state_.layer=null,this.state_=null),super.disposeInternal()}},r0/**
 * @typedef {'postrender'|'precompose'|'postcompose'|'rendercomplete'} MapRenderEventTypes
 */={/**
   * Triggered before a layer is rendered.
   * @event module:ol/render/Event~RenderEvent#prerender
   * @api
   */PRERENDER:"prerender",/**
   * Triggered after a layer is rendered.
   * @event module:ol/render/Event~RenderEvent#postrender
   * @api
   */POSTRENDER:"postrender",/**
   * Triggered before layers are composed.  When dispatched by the map, the event object will not have
   * a `context` set.  When dispatched by a layer, the event object will have a `context` set.  Only
   * WebGL layers currently dispatch this event.
   * @event module:ol/render/Event~RenderEvent#precompose
   * @api
   */PRECOMPOSE:"precompose",/**
   * Triggered after layers are composed.  When dispatched by the map, the event object will not have
   * a `context` set.  When dispatched by a layer, the event object will have a `context` set.  Only
   * WebGL layers currently dispatch this event.
   * @event module:ol/render/Event~RenderEvent#postcompose
   * @api
   */POSTCOMPOSE:"postcompose",/**
   * Triggered when rendering is complete, i.e. all sources and tiles have
   * finished loading for the current viewport, and all tiles are faded in.
   * The event object will not have a `context` set.
   * @event module:ol/render/Event~RenderEvent#rendercomplete
   * @api
   */RENDERCOMPLETE:"rendercomplete"},r1={ANIMATING:0,INTERACTING:1},r2={CENTER:"center",RESOLUTION:"resolution",ROTATION:"rotation"};/**
 * @module ol/centerconstraint
 */function r3(t,e,i){return(/**
     * @param {import("./coordinate.js").Coordinate|undefined} center Center.
     * @param {number|undefined} resolution Resolution.
     * @param {import("./size.js").Size} size Viewport size; unused if `onlyCenter` was specified.
     * @param {boolean} [isMoving] True if an interaction or animation is in progress.
     * @param {Array<number>} [centerShift] Shift between map center and viewport center.
     * @return {import("./coordinate.js").Coordinate|undefined} Center.
     */function(n,r,s,o,l){if(!n)return;if(!r&&!e)return n;let a=e?0:s[0]*r,h=e?0:s[1]*r,u=l?l[0]:0,d=l?l[1]:0,c=t[0]+a/2+u,g=t[2]-a/2+u,f=t[1]+h/2+d,_=t[3]-h/2+d;c>g&&(g=c=(g+c)/2),f>_&&(_=f=(_+f)/2);let m=tH(n[0],c,g),p=tH(n[1],f,_);// during an interaction, allow some overscroll
if(o&&i&&r){let t=30*r;m+=-t*Math.log(1+Math.max(0,c-n[0])/t)+t*Math.log(1+Math.max(0,n[0]-g)/t),p+=-t*Math.log(1+Math.max(0,f-n[1])/t)+t*Math.log(1+Math.max(0,n[1]-_)/t)}return[m,p]})}function r5(t){return t}/**
 * @module ol/resolutionconstraint
 *//**
 * @typedef {function((number|undefined), number, import("./size.js").Size, boolean=): (number|undefined)} Type
 *//**
 * Returns a modified resolution taking into account the viewport size and maximum
 * allowed extent.
 * @param {number} resolution Resolution
 * @param {import("./extent.js").Extent} maxExtent Maximum allowed extent.
 * @param {import("./size.js").Size} viewportSize Viewport size.
 * @param {boolean} showFullExtent Whether to show the full extent.
 * @return {number} Capped resolution.
 */function r4(t,e,i,n){let r=tb(e)/i[0],s=tT(e)/i[1];return n?Math.min(t,Math.max(r,s)):Math.min(t,Math.min(r,s))}/**
 * Returns a modified resolution to be between maxResolution and minResolution while
 * still allowing the value to be slightly out of bounds.
 * Note: the computation is based on the logarithm function (ln):
 *  - at 1, ln(x) is 0
 *  - above 1, ln(x) keeps increasing but at a much slower pace than x
 * The final result is clamped to prevent getting too far away from bounds.
 * @param {number} resolution Resolution.
 * @param {number} maxResolution Max resolution.
 * @param {number} minResolution Min resolution.
 * @return {number} Smoothed resolution.
 */function r6(t,e,i){let n=Math.min(t,e);return n*=Math.log(1+50*Math.max(0,t/e-1))/50+1,i&&(n=Math.max(n,i)/(Math.log(1+50*Math.max(0,i/t-1))/50+1)),tH(n,i/2,2*e)}function r8(t,e,i,n,r){return i=void 0===i||i,/**
     * @param {number|undefined} resolution Resolution.
     * @param {number} direction Direction.
     * @param {import("./size.js").Size} size Viewport size.
     * @param {boolean} [isMoving] True if an interaction or animation is in progress.
     * @return {number|undefined} Resolution.
     */function(s,o,l,a){if(void 0!==s){let o=n?r4(t,n,l,r):t;return i&&a?r6(s,o,e):tH(s,e,o)}}}/**
 * @module ol/rotationconstraint
 */function r7(t){if(void 0!==t)return 0}function r9(t){if(void 0!==t)return t}/**
 * @module ol/easing
 *//**
 * Start slow and speed up.
 * @param {number} t Input between 0 and 1.
 * @return {number} Output between 0 and 1.
 * @api
 */function st(t){return Math.pow(t,3)}function se(t){return 1-st(1-t)}function si(t){return 3*t*t-2*t*t*t}function sn(t){return t}/**
 * @param {Function} callback Callback.
 * @param {*} returnValue Return value.
 */function sr(t,e){setTimeout(function(){t(e)},0)}/**
 * @param {import("./coordinate.js").Coordinate} coordinate Coordinate.
 * @param {import("./size.js").Size} size Box pixel size.
 * @param {import("./pixel.js").Pixel} position Position on the view to center on.
 * @param {number} resolution Resolution.
 * @param {number} rotation Rotation.
 * @return {import("./coordinate.js").Coordinate} Shifted center.
 */function ss(t,e,i,n,r){// calculate rotated position
let s=Math.cos(-r),o=Math.sin(-r),l=t[0]*s-t[1]*o,a=t[1]*s+t[0]*o;l+=(e[0]/2-i[0])*n,a+=(i[1]-e[1]/2)*n,// go back to original angle
o=-o;let h=l*s-a*o,u=a*s+l*o;return[h,u]}var so=/**
 * @typedef {import("./ObjectEventType").Types|'change:center'|'change:resolution'|'change:rotation'} ViewObjectEventTypes
 *//***
 * @template Return
 * @typedef {import("./Observable").OnSignature<import("./Observable").EventTypes, import("./events/Event.js").default, Return> &
 *   import("./Observable").OnSignature<ViewObjectEventTypes, import("./Object").ObjectEvent, Return> &
 *   import("./Observable").CombinedOnSignature<import("./Observable").EventTypes|ViewObjectEventTypes, Return>} ViewOnSignature
 *//**
 * @classdesc
 * A View object represents a simple 2D view of the map.
 *
 * This is the object to act upon to change the center, resolution,
 * and rotation of the map.
 *
 * A View has a `projection`. The projection determines the
 * coordinate system of the center, and its units determine the units of the
 * resolution (projection units per pixel). The default projection is
 * Web Mercator (EPSG:3857).
 *
 * ### The view states
 *
 * A View is determined by three states: `center`, `resolution`,
 * and `rotation`. Each state has a corresponding getter and setter, e.g.
 * `getCenter` and `setCenter` for the `center` state.
 *
 * The `zoom` state is actually not saved on the view: all computations
 * internally use the `resolution` state. Still, the `setZoom` and `getZoom`
 * methods are available, as well as `getResolutionForZoom` and
 * `getZoomForResolution` to switch from one system to the other.
 *
 * ### The constraints
 *
 * `setCenter`, `setResolution` and `setRotation` can be used to change the
 * states of the view, but any constraint defined in the constructor will
 * be applied along the way.
 *
 * A View object can have a *resolution constraint*, a *rotation constraint*
 * and a *center constraint*.
 *
 * The *resolution constraint* typically restricts min/max values and
 * snaps to specific resolutions. It is determined by the following
 * options: `resolutions`, `maxResolution`, `maxZoom` and `zoomFactor`.
 * If `resolutions` is set, the other three options are ignored. See
 * documentation for each option for more information. By default, the view
 * only has a min/max restriction and allow intermediary zoom levels when
 * pinch-zooming for example.
 *
 * The *rotation constraint* snaps to specific angles. It is determined
 * by the following options: `enableRotation` and `constrainRotation`.
 * By default rotation is allowed and its value is snapped to zero when approaching the
 * horizontal.
 *
 * The *center constraint* is determined by the `extent` option. By
 * default the view center is not constrained at all.
 *
 * ### Changing the view state
 *
 * It is important to note that `setZoom`, `setResolution`, `setCenter` and
 * `setRotation` are subject to the above mentioned constraints. As such, it
 * may sometimes not be possible to know in advance the resulting state of the
 * View. For example, calling `setResolution(10)` does not guarantee that
 * `getResolution()` will return `10`.
 *
 * A consequence of this is that, when applying a delta on the view state, one
 * should use `adjustCenter`, `adjustRotation`, `adjustZoom` and `adjustResolution`
 * rather than the corresponding setters. This will let view do its internal
 * computations. Besides, the `adjust*` methods also take an `anchor`
 * argument which allows specifying an origin for the transformation.
 *
 * ### Interacting with the view
 *
 * View constraints are usually only applied when the view is *at rest*, meaning that
 * no interaction or animation is ongoing. As such, if the user puts the view in a
 * state that is not equivalent to a constrained one (e.g. rotating the view when
 * the snap angle is 0), an animation will be triggered at the interaction end to
 * put back the view to a stable state;
 *
 * @api
 */class extends G{/**
   * @param {ViewOptions} [options] View options.
   */constructor(t){var e,i;super(),/***
     * @type {ViewOnSignature<import("./events").EventsKey>}
     */this.on,/***
     * @type {ViewOnSignature<import("./events").EventsKey>}
     */this.once,/***
     * @type {ViewOnSignature<void>}
     */this.un,t=Object.assign({},t),/**
     * @private
     * @type {Array<number>}
     */this.hints_=[0,0],/**
     * @private
     * @type {Array<Array<Animation>>}
     */this.animations_=[],/**
     * @private
     * @type {number|undefined}
     */this.updateAnimationKey_,/**
     * @private
     * @const
     * @type {import("./proj/Projection.js").default}
     */this.projection_=eo(t.projection,"EPSG:3857"),/**
     * @private
     * @type {import("./size.js").Size}
     */this.viewportSize_=[100,100],/**
     * @private
     * @type {import("./coordinate.js").Coordinate|undefined}
     */this.targetCenter_=null,/**
     * @private
     * @type {number|undefined}
     */this.targetResolution_,/**
     * @private
     * @type {number|undefined}
     */this.targetRotation_,/**
     * @private
     * @type {import("./coordinate.js").Coordinate}
     */this.nextCenter_=null,/**
     * @private
     * @type {number}
     */this.nextResolution_,/**
     * @private
     * @type {number}
     */this.nextRotation_,/**
     * @private
     * @type {import("./coordinate.js").Coordinate|undefined}
     */this.cancelAnchor_=void 0,t.projection&&t9(),t.center&&(t.center=ed(t.center,this.projection_)),t.extent&&(t.extent=(e=t.extent,this.projection_,e)),this.applyOptions_(t)}/**
   * Set up the view with the given options.
   * @param {ViewOptions} options View options.
   */applyOptions_(t){let e=Object.assign({},t);for(let t in r2)delete e[t];this.setProperties(e,!0);let i=function(t){var e,i,n,r,s,o;let l,a,h;let u=void 0!==t.minZoom?t.minZoom:0,d=void 0!==t.maxZoom?t.maxZoom:28,c=void 0!==t.zoomFactor?t.zoomFactor:2,g=void 0!==t.multiWorld&&t.multiWorld,f=void 0===t.smoothResolutionConstraint||t.smoothResolutionConstraint,_=void 0!==t.showFullExtent&&t.showFullExtent,m=eo(t.projection,"EPSG:3857"),p=m.getExtent(),y=t.constrainOnlyCenter,x=t.extent;if(!g&&!x&&m.isGlobal()&&(y=!1,x=p),void 0!==t.resolutions){let n=t.resolutions;(a=n[u],h=void 0!==n[d]?n[d]:n[n.length-1],t.constrainResolution)?(e=f,i=!y&&x,e=void 0===e||e,l=/**
     * @param {number|undefined} resolution Resolution.
     * @param {number} direction Direction.
     * @param {import("./size.js").Size} size Viewport size.
     * @param {boolean} [isMoving] True if an interaction or animation is in progress.
     * @return {number|undefined} Resolution.
     */function(t,r,s,o){if(void 0!==t){let l=n[0],a=n[n.length-1],h=i?r4(l,i,s,_):l;// during interacting or animating, allow intermediary values
if(o)return e?r6(t,h,a):tH(t,a,h);let u=Math.min(h,t),d=Math.floor(v(n,u,r));return n[d]>h&&d<n.length-1?n[d+1]:n[d]}}):l=r8(a,h,f,!y&&x,_)}else{// calculate the default min and max resolution
let e=p?Math.max(tb(p),tT(p)):360*tO.degrees/m.getMetersPerUnit(),i=e/256/1;(void 0!==// user provided maxResolution takes precedence
(a=t.maxResolution)?u=0:a=i/Math.pow(c,u),void 0===// user provided minResolution takes precedence
(h=t.minResolution)&&(h=void 0!==t.maxZoom?void 0!==t.maxResolution?a/Math.pow(c,d):i/Math.pow(c,d):i/268435456),// given discrete zoom levels, minResolution may be different than provided
d=u+Math.floor(Math.log(a/h)/Math.log(c)),h=a/Math.pow(c,d-u),t.constrainResolution)?(n=a,r=h,s=f,o=!y&&x,s=void 0===s||s,r=void 0!==r?r:0,l=/**
     * @param {number|undefined} resolution Resolution.
     * @param {number} direction Direction.
     * @param {import("./size.js").Size} size Viewport size.
     * @param {boolean} [isMoving] True if an interaction or animation is in progress.
     * @return {number|undefined} Resolution.
     */function(t,e,i,l){if(void 0!==t){let a=o?r4(n,o,i,_):n;// during interacting or animating, allow intermediary values
if(l)return s?r6(t,a,r):tH(t,r,a);let h=Math.ceil(Math.log(n/a)/Math.log(c)-1e-9),u=Math.min(a,t),d=Math.floor(Math.log(n/u)/Math.log(c)+(-(.499999999*e)+.5)),g=n/Math.pow(c,Math.max(h,d));return tH(g,r,a)}}):l=r8(a,h,f,!y&&x,_)}return{constraint:l,maxResolution:a,minResolution:h,minZoom:u,zoomFactor:c}}(t);/**
     * @private
     * @type {number}
     */this.maxResolution_=i.maxResolution,/**
     * @private
     * @type {number}
     */this.minResolution_=i.minResolution,/**
     * @private
     * @type {number}
     */this.zoomFactor_=i.zoomFactor,/**
     * @private
     * @type {Array<number>|undefined}
     */this.resolutions_=t.resolutions,/**
     * @type {Array<number>|undefined}
     * @private
     */this.padding_=t.padding,/**
     * @private
     * @type {number}
     */this.minZoom_=i.minZoom;let n=function(t){if(void 0!==t.extent){let e=void 0===t.smoothExtentConstraint||t.smoothExtentConstraint;return r3(t.extent,t.constrainOnlyCenter,e)}let e=eo(t.projection,"EPSG:3857");if(!0!==t.multiWorld&&e.isGlobal()){let t=e.getExtent().slice();return t[0]=-1/0,t[2]=1/0,r3(t,!1,!1)}return r5}(t),r=i.constraint,s=function(t){let e=void 0===t.enableRotation||t.enableRotation;if(e){let e=t.constrainRotation;if(void 0===e||!0===e){var i;return i=i||t$(5),/**
     * @param {number|undefined} rotation Rotation.
     * @param {boolean} [isMoving] True if an interaction or animation is in progress.
     * @return {number|undefined} Rotation.
     */function(t,e){return e?t:void 0!==t?Math.abs(t)<=i?0:t:void 0}}return!1===e?r9:"number"==typeof e?function(t){let e=2*Math.PI/t;return(/**
     * @param {number|undefined} rotation Rotation.
     * @param {boolean} [isMoving] True if an interaction or animation is in progress.
     * @return {number|undefined} Rotation.
     */function(t,i){return i?t:void 0!==t?t=Math.floor(t/e+.5)*e:void 0})}(e):r9}return r7}(t);/**
     * @private
     * @type {Constraints}
     */this.constraints_={center:n,resolution:r,rotation:s},this.setRotation(void 0!==t.rotation?t.rotation:0),this.setCenterInternal(void 0!==t.center?t.center:null),void 0!==t.resolution?this.setResolution(t.resolution):void 0!==t.zoom&&this.setZoom(t.zoom)}/**
   * Padding (in css pixels).
   * If the map viewport is partially covered with other content (overlays) along
   * its edges, this setting allows to shift the center of the viewport away from that
   * content. The order of the values in the array is top, right, bottom, left.
   * The default is no padding, which is equivalent to `[0, 0, 0, 0]`.
   * @type {Array<number>|undefined}
   * @api
   */get padding(){return this.padding_}set padding(t){let e=this.padding_;this.padding_=t;let i=this.getCenterInternal();if(i){let n=t||[0,0,0,0];e=e||[0,0,0,0];let r=this.getResolution(),s=r/2*(n[3]-e[3]+e[1]-n[1]),o=r/2*(n[0]-e[0]+e[2]-n[2]);this.setCenterInternal([i[0]+s,i[1]-o])}}/**
   * Get an updated version of the view options used to construct the view.  The
   * current resolution (or zoom), center, and rotation are applied to any stored
   * options.  The provided options can be used to apply new min/max zoom or
   * resolution limits.
   * @param {ViewOptions} newOptions New options to be applied.
   * @return {ViewOptions} New options updated with the current view state.
   */getUpdatedOptions_(t){let e=this.getProperties();return void 0!==e.resolution?e.resolution=this.getResolution():e.zoom=this.getZoom(),// preserve center
e.center=this.getCenterInternal(),// preserve rotation
e.rotation=this.getRotation(),Object.assign({},e,t)}/**
   * Animate the view.  The view's center, zoom (or resolution), and rotation
   * can be animated for smooth transitions between view states.  For example,
   * to animate the view to a new zoom level:
   *
   *     view.animate({zoom: view.getZoom() + 1});
   *
   * By default, the animation lasts one second and uses in-and-out easing.  You
   * can customize this behavior by including `duration` (in milliseconds) and
   * `easing` options (see {@link module:ol/easing}).
   *
   * To chain together multiple animations, call the method with multiple
   * animation objects.  For example, to first zoom and then pan:
   *
   *     view.animate({zoom: 10}, {center: [0, 0]});
   *
   * If you provide a function as the last argument to the animate method, it
   * will get called at the end of an animation series.  The callback will be
   * called with `true` if the animation series completed on its own or `false`
   * if it was cancelled.
   *
   * Animations are cancelled by user interactions (e.g. dragging the map) or by
   * calling `view.setCenter()`, `view.setResolution()`, or `view.setRotation()`
   * (or another method that calls one of these).
   *
   * @param {...(AnimationOptions|function(boolean): void)} var_args Animation
   *     options.  Multiple animations can be run in series by passing multiple
   *     options objects.  To run multiple animations in parallel, call the method
   *     multiple times.  An optional callback can be provided as a final
   *     argument.  The callback will be called with a boolean indicating whether
   *     the animation completed without being cancelled.
   * @api
   */animate(t){this.isDef()&&!this.getAnimating()&&this.resolveConstraints(0);let e=Array(arguments.length);for(let t=0;t<e.length;++t){let i=arguments[t];i.center&&((i=Object.assign({},i)).center=ed(i.center,this.getProjection())),i.anchor&&((i=Object.assign({},i)).anchor=ed(i.anchor,this.getProjection())),e[t]=i}this.animateInternal.apply(this,e)}/**
   * @param {...(AnimationOptions|function(boolean): void)} var_args Animation options.
   */animateInternal(t){let e,i=arguments.length;i>1&&"function"==typeof arguments[i-1]&&(e=arguments[i-1],--i);let n=0;for(;n<i&&!this.isDef();++n){// if view properties are not yet set, shortcut to the final state
let t=arguments[n];t.center&&this.setCenterInternal(t.center),void 0!==t.zoom?this.setZoom(t.zoom):t.resolution&&this.setResolution(t.resolution),void 0!==t.rotation&&this.setRotation(t.rotation)}if(n===i){e&&sr(e,!0);return}let r=Date.now(),s=this.targetCenter_.slice(),o=this.targetResolution_,l=this.targetRotation_,a=[];for(;n<i;++n){let t=/** @type {AnimationOptions} */arguments[n],i={start:r,complete:!1,anchor:t.anchor,duration:void 0!==t.duration?t.duration:1e3,easing:t.easing||si,callback:e};if(t.center&&(i.sourceCenter=s,i.targetCenter=t.center.slice(),s=i.targetCenter),void 0!==t.zoom?(i.sourceResolution=o,i.targetResolution=this.getResolutionForZoom(t.zoom),o=i.targetResolution):t.resolution&&(i.sourceResolution=o,i.targetResolution=t.resolution,o=i.targetResolution),void 0!==t.rotation){i.sourceRotation=l;let e=tQ(t.rotation-l+Math.PI,2*Math.PI)-Math.PI;i.targetRotation=l+e,l=i.targetRotation}(!i.sourceCenter||!i.targetCenter||t3(i.sourceCenter,i.targetCenter))&&i.sourceResolution===i.targetResolution&&i.sourceRotation===i.targetRotation?i.complete=!0:r+=i.duration,a.push(i)}this.animations_.push(a),this.setHint(r1.ANIMATING,1),this.updateAnimations_()}/**
   * Determine if the view is being animated.
   * @return {boolean} The view is being animated.
   * @api
   */getAnimating(){return this.hints_[r1.ANIMATING]>0}/**
   * Determine if the user is interacting with the view, such as panning or zooming.
   * @return {boolean} The view is being interacted with.
   * @api
   */getInteracting(){return this.hints_[r1.INTERACTING]>0}/**
   * Cancel any ongoing animations.
   * @api
   */cancelAnimations(){let t;this.setHint(r1.ANIMATING,-this.hints_[r1.ANIMATING]);for(let e=0,i=this.animations_.length;e<i;++e){let i=this.animations_[e];if(i[0].callback&&sr(i[0].callback,!1),!t)for(let e=0,n=i.length;e<n;++e){let n=i[e];if(!n.complete){t=n.anchor;break}}}this.animations_.length=0,this.cancelAnchor_=t,this.nextCenter_=null,this.nextResolution_=NaN,this.nextRotation_=NaN}/**
   * Update all animations.
   */updateAnimations_(){if(void 0!==this.updateAnimationKey_&&(cancelAnimationFrame(this.updateAnimationKey_),this.updateAnimationKey_=void 0),!this.getAnimating())return;let t=Date.now(),e=!1;for(let i=this.animations_.length-1;i>=0;--i){let n=this.animations_[i],r=!0;for(let i=0,s=n.length;i<s;++i){let s=n[i];if(s.complete)continue;let o=t-s.start,l=s.duration>0?o/s.duration:1;l>=1?(s.complete=!0,l=1):r=!1;let a=s.easing(l);if(s.sourceCenter){let t=s.sourceCenter[0],e=s.sourceCenter[1],i=s.targetCenter[0],n=s.targetCenter[1];this.nextCenter_=s.targetCenter;let r=t+a*(i-t),o=e+a*(n-e);this.targetCenter_=[r,o]}if(s.sourceResolution&&s.targetResolution){let t=1===a?s.targetResolution:s.sourceResolution+a*(s.targetResolution-s.sourceResolution);if(s.anchor){let e=this.getViewportSize_(this.getRotation()),i=this.constraints_.resolution(t,0,e,!0);this.targetCenter_=this.calculateCenterZoom(i,s.anchor)}this.nextResolution_=s.targetResolution,this.targetResolution_=t,this.applyTargetState_(!0)}if(void 0!==s.sourceRotation&&void 0!==s.targetRotation){let t=1===a?tQ(s.targetRotation+Math.PI,2*Math.PI)-Math.PI:s.sourceRotation+a*(s.targetRotation-s.sourceRotation);if(s.anchor){let e=this.constraints_.rotation(t,!0);this.targetCenter_=this.calculateCenterRotate(e,s.anchor)}this.nextRotation_=s.targetRotation,this.targetRotation_=t}if(this.applyTargetState_(!0),e=!0,!s.complete)break}if(r){this.animations_[i]=null,this.setHint(r1.ANIMATING,-1),this.nextCenter_=null,this.nextResolution_=NaN,this.nextRotation_=NaN;let t=n[0].callback;t&&sr(t,!0)}}// prune completed series
this.animations_=this.animations_.filter(Boolean),e&&void 0===this.updateAnimationKey_&&(this.updateAnimationKey_=requestAnimationFrame(this.updateAnimations_.bind(this)))}/**
   * @param {number} rotation Target rotation.
   * @param {import("./coordinate.js").Coordinate} anchor Rotation anchor.
   * @return {import("./coordinate.js").Coordinate|undefined} Center for rotation and anchor.
   */calculateCenterRotate(t,e){let i;let n=this.getCenterInternal();if(void 0!==n){var r;t5(i=[n[0]-e[0],n[1]-e[1]],t-this.getRotation()),r=i,r[0]+=+e[0],r[1]+=+e[1]}return i}/**
   * @param {number} resolution Target resolution.
   * @param {import("./coordinate.js").Coordinate} anchor Zoom anchor.
   * @return {import("./coordinate.js").Coordinate|undefined} Center for resolution and anchor.
   */calculateCenterZoom(t,e){let i;let n=this.getCenterInternal(),r=this.getResolution();if(void 0!==n&&void 0!==r){let s=e[0]-t*(e[0]-n[0])/r,o=e[1]-t*(e[1]-n[1])/r;i=[s,o]}return i}/**
   * Returns the current viewport size.
   * @private
   * @param {number} [rotation] Take into account the rotation of the viewport when giving the size
   * @return {import("./size.js").Size} Viewport size or `[100, 100]` when no viewport is found.
   */getViewportSize_(t){let e=this.viewportSize_;if(t){let i=e[0],n=e[1];return[Math.abs(i*Math.cos(t))+Math.abs(n*Math.sin(t)),Math.abs(i*Math.sin(t))+Math.abs(n*Math.cos(t))]}return e}/**
   * Stores the viewport size on the view. The viewport size is not read every time from the DOM
   * to avoid performance hit and layout reflow.
   * This should be done on map size change.
   * Note: the constraints are not resolved during an animation to avoid stopping it
   * @param {import("./size.js").Size} [size] Viewport size; if undefined, [100, 100] is assumed
   */setViewportSize(t){this.viewportSize_=Array.isArray(t)?t.slice():[100,100],this.getAnimating()||this.resolveConstraints(0)}/**
   * Get the view center.
   * @return {import("./coordinate.js").Coordinate|undefined} The center of the view.
   * @observable
   * @api
   */getCenter(){var t;let e=this.getCenterInternal();return e&&this.getProjection(),e}/**
   * Get the view center without transforming to user projection.
   * @return {import("./coordinate.js").Coordinate|undefined} The center of the view.
   */getCenterInternal(){return /** @type {import("./coordinate.js").Coordinate|undefined} */this.get(r2.CENTER)}/**
   * @return {Constraints} Constraints.
   */getConstraints(){return this.constraints_}/**
   * @return {boolean} Resolution constraint is set
   */getConstrainResolution(){return this.get("constrainResolution")}/**
   * @param {Array<number>} [hints] Destination array.
   * @return {Array<number>} Hint.
   */getHints(t){return void 0!==t?(t[0]=this.hints_[0],t[1]=this.hints_[1],t):this.hints_.slice()}/**
   * Calculate the extent for the current view state and the passed size.
   * The size is the pixel dimensions of the box into which the calculated extent
   * should fit. In most cases you want to get the extent of the entire map,
   * that is `map.getSize()`.
   * @param {import("./size.js").Size} [size] Box pixel size. If not provided, the size
   * of the map that uses this view will be used.
   * @return {import("./extent.js").Extent} Extent.
   * @api
   */calculateExtent(t){var e;let i=this.calculateExtentInternal(t);return this.getProjection(),i}/**
   * @param {import("./size.js").Size} [size] Box pixel size. If not provided,
   * the map's last known viewport size will be used.
   * @return {import("./extent.js").Extent} Extent.
   */calculateExtentInternal(t){t=t||this.getViewportSizeMinusPadding_();let e=/** @type {!import("./coordinate.js").Coordinate} */this.getCenterInternal();z(e,"The view center is not defined");let i=/** @type {!number} */this.getResolution();z(void 0!==i,"The view resolution is not defined");let n=/** @type {!number} */this.getRotation();return z(void 0!==n,"The view rotation is not defined"),tR(e,i,n,t)}/**
   * Get the maximum resolution of the view.
   * @return {number} The maximum resolution of the view.
   * @api
   */getMaxResolution(){return this.maxResolution_}/**
   * Get the minimum resolution of the view.
   * @return {number} The minimum resolution of the view.
   * @api
   */getMinResolution(){return this.minResolution_}/**
   * Get the maximum zoom level for the view.
   * @return {number} The maximum zoom level.
   * @api
   */getMaxZoom(){return /** @type {number} */this.getZoomForResolution(this.minResolution_)}/**
   * Set a new maximum zoom level for the view.
   * @param {number} zoom The maximum zoom level.
   * @api
   */setMaxZoom(t){this.applyOptions_(this.getUpdatedOptions_({maxZoom:t}))}/**
   * Get the minimum zoom level for the view.
   * @return {number} The minimum zoom level.
   * @api
   */getMinZoom(){return /** @type {number} */this.getZoomForResolution(this.maxResolution_)}/**
   * Set a new minimum zoom level for the view.
   * @param {number} zoom The minimum zoom level.
   * @api
   */setMinZoom(t){this.applyOptions_(this.getUpdatedOptions_({minZoom:t}))}/**
   * Set whether the view should allow intermediary zoom levels.
   * @param {boolean} enabled Whether the resolution is constrained.
   * @api
   */setConstrainResolution(t){this.applyOptions_(this.getUpdatedOptions_({constrainResolution:t}))}/**
   * Get the view projection.
   * @return {import("./proj/Projection.js").default} The projection of the view.
   * @api
   */getProjection(){return this.projection_}/**
   * Get the view resolution.
   * @return {number|undefined} The resolution of the view.
   * @observable
   * @api
   */getResolution(){return /** @type {number|undefined} */this.get(r2.RESOLUTION)}/**
   * Get the resolutions for the view. This returns the array of resolutions
   * passed to the constructor of the View, or undefined if none were given.
   * @return {Array<number>|undefined} The resolutions of the view.
   * @api
   */getResolutions(){return this.resolutions_}/**
   * Get the resolution for a provided extent (in map units) and size (in pixels).
   * @param {import("./extent.js").Extent} extent Extent.
   * @param {import("./size.js").Size} [size] Box pixel size.
   * @return {number} The resolution at which the provided extent will render at
   *     the given size.
   * @api
   */getResolutionForExtent(t,e){var i;return this.getResolutionForExtentInternal((this.getProjection(),t),e)}/**
   * Get the resolution for a provided extent (in map units) and size (in pixels).
   * @param {import("./extent.js").Extent} extent Extent.
   * @param {import("./size.js").Size} [size] Box pixel size.
   * @return {number} The resolution at which the provided extent will render at
   *     the given size.
   */getResolutionForExtentInternal(t,e){e=e||this.getViewportSizeMinusPadding_();let i=tb(t)/e[0],n=tT(t)/e[1];return Math.max(i,n)}/**
   * Return a function that returns a value between 0 and 1 for a
   * resolution. Exponential scaling is assumed.
   * @param {number} [power] Power.
   * @return {function(number): number} Resolution for value function.
   */getResolutionForValueFunction(t){t=t||2;let e=this.getConstrainedResolution(this.maxResolution_),i=this.minResolution_,n=Math.log(e/i)/Math.log(t);return(/**
       * @param {number} value Value.
       * @return {number} Resolution.
       */function(i){let r=e/Math.pow(t,i*n);return r})}/**
   * Get the view rotation.
   * @return {number} The rotation of the view in radians.
   * @observable
   * @api
   */getRotation(){return /** @type {number} */this.get(r2.ROTATION)}/**
   * Return a function that returns a resolution for a value between
   * 0 and 1. Exponential scaling is assumed.
   * @param {number} [power] Power.
   * @return {function(number): number} Value for resolution function.
   */getValueForResolutionFunction(t){let e=Math.log(t||2),i=this.getConstrainedResolution(this.maxResolution_),n=this.minResolution_,r=Math.log(i/n)/e;return(/**
       * @param {number} resolution Resolution.
       * @return {number} Value.
       */function(t){return Math.log(i/t)/e/r})}/**
   * Returns the size of the viewport minus padding.
   * @private
   * @param {number} [rotation] Take into account the rotation of the viewport when giving the size
   * @return {import("./size.js").Size} Viewport size reduced by the padding.
   */getViewportSizeMinusPadding_(t){let e=this.getViewportSize_(t),i=this.padding_;return i&&(e=[e[0]-i[1]-i[3],e[1]-i[0]-i[2]]),e}/**
   * @return {State} View state.
   */getState(){let t=this.getProjection(),e=this.getResolution(),i=this.getRotation(),n=/** @type {import("./coordinate.js").Coordinate} */this.getCenterInternal(),r=this.padding_;if(r){let t=this.getViewportSizeMinusPadding_();n=ss(n,this.getViewportSize_(),[t[0]/2+r[3],t[1]/2+r[0]],e,i)}return{center:n.slice(0),projection:void 0!==t?t:null,resolution:e,nextCenter:this.nextCenter_,nextResolution:this.nextResolution_,nextRotation:this.nextRotation_,rotation:i,zoom:this.getZoom()}}/**
   * @return {ViewStateLayerStateExtent} Like `FrameState`, but just `viewState` and `extent`.
   */getViewStateAndExtent(){return{viewState:this.getState(),extent:this.calculateExtent()}}/**
   * Get the current zoom level. This method may return non-integer zoom levels
   * if the view does not constrain the resolution, or if an interaction or
   * animation is underway.
   * @return {number|undefined} Zoom.
   * @api
   */getZoom(){let t;let e=this.getResolution();return void 0!==e&&(t=this.getZoomForResolution(e)),t}/**
   * Get the zoom level for a resolution.
   * @param {number} resolution The resolution.
   * @return {number|undefined} The zoom level for the provided resolution.
   * @api
   */getZoomForResolution(t){let e,i,n=this.minZoom_||0;if(this.resolutions_){let r=v(this.resolutions_,t,1);n=r,e=this.resolutions_[r],i=r==this.resolutions_.length-1?2:e/this.resolutions_[r+1]}else e=this.maxResolution_,i=this.zoomFactor_;return n+Math.log(e/t)/Math.log(i)}/**
   * Get the resolution for a zoom level.
   * @param {number} zoom Zoom level.
   * @return {number} The view resolution for the provided zoom level.
   * @api
   */getResolutionForZoom(t){if(this.resolutions_){if(this.resolutions_.length<=1)return 0;let e=tH(Math.floor(t),0,this.resolutions_.length-2),i=this.resolutions_[e]/this.resolutions_[e+1];return this.resolutions_[e]/Math.pow(i,tH(t-e,0,1))}return this.maxResolution_/Math.pow(this.zoomFactor_,t-this.minZoom_)}/**
   * Fit the given geometry or extent based on the given map size and border.
   * The size is pixel dimensions of the box to fit the extent into.
   * In most cases you will want to use the map size, that is `map.getSize()`.
   * Takes care of the map angle.
   * @param {import("./geom/SimpleGeometry.js").default|import("./extent.js").Extent} geometryOrExtent The geometry or
   *     extent to fit the view to.
   * @param {FitOptions} [options] Options.
   * @api
   */fit(t,e){var i,n,r;let s;if(z(Array.isArray(t)||"function"==typeof /** @type {?} */t.getSimplifiedGeometry,"Invalid extent or geometry provided as `geometry`"),Array.isArray(t)){z(!tP(t),"Cannot fit empty extent provided as `geometry`");let e=(this.getProjection(),t);s=i_(e)}else if("Circle"===t.getType()){let e=(n=t.getExtent(),this.getProjection(),n);(s=i_(e)).rotate(this.getRotation(),tS(e))}else s=t;this.fitInternal(s,e)}/**
   * Calculate rotated extent
   * @param {import("./geom/SimpleGeometry.js").default} geometry The geometry.
   * @return {import("./extent").Extent} The rotated extent for the geometry.
   */rotatedExtentForGeometry(t){let e=this.getRotation(),i=Math.cos(e),n=Math.sin(-e),r=t.getFlatCoordinates(),s=t.getStride(),o=1/0,l=1/0,a=-1/0,h=-1/0;for(let t=0,e=r.length;t<e;t+=s){let e=r[t]*i-r[t+1]*n,s=r[t]*n+r[t+1]*i;o=Math.min(o,e),l=Math.min(l,s),a=Math.max(a,e),h=Math.max(h,s)}return[o,l,a,h]}/**
   * @param {import("./geom/SimpleGeometry.js").default} geometry The geometry.
   * @param {FitOptions} [options] Options.
   */fitInternal(t,e){let i;let n=(e=e||{}).size;n||(n=this.getViewportSizeMinusPadding_());let r=void 0!==e.padding?e.padding:[0,0,0,0],s=void 0!==e.nearest&&e.nearest;i=void 0!==e.minResolution?e.minResolution:void 0!==e.maxZoom?this.getResolutionForZoom(e.maxZoom):0;let o=this.rotatedExtentForGeometry(t),l=this.getResolutionForExtentInternal(o,[n[0]-r[1]-r[3],n[1]-r[0]-r[2]]);l=isNaN(l)?i:Math.max(l,i),l=this.getConstrainedResolution(l,s?0:1);// calculate center
let a=this.getRotation(),h=Math.sin(a),u=Math.cos(a),d=tS(o);d[0]+=(r[1]-r[3])/2*l,d[1]+=(r[0]-r[2])/2*l;let c=d[0]*u-d[1]*h,g=d[1]*u+d[0]*h,f=this.getConstrainedCenter([c,g],l),_=e.callback?e.callback:w;void 0!==e.duration?this.animateInternal({resolution:l,center:f,duration:e.duration,easing:e.easing},_):(this.targetResolution_=l,this.targetCenter_=f,this.applyTargetState_(!1,!0),sr(_,!0))}/**
   * Center on coordinate and view position.
   * @param {import("./coordinate.js").Coordinate} coordinate Coordinate.
   * @param {import("./size.js").Size} size Box pixel size.
   * @param {import("./pixel.js").Pixel} position Position on the view to center on.
   * @api
   */centerOn(t,e,i){this.centerOnInternal(ed(t,this.getProjection()),e,i)}/**
   * @param {import("./coordinate.js").Coordinate} coordinate Coordinate.
   * @param {import("./size.js").Size} size Box pixel size.
   * @param {import("./pixel.js").Pixel} position Position on the view to center on.
   */centerOnInternal(t,e,i){this.setCenterInternal(ss(t,e,i,this.getResolution(),this.getRotation()))}/**
   * Calculates the shift between map and viewport center.
   * @param {import("./coordinate.js").Coordinate} center Center.
   * @param {number} resolution Resolution.
   * @param {number} rotation Rotation.
   * @param {import("./size.js").Size} size Size.
   * @return {Array<number>|undefined} Center shift.
   */calculateCenterShift(t,e,i,n){let r;let s=this.padding_;if(s&&t){let o=this.getViewportSizeMinusPadding_(-i),l=ss(t,n,[o[0]/2+s[3],o[1]/2+s[0]],e,i);r=[t[0]-l[0],t[1]-l[1]]}return r}/**
   * @return {boolean} Is defined.
   */isDef(){return!!this.getCenterInternal()&&void 0!==this.getResolution()}/**
   * Adds relative coordinates to the center of the view. Any extent constraint will apply.
   * @param {import("./coordinate.js").Coordinate} deltaCoordinates Relative value to add.
   * @api
   */adjustCenter(t){var e,i;let n=(e=this.targetCenter_,this.getProjection(),e);this.setCenter([n[0]+t[0],n[1]+t[1]])}/**
   * Adds relative coordinates to the center of the view. Any extent constraint will apply.
   * @param {import("./coordinate.js").Coordinate} deltaCoordinates Relative value to add.
   */adjustCenterInternal(t){let e=this.targetCenter_;this.setCenterInternal([e[0]+t[0],e[1]+t[1]])}/**
   * Multiply the view resolution by a ratio, optionally using an anchor. Any resolution
   * constraint will apply.
   * @param {number} ratio The ratio to apply on the view resolution.
   * @param {import("./coordinate.js").Coordinate} [anchor] The origin of the transformation.
   * @api
   */adjustResolution(t,e){e=e&&ed(e,this.getProjection()),this.adjustResolutionInternal(t,e)}/**
   * Multiply the view resolution by a ratio, optionally using an anchor. Any resolution
   * constraint will apply.
   * @param {number} ratio The ratio to apply on the view resolution.
   * @param {import("./coordinate.js").Coordinate} [anchor] The origin of the transformation.
   */adjustResolutionInternal(t,e){let i=this.getAnimating()||this.getInteracting(),n=this.getViewportSize_(this.getRotation()),r=this.constraints_.resolution(this.targetResolution_*t,0,n,i);e&&(this.targetCenter_=this.calculateCenterZoom(r,e)),this.targetResolution_*=t,this.applyTargetState_()}/**
   * Adds a value to the view zoom level, optionally using an anchor. Any resolution
   * constraint will apply.
   * @param {number} delta Relative value to add to the zoom level.
   * @param {import("./coordinate.js").Coordinate} [anchor] The origin of the transformation.
   * @api
   */adjustZoom(t,e){this.adjustResolution(Math.pow(this.zoomFactor_,-t),e)}/**
   * Adds a value to the view rotation, optionally using an anchor. Any rotation
   * constraint will apply.
   * @param {number} delta Relative value to add to the zoom rotation, in radians.
   * @param {import("./coordinate.js").Coordinate} [anchor] The rotation center.
   * @api
   */adjustRotation(t,e){e&&(e=ed(e,this.getProjection())),this.adjustRotationInternal(t,e)}/**
   * @param {number} delta Relative value to add to the zoom rotation, in radians.
   * @param {import("./coordinate.js").Coordinate} [anchor] The rotation center.
   */adjustRotationInternal(t,e){let i=this.getAnimating()||this.getInteracting(),n=this.constraints_.rotation(this.targetRotation_+t,i);e&&(this.targetCenter_=this.calculateCenterRotate(n,e)),this.targetRotation_+=t,this.applyTargetState_()}/**
   * Set the center of the current view. Any extent constraint will apply.
   * @param {import("./coordinate.js").Coordinate|undefined} center The center of the view.
   * @observable
   * @api
   */setCenter(t){this.setCenterInternal(t?ed(t,this.getProjection()):t)}/**
   * Set the center using the view projection (not the user projection).
   * @param {import("./coordinate.js").Coordinate|undefined} center The center of the view.
   */setCenterInternal(t){this.targetCenter_=t,this.applyTargetState_()}/**
   * @param {import("./ViewHint.js").default} hint Hint.
   * @param {number} delta Delta.
   * @return {number} New value.
   */setHint(t,e){return this.hints_[t]+=e,this.changed(),this.hints_[t]}/**
   * Set the resolution for this view. Any resolution constraint will apply.
   * @param {number|undefined} resolution The resolution of the view.
   * @observable
   * @api
   */setResolution(t){this.targetResolution_=t,this.applyTargetState_()}/**
   * Set the rotation for this view. Any rotation constraint will apply.
   * @param {number} rotation The rotation of the view in radians.
   * @observable
   * @api
   */setRotation(t){this.targetRotation_=t,this.applyTargetState_()}/**
   * Zoom to a specific zoom level. Any resolution constrain will apply.
   * @param {number} zoom Zoom level.
   * @api
   */setZoom(t){this.setResolution(this.getResolutionForZoom(t))}/**
   * Recompute rotation/resolution/center based on target values.
   * Note: we have to compute rotation first, then resolution and center considering that
   * parameters can influence one another in case a view extent constraint is present.
   * @param {boolean} [doNotCancelAnims] Do not cancel animations.
   * @param {boolean} [forceMoving] Apply constraints as if the view is moving.
   * @private
   */applyTargetState_(t,e){let i=this.getAnimating()||this.getInteracting()||e,n=this.constraints_.rotation(this.targetRotation_,i),r=this.getViewportSize_(n),s=this.constraints_.resolution(this.targetResolution_,0,r,i),o=this.constraints_.center(this.targetCenter_,s,r,i,this.calculateCenterShift(this.targetCenter_,s,n,r));this.get(r2.ROTATION)!==n&&this.set(r2.ROTATION,n),this.get(r2.RESOLUTION)!==s&&(this.set(r2.RESOLUTION,s),this.set("zoom",this.getZoom(),!0)),o&&this.get(r2.CENTER)&&t3(this.get(r2.CENTER),o)||this.set(r2.CENTER,o),this.getAnimating()&&!t&&this.cancelAnimations(),this.cancelAnchor_=void 0}/**
   * If any constraints need to be applied, an animation will be triggered.
   * This is typically done on interaction end.
   * Note: calling this with a duration of 0 will apply the constrained values straight away,
   * without animation.
   * @param {number} [duration] The animation duration in ms.
   * @param {number} [resolutionDirection] Which direction to zoom.
   * @param {import("./coordinate.js").Coordinate} [anchor] The origin of the transformation.
   */resolveConstraints(t,e,i){t=void 0!==t?t:200;let n=this.constraints_.rotation(this.targetRotation_),r=this.getViewportSize_(n),s=this.constraints_.resolution(this.targetResolution_,e||0,r),o=this.constraints_.center(this.targetCenter_,s,r,!1,this.calculateCenterShift(this.targetCenter_,s,n,r));if(0===t&&!this.cancelAnchor_){this.targetResolution_=s,this.targetRotation_=n,this.targetCenter_=o,this.applyTargetState_();return}i=i||(0===t?this.cancelAnchor_:void 0),this.cancelAnchor_=void 0,this.getResolution()===s&&this.getRotation()===n&&this.getCenterInternal()&&t3(this.getCenterInternal(),o)||(this.getAnimating()&&this.cancelAnimations(),this.animateInternal({rotation:n,center:o,resolution:s,duration:t,easing:se,anchor:i}))}/**
   * Notify the View that an interaction has started.
   * The view state will be resolved to a stable one if needed
   * (depending on its constraints).
   * @api
   */beginInteraction(){this.resolveConstraints(0),this.setHint(r1.INTERACTING,1)}/**
   * Notify the View that an interaction has ended. The view state will be resolved
   * to a stable one if needed (depending on its constraints).
   * @param {number} [duration] Animation duration in ms.
   * @param {number} [resolutionDirection] Which direction to zoom.
   * @param {import("./coordinate.js").Coordinate} [anchor] The origin of the transformation.
   * @api
   */endInteraction(t,e,i){i=i&&ed(i,this.getProjection()),this.endInteractionInternal(t,e,i)}/**
   * Notify the View that an interaction has ended. The view state will be resolved
   * to a stable one if needed (depending on its constraints).
   * @param {number} [duration] Animation duration in ms.
   * @param {number} [resolutionDirection] Which direction to zoom.
   * @param {import("./coordinate.js").Coordinate} [anchor] The origin of the transformation.
   */endInteractionInternal(t,e,i){this.getInteracting()&&(this.setHint(r1.INTERACTING,-1),this.resolveConstraints(t,e,i))}/**
   * Get a valid position for the view center according to the current constraints.
   * @param {import("./coordinate.js").Coordinate|undefined} targetCenter Target center position.
   * @param {number} [targetResolution] Target resolution. If not supplied, the current one will be used.
   * This is useful to guess a valid center position at a different zoom level.
   * @return {import("./coordinate.js").Coordinate|undefined} Valid center position.
   */getConstrainedCenter(t,e){let i=this.getViewportSize_(this.getRotation());return this.constraints_.center(t,e||this.getResolution(),i)}/**
   * Get a valid zoom level according to the current view constraints.
   * @param {number|undefined} targetZoom Target zoom.
   * @param {number} [direction=0] Indicate which resolution should be used
   * by a renderer if the view resolution does not match any resolution of the tile source.
   * If 0, the nearest resolution will be used. If 1, the nearest lower resolution
   * will be used. If -1, the nearest higher resolution will be used.
   * @return {number|undefined} Valid zoom level.
   */getConstrainedZoom(t,e){let i=this.getResolutionForZoom(t);return this.getZoomForResolution(this.getConstrainedResolution(i,e))}/**
   * Get a valid resolution according to the current view constraints.
   * @param {number|undefined} targetResolution Target resolution.
   * @param {number} [direction=0] Indicate which resolution should be used
   * by a renderer if the view resolution does not match any resolution of the tile source.
   * If 0, the nearest resolution will be used. If 1, the nearest lower resolution
   * will be used. If -1, the nearest higher resolution will be used.
   * @return {number|undefined} Valid resolution.
   */getConstrainedResolution(t,e){e=e||0;let i=this.getViewportSize_(this.getRotation());return this.constraints_.resolution(t,e,i)}};function sl(t,e){if(!t.visible)return!1;let i=e.resolution;if(i<t.minResolution||i>=t.maxResolution)return!1;let n=e.zoom;return n>t.minZoom&&n<=t.maxZoom}var sa=/**
 * @typedef {function(import("../Map.js").FrameState):HTMLElement} RenderFunction
 *//**
 * @typedef {'sourceready'|'change:source'} LayerEventType
 *//***
 * @template Return
 * @typedef {import("../Observable").OnSignature<import("../Observable").EventTypes, import("../events/Event.js").default, Return> &
 *   import("../Observable").OnSignature<import("./Base").BaseLayerObjectEventTypes|
 *     LayerEventType, import("../Object").ObjectEvent, Return> &
 *   import("../Observable").OnSignature<import("../render/EventType").LayerRenderEventTypes, import("../render/Event").default, Return> &
 *   import("../Observable").CombinedOnSignature<import("../Observable").EventTypes|import("./Base").BaseLayerObjectEventTypes|LayerEventType|
 *     import("../render/EventType").LayerRenderEventTypes, Return>} LayerOnSignature
 *//**
 * @template {import("../source/Source.js").default} [SourceType=import("../source/Source.js").default]
 * @typedef {Object} Options
 * @property {string} [className='ol-layer'] A CSS class name to set to the layer element.
 * @property {number} [opacity=1] Opacity (0, 1).
 * @property {boolean} [visible=true] Visibility.
 * @property {import("../extent.js").Extent} [extent] The bounding extent for layer rendering.  The layer will not be
 * rendered outside of this extent.
 * @property {number} [zIndex] The z-index for layer rendering.  At rendering time, the layers
 * will be ordered, first by Z-index and then by position. When `undefined`, a `zIndex` of 0 is assumed
 * for layers that are added to the map's `layers` collection, or `Infinity` when the layer's `setMap()`
 * method was used.
 * @property {number} [minResolution] The minimum resolution (inclusive) at which this layer will be
 * visible.
 * @property {number} [maxResolution] The maximum resolution (exclusive) below which this layer will
 * be visible.
 * @property {number} [minZoom] The minimum view zoom level (exclusive) above which this layer will be
 * visible.
 * @property {number} [maxZoom] The maximum view zoom level (inclusive) at which this layer will
 * be visible.
 * @property {SourceType} [source] Source for this layer.  If not provided to the constructor,
 * the source can be set by calling {@link module:ol/layer/Layer~Layer#setSource layer.setSource(source)} after
 * construction.
 * @property {import("../Map.js").default|null} [map] Map.
 * @property {RenderFunction} [render] Render function. Takes the frame state as input and is expected to return an
 * HTML element. Will overwrite the default rendering for the layer.
 * @property {Object<string, *>} [properties] Arbitrary observable properties. Can be accessed with `#get()` and `#set()`.
 *//**
 * @typedef {Object} State
 * @property {import("./Layer.js").default} layer Layer.
 * @property {number} opacity Opacity, the value is rounded to two digits to appear after the decimal point.
 * @property {boolean} visible Visible.
 * @property {boolean} managed Managed.
 * @property {import("../extent.js").Extent} [extent] Extent.
 * @property {number | undefined} zIndex ZIndex.
 * @property {number} maxResolution Maximum resolution.
 * @property {number} minResolution Minimum resolution.
 * @property {number} minZoom Minimum zoom.
 * @property {number} maxZoom Maximum zoom.
 *//**
 * @classdesc
 * Base class from which all layer types are derived. This should only be instantiated
 * in the case where a custom layer is added to the map with a custom `render` function.
 * Such a function can be specified in the `options` object, and is expected to return an HTML element.
 *
 * A visual representation of raster or vector map data.
 * Layers group together those properties that pertain to how the data is to be
 * displayed, irrespective of the source of that data.
 *
 * Layers are usually added to a map with [map.addLayer()]{@link import("../Map.js").default#addLayer}.
 * Components like {@link module:ol/interaction/Draw~Draw} use unmanaged layers
 * internally. These unmanaged layers are associated with the map using
 * [layer.setMap()]{@link module:ol/layer/Layer~Layer#setMap} instead.
 *
 * A generic `change` event is fired when the state of the source changes.
 * A `sourceready` event is fired when the layer's source is ready.
 *
 * @fires import("../render/Event.js").RenderEvent#prerender
 * @fires import("../render/Event.js").RenderEvent#postrender
 * @fires import("../events/Event.js").BaseEvent#sourceready
 *
 * @template {import("../source/Source.js").default} [SourceType=import("../source/Source.js").default]
 * @template {import("../renderer/Layer.js").default} [RendererType=import("../renderer/Layer.js").default]
 * @api
 */class extends rQ{/**
   * @param {Options<SourceType>} options Layer options.
   */constructor(t){let e=Object.assign({},t);delete e.source,super(e),/***
     * @type {LayerOnSignature<import("../events").EventsKey>}
     */this.on,/***
     * @type {LayerOnSignature<import("../events").EventsKey>}
     */this.once,/***
     * @type {LayerOnSignature<void>}
     */this.un,/**
     * @private
     * @type {?import("../events.js").EventsKey}
     */this.mapPrecomposeKey_=null,/**
     * @private
     * @type {?import("../events.js").EventsKey}
     */this.mapRenderKey_=null,/**
     * @private
     * @type {?import("../events.js").EventsKey}
     */this.sourceChangeKey_=null,/**
     * @private
     * @type {RendererType}
     */this.renderer_=null,/**
     * @private
     * @type {boolean}
     */this.sourceReady_=!1,/**
     * @protected
     * @type {boolean}
     */this.rendered=!1,t.render&&(this.render=t.render),t.map&&this.setMap(t.map),this.addChangeListener(r$.SOURCE,this.handleSourcePropertyChange_);let i=t.source?/** @type {SourceType} */t.source:null;this.setSource(i)}/**
   * @param {Array<import("./Layer.js").default>} [array] Array of layers (to be modified in place).
   * @return {Array<import("./Layer.js").default>} Array of layers.
   */getLayersArray(t){return(t=t||[]).push(this),t}/**
   * @param {Array<import("./Layer.js").State>} [states] Optional list of layer states (to be modified in place).
   * @return {Array<import("./Layer.js").State>} List of layer states.
   */getLayerStatesArray(t){return(t=t||[]).push(this.getLayerState()),t}/**
   * Get the layer source.
   * @return {SourceType|null} The layer source (or `null` if not yet set).
   * @observable
   * @api
   */getSource(){return /** @type {SourceType} */this.get(r$.SOURCE)||null}/**
   * @return {SourceType|null} The source being rendered.
   */getRenderSource(){return this.getSource()}/**
   * @return {import("../source/Source.js").State} Source state.
   */getSourceState(){let t=this.getSource();return t?t.getState():"undefined"}/**
   * @private
   */handleSourceChange_(){this.changed(),this.sourceReady_||"ready"!==this.getSource().getState()||(this.sourceReady_=!0,this.dispatchEvent("sourceready"))}/**
   * @private
   */handleSourcePropertyChange_(){this.sourceChangeKey_&&(A(this.sourceChangeKey_),this.sourceChangeKey_=null),this.sourceReady_=!1;let t=this.getSource();t&&(this.sourceChangeKey_=b(t,L.CHANGE,this.handleSourceChange_,this),"ready"===t.getState()&&(this.sourceReady_=!0,setTimeout(()=>{this.dispatchEvent("sourceready")},0))),this.changed()}/**
   * @param {import("../pixel").Pixel} pixel Pixel.
   * @return {Promise<Array<import("../Feature").FeatureLike>>} Promise that resolves with
   * an array of features.
   */getFeatures(t){return this.renderer_?this.renderer_.getFeatures(t):Promise.resolve([])}/**
   * @param {import("../pixel").Pixel} pixel Pixel.
   * @return {Uint8ClampedArray|Uint8Array|Float32Array|DataView|null} Pixel data.
   */getData(t){return this.renderer_&&this.rendered?this.renderer_.getData(t):null}/**
   * The layer is visible on the map view, i.e. within its min/max resolution or zoom and
   * extent, not set to `visible: false`, and not inside a layer group that is set
   * to `visible: false`.
   * @param {View|import("../View.js").ViewStateLayerStateExtent} [view] View or {@link import("../Map.js").FrameState}.
   * Only required when the layer is not added to a map.
   * @return {boolean} The layer is visible in the map view.
   * @api
   */isVisible(t){let e,i;let n=this.getMapInternal();!t&&n&&(t=n.getView()),!(e=t instanceof so?{viewState:t.getState(),extent:t.calculateExtent()}:t).layerStatesArray&&n&&(e.layerStatesArray=n.getLayerGroup().getLayerStatesArray()),i=e.layerStatesArray?e.layerStatesArray.find(t=>t.layer===this):this.getLayerState();let r=this.getExtent();return sl(i,e.viewState)&&(!r||tA(r,e.extent))}/**
   * Get the attributions of the source of this layer for the given view.
   * @param {View|import("../View.js").ViewStateLayerStateExtent} [view] View or {@link import("../Map.js").FrameState}.
   * Only required when the layer is not added to a map.
   * @return {Array<string>} Attributions for this layer at the given view.
   * @api
   */getAttributions(t){let e;if(!this.isVisible(t))return[];let i=this.getSource();if(i&&(e=i.getAttributions()),!e)return[];let n=t instanceof so?t.getViewStateAndExtent():t,r=e(n);return Array.isArray(r)||(r=[r]),r}/**
   * In charge to manage the rendering of the layer. One layer type is
   * bounded with one layer renderer.
   * @param {?import("../Map.js").FrameState} frameState Frame state.
   * @param {HTMLElement} target Target which the renderer may (but need not) use
   * for rendering its content.
   * @return {HTMLElement|null} The rendered element.
   */render(t,e){let i=this.getRenderer();return i.prepareFrame(t)?(this.rendered=!0,i.renderFrame(t,e)):null}/**
   * Called when a layer is not visible during a map render.
   */unrender(){this.rendered=!1}/**
   * For use inside the library only.
   * @param {import("../Map.js").default|null} map Map.
   */setMapInternal(t){t||this.unrender(),this.set(r$.MAP,t)}/**
   * For use inside the library only.
   * @return {import("../Map.js").default|null} Map.
   */getMapInternal(){return this.get(r$.MAP)}/**
   * Sets the layer to be rendered on top of other layers on a map. The map will
   * not manage this layer in its layers collection. This
   * is useful for temporary layers. To remove an unmanaged layer from the map,
   * use `#setMap(null)`.
   *
   * To add the layer to a map and have it managed by the map, use
   * {@link module:ol/Map~Map#addLayer} instead.
   * @param {import("../Map.js").default|null} map Map.
   * @api
   */setMap(t){this.mapPrecomposeKey_&&(A(this.mapPrecomposeKey_),this.mapPrecomposeKey_=null),t||this.changed(),this.mapRenderKey_&&(A(this.mapRenderKey_),this.mapRenderKey_=null),t&&(this.mapPrecomposeKey_=b(t,r0.PRECOMPOSE,function(t){let e=/** @type {import("../render/Event.js").default} */t.frameState.layerStatesArray,i=this.getLayerState(!1);z(!e.some(function(t){return t.layer===i.layer}),"A layer can only be added to the map once. Use either `layer.setMap()` or `map.addLayer()`, not both."),e.push(i)},this),this.mapRenderKey_=b(this,L.CHANGE,t.render,t),this.changed())}/**
   * Set the layer source.
   * @param {SourceType|null} source The layer source.
   * @observable
   * @api
   */setSource(t){this.set(r$.SOURCE,t)}/**
   * Get the renderer for this layer.
   * @return {RendererType|null} The layer renderer.
   */getRenderer(){return this.renderer_||(this.renderer_=this.createRenderer()),this.renderer_}/**
   * @return {boolean} The layer has a renderer.
   */hasRenderer(){return!!this.renderer_}/**
   * Create a renderer for this layer.
   * @return {RendererType} A layer renderer.
   * @protected
   */createRenderer(){return null}/**
   * Clean up.
   */disposeInternal(){this.renderer_&&(this.renderer_.dispose(),delete this.renderer_),this.setSource(null),super.disposeInternal()}};/**
 * @param {import("../Map.js").default} map Map.
 * @param {import("../Map.js").FrameState} frameState Frame state.
 */function sh(t,e){eD.expire()}var su=/**
 * @template T
 * @typedef HitMatch
 * @property {import("../Feature.js").FeatureLike} feature Feature.
 * @property {import("../layer/Layer.js").default} layer Layer.
 * @property {import("../geom/SimpleGeometry.js").default} geometry Geometry.
 * @property {number} distanceSq Squared distance.
 * @property {import("./vector.js").FeatureCallback<T>} callback Callback.
 *//**
 * @abstract
 */class extends y{/**
   * @param {import("../Map.js").default} map Map.
   */constructor(t){super(),/**
     * @private
     * @type {import("../Map.js").default}
     */this.map_=t}/**
   * @abstract
   * @param {import("../render/EventType.js").default} type Event type.
   * @param {import("../Map.js").FrameState} frameState Frame state.
   */dispatchRenderEvent(t,e){O()}/**
   * @param {import("../Map.js").FrameState} frameState FrameState.
   * @protected
   */calculateMatrices2D(t){let e=t.viewState,i=t.coordinateToPixelTransform,n=t.pixelToCoordinateTransform;Q(i,t.size[0]/2,t.size[1]/2,1/e.resolution,-1/e.resolution,-e.rotation,-e.center[0],-e.center[1]),tt(n,i)}/**
   * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
   * @param {import("../Map.js").FrameState} frameState FrameState.
   * @param {number} hitTolerance Hit tolerance in pixels.
   * @param {boolean} checkWrapped Check for wrapped geometries.
   * @param {import("./vector.js").FeatureCallback<T>} callback Feature callback.
   * @param {S} thisArg Value to use as `this` when executing `callback`.
   * @param {function(this: U, import("../layer/Layer.js").default): boolean} layerFilter Layer filter
   *     function, only layers which are visible and for which this function
   *     returns `true` will be tested for features.  By default, all visible
   *     layers will be tested.
   * @param {U} thisArg2 Value to use as `this` when executing `layerFilter`.
   * @return {T|undefined} Callback result.
   * @template S,T,U
   */forEachFeatureAtCoordinate(t,e,i,n,r,s,o,l){let a;let h=e.viewState;/**
     * @param {boolean} managed Managed layer.
     * @param {import("../Feature.js").FeatureLike} feature Feature.
     * @param {import("../layer/Layer.js").default} layer Layer.
     * @param {import("../geom/Geometry.js").default} geometry Geometry.
     * @return {T|undefined} Callback result.
     */function u(t,e,i,n){return r.call(s,e,t?i:null,n)}let d=h.projection,c=t4(t.slice(),d),g=[[0,0]];if(d.canWrapX()&&n){let t=d.getExtent(),e=tb(t);g.push([-e,0],[e,0])}let f=e.layerStatesArray,_=f.length,m=/** @type {Array<HitMatch<T>>} */[],p=[];for(let n=0;n<g.length;n++)for(let r=_-1;r>=0;--r){let s=f[r],d=s.layer;if(d.hasRenderer()&&sl(s,h)&&o.call(l,d)){let r=d.getRenderer(),o=d.getSource();if(r&&o){let l=o.getWrapX()?c:t,h=u.bind(null,s.managed);p[0]=l[0]+g[n][0],p[1]=l[1]+g[n][1],a=r.forEachFeatureAtCoordinate(p,e,i,h,m)}if(a)return a}}if(0===m.length)return;let y=1/m.length;return m.forEach((t,e)=>t.distanceSq+=e*y),m.sort((t,e)=>t.distanceSq-e.distanceSq),m.some(t=>a=t.callback(t.feature,t.layer,t.geometry)),a}/**
   * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
   * @param {import("../Map.js").FrameState} frameState FrameState.
   * @param {number} hitTolerance Hit tolerance in pixels.
   * @param {boolean} checkWrapped Check for wrapped geometries.
   * @param {function(this: U, import("../layer/Layer.js").default): boolean} layerFilter Layer filter
   *     function, only layers which are visible and for which this function
   *     returns `true` will be tested for features.  By default, all visible
   *     layers will be tested.
   * @param {U} thisArg Value to use as `this` when executing `layerFilter`.
   * @return {boolean} Is there a feature at the given coordinate?
   * @template U
   */hasFeatureAtCoordinate(t,e,i,n,r,s){let o=this.forEachFeatureAtCoordinate(t,e,i,n,S,this,r,s);return void 0!==o}/**
   * @return {import("../Map.js").default} Map.
   */getMap(){return this.map_}/**
   * Render.
   * @abstract
   * @param {?import("../Map.js").FrameState} frameState Frame state.
   */renderFrame(t){O()}/**
   * @param {import("../Map.js").FrameState} frameState Frame state.
   */flushDeclutterItems(t){}/**
   * @param {import("../Map.js").FrameState} frameState Frame state.
   * @protected
   */scheduleExpireIconCache(t){eD.canExpireCache()&&t.postRenderFunctions.push(sh)}},sd=/**
 * @module ol/render/Event
 */class extends m{/**
   * @param {import("./EventType.js").default} type Type.
   * @param {import("../transform.js").Transform} [inversePixelTransform] Transform for
   *     CSS pixels to rendered pixels.
   * @param {import("../Map.js").FrameState} [frameState] Frame state.
   * @param {?(CanvasRenderingContext2D|WebGLRenderingContext)} [context] Context.
   */constructor(t,e,i,n){super(t),/**
     * Transform from CSS pixels (relative to the top-left corner of the map viewport)
     * to rendered pixels on this event's `context`. Only available when a Canvas renderer is used, null otherwise.
     * @type {import("../transform.js").Transform|undefined}
     * @api
     */this.inversePixelTransform=e,/**
     * An object representing the current render frame state.
     * @type {import("../Map.js").FrameState|undefined}
     * @api
     */this.frameState=i,/**
     * Canvas context. Not available when the event is dispatched by the map. For Canvas 2D layers,
     * the context will be the 2D rendering context.  For WebGL layers, the context will be the WebGL
     * context.
     * @type {CanvasRenderingContext2D|WebGLRenderingContext|undefined}
     * @api
     */this.context=n}},sc=/**
 * @classdesc
 * Canvas map renderer.
 * @api
 */class extends su{/**
   * @param {import("../Map.js").default} map Map.
   */constructor(t){super(t),/**
     * @type {import("../events.js").EventsKey}
     */this.fontChangeListenerKey_=b(iD,p.PROPERTYCHANGE,t.redrawText.bind(t)),/**
     * @private
     * @type {HTMLDivElement}
     */this.element_=document.createElement("div");let e=this.element_.style;e.position="absolute",e.width="100%",e.height="100%",e.zIndex="0",this.element_.className=iv+" ol-layers";let i=t.getViewport();i.insertBefore(this.element_,i.firstChild||null),/**
     * @private
     * @type {Array<HTMLElement>}
     */this.children_=[],/**
     * @private
     * @type {boolean}
     */this.renderedVisible_=!0,/**
     * @type {Array<import("../layer/BaseVector.js").default>}
     */this.declutterLayers_=[]}/**
   * @param {import("../render/EventType.js").default} type Event type.
   * @param {import("../Map.js").FrameState} frameState Frame state.
   */dispatchRenderEvent(t,e){let i=this.getMap();if(i.hasListener(t)){let n=new sd(t,void 0,e);i.dispatchEvent(n)}}disposeInternal(){A(this.fontChangeListenerKey_),this.element_.parentNode.removeChild(this.element_),super.disposeInternal()}/**
   * Render.
   * @param {?import("../Map.js").FrameState} frameState Frame state.
   */renderFrame(t){if(!t){this.renderedVisible_&&(this.element_.style.display="none",this.renderedVisible_=!1);return}this.calculateMatrices2D(t),this.dispatchRenderEvent(r0.PRECOMPOSE,t);let e=t.layerStatesArray.sort(function(t,e){return t.zIndex-e.zIndex}),i=t.viewState;this.children_.length=0;let n=this.declutterLayers_;n.length=0;let r=null;for(let s=0,o=e.length;s<o;++s){let o=e[s];t.layerIndex=s;let l=o.layer,a=l.getSourceState();if(!sl(o,i)||"ready"!=a&&"undefined"!=a){l.unrender();continue}let h=l.render(t,r);h&&(h!==r&&(this.children_.push(h),r=h),"getDeclutter"in l&&n.push(/** @type {import("../layer/BaseVector.js").default} */l))}this.flushDeclutterItems(t),function(t,e){let i=t.childNodes;for(let n=0;;++n){let r=i[n],s=e[n];// check if our work is done
if(!r&&!s)break;// check if children match
if(r!==s){// check if a new child needs to be added
if(!r){t.appendChild(s);continue}// check if an old child needs to be removed
if(!s){t.removeChild(r),--n;continue}// reorder
t.insertBefore(s,r)}}}(this.element_,this.children_),this.dispatchRenderEvent(r0.POSTCOMPOSE,t),this.renderedVisible_||(this.element_.style.display="",this.renderedVisible_=!0),this.scheduleExpireIconCache(t)}/**
   * @param {import("../Map.js").FrameState} frameState Frame state.
   */flushDeclutterItems(t){let e=this.declutterLayers_;for(let i=e.length-1;i>=0;--i)e[i].renderDeclutter(t);e.length=0}};/**
 * @module ol/layer/Group
 */class sg extends m{/**
   * @param {EventType} type The event type.
   * @param {BaseLayer} layer The layer.
   */constructor(t,e){super(t),/**
     * The added or removed layer.
     * @type {BaseLayer}
     * @api
     */this.layer=e}}/***
 * @template Return
 * @typedef {import("../Observable").OnSignature<import("../Observable").EventTypes, import("../events/Event.js").default, Return> &
 *   import("../Observable").OnSignature<import("./Base").BaseLayerObjectEventTypes|
 *     'change:layers', import("../Object").ObjectEvent, Return> &
 *   import("../Observable").CombinedOnSignature<import("../Observable").EventTypes|import("./Base").BaseLayerObjectEventTypes|'change:layers', Return>} GroupOnSignature
 *//**
 * @typedef {Object} Options
 * @property {number} [opacity=1] Opacity (0, 1).
 * @property {boolean} [visible=true] Visibility.
 * @property {import("../extent.js").Extent} [extent] The bounding extent for layer rendering.  The layer will not be
 * rendered outside of this extent.
 * @property {number} [zIndex] The z-index for layer rendering.  At rendering time, the layers
 * will be ordered, first by Z-index and then by position. When `undefined`, a `zIndex` of 0 is assumed
 * for layers that are added to the map's `layers` collection, or `Infinity` when the layer's `setMap()`
 * method was used.
 * @property {number} [minResolution] The minimum resolution (inclusive) at which this layer will be
 * visible.
 * @property {number} [maxResolution] The maximum resolution (exclusive) below which this layer will
 * be visible.
 * @property {number} [minZoom] The minimum view zoom level (exclusive) above which this layer will be
 * visible.
 * @property {number} [maxZoom] The maximum view zoom level (inclusive) at which this layer will
 * be visible.
 * @property {Array<import("./Base.js").default>|Collection<import("./Base.js").default>} [layers] Child layers.
 * @property {Object<string, *>} [properties] Arbitrary observable properties. Can be accessed with `#get()` and `#set()`.
 *//**
 * @enum {string}
 * @private
 */let sf={LAYERS:"layers"};/**
 * @classdesc
 * A {@link module:ol/Collection~Collection} of layers that are handled together.
 *
 * A generic `change` event is triggered when the group/Collection changes.
 *
 * @api
 */class s_ extends rQ{/**
   * @param {Options} [options] Layer options.
   */constructor(t){t=t||{};let e=/** @type {Options} */Object.assign({},t);delete e.layers;let i=t.layers;super(e),/***
     * @type {GroupOnSignature<import("../events").EventsKey>}
     */this.on,/***
     * @type {GroupOnSignature<import("../events").EventsKey>}
     */this.once,/***
     * @type {GroupOnSignature<void>}
     */this.un,/**
     * @private
     * @type {Array<import("../events.js").EventsKey>}
     */this.layersListenerKeys_=[],/**
     * @private
     * @type {Object<string, Array<import("../events.js").EventsKey>>}
     */this.listenerKeys_={},this.addChangeListener(sf.LAYERS,this.handleLayersChanged_),i?Array.isArray(i)?i=new rJ(i.slice(),{unique:!0}):z("function"==typeof /** @type {?} */i.getArray,"Expected `layers` to be an array or a `Collection`"):i=new rJ(void 0,{unique:!0}),this.setLayers(i)}/**
   * @private
   */handleLayerChange_(){this.changed()}/**
   * @private
   */handleLayersChanged_(){this.layersListenerKeys_.forEach(A),this.layersListenerKeys_.length=0;let t=this.getLayers();for(let e in this.layersListenerKeys_.push(b(t,rV.ADD,this.handleLayersAdd_,this),b(t,rV.REMOVE,this.handleLayersRemove_,this)),this.listenerKeys_)this.listenerKeys_[e].forEach(A);T(this.listenerKeys_);let e=t.getArray();for(let t=0,i=e.length;t<i;t++){let i=e[t];this.registerLayerListeners_(i),this.dispatchEvent(new sg("addlayer",i))}this.changed()}/**
   * @param {BaseLayer} layer The layer.
   */registerLayerListeners_(t){let e=[b(t,p.PROPERTYCHANGE,this.handleLayerChange_,this),b(t,L.CHANGE,this.handleLayerChange_,this)];t instanceof s_&&e.push(b(t,"addlayer",this.handleLayerGroupAdd_,this),b(t,"removelayer",this.handleLayerGroupRemove_,this)),this.listenerKeys_[k(t)]=e}/**
   * @param {GroupEvent} event The layer group event.
   */handleLayerGroupAdd_(t){this.dispatchEvent(new sg("addlayer",t.layer))}/**
   * @param {GroupEvent} event The layer group event.
   */handleLayerGroupRemove_(t){this.dispatchEvent(new sg("removelayer",t.layer))}/**
   * @param {import("../Collection.js").CollectionEvent<import("./Base.js").default>} collectionEvent CollectionEvent.
   * @private
   */handleLayersAdd_(t){let e=t.element;this.registerLayerListeners_(e),this.dispatchEvent(new sg("addlayer",e)),this.changed()}/**
   * @param {import("../Collection.js").CollectionEvent<import("./Base.js").default>} collectionEvent CollectionEvent.
   * @private
   */handleLayersRemove_(t){let e=t.element,i=k(e);this.listenerKeys_[i].forEach(A),delete this.listenerKeys_[i],this.dispatchEvent(new sg("removelayer",e)),this.changed()}/**
   * Returns the {@link module:ol/Collection~Collection collection} of {@link module:ol/layer/Layer~Layer layers}
   * in this group.
   * @return {!Collection<import("./Base.js").default>} Collection of
   *   {@link module:ol/layer/Base~BaseLayer layers} that are part of this group.
   * @observable
   * @api
   */getLayers(){return /** @type {!Collection<import("./Base.js").default>} */this.get(sf.LAYERS)}/**
   * Set the {@link module:ol/Collection~Collection collection} of {@link module:ol/layer/Layer~Layer layers}
   * in this group.
   * @param {!Collection<import("./Base.js").default>} layers Collection of
   *   {@link module:ol/layer/Base~BaseLayer layers} that are part of this group.
   * @observable
   * @api
   */setLayers(t){let e=this.getLayers();if(e){let t=e.getArray();for(let e=0,i=t.length;e<i;++e)this.dispatchEvent(new sg("removelayer",t[e]))}this.set(sf.LAYERS,t)}/**
   * @param {Array<import("./Layer.js").default>} [array] Array of layers (to be modified in place).
   * @return {Array<import("./Layer.js").default>} Array of layers.
   */getLayersArray(t){return t=void 0!==t?t:[],this.getLayers().forEach(function(e){e.getLayersArray(t)}),t}/**
   * Get the layer states list and use this groups z-index as the default
   * for all layers in this and nested groups, if it is unset at this point.
   * If dest is not provided and this group's z-index is undefined
   * 0 is used a the default z-index.
   * @param {Array<import("./Layer.js").State>} [dest] Optional list
   * of layer states (to be modified in place).
   * @return {Array<import("./Layer.js").State>} List of layer states.
   */getLayerStatesArray(t){let e=void 0!==t?t:[],i=e.length;this.getLayers().forEach(function(t){t.getLayerStatesArray(e)});let n=this.getLayerState(),r=n.zIndex;t||void 0!==n.zIndex||(r=0);for(let t=i,s=e.length;t<s;t++){let i=e[t];i.opacity*=n.opacity,i.visible=i.visible&&n.visible,i.maxResolution=Math.min(i.maxResolution,n.maxResolution),i.minResolution=Math.max(i.minResolution,n.minResolution),i.minZoom=Math.max(i.minZoom,n.minZoom),i.maxZoom=Math.min(i.maxZoom,n.maxZoom),void 0!==n.extent&&(void 0!==i.extent?i.extent=tI(i.extent,n.extent):i.extent=n.extent),void 0===i.zIndex&&(i.zIndex=r)}return e}/**
   * @return {import("../source/Source.js").State} Source state.
   */getSourceState(){return"ready"}}var sm=/**
 * @module ol/MapBrowserEvent
 *//**
 * @module ol/MapEvent
 *//**
 * @classdesc
 * Events emitted as map events are instances of this type.
 * See {@link module:ol/Map~Map} for which events trigger a map event.
 */class extends m{/**
   * @param {string} type Event type.
   * @param {import("./Map.js").default} map Map.
   * @param {?import("./Map.js").FrameState} [frameState] Frame state.
   */constructor(t,e,i){super(t),/**
     * The map where the event occurred.
     * @type {import("./Map.js").default}
     * @api
     */this.map=e,/**
     * The frame state at the time of the event.
     * @type {?import("./Map.js").FrameState}
     * @api
     */this.frameState=void 0!==i?i:null}},sp=/**
 * @classdesc
 * Events emitted as map browser events are instances of this type.
 * See {@link module:ol/Map~Map} for which events trigger a map browser event.
 * @template {UIEvent} EVENT
 */class extends sm{/**
   * @param {string} type Event type.
   * @param {import("./Map.js").default} map Map.
   * @param {EVENT} originalEvent Original event.
   * @param {boolean} [dragging] Is the map currently being dragged?
   * @param {import("./Map.js").FrameState} [frameState] Frame state.
   * @param {Array<PointerEvent>} [activePointers] Active pointers.
   */constructor(t,e,i,n,r,s){super(t,e,r),/**
     * The original browser event.
     * @const
     * @type {EVENT}
     * @api
     */this.originalEvent=i,/**
     * The map pixel relative to the viewport corresponding to the original browser event.
     * @type {?import("./pixel.js").Pixel}
     */this.pixel_=null,/**
     * The coordinate in the user projection corresponding to the original browser event.
     * @type {?import("./coordinate.js").Coordinate}
     */this.coordinate_=null,/**
     * Indicates if the map is currently being dragged. Only set for
     * `POINTERDRAG` and `POINTERMOVE` events. Default is `false`.
     *
     * @type {boolean}
     * @api
     */this.dragging=void 0!==n&&n,/**
     * @type {Array<PointerEvent>|undefined}
     */this.activePointers=s}/**
   * The map pixel relative to the viewport corresponding to the original event.
   * @type {import("./pixel.js").Pixel}
   * @api
   */get pixel(){return this.pixel_||(this.pixel_=this.map.getEventPixel(this.originalEvent)),this.pixel_}set pixel(t){this.pixel_=t}/**
   * The coordinate corresponding to the original browser event.  This will be in the user
   * projection if one is set.  Otherwise it will be in the view projection.
   * @type {import("./coordinate.js").Coordinate}
   * @api
   */get coordinate(){return this.coordinate_||(this.coordinate_=this.map.getCoordinateFromPixel(this.pixel)),this.coordinate_}set coordinate(t){this.coordinate_=t}/**
   * Prevents the default browser action.
   * See https://developer.mozilla.org/en-US/docs/Web/API/event.preventDefault.
   * @api
   */preventDefault(){super.preventDefault(),"preventDefault"in this.originalEvent&&/** @type {UIEvent} */this.originalEvent.preventDefault()}/**
   * Prevents further propagation of the current event.
   * See https://developer.mozilla.org/en-US/docs/Web/API/event.stopPropagation.
   * @api
   */stopPropagation(){super.stopPropagation(),"stopPropagation"in this.originalEvent&&/** @type {UIEvent} */this.originalEvent.stopPropagation()}},/**
 * Constants for event names.
 * @enum {string}
 */sy/***
 * @typedef {'singleclick'|'click'|'dblclick'|'pointerdrag'|'pointermove'} Types
 */={/**
   * A true single click with no dragging and no double click. Note that this
   * event is delayed by 250 ms to ensure that it is not a double click.
   * @event module:ol/MapBrowserEvent~MapBrowserEvent#singleclick
   * @api
   */SINGLECLICK:"singleclick",/**
   * A click with no dragging. A double click will fire two of this.
   * @event module:ol/MapBrowserEvent~MapBrowserEvent#click
   * @api
   */CLICK:L.CLICK,/**
   * A true double click, with no dragging.
   * @event module:ol/MapBrowserEvent~MapBrowserEvent#dblclick
   * @api
   */DBLCLICK:L.DBLCLICK,/**
   * Triggered when a pointer is dragged.
   * @event module:ol/MapBrowserEvent~MapBrowserEvent#pointerdrag
   * @api
   */POINTERDRAG:"pointerdrag",/**
   * Triggered when a pointer is moved. Note that on touch devices this is
   * triggered when the map is panned, so is not the same as mousemove.
   * @event module:ol/MapBrowserEvent~MapBrowserEvent#pointermove
   * @api
   */POINTERMOVE:"pointermove",POINTERDOWN:"pointerdown",POINTERUP:"pointerup",POINTEROVER:"pointerover",POINTEROUT:"pointerout",POINTERENTER:"pointerenter",POINTERLEAVE:"pointerleave",POINTERCANCEL:"pointercancel"},sx={POINTERMOVE:"pointermove",POINTERDOWN:"pointerdown"},sv=class extends M{/**
   * @param {import("./Map.js").default} map The map with the viewport to listen to events on.
   * @param {number} [moveTolerance] The minimal distance the pointer must travel to trigger a move.
   */constructor(t,e){super(t),/**
     * This is the element that we will listen to the real events on.
     * @type {import("./Map.js").default}
     * @private
     */this.map_=t,/**
     * @type {ReturnType<typeof setTimeout>}
     * @private
     */this.clickTimeoutId_,/**
     * Emulate dblclick and singleclick. Will be true when only one pointer is active.
     * @type {boolean}
     */this.emulateClicks_=!1,/**
     * @type {boolean}
     * @private
     */this.dragging_=!1,/**
     * @type {!Array<import("./events.js").EventsKey>}
     * @private
     */this.dragListenerKeys_=[],/**
     * @type {number}
     * @private
     */this.moveTolerance_=void 0===e?1:e,/**
     * The most recent "down" type event (or null if none have occurred).
     * Set on pointerdown.
     * @type {PointerEvent|null}
     * @private
     */this.down_=null;let i=this.map_.getViewport();/**
     * @type {Array<PointerEvent>}
     * @private
     */this.activePointers_=[],/**
     * @type {!Object<number, Event>}
     * @private
     */this.trackedTouches_={},this.element_=i,/**
     * @type {?import("./events.js").EventsKey}
     * @private
     */this.pointerdownListenerKey_=b(i,sx.POINTERDOWN,this.handlePointerDown_,this),/**
     * @type {PointerEvent}
     * @private
     */this.originalPointerMoveEvent_,/**
     * @type {?import("./events.js").EventsKey}
     * @private
     */this.relayedListenerKey_=b(i,sx.POINTERMOVE,this.relayMoveEvent_,this),/**
     * @private
     */this.boundHandleTouchMove_=this.handleTouchMove_.bind(this),this.element_.addEventListener(L.TOUCHMOVE,this.boundHandleTouchMove_,!!q&&{passive:!1})}/**
   * @param {PointerEvent} pointerEvent Pointer
   * event.
   * @private
   */emulateClick_(t){let e=new sp(sy.CLICK,this.map_,t);this.dispatchEvent(e),void 0!==this.clickTimeoutId_?(// double-click
clearTimeout(this.clickTimeoutId_),this.clickTimeoutId_=void 0,e=new sp(sy.DBLCLICK,this.map_,t),this.dispatchEvent(e)):this.clickTimeoutId_=setTimeout(()=>{this.clickTimeoutId_=void 0;let e=new sp(sy.SINGLECLICK,this.map_,t);this.dispatchEvent(e)},250)}/**
   * Keeps track on how many pointers are currently active.
   *
   * @param {PointerEvent} pointerEvent Pointer
   * event.
   * @private
   */updateActivePointers_(t){let e=t.pointerId;if(t.type==sy.POINTERUP||t.type==sy.POINTERCANCEL){for(let i in delete this.trackedTouches_[e],this.trackedTouches_)if(this.trackedTouches_[i].target!==t.target){// Some platforms assign a new pointerId when the target changes.
// If this happens, delete one tracked pointer. If there is more
// than one tracked pointer for the old target, it will be cleared
// by subsequent POINTERUP events from other pointers.
delete this.trackedTouches_[i];break}}else(t.type==sy.POINTERDOWN||t.type==sy.POINTERMOVE)&&(this.trackedTouches_[e]=t);this.activePointers_=Object.values(this.trackedTouches_)}/**
   * @param {PointerEvent} pointerEvent Pointer
   * event.
   * @private
   */handlePointerUp_(t){this.updateActivePointers_(t);let e=new sp(sy.POINTERUP,this.map_,t,void 0,void 0,this.activePointers_);this.dispatchEvent(e),this.emulateClicks_&&!e.defaultPrevented&&!this.dragging_&&this.isMouseActionButton_(t)&&this.emulateClick_(this.down_),0===this.activePointers_.length&&(this.dragListenerKeys_.forEach(A),this.dragListenerKeys_.length=0,this.dragging_=!1,this.down_=null)}/**
   * @param {PointerEvent} pointerEvent Pointer
   * event.
   * @return {boolean} If the left mouse button was pressed.
   * @private
   */isMouseActionButton_(t){return 0===t.button}/**
   * @param {PointerEvent} pointerEvent Pointer
   * event.
   * @private
   */handlePointerDown_(t){this.emulateClicks_=0===this.activePointers_.length,this.updateActivePointers_(t);let e=new sp(sy.POINTERDOWN,this.map_,t,void 0,void 0,this.activePointers_);if(this.dispatchEvent(e),this.down_=new PointerEvent(t.type,t),Object.defineProperty(this.down_,"target",{writable:!1,value:t.target}),0===this.dragListenerKeys_.length){let t=this.map_.getOwnerDocument();this.dragListenerKeys_.push(b(t,sy.POINTERMOVE,this.handlePointerMove_,this),b(t,sy.POINTERUP,this.handlePointerUp_,this),b(this.element_,sy.POINTERCANCEL,this.handlePointerUp_,this)),this.element_.getRootNode&&this.element_.getRootNode()!==t&&this.dragListenerKeys_.push(b(this.element_.getRootNode(),sy.POINTERUP,this.handlePointerUp_,this))}}/**
   * @param {PointerEvent} pointerEvent Pointer
   * event.
   * @private
   */handlePointerMove_(t){// Between pointerdown and pointerup, pointermove events are triggered.
// To avoid a 'false' touchmove event to be dispatched, we test if the pointer
// moved a significant distance.
if(this.isMoving_(t)){this.updateActivePointers_(t),this.dragging_=!0;let e=new sp(sy.POINTERDRAG,this.map_,t,this.dragging_,void 0,this.activePointers_);this.dispatchEvent(e)}}/**
   * Wrap and relay a pointermove event.
   * @param {PointerEvent} pointerEvent Pointer
   * event.
   * @private
   */relayMoveEvent_(t){this.originalPointerMoveEvent_=t;let e=!!(this.down_&&this.isMoving_(t));this.dispatchEvent(new sp(sy.POINTERMOVE,this.map_,t,e))}/**
   * Flexible handling of a `touch-action: none` css equivalent: because calling
   * `preventDefault()` on a `pointermove` event does not stop native page scrolling
   * and zooming, we also listen for `touchmove` and call `preventDefault()` on it
   * when an interaction (currently `DragPan` handles the event.
   * @param {TouchEvent} event Event.
   * @private
   */handleTouchMove_(t){// Due to https://github.com/mpizenberg/elm-pep/issues/2, `this.originalPointerMoveEvent_`
// may not be initialized yet when we get here on a platform without native pointer events,
// when elm-pep is used as pointer events polyfill.
let e=this.originalPointerMoveEvent_;(!e||e.defaultPrevented)&&("boolean"!=typeof t.cancelable||!0===t.cancelable)&&t.preventDefault()}/**
   * @param {PointerEvent} pointerEvent Pointer
   * event.
   * @return {boolean} Is moving.
   * @private
   */isMoving_(t){return this.dragging_||Math.abs(t.clientX-this.down_.clientX)>this.moveTolerance_||Math.abs(t.clientY-this.down_.clientY)>this.moveTolerance_}/**
   * Clean up.
   */disposeInternal(){this.relayedListenerKey_&&(A(this.relayedListenerKey_),this.relayedListenerKey_=null),this.element_.removeEventListener(L.TOUCHMOVE,this.boundHandleTouchMove_),this.pointerdownListenerKey_&&(A(this.pointerdownListenerKey_),this.pointerdownListenerKey_=null),this.dragListenerKeys_.forEach(A),this.dragListenerKeys_.length=0,this.element_=null,super.disposeInternal()}},sE/***
 * @typedef {'postrender'|'movestart'|'moveend'|'loadstart'|'loadend'} Types
 */={/**
   * Triggered after a map frame is rendered.
   * @event module:ol/MapEvent~MapEvent#postrender
   * @api
   */POSTRENDER:"postrender",/**
   * Triggered when the map starts moving.
   * @event module:ol/MapEvent~MapEvent#movestart
   * @api
   */MOVESTART:"movestart",/**
   * Triggered after the map is moved.
   * @event module:ol/MapEvent~MapEvent#moveend
   * @api
   */MOVEEND:"moveend",/**
   * Triggered when loading of additional map data (tiles, images, features) starts.
   * @event module:ol/MapEvent~MapEvent#loadstart
   * @api
   */LOADSTART:"loadstart",/**
   * Triggered when loading of additional map data has completed.
   * @event module:ol/MapEvent~MapEvent#loadend
   * @api
   */LOADEND:"loadend"},sC={LAYERGROUP:"layergroup",SIZE:"size",TARGET:"target",VIEW:"view"};/**
 * @module ol/TileQueue
 *//**
 * @module ol/structs/PriorityQueue
 */let sS=1/0;var sR=/**
 * @classdesc
 * Priority queue.
 *
 * The implementation is inspired from the Closure Library's Heap class and
 * Python's heapq module.
 *
 * See https://github.com/google/closure-library/blob/master/closure/goog/structs/heap.js
 * and https://hg.python.org/cpython/file/2.7/Lib/heapq.py.
 *
 * @template T
 */class{/**
   * @param {function(T): number} priorityFunction Priority function.
   * @param {function(T): string} keyFunction Key function.
   */constructor(t,e){/**
     * @type {function(T): number}
     * @private
     */this.priorityFunction_=t,/**
     * @type {function(T): string}
     * @private
     */this.keyFunction_=e,/**
     * @type {Array<T>}
     * @private
     */this.elements_=[],/**
     * @type {Array<number>}
     * @private
     */this.priorities_=[],/**
     * @type {!Object<string, boolean>}
     * @private
     */this.queuedElements_={}}/**
   * FIXME empty description for jsdoc
   */clear(){this.elements_.length=0,this.priorities_.length=0,T(this.queuedElements_)}/**
   * Remove and return the highest-priority element. O(log N).
   * @return {T} Element.
   */dequeue(){let t=this.elements_,e=this.priorities_,i=t[0];1==t.length?(t.length=0,e.length=0):(t[0]=t.pop(),e[0]=e.pop(),this.siftUp_(0));let n=this.keyFunction_(i);return delete this.queuedElements_[n],i}/**
   * Enqueue an element. O(log N).
   * @param {T} element Element.
   * @return {boolean} The element was added to the queue.
   */enqueue(t){z(!(this.keyFunction_(t) in this.queuedElements_),"Tried to enqueue an `element` that was already added to the queue");let e=this.priorityFunction_(t);return e!=sS&&(this.elements_.push(t),this.priorities_.push(e),this.queuedElements_[this.keyFunction_(t)]=!0,this.siftDown_(0,this.elements_.length-1),!0)}/**
   * @return {number} Count.
   */getCount(){return this.elements_.length}/**
   * Gets the index of the left child of the node at the given index.
   * @param {number} index The index of the node to get the left child for.
   * @return {number} The index of the left child.
   * @private
   */getLeftChildIndex_(t){return 2*t+1}/**
   * Gets the index of the right child of the node at the given index.
   * @param {number} index The index of the node to get the right child for.
   * @return {number} The index of the right child.
   * @private
   */getRightChildIndex_(t){return 2*t+2}/**
   * Gets the index of the parent of the node at the given index.
   * @param {number} index The index of the node to get the parent for.
   * @return {number} The index of the parent.
   * @private
   */getParentIndex_(t){return t-1>>1}/**
   * Make this a heap. O(N).
   * @private
   */heapify_(){let t;for(t=(this.elements_.length>>1)-1;t>=0;t--)this.siftUp_(t)}/**
   * @return {boolean} Is empty.
   */isEmpty(){return 0===this.elements_.length}/**
   * @param {string} key Key.
   * @return {boolean} Is key queued.
   */isKeyQueued(t){return t in this.queuedElements_}/**
   * @param {T} element Element.
   * @return {boolean} Is queued.
   */isQueued(t){return this.isKeyQueued(this.keyFunction_(t))}/**
   * @param {number} index The index of the node to move down.
   * @private
   */siftUp_(t){let e=this.elements_,i=this.priorities_,n=e.length,r=e[t],s=i[t],o=t;for(;t<n>>1;){let r=this.getLeftChildIndex_(t),s=this.getRightChildIndex_(t),o=s<n&&i[s]<i[r]?s:r;e[t]=e[o],i[t]=i[o],t=o}e[t]=r,i[t]=s,this.siftDown_(o,t)}/**
   * @param {number} startIndex The index of the root.
   * @param {number} index The index of the node to move up.
   * @private
   */siftDown_(t,e){let i=this.elements_,n=this.priorities_,r=i[e],s=n[e];for(;e>t;){let t=this.getParentIndex_(e);if(n[t]>s)i[e]=i[t],n[e]=n[t],e=t;else break}i[e]=r,n[e]=s}/**
   * FIXME empty description for jsdoc
   */reprioritize(){let t,e,i;let n=this.priorityFunction_,r=this.elements_,s=this.priorities_,o=0,l=r.length;for(e=0;e<l;++e)(i=n(t=r[e]))==sS?delete this.queuedElements_[this.keyFunction_(t)]:(s[o]=i,r[o++]=t);r.length=o,s.length=o,this.heapify_()}},sw={IDLE:0,LOADING:1,LOADED:2,/**
   * Indicates that tile loading failed
   * @type {number}
   */ERROR:3,EMPTY:4},sT=/**
 * @typedef {function(import("./Tile.js").default, string, import("./coordinate.js").Coordinate, number): number} PriorityFunction
 */class extends sR{/**
   * @param {PriorityFunction} tilePriorityFunction Tile priority function.
   * @param {function(): ?} tileChangeCallback Function called on each tile change event.
   */constructor(t,e){super(/**
       * @param {Array} element Element.
       * @return {number} Priority.
       */function(e){return t.apply(null,e)},/**
       * @param {Array} element Element.
       * @return {string} Key.
       */function(t){return /** @type {import("./Tile.js").default} */t[0].getKey()}),/** @private */this.boundHandleTileChange_=this.handleTileChange.bind(this),/**
     * @private
     * @type {function(): ?}
     */this.tileChangeCallback_=e,/**
     * @private
     * @type {number}
     */this.tilesLoading_=0,/**
     * @private
     * @type {!Object<string,boolean>}
     */this.tilesLoadingKeys_={}}/**
   * @param {Array} element Element.
   * @return {boolean} The element was added to the queue.
   */enqueue(t){let e=super.enqueue(t);if(e){let e=t[0];e.addEventListener(L.CHANGE,this.boundHandleTileChange_)}return e}/**
   * @return {number} Number of tiles loading.
   */getTilesLoading(){return this.tilesLoading_}/**
   * @param {import("./events/Event.js").default} event Event.
   * @protected
   */handleTileChange(t){let e=/** @type {import("./Tile.js").default} */t.target,i=e.getState();if(i===sw.LOADED||i===sw.ERROR||i===sw.EMPTY){i!==sw.ERROR&&e.removeEventListener(L.CHANGE,this.boundHandleTileChange_);let t=e.getKey();t in this.tilesLoadingKeys_&&(delete this.tilesLoadingKeys_[t],--this.tilesLoading_),this.tileChangeCallback_()}}/**
   * @param {number} maxTotalLoading Maximum number tiles to load simultaneously.
   * @param {number} maxNewLoads Maximum number of new tiles to load.
   */loadMoreTiles(t,e){let i,n,r=0;for(;this.tilesLoading_<t&&r<e&&this.getCount()>0;)n=(i=/** @type {import("./Tile.js").default} */this.dequeue()[0]).getKey(),i.getState()!==sw.IDLE||n in this.tilesLoadingKeys_||(this.tilesLoadingKeys_[n]=!0,++this.tilesLoading_,++r,i.load())}},sI=/**
 * @module ol/control/defaults
 *//**
 * @module ol/control/Attribution
 *//**
 * @module ol/control/Control
 *//**
 * @typedef {Object} Options
 * @property {HTMLElement} [element] The element is the control's
 * container element. This only needs to be specified if you're developing
 * a custom control.
 * @property {function(import("../MapEvent.js").default):void} [render] Function called when
 * the control should be re-rendered. This is called in a `requestAnimationFrame`
 * callback.
 * @property {HTMLElement|string} [target] Specify a target if you want
 * the control to be rendered outside of the map's viewport.
 *//**
 * @classdesc
 * A control is a visible widget with a DOM element in a fixed position on the
 * screen. They can involve user input (buttons), or be informational only;
 * the position is determined using CSS. By default these are placed in the
 * container with CSS class name `ol-overlaycontainer-stopevent`, but can use
 * any outside DOM element.
 *
 * This is the base class for controls. You can use it for simple custom
 * controls by creating the element with listeners, creating an instance:
 * ```js
 * const myControl = new Control({element: myElement});
 * ```
 * and then adding this to the map.
 *
 * The main advantage of having this as a control rather than a simple separate
 * DOM element is that preventing propagation is handled for you. Controls
 * will also be objects in a {@link module:ol/Collection~Collection}, so you can use their methods.
 *
 * You can also extend this base for your own control class. See
 * examples/custom-controls for an example of how to do this.
 *
 * @api
 */class extends G{/**
   * @param {Options} options Control options.
   */constructor(t){super();let e=t.element;!e||t.target||e.style.pointerEvents||(e.style.pointerEvents="auto"),/**
     * @protected
     * @type {HTMLElement}
     */this.element=e||null,/**
     * @private
     * @type {HTMLElement}
     */this.target_=null,/**
     * @private
     * @type {import("../Map.js").default|null}
     */this.map_=null,/**
     * @protected
     * @type {!Array<import("../events.js").EventsKey>}
     */this.listenerKeys=[],t.render&&(this.render=t.render),t.target&&this.setTarget(t.target)}/**
   * Clean up.
   */disposeInternal(){eF(this.element),super.disposeInternal()}/**
   * Get the map associated with this control.
   * @return {import("../Map.js").default|null} Map.
   * @api
   */getMap(){return this.map_}/**
   * Remove the control from its current map and attach it to the new map.
   * Pass `null` to just remove the control from the current map.
   * Subclasses may set up event handlers to get notified about changes to
   * the map here.
   * @param {import("../Map.js").default|null} map Map.
   * @api
   */setMap(t){this.map_&&eF(this.element);for(let t=0,e=this.listenerKeys.length;t<e;++t)A(this.listenerKeys[t]);if(this.listenerKeys.length=0,this.map_=t,t){let e=this.target_?this.target_:t.getOverlayContainerStopEvent();e.appendChild(this.element),this.render!==w&&this.listenerKeys.push(b(t,sE.POSTRENDER,this.render,this)),t.render()}}/**
   * Renders the control.
   * @param {import("../MapEvent.js").default} mapEvent Map event.
   * @api
   */render(t){}/**
   * This function is used to set a target element for the control. It has no
   * effect if it is called after the control has been added to the map (i.e.
   * after `setMap` is called on the control). If no `target` is set in the
   * options passed to the control constructor and if `setTarget` is not called
   * then the control is added to the map's overlay container.
   * @param {HTMLElement|string} target Target.
   * @api
   */setTarget(t){this.target_="string"==typeof t?document.getElementById(t):t}},sM=/**
 * @typedef {Object} Options
 * @property {string} [className='ol-attribution'] CSS class name.
 * @property {HTMLElement|string} [target] Specify a target if you
 * want the control to be rendered outside of the map's
 * viewport.
 * @property {boolean} [collapsible] Specify if attributions can
 * be collapsed. If not specified, sources control this behavior with their
 * `attributionsCollapsible` setting.
 * @property {boolean} [collapsed=true] Specify if attributions should
 * be collapsed at startup.
 * @property {string} [tipLabel='Attributions'] Text label to use for the button tip.
 * @property {string|HTMLElement} [label='i'] Text label to use for the
 * collapsed attributions button.
 * Instead of text, also an element (e.g. a `span` element) can be used.
 * @property {string} [expandClassName=className + '-expand'] CSS class name for the
 * collapsed attributions button.
 * @property {string|HTMLElement} [collapseLabel='›'] Text label to use
 * for the expanded attributions button.
 * Instead of text, also an element (e.g. a `span` element) can be used.
 * @property {string} [collapseClassName=className + '-collapse'] CSS class name for the
 * expanded attributions button.
 * @property {function(import("../MapEvent.js").default):void} [render] Function called when
 * the control should be re-rendered. This is called in a `requestAnimationFrame`
 * callback.
 *//**
 * @classdesc
 * Control to show all the attributions associated with the layer sources
 * in the map. This control is one of the default controls included in maps.
 * By default it will show in the bottom right portion of the map, but this can
 * be changed by using a css selector for `.ol-attribution`.
 *
 * @api
 */class extends sI{/**
   * @param {Options} [options] Attribution options.
   */constructor(t){t=t||{},super({element:document.createElement("div"),render:t.render,target:t.target}),/**
     * @private
     * @type {HTMLElement}
     */this.ulElement_=document.createElement("ul"),/**
     * @private
     * @type {boolean}
     */this.collapsed_=void 0===t.collapsed||t.collapsed,/**
     * @private
     * @type {boolean}
     */this.userCollapsed_=this.collapsed_,/**
     * @private
     * @type {boolean}
     */this.overrideCollapsible_=void 0!==t.collapsible,/**
     * @private
     * @type {boolean}
     */this.collapsible_=void 0===t.collapsible||t.collapsible,this.collapsible_||(this.collapsed_=!1);let e=void 0!==t.className?t.className:"ol-attribution",i=void 0!==t.tipLabel?t.tipLabel:"Attributions",n=void 0!==t.expandClassName?t.expandClassName:e+"-expand",r=void 0!==t.collapseLabel?t.collapseLabel:"›",s=void 0!==t.collapseClassName?t.collapseClassName:e+"-collapse";"string"==typeof r?(/**
       * @private
       * @type {HTMLElement}
       */this.collapseLabel_=document.createElement("span"),this.collapseLabel_.textContent=r,this.collapseLabel_.className=s):this.collapseLabel_=r;let o=void 0!==t.label?t.label:"i";"string"==typeof o?(/**
       * @private
       * @type {HTMLElement}
       */this.label_=document.createElement("span"),this.label_.textContent=o,this.label_.className=n):this.label_=o;let l=this.collapsible_&&!this.collapsed_?this.collapseLabel_:this.label_;/**
     * @private
     * @type {HTMLElement}
     */this.toggleButton_=document.createElement("button"),this.toggleButton_.setAttribute("type","button"),this.toggleButton_.setAttribute("aria-expanded",String(!this.collapsed_)),this.toggleButton_.title=i,this.toggleButton_.appendChild(l),this.toggleButton_.addEventListener(L.CLICK,this.handleClick_.bind(this),!1);let a=e+" "+iv+" "+iE+(this.collapsed_&&this.collapsible_?" "+iC:"")+(this.collapsible_?"":" ol-uncollapsible"),h=this.element;h.className=a,h.appendChild(this.toggleButton_),h.appendChild(this.ulElement_),/**
     * A list of currently rendered resolutions.
     * @type {Array<string>}
     * @private
     */this.renderedAttributions_=[],/**
     * @private
     * @type {boolean}
     */this.renderedVisible_=!0}/**
   * Collect a list of visible attributions and set the collapsible state.
   * @param {import("../Map.js").FrameState} frameState Frame state.
   * @return {Array<string>} Attributions.
   * @private
   */collectSourceAttributions_(t){let e=Array.from(new Set(this.getMap().getAllLayers().flatMap(e=>e.getAttributions(t)))),i=!this.getMap().getAllLayers().some(t=>t.getSource()&&!1===t.getSource().getAttributionsCollapsible());return this.overrideCollapsible_||this.setCollapsible(i),e}/**
   * @private
   * @param {?import("../Map.js").FrameState} frameState Frame state.
   */updateElement_(t){if(!t){this.renderedVisible_&&(this.element.style.display="none",this.renderedVisible_=!1);return}let e=this.collectSourceAttributions_(t),i=e.length>0;if(this.renderedVisible_!=i&&(this.element.style.display=i?"":"none",this.renderedVisible_=i),!C(e,this.renderedAttributions_)){!function(t){for(;t.lastChild;)t.removeChild(t.lastChild)}(this.ulElement_);// append the attributions
for(let t=0,i=e.length;t<i;++t){let i=document.createElement("li");i.innerHTML=e[t],this.ulElement_.appendChild(i)}this.renderedAttributions_=e}}/**
   * @param {MouseEvent} event The event to handle
   * @private
   */handleClick_(t){t.preventDefault(),this.handleToggle_(),this.userCollapsed_=this.collapsed_}/**
   * @private
   */handleToggle_(){this.element.classList.toggle(iC),this.collapsed_?eP(this.collapseLabel_,this.label_):eP(this.label_,this.collapseLabel_),this.collapsed_=!this.collapsed_,this.toggleButton_.setAttribute("aria-expanded",String(!this.collapsed_))}/**
   * Return `true` if the attribution is collapsible, `false` otherwise.
   * @return {boolean} True if the widget is collapsible.
   * @api
   */getCollapsible(){return this.collapsible_}/**
   * Set whether the attribution should be collapsible.
   * @param {boolean} collapsible True if the widget is collapsible.
   * @api
   */setCollapsible(t){this.collapsible_!==t&&(this.collapsible_=t,this.element.classList.toggle("ol-uncollapsible"),this.userCollapsed_&&this.handleToggle_())}/**
   * Collapse or expand the attribution according to the passed parameter. Will
   * not do anything if the attribution isn't collapsible or if the current
   * collapsed state is already the one requested.
   * @param {boolean} collapsed True if the widget is collapsed.
   * @api
   */setCollapsed(t){this.userCollapsed_=t,this.collapsible_&&this.collapsed_!==t&&this.handleToggle_()}/**
   * Return `true` when the attribution is currently collapsed or `false`
   * otherwise.
   * @return {boolean} True if the widget is collapsed.
   * @api
   */getCollapsed(){return this.collapsed_}/**
   * Update the attribution element.
   * @param {import("../MapEvent.js").default} mapEvent Map event.
   * @override
   */render(t){this.updateElement_(t.frameState)}},sL=/**
 * @module ol/control/Rotate
 *//**
 * @typedef {Object} Options
 * @property {string} [className='ol-rotate'] CSS class name.
 * @property {string|HTMLElement} [label='⇧'] Text label to use for the rotate button.
 * Instead of text, also an element (e.g. a `span` element) can be used.
 * @property {string} [tipLabel='Reset rotation'] Text label to use for the rotate tip.
 * @property {string} [compassClassName='ol-compass'] CSS class name for the compass.
 * @property {number} [duration=250] Animation duration in milliseconds.
 * @property {boolean} [autoHide=true] Hide the control when rotation is 0.
 * @property {function(import("../MapEvent.js").default):void} [render] Function called when the control should
 * be re-rendered. This is called in a `requestAnimationFrame` callback.
 * @property {function():void} [resetNorth] Function called when the control is clicked.
 * This will override the default `resetNorth`.
 * @property {HTMLElement|string} [target] Specify a target if you want the control to be
 * rendered outside of the map's viewport.
 *//**
 * @classdesc
 * A button control to reset rotation to 0.
 * To style this control use css selector `.ol-rotate`. A `.ol-hidden` css
 * selector is added to the button when the rotation is 0.
 *
 * @api
 */class extends sI{/**
   * @param {Options} [options] Rotate options.
   */constructor(t){t=t||{},super({element:document.createElement("div"),render:t.render,target:t.target});let e=void 0!==t.className?t.className:"ol-rotate",i=void 0!==t.label?t.label:"⇧",n=void 0!==t.compassClassName?t.compassClassName:"ol-compass";/**
     * @type {HTMLElement}
     * @private
     */this.label_=null,"string"==typeof i?(this.label_=document.createElement("span"),this.label_.className=n,this.label_.textContent=i):(this.label_=i,this.label_.classList.add(n));let r=t.tipLabel?t.tipLabel:"Reset rotation",s=document.createElement("button");s.className=e+"-reset",s.setAttribute("type","button"),s.title=r,s.appendChild(this.label_),s.addEventListener(L.CLICK,this.handleClick_.bind(this),!1);let o=this.element;o.className=e+" "+iv+" "+iE,o.appendChild(s),this.callResetNorth_=t.resetNorth?t.resetNorth:void 0,/**
     * @type {number}
     * @private
     */this.duration_=void 0!==t.duration?t.duration:250,/**
     * @type {boolean}
     * @private
     */this.autoHide_=void 0===t.autoHide||t.autoHide,/**
     * @private
     * @type {number|undefined}
     */this.rotation_=void 0,this.autoHide_&&this.element.classList.add(ix)}/**
   * @param {MouseEvent} event The event to handle
   * @private
   */handleClick_(t){t.preventDefault(),void 0!==this.callResetNorth_?this.callResetNorth_():this.resetNorth_()}/**
   * @private
   */resetNorth_(){let t=this.getMap(),e=t.getView();if(!e)// upon it
return;let i=e.getRotation();void 0!==i&&(this.duration_>0&&i%(2*Math.PI)!=0?e.animate({rotation:0,duration:this.duration_,easing:se}):e.setRotation(0))}/**
   * Update the rotate control element.
   * @param {import("../MapEvent.js").default} mapEvent Map event.
   * @override
   */render(t){let e=t.frameState;if(!e)return;let i=e.viewState.rotation;if(i!=this.rotation_){if(this.autoHide_){let t=this.element.classList.contains(ix);t||0!==i?t&&0!==i&&this.element.classList.remove(ix):this.element.classList.add(ix)}this.label_.style.transform="rotate("+i+"rad)"}this.rotation_=i}},sb=/**
 * @module ol/control/Zoom
 *//**
 * @typedef {Object} Options
 * @property {number} [duration=250] Animation duration in milliseconds.
 * @property {string} [className='ol-zoom'] CSS class name.
 * @property {string} [zoomInClassName=className + '-in'] CSS class name for the zoom-in button.
 * @property {string} [zoomOutClassName=className + '-out'] CSS class name for the zoom-out button.
 * @property {string|HTMLElement} [zoomInLabel='+'] Text label to use for the zoom-in
 * button. Instead of text, also an element (e.g. a `span` element) can be used.
 * @property {string|HTMLElement} [zoomOutLabel='–'] Text label to use for the zoom-out button.
 * Instead of text, also an element (e.g. a `span` element) can be used.
 * @property {string} [zoomInTipLabel='Zoom in'] Text label to use for the button tip.
 * @property {string} [zoomOutTipLabel='Zoom out'] Text label to use for the button tip.
 * @property {number} [delta=1] The zoom delta applied on each click.
 * @property {HTMLElement|string} [target] Specify a target if you want the control to be
 * rendered outside of the map's viewport.
 *//**
 * @classdesc
 * A control with 2 buttons, one for zoom in and one for zoom out.
 * This control is one of the default controls of a map. To style this control
 * use css selectors `.ol-zoom-in` and `.ol-zoom-out`.
 *
 * @api
 */class extends sI{/**
   * @param {Options} [options] Zoom options.
   */constructor(t){super({element:document.createElement("div"),target:(t=t||{}).target});let e=void 0!==t.className?t.className:"ol-zoom",i=void 0!==t.delta?t.delta:1,n=void 0!==t.zoomInClassName?t.zoomInClassName:e+"-in",r=void 0!==t.zoomOutClassName?t.zoomOutClassName:e+"-out",s=void 0!==t.zoomInLabel?t.zoomInLabel:"+",o=void 0!==t.zoomOutLabel?t.zoomOutLabel:"–",l=void 0!==t.zoomInTipLabel?t.zoomInTipLabel:"Zoom in",a=void 0!==t.zoomOutTipLabel?t.zoomOutTipLabel:"Zoom out",h=document.createElement("button");h.className=n,h.setAttribute("type","button"),h.title=l,h.appendChild("string"==typeof s?document.createTextNode(s):s),h.addEventListener(L.CLICK,this.handleClick_.bind(this,i),!1);let u=document.createElement("button");u.className=r,u.setAttribute("type","button"),u.title=a,u.appendChild("string"==typeof o?document.createTextNode(o):o),u.addEventListener(L.CLICK,this.handleClick_.bind(this,-i),!1);let d=this.element;d.className=e+" "+iv+" "+iE,d.appendChild(h),d.appendChild(u),/**
     * @type {number}
     * @private
     */this.duration_=void 0!==t.duration?t.duration:250}/**
   * @param {number} delta Zoom delta.
   * @param {MouseEvent} event The event to handle
   * @private
   */handleClick_(t,e){e.preventDefault(),this.zoomByDelta_(t)}/**
   * @param {number} delta Zoom delta.
   * @private
   */zoomByDelta_(t){let e=this.getMap(),i=e.getView();if(!i)// upon it
return;let n=i.getZoom();if(void 0!==n){let e=i.getConstrainedZoom(n+t);this.duration_>0?(i.getAnimating()&&i.cancelAnimations(),i.animate({zoom:e,duration:this.duration_,easing:se})):i.setZoom(e)}}},sA={ACTIVE:"active"};function sP(t,e,i,n){let r=t.getZoom();if(void 0===r)return;let s=t.getConstrainedZoom(r+e),o=t.getResolutionForZoom(s);t.getAnimating()&&t.cancelAnimations(),t.animate({resolution:o,anchor:i,duration:void 0!==n?n:250,easing:se})}var sF=/***
 * @template Return
 * @typedef {import("../Observable").OnSignature<import("../Observable").EventTypes, import("../events/Event.js").default, Return> &
 *   import("../Observable").OnSignature<import("../ObjectEventType").Types|
 *     'change:active', import("../Object").ObjectEvent, Return> &
 *   import("../Observable").CombinedOnSignature<import("../Observable").EventTypes|import("../ObjectEventType").Types|
 *     'change:active', Return>} InteractionOnSignature
 *//**
 * Object literal with config options for interactions.
 * @typedef {Object} InteractionOptions
 * @property {function(import("../MapBrowserEvent.js").default):boolean} handleEvent
 * Method called by the map to notify the interaction that a browser event was
 * dispatched to the map. If the function returns a falsy value, propagation of
 * the event to other interactions in the map's interactions chain will be
 * prevented (this includes functions with no explicit return). The interactions
 * are traversed in reverse order of the interactions collection of the map.
 *//**
 * @classdesc
 * Abstract base class; normally only used for creating subclasses and not
 * instantiated in apps.
 * User actions that change the state of the map. Some are similar to controls,
 * but are not associated with a DOM element.
 * For example, {@link module:ol/interaction/KeyboardZoom~KeyboardZoom} is
 * functionally the same as {@link module:ol/control/Zoom~Zoom}, but triggered
 * by a keyboard event not a button element event.
 * Although interactions do not have a DOM element, some of them do render
 * vectors and so are visible on the screen.
 * @api
 */class extends G{/**
   * @param {InteractionOptions} [options] Options.
   */constructor(t){super(),/***
     * @type {InteractionOnSignature<import("../events").EventsKey>}
     */this.on,/***
     * @type {InteractionOnSignature<import("../events").EventsKey>}
     */this.once,/***
     * @type {InteractionOnSignature<void>}
     */this.un,t&&t.handleEvent&&(this.handleEvent=t.handleEvent),/**
     * @private
     * @type {import("../Map.js").default|null}
     */this.map_=null,this.setActive(!0)}/**
   * Return whether the interaction is currently active.
   * @return {boolean} `true` if the interaction is active, `false` otherwise.
   * @observable
   * @api
   */getActive(){return /** @type {boolean} */this.get(sA.ACTIVE)}/**
   * Get the map associated with this interaction.
   * @return {import("../Map.js").default|null} Map.
   * @api
   */getMap(){return this.map_}/**
   * Handles the {@link module:ol/MapBrowserEvent~MapBrowserEvent map browser event}.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Map browser event.
   * @return {boolean} `false` to stop event propagation.
   * @api
   */handleEvent(t){return!0}/**
   * Activate or deactivate the interaction.
   * @param {boolean} active Active.
   * @observable
   * @api
   */setActive(t){this.set(sA.ACTIVE,t)}/**
   * Remove the interaction from its current map and attach it to the new map.
   * Subclasses may set up event handlers to get notified about changes to
   * the map here.
   * @param {import("../Map.js").default|null} map Map.
   */setMap(t){this.map_=t}},sO=/**
 * @typedef {Object} Options
 * @property {number} [duration=250] Animation duration in milliseconds.
 * @property {number} [delta=1] The zoom delta applied on each double click.
 *//**
 * @classdesc
 * Allows the user to zoom by double-clicking on the map.
 * @api
 */class extends sF{/**
   * @param {Options} [options] Options.
   */constructor(t){super(),t=t||{},/**
     * @private
     * @type {number}
     */this.delta_=t.delta?t.delta:1,/**
     * @private
     * @type {number}
     */this.duration_=void 0!==t.duration?t.duration:250}/**
   * Handles the {@link module:ol/MapBrowserEvent~MapBrowserEvent map browser event} (if it was a
   * doubleclick) and eventually zooms the map.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Map browser event.
   * @return {boolean} `false` to stop event propagation.
   */handleEvent(t){let e=!1;if(t.type==sy.DBLCLICK){let i=/** @type {MouseEvent} */t.originalEvent,n=t.map,r=t.coordinate,s=i.shiftKey?-this.delta_:this.delta_,o=n.getView();sP(o,s,r,this.duration_),i.preventDefault(),e=!0}return!e}};function sD(t){let e=t.length,i=0,n=0;for(let r=0;r<e;r++)i+=t[r].clientX,n+=t[r].clientY;return{clientX:i/e,clientY:n/e}}var sk=/**
 * @module ol/interaction/DragPan
 *//**
 * @module ol/interaction/Pointer
 *//**
 * @typedef {Object} Options
 * @property {function(import("../MapBrowserEvent.js").default):boolean} [handleDownEvent]
 * Function handling "down" events. If the function returns `true` then a drag
 * sequence is started.
 * @property {function(import("../MapBrowserEvent.js").default):void} [handleDragEvent]
 * Function handling "drag" events. This function is called on "move" events
 * during a drag sequence.
 * @property {function(import("../MapBrowserEvent.js").default):boolean} [handleEvent]
 * Method called by the map to notify the interaction that a browser event was
 * dispatched to the map. The function may return `false` to prevent the
 * propagation of the event to other interactions in the map's interactions
 * chain.
 * @property {function(import("../MapBrowserEvent.js").default):void} [handleMoveEvent]
 * Function handling "move" events. This function is called on "move" events.
 * This functions is also called during a drag sequence, so during a drag
 * sequence both the `handleDragEvent` function and this function are called.
 * If `handleDownEvent` is defined and it returns true this function will not
 * be called during a drag sequence.
 * @property {function(import("../MapBrowserEvent.js").default):boolean} [handleUpEvent]
 *  Function handling "up" events. If the function returns `false` then the
 * current drag sequence is stopped.
 * @property {function(boolean):boolean} [stopDown]
 * Should the down event be propagated to other interactions, or should be
 * stopped?
 *//**
 * @classdesc
 * Base class that calls user-defined functions on `down`, `move` and `up`
 * events. This class also manages "drag sequences".
 *
 * When the `handleDownEvent` user function returns `true` a drag sequence is
 * started. During a drag sequence the `handleDragEvent` user function is
 * called on `move` events. The drag sequence ends when the `handleUpEvent`
 * user function is called and returns `false`.
 * @api
 */class extends sF{/**
   * @param {Options} [options] Options.
   */constructor(t){super(t=t||{}),t.handleDownEvent&&(this.handleDownEvent=t.handleDownEvent),t.handleDragEvent&&(this.handleDragEvent=t.handleDragEvent),t.handleMoveEvent&&(this.handleMoveEvent=t.handleMoveEvent),t.handleUpEvent&&(this.handleUpEvent=t.handleUpEvent),t.stopDown&&(this.stopDown=t.stopDown),/**
     * @type {boolean}
     * @protected
     */this.handlingDownUpSequence=!1,/**
     * @type {Array<PointerEvent>}
     * @protected
     */this.targetPointers=[]}/**
   * Returns the current number of pointers involved in the interaction,
   * e.g. `2` when two fingers are used.
   * @return {number} The number of pointers.
   * @api
   */getPointerCount(){return this.targetPointers.length}/**
   * Handle pointer down events.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
   * @return {boolean} If the event was consumed.
   * @protected
   */handleDownEvent(t){return!1}/**
   * Handle pointer drag events.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
   * @protected
   */handleDragEvent(t){}/**
   * Handles the {@link module:ol/MapBrowserEvent~MapBrowserEvent map browser event} and may call into
   * other functions, if event sequences like e.g. 'drag' or 'down-up' etc. are
   * detected.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Map browser event.
   * @return {boolean} `false` to stop event propagation.
   * @api
   */handleEvent(t){if(!t.originalEvent)return!0;let e=!1;if(this.updateTrackedPointers_(t),this.handlingDownUpSequence){if(t.type==sy.POINTERDRAG)this.handleDragEvent(t),// prevent page scrolling during dragging
t.originalEvent.preventDefault();else if(t.type==sy.POINTERUP){let e=this.handleUpEvent(t);this.handlingDownUpSequence=e&&this.targetPointers.length>0}}else if(t.type==sy.POINTERDOWN){let i=this.handleDownEvent(t);this.handlingDownUpSequence=i,e=this.stopDown(i)}else t.type==sy.POINTERMOVE&&this.handleMoveEvent(t);return!e}/**
   * Handle pointer move events.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
   * @protected
   */handleMoveEvent(t){}/**
   * Handle pointer up events.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
   * @return {boolean} If the event was consumed.
   * @protected
   */handleUpEvent(t){return!1}/**
   * This function is used to determine if "down" events should be propagated
   * to other interactions or should be stopped.
   * @param {boolean} handled Was the event handled by the interaction?
   * @return {boolean} Should the `down` event be stopped?
   */stopDown(t){return t}/**
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
   * @private
   */updateTrackedPointers_(t){t.activePointers&&(this.targetPointers=t.activePointers)}};/**
 * @module ol/events/condition
 */function sN(t){let e=arguments;/**
   * @param {import("../MapBrowserEvent.js").default} event Event.
   * @return {boolean} All conditions passed.
   */return function(t){let i=!0;for(let n=0,r=e.length;n<r&&(i=i&&e[n](t));++n);return i}}let sG=function(t){let e=/** @type {KeyboardEvent|MouseEvent|TouchEvent} */t.originalEvent;return e.altKey&&!(e.metaKey||e.ctrlKey)&&e.shiftKey},sz=function(t){let e=t.map.getTargetElement(),i=t.map.getOwnerDocument().activeElement;return e.contains(i)},sX=function(t){return!t.map.getTargetElement().hasAttribute("tabindex")||sz(t)},sW=function(t){let e=/** @type {MouseEvent} */t.originalEvent;return 0==e.button&&!(B&&K&&e.ctrlKey)},sY=function(t){let e=/** @type {KeyboardEvent|MouseEvent|TouchEvent} */t.originalEvent;return!e.altKey&&!(e.metaKey||e.ctrlKey)&&!e.shiftKey},sU=function(t){let e=/** @type {KeyboardEvent|MouseEvent|TouchEvent} */t.originalEvent;return K?e.metaKey:e.ctrlKey},sj=function(t){let e=/** @type {KeyboardEvent|MouseEvent|TouchEvent} */t.originalEvent;return!e.altKey&&!(e.metaKey||e.ctrlKey)&&e.shiftKey},sB=function(t){let e=/** @type {KeyboardEvent|MouseEvent|TouchEvent} */t.originalEvent,i=/** @type {Element} */e.target.tagName;return"INPUT"!==i&&"SELECT"!==i&&"TEXTAREA"!==i&&// `isContentEditable` is only available on `HTMLElement`, but it may also be a
// different type like `SVGElement`.
// @ts-ignore
!e.target.isContentEditable},sK=function(t){let e=/** @type {import("../MapBrowserEvent").default} */t.originalEvent;// see https://www.w3.org/TR/pointerevents/#widl-PointerEvent-pointerType
return z(void 0!==e,"mapBrowserEvent must originate from a pointer event"),"mouse"==e.pointerType},sZ=function(t){let e=/** @type {import("../MapBrowserEvent").default} */t.originalEvent;return z(void 0!==e,"mapBrowserEvent must originate from a pointer event"),e.isPrimary&&0===e.button};var sV=/**
 * @typedef {Object} Options
 * @property {import("../events/condition.js").Condition} [condition] A function that takes an {@link module:ol/MapBrowserEvent~MapBrowserEvent} and returns a boolean
 * to indicate whether that event should be handled.
 * Default is {@link module:ol/events/condition.noModifierKeys} and {@link module:ol/events/condition.primaryAction}.
 * @property {boolean} [onFocusOnly=false] When the map's target has a `tabindex` attribute set,
 * the interaction will only handle events when the map has the focus.
 * @property {import("../Kinetic.js").default} [kinetic] Kinetic inertia to apply to the pan.
 *//**
 * @classdesc
 * Allows the user to pan the map by dragging the map.
 * @api
 */class extends sk{/**
   * @param {Options} [options] Options.
   */constructor(t){super({stopDown:R}),t=t||{},/**
     * @private
     * @type {import("../Kinetic.js").default|undefined}
     */this.kinetic_=t.kinetic,/**
     * @type {import("../pixel.js").Pixel}
     */this.lastCentroid=null,/**
     * @type {number}
     */this.lastPointersCount_,/**
     * @type {boolean}
     */this.panning_=!1;let e=t.condition?t.condition:sN(sY,sZ);/**
     * @private
     * @type {import("../events/condition.js").Condition}
     */this.condition_=t.onFocusOnly?sN(sX,e):e,/**
     * @private
     * @type {boolean}
     */this.noKinetic_=!1}/**
   * Handle pointer drag events.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
   */handleDragEvent(t){let e=t.map;this.panning_||(this.panning_=!0,e.getView().beginInteraction());let i=this.targetPointers,n=e.getEventPixel(sD(i));if(i.length==this.lastPointersCount_){if(this.kinetic_&&this.kinetic_.update(n[0],n[1]),this.lastCentroid){var r;let e=[this.lastCentroid[0]-n[0],n[1]-this.lastCentroid[1]],i=t.map,s=i.getView();r=s.getResolution(),e[0]*=r,e[1]*=r,t5(e,s.getRotation()),s.adjustCenterInternal(e)}}else this.kinetic_&&// after one finger down, tiny drag, second finger down
this.kinetic_.begin();this.lastCentroid=n,this.lastPointersCount_=i.length,t.originalEvent.preventDefault()}/**
   * Handle pointer up events.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
   * @return {boolean} If the event was consumed.
   */handleUpEvent(t){let e=t.map,i=e.getView();if(0===this.targetPointers.length){if(!this.noKinetic_&&this.kinetic_&&this.kinetic_.end()){let t=this.kinetic_.getDistance(),n=this.kinetic_.getAngle(),r=i.getCenterInternal(),s=e.getPixelFromCoordinateInternal(r),o=e.getCoordinateFromPixelInternal([s[0]-t*Math.cos(n),s[1]-t*Math.sin(n)]);i.animateInternal({center:i.getConstrainedCenter(o),duration:500,easing:se})}return this.panning_&&(this.panning_=!1,i.endInteraction()),!1}return this.kinetic_&&// after one finger up, tiny drag, second finger up
this.kinetic_.begin(),this.lastCentroid=null,!0}/**
   * Handle pointer down events.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
   * @return {boolean} If the event was consumed.
   */handleDownEvent(t){if(this.targetPointers.length>0&&this.condition_(t)){let e=t.map,i=e.getView();return this.lastCentroid=null,i.getAnimating()&&i.cancelAnimations(),this.kinetic_&&this.kinetic_.begin(),// No kinetic as soon as more than one pointer on the screen is
// detected. This is to prevent nasty pans after pinch.
this.noKinetic_=this.targetPointers.length>1,!0}return!1}},sH=/**
 * @module ol/interaction/DragRotate
 *//**
 * @typedef {Object} Options
 * @property {import("../events/condition.js").Condition} [condition] A function that takes an
 * {@link module:ol/MapBrowserEvent~MapBrowserEvent} and returns a boolean
 * to indicate whether that event should be handled.
 * Default is {@link module:ol/events/condition.altShiftKeysOnly}.
 * @property {number} [duration=250] Animation duration in milliseconds.
 *//**
 * @classdesc
 * Allows the user to rotate the map by clicking and dragging on the map,
 * normally combined with an {@link module:ol/events/condition} that limits
 * it to when the alt and shift keys are held down.
 *
 * This interaction is only supported for mouse devices.
 * @api
 */class extends sk{/**
   * @param {Options} [options] Options.
   */constructor(t){t=t||{},super({stopDown:R}),/**
     * @private
     * @type {import("../events/condition.js").Condition}
     */this.condition_=t.condition?t.condition:sG,/**
     * @private
     * @type {number|undefined}
     */this.lastAngle_=void 0,/**
     * @private
     * @type {number}
     */this.duration_=void 0!==t.duration?t.duration:250}/**
   * Handle pointer drag events.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
   */handleDragEvent(t){if(!sK(t))return;let e=t.map,i=e.getView();if(i.getConstraints().rotation===r7)return;let n=e.getSize(),r=t.pixel,s=Math.atan2(n[1]/2-r[1],r[0]-n[0]/2);if(void 0!==this.lastAngle_){let t=s-this.lastAngle_;i.adjustRotationInternal(-t)}this.lastAngle_=s}/**
   * Handle pointer up events.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
   * @return {boolean} If the event was consumed.
   */handleUpEvent(t){if(!sK(t))return!0;let e=t.map,i=e.getView();return i.endInteraction(this.duration_),!1}/**
   * Handle pointer down events.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
   * @return {boolean} If the event was consumed.
   */handleDownEvent(t){if(!sK(t))return!1;if(sW(t)&&this.condition_(t)){let e=t.map;return e.getView().beginInteraction(),this.lastAngle_=void 0,!0}return!1}},sq=/**
 * @module ol/interaction/DragZoom
 *//**
 * @module ol/interaction/DragBox
 */// FIXME draw drag box
/**
 * @module ol/render/Box
 */class extends y{/**
   * @param {string} className CSS class name.
   */constructor(t){super(),/**
     * @type {import("../geom/Polygon.js").default}
     * @private
     */this.geometry_=null,/**
     * @type {HTMLDivElement}
     * @private
     */this.element_=document.createElement("div"),this.element_.style.position="absolute",this.element_.style.pointerEvents="auto",this.element_.className="ol-box "+t,/**
     * @private
     * @type {import("../Map.js").default|null}
     */this.map_=null,/**
     * @private
     * @type {import("../pixel.js").Pixel}
     */this.startPixel_=null,/**
     * @private
     * @type {import("../pixel.js").Pixel}
     */this.endPixel_=null}/**
   * Clean up.
   */disposeInternal(){this.setMap(null)}/**
   * @private
   */render_(){let t=this.startPixel_,e=this.endPixel_,i=this.element_.style;i.left=Math.min(t[0],e[0])+"px",i.top=Math.min(t[1],e[1])+"px",i.width=Math.abs(e[0]-t[0])+"px",i.height=Math.abs(e[1]-t[1])+"px"}/**
   * @param {import("../Map.js").default|null} map Map.
   */setMap(t){if(this.map_){this.map_.getOverlayContainer().removeChild(this.element_);let t=this.element_.style;t.left="inherit",t.top="inherit",t.width="inherit",t.height="inherit"}this.map_=t,this.map_&&this.map_.getOverlayContainer().appendChild(this.element_)}/**
   * @param {import("../pixel.js").Pixel} startPixel Start pixel.
   * @param {import("../pixel.js").Pixel} endPixel End pixel.
   */setPixels(t,e){this.startPixel_=t,this.endPixel_=e,this.createOrUpdateGeometry(),this.render_()}/**
   * Creates or updates the cached geometry.
   */createOrUpdateGeometry(){let t=this.startPixel_,e=this.endPixel_,i=[t,[t[0],e[1]],e,[e[0],t[1]]],n=i.map(this.map_.getCoordinateFromPixelInternal,this.map_);// close the polygon
n[4]=n[0].slice(),this.geometry_?this.geometry_.setCoordinates([n]):this.geometry_=new ig([n])}/**
   * @return {import("../geom/Polygon.js").default} Geometry.
   */getGeometry(){return this.geometry_}};/**
 * A function that takes a {@link module:ol/MapBrowserEvent~MapBrowserEvent} and two
 * {@link module:ol/pixel~Pixel}s and returns a `{boolean}`. If the condition is met,
 * true should be returned.
 * @typedef {function(this: ?, import("../MapBrowserEvent.js").default, import("../pixel.js").Pixel, import("../pixel.js").Pixel):boolean} EndCondition
 *//**
 * @typedef {Object} Options
 * @property {string} [className='ol-dragbox'] CSS class name for styling the box.
 * @property {import("../events/condition.js").Condition} [condition] A function that takes an {@link module:ol/MapBrowserEvent~MapBrowserEvent} and returns a boolean
 * to indicate whether that event should be handled.
 * Default is {@link ol/events/condition~mouseActionButton}.
 * @property {number} [minArea=64] The minimum area of the box in pixel, this value is used by the default
 * `boxEndCondition` function.
 * @property {EndCondition} [boxEndCondition] A function that takes a {@link module:ol/MapBrowserEvent~MapBrowserEvent} and two
 * {@link module:ol/pixel~Pixel}s to indicate whether a `boxend` event should be fired.
 * Default is `true` if the area of the box is bigger than the `minArea` option.
 * @property {function(this:DragBox, import("../MapBrowserEvent.js").default):void} [onBoxEnd] Code to execute just
 * before `boxend` is fired.
 *//**
 * @enum {string}
 */let sJ={/**
   * Triggered upon drag box start.
   * @event DragBoxEvent#boxstart
   * @api
   */BOXSTART:"boxstart",/**
   * Triggered on drag when box is active.
   * @event DragBoxEvent#boxdrag
   * @api
   */BOXDRAG:"boxdrag",/**
   * Triggered upon drag box end.
   * @event DragBoxEvent#boxend
   * @api
   */BOXEND:"boxend",/**
   * Triggered upon drag box canceled.
   * @event DragBoxEvent#boxcancel
   * @api
   */BOXCANCEL:"boxcancel"};class s$ extends m{/**
   * @param {string} type The event type.
   * @param {import("../coordinate.js").Coordinate} coordinate The event coordinate.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Originating event.
   */constructor(t,e,i){super(t),/**
     * The coordinate of the drag event.
     * @const
     * @type {import("../coordinate.js").Coordinate}
     * @api
     */this.coordinate=e,/**
     * @const
     * @type {import("../MapBrowserEvent.js").default}
     * @api
     */this.mapBrowserEvent=i}}var sQ=/***
 * @template Return
 * @typedef {import("../Observable").OnSignature<import("../Observable").EventTypes, import("../events/Event.js").default, Return> &
 *   import("../Observable").OnSignature<import("../ObjectEventType").Types|
 *     'change:active', import("../Object").ObjectEvent, Return> &
 *   import("../Observable").OnSignature<'boxcancel'|'boxdrag'|'boxend'|'boxstart', DragBoxEvent, Return> &
 *   import("../Observable").CombinedOnSignature<import("../Observable").EventTypes|import("../ObjectEventType").Types|
 *     'change:active'|'boxcancel'|'boxdrag'|'boxend', Return>} DragBoxOnSignature
 *//**
 * @classdesc
 * Allows the user to draw a vector box by clicking and dragging on the map,
 * normally combined with an {@link module:ol/events/condition} that limits
 * it to when the shift or other key is held down. This is used, for example,
 * for zooming to a specific area of the map
 * (see {@link module:ol/interaction/DragZoom~DragZoom} and
 * {@link module:ol/interaction/DragRotateAndZoom~DragRotateAndZoom}).
 *
 * @fires DragBoxEvent
 * @api
 */class extends sk{/**
   * @param {Options} [options] Options.
   */constructor(t){super(),/***
     * @type {DragBoxOnSignature<import("../events").EventsKey>}
     */this.on,/***
     * @type {DragBoxOnSignature<import("../events").EventsKey>}
     */this.once,/***
     * @type {DragBoxOnSignature<void>}
     */this.un,t=t||{},/**
     * @type {import("../render/Box.js").default}
     * @private
     */this.box_=new sq(t.className||"ol-dragbox"),/**
     * @type {number}
     * @private
     */this.minArea_=void 0!==t.minArea?t.minArea:64,t.onBoxEnd&&(this.onBoxEnd=t.onBoxEnd),/**
     * @type {import("../pixel.js").Pixel}
     * @private
     */this.startPixel_=null,/**
     * @private
     * @type {import("../events/condition.js").Condition}
     */this.condition_=t.condition?t.condition:sW,/**
     * @private
     * @type {EndCondition}
     */this.boxEndCondition_=t.boxEndCondition?t.boxEndCondition:this.defaultBoxEndCondition}/**
   * The default condition for determining whether the boxend event
   * should fire.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent The originating MapBrowserEvent
   *     leading to the box end.
   * @param {import("../pixel.js").Pixel} startPixel The starting pixel of the box.
   * @param {import("../pixel.js").Pixel} endPixel The end pixel of the box.
   * @return {boolean} Whether or not the boxend condition should be fired.
   */defaultBoxEndCondition(t,e,i){let n=i[0]-e[0],r=i[1]-e[1];return n*n+r*r>=this.minArea_}/**
   * Returns geometry of last drawn box.
   * @return {import("../geom/Polygon.js").default} Geometry.
   * @api
   */getGeometry(){return this.box_.getGeometry()}/**
   * Handle pointer drag events.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
   */handleDragEvent(t){this.box_.setPixels(this.startPixel_,t.pixel),this.dispatchEvent(new s$(sJ.BOXDRAG,t.coordinate,t))}/**
   * Handle pointer up events.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
   * @return {boolean} If the event was consumed.
   */handleUpEvent(t){this.box_.setMap(null);let e=this.boxEndCondition_(t,this.startPixel_,t.pixel);return e&&this.onBoxEnd(t),this.dispatchEvent(new s$(e?sJ.BOXEND:sJ.BOXCANCEL,t.coordinate,t)),!1}/**
   * Handle pointer down events.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
   * @return {boolean} If the event was consumed.
   */handleDownEvent(t){return!!this.condition_(t)&&(this.startPixel_=t.pixel,this.box_.setMap(t.map),this.box_.setPixels(this.startPixel_,this.startPixel_),this.dispatchEvent(new s$(sJ.BOXSTART,t.coordinate,t)),!0)}/**
   * Function to execute just before `onboxend` is fired
   * @param {import("../MapBrowserEvent.js").default} event Event.
   */onBoxEnd(t){}},s0=/**
 * @typedef {Object} Options
 * @property {string} [className='ol-dragzoom'] CSS class name for styling the
 * box.
 * @property {import("../events/condition.js").Condition} [condition] A function that
 * takes an {@link module:ol/MapBrowserEvent~MapBrowserEvent} and returns a
 * boolean to indicate whether that event should be handled.
 * Default is {@link module:ol/events/condition.shiftKeyOnly}.
 * @property {number} [duration=200] Animation duration in milliseconds.
 * @property {boolean} [out=false] Use interaction for zooming out.
 * @property {number} [minArea=64] The minimum area of the box in pixel, this value is used by the parent default
 * `boxEndCondition` function.
 *//**
 * @classdesc
 * Allows the user to zoom the map by clicking and dragging on the map,
 * normally combined with an {@link module:ol/events/condition} that limits
 * it to when a key, shift by default, is held down.
 *
 * To change the style of the box, use CSS and the `.ol-dragzoom` selector, or
 * your custom one configured with `className`.
 * @api
 */class extends sQ{/**
   * @param {Options} [options] Options.
   */constructor(t){t=t||{};let e=t.condition?t.condition:sj;super({condition:e,className:t.className||"ol-dragzoom",minArea:t.minArea}),/**
     * @private
     * @type {number}
     */this.duration_=void 0!==t.duration?t.duration:200,/**
     * @private
     * @type {boolean}
     */this.out_=void 0!==t.out&&t.out}/**
   * Function to execute just before `onboxend` is fired
   * @param {import("../MapBrowserEvent.js").default} event Event.
   */onBoxEnd(t){let e=this.getMap(),i=/** @type {!import("../View.js").default} */e.getView(),n=this.getGeometry();if(this.out_){let t=i.rotatedExtentForGeometry(n),e=i.getResolutionForExtentInternal(t),r=i.getResolution()/e;(n=n.clone()).scale(r*r)}i.fitInternal(n,{duration:this.duration_,easing:se})}},s1={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",DOWN:"ArrowDown"},s2=/**
 * @typedef {Object} Options
 * @property {import("../events/condition.js").Condition} [condition] A function that
 * takes an {@link module:ol/MapBrowserEvent~MapBrowserEvent} and returns a
 * boolean to indicate whether that event should be handled. Default is
 * {@link module:ol/events/condition.noModifierKeys} and
 * {@link module:ol/events/condition.targetNotEditable}.
 * @property {number} [duration=100] Animation duration in milliseconds.
 * @property {number} [pixelDelta=128] The amount of pixels to pan on each key
 * press.
 *//**
 * @classdesc
 * Allows the user to pan the map using keyboard arrows.
 * Note that, although this interaction is by default included in maps,
 * the keys can only be used when browser focus is on the element to which
 * the keyboard events are attached. By default, this is the map div,
 * though you can change this with the `keyboardEventTarget` in
 * {@link module:ol/Map~Map}. `document` never loses focus but, for any other
 * element, focus will have to be on, and returned to, this element if the keys
 * are to function.
 * See also {@link module:ol/interaction/KeyboardZoom~KeyboardZoom}.
 * @api
 */class extends sF{/**
   * @param {Options} [options] Options.
   */constructor(t){super(),t=t||{},/**
     * @private
     * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Browser event.
     * @return {boolean} Combined condition result.
     */this.defaultCondition_=function(t){return sY(t)&&sB(t)},/**
     * @private
     * @type {import("../events/condition.js").Condition}
     */this.condition_=void 0!==t.condition?t.condition:this.defaultCondition_,/**
     * @private
     * @type {number}
     */this.duration_=void 0!==t.duration?t.duration:100,/**
     * @private
     * @type {number}
     */this.pixelDelta_=void 0!==t.pixelDelta?t.pixelDelta:128}/**
   * Handles the {@link module:ol/MapBrowserEvent~MapBrowserEvent map browser event} if it was a
   * `KeyEvent`, and decides the direction to pan to (if an arrow key was
   * pressed).
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Map browser event.
   * @return {boolean} `false` to stop event propagation.
   */handleEvent(t){let e=!1;if(t.type==L.KEYDOWN){let i=/** @type {KeyboardEvent} */t.originalEvent,n=i.key;if(this.condition_(t)&&(n==s1.DOWN||n==s1.LEFT||n==s1.RIGHT||n==s1.UP)){let r=t.map,s=r.getView(),o=s.getResolution()*this.pixelDelta_,l=0,a=0;n==s1.DOWN?a=-o:n==s1.LEFT?l=-o:n==s1.RIGHT?l=o:a=o;let h=[l,a];t5(h,s.getRotation()),function(t,e,i){let n=t.getCenterInternal();if(n){let r=[n[0]+e[0],n[1]+e[1]];t.animateInternal({duration:void 0!==i?i:250,easing:sn,center:t.getConstrainedCenter(r)})}}(s,h,this.duration_),i.preventDefault(),e=!0}}return!e}},s3=/**
 * @module ol/interaction/KeyboardZoom
 *//**
 * @typedef {Object} Options
 * @property {number} [duration=100] Animation duration in milliseconds.
 * @property {import("../events/condition.js").Condition} [condition] A function that
 * takes an {@link module:ol/MapBrowserEvent~MapBrowserEvent} and returns a
 * boolean to indicate whether that event should be handled. The default condition is
 * that {@link module:ol/events/condition.targetNotEditable} is fulfilled and that
 * the platform modifier key isn't pressed
 * (!{@link module:ol/events/condition.platformModifierKey}).
 * @property {number} [delta=1] The zoom level delta on each key press.
 *//**
 * @classdesc
 * Allows the user to zoom the map using keyboard + and -.
 * Note that, although this interaction is by default included in maps,
 * the keys can only be used when browser focus is on the element to which
 * the keyboard events are attached. By default, this is the map div,
 * though you can change this with the `keyboardEventTarget` in
 * {@link module:ol/Map~Map}. `document` never loses focus but, for any other
 * element, focus will have to be on, and returned to, this element if the keys
 * are to function.
 * See also {@link module:ol/interaction/KeyboardPan~KeyboardPan}.
 * @api
 */class extends sF{/**
   * @param {Options} [options] Options.
   */constructor(t){super(),t=t||{},/**
     * @private
     * @type {import("../events/condition.js").Condition}
     */this.condition_=t.condition?t.condition:function(t){return!sU(t)&&sB(t)},/**
     * @private
     * @type {number}
     */this.delta_=t.delta?t.delta:1,/**
     * @private
     * @type {number}
     */this.duration_=void 0!==t.duration?t.duration:100}/**
   * Handles the {@link module:ol/MapBrowserEvent~MapBrowserEvent map browser event} if it was a
   * `KeyEvent`, and decides whether to zoom in or out (depending on whether the
   * key pressed was '+' or '-').
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Map browser event.
   * @return {boolean} `false` to stop event propagation.
   */handleEvent(t){let e=!1;if(t.type==L.KEYDOWN||t.type==L.KEYPRESS){let i=/** @type {KeyboardEvent} */t.originalEvent,n=i.key;if(this.condition_(t)&&("+"===n||"-"===n)){let r=t.map,s="+"===n?this.delta_:-this.delta_,o=r.getView();sP(o,s,void 0,this.duration_),i.preventDefault(),e=!0}}return!e}},s5=/**
 * @module ol/Kinetic
 *//**
 * @classdesc
 * Implementation of inertial deceleration for map movement.
 *
 * @api
 */class{/**
   * @param {number} decay Rate of decay (must be negative).
   * @param {number} minVelocity Minimum velocity (pixels/millisecond).
   * @param {number} delay Delay to consider to calculate the kinetic
   *     initial values (milliseconds).
   */constructor(t,e,i){/**
     * @private
     * @type {number}
     */this.decay_=t,/**
     * @private
     * @type {number}
     */this.minVelocity_=e,/**
     * @private
     * @type {number}
     */this.delay_=i,/**
     * @private
     * @type {Array<number>}
     */this.points_=[],/**
     * @private
     * @type {number}
     */this.angle_=0,/**
     * @private
     * @type {number}
     */this.initialVelocity_=0}/**
   * FIXME empty description for jsdoc
   */begin(){this.points_.length=0,this.angle_=0,this.initialVelocity_=0}/**
   * @param {number} x X.
   * @param {number} y Y.
   */update(t,e){this.points_.push(t,e,Date.now())}/**
   * @return {boolean} Whether we should do kinetic animation.
   */end(){if(this.points_.length<6)// in the array)
return!1;let t=Date.now()-this.delay_,e=this.points_.length-3;if(this.points_[e+2]<t)// panning before releasing the map
return!1;// get the first point which still falls into the delay time
let i=e-3;for(;i>0&&this.points_[i+2]>t;)i-=3;let n=this.points_[e+2]-this.points_[i+2];// we don't want a duration of 0 (divide by zero)
// we also make sure the user panned for a duration of at least one frame
// (1/60s) to compute sane displacement values
if(n<1e3/60)return!1;let r=this.points_[e]-this.points_[i],s=this.points_[e+1]-this.points_[i+1];return this.angle_=Math.atan2(s,r),this.initialVelocity_=Math.sqrt(r*r+s*s)/n,this.initialVelocity_>this.minVelocity_}/**
   * @return {number} Total distance travelled (pixels).
   */getDistance(){return(this.minVelocity_-this.initialVelocity_)/this.decay_}/**
   * @return {number} Angle of the kinetic panning animation (radians).
   */getAngle(){return this.angle_}},s4=/**
 * @module ol/interaction/MouseWheelZoom
 *//**
 * @typedef {'trackpad' | 'wheel'} Mode
 *//**
 * @typedef {Object} Options
 * @property {import("../events/condition.js").Condition} [condition] A function that
 * takes an {@link module:ol/MapBrowserEvent~MapBrowserEvent} and returns a
 * boolean to indicate whether that event should be handled. Default is
 * {@link module:ol/events/condition.always}.
 * @property {boolean} [onFocusOnly=false] When the map's target has a `tabindex` attribute set,
 * the interaction will only handle events when the map has the focus.
 * @property {number} [maxDelta=1] Maximum mouse wheel delta.
 * @property {number} [duration=250] Animation duration in milliseconds.
 * @property {number} [timeout=80] Mouse wheel timeout duration in milliseconds.
 * @property {boolean} [useAnchor=true] Enable zooming using the mouse's
 * location as the anchor. When set to `false`, zooming in and out will zoom to
 * the center of the screen instead of zooming on the mouse's location.
 * @property {boolean} [constrainResolution=false] If true, the mouse wheel zoom
 * event will always animate to the closest zoom level after an interaction;
 * false means intermediary zoom levels are allowed.
 *//**
 * @classdesc
 * Allows the user to zoom the map by scrolling the mouse wheel.
 * @api
 */class extends sF{/**
   * @param {Options} [options] Options.
   */constructor(t){super(t=t||{}),/**
     * @private
     * @type {number}
     */this.totalDelta_=0,/**
     * @private
     * @type {number}
     */this.lastDelta_=0,/**
     * @private
     * @type {number}
     */this.maxDelta_=void 0!==t.maxDelta?t.maxDelta:1,/**
     * @private
     * @type {number}
     */this.duration_=void 0!==t.duration?t.duration:250,/**
     * @private
     * @type {number}
     */this.timeout_=void 0!==t.timeout?t.timeout:80,/**
     * @private
     * @type {boolean}
     */this.useAnchor_=void 0===t.useAnchor||t.useAnchor,/**
     * @private
     * @type {boolean}
     */this.constrainResolution_=void 0!==t.constrainResolution&&t.constrainResolution;let e=t.condition?t.condition:S;/**
     * @private
     * @type {import("../events/condition.js").Condition}
     */this.condition_=t.onFocusOnly?sN(sX,e):e,/**
     * @private
     * @type {?import("../coordinate.js").Coordinate}
     */this.lastAnchor_=null,/**
     * @private
     * @type {number|undefined}
     */this.startTime_=void 0,/**
     * @private
     * @type {ReturnType<typeof setTimeout>}
     */this.timeoutId_,/**
     * @private
     * @type {Mode|undefined}
     */this.mode_=void 0,/**
     * Trackpad events separated by this delay will be considered separate
     * interactions.
     * @private
     * @type {number}
     */this.trackpadEventGap_=400,/**
     * @private
     * @type {ReturnType<typeof setTimeout>}
     */this.trackpadTimeoutId_,/**
     * The number of delta values per zoom level
     * @private
     * @type {number}
     */this.deltaPerZoom_=300}/**
   * @private
   */endInteraction_(){this.trackpadTimeoutId_=void 0;let t=this.getMap();if(!t)return;let e=t.getView();e.endInteraction(void 0,this.lastDelta_?this.lastDelta_>0?1:-1:0,this.lastAnchor_)}/**
   * Handles the {@link module:ol/MapBrowserEvent~MapBrowserEvent map browser event} (if it was a mousewheel-event) and eventually
   * zooms the map.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Map browser event.
   * @return {boolean} `false` to stop event propagation.
   */handleEvent(t){let e;if(!this.condition_(t))return!0;let i=t.type;if(i!==L.WHEEL)return!0;let n=t.map,r=/** @type {WheelEvent} */t.originalEvent;if(r.preventDefault(),this.useAnchor_&&(this.lastAnchor_=t.coordinate),t.type==L.WHEEL&&(e=r.deltaY,U&&r.deltaMode===WheelEvent.DOM_DELTA_PIXEL&&(e/=Z),r.deltaMode===WheelEvent.DOM_DELTA_LINE&&(e*=40)),0===e)return!1;this.lastDelta_=e;let s=Date.now();void 0===this.startTime_&&(this.startTime_=s),(!this.mode_||s-this.startTime_>this.trackpadEventGap_)&&(this.mode_=4>Math.abs(e)?"trackpad":"wheel");let o=n.getView();if("trackpad"===this.mode_&&!(o.getConstrainResolution()||this.constrainResolution_))return this.trackpadTimeoutId_?clearTimeout(this.trackpadTimeoutId_):(o.getAnimating()&&o.cancelAnimations(),o.beginInteraction()),this.trackpadTimeoutId_=setTimeout(this.endInteraction_.bind(this),this.timeout_),o.adjustZoom(-e/this.deltaPerZoom_,this.lastAnchor_),this.startTime_=s,!1;this.totalDelta_+=e;let l=Math.max(this.timeout_-(s-this.startTime_),0);return clearTimeout(this.timeoutId_),this.timeoutId_=setTimeout(this.handleWheelZoom_.bind(this,n),l),!1}/**
   * @private
   * @param {import("../Map.js").default} map Map.
   */handleWheelZoom_(t){let e=t.getView();e.getAnimating()&&e.cancelAnimations();let i=-tH(this.totalDelta_,-this.maxDelta_*this.deltaPerZoom_,this.maxDelta_*this.deltaPerZoom_)/this.deltaPerZoom_;(e.getConstrainResolution()||this.constrainResolution_)&&(i=i?i>0?1:-1:0),sP(e,i,this.lastAnchor_,this.duration_),this.mode_=void 0,this.totalDelta_=0,this.lastAnchor_=null,this.startTime_=void 0,this.timeoutId_=void 0}/**
   * Enable or disable using the mouse's location as an anchor when zooming
   * @param {boolean} useAnchor true to zoom to the mouse's location, false
   * to zoom to the center of the map
   * @api
   */setMouseAnchor(t){this.useAnchor_=t,t||(this.lastAnchor_=null)}},s6=/**
 * @module ol/interaction/PinchRotate
 *//**
 * @typedef {Object} Options
 * @property {number} [duration=250] The duration of the animation in
 * milliseconds.
 * @property {number} [threshold=0.3] Minimal angle in radians to start a rotation.
 *//**
 * @classdesc
 * Allows the user to rotate the map by twisting with two fingers
 * on a touch screen.
 * @api
 */class extends sk{/**
   * @param {Options} [options] Options.
   */constructor(t){(t=t||{}).stopDown||(/** @type {import("./Pointer.js").Options} */t.stopDown=R),super(t),/**
     * @private
     * @type {import("../coordinate.js").Coordinate}
     */this.anchor_=null,/**
     * @private
     * @type {number|undefined}
     */this.lastAngle_=void 0,/**
     * @private
     * @type {boolean}
     */this.rotating_=!1,/**
     * @private
     * @type {number}
     */this.rotationDelta_=0,/**
     * @private
     * @type {number}
     */this.threshold_=void 0!==t.threshold?t.threshold:.3,/**
     * @private
     * @type {number}
     */this.duration_=void 0!==t.duration?t.duration:250}/**
   * Handle pointer drag events.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
   */handleDragEvent(t){let e=0,i=this.targetPointers[0],n=this.targetPointers[1],r=Math.atan2(n.clientY-i.clientY,n.clientX-i.clientX);if(void 0!==this.lastAngle_){let t=r-this.lastAngle_;this.rotationDelta_+=t,!this.rotating_&&Math.abs(this.rotationDelta_)>this.threshold_&&(this.rotating_=!0),e=t}this.lastAngle_=r;let s=t.map,o=s.getView();o.getConstraints().rotation!==r7&&(// rotate anchor point.
// FIXME: should be the intersection point between the lines:
//     touch0,touch1 and previousTouch0,previousTouch1
this.anchor_=s.getCoordinateFromPixelInternal(s.getEventPixel(sD(this.targetPointers))),this.rotating_&&(s.render(),o.adjustRotationInternal(e,this.anchor_)))}/**
   * Handle pointer up events.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
   * @return {boolean} If the event was consumed.
   */handleUpEvent(t){if(this.targetPointers.length<2){let e=t.map,i=e.getView();return i.endInteraction(this.duration_),!1}return!0}/**
   * Handle pointer down events.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
   * @return {boolean} If the event was consumed.
   */handleDownEvent(t){if(this.targetPointers.length>=2){let e=t.map;return this.anchor_=null,this.lastAngle_=void 0,this.rotating_=!1,this.rotationDelta_=0,this.handlingDownUpSequence||e.getView().beginInteraction(),!0}return!1}},s8=/**
 * @module ol/interaction/PinchZoom
 *//**
 * @typedef {Object} Options
 * @property {number} [duration=400] Animation duration in milliseconds.
 *//**
 * @classdesc
 * Allows the user to zoom the map by pinching with two fingers
 * on a touch screen.
 * @api
 */class extends sk{/**
   * @param {Options} [options] Options.
   */constructor(t){(t=t||{}).stopDown||(/** @type {import("./Pointer.js").Options} */t.stopDown=R),super(t),/**
     * @private
     * @type {import("../coordinate.js").Coordinate}
     */this.anchor_=null,/**
     * @private
     * @type {number}
     */this.duration_=void 0!==t.duration?t.duration:400,/**
     * @private
     * @type {number|undefined}
     */this.lastDistance_=void 0,/**
     * @private
     * @type {number}
     */this.lastScaleDelta_=1}/**
   * Handle pointer drag events.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
   */handleDragEvent(t){let e=1,i=this.targetPointers[0],n=this.targetPointers[1],r=i.clientX-n.clientX,s=i.clientY-n.clientY,o=Math.sqrt(r*r+s*s);void 0!==this.lastDistance_&&(e=this.lastDistance_/o),this.lastDistance_=o;let l=t.map,a=l.getView();1!=e&&(this.lastScaleDelta_=e),// scale anchor point.
this.anchor_=l.getCoordinateFromPixelInternal(l.getEventPixel(sD(this.targetPointers))),// scale, bypass the resolution constraint
l.render(),a.adjustResolutionInternal(e,this.anchor_)}/**
   * Handle pointer up events.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
   * @return {boolean} If the event was consumed.
   */handleUpEvent(t){if(this.targetPointers.length<2){let e=t.map,i=e.getView(),n=this.lastScaleDelta_>1?1:-1;return i.endInteraction(this.duration_,n),!1}return!0}/**
   * Handle pointer down events.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
   * @return {boolean} If the event was consumed.
   */handleDownEvent(t){if(this.targetPointers.length>=2){let e=t.map;return this.anchor_=null,this.lastDistance_=void 0,this.lastScaleDelta_=1,this.handlingDownUpSequence||e.getView().beginInteraction(),!0}return!1}},s7=/**
 * @classdesc
 * The map is the core component of OpenLayers. For a map to render, a view,
 * one or more layers, and a target container are needed:
 *
 *     import Map from 'ol/Map.js';
 *     import View from 'ol/View.js';
 *     import TileLayer from 'ol/layer/Tile.js';
 *     import OSM from 'ol/source/OSM.js';
 *
 *     const map = new Map({
 *       view: new View({
 *         center: [0, 0],
 *         zoom: 1,
 *       }),
 *       layers: [
 *         new TileLayer({
 *           source: new OSM(),
 *         }),
 *       ],
 *       target: 'map',
 *     });
 *
 * The above snippet creates a map using a {@link module:ol/layer/Tile~TileLayer} to
 * display {@link module:ol/source/OSM~OSM} OSM data and render it to a DOM
 * element with the id `map`.
 *
 * The constructor places a viewport container (with CSS class name
 * `ol-viewport`) in the target element (see `getViewport()`), and then two
 * further elements within the viewport: one with CSS class name
 * `ol-overlaycontainer-stopevent` for controls and some overlays, and one with
 * CSS class name `ol-overlaycontainer` for other overlays (see the `stopEvent`
 * option of {@link module:ol/Overlay~Overlay} for the difference). The map
 * itself is placed in a further element within the viewport.
 *
 * Layers are stored as a {@link module:ol/Collection~Collection} in
 * layerGroups. A top-level group is provided by the library. This is what is
 * accessed by `getLayerGroup` and `setLayerGroup`. Layers entered in the
 * options are added to this group, and `addLayer` and `removeLayer` change the
 * layer collection in the group. `getLayers` is a convenience function for
 * `getLayerGroup().getLayers()`. Note that {@link module:ol/layer/Group~LayerGroup}
 * is a subclass of {@link module:ol/layer/Base~BaseLayer}, so layers entered in the
 * options or added with `addLayer` can be groups, which can contain further
 * groups, and so on.
 *
 * @fires import("./MapBrowserEvent.js").MapBrowserEvent
 * @fires import("./MapEvent.js").MapEvent
 * @fires import("./render/Event.js").default#precompose
 * @fires import("./render/Event.js").default#postcompose
 * @fires import("./render/Event.js").default#rendercomplete
 * @api
 */class extends G{/**
   * @param {MapOptions} [options] Map options.
   */constructor(t){super(),t=t||{},/***
     * @type {MapEventHandler<import("./events").EventsKey>}
     */this.on,/***
     * @type {MapEventHandler<import("./events").EventsKey>}
     */this.once,/***
     * @type {MapEventHandler<void>}
     */this.un;let e=/**
 * @param {MapOptions} options Map options.
 * @return {MapOptionsInternal} Internal map options.
 */function(t){/**
   * @type {HTMLElement|Document}
   */let e,i,n,r=null;void 0!==t.keyboardEventTarget&&(r="string"==typeof t.keyboardEventTarget?document.getElementById(t.keyboardEventTarget):t.keyboardEventTarget);/**
   * @type {Object<string, *>}
   */let s={},o=t.layers&&"function"==typeof /** @type {?} */t.layers.getLayers?/** @type {LayerGroup} */t.layers:new s_({layers:/** @type {Collection<import("./layer/Base.js").default>|Array<import("./layer/Base.js").default>} */t.layers});return s[sC.LAYERGROUP]=o,s[sC.TARGET]=t.target,s[sC.VIEW]=t.view instanceof so?t.view:new so,void 0!==t.controls&&(Array.isArray(t.controls)?e=new rJ(t.controls.slice()):(z("function"==typeof /** @type {?} */t.controls.getArray,"Expected `controls` to be an array or an `ol/Collection.js`"),e=t.controls)),void 0!==t.interactions&&(Array.isArray(t.interactions)?i=new rJ(t.interactions.slice()):(z("function"==typeof /** @type {?} */t.interactions.getArray,"Expected `interactions` to be an array or an `ol/Collection.js`"),i=t.interactions)),void 0!==t.overlays?Array.isArray(t.overlays)?n=new rJ(t.overlays.slice()):(z("function"==typeof /** @type {?} */t.overlays.getArray,"Expected `overlays` to be an array or an `ol/Collection.js`"),n=t.overlays):n=new rJ,{controls:e,interactions:i,keyboardEventTarget:r,overlays:n,values:s}}(t);/**
     * @private
     * @type {boolean|undefined}
     */this.renderComplete_,/**
     * @private
     * @type {boolean}
     */this.loaded_=!0,/** @private */this.boundHandleBrowserEvent_=this.handleBrowserEvent.bind(this),/**
     * @type {number}
     * @private
     */this.maxTilesLoading_=void 0!==t.maxTilesLoading?t.maxTilesLoading:16,/**
     * @private
     * @type {number}
     */this.pixelRatio_=void 0!==t.pixelRatio?t.pixelRatio:Z,/**
     * @private
     * @type {ReturnType<typeof setTimeout>}
     */this.postRenderTimeoutHandle_,/**
     * @private
     * @type {number|undefined}
     */this.animationDelayKey_,/**
     * @private
     */this.animationDelay_=this.animationDelay_.bind(this),/**
     * @private
     * @type {import("./transform.js").Transform}
     */this.coordinateToPixelTransform_=J(),/**
     * @private
     * @type {import("./transform.js").Transform}
     */this.pixelToCoordinateTransform_=J(),/**
     * @private
     * @type {number}
     */this.frameIndex_=0,/**
     * @private
     * @type {?FrameState}
     */this.frameState_=null,/**
     * The extent at the previous 'moveend' event.
     * @private
     * @type {import("./extent.js").Extent}
     */this.previousExtent_=null,/**
     * @private
     * @type {?import("./events.js").EventsKey}
     */this.viewPropertyListenerKey_=null,/**
     * @private
     * @type {?import("./events.js").EventsKey}
     */this.viewChangeListenerKey_=null,/**
     * @private
     * @type {?Array<import("./events.js").EventsKey>}
     */this.layerGroupPropertyListenerKeys_=null,/**
     * @private
     * @type {!HTMLElement}
     */this.viewport_=document.createElement("div"),this.viewport_.className="ol-viewport"+("ontouchstart"in window?" ol-touch":""),this.viewport_.style.position="relative",this.viewport_.style.overflow="hidden",this.viewport_.style.width="100%",this.viewport_.style.height="100%",/**
     * @private
     * @type {!HTMLElement}
     */this.overlayContainer_=document.createElement("div"),this.overlayContainer_.style.position="absolute",this.overlayContainer_.style.zIndex="0",this.overlayContainer_.style.width="100%",this.overlayContainer_.style.height="100%",this.overlayContainer_.style.pointerEvents="none",this.overlayContainer_.className="ol-overlaycontainer",this.viewport_.appendChild(this.overlayContainer_),/**
     * @private
     * @type {!HTMLElement}
     */this.overlayContainerStopEvent_=document.createElement("div"),this.overlayContainerStopEvent_.style.position="absolute",this.overlayContainerStopEvent_.style.zIndex="0",this.overlayContainerStopEvent_.style.width="100%",this.overlayContainerStopEvent_.style.height="100%",this.overlayContainerStopEvent_.style.pointerEvents="none",this.overlayContainerStopEvent_.className="ol-overlaycontainer-stopevent",this.viewport_.appendChild(this.overlayContainerStopEvent_),/**
     * @private
     * @type {MapBrowserEventHandler}
     */this.mapBrowserEventHandler_=null,/**
     * @private
     * @type {number}
     */this.moveTolerance_=t.moveTolerance,/**
     * @private
     * @type {HTMLElement|Document}
     */this.keyboardEventTarget_=e.keyboardEventTarget,/**
     * @private
     * @type {?Array<import("./events.js").EventsKey>}
     */this.targetChangeHandlerKeys_=null,/**
     * @private
     * @type {HTMLElement|null}
     */this.targetElement_=null,/**
     * @type {ResizeObserver}
     */this.resizeObserver_=new ResizeObserver(()=>this.updateSize()),/**
     * @type {Collection<import("./control/Control.js").default>}
     * @protected
     */this.controls=e.controls||function(t){t=t||{};/** @type {Collection<import("./Control.js").default>} */let e=new rJ,i=void 0===t.zoom||t.zoom;i&&e.push(new sb(t.zoomOptions));let n=void 0===t.rotate||t.rotate;n&&e.push(new sL(t.rotateOptions));let r=void 0===t.attribution||t.attribution;return r&&e.push(new sM(t.attributionOptions)),e}(),/**
     * @type {Collection<import("./interaction/Interaction.js").default>}
     * @protected
     */this.interactions=e.interactions||function(t){t=t||{};/** @type {Collection<import("./Interaction.js").default>} */let e=new rJ,i=new s5(-.005,.05,100),n=void 0===t.altShiftDragRotate||t.altShiftDragRotate;n&&e.push(new sH);let r=void 0===t.doubleClickZoom||t.doubleClickZoom;r&&e.push(new sO({delta:t.zoomDelta,duration:t.zoomDuration}));let s=void 0===t.dragPan||t.dragPan;s&&e.push(new sV({onFocusOnly:t.onFocusOnly,kinetic:i}));let o=void 0===t.pinchRotate||t.pinchRotate;o&&e.push(new s6);let l=void 0===t.pinchZoom||t.pinchZoom;l&&e.push(new s8({duration:t.zoomDuration}));let a=void 0===t.keyboard||t.keyboard;a&&(e.push(new s2),e.push(new s3({delta:t.zoomDelta,duration:t.zoomDuration})));let h=void 0===t.mouseWheelZoom||t.mouseWheelZoom;h&&e.push(new s4({onFocusOnly:t.onFocusOnly,duration:t.zoomDuration}));let u=void 0===t.shiftDragZoom||t.shiftDragZoom;return u&&e.push(new s0({duration:t.zoomDuration})),e}({onFocusOnly:!0}),/**
     * @type {Collection<import("./Overlay.js").default>}
     * @private
     */this.overlays_=e.overlays,/**
     * A lookup of overlays by id.
     * @private
     * @type {Object<string, import("./Overlay.js").default>}
     */this.overlayIdIndex_={},/**
     * @type {import("./renderer/Map.js").default|null}
     * @private
     */this.renderer_=null,/**
     * @private
     * @type {!Array<PostRenderFunction>}
     */this.postRenderFunctions_=[],/**
     * @private
     * @type {TileQueue}
     */this.tileQueue_=new sT(this.getTilePriority.bind(this),this.handleTileChange_.bind(this)),this.addChangeListener(sC.LAYERGROUP,this.handleLayerGroupChanged_),this.addChangeListener(sC.VIEW,this.handleViewChanged_),this.addChangeListener(sC.SIZE,this.handleSizeChanged_),this.addChangeListener(sC.TARGET,this.handleTargetChanged_),// setProperties will trigger the rendering of the map if the map
// is "defined" already.
this.setProperties(e.values);let i=this;!t.view||t.view instanceof so||t.view.then(function(t){i.setView(new so(t))}),this.controls.addEventListener(rV.ADD,/**
       * @param {import("./Collection.js").CollectionEvent<import("./control/Control.js").default>} event CollectionEvent
       */t=>{t.element.setMap(this)}),this.controls.addEventListener(rV.REMOVE,/**
       * @param {import("./Collection.js").CollectionEvent<import("./control/Control.js").default>} event CollectionEvent.
       */t=>{t.element.setMap(null)}),this.interactions.addEventListener(rV.ADD,/**
       * @param {import("./Collection.js").CollectionEvent<import("./interaction/Interaction.js").default>} event CollectionEvent.
       */t=>{t.element.setMap(this)}),this.interactions.addEventListener(rV.REMOVE,/**
       * @param {import("./Collection.js").CollectionEvent<import("./interaction/Interaction.js").default>} event CollectionEvent.
       */t=>{t.element.setMap(null)}),this.overlays_.addEventListener(rV.ADD,/**
       * @param {import("./Collection.js").CollectionEvent<import("./Overlay.js").default>} event CollectionEvent.
       */t=>{this.addOverlayInternal_(t.element)}),this.overlays_.addEventListener(rV.REMOVE,/**
       * @param {import("./Collection.js").CollectionEvent<import("./Overlay.js").default>} event CollectionEvent.
       */t=>{let e=t.element.getId();void 0!==e&&delete this.overlayIdIndex_[e.toString()],t.element.setMap(null)}),this.controls.forEach(/**
       * @param {import("./control/Control.js").default} control Control.
       */t=>{t.setMap(this)}),this.interactions.forEach(/**
       * @param {import("./interaction/Interaction.js").default} interaction Interaction.
       */t=>{t.setMap(this)}),this.overlays_.forEach(this.addOverlayInternal_.bind(this))}/**
   * Add the given control to the map.
   * @param {import("./control/Control.js").default} control Control.
   * @api
   */addControl(t){this.getControls().push(t)}/**
   * Add the given interaction to the map. If you want to add an interaction
   * at another point of the collection use `getInteractions()` and the methods
   * available on {@link module:ol/Collection~Collection}. This can be used to
   * stop the event propagation from the handleEvent function. The interactions
   * get to handle the events in the reverse order of this collection.
   * @param {import("./interaction/Interaction.js").default} interaction Interaction to add.
   * @api
   */addInteraction(t){this.getInteractions().push(t)}/**
   * Adds the given layer to the top of this map. If you want to add a layer
   * elsewhere in the stack, use `getLayers()` and the methods available on
   * {@link module:ol/Collection~Collection}.
   * @param {import("./layer/Base.js").default} layer Layer.
   * @api
   */addLayer(t){let e=this.getLayerGroup().getLayers();e.push(t)}/**
   * @param {import("./layer/Group.js").GroupEvent} event The layer add event.
   * @private
   */handleLayerAdd_(t){!/**
 * @param {import("./layer/Base.js").default} layer Layer.
 * @param {Map} map Map.
 */function t(e,i){if(e instanceof sa){e.setMapInternal(i);return}if(e instanceof s_){let n=e.getLayers().getArray();for(let e=0,r=n.length;e<r;++e)t(n[e],i)}}(t.layer,this)}/**
   * Add the given overlay to the map.
   * @param {import("./Overlay.js").default} overlay Overlay.
   * @api
   */addOverlay(t){this.getOverlays().push(t)}/**
   * This deals with map's overlay collection changes.
   * @param {import("./Overlay.js").default} overlay Overlay.
   * @private
   */addOverlayInternal_(t){let e=t.getId();void 0!==e&&(this.overlayIdIndex_[e.toString()]=t),t.setMap(this)}/**
   *
   * Clean up.
   */disposeInternal(){this.controls.clear(),this.interactions.clear(),this.overlays_.clear(),this.resizeObserver_.disconnect(),this.setTarget(null),super.disposeInternal()}/**
   * Detect features that intersect a pixel on the viewport, and execute a
   * callback with each intersecting feature. Layers included in the detection can
   * be configured through the `layerFilter` option in `options`.
   * @param {import("./pixel.js").Pixel} pixel Pixel.
   * @param {function(import("./Feature.js").FeatureLike, import("./layer/Layer.js").default<import("./source/Source").default>, import("./geom/SimpleGeometry.js").default): T} callback Feature callback. The callback will be
   *     called with two arguments. The first argument is one
   *     {@link module:ol/Feature~Feature feature} or
   *     {@link module:ol/render/Feature~RenderFeature render feature} at the pixel, the second is
   *     the {@link module:ol/layer/Layer~Layer layer} of the feature and will be null for
   *     unmanaged layers. To stop detection, callback functions can return a
   *     truthy value.
   * @param {AtPixelOptions} [options] Optional options.
   * @return {T|undefined} Callback result, i.e. the return value of last
   * callback execution, or the first truthy callback return value.
   * @template T
   * @api
   */forEachFeatureAtPixel(t,e,i){if(!this.frameState_||!this.renderer_)return;let n=this.getCoordinateFromPixelInternal(t);i=void 0!==i?i:{};let r=void 0!==i.hitTolerance?i.hitTolerance:0,s=void 0!==i.layerFilter?i.layerFilter:S,o=!1!==i.checkWrapped;return this.renderer_.forEachFeatureAtCoordinate(n,this.frameState_,r,o,e,null,s,null)}/**
   * Get all features that intersect a pixel on the viewport.
   * @param {import("./pixel.js").Pixel} pixel Pixel.
   * @param {AtPixelOptions} [options] Optional options.
   * @return {Array<import("./Feature.js").FeatureLike>} The detected features or
   * an empty array if none were found.
   * @api
   */getFeaturesAtPixel(t,e){let i=[];return this.forEachFeatureAtPixel(t,function(t){i.push(t)},e),i}/**
   * Get all layers from all layer groups.
   * @return {Array<import("./layer/Layer.js").default>} Layers.
   * @api
   */getAllLayers(){let t=[];return!function e(i){i.forEach(function(i){i instanceof s_?e(i.getLayers()):t.push(i)})}(this.getLayers()),t}/**
   * Detect if features intersect a pixel on the viewport. Layers included in the
   * detection can be configured through the `layerFilter` option.
   * @param {import("./pixel.js").Pixel} pixel Pixel.
   * @param {AtPixelOptions} [options] Optional options.
   * @return {boolean} Is there a feature at the given pixel?
   * @api
   */hasFeatureAtPixel(t,e){if(!this.frameState_||!this.renderer_)return!1;let i=this.getCoordinateFromPixelInternal(t);e=void 0!==e?e:{};let n=void 0!==e.layerFilter?e.layerFilter:S,r=void 0!==e.hitTolerance?e.hitTolerance:0,s=!1!==e.checkWrapped;return this.renderer_.hasFeatureAtCoordinate(i,this.frameState_,r,s,n,null)}/**
   * Returns the coordinate in user projection for a browser event.
   * @param {MouseEvent} event Event.
   * @return {import("./coordinate.js").Coordinate} Coordinate.
   * @api
   */getEventCoordinate(t){return this.getCoordinateFromPixel(this.getEventPixel(t))}/**
   * Returns the coordinate in view projection for a browser event.
   * @param {MouseEvent} event Event.
   * @return {import("./coordinate.js").Coordinate} Coordinate.
   */getEventCoordinateInternal(t){return this.getCoordinateFromPixelInternal(this.getEventPixel(t))}/**
   * Returns the map pixel position for a browser event relative to the viewport.
   * @param {UIEvent|{clientX: number, clientY: number}} event Event.
   * @return {import("./pixel.js").Pixel} Pixel.
   * @api
   */getEventPixel(t){let e=this.viewport_,i=e.getBoundingClientRect(),n=this.getSize(),r=i.width/n[0],s=i.height/n[1],o="changedTouches"in t?/** @type {TouchEvent} */t.changedTouches[0]:/** @type {MouseEvent} */t;return[(o.clientX-i.left)/r,(o.clientY-i.top)/s]}/**
   * Get the target in which this map is rendered.
   * Note that this returns what is entered as an option or in setTarget:
   * if that was an element, it returns an element; if a string, it returns that.
   * @return {HTMLElement|string|undefined} The Element or id of the Element that the
   *     map is rendered in.
   * @observable
   * @api
   */getTarget(){return /** @type {HTMLElement|string|undefined} */this.get(sC.TARGET)}/**
   * Get the DOM element into which this map is rendered. In contrast to
   * `getTarget` this method always return an `Element`, or `null` if the
   * map has no target.
   * @return {HTMLElement} The element that the map is rendered in.
   * @api
   */getTargetElement(){return this.targetElement_}/**
   * Get the coordinate for a given pixel.  This returns a coordinate in the
   * user projection.
   * @param {import("./pixel.js").Pixel} pixel Pixel position in the map viewport.
   * @return {import("./coordinate.js").Coordinate} The coordinate for the pixel position.
   * @api
   */getCoordinateFromPixel(t){var e,i;return e=this.getCoordinateFromPixelInternal(t),this.getView().getProjection(),e}/**
   * Get the coordinate for a given pixel.  This returns a coordinate in the
   * map view projection.
   * @param {import("./pixel.js").Pixel} pixel Pixel position in the map viewport.
   * @return {import("./coordinate.js").Coordinate} The coordinate for the pixel position.
   */getCoordinateFromPixelInternal(t){let e=this.frameState_;return e?$(e.pixelToCoordinateTransform,t.slice()):null}/**
   * Get the map controls. Modifying this collection changes the controls
   * associated with the map.
   * @return {Collection<import("./control/Control.js").default>} Controls.
   * @api
   */getControls(){return this.controls}/**
   * Get the map overlays. Modifying this collection changes the overlays
   * associated with the map.
   * @return {Collection<import("./Overlay.js").default>} Overlays.
   * @api
   */getOverlays(){return this.overlays_}/**
   * Get an overlay by its identifier (the value returned by overlay.getId()).
   * Note that the index treats string and numeric identifiers as the same. So
   * `map.getOverlayById(2)` will return an overlay with id `'2'` or `2`.
   * @param {string|number} id Overlay identifier.
   * @return {import("./Overlay.js").default} Overlay.
   * @api
   */getOverlayById(t){let e=this.overlayIdIndex_[t.toString()];return void 0!==e?e:null}/**
   * Get the map interactions. Modifying this collection changes the interactions
   * associated with the map.
   *
   * Interactions are used for e.g. pan, zoom and rotate.
   * @return {Collection<import("./interaction/Interaction.js").default>} Interactions.
   * @api
   */getInteractions(){return this.interactions}/**
   * Get the layergroup associated with this map.
   * @return {LayerGroup} A layer group containing the layers in this map.
   * @observable
   * @api
   */getLayerGroup(){return /** @type {LayerGroup} */this.get(sC.LAYERGROUP)}/**
   * Clear any existing layers and add layers to the map.
   * @param {Array<import("./layer/Base.js").default>|Collection<import("./layer/Base.js").default>} layers The layers to be added to the map.
   * @api
   */setLayers(t){let e=this.getLayerGroup();if(t instanceof rJ){e.setLayers(t);return}let i=e.getLayers();i.clear(),i.extend(t)}/**
   * Get the collection of layers associated with this map.
   * @return {!Collection<import("./layer/Base.js").default>} Layers.
   * @api
   */getLayers(){let t=this.getLayerGroup().getLayers();return t}/**
   * @return {boolean} Layers have sources that are still loading.
   */getLoadingOrNotReady(){let t=this.getLayerGroup().getLayerStatesArray();for(let e=0,i=t.length;e<i;++e){let i=t[e];if(!i.visible)continue;let n=i.layer.getRenderer();if(n&&!n.ready)return!0;let r=i.layer.getSource();if(r&&r.loading)return!0}return!1}/**
   * Get the pixel for a coordinate.  This takes a coordinate in the user
   * projection and returns the corresponding pixel.
   * @param {import("./coordinate.js").Coordinate} coordinate A map coordinate.
   * @return {import("./pixel.js").Pixel} A pixel position in the map viewport.
   * @api
   */getPixelFromCoordinate(t){let e=ed(t,this.getView().getProjection());return this.getPixelFromCoordinateInternal(e)}/**
   * Get the pixel for a coordinate.  This takes a coordinate in the map view
   * projection and returns the corresponding pixel.
   * @param {import("./coordinate.js").Coordinate} coordinate A map coordinate.
   * @return {import("./pixel.js").Pixel} A pixel position in the map viewport.
   */getPixelFromCoordinateInternal(t){let e=this.frameState_;return e?$(e.coordinateToPixelTransform,t.slice(0,2)):null}/**
   * Get the map renderer.
   * @return {import("./renderer/Map.js").default|null} Renderer
   */getRenderer(){return this.renderer_}/**
   * Get the size of this map.
   * @return {import("./size.js").Size|undefined} The size in pixels of the map in the DOM.
   * @observable
   * @api
   */getSize(){return /** @type {import("./size.js").Size|undefined} */this.get(sC.SIZE)}/**
   * Get the view associated with this map. A view manages properties such as
   * center and resolution.
   * @return {View} The view that controls this map.
   * @observable
   * @api
   */getView(){return /** @type {View} */this.get(sC.VIEW)}/**
   * Get the element that serves as the map viewport.
   * @return {HTMLElement} Viewport.
   * @api
   */getViewport(){return this.viewport_}/**
   * Get the element that serves as the container for overlays.  Elements added to
   * this container will let mousedown and touchstart events through to the map,
   * so clicks and gestures on an overlay will trigger {@link module:ol/MapBrowserEvent~MapBrowserEvent}
   * events.
   * @return {!HTMLElement} The map's overlay container.
   */getOverlayContainer(){return this.overlayContainer_}/**
   * Get the element that serves as a container for overlays that don't allow
   * event propagation. Elements added to this container won't let mousedown and
   * touchstart events through to the map, so clicks and gestures on an overlay
   * don't trigger any {@link module:ol/MapBrowserEvent~MapBrowserEvent}.
   * @return {!HTMLElement} The map's overlay container that stops events.
   */getOverlayContainerStopEvent(){return this.overlayContainerStopEvent_}/**
   * @return {!Document} The document where the map is displayed.
   */getOwnerDocument(){let t=this.getTargetElement();return t?t.ownerDocument:document}/**
   * @param {import("./Tile.js").default} tile Tile.
   * @param {string} tileSourceKey Tile source key.
   * @param {import("./coordinate.js").Coordinate} tileCenter Tile center.
   * @param {number} tileResolution Tile resolution.
   * @return {number} Tile priority.
   */getTilePriority(t,e,i,n){return function(t,e,i,n,r){// Filter out tiles at higher zoom levels than the current zoom level, or that
// are outside the visible extent.
if(!t||!(i in t.wantedTiles)||!t.wantedTiles[i][e.getKey()])return sS;// Prioritize the highest zoom level tiles closest to the focus.
// Tiles at higher zoom levels are prioritized using Math.log(tileResolution).
// Within a zoom level, tiles are prioritized by the distance in pixels between
// the center of the tile and the center of the viewport.  The factor of 65536
// means that the prioritization should behave as desired for tiles up to
// 65536 * Math.log(2) = 45426 pixels from the focus.
let s=t.viewState.center,o=n[0]-s[0],l=n[1]-s[1];return 65536*Math.log(r)+Math.sqrt(o*o+l*l)/r}(this.frameState_,t,e,i,n)}/**
   * @param {UIEvent} browserEvent Browser event.
   * @param {string} [type] Type.
   */handleBrowserEvent(t,e){e=e||t.type;let i=new sp(e,this,t);this.handleMapBrowserEvent(i)}/**
   * @param {MapBrowserEvent} mapBrowserEvent The event to handle.
   */handleMapBrowserEvent(t){if(!this.frameState_)// coordinates so interactions cannot be used.
return;let e=/** @type {PointerEvent} */t.originalEvent,i=e.type;if(i===sx.POINTERDOWN||i===L.WHEEL||i===L.KEYDOWN){let t=this.getOwnerDocument(),i=this.viewport_.getRootNode?this.viewport_.getRootNode():t,n=/** @type {Node} */e.target;if(// to be handled by map interactions.
this.overlayContainerStopEvent_.contains(n)||// Abort if the event target is a child of the container that is no longer in the page.
// It's possible for the target to no longer be in the page if it has been removed in an
// event listener, this might happen in a Control that recreates it's content based on
// user interaction either manually or via a render in something like https://reactjs.org/
!(i===t?t.documentElement:i).contains(n))return}if(t.frameState=this.frameState_,!1!==this.dispatchEvent(t)){let e=this.getInteractions().getArray().slice();for(let i=e.length-1;i>=0;i--){let n=e[i];if(n.getMap()!==this||!n.getActive()||!this.getTargetElement())continue;let r=n.handleEvent(t);if(!r||t.propagationStopped)break}}}/**
   * @protected
   */handlePostRender(){let t=this.frameState_,e=this.tileQueue_;if(!e.isEmpty()){let i=this.maxTilesLoading_,n=i;if(t){let e=t.viewHints;if(e[r1.ANIMATING]||e[r1.INTERACTING]){let e=Date.now()-t.time>8;i=e?0:8,n=e?0:2}}e.getTilesLoading()<i&&(e.reprioritize(),e.loadMoreTiles(i,n))}t&&this.renderer_&&!t.animate&&(!0===this.renderComplete_?(this.hasListener(r0.RENDERCOMPLETE)&&this.renderer_.dispatchRenderEvent(r0.RENDERCOMPLETE,t),!1===this.loaded_&&(this.loaded_=!0,this.dispatchEvent(new sm(sE.LOADEND,this,t)))):!0===this.loaded_&&(this.loaded_=!1,this.dispatchEvent(new sm(sE.LOADSTART,this,t))));let i=this.postRenderFunctions_;for(let e=0,n=i.length;e<n;++e)i[e](this,t);i.length=0}/**
   * @private
   */handleSizeChanged_(){this.getView()&&!this.getView().getAnimating()&&this.getView().resolveConstraints(0),this.render()}/**
   * @private
   */handleTargetChanged_(){if(this.mapBrowserEventHandler_){for(let t=0,e=this.targetChangeHandlerKeys_.length;t<e;++t)A(this.targetChangeHandlerKeys_[t]);this.targetChangeHandlerKeys_=null,this.viewport_.removeEventListener(L.CONTEXTMENU,this.boundHandleBrowserEvent_),this.viewport_.removeEventListener(L.WHEEL,this.boundHandleBrowserEvent_),this.mapBrowserEventHandler_.dispose(),this.mapBrowserEventHandler_=null,eF(this.viewport_)}if(this.targetElement_){this.resizeObserver_.unobserve(this.targetElement_);let t=this.targetElement_.getRootNode();t instanceof ShadowRoot&&this.resizeObserver_.unobserve(t.host),this.setSize(void 0)}// target may be undefined, null, a string or an Element.
// If it's a string we convert it to an Element before proceeding.
// If it's not now an Element we remove the viewport from the DOM.
// If it's an Element we append the viewport element to it.
let t=this.getTarget(),e="string"==typeof t?document.getElementById(t):t;if(this.targetElement_=e,e){for(let t in e.appendChild(this.viewport_),this.renderer_||(this.renderer_=new sc(this)),this.mapBrowserEventHandler_=new sv(this,this.moveTolerance_),sy)this.mapBrowserEventHandler_.addEventListener(sy[t],this.handleMapBrowserEvent.bind(this));this.viewport_.addEventListener(L.CONTEXTMENU,this.boundHandleBrowserEvent_,!1),this.viewport_.addEventListener(L.WHEEL,this.boundHandleBrowserEvent_,!!q&&{passive:!1});let t=this.keyboardEventTarget_?this.keyboardEventTarget_:e;this.targetChangeHandlerKeys_=[b(t,L.KEYDOWN,this.handleBrowserEvent,this),b(t,L.KEYPRESS,this.handleBrowserEvent,this)];let i=e.getRootNode();i instanceof ShadowRoot&&this.resizeObserver_.observe(i.host),this.resizeObserver_.observe(e)}else this.renderer_&&(clearTimeout(this.postRenderTimeoutHandle_),this.postRenderTimeoutHandle_=void 0,this.postRenderFunctions_.length=0,this.renderer_.dispose(),this.renderer_=null),this.animationDelayKey_&&(cancelAnimationFrame(this.animationDelayKey_),this.animationDelayKey_=void 0);this.updateSize();// updateSize calls setSize, so no need to call this.render
// ourselves here.
}/**
   * @private
   */handleTileChange_(){this.render()}/**
   * @private
   */handleViewPropertyChanged_(){this.render()}/**
   * @private
   */handleViewChanged_(){this.viewPropertyListenerKey_&&(A(this.viewPropertyListenerKey_),this.viewPropertyListenerKey_=null),this.viewChangeListenerKey_&&(A(this.viewChangeListenerKey_),this.viewChangeListenerKey_=null);let t=this.getView();t&&(this.updateViewportSize_(),this.viewPropertyListenerKey_=b(t,p.PROPERTYCHANGE,this.handleViewPropertyChanged_,this),this.viewChangeListenerKey_=b(t,L.CHANGE,this.handleViewPropertyChanged_,this),t.resolveConstraints(0)),this.render()}/**
   * @private
   */handleLayerGroupChanged_(){this.layerGroupPropertyListenerKeys_&&(this.layerGroupPropertyListenerKeys_.forEach(A),this.layerGroupPropertyListenerKeys_=null);let t=this.getLayerGroup();t&&(this.handleLayerAdd_(new sg("addlayer",t)),this.layerGroupPropertyListenerKeys_=[b(t,p.PROPERTYCHANGE,this.render,this),b(t,L.CHANGE,this.render,this),b(t,"addlayer",this.handleLayerAdd_,this),b(t,"removelayer",this.handleLayerRemove_,this)]),this.render()}/**
   * @return {boolean} Is rendered.
   */isRendered(){return!!this.frameState_}/**
   * @private
   */animationDelay_(){this.animationDelayKey_=void 0,this.renderFrame_(Date.now())}/**
   * Requests an immediate render in a synchronous manner.
   * @api
   */renderSync(){this.animationDelayKey_&&cancelAnimationFrame(this.animationDelayKey_),this.animationDelay_()}/**
   * Redraws all text after new fonts have loaded
   */redrawText(){let t=this.getLayerGroup().getLayerStatesArray();for(let e=0,i=t.length;e<i;++e){let i=t[e].layer;i.hasRenderer()&&i.getRenderer().handleFontsChanged()}}/**
   * Request a map rendering (at the next animation frame).
   * @api
   */render(){this.renderer_&&void 0===this.animationDelayKey_&&(this.animationDelayKey_=requestAnimationFrame(this.animationDelay_))}/**
   * This method is meant to be called in a layer's `prerender` listener. It causes all collected
   * declutter items to be decluttered and rendered on the map immediately. This is useful for
   * layers that need to appear entirely above the decluttered items of layers lower in the layer
   * stack.
   * @api
   */flushDeclutterItems(){let t=this.frameState_;t&&this.renderer_.flushDeclutterItems(t)}/**
   * Remove the given control from the map.
   * @param {import("./control/Control.js").default} control Control.
   * @return {import("./control/Control.js").default|undefined} The removed control (or undefined
   *     if the control was not found).
   * @api
   */removeControl(t){return this.getControls().remove(t)}/**
   * Remove the given interaction from the map.
   * @param {import("./interaction/Interaction.js").default} interaction Interaction to remove.
   * @return {import("./interaction/Interaction.js").default|undefined} The removed interaction (or
   *     undefined if the interaction was not found).
   * @api
   */removeInteraction(t){return this.getInteractions().remove(t)}/**
   * Removes the given layer from the map.
   * @param {import("./layer/Base.js").default} layer Layer.
   * @return {import("./layer/Base.js").default|undefined} The removed layer (or undefined if the
   *     layer was not found).
   * @api
   */removeLayer(t){let e=this.getLayerGroup().getLayers();return e.remove(t)}/**
   * @param {import("./layer/Group.js").GroupEvent} event The layer remove event.
   * @private
   */handleLayerRemove_(t){!/**
 * State of the current frame. Only `pixelRatio`, `time` and `viewState` should
 * be used in applications.
 * @typedef {Object} FrameState
 * @property {number} pixelRatio The pixel ratio of the frame.
 * @property {number} time The time when rendering of the frame was requested.
 * @property {import("./View.js").State} viewState The state of the current view.
 * @property {boolean} animate Animate.
 * @property {import("./transform.js").Transform} coordinateToPixelTransform CoordinateToPixelTransform.
 * @property {import("rbush").default} declutterTree DeclutterTree.
 * @property {null|import("./extent.js").Extent} extent Extent (in view projection coordinates).
 * @property {import("./extent.js").Extent} [nextExtent] Next extent during an animation series.
 * @property {number} index Index.
 * @property {Array<import("./layer/Layer.js").State>} layerStatesArray LayerStatesArray.
 * @property {number} layerIndex LayerIndex.
 * @property {import("./transform.js").Transform} pixelToCoordinateTransform PixelToCoordinateTransform.
 * @property {Array<PostRenderFunction>} postRenderFunctions PostRenderFunctions.
 * @property {import("./size.js").Size} size Size.
 * @property {TileQueue} tileQueue TileQueue.
 * @property {!Object<string, Object<string, boolean>>} usedTiles UsedTiles.
 * @property {Array<number>} viewHints ViewHints.
 * @property {!Object<string, Object<string, boolean>>} wantedTiles WantedTiles.
 * @property {string} mapId The id of the map.
 * @property {Object<string, boolean>} renderTargets Identifiers of previously rendered elements.
 *//**
 * @typedef {function(Map, ?FrameState): any} PostRenderFunction
 *//**
 * @typedef {Object} AtPixelOptions
 * @property {undefined|function(import("./layer/Layer.js").default<import("./source/Source").default>): boolean} [layerFilter] Layer filter
 * function. The filter function will receive one argument, the
 * {@link module:ol/layer/Layer~Layer layer-candidate} and it should return a boolean value.
 * Only layers which are visible and for which this function returns `true`
 * will be tested for features. By default, all visible layers will be tested.
 * @property {number} [hitTolerance=0] Hit-detection tolerance in css pixels. Pixels
 * inside the radius around the given position will be checked for features.
 * @property {boolean} [checkWrapped=true] Check-Wrapped Will check for wrapped geometries inside the range of
 *   +/- 1 world width. Works only if a projection is used that can be wrapped.
 *//**
 * @typedef {Object} MapOptionsInternal
 * @property {Collection<import("./control/Control.js").default>} [controls] Controls.
 * @property {Collection<import("./interaction/Interaction.js").default>} [interactions] Interactions.
 * @property {HTMLElement|Document} keyboardEventTarget KeyboardEventTarget.
 * @property {Collection<import("./Overlay.js").default>} overlays Overlays.
 * @property {Object<string, *>} values Values.
 *//**
 * @typedef {import("./ObjectEventType").Types|'change:layergroup'|'change:size'|'change:target'|'change:view'} MapObjectEventTypes
 *//***
 * @template Return
 * @typedef {import("./Observable").OnSignature<import("./Observable").EventTypes, import("./events/Event.js").default, Return> &
 *    import("./Observable").OnSignature<MapObjectEventTypes, import("./Object").ObjectEvent, Return> &
 *    import("./Observable").OnSignature<import("./MapBrowserEventType").Types, import("./MapBrowserEvent").default, Return> &
 *    import("./Observable").OnSignature<import("./MapEventType").Types, import("./MapEvent").default, Return> &
 *    import("./Observable").OnSignature<import("./render/EventType").MapRenderEventTypes, import("./render/Event").default, Return> &
 *    import("./Observable").CombinedOnSignature<import("./Observable").EventTypes|MapObjectEventTypes|
 *      import("./MapBrowserEventType").Types|import("./MapEventType").Types|
 *      import("./render/EventType").MapRenderEventTypes, Return>} MapEventHandler
 *//**
 * Object literal with config options for the map.
 * @typedef {Object} MapOptions
 * @property {Collection<import("./control/Control.js").default>|Array<import("./control/Control.js").default>} [controls]
 * Controls initially added to the map. If not specified,
 * {@link module:ol/control/defaults.defaults} is used.
 * @property {number} [pixelRatio=window.devicePixelRatio] The ratio between
 * physical pixels and device-independent pixels (dips) on the device.
 * @property {Collection<import("./interaction/Interaction.js").default>|Array<import("./interaction/Interaction.js").default>} [interactions]
 * Interactions that are initially added to the map. If not specified,
 * {@link module:ol/interaction/defaults.defaults} is used.
 * @property {HTMLElement|Document|string} [keyboardEventTarget] The element to
 * listen to keyboard events on. This determines when the `KeyboardPan` and
 * `KeyboardZoom` interactions trigger. For example, if this option is set to
 * `document` the keyboard interactions will always trigger. If this option is
 * not specified, the element the library listens to keyboard events on is the
 * map target (i.e. the user-provided div for the map). If this is not
 * `document`, the target element needs to be focused for key events to be
 * emitted, requiring that the target element has a `tabindex` attribute.
 * @property {Array<import("./layer/Base.js").default>|Collection<import("./layer/Base.js").default>|LayerGroup} [layers]
 * Layers. If this is not defined, a map with no layers will be rendered. Note
 * that layers are rendered in the order supplied, so if you want, for example,
 * a vector layer to appear on top of a tile layer, it must come after the tile
 * layer.
 * @property {number} [maxTilesLoading=16] Maximum number tiles to load
 * simultaneously.
 * @property {number} [moveTolerance=1] The minimum distance in pixels the
 * cursor must move to be detected as a map move event instead of a click.
 * Increasing this value can make it easier to click on the map.
 * @property {Collection<import("./Overlay.js").default>|Array<import("./Overlay.js").default>} [overlays]
 * Overlays initially added to the map. By default, no overlays are added.
 * @property {HTMLElement|string} [target] The container for the map, either the
 * element itself or the `id` of the element. If not specified at construction
 * time, {@link module:ol/Map~Map#setTarget} must be called for the map to be
 * rendered. If passed by element, the container can be in a secondary document.
 * **Note:** CSS `transform` support for the target element is limited to `scale`.
 * @property {View|Promise<import("./View.js").ViewOptions>} [view] The map's view.  No layer sources will be
 * fetched unless this is specified at construction time or through
 * {@link module:ol/Map~Map#setView}.
 *//**
 * @param {import("./layer/Base.js").default} layer Layer.
 */function t(e){if(e instanceof sa){e.setMapInternal(null);return}e instanceof s_&&e.getLayers().forEach(t)}(t.layer)}/**
   * Remove the given overlay from the map.
   * @param {import("./Overlay.js").default} overlay Overlay.
   * @return {import("./Overlay.js").default|undefined} The removed overlay (or undefined
   *     if the overlay was not found).
   * @api
   */removeOverlay(t){return this.getOverlays().remove(t)}/**
   * @param {number} time Time.
   * @private
   */renderFrame_(t){let e=this.getSize(),i=this.getView(),n=this.frameState_,r=null;if(void 0!==e&&ex(e)&&i&&i.isDef()){let n=i.getHints(this.frameState_?this.frameState_.viewHints:void 0),s=i.getState();if(r={animate:!1,coordinateToPixelTransform:this.coordinateToPixelTransform_,declutterTree:null,extent:tR(s.center,s.resolution,s.rotation,e),index:this.frameIndex_++,layerIndex:0,layerStatesArray:this.getLayerGroup().getLayerStatesArray(),pixelRatio:this.pixelRatio_,pixelToCoordinateTransform:this.pixelToCoordinateTransform_,postRenderFunctions:[],size:e,tileQueue:this.tileQueue_,time:t,usedTiles:{},viewState:s,viewHints:n,wantedTiles:{},mapId:k(this),renderTargets:{}},s.nextCenter&&s.nextResolution){let t=isNaN(s.nextRotation)?s.rotation:s.nextRotation;r.nextExtent=tR(s.nextCenter,s.nextResolution,t,e)}}if(this.frameState_=r,this.renderer_.renderFrame(r),r){if(r.animate&&this.render(),Array.prototype.push.apply(this.postRenderFunctions_,r.postRenderFunctions),n){let t=!this.previousExtent_||!tP(this.previousExtent_)&&!t_(r.extent,this.previousExtent_);t&&(this.dispatchEvent(new sm(sE.MOVESTART,this,n)),this.previousExtent_=tg(this.previousExtent_))}let t=this.previousExtent_&&!r.viewHints[r1.ANIMATING]&&!r.viewHints[r1.INTERACTING]&&!t_(r.extent,this.previousExtent_);t&&(this.dispatchEvent(new sm(sE.MOVEEND,this,r)),ts(r.extent,this.previousExtent_))}this.dispatchEvent(new sm(sE.POSTRENDER,this,r)),this.renderComplete_=this.hasListener(sE.LOADSTART)||this.hasListener(sE.LOADEND)||this.hasListener(r0.RENDERCOMPLETE)?!this.tileQueue_.getTilesLoading()&&!this.tileQueue_.getCount()&&!this.getLoadingOrNotReady():void 0,this.postRenderTimeoutHandle_||(this.postRenderTimeoutHandle_=setTimeout(()=>{this.postRenderTimeoutHandle_=void 0,this.handlePostRender()},0))}/**
   * Sets the layergroup of this map.
   * @param {LayerGroup} layerGroup A layer group containing the layers in this map.
   * @observable
   * @api
   */setLayerGroup(t){let e=this.getLayerGroup();e&&this.handleLayerRemove_(new sg("removelayer",e)),this.set(sC.LAYERGROUP,t)}/**
   * Set the size of this map.
   * @param {import("./size.js").Size|undefined} size The size in pixels of the map in the DOM.
   * @observable
   * @api
   */setSize(t){this.set(sC.SIZE,t)}/**
   * Set the target element to render this map into.
   * @param {HTMLElement|string} [target] The Element or id of the Element
   *     that the map is rendered in.
   * @observable
   * @api
   */setTarget(t){this.set(sC.TARGET,t)}/**
   * Set the view for this map.
   * @param {View|Promise<import("./View.js").ViewOptions>} view The view that controls this map.
   * It is also possible to pass a promise that resolves to options for constructing a view.  This
   * alternative allows view properties to be resolved by sources or other components that load
   * view-related metadata.
   * @observable
   * @api
   */setView(t){if(!t||t instanceof so){this.set(sC.VIEW,t);return}this.set(sC.VIEW,new so);let e=this;t.then(function(t){e.setView(new so(t))})}/**
   * Force a recalculation of the map viewport size.  This should be called when
   * third-party code changes the size of the map viewport.
   * @api
   */updateSize(){let t;let e=this.getTargetElement();if(e){let i=getComputedStyle(e),n=e.offsetWidth-parseFloat(i.borderLeftWidth)-parseFloat(i.paddingLeft)-parseFloat(i.paddingRight)-parseFloat(i.borderRightWidth),r=e.offsetHeight-parseFloat(i.borderTopWidth)-parseFloat(i.paddingTop)-parseFloat(i.paddingBottom)-parseFloat(i.borderBottomWidth);!isNaN(n)&&!isNaN(r)&&!ex(t=[n,r])&&(e.offsetWidth||e.offsetHeight||e.getClientRects().length)&&t8("No map visible because the map container's width or height are 0.")}let i=this.getSize();!t||i&&C(t,i)||(this.setSize(t),this.updateViewportSize_())}/**
   * Recomputes the viewport size and save it on the view object (if any)
   * @private
   */updateViewportSize_(){let t=this.getView();if(t){let e;let i=getComputedStyle(this.viewport_);i.width&&i.height&&(e=[parseInt(i.width,10),parseInt(i.height,10)]),t.setViewportSize(e)}}},s9={};s9=function(){function t(t,e,i){var n=t[e];t[e]=t[i],t[i]=n}function e(t,e){return t<e?-1:t>e?1:0}var i=function(t){void 0===t&&(t=9),this._maxEntries=Math.max(4,t),this._minEntries=Math.max(2,Math.ceil(.4*this._maxEntries)),this.clear()};function n(t,e){r(t,0,t.children.length,e,t)}function r(t,e,i,n,r){r||(r=c(null)),r.minX=1/0,r.minY=1/0,r.maxX=-1/0,r.maxY=-1/0;for(var o=e;o<i;o++){var l=t.children[o];s(r,t.leaf?n(l):l)}return r}function s(t,e){return t.minX=Math.min(t.minX,e.minX),t.minY=Math.min(t.minY,e.minY),t.maxX=Math.max(t.maxX,e.maxX),t.maxY=Math.max(t.maxY,e.maxY),t}function o(t,e){return t.minX-e.minX}function l(t,e){return t.minY-e.minY}function a(t){return(t.maxX-t.minX)*(t.maxY-t.minY)}function h(t){return t.maxX-t.minX+(t.maxY-t.minY)}function u(t,e){return t.minX<=e.minX&&t.minY<=e.minY&&e.maxX<=t.maxX&&e.maxY<=t.maxY}function d(t,e){return e.minX<=t.maxX&&e.minY<=t.maxY&&e.maxX>=t.minX&&e.maxY>=t.minY}function c(t){return{children:t,height:1,leaf:!0,minX:1/0,minY:1/0,maxX:-1/0,maxY:-1/0}}function g(i,n,r,s,o){for(var l=[n,r];l.length;)if(!((r=l.pop())-(n=l.pop())<=s)){var a=n+Math.ceil((r-n)/s/2)*s;(function e(i,n,r,s,o){for(;s>r;){if(s-r>600){var l=s-r+1,a=n-r+1,h=Math.log(l),u=.5*Math.exp(2*h/3),d=.5*Math.sqrt(h*u*(l-u)/l)*(a-l/2<0?-1:1),c=Math.max(r,Math.floor(n-a*u/l+d)),g=Math.min(s,Math.floor(n+(l-a)*u/l+d));e(i,n,c,g,o)}var f=i[n],_=r,m=s;for(t(i,r,n),o(i[s],f)>0&&t(i,r,s);_<m;){for(t(i,_,m),_++,m--;0>o(i[_],f);)_++;for(;o(i[m],f)>0;)m--}0===o(i[r],f)?t(i,r,m):t(i,++m,s),m<=n&&(r=m+1),n<=m&&(s=m-1)}})(i,a,n||0,r||i.length-1,o||e),l.push(n,a,a,r)}}return i.prototype.all=function(){return this._all(this.data,[])},i.prototype.search=function(t){var e=this.data,i=[];if(!d(t,e))return i;for(var n=this.toBBox,r=[];e;){for(var s=0;s<e.children.length;s++){var o=e.children[s],l=e.leaf?n(o):o;d(t,l)&&(e.leaf?i.push(o):u(t,l)?this._all(o,i):r.push(o))}e=r.pop()}return i},i.prototype.collides=function(t){var e=this.data;if(!d(t,e))return!1;for(var i=[];e;){for(var n=0;n<e.children.length;n++){var r=e.children[n],s=e.leaf?this.toBBox(r):r;if(d(t,s)){if(e.leaf||u(t,s))return!0;i.push(r)}}e=i.pop()}return!1},i.prototype.load=function(t){if(!t||!t.length)return this;if(t.length<this._minEntries){for(var e=0;e<t.length;e++)this.insert(t[e]);return this}var i=this._build(t.slice(),0,t.length-1,0);if(this.data.children.length){if(this.data.height===i.height)this._splitRoot(this.data,i);else{if(this.data.height<i.height){var n=this.data;this.data=i,i=n}this._insert(i,this.data.height-i.height-1,!0)}}else this.data=i;return this},i.prototype.insert=function(t){return t&&this._insert(t,this.data.height-1),this},i.prototype.clear=function(){return this.data=c([]),this},i.prototype.remove=function(t,e){if(!t)return this;for(var i,n,r,s=this.data,o=this.toBBox(t),l=[],a=[];s||l.length;){if(s||(s=l.pop(),n=l[l.length-1],i=a.pop(),r=!0),s.leaf){var h=function(t,e,i){if(!i)return e.indexOf(t);for(var n=0;n<e.length;n++)if(i(t,e[n]))return n;return -1}(t,s.children,e);if(-1!==h)return s.children.splice(h,1),l.push(s),this._condense(l),this}r||s.leaf||!u(s,o)?n?(i++,s=n.children[i],r=!1):s=null:(l.push(s),a.push(i),i=0,n=s,s=s.children[0])}return this},i.prototype.toBBox=function(t){return t},i.prototype.compareMinX=function(t,e){return t.minX-e.minX},i.prototype.compareMinY=function(t,e){return t.minY-e.minY},i.prototype.toJSON=function(){return this.data},i.prototype.fromJSON=function(t){return this.data=t,this},i.prototype._all=function(t,e){for(var i=[];t;)t.leaf?e.push.apply(e,t.children):i.push.apply(i,t.children),t=i.pop();return e},i.prototype._build=function(t,e,i,r){var s,o=i-e+1,l=this._maxEntries;if(o<=l)return n(s=c(t.slice(e,i+1)),this.toBBox),s;r||(r=Math.ceil(Math.log(o)/Math.log(l)),l=Math.ceil(o/Math.pow(l,r-1))),(s=c([])).leaf=!1,s.height=r;var a=Math.ceil(o/l),h=a*Math.ceil(Math.sqrt(l));g(t,e,i,h,this.compareMinX);for(var u=e;u<=i;u+=h){var d=Math.min(u+h-1,i);g(t,u,d,a,this.compareMinY);for(var f=u;f<=d;f+=a){var _=Math.min(f+a-1,d);s.children.push(this._build(t,f,_,r-1))}}return n(s,this.toBBox),s},i.prototype._chooseSubtree=function(t,e,i,n){for(;n.push(e),!e.leaf&&n.length-1!==i;){for(var r=1/0,s=1/0,o=void 0,l=0;l<e.children.length;l++){var h=e.children[l],u=a(h),d=(Math.max(h.maxX,t.maxX)-Math.min(h.minX,t.minX))*(Math.max(h.maxY,t.maxY)-Math.min(h.minY,t.minY))-u;d<s?(s=d,r=u<r?u:r,o=h):d===s&&u<r&&(r=u,o=h)}e=o||e.children[0]}return e},i.prototype._insert=function(t,e,i){var n=i?t:this.toBBox(t),r=[],o=this._chooseSubtree(n,this.data,e,r);for(o.children.push(t),s(o,n);e>=0&&r[e].children.length>this._maxEntries;)this._split(r,e),e--;this._adjustParentBBoxes(n,r,e)},i.prototype._split=function(t,e){var i=t[e],r=i.children.length,s=this._minEntries;this._chooseSplitAxis(i,s,r);var o=this._chooseSplitIndex(i,s,r),l=c(i.children.splice(o,i.children.length-o));l.height=i.height,l.leaf=i.leaf,n(i,this.toBBox),n(l,this.toBBox),e?t[e-1].children.push(l):this._splitRoot(i,l)},i.prototype._splitRoot=function(t,e){this.data=c([t,e]),this.data.height=t.height+1,this.data.leaf=!1,n(this.data,this.toBBox)},i.prototype._chooseSplitIndex=function(t,e,i){for(var n,s,o,l,h=1/0,u=1/0,d=e;d<=i-e;d++){var c=r(t,0,d,this.toBBox),g=r(t,d,i,this.toBBox),f=(s=void 0,o=void 0,s=Math.max(c.minX,g.minX),o=Math.max(c.minY,g.minY),Math.max(0,Math.min(c.maxX,g.maxX)-s)*Math.max(0,Math.min(c.maxY,g.maxY)-o)),_=a(c)+a(g);f<h?(h=f,n=d,u=_<u?_:u):f===h&&_<u&&(u=_,n=d)}return n||i-e},i.prototype._chooseSplitAxis=function(t,e,i){var n=t.leaf?this.compareMinX:o,r=t.leaf?this.compareMinY:l;this._allDistMargin(t,e,i,n)<this._allDistMargin(t,e,i,r)&&t.children.sort(n)},i.prototype._allDistMargin=function(t,e,i,n){t.children.sort(n);for(var o=this.toBBox,l=r(t,0,e,o),a=r(t,i-e,i,o),u=h(l)+h(a),d=e;d<i-e;d++){var c=t.children[d];s(l,t.leaf?o(c):c),u+=h(l)}for(var g=i-e-1;g>=e;g--){var f=t.children[g];s(a,t.leaf?o(f):f),u+=h(a)}return u},i.prototype._adjustParentBBoxes=function(t,e,i){for(var n=i;n>=0;n--)s(e[n],t)},i.prototype._condense=function(t){for(var e=t.length-1,i=void 0;e>=0;e--)0===t[e].children.length?e>0?(i=t[e-1].children).splice(i.indexOf(t[e]),1):this.clear():n(t[e],this.toBBox)},i}();var ot=/**
 * @typedef {Object} Entry
 * @property {number} minX MinX.
 * @property {number} minY MinY.
 * @property {number} maxX MaxX.
 * @property {number} maxY MaxY.
 * @property {Object} [value] Value.
 *//**
 * @classdesc
 * Wrapper around the RBush by Vladimir Agafonkin.
 * See https://github.com/mourner/rbush.
 *
 * @template T
 */class{/**
   * @param {number} [maxEntries] Max entries.
   */constructor(t){/**
     * @private
     */this.rbush_=new/*@__PURE__*/(_(s9))(t),/**
     * A mapping between the objects added to this rbush wrapper
     * and the objects that are actually added to the internal rbush.
     * @private
     * @type {Object<string, Entry>}
     */this.items_={}}/**
   * Insert a value into the RBush.
   * @param {import("../extent.js").Extent} extent Extent.
   * @param {T} value Value.
   */insert(t,e){/** @type {Entry} */let i={minX:t[0],minY:t[1],maxX:t[2],maxY:t[3],value:e};this.rbush_.insert(i),this.items_[k(e)]=i}/**
   * Bulk-insert values into the RBush.
   * @param {Array<import("../extent.js").Extent>} extents Extents.
   * @param {Array<T>} values Values.
   */load(t,e){let i=Array(e.length);for(let n=0,r=e.length;n<r;n++){let r=t[n],s=e[n],o={minX:r[0],minY:r[1],maxX:r[2],maxY:r[3],value:s};i[n]=o,this.items_[k(s)]=o}this.rbush_.load(i)}/**
   * Remove a value from the RBush.
   * @param {T} value Value.
   * @return {boolean} Removed.
   */remove(t){let e=k(t),i=this.items_[e];return delete this.items_[e],null!==this.rbush_.remove(i)}/**
   * Update the extent of a value in the RBush.
   * @param {import("../extent.js").Extent} extent Extent.
   * @param {T} value Value.
   */update(t,e){let i=this.items_[k(e)],n=[i.minX,i.minY,i.maxX,i.maxY];t_(n,t)||(this.remove(e),this.insert(t,e))}/**
   * Return all values in the RBush.
   * @return {Array<T>} All.
   */getAll(){let t=this.rbush_.all();return t.map(function(t){return t.value})}/**
   * Return all values in the given extent.
   * @param {import("../extent.js").Extent} extent Extent.
   * @return {Array<T>} All in extent.
   */getInExtent(t){/** @type {Entry} */let e={minX:t[0],minY:t[1],maxX:t[2],maxY:t[3]},i=this.rbush_.search(e);return i.map(function(t){return t.value})}/**
   * Calls a callback function with each value in the tree.
   * If the callback returns a truthy value, this value is returned without
   * checking the rest of the tree.
   * @param {function(T): *} callback Callback.
   * @return {*} Callback return value.
   */forEach(t){return this.forEach_(this.getAll(),t)}/**
   * Calls a callback function with each value in the provided extent.
   * @param {import("../extent.js").Extent} extent Extent.
   * @param {function(T): *} callback Callback.
   * @return {*} Callback return value.
   */forEachInExtent(t,e){return this.forEach_(this.getInExtent(t),e)}/**
   * @param {Array<T>} values Values.
   * @param {function(T): *} callback Callback.
   * @private
   * @return {*} Callback return value.
   */forEach_(t,e){let i;for(let n=0,r=t.length;n<r&&!(i=e(t[n]));n++);return i}/**
   * @return {boolean} Is empty.
   */isEmpty(){return I(this.items_)}/**
   * Remove all values from the RBush.
   */clear(){this.rbush_.clear(),this.items_={}}/**
   * @param {import("../extent.js").Extent} [extent] Extent.
   * @return {import("../extent.js").Extent} Extent.
   */getExtent(t){let e=this.rbush_.toJSON();return tc(e.minX,e.minY,e.maxX,e.maxY,t)}/**
   * @param {RBush} rbush R-Tree.
   */concat(t){for(let e in this.rbush_.load(t.rbush_.all()),t.items_)this.items_[e]=t.items_[e]}};/**
 * Turns the attributions option into an attributions function.
 * @param {AttributionLike|undefined} attributionLike The attribution option.
 * @return {Attribution|null} An attribution function (or null).
 */function oe(t){return t?Array.isArray(t)?function(e){return t}:"function"==typeof t?t:function(e){return[t]}:null}var oi=/**
 * @module ol/source/Source
 *//**
 * @typedef {'undefined' | 'loading' | 'ready' | 'error'} State
 * State of the source, one of 'undefined', 'loading', 'ready' or 'error'.
 *//**
 * A function that takes a {@link import("../View.js").ViewStateLayerStateExtent} and returns a string or
 * an array of strings representing source attributions.
 *
 * @typedef {function(import("../View.js").ViewStateLayerStateExtent): (string|Array<string>)} Attribution
 *//**
 * A type that can be used to provide attribution information for data sources.
 *
 * It represents either
 * * a simple string (e.g. `'© Acme Inc.'`)
 * * an array of simple strings (e.g. `['© Acme Inc.', '© Bacme Inc.']`)
 * * a function that returns a string or array of strings ({@link module:ol/source/Source~Attribution})
 *
 * @typedef {string|Array<string>|Attribution} AttributionLike
 *//**
 * @typedef {Object} Options
 * @property {AttributionLike} [attributions] Attributions.
 * @property {boolean} [attributionsCollapsible=true] Attributions are collapsible.
 * @property {import("../proj.js").ProjectionLike} [projection] Projection. Default is the view projection.
 * @property {import("./Source.js").State} [state='ready'] State.
 * @property {boolean} [wrapX=false] WrapX.
 * @property {boolean} [interpolate=false] Use interpolated values when resampling.  By default,
 * the nearest neighbor is used when resampling.
 *//**
 * @classdesc
 * Abstract base class; normally only used for creating subclasses and not
 * instantiated in apps.
 * Base class for {@link module:ol/layer/Layer~Layer} sources.
 *
 * A generic `change` event is triggered when the state of the source changes.
 * @abstract
 * @api
 */class extends G{/**
   * @param {Options} options Source options.
   */constructor(t){super(),/**
     * @protected
     * @type {import("../proj/Projection.js").default|null}
     */this.projection=en(t.projection),/**
     * @private
     * @type {?Attribution}
     */this.attributions_=oe(t.attributions),/**
     * @private
     * @type {boolean}
     */this.attributionsCollapsible_=void 0===t.attributionsCollapsible||t.attributionsCollapsible,/**
     * This source is currently loading data. Sources that defer loading to the
     * map's tile queue never set this to `true`.
     * @type {boolean}
     */this.loading=!1,/**
     * @private
     * @type {import("./Source.js").State}
     */this.state_=void 0!==t.state?t.state:"ready",/**
     * @private
     * @type {boolean}
     */this.wrapX_=void 0!==t.wrapX&&t.wrapX,/**
     * @private
     * @type {boolean}
     */this.interpolate_=!!t.interpolate,/**
     * @protected
     * @type {function(import("../View.js").ViewOptions):void}
     */this.viewResolver=null,/**
     * @protected
     * @type {function(Error):void}
     */this.viewRejector=null;let e=this;/**
     * @private
     * @type {Promise<import("../View.js").ViewOptions>}
     */this.viewPromise_=new Promise(function(t,i){e.viewResolver=t,e.viewRejector=i})}/**
   * Get the attribution function for the source.
   * @return {?Attribution} Attribution function.
   * @api
   */getAttributions(){return this.attributions_}/**
   * @return {boolean} Attributions are collapsible.
   * @api
   */getAttributionsCollapsible(){return this.attributionsCollapsible_}/**
   * Get the projection of the source.
   * @return {import("../proj/Projection.js").default|null} Projection.
   * @api
   */getProjection(){return this.projection}/**
   * @param {import("../proj/Projection").default} [projection] Projection.
   * @return {Array<number>|null} Resolutions.
   */getResolutions(t){return null}/**
   * @return {Promise<import("../View.js").ViewOptions>} A promise for view-related properties.
   */getView(){return this.viewPromise_}/**
   * Get the state of the source, see {@link import("./Source.js").State} for possible states.
   * @return {import("./Source.js").State} State.
   * @api
   */getState(){return this.state_}/**
   * @return {boolean|undefined} Wrap X.
   */getWrapX(){return this.wrapX_}/**
   * @return {boolean} Use linear interpolation when resampling.
   */getInterpolate(){return this.interpolate_}/**
   * Refreshes the source. The source will be cleared, and data from the server will be reloaded.
   * @api
   */refresh(){this.changed()}/**
   * Set the attributions of the source.
   * @param {AttributionLike|undefined} attributions Attributions.
   *     Can be passed as `string`, `Array<string>`, {@link module:ol/source/Source~Attribution},
   *     or `undefined`.
   * @api
   */setAttributions(t){this.attributions_=oe(t),this.changed()}/**
   * Set the state of the source.
   * @param {import("./Source.js").State} state State.
   */setState(t){this.state_=t,this.changed()}},on/**
 * @typedef {'addfeature'|'changefeature'|'clear'|'removefeature'|'featuresloadstart'|'featuresloadend'|'featuresloaderror'} VectorSourceEventTypes
 */={/**
   * Triggered when a feature is added to the source.
   * @event module:ol/source/Vector.VectorSourceEvent#addfeature
   * @api
   */ADDFEATURE:"addfeature",/**
   * Triggered when a feature is updated.
   * @event module:ol/source/Vector.VectorSourceEvent#changefeature
   * @api
   */CHANGEFEATURE:"changefeature",/**
   * Triggered when the clear method is called on the source.
   * @event module:ol/source/Vector.VectorSourceEvent#clear
   * @api
   */CLEAR:"clear",/**
   * Triggered when a feature is removed from the source.
   * See {@link module:ol/source/Vector~VectorSource#clear source.clear()} for exceptions.
   * @event module:ol/source/Vector.VectorSourceEvent#removefeature
   * @api
   */REMOVEFEATURE:"removefeature",/**
   * Triggered when features starts loading.
   * @event module:ol/source/Vector.VectorSourceEvent#featuresloadstart
   * @api
   */FEATURESLOADSTART:"featuresloadstart",/**
   * Triggered when features finishes loading.
   * @event module:ol/source/Vector.VectorSourceEvent#featuresloadend
   * @api
   */FEATURESLOADEND:"featuresloadend",/**
   * Triggered if feature loading results in an error.
   * @event module:ol/source/Vector.VectorSourceEvent#featuresloaderror
   * @api
   */FEATURESLOADERROR:"featuresloaderror"};/**
 * @module ol/loadingstrategy
 */function or(t,e){return[[-1/0,-1/0,1/0,1/0]]}function os(t,e){/**
   * @param {import("./extent.js").Extent} extent Extent.
   * @param {number} resolution Resolution.
   * @param {import("./proj/Projection.js").default} projection Projection.
   * @param {function(Array<import("./Feature.js").default>): void} [success] Success
   *      Function called when loading succeeded.
   * @param {function(): void} [failure] Failure
   *      Function called when loading failed.
   */return function(i,n,r,s,o){let l=/** @type {import("./source/Vector").default} */this;!function(t,e,i,n,r,s,o){let l=new XMLHttpRequest;l.open("GET","function"==typeof t?t(i,n,r):t,!0),"arraybuffer"==e.getType()&&(l.responseType="arraybuffer"),l.withCredentials=!1,/**
   * @param {Event} event Event.
   * @private
   */l.onload=function(t){// status will be 0 for file:// urls
if(!l.status||l.status>=200&&l.status<300){let t;let n=e.getType();"json"==n||"text"==n?t=l.responseText:"xml"==n?(t=l.responseXML)||(t=new DOMParser().parseFromString(l.responseText,"application/xml")):"arraybuffer"==n&&(t=/** @type {ArrayBuffer} */l.response),t?s(/** @type {Array<import("./Feature.js").default>} */e.readFeatures(t,{extent:i,featureProjection:r}),e.readProjection(t)):o()}else o()},/**
   * @private
   */l.onerror=o,l.send()}(t,e,i,n,r,/**
       * @param {Array<import("./Feature.js").default>} features The loaded features.
       * @param {import("./proj/Projection.js").default} dataProjection Data
       * projection.
       */function(t,e){l.addFeatures(t),void 0!==s&&s(t)},/* FIXME handle error */o||w)}}class oo extends m{/**
   * @param {string} type Type.
   * @param {import("../Feature.js").default<Geometry>} [feature] Feature.
   * @param {Array<import("../Feature.js").default<Geometry>>} [features] Features.
   */constructor(t,e,i){super(t),/**
     * The added or removed feature for the `ADDFEATURE` and `REMOVEFEATURE` events, `undefined` otherwise.
     * @type {import("../Feature.js").default<Geometry>|undefined}
     * @api
     */this.feature=e,/**
     * The loaded features for the `FEATURESLOADED` event, `undefined` otherwise.
     * @type {Array<import("../Feature.js").default<Geometry>>|undefined}
     * @api
     */this.features=i}}var ol=/***
 * @template Return
 * @typedef {import("../Observable").OnSignature<import("../Observable").EventTypes, import("../events/Event.js").default, Return> &
 *   import("../Observable").OnSignature<import("../ObjectEventType").Types, import("../Object").ObjectEvent, Return> &
 *   import("../Observable").OnSignature<import("./VectorEventType").VectorSourceEventTypes, VectorSourceEvent, Return> &
 *   import("../Observable").CombinedOnSignature<import("../Observable").EventTypes|import("../ObjectEventType").Types|
 *     import("./VectorEventType").VectorSourceEventTypes, Return>} VectorSourceOnSignature
 *//**
 * @template {import("../geom/Geometry.js").default} [Geometry=import("../geom/Geometry.js").default]
 * @typedef {Object} Options
 * @property {import("./Source.js").AttributionLike} [attributions] Attributions.
 * @property {Array<import("../Feature.js").default<Geometry>>|Collection<import("../Feature.js").default<Geometry>>} [features]
 * Features. If provided as {@link module:ol/Collection~Collection}, the features in the source
 * and the collection will stay in sync.
 * @property {import("../format/Feature.js").default} [format] The feature format used by the XHR
 * feature loader when `url` is set. Required if `url` is set, otherwise ignored.
 * @property {import("../featureloader.js").FeatureLoader} [loader]
 * The loader function used to load features, from a remote source for example.
 * If this is not set and `url` is set, the source will create and use an XHR
 * feature loader. The `'featuresloadend'` and `'featuresloaderror'` events
 * will only fire if the `success` and `failure` callbacks are used.
 *
 * Example:
 *
 * ```js
 * import Vector from 'ol/source/Vector.js';
 * import GeoJSON from 'ol/format/GeoJSON.js';
 * import {bbox} from 'ol/loadingstrategy.js';
 *
 * const vectorSource = new Vector({
 *   format: new GeoJSON(),
 *   loader: function(extent, resolution, projection, success, failure) {
 *      const proj = projection.getCode();
 *      const url = 'https://ahocevar.com/geoserver/wfs?service=WFS&' +
 *          'version=1.1.0&request=GetFeature&typename=osm:water_areas&' +
 *          'outputFormat=application/json&srsname=' + proj + '&' +
 *          'bbox=' + extent.join(',') + ',' + proj;
 *      const xhr = new XMLHttpRequest();
 *      xhr.open('GET', url);
 *      const onError = function() {
 *        vectorSource.removeLoadedExtent(extent);
 *        failure();
 *      }
 *      xhr.onerror = onError;
 *      xhr.onload = function() {
 *        if (xhr.status == 200) {
 *          const features = vectorSource.getFormat().readFeatures(xhr.responseText);
 *          vectorSource.addFeatures(features);
 *          success(features);
 *        } else {
 *          onError();
 *        }
 *      }
 *      xhr.send();
 *    },
 *    strategy: bbox,
 *  });
 * ```
 * @property {boolean} [overlaps=true] This source may have overlapping geometries.
 * Setting this to `false` (e.g. for sources with polygons that represent administrative
 * boundaries or TopoJSON sources) allows the renderer to optimise fill and
 * stroke operations.
 * @property {LoadingStrategy} [strategy] The loading strategy to use.
 * By default an {@link module:ol/loadingstrategy.all}
 * strategy is used, a one-off strategy which loads all features at once.
 * @property {string|import("../featureloader.js").FeatureUrlFunction} [url]
 * Setting this option instructs the source to load features using an XHR loader
 * (see {@link module:ol/featureloader.xhr}). Use a `string` and an
 * {@link module:ol/loadingstrategy.all} for a one-off download of all features from
 * the given URL. Use a {@link module:ol/featureloader~FeatureUrlFunction} to generate the url with
 * other loading strategies.
 * Requires `format` to be set as well.
 * When default XHR feature loader is provided, the features will
 * be transformed from the data projection to the view projection
 * during parsing. If your remote data source does not advertise its projection
 * properly, this transformation will be incorrect. For some formats, the
 * default projection (usually EPSG:4326) can be overridden by setting the
 * dataProjection constructor option on the format.
 * Note that if a source contains non-feature data, such as a GeoJSON geometry
 * or a KML NetworkLink, these will be ignored. Use a custom loader to load these.
 * @property {boolean} [useSpatialIndex=true]
 * By default, an RTree is used as spatial index. When features are removed and
 * added frequently, and the total number of features is low, setting this to
 * `false` may improve performance.
 *
 * Note that
 * {@link module:ol/source/Vector~VectorSource#getFeaturesInExtent},
 * {@link module:ol/source/Vector~VectorSource#getClosestFeatureToCoordinate} and
 * {@link module:ol/source/Vector~VectorSource#getExtent} cannot be used when `useSpatialIndex` is
 * set to `false`, and {@link module:ol/source/Vector~VectorSource#forEachFeatureInExtent} will loop
 * through all features.
 *
 * When set to `false`, the features will be maintained in an
 * {@link module:ol/Collection~Collection}, which can be retrieved through
 * {@link module:ol/source/Vector~VectorSource#getFeaturesCollection}.
 * @property {boolean} [wrapX=true] Wrap the world horizontally. For vector editing across the
 * -180° and 180° meridians to work properly, this should be set to `false`. The
 * resulting geometry coordinates will then exceed the world bounds.
 *//**
 * @classdesc
 * Provides a source of features for vector layers. Vector features provided
 * by this source are suitable for editing. See {@link module:ol/source/VectorTile~VectorTile} for
 * vector data that is optimized for rendering.
 *
 * @fires VectorSourceEvent
 * @api
 * @template {import("../geom/Geometry.js").default} [Geometry=import("../geom/Geometry.js").default]
 */class extends oi{/**
   * @param {Options<Geometry>} [options] Vector source options.
   */constructor(t){let e,i;t=t||{},super({attributions:t.attributions,interpolate:!0,projection:void 0,state:"ready",wrapX:void 0===t.wrapX||t.wrapX}),/***
     * @type {VectorSourceOnSignature<import("../events").EventsKey>}
     */this.on,/***
     * @type {VectorSourceOnSignature<import("../events").EventsKey>}
     */this.once,/***
     * @type {VectorSourceOnSignature<void>}
     */this.un,/**
     * @private
     * @type {import("../featureloader.js").FeatureLoader}
     */this.loader_=w,/**
     * @private
     * @type {import("../format/Feature.js").default|undefined}
     */this.format_=t.format,/**
     * @private
     * @type {boolean}
     */this.overlaps_=void 0===t.overlaps||t.overlaps,/**
     * @private
     * @type {string|import("../featureloader.js").FeatureUrlFunction|undefined}
     */this.url_=t.url,void 0!==t.loader?this.loader_=t.loader:void 0!==this.url_&&(z(this.format_,"`format` must be set when `url` is set"),// create a XHR feature loader for "url" and "format"
this.loader_=os(this.url_,/** @type {import("../format/Feature.js").default} */this.format_)),/**
     * @private
     * @type {LoadingStrategy}
     */this.strategy_=void 0!==t.strategy?t.strategy:or;let n=void 0===t.useSpatialIndex||t.useSpatialIndex;/**
     * @private
     * @type {RBush<import("../Feature.js").default<Geometry>>}
     */this.featuresRtree_=n?new ot:null,/**
     * @private
     * @type {RBush<{extent: import("../extent.js").Extent}>}
     */this.loadedExtentsRtree_=new ot,/**
     * @type {number}
     * @private
     */this.loadingExtentsCount_=0,/**
     * @private
     * @type {!Object<string, import("../Feature.js").default<Geometry>>}
     */this.nullGeometryFeatures_={},/**
     * A lookup of features by id (the return from feature.getId()).
     * @private
     * @type {!Object<string, import("../Feature.js").default<Geometry>>}
     */this.idIndex_={},/**
     * A lookup of features by uid (using getUid(feature)).
     * @private
     * @type {!Object<string, import("../Feature.js").default<Geometry>>}
     */this.uidIndex_={},/**
     * @private
     * @type {Object<string, Array<import("../events.js").EventsKey>>}
     */this.featureChangeKeys_={},/**
     * @private
     * @type {Collection<import("../Feature.js").default<Geometry>>|null}
     */this.featuresCollection_=null,Array.isArray(t.features)?i=t.features:t.features&&(i=(e=t.features).getArray()),n||void 0!==e||(e=new rJ(i)),void 0!==i&&this.addFeaturesInternal(i),void 0!==e&&this.bindFeaturesCollection_(e)}/**
   * Add a single feature to the source.  If you want to add a batch of features
   * at once, call {@link module:ol/source/Vector~VectorSource#addFeatures #addFeatures()}
   * instead. A feature will not be added to the source if feature with
   * the same id is already there. The reason for this behavior is to avoid
   * feature duplication when using bbox or tile loading strategies.
   * Note: this also applies if an {@link module:ol/Collection~Collection} is used for features,
   * meaning that if a feature with a duplicate id is added in the collection, it will
   * be removed from it right away.
   * @param {import("../Feature.js").default<Geometry>} feature Feature to add.
   * @api
   */addFeature(t){this.addFeatureInternal(t),this.changed()}/**
   * Add a feature without firing a `change` event.
   * @param {import("../Feature.js").default<Geometry>} feature Feature.
   * @protected
   */addFeatureInternal(t){let e=k(t);if(!this.addToIndex_(e,t)){this.featuresCollection_&&this.featuresCollection_.remove(t);return}this.setupChangeEvents_(e,t);let i=t.getGeometry();if(i){let e=i.getExtent();this.featuresRtree_&&this.featuresRtree_.insert(e,t)}else this.nullGeometryFeatures_[e]=t;this.dispatchEvent(new oo(on.ADDFEATURE,t))}/**
   * @param {string} featureKey Unique identifier for the feature.
   * @param {import("../Feature.js").default<Geometry>} feature The feature.
   * @private
   */setupChangeEvents_(t,e){this.featureChangeKeys_[t]=[b(e,L.CHANGE,this.handleFeatureChange_,this),b(e,p.PROPERTYCHANGE,this.handleFeatureChange_,this)]}/**
   * @param {string} featureKey Unique identifier for the feature.
   * @param {import("../Feature.js").default<Geometry>} feature The feature.
   * @return {boolean} The feature is "valid", in the sense that it is also a
   *     candidate for insertion into the Rtree.
   * @private
   */addToIndex_(t,e){let i=!0,n=e.getId();return void 0!==n&&(n.toString() in this.idIndex_?i=!1:this.idIndex_[n.toString()]=e),i&&(z(!(t in this.uidIndex_),"The passed `feature` was already added to the source"),this.uidIndex_[t]=e),i}/**
   * Add a batch of features to the source.
   * @param {Array<import("../Feature.js").default<Geometry>>} features Features to add.
   * @api
   */addFeatures(t){this.addFeaturesInternal(t),this.changed()}/**
   * Add features without firing a `change` event.
   * @param {Array<import("../Feature.js").default<Geometry>>} features Features.
   * @protected
   */addFeaturesInternal(t){let e=[],i=[],n=[];for(let e=0,n=t.length;e<n;e++){let n=t[e],r=k(n);this.addToIndex_(r,n)&&i.push(n)}for(let t=0,r=i.length;t<r;t++){let r=i[t],s=k(r);this.setupChangeEvents_(s,r);let o=r.getGeometry();if(o){let t=o.getExtent();e.push(t),n.push(r)}else this.nullGeometryFeatures_[s]=r}if(this.featuresRtree_&&this.featuresRtree_.load(e,n),this.hasListener(on.ADDFEATURE))for(let t=0,e=i.length;t<e;t++)this.dispatchEvent(new oo(on.ADDFEATURE,i[t]))}/**
   * @param {!Collection<import("../Feature.js").default<Geometry>>} collection Collection.
   * @private
   */bindFeaturesCollection_(t){let e=!1;this.addEventListener(on.ADDFEATURE,/**
       * @param {VectorSourceEvent<Geometry>} evt The vector source event
       */function(i){e||(e=!0,t.push(i.feature),e=!1)}),this.addEventListener(on.REMOVEFEATURE,/**
       * @param {VectorSourceEvent<Geometry>} evt The vector source event
       */function(i){e||(e=!0,t.remove(i.feature),e=!1)}),t.addEventListener(rV.ADD,/**
       * @param {import("../Collection.js").CollectionEvent<import("../Feature.js").default<Geometry>>} evt The collection event
       */t=>{e||(e=!0,this.addFeature(t.element),e=!1)}),t.addEventListener(rV.REMOVE,/**
       * @param {import("../Collection.js").CollectionEvent<import("../Feature.js").default<Geometry>>} evt The collection event
       */t=>{e||(e=!0,this.removeFeature(t.element),e=!1)}),this.featuresCollection_=t}/**
   * Remove all features from the source.
   * @param {boolean} [fast] Skip dispatching of {@link module:ol/source/Vector.VectorSourceEvent#event:removefeature} events.
   * @api
   */clear(t){if(t){for(let t in this.featureChangeKeys_){let e=this.featureChangeKeys_[t];e.forEach(A)}this.featuresCollection_||(this.featureChangeKeys_={},this.idIndex_={},this.uidIndex_={})}else if(this.featuresRtree_)for(let t in this.featuresRtree_.forEach(t=>{this.removeFeatureInternal(t)}),this.nullGeometryFeatures_)this.removeFeatureInternal(this.nullGeometryFeatures_[t]);this.featuresCollection_&&this.featuresCollection_.clear(),this.featuresRtree_&&this.featuresRtree_.clear(),this.nullGeometryFeatures_={};let e=new oo(on.CLEAR);this.dispatchEvent(e),this.changed()}/**
   * Iterate through all features on the source, calling the provided callback
   * with each one.  If the callback returns any "truthy" value, iteration will
   * stop and the function will return the same value.
   * Note: this function only iterate through the feature that have a defined geometry.
   *
   * @param {function(import("../Feature.js").default<Geometry>): T} callback Called with each feature
   *     on the source.  Return a truthy value to stop iteration.
   * @return {T|undefined} The return value from the last call to the callback.
   * @template T
   * @api
   */forEachFeature(t){if(this.featuresRtree_)return this.featuresRtree_.forEach(t);this.featuresCollection_&&this.featuresCollection_.forEach(t)}/**
   * Iterate through all features whose geometries contain the provided
   * coordinate, calling the callback with each feature.  If the callback returns
   * a "truthy" value, iteration will stop and the function will return the same
   * value.
   *
   * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
   * @param {function(import("../Feature.js").default<Geometry>): T} callback Called with each feature
   *     whose goemetry contains the provided coordinate.
   * @return {T|undefined} The return value from the last call to the callback.
   * @template T
   */forEachFeatureAtCoordinateDirect(t,e){let i=[t[0],t[1],t[0],t[1]];return this.forEachFeatureInExtent(i,function(i){let n=i.getGeometry();if(n.intersectsCoordinate(t))return e(i)})}/**
   * Iterate through all features whose bounding box intersects the provided
   * extent (note that the feature's geometry may not intersect the extent),
   * calling the callback with each feature.  If the callback returns a "truthy"
   * value, iteration will stop and the function will return the same value.
   *
   * If you are interested in features whose geometry intersects an extent, call
   * the {@link module:ol/source/Vector~VectorSource#forEachFeatureIntersectingExtent #forEachFeatureIntersectingExtent()} method instead.
   *
   * When `useSpatialIndex` is set to false, this method will loop through all
   * features, equivalent to {@link module:ol/source/Vector~VectorSource#forEachFeature #forEachFeature()}.
   *
   * @param {import("../extent.js").Extent} extent Extent.
   * @param {function(import("../Feature.js").default<Geometry>): T} callback Called with each feature
   *     whose bounding box intersects the provided extent.
   * @return {T|undefined} The return value from the last call to the callback.
   * @template T
   * @api
   */forEachFeatureInExtent(t,e){if(this.featuresRtree_)return this.featuresRtree_.forEachInExtent(t,e);this.featuresCollection_&&this.featuresCollection_.forEach(e)}/**
   * Iterate through all features whose geometry intersects the provided extent,
   * calling the callback with each feature.  If the callback returns a "truthy"
   * value, iteration will stop and the function will return the same value.
   *
   * If you only want to test for bounding box intersection, call the
   * {@link module:ol/source/Vector~VectorSource#forEachFeatureInExtent #forEachFeatureInExtent()} method instead.
   *
   * @param {import("../extent.js").Extent} extent Extent.
   * @param {function(import("../Feature.js").default<Geometry>): T} callback Called with each feature
   *     whose geometry intersects the provided extent.
   * @return {T|undefined} The return value from the last call to the callback.
   * @template T
   * @api
   */forEachFeatureIntersectingExtent(t,e){return this.forEachFeatureInExtent(t,/**
       * @param {import("../Feature.js").default<Geometry>} feature Feature.
       * @return {T|undefined} The return value from the last call to the callback.
       */function(i){let n=i.getGeometry();if(n.intersectsExtent(t)){let t=e(i);if(t)return t}})}/**
   * Get the features collection associated with this source. Will be `null`
   * unless the source was configured with `useSpatialIndex` set to `false`, or
   * with an {@link module:ol/Collection~Collection} as `features`.
   * @return {Collection<import("../Feature.js").default<Geometry>>|null} The collection of features.
   * @api
   */getFeaturesCollection(){return this.featuresCollection_}/**
   * Get a snapshot of the features currently on the source in random order. The returned array
   * is a copy, the features are references to the features in the source.
   * @return {Array<import("../Feature.js").default<Geometry>>} Features.
   * @api
   */getFeatures(){let t;return this.featuresCollection_?t=this.featuresCollection_.getArray().slice(0):this.featuresRtree_&&(t=this.featuresRtree_.getAll(),I(this.nullGeometryFeatures_)||E(t,Object.values(this.nullGeometryFeatures_))),/** @type {Array<import("../Feature.js").default<Geometry>>} */t}/**
   * Get all features whose geometry intersects the provided coordinate.
   * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
   * @return {Array<import("../Feature.js").default<Geometry>>} Features.
   * @api
   */getFeaturesAtCoordinate(t){let e=[];return this.forEachFeatureAtCoordinateDirect(t,function(t){e.push(t)}),e}/**
   * Get all features whose bounding box intersects the provided extent.  Note that this returns an array of
   * all features intersecting the given extent in random order (so it may include
   * features whose geometries do not intersect the extent).
   *
   * When `useSpatialIndex` is set to false, this method will return all
   * features.
   *
   * @param {import("../extent.js").Extent} extent Extent.
   * @param {import("../proj/Projection.js").default} [projection] Include features
   * where `extent` exceeds the x-axis bounds of `projection` and wraps around the world.
   * @return {Array<import("../Feature.js").default<Geometry>>} Features.
   * @api
   */getFeaturesInExtent(t,e){if(this.featuresRtree_){let i=e&&e.canWrapX()&&this.getWrapX();if(!i)return this.featuresRtree_.getInExtent(t);let n=function(t,e){if(e.canWrapX()){let i=e.getExtent();if(!isFinite(t[0])||!isFinite(t[2]))return[[i[0],t[1],i[2],t[3]]];tF(t,e);let n=tb(i);if(tb(t)>n)return[[i[0],t[1],i[2],t[3]]];if(t[0]<i[0])return[[t[0]+n,t[1],i[2],t[3]],[i[0],t[1],t[2],t[3]]];if(t[2]>i[2])return[[t[0],t[1],i[2],t[3]],[i[0],t[1],t[2]-n,t[3]]]}return[t]}(t,e);return[].concat(...n.map(t=>this.featuresRtree_.getInExtent(t)))}return this.featuresCollection_?this.featuresCollection_.getArray().slice(0):[]}/**
   * Get the closest feature to the provided coordinate.
   *
   * This method is not available when the source is configured with
   * `useSpatialIndex` set to `false`.
   * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
   * @param {function(import("../Feature.js").default<Geometry>):boolean} [filter] Feature filter function.
   *     The filter function will receive one argument, the {@link module:ol/Feature~Feature feature}
   *     and it should return a boolean value. By default, no filtering is made.
   * @return {import("../Feature.js").default<Geometry>} Closest feature.
   * @api
   */getClosestFeatureToCoordinate(t,e){// Find the closest feature using branch and bound.  We start searching an
// infinite extent, and find the distance from the first feature found.  This
// becomes the closest feature.  We then compute a smaller extent which any
// closer feature must intersect.  We continue searching with this smaller
// extent, trying to find a closer feature.  Every time we find a closer
// feature, we update the extent being searched so that any even closer
// feature must intersect it.  We continue until we run out of features.
let i=t[0],n=t[1],r=null,s=[NaN,NaN],o=1/0,l=[-1/0,-1/0,1/0,1/0];return e=e||S,this.featuresRtree_.forEachInExtent(l,/**
       * @param {import("../Feature.js").default<Geometry>} feature Feature.
       */function(t){if(e(t)){let e=t.getGeometry(),a=o;if((o=e.closestPointXY(i,n,s,o))<a){r=t;// This is sneaky.  Reduce the extent that it is currently being
// searched while the R-Tree traversal using this same extent object
// is still in progress.  This is safe because the new extent is
// strictly contained by the old extent.
let e=Math.sqrt(o);l[0]=i-e,l[1]=n-e,l[2]=i+e,l[3]=n+e}}}),r}/**
   * Get the extent of the features currently in the source.
   *
   * This method is not available when the source is configured with
   * `useSpatialIndex` set to `false`.
   * @param {import("../extent.js").Extent} [extent] Destination extent. If provided, no new extent
   *     will be created. Instead, that extent's coordinates will be overwritten.
   * @return {import("../extent.js").Extent} Extent.
   * @api
   */getExtent(t){return this.featuresRtree_.getExtent(t)}/**
   * Get a feature by its identifier (the value returned by feature.getId()).
   * Note that the index treats string and numeric identifiers as the same.  So
   * `source.getFeatureById(2)` will return a feature with id `'2'` or `2`.
   *
   * @param {string|number} id Feature identifier.
   * @return {import("../Feature.js").default<Geometry>|null} The feature (or `null` if not found).
   * @api
   */getFeatureById(t){let e=this.idIndex_[t.toString()];return void 0!==e?e:null}/**
   * Get a feature by its internal unique identifier (using `getUid`).
   *
   * @param {string} uid Feature identifier.
   * @return {import("../Feature.js").default<Geometry>|null} The feature (or `null` if not found).
   */getFeatureByUid(t){let e=this.uidIndex_[t];return void 0!==e?e:null}/**
   * Get the format associated with this source.
   *
   * @return {import("../format/Feature.js").default|undefined} The feature format.
   * @api
   */getFormat(){return this.format_}/**
   * @return {boolean} The source can have overlapping geometries.
   */getOverlaps(){return this.overlaps_}/**
   * Get the url associated with this source.
   *
   * @return {string|import("../featureloader.js").FeatureUrlFunction|undefined} The url.
   * @api
   */getUrl(){return this.url_}/**
   * @param {Event} event Event.
   * @private
   */handleFeatureChange_(t){let e=/** @type {import("../Feature.js").default<Geometry>} */t.target,i=k(e),n=e.getGeometry();if(n){let t=n.getExtent();i in this.nullGeometryFeatures_?(delete this.nullGeometryFeatures_[i],this.featuresRtree_&&this.featuresRtree_.insert(t,e)):this.featuresRtree_&&this.featuresRtree_.update(t,e)}else i in this.nullGeometryFeatures_||(this.featuresRtree_&&this.featuresRtree_.remove(e),this.nullGeometryFeatures_[i]=e);let r=e.getId();if(void 0!==r){let t=r.toString();this.idIndex_[t]!==e&&(this.removeFromIdIndex_(e),this.idIndex_[t]=e)}else this.removeFromIdIndex_(e),this.uidIndex_[i]=e;this.changed(),this.dispatchEvent(new oo(on.CHANGEFEATURE,e))}/**
   * Returns true if the feature is contained within the source.
   * @param {import("../Feature.js").default<Geometry>} feature Feature.
   * @return {boolean} Has feature.
   * @api
   */hasFeature(t){let e=t.getId();return void 0!==e?e in this.idIndex_:k(t) in this.uidIndex_}/**
   * @return {boolean} Is empty.
   */isEmpty(){return this.featuresRtree_?this.featuresRtree_.isEmpty()&&I(this.nullGeometryFeatures_):!this.featuresCollection_||0===this.featuresCollection_.getLength()}/**
   * @param {import("../extent.js").Extent} extent Extent.
   * @param {number} resolution Resolution.
   * @param {import("../proj/Projection.js").default} projection Projection.
   */loadFeatures(t,e,i){let n=this.loadedExtentsRtree_,r=this.strategy_(t,e,i);for(let t=0,s=r.length;t<s;++t){let s=r[t],o=n.forEachInExtent(s,/**
         * @param {{extent: import("../extent.js").Extent}} object Object.
         * @return {boolean} Contains.
         */function(t){return ta(t.extent,s)});o||(++this.loadingExtentsCount_,this.dispatchEvent(new oo(on.FEATURESLOADSTART)),this.loader_.call(this,s,e,i,t=>{--this.loadingExtentsCount_,this.dispatchEvent(new oo(on.FEATURESLOADEND,void 0,t))},()=>{--this.loadingExtentsCount_,this.dispatchEvent(new oo(on.FEATURESLOADERROR))}),n.insert(s,{extent:s.slice()}))}this.loading=!(this.loader_.length<4)&&this.loadingExtentsCount_>0}refresh(){this.clear(!0),this.loadedExtentsRtree_.clear(),super.refresh()}/**
   * Remove an extent from the list of loaded extents.
   * @param {import("../extent.js").Extent} extent Extent.
   * @api
   */removeLoadedExtent(t){let e;let i=this.loadedExtentsRtree_;i.forEachInExtent(t,function(i){if(t_(i.extent,t))return e=i,!0}),e&&i.remove(e)}/**
   * Remove a single feature from the source.  If you want to remove all features
   * at once, use the {@link module:ol/source/Vector~VectorSource#clear #clear()} method
   * instead.
   * @param {import("../Feature.js").default<Geometry>} feature Feature to remove.
   * @api
   */removeFeature(t){if(!t)return;let e=k(t);e in this.nullGeometryFeatures_?delete this.nullGeometryFeatures_[e]:this.featuresRtree_&&this.featuresRtree_.remove(t);let i=this.removeFeatureInternal(t);i&&this.changed()}/**
   * Remove feature without firing a `change` event.
   * @param {import("../Feature.js").default<Geometry>} feature Feature.
   * @return {import("../Feature.js").default<Geometry>|undefined} The removed feature
   *     (or undefined if the feature was not found).
   * @protected
   */removeFeatureInternal(t){let e=k(t),i=this.featureChangeKeys_[e];if(!i)return;i.forEach(A),delete this.featureChangeKeys_[e];let n=t.getId();return void 0!==n&&delete this.idIndex_[n.toString()],delete this.uidIndex_[e],this.dispatchEvent(new oo(on.REMOVEFEATURE,t)),t}/**
   * Remove a feature from the id index.  Called internally when the feature id
   * may have changed.
   * @param {import("../Feature.js").default<Geometry>} feature The feature.
   * @return {boolean} Removed the feature from the index.
   * @private
   */removeFromIdIndex_(t){let e=!1;for(let i in this.idIndex_)if(this.idIndex_[i]===t){delete this.idIndex_[i],e=!0;break}return e}/**
   * Set the new loader of the source. The next render cycle will use the
   * new loader.
   * @param {import("../featureloader.js").FeatureLoader} loader The loader to set.
   * @api
   */setLoader(t){this.loader_=t}/**
   * Points the source to a new url. The next render cycle will use the new url.
   * @param {string|import("../featureloader.js").FeatureUrlFunction} url Url.
   * @api
   */setUrl(t){z(this.format_,"`format` must be set when `url` is set"),this.url_=t,this.setLoader(os(t,this.format_))}},oa=/**
 * @module ol/source/XYZ
 *//**
 * @module ol/source/TileImage
 *//**
 * @module ol/ImageTile
 *//**
 * @module ol/Tile
 *//**
 * A function that takes an {@link module:ol/Tile~Tile} for the tile and a
 * `{string}` for the url as arguments. The default is
 * ```js
 * source.setTileLoadFunction(function(tile, src) {
 *   tile.getImage().src = src;
 * });
 * ```
 * For more fine grained control, the load function can use fetch or XMLHttpRequest and involve
 * error handling:
 *
 * ```js
 * import TileState from 'ol/TileState.js';
 *
 * source.setTileLoadFunction(function(tile, src) {
 *   const xhr = new XMLHttpRequest();
 *   xhr.responseType = 'blob';
 *   xhr.addEventListener('loadend', function (evt) {
 *     const data = this.response;
 *     if (data !== undefined) {
 *       tile.getImage().src = URL.createObjectURL(data);
 *     } else {
 *       tile.setState(TileState.ERROR);
 *     }
 *   });
 *   xhr.addEventListener('error', function () {
 *     tile.setState(TileState.ERROR);
 *   });
 *   xhr.open('GET', src);
 *   xhr.send();
 * });
 * ```
 *
 * @typedef {function(Tile, string): void} LoadFunction
 * @api
 *//**
 * {@link module:ol/source/Tile~TileSource} sources use a function of this type to get
 * the url that provides a tile for a given tile coordinate.
 *
 * This function takes an {@link module:ol/tilecoord~TileCoord} for the tile
 * coordinate, a `{number}` representing the pixel ratio and a
 * {@link module:ol/proj/Projection~Projection} for the projection  as arguments
 * and returns a `{string}` representing the tile URL, or undefined if no tile
 * should be requested for the passed tile coordinate.
 *
 * @typedef {function(import("./tilecoord.js").TileCoord, number,
 *           import("./proj/Projection.js").default): (string|undefined)} UrlFunction
 * @api
 *//**
 * @typedef {Object} Options
 * @property {number} [transition=250] A duration for tile opacity
 * transitions in milliseconds. A duration of 0 disables the opacity transition.
 * @property {boolean} [interpolate=false] Use interpolated values when resampling.  By default,
 * the nearest neighbor is used when resampling.
 * @api
 *//**
 * @classdesc
 * Base class for tiles.
 *
 * @abstract
 */class extends M{/**
   * @param {import("./tilecoord.js").TileCoord} tileCoord Tile coordinate.
   * @param {import("./TileState.js").default} state State.
   * @param {Options} [options] Tile options.
   */constructor(t,e,i){super(),i=i||{},/**
     * @type {import("./tilecoord.js").TileCoord}
     */this.tileCoord=t,/**
     * @protected
     * @type {import("./TileState.js").default}
     */this.state=e,/**
     * An "interim" tile for this tile. The interim tile may be used while this
     * one is loading, for "smooth" transitions when changing params/dimensions
     * on the source.
     * @type {Tile}
     */this.interimTile=null,/**
     * A key assigned to the tile. This is used by the tile source to determine
     * if this tile can effectively be used, or if a new tile should be created
     * and this one be used as an interim tile for this new tile.
     * @type {string}
     */this.key="",/**
     * The duration for the opacity transition.
     * @type {number}
     */this.transition_=void 0===i.transition?250:i.transition,/**
     * Lookup of start times for rendering transitions.  If the start time is
     * equal to -1, the transition is complete.
     * @type {Object<string, number>}
     */this.transitionStarts_={},/**
     * @type {boolean}
     */this.interpolate=!!i.interpolate}/**
   * @protected
   */changed(){this.dispatchEvent(L.CHANGE)}/**
   * Called by the tile cache when the tile is removed from the cache due to expiry
   */release(){this.state===sw.ERROR&&this.setState(sw.EMPTY)}/**
   * @return {string} Key.
   */getKey(){return this.key+"/"+this.tileCoord}/**
   * Get the interim tile most suitable for rendering using the chain of interim
   * tiles. This corresponds to the  most recent tile that has been loaded, if no
   * such tile exists, the original tile is returned.
   * @return {!Tile} Best tile for rendering.
   */getInterimTile(){if(!this.interimTile)return this;let t=this.interimTile;// find the first loaded tile and return it. Since the chain is sorted in
// decreasing order of creation time, there is no need to search the remainder
// of the list (all those tiles correspond to older requests and will be
// cleaned up by refreshInterimChain)
do{if(t.getState()==sw.LOADED)return(// Show tile immediately instead of fading it in after loading, because
// the interim tile is in place already
this.transition_=0,t);t=t.interimTile}while(t)// we can not find a better tile
return this}/**
   * Goes through the chain of interim tiles and discards sections of the chain
   * that are no longer relevant.
   */refreshInterimChain(){if(!this.interimTile)return;let t=this.interimTile,e=this;do{if(t.getState()==sw.LOADED){//we have a loaded tile, we can discard the rest of the list
//we would could abort any LOADING tile request
//older than this tile (i.e. any LOADING tile following this entry in the chain)
t.interimTile=null;break}t.getState()==sw.LOADING?//older than this tile, so we're still interested in the request
e=t:t.getState()==sw.IDLE?//to start any other requests for this chain
e.interimTile=t.interimTile:e=t,t=e.interimTile}while(t)}/**
   * Get the tile coordinate for this tile.
   * @return {import("./tilecoord.js").TileCoord} The tile coordinate.
   * @api
   */getTileCoord(){return this.tileCoord}/**
   * @return {import("./TileState.js").default} State.
   */getState(){return this.state}/**
   * Sets the state of this tile. If you write your own {@link module:ol/Tile~LoadFunction tileLoadFunction} ,
   * it is important to set the state correctly to {@link module:ol/TileState~ERROR}
   * when the tile cannot be loaded. Otherwise the tile cannot be removed from
   * the tile queue and will block other requests.
   * @param {import("./TileState.js").default} state State.
   * @api
   */setState(t){if(this.state!==sw.ERROR&&this.state>t)throw Error("Tile load sequence violation");this.state=t,this.changed()}/**
   * Load the image or retry if loading previously failed.
   * Loading is taken care of by the tile queue, and calling this method is
   * only needed for preloading or for reloading in case of an error.
   * @abstract
   * @api
   */load(){O()}/**
   * Get the alpha value for rendering.
   * @param {string} id An id for the renderer.
   * @param {number} time The render frame time.
   * @return {number} A number between 0 and 1.
   */getAlpha(t,e){if(!this.transition_)return 1;let i=this.transitionStarts_[t];if(i){if(-1===i)return 1}else i=e,this.transitionStarts_[t]=i;let n=e-i+1e3/60;// avoid rendering at 0
return n>=this.transition_?1:st(n/this.transition_)}/**
   * Determine if a tile is in an alpha transition.  A tile is considered in
   * transition if tile.getAlpha() has not yet been called or has been called
   * and returned 1.
   * @param {string} id An id for the renderer.
   * @return {boolean} The tile is in transition.
   */inTransition(t){return!!this.transition_&&-1!==this.transitionStarts_[t]}/**
   * Mark a transition as complete.
   * @param {string} id An id for the renderer.
   */endTransition(t){this.transition_&&(this.transitionStarts_[t]=-1)}},oh=class extends oa{/**
   * @param {import("./tilecoord.js").TileCoord} tileCoord Tile coordinate.
   * @param {import("./TileState.js").default} state State.
   * @param {string} src Image source URI.
   * @param {?string} crossOrigin Cross origin.
   * @param {import("./Tile.js").LoadFunction} tileLoadFunction Tile load function.
   * @param {import("./Tile.js").Options} [options] Tile options.
   */constructor(t,e,i,n,r,s){super(t,e,s),/**
     * @private
     * @type {?string}
     */this.crossOrigin_=n,/**
     * Image URI
     *
     * @private
     * @type {string}
     */this.src_=i,this.key=i,/**
     * @private
     * @type {HTMLImageElement|HTMLCanvasElement}
     */this.image_=new Image,null!==n&&(this.image_.crossOrigin=n),/**
     * @private
     * @type {?function():void}
     */this.unlisten_=null,/**
     * @private
     * @type {import("./Tile.js").LoadFunction}
     */this.tileLoadFunction_=r}/**
   * Get the HTML image element for this tile (may be a Canvas, Image, or Video).
   * @return {HTMLCanvasElement|HTMLImageElement|HTMLVideoElement} Image.
   * @api
   */getImage(){return this.image_}/**
   * Sets an HTML image element for this tile (may be a Canvas or preloaded Image).
   * @param {HTMLCanvasElement|HTMLImageElement} element Element.
   */setImage(t){this.image_=t,this.state=sw.LOADED,this.unlistenImage_(),this.changed()}/**
   * Tracks loading or read errors.
   *
   * @private
   */handleImageError_(){this.state=sw.ERROR,this.unlistenImage_(),this.image_=/**
 * Get a 1-pixel blank image.
 * @return {HTMLCanvasElement} Blank image.
 */function(){let t=eb(1,1);return t.fillStyle="rgba(0,0,0,0)",t.fillRect(0,0,1,1),t.canvas}(),this.changed()}/**
   * Tracks successful image load.
   *
   * @private
   */handleImageLoad_(){let t=/** @type {HTMLImageElement} */this.image_;t.naturalWidth&&t.naturalHeight?this.state=sw.LOADED:this.state=sw.EMPTY,this.unlistenImage_(),this.changed()}/**
   * Load the image or retry if loading previously failed.
   * Loading is taken care of by the tile queue, and calling this method is
   * only needed for preloading or for reloading in case of an error.
   *
   * To retry loading tiles on failed requests, use a custom `tileLoadFunction`
   * that checks for error status codes and reloads only when the status code is
   * 408, 429, 500, 502, 503 and 504, and only when not too many retries have been
   * made already:
   *
   * ```js
   * const retryCodes = [408, 429, 500, 502, 503, 504];
   * const retries = {};
   * source.setTileLoadFunction((tile, src) => {
   *   const image = tile.getImage();
   *   fetch(src)
   *     .then((response) => {
   *       if (retryCodes.includes(response.status)) {
   *         retries[src] = (retries[src] || 0) + 1;
   *         if (retries[src] <= 3) {
   *           setTimeout(() => tile.load(), retries[src] * 1000);
   *         }
   *         return Promise.reject();
   *       }
   *       return response.blob();
   *     })
   *     .then((blob) => {
   *       const imageUrl = URL.createObjectURL(blob);
   *       image.src = imageUrl;
   *       setTimeout(() => URL.revokeObjectURL(imageUrl), 5000);
   *     })
   *     .catch(() => tile.setState(3)); // error
   * });
   * ```
   *
   * @api
   */load(){this.state==sw.ERROR&&(this.state=sw.IDLE,this.image_=new Image,null!==this.crossOrigin_&&(this.image_.crossOrigin=this.crossOrigin_)),this.state==sw.IDLE&&(this.state=sw.LOADING,this.changed(),this.tileLoadFunction_(this,this.src_),this.unlisten_=function(t,e,i){let n=!0,r=!1,s=!1,o=[b(/** @type {HTMLImageElement} */t,L.LOAD,function(){s=!0,r||e()},void 0,!0)];return t.src&&H?(r=!0,t.decode().then(function(){n&&e()}).catch(function(t){n&&(s?e():i())})):o.push(b(t,L.ERROR,i,void 0,!0)),function(){n=!1,o.forEach(A)}}(this.image_,this.handleImageLoad_.bind(this),this.handleImageError_.bind(this)))}/**
   * Discards event handlers which listen for load completion or errors.
   *
   * @private
   */unlistenImage_(){this.unlisten_&&(this.unlisten_(),this.unlisten_=null)}},ou=/**
 * @classdesc
 * Class containing triangulation of the given target extent.
 * Used for determining source data and the reprojection itself.
 */class{/**
   * @param {import("../proj/Projection.js").default} sourceProj Source projection.
   * @param {import("../proj/Projection.js").default} targetProj Target projection.
   * @param {import("../extent.js").Extent} targetExtent Target extent to triangulate.
   * @param {import("../extent.js").Extent} maxSourceExtent Maximal source extent that can be used.
   * @param {number} errorThreshold Acceptable error (in source units).
   * @param {?number} destinationResolution The (optional) resolution of the destination.
   */constructor(t,e,i,n,r,s){/**
     * @type {import("../proj/Projection.js").default}
     * @private
     */this.sourceProj_=t,/**
     * @type {import("../proj/Projection.js").default}
     * @private
     */this.targetProj_=e;/** @type {!Object<string, import("../coordinate.js").Coordinate>} */let o={},l=eh(this.targetProj_,this.sourceProj_);/**
     * @param {import("../coordinate.js").Coordinate} c A coordinate.
     * @return {import("../coordinate.js").Coordinate} Transformed coordinate.
     * @private
     */this.transformInv_=function(t){let e=t[0]+"/"+t[1];return o[e]||(o[e]=l(t)),o[e]},/**
     * @type {import("../extent.js").Extent}
     * @private
     */this.maxSourceExtent_=n,/**
     * @type {number}
     * @private
     */this.errorThresholdSquared_=r*r,/**
     * @type {Array<Triangle>}
     * @private
     */this.triangles_=[],/**
     * Indicates that the triangulation crosses edge of the source projection.
     * @type {boolean}
     * @private
     */this.wrapsXInSource_=!1,/**
     * @type {boolean}
     * @private
     */this.canWrapXInSource_=this.sourceProj_.canWrapX()&&!!n&&!!this.sourceProj_.getExtent()&&tb(n)>=tb(this.sourceProj_.getExtent()),/**
     * @type {?number}
     * @private
     */this.sourceWorldWidth_=this.sourceProj_.getExtent()?tb(this.sourceProj_.getExtent()):null,/**
     * @type {?number}
     * @private
     */this.targetWorldWidth_=this.targetProj_.getExtent()?tb(this.targetProj_.getExtent()):null;let a=tM(i),h=tL(i),u=tC(i),d=tE(i),c=this.transformInv_(a),g=this.transformInv_(h),f=this.transformInv_(u),_=this.transformInv_(d),m=10+(s?Math.max(0,Math.ceil(Math.log2(tv(i)/(s*s*65536)))):0);if(this.addQuad_(a,h,u,d,c,g,f,_,m),this.wrapsXInSource_){let t=1/0;this.triangles_.forEach(function(e,i,n){t=Math.min(t,e.source[0][0],e.source[1][0],e.source[2][0])}),// Shift triangles to be as close to `leftBound` as possible
// (if the distance is more than `worldWidth / 2` it can be closer.
this.triangles_.forEach(e=>{if(Math.max(e.source[0][0],e.source[1][0],e.source[2][0])-t>this.sourceWorldWidth_/2){let i=[[e.source[0][0],e.source[0][1]],[e.source[1][0],e.source[1][1]],[e.source[2][0],e.source[2][1]]];i[0][0]-t>this.sourceWorldWidth_/2&&(i[0][0]-=this.sourceWorldWidth_),i[1][0]-t>this.sourceWorldWidth_/2&&(i[1][0]-=this.sourceWorldWidth_),i[2][0]-t>this.sourceWorldWidth_/2&&(i[2][0]-=this.sourceWorldWidth_);// Rarely (if the extent contains both the dateline and prime meridian)
// the shift can in turn break some triangles.
// Detect this here and don't shift in such cases.
let n=Math.min(i[0][0],i[1][0],i[2][0]),r=Math.max(i[0][0],i[1][0],i[2][0]);r-n<this.sourceWorldWidth_/2&&(e.source=i)}})}o={}}/**
   * Adds triangle to the triangulation.
   * @param {import("../coordinate.js").Coordinate} a The target a coordinate.
   * @param {import("../coordinate.js").Coordinate} b The target b coordinate.
   * @param {import("../coordinate.js").Coordinate} c The target c coordinate.
   * @param {import("../coordinate.js").Coordinate} aSrc The source a coordinate.
   * @param {import("../coordinate.js").Coordinate} bSrc The source b coordinate.
   * @param {import("../coordinate.js").Coordinate} cSrc The source c coordinate.
   * @private
   */addTriangle_(t,e,i,n,r,s){this.triangles_.push({source:[n,r,s],target:[t,e,i]})}/**
   * Adds quad (points in clock-wise order) to the triangulation
   * (and reprojects the vertices) if valid.
   * Performs quad subdivision if needed to increase precision.
   *
   * @param {import("../coordinate.js").Coordinate} a The target a coordinate.
   * @param {import("../coordinate.js").Coordinate} b The target b coordinate.
   * @param {import("../coordinate.js").Coordinate} c The target c coordinate.
   * @param {import("../coordinate.js").Coordinate} d The target d coordinate.
   * @param {import("../coordinate.js").Coordinate} aSrc The source a coordinate.
   * @param {import("../coordinate.js").Coordinate} bSrc The source b coordinate.
   * @param {import("../coordinate.js").Coordinate} cSrc The source c coordinate.
   * @param {import("../coordinate.js").Coordinate} dSrc The source d coordinate.
   * @param {number} maxSubdivision Maximal allowed subdivision of the quad.
   * @private
   */addQuad_(t,e,i,n,r,s,o,l,a){let h=tn([r,s,o,l]),u=this.sourceWorldWidth_?tb(h)/this.sourceWorldWidth_:null,d=/** @type {number} */this.sourceWorldWidth_,c=this.sourceProj_.canWrapX()&&u>.5&&u<1,g=!1;if(a>0){if(this.targetProj_.isGlobal()&&this.targetWorldWidth_){let r=tn([t,e,i,n]),s=tb(r)/this.targetWorldWidth_;g=s>.25||g}!c&&this.sourceProj_.isGlobal()&&u&&(g=u>.25||g)}if(!g&&this.maxSourceExtent_&&isFinite(h[0])&&isFinite(h[1])&&isFinite(h[2])&&isFinite(h[3])&&!tA(h,this.maxSourceExtent_))return;let f=0;if(!g&&(!isFinite(r[0])||!isFinite(r[1])||!isFinite(s[0])||!isFinite(s[1])||!isFinite(o[0])||!isFinite(o[1])||!isFinite(l[0])||!isFinite(l[1]))){if(a>0)g=!0;else if(1!=// It might be the case that only 1 of the points is infinite. In this case
// we can draw a single triangle with the other three points
(f=(isFinite(r[0])&&isFinite(r[1])?0:8)+(isFinite(s[0])&&isFinite(s[1])?0:4)+(isFinite(o[0])&&isFinite(o[1])?0:2)+(isFinite(l[0])&&isFinite(l[1])?0:1))&&2!=f&&4!=f&&8!=f)return}if(a>0){if(!g){let e;let n=[(t[0]+i[0])/2,(t[1]+i[1])/2],s=this.transformInv_(n);if(c){let t=(tQ(r[0],d)+tQ(o[0],d))/2;e=t-tQ(s[0],d)}else e=(r[0]+o[0])/2-s[0];let l=(r[1]+o[1])/2-s[1],a=e*e+l*l;g=a>this.errorThresholdSquared_}if(g){if(Math.abs(t[0]-i[0])<=Math.abs(t[1]-i[1])){// split horizontally (top & bottom)
let h=[(e[0]+i[0])/2,(e[1]+i[1])/2],u=this.transformInv_(h),d=[(n[0]+t[0])/2,(n[1]+t[1])/2],c=this.transformInv_(d);this.addQuad_(t,e,h,d,r,s,u,c,a-1),this.addQuad_(d,h,i,n,c,u,o,l,a-1)}else{// split vertically (left & right)
let h=[(t[0]+e[0])/2,(t[1]+e[1])/2],u=this.transformInv_(h),d=[(i[0]+n[0])/2,(i[1]+n[1])/2],c=this.transformInv_(d);this.addQuad_(t,h,d,n,r,u,c,l,a-1),this.addQuad_(h,e,i,d,u,s,o,c,a-1)}return}}if(c){if(!this.canWrapXInSource_)return;this.wrapsXInSource_=!0}(11&f)==0&&this.addTriangle_(t,i,n,r,o,l),(14&f)==0&&this.addTriangle_(t,i,e,r,o,s),f&&((13&f)==0&&this.addTriangle_(e,n,t,s,l,r),(7&f)==0&&this.addTriangle_(e,n,i,s,l,o))}/**
   * Calculates extent of the `source` coordinates from all the triangles.
   *
   * @return {import("../extent.js").Extent} Calculated extent.
   */calculateSourceExtent(){let t=td();return this.triangles_.forEach(function(e,i,n){let r=e.source;tp(t,r[0]),tp(t,r[1]),tp(t,r[2])}),t}/**
   * @return {Array<Triangle>} Array of the calculated triangles.
   */getTriangles(){return this.triangles_}};let od=[];/**
 * This draws a small triangle into a canvas by setting the triangle as the clip region
 * and then drawing a (too large) rectangle
 *
 * @param {CanvasRenderingContext2D} ctx The context in which to draw the triangle
 * @param {number} u1 The x-coordinate of the second point. The first point is 0,0.
 * @param {number} v1 The y-coordinate of the second point.
 * @param {number} u2 The x-coordinate of the third point.
 * @param {number} v2 The y-coordinate of the third point.
 */function oc(t,e,i,n,r){t.beginPath(),t.moveTo(0,0),t.lineTo(e,i),t.lineTo(n,r),t.closePath(),t.save(),t.clip(),t.fillRect(0,0,Math.max(e,n)+1,Math.max(i,r)),t.restore()}/**
 * Given the data from getImageData, see if the right values appear at the provided offset.
 * Returns true if either the color or transparency is off
 *
 * @param {Uint8ClampedArray} data The data returned from getImageData
 * @param {number} offset The pixel offset from the start of data.
 * @return {boolean} true if the diagonal rendering is broken
 */function og(t,e){// the values ought to be close to the rgba(210, 0, 0, 0.75)
return Math.abs(t[4*e]-210)>2||Math.abs(t[4*e+3]-191.25)>2}function of(t,e,i,n){let r=eu(i,e,t),s=er(e,n,i),o=e.getMetersPerUnit();void 0!==o&&(s*=o);let l=t.getMetersPerUnit();void 0!==l&&(s/=l);// Based on the projection properties, the point resolution at the specified
// coordinates may be slightly different. We need to reverse-compensate this
// in order to achieve optimal results.
let a=t.getExtent();if(!a||tl(a,r)){let e=er(t,s,r)/s;isFinite(e)&&e>0&&(s/=e)}return s}var o_=/**
 * @typedef {function(number, number, number, number) : (import("../ImageTile.js").default)} FunctionType
 *//**
 * @classdesc
 * Class encapsulating single reprojected tile.
 * See {@link module:ol/source/TileImage~TileImage}.
 *
 */class extends oa{/**
   * @param {import("../proj/Projection.js").default} sourceProj Source projection.
   * @param {import("../tilegrid/TileGrid.js").default} sourceTileGrid Source tile grid.
   * @param {import("../proj/Projection.js").default} targetProj Target projection.
   * @param {import("../tilegrid/TileGrid.js").default} targetTileGrid Target tile grid.
   * @param {import("../tilecoord.js").TileCoord} tileCoord Coordinate of the tile.
   * @param {import("../tilecoord.js").TileCoord} wrappedTileCoord Coordinate of the tile wrapped in X.
   * @param {number} pixelRatio Pixel ratio.
   * @param {number} gutter Gutter of the source tiles.
   * @param {FunctionType} getTileFunction
   *     Function returning source tiles (z, x, y, pixelRatio).
   * @param {number} [errorThreshold] Acceptable reprojection error (in px).
   * @param {boolean} [renderEdges] Render reprojection edges.
   * @param {boolean} [interpolate] Use linear interpolation when resampling.
   */constructor(t,e,i,n,r,s,o,l,a,h,u,d){super(r,sw.IDLE,{interpolate:!!d}),/**
     * @private
     * @type {boolean}
     */this.renderEdges_=void 0!==u&&u,/**
     * @private
     * @type {number}
     */this.pixelRatio_=o,/**
     * @private
     * @type {number}
     */this.gutter_=l,/**
     * @private
     * @type {HTMLCanvasElement}
     */this.canvas_=null,/**
     * @private
     * @type {import("../tilegrid/TileGrid.js").default}
     */this.sourceTileGrid_=e,/**
     * @private
     * @type {import("../tilegrid/TileGrid.js").default}
     */this.targetTileGrid_=n,/**
     * @private
     * @type {import("../tilecoord.js").TileCoord}
     */this.wrappedTileCoord_=s||r,/**
     * @private
     * @type {!Array<import("../ImageTile.js").default>}
     */this.sourceTiles_=[],/**
     * @private
     * @type {?Array<import("../events.js").EventsKey>}
     */this.sourcesListenerKeys_=null,/**
     * @private
     * @type {number}
     */this.sourceZ_=0;let c=n.getTileCoordExtent(this.wrappedTileCoord_),g=this.targetTileGrid_.getExtent(),f=this.sourceTileGrid_.getExtent(),_=g?tI(c,g):c;if(0===tv(_)){// Tile is completely outside range -> EMPTY
// TODO: is it actually correct that the source even creates the tile ?
this.state=sw.EMPTY;return}let m=t.getExtent();m&&(f=f?tI(f,m):m);let p=n.getResolution(this.wrappedTileCoord_[0]),y=function(t,e,i,n){let r=tS(i),s=of(t,e,r,n);return(!isFinite(s)||s<=0)&&tx(i,function(i){return isFinite(s=of(t,e,i,n))&&s>0}),s}(t,i,_,p);if(!isFinite(y)||y<=0){// invalid sourceResolution -> EMPTY
// probably edges of the projections when no extent is defined
this.state=sw.EMPTY;return}let x=void 0!==h?h:.5;if(/**
     * @private
     * @type {!import("./Triangulation.js").default}
     */this.triangulation_=new ou(t,i,_,f,y*x,p),0===this.triangulation_.getTriangles().length){// no valid triangles -> EMPTY
this.state=sw.EMPTY;return}this.sourceZ_=e.getZForResolution(y);let v=this.triangulation_.calculateSourceExtent();if(f&&(t.canWrapX()?(v[1]=tH(v[1],f[1],f[3]),v[3]=tH(v[3],f[1],f[3])):v=tI(v,f)),tv(v)){let t=e.getTileRangeForExtentAndZ(v,this.sourceZ_);for(let e=t.minX;e<=t.maxX;e++)for(let i=t.minY;i<=t.maxY;i++){let t=a(this.sourceZ_,e,i,o);t&&this.sourceTiles_.push(t)}0===this.sourceTiles_.length&&(this.state=sw.EMPTY)}else this.state=sw.EMPTY}/**
   * Get the HTML Canvas element for this tile.
   * @return {HTMLCanvasElement} Canvas.
   */getImage(){return this.canvas_}/**
   * @private
   */reproject_(){let t=[];if(this.sourceTiles_.forEach(e=>{e&&e.getState()==sw.LOADED&&t.push({extent:this.sourceTileGrid_.getTileCoordExtent(e.tileCoord),image:e.getImage()})}),this.sourceTiles_.length=0,0===t.length)this.state=sw.ERROR;else{let e=this.wrappedTileCoord_[0],i=this.targetTileGrid_.getTileSize(e),n="number"==typeof i?i:i[0],r="number"==typeof i?i:i[1],s=this.targetTileGrid_.getResolution(e),o=this.sourceTileGrid_.getResolution(this.sourceZ_),l=this.targetTileGrid_.getTileCoordExtent(this.wrappedTileCoord_);this.canvas_=function(t,e,i,n,r,s,o,l,a,h,u,c){let g=eb(Math.round(i*t),Math.round(i*e),od);if(c||(g.imageSmoothingEnabled=!1),0===a.length)return g.canvas;function f(t){return Math.round(t*i)/i}g.scale(i,i),g.globalCompositeOperation="lighter";let _=td();a.forEach(function(t,e,i){tm(_,t.extent)});let m=tb(_),p=tT(_),y=eb(Math.round(i*m/n),Math.round(i*p/n),od);c||(y.imageSmoothingEnabled=!1);let x=i/n;a.forEach(function(t,e,i){let n=t.extent[0]-_[0],r=-(t.extent[3]-_[3]),s=tb(t.extent),o=tT(t.extent);t.image.width>0&&t.image.height>0&&y.drawImage(t.image,h,h,t.image.width-2*h,t.image.height-2*h,n*x,r*x,s*x,o*x)});let v=tM(o);return l.getTriangles().forEach(function(t,e,r){/* Calculate affine transform (src -> dst)
     * Resulting matrix can be used to transform coordinate
     * from `sourceProjection` to destination pixels.
     *
     * To optimize number of context calls and increase numerical stability,
     * we also do the following operations:
     * trans(-topLeftExtentCorner), scale(1 / targetResolution), scale(1, -1)
     * here before solving the linear system so [ui, vi] are pixel coordinates.
     *
     * Src points: xi, yi
     * Dst points: ui, vi
     * Affine coefficients: aij
     *
     * | x0 y0 1  0  0 0 |   |a00|   |u0|
     * | x1 y1 1  0  0 0 |   |a01|   |u1|
     * | x2 y2 1  0  0 0 | x |a02| = |u2|
     * |  0  0 0 x0 y0 1 |   |a10|   |v0|
     * |  0  0 0 x1 y1 1 |   |a11|   |v1|
     * |  0  0 0 x2 y2 1 |   |a12|   |v2|
     */let o=t.source,l=t.target,a=o[0][0],h=o[0][1],u=o[1][0],m=o[1][1],p=o[2][0],x=o[2][1],E=f((l[0][0]-v[0])/s),C=f(-(l[0][1]-v[1])/s),S=f((l[1][0]-v[0])/s),R=f(-(l[1][1]-v[1])/s),w=f((l[2][0]-v[0])/s),T=f(-(l[2][1]-v[1])/s),I=a,M=h;a=0,h=0,u-=I,m-=M,p-=I,x-=M;let L=[[u,m,0,0,S-E],[p,x,0,0,w-E],[0,0,u,m,R-C],[0,0,p,x,T-C]],b=function(t){let e=t.length;for(let i=0;i<e;i++){// Find max in the i-th column (ignoring i - 1 first rows)
let n=i,r=Math.abs(t[i][i]);for(let s=i+1;s<e;s++){let e=Math.abs(t[s][i]);e>r&&(r=e,n=s)}if(0===r)return null;// matrix is singular
// Swap max row with i-th (current) row
let s=t[n];t[n]=t[i],t[i]=s;// Subtract the i-th row to make all the remaining rows 0 in the i-th column
for(let n=i+1;n<e;n++){let r=-t[n][i]/t[i][i];for(let s=i;s<e+1;s++)i==s?t[n][s]=0:t[n][s]+=r*t[i][s]}}// Solve Ax=b for upper triangular matrix A (mat)
let i=Array(e);for(let n=e-1;n>=0;n--){i[n]=t[n][e]/t[n][n];for(let r=n-1;r>=0;r--)t[r][e]-=t[r][n]*i[n]}return i}(L);if(b){if(g.save(),g.beginPath(),/**
 * Determines if the current browser configuration can render triangular clip regions correctly.
 * This value is cached so the function is only expensive the first time called.
 * Firefox on Windows (as of now) does not if HWA is enabled. See https://bugzilla.mozilla.org/show_bug.cgi?id=1606976
 * Chrome works, and everything seems to work on OSX and Android. This function caches the
 * result. I suppose that it is conceivably possible that a browser might flip modes while the app is
 * running, but lets hope not.
 *
 * @return {boolean} true if the Diagonal Rendering is broken.
 */function(){if(void 0===d){let t=eb(6,6,od);t.globalCompositeOperation="lighter",t.fillStyle="rgba(210, 0, 0, 0.75)",oc(t,4,5,4,0),oc(t,4,5,0,5);let e=t.getImageData(0,0,3,3).data;d=og(e,0)||og(e,4)||og(e,8),eA(t),od.push(t.canvas)}return d}()||!c){// Make sure that all lines are horizontal or vertical
g.moveTo(S,R);let t=E-S,e=C-R;for(let i=0;i<4;i++)// Go horizontally
g.lineTo(S+f((i+1)*t/4),R+f(i*e/3)),3!=i&&g.lineTo(S+f((i+1)*t/4),R+f((i+1)*e/3));// We are almost at u0r, v0r
g.lineTo(w,T)}else g.moveTo(S,R),g.lineTo(E,C),g.lineTo(w,T);g.clip(),g.transform(b[0],b[2],b[1],b[3],E,C),g.translate(_[0]-I,_[3]-M),g.scale(n/i,-n/i),g.drawImage(y.canvas,0,0),g.restore()}}),eA(y),od.push(y.canvas),u&&(g.save(),g.globalCompositeOperation="source-over",g.strokeStyle="black",g.lineWidth=1,l.getTriangles().forEach(function(t,e,i){let n=t.target,r=(n[0][0]-v[0])/s,o=-(n[0][1]-v[1])/s,l=(n[1][0]-v[0])/s,a=-(n[1][1]-v[1])/s,h=(n[2][0]-v[0])/s,u=-(n[2][1]-v[1])/s;g.beginPath(),g.moveTo(l,a),g.lineTo(r,o),g.lineTo(h,u),g.closePath(),g.stroke()}),g.restore()),g.canvas}(n,r,this.pixelRatio_,o,this.sourceTileGrid_.getExtent(),s,l,this.triangulation_,t,this.gutter_,this.renderEdges_,this.interpolate),this.state=sw.LOADED}this.changed()}/**
   * Load not yet loaded URI.
   */load(){if(this.state==sw.IDLE){this.state=sw.LOADING,this.changed();let t=0;this.sourcesListenerKeys_=[],this.sourceTiles_.forEach(e=>{let i=e.getState();if(i==sw.IDLE||i==sw.LOADING){t++;let i=b(e,L.CHANGE,function(n){let r=e.getState();(r==sw.LOADED||r==sw.ERROR||r==sw.EMPTY)&&(A(i),0==--t&&(this.unlistenSources_(),this.reproject_()))},this);this.sourcesListenerKeys_.push(i)}}),0===t?setTimeout(this.reproject_.bind(this),0):this.sourceTiles_.forEach(function(t,e,i){let n=t.getState();n==sw.IDLE&&t.load()})}}/**
   * @private
   */unlistenSources_(){this.sourcesListenerKeys_.forEach(A),this.sourcesListenerKeys_=null}/**
   * Remove from the cache due to expiry
   */release(){this.canvas_&&(eA(this.canvas_.getContext("2d")),od.push(this.canvas_),this.canvas_=null),super.release()}},om=/**
 * @module ol/TileCache
 *//**
 * @module ol/structs/LRUCache
 *//**
 * @typedef {Object} Entry
 * @property {string} key_ Key.
 * @property {Object} newer Newer.
 * @property {Object} older Older.
 * @property {*} value_ Value.
 *//**
 * @classdesc
 * Implements a Least-Recently-Used cache where the keys do not conflict with
 * Object's properties (e.g. 'hasOwnProperty' is not allowed as a key). Expiring
 * items from the cache is the responsibility of the user.
 *
 * @fires import("../events/Event.js").default
 * @template T
 */class{/**
   * @param {number} [highWaterMark] High water mark.
   */constructor(t){/**
     * Desired max cache size after expireCache(). If set to 0, no cache entries
     * will be pruned at all.
     * @type {number}
     */this.highWaterMark=void 0!==t?t:2048,/**
     * @private
     * @type {number}
     */this.count_=0,/**
     * @private
     * @type {!Object<string, Entry>}
     */this.entries_={},/**
     * @private
     * @type {?Entry}
     */this.oldest_=null,/**
     * @private
     * @type {?Entry}
     */this.newest_=null}/**
   * @return {boolean} Can expire cache.
   */canExpireCache(){return this.highWaterMark>0&&this.getCount()>this.highWaterMark}/**
   * Expire the cache.
   * @param {!Object<string, boolean>} [keep] Keys to keep. To be implemented by subclasses.
   */expireCache(t){for(;this.canExpireCache();)this.pop()}/**
   * FIXME empty description for jsdoc
   */clear(){this.count_=0,this.entries_={},this.oldest_=null,this.newest_=null}/**
   * @param {string} key Key.
   * @return {boolean} Contains key.
   */containsKey(t){return this.entries_.hasOwnProperty(t)}/**
   * @param {function(T, string, LRUCache<T>): ?} f The function
   *     to call for every entry from the oldest to the newer. This function takes
   *     3 arguments (the entry value, the entry key and the LRUCache object).
   *     The return value is ignored.
   */forEach(t){let e=this.oldest_;for(;e;)t(e.value_,e.key_,this),e=e.newer}/**
   * @param {string} key Key.
   * @param {*} [options] Options (reserved for subclasses).
   * @return {T} Value.
   */get(t,e){let i=this.entries_[t];return z(void 0!==i,"Tried to get a value for a key that does not exist in the cache"),i===this.newest_||(i===this.oldest_?(this.oldest_=/** @type {Entry} */this.oldest_.newer,this.oldest_.older=null):(i.newer.older=i.older,i.older.newer=i.newer),i.newer=null,i.older=this.newest_,this.newest_.newer=i,this.newest_=i),i.value_}/**
   * Remove an entry from the cache.
   * @param {string} key The entry key.
   * @return {T} The removed entry.
   */remove(t){let e=this.entries_[t];return z(void 0!==e,"Tried to get a value for a key that does not exist in the cache"),e===this.newest_?(this.newest_=/** @type {Entry} */e.older,this.newest_&&(this.newest_.newer=null)):e===this.oldest_?(this.oldest_=/** @type {Entry} */e.newer,this.oldest_&&(this.oldest_.older=null)):(e.newer.older=e.older,e.older.newer=e.newer),delete this.entries_[t],--this.count_,e.value_}/**
   * @return {number} Count.
   */getCount(){return this.count_}/**
   * @return {Array<string>} Keys.
   */getKeys(){let t;let e=Array(this.count_),i=0;for(t=this.newest_;t;t=t.older)e[i++]=t.key_;return e}/**
   * @return {Array<T>} Values.
   */getValues(){let t;let e=Array(this.count_),i=0;for(t=this.newest_;t;t=t.older)e[i++]=t.value_;return e}/**
   * @return {T} Last value.
   */peekLast(){return this.oldest_.value_}/**
   * @return {string} Last key.
   */peekLastKey(){return this.oldest_.key_}/**
   * Get the key of the newest item in the cache.  Throws if the cache is empty.
   * @return {string} The newest key.
   */peekFirstKey(){return this.newest_.key_}/**
   * Return an entry without updating least recently used time.
   * @param {string} key Key.
   * @return {T} Value.
   */peek(t){if(this.containsKey(t))return this.entries_[t].value_}/**
   * @return {T} value Value.
   */pop(){let t=this.oldest_;return delete this.entries_[t.key_],t.newer&&(t.newer.older=null),this.oldest_=/** @type {Entry} */t.newer,this.oldest_||(this.newest_=null),--this.count_,t.value_}/**
   * @param {string} key Key.
   * @param {T} value Value.
   */replace(t,e){this.get(t),this.entries_[t].value_=e}/**
   * @param {string} key Key.
   * @param {T} value Value.
   */set(t,e){z(!(t in this.entries_),"Tried to set a value for a key that is used already");let i={key_:t,newer:null,older:this.newest_,value_:e};this.newest_?this.newest_.newer=i:this.oldest_=i,this.newest_=i,this.entries_[t]=i,++this.count_}/**
   * Set a maximum number of entries for the cache.
   * @param {number} size Cache size.
   * @api
   */setSize(t){this.highWaterMark=t}};/**
 * @module ol/tilecoord
 *//**
 * An array of three numbers representing the location of a tile in a tile
 * grid. The order is `z` (zoom level), `x` (column), and `y` (row).
 * @typedef {Array<number>} TileCoord
 * @api
 *//**
 * @param {number} z Z.
 * @param {number} x X.
 * @param {number} y Y.
 * @param {TileCoord} [tileCoord] Tile coordinate.
 * @return {TileCoord} Tile coordinate.
 */function op(t,e,i,n){return void 0!==n?(n[0]=t,n[1]=e,n[2]=i,n):[t,e,i]}function oy(t,e,i){return t+"/"+e+"/"+i}function ox(t){return oy(t[0],t[1],t[2])}var ov=class extends om{clear(){for(;this.getCount()>0;)this.pop().release();super.clear()}/**
   * @param {!Object<string, boolean>} usedTiles Used tiles.
   */expireCache(t){for(;this.canExpireCache();){let e=this.peekLast();if(e.getKey() in t)break;this.pop().release()}}/**
   * Prune all tiles from the cache that don't have the same z as the newest tile.
   */pruneExceptNewestZ(){if(0===this.getCount())return;let t=this.peekFirstKey(),e=t.split("/").map(Number),i=e[0];this.forEach(t=>{t.tileCoord[0]!==i&&(this.remove(ox(t.tileCoord)),t.release())})}},oE/**
 * @typedef {'tileloadstart'|'tileloadend'|'tileloaderror'} TileSourceEventTypes
 */={/**
   * Triggered when a tile starts loading.
   * @event module:ol/source/Tile.TileSourceEvent#tileloadstart
   * @api
   */TILELOADSTART:"tileloadstart",/**
   * Triggered when a tile finishes loading, either when its data is loaded,
   * or when loading was aborted because the tile is no longer needed.
   * @event module:ol/source/Tile.TileSourceEvent#tileloadend
   * @api
   */TILELOADEND:"tileloadend",/**
   * Triggered if tile loading results in an error. Note that this is not the
   * right place to re-fetch tiles. See {@link module:ol/ImageTile~ImageTile#load}
   * for details.
   * @event module:ol/source/Tile.TileSourceEvent#tileloaderror
   * @api
   */TILELOADERROR:"tileloaderror"};/**
 * @module ol/source/Tile
 *//**
 * @module ol/tilegrid
 *//**
 * @module ol/tilegrid/TileGrid
 *//**
 * @module ol/TileRange
 *//**
 * A representation of a contiguous block of tiles.  A tile range is specified
 * by its min/max tile coordinates and is inclusive of coordinates.
 */class oC{/**
   * @param {number} minX Minimum X.
   * @param {number} maxX Maximum X.
   * @param {number} minY Minimum Y.
   * @param {number} maxY Maximum Y.
   */constructor(t,e,i,n){/**
     * @type {number}
     */this.minX=t,/**
     * @type {number}
     */this.maxX=e,/**
     * @type {number}
     */this.minY=i,/**
     * @type {number}
     */this.maxY=n}/**
   * @param {import("./tilecoord.js").TileCoord} tileCoord Tile coordinate.
   * @return {boolean} Contains tile coordinate.
   */contains(t){return this.containsXY(t[1],t[2])}/**
   * @param {TileRange} tileRange Tile range.
   * @return {boolean} Contains.
   */containsTileRange(t){return this.minX<=t.minX&&t.maxX<=this.maxX&&this.minY<=t.minY&&t.maxY<=this.maxY}/**
   * @param {number} x Tile coordinate x.
   * @param {number} y Tile coordinate y.
   * @return {boolean} Contains coordinate.
   */containsXY(t,e){return this.minX<=t&&t<=this.maxX&&this.minY<=e&&e<=this.maxY}/**
   * @param {TileRange} tileRange Tile range.
   * @return {boolean} Equals.
   */equals(t){return this.minX==t.minX&&this.minY==t.minY&&this.maxX==t.maxX&&this.maxY==t.maxY}/**
   * @param {TileRange} tileRange Tile range.
   */extend(t){t.minX<this.minX&&(this.minX=t.minX),t.maxX>this.maxX&&(this.maxX=t.maxX),t.minY<this.minY&&(this.minY=t.minY),t.maxY>this.maxY&&(this.maxY=t.maxY)}/**
   * @return {number} Height.
   */getHeight(){return this.maxY-this.minY+1}/**
   * @return {import("./size.js").Size} Size.
   */getSize(){return[this.getWidth(),this.getHeight()]}/**
   * @return {number} Width.
   */getWidth(){return this.maxX-this.minX+1}/**
   * @param {TileRange} tileRange Tile range.
   * @return {boolean} Intersects.
   */intersects(t){return this.minX<=t.maxX&&this.maxX>=t.minX&&this.minY<=t.maxY&&this.maxY>=t.minY}}function oS(t,e,i,n,r){return void 0!==r?(r.minX=t,r.maxX=e,r.minY=i,r.maxY=n,r):new oC(t,e,i,n)}/**
 * @private
 * @type {import("../tilecoord.js").TileCoord}
 */let oR=[0,0,0];var ow=/**
 * @typedef {Object} Options
 * @property {import("../extent.js").Extent} [extent] Extent for the tile grid. No tiles outside this
 * extent will be requested by {@link module:ol/source/Tile~TileSource} sources. When no `origin` or
 * `origins` are configured, the `origin` will be set to the top-left corner of the extent.
 * @property {number} [minZoom=0] Minimum zoom.
 * @property {import("../coordinate.js").Coordinate} [origin] The tile grid origin, i.e. where the `x`
 * and `y` axes meet (`[z, 0, 0]`). Tile coordinates increase left to right and downwards. If not
 * specified, `extent` or `origins` must be provided.
 * @property {Array<import("../coordinate.js").Coordinate>} [origins] Tile grid origins, i.e. where
 * the `x` and `y` axes meet (`[z, 0, 0]`), for each zoom level. If given, the array length
 * should match the length of the `resolutions` array, i.e. each resolution can have a different
 * origin. Tile coordinates increase left to right and downwards. If not specified, `extent` or
 * `origin` must be provided.
 * @property {!Array<number>} resolutions Resolutions. The array index of each resolution needs
 * to match the zoom level. This means that even if a `minZoom` is configured, the resolutions
 * array will have a length of `maxZoom + 1`.
 * @property {Array<import("../size.js").Size>} [sizes] Number of tile rows and columns
 * of the grid for each zoom level. If specified the values
 * define each zoom level's extent together with the `origin` or `origins`.
 * A grid `extent` can be configured in addition, and will further limit the extent
 * for which tile requests are made by sources. If the bottom-left corner of
 * an extent is used as `origin` or `origins`, then the `y` value must be
 * negative because OpenLayers tile coordinates use the top left as the origin.
 * @property {number|import("../size.js").Size} [tileSize] Tile size.
 * Default is `[256, 256]`.
 * @property {Array<number|import("../size.js").Size>} [tileSizes] Tile sizes. If given, the array length
 * should match the length of the `resolutions` array, i.e. each resolution can have a different
 * tile size.
 *//**
 * @classdesc
 * Base class for setting the grid pattern for sources accessing tiled-image
 * servers.
 * @api
 */class{/**
   * @param {Options} options Tile grid options.
   */constructor(t){let e;if(/**
     * @protected
     * @type {number}
     */this.minZoom=void 0!==t.minZoom?t.minZoom:0,/**
     * @private
     * @type {!Array<number>}
     */this.resolutions_=t.resolutions,z(function(t,e,i){let n=e||x;return t.every(function(e,r){if(0===r)return!0;let s=n(t[r-1],e);return!(s>0||i&&0===s)})}(this.resolutions_,function(t,e){return e-t},!0),"`resolutions` must be sorted in descending order"),!t.origins)for(let t=0,i=this.resolutions_.length-1;t<i;++t)if(e){if(this.resolutions_[t]/this.resolutions_[t+1]!==e){e=void 0;break}}else e=this.resolutions_[t]/this.resolutions_[t+1];/**
     * @private
     * @type {number|undefined}
     */this.zoomFactor_=e,/**
     * @protected
     * @type {number}
     */this.maxZoom=this.resolutions_.length-1,/**
     * @private
     * @type {import("../coordinate.js").Coordinate|null}
     */this.origin_=void 0!==t.origin?t.origin:null,/**
     * @private
     * @type {Array<import("../coordinate.js").Coordinate>}
     */this.origins_=null,void 0!==t.origins&&(this.origins_=t.origins,z(this.origins_.length==this.resolutions_.length,"Number of `origins` and `resolutions` must be equal"));let i=t.extent;void 0===i||this.origin_||this.origins_||(this.origin_=tM(i)),z(!this.origin_&&this.origins_||this.origin_&&!this.origins_,"Either `origin` or `origins` must be configured, never both"),/**
     * @private
     * @type {Array<number|import("../size.js").Size>}
     */this.tileSizes_=null,void 0!==t.tileSizes&&(this.tileSizes_=t.tileSizes,z(this.tileSizes_.length==this.resolutions_.length,"Number of `tileSizes` and `resolutions` must be equal")),/**
     * @private
     * @type {number|import("../size.js").Size}
     */this.tileSize_=void 0!==t.tileSize?t.tileSize:this.tileSizes_?null:256,z(!this.tileSize_&&this.tileSizes_||this.tileSize_&&!this.tileSizes_,"Either `tileSize` or `tileSizes` must be configured, never both"),/**
     * @private
     * @type {import("../extent.js").Extent}
     */this.extent_=void 0!==i?i:null,/**
     * @private
     * @type {Array<import("../TileRange.js").default>}
     */this.fullTileRanges_=null,/**
     * @private
     * @type {import("../size.js").Size}
     */this.tmpSize_=[0,0],/**
     * @private
     * @type {import("../extent.js").Extent}
     */this.tmpExtent_=[0,0,0,0],void 0!==t.sizes?this.fullTileRanges_=t.sizes.map(function(t,e){let n=new oC(Math.min(0,t[0]),Math.max(t[0]-1,-1),Math.min(0,t[1]),Math.max(t[1]-1,-1));if(i){let t=this.getTileRangeForExtentAndZ(i,e);n.minX=Math.max(t.minX,n.minX),n.maxX=Math.min(t.maxX,n.maxX),n.minY=Math.max(t.minY,n.minY),n.maxY=Math.min(t.maxY,n.maxY)}return n},this):i&&this.calculateTileRanges_(i)}/**
   * Call a function with each tile coordinate for a given extent and zoom level.
   *
   * @param {import("../extent.js").Extent} extent Extent.
   * @param {number} zoom Integer zoom level.
   * @param {function(import("../tilecoord.js").TileCoord): void} callback Function called with each tile coordinate.
   * @api
   */forEachTileCoord(t,e,i){let n=this.getTileRangeForExtentAndZ(t,e);for(let t=n.minX,r=n.maxX;t<=r;++t)for(let r=n.minY,s=n.maxY;r<=s;++r)i([e,t,r])}/**
   * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
   * @param {function(number, import("../TileRange.js").default): boolean} callback Callback.
   * @param {import("../TileRange.js").default} [tempTileRange] Temporary import("../TileRange.js").default object.
   * @param {import("../extent.js").Extent} [tempExtent] Temporary import("../extent.js").Extent object.
   * @return {boolean} Callback succeeded.
   */forEachTileCoordParentTileRange(t,e,i,n){let r,s,o;let l=null,a=t[0]-1;for(2===this.zoomFactor_?(s=t[1],o=t[2]):l=this.getTileCoordExtent(t,n);a>=this.minZoom;){if(r=2===this.zoomFactor_?oS(s=Math.floor(s/2),s,o=Math.floor(o/2),o,i):this.getTileRangeForExtentAndZ(l,a,i),e(a,r))return!0;--a}return!1}/**
   * Get the extent for this tile grid, if it was configured.
   * @return {import("../extent.js").Extent} Extent.
   * @api
   */getExtent(){return this.extent_}/**
   * Get the maximum zoom level for the grid.
   * @return {number} Max zoom.
   * @api
   */getMaxZoom(){return this.maxZoom}/**
   * Get the minimum zoom level for the grid.
   * @return {number} Min zoom.
   * @api
   */getMinZoom(){return this.minZoom}/**
   * Get the origin for the grid at the given zoom level.
   * @param {number} z Integer zoom level.
   * @return {import("../coordinate.js").Coordinate} Origin.
   * @api
   */getOrigin(t){return this.origin_?this.origin_:this.origins_[t]}/**
   * Get the resolution for the given zoom level.
   * @param {number} z Integer zoom level.
   * @return {number} Resolution.
   * @api
   */getResolution(t){return this.resolutions_[t]}/**
   * Get the list of resolutions for the tile grid.
   * @return {Array<number>} Resolutions.
   * @api
   */getResolutions(){return this.resolutions_}/**
   * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
   * @param {import("../TileRange.js").default} [tempTileRange] Temporary import("../TileRange.js").default object.
   * @param {import("../extent.js").Extent} [tempExtent] Temporary import("../extent.js").Extent object.
   * @return {import("../TileRange.js").default|null} Tile range.
   */getTileCoordChildTileRange(t,e,i){if(t[0]<this.maxZoom){if(2===this.zoomFactor_){let i=2*t[1],n=2*t[2];return oS(i,i+1,n,n+1,e)}let n=this.getTileCoordExtent(t,i||this.tmpExtent_);return this.getTileRangeForExtentAndZ(n,t[0]+1,e)}return null}/**
   * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
   * @param {number} z Integer zoom level.
   * @param {import("../TileRange.js").default} [tempTileRange] Temporary import("../TileRange.js").default object.
   * @return {import("../TileRange.js").default|null} Tile range.
   */getTileRangeForTileCoordAndZ(t,e,i){if(e>this.maxZoom||e<this.minZoom)return null;let n=t[0],r=t[1],s=t[2];if(e===n)return oS(r,s,r,s,i);if(this.zoomFactor_){let t=Math.pow(this.zoomFactor_,e-n),o=Math.floor(r*t),l=Math.floor(s*t);if(e<n)return oS(o,o,l,l,i);let a=Math.floor(t*(r+1))-1,h=Math.floor(t*(s+1))-1;return oS(o,a,l,h,i)}let o=this.getTileCoordExtent(t,this.tmpExtent_);return this.getTileRangeForExtentAndZ(o,e,i)}/**
   * Get a tile range for the given extent and integer zoom level.
   * @param {import("../extent.js").Extent} extent Extent.
   * @param {number} z Integer zoom level.
   * @param {import("../TileRange.js").default} [tempTileRange] Temporary tile range object.
   * @return {import("../TileRange.js").default} Tile range.
   */getTileRangeForExtentAndZ(t,e,i){this.getTileCoordForXYAndZ_(t[0],t[3],e,!1,oR);let n=oR[1],r=oR[2];this.getTileCoordForXYAndZ_(t[2],t[1],e,!0,oR);let s=oR[1],o=oR[2];return oS(n,s,r,o,i)}/**
   * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
   * @return {import("../coordinate.js").Coordinate} Tile center.
   */getTileCoordCenter(t){let e=this.getOrigin(t[0]),i=this.getResolution(t[0]),n=ev(this.getTileSize(t[0]),this.tmpSize_);return[e[0]+(t[1]+.5)*n[0]*i,e[1]-(t[2]+.5)*n[1]*i]}/**
   * Get the extent of a tile coordinate.
   *
   * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
   * @param {import("../extent.js").Extent} [tempExtent] Temporary extent object.
   * @return {import("../extent.js").Extent} Extent.
   * @api
   */getTileCoordExtent(t,e){let i=this.getOrigin(t[0]),n=this.getResolution(t[0]),r=ev(this.getTileSize(t[0]),this.tmpSize_),s=i[0]+t[1]*r[0]*n,o=i[1]-(t[2]+1)*r[1]*n,l=s+r[0]*n,a=o+r[1]*n;return tc(s,o,l,a,e)}/**
   * Get the tile coordinate for the given map coordinate and resolution.  This
   * method considers that coordinates that intersect tile boundaries should be
   * assigned the higher tile coordinate.
   *
   * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
   * @param {number} resolution Resolution.
   * @param {import("../tilecoord.js").TileCoord} [opt_tileCoord] Destination import("../tilecoord.js").TileCoord object.
   * @return {import("../tilecoord.js").TileCoord} Tile coordinate.
   * @api
   */getTileCoordForCoordAndResolution(t,e,i){return this.getTileCoordForXYAndResolution_(t[0],t[1],e,!1,i)}/**
   * Note that this method should not be called for resolutions that correspond
   * to an integer zoom level.  Instead call the `getTileCoordForXYAndZ_` method.
   * @param {number} x X.
   * @param {number} y Y.
   * @param {number} resolution Resolution (for a non-integer zoom level).
   * @param {boolean} reverseIntersectionPolicy Instead of letting edge
   *     intersections go to the higher tile coordinate, let edge intersections
   *     go to the lower tile coordinate.
   * @param {import("../tilecoord.js").TileCoord} [opt_tileCoord] Temporary import("../tilecoord.js").TileCoord object.
   * @return {import("../tilecoord.js").TileCoord} Tile coordinate.
   * @private
   */getTileCoordForXYAndResolution_(t,e,i,n,r){let s=this.getZForResolution(i),o=i/this.getResolution(s),l=this.getOrigin(s),a=ev(this.getTileSize(s),this.tmpSize_),h=o*(t-l[0])/i/a[0],u=o*(l[1]-e)/i/a[1];return n?(h=t2(h,5)-1,u=t2(u,5)-1):(h=t1(h,5),u=t1(u,5)),op(s,h,u,r)}/**
   * Although there is repetition between this method and `getTileCoordForXYAndResolution_`,
   * they should have separate implementations.  This method is for integer zoom
   * levels.  The other method should only be called for resolutions corresponding
   * to non-integer zoom levels.
   * @param {number} x Map x coordinate.
   * @param {number} y Map y coordinate.
   * @param {number} z Integer zoom level.
   * @param {boolean} reverseIntersectionPolicy Instead of letting edge
   *     intersections go to the higher tile coordinate, let edge intersections
   *     go to the lower tile coordinate.
   * @param {import("../tilecoord.js").TileCoord} [opt_tileCoord] Temporary import("../tilecoord.js").TileCoord object.
   * @return {import("../tilecoord.js").TileCoord} Tile coordinate.
   * @private
   */getTileCoordForXYAndZ_(t,e,i,n,r){let s=this.getOrigin(i),o=this.getResolution(i),l=ev(this.getTileSize(i),this.tmpSize_),a=(t-s[0])/o/l[0],h=(s[1]-e)/o/l[1];return n?(a=t2(a,5)-1,h=t2(h,5)-1):(a=t1(a,5),h=t1(h,5)),op(i,a,h,r)}/**
   * Get a tile coordinate given a map coordinate and zoom level.
   * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
   * @param {number} z Zoom level.
   * @param {import("../tilecoord.js").TileCoord} [opt_tileCoord] Destination import("../tilecoord.js").TileCoord object.
   * @return {import("../tilecoord.js").TileCoord} Tile coordinate.
   * @api
   */getTileCoordForCoordAndZ(t,e,i){return this.getTileCoordForXYAndZ_(t[0],t[1],e,!1,i)}/**
   * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
   * @return {number} Tile resolution.
   */getTileCoordResolution(t){return this.resolutions_[t[0]]}/**
   * Get the tile size for a zoom level. The type of the return value matches the
   * `tileSize` or `tileSizes` that the tile grid was configured with. To always
   * get an {@link import("../size.js").Size}, run the result through {@link module:ol/size.toSize}.
   * @param {number} z Z.
   * @return {number|import("../size.js").Size} Tile size.
   * @api
   */getTileSize(t){return this.tileSize_?this.tileSize_:this.tileSizes_[t]}/**
   * @param {number} z Zoom level.
   * @return {import("../TileRange.js").default} Extent tile range for the specified zoom level.
   */getFullTileRange(t){return this.fullTileRanges_?this.fullTileRanges_[t]:this.extent_?this.getTileRangeForExtentAndZ(this.extent_,t):null}/**
   * @param {number} resolution Resolution.
   * @param {number|import("../array.js").NearestDirectionFunction} [opt_direction]
   *     If 0, the nearest resolution will be used.
   *     If 1, the nearest higher resolution (lower Z) will be used. If -1, the
   *     nearest lower resolution (higher Z) will be used. Default is 0.
   *     Use a {@link module:ol/array~NearestDirectionFunction} for more precise control.
   *
   * For example to change tile Z at the midpoint of zoom levels
   * ```js
   * function(value, high, low) {
   *   return value - low * Math.sqrt(high / low);
   * }
   * ```
   * @return {number} Z.
   * @api
   */getZForResolution(t,e){let i=v(this.resolutions_,t,e||0);return tH(i,this.minZoom,this.maxZoom)}/**
   * The tile with the provided tile coordinate intersects the given viewport.
   * @param {import('../tilecoord.js').TileCoord} tileCoord Tile coordinate.
   * @param {Array<number>} viewport Viewport as returned from {@link module:ol/extent.getRotatedViewport}.
   * @return {boolean} The tile with the provided tile coordinate intersects the given viewport.
   */tileCoordIntersectsViewport(t,e){return e8(e,0,e.length,2,this.getTileCoordExtent(t))}/**
   * @param {!import("../extent.js").Extent} extent Extent for this tile grid.
   * @private
   */calculateTileRanges_(t){let e=this.resolutions_.length,i=Array(e);for(let n=this.minZoom;n<e;++n)i[n]=this.getTileRangeForExtentAndZ(t,n);this.fullTileRanges_=i}};function oT(t){let e=t.getDefaultTileGrid();return e||(e=function(t,e,i,n){let r=oM(t);return function(t,e,i,n){n=void 0!==n?n:"top-left";let r=oI(t,e,i);return new ow({extent:t,origin:function(t,e){let i;if("bottom-left"===e)i=tE(t);else if("bottom-right"===e)i=tC(t);else if("top-left"===e)i=tM(t);else if("top-right"===e)i=tL(t);else throw Error("Invalid corner");return i}(t,n),resolutions:r,tileSize:i})}(r,void 0,void 0,void 0)}(t),t.setDefaultTileGrid(e)),e}/**
 * Create a resolutions array from an extent.  A zoom factor of 2 is assumed.
 * @param {import("./extent.js").Extent} extent Extent.
 * @param {number} [maxZoom] Maximum zoom level (default is
 *     DEFAULT_MAX_ZOOM).
 * @param {number|import("./size.js").Size} [tileSize] Tile size (default uses
 *     DEFAULT_TILE_SIZE).
 * @param {number} [maxResolution] Resolution at level zero.
 * @return {!Array<number>} Resolutions array.
 */function oI(t,e,i,n){e=void 0!==e?e:42,i=ev(void 0!==i?i:256);let r=tT(t),s=tb(t);n=n>0?n:Math.max(s/i[0],r/i[1]);let o=e+1,l=Array(o);for(let t=0;t<o;++t)l[t]=n/Math.pow(2,t);return l}function oM(t){let e=(t=en(t)).getExtent();if(!e){let i=180*tO.degrees/t.getMetersPerUnit();e=tc(-i,-i,i,i)}return e}class oL extends m{/**
   * @param {string} type Type.
   * @param {import("../Tile.js").default} tile The tile.
   */constructor(t,e){super(t),/**
     * The tile related to the event.
     * @type {import("../Tile.js").default}
     * @api
     */this.tile=e}}var ob=/***
 * @template Return
 * @typedef {import("../Observable").OnSignature<import("../Observable").EventTypes, import("../events/Event.js").default, Return> &
 *   import("../Observable").OnSignature<import("../ObjectEventType").Types, import("../Object").ObjectEvent, Return> &
 *   import("../Observable").OnSignature<import("./TileEventType").TileSourceEventTypes, TileSourceEvent, Return> &
 *   import("../Observable").CombinedOnSignature<import("../Observable").EventTypes|import("../ObjectEventType").Types|
 *     import("./TileEventType").TileSourceEventTypes, Return>} TileSourceOnSignature
 *//**
 * @typedef {Object} Options
 * @property {import("./Source.js").AttributionLike} [attributions] Attributions.
 * @property {boolean} [attributionsCollapsible=true] Attributions are collapsible.
 * @property {number} [cacheSize] CacheSize.
 * @property {boolean} [opaque=false] Whether the layer is opaque.
 * @property {number} [tilePixelRatio] TilePixelRatio.
 * @property {import("../proj.js").ProjectionLike} [projection] Projection.
 * @property {import("./Source.js").State} [state] State.
 * @property {import("../tilegrid/TileGrid.js").default} [tileGrid] TileGrid.
 * @property {boolean} [wrapX=false] WrapX.
 * @property {number} [transition] Transition.
 * @property {string} [key] Key.
 * @property {number|import("../array.js").NearestDirectionFunction} [zDirection=0] ZDirection.
 * @property {boolean} [interpolate=false] Use interpolated values when resampling.  By default,
 * the nearest neighbor is used when resampling.
 *//**
 * @classdesc
 * Abstract base class; normally only used for creating subclasses and not
 * instantiated in apps.
 * Base class for sources providing images divided into a tile grid.
 * @abstract
 * @api
 */class extends oi{/**
   * @param {Options} options SourceTile source options.
   */constructor(t){super({attributions:t.attributions,attributionsCollapsible:t.attributionsCollapsible,projection:t.projection,state:t.state,wrapX:t.wrapX,interpolate:t.interpolate}),/***
     * @type {TileSourceOnSignature<import("../events").EventsKey>}
     */this.on,/***
     * @type {TileSourceOnSignature<import("../events").EventsKey>}
     */this.once,/***
     * @type {TileSourceOnSignature<void>}
     */this.un,/**
     * @private
     * @type {boolean}
     */this.opaque_=void 0!==t.opaque&&t.opaque,/**
     * @private
     * @type {number}
     */this.tilePixelRatio_=void 0!==t.tilePixelRatio?t.tilePixelRatio:1,/**
     * @type {import("../tilegrid/TileGrid.js").default|null}
     */this.tileGrid=void 0!==t.tileGrid?t.tileGrid:null,this.tileGrid&&ev(this.tileGrid.getTileSize(this.tileGrid.getMinZoom()),[256,256]),/**
     * @protected
     * @type {import("../TileCache.js").default}
     */this.tileCache=new ov(t.cacheSize||0),/**
     * @protected
     * @type {import("../size.js").Size}
     */this.tmpSize=[0,0],/**
     * @private
     * @type {string}
     */this.key_=t.key||"",/**
     * @protected
     * @type {import("../Tile.js").Options}
     */this.tileOptions={transition:t.transition,interpolate:t.interpolate},/**
     * zDirection hint, read by the renderer. Indicates which resolution should be used
     * by a renderer if the views resolution does not match any resolution of the tile source.
     * If 0, the nearest resolution will be used. If 1, the nearest lower resolution
     * will be used. If -1, the nearest higher resolution will be used.
     * @type {number|import("../array.js").NearestDirectionFunction}
     */this.zDirection=t.zDirection?t.zDirection:0}/**
   * @return {boolean} Can expire cache.
   */canExpireCache(){return this.tileCache.canExpireCache()}/**
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @param {!Object<string, boolean>} usedTiles Used tiles.
   */expireCache(t,e){let i=this.getTileCacheForProjection(t);i&&i.expireCache(e)}/**
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @param {number} z Zoom level.
   * @param {import("../TileRange.js").default} tileRange Tile range.
   * @param {function(import("../Tile.js").default):(boolean|void)} callback Called with each
   *     loaded tile.  If the callback returns `false`, the tile will not be
   *     considered loaded.
   * @return {boolean} The tile range is fully covered with loaded tiles.
   */forEachLoadedTile(t,e,i,n){let r,s,o;let l=this.getTileCacheForProjection(t);if(!l)return!1;let a=!0;for(let t=i.minX;t<=i.maxX;++t)for(let h=i.minY;h<=i.maxY;++h)s=oy(e,t,h),o=!1,l.containsKey(s)&&(o=(r=/** @type {!import("../Tile.js").default} */l.get(s)).getState()===sw.LOADED)&&(o=!1!==n(r)),o||(a=!1);return a}/**
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {number} Gutter.
   */getGutterForProjection(t){return 0}/**
   * Return the key to be used for all tiles in the source.
   * @return {string} The key for all tiles.
   */getKey(){return this.key_}/**
   * Set the value to be used as the key for all tiles in the source.
   * @param {string} key The key for tiles.
   * @protected
   */setKey(t){this.key_!==t&&(this.key_=t,this.changed())}/**
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {boolean} Opaque.
   */getOpaque(t){return this.opaque_}/**
   * @param {import("../proj/Projection").default} [projection] Projection.
   * @return {Array<number>|null} Resolutions.
   */getResolutions(t){let e=t?this.getTileGridForProjection(t):this.tileGrid;return e?e.getResolutions():null}/**
   * @abstract
   * @param {number} z Tile coordinate z.
   * @param {number} x Tile coordinate x.
   * @param {number} y Tile coordinate y.
   * @param {number} pixelRatio Pixel ratio.
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {!import("../Tile.js").default} Tile.
   */getTile(t,e,i,n,r){return O()}/**
   * Return the tile grid of the tile source.
   * @return {import("../tilegrid/TileGrid.js").default|null} Tile grid.
   * @api
   */getTileGrid(){return this.tileGrid}/**
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {!import("../tilegrid/TileGrid.js").default} Tile grid.
   */getTileGridForProjection(t){return this.tileGrid?this.tileGrid:oT(t)}/**
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {import("../TileCache.js").default} Tile cache.
   * @protected
   */getTileCacheForProjection(t){let e=this.getProjection();return z(null===e||el(e,t),"A VectorTile source can only be rendered if it has a projection compatible with the view projection."),this.tileCache}/**
   * Get the tile pixel ratio for this source. Subclasses may override this
   * method, which is meant to return a supported pixel ratio that matches the
   * provided `pixelRatio` as close as possible.
   * @param {number} pixelRatio Pixel ratio.
   * @return {number} Tile pixel ratio.
   */getTilePixelRatio(t){return this.tilePixelRatio_}/**
   * @param {number} z Z.
   * @param {number} pixelRatio Pixel ratio.
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {import("../size.js").Size} Tile size.
   */getTilePixelSize(t,e,i){var n;let r=this.getTileGridForProjection(i),s=this.getTilePixelRatio(e),o=ev(r.getTileSize(t),this.tmpSize);return 1==s?o:(void 0===(n=this.tmpSize)&&(n=[0,0]),n[0]=o[0]*s+.5|0,n[1]=o[1]*s+.5|0,n)}/**
   * Returns a tile coordinate wrapped around the x-axis. When the tile coordinate
   * is outside the resolution and extent range of the tile grid, `null` will be
   * returned.
   * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
   * @param {import("../proj/Projection.js").default} [projection] Projection.
   * @return {import("../tilecoord.js").TileCoord} Tile coordinate to be passed to the tileUrlFunction or
   *     null if no tile URL should be created for the passed `tileCoord`.
   */getTileCoordForTileUrlFunction(t,e){e=void 0!==e?e:this.getProjection();let i=this.getTileGridForProjection(e);return this.getWrapX()&&e.isGlobal()&&(t=function(t,e,i){let n=e[0],r=t.getTileCoordCenter(e),s=oM(i);if(!tl(s,r)){let e=tb(s),i=Math.ceil((s[0]-r[0])/e);return r[0]+=e*i,t.getTileCoordForCoordAndZ(r,n)}return e}(i,t,e)),!function(t,e){let i=t[0],n=t[1],r=t[2];if(e.getMinZoom()>i||i>e.getMaxZoom())return!1;let s=e.getFullTileRange(i);return!s||s.containsXY(n,r)}(t,i)?null:t}/**
   * Remove all cached tiles from the source. The next render cycle will fetch new tiles.
   * @api
   */clear(){this.tileCache.clear()}refresh(){this.clear(),super.refresh()}/**
   * Increases the cache size if needed
   * @param {number} tileCount Minimum number of tiles needed.
   * @param {import("../proj/Projection.js").default} projection Projection.
   */updateCacheSize(t,e){let i=this.getTileCacheForProjection(e);t>i.highWaterMark&&(i.highWaterMark=t)}/**
   * Marks a tile coord as being used, without triggering a load.
   * @abstract
   * @param {number} z Tile coordinate z.
   * @param {number} x Tile coordinate x.
   * @param {number} y Tile coordinate y.
   * @param {import("../proj/Projection.js").default} projection Projection.
   */useTile(t,e,i,n){}};/**
 * @typedef {Object} Options
 * @property {import("./Source.js").AttributionLike} [attributions] Attributions.
 * @property {boolean} [attributionsCollapsible=true] Attributions are collapsible.
 * @property {number} [cacheSize] Cache size.
 * @property {boolean} [opaque=false] Whether the layer is opaque.
 * @property {import("../proj.js").ProjectionLike} [projection] Projection.
 * @property {import("./Source.js").State} [state] State.
 * @property {import("../tilegrid/TileGrid.js").default} [tileGrid] TileGrid.
 * @property {import("../Tile.js").LoadFunction} tileLoadFunction TileLoadFunction.
 * @property {number} [tilePixelRatio] TilePixelRatio.
 * @property {import("../Tile.js").UrlFunction} [tileUrlFunction] TileUrlFunction.
 * @property {string} [url] Url.
 * @property {Array<string>} [urls] Urls.
 * @property {boolean} [wrapX=true] WrapX.
 * @property {number} [transition] Transition.
 * @property {string} [key] Key.
 * @property {number|import("../array.js").NearestDirectionFunction} [zDirection=0] ZDirection.
 * @property {boolean} [interpolate=false] Use interpolated values when resampling.  By default,
 * the nearest neighbor is used when resampling.
 *//**
 * @classdesc
 * Base class for sources providing tiles divided into a tile grid over http.
 *
 * @fires import("./Tile.js").TileSourceEvent
 */class oA extends ob{/**
   * @param {Options} options Image tile options.
   */constructor(t){super({attributions:t.attributions,cacheSize:t.cacheSize,opaque:t.opaque,projection:t.projection,state:t.state,tileGrid:t.tileGrid,tilePixelRatio:t.tilePixelRatio,wrapX:t.wrapX,transition:t.transition,interpolate:t.interpolate,key:t.key,attributionsCollapsible:t.attributionsCollapsible,zDirection:t.zDirection}),/**
     * @private
     * @type {boolean}
     */this.generateTileUrlFunction_=this.tileUrlFunction===oA.prototype.tileUrlFunction,/**
     * @protected
     * @type {import("../Tile.js").LoadFunction}
     */this.tileLoadFunction=t.tileLoadFunction,t.tileUrlFunction&&(this.tileUrlFunction=t.tileUrlFunction),/**
     * @protected
     * @type {!Array<string>|null}
     */this.urls=null,t.urls?this.setUrls(t.urls):t.url&&this.setUrl(t.url),/**
     * @private
     * @type {!Object<string, boolean>}
     */this.tileLoadingKeys_={}}/**
   * Return the tile load function of the source.
   * @return {import("../Tile.js").LoadFunction} TileLoadFunction
   * @api
   */getTileLoadFunction(){return this.tileLoadFunction}/**
   * Return the tile URL function of the source.
   * @return {import("../Tile.js").UrlFunction} TileUrlFunction
   * @api
   */getTileUrlFunction(){return Object.getPrototypeOf(this).tileUrlFunction===this.tileUrlFunction?this.tileUrlFunction.bind(this):this.tileUrlFunction}/**
   * Return the URLs used for this source.
   * When a tileUrlFunction is used instead of url or urls,
   * null will be returned.
   * @return {!Array<string>|null} URLs.
   * @api
   */getUrls(){return this.urls}/**
   * Handle tile change events.
   * @param {import("../events/Event.js").default} event Event.
   * @protected
   */handleTileChange(t){let e;let i=/** @type {import("../Tile.js").default} */t.target,n=k(i),r=i.getState();r==sw.LOADING?(this.tileLoadingKeys_[n]=!0,e=oE.TILELOADSTART):n in this.tileLoadingKeys_&&(delete this.tileLoadingKeys_[n],e=r==sw.ERROR?oE.TILELOADERROR:r==sw.LOADED?oE.TILELOADEND:void 0),void 0!=e&&this.dispatchEvent(new oL(e,i))}/**
   * Set the tile load function of the source.
   * @param {import("../Tile.js").LoadFunction} tileLoadFunction Tile load function.
   * @api
   */setTileLoadFunction(t){this.tileCache.clear(),this.tileLoadFunction=t,this.changed()}/**
   * Set the tile URL function of the source.
   * @param {import("../Tile.js").UrlFunction} tileUrlFunction Tile URL function.
   * @param {string} [key] Optional new tile key for the source.
   * @api
   */setTileUrlFunction(t,e){this.tileUrlFunction=t,this.tileCache.pruneExceptNewestZ(),void 0!==e?this.setKey(e):this.changed()}/**
   * Set the URL to use for requests.
   * @param {string} url URL.
   * @api
   */setUrl(t){let e=function(t){let e=[],i=/\{([a-z])-([a-z])\}/.exec(t);if(i){let n;// char range
let r=i[1].charCodeAt(0),s=i[2].charCodeAt(0);for(n=r;n<=s;++n)e.push(t.replace(i[0],String.fromCharCode(n)));return e}if(i=/\{(\d+)-(\d+)\}/.exec(t)){// number range
let n=parseInt(i[2],10);for(let r=parseInt(i[1],10);r<=n;r++)e.push(t.replace(i[0],r.toString()));return e}return e.push(t),e}(t);this.urls=e,this.setUrls(e)}/**
   * Set the URLs to use for requests.
   * @param {Array<string>} urls URLs.
   * @api
   */setUrls(t){this.urls=t;let e=t.join("\n");this.generateTileUrlFunction_?this.setTileUrlFunction(function(t,e){let i=t.length,n=Array(i);for(let r=0;r<i;++r)n[r]=/**
 * @module ol/tileurlfunction
 */function(t,e){let i=/\{z\}/g,n=/\{x\}/g,r=/\{y\}/g,s=/\{-y\}/g;return(/**
     * @param {import("./tilecoord.js").TileCoord} tileCoord Tile Coordinate.
     * @param {number} pixelRatio Pixel ratio.
     * @param {import("./proj/Projection.js").default} projection Projection.
     * @return {string|undefined} Tile URL.
     */function(o,l,a){if(o)return t.replace(i,o[0].toString()).replace(n,o[1].toString()).replace(r,o[2].toString()).replace(s,function(){let t=o[0],i=e.getFullTileRange(t);z(i,"The {-y} placeholder requires a tile grid with extent");let n=i.getHeight()-o[2]-1;return n.toString()})})}(t[r],e);return 1===n.length?n[0]:/**
     * @param {import("./tilecoord.js").TileCoord} tileCoord Tile Coordinate.
     * @param {number} pixelRatio Pixel ratio.
     * @param {import("./proj/Projection.js").default} projection Projection.
     * @return {string|undefined} Tile URL.
     */function(t,e,i){if(!t)return;let r=(t[1]<<t[0])+t[2],s=tQ(r,n.length);return n[s](t,e,i)}}(t,this.tileGrid),e):this.setKey(e)}/**
   * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
   * @param {number} pixelRatio Pixel ratio.
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {string|undefined} Tile URL.
   */tileUrlFunction(t,e,i){}/**
   * Marks a tile coord as being used, without triggering a load.
   * @param {number} z Tile coordinate z.
   * @param {number} x Tile coordinate x.
   * @param {number} y Tile coordinate y.
   */useTile(t,e,i){let n=oy(t,e,i);this.tileCache.containsKey(n)&&this.tileCache.get(n)}}var oP=oA;/**
 * @param {ImageTile} imageTile Image tile.
 * @param {string} src Source.
 */function oF(t,e){/** @type {HTMLImageElement|HTMLVideoElement} */t.getImage().src=e}var oO=/**
 * @typedef {Object} Options
 * @property {import("./Source.js").AttributionLike} [attributions] Attributions.
 * @property {boolean} [attributionsCollapsible=true] Attributions are collapsible.
 * @property {number} [cacheSize] Initial tile cache size. Will auto-grow to hold at least the number of tiles in the viewport.
 * @property {null|string} [crossOrigin] The `crossOrigin` attribute for loaded images.  Note that
 * you must provide a `crossOrigin` value if you want to access pixel data with the Canvas renderer.
 * See https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image for more detail.
 * @property {boolean} [interpolate=true] Use interpolated values when resampling.  By default,
 * linear interpolation is used when resampling.  Set to false to use the nearest neighbor instead.
 * @property {boolean} [opaque=false] Whether the layer is opaque.
 * @property {import("../proj.js").ProjectionLike} [projection] Projection. Default is the view projection.
 * @property {number} [reprojectionErrorThreshold=0.5] Maximum allowed reprojection error (in pixels).
 * Higher values can increase reprojection performance, but decrease precision.
 * @property {import("./Source.js").State} [state] Source state.
 * @property {typeof import("../ImageTile.js").default} [tileClass] Class used to instantiate image tiles.
 * Default is {@link module:ol/ImageTile~ImageTile}.
 * @property {import("../tilegrid/TileGrid.js").default} [tileGrid] Tile grid.
 * @property {import("../Tile.js").LoadFunction} [tileLoadFunction] Optional function to load a tile given a URL. The default is
 * ```js
 * function(imageTile, src) {
 *   imageTile.getImage().src = src;
 * };
 * ```
 * @property {number} [tilePixelRatio=1] The pixel ratio used by the tile service. For example, if the tile
 * service advertizes 256px by 256px tiles but actually sends 512px
 * by 512px images (for retina/hidpi devices) then `tilePixelRatio`
 * should be set to `2`.
 * @property {import("../Tile.js").UrlFunction} [tileUrlFunction] Optional function to get tile URL given a tile coordinate and the projection.
 * @property {string} [url] URL template. Must include `{x}`, `{y}` or `{-y}`, and `{z}` placeholders.
 * A `{?-?}` template pattern, for example `subdomain{a-f}.domain.com`, may be
 * used instead of defining each one separately in the `urls` option.
 * @property {Array<string>} [urls] An array of URL templates.
 * @property {boolean} [wrapX] Whether to wrap the world horizontally. The default, is to
 * request out-of-bounds tiles from the server. When set to `false`, only one
 * world will be rendered. When set to `true`, tiles will be requested for one
 * world only, but they will be wrapped horizontally to render multiple worlds.
 * @property {number} [transition] Duration of the opacity transition for rendering.
 * To disable the opacity transition, pass `transition: 0`.
 * @property {string} [key] Optional tile key for proper cache fetching
 * @property {number|import("../array.js").NearestDirectionFunction} [zDirection=0]
 * Choose whether to use tiles with a higher or lower zoom level when between integer
 * zoom levels. See {@link module:ol/tilegrid/TileGrid~TileGrid#getZForResolution}.
 *//**
 * @classdesc
 * Base class for sources providing images divided into a tile grid.
 *
 * @fires import("./Tile.js").TileSourceEvent
 * @api
 */class extends oP{/**
   * @param {!Options} options Image tile options.
   */constructor(t){super({attributions:t.attributions,cacheSize:t.cacheSize,opaque:t.opaque,projection:t.projection,state:t.state,tileGrid:t.tileGrid,tileLoadFunction:t.tileLoadFunction?t.tileLoadFunction:oF,tilePixelRatio:t.tilePixelRatio,tileUrlFunction:t.tileUrlFunction,url:t.url,urls:t.urls,wrapX:t.wrapX,transition:t.transition,interpolate:void 0===t.interpolate||t.interpolate,key:t.key,attributionsCollapsible:t.attributionsCollapsible,zDirection:t.zDirection}),/**
     * @protected
     * @type {?string}
     */this.crossOrigin=void 0!==t.crossOrigin?t.crossOrigin:null,/**
     * @protected
     * @type {typeof ImageTile}
     */this.tileClass=void 0!==t.tileClass?t.tileClass:oh,/**
     * @protected
     * @type {!Object<string, TileCache>}
     */this.tileCacheForProjection={},/**
     * @protected
     * @type {!Object<string, import("../tilegrid/TileGrid.js").default>}
     */this.tileGridForProjection={},/**
     * @private
     * @type {number|undefined}
     */this.reprojectionErrorThreshold_=t.reprojectionErrorThreshold,/**
     * @private
     * @type {boolean}
     */this.renderReprojectionEdges_=!1}/**
   * @return {boolean} Can expire cache.
   */canExpireCache(){if(this.tileCache.canExpireCache())return!0;for(let t in this.tileCacheForProjection)if(this.tileCacheForProjection[t].canExpireCache())return!0;return!1}/**
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @param {!Object<string, boolean>} usedTiles Used tiles.
   */expireCache(t,e){let i=this.getTileCacheForProjection(t);for(let t in this.tileCache.expireCache(this.tileCache==i?e:{}),this.tileCacheForProjection){let n=this.tileCacheForProjection[t];n.expireCache(n==i?e:{})}}/**
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {number} Gutter.
   */getGutterForProjection(t){return this.getProjection()&&t&&!el(this.getProjection(),t)?0:this.getGutter()}/**
   * @return {number} Gutter.
   */getGutter(){return 0}/**
   * Return the key to be used for all tiles in the source.
   * @return {string} The key for all tiles.
   */getKey(){let t=super.getKey();return this.getInterpolate()||(t+=":disable-interpolation"),t}/**
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {boolean} Opaque.
   */getOpaque(t){return(!this.getProjection()||!t||!!el(this.getProjection(),t))&&super.getOpaque(t)}/**
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {!import("../tilegrid/TileGrid.js").default} Tile grid.
   */getTileGridForProjection(t){let e=this.getProjection();if(this.tileGrid&&(!e||el(e,t)))return this.tileGrid;let i=k(t);return i in this.tileGridForProjection||(this.tileGridForProjection[i]=oT(t)),this.tileGridForProjection[i]}/**
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {import("../TileCache.js").default} Tile cache.
   */getTileCacheForProjection(t){let e=this.getProjection();if(!e||el(e,t))return this.tileCache;let i=k(t);return i in this.tileCacheForProjection||(this.tileCacheForProjection[i]=new ov(this.tileCache.highWaterMark)),this.tileCacheForProjection[i]}/**
   * @param {number} z Tile coordinate z.
   * @param {number} x Tile coordinate x.
   * @param {number} y Tile coordinate y.
   * @param {number} pixelRatio Pixel ratio.
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @param {string} key The key set on the tile.
   * @return {!ImageTile} Tile.
   * @private
   */createTile_(t,e,i,n,r,s){let o=[t,e,i],l=this.getTileCoordForTileUrlFunction(o,r),a=l?this.tileUrlFunction(l,n,r):void 0,h=new this.tileClass(o,void 0!==a?sw.IDLE:sw.EMPTY,void 0!==a?a:"",this.crossOrigin,this.tileLoadFunction,this.tileOptions);return h.key=s,h.addEventListener(L.CHANGE,this.handleTileChange.bind(this)),h}/**
   * @param {number} z Tile coordinate z.
   * @param {number} x Tile coordinate x.
   * @param {number} y Tile coordinate y.
   * @param {number} pixelRatio Pixel ratio.
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {!(ImageTile|ReprojTile)} Tile.
   */getTile(t,e,i,n,r){let s;let o=this.getProjection();if(!o||!r||el(o,r))return this.getTileInternal(t,e,i,n,o||r);let l=this.getTileCacheForProjection(r),a=[t,e,i],h=ox(a);l.containsKey(h)&&(s=l.get(h));let u=this.getKey();if(s&&s.key==u)return s;let d=this.getTileGridForProjection(o),c=this.getTileGridForProjection(r),g=this.getTileCoordForTileUrlFunction(a,r),f=new o_(o,d,r,c,a,g,this.getTilePixelRatio(n),this.getGutter(),(t,e,i,n)=>this.getTileInternal(t,e,i,n,o),this.reprojectionErrorThreshold_,this.renderReprojectionEdges_,this.getInterpolate());return f.key=u,s?(f.interimTile=s,f.refreshInterimChain(),l.replace(h,f)):l.set(h,f),f}/**
   * @param {number} z Tile coordinate z.
   * @param {number} x Tile coordinate x.
   * @param {number} y Tile coordinate y.
   * @param {number} pixelRatio Pixel ratio.
   * @param {!import("../proj/Projection.js").default} projection Projection.
   * @return {!ImageTile} Tile.
   * @protected
   */getTileInternal(t,e,i,n,r){let s=null,o=oy(t,e,i),l=this.getKey();if(this.tileCache.containsKey(o)){if((s=this.tileCache.get(o)).key!=l){// The source's params changed. If the tile has an interim tile and if we
// can use it then we use it. Otherwise we create a new tile.  In both
// cases we attempt to assign an interim tile to the new tile.
let a=s;s=this.createTile_(t,e,i,n,r,l),a.getState()==sw.IDLE?s.interimTile=a.interimTile:s.interimTile=a,s.refreshInterimChain(),this.tileCache.replace(o,s)}}else s=this.createTile_(t,e,i,n,r,l),this.tileCache.set(o,s);return s}/**
   * Sets whether to render reprojection edges or not (usually for debugging).
   * @param {boolean} render Render the edges.
   * @api
   */setRenderReprojectionEdges(t){if(this.renderReprojectionEdges_!=t){for(let e in this.renderReprojectionEdges_=t,this.tileCacheForProjection)this.tileCacheForProjection[e].clear();this.changed()}}/**
   * Sets the tile grid to use when reprojecting the tiles to the given
   * projection instead of the default tile grid for the projection.
   *
   * This can be useful when the default tile grid cannot be created
   * (e.g. projection has no extent defined) or
   * for optimization reasons (custom tile size, resolutions, ...).
   *
   * @param {import("../proj.js").ProjectionLike} projection Projection.
   * @param {import("../tilegrid/TileGrid.js").default} tilegrid Tile grid to use for the projection.
   * @api
   */setTileGridForProjection(t,e){let i=en(t);if(i){let t=k(i);t in this.tileGridForProjection||(this.tileGridForProjection[t]=e)}}clear(){for(let t in super.clear(),this.tileCacheForProjection)this.tileCacheForProjection[t].clear()}},oD=/**
 * @typedef {Object} Options
 * @property {import("./Source.js").AttributionLike} [attributions] Attributions.
 * @property {boolean} [attributionsCollapsible=true] Attributions are collapsible.
 * @property {number} [cacheSize] Initial tile cache size. Will auto-grow to hold at least the number of tiles in the viewport.
 * @property {null|string} [crossOrigin] The `crossOrigin` attribute for loaded images.  Note that
 * you must provide a `crossOrigin` value if you want to access pixel data with the Canvas renderer.
 * See https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image for more detail.
 * @property {boolean} [interpolate=true] Use interpolated values when resampling.  By default,
 * linear interpolation is used when resampling.  Set to false to use the nearest neighbor instead.
 * @property {boolean} [opaque=false] Whether the layer is opaque.
 * @property {import("../proj.js").ProjectionLike} [projection='EPSG:3857'] Projection.
 * @property {number} [reprojectionErrorThreshold=0.5] Maximum allowed reprojection error (in pixels).
 * Higher values can increase reprojection performance, but decrease precision.
 * @property {number} [maxZoom=42] Optional max zoom level. Not used if `tileGrid` is provided.
 * @property {number} [minZoom=0] Optional min zoom level. Not used if `tileGrid` is provided.
 * @property {number} [maxResolution] Optional tile grid resolution at level zero. Not used if `tileGrid` is provided.
 * @property {import("../tilegrid/TileGrid.js").default} [tileGrid] Tile grid.
 * @property {import("../Tile.js").LoadFunction} [tileLoadFunction] Optional function to load a tile given a URL. The default is
 * ```js
 * function(imageTile, src) {
 *   imageTile.getImage().src = src;
 * };
 * ```
 * @property {number} [tilePixelRatio=1] The pixel ratio used by the tile service.
 * For example, if the tile service advertizes 256px by 256px tiles but actually sends 512px
 * by 512px images (for retina/hidpi devices) then `tilePixelRatio`
 * should be set to `2`.
 * @property {number|import("../size.js").Size} [tileSize=[256, 256]] The tile size used by the tile service.
 * Not used if `tileGrid` is provided.
 * @property {number} [gutter=0] The size in pixels of the gutter around image tiles to ignore.
 * This allows artifacts of rendering at tile edges to be ignored.
 * Supported images should be wider and taller than the tile size by a value of `2 x gutter`.
 * @property {import("../Tile.js").UrlFunction} [tileUrlFunction] Optional function to get
 * tile URL given a tile coordinate and the projection.
 * Required if `url` or `urls` are not provided.
 * @property {string} [url] URL template. Must include `{x}`, `{y}` or `{-y}`,
 * and `{z}` placeholders. A `{?-?}` template pattern, for example `subdomain{a-f}.domain.com`,
 * may be used instead of defining each one separately in the `urls` option.
 * @property {Array<string>} [urls] An array of URL templates.
 * @property {boolean} [wrapX=true] Whether to wrap the world horizontally.
 * @property {number} [transition=250] Duration of the opacity transition for rendering.
 * To disable the opacity transition, pass `transition: 0`.
 * @property {number|import("../array.js").NearestDirectionFunction} [zDirection=0]
 * Choose whether to use tiles with a higher or lower zoom level when between integer
 * zoom levels. See {@link module:ol/tilegrid/TileGrid~TileGrid#getZForResolution}.
 *//**
 * @classdesc
 * Layer source for tile data with URLs in a set XYZ format that are
 * defined in a URL template. By default, this follows the widely-used
 * Google grid where `x` 0 and `y` 0 are in the top left. Grids like
 * TMS where `x` 0 and `y` 0 are in the bottom left can be used by
 * using the `{-y}` placeholder in the URL template, so long as the
 * source does not have a custom tile grid. In this case
 * a `tileUrlFunction` can be used, such as:
 * ```js
 *  tileUrlFunction: function(coordinate) {
 *    return 'http://mapserver.com/' + coordinate[0] + '/' +
 *      coordinate[1] + '/' + (-coordinate[2] - 1) + '.png';
 *  }
 * ```
 * @api
 */class extends oO{/**
   * @param {Options} [options] XYZ options.
   */constructor(t){t=t||{};let e=void 0!==t.projection?t.projection:"EPSG:3857",i=void 0!==t.tileGrid?t.tileGrid:function(t){let e=t||{},i=e.extent||en("EPSG:3857").getExtent(),n={extent:i,minZoom:e.minZoom,tileSize:e.tileSize,resolutions:oI(i,e.maxZoom,e.tileSize,e.maxResolution)};return new ow(n)}({extent:oM(e),maxResolution:t.maxResolution,maxZoom:t.maxZoom,minZoom:t.minZoom,tileSize:t.tileSize});super({attributions:t.attributions,cacheSize:t.cacheSize,crossOrigin:t.crossOrigin,interpolate:t.interpolate,opaque:t.opaque,projection:e,reprojectionErrorThreshold:t.reprojectionErrorThreshold,tileGrid:i,tileLoadFunction:t.tileLoadFunction,tilePixelRatio:t.tilePixelRatio,tileUrlFunction:t.tileUrlFunction,url:t.url,urls:t.urls,wrapX:void 0===t.wrapX||t.wrapX,transition:t.transition,attributionsCollapsible:t.attributionsCollapsible,zDirection:t.zDirection}),/**
     * @private
     * @type {number}
     */this.gutter_=void 0!==t.gutter?t.gutter:0}/**
   * @return {number} Gutter.
   */getGutter(){return this.gutter_}},ok={PRELOAD:"preload",USE_INTERIM_TILES_ON_ERROR:"useInterimTilesOnError"},oN=/***
 * @template Return
 * @typedef {import("../Observable").OnSignature<import("../Observable").EventTypes, import("../events/Event.js").default, Return> &
 *   import("../Observable").OnSignature<import("./Base").BaseLayerObjectEventTypes|
 *     import("./Layer.js").LayerEventType|'change:preload'|'change:useInterimTilesOnError', import("../Object").ObjectEvent, Return> &
 *   import("../Observable").OnSignature<import("../render/EventType").LayerRenderEventTypes, import("../render/Event").default, Return> &
 *   import("../Observable").CombinedOnSignature<import("../Observable").EventTypes|import("./Base").BaseLayerObjectEventTypes|
 *   import("./Layer.js").LayerEventType|'change:preload'|'change:useInterimTilesOnError'|import("../render/EventType").LayerRenderEventTypes, Return>} BaseTileLayerOnSignature
 *//**
 * @template {import("../source/Tile.js").default} TileSourceType
 * @typedef {Object} Options
 * @property {string} [className='ol-layer'] A CSS class name to set to the layer element.
 * @property {number} [opacity=1] Opacity (0, 1).
 * @property {boolean} [visible=true] Visibility.
 * @property {import("../extent.js").Extent} [extent] The bounding extent for layer rendering.  The layer will not be
 * rendered outside of this extent.
 * @property {number} [zIndex] The z-index for layer rendering.  At rendering time, the layers
 * will be ordered, first by Z-index and then by position. When `undefined`, a `zIndex` of 0 is assumed
 * for layers that are added to the map's `layers` collection, or `Infinity` when the layer's `setMap()`
 * method was used.
 * @property {number} [minResolution] The minimum resolution (inclusive) at which this layer will be
 * visible.
 * @property {number} [maxResolution] The maximum resolution (exclusive) below which this layer will
 * be visible.
 * @property {number} [minZoom] The minimum view zoom level (exclusive) above which this layer will be
 * visible.
 * @property {number} [maxZoom] The maximum view zoom level (inclusive) at which this layer will
 * be visible.
 * @property {number} [preload=0] Preload. Load low-resolution tiles up to `preload` levels. `0`
 * means no preloading.
 * @property {TileSourceType} [source] Source for this layer.
 * @property {import("../Map.js").default} [map] Sets the layer as overlay on a map. The map will not manage
 * this layer in its layers collection, and the layer will be rendered on top. This is useful for
 * temporary layers. The standard way to add a layer to a map and have it managed by the map is to
 * use {@link import("../Map.js").default#addLayer map.addLayer()}.
 * @property {boolean} [useInterimTilesOnError=true] Use interim tiles on error.
 * @property {Object<string, *>} [properties] Arbitrary observable properties. Can be accessed with `#get()` and `#set()`.
 *//**
 * @classdesc
 * For layer sources that provide pre-rendered, tiled images in grids that are
 * organized by zoom levels for specific resolutions.
 * Note that any property set in the options is set as a {@link module:ol/Object~BaseObject}
 * property on the layer object; for example, setting `title: 'My Title'` in the
 * options means that `title` is observable, and has get/set accessors.
 *
 * @template {import("../source/Tile.js").default} TileSourceType
 * @template {import("../renderer/Layer.js").default} RendererType
 * @extends {Layer<TileSourceType, RendererType>}
 * @api
 */class extends sa{/**
   * @param {Options<TileSourceType>} [options] Tile layer options.
   */constructor(t){t=t||{};let e=Object.assign({},t);delete e.preload,delete e.useInterimTilesOnError,super(e),/***
     * @type {BaseTileLayerOnSignature<import("../events").EventsKey>}
     */this.on,/***
     * @type {BaseTileLayerOnSignature<import("../events").EventsKey>}
     */this.once,/***
     * @type {BaseTileLayerOnSignature<void>}
     */this.un,this.setPreload(void 0!==t.preload?t.preload:0),this.setUseInterimTilesOnError(void 0===t.useInterimTilesOnError||t.useInterimTilesOnError)}/**
   * Return the level as number to which we will preload tiles up to.
   * @return {number} The level to preload tiles up to.
   * @observable
   * @api
   */getPreload(){return /** @type {number} */this.get(ok.PRELOAD)}/**
   * Set the level as number to which we will preload tiles up to.
   * @param {number} preload The level to preload tiles up to.
   * @observable
   * @api
   */setPreload(t){this.set(ok.PRELOAD,t)}/**
   * Whether we use interim tiles on error.
   * @return {boolean} Use interim tiles on error.
   * @observable
   * @api
   */getUseInterimTilesOnError(){return /** @type {boolean} */this.get(ok.USE_INTERIM_TILES_ON_ERROR)}/**
   * Set whether we use interim tiles on error.
   * @param {boolean} useInterimTilesOnError Use interim tiles on error.
   * @observable
   * @api
   */setUseInterimTilesOnError(t){this.set(ok.USE_INTERIM_TILES_ON_ERROR,t)}/**
   * Get data for a pixel location.  The return type depends on the source data.  For image tiles,
   * a four element RGBA array will be returned.  For data tiles, the array length will match the
   * number of bands in the dataset.  For requests outside the layer extent, `null` will be returned.
   * Data for a image tiles can only be retrieved if the source's `crossOrigin` property is set.
   *
   * ```js
   * // display layer data on every pointer move
   * map.on('pointermove', (event) => {
   *   console.log(layer.getData(event.pixel));
   * });
   * ```
   * @param {import("../pixel").Pixel} pixel Pixel.
   * @return {Uint8ClampedArray|Uint8Array|Float32Array|DataView|null} Pixel data.
   * @api
   */getData(t){return super.getData(t)}},oG=/**
 * @module ol/renderer/canvas/TileLayer
 *//**
 * @module ol/renderer/canvas/Layer
 *//**
 * @module ol/renderer/Layer
 *//**
 * @template {import("../layer/Layer.js").default} LayerType
 */class extends F{/**
   * @param {LayerType} layer Layer.
   */constructor(t){super(),/**
     * The renderer is initialized and ready to render.
     * @type {boolean}
     */this.ready=!0,/** @private */this.boundHandleImageChange_=this.handleImageChange_.bind(this),/**
     * @protected
     * @type {LayerType}
     */this.layer_=t,/**
     * @type {import("../render/canvas/ExecutorGroup").default}
     */this.declutterExecutorGroup=null}/**
   * Asynchronous layer level hit detection.
   * @param {import("../pixel.js").Pixel} pixel Pixel.
   * @return {Promise<Array<import("../Feature").FeatureLike>>} Promise that resolves with
   * an array of features.
   */getFeatures(t){return O()}/**
   * @param {import("../pixel.js").Pixel} pixel Pixel.
   * @return {Uint8ClampedArray|Uint8Array|Float32Array|DataView|null} Pixel data.
   */getData(t){return null}/**
   * Determine whether render should be called.
   * @abstract
   * @param {import("../Map.js").FrameState} frameState Frame state.
   * @return {boolean} Layer is ready to be rendered.
   */prepareFrame(t){return O()}/**
   * Render the layer.
   * @abstract
   * @param {import("../Map.js").FrameState} frameState Frame state.
   * @param {HTMLElement|null} target Target that may be used to render content to.
   * @return {HTMLElement|null} The rendered element.
   */renderFrame(t,e){return O()}/**
   * @param {Object<number, Object<string, import("../Tile.js").default>>} tiles Lookup of loaded tiles by zoom level.
   * @param {number} zoom Zoom level.
   * @param {import("../Tile.js").default} tile Tile.
   * @return {boolean|void} If `false`, the tile will not be considered loaded.
   */loadedTileCallback(t,e,i){t[e]||(t[e]={}),t[e][i.tileCoord.toString()]=i}/**
   * Create a function that adds loaded tiles to the tile lookup.
   * @param {import("../source/Tile.js").default} source Tile source.
   * @param {import("../proj/Projection.js").default} projection Projection of the tiles.
   * @param {Object<number, Object<string, import("../Tile.js").default>>} tiles Lookup of loaded tiles by zoom level.
   * @return {function(number, import("../TileRange.js").default):boolean} A function that can be
   *     called with a zoom level and a tile range to add loaded tiles to the lookup.
   * @protected
   */createLoadedTileFinder(t,e,i){return(/**
       * @param {number} zoom Zoom level.
       * @param {import("../TileRange.js").default} tileRange Tile range.
       * @return {boolean} The tile range is fully loaded.
       */(n,r)=>{let s=this.loadedTileCallback.bind(this,i,n);return t.forEachLoadedTile(e,n,r,s)})}/**
   * @abstract
   * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
   * @param {import("../Map.js").FrameState} frameState Frame state.
   * @param {number} hitTolerance Hit tolerance in pixels.
   * @param {import("./vector.js").FeatureCallback<T>} callback Feature callback.
   * @param {Array<import("./Map.js").HitMatch<T>>} matches The hit detected matches with tolerance.
   * @return {T|undefined} Callback result.
   * @template T
   */forEachFeatureAtCoordinate(t,e,i,n,r){}/**
   * @return {LayerType} Layer.
   */getLayer(){return this.layer_}/**
   * Perform action necessary to get the layer rendered after new fonts have loaded
   * @abstract
   */handleFontsChanged(){}/**
   * Handle changes in image state.
   * @param {import("../events/Event.js").default} event Image change event.
   * @private
   */handleImageChange_(t){let e=/** @type {import("../Image.js").default} */t.target;(e.getState()===ey.LOADED||e.getState()===ey.ERROR)&&this.renderIfReadyAndVisible()}/**
   * Load the image if not already loaded, and register the image change
   * listener if needed.
   * @param {import("../Image.js").default} image Image.
   * @return {boolean} `true` if the image is already loaded, `false` otherwise.
   * @protected
   */loadImage(t){let e=t.getState();return e!=ey.LOADED&&e!=ey.ERROR&&t.addEventListener(L.CHANGE,this.boundHandleImageChange_),e==ey.IDLE&&(t.load(),e=t.getState()),e==ey.LOADED}/**
   * @protected
   */renderIfReadyAndVisible(){let t=this.getLayer();t&&t.getVisible()&&"ready"===t.getSourceState()&&t.changed()}/**
   * Clean up.
   */disposeInternal(){delete this.layer_,super.disposeInternal()}};let oz=[],oX=null;var oW=/**
 * @abstract
 * @template {import("../../layer/Layer.js").default} LayerType
 * @extends {LayerRenderer<LayerType>}
 */class extends oG{/**
   * @param {LayerType} layer Layer.
   */constructor(t){super(t),/**
     * @protected
     * @type {HTMLElement}
     */this.container=null,/**
     * @protected
     * @type {number}
     */this.renderedResolution,/**
     * A temporary transform.  The values in this transform should only be used in a
     * function that sets the values.
     * @protected
     * @type {import("../../transform.js").Transform}
     */this.tempTransform=J(),/**
     * The transform for rendered pixels to viewport CSS pixels.  This transform must
     * be set when rendering a frame and may be used by other functions after rendering.
     * @protected
     * @type {import("../../transform.js").Transform}
     */this.pixelTransform=J(),/**
     * The transform for viewport CSS pixels to rendered pixels.  This transform must
     * be set when rendering a frame and may be used by other functions after rendering.
     * @protected
     * @type {import("../../transform.js").Transform}
     */this.inversePixelTransform=J(),/**
     * @type {CanvasRenderingContext2D}
     */this.context=null,/**
     * @type {boolean}
     */this.containerReused=!1,/**
     * @private
     * @type {CanvasRenderingContext2D}
     */this.pixelContext_=null,/**
     * @protected
     * @type {import("../../Map.js").FrameState|null}
     */this.frameState=null}/**
   * @param {import('../../DataTile.js').ImageLike} image Image.
   * @param {number} col The column index.
   * @param {number} row The row index.
   * @return {Uint8ClampedArray|null} The image data.
   */getImageData(t,e,i){let n;oX||(oX=eb(1,1,void 0,{willReadFrequently:!0})),oX.clearRect(0,0,1,1);try{oX.drawImage(t,e,i,1,1,0,0,1,1),n=oX.getImageData(0,0,1,1).data}catch(t){return oX=null,null}return n}/**
   * @param {import('../../Map.js').FrameState} frameState Frame state.
   * @return {string} Background color.
   */getBackground(t){let e=this.getLayer(),i=e.getBackground();return"function"==typeof i&&(i=i(t.viewState.resolution)),i||void 0}/**
   * Get a rendering container from an existing target, if compatible.
   * @param {HTMLElement} target Potential render target.
   * @param {string} transform CSS Transform.
   * @param {string} [backgroundColor] Background color.
   */useContainer(t,e,i){let n,r;let s=this.getLayer().getClassName();if(t&&t.className===s&&(!i||t&&t.style.backgroundColor&&C(eI(t.style.backgroundColor),eI(i)))){let e=t.firstElementChild;e instanceof HTMLCanvasElement&&(r=e.getContext("2d"))}if(r&&r.canvas.style.transform===e?(// Container of the previous layer renderer can be used.
this.container=t,this.context=r,this.containerReused=!0):this.containerReused?(// Previously reused container cannot be used any more.
this.container=null,this.context=null,this.containerReused=!1):this.container&&(this.container.style.backgroundColor=null),!this.container){(n=document.createElement("div")).className=s;let t=n.style;t.position="absolute",t.width="100%",t.height="100%",r=eb();let e=r.canvas;n.appendChild(e),(t=e.style).position="absolute",t.left="0",t.transformOrigin="top left",this.container=n,this.context=r}this.containerReused||!i||this.container.style.backgroundColor||(this.container.style.backgroundColor=i)}/**
   * @param {CanvasRenderingContext2D} context Context.
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @param {import("../../extent.js").Extent} extent Clip extent.
   * @protected
   */clipUnrotated(t,e,i){let n=tM(i),r=tL(i),s=tC(i),o=tE(i);$(e.coordinateToPixelTransform,n),$(e.coordinateToPixelTransform,r),$(e.coordinateToPixelTransform,s),$(e.coordinateToPixelTransform,o);let l=this.inversePixelTransform;$(l,n),$(l,r),$(l,s),$(l,o),t.save(),t.beginPath(),t.moveTo(Math.round(n[0]),Math.round(n[1])),t.lineTo(Math.round(r[0]),Math.round(r[1])),t.lineTo(Math.round(s[0]),Math.round(s[1])),t.lineTo(Math.round(o[0]),Math.round(o[1])),t.clip()}/**
   * @param {import("../../render/EventType.js").default} type Event type.
   * @param {CanvasRenderingContext2D} context Context.
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @private
   */dispatchRenderEvent_(t,e,i){let n=this.getLayer();if(n.hasListener(t)){let r=new sd(t,this.inversePixelTransform,i,e);n.dispatchEvent(r)}}/**
   * @param {CanvasRenderingContext2D} context Context.
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @protected
   */preRender(t,e){this.frameState=e,this.dispatchRenderEvent_(r0.PRERENDER,t,e)}/**
   * @param {CanvasRenderingContext2D} context Context.
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @protected
   */postRender(t,e){this.dispatchRenderEvent_(r0.POSTRENDER,t,e)}/**
   * Creates a transform for rendering to an element that will be rotated after rendering.
   * @param {import("../../coordinate.js").Coordinate} center Center.
   * @param {number} resolution Resolution.
   * @param {number} rotation Rotation.
   * @param {number} pixelRatio Pixel ratio.
   * @param {number} width Width of the rendered element (in pixels).
   * @param {number} height Height of the rendered element (in pixels).
   * @param {number} offsetX Offset on the x-axis in view coordinates.
   * @protected
   * @return {!import("../../transform.js").Transform} Transform.
   */getRenderTransform(t,e,i,n,r,s,o){let l=n/e,a=-l,h=-t[0]+o,u=-t[1];return Q(this.tempTransform,r/2,s/2,l,a,-i,h,u)}/**
   * Clean up.
   */disposeInternal(){delete this.frameState,super.disposeInternal()}},oY=/**
 * @classdesc
 * Canvas renderer for tile layers.
 * @api
 * @template {import("../../layer/Tile.js").default<import("../../source/Tile.js").default>|import("../../layer/VectorTile.js").default} [LayerType=import("../../layer/Tile.js").default<import("../../source/Tile.js").default>|import("../../layer/VectorTile.js").default]
 * @extends {CanvasLayerRenderer<LayerType>}
 */class extends oW{/**
   * @param {LayerType} tileLayer Tile layer.
   */constructor(t){super(t),/**
     * Rendered extent has changed since the previous `renderFrame()` call
     * @type {boolean}
     */this.extentChanged=!0,/**
     * @private
     * @type {?import("../../extent.js").Extent}
     */this.renderedExtent_=null,/**
     * @protected
     * @type {number}
     */this.renderedPixelRatio,/**
     * @protected
     * @type {import("../../proj/Projection.js").default}
     */this.renderedProjection=null,/**
     * @protected
     * @type {number}
     */this.renderedRevision,/**
     * @protected
     * @type {!Array<import("../../Tile.js").default>}
     */this.renderedTiles=[],/**
     * @private
     * @type {boolean}
     */this.newTiles_=!1,/**
     * @protected
     * @type {import("../../extent.js").Extent}
     */this.tmpExtent=td(),/**
     * @private
     * @type {import("../../TileRange.js").default}
     */this.tmpTileRange_=new oC(0,0,0,0)}/**
   * @protected
   * @param {import("../../Tile.js").default} tile Tile.
   * @return {boolean} Tile is drawable.
   */isDrawableTile(t){let e=this.getLayer(),i=t.getState(),n=e.getUseInterimTilesOnError();return i==sw.LOADED||i==sw.EMPTY||i==sw.ERROR&&!n}/**
   * @param {number} z Tile coordinate z.
   * @param {number} x Tile coordinate x.
   * @param {number} y Tile coordinate y.
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @return {!import("../../Tile.js").default} Tile.
   */getTile(t,e,i,n){let r=n.pixelRatio,s=n.viewState.projection,o=this.getLayer(),l=o.getSource(),a=l.getTile(t,e,i,r,s);return a.getState()==sw.ERROR&&o.getUseInterimTilesOnError()&&o.getPreload()>0&&(this.newTiles_=!0),this.isDrawableTile(a)||(a=a.getInterimTile()),a}/**
   * @param {import("../../pixel.js").Pixel} pixel Pixel.
   * @return {Uint8ClampedArray} Data at the pixel location.
   */getData(t){let e=this.frameState;if(!e)return null;let i=this.getLayer(),n=$(e.pixelToCoordinateTransform,t.slice()),r=i.getExtent();if(r&&!tl(r,n))return null;let s=e.pixelRatio,o=e.viewState.projection,l=e.viewState,a=i.getRenderSource(),h=a.getTileGridForProjection(l.projection),u=a.getTilePixelRatio(e.pixelRatio);for(let t=h.getZForResolution(l.resolution);t>=h.getMinZoom();--t){let e=h.getTileCoordForCoordAndZ(n,t),i=a.getTile(t,e[1],e[2],s,o);if(!(i instanceof oh||i instanceof o_)||i instanceof o_&&i.getState()===sw.EMPTY)break;if(i.getState()!==sw.LOADED)continue;let r=h.getOrigin(t),d=ev(h.getTileSize(t)),c=h.getResolution(t),g=Math.floor(u*((n[0]-r[0])/c-e[1]*d[0])),f=Math.floor(u*((r[1]-n[1])/c-e[2]*d[1])),_=Math.round(u*a.getGutterForProjection(l.projection));return this.getImageData(i.getImage(),g+_,f+_)}return null}/**
   * @param {Object<number, Object<string, import("../../Tile.js").default>>} tiles Lookup of loaded tiles by zoom level.
   * @param {number} zoom Zoom level.
   * @param {import("../../Tile.js").default} tile Tile.
   * @return {boolean|void} If `false`, the tile will not be considered loaded.
   */loadedTileCallback(t,e,i){return!!this.isDrawableTile(i)&&super.loadedTileCallback(t,e,i)}/**
   * Determine whether render should be called.
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @return {boolean} Layer is ready to be rendered.
   */prepareFrame(t){return!!this.getLayer().getSource()}/**
   * Render the layer.
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @param {HTMLElement} target Target that may be used to render content to.
   * @return {HTMLElement} The rendered element.
   */renderFrame(t,e){var i,n;let r,s,o;let l=t.layerStatesArray[t.layerIndex],a=t.viewState,h=a.projection,u=a.resolution,d=a.center,c=a.rotation,g=t.pixelRatio,f=this.getLayer(),_=f.getSource(),m=_.getRevision(),p=_.getTileGridForProjection(h),y=p.getZForResolution(u,_.zDirection),v=p.getResolution(y),E=t.extent,C=t.viewState.resolution,S=_.getTilePixelRatio(g),R=Math.round(tb(E)/C*g),w=Math.round(tT(E)/C*g),T=l.extent&&(i=l.extent);T&&(E=tI(E,n=l.extent));let I=v*R/2/S,M=v*w/2/S,L=[d[0]-I,d[1]-M,d[0]+I,d[1]+M],b=p.getTileRangeForExtentAndZ(E,y),A={};A[y]={};let P=this.createLoadedTileFinder(_,h,A),F=this.tmpExtent,O=this.tmpTileRange_;this.newTiles_=!1;let D=c?tw(a.center,C,c,t.size):void 0;for(let e=b.minX;e<=b.maxX;++e)for(let i=b.minY;i<=b.maxY;++i){if(c&&!p.tileCoordIntersectsViewport([y,e,i],D))continue;let n=this.getTile(y,e,i,t);if(this.isDrawableTile(n)){let e=k(this);if(n.getState()==sw.LOADED){A[y][n.tileCoord.toString()]=n;let t=n.inTransition(e);t&&1!==l.opacity&&(// Skipping transition when layer is not fully opaque avoids visual artifacts.
n.endTransition(e),t=!1),this.newTiles_||!t&&this.renderedTiles.includes(n)||(this.newTiles_=!0)}if(1===n.getAlpha(e,t.time))continue}let r=p.getTileCoordChildTileRange(n.tileCoord,O,F),s=!1;r&&(s=P(y+1,r)),s||p.forEachTileCoordParentTileRange(n.tileCoord,P,O,F)}let N=v/u*g/S;Q(this.pixelTransform,t.size[0]/2,t.size[1]/2,1/g,1/g,c,-R/2,-w/2);let G=te(this.pixelTransform);this.useContainer(e,G,this.getBackground(t));let z=this.context,X=z.canvas;tt(this.inversePixelTransform,this.pixelTransform),Q(this.tempTransform,R/2,w/2,N,N,0,-R/2,-w/2),X.width!=R||X.height!=w?(X.width=R,X.height=w):this.containerReused||z.clearRect(0,0,R,w),T&&this.clipUnrotated(z,t,T),_.getInterpolate()||(z.imageSmoothingEnabled=!1),this.preRender(z,t),this.renderedTiles.length=0;/** @type {Array<number>} */let W=Object.keys(A).map(Number);W.sort(x),1===l.opacity&&(!this.containerReused||_.getOpaque(t.viewState.projection))?W=W.reverse():(r=[],s=[]);for(let e=W.length-1;e>=0;--e){let i=W[e],n=_.getTilePixelSize(i,g,h),l=p.getResolution(i),a=l/v,u=n[0]*a*N,d=n[1]*a*N,c=p.getTileCoordForCoordAndZ(tM(L),i),f=p.getTileCoordExtent(c),m=$(this.tempTransform,[S*(f[0]-L[0])/v,S*(L[3]-f[3])/v]),x=S*_.getGutterForProjection(h),E=A[i];for(let e in E){let n=/** @type {import("../../ImageTile.js").default} */E[e],l=n.tileCoord,a=c[1]-l[1],h=Math.round(m[0]-(a-1)*u),g=c[2]-l[2],f=Math.round(m[1]-(g-1)*d),p=Math.round(m[0]-a*u),v=Math.round(m[1]-g*d),C=h-p,S=f-v,R=y===i,w=R&&1!==n.getAlpha(k(this),t.time),T=!1;if(!w){if(r){// Clip mask for regions in this tile that already filled by a higher z tile
o=[p,v,p+C,v,p+C,v+S,p,v+S];for(let t=0,e=r.length;t<e;++t)if(y!==i&&i<s[t]){let e=r[t];tA([p,v,p+C,v+S],[e[0],e[3],e[4],e[7]])&&(T||(z.save(),T=!0),z.beginPath(),// counter-clockwise (outer ring) for current tile
z.moveTo(o[0],o[1]),z.lineTo(o[2],o[3]),z.lineTo(o[4],o[5]),z.lineTo(o[6],o[7]),// clockwise (inner ring) for higher z tile
z.moveTo(e[6],e[7]),z.lineTo(e[4],e[5]),z.lineTo(e[2],e[3]),z.lineTo(e[0],e[1]),z.clip())}r.push(o),s.push(i)}else z.clearRect(p,v,C,S)}this.drawTileImage(n,t,p,v,C,S,x,R),r&&!w?(T&&z.restore(),this.renderedTiles.unshift(n)):this.renderedTiles.push(n),this.updateUsedTiles(t.usedTiles,_,n)}}return this.renderedRevision=m,this.renderedResolution=v,this.extentChanged=!this.renderedExtent_||!t_(this.renderedExtent_,L),this.renderedExtent_=L,this.renderedPixelRatio=g,this.renderedProjection=h,this.manageTilePyramid(t,_,p,g,h,E,y,f.getPreload()),this.scheduleExpireCache(t,_),this.postRender(z,t),l.extent&&z.restore(),z.imageSmoothingEnabled=!0,G!==X.style.transform&&(X.style.transform=G),this.container}/**
   * @param {import("../../ImageTile.js").default} tile Tile.
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @param {number} x Left of the tile.
   * @param {number} y Top of the tile.
   * @param {number} w Width of the tile.
   * @param {number} h Height of the tile.
   * @param {number} gutter Tile gutter.
   * @param {boolean} transition Apply an alpha transition.
   */drawTileImage(t,e,i,n,r,s,o,l){let a=this.getTileImage(t);if(!a)return;let h=k(this),u=e.layerStatesArray[e.layerIndex],d=u.opacity*(l?t.getAlpha(h,e.time):1),c=d!==this.context.globalAlpha;c&&(this.context.save(),this.context.globalAlpha=d),this.context.drawImage(a,o,o,a.width-2*o,a.height-2*o,i,n,r,s),c&&this.context.restore(),d!==u.opacity?e.animate=!0:l&&t.endTransition(h)}/**
   * @return {HTMLCanvasElement} Image
   */getImage(){let t=this.context;return t?t.canvas:null}/**
   * Get the image from a tile.
   * @param {import("../../ImageTile.js").default} tile Tile.
   * @return {HTMLCanvasElement|HTMLImageElement|HTMLVideoElement} Image.
   * @protected
   */getTileImage(t){return t.getImage()}/**
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @param {import("../../source/Tile.js").default} tileSource Tile source.
   * @protected
   */scheduleExpireCache(t,e){if(e.canExpireCache()){/**
       * @param {import("../../source/Tile.js").default} tileSource Tile source.
       * @param {import("../../Map.js").default} map Map.
       * @param {import("../../Map.js").FrameState} frameState Frame state.
       */let i=(function(t,e,i){let n=k(t);n in i.usedTiles&&t.expireCache(i.viewState.projection,i.usedTiles[n])}).bind(null,e);t.postRenderFunctions.push(/** @type {import("../../Map.js").PostRenderFunction} */i)}}/**
   * @param {!Object<string, !Object<string, boolean>>} usedTiles Used tiles.
   * @param {import("../../source/Tile.js").default} tileSource Tile source.
   * @param {import('../../Tile.js').default} tile Tile.
   * @protected
   */updateUsedTiles(t,e,i){// FIXME should we use tilesToDrawByZ instead?
let n=k(e);n in t||(t[n]={}),t[n][i.getKey()]=!0}/**
   * Manage tile pyramid.
   * This function performs a number of functions related to the tiles at the
   * current zoom and lower zoom levels:
   * - registers idle tiles in frameState.wantedTiles so that they are not
   *   discarded by the tile queue
   * - enqueues missing tiles
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @param {import("../../source/Tile.js").default} tileSource Tile source.
   * @param {import("../../tilegrid/TileGrid.js").default} tileGrid Tile grid.
   * @param {number} pixelRatio Pixel ratio.
   * @param {import("../../proj/Projection.js").default} projection Projection.
   * @param {import("../../extent.js").Extent} extent Extent.
   * @param {number} currentZ Current Z.
   * @param {number} preload Load low resolution tiles up to `preload` levels.
   * @param {function(import("../../Tile.js").default):void} [tileCallback] Tile callback.
   * @protected
   */manageTilePyramid(t,e,i,n,r,s,o,l,a){let h,u,d,c,g,f;let _=k(e);_ in t.wantedTiles||(t.wantedTiles[_]={});let m=t.wantedTiles[_],p=t.tileQueue,y=i.getMinZoom(),x=t.viewState.rotation,v=x?tw(t.viewState.center,t.viewState.resolution,x,t.size):void 0,E=0;for(f=y;f<=o;++f)for(u=i.getTileRangeForExtentAndZ(s,f,u),d=i.getResolution(f),c=u.minX;c<=u.maxX;++c)for(g=u.minY;g<=u.maxY;++g)(!x||i.tileCoordIntersectsViewport([f,c,g],v))&&(o-f<=l?(++E,(h=e.getTile(f,c,g,n,r)).getState()!=sw.IDLE||(m[h.getKey()]=!0,p.isKeyQueued(h.getKey())||p.enqueue([h,_,i.getTileCoordCenter(h.tileCoord),d])),void 0!==a&&a(h)):e.useTile(f,c,g,r));e.updateCacheSize(E,r)}},oU=/**
 * @classdesc
 * For layer sources that provide pre-rendered, tiled images in grids that are
 * organized by zoom levels for specific resolutions.
 * Note that any property set in the options is set as a {@link module:ol/Object~BaseObject}
 * property on the layer object; for example, setting `title: 'My Title'` in the
 * options means that `title` is observable, and has get/set accessors.
 *
 * @template {import("../source/Tile.js").default} TileSourceType
 * @extends BaseTileLayer<TileSourceType, CanvasTileLayerRenderer>
 * @api
 */class extends oN{/**
   * @param {import("./BaseTile.js").Options<TileSourceType>} [options] Tile layer options.
   */constructor(t){super(t)}createRenderer(){return new oY(this)}};/**
 * @module ol/layer/Vector
 *//**
 * @module ol/layer/BaseVector
 *//**
 * @module ol/render/canvas/style
 *//**
 * @module ol/expr/expression
 *//**
 * @fileoverview This module includes types and functions for parsing array encoded expressions.
 * The result of parsing an encoded expression is one of the specific expression classes.
 * During parsing, information is added to the parsing context about the data accessed by the
 * expression.
 */let oj=0,oB=1<<oj++,oK=1<<oj++,oZ=1<<oj++,oV=1<<oj++,oH=1<<oj++,oq=Math.pow(2,oj)-1,oJ={[oB]:"boolean",[oK]:"number",[oZ]:"string",[oV]:"color",[oH]:"number[]"},o$=Object.keys(oJ).map(Number).sort(x);function oQ(t){let e=[];for(let i of o$)(t&i)===i&&e.push(oJ[i]);return 0===e.length?"untyped":e.length<3?e.join(" or "):e.slice(0,-1).join(", ")+", or "+e[e.length-1]}class o0{/**
   * @param {number} type The value type.
   * @param {LiteralValue} value The literal value.
   */constructor(t,e){this.type=t,this.value=e}}class o1{/**
   * @param {number} type The return type.
   * @param {string} operator The operator.
   * @param {...Expression} args The arguments.
   */constructor(t,e,...i){this.type=t,this.operator=e,this.args=i}}function o2(){return{variables:new Set,properties:new Set}}function o3(t,e){switch(typeof t){case"boolean":return new o0(oB,t);case"number":return new o0(oK,t);case"string":return new o0(oZ,t)}if(!Array.isArray(t))throw Error("Expression must be an array or a primitive value");if(0===t.length)throw Error("Empty expression");if("string"==typeof t[0])return(/**
 * @param {Array} encoded The encoded expression.
 * @param {ParsingContext} context The parsing context.
 * @return {Expression} The parsed expression.
 */function(t,e){let i=t[0],n=o4[i];if(!n)throw Error(`Unknown operator: ${i}`);return n(t,e)}(t,e));for(let e of t)if("number"!=typeof e)throw Error("Expected an array of numbers");let i=oH;return(3===t.length||4===t.length)&&(i|=oV),new o0(i,t)}let o5={Number:"number",String:"string",Get:"get",Var:"var",Any:"any",All:"all",Not:"!",Resolution:"resolution",Equal:"==",NotEqual:"!=",GreaterThan:">",GreaterThanOrEqualTo:">=",LessThan:"<",LessThanOrEqualTo:"<=",Multiply:"*",Divide:"/",Add:"+",Subtract:"-",Clamp:"clamp",Mod:"%",Pow:"^",Abs:"abs",Floor:"floor",Ceil:"ceil",Round:"round",Sin:"sin",Cos:"cos",Atan:"atan",Sqrt:"sqrt",Match:"match"},o4={[o5.Number]:o8(o6(1,1/0,oq),oK),[o5.String]:o8(o6(1,1/0,oq),oZ),[o5.Get]:o8(/**
 * @typedef {function(Array, ParsingContext):Array<Expression>} ArgValidator
 *//**
 * @type ArgValidator
 */function(t,e){if(2!==t.length)throw Error("Expected 1 argument for get operation");let i=o3(t[1],e);if(!(i instanceof o0))throw Error("Expected a literal argument for get operation");if("string"!=typeof i.value)throw Error("Expected a string argument for get operation");return e.properties.add(i.value),[i]},oq),[o5.Var]:o8(/**
 * @type ArgValidator
 */function(t,e){if(2!==t.length)throw Error("Expected 1 argument for var operation");let i=o3(t[1],e);if(!(i instanceof o0))throw Error("Expected a literal argument for var operation");if("string"!=typeof i.value)throw Error("Expected a string argument for get operation");return e.variables.add(i.value),[i]},oq),[o5.Resolution]:o8(/**
 * @type ArgValidator
 */function(t,e){let i=t[0];if(1!==t.length)throw Error(`Expected no arguments for ${i} operation`);return[]},oK),[o5.Any]:o8(o6(2,1/0,oB),oB),[o5.All]:o8(o6(2,1/0,oB),oB),[o5.Not]:o8(o6(1,1,oB),oB),[o5.Equal]:o8(o6(2,2,oq),oB),[o5.NotEqual]:o8(o6(2,2,oq),oB),[o5.GreaterThan]:o8(o6(2,2,oq),oB),[o5.GreaterThanOrEqualTo]:o8(o6(2,2,oq),oB),[o5.LessThan]:o8(o6(2,2,oq),oB),[o5.LessThanOrEqualTo]:o8(o6(2,2,oq),oB),[o5.Multiply]:o8(o6(2,1/0,oK),oK),[o5.Divide]:o8(o6(2,2,oK),oK),[o5.Add]:o8(o6(2,1/0,oK),oK),[o5.Subtract]:o8(o6(2,2,oK),oK),[o5.Clamp]:o8(o6(3,3,oK),oK),[o5.Mod]:o8(o6(2,2,oK),oK),[o5.Pow]:o8(o6(2,2,oK),oK),[o5.Abs]:o8(o6(1,1,oK),oK),[o5.Floor]:o8(o6(1,1,oK),oK),[o5.Ceil]:o8(o6(1,1,oK),oK),[o5.Round]:o8(o6(1,1,oK),oK),[o5.Sin]:o8(o6(1,1,oK),oK),[o5.Cos]:o8(o6(1,1,oK),oK),[o5.Atan]:o8(o6(1,2,oK),oK),[o5.Sqrt]:o8(o6(1,1,oK),oK),[o5.Match]:o8(o6(4,1/0,oZ|oK),oq)};/**
 * @param {number} minArgs The minimum number of arguments.
 * @param {number} maxArgs The maximum number of arguments.
 * @param {number} argType The argument type.
 * @return {ArgValidator} The argument validator
 */function o6(t,e,i){return function(n,r){let s=n[0],o=n.length-1;if(t===e){if(o!==t)throw Error(`Expected ${t} argument${1===t?"":"s"} for operation ${s}, got ${o}`)}else if(o<t||o>e)throw Error(`Expected ${t} to ${e} arguments for operation ${s}, got ${o}`);/**
     * @type {Array<Expression>}
     */let l=Array(o);for(let t=0;t<o;++t){let e=o3(n[t+1],r);if(!(i&e.type)){let n=oQ(i),r=oQ(e.type);throw Error(`Unexpected type for argument ${t} of ${s} operation : got ${n} but expected ${r}`)}l[t]=e}return l}}/**
 * @param {ArgValidator} argValidator The argument validator.
 * @param {number} returnType The return type.
 * @return {Parser} The parser.
 */function o8(t,e){return function(i,n){let r=i[0],s=t(i,n);return new o1(e,r,...s)}}/**
 * @module ol/expr/cpu
 */function o7(){return{variables:{},properties:{},resolution:NaN}}function o9(t,e,i){let n=o3(t,i);if(!(e&n.type)){let t=oQ(e),i=oQ(n.type);throw Error(`Expected expression to be of type ${t}, got ${i}`)}return(/**
 * @param {import("./expression.js").Expression} expression The expression.
 * @param {import('./expression.js').ParsingContext} context The parsing context.
 * @return {ExpressionEvaluator} The evaluator function.
 */function t(e,i){if(e instanceof o0)return function(){return e.value};let n=e.operator;switch(n){case o5.Number:case o5.String:return(/**
 * @param {import('./expression.js').CallExpression} expression The call expression.
 * @param {import('./expression.js').ParsingContext} context The parsing context.
 * @return {ExpressionEvaluator} The evaluator function.
 */function(e,i){let n=e.operator,r=e.args.length,s=Array(r);for(let n=0;n<r;++n)s[n]=t(e.args[n],i);switch(n){case o5.Number:case o5.String:return t=>{for(let e=0;e<r;++e){let i=s[e](t);if(typeof i===n)return i}throw Error(`Expected one of the values to be a ${n}`)};default:throw Error(`Unsupported assertion operator ${n}`)}}(e,i));case o5.Get:case o5.Var:return(/**
 * @param {import('./expression.js').CallExpression} expression The call expression.
 * @param {import('./expression.js').ParsingContext} context The parsing context.
 * @return {ExpressionEvaluator} The evaluator function.
 */function(t,e){let i=t.args[0];if(!(i instanceof o0))throw Error("Expected literal name");let n=i.value;if("string"!=typeof n)throw Error("Expected string name");switch(t.operator){case o5.Get:return t=>t.properties[n];case o5.Var:return t=>t.variables[n];default:throw Error(`Unsupported accessor operator ${t.operator}`)}}(e,0));case o5.Resolution:return t=>t.resolution;case o5.Any:case o5.All:case o5.Not:return(/**
 * @param {import('./expression.js').CallExpression} expression The call expression.
 * @param {import('./expression.js').ParsingContext} context The parsing context.
 * @return {BooleanEvaluator} The evaluator function.
 */function(e,i){let n=e.operator,r=e.args.length,s=Array(r);for(let n=0;n<r;++n)s[n]=t(e.args[n],i);switch(n){case o5.Any:return t=>{for(let e=0;e<r;++e)if(s[e](t))return!0;return!1};case o5.All:return t=>{for(let e=0;e<r;++e)if(!s[e](t))return!1;return!0};case o5.Not:return t=>!s[0](t);default:throw Error(`Unsupported logical operator ${n}`)}}(e,i));case o5.Equal:case o5.NotEqual:case o5.LessThan:case o5.LessThanOrEqualTo:case o5.GreaterThan:case o5.GreaterThanOrEqualTo:return(/**
 * @param {import('./expression.js').CallExpression} expression The call expression.
 * @param {import('./expression.js').ParsingContext} context The parsing context.
 * @return {BooleanEvaluator} The evaluator function.
 */function(e,i){let n=e.operator,r=t(e.args[0],i),s=t(e.args[1],i);switch(n){case o5.Equal:return t=>r(t)===s(t);case o5.NotEqual:return t=>r(t)!==s(t);case o5.LessThan:return t=>r(t)<s(t);case o5.LessThanOrEqualTo:return t=>r(t)<=s(t);case o5.GreaterThan:return t=>r(t)>s(t);case o5.GreaterThanOrEqualTo:return t=>r(t)>=s(t);default:throw Error(`Unsupported comparison operator ${n}`)}}(e,i));case o5.Multiply:case o5.Divide:case o5.Add:case o5.Subtract:case o5.Clamp:case o5.Mod:case o5.Pow:case o5.Abs:case o5.Floor:case o5.Ceil:case o5.Round:case o5.Sin:case o5.Cos:case o5.Atan:case o5.Sqrt:return(/**
 * @param {import('./expression.js').CallExpression} expression The call expression.
 * @param {import('./expression.js').ParsingContext} context The parsing context.
 * @return {NumberEvaluator} The evaluator function.
 */function(e,i){let n=e.operator,r=e.args.length,s=Array(r);for(let n=0;n<r;++n)s[n]=t(e.args[n],i);switch(n){case o5.Multiply:return t=>{let e=1;for(let i=0;i<r;++i)e*=s[i](t);return e};case o5.Divide:return t=>s[0](t)/s[1](t);case o5.Add:return t=>{let e=0;for(let i=0;i<r;++i)e+=s[i](t);return e};case o5.Subtract:return t=>s[0](t)-s[1](t);case o5.Clamp:return t=>{let e=s[0](t),i=s[1](t);if(e<i)return i;let n=s[2](t);return e>n?n:e};case o5.Mod:return t=>s[0](t)%s[1](t);case o5.Pow:return t=>Math.pow(s[0](t),s[1](t));case o5.Abs:return t=>Math.abs(s[0](t));case o5.Floor:return t=>Math.floor(s[0](t));case o5.Ceil:return t=>Math.ceil(s[0](t));case o5.Round:return t=>Math.round(s[0](t));case o5.Sin:return t=>Math.sin(s[0](t));case o5.Cos:return t=>Math.cos(s[0](t));case o5.Atan:if(2===r)return t=>Math.atan2(s[0](t),s[1](t));return t=>Math.atan(s[0](t));case o5.Sqrt:return t=>Math.sqrt(s[0](t));default:throw Error(`Unsupported numeric operator ${n}`)}}(e,i));case o5.Match:return(/**
 * @param {import('./expression.js').CallExpression} expression The call expression.
 * @param {import('./expression.js').ParsingContext} context The parsing context.
 * @return {ExpressionEvaluator} The evaluator function.
 */function(e,i){let n=e.args.length,r=Array(n);for(let s=0;s<n;++s)r[s]=t(e.args[s],i);return t=>{let e=r[0](t);for(let i=1;i<n;i+=2)if(e===r[i](t))return r[i+1](t);return r[n-1](t)}}(e,i));default:throw Error(`Unsupported operator ${n}`)}}(n,i))}/**
 * @fileoverview This module includes functions to build styles for the canvas renderer.  Building
 * is composed of two steps: parsing and compiling.  The parsing step takes an encoded expression
 * and returns an instance of one of the expression classes.  The compiling step takes the
 * expression instance and returns a function that can be evaluated to return a literal value.  The
 * evaluator function should do as little allocation and work as possible.
 *//**
 * @typedef {import("../../style/flat.js").FlatStyle} FlatStyle
 *//**
 * @typedef {import("../../expr/expression.js").EncodedExpression} EncodedExpression
 *//**
 * @typedef {import("../../expr/expression.js").ParsingContext} ParsingContext
 *//**
 * @typedef {import("../../expr/expression.js").CallExpression} CallExpression
 *//**
 * @typedef {import("../../expr/cpu.js").EvaluationContext} EvaluationContext
 *//**
 * @typedef {import("../../expr/cpu.js").ExpressionEvaluator} ExpressionEvaluator
 *//**
 * @param {EvaluationContext} context The evaluation context.
 * @return {boolean} Always true.
 */function lt(t){return!0}function le(t){let e=o2(),i=t.length,n=Array(i);for(let r=0;r<i;++r)n[r]=li(t[r],e);let r=o7(),s=Array(i);return function(t,e){r.properties=t.getPropertiesInternal(),r.resolution=e;for(let t=0;t<i;++t)s[t]=n[t](r);return s}}function li(t,e){let i=ln(t,"",e),n=lr(t,"",e),r=/**
 * @typedef {function(EvaluationContext):Text} TextEvaluator
 *//**
 * @param {FlatStyle} flatStyle The flat style.
 * @param {ParsingContext} context The parsing context.
 * @return {TextEvaluator?} A function that evaluates to a text symbolizer.
 */function(t,e){let i="text-",n=lo(t,i+"value",e);if(!n)return null;let r=ln(t,i,e),s=ln(t,i+"background-",e),o=lr(t,i,e),l=lr(t,i+"background-",e),a=lo(t,i+"font",e),h=ls(t,i+"max-angle",e),u=ls(t,i+"offset-x",e),d=ls(t,i+"offset-y",e),c=ll(t,i+"overflow",e),g=lo(t,i+"placement",e),f=ls(t,i+"repeat",e),_=ld(t,i+"scale",e),m=ll(t,i+"rotate-with-view",e),p=ls(t,i+"rotation",e),y=lo(t,i+"align",e),x=lo(t,i+"justify",e),v=lo(t,i+"baseline",e),E=lh(t,i+"padding",e),C=new iq({});return function(t){if(C.setText(n(t)),r&&C.setFill(r(t)),s&&C.setBackgroundFill(s(t)),o&&C.setStroke(o(t)),l&&C.setBackgroundStroke(l(t)),a&&C.setFont(a(t)),h&&C.setMaxAngle(h(t)),u&&C.setOffsetX(u(t)),d&&C.setOffsetY(d(t)),c&&C.setOverflow(c(t)),g){let e=g(t);if("point"!==e&&"line"!==e)throw Error("Expected point or line for text-placement");C.setPlacement(e)}if(f&&C.setRepeat(f(t)),_&&C.setScale(_(t)),m&&C.setRotateWithView(m(t)),p&&C.setRotation(p(t)),y){let e=y(t);if("left"!==e&&"center"!==e&&"right"!==e&&"end"!==e&&"start"!==e)throw Error("Expected left, right, center, start, or end for text-align");C.setTextAlign(e)}if(x){let e=x(t);if("left"!==e&&"right"!==e&&"center"!==e)throw Error("Expected left, right, or center for text-justify");C.setJustify(e)}if(v){let e=v(t);if("bottom"!==e&&"top"!==e&&"middle"!==e&&"alphabetic"!==e&&"hanging"!==e)throw Error("Expected bottom, top, middle, alphabetic, or hanging for text-baseline");C.setTextBaseline(e)}return E&&C.setPadding(E(t)),C}}(t,e),s="icon-src"in t?/**
 * @param {FlatStyle} flatStyle The flat style.
 * @param {ParsingContext} context The parsing context.
 * @return {ImageEvaluator} A function that evaluates to an image symbolizer.
 */function(t,e){let i="icon-",n=i+"src",r=lp(t[n],n),s=lu(t,i+"anchor",e),o=ld(t,i+"scale",e),l=ls(t,i+"opacity",e),a=lu(t,i+"displacement",e),h=ls(t,i+"rotation",e),u=ll(t,i+"rotate-with-view",e),d=lg(t,i+"anchor-origin"),c=lf(t,i+"anchor-x-units"),g=lf(t,i+"anchor-y-units"),f=/**
 * @param {FlatStyle} flatStyle The flat style.
 * @param {string} property The symbolizer property.
 * @return {string|Array<number>|undefined} A string or an array of color values or undefined.
 */function(t,e){let i=t[e];if(void 0!==i)return lx(i,e)}(t,i+"color"),_=/**
 * @param {FlatStyle} flatStyle The flat style.
 * @param {string} property The symbolizer property.
 * @return {string|undefined} A string or undefined.
 */function(t,e){let i=t[e];if(void 0!==i){if("string"!=typeof i)throw Error(`Expected a string for ${e}`);return i}}(t,i+"cross-origin"),m=/**
 * @param {FlatStyle} flatStyle The flat style.
 * @param {string} property The symbolizer property.
 * @return {Array<number>|undefined} An array of numbers or undefined.
 */function(t,e){let i=t[e];if(void 0!==i)return lm(i,e)}(t,i+"offset"),p=lg(t,i+"offset-origin"),y=lc(t,i+"width"),x=lc(t,i+"height"),v=/**
 * @param {FlatStyle} flatStyle The flat style.
 * @param {string} property The symbolizer property.
 * @return {import("../../size.js").Size|undefined} A size or undefined.
 */function(t,e){let i=t[e];if(void 0!==i){if("number"==typeof i)return ev(i);if(!Array.isArray(i)||2!==i.length||"number"!=typeof i[0]||"number"!=typeof i[1])throw Error(`Expected a number or size array for ${e}`);return i}}(t,i+"size"),E=l_(t,i+"declutter"),C=new ez({src:r,anchorOrigin:d,anchorXUnits:c,anchorYUnits:g,color:f,crossOrigin:_,offset:m,offsetOrigin:p,height:x,width:y,size:v,declutterMode:E});return function(t){return l&&C.setOpacity(l(t)),a&&C.setDisplacement(a(t)),h&&C.setRotation(h(t)),u&&C.setRotateWithView(u(t)),o&&C.setScale(o(t)),s&&C.setAnchor(s(t)),C}}(t,e):"shape-points"in t?/**
 * @param {FlatStyle} flatStyle The flat style.
 * @param {ParsingContext} context The parsing context.
 * @return {ImageEvaluator} A function that evaluates to an icon symbolizer.
 */function(t,e){let i="shape-",n=i+"points",r=ly(t[n],n),s=ln(t,i,e),o=lr(t,i,e),l=ld(t,i+"scale",e),a=lu(t,i+"displacement",e),h=ls(t,i+"rotation",e),u=ll(t,i+"rotate-with-view",e),d=lc(t,i+"radius"),c=lc(t,i+"radius1"),g=lc(t,i+"radius2"),f=lc(t,i+"angle"),_=l_(t,i+"declutter-mode"),m=new ij({points:r,radius:d,radius1:c,radius2:g,angle:f,declutterMode:_});return function(t){return s&&m.setFill(s(t)),o&&m.setStroke(o(t)),a&&m.setDisplacement(a(t)),h&&m.setRotation(h(t)),u&&m.setRotateWithView(u(t)),l&&m.setScale(l(t)),m}}(t,e):"circle-radius"in t?/**
 * @param {FlatStyle} flatStyle The flat style.
 * @param {ParsingContext} context The parsing context.
 * @return {ImageEvaluator} A function that evaluates to a circle symbolizer.
 */function(t,e){let i="circle-",n=ln(t,i,e),r=lr(t,i,e),s=ls(t,i+"radius",e),o=ld(t,i+"scale",e),l=lu(t,i+"displacement",e),a=ls(t,i+"rotation",e),h=ll(t,i+"rotate-with-view",e),u=l_(t,i+"declutter-mode"),d=new iB({radius:5,declutterMode:u});return function(t){return s&&d.setRadius(s(t)),n&&d.setFill(n(t)),r&&d.setStroke(r(t)),l&&d.setDisplacement(l(t)),a&&d.setRotation(a(t)),h&&d.setRotateWithView(h(t)),o&&d.setScale(o(t)),d}}(t,e):null,o=ls(t,"z-index",e),l=new iK;return function(t){let e=!0;if(i){let n=i(t);n&&(e=!1),l.setFill(n)}if(n){let i=n(t);i&&(e=!1),l.setStroke(i)}if(r){let i=r(t);i&&(e=!1),l.setText(i)}if(s){let i=s(t);i&&(e=!1),l.setImage(i)}return(o&&l.setZIndex(o(t)),e)?null:l}}/**
 * @typedef {function(EvaluationContext):Fill} FillEvaluator
 *//**
 * @param {FlatStyle} flatStyle The flat style.
 * @param {string} prefix The property prefix.
 * @param {ParsingContext} context The parsing context.
 * @return {FillEvaluator?} A function that evaluates to a fill.
 */function ln(t,e,i){let n=la(t,e+"fill-color",i);if(!n)return null;let r=new W;return function(t){let e=n(t);return"none"===e?null:(r.setColor(e),r)}}/**
 * @typedef {function(EvaluationContext):Stroke} StrokeEvaluator
 *//**
 * @param {FlatStyle} flatStyle The flat style.
 * @param {string} prefix The property prefix.
 * @param {ParsingContext} context The parsing context.
 * @return {StrokeEvaluator?} A function the evaluates to a stroke.
 */function lr(t,e,i){let n=ls(t,e+"stroke-width",i),r=la(t,e+"stroke-color",i);if(!n&&!r)return null;let s=lo(t,e+"stroke-line-cap",i),o=lo(t,e+"stroke-line-join",i),l=lh(t,e+"stroke-line-dash",i),a=ls(t,e+"stroke-line-dash-offset",i),h=ls(t,e+"stroke-miter-limit",i),u=new ip;return function(t){if(r){let e=r(t);if("none"===e)return null;u.setColor(e)}if(n&&u.setWidth(n(t)),s){let e=s(t);if("butt"!==e&&"round"!==e&&"square"!==e)throw Error("Expected butt, round, or square line cap");u.setLineCap(e)}if(o){let e=o(t);if("bevel"!==e&&"round"!==e&&"miter"!==e)throw Error("Expected bevel, round, or miter line join");u.setLineJoin(e)}return l&&u.setLineDash(l(t)),a&&u.setLineDashOffset(a(t)),h&&u.setMiterLimit(h(t)),u}}/**
 * @param {FlatStyle} flatStyle The flat style.
 * @param {string} name The property name.
 * @param {ParsingContext} context The parsing context.
 * @return {import('../../expr/cpu.js').NumberEvaluator|undefined} The expression evaluator or undefined.
 */function ls(t,e,i){if(!(e in t))return;let n=o9(t[e],oK,i);return function(t){return ly(n(t),e)}}/**
 * @param {FlatStyle} flatStyle The flat style.
 * @param {string} name The property name.
 * @param {ParsingContext} context The parsing context.
 * @return {import('../../expr/cpu.js').StringEvaluator?} The expression evaluator.
 */function lo(t,e,i){if(!(e in t))return null;let n=o9(t[e],oZ,i);return function(t){return lp(n(t),e)}}/**
 * @param {FlatStyle} flatStyle The flat style.
 * @param {string} name The property name.
 * @param {ParsingContext} context The parsing context.
 * @return {import('../../expr/cpu.js').BooleanEvaluator?} The expression evaluator.
 */function ll(t,e,i){if(!(e in t))return null;let n=o9(t[e],oB,i);return function(t){let i=n(t);if("boolean"!=typeof i)throw Error(`Expected a boolean for ${e}`);return i}}/**
 * @param {FlatStyle} flatStyle The flat style.
 * @param {string} name The property name.
 * @param {ParsingContext} context The parsing context.
 * @return {import('../../expr/cpu.js').ColorLikeEvaluator?} The expression evaluator.
 */function la(t,e,i){if(!(e in t))return null;let n=o9(t[e],oV|oZ,i);return function(t){return lx(n(t),e)}}/**
 * @param {FlatStyle} flatStyle The flat style.
 * @param {string} name The property name.
 * @param {ParsingContext} context The parsing context.
 * @return {import('../../expr/cpu.js').NumberArrayEvaluator?} The expression evaluator.
 */function lh(t,e,i){if(!(e in t))return null;let n=o9(t[e],oH,i);return function(t){return lm(n(t),e)}}/**
 * @param {FlatStyle} flatStyle The flat style.
 * @param {string} name The property name.
 * @param {ParsingContext} context The parsing context.
 * @return {import('../../expr/cpu.js').CoordinateEvaluator?} The expression evaluator.
 */function lu(t,e,i){if(!(e in t))return null;let n=o9(t[e],oH,i);return function(t){let i=lm(n(t),e);if(2!==i.length)throw Error(`Expected two numbers for ${e}`);return i}}/**
 * @param {FlatStyle} flatStyle The flat style.
 * @param {string} name The property name.
 * @param {ParsingContext} context The parsing context.
 * @return {import('../../expr/cpu.js').SizeLikeEvaluator?} The expression evaluator.
 */function ld(t,e,i){if(!(e in t))return null;let n=o9(t[e],oH|oK,i);return function(t){return(/**
 * @param {any} value The value.
 * @param {string} property The property.
 * @return {number|Array<number>} A number or an array of two numbers.
 */function(t,e){if("number"==typeof t)return t;let i=lm(t,e);if(2!==i.length)throw Error(`Expected an array of two numbers for ${e}`);return i}(n(t),e))}}/**
 * @param {FlatStyle} flatStyle The flat style.
 * @param {string} property The symbolizer property.
 * @return {number|undefined} A number or undefined.
 */function lc(t,e){let i=t[e];if(void 0!==i){if("number"!=typeof i)throw Error(`Expected a number for ${e}`);return i}}/**
 * @param {FlatStyle} flatStyle The flat style.
 * @param {string} property The symbolizer property.
 * @return {import("../../style/Icon.js").IconOrigin|undefined} An icon origin or undefined.
 */function lg(t,e){let i=t[e];if(void 0!==i){if("bottom-left"!==i&&"bottom-right"!==i&&"top-left"!==i&&"top-right"!==i)throw Error(`Expected bottom-left, bottom-right, top-left, or top-right for ${e}`);return i}}/**
 * @param {FlatStyle} flatStyle The flat style.
 * @param {string} property The symbolizer property.
 * @return {import("../../style/Icon.js").IconAnchorUnits|undefined} Icon anchor units or undefined.
 */function lf(t,e){let i=t[e];if(void 0!==i){if("pixels"!==i&&"fraction"!==i)throw Error(`Expected pixels or fraction for ${e}`);return i}}/**
 * @param {FlatStyle} flatStyle The flat style.
 * @param {string} property The symbolizer property.
 * @return {"declutter"|"obstacle"|"none"|undefined} Icon declutter mode.
 */function l_(t,e){let i=t[e];if(void 0!==i){if("string"!=typeof i)throw Error(`Expected a string for ${e}`);if("declutter"!==i&&"obstacle"!==i&&"none"!==i)throw Error(`Expected declutter, obstacle, or none for ${e}`);return i}}/**
 * @param {any} value The value.
 * @param {string} property The property.
 * @return {Array<number>} An array of numbers.
 */function lm(t,e){if(!Array.isArray(t))throw Error(`Expected an array for ${e}`);let i=t.length;for(let n=0;n<i;++n)if("number"!=typeof t[n])throw Error(`Expected an array of numbers for ${e}`);return t}/**
 * @param {any} value The value.
 * @param {string} property The property.
 * @return {string} A string.
 */function lp(t,e){if("string"!=typeof t)throw Error(`Expected a string for ${e}`);return t}/**
 * @param {any} value The value.
 * @param {string} property The property.
 * @return {number} A number.
 */function ly(t,e){if("number"!=typeof t)throw Error(`Expected a number for ${e}`);return t}/**
 * @param {any} value The value.
 * @param {string} property The property.
 * @return {Array<number>|string} A color.
 */function lx(t,e){if("string"==typeof t)return t;let i=lm(t,e),n=i.length;if(n<3||n>4)throw Error(`Expected a color with 3 or 4 values for ${e}`);return i}/**
 * @template {import("../source/Vector.js").default|import("../source/VectorTile.js").default} VectorSourceType
 * @typedef {Object} Options
 * @property {string} [className='ol-layer'] A CSS class name to set to the layer element.
 * @property {number} [opacity=1] Opacity (0, 1).
 * @property {boolean} [visible=true] Visibility.
 * @property {import("../extent.js").Extent} [extent] The bounding extent for layer rendering.  The layer will not be
 * rendered outside of this extent.
 * @property {number} [zIndex] The z-index for layer rendering.  At rendering time, the layers
 * will be ordered, first by Z-index and then by position. When `undefined`, a `zIndex` of 0 is assumed
 * for layers that are added to the map's `layers` collection, or `Infinity` when the layer's `setMap()`
 * method was used.
 * @property {number} [minResolution] The minimum resolution (inclusive) at which this layer will be
 * visible.
 * @property {number} [maxResolution] The maximum resolution (exclusive) below which this layer will
 * be visible.
 * @property {number} [minZoom] The minimum view zoom level (exclusive) above which this layer will be
 * visible.
 * @property {number} [maxZoom] The maximum view zoom level (inclusive) at which this layer will
 * be visible.
 * @property {import("../render.js").OrderFunction} [renderOrder] Render order. Function to be used when sorting
 * features before rendering. By default features are drawn in the order that they are created. Use
 * `null` to avoid the sort, but get an undefined draw order.
 * @property {number} [renderBuffer=100] The buffer in pixels around the viewport extent used by the
 * renderer when getting features from the vector source for the rendering or hit-detection.
 * Recommended value: the size of the largest symbol, line width or label.
 * @property {VectorSourceType} [source] Source.
 * @property {import("../Map.js").default} [map] Sets the layer as overlay on a map. The map will not manage
 * this layer in its layers collection, and the layer will be rendered on top. This is useful for
 * temporary layers. The standard way to add a layer to a map and have it managed by the map is to
 * use [map.addLayer()]{@link import("../Map.js").default#addLayer}.
 * @property {boolean} [declutter=false] Declutter images and text. Decluttering is applied to all
 * image and text styles of all Vector and VectorTile layers that have set this to `true`. The priority
 * is defined by the z-index of the layer, the `zIndex` of the style and the render order of features.
 * Higher z-index means higher priority. Within the same z-index, a feature rendered before another has
 * higher priority.
 *
 * As an optimization decluttered features from layers with the same `className` are rendered above
 * the fill and stroke styles of all of those layers regardless of z-index.  To opt out of this
 * behavior and place declutterd features with their own layer configure the layer with a `className`
 * other than `ol-layer`.
 * @property {import("../style/Style.js").StyleLike|import("../style/flat.js").FlatStyleLike|null} [style] Layer style. When set to `null`, only
 * features that have their own style will be rendered. See {@link module:ol/style/Style~Style} for the default style
 * which will be used if this is not set.
 * @property {import("./Base.js").BackgroundColor} [background] Background color for the layer. If not specified, no background
 * will be rendered.
 * @property {boolean} [updateWhileAnimating=false] When set to `true`, feature batches will
 * be recreated during animations. This means that no vectors will be shown clipped, but the
 * setting will have a performance impact for large amounts of vector data. When set to `false`,
 * batches will be recreated when no animation is active.
 * @property {boolean} [updateWhileInteracting=false] When set to `true`, feature batches will
 * be recreated during interactions. See also `updateWhileAnimating`.
 * @property {Object<string, *>} [properties] Arbitrary observable properties. Can be accessed with `#get()` and `#set()`.
 *//**
 * @enum {string}
 * @private
 */let lv={RENDER_ORDER:"renderOrder"};var lE=/**
 * @classdesc
 * Vector data that is rendered client-side.
 * Note that any property set in the options is set as a {@link module:ol/Object~BaseObject}
 * property on the layer object; for example, setting `title: 'My Title'` in the
 * options means that `title` is observable, and has get/set accessors.
 *
 * @template {import("../source/Vector.js").default|import("../source/VectorTile.js").default} VectorSourceType
 * @template {import("../renderer/canvas/VectorLayer.js").default|import("../renderer/canvas/VectorTileLayer.js").default|import("../renderer/canvas/VectorImageLayer.js").default|import("../renderer/webgl/PointsLayer.js").default} RendererType
 * @extends {Layer<VectorSourceType, RendererType>}
 * @api
 */class extends sa{/**
   * @param {Options<VectorSourceType>} [options] Options.
   */constructor(t){t=t||{};let e=Object.assign({},t);delete e.style,delete e.renderBuffer,delete e.updateWhileAnimating,delete e.updateWhileInteracting,super(e),/**
     * @private
     * @type {boolean}
     */this.declutter_=void 0!==t.declutter&&t.declutter,/**
     * @type {number}
     * @private
     */this.renderBuffer_=void 0!==t.renderBuffer?t.renderBuffer:100,/**
     * User provided style.
     * @type {import("../style/Style.js").StyleLike}
     * @private
     */this.style_=null,/**
     * Style function for use within the library.
     * @type {import("../style/Style.js").StyleFunction|undefined}
     * @private
     */this.styleFunction_=void 0,this.setStyle(t.style),/**
     * @type {boolean}
     * @private
     */this.updateWhileAnimating_=void 0!==t.updateWhileAnimating&&t.updateWhileAnimating,/**
     * @type {boolean}
     * @private
     */this.updateWhileInteracting_=void 0!==t.updateWhileInteracting&&t.updateWhileInteracting}/**
   * @return {boolean} Declutter.
   */getDeclutter(){return this.declutter_}/**
   * Get the topmost feature that intersects the given pixel on the viewport. Returns a promise
   * that resolves with an array of features. The array will either contain the topmost feature
   * when a hit was detected, or it will be empty.
   *
   * The hit detection algorithm used for this method is optimized for performance, but is less
   * accurate than the one used in [map.getFeaturesAtPixel()]{@link import("../Map.js").default#getFeaturesAtPixel}.
   * Text is not considered, and icons are only represented by their bounding box instead of the exact
   * image.
   *
   * @param {import("../pixel.js").Pixel} pixel Pixel.
   * @return {Promise<Array<import("../Feature").FeatureLike>>} Promise that resolves with an array of features.
   * @api
   */getFeatures(t){return super.getFeatures(t)}/**
   * @return {number|undefined} Render buffer.
   */getRenderBuffer(){return this.renderBuffer_}/**
   * @return {function(import("../Feature.js").default, import("../Feature.js").default): number|null|undefined} Render
   *     order.
   */getRenderOrder(){return /** @type {import("../render.js").OrderFunction|null|undefined} */this.get(lv.RENDER_ORDER)}/**
   * Get the style for features.  This returns whatever was passed to the `style`
   * option at construction or to the `setStyle` method.
   * @return {import("../style/Style.js").StyleLike|null|undefined} Layer style.
   * @api
   */getStyle(){return this.style_}/**
   * Get the style function.
   * @return {import("../style/Style.js").StyleFunction|undefined} Layer style function.
   * @api
   */getStyleFunction(){return this.styleFunction_}/**
   * @return {boolean} Whether the rendered layer should be updated while
   *     animating.
   */getUpdateWhileAnimating(){return this.updateWhileAnimating_}/**
   * @return {boolean} Whether the rendered layer should be updated while
   *     interacting.
   */getUpdateWhileInteracting(){return this.updateWhileInteracting_}/**
   * Render declutter items for this layer
   * @param {import("../Map.js").FrameState} frameState Frame state.
   */renderDeclutter(t){t.declutterTree||(t.declutterTree=new/*@__PURE__*/(_(s9))(9)),/** @type {*} */this.getRenderer().renderDeclutter(t)}/**
   * @param {import("../render.js").OrderFunction|null|undefined} renderOrder
   *     Render order.
   */setRenderOrder(t){this.set(lv.RENDER_ORDER,t)}/**
   * Set the style for features.  This can be a single style object, an array
   * of styles, or a function that takes a feature and resolution and returns
   * an array of styles. If set to `null`, the layer has no style (a `null` style),
   * so only features that have their own styles will be rendered in the layer. Call
   * `setStyle()` without arguments to reset to the default style. See
   * [the ol/style/Style module]{@link module:ol/style/Style~Style} for information on the default style.
   *
   * If your layer has a static style, you can use [flat style]{@link module:ol/style/flat~FlatStyle} object
   * literals instead of using the `Style` and symbolizer constructors (`Fill`, `Stroke`, etc.):
   * ```js
   * vectorLayer.setStyle({
   *   "fill-color": "yellow",
   *   "stroke-color": "black",
   *   "stroke-width": 4
   * })
   * ```
   *
   * @param {import("../style/Style.js").StyleLike|import("../style/flat.js").FlatStyleLike|null} [style] Layer style.
   * @api
   */setStyle(t){this.style_=/**
 * Coerce the allowed style types into a shorter list of types.  Flat styles, arrays of flat
 * styles, and arrays of rules are converted into style functions.
 *
 * @param {import("../style/Style.js").StyleLike|import("../style/flat.js").FlatStyleLike|null} [style] Layer style.
 * @return {import("../style/Style.js").StyleLike|null} The style.
 */function(t){if(void 0===t)return iV;if(!t)return null;if("function"==typeof t||t instanceof iK)return t;if(!Array.isArray(t))return le([t]);if(0===t.length)return[];let e=t.length,i=t[0];if(i instanceof iK){/**
     * @type {Array<Style>}
     */let i=Array(e);for(let n=0;n<e;++n){let e=t[n];if(!(e instanceof iK))throw Error("Expected a list of style instances");i[n]=e}return i}if("style"in i){/**
     * @type Array<import("../style/flat.js").Rule>
     */let i=Array(e);for(let n=0;n<e;++n){let e=t[n];if(!("style"in e))throw Error("Expected a list of rules with a style property");i[n]=e}return function(t){let e=o2(),i=function(t,e){let i=t.length,n=Array(i);for(let r=0;r<i;++r){let i;let s=t[r],o="filter"in s?o9(s.filter,oB,e):lt;if(Array.isArray(s.style)){let t=s.style.length;i=Array(t);for(let n=0;n<t;++n)i[n]=li(s.style[n],e)}else i=[li(s.style,e)];n[r]={filter:o,styles:i}}return function(e){/**
     * @type {Array<Style>}
     */let r=[],s=!1;for(let o=0;o<i;++o){let i=n[o].filter;if(i(e)&&(!t[o].else||!s))for(let t of(s=!0,n[o].styles)){let i=t(e);i&&r.push(i)}}return r}}(t,e),n=o7();return function(t,e){return n.properties=t.getPropertiesInternal(),n.resolution=e,i(n)}}(i)}return le(/** @type {Array<import("../style/flat.js").FlatStyle>} */t)}(t),this.styleFunction_=null===t?void 0:function(t){let e;if("function"==typeof t)e=t;else{/**
     * @type {Array<Style>}
     */let i;Array.isArray(t)?i=t:(z("function"==typeof /** @type {?} */t.getZIndex,"Expected an `Style` or an array of `Style`"),i=[/** @type {Style} */t]),e=function(){return i}}return e}(this.style_),this.changed()}};/**
 * @module ol/renderer/canvas/VectorLayer
 *//**
 * @module ol/render/canvas/BuilderGroup
 *//**
 * @module ol/render/canvas/Builder
 *//**
 * @module ol/render/canvas/Instruction
 *//**
 * @enum {number}
 */let lC={BEGIN_GEOMETRY:0,BEGIN_PATH:1,CIRCLE:2,CLOSE_PATH:3,CUSTOM:4,DRAW_CHARS:5,DRAW_IMAGE:6,END_GEOMETRY:7,FILL:8,MOVE_TO_LINE_TO:9,SET_FILL_STYLE:10,SET_STROKE_STYLE:11,STROKE:12},lS=[lC.FILL],lR=[lC.STROKE],lw=[lC.BEGIN_PATH],lT=[lC.CLOSE_PATH];var lI=/**
 * @module ol/render/VectorContext
 *//**
 * @classdesc
 * Context for drawing geometries.  A vector context is available on render
 * events and does not need to be constructed directly.
 * @api
 */class{/**
   * Render a geometry with a custom renderer.
   *
   * @param {import("../geom/SimpleGeometry.js").default} geometry Geometry.
   * @param {import("../Feature.js").FeatureLike} feature Feature.
   * @param {Function} renderer Renderer.
   * @param {Function} hitDetectionRenderer Renderer.
   */drawCustom(t,e,i,n){}/**
   * Render a geometry.
   *
   * @param {import("../geom/Geometry.js").default} geometry The geometry to render.
   */drawGeometry(t){}/**
   * Set the rendering style.
   *
   * @param {import("../style/Style.js").default} style The rendering style.
   */setStyle(t){}/**
   * @param {import("../geom/Circle.js").default} circleGeometry Circle geometry.
   * @param {import("../Feature.js").default} feature Feature.
   */drawCircle(t,e){}/**
   * @param {import("../Feature.js").default} feature Feature.
   * @param {import("../style/Style.js").default} style Style.
   */drawFeature(t,e){}/**
   * @param {import("../geom/GeometryCollection.js").default} geometryCollectionGeometry Geometry collection.
   * @param {import("../Feature.js").default} feature Feature.
   */drawGeometryCollection(t,e){}/**
   * @param {import("../geom/LineString.js").default|import("./Feature.js").default} lineStringGeometry Line string geometry.
   * @param {import("../Feature.js").FeatureLike} feature Feature.
   */drawLineString(t,e){}/**
   * @param {import("../geom/MultiLineString.js").default|import("./Feature.js").default} multiLineStringGeometry MultiLineString geometry.
   * @param {import("../Feature.js").FeatureLike} feature Feature.
   */drawMultiLineString(t,e){}/**
   * @param {import("../geom/MultiPoint.js").default|import("./Feature.js").default} multiPointGeometry MultiPoint geometry.
   * @param {import("../Feature.js").FeatureLike} feature Feature.
   */drawMultiPoint(t,e){}/**
   * @param {import("../geom/MultiPolygon.js").default} multiPolygonGeometry MultiPolygon geometry.
   * @param {import("../Feature.js").FeatureLike} feature Feature.
   */drawMultiPolygon(t,e){}/**
   * @param {import("../geom/Point.js").default|import("./Feature.js").default} pointGeometry Point geometry.
   * @param {import("../Feature.js").FeatureLike} feature Feature.
   */drawPoint(t,e){}/**
   * @param {import("../geom/Polygon.js").default|import("./Feature.js").default} polygonGeometry Polygon geometry.
   * @param {import("../Feature.js").FeatureLike} feature Feature.
   */drawPolygon(t,e){}/**
   * @param {import("../geom/SimpleGeometry.js").default|import("./Feature.js").default} geometry Geometry.
   * @param {import("../Feature.js").FeatureLike} feature Feature.
   */drawText(t,e){}/**
   * @param {import("../style/Fill.js").default} fillStyle Fill style.
   * @param {import("../style/Stroke.js").default} strokeStyle Stroke style.
   */setFillStrokeStyle(t,e){}/**
   * @param {import("../style/Image.js").default} imageStyle Image style.
   * @param {import("../render/canvas.js").DeclutterImageWithText} [declutterImageWithText] Shared data for combined decluttering with a text style.
   */setImageStyle(t,e){}/**
   * @param {import("../style/Text.js").default} textStyle Text style.
   * @param {import("../render/canvas.js").DeclutterImageWithText} [declutterImageWithText] Shared data for combined decluttering with an image style.
   */setTextStyle(t,e){}},lM=class extends lI{/**
   * @param {number} tolerance Tolerance.
   * @param {import("../../extent.js").Extent} maxExtent Maximum extent.
   * @param {number} resolution Resolution.
   * @param {number} pixelRatio Pixel ratio.
   */constructor(t,e,i,n){super(),/**
     * @protected
     * @type {number}
     */this.tolerance=t,/**
     * @protected
     * @const
     * @type {import("../../extent.js").Extent}
     */this.maxExtent=e,/**
     * @protected
     * @type {number}
     */this.pixelRatio=n,/**
     * @protected
     * @type {number}
     */this.maxLineWidth=0,/**
     * @protected
     * @const
     * @type {number}
     */this.resolution=i,/**
     * @private
     * @type {Array<*>}
     */this.beginGeometryInstruction1_=null,/**
     * @private
     * @type {Array<*>}
     */this.beginGeometryInstruction2_=null,/**
     * @private
     * @type {import("../../extent.js").Extent}
     */this.bufferedMaxExtent_=null,/**
     * @protected
     * @type {Array<*>}
     */this.instructions=[],/**
     * @protected
     * @type {Array<number>}
     */this.coordinates=[],/**
     * @private
     * @type {import("../../coordinate.js").Coordinate}
     */this.tmpCoordinate_=[],/**
     * @protected
     * @type {Array<*>}
     */this.hitDetectionInstructions=[],/**
     * @protected
     * @type {import("../canvas.js").FillStrokeState}
     */this.state=/** @type {import("../canvas.js").FillStrokeState} */{}}/**
   * @protected
   * @param {Array<number>} dashArray Dash array.
   * @return {Array<number>} Dash array with pixel ratio applied
   */applyPixelRatio(t){let e=this.pixelRatio;return 1==e?t:t.map(function(t){return t*e})}/**
   * @param {Array<number>} flatCoordinates Flat coordinates.
   * @param {number} stride Stride.
   * @protected
   * @return {number} My end
   */appendFlatPointCoordinates(t,e){let i=this.getBufferedMaxExtent(),n=this.tmpCoordinate_,r=this.coordinates,s=r.length;for(let o=0,l=t.length;o<l;o+=e)n[0]=t[o],n[1]=t[o+1],tl(i,n)&&(r[s++]=n[0],r[s++]=n[1]);return s}/**
   * @param {Array<number>} flatCoordinates Flat coordinates.
   * @param {number} offset Offset.
   * @param {number} end End.
   * @param {number} stride Stride.
   * @param {boolean} closed Last input coordinate equals first.
   * @param {boolean} skipFirst Skip first coordinate.
   * @protected
   * @return {number} My end.
   */appendFlatLineCoordinates(t,e,i,n,r,s){let o,l,a;let h=this.coordinates,u=h.length,d=this.getBufferedMaxExtent();s&&(e+=n);let c=t[e],g=t[e+1],f=this.tmpCoordinate_,_=!0;for(o=e+n;o<i;o+=n)f[0]=t[o],f[1]=t[o+1],(a=tu(d,f))!==l?(_&&(h[u++]=c,h[u++]=g,_=!1),h[u++]=f[0],h[u++]=f[1]):a===ti.INTERSECTING?(h[u++]=f[0],h[u++]=f[1],_=!1):_=!0,c=f[0],g=f[1],l=a;return(r&&_||o===e+n)&&(h[u++]=c,h[u++]=g),u}/**
   * @param {Array<number>} flatCoordinates Flat coordinates.
   * @param {number} offset Offset.
   * @param {Array<number>} ends Ends.
   * @param {number} stride Stride.
   * @param {Array<number>} builderEnds Builder ends.
   * @return {number} Offset.
   */drawCustomCoordinates_(t,e,i,n,r){for(let s=0,o=i.length;s<o;++s){let o=i[s],l=this.appendFlatLineCoordinates(t,e,o,n,!1,!1);r.push(l),e=o}return e}/**
   * @param {import("../../geom/SimpleGeometry.js").default} geometry Geometry.
   * @param {import("../../Feature.js").FeatureLike} feature Feature.
   * @param {Function} renderer Renderer.
   * @param {Function} hitDetectionRenderer Renderer.
   */drawCustom(t,e,i,n){let r,s,o,l,a;this.beginGeometry(t,e);let h=t.getType(),u=t.getStride(),d=this.coordinates.length;switch(h){case"MultiPolygon":r=/** @type {import("../../geom/MultiPolygon.js").default} */t.getOrientedFlatCoordinates(),l=[];let c=/** @type {import("../../geom/MultiPolygon.js").default} */t.getEndss();a=0;for(let t=0,e=c.length;t<e;++t){let e=[];a=this.drawCustomCoordinates_(r,a,c[t],u,e),l.push(e)}this.instructions.push([lC.CUSTOM,d,l,t,i,e1]),this.hitDetectionInstructions.push([lC.CUSTOM,d,l,t,n||i,e1]);break;case"Polygon":case"MultiLineString":o=[],r="Polygon"==h?/** @type {import("../../geom/Polygon.js").default} */t.getOrientedFlatCoordinates():t.getFlatCoordinates(),a=this.drawCustomCoordinates_(r,0,/** @type {import("../../geom/Polygon.js").default|import("../../geom/MultiLineString.js").default} */t.getEnds(),u,o),this.instructions.push([lC.CUSTOM,d,o,t,i,e0]),this.hitDetectionInstructions.push([lC.CUSTOM,d,o,t,n||i,e0]);break;case"LineString":case"Circle":r=t.getFlatCoordinates(),s=this.appendFlatLineCoordinates(r,0,r.length,u,!1,!1),this.instructions.push([lC.CUSTOM,d,s,t,i,eQ]),this.hitDetectionInstructions.push([lC.CUSTOM,d,s,t,n||i,eQ]);break;case"MultiPoint":r=t.getFlatCoordinates(),(s=this.appendFlatPointCoordinates(r,u))>d&&(this.instructions.push([lC.CUSTOM,d,s,t,i,eQ]),this.hitDetectionInstructions.push([lC.CUSTOM,d,s,t,n||i,eQ]));break;case"Point":r=t.getFlatCoordinates(),this.coordinates.push(r[0],r[1]),s=this.coordinates.length,this.instructions.push([lC.CUSTOM,d,s,t,i]),this.hitDetectionInstructions.push([lC.CUSTOM,d,s,t,n||i])}this.endGeometry(e)}/**
   * @protected
   * @param {import("../../geom/Geometry").default|import("../Feature.js").default} geometry The geometry.
   * @param {import("../../Feature.js").FeatureLike} feature Feature.
   */beginGeometry(t,e){this.beginGeometryInstruction1_=[lC.BEGIN_GEOMETRY,e,0,t],this.instructions.push(this.beginGeometryInstruction1_),this.beginGeometryInstruction2_=[lC.BEGIN_GEOMETRY,e,0,t],this.hitDetectionInstructions.push(this.beginGeometryInstruction2_)}/**
   * @return {import("../canvas.js").SerializableInstructions} the serializable instructions.
   */finish(){return{instructions:this.instructions,hitDetectionInstructions:this.hitDetectionInstructions,coordinates:this.coordinates}}/**
   * Reverse the hit detection instructions.
   */reverseHitDetectionInstructions(){let t,e,i;let n=this.hitDetectionInstructions;// step 1 - reverse array
n.reverse();let r=n.length,s=-1;for(t=0;t<r;++t)(i=/** @type {import("./Instruction.js").default} */(e=n[t])[0])==lC.END_GEOMETRY?s=t:i==lC.BEGIN_GEOMETRY&&(e[2]=t,function(t,e,i){for(;e<i;){let n=t[e];t[e]=t[i],t[i]=n,++e,--i}}(this.hitDetectionInstructions,s,t),s=-1)}/**
   * @param {import("../../style/Fill.js").default} fillStyle Fill style.
   * @param {import("../../style/Stroke.js").default} strokeStyle Stroke style.
   */setFillStrokeStyle(t,e){let i=this.state;if(t){let e=t.getColor();i.fillStyle=iy(e||iI)}else i.fillStyle=void 0;if(e){let t=e.getColor();i.strokeStyle=iy(t||iA);let n=e.getLineCap();i.lineCap=void 0!==n?n:iM;let r=e.getLineDash();i.lineDash=r?r.slice():iL;let s=e.getLineDashOffset();i.lineDashOffset=s||0;let o=e.getLineJoin();i.lineJoin=void 0!==o?o:ib;let l=e.getWidth();i.lineWidth=void 0!==l?l:1;let a=e.getMiterLimit();i.miterLimit=void 0!==a?a:10,i.lineWidth>this.maxLineWidth&&(this.maxLineWidth=i.lineWidth,// invalidate the buffered max extent cache
this.bufferedMaxExtent_=null)}else i.strokeStyle=void 0,i.lineCap=void 0,i.lineDash=null,i.lineDashOffset=void 0,i.lineJoin=void 0,i.lineWidth=void 0,i.miterLimit=void 0}/**
   * @param {import("../canvas.js").FillStrokeState} state State.
   * @return {Array<*>} Fill instruction.
   */createFill(t){let e=t.fillStyle,i=[lC.SET_FILL_STYLE,e];return"string"!=typeof e&&i.push(!0),i}/**
   * @param {import("../canvas.js").FillStrokeState} state State.
   */applyStroke(t){this.instructions.push(this.createStroke(t))}/**
   * @param {import("../canvas.js").FillStrokeState} state State.
   * @return {Array<*>} Stroke instruction.
   */createStroke(t){return[lC.SET_STROKE_STYLE,t.strokeStyle,t.lineWidth*this.pixelRatio,t.lineCap,t.lineJoin,t.miterLimit,this.applyPixelRatio(t.lineDash),t.lineDashOffset*this.pixelRatio]}/**
   * @param {import("../canvas.js").FillStrokeState} state State.
   * @param {function(this:CanvasBuilder, import("../canvas.js").FillStrokeState):Array<*>} createFill Create fill.
   */updateFillStyle(t,e){let i=t.fillStyle;("string"!=typeof i||t.currentFillStyle!=i)&&(void 0!==i&&this.instructions.push(e.call(this,t)),t.currentFillStyle=i)}/**
   * @param {import("../canvas.js").FillStrokeState} state State.
   * @param {function(this:CanvasBuilder, import("../canvas.js").FillStrokeState): void} applyStroke Apply stroke.
   */updateStrokeStyle(t,e){let i=t.strokeStyle,n=t.lineCap,r=t.lineDash,s=t.lineDashOffset,o=t.lineJoin,l=t.lineWidth,a=t.miterLimit;t.currentStrokeStyle==i&&t.currentLineCap==n&&(r==t.currentLineDash||C(t.currentLineDash,r))&&t.currentLineDashOffset==s&&t.currentLineJoin==o&&t.currentLineWidth==l&&t.currentMiterLimit==a||(void 0!==i&&e.call(this,t),t.currentStrokeStyle=i,t.currentLineCap=n,t.currentLineDash=r,t.currentLineDashOffset=s,t.currentLineJoin=o,t.currentLineWidth=l,t.currentMiterLimit=a)}/**
   * @param {import("../../Feature.js").FeatureLike} feature Feature.
   */endGeometry(t){this.beginGeometryInstruction1_[2]=this.instructions.length,this.beginGeometryInstruction1_=null,this.beginGeometryInstruction2_[2]=this.hitDetectionInstructions.length,this.beginGeometryInstruction2_=null;let e=[lC.END_GEOMETRY,t];this.instructions.push(e),this.hitDetectionInstructions.push(e)}/**
   * Get the buffered rendering extent.  Rendering will be clipped to the extent
   * provided to the constructor.  To account for symbolizers that may intersect
   * this extent, we calculate a buffered extent (e.g. based on stroke width).
   * @return {import("../../extent.js").Extent} The buffered rendering extent.
   * @protected
   */getBufferedMaxExtent(){if(!this.bufferedMaxExtent_&&(this.bufferedMaxExtent_=ts(this.maxExtent),this.maxLineWidth>0)){let t=this.resolution*(this.maxLineWidth+1)/2;tr(this.bufferedMaxExtent_,t,this.bufferedMaxExtent_)}return this.bufferedMaxExtent_}},lL=/**
 * @module ol/render/canvas/ImageBuilder
 */class extends lM{/**
   * @param {number} tolerance Tolerance.
   * @param {import("../../extent.js").Extent} maxExtent Maximum extent.
   * @param {number} resolution Resolution.
   * @param {number} pixelRatio Pixel ratio.
   */constructor(t,e,i,n){super(t,e,i,n),/**
     * @private
     * @type {import('../../DataTile.js').ImageLike}
     */this.hitDetectionImage_=null,/**
     * @private
     * @type {import('../../DataTile.js').ImageLike}
     */this.image_=null,/**
     * @private
     * @type {number|undefined}
     */this.imagePixelRatio_=void 0,/**
     * @private
     * @type {number|undefined}
     */this.anchorX_=void 0,/**
     * @private
     * @type {number|undefined}
     */this.anchorY_=void 0,/**
     * @private
     * @type {number|undefined}
     */this.height_=void 0,/**
     * @private
     * @type {number|undefined}
     */this.opacity_=void 0,/**
     * @private
     * @type {number|undefined}
     */this.originX_=void 0,/**
     * @private
     * @type {number|undefined}
     */this.originY_=void 0,/**
     * @private
     * @type {boolean|undefined}
     */this.rotateWithView_=void 0,/**
     * @private
     * @type {number|undefined}
     */this.rotation_=void 0,/**
     * @private
     * @type {import("../../size.js").Size|undefined}
     */this.scale_=void 0,/**
     * @private
     * @type {number|undefined}
     */this.width_=void 0,/**
     * @private
     * @type {"declutter"|"obstacle"|"none"|undefined}
     */this.declutterMode_=void 0,/**
     * Data shared with a text builder for combined decluttering.
     * @private
     * @type {import("../canvas.js").DeclutterImageWithText}
     */this.declutterImageWithText_=void 0}/**
   * @param {import("../../geom/Point.js").default|import("../Feature.js").default} pointGeometry Point geometry.
   * @param {import("../../Feature.js").FeatureLike} feature Feature.
   */drawPoint(t,e){if(!this.image_)return;this.beginGeometry(t,e);let i=t.getFlatCoordinates(),n=t.getStride(),r=this.coordinates.length,s=this.appendFlatPointCoordinates(i,n);this.instructions.push([lC.DRAW_IMAGE,r,s,this.image_,// Remaining arguments to DRAW_IMAGE are in alphabetical order
this.anchorX_*this.imagePixelRatio_,this.anchorY_*this.imagePixelRatio_,Math.ceil(this.height_*this.imagePixelRatio_),this.opacity_,this.originX_*this.imagePixelRatio_,this.originY_*this.imagePixelRatio_,this.rotateWithView_,this.rotation_,[this.scale_[0]*this.pixelRatio/this.imagePixelRatio_,this.scale_[1]*this.pixelRatio/this.imagePixelRatio_],Math.ceil(this.width_*this.imagePixelRatio_),this.declutterMode_,this.declutterImageWithText_]),this.hitDetectionInstructions.push([lC.DRAW_IMAGE,r,s,this.hitDetectionImage_,// Remaining arguments to DRAW_IMAGE are in alphabetical order
this.anchorX_,this.anchorY_,this.height_,1,this.originX_,this.originY_,this.rotateWithView_,this.rotation_,this.scale_,this.width_,this.declutterMode_,this.declutterImageWithText_]),this.endGeometry(e)}/**
   * @param {import("../../geom/MultiPoint.js").default|import("../Feature.js").default} multiPointGeometry MultiPoint geometry.
   * @param {import("../../Feature.js").FeatureLike} feature Feature.
   */drawMultiPoint(t,e){if(!this.image_)return;this.beginGeometry(t,e);let i=t.getFlatCoordinates(),n=t.getStride(),r=this.coordinates.length,s=this.appendFlatPointCoordinates(i,n);this.instructions.push([lC.DRAW_IMAGE,r,s,this.image_,// Remaining arguments to DRAW_IMAGE are in alphabetical order
this.anchorX_*this.imagePixelRatio_,this.anchorY_*this.imagePixelRatio_,Math.ceil(this.height_*this.imagePixelRatio_),this.opacity_,this.originX_*this.imagePixelRatio_,this.originY_*this.imagePixelRatio_,this.rotateWithView_,this.rotation_,[this.scale_[0]*this.pixelRatio/this.imagePixelRatio_,this.scale_[1]*this.pixelRatio/this.imagePixelRatio_],Math.ceil(this.width_*this.imagePixelRatio_),this.declutterMode_,this.declutterImageWithText_]),this.hitDetectionInstructions.push([lC.DRAW_IMAGE,r,s,this.hitDetectionImage_,// Remaining arguments to DRAW_IMAGE are in alphabetical order
this.anchorX_,this.anchorY_,this.height_,1,this.originX_,this.originY_,this.rotateWithView_,this.rotation_,this.scale_,this.width_,this.declutterMode_,this.declutterImageWithText_]),this.endGeometry(e)}/**
   * @return {import("../canvas.js").SerializableInstructions} the serializable instructions.
   */finish(){return this.reverseHitDetectionInstructions(),// FIXME this doesn't really protect us against further calls to draw*Geometry
this.anchorX_=void 0,this.anchorY_=void 0,this.hitDetectionImage_=null,this.image_=null,this.imagePixelRatio_=void 0,this.height_=void 0,this.scale_=void 0,this.opacity_=void 0,this.originX_=void 0,this.originY_=void 0,this.rotateWithView_=void 0,this.rotation_=void 0,this.width_=void 0,super.finish()}/**
   * @param {import("../../style/Image.js").default} imageStyle Image style.
   * @param {Object} [sharedData] Shared data.
   */setImageStyle(t,e){let i=t.getAnchor(),n=t.getSize(),r=t.getOrigin();this.imagePixelRatio_=t.getPixelRatio(this.pixelRatio),this.anchorX_=i[0],this.anchorY_=i[1],this.hitDetectionImage_=t.getHitDetectionImage(),this.image_=t.getImage(this.pixelRatio),this.height_=n[1],this.opacity_=t.getOpacity(),this.originX_=r[0],this.originY_=r[1],this.rotateWithView_=t.getRotateWithView(),this.rotation_=t.getRotation(),this.scale_=t.getScaleArray(),this.width_=n[0],this.declutterMode_=t.getDeclutterMode(),this.declutterImageWithText_=e}},lb=/**
 * @module ol/render/canvas/LineStringBuilder
 */class extends lM{/**
   * @param {number} tolerance Tolerance.
   * @param {import("../../extent.js").Extent} maxExtent Maximum extent.
   * @param {number} resolution Resolution.
   * @param {number} pixelRatio Pixel ratio.
   */constructor(t,e,i,n){super(t,e,i,n)}/**
   * @param {Array<number>} flatCoordinates Flat coordinates.
   * @param {number} offset Offset.
   * @param {number} end End.
   * @param {number} stride Stride.
   * @private
   * @return {number} end.
   */drawFlatCoordinates_(t,e,i,n){let r=this.coordinates.length,s=this.appendFlatLineCoordinates(t,e,i,n,!1,!1),o=[lC.MOVE_TO_LINE_TO,r,s];return this.instructions.push(o),this.hitDetectionInstructions.push(o),i}/**
   * @param {import("../../geom/LineString.js").default|import("../Feature.js").default} lineStringGeometry Line string geometry.
   * @param {import("../../Feature.js").FeatureLike} feature Feature.
   */drawLineString(t,e){let i=this.state,n=i.strokeStyle,r=i.lineWidth;if(void 0===n||void 0===r)return;this.updateStrokeStyle(i,this.applyStroke),this.beginGeometry(t,e),this.hitDetectionInstructions.push([lC.SET_STROKE_STYLE,i.strokeStyle,i.lineWidth,i.lineCap,i.lineJoin,i.miterLimit,iL,0],lw);let s=t.getFlatCoordinates(),o=t.getStride();this.drawFlatCoordinates_(s,0,s.length,o),this.hitDetectionInstructions.push(lR),this.endGeometry(e)}/**
   * @param {import("../../geom/MultiLineString.js").default|import("../Feature.js").default} multiLineStringGeometry MultiLineString geometry.
   * @param {import("../../Feature.js").FeatureLike} feature Feature.
   */drawMultiLineString(t,e){let i=this.state,n=i.strokeStyle,r=i.lineWidth;if(void 0===n||void 0===r)return;this.updateStrokeStyle(i,this.applyStroke),this.beginGeometry(t,e),this.hitDetectionInstructions.push([lC.SET_STROKE_STYLE,i.strokeStyle,i.lineWidth,i.lineCap,i.lineJoin,i.miterLimit,iL,0],lw);let s=t.getEnds(),o=t.getFlatCoordinates(),l=t.getStride(),a=0;for(let t=0,e=s.length;t<e;++t)a=this.drawFlatCoordinates_(o,a,/** @type {number} */s[t],l);this.hitDetectionInstructions.push(lR),this.endGeometry(e)}/**
   * @return {import("../canvas.js").SerializableInstructions} the serializable instructions.
   */finish(){let t=this.state;return void 0!=t.lastStroke&&t.lastStroke!=this.coordinates.length&&this.instructions.push(lR),this.reverseHitDetectionInstructions(),this.state=null,super.finish()}/**
   * @param {import("../canvas.js").FillStrokeState} state State.
   */applyStroke(t){void 0!=t.lastStroke&&t.lastStroke!=this.coordinates.length&&(this.instructions.push(lR),t.lastStroke=this.coordinates.length),t.lastStroke=0,super.applyStroke(t),this.instructions.push(lw)}},lA=/**
 * @module ol/render/canvas/PolygonBuilder
 */class extends lM{/**
   * @param {number} tolerance Tolerance.
   * @param {import("../../extent.js").Extent} maxExtent Maximum extent.
   * @param {number} resolution Resolution.
   * @param {number} pixelRatio Pixel ratio.
   */constructor(t,e,i,n){super(t,e,i,n)}/**
   * @param {Array<number>} flatCoordinates Flat coordinates.
   * @param {number} offset Offset.
   * @param {Array<number>} ends Ends.
   * @param {number} stride Stride.
   * @private
   * @return {number} End.
   */drawFlatCoordinatess_(t,e,i,n){let r=this.state,s=void 0!==r.fillStyle,o=void 0!==r.strokeStyle,l=i.length;this.instructions.push(lw),this.hitDetectionInstructions.push(lw);for(let r=0;r<l;++r){let s=i[r],l=this.coordinates.length,a=this.appendFlatLineCoordinates(t,e,s,n,!0,!o),h=[lC.MOVE_TO_LINE_TO,l,a];this.instructions.push(h),this.hitDetectionInstructions.push(h),o&&(// Performance optimization: only call closePath() when we have a stroke.
// Otherwise the ring is closed already (see appendFlatLineCoordinates above).
this.instructions.push(lT),this.hitDetectionInstructions.push(lT)),e=s}return s&&(this.instructions.push(lS),this.hitDetectionInstructions.push(lS)),o&&(this.instructions.push(lR),this.hitDetectionInstructions.push(lR)),e}/**
   * @param {import("../../geom/Circle.js").default} circleGeometry Circle geometry.
   * @param {import("../../Feature.js").default} feature Feature.
   */drawCircle(t,e){let i=this.state,n=i.fillStyle,r=i.strokeStyle;if(void 0===n&&void 0===r)return;this.setFillStrokeStyles_(),this.beginGeometry(t,e),void 0!==i.fillStyle&&this.hitDetectionInstructions.push([lC.SET_FILL_STYLE,iI]),void 0!==i.strokeStyle&&this.hitDetectionInstructions.push([lC.SET_STROKE_STYLE,i.strokeStyle,i.lineWidth,i.lineCap,i.lineJoin,i.miterLimit,iL,0]);let s=t.getFlatCoordinates(),o=t.getStride(),l=this.coordinates.length;this.appendFlatLineCoordinates(s,0,s.length,o,!1,!1);let a=[lC.CIRCLE,l];this.instructions.push(lw,a),this.hitDetectionInstructions.push(lw,a),void 0!==i.fillStyle&&(this.instructions.push(lS),this.hitDetectionInstructions.push(lS)),void 0!==i.strokeStyle&&(this.instructions.push(lR),this.hitDetectionInstructions.push(lR)),this.endGeometry(e)}/**
   * @param {import("../../geom/Polygon.js").default|import("../Feature.js").default} polygonGeometry Polygon geometry.
   * @param {import("../../Feature.js").FeatureLike} feature Feature.
   */drawPolygon(t,e){let i=this.state,n=i.fillStyle,r=i.strokeStyle;if(void 0===n&&void 0===r)return;this.setFillStrokeStyles_(),this.beginGeometry(t,e),void 0!==i.fillStyle&&this.hitDetectionInstructions.push([lC.SET_FILL_STYLE,iI]),void 0!==i.strokeStyle&&this.hitDetectionInstructions.push([lC.SET_STROKE_STYLE,i.strokeStyle,i.lineWidth,i.lineCap,i.lineJoin,i.miterLimit,iL,0]);let s=t.getEnds(),o=t.getOrientedFlatCoordinates(),l=t.getStride();this.drawFlatCoordinatess_(o,0,/** @type {Array<number>} */s,l),this.endGeometry(e)}/**
   * @param {import("../../geom/MultiPolygon.js").default} multiPolygonGeometry MultiPolygon geometry.
   * @param {import("../../Feature.js").FeatureLike} feature Feature.
   */drawMultiPolygon(t,e){let i=this.state,n=i.fillStyle,r=i.strokeStyle;if(void 0===n&&void 0===r)return;this.setFillStrokeStyles_(),this.beginGeometry(t,e),void 0!==i.fillStyle&&this.hitDetectionInstructions.push([lC.SET_FILL_STYLE,iI]),void 0!==i.strokeStyle&&this.hitDetectionInstructions.push([lC.SET_STROKE_STYLE,i.strokeStyle,i.lineWidth,i.lineCap,i.lineJoin,i.miterLimit,iL,0]);let s=t.getEndss(),o=t.getOrientedFlatCoordinates(),l=t.getStride(),a=0;for(let t=0,e=s.length;t<e;++t)a=this.drawFlatCoordinatess_(o,a,s[t],l);this.endGeometry(e)}/**
   * @return {import("../canvas.js").SerializableInstructions} the serializable instructions.
   */finish(){this.reverseHitDetectionInstructions(),this.state=null;// We want to preserve topology when drawing polygons.  Polygons are
// simplified using quantization and point elimination. However, we might
// have received a mix of quantized and non-quantized geometries, so ensure
// that all are quantized by quantizing all coordinates in the batch.
let t=this.tolerance;if(0!==t){let e=this.coordinates;for(let i=0,n=e.length;i<n;++i)e[i]=eq(e[i],t)}return super.finish()}/**
   * @private
   */setFillStrokeStyles_(){let t=this.state,e=t.fillStyle;void 0!==e&&this.updateFillStyle(t,this.createFill),void 0!==t.strokeStyle&&this.updateStrokeStyle(t,this.applyStroke)}};let lP={left:0,center:.5,right:1,top:0,middle:.5,hanging:.2,alphabetic:.8,ideographic:.8,bottom:1};var lF=class extends lM{/**
   * @param {number} tolerance Tolerance.
   * @param {import("../../extent.js").Extent} maxExtent Maximum extent.
   * @param {number} resolution Resolution.
   * @param {number} pixelRatio Pixel ratio.
   */constructor(t,e,i,n){super(t,e,i,n),/**
     * @private
     * @type {Array<HTMLCanvasElement>}
     */this.labels_=null,/**
     * @private
     * @type {string|Array<string>}
     */this.text_="",/**
     * @private
     * @type {number}
     */this.textOffsetX_=0,/**
     * @private
     * @type {number}
     */this.textOffsetY_=0,/**
     * @private
     * @type {boolean|undefined}
     */this.textRotateWithView_=void 0,/**
     * @private
     * @type {number}
     */this.textRotation_=0,/**
     * @private
     * @type {?import("../canvas.js").FillState}
     */this.textFillState_=null,/**
     * @type {!Object<string, import("../canvas.js").FillState>}
     */this.fillStates={},this.fillStates[iI]={fillStyle:iI},/**
     * @private
     * @type {?import("../canvas.js").StrokeState}
     */this.textStrokeState_=null,/**
     * @type {!Object<string, import("../canvas.js").StrokeState>}
     */this.strokeStates={},/**
     * @private
     * @type {import("../canvas.js").TextState}
     */this.textState_=/** @type {import("../canvas.js").TextState} */{},/**
     * @type {!Object<string, import("../canvas.js").TextState>}
     */this.textStates={},/**
     * @private
     * @type {string}
     */this.textKey_="",/**
     * @private
     * @type {string}
     */this.fillKey_="",/**
     * @private
     * @type {string}
     */this.strokeKey_="",/**
     * Data shared with an image builder for combined decluttering.
     * @private
     * @type {import("../canvas.js").DeclutterImageWithText}
     */this.declutterImageWithText_=void 0}/**
   * @return {import("../canvas.js").SerializableInstructions} the serializable instructions.
   */finish(){let t=super.finish();return t.textStates=this.textStates,t.fillStates=this.fillStates,t.strokeStates=this.strokeStates,t}/**
   * @param {import("../../geom/SimpleGeometry.js").default|import("../Feature.js").default} geometry Geometry.
   * @param {import("../../Feature.js").FeatureLike} feature Feature.
   */drawText(t,e){let i=this.textFillState_,n=this.textStrokeState_,r=this.textState_;if(""===this.text_||!r||!i&&!n)return;let s=this.coordinates,o=s.length,l=t.getType(),a=null,h=t.getStride();if("line"===r.placement&&("LineString"==l||"MultiLineString"==l||"Polygon"==l||"MultiPolygon"==l)){let i;if(!tA(this.getBufferedMaxExtent(),t.getExtent()))return;if(a=t.getFlatCoordinates(),"LineString"==l)i=[a.length];else if("MultiLineString"==l)i=/** @type {import("../../geom/MultiLineString.js").default} */t.getEnds();else if("Polygon"==l)i=/** @type {import("../../geom/Polygon.js").default} */t.getEnds().slice(0,1);else if("MultiPolygon"==l){let e=/** @type {import("../../geom/MultiPolygon.js").default} */t.getEndss();i=[];for(let t=0,n=e.length;t<n;++t)i.push(e[t][0])}this.beginGeometry(t,e);let n=r.repeat,u=n?void 0:r.textAlign,d=0;for(let t=0,e=i.length;t<e;++t){let e;e=n?/**
 * @module ol/render/canvas/TextBuilder
 */function(t,e,i,n,r){let s=[],o=i,l=0,a=e.slice(i,2);for(;l<t&&o+r<n;){let[i,n]=a.slice(-2),h=e[o+r],u=e[o+r+1],d=Math.sqrt((h-i)*(h-i)+(u-n)*(u-n));if((l+=d)>=t){let e=(t-l+d)/d,c=i+e*(h-i),g=n+e*(u-n);a.push(c,g),s.push(a),a=[c,g],l==t&&(o+=r),l=0}else if(l<t)a.push(e[o+r],e[o+r+1]),o+=r;else{let t=d-l,e=i+t/d*(h-i),c=n+t/d*(u-n);a.push(e,c),s.push(a),a=[e,c],l=0,o+=r}}return l>0&&s.push(a),s}(n*this.resolution,a,d,i[t],h):[a.slice(d,i[t])];for(let n=0,l=e.length;n<l;++n){let l=e[n],a=0,c=l.length;if(void 0==u){let t=/**
 * @module ol/geom/flat/straightchunk
 *//**
 * @param {number} maxAngle Maximum acceptable angle delta between segments.
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @return {Array<number>} Start and end of the first suitable chunk of the
 * given `flatCoordinates`.
 */function(t,e,i,n,r){let s,o,l,a,h,u,d,c,g,f=i,_=i,m=0,p=0,y=i;for(s=i;s<n;s+=r){let i=e[s],n=e[s+1];void 0!==a&&(l=Math.sqrt((c=i-a)*c+(g=n-h)*g),void 0!==u&&(p+=o,Math.acos((u*c+d*g)/(o*l))>t&&(p>m&&(m=p,f=y,_=s),p=0,y=s-r)),o=l,u=c,d=g),a=i,h=n}return(p+=l)>m?[y,s]:[f,_]}(r.maxAngle,l,0,l.length,2);a=t[0],c=t[1]}for(let t=a;t<c;t+=h)s.push(l[t],l[t+1]);let g=s.length;d=i[t],this.drawChars_(o,g),o=g}}this.endGeometry(e)}else{let i=r.overflow?null:[];switch(l){case"Point":case"MultiPoint":a=/** @type {import("../../geom/MultiPoint.js").default} */t.getFlatCoordinates();break;case"LineString":a=/** @type {import("../../geom/LineString.js").default} */t.getFlatMidpoint();break;case"Circle":a=/** @type {import("../../geom/Circle.js").default} */t.getCenter();break;case"MultiLineString":a=/** @type {import("../../geom/MultiLineString.js").default} */t.getFlatMidpoints(),h=2;break;case"Polygon":a=/** @type {import("../../geom/Polygon.js").default} */t.getFlatInteriorPoint(),r.overflow||i.push(a[2]/this.resolution),h=3;break;case"MultiPolygon":let n=/** @type {import("../../geom/MultiPolygon.js").default} */t.getFlatInteriorPoints();a=[];for(let t=0,e=n.length;t<e;t+=3)r.overflow||i.push(n[t+2]/this.resolution),a.push(n[t],n[t+1]);if(0===a.length)return;h=2}let u=this.appendFlatPointCoordinates(a,h);if(u===o)return;if(i&&(u-o)/2!=a.length/h){let t=o/2;i=i.filter((e,i)=>{let n=s[(t+i)*2]===a[i*h]&&s[(t+i)*2+1]===a[i*h+1];return!n&&--t,n})}this.saveTextStates_(),(r.backgroundFill||r.backgroundStroke)&&(this.setFillStrokeStyle(r.backgroundFill,r.backgroundStroke),r.backgroundFill&&this.updateFillStyle(this.state,this.createFill),r.backgroundStroke&&(this.updateStrokeStyle(this.state,this.applyStroke),this.hitDetectionInstructions.push(this.createStroke(this.state)))),this.beginGeometry(t,e);// adjust padding for negative scale
let d=r.padding;if(d!=iO&&(r.scale[0]<0||r.scale[1]<0)){let t=r.padding[0],e=r.padding[1],i=r.padding[2],n=r.padding[3];r.scale[0]<0&&(e=-e,n=-n),r.scale[1]<0&&(t=-t,i=-i),d=[t,e,i,n]}// The image is unknown at this stage so we pass null; it will be computed at render time.
// For clarity, we pass NaN for offsetX, offsetY, width and height, which will be computed at
// render time.
let c=this.pixelRatio;this.instructions.push([lC.DRAW_IMAGE,o,u,null,NaN,NaN,NaN,1,0,0,this.textRotateWithView_,this.textRotation_,[1,1],NaN,void 0,this.declutterImageWithText_,d==iO?iO:d.map(function(t){return t*c}),!!r.backgroundFill,!!r.backgroundStroke,this.text_,this.textKey_,this.strokeKey_,this.fillKey_,this.textOffsetX_,this.textOffsetY_,i]);let g=1/c,f=this.state.fillStyle;r.backgroundFill&&(this.state.fillStyle=iI,this.hitDetectionInstructions.push(this.createFill(this.state))),this.hitDetectionInstructions.push([lC.DRAW_IMAGE,o,u,null,NaN,NaN,NaN,1,0,0,this.textRotateWithView_,this.textRotation_,[g,g],NaN,void 0,this.declutterImageWithText_,d,!!r.backgroundFill,!!r.backgroundStroke,this.text_,this.textKey_,this.strokeKey_,this.fillKey_?iI:this.fillKey_,this.textOffsetX_,this.textOffsetY_,i]),r.backgroundFill&&(this.state.fillStyle=f,this.hitDetectionInstructions.push(this.createFill(this.state))),this.endGeometry(e)}}/**
   * @private
   */saveTextStates_(){let t=this.textStrokeState_,e=this.textState_,i=this.textFillState_,n=this.strokeKey_;!t||n in this.strokeStates||(this.strokeStates[n]={strokeStyle:t.strokeStyle,lineCap:t.lineCap,lineDashOffset:t.lineDashOffset,lineWidth:t.lineWidth,lineJoin:t.lineJoin,miterLimit:t.miterLimit,lineDash:t.lineDash});let r=this.textKey_;r in this.textStates||(this.textStates[r]={font:e.font,textAlign:e.textAlign||iP,justify:e.justify,textBaseline:e.textBaseline||iF,scale:e.scale});let s=this.fillKey_;!i||s in this.fillStates||(this.fillStates[s]={fillStyle:i.fillStyle})}/**
   * @private
   * @param {number} begin Begin.
   * @param {number} end End.
   */drawChars_(t,e){let i=this.textStrokeState_,n=this.textState_,r=this.strokeKey_,s=this.textKey_,o=this.fillKey_;this.saveTextStates_();let l=this.pixelRatio,a=lP[n.textBaseline],h=this.textOffsetY_*l,u=this.text_,d=i?i.lineWidth*Math.abs(n.scale[0])/2:0;this.instructions.push([lC.DRAW_CHARS,t,e,a,n.overflow,o,n.maxAngle,l,h,r,d*l,u,s,1]),this.hitDetectionInstructions.push([lC.DRAW_CHARS,t,e,a,n.overflow,o?iI:o,n.maxAngle,l,h,r,d*l,u,s,1/l])}/**
   * @param {import("../../style/Text.js").default} textStyle Text style.
   * @param {Object} [sharedData] Shared data.
   */setTextStyle(t,e){let i,n,r;if(t){let e=t.getFill();e?((n=this.textFillState_)||(n=/** @type {import("../canvas.js").FillState} */{},this.textFillState_=n),n.fillStyle=iy(e.getColor()||iI)):(n=null,this.textFillState_=n);let s=t.getStroke();if(s){(r=this.textStrokeState_)||(r=/** @type {import("../canvas.js").StrokeState} */{},this.textStrokeState_=r);let t=s.getLineDash(),e=s.getLineDashOffset(),i=s.getWidth(),n=s.getMiterLimit();r.lineCap=s.getLineCap()||iM,r.lineDash=t?t.slice():iL,r.lineDashOffset=void 0===e?0:e,r.lineJoin=s.getLineJoin()||ib,r.lineWidth=void 0===i?1:i,r.miterLimit=void 0===n?10:n,r.strokeStyle=iy(s.getColor()||iA)}else r=null,this.textStrokeState_=r;i=this.textState_;let o=t.getFont()||iT;iG(o);let l=t.getScaleArray();i.overflow=t.getOverflow(),i.font=o,i.maxAngle=t.getMaxAngle(),i.placement=t.getPlacement(),i.textAlign=t.getTextAlign(),i.repeat=t.getRepeat(),i.justify=t.getJustify(),i.textBaseline=t.getTextBaseline()||iF,i.backgroundFill=t.getBackgroundFill(),i.backgroundStroke=t.getBackgroundStroke(),i.padding=t.getPadding()||iO,i.scale=void 0===l?[1,1]:l;let a=t.getOffsetX(),h=t.getOffsetY(),u=t.getRotateWithView(),d=t.getRotation();this.text_=t.getText()||"",this.textOffsetX_=void 0===a?0:a,this.textOffsetY_=void 0===h?0:h,this.textRotateWithView_=void 0!==u&&u,this.textRotation_=void 0===d?0:d,this.strokeKey_=r?("string"==typeof r.strokeStyle?r.strokeStyle:k(r.strokeStyle))+r.lineCap+r.lineDashOffset+"|"+r.lineWidth+r.lineJoin+r.miterLimit+"["+r.lineDash.join()+"]":"",this.textKey_=i.font+i.scale+(i.textAlign||"?")+(i.repeat||"?")+(i.justify||"?")+(i.textBaseline||"?"),this.fillKey_=n?"string"==typeof n.fillStyle?n.fillStyle:"|"+k(n.fillStyle):""}else this.text_="";this.declutterImageWithText_=e}};/**
 * @type {Object<import("../canvas.js").BuilderType, typeof Builder>}
 */let lO={Circle:lA,Default:lM,Image:lL,LineString:lb,Polygon:lA,Text:lF};var lD=class{/**
   * @param {number} tolerance Tolerance.
   * @param {import("../../extent.js").Extent} maxExtent Max extent.
   * @param {number} resolution Resolution.
   * @param {number} pixelRatio Pixel ratio.
   */constructor(t,e,i,n){/**
     * @private
     * @type {number}
     */this.tolerance_=t,/**
     * @private
     * @type {import("../../extent.js").Extent}
     */this.maxExtent_=e,/**
     * @private
     * @type {number}
     */this.pixelRatio_=n,/**
     * @private
     * @type {number}
     */this.resolution_=i,/**
     * @private
     * @type {!Object<string, !Object<import("../canvas.js").BuilderType, Builder>>}
     */this.buildersByZIndex_={}}/**
   * @return {!Object<string, !Object<import("../canvas.js").BuilderType, import("./Builder.js").SerializableInstructions>>} The serializable instructions
   */finish(){let t={};for(let e in this.buildersByZIndex_){t[e]=t[e]||{};let i=this.buildersByZIndex_[e];for(let n in i){let r=i[n].finish();t[e][n]=r}}return t}/**
   * @param {number|undefined} zIndex Z index.
   * @param {import("../canvas.js").BuilderType} builderType Replay type.
   * @return {import("../VectorContext.js").default} Replay.
   */getBuilder(t,e){let i=void 0!==t?t.toString():"0",n=this.buildersByZIndex_[i];void 0===n&&(n={},this.buildersByZIndex_[i]=n);let r=n[e];if(void 0===r){let t=lO[e];r=new t(this.tolerance_,this.maxExtent_,this.resolution_,this.pixelRatio_),n[e]=r}return r}};/**
 * @typedef {Object} BBox
 * @property {number} minX Minimal x.
 * @property {number} minY Minimal y.
 * @property {number} maxX Maximal x.
 * @property {number} maxY Maximal y
 * @property {*} value Value.
 *//**
 * @typedef {Object} ImageOrLabelDimensions
 * @property {number} drawImageX DrawImageX.
 * @property {number} drawImageY DrawImageY.
 * @property {number} drawImageW DrawImageW.
 * @property {number} drawImageH DrawImageH.
 * @property {number} originX OriginX.
 * @property {number} originY OriginY.
 * @property {Array<number>} scale Scale.
 * @property {BBox} declutterBox DeclutterBox.
 * @property {import("../../transform.js").Transform} canvasTransform CanvasTransform.
 *//**
 * @typedef {{0: CanvasRenderingContext2D, 1: number, 2: import("../canvas.js").Label|HTMLImageElement|HTMLCanvasElement|HTMLVideoElement, 3: ImageOrLabelDimensions, 4: number, 5: Array<*>, 6: Array<*>}} ReplayImageOrLabelArgs
 *//**
 * @template T
 * @typedef {function(import("../../Feature.js").FeatureLike, import("../../geom/SimpleGeometry.js").default): T} FeatureCallback
 *//**
 * @type {import("../../extent.js").Extent}
 */let lk=td(),lN=[],lG=[],lz=[],lX=[];/**
 * @param {ReplayImageOrLabelArgs} replayImageOrLabelArgs Arguments to replayImageOrLabel
 * @return {BBox} Declutter bbox.
 */function lW(t){return t[3].declutterBox}let lY=RegExp(/* eslint-disable prettier/prettier */"["+String.fromCharCode(1425)+"-"+String.fromCharCode(2303)+String.fromCharCode(64285)+"-"+String.fromCharCode(65023)+String.fromCharCode(65136)+"-"+String.fromCharCode(65276)+String.fromCharCode(67584)+"-"+String.fromCharCode(69631)+String.fromCharCode(124928)+"-"+String.fromCharCode(126975)+"]");/**
 * @param {string} text Text.
 * @param {CanvasTextAlign} align Alignment.
 * @return {number} Text alignment.
 */function lU(t,e){return"start"===e?e=lY.test(t)?"right":"left":"end"===e&&(e=lY.test(t)?"left":"right"),lP[e]}/**
 * @param {Array<string>} acc Accumulator.
 * @param {string} line Line of text.
 * @param {number} i Index
 * @return {Array<string>} Accumulator.
 */function lj(t,e,i){return i>0&&t.push("\n",""),t.push(e,""),t}var lB=class{/**
   * @param {number} resolution Resolution.
   * @param {number} pixelRatio Pixel ratio.
   * @param {boolean} overlaps The replay can have overlapping geometries.
   * @param {import("../canvas.js").SerializableInstructions} instructions The serializable instructions
   */constructor(t,e,i,n){/**
     * @protected
     * @type {boolean}
     */this.overlaps=i,/**
     * @protected
     * @type {number}
     */this.pixelRatio=e,/**
     * @protected
     * @const
     * @type {number}
     */this.resolution=t,/**
     * @private
     * @type {boolean}
     */this.alignFill_,/**
     * @protected
     * @type {Array<*>}
     */this.instructions=n.instructions,/**
     * @protected
     * @type {Array<number>}
     */this.coordinates=n.coordinates,/**
     * @private
     * @type {!Object<number,import("../../coordinate.js").Coordinate|Array<import("../../coordinate.js").Coordinate>|Array<Array<import("../../coordinate.js").Coordinate>>>}
     */this.coordinateCache_={},/**
     * @private
     * @type {!import("../../transform.js").Transform}
     */this.renderedTransform_=J(),/**
     * @protected
     * @type {Array<*>}
     */this.hitDetectionInstructions=n.hitDetectionInstructions,/**
     * @private
     * @type {Array<number>}
     */this.pixelCoordinates_=null,/**
     * @private
     * @type {number}
     */this.viewRotation_=0,/**
     * @type {!Object<string, import("../canvas.js").FillState>}
     */this.fillStates=n.fillStates||{},/**
     * @type {!Object<string, import("../canvas.js").StrokeState>}
     */this.strokeStates=n.strokeStates||{},/**
     * @type {!Object<string, import("../canvas.js").TextState>}
     */this.textStates=n.textStates||{},/**
     * @private
     * @type {Object<string, Object<string, number>>}
     */this.widths_={},/**
     * @private
     * @type {Object<string, import("../canvas.js").Label>}
     */this.labels_={}}/**
   * @param {string|Array<string>} text Text.
   * @param {string} textKey Text style key.
   * @param {string} fillKey Fill style key.
   * @param {string} strokeKey Stroke style key.
   * @return {import("../canvas.js").Label} Label.
   */createLabel(t,e,i,n){let r;let s=t+e+i+n;if(this.labels_[s])return this.labels_[s];let o=n?this.strokeStates[n]:null,l=i?this.fillStates[i]:null,a=this.textStates[e],h=this.pixelRatio,u=[a.scale[0]*h,a.scale[1]*h],d=Array.isArray(t),c=a.justify?lP[a.justify]:lU(Array.isArray(t)?t[0]:t,a.textAlign||iP),g=n&&o.lineWidth?o.lineWidth:0,f=d?t:t.split("\n").reduce(lj,[]),{width:_,height:m,widths:p,heights:y,lineWidths:x}=function(t,e){let i=[],n=[],r=[],s=0,o=0,l=0,a=0;for(let h=0,u=e.length;h<=u;h+=2){let d=e[h];if("\n"===d||h===u){s=Math.max(s,o),r.push(o),o=0,l+=a;continue}let c=e[h+1]||t.font,g=iW(c,d);i.push(g),o+=g;let f=iz(c);n.push(f),a=Math.max(a,f)}return{width:s,height:l,widths:i,heights:n,lineWidths:r}}(a,f),v=_+g,E=[],C=(v+2)*u[0],S=(m+g)*u[1],R={width:C<0?Math.floor(C):Math.ceil(C),height:S<0?Math.floor(S):Math.ceil(S),contextInstructions:E};(1!=u[0]||1!=u[1])&&E.push("scale",u),n&&(E.push("strokeStyle",o.strokeStyle),E.push("lineWidth",g),E.push("lineCap",o.lineCap),E.push("lineJoin",o.lineJoin),E.push("miterLimit",o.miterLimit),E.push("setLineDash",[o.lineDash]),E.push("lineDashOffset",o.lineDashOffset)),i&&E.push("fillStyle",l.fillStyle),E.push("textBaseline","middle"),E.push("textAlign","center");let w=.5-c,T=c*v+w*g,I=[],M=[],L=0,b=0,A=0,P=0;for(let t=0,e=f.length;t<e;t+=2){let e=f[t];if("\n"===e){b+=L,L=0,T=c*v+w*g,++P;continue}let s=f[t+1]||a.font;s!==r&&(n&&I.push("font",s),i&&M.push("font",s),r=s),L=Math.max(L,y[A]);let o=[e,T+w*p[A]+c*(p[A]-x[P]),.5*(g+L)+b];T+=p[A],n&&I.push("strokeText",o),i&&M.push("fillText",o),++A}return Array.prototype.push.apply(E,I),Array.prototype.push.apply(E,M),this.labels_[s]=R,R}/**
   * @param {CanvasRenderingContext2D} context Context.
   * @param {import("../../coordinate.js").Coordinate} p1 1st point of the background box.
   * @param {import("../../coordinate.js").Coordinate} p2 2nd point of the background box.
   * @param {import("../../coordinate.js").Coordinate} p3 3rd point of the background box.
   * @param {import("../../coordinate.js").Coordinate} p4 4th point of the background box.
   * @param {Array<*>} fillInstruction Fill instruction.
   * @param {Array<*>} strokeInstruction Stroke instruction.
   */replayTextBackground_(t,e,i,n,r,s,o){t.beginPath(),t.moveTo.apply(t,e),t.lineTo.apply(t,i),t.lineTo.apply(t,n),t.lineTo.apply(t,r),t.lineTo.apply(t,e),s&&(this.alignFill_=/** @type {boolean} */s[2],this.fill_(t)),o&&(this.setStrokeStyle_(t,/** @type {Array<*>} */o),t.stroke())}/**
   * @private
   * @param {number} sheetWidth Width of the sprite sheet.
   * @param {number} sheetHeight Height of the sprite sheet.
   * @param {number} centerX X.
   * @param {number} centerY Y.
   * @param {number} width Width.
   * @param {number} height Height.
   * @param {number} anchorX Anchor X.
   * @param {number} anchorY Anchor Y.
   * @param {number} originX Origin X.
   * @param {number} originY Origin Y.
   * @param {number} rotation Rotation.
   * @param {import("../../size.js").Size} scale Scale.
   * @param {boolean} snapToPixel Snap to pixel.
   * @param {Array<number>} padding Padding.
   * @param {boolean} fillStroke Background fill or stroke.
   * @param {import("../../Feature.js").FeatureLike} feature Feature.
   * @return {ImageOrLabelDimensions} Dimensions for positioning and decluttering the image or label.
   */calculateImageOrLabelDimensions_(t,e,i,n,r,s,o,l,a,h,u,d,c,g,f,_){let m;o*=d[0],l*=d[1];let p=i-o,y=n-l,x=r+a>t?t-a:r,v=s+h>e?e-h:s,E=g[3]+x*d[0]+g[1],C=g[0]+v*d[1]+g[2],S=p-g[3],R=y-g[0];return(f||0!==u)&&(lN[0]=S,lX[0]=S,lN[1]=R,lG[1]=R,lG[0]=S+E,lz[0]=lG[0],lz[1]=R+C,lX[1]=lz[1]),0!==u?($(m=Q(J(),i,n,1,1,u,-i,-n),lN),$(m,lG),$(m,lz),$(m,lX),tc(Math.min(lN[0],lG[0],lz[0],lX[0]),Math.min(lN[1],lG[1],lz[1],lX[1]),Math.max(lN[0],lG[0],lz[0],lX[0]),Math.max(lN[1],lG[1],lz[1],lX[1]),lk)):tc(Math.min(S,S+E),Math.min(R,R+C),Math.max(S,S+E),Math.max(R,R+C),lk),c&&(p=Math.round(p),y=Math.round(y)),{drawImageX:p,drawImageY:y,drawImageW:x,drawImageH:v,originX:a,originY:h,declutterBox:{minX:lk[0],minY:lk[1],maxX:lk[2],maxY:lk[3],value:_},canvasTransform:m,scale:d}}/**
   * @private
   * @param {CanvasRenderingContext2D} context Context.
   * @param {number} contextScale Scale of the context.
   * @param {import("../canvas.js").Label|HTMLImageElement|HTMLCanvasElement|HTMLVideoElement} imageOrLabel Image.
   * @param {ImageOrLabelDimensions} dimensions Dimensions.
   * @param {number} opacity Opacity.
   * @param {Array<*>} fillInstruction Fill instruction.
   * @param {Array<*>} strokeInstruction Stroke instruction.
   * @return {boolean} The image or label was rendered.
   */replayImageOrLabel_(t,e,i,n,r,s,o){let l=!!(s||o),a=n.declutterBox,h=t.canvas,u=o?o[2]*n.scale[0]/2:0,d=a.minX-u<=h.width/e&&a.maxX+u>=0&&a.minY-u<=h.height/e&&a.maxY+u>=0;if(d){var c,g,f,_,m,p,y,x;l&&this.replayTextBackground_(t,lN,lG,lz,lX,/** @type {Array<*>} */s,/** @type {Array<*>} */o),c=n.canvasTransform,g=n.originX,f=n.originY,_=n.drawImageW,m=n.drawImageH,p=n.drawImageX,y=n.drawImageY,x=n.scale,t.save(),1!==r&&(t.globalAlpha*=r),c&&t.transform.apply(t,c),/** @type {*} */i.contextInstructions?(// label
t.translate(p,y),t.scale(x[0],x[1]),/**
 * @param {Label} label Label.
 * @param {CanvasRenderingContext2D} context Context.
 */function(t,e){let i=t.contextInstructions;for(let t=0,n=i.length;t<n;t+=2)Array.isArray(i[t+1])?e[i[t]].apply(e,i[t+1]):e[i[t]]=i[t+1]}(i,t)):x[0]<0||x[1]<0?(// flipped image
t.translate(p,y),t.scale(x[0],x[1]),t.drawImage(i,g,f,_,m,0,0,_,m)):t.drawImage(i,g,f,_,m,p,y,_*x[0],m*x[1]),t.restore()}return!0}/**
   * @private
   * @param {CanvasRenderingContext2D} context Context.
   */fill_(t){if(this.alignFill_){let e=$(this.renderedTransform_,[0,0]),i=512*this.pixelRatio;t.save(),t.translate(e[0]%i,e[1]%i),t.rotate(this.viewRotation_)}t.fill(),this.alignFill_&&t.restore()}/**
   * @private
   * @param {CanvasRenderingContext2D} context Context.
   * @param {Array<*>} instruction Instruction.
   */setStrokeStyle_(t,e){t.strokeStyle=/** @type {import("../../colorlike.js").ColorLike} */e[1],t.lineWidth=/** @type {number} */e[2],t.lineCap=/** @type {CanvasLineCap} */e[3],t.lineJoin=/** @type {CanvasLineJoin} */e[4],t.miterLimit=/** @type {number} */e[5],t.lineDashOffset=/** @type {number} */e[7],t.setLineDash(/** @type {Array<number>} */e[6])}/**
   * @private
   * @param {string|Array<string>} text The text to draw.
   * @param {string} textKey The key of the text state.
   * @param {string} strokeKey The key for the stroke state.
   * @param {string} fillKey The key for the fill state.
   * @return {{label: import("../canvas.js").Label, anchorX: number, anchorY: number}} The text image and its anchor.
   */drawLabelWithPointPlacement_(t,e,i,n){let r=this.textStates[e],s=this.createLabel(t,e,n,i),o=this.strokeStates[i],l=this.pixelRatio,a=lU(Array.isArray(t)?t[0]:t,r.textAlign||iP),h=lP[r.textBaseline||iF],u=o&&o.lineWidth?o.lineWidth:0,d=s.width/l-2*r.scale[0],c=h*s.height/l+2*(.5-h)*u;return{label:s,anchorX:a*d+2*(.5-a)*u,anchorY:c}}/**
   * @private
   * @param {CanvasRenderingContext2D} context Context.
   * @param {number} contextScale Scale of the context.
   * @param {import("../../transform.js").Transform} transform Transform.
   * @param {Array<*>} instructions Instructions array.
   * @param {boolean} snapToPixel Snap point symbols and text to integer pixels.
   * @param {FeatureCallback<T>} [featureCallback] Feature callback.
   * @param {import("../../extent.js").Extent} [hitExtent] Only check
   *     features that intersect this extent.
   * @param {import("rbush").default} [declutterTree] Declutter tree.
   * @return {T|undefined} Callback result.
   * @template T
   */execute_(t,e,i,n,r,s,o,l){let a,h,u,d,c,g,f,_,m,p,y,x,v,/** @type {import("../../Feature.js").FeatureLike} */E,S,R,w;if(this.pixelCoordinates_&&C(i,this.renderedTransform_))a=this.pixelCoordinates_;else{var T;this.pixelCoordinates_||(this.pixelCoordinates_=[]),a=ec(this.coordinates,0,this.coordinates.length,2,i,this.pixelCoordinates_),(T=this.renderedTransform_)[0]=i[0],T[1]=i[1],T[2]=i[2],T[3]=i[3],T[4]=i[4],T[5]=i[5]}let I=0,M=n.length,L=0,b=0,A=0,P=null,F=null,O=this.coordinateCache_,D=this.viewRotation_,k=Math.round(1e12*Math.atan2(-i[1],i[0]))/1e12,N=/** @type {import("../../render.js").State} */{context:t,pixelRatio:this.pixelRatio,resolution:this.resolution,rotation:D},G=this.instructions!=n||this.overlaps?0:200;// instruction index
for(;I<M;){let i=n[I],C=/** @type {import("./Instruction.js").default} */i[0];switch(C){case lC.BEGIN_GEOMETRY:E=/** @type {import("../../Feature.js").FeatureLike} */i[1],w=i[3],E.getGeometry()?void 0===o||tA(o,w.getExtent())?++I:I=/** @type {number} */i[2]+1:I=/** @type {number} */i[2];break;case lC.BEGIN_PATH:b>G&&(this.fill_(t),b=0),A>G&&(t.stroke(),A=0),b||A||(t.beginPath(),c=NaN,g=NaN),++I;break;case lC.CIRCLE:L=/** @type {number} */i[1];let T=a[L],M=a[L+1],z=a[L+2],X=a[L+3],W=z-T,Y=X-M,U=Math.sqrt(W*W+Y*Y);t.moveTo(T+U,M),t.arc(T,M,U,0,2*Math.PI,!0),++I;break;case lC.CLOSE_PATH:t.closePath(),++I;break;case lC.CUSTOM:L=/** @type {number} */i[1],h=i[2];let j=/** @type {import("../../geom/SimpleGeometry.js").default} */i[3],B=i[4],K=6==i.length?i[5]:void 0;N.geometry=j,N.feature=E,I in O||(O[I]=[]);let Z=O[I];K?K(a,L,h,2,Z):(Z[0]=a[L],Z[1]=a[L+1],Z.length=2),B(Z,N),++I;break;case lC.DRAW_IMAGE:let V,H,q,J;L=/** @type {number} */i[1],h=/** @type {number} */i[2],m=/** @type {HTMLCanvasElement|HTMLVideoElement|HTMLImageElement} */i[3],// Remaining arguments in DRAW_IMAGE are in alphabetical order
u=/** @type {number} */i[4],d=/** @type {number} */i[5];let $=/** @type {number} */i[6],Q=/** @type {number} */i[7],tt=/** @type {number} */i[8],te=/** @type {number} */i[9],ti=/** @type {boolean} */i[10],tn=/** @type {number} */i[11],tr=/** @type {import("../../size.js").Size} */i[12],ts=/** @type {number} */i[13],to=/** @type {"declutter"|"obstacle"|"none"|undefined} */i[14],tl=/** @type {import("../canvas.js").DeclutterImageWithText} */i[15];if(!m&&i.length>=20){// create label images
p=/** @type {string} */i[19],y=/** @type {string} */i[20],x=/** @type {string} */i[21],v=/** @type {string} */i[22];let t=this.drawLabelWithPointPlacement_(p,y,x,v);m=t.label,i[3]=m;let e=/** @type {number} */i[23];u=(t.anchorX-e)*this.pixelRatio,i[4]=u;let n=/** @type {number} */i[24];d=(t.anchorY-n)*this.pixelRatio,i[5]=d,$=m.height,i[6]=$,ts=m.width,i[13]=ts}i.length>25&&(V=/** @type {number} */i[25]),i.length>17?(H=/** @type {Array<number>} */i[16],q=/** @type {boolean} */i[17],J=/** @type {boolean} */i[18]):(H=iO,q=!1,J=!1),ti&&k?tn+=D:ti||k||(tn-=D);let ta=0;for(;L<h;L+=2){if(V&&V[ta++]<ts/this.pixelRatio)continue;let i=this.calculateImageOrLabelDimensions_(m.width,m.height,a[L],a[L+1],ts,$,u,d,tt,te,tn,tr,r,H,q||J,E),n=[t,e,m,i,Q,q?/** @type {Array<*>} */P:null,J?/** @type {Array<*>} */F:null];if(l){if("none"===to)continue;if("obstacle"===to){// will always be drawn, thus no collision detection, but insert as obstacle
l.insert(i.declutterBox);continue}{let t,e;if(tl){let i=h-L;if(!tl[i]){// We now have the image for an image+text combination.
tl[i]=n;continue}if(t=tl[i],delete tl[i],e=lW(t),l.collides(e))continue}if(l.collides(i.declutterBox))continue;t&&(// We now have image and text for an image+text combination.
l.insert(e),// Render the image before we render the text.
this.replayImageOrLabel_.apply(this,t)),l.insert(i.declutterBox)}}this.replayImageOrLabel_.apply(this,n)}++I;break;case lC.DRAW_CHARS:let th;let tu=/** @type {number} */i[1],td=/** @type {number} */i[2],tc=/** @type {number} */i[3],tg=/** @type {number} */i[4];v=/** @type {string} */i[5];let tf=/** @type {number} */i[6],t_=/** @type {number} */i[7],tm=/** @type {number} */i[8];x=/** @type {string} */i[9];let tp=/** @type {number} */i[10];p=/** @type {string} */i[11],y=/** @type {string} */i[12];let ty=[/** @type {number} */i[13],/** @type {number} */i[13]],tx=this.textStates[y],tv=tx.font,tE=[tx.scale[0]*t_,tx.scale[1]*t_];tv in this.widths_?th=this.widths_[tv]:(th={},this.widths_[tv]=th);let tC=e9(a,tu,td,2),tS=Math.abs(tE[0])*iY(tv,p,th);if(tg||tS<=tC){let i=this.textStates[y].textAlign,n=(tC-tS)*lU(p,i),r=/**
 * @module ol/render/canvas/ExecutorGroup
 *//**
 * @module ol/render/canvas/Executor
 *//**
 * @module ol/geom/flat/textpath
 */function(t,e,i,n,r,s,o,l,a,h,u,d){var c,g,f,_,m,p;let y,x,v=t[e],E=t[e+1],C=0,S=0,R=0,w=0;function T(){C=v,S=E,e+=n,v=t[e],E=t[e+1],w+=R,R=Math.sqrt((v-C)*(v-C)+(E-S)*(E-S))}do T();while(e<i-n&&w+R<s)let I=0===R?0:(s-w)/R,M=(c=C)+I*(v-c),L=(g=S)+I*(E-g),b=e-n,A=w,P=s+l*a(h,r,u);for(;e<i-n&&w+R<P;)T();I=0===R?0:(P-w)/R;let F=(f=C)+I*(v-f),O=(_=S)+I*(E-_);if(d){let t=[M,L,F,O];eg(t,0,4,2,d,t,t),y=t[0]>t[2]}else y=M>F;let D=Math.PI,k=[],N=b+n===e;// All on the same segment
if(e=b,R=0,w=A,v=t[e],E=t[e+1],N){T(),x=Math.atan2(E-S,v-C),y&&(x+=x>0?-D:D);let t=(F+M)/2,e=(O+L)/2;return k[0]=[t,e,(P-s)/2,x,r],k}// rendering across line segments
r=r.replace(/\n/g," ");for(let t=0,d=r.length;t<d;){T();let c=Math.atan2(E-S,v-C);if(y&&(c+=c>0?-D:D),void 0!==x){let t=c-x;if(Math.abs(t+=t>D?-2*D:t<-D?2*D:0)>o)return null}x=c;let g=t,f=0;for(;t<d;++t){let o=y?d-t-1:t,c=l*a(h,r[o],u);if(e+n<i&&w+R<s+f+c/2)break;f+=c}if(t===g)continue;let _=y?r.substring(d-g,d-t):r.substring(g,t);I=0===R?0:(s+f/2-w)/R;let M=(m=C)+I*(v-m),L=(p=S)+I*(E-p);k.push([M,L,f/2,c,_]),s+=f}return k}(a,tu,td,2,p,n,tf,Math.abs(tE[0]),iY,tv,th,k?0:this.viewRotation_);t:if(r){let i,n,s,o,a;/** @type {Array<ReplayImageOrLabelArgs>} */let h=[];if(x)for(i=0,n=r.length;i<n;++i){s=/** @type {string} */(a=r[i])[4],o=this.createLabel(s,y,"",x),u=/** @type {number} */a[2]+(tE[0]<0?-tp:tp),d=tc*o.height+(.5-tc)*2*tp*tE[1]/tE[0]-tm;let n=this.calculateImageOrLabelDimensions_(o.width,o.height,a[0],a[1],o.width,o.height,u,d,0,0,a[3],ty,!1,iO,!1,E);if(l&&l.collides(n.declutterBox))break t;h.push([t,e,o,n,1,null,null])}if(v)for(i=0,n=r.length;i<n;++i){s=/** @type {string} */(a=r[i])[4],o=this.createLabel(s,y,v,""),u=/** @type {number} */a[2],d=tc*o.height-tm;let n=this.calculateImageOrLabelDimensions_(o.width,o.height,a[0],a[1],o.width,o.height,u,d,0,0,a[3],ty,!1,iO,!1,E);if(l&&l.collides(n.declutterBox))break t;h.push([t,e,o,n,1,null,null])}l&&l.load(h.map(lW));for(let t=0,e=h.length;t<e;++t)this.replayImageOrLabel_.apply(this,h[t])}}++I;break;case lC.END_GEOMETRY:if(void 0!==s){E=/** @type {import("../../Feature.js").FeatureLike} */i[1];let t=s(E,w);if(t)return t}++I;break;case lC.FILL:G?b++:this.fill_(t),++I;break;case lC.MOVE_TO_LINE_TO:for(L=/** @type {number} */i[1],h=/** @type {number} */i[2],S=a[L],R=a[L+1],f=S+.5|0,_=R+.5|0,(f!==c||_!==g)&&(t.moveTo(S,R),c=f,g=_),L+=2;L<h;L+=2)S=a[L],R=a[L+1],f=S+.5|0,_=R+.5|0,(L==h-2||f!==c||_!==g)&&(t.lineTo(S,R),c=f,g=_);++I;break;case lC.SET_FILL_STYLE:P=i,this.alignFill_=i[2],b&&(this.fill_(t),b=0,A&&(t.stroke(),A=0)),t.fillStyle=/** @type {import("../../colorlike.js").ColorLike} */i[1],++I;break;case lC.SET_STROKE_STYLE:F=i,A&&(t.stroke(),A=0),this.setStrokeStyle_(t,/** @type {Array<*>} */i),++I;break;case lC.STROKE:G?A++:t.stroke(),++I;break;default:++I}}b&&this.fill_(t),A&&t.stroke()}/**
   * @param {CanvasRenderingContext2D} context Context.
   * @param {number} contextScale Scale of the context.
   * @param {import("../../transform.js").Transform} transform Transform.
   * @param {number} viewRotation View rotation.
   * @param {boolean} snapToPixel Snap point symbols and text to integer pixels.
   * @param {import("rbush").default} [declutterTree] Declutter tree.
   */execute(t,e,i,n,r,s){this.viewRotation_=n,this.execute_(t,e,i,this.instructions,r,void 0,void 0,s)}/**
   * @param {CanvasRenderingContext2D} context Context.
   * @param {import("../../transform.js").Transform} transform Transform.
   * @param {number} viewRotation View rotation.
   * @param {FeatureCallback<T>} [featureCallback] Feature callback.
   * @param {import("../../extent.js").Extent} [hitExtent] Only check
   *     features that intersect this extent.
   * @return {T|undefined} Callback result.
   * @template T
   */executeHitDetection(t,e,i,n,r){return this.viewRotation_=i,this.execute_(t,1,e,this.hitDetectionInstructions,!0,n,r)}};/**
 * @const
 * @type {Array<import("../canvas.js").BuilderType>}
 */let lK=["Polygon","Circle","LineString","Image","Text","Default"],lZ={};var lV=class{/**
   * @param {import("../../extent.js").Extent} maxExtent Max extent for clipping. When a
   * `maxExtent` was set on the Builder for this executor group, the same `maxExtent`
   * should be set here, unless the target context does not exceed that extent (which
   * can be the case when rendering to tiles).
   * @param {number} resolution Resolution.
   * @param {number} pixelRatio Pixel ratio.
   * @param {boolean} overlaps The executor group can have overlapping geometries.
   * @param {!Object<string, !Object<import("../canvas.js").BuilderType, import("../canvas.js").SerializableInstructions>>} allInstructions
   * The serializable instructions.
   * @param {number} [renderBuffer] Optional rendering buffer.
   */constructor(t,e,i,n,r,s){/**
     * @private
     * @type {import("../../extent.js").Extent}
     */this.maxExtent_=t,/**
     * @private
     * @type {boolean}
     */this.overlaps_=n,/**
     * @private
     * @type {number}
     */this.pixelRatio_=i,/**
     * @private
     * @type {number}
     */this.resolution_=e,/**
     * @private
     * @type {number|undefined}
     */this.renderBuffer_=s,/**
     * @private
     * @type {!Object<string, !Object<import("../canvas.js").BuilderType, import("./Executor").default>>}
     */this.executorsByZIndex_={},/**
     * @private
     * @type {CanvasRenderingContext2D}
     */this.hitDetectionContext_=null,/**
     * @private
     * @type {import("../../transform.js").Transform}
     */this.hitDetectionTransform_=J(),this.createExecutors_(r)}/**
   * @param {CanvasRenderingContext2D} context Context.
   * @param {import("../../transform.js").Transform} transform Transform.
   */clip(t,e){let i=this.getClipCoords(e);t.beginPath(),t.moveTo(i[0],i[1]),t.lineTo(i[2],i[3]),t.lineTo(i[4],i[5]),t.lineTo(i[6],i[7]),t.clip()}/**
   * Create executors and populate them using the provided instructions.
   * @private
   * @param {!Object<string, !Object<import("../canvas.js").BuilderType, import("../canvas.js").SerializableInstructions>>} allInstructions The serializable instructions
   */createExecutors_(t){for(let e in t){let i=this.executorsByZIndex_[e];void 0===i&&(i={},this.executorsByZIndex_[e]=i);let n=t[e];for(let t in n){let e=n[t];i[t]=new lB(this.resolution_,this.pixelRatio_,this.overlaps_,e)}}}/**
   * @param {Array<import("../canvas.js").BuilderType>} executors Executors.
   * @return {boolean} Has executors of the provided types.
   */hasExecutors(t){for(let e in this.executorsByZIndex_){let i=this.executorsByZIndex_[e];for(let e=0,n=t.length;e<n;++e)if(t[e]in i)return!0}return!1}/**
   * @param {import("../../coordinate.js").Coordinate} coordinate Coordinate.
   * @param {number} resolution Resolution.
   * @param {number} rotation Rotation.
   * @param {number} hitTolerance Hit tolerance in pixels.
   * @param {function(import("../../Feature.js").FeatureLike, import("../../geom/SimpleGeometry.js").default, number): T} callback Feature callback.
   * @param {Array<import("../../Feature.js").FeatureLike>} declutteredFeatures Decluttered features.
   * @return {T|undefined} Callback result.
   * @template T
   */forEachFeatureAtCoordinate(t,e,i,n,r,s){let o,l,a,h,u,d,c;n=Math.round(n);let g=2*n+1,f=Q(this.hitDetectionTransform_,n+.5,n+.5,1/e,-1/e,-i,-t[0],-t[1]),_=!this.hitDetectionContext_;_&&(this.hitDetectionContext_=eb(g,g,void 0,{willReadFrequently:!0}));let m=this.hitDetectionContext_;m.canvas.width!==g||m.canvas.height!==g?(m.canvas.width=g,m.canvas.height=g):_||m.clearRect(0,0,g,g),void 0!==this.renderBuffer_&&(tp(o=td(),t),tr(o,e*(this.renderBuffer_+n),o));let p=function(t){if(void 0!==lZ[t])return lZ[t];let e=2*t+1,i=t*t,n=Array(i+1);for(let r=0;r<=t;++r)for(let s=0;s<=t;++s){let o=r*r+s*s;if(o>i)break;let l=n[o];l||(l=[],n[o]=l),l.push(((t+r)*e+(t+s))*4+3),r>0&&l.push(((t-r)*e+(t+s))*4+3),s>0&&(l.push(((t+r)*e+(t-s))*4+3),r>0&&l.push(((t-r)*e+(t-s))*4+3))}let r=[];for(let t=0,e=n.length;t<e;++t)n[t]&&r.push(...n[t]);return lZ[t]=r,r}(n);/**
     * @param {import("../../Feature.js").FeatureLike} feature Feature.
     * @param {import("../../geom/SimpleGeometry.js").default} geometry Geometry.
     * @return {T|undefined} Callback result.
     */function y(t,e){let i=m.getImageData(0,0,g,g).data;for(let o=0,a=p.length;o<a;o++)if(i[p[o]]>0){if(!s||"Image"!==l&&"Text"!==l||s.includes(t)){let i=(p[o]-3)/4,s=n-i%g,l=n-(i/g|0),a=r(t,e,s*s+l*l);if(a)return a}m.clearRect(0,0,g,g);break}}/** @type {Array<number>} */let v=Object.keys(this.executorsByZIndex_).map(Number);for(v.sort(x),a=v.length-1;a>=0;--a){let t=v[a].toString();for(u=this.executorsByZIndex_[t],h=lK.length-1;h>=0;--h)if(void 0!==(d=u[l=lK[h]])&&(c=d.executeHitDetection(m,f,i,y,o)))return c}}/**
   * @param {import("../../transform.js").Transform} transform Transform.
   * @return {Array<number>|null} Clip coordinates.
   */getClipCoords(t){let e=this.maxExtent_;if(!e)return null;let i=e[0],n=e[1],r=e[2],s=e[3],o=[i,n,i,s,r,s,r,n];return ec(o,0,8,2,t,o),o}/**
   * @return {boolean} Is empty.
   */isEmpty(){return I(this.executorsByZIndex_)}/**
   * @param {CanvasRenderingContext2D} context Context.
   * @param {number} contextScale Scale of the context.
   * @param {import("../../transform.js").Transform} transform Transform.
   * @param {number} viewRotation View rotation.
   * @param {boolean} snapToPixel Snap point symbols and test to integer pixel.
   * @param {Array<import("../canvas.js").BuilderType>} [builderTypes] Ordered replay types to replay.
   *     Default is {@link module:ol/render/replay~ORDER}
   * @param {import("rbush").default} [declutterTree] Declutter tree.
   */execute(t,e,i,n,r,s,o){let l,a,h,u,d,c;/** @type {Array<number>} */let g=Object.keys(this.executorsByZIndex_).map(Number);for(g.sort(x),this.maxExtent_&&(t.save(),this.clip(t,i)),s=s||lK,o&&g.reverse(),l=0,a=g.length;l<a;++l){let a=g[l].toString();for(h=0,d=this.executorsByZIndex_[a],u=s.length;h<u;++h){let l=s[h];void 0!==(c=d[l])&&c.execute(t,e,i,n,r,o)}}this.maxExtent_&&t.restore()}},lH=/**
 * @module ol/render/canvas/hitdetect
 *//**
 * @module ol/render/canvas/Immediate
 */// FIXME test, especially polygons with holes and multipolygons
// FIXME need to handle large thick features (where pixel size matters)
// FIXME add offset and end to ol/geom/flat/transform~transform2D?
/**
 * @classdesc
 * A concrete subclass of {@link module:ol/render/VectorContext~VectorContext} that implements
 * direct rendering of features and geometries to an HTML5 Canvas context.
 * Instances of this class are created internally by the library and
 * provided to application code as vectorContext member of the
 * {@link module:ol/render/Event~RenderEvent} object associated with postcompose, precompose and
 * render events emitted by layers and maps.
 */class extends lI{/**
   * @param {CanvasRenderingContext2D} context Context.
   * @param {number} pixelRatio Pixel ratio.
   * @param {import("../../extent.js").Extent} extent Extent.
   * @param {import("../../transform.js").Transform} transform Transform.
   * @param {number} viewRotation View rotation.
   * @param {number} [squaredTolerance] Optional squared tolerance for simplification.
   * @param {import("../../proj.js").TransformFunction} [userTransform] Transform from user to view projection.
   */constructor(t,e,i,n,r,s,o){super(),/**
     * @private
     * @type {CanvasRenderingContext2D}
     */this.context_=t,/**
     * @private
     * @type {number}
     */this.pixelRatio_=e,/**
     * @private
     * @type {import("../../extent.js").Extent}
     */this.extent_=i,/**
     * @private
     * @type {import("../../transform.js").Transform}
     */this.transform_=n,/**
     * @private
     * @type {number}
     */this.transformRotation_=n?t0(Math.atan2(n[1],n[0]),10):0,/**
     * @private
     * @type {number}
     */this.viewRotation_=r,/**
     * @private
     * @type {number}
     */this.squaredTolerance_=s,/**
     * @private
     * @type {import("../../proj.js").TransformFunction}
     */this.userTransform_=o,/**
     * @private
     * @type {?import("../canvas.js").FillState}
     */this.contextFillState_=null,/**
     * @private
     * @type {?import("../canvas.js").StrokeState}
     */this.contextStrokeState_=null,/**
     * @private
     * @type {?import("../canvas.js").TextState}
     */this.contextTextState_=null,/**
     * @private
     * @type {?import("../canvas.js").FillState}
     */this.fillState_=null,/**
     * @private
     * @type {?import("../canvas.js").StrokeState}
     */this.strokeState_=null,/**
     * @private
     * @type {import('../../DataTile.js').ImageLike}
     */this.image_=null,/**
     * @private
     * @type {number}
     */this.imageAnchorX_=0,/**
     * @private
     * @type {number}
     */this.imageAnchorY_=0,/**
     * @private
     * @type {number}
     */this.imageHeight_=0,/**
     * @private
     * @type {number}
     */this.imageOpacity_=0,/**
     * @private
     * @type {number}
     */this.imageOriginX_=0,/**
     * @private
     * @type {number}
     */this.imageOriginY_=0,/**
     * @private
     * @type {boolean}
     */this.imageRotateWithView_=!1,/**
     * @private
     * @type {number}
     */this.imageRotation_=0,/**
     * @private
     * @type {import("../../size.js").Size}
     */this.imageScale_=[0,0],/**
     * @private
     * @type {number}
     */this.imageWidth_=0,/**
     * @private
     * @type {string}
     */this.text_="",/**
     * @private
     * @type {number}
     */this.textOffsetX_=0,/**
     * @private
     * @type {number}
     */this.textOffsetY_=0,/**
     * @private
     * @type {boolean}
     */this.textRotateWithView_=!1,/**
     * @private
     * @type {number}
     */this.textRotation_=0,/**
     * @private
     * @type {import("../../size.js").Size}
     */this.textScale_=[0,0],/**
     * @private
     * @type {?import("../canvas.js").FillState}
     */this.textFillState_=null,/**
     * @private
     * @type {?import("../canvas.js").StrokeState}
     */this.textStrokeState_=null,/**
     * @private
     * @type {?import("../canvas.js").TextState}
     */this.textState_=null,/**
     * @private
     * @type {Array<number>}
     */this.pixelCoordinates_=[],/**
     * @private
     * @type {import("../../transform.js").Transform}
     */this.tmpLocalTransform_=J()}/**
   * @param {Array<number>} flatCoordinates Flat coordinates.
   * @param {number} offset Offset.
   * @param {number} end End.
   * @param {number} stride Stride.
   * @private
   */drawImages_(t,e,i,n){if(!this.image_)return;let r=ec(t,e,i,n,this.transform_,this.pixelCoordinates_),s=this.context_,o=this.tmpLocalTransform_,l=s.globalAlpha;1!=this.imageOpacity_&&(s.globalAlpha=l*this.imageOpacity_);let a=this.imageRotation_;0===this.transformRotation_&&(a-=this.viewRotation_),this.imageRotateWithView_&&(a+=this.viewRotation_);for(let t=0,e=r.length;t<e;t+=2){let e=r[t]-this.imageAnchorX_,i=r[t+1]-this.imageAnchorY_;if(0!==a||1!=this.imageScale_[0]||1!=this.imageScale_[1]){let t=e+this.imageAnchorX_,n=i+this.imageAnchorY_;Q(o,t,n,1,1,a,-t,-n),s.save(),s.transform.apply(s,o),s.translate(t,n),s.scale(this.imageScale_[0],this.imageScale_[1]),s.drawImage(this.image_,this.imageOriginX_,this.imageOriginY_,this.imageWidth_,this.imageHeight_,-this.imageAnchorX_,-this.imageAnchorY_,this.imageWidth_,this.imageHeight_),s.restore()}else s.drawImage(this.image_,this.imageOriginX_,this.imageOriginY_,this.imageWidth_,this.imageHeight_,e,i,this.imageWidth_,this.imageHeight_)}1!=this.imageOpacity_&&(s.globalAlpha=l)}/**
   * @param {Array<number>} flatCoordinates Flat coordinates.
   * @param {number} offset Offset.
   * @param {number} end End.
   * @param {number} stride Stride.
   * @private
   */drawText_(t,e,i,n){if(!this.textState_||""===this.text_)return;this.textFillState_&&this.setContextFillState_(this.textFillState_),this.textStrokeState_&&this.setContextStrokeState_(this.textStrokeState_),this.setContextTextState_(this.textState_);let r=ec(t,e,i,n,this.transform_,this.pixelCoordinates_),s=this.context_,o=this.textRotation_;for(0===this.transformRotation_&&(o-=this.viewRotation_),this.textRotateWithView_&&(o+=this.viewRotation_);e<i;e+=n){let t=r[e]+this.textOffsetX_,i=r[e+1]+this.textOffsetY_;0!==o||1!=this.textScale_[0]||1!=this.textScale_[1]?(s.save(),s.translate(t-this.textOffsetX_,i-this.textOffsetY_),s.rotate(o),s.translate(this.textOffsetX_,this.textOffsetY_),s.scale(this.textScale_[0],this.textScale_[1]),this.textStrokeState_&&s.strokeText(this.text_,0,0),this.textFillState_&&s.fillText(this.text_,0,0),s.restore()):(this.textStrokeState_&&s.strokeText(this.text_,t,i),this.textFillState_&&s.fillText(this.text_,t,i))}}/**
   * @param {Array<number>} flatCoordinates Flat coordinates.
   * @param {number} offset Offset.
   * @param {number} end End.
   * @param {number} stride Stride.
   * @param {boolean} close Close.
   * @private
   * @return {number} end End.
   */moveToLineTo_(t,e,i,n,r){let s=this.context_,o=ec(t,e,i,n,this.transform_,this.pixelCoordinates_);s.moveTo(o[0],o[1]);let l=o.length;r&&(l-=2);for(let t=2;t<l;t+=2)s.lineTo(o[t],o[t+1]);return r&&s.closePath(),i}/**
   * @param {Array<number>} flatCoordinates Flat coordinates.
   * @param {number} offset Offset.
   * @param {Array<number>} ends Ends.
   * @param {number} stride Stride.
   * @private
   * @return {number} End.
   */drawRings_(t,e,i,n){for(let r=0,s=i.length;r<s;++r)e=this.moveToLineTo_(t,e,i[r],n,!0);return e}/**
   * Render a circle geometry into the canvas.  Rendering is immediate and uses
   * the current fill and stroke styles.
   *
   * @param {import("../../geom/Circle.js").default} geometry Circle geometry.
   * @api
   */drawCircle(t){if(this.squaredTolerance_&&(t=/** @type {import("../../geom/Circle.js").default} */t.simplifyTransformed(this.squaredTolerance_,this.userTransform_)),tA(this.extent_,t.getExtent())){if(this.fillState_||this.strokeState_){this.fillState_&&this.setContextFillState_(this.fillState_),this.strokeState_&&this.setContextStrokeState_(this.strokeState_);let e=function(t,e,i){let n=t.getFlatCoordinates();if(!n)return null;let r=t.getStride();return ec(n,0,n.length,r,e,i)}(t,this.transform_,this.pixelCoordinates_),i=e[2]-e[0],n=e[3]-e[1],r=this.context_;r.beginPath(),r.arc(e[0],e[1],Math.sqrt(i*i+n*n),0,2*Math.PI),this.fillState_&&r.fill(),this.strokeState_&&r.stroke()}""!==this.text_&&this.drawText_(t.getCenter(),0,2,2)}}/**
   * Set the rendering style.  Note that since this is an immediate rendering API,
   * any `zIndex` on the provided style will be ignored.
   *
   * @param {import("../../style/Style.js").default} style The rendering style.
   * @api
   */setStyle(t){this.setFillStrokeStyle(t.getFill(),t.getStroke()),this.setImageStyle(t.getImage()),this.setTextStyle(t.getText())}/**
   * @param {import("../../transform.js").Transform} transform Transform.
   */setTransform(t){this.transform_=t}/**
   * Render a geometry into the canvas.  Call
   * {@link module:ol/render/canvas/Immediate~CanvasImmediateRenderer#setStyle renderer.setStyle()} first to set the rendering style.
   *
   * @param {import("../../geom/Geometry.js").default|import("../Feature.js").default} geometry The geometry to render.
   * @api
   */drawGeometry(t){let e=t.getType();switch(e){case"Point":this.drawPoint(/** @type {import("../../geom/Point.js").default} */t);break;case"LineString":this.drawLineString(/** @type {import("../../geom/LineString.js").default} */t);break;case"Polygon":this.drawPolygon(/** @type {import("../../geom/Polygon.js").default} */t);break;case"MultiPoint":this.drawMultiPoint(/** @type {import("../../geom/MultiPoint.js").default} */t);break;case"MultiLineString":this.drawMultiLineString(/** @type {import("../../geom/MultiLineString.js").default} */t);break;case"MultiPolygon":this.drawMultiPolygon(/** @type {import("../../geom/MultiPolygon.js").default} */t);break;case"GeometryCollection":this.drawGeometryCollection(/** @type {import("../../geom/GeometryCollection.js").default} */t);break;case"Circle":this.drawCircle(/** @type {import("../../geom/Circle.js").default} */t)}}/**
   * Render a feature into the canvas.  Note that any `zIndex` on the provided
   * style will be ignored - features are rendered immediately in the order that
   * this method is called.  If you need `zIndex` support, you should be using an
   * {@link module:ol/layer/Vector~VectorLayer} instead.
   *
   * @param {import("../../Feature.js").default} feature Feature.
   * @param {import("../../style/Style.js").default} style Style.
   * @api
   */drawFeature(t,e){let i=e.getGeometryFunction()(t);i&&(this.setStyle(e),this.drawGeometry(i))}/**
   * Render a GeometryCollection to the canvas.  Rendering is immediate and
   * uses the current styles appropriate for each geometry in the collection.
   *
   * @param {import("../../geom/GeometryCollection.js").default} geometry Geometry collection.
   */drawGeometryCollection(t){let e=t.getGeometriesArray();for(let t=0,i=e.length;t<i;++t)this.drawGeometry(e[t])}/**
   * Render a Point geometry into the canvas.  Rendering is immediate and uses
   * the current style.
   *
   * @param {import("../../geom/Point.js").default|import("../Feature.js").default} geometry Point geometry.
   */drawPoint(t){this.squaredTolerance_&&(t=/** @type {import("../../geom/Point.js").default} */t.simplifyTransformed(this.squaredTolerance_,this.userTransform_));let e=t.getFlatCoordinates(),i=t.getStride();this.image_&&this.drawImages_(e,0,e.length,i),""!==this.text_&&this.drawText_(e,0,e.length,i)}/**
   * Render a MultiPoint geometry  into the canvas.  Rendering is immediate and
   * uses the current style.
   *
   * @param {import("../../geom/MultiPoint.js").default|import("../Feature.js").default} geometry MultiPoint geometry.
   */drawMultiPoint(t){this.squaredTolerance_&&(t=/** @type {import("../../geom/MultiPoint.js").default} */t.simplifyTransformed(this.squaredTolerance_,this.userTransform_));let e=t.getFlatCoordinates(),i=t.getStride();this.image_&&this.drawImages_(e,0,e.length,i),""!==this.text_&&this.drawText_(e,0,e.length,i)}/**
   * Render a LineString into the canvas.  Rendering is immediate and uses
   * the current style.
   *
   * @param {import("../../geom/LineString.js").default|import("../Feature.js").default} geometry LineString geometry.
   */drawLineString(t){if(this.squaredTolerance_&&(t=/** @type {import("../../geom/LineString.js").default} */t.simplifyTransformed(this.squaredTolerance_,this.userTransform_)),tA(this.extent_,t.getExtent())){if(this.strokeState_){this.setContextStrokeState_(this.strokeState_);let e=this.context_,i=t.getFlatCoordinates();e.beginPath(),this.moveToLineTo_(i,0,i.length,t.getStride(),!1),e.stroke()}if(""!==this.text_){let e=t.getFlatMidpoint();this.drawText_(e,0,2,2)}}}/**
   * Render a MultiLineString geometry into the canvas.  Rendering is immediate
   * and uses the current style.
   *
   * @param {import("../../geom/MultiLineString.js").default|import("../Feature.js").default} geometry MultiLineString geometry.
   */drawMultiLineString(t){this.squaredTolerance_&&(t=/** @type {import("../../geom/MultiLineString.js").default} */t.simplifyTransformed(this.squaredTolerance_,this.userTransform_));let e=t.getExtent();if(tA(this.extent_,e)){if(this.strokeState_){this.setContextStrokeState_(this.strokeState_);let e=this.context_,i=t.getFlatCoordinates(),n=0,r=/** @type {Array<number>} */t.getEnds(),s=t.getStride();e.beginPath();for(let t=0,e=r.length;t<e;++t)n=this.moveToLineTo_(i,n,r[t],s,!1);e.stroke()}if(""!==this.text_){let e=t.getFlatMidpoints();this.drawText_(e,0,e.length,2)}}}/**
   * Render a Polygon geometry into the canvas.  Rendering is immediate and uses
   * the current style.
   *
   * @param {import("../../geom/Polygon.js").default|import("../Feature.js").default} geometry Polygon geometry.
   */drawPolygon(t){if(this.squaredTolerance_&&(t=/** @type {import("../../geom/Polygon.js").default} */t.simplifyTransformed(this.squaredTolerance_,this.userTransform_)),tA(this.extent_,t.getExtent())){if(this.strokeState_||this.fillState_){this.fillState_&&this.setContextFillState_(this.fillState_),this.strokeState_&&this.setContextStrokeState_(this.strokeState_);let e=this.context_;e.beginPath(),this.drawRings_(t.getOrientedFlatCoordinates(),0,/** @type {Array<number>} */t.getEnds(),t.getStride()),this.fillState_&&e.fill(),this.strokeState_&&e.stroke()}if(""!==this.text_){let e=t.getFlatInteriorPoint();this.drawText_(e,0,2,2)}}}/**
   * Render MultiPolygon geometry into the canvas.  Rendering is immediate and
   * uses the current style.
   * @param {import("../../geom/MultiPolygon.js").default} geometry MultiPolygon geometry.
   */drawMultiPolygon(t){if(this.squaredTolerance_&&(t=/** @type {import("../../geom/MultiPolygon.js").default} */t.simplifyTransformed(this.squaredTolerance_,this.userTransform_)),tA(this.extent_,t.getExtent())){if(this.strokeState_||this.fillState_){this.fillState_&&this.setContextFillState_(this.fillState_),this.strokeState_&&this.setContextStrokeState_(this.strokeState_);let e=this.context_,i=t.getOrientedFlatCoordinates(),n=0,r=t.getEndss(),s=t.getStride();e.beginPath();for(let t=0,e=r.length;t<e;++t){let e=r[t];n=this.drawRings_(i,n,e,s)}this.fillState_&&e.fill(),this.strokeState_&&e.stroke()}if(""!==this.text_){let e=t.getFlatInteriorPoints();this.drawText_(e,0,e.length,2)}}}/**
   * @param {import("../canvas.js").FillState} fillState Fill state.
   * @private
   */setContextFillState_(t){let e=this.context_,i=this.contextFillState_;i?i.fillStyle!=t.fillStyle&&(i.fillStyle=t.fillStyle,e.fillStyle=t.fillStyle):(e.fillStyle=t.fillStyle,this.contextFillState_={fillStyle:t.fillStyle})}/**
   * @param {import("../canvas.js").StrokeState} strokeState Stroke state.
   * @private
   */setContextStrokeState_(t){let e=this.context_,i=this.contextStrokeState_;i?(i.lineCap!=t.lineCap&&(i.lineCap=t.lineCap,e.lineCap=t.lineCap),C(i.lineDash,t.lineDash)||e.setLineDash(i.lineDash=t.lineDash),i.lineDashOffset!=t.lineDashOffset&&(i.lineDashOffset=t.lineDashOffset,e.lineDashOffset=t.lineDashOffset),i.lineJoin!=t.lineJoin&&(i.lineJoin=t.lineJoin,e.lineJoin=t.lineJoin),i.lineWidth!=t.lineWidth&&(i.lineWidth=t.lineWidth,e.lineWidth=t.lineWidth),i.miterLimit!=t.miterLimit&&(i.miterLimit=t.miterLimit,e.miterLimit=t.miterLimit),i.strokeStyle!=t.strokeStyle&&(i.strokeStyle=t.strokeStyle,e.strokeStyle=t.strokeStyle)):(e.lineCap=t.lineCap,e.setLineDash(t.lineDash),e.lineDashOffset=t.lineDashOffset,e.lineJoin=t.lineJoin,e.lineWidth=t.lineWidth,e.miterLimit=t.miterLimit,e.strokeStyle=t.strokeStyle,this.contextStrokeState_={lineCap:t.lineCap,lineDash:t.lineDash,lineDashOffset:t.lineDashOffset,lineJoin:t.lineJoin,lineWidth:t.lineWidth,miterLimit:t.miterLimit,strokeStyle:t.strokeStyle})}/**
   * @param {import("../canvas.js").TextState} textState Text state.
   * @private
   */setContextTextState_(t){let e=this.context_,i=this.contextTextState_,n=t.textAlign?t.textAlign:iP;i?(i.font!=t.font&&(i.font=t.font,e.font=t.font),i.textAlign!=n&&(i.textAlign=n,e.textAlign=n),i.textBaseline!=t.textBaseline&&(i.textBaseline=t.textBaseline,e.textBaseline=t.textBaseline)):(e.font=t.font,e.textAlign=n,e.textBaseline=t.textBaseline,this.contextTextState_={font:t.font,textAlign:n,textBaseline:t.textBaseline})}/**
   * Set the fill and stroke style for subsequent draw operations.  To clear
   * either fill or stroke styles, pass null for the appropriate parameter.
   *
   * @param {import("../../style/Fill.js").default} fillStyle Fill style.
   * @param {import("../../style/Stroke.js").default} strokeStyle Stroke style.
   */setFillStrokeStyle(t,e){if(t){let e=t.getColor();this.fillState_={fillStyle:iy(e||iI)}}else this.fillState_=null;if(e){let t=e.getColor(),i=e.getLineCap(),n=e.getLineDash(),r=e.getLineDashOffset(),s=e.getLineJoin(),o=e.getWidth(),l=e.getMiterLimit(),a=n||iL;this.strokeState_={lineCap:void 0!==i?i:iM,lineDash:1===this.pixelRatio_?a:a.map(t=>t*this.pixelRatio_),lineDashOffset:(r||0)*this.pixelRatio_,lineJoin:void 0!==s?s:ib,lineWidth:(void 0!==o?o:1)*this.pixelRatio_,miterLimit:void 0!==l?l:10,strokeStyle:iy(t||iA)}}else this.strokeState_=null}/**
   * Set the image style for subsequent draw operations.  Pass null to remove
   * the image style.
   *
   * @param {import("../../style/Image.js").default} imageStyle Image style.
   */setImageStyle(t){let e;if(!t||!(e=t.getSize())){this.image_=null;return}let i=t.getPixelRatio(this.pixelRatio_),n=t.getAnchor(),r=t.getOrigin();this.image_=t.getImage(this.pixelRatio_),this.imageAnchorX_=n[0]*i,this.imageAnchorY_=n[1]*i,this.imageHeight_=e[1]*i,this.imageOpacity_=t.getOpacity(),this.imageOriginX_=r[0],this.imageOriginY_=r[1],this.imageRotateWithView_=t.getRotateWithView(),this.imageRotation_=t.getRotation();let s=t.getScaleArray();this.imageScale_=[s[0]*this.pixelRatio_/i,s[1]*this.pixelRatio_/i],this.imageWidth_=e[0]*i}/**
   * Set the text style for subsequent draw operations.  Pass null to
   * remove the text style.
   *
   * @param {import("../../style/Text.js").default} textStyle Text style.
   */setTextStyle(t){if(t){let e=t.getFill();if(e){let t=e.getColor();this.textFillState_={fillStyle:iy(t||iI)}}else this.textFillState_=null;let i=t.getStroke();if(i){let t=i.getColor(),e=i.getLineCap(),n=i.getLineDash(),r=i.getLineDashOffset(),s=i.getLineJoin(),o=i.getWidth(),l=i.getMiterLimit();this.textStrokeState_={lineCap:void 0!==e?e:iM,lineDash:n||iL,lineDashOffset:r||0,lineJoin:void 0!==s?s:ib,lineWidth:void 0!==o?o:1,miterLimit:void 0!==l?l:10,strokeStyle:iy(t||iA)}}else this.textStrokeState_=null;let n=t.getFont(),r=t.getOffsetX(),s=t.getOffsetY(),o=t.getRotateWithView(),l=t.getRotation(),a=t.getScaleArray(),h=t.getText(),u=t.getTextAlign(),d=t.getTextBaseline();this.textState_={font:void 0!==n?n:iT,textAlign:void 0!==u?u:iP,textBaseline:void 0!==d?d:iF},this.text_=void 0!==h?Array.isArray(h)?h.reduce((t,e,i)=>t+=i%2?" ":e,""):h:"",this.textOffsetX_=void 0!==r?this.pixelRatio_*r:0,this.textOffsetY_=void 0!==s?this.pixelRatio_*s:0,this.textRotateWithView_=void 0!==o&&o,this.textRotation_=void 0!==l?l:0,this.textScale_=[this.pixelRatio_*a[0],this.pixelRatio_*a[1]]}else this.text_=""}};/**
 * @const
 * @type {Object<import("../geom/Geometry.js").Type,
 *                function(import("../render/canvas/BuilderGroup.js").default, import("../geom/Geometry.js").default,
 *                         import("../style/Style.js").default, Object): void>}
 */let lq={Point:/**
 * @param {import("../render/canvas/BuilderGroup.js").default} builderGroup Replay group.
 * @param {import("../geom/Point.js").default|import("../render/Feature.js").default} geometry Geometry.
 * @param {import("../style/Style.js").default} style Style.
 * @param {import("../Feature.js").FeatureLike} feature Feature.
 * @param {import("../render/canvas/BuilderGroup.js").default} [declutterBuilderGroup] Builder for decluttering.
 */function(t,e,i,n,r){let s;let o=i.getImage(),l=i.getText();if(o){if(o.getImageState()!=ey.LOADED)return;let a=t;if(r){let h=o.getDeclutterMode();if("none"!==h){if(a=r,"obstacle"===h){// draw in non-declutter group:
let r=t.getBuilder(i.getZIndex(),"Image");r.setImageStyle(o,s),r.drawPoint(e,n)}else l&&l.getText()&&(s={})}}let h=a.getBuilder(i.getZIndex(),"Image");h.setImageStyle(o,s),h.drawPoint(e,n)}if(l&&l.getText()){let o=t;r&&(o=r);let a=o.getBuilder(i.getZIndex(),"Text");a.setTextStyle(l,s),a.drawText(e,n)}},LineString:/**
 * @param {import("../render/canvas/BuilderGroup.js").default} builderGroup Replay group.
 * @param {import("../geom/LineString.js").default|import("../render/Feature.js").default} geometry Geometry.
 * @param {import("../style/Style.js").default} style Style.
 * @param {import("../Feature.js").FeatureLike} feature Feature.
 * @param {import("../render/canvas/BuilderGroup.js").default} [declutterBuilderGroup] Builder for decluttering.
 */function(t,e,i,n,r){let s=i.getStroke();if(s){let r=t.getBuilder(i.getZIndex(),"LineString");r.setFillStrokeStyle(null,s),r.drawLineString(e,n)}let o=i.getText();if(o&&o.getText()){let s=(r||t).getBuilder(i.getZIndex(),"Text");s.setTextStyle(o),s.drawText(e,n)}},Polygon:/**
 * @param {import("../render/canvas/BuilderGroup.js").default} builderGroup Replay group.
 * @param {import("../geom/Polygon.js").default|import("../render/Feature.js").default} geometry Geometry.
 * @param {import("../style/Style.js").default} style Style.
 * @param {import("../Feature.js").FeatureLike} feature Feature.
 * @param {import("../render/canvas/BuilderGroup.js").default} [declutterBuilderGroup] Builder for decluttering.
 */function(t,e,i,n,r){let s=i.getFill(),o=i.getStroke();if(s||o){let r=t.getBuilder(i.getZIndex(),"Polygon");r.setFillStrokeStyle(s,o),r.drawPolygon(e,n)}let l=i.getText();if(l&&l.getText()){let s=(r||t).getBuilder(i.getZIndex(),"Text");s.setTextStyle(l),s.drawText(e,n)}},MultiPoint:/**
 * @param {import("../render/canvas/BuilderGroup.js").default} builderGroup Replay group.
 * @param {import("../geom/MultiPoint.js").default|import("../render/Feature.js").default} geometry Geometry.
 * @param {import("../style/Style.js").default} style Style.
 * @param {import("../Feature.js").FeatureLike} feature Feature.
 * @param {import("../render/canvas/BuilderGroup.js").default} [declutterBuilderGroup] Builder for decluttering.
 */function(t,e,i,n,r){let s;let o=i.getImage(),l=i.getText();if(o){if(o.getImageState()!=ey.LOADED)return;let a=t;if(r){let h=o.getDeclutterMode();if("none"!==h){if(a=r,"obstacle"===h){// draw in non-declutter group:
let r=t.getBuilder(i.getZIndex(),"Image");r.setImageStyle(o,s),r.drawMultiPoint(e,n)}else l&&l.getText()&&(s={})}}let h=a.getBuilder(i.getZIndex(),"Image");h.setImageStyle(o,s),h.drawMultiPoint(e,n)}if(l&&l.getText()){let o=t;r&&(o=r);let a=o.getBuilder(i.getZIndex(),"Text");a.setTextStyle(l,s),a.drawText(e,n)}},MultiLineString:/**
 * @param {import("../render/canvas/BuilderGroup.js").default} builderGroup Replay group.
 * @param {import("../geom/MultiLineString.js").default|import("../render/Feature.js").default} geometry Geometry.
 * @param {import("../style/Style.js").default} style Style.
 * @param {import("../Feature.js").FeatureLike} feature Feature.
 * @param {import("../render/canvas/BuilderGroup.js").default} [declutterBuilderGroup] Builder for decluttering.
 */function(t,e,i,n,r){let s=i.getStroke();if(s){let r=t.getBuilder(i.getZIndex(),"LineString");r.setFillStrokeStyle(null,s),r.drawMultiLineString(e,n)}let o=i.getText();if(o&&o.getText()){let s=(r||t).getBuilder(i.getZIndex(),"Text");s.setTextStyle(o),s.drawText(e,n)}},MultiPolygon:/**
 * @param {import("../render/canvas/BuilderGroup.js").default} builderGroup Replay group.
 * @param {import("../geom/MultiPolygon.js").default} geometry Geometry.
 * @param {import("../style/Style.js").default} style Style.
 * @param {import("../Feature.js").default} feature Feature.
 * @param {import("../render/canvas/BuilderGroup.js").default} [declutterBuilderGroup] Builder for decluttering.
 */function(t,e,i,n,r){let s=i.getFill(),o=i.getStroke();if(o||s){let r=t.getBuilder(i.getZIndex(),"Polygon");r.setFillStrokeStyle(s,o),r.drawMultiPolygon(e,n)}let l=i.getText();if(l&&l.getText()){let s=(r||t).getBuilder(i.getZIndex(),"Text");s.setTextStyle(l),s.drawText(e,n)}},GeometryCollection:/**
 * @param {import("../render/canvas/BuilderGroup.js").default} replayGroup Replay group.
 * @param {import("../geom/GeometryCollection.js").default} geometry Geometry.
 * @param {import("../style/Style.js").default} style Style.
 * @param {import("../Feature.js").default} feature Feature.
 * @param {import("../render/canvas/BuilderGroup.js").default} [declutterBuilderGroup] Builder for decluttering.
 */function(t,e,i,n,r){let s,o;let l=e.getGeometriesArray();for(s=0,o=l.length;s<o;++s){let e=lq[l[s].getType()];e(t,l[s],i,n,r)}},Circle:/**
 * @param {import("../render/canvas/BuilderGroup.js").default} builderGroup Builder group.
 * @param {import("../geom/Circle.js").default} geometry Geometry.
 * @param {import("../style/Style.js").default} style Style.
 * @param {import("../Feature.js").default} feature Feature.
 * @param {import("../render/canvas/BuilderGroup.js").default} [declutterBuilderGroup] Builder for decluttering.
 */function(t,e,i,n,r){let s=i.getFill(),o=i.getStroke();if(s||o){let r=t.getBuilder(i.getZIndex(),"Circle");r.setFillStrokeStyle(s,o),r.drawCircle(e,n)}let l=i.getText();if(l&&l.getText()){let s=(r||t).getBuilder(i.getZIndex(),"Text");s.setTextStyle(l),s.drawText(e,n)}}};function lJ(t,e){return parseInt(k(t),10)-parseInt(k(e),10)}function l$(t,e,i,n,r,s,o){let l=!1,a=i.getImage();if(a){let t=a.getImageState();t==ey.LOADED||t==ey.ERROR?a.unlistenImageChange(r):(t==ey.IDLE&&a.load(),a.listenImageChange(r),l=!0)}return(/**
 * @param {import("../render/canvas/BuilderGroup.js").default} replayGroup Replay group.
 * @param {import("../Feature.js").FeatureLike} feature Feature.
 * @param {import("../style/Style.js").default} style Style.
 * @param {number} squaredTolerance Squared tolerance.
 * @param {import("../proj.js").TransformFunction} [transform] Optional transform function.
 * @param {import("../render/canvas/BuilderGroup.js").default} [declutterBuilderGroup] Builder for decluttering.
 */function(t,e,i,n,r,s){let o=i.getGeometryFunction()(e);if(!o)return;let l=o.simplifyTransformed(n,r),a=i.getRenderer();if(a)/**
 * @param {import("../render/canvas/BuilderGroup.js").default} replayGroup Replay group.
 * @param {import("../geom/Geometry.js").default|import("../render/Feature.js").default} geometry Geometry.
 * @param {import("../style/Style.js").default} style Style.
 * @param {import("../Feature.js").FeatureLike} feature Feature.
 */(function t(e,i,n,r){if("GeometryCollection"==i.getType()){let s=/** @type {import("../geom/GeometryCollection.js").default} */i.getGeometries();for(let i=0,o=s.length;i<o;++i)t(e,s[i],n,r);return}let s=e.getBuilder(n.getZIndex(),"Default");s.drawCustom(/** @type {import("../geom/SimpleGeometry.js").default} */i,r,n.getRenderer(),n.getHitDetectionRenderer())})(t,l,i,e);else{let n=lq[l.getType()];n(t,l,i,e,s)}}(t,e,i,n,s,o),l)}var lQ=/**
 * @classdesc
 * Canvas renderer for vector layers.
 * @api
 */class extends oW{/**
   * @param {import("../../layer/BaseVector.js").default} vectorLayer Vector layer.
   */constructor(t){super(t),/** @private */this.boundHandleStyleImageChange_=this.handleStyleImageChange_.bind(this),/**
     * @type {boolean}
     */this.animatingOrInteracting_,/**
     * @type {ImageData|null}
     */this.hitDetectionImageData_=null,/**
     * @type {Array<import("../../Feature.js").default>}
     */this.renderedFeatures_=null,/**
     * @private
     * @type {number}
     */this.renderedRevision_=-1,/**
     * @private
     * @type {number}
     */this.renderedResolution_=NaN,/**
     * @private
     * @type {import("../../extent.js").Extent}
     */this.renderedExtent_=td(),/**
     * @private
     * @type {import("../../extent.js").Extent}
     */this.wrappedRenderedExtent_=td(),/**
     * @private
     * @type {number}
     */this.renderedRotation_,/**
     * @private
     * @type {import("../../coordinate").Coordinate}
     */this.renderedCenter_=null,/**
     * @private
     * @type {import("../../proj/Projection").default}
     */this.renderedProjection_=null,/**
     * @private
     * @type {function(import("../../Feature.js").default, import("../../Feature.js").default): number|null}
     */this.renderedRenderOrder_=null,/**
     * @private
     * @type {import("../../render/canvas/ExecutorGroup").default}
     */this.replayGroup_=null,/**
     * A new replay group had to be created by `prepareFrame()`
     * @type {boolean}
     */this.replayGroupChanged=!0,/**
     * @type {import("../../render/canvas/ExecutorGroup").default}
     */this.declutterExecutorGroup=null,/**
     * Clipping to be performed by `renderFrame()`
     * @type {boolean}
     */this.clipping=!0,/**
     * @private
     * @type {CanvasRenderingContext2D}
     */this.compositionContext_=null,/**
     * @private
     * @type {number}
     */this.opacity_=1}/**
   * @param {ExecutorGroup} executorGroup Executor group.
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @param {import("rbush").default} [declutterTree] Declutter tree.
   */renderWorlds(t,e,i){let n=e.extent,r=e.viewState,s=r.center,o=r.resolution,l=r.projection,a=r.rotation,h=l.getExtent(),u=this.getLayer().getSource(),d=e.pixelRatio,c=e.viewHints,g=!(c[r1.ANIMATING]||c[r1.INTERACTING]),f=this.compositionContext_,_=Math.round(e.size[0]*d),m=Math.round(e.size[1]*d),p=u.getWrapX()&&l.canWrapX(),y=p?tb(h):null,x=p?Math.ceil((n[2]-h[2])/y)+1:1,v=p?Math.floor((n[0]-h[0])/y):0;do{let e=this.getRenderTransform(s,o,a,d,_,m,v*y);t.execute(f,1,e,a,g,void 0,i)}while(++v<x)}setupCompositionContext_(){if(1!==this.opacity_){let t=eb(this.context.canvas.width,this.context.canvas.height,oz);this.compositionContext_=t}else this.compositionContext_=this.context}releaseCompositionContext_(){if(1!==this.opacity_){let t=this.context.globalAlpha;this.context.globalAlpha=this.opacity_,this.context.drawImage(this.compositionContext_.canvas,0,0),this.context.globalAlpha=t,eA(this.compositionContext_),oz.push(this.compositionContext_.canvas),this.compositionContext_=null}}/**
   * Render declutter items for this layer
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   */renderDeclutter(t){this.declutterExecutorGroup&&(this.setupCompositionContext_(),this.renderWorlds(this.declutterExecutorGroup,t,t.declutterTree),this.releaseCompositionContext_())}/**
   * Render the layer.
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @param {HTMLElement|null} target Target that may be used to render content to.
   * @return {HTMLElement|null} The rendered element.
   */renderFrame(t,e){var i,n;let r=t.pixelRatio,s=t.layerStatesArray[t.layerIndex];(i=this.pixelTransform)[0]=1/r,i[1]=0,i[2]=0,i[3]=1/r,i[4]=0,i[5]=0,tt(this.inversePixelTransform,this.pixelTransform);let o=te(this.pixelTransform);this.useContainer(e,o,this.getBackground(t));let l=this.context,a=l.canvas,h=this.replayGroup_,u=this.declutterExecutorGroup,d=h&&!h.isEmpty()||u&&!u.isEmpty();if(!d){let t=this.getLayer().hasListener(r0.PRERENDER)||this.getLayer().hasListener(r0.POSTRENDER);if(!t)return null}// resize and clear
let c=Math.round(t.size[0]*r),g=Math.round(t.size[1]*r);a.width!=c||a.height!=g?(a.width=c,a.height=g,a.style.transform!==o&&(a.style.transform=o)):this.containerReused||l.clearRect(0,0,c,g),this.preRender(l,t);let f=t.viewState;f.projection,this.opacity_=s.opacity,this.setupCompositionContext_();// clipped rendering if layer extent is set
let _=!1;if(d&&s.extent&&this.clipping){let e=n=s.extent;(_=(d=tA(e,t.extent))&&!ta(e,t.extent))&&this.clipUnrotated(this.compositionContext_,t,e)}return d&&this.renderWorlds(h,t),_&&this.compositionContext_.restore(),this.releaseCompositionContext_(),this.postRender(l,t),this.renderedRotation_!==f.rotation&&(this.renderedRotation_=f.rotation,this.hitDetectionImageData_=null),this.container}/**
   * Asynchronous layer level hit detection.
   * @param {import("../../pixel.js").Pixel} pixel Pixel.
   * @return {Promise<Array<import("../../Feature").default>>} Promise
   * that resolves with an array of features.
   */getFeatures(t){return new Promise(e=>{if(!this.hitDetectionImageData_&&!this.animatingOrInteracting_){let t=[this.context.canvas.width,this.context.canvas.height];$(this.pixelTransform,t);let e=this.renderedCenter_,i=this.renderedResolution_,n=this.renderedRotation_,r=this.renderedProjection_,s=this.wrappedRenderedExtent_,o=this.getLayer(),l=[],a=.5*t[0],h=.5*t[1];l.push(this.getRenderTransform(e,i,n,.5,a,h,0).slice());let u=o.getSource(),d=r.getExtent();if(u.getWrapX()&&r.canWrapX()&&!ta(d,s)){let t,r=s[0],o=tb(d),u=0;for(;r<d[0];)t=o*--u,l.push(this.getRenderTransform(e,i,n,.5,a,h,t).slice()),r+=o;for(u=0,r=s[2];r>d[2];)t=o*++u,l.push(this.getRenderTransform(e,i,n,.5,a,h,t).slice()),r-=o}this.hitDetectionImageData_=function(t,e,i,n,r,s,o){let l=.5*t[0],a=.5*t[1],h=eb(l,a);h.imageSmoothingEnabled=!1;let u=h.canvas,d=new lH(h,.5,r,null,o),c=i.length,g=Math.floor(16777215/c),f={};for(let t=1;t<=c;++t){let e=i[t-1],o=e.getStyleFunction()||n;if(!o)continue;let l=o(e,s);if(!l)continue;Array.isArray(l)||(l=[l]);let a=t*g,h=a.toString(16).padStart(7,"#00000");for(let t=0,i=l.length;t<i;++t){let i=l[t],n=i.getGeometryFunction()(e);if(!n||!tA(r,n.getExtent()))continue;let s=i.clone(),o=s.getFill();o&&o.setColor(h);let a=s.getStroke();a&&(a.setColor(h),a.setLineDash(null)),s.setText(void 0);let u=i.getImage();if(u){let t=u.getImageSize();if(!t)continue;let e=eb(t[0],t[1],void 0,{alpha:!1}),i=e.canvas;e.fillStyle=h,e.fillRect(0,0,i.width,i.height),s.setImage(new ez({img:i,anchor:u.getAnchor(),anchorXUnits:"pixels",anchorYUnits:"pixels",offset:u.getOrigin(),opacity:1,size:u.getSize(),scale:u.getScale(),rotation:u.getRotation(),rotateWithView:u.getRotateWithView()}))}let d=s.getZIndex()||0,c=f[d];c||(c={},f[d]=c,c.Polygon=[],c.Circle=[],c.LineString=[],c.Point=[]);let g=n.getType();if("GeometryCollection"===g){let t=/** @type {import("../../geom/GeometryCollection.js").default} */n.getGeometriesArrayRecursive();for(let e=0,i=t.length;e<i;++e){let i=t[e];c[i.getType().replace("Multi","")].push(i,s)}}else c[g.replace("Multi","")].push(n,s)}}let _=Object.keys(f).map(Number).sort(x);for(let t=0,i=_.length;t<i;++t){let i=f[_[t]];for(let t in i){let n=i[t];for(let t=0,i=n.length;t<i;t+=2){d.setStyle(n[t+1]);for(let i=0,r=e.length;i<r;++i)d.setTransform(e[i]),d.drawGeometry(n[t])}}}return h.getImageData(0,0,u.width,u.height)}(t,l,this.renderedFeatures_,o.getStyleFunction(),s,i,n)}e(function(t,e,i){let n=[];if(i){let r=Math.floor(.5*Math.round(t[0])),s=Math.floor(.5*Math.round(t[1])),o=(tH(r,0,i.width-1)+tH(s,0,i.height-1)*i.width)*4,l=i.data[o],a=i.data[o+1],h=i.data[o+2],u=h+256*(a+256*l),d=Math.floor(16777215/e.length);u&&u%d==0&&n.push(e[u/d-1])}// @ts-ignore Features are copied from `features` to `resultFeatures` so the type should be the same
return n}(t,this.renderedFeatures_,this.hitDetectionImageData_))})}/**
   * @param {import("../../coordinate.js").Coordinate} coordinate Coordinate.
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @param {number} hitTolerance Hit tolerance in pixels.
   * @param {import("../vector.js").FeatureCallback<T>} callback Feature callback.
   * @param {Array<import("../Map.js").HitMatch<T>>} matches The hit detected matches with tolerance.
   * @return {T|undefined} Callback result.
   * @template T
   */forEachFeatureAtCoordinate(t,e,i,n,r){let s;if(!this.replayGroup_)return;let o=e.viewState.resolution,l=e.viewState.rotation,a=this.getLayer(),h={},u=function(t,e,i){let s=k(t),o=h[s];if(o){if(!0!==o&&i<o.distanceSq){if(0===i)return h[s]=!0,r.splice(r.lastIndexOf(o),1),n(t,a,e);o.geometry=e,o.distanceSq=i}}else{if(0===i)return h[s]=!0,n(t,a,e);r.push(h[s]={feature:t,layer:a,geometry:e,distanceSq:i,callback:n})}},d=[this.replayGroup_];return this.declutterExecutorGroup&&d.push(this.declutterExecutorGroup),d.some(n=>s=n.forEachFeatureAtCoordinate(t,o,l,i,u,n===this.declutterExecutorGroup&&e.declutterTree?e.declutterTree.all().map(t=>t.value):null)),s}/**
   * Perform action necessary to get the layer rendered after new fonts have loaded
   */handleFontsChanged(){let t=this.getLayer();t.getVisible()&&this.replayGroup_&&t.changed()}/**
   * Handle changes in image style state.
   * @param {import("../../events/Event.js").default} event Image style change event.
   * @private
   */handleStyleImageChange_(t){this.renderIfReadyAndVisible()}/**
   * Determine whether render should be called.
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @return {boolean} Layer is ready to be rendered.
   */prepareFrame(t){let e,i;let n=this.getLayer(),r=n.getSource();if(!r)return!1;let s=t.viewHints[r1.ANIMATING],o=t.viewHints[r1.INTERACTING],l=n.getUpdateWhileAnimating(),a=n.getUpdateWhileInteracting();if(this.ready&&!l&&s||!a&&o)return this.animatingOrInteracting_=!0,!0;this.animatingOrInteracting_=!1;let h=t.extent,u=t.viewState,d=u.projection,c=u.resolution,g=t.pixelRatio,f=n.getRevision(),_=n.getRenderBuffer(),m=n.getRenderOrder();void 0===m&&(m=lJ);let p=u.center.slice(),y=tr(h,_*c),x=y.slice(),v=[y.slice()],E=d.getExtent();if(r.getWrapX()&&d.canWrapX()&&!ta(E,t.extent)){// For the replay group, we need an extent that intersects the real world
// (-180° to +180°). To support geometries in a coordinate range from -540°
// to +540°, we add at least 1 world width on each side of the projection
// extent. If the viewport is wider than the world, we need to add half of
// the viewport width to make sure we cover the whole viewport.
let t=tb(E),e=Math.max(tb(y)/2,t);y[0]=E[0]-e,y[2]=E[2]+e,t4(p,d);let i=tF(v[0],d);i[0]<E[0]&&i[2]<E[2]?v.push([i[0]+t,i[1],i[2]+t,i[3]]):i[0]>E[0]&&i[2]>E[2]&&v.push([i[0]-t,i[1],i[2]-t,i[3]])}if(this.ready&&this.renderedResolution_==c&&this.renderedRevision_==f&&this.renderedRenderOrder_==m&&ta(this.wrappedRenderedExtent_,y))return C(this.renderedExtent_,x)||(this.hitDetectionImageData_=null,this.renderedExtent_=x),this.renderedCenter_=p,this.replayGroupChanged=!1,!0;this.replayGroup_=null;let S=new lD(.5*c/g,y,c,g);this.getLayer().getDeclutter()&&(e=new lD(.5*c/g,y,c,g));for(let t=0,e=v.length;t<e;++t)r.loadFeatures(v[t],c,d);let R=function(t,e){let i=.5*t/e;return i*i}(c,g),w=!0,T=/**
       * @param {import("../../Feature.js").default} feature Feature.
       */t=>{let r;let s=t.getStyleFunction()||n.getStyleFunction();if(s&&(r=s(t,c)),r){let n=this.renderFeature(t,R,r,S,i,e);w=w&&!n}},I=r.getFeaturesInExtent(y);m&&I.sort(m);for(let t=0,e=I.length;t<e;++t)T(I[t]);this.renderedFeatures_=I,this.ready=w;let M=S.finish(),L=new lV(y,c,g,r.getOverlaps(),M,n.getRenderBuffer());return e&&(this.declutterExecutorGroup=new lV(y,c,g,r.getOverlaps(),e.finish(),n.getRenderBuffer())),this.renderedResolution_=c,this.renderedRevision_=f,this.renderedRenderOrder_=m,this.renderedExtent_=x,this.wrappedRenderedExtent_=y,this.renderedCenter_=p,this.renderedProjection_=d,this.replayGroup_=L,this.hitDetectionImageData_=null,this.replayGroupChanged=!0,!0}/**
   * @param {import("../../Feature.js").default} feature Feature.
   * @param {number} squaredTolerance Squared render tolerance.
   * @param {import("../../style/Style.js").default|Array<import("../../style/Style.js").default>} styles The style or array of styles.
   * @param {import("../../render/canvas/BuilderGroup.js").default} builderGroup Builder group.
   * @param {import("../../proj.js").TransformFunction} [transform] Transform from user to view projection.
   * @param {import("../../render/canvas/BuilderGroup.js").default} [declutterBuilderGroup] Builder for decluttering.
   * @return {boolean} `true` if an image is loading.
   */renderFeature(t,e,i,n,r,s){if(!i)return!1;let o=!1;if(Array.isArray(i))for(let l=0,a=i.length;l<a;++l)o=l$(n,t,i[l],e,this.boundHandleStyleImageChange_,r,s)||o;else o=l$(n,t,i,e,this.boundHandleStyleImageChange_,r,s);return o}},l0=/**
 * @classdesc
 * Vector data is rendered client-side, as vectors. This layer type provides most accurate rendering
 * even during animations. Points and labels stay upright on rotated views. For very large
 * amounts of vector data, performance may suffer during pan and zoom animations. In this case,
 * try {@link module:ol/layer/VectorImage~VectorImageLayer}.
 *
 * Note that any property set in the options is set as a {@link module:ol/Object~BaseObject}
 * property on the layer object; for example, setting `title: 'My Title'` in the
 * options means that `title` is observable, and has get/set accessors.
 *
 * @template {import("../source/Vector.js").default} VectorSourceType
 * @extends {BaseVectorLayer<VectorSourceType, CanvasVectorLayerRenderer>}
 * @api
 */class extends lE{/**
   * @param {import("./BaseVector.js").Options<VectorSourceType>} [options] Options.
   */constructor(t){super(t)}createRenderer(){return new lQ(this)}};let l1=new oU({source:new oD({attributions:'<a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',url:"https://c.tile.openstreetmap.org/{z}/{x}/{y}.png",tileSize:256,crossOrigin:null})}),l2=[l1],l3=["#1abc9c","#2ecc71","#3498db","#9b59b6","#34495e","#d35400","#e74c3c","#c0392b","#2c3e50","#fa8231","#eb3b5a","#0fb9b1"];var l5=new XMLHttpRequest;l5.open("GET","./kmlssimple/kml_list.json",!1),l5.send(null);let l4=JSON.parse(l5.responseText);console.log(l4),l4.forEach(t=>{//console.log(file);
var e=new ip({color:l3[Math.floor(Math.random()*l3.length)],width:2.25});l2.push(new l0({style:new iK({stroke:e}),source:new ol({url:"kmlssimple/"+t,format:new rZ({extractStyles:!1})})}))});let l6=new ol,l8=new l0({source:l6});l2.push(l8);//console.log(rasterAndKmls);
let l7=new s7({layers:l2,target:document.getElementById("map"),view:new so({center:eu([9.993682,53.551086],"EPSG:4326","EPSG:3857"),projection:"EPSG:3857",zoom:4})}),l9=function(t){let e=[];if(l7.forEachFeatureAtPixel(t,function(t){e.push(t)}),e.length>0){let t,i;let n=[];for(t=0,i=e.length;t<i;++t)n.push(e[t].get("name").replace(/\$URL(\d*)\$URL/,'<a href="https://www.komoot.de/tour/$1" target="_blank">Link</a>'));document.getElementById("info").innerHTML=n.join(", ")||"(unknown)",l7.getTarget().style.cursor="pointer"}else document.getElementById("info").innerHTML="&nbsp;",l7.getTarget().style.cursor=""};l7.on("pointermove",function(t){if(t.dragging)return;let e=l7.getEventPixel(t.originalEvent);l9(e)}),l7.on("click",function(t){l9(t.pixel)}),navigator.geolocation.watchPosition(function(t){var e;let i=[t.coords.longitude,t.coords.latitude],n=function(t,e,i,n){i=i||32;/** @type {Array<number>} */let r=[];for(let n=0;n<i;++n)E(r,function(t,e,i,n){n=n||6371008.8;let r=t$(t[1]),s=t$(t[0]),o=e/n,l=Math.asin(Math.sin(r)*Math.cos(o)+Math.cos(r)*Math.sin(o)*Math.cos(i)),a=s+Math.atan2(Math.sin(i)*Math.sin(o)*Math.cos(r),Math.cos(o)-Math.sin(r)*Math.sin(l));return[tJ(a),tJ(l)]}(t,e,2*Math.PI*n/i,void 0));return r.push(r[0],r[1]),new ig(r,"XY",[r.length])}(i,t.coords.accuracy);l6.clear(!0),l6.addFeatures([new X(n.transform("EPSG:4326",l7.getView().getProjection())),new X(new ii((t9(),eu(i,"EPSG:4326",void 0!==e?e:"EPSG:3857"))))])},function(t){alert(`ERROR: ${t.message}`)},{enableHighAccuracy:!0});let at=document.createElement("div");at.className="ol-control ol-unselectable locate",at.innerHTML='<button title="Locate me">◎</button>',at.addEventListener("click",function(){l6.isEmpty()||l7.getView().fit(l6.getExtent(),{maxZoom:18,duration:500})}),l7.addControl(new sI({element:at}))}();//# sourceMappingURL=index.4a7a325e.js.map

//# sourceMappingURL=index.4a7a325e.js.map

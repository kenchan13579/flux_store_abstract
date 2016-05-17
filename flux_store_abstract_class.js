// flux dispatcher here
import Dispatcher from '../dispatcher/';
import {EventEmitter} from 'events';
/**
 * A Flux store abstraction with event emitting ability 
 * that takes model object and event name string 
 * as arguments 
 */
class StoreInterface extends EventEmitter {

    constructor(_store, _eventName) {
        super();
        this.EVENTNAME = _eventName; // Unique event name
        this._store = _store; // Object - data model
        this.dispatchToken = Dispatcher.register(this._registerToActions.bind(this)); // a function to register in dispatcher
        this._maxListeners = 0; // mean unlimited 
        if (!(_store && _eventName)) {
            // complain if _store and eventName was not provided
            console.error("Missing parameters: data -> %o, event -> %s",_store,_eventName);
        }
    }
    /**
     * Attach a listener to listen for changes in this store
     * @param {Function} cb [a Callback function to be called upon event occuring]
     */
    addStoreListener(cb) {
        this.on(this.EVENTNAME, cb);
    }

    /**
     * Remove registered callback from this store
     * @param  {Function} cb [Registered callback]
     */
    removeStoreListener(cb) {
        this.removeListener(this.EVENTNAME, cb);
    }

    /**
     * Broadcast this store's event name to its listeners
     */
    _emitChange(optional) {
        this.emit(this.EVENTNAME, optional);
    }

    /**
     * Return this store's data model
     * @return {[Object]} [data]
     */
    getAll() {
        return this._store;
    }
    /**
     * return dispatch token for this store
     * @return {[string]} [description]
     */
    getDispatchToken() {
        return this.dispatchToken;
    }
    /**
     * get Flux Disptcher object (for using its methods)
     * @return {[Object]} [Dispatcher]
     */
    getDispatcher() {
        return Dispatcher;
    }

    /**
     * A function to register in the dispatcher ,
     * so dispatcher can execute based on action name.
     * should call _emitChange() when model changes
     * @param  {[Object]} payload [dispatcher payload]
     */
    _registerToActions(payload) {
        /**
         * payload structure:
         *  {
         *    source: 'VIEW_ACTION' || 'SERVER_ACTION',
         *    action: {
         *        actionType: 'Unique string for registered store 
         *                    function to loop for',
         *         "any key": Object || Boolean || number || string       
         *     }
         *   }
         */
        console.error("Need implementation");
    }

}
export default StoreInterface;

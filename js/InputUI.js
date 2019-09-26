
'use strict';

//some sample configuration for the interface
const INPUT_CONFIG = [{
    eventName: 'run',
    dispatcher: 'KeyL',
    action: 'keydown'
},{
    eventName: 'jump',
    dispatcher: 'KeyT',
    action: 'keydown'
}];

//declaration of the class that will handle all the events
class InputUI {
    constructor(config) {
        this._length = config.length; //1 indexed ¡¡ BE CAREFULL !!
        this._config = config;
        this._event = [];

        this.name = [];
        this.dispatcher = [];
        this.action = [];

        for (let i = 0; i < this._length; i++) {
            this.name[i] = config[i].eventName;
            this._event[i] = new Event(config[i].eventName);
            this.dispatcher[i] = config[i].dispatcher;
            this.action[i] = config[i].action || 'keydown';
        }

        let that = this;
        window.addEventListener('keydown', ev => {
            let i = that.getEventIndex(ev.code, 'dispatcher');
            i != -1 && that.dispatchEvent(that.name[i]);
        });
    }

    // get the index of the event eventName
    getEventIndex(eventName, search) {
        let index = search != 'dispatcher' ? this.name.indexOf(eventName) : this.dispatcher.indexOf(eventName);
        return index;
    }

    // dispatch an event by its alias
    dispatchEvent(eventName) {
        let i = this.getEventIndex(eventName);
        i != -1 ? window.dispatchEvent(this._event[i]) : console.error(`custom event "${eventName}" does not exist`);
    }

    // create a new personalized event
    addEvent({name, dispatcher, action}) {
        //only for maintaining the config updated por exportation
        this._config = [...this._config, {
            eventName: this.name[this._length] = name,
            dispatcher: this.dispatcher[this._length] = dispatcher,
            action: this.action[this._length] = action
        }];
        this._event[this._length++] = new Event(name);
    }

    // for changing the input of the event during the execution of code
    changeDispatcher(eventName, key) {
        let i = this.getEventIndex(eventName);
        i != -1 ? this.dispatcher[i] = key : console.error(`custom event "${eventName}" does not exist`);
    }

    // delete an event from the input handler
    deleteEvent(eventName) {
        let i = this.getEventIndex(eventName);
        if (i != -1) {
            this.name = this.name.filter( (e, indx) => indx != i );
            this._event = this._event.filter( (e, indx) => indx != i );
            this.dispatcher = this.dispatcher.filter( (e, indx) => indx != i );
            this.action = this.action.filter( (e, indx) => indx != i );
            this._length--;

            //only for maintaining the config updated por exportation
            this._config = this._config.filter( (e, indx) => indx != i);
        } else {
            console.error(`custom event "${eventName}" does not exist`);
        }
    }

    // exports the actual running config (this._config)
    getConfig() {
        return this._config;
    }

    // gets the key that dispathes the event by the TRANFORMED name of the event
    getEventProperties(eventName) {
        let i = this.getEventIndex(eventName);
        return i != -1 ? {
            eventName: this.name[i],
            dispatcher: this.dispatcher[i],
            action: this.action[i]
        } : console.error(`custom event "${eventName}" does not exist`);
    }
}

//Assign the class to a variable and passing the options for the events.
//unsafeWindow.inputui = new InputUI(INPUT_CONFIG);

import { StateRead, StateString } from "@chocolatelib/state"
import { EventProducer, EventConsumer, createEventHandler } from "@chocolatelib/events"

/**Events for Base element */
export interface ApplicationEvents { }

export abstract class Application<MoreEvents extends ApplicationEvents = ApplicationEvents> {
    /**Returns the name used to define the element */
    static appName() { return '@abstract@'; }
    /**Returns the namespace override for the element*/
    static appNameSpace() { return 'chocolatelibui-core'; }
    /**Events for application*/
    protected _events: EventProducer<MoreEvents, Application<MoreEvents>>
    /**Events for application*/
    readonly events: EventConsumer<MoreEvents, Application<MoreEvents>>

    constructor(...any: any[]) {
        any;
        let events = createEventHandler<MoreEvents, Application<MoreEvents>>(this)
        this._events = events.producer;
        this.events = events.consumer;
        this.title = this.titleSet = new StateString('');
    }
    /***/
    readonly title: StateRead<string>;
    protected titleSet: StateString;
}


let test = new class Test extends Application {

}
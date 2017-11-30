import { reject, equals, clone } from 'ramda'

class PubSubEmitter {
	constructor() {
		// create a new Map to hold all of the topics
		this.listeners = new Map()
	}

	subscribe(topic, callback) {
		// if the listener does not hae the topic yet, add it.
		if (!this.listeners.has(topic)) this.listeners.set(topic, [])
		// push the callback to the topic's array
		this.listeners.get(topic).push(callback)
	}

	unsubscribe(topic, callback) {
		const listenersOfTopic = this.listeners.get(topic)

		if (listenersOfTopic && listenersOfTopic.length) {
			this.listeners.set(topic, reject(equals(callback), listenersOfTopic))
		}
		return false; // return false if we didn't
	}

	emit(topic, ...args) {
		// get the listeners subscribed to the topic
		const listeners = this.listeners.get(topic)

		if (listeners && listeners.length) {
			// execute each callback with any supplied arguments
			listeners.forEach((listener) => {
				listener(...args)
			})
			return true
		}
		return false
	}
}

const publisher = new PubSubEmitter()

export default publisher

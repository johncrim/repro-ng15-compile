/**
 * Test version of {@link EventTarget} - intended to be a reusable base class
 * whenever a test fake needs to implement `EventTarget`.
 *
 * This doesn't implement event bubbling or anything complex - if that's needed for testing, look as jsdom or the browser impl.
 */
export class TestEventTarget implements EventTarget {
  private readonly _listeners = new Map<string, EventListenerOrEventListenerObject[]>();

  addEventListener(type: string,
                   callback: EventListenerOrEventListenerObject | null,
                   _options?: boolean | AddEventListenerOptions | undefined): void {
    if (callback === null) { return; }
    type = type.toLowerCase();

    let listeners = this._listeners.get(type);
    if (listeners === undefined) {
      listeners = [];
      this._listeners.set(type, listeners);
    }
    listeners.push(callback);
  }

  /**
   * Removes the event listener in target's event listener list with the same type, callback, and options.
   */
  removeEventListener(type: string,
                      callback: EventListenerOrEventListenerObject | null,
                      _options?: boolean | EventListenerOptions | undefined): void {
    if (callback === null) { return; }
    type = type.toLowerCase();

    const listeners = this._listeners.get(type);
    if (listeners === undefined) {
      throw new Error('No listeners registered for type: ' + type);
    }
    if (!arrayRemove(listeners, callback)) {
      throw new Error('Specified listener not registered for type: ' + type);
    }
  }

  removeAllListeners(eventName?: string | undefined): void {
    if (eventName) {
      this._listeners.delete(eventName.toLowerCase());
    }
    else {
      this._listeners.clear();
    }
  }

  eventListeners(eventName?: string | undefined): EventListenerOrEventListenerObject[] {
    if (!eventName) { return []; }
    eventName = eventName.toLowerCase();

    const listeners = this._listeners.get(eventName);
    return listeners ?? [];
  }

  /** Dispatches {@link Event} to target and returns true if either event's cancelable attribute value is false or its preventDefault() method was not invoked, and false otherwise. */
  dispatchEvent(event: Event): boolean {
    const type = event.type.toLowerCase();
    let listeners = this._listeners.get(type);
    if (!listeners) {
      // No listeners for this event
      return true;
    }

    listeners = Array.from(listeners); // Shallow copy so even if a handler removes a listener, we call all initial listeners
    for (const listener of listeners) {
      if (typeof listener === 'function') {
        listener(event);
      }
      else {
        listener.handleEvent(event);
      }
    }

    return !event.cancelable || !event.defaultPrevented;
  }

}

/**
 * Removes all occurrences of an element from an array. `Array` does not have a remove function.
 * @param array An array
 * @param value The value to remove
 * @returns the number of elements that were removed
 */
export function arrayRemove<T>(array: T[], value: T): number {
  let from = 0;
  let removeCount = 0;
  while (from < array.length) {
    const i = array.indexOf(value, from);
    if (i === -1) {
      break;
    }

    array.splice(i, 1);
    from = i;
    removeCount++;
  }
  return removeCount;
}

class NotificationService {
    constructor() {
        this.subscribers = [];
    }

    subscribe(fn) {
        if (typeof fn !== 'function') {
            throw new Error('Subscriber must be a valid function.');
        }
        this.subscribers.push(fn);
    }

    notify(type, data) {
        this.subscribers.forEach(fn => fn({ type, data }));
    }
}

module.exports = NotificationService;
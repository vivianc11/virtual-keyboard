// creating an object of properties for generating the keyboard
const Keyboard = {
    elements: {
        main: null,
        keysContainer: null,
        keys: []
    },

    eventHandlers: {
        // keyboard gets activated when the following events happen
        oninput: null,
        onclose: null,
    },

    properties: {
        value: '',
        capsLock: false
    },

    init() {
        // iniitalize the keyboard
    },

    _createKeys() {
        // a private method for generating keys
    },

    _triggerEvent(handlerName) {
        console.log('Event triggered by:' + handlerName)
    },

    _toggleCapsLock() {
        console.log('Caps Lock Toggled!')
    },

    open() {

    },

    close() {
        
    }
}
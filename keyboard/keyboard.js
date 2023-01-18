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
        // create main elements
        this.elements.main = document.createElement('div');
        this.elements.keysContainer = document.createElement('div');

        // setup main element by adding classes
        this.elements.main.classList.add('keyboard', '1keyboard-hidden');
        this.elements.keysContainer.classList.add('keyboard-keys');

        // Add keysContainer to the main container
        this.elements.main.appendChild(this.elements.keysContainer);
        // Add main container to body of DOM
        document.body.appendChild(this.elements.main);
    },

    _createKeys() {
        // a private method for generating keys
        // returning document fragment
        const fragment = document.createDocumentFragment();
        const keyLayout = [
            "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
            "q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
            "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", "enter",
            "done", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?",
            "space"
        ];

        // Funciton to create HTML for an icon
        const createIconHTML = (icon_name) => {
            return `<i class='material-icons'>${icon_name}</i>`
        };

        keyLayout.forEach(key => {
            const keyElement = document.createElement('button');
            const insertLineBreak = ['backspace', 'p', 'enter', '?'].indexOf(key) !== -1;

            // Adding attributes/classes
            keyElement.setAttribute('type', 'button');
            keyElement.classList.add('keyboard-key');

            switch (key) {
                case 'backspace':
                    keyElement.classList.add('keyboard-key-wide');
                    keyElement.innerHTML = createIconHTML('backspace');

                    // function to remove last character
                    keyElement.addEventListener('click', () => {
                        this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                        this._triggerEvent('oninput');
                    })
                    break;

                case 'caps':
                    keyElement.classList.add('keyboard-key-wide', 'keyboard-key-activateable');
                    keyElement.innerHTML = createIconHTML('keyboard_capslock');

                    // function to toggle capslock
                    keyElement.addEventListener('click', () => {
                        this._toggleCapsLock();
                        keyElement.classList.toggle('keyboard-key-active', this.properties.capsLock);
                    })
                    break;

                case 'enter':
                keyElement.classList.add('keyboard-key-wide');
                keyElement.innerHTML = createIconHTML('keyboard_return');

                // function to add line break
                keyElement.addEventListener('click', () => {
                    this.properties.value += '/ln'
                    this._triggerEvent('oninput');
                })
                    break;
                
                case 'space':
                keyElement.classList.add('keyboard-key-widest');
                keyElement.innerHTML = createIconHTML('spacebar');

                // function to remove last character
                keyElement.addEventListener('click', () => {
                    this.properties.value += ' ';
                    this._triggerEvent('oninput');
                })
                    break;

                case 'done':
                keyElement.classList.add('keyboard-key-wide', 'keyboard-key-dark');
                keyElement.innerHTML = createIconHTML('check_circle');

                // function to close keyboard
                keyElement.addEventListener('click', () => {
                    this.close();
                    this._triggerEvent('onclose');
                })
                    break;
            }

        });

    },

    _triggerEvent(handlerName) {
        console.log('Event triggered by:' + handlerName)
    },

    _toggleCapsLock() {
        console.log('Caps Lock Toggled!')
    },

    open(initialValue, oninput, onclose) {

    },

    close() {

    }
};

window.addEventListener('DOMContentLoaded', function () {
    Keyboard.init();
})
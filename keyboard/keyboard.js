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
        this.elements.main.classList.add('keyboard', 'keyboard-hidden');
        this.elements.keysContainer.classList.add('keyboard-keys');
        this.elements.keysContainer.appendChild(this._createKeys());

        this.elements.keys = this.elements.keysContainer.querySelectorAll('.keyboard-key')

        // Add keysContainer to the main container
        this.elements.main.appendChild(this.elements.keysContainer);
        // Add main container to body of DOM
        document.body.appendChild(this.elements.main);

        // Automatically use keyboard for elements with use-keyboard-input
        document.querySelectorAll('.use-keyboard-input').forEach(element => {
            element.addEventListener('focus', () => {
                this.open(element.value, currentValue => {
                    element.value = currentValue;
                });
            });
        });
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

        // Function to create HTML for an icon
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
                        this.properties.value += '\n'
                        this._triggerEvent('oninput');
                    })
                    break;
                
                case 'space':
                    keyElement.classList.add('keyboard-key-widest');
                    keyElement.innerHTML = createIconHTML('space_bar');

                    // function to add space
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

                default:
                    keyElement.textContent = key.toLowerCase();

                    keyElement.addEventListener('click' , () => {
                        this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
                        this._triggerEvent('oninput');
                    })
            }

            fragment.appendChild(keyElement);

            if(insertLineBreak) {
                fragment.appendChild(document.createElement('br'));
            }

        });

        return fragment;

    },

    _triggerEvent(handlerName) {
        console.log('Event triggered by:' + handlerName)
        // If the handlerName matches an existing function in the code...
        if (typeof this.eventHandlers[handlerName] == 'function') {
            this.eventHandlers[handlerName](this.properties.value);
        }
    },

    _toggleCapsLock() {
        // flipping the value of the capslock
       this.properties.capsLock = !this.properties.capsLock;

       for (const key of this.elements.keys) {
        if (key.childElementCount === 0) {
            key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
        }
       }
    },

    open(initialValue, oninput, onclose) {
        this.properties.value = initialValue || '';
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.remove('keyboard-hidden');

    },

    close() {
        this.properties.value = '';
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.add('keyboard-hidden');
    }
};

window.addEventListener('DOMContentLoaded', function () {
    Keyboard.init();
    // Keyboard.open('dcode', function (currentValue) {
    //     console.log("value changed to: " + currentValue)
    // }, function (currentValue) {
    //     console.log('Keyboard Closed! Finishing value: ' + currentValue)
    // });
})
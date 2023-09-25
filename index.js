import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js'
import { getDatabase, ref, push, set, remove, onValue } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js'

const appSettings = {
    databaseURL: 'https://shalin-shopping-cart-default-rtdb.europe-west1.firebasedatabase.app/'
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListRef = ref(database, 'shoppingList');

let values = [];
let entries = [];

const inputEl = document.getElementById('input-field');
const addButtonEl = document.getElementById('add-button');
const shoppingListEl = document.getElementById('shopping-list');
const headerBtnEl = document.getElementById('header-button');

headerBtnEl.addEventListener('click', () => window.open('https://github.com/shal-in', "_blank"));

let addedKeys = ['key1']

onValue(shoppingListRef, (snapshot) => {
    if (snapshot.exists()) {
        entries = Object.entries(snapshot.val());
        values = Object.values(snapshot.val());

        for (let entry of entries) {
            let entryKey = entry[0];
            let entryValue = entry[1];

            if (!addedKeys.includes(entryKey)) {
                addToHTML(entryKey, entryValue)
                addedKeys.push(entryKey);
            }
        }
    }
});

inputEl.addEventListener('keyup', (e) => {
    if (event.keyCode  === 13) {
        addButtonFunction()
    }
})

addButtonEl.addEventListener('click', () => addButtonFunction())

function addButtonFunction() {
    let value1 = inputEl.value;
    let value = value1.toLowerCase();
    if (value == '') {
        alert('write something first')
        clearInput()
        return;
    }
     if (values) {
        if (values.includes(value)) {
            alert('already in list')
            clearInput()
            return;
        }
    }

    let validInput = hasLetter(value);
    if (validInput === false) {
        alert('invalid input')
        clearInput()
        return;
    }

    let key = generateUniqueId()

    let shoppingListData = ref(database, `shoppingList/${key}`);
    set(shoppingListData, value);

    inputEl.value = ''
}

function addToHTML(entryKey, entryValue) {
    let newItem = document.createElement('li');
    newItem.setAttribute('id', entryKey);
    newItem.setAttribute('class', 'fade-in');
    newItem.textContent = entryValue
    newItem.addEventListener('click', () => removeFromHTML(entryKey));

    shoppingListEl.appendChild(newItem)
}

function removeFromHTML(key) {
    let shoppingListData = ref(database, `shoppingList/${key}`);
    remove(shoppingListData);

    let item = document.getElementById(key);
    if (item) {
        let parentElement = item.parentNode;
        item.setAttribute('class', 'fade-out')
        setTimeout(function() {
            parentElement.removeChild(item);
        }, 495);
    }

    values = [];
}

function clearInput() {
    inputEl.value = '';
}





function generateUniqueId() {
    const timestamp = Date.now().toString(36); // Convert current timestamp to base36 string
    const randomChars = Math.random().toString(36).substr(2, 6); // Generate random characters
  
    const uniqueId = timestamp + randomChars; // Concatenate timestamp and random characters
    return uniqueId;
  }

  function hasLetter(value) {
    // Check if the value contains at least one letter
    return /[a-zA-Z]/.test(value);
  }
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js'
import { getDatabase, ref, push } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js'

const appSettings = {
    databaseURL: 'https://shalin-shopping-cart-default-rtdb.europe-west1.firebasedatabase.app/'
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, 'shoppingList')

const inputEl = document.getElementById('input-field');
const addButtonEl = document.getElementById('add-button');

function addFunction() {
    if (inputEl.value !== '') {
        push(shoppingListInDB, inputEl.value);
        console.log(inputEl.value);
        inputEl.value = '';
        inputEl.placeholder = 'ice cream'; 
    }
}

addButtonEl.addEventListener('click', e => {
    addFunction();
})

inputEl.addEventListener('keyup', e => {
    if (e.keyCode === 13) {
        addFunction();
    }
})

function clearInput() {
    inputEl.placeholder = "";
}

function resetInput() {
    if (inputEl.value === '') {
        inputEl.placeholder = "ice cream";
    }
}
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js'
import { getDatabase, ref, push, onValue } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js'

const appSettings = {
    databaseURL: 'https://shalin-shopping-cart-default-rtdb.europe-west1.firebasedatabase.app/'
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, 'shoppingList')

const inputEl = document.getElementById('input-field');
const addButtonEl = document.getElementById('add-button');
const htmlShoppingList = document.getElementById('shopping-list');

let htmlList = [];
let firstLoad = true;

onValue(shoppingListInDB, function(snapshot) {
    const shoppingListObject = snapshot.val();
    if (shoppingListObject) {
        let shoppingList = Object.values(shoppingListObject);
        
        if (firstLoad == true) {
            for (let element of shoppingList) {
                addElementsToHTML(element, htmlShoppingList);
            }
            firstLoad = false;
        }
    }
});

function addElementsToHTML(element, htmlShoppingList) {
    let newItem = document.createElement('li');
    newItem.textContent = element;
    htmlShoppingList.appendChild(newItem); 
}

function addFunction() {
    if (inputEl.value !== '') {
        push(shoppingListInDB, inputEl.value);
        addElementsToHTML(inputEl.value, htmlShoppingList)
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
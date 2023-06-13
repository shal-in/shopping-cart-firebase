const inputEl = document.getElementById('input-field');
const addButtonEl = document.getElementById('add-button');

function addFunction() {
    if (inputEl.value !== '') {
        console.log(inputEl.value);
        inputEl.value = '';
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
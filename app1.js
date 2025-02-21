var getul = document.getElementById('ul');
var total = 0;
var totalDisplay = document.getElementById('total');

function addItem() {
    var a = document.getElementById("inp");
    var priceInput = document.getElementById("price");
    var priceValue = Number(priceInput.value);

    if (isNaN(priceValue) || priceValue <= 0) {
        alert("Please enter a valid number for the price.");
        priceInput.value = '';
        return;
    }

    var li = document.createElement('li');
    li.textContent = a.value + " : $" + priceValue.toFixed(2);
    li.setAttribute('price', priceValue);
    getul.appendChild(li);

    // Add animation class
    li.classList.add('fade-in');

    total += priceValue;
    updateTotal();

    a.value = '';
    priceInput.value = '';

    // Create Delete Button
    var deletebtn = document.createElement('button');
    deletebtn.textContent = 'Delete';
    li.appendChild(deletebtn);
    deletebtn.setAttribute('onclick', 'deleteItem(this)');

    // Create Edit Button
    var editbtn = document.createElement('button');
    editbtn.textContent = 'Edit';
    li.appendChild(editbtn);
    editbtn.setAttribute('onclick', 'editItem(this)');
}

function deleteAll() {
    getul.innerHTML = '';
    total = 0;
    updateTotal();
}

function deleteItem(e) {
    var li = e.parentNode;
    var price = li.getAttribute('price');
    total -= Number(price);
    updateTotal();

    // Add delete animation
    li.style.animation = 'fadeOut 0.3s forwards';
    setTimeout(() => li.remove(), 300);
}

function editItem(e) {
    var li = e.parentNode;
    var itemText = li.textContent.split(" : $")[0];
    var price = li.getAttribute('price');

    var newName = prompt('Enter new item name', itemText);
    var newPrice = prompt('Enter new price', price);

    var newPriceValue = Number(newPrice);
    if (isNaN(newPriceValue) || newPriceValue <= 0) {
        alert("Please enter a valid number for the price.");
        return;
    }

    if (newName && newPrice) {
        total -= Number(price);
        total += newPriceValue;
        updateTotal();

        li.textContent = newName + " : $" + newPriceValue.toFixed(2);
        li.setAttribute('price', newPriceValue);

        // Create Delete Button
        var deletebtn = document.createElement('button');
        deletebtn.textContent = 'Delete';
        li.appendChild(deletebtn);
        deletebtn.setAttribute('onclick', 'deleteItem(this)');

        // Create Edit Button
        var editbtn = document.createElement('button');
        editbtn.textContent = 'Edit';
        li.appendChild(editbtn);
        editbtn.setAttribute('onclick', 'editItem(this)');

        // Add fade-in effect after edit
        li.classList.add('fade-in');
    }
}

function updateTotal() {
    totalDisplay.textContent = 'Total: $' + total.toFixed(2);
}

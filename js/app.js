//window event list
eventListeners();
function eventListeners() {
    cons: ui = new UI;
    window.addEventListener('load', function () {
        ui.hidePreloader();
    })
    //nav btn
    document.querySelector('.navBtn').addEventListener('click', function () {
        ui.showNav();
    })


    //submit the form
    document.querySelector('.drink-form').addEventListener('submit', function (event) {
        event.preventDefault();
        const name = document.querySelector('.imput-name').value;
        const lastName = document.querySelector('.imput-lastname').value;
        const email = document.querySelector('.imput-email').value;

        let value = ui.checkEmpty(name, lastName, email)

        if (value) {
            let customer = new Customer(name, lastName, email)
            ui.addCustomer(customer);
            ui.showFeedback('values has been added', 'success')
            ui.clearfields();
        }
        else {
            ui.showFeedback('some form values are empty', 'error')
        }
    })
}
//constructor fuction

function UI() {

}
//hide preloader
UI.prototype.hidePreloader = function(){
    document.querySelector('.preloader').style.display ="none";
}
UI.prototype.showNav = function () {
    document.querySelector('.nav').classList.toggle('nav-show')
}
//check for empty values
UI.prototype.checkEmpty = function (name, lastname, email) {
    let result;
    if (name === '' || lastname === '' || email === '') {
        result = false;
    }
    else {
        result = true;
    }
    return result;
}
UI.prototype.showFeedback = function (text, type) {
    if (type === 'success') {
        let feedback = document.querySelector('.drink-form_feedback');
        feedback.classList.add('success');
        feedback.innerText = text;
        this.removeAlert('success');
    }
    else if (type==='error') {
        let feedback = document.querySelector('.drink-form_feedback');
        feedback.classList.add('error');
        feedback.innerText = text;
        this.removeAlert('error');
    }
}
//remove alert
UI.prototype.removeAlert = function (type) {
    setTimeout(function () {
        document.querySelector('.drink-form_feedback').classList.remove(type)
    },3000)
}

//add customer
UI.prototype.addCustomer = function (customer) {
    const div = document.createElement('div');
    div.classList.add('person');
    div.innerHTML = `<img src="imgs/5.png" alt="person1" class="person_thumbnail" />
                        <h4 class="peron_name">${customer.name}</h4>
                        <h4 class ="person_last-name">${customer.lastname}</h4>`
    document.querySelector('.drink-card_list').appendChild(div)
}
//display modal

const links = document.querySelectorAll('.work-item_icon');
links.forEach(function (item) {
    item.addEventListener('click', function (event) {
        ui.showModal(event)
    })
})
//clear fields
UI.prototype.clearfields = function()
{
    document.querySelector('.imput-name').value = '';
    document.querySelector('.imput-lastname').value = '';
    document.querySelector('.imput-email').value = '';
}

UI.prototype.showModal = function (event) {
    event.preventDefault();
    if (event.target.parentElement.classList.contains('work-item_icon')) {
        let id = event.targe.parentElement.dataset.id
        const modal = document.querySelector('.work-modal');
        const modalItem = document.querySelector('.work-modal_item');
        modal.classList.add('.work-modal_show');
        modalItem.style.backgroundImage=`URL(imgs/ ${id}.jpg)`
    }
}
function Customer(name, lastname, email) {
    this.name = name;
    this.lastname = lastname;
    this.email = email;
}



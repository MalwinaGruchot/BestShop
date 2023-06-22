const form = document.querySelector(".calc__form");
const inputList = document.querySelectorAll(".calc__input");
const ulChoiceList = document.querySelector(".calc__list");
const container = document.querySelector(".calc__wrap");
const arrayObjects = [];
let totalPrice = 0;

////////////////////
const handleSubmit = function (e) {
    e.preventDefault();

};

form.addEventListener("submit", handleSubmit)
////////////////////////////////

const addClassActive = function (e) {
    ulChoiceList.classList.toggle("active");

    ulChoiceList.addEventListener("click", function (e) {
        inputList[2].value = e.target.id;
        e.currentTarget.classList.remove("active")
    });
}

inputList[2].addEventListener("click", addClassActive);

////////////////////////////////////////////
const Input = function () {
    this.value = 0;
    this.price = 0;
    this.id = "";
    this.totalPrice = 0;
    this.package = "";
    this.counter = false;
}

Input.prototype.getValueInput = function (e) {
    this.value = 1 * e.target.value;
    this.price = 1 * e.target.getAttribute("data-price")
    this.id = e.target.id;
    this.totalPrice = this.value * this.price;
};
Input.prototype.getValueCheckbox = function (e) {
    this.value = 1 * e.target.checked;
    this.price = 1 * e.target.getAttribute("data-price")
    this.id = e.target.id;
    this.totalPrice = this.value * this.price;
}

Input.prototype.getValueSelect = function (e) {
    switch (e.target.innerText) {
        case "Basic":
            this.value = 1
            this.price = 40
            this.package = "Basic"
            break;
        case "Professional":
            this.value = 1;
            this.price = 50;
            this.package = "Professional"
            break;
        case "Premium":
            this.value = 1;
            this.price = 60
            this.package = "Premium"
            break;
        default:
            this.value = 0;
    }
    this.id = e.currentTarget.id;
    this.totalPrice = this.value * this.price;

}


Input.prototype.displayElement = function (inputObject) {
    const div = document.querySelector(`.${inputObject.id}`)
    if (inputObject.value) {
        div.classList.add("displayFlex")
        if (div.querySelector(".calc__calculation")) {
            div.querySelector(".calc__calculation").innerText = `${this.value}*$${this.price}`
        };
        if (div.querySelector(".calc__package")) {
            div.querySelector(".calc__package").innerText = this.package;
        }
        div.querySelector(".calc__price").innerText = `$${this.totalPrice}`;
    } else {
        div.classList.remove("displayFlex")
    }

}


const handleDisplayFieldInput = function (e) {
    const inputObject = new Input();
    inputObject.getValueInput(e);
    console.log(inputObject);
    inputObject.displayElement(inputObject);
    arrayObjects.push(inputObject)

}

const handleDisplayFieldCheckbox = function (e) {
    const inputObject = new Input();
    inputObject.getValueCheckbox(e);
    console.log(inputObject);
    inputObject.displayElement(inputObject);
}

const handleDisplayFieldSelect = function (e) {
    const inputObject = new Input();
    inputObject.getValueSelect(e);
    console.log(inputObject);
    inputObject.displayElement(inputObject);
}


inputList[0].addEventListener("input", handleDisplayFieldInput)
inputList[1].addEventListener("input", handleDisplayFieldInput)
ulChoiceList.addEventListener("click", handleDisplayFieldSelect)
inputList[3].addEventListener("change", handleDisplayFieldCheckbox)
inputList[4].addEventListener("change", handleDisplayFieldCheckbox)


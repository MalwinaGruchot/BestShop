const form = document.querySelector(".calc__form");
const inputList = document.querySelectorAll(".calc__input");
const ulChoiceList = document.querySelector(".calc__list");
const container = document.querySelector(".calc__wrap");
const btnSpan = document.querySelector(".calc__priceTotal--bold");
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
}

Input.prototype.addInput = function (id) {
    this[id] = {
        value: 0,
        price: 0,
        totalPrice: 0,
        package: ""
    }
}

Input.prototype.getValueInput = function (e) {
    this[e.target.id]["value"] = (e.target.type === "checkbox") ? 1 * e.target.checked : 1 * e.target.value;
    this[e.target.id]["price"] = 1 * e.target.getAttribute("data-price")
    this[e.target.id]["totalPrice"] = this[e.target.id]["value"] * this[e.target.id]["price"];
};


Input.prototype.getValueSelect = function (e) {
    switch (e.target.innerText) {
        case "Basic":
            this[e.currentTarget.id]["value"] = 1
            this[e.currentTarget.id]["price"] = 40
            this[e.currentTarget.id]["package"] = "Basic"
            break;
        case "Professional":
            this[e.currentTarget.id]["value"] = 1;
            this[e.currentTarget.id]["price"] = 50;
            this[e.currentTarget.id]["package"] = "Professional"
            break;
        case "Premium":
            this[e.currentTarget.id]["value"] = 1;
            this[e.currentTarget.id]["price"] = 60
            this[e.currentTarget.id]["package"] = "Premium"
            break;
        default:
            this[e.currentTarget.id]["value"] = 0;
    }
    this[e.currentTarget.id]["totalPrice"] = this[e.currentTarget.id]["value"] * this[e.currentTarget.id]["price"];

}


Input.prototype.displayElement = function (e) {
    const div = document.querySelector(`.${e.currentTarget.id}`)

    if (this[e.currentTarget.id]["value"]) {
        div.classList.add("displayFlex")
        if (div.querySelector(".calc__calculation")) {
            div.querySelector(".calc__calculation").innerText = `${this[e.currentTarget.id]["value"]}*$${this[e.target.id]["price"]}`
        };
        if (div.querySelector(".calc__package")) {
            div.querySelector(".calc__package").innerText = this[e.currentTarget.id]["package"];
        }
        div.querySelector(".calc__price").innerText = `$${this[e.currentTarget.id]["totalPrice"]}`;
    } else {
        div.classList.remove("displayFlex")
    }

}

Input.prototype.getTotalPrice = function () {
    totalPrice = 0;
    const array = Object.values(this);
    console.log(array)
    array.forEach(function (item) {
        totalPrice = totalPrice + item.totalPrice;
    })
    btnSpan.innerText = `$${totalPrice}`
}

const handleDisplayFieldInput = function (e) {
    inputs.addInput(e.target.id)
    inputs.getValueInput(e);
    inputs.displayElement(e);
    inputs.getTotalPrice();

}
const handleDisplayFieldSelect = function (e) {
    inputs.addInput(e.currentTarget.id)
    inputs.getValueSelect(e);
    console.log(inputs);
    inputs.displayElement(e);
    inputs.getTotalPrice();

}

const inputs = new Input();
console.log(inputs)
inputList[0].addEventListener("input", handleDisplayFieldInput)
inputList[1].addEventListener("input", handleDisplayFieldInput)
ulChoiceList.addEventListener("click", handleDisplayFieldSelect)
inputList[3].addEventListener("change", handleDisplayFieldInput)
inputList[4].addEventListener("change", handleDisplayFieldInput)


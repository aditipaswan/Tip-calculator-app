"use strict";

const amtPerson = document.getElementById("tip-amount");
const amtTotal = document.getElementById("total");
const billInput = document.querySelector(".form__input-bill");
const peopleInput = document.querySelector(".form__input-people");
const customTipInput = document.querySelector(".form__input--custom");
const billWarning = document.querySelector(".warning-bill");
const peopleWarning = document.querySelector(".warning-people");
const resetForm = document.querySelector(".form__button");

function calcTip() {
  if (!validateInputs()) {
    return;
  }

  const bill = parseFloat(billInput.value);
  const numPeople = parseInt(peopleInput.value);
  const tipPercent = calcPercent();

  let tip = (bill * tipPercent) / 100;
  let tipPerPerson = tip / numPeople;
  let totalPerPerson = (bill + tip) / numPeople;

  amtPerson.textContent = `$${tipPerPerson.toFixed(2)}`;
  amtTotal.textContent = `$${totalPerPerson.toFixed(2)}`;
}

function calcPercent() {
  const customTip = Number(customTipInput.value);

  if (!isNaN(customTip) && customTip > 0) {
    return customTip;
  } else {
    const selectedRadio = document.querySelector('input[name="tip"]:checked');
    if (selectedRadio) {
      return parseFloat(selectedRadio.value);
    } else {
      return 0;
    }
  }
}

billInput.addEventListener("input", calcTip);
peopleInput.addEventListener("input", calcTip);

customTipInput.addEventListener("focus", () => {
  const radios = document.querySelectorAll('input[name="tip"]');
  radios.forEach((radio) => {
    radio.checked = false;
  });
  customTipInput.value = "";
});
customTipInput.addEventListener("input", calcTip);

const radios = document.querySelectorAll('input[name="tip"]');
radios.forEach((radio) => {
  radio.addEventListener("change", () => {
    customTipInput.value = "";
    calcTip();
  });
});

function validateInputs() {
  const bill = parseFloat(billInput.value);
  const numPeople = parseInt(peopleInput.value);

  let isValid = true;

  if (isNaN(bill) || bill <= 0) {
    showError(
      billInput,
      billWarning,
      bill <= 0 ? "Can't be 0" : "Can't be empty"
    );
    amtPerson.textContent = "$0.00";
    amtTotal.textContent = "$0.00";
    isValid = false;
  } else {
    hideError(billInput, billWarning);
  }

  if (isNaN(numPeople) || numPeople <= 0) {
    showError(
      peopleInput,
      peopleWarning,
      numPeople <= 0 ? "Can't be 0" : "Can't be empty"
    );
    amtPerson.textContent = "$0.00";
    amtTotal.textContent = "$0.00";
    isValid = false;
  } else {
    hideError(peopleInput, peopleWarning);
  }

  return isValid;
}

function handleFocusBlur(input, warning) {
  input.addEventListener("focus", () => {
    hideError(input, warning);
  });

  input.addEventListener("blur", () => {
    if (!input.value) {
      showError(input, warning, "Can't be empty");
    } else {
      validateInputs();
    }
  });
}

handleFocusBlur(billInput, billWarning);
handleFocusBlur(peopleInput, peopleWarning);

function showError(input, warning, message) {
  input.style.border = "2px solid var(--light-red)";
  warning.textContent = message;
  warning.style.display = "block";
}

function hideError(input, warning) {
  input.style.border = "";
  warning.style.display = "none";
}

resetForm.addEventListener("click", () => {
  amtPerson.textContent = "$0.00";
  amtTotal.textContent = "$0.00";

  hideError(billInput, billWarning);
  hideError(peopleInput, peopleWarning);
  customTipInput.value = "";

  const radios = document.querySelectorAll('input[name="tip"]');
  radios.forEach((radio) => {
    radio.checked = false;
  });
});
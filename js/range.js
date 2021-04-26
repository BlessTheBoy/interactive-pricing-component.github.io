const rangeInput = document.getElementById("range");
const views = document.getElementById("views");
const pricetags = document.querySelectorAll(".pricetag");
const rates = document.querySelectorAll(".rate");
const checkbox = document.getElementById("checkbox");

let percent = 0;
let checked = false;

const setPrice = (percentage, yearly) => {
  let price = 0;
  let rate = "";

  const changPrice = (view, price) => {
    views.innerHTML = view;
    pricetags.forEach((item) => (item.innerHTML = `$${price}.00`));
  };

  if (percentage <= 20) {
    price = 8;
    rate = "10K";
  } else if (percent <= 40) {
    price = 12;
    rate = "50K";
  } else if (percent <= 60) {
    price = 16;
    rate = "100K";
  } else if (percent <= 80) {
    price = 24;
    rate = "500K";
  } else {
    price = 36;
    rate = "1M";
  }
  if (yearly) {
    price *= 9;
    rates.forEach((item) => (item.innerHTML = ` annum`));
  } else {
    rates.forEach((item) => (item.innerHTML = `month`));
  }

  changPrice(rate, price);
};

const handleInput = (inputElement) => {
  let isChanging = false;

  const setCSSProperty = () => {
    percent =
      ((inputElement.value - inputElement.min) /
        (inputElement.max - inputElement.min)) *
      100;
    // Here comes the magic 🦄🌈
    inputElement.style.setProperty("--webkitProgressPercent", `${percent}%`);

    setPrice(percent, checked);
  };

  // Set event listeners
  const handleMove = () => {
    if (!isChanging) return;
    setCSSProperty();
  };
  const handleUpAndLeave = () => (isChanging = false);
  const handleDown = () => (isChanging = true);

  inputElement.addEventListener("mousemove", handleMove);
  inputElement.addEventListener("mousedown", handleDown);
  inputElement.addEventListener("mouseup", handleUpAndLeave);
  inputElement.addEventListener("mouseleave", handleUpAndLeave);
  inputElement.addEventListener("click", setCSSProperty);

  // Init input
  setCSSProperty();
};

handleInput(rangeInput);

checkbox.addEventListener("change", function () {
  if (this.checked) {
    checked = true;
  } else {
    checked = false;
  }
  setPrice(percent, checked);
});

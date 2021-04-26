const rangeInput = document.getElementById("range");

const handleInput = (inputElement) => {
  let isChanging = false;

  const setCSSProperty = () => {
    const percent =
      ((inputElement.value - inputElement.min) /
        (inputElement.max - inputElement.min)) *
      100;
    // Here comes the magic 🦄🌈
    inputElement.style.setProperty("--webkitProgressPercent", `${percent}%`);
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

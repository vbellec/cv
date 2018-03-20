const selectAllDataText = function () {
  const elements = Array.of(document.querySelectorAll('[data-text]'));
  for (let i = elements.length; i > -1; i--) {
    const element = elements[i];
    console.log(element);
  }
}
window.onload = function () {
  translateAll(getLanguage()).then(language => {
    const selectLanguages = this.document.querySelector('#select-languages');
    let optionLanguages = availableLanguages.filter(lang => lang.value !== language);
    optionLanguages.push(availableLanguages.find(lang => lang.value === language));
    for (let i = optionLanguages.length - 1; i > -1 ; i--) {
      const opt = this.document.createElement('OPTION'); //optionLanguages[i]
      opt.value = optionLanguages[i].value;
      opt.textContent = optionLanguages[i].text;
      selectLanguages.appendChild(opt);
    }

    selectLanguages.addEventListener('change', (evt) => {
      translateAll(evt.target.value);
    });
  });
}
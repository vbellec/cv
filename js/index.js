window.onload = function () {
  const bornDate = new Date(1998, 9, 19);
  const dateDiff = Date.now() - bornDate.getTime();

  translateAll('fr').then(language => {
    let optionLanguages = availableLanguages.filter(lang => lang.value !== language);
    optionLanguages.push(availableLanguages.find(lang => lang.value === language));
    for (let i = optionLanguages.length - 1; i > -1 ; i--) {
      const opt = this.document.createElement('OPTION'); //optionLanguages[i]
      opt.value = optionLanguages[i].value;
      opt.textContent = optionLanguages[i].text;
    }
  });

  this.document.querySelector('#span-years-old').textContent = (new Date(dateDiff)).getUTCFullYear() - 1970;
}

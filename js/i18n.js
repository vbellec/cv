const translations = [];

const getLanguage = function () {
  return navigator.language.split('-')[0];
};

const getTranslation = function (language) {
  return new Promise((resolve, reject) => {
    const index = translations.findIndex(translation => translation.language === language);

    if (index === -1) {
      ajaxGetJSONPromise(window.location + 'i18n/' + language + '.json')
        .then(translation => {
          translations.push(translation);
          resolve(translation);
        })
        .catch((err) => {
          if (err.status === 404) resolve(getTranslation('en'));
          reject(err);
        });
    } else {
      resolve(translations[index])
    }
  });
};

const translateAllDataText = function (language) {
  return new Promise(resolve => {
    const elements = document.querySelectorAll('[data-text]');
    getTranslation(language)
      .then(translation => {
        const { values } = translation;
        for (let i = 0; i < elements.length; i++) {
          const element = elements[i];
          const attributes = element.attributes;
          for (let j = 0; j < attributes.length; j++) {
            const attr = attributes[j];
            if (attr && attr.name === 'data-text') element.textContent = values[attr.value];
          }
          
        }
        for (let i = elements.length - 1; i > -1; i--) {
          const element = elements[i]
          const attributes = element.attributes;
          for (let j = attributes.length; j > -1; j--) {
            const attr = attributes[j];
            if (attr && attr.name === 'data-text') element.textContent = values[attr.value];
          }
        }
        resolve();
      });
  })
};

const translateProExp = function translateProfessionalExperience (language) {
  return new Promise(resolve => {
    const ul = document.querySelector('#ul-professional-experience');
    getTranslation(language)
      .then(translation => {
        const { proExp } = translation;
        for (let i = 0; i < proExp.length; i++) {
          ul.appendChild(createListGroupItemProExp(proExp[i])); 
        }
        resolve();
      });
  })
}

const translateLanguage = function (language) {
  return new Promise(resolve => {
    const div = document.querySelector('#div-parent-languages');
    getTranslation(language)
      .then(translation => {
        const { languages } = translation;
        console.log(languages)
        for (let i = 0; i < languages.skills.length; i++) {
          div.appendChild(createDivLanguage(languages.levels, languages.skills[i]));
        }
      });
  });
}
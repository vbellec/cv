const translations = [];

const availableLanguages = [
  {
    value: 'en',
    text: 'English',
  },
  {
    value: 'fr',
    text: 'Français',
  },
];

const getLanguage = function () {
  return navigator.language.split('-')[0];
};

const getTranslation = function (language) {
  return new Promise((resolve, reject) => {
    if (availableLanguages.findIndex(lang => lang.value === language) === -1) language = 'en';
    const index = translations.findIndex(translation => translation.language === language);

    if (index === -1) {
      ajaxGetJSONPromise(window.location + 'i18n/' + language + '.json')
        .then(translation => {
          for (let i = 0; i < translation.proExp.length; i++) {
            const { dates } = translation.proExp[i];
            const { start, end } = dates;

            translation.proExp[i].dates.start = (new Date(
              start.year, 
              start.month - 1, 
              start.day
            )).toLocaleDateString(language);
  
            translation.proExp[i].dates.end = (new Date(
              end.year,
              end.mouth - 1,
              end.day
            )).toLocaleDateString(language);
          }
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
    removeAllChild(ul);
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
    removeAllChild(div);
    getTranslation(language)
      .then(translation => {
        const { languages } = translation;
        for (let i = 0; i < languages.skills.length; i++) {
          div.appendChild(createDivLanguage(languages.levels, languages.skills[i]));
        }
        resolve();
      });
  });
}

const translateEducation = function (language) {
  return new Promise(resolve => {
    const ul = document.querySelector('#ul-education');
    removeAllChild(ul);
    getTranslation(language)
      .then(translation => {
        const { education } = translation;
        for (let i = 0; i < education.length; i++) {
          ul.appendChild(createLiEducation(education[i]));
        }
        resolve();
      });
  });
}

const translateInterest = function (language) {
  return new Promise(resolve => {
    const ul = document.querySelector('#ul-interest');
    removeAllChild(ul);
    getTranslation(language)
      .then(translation => {
        const { interest } = translation;
        for (let i = 0; i < interest.length; i++) {
          ul.appendChild(createLiInterest(interest[i]));
        }
      });
  });
}

const translateVarious = function (language) {
  return new Promise(resolve => {
    const div = document.querySelector('#div-sub-various');
    removeAllChild(div);
    getTranslation(language)
      .then(translation => {
        const { various } = translation;
        for (let i = 0; i < various.length; i++) {
          const p = document.createElement('P');
          p.innerHTML = various[i];
          div.appendChild(p);
        }
        resolve();
      });
  })
}

const translatePrint = function (language) {
  return new Promise(resolve => {
    getTranslation(language)
      .then(translation => {
        const a = document.querySelector('#a-print');
        const img = document.querySelector('#img-print');
        a.href = `documents/${translation.language}.pdf`;
        img.src = `images/index/${translation.language}.png`;
        resolve();
      })
  })
}

const translateAll = function (language) {
  return new Promise(resolve => {
    translateAllDataText(language).then(() => {
      translateProExp(language);
      translateLanguage(language);
      translateEducation(language);
      translateInterest(language);
      translateVarious(language);
      translatePrint(language);
      resolve(language);
    });
  });
}

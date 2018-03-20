const ajaxGetPromise = function (url) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = function () {
      if (this.status >= 200 && this.status < 300) {
        resolve(xhr.response);
      } else {
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      }
    };
    xhr.onerror = function () {
      reject({
        status: this.status,
        statusText: xhr.statusText
      });
    };
    xhr.send();
  });
}

const ajaxGetJSONPromise = function (url) {
  return new Promise((resolve, reject) => {
    ajaxGetPromise(url)
      .then(data => resolve(JSON.parse(data)))
      .catch(err => reject(err));
  });
}

const getLanguage = function () {
  return navigator.language.split('-')[0];
}

const translateAllDataText = function (language) {
  const elements = document.querySelectorAll('[data-text]');
  ajaxGetJSONPromise(window.location + 'i18n/' + language + '.json')
    .then(data => {
      for (let i = elements.length - 1; i > -1; i--) {
        const element = elements[i]
        const attributes = element.attributes;
        for (let j = attributes.length; j > -1; j--) {
          const attr = attributes[j];
          if (attr && attr.name === 'data-text') {
            if (element.tagName === "IMG") element.alt = data[attr.value];
            else element.textContent = data[attr.value];
          }
        }
      }
    })
    .catch(() => {
      translateAllDataText('en');
    });
}
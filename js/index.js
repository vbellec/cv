window.onload = () => {
  const language = getLanguage();
  translateAllDataText(language).then(() => {
    translateProExp(language);
    translateLanguage(language);
  });
}
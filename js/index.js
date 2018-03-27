window.onload = () => {
  const language = getLanguage();
  translateAllDataText(language).then(() => {
    translateProExp(language);
    translateLanguage(language);
    translateEducation(language);
    translateInterest(language);
    translateVarious(language);
  });
}
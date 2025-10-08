const saveNotesToLocalStorage = () => {
  const mainContainer = document.getElementById('mainContainer');
  const content = mainContainer.innerHTML;

  localStorage.setItem('mainContainerContent', content);
};


export { saveNotesToLocalStorage }
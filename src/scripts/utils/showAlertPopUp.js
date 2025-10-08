import { saveNotesToLocalStorage } from './saveNotesToLocalStorage.js';
import Lottie from 'lottie-web';

const showAlertPopUp = (body, mainContainer) => {
  const existingPopup = document.getElementById('popup');
  if (existingPopup) {
    existingPopup.remove();
  }

  const popup = document.createElement('div');
  popup.id = 'popup';
  popup.setAttribute('shown', 'true');
  popup.style.transition = '.3s';
  popup.style.opacity = '0';

  const popupAlertContainer = document.createElement('div');
  popupAlertContainer.id = 'popupAlertContainer';
  popupAlertContainer.classList.add('shadow');

  const alertLogoContainer = document.createElement('div');
  alertLogoContainer.id = 'alertLogoContainer';

  const alertIcon = document.createElement('div');
  alertIcon.id = 'alertIcon';
  alertIcon.style.width = '175px';
  alertIcon.style.height = '175px';
  alertLogoContainer.appendChild(alertIcon);

  setTimeout(() => {
    popup.style.opacity = '1';
    const alertAnimation = Lottie.loadAnimation({
      container: alertIcon,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: '/assets/AlertCharacter.json',
    });

    alertAnimation.play();
  }, 0);

  const title = document.createElement('h1');
  title.textContent = 'AWAS!';

  const message = document.createElement('p');
  message.textContent =
    'Anda akan membuang semua catatan anda, proses ini tidak akan dapat dikembalikan! Apakah anda yakin?';

  const buttonsContainer = document.createElement('div');
  buttonsContainer.id = 'confirmResetNotesButtons';

  const cancelResetBtn = document.createElement('button');
  cancelResetBtn.id = 'cancelResetAllNotes';
  cancelResetBtn.className = 'no-outline no-border';
  cancelResetBtn.textContent = 'Batalkan';

  const confirmResetBtn = document.createElement('button');
  confirmResetBtn.id = 'confirmResetAllnotes';
  confirmResetBtn.className = 'no-border no-outline';
  confirmResetBtn.textContent = 'Lanjutkan';

  buttonsContainer.append(cancelResetBtn, confirmResetBtn);
  popupAlertContainer.append(alertLogoContainer, title, message, buttonsContainer);
  popup.appendChild(popupAlertContainer);
  body.appendChild(popup);

  cancelResetBtn.addEventListener('click', () => {
    popup.style.opacity = '0';
    setTimeout(() => {
      popupElement.setAttribute('shown', 'false');
      popup.remove();
    }, 1001);
  });

  confirmResetBtn.addEventListener('click', () => {
    mainContainer.innerHTML = '';
    popupElement.setAttribute('shown', 'false');
    popup.remove();
    saveNotesToLocalStorage();

    location.reload();
  });

  const popupElement = document.getElementById('popup');
  document.addEventListener('keydown', (e) => {
    if (popupElement.getAttribute('shown') === 'true' && e.key === 'Escape') {
      popup.style.opacity = '0';
      setTimeout(() => {
        popupElement.setAttribute('shown', 'false');
        popup.remove();
      }, 1001);
    }
  });
};

export { showAlertPopUp };

import '../styles/style.css';
import Lottie from 'lottie-web';
import html2canvas from 'html2canvas';
import '@fortawesome/fontawesome-free/css/all.css';
import { save } from '@tauri-apps/plugin-dialog';
import { writeFile } from '@tauri-apps/plugin-fs';
import { createEditableNotes, setupEditorListeners } from './utils/editableNotes.js';
import { saveNotesToLocalStorage } from './utils/saveNotesToLocalStorage.js';
import { showAlertPopUp } from './utils/showAlertPopUp.js';

const setupEditorListenersForAll = () => {
  const editorContainers = document.querySelectorAll('#editorContainer');
  editorContainers.forEach((editorContainer) => {
    const noteOptionTab = editorContainer.querySelector('#noteOptionTab');

    const deleteNoteBtn = noteOptionTab.querySelector('#deleteNote');
    if (deleteNoteBtn) {
      deleteNoteBtn.addEventListener('click', (e) => {
        const noteToDelete = e.target.closest('#editorContainer');
        if (noteToDelete) {
          noteToDelete.remove();
          saveNotesToLocalStorage();
        }
      });
    }

    setupEditorListeners(editorContainer, noteOptionTab);
  });
};

document.addEventListener('DOMContentLoaded', () => {
  const loadingContainer = document.getElementById('loading');

  const paperplaneLoading = document.createElement('div');
  paperplaneLoading.id = 'paperplaneLoading';
  paperplaneLoading.style.width = '250px';
  paperplaneLoading.style.height = '250px';
  loadingContainer.appendChild(paperplaneLoading);

  const loadingAnimation = Lottie.loadAnimation({
    container: document.getElementById('paperplaneLoading'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: '/assets/Paperplane.json',
  });

  loadingAnimation.play();

  setTimeout(() => {
    loadingContainer.style.opacity = '0';
    loadingContainer.style.transition = '1s';
    setTimeout(() => {
      paperplaneLoading.remove();
      loadingContainer.remove();
    }, 1000);
  }, 1000);

  const mainContainer = document.getElementById('mainContainer');

  const mainLogo = document.createElement('img');
  mainLogo.id = 'mainLogo';
  mainLogo.src = './icons/512x512.png';
  mainLogo.alt = 'Main Logo';
  document.body.prepend(mainLogo);

  const menuWrapper = document.createElement('div');
  menuWrapper.id = 'menuWrapper';
  document.body.appendChild(menuWrapper);

  const menuTab = document.createElement('div');
  menuTab.id = 'menuTab';
  menuWrapper.appendChild(menuTab);
  const saveNotesBtn = document.createElement('button');
  saveNotesBtn.id = 'saveNotes';
  saveNotesBtn.classList.add('circle', 'no-border', 'no-outline');
  saveNotesBtn.innerHTML = '<i class="fa-solid fa-floppy-disk"></i>';
  menuTab.appendChild(saveNotesBtn);

  const addNotesBtn = document.createElement('button');
  addNotesBtn.id = 'addNotes';
  addNotesBtn.classList.add('circle', 'no-border', 'no-outline');
  addNotesBtn.innerHTML = '<i class="fa-solid fa-plus"></i>';
  menuTab.appendChild(addNotesBtn);

  const resetAllNotesBtn = document.createElement('button');
  resetAllNotesBtn.id = 'resetAllNotes';
  resetAllNotesBtn.classList.add('circle', 'no-border', 'no-outline');
  resetAllNotesBtn.innerHTML = '<i class="fa-solid fa-arrows-rotate"></i>';
  menuTab.appendChild(resetAllNotesBtn);

  const savedContent = localStorage.getItem('mainContainerContent');
  if (savedContent) {
    mainContainer.innerHTML = savedContent;
  }

  setupEditorListenersForAll();

  addNotesBtn.addEventListener('click', () => {
    createEditableNotes(mainContainer);
    setupEditorListenersForAll();
  });

  saveNotesBtn.addEventListener('click', async () => {
    const canvas = await html2canvas(mainContainer);
    const imageData = canvas.toDataURL('image/png');
    const base64Data = imageData.replace(/^data:image\/png;base64,/, '');
    const bytes = Uint8Array.from(atob(base64Data), (c) => c.charCodeAt(0));

    const filePath = await save({
      defaultPath: 'scribenote-screenshot.png',
      filters: [{ name: 'Images', extensions: ['png'] }],
    });

    if (filePath) {
      await writeFile(filePath, bytes)
    }

    saveNotesToLocalStorage();
  });

  resetAllNotesBtn.addEventListener('click', () => {
    showAlertPopUp(document.body, mainContainer);
  });
});

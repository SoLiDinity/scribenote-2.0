import { convertToHTML, convertToMarkdown } from './htmlMarkdownConversion.js';
import { getRandomPastelColor, rgbToHex } from './getRandomColor.js';
import { saveNotesToLocalStorage } from './saveNotesToLocalStorage.js';

const createEditableNotes = (mainContainer) => {
  const container = document.createElement('div');
  const div = document.createElement('div');
  const placeholder = document.createElement('p');

  const noteOptionTab = document.createElement('div');

  const bgColorSelectorContainer = document.createElement('div');
  const bgColorSelector = document.createElement('input');

  const textColorSelectorContainer = document.createElement('div');
  const textColorSelector = document.createElement('input');

  const deleteBtn = document.createElement('button');

  container.setAttribute('id', 'editorContainer');
  container.classList.add('note', 'no-border', 'no-outline', 'shadow');
  div.setAttribute('contenteditable', 'false');
  div.setAttribute('id', 'editor');
  placeholder.innerText = 'Click 2x untuk mengedit';

  noteOptionTab.setAttribute('id', 'noteOptionTab');
  noteOptionTab.classList.add('invisible');

  bgColorSelectorContainer.setAttribute('id', 'noteBgColorSelectorContainer');
  bgColorSelectorContainer.classList.add('circle', 'no-border', 'no-outline', 'color-input');

  textColorSelectorContainer.setAttribute('id', 'noteTextColorSelectorContainer');
  textColorSelectorContainer.classList.add('circle', 'no-border', 'no-outline', 'color-input');

  bgColorSelector.setAttribute('id', 'noteBgColorSelector');
  bgColorSelector.setAttribute('type', 'color');
  bgColorSelector.classList.add('no-border', 'no-outline');

  textColorSelector.setAttribute('id', 'noteTextColorSelector');
  textColorSelector.setAttribute('type', 'color');
  textColorSelector.classList.add('no-border', 'no-outline');

  deleteBtn.setAttribute('id', 'deleteNote');
  deleteBtn.classList.add('circle', 'no-border', 'no-outline');
  deleteBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';

  div.appendChild(placeholder);

  bgColorSelectorContainer.appendChild(bgColorSelector);
  textColorSelectorContainer.appendChild(textColorSelector);

  noteOptionTab.appendChild(bgColorSelectorContainer);
  noteOptionTab.appendChild(textColorSelectorContainer);
  noteOptionTab.appendChild(deleteBtn);

  container.appendChild(noteOptionTab);
  container.appendChild(div);
  mainContainer.appendChild(container);

  const pastelColor = getRandomPastelColor();

  container.style.backgroundColor = pastelColor;

  bgColorSelectorContainer.style.backgroundColor = pastelColor;
  bgColorSelector.setAttribute('value', rgbToHex(pastelColor));

  textColorSelectorContainer.style.backgroundColor = '#000000';
  textColorSelector.setAttribute('value', '#000000');

  setupEditorListeners(container, noteOptionTab);
};

const setupEditorListeners = (container, noteOptionTab) => {
  const divEditor = container.querySelector('#editor');
  const deleteBtn = noteOptionTab.querySelector('#deleteNote');
  const bgColorSelectorContainer = noteOptionTab.querySelector('#noteBgColorSelectorContainer');
  const textColorSelectorContainer = noteOptionTab.querySelector('#noteTextColorSelectorContainer');
  const bgColorSelector = noteOptionTab.querySelector('#noteBgColorSelector');
  const textColorSelector = noteOptionTab.querySelector('#noteTextColorSelector');

  let isDragging = false;
  let offsetX, offsetY;
  let lastTapTime = 0;

  const toggleEditable = () => {
    if (divEditor.getAttribute('contenteditable') === 'true') {
      return;
    }

    divEditor.setAttribute('contenteditable', 'true');
    divEditor.style.cursor = 'text';
    divEditor.addEventListener('mousedown', () => {
      divEditor.style.cursor = 'text';
    });

    divEditor.addEventListener('mouseup', () => {
      divEditor.style.cursor = 'text';
    });

    divEditor.addEventListener('mouseenter', () => {
      divEditor.style.cursor = 'text';
    });
    convertToMarkdown(divEditor);

    if (noteOptionTab.classList.contains('invisible')) {
      noteOptionTab.classList.remove('invisible');
      noteOptionTab.classList.add('visible');
    }
  };

  const toggleUnEditable = () => {
    if (divEditor.getAttribute('contenteditable') !== 'true') {
      return;
    }

    divEditor.setAttribute('contenteditable', 'false');
    divEditor.style.userSelect = 'none';
    divEditor.addEventListener('mousedown', () => {
      divEditor.style.cursor = 'grabbing';
    });

    divEditor.addEventListener('mouseup', () => {
      divEditor.style.cursor = 'grab';
    });

    divEditor.addEventListener('mouseenter', () => {
      divEditor.style.cursor = 'grab';
    });
    convertToHTML(divEditor);

    if (noteOptionTab.classList.contains('visible')) {
      noteOptionTab.classList.remove('visible');
      noteOptionTab.classList.add('invisible');
    }
  };

  const handleMobileDoubleTouch = (e) => {
    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTapTime;

    if (tapLength < 500 && tapLength > 0) {
      e.preventDefault();
      toggleEditable();
    }

    lastTapTime = currentTime;
  };

  const startDrag = (e) => {
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const isTextSelected = window.getSelection().toString().length > 0;
    if (!isTextSelected && divEditor.getAttribute('contenteditable') === 'false') {
      isDragging = true;
      offsetX = clientX - container.getBoundingClientRect().left;
      offsetY = clientY - container.getBoundingClientRect().top;
      container.style.cursor = 'grabbing';
      e.preventDefault();
    }
  };

  const onDrag = (e) => {
    if (isDragging) {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      container.style.left = `${clientX - offsetX}px`;
      container.style.top = `${clientY - offsetY}px`;
    }
  };

  const stopDrag = () => {
    isDragging = false;
    container.style.cursor = 'grab';
    saveNotesToLocalStorage();
  };

  divEditor.addEventListener('blur', (e) => {
    const relatedTarget = e.relatedTarget || document.activeElement;
    if (relatedTarget && container.contains(relatedTarget)) {
      return;
    }

    toggleUnEditable();
    saveNotesToLocalStorage();
  });

  document.addEventListener('keydown', (e) => {
    if (divEditor.getAttribute('contenteditable') == 'true' && e.key === 'Escape') {
        toggleUnEditable();
        saveNotesToLocalStorage();
      }
  });

  container.addEventListener('dblclick', () => {
    toggleEditable();
  });

  container.addEventListener('touchstart', (e) => {
    handleMobileDoubleTouch(e);
  });

  container.addEventListener('mousedown', startDrag);
  document.addEventListener('mousemove', onDrag);
  document.addEventListener('mouseup', stopDrag);

  container.addEventListener('touchstart', startDrag);
  document.addEventListener('touchmove', onDrag);
  document.addEventListener('touchend', stopDrag);

  container.addEventListener('mouseenter', () => {
    container.style.cursor = 'grab';
  });

  container.addEventListener('mouseleave', () => {
    container.style.cursor = 'text';
  });

  if (deleteBtn) {
    deleteBtn.addEventListener('click', () => {
      console.log('delete');

      container.remove();
    });
  }

  if (bgColorSelector && textColorSelector) {
    bgColorSelector.addEventListener('input', () => {
      container.style.backgroundColor = bgColorSelector.value;
      bgColorSelectorContainer.style.backgroundColor = bgColorSelector.value;
      bgColorSelector.setAttribute('value', `${bgColorSelector.value}`);
    });

    textColorSelector.addEventListener('input', () => {
      container.style.color = textColorSelector.value;
      textColorSelectorContainer.style.backgroundColor = textColorSelector.value;
      textColorSelector.setAttribute('value', `${textColorSelector.value}`);
    });
  }
};

export { createEditableNotes, setupEditorListeners };

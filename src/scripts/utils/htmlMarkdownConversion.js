import TurndownService from 'turndown';
import {marked} from 'marked';

const convertToHTML = (currentEditor) => {
  const markdownText = currentEditor.innerText;
  const html = marked.parse(markdownText);
  currentEditor.innerHTML = html;
  placeCaretAtEnd(currentEditor);
};

const convertToMarkdown = (currentEditor) => {
  const turndownService = new TurndownService();
  const markdown = turndownService.turndown(currentEditor.innerHTML);
  currentEditor.innerText = markdown;
  placeCaretAtEnd(currentEditor);
};

const placeCaretAtEnd = (el) => {
  el.focus();
  const range = document.createRange();
  range.selectNodeContents(el);
  range.collapse(false);
  const sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);
};

export { convertToHTML, convertToMarkdown };

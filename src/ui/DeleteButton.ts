import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { icon } from '@fortawesome/fontawesome-svg-core';

/**
 * @returns {HTMLButtonElement}
*/
export function CreateButton(): HTMLButtonElement {
  const button = document.createElement('button');
  const i = icon(faTrash, {
    title: 'Delete',
  });
  button.appendChild(i.node[0]);
  return button;
}
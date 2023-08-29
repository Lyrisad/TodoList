

import { update } from "./main.js";
import { MyFramework } from "./classes/framework.js";

const maListe = new MyFramework();

export function ajoutTache(maListe) {

  document.querySelector('a').addEventListener('click', function (event) {
    event.preventDefault();  // Empêcher le comportement par défaut du lien
    // Votre code ici
  });

  const textAfaire = document.querySelector('.aFaire');
  const liste = document.querySelector('.Liste');
  const countAfaireStr = document.querySelector('#count');

  let countAfaire = 0;
  countAfaireStr.textContent = countAfaire;

  if (countAfaireStr !== null) {
    countAfaire = parseInt(countAfaireStr.innerText);
  } else {
    console.error('Element with id "count" not found!');
  }

  const creationTache = maListe.createElement('li', { class: 'all-active' });


  const tacheDiv = maListe.createElement('div', { class: 'tache' });
  const textDiv = maListe.createElement('div', { class: 'texte-tache' }, textAfaire.value);
  if (textDiv.innerText.length > 20) {
    const truncatedText = textDiv.innerText.substring(0, 20) + '..';
    textDiv.innerText = truncatedText;
  }
  const checkboxDiv = maListe.createElement('div', { class: 'checkbox' });
  const deleteDiv = maListe.createElement('div', { class: 'delete-button' });

  maListe.addElement(creationTache, tacheDiv);
  maListe.addElement(tacheDiv, textDiv);
  maListe.addElement(tacheDiv, checkboxDiv);
  maListe.addElement(tacheDiv, deleteDiv);

  const checkbox = maListe.createElement('input', { type: 'checkbox' });
  const deleteButton = maListe.createElement('button', { class: 'delete-button' });
  deleteButton.innerHTML = '&#10005;';

  maListe.addElement(checkboxDiv, checkbox);
  maListe.addElement(deleteDiv, deleteButton);

  maListe.setStyle(tacheDiv, { display: 'flex', alignItems: 'center' });
  maListe.setStyle(textDiv, { marginRight: '10px', width: '210px' });
  maListe.setStyle(checkboxDiv, { marginRight: '10px' });

  if (textAfaire.value.length > 0) {
    maListe.addElement(liste, creationTache);
    deleteButton.addEventListener('click', function () {
      maListe.removeElement(liste, creationTache);
      const checkedElements = liste.querySelectorAll('li.all-active');
      const checkedCount = checkedElements.length;
      console.log("Nombre d'éléments cochés : " + checkedCount);
      countAfaireStr.textContent = checkedCount
      update()
    });//a rectifier
  }
  checkbox.addEventListener('click', () => {
    if (checkbox.checked) {
      maListe.setStyle(textDiv, { textDecoration: 'line-through', color: 'grey', opacity: '0.5' });
      if (creationTache.classList.contains('all-active')) {
        maListe.changeClass(creationTache, 'all-active', 'all-completed');

      }
    } else {
      maListe.setStyle(textDiv, {
        textDecoration: 'none',
        color: 'unset',
        opacity: '1'
      });
      if (creationTache.classList.contains('all-completed')) {
        maListe.changeClass(creationTache, 'all-completed', 'all-active');
      }
    }
    // Comptez tous les éléments cochés
    const checkedElements = liste.querySelectorAll('li.all-active');
    const checkedCount = checkedElements.length;
    console.log("Nombre d'éléments cochés : " + checkedCount);
    countAfaireStr.textContent = checkedCount
  });
  maListe.addEvent(textDiv, 'dblclick', function (event) {

    const spanTexte = event.target;
    const ancienContenu = spanTexte.textContent;

    const inputTexte = maListe.createElement('input', { type: 'text', value: ancienContenu });
    maListe.modifyElementContent(spanTexte, '');
    maListe.addElement(spanTexte, inputTexte);

    inputTexte.focus();
    inputTexte.setSelectionRange(inputTexte.value.length, inputTexte.value.length);

    inputTexte.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === 'Escape') {
        const nouveauContenu = inputTexte.value;
        if (nouveauContenu.length > 0){
          maListe.modifyElementContent(spanTexte, nouveauContenu);
          maListe.removeElement(inputTexte.parentNode, inputTexte);
        }
      }
    });
  });
}

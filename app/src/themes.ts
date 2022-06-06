import { darkEva, darkJoy, darkSber, sberBox } from '@sberdevices/plasma-tokens';
import css from 'json-to-css';

export const themes = { eva: darkEva, joy: darkJoy, sber: darkSber };

export function getTheme(character) {
  return css.of(themes[character]);
}

const sheetIndex = 1;

export function setTheme(character) {
  let sheet = document.styleSheets[sheetIndex];

  // @ts-ignore
  if (sheet.cssRules[0].selectorText === ':root') {
    sheet.deleteRule(0);
  }
  sheet.insertRule(getTheme(character), 0);
}

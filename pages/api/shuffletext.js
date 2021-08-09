/* 
1. Exportiert eine Funktion, die req und res entgegegennimmt.
2. Die GET-Parameter, die man beim Aufruf der URL nutzt, sind in req.query 
zu finden. Holt dort den Wert für text heraus, nehmt "" als Standard.
Zum testen einfach console.log nutzen, ABER der Text wird im Editor-Terminal
ausgegeben, nicht im Browser!
3. Mischt den Text durcheinander und fügt ihn dann wieder zusammen.
4. Gebt den Text in einem JSON-Objekt unter dem Schlüssel text zurück.
*/
import { replace, shuffle } from '../../library/helpers';

// s.a. https://www.npmjs.com/package/react-shuffle-text
export default function shuffleText(req, res) {
  console.log(req.query);

  let { text = ' ' } = req.query;
  console.log(text);

  let textArray;
  let wordArray;
  let shuffledText = '';
  let shuffled;

  if (text.includes(' ')) {
    text = replace(text, ',', ' , ');
    text = replace(text, '.', ' .');

    wordArray = text.split(' ');
  } else {
    textArray = text.split('');
  }

  if (wordArray) {
    for (let i = 0; i < wordArray.length; i++) {
      shuffled = shuffle(wordArray[i]).join('') + ' ';
      shuffledText = shuffledText + shuffled;
    }
  } else {
    shuffledText = shuffle(textArray).join('');
  }
  console.log(shuffledText);

  // // meine Lösung mit Option auf verschiedene Split-Kriterien:
  // const textArray = text.split('');
  // const shuffledText = shuffle(textArray.join(''));

  // // Friedrichs Lösung - one step:
  // const shuffledText = shuffle([...text]).join('');

  res.status(200).json({ text: shuffledText });
}

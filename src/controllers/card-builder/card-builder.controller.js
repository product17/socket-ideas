import Card from './card.model';
import { applyPatch } from 'fast-json-patch';

export function getCard(cardId) {
  return new Promise((resolve, reject) => {
    Card.findOne({ _id: cardId }, (err, card) => {
      if (err) {
        return reject(err);
      }

      resolve(card);
    });
  });
}

// This is also the create, patch the name to initialize
export function patchCard(cardId, patch) {
  return new Promise((resolve, reject) => {
    // ToDo: log the patches to keep track of changes
    let update = applyPatch({}, [patch]).newDocument;
    if (cardId === undefined) {
      return Card.create(update, (err, card) => {
        if (err) {
          return reject(err);
        }

        resolve(card);
      });
    }

    Card.updateOne({ _id: cardId }, update, (err, card) => {
      if (err) {
        return reject(err);
      }

      resolve(card);
    });
  });
}

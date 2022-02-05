const SUITS = ["♠", "♣", "♥", "♦"];
const VALUES = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
];

export default class Deck {
  constructor(cards = freshDeck()) {
    this.cards = cards;
  }

  get numberOfCards() {
    return this.cards.length;
  }

  static midpoint(inputDeck) {
    return Math.ceil(inputDeck.numberOfCards / 2);
  }

  pop() {
    return this.cards.shift();
  }

  push(card) {
    this.cards.push(card);
  }

  static halfDeck(inputDeck) {
    let mid = Deck.midpoint(inputDeck);
    let firstHalf = new Deck(inputDeck.cards.slice(0, mid));
    let secondHalf = new Deck(
      inputDeck.cards.slice(mid, inputDeck.numberOfCards)
    );
    return [firstHalf,secondHalf];
  }

  static shuffle(inputDeck) {
    for (let i = inputDeck.numberOfCards - 1; i > 0; i--) {
      const newIndex = Math.floor(Math.random() * (i + 1));
      const oldValue = inputDeck.cards[newIndex];
      inputDeck.cards[newIndex] = inputDeck.cards[i];
      inputDeck.cards[i] = oldValue;
    }
  }
}

export class Card {
  constructor(suit, value) {
    this.suit = suit;
    this.value = value;
  }

  get color() {
    return this.suit === "♣" || this.suit === "♠" ? "black" : "red";
  }


  getHTML() {
    const cardDiv = document.createElement("div")
    cardDiv.innerText = this.suit + ' ' + this.value;
    cardDiv.dataset.value = this.color;
    cardDiv.dataset.value = `${this.value} ${this.suit}`
    return cardDiv
  }


  getText() {
    return `${this.value} ${this.suit}`
  }
}

function freshDeck() {
  return SUITS.flatMap((suit) => {
    return VALUES.map((value) => {
      return new Card(suit, value);
    });
  });
}

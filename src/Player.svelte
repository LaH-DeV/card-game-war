<script>
  import { createEventDispatcher, onMount } from "svelte";
  let dispatch = createEventDispatcher();
  export let myDeck;
  export let name;
  let length = myDeck.numberOfCards;

  export function updateDeck(newDeck) {
    const { cards } = newDeck;
    myDeck.cards = cards;
    restartGame();
  }

  export function addCards(cardsWon) {
    const { cards } = myDeck;
    let newCards = [...cards, ...cardsWon];
    myDeck.cards = newCards;
    length = myDeck.numberOfCards;
  }

  export function checkLength() {
    length = myDeck.numberOfCards;
    return length;
  }

  export function getCard() {
    let card = myDeck.cards.shift();
    length = myDeck.numberOfCards;
    return card;
  }

  let defaultClass;
  let counter;
  onMount(() => {
    defaultClass = document.querySelector("#two").className;
    counter = 0;
  });

  export function reverse(lastRoundWinner, card) {
    if (length <= 0) {
      dispatch("handleEndGame", name);
      return;
    }
    const deckElement = document.querySelector(`.deck-${name}`);
    let firstChild = deckElement.firstChild;
    let secondChild = deckElement.querySelector("#two");
    let thirdChild = deckElement.querySelector("#three");
    let fourthChild = deckElement.lastChild;
    let cardSuit = card.suit;
    let cardValue = card.value;
    let cardImagePath = `./images/${cardSuit}_${cardValue}.png`;
    if (counter === 0) {
      firstChild.className = defaultClass + " hidden";
      secondChild.className = defaultClass + " hidden";
      thirdChild.className = defaultClass;
      fourthChild.firstChild.lastChild.firstChild.setAttribute(
        "src",
        cardImagePath
      );
      fourthChild.firstChild.lastChild.dataset.value =
        cardValue + " " + cardSuit;
      fourthChild.className = defaultClass + " rotate";
      counter = 2;
    } else if (counter === 1) {
      thirdChild.className = defaultClass;
      secondChild.className = defaultClass + " hidden";
      getCardWinnerAndSetClasses(firstChild, lastRoundWinner);
      fourthChild.firstChild.lastChild.firstChild.setAttribute(
        "src",
        cardImagePath
      );
      fourthChild.firstChild.lastChild.dataset.value =
        cardValue + " " + cardSuit;
      fourthChild.className = defaultClass + " rotate";

      counter = 2;
    } else if (counter === 2) {
      firstChild.className = defaultClass + " hidden";
      secondChild.className = defaultClass;
      thirdChild.firstChild.lastChild.firstChild.setAttribute(
        "src",
        cardImagePath
      );
      thirdChild.firstChild.lastChild.dataset.value =
        cardValue + " " + cardSuit;
      thirdChild.className = defaultClass + " rotate";

      getCardWinnerAndSetClasses(fourthChild, lastRoundWinner);

      counter = 3;
    } else if (counter === 3) {
      firstChild.className = defaultClass;
      secondChild.firstChild.lastChild.firstChild.setAttribute(
        "src",
        cardImagePath
      );
      secondChild.firstChild.lastChild.dataset.value =
        cardValue + " " + cardSuit;
      secondChild.className = defaultClass + " rotate";
      getCardWinnerAndSetClasses(thirdChild, lastRoundWinner);
      fourthChild.className = defaultClass + " hidden";
      counter = 4;
    } else if (counter === 4) {
      fourthChild.className = defaultClass;
      firstChild.firstChild.lastChild.firstChild.setAttribute(
        "src",
        cardImagePath
      );
      firstChild.firstChild.lastChild.dataset.value =
        cardValue + " " + cardSuit;
      firstChild.className = defaultClass + " rotate";
      getCardWinnerAndSetClasses(secondChild, lastRoundWinner);
      thirdChild.className = defaultClass + " hidden";
      counter = 1;
    }
  }

  function getCardWinnerAndSetClasses(node, lastRoundWinner) {
    if (lastRoundWinner === name || lastRoundWinner === "nobody") {
      //card is going back
      node.className = node.className + " return";
    } else {
      if (name === "player") {
        //card need to be send up
        node.className = node.className + " up";
      } else {
        //card need to be send down
        node.className = node.className + " down";
      }
    }
  }

  function restartGame() {
    const deckElement = document.querySelector(`.deck-${name}`);
    deckElement.firstChild.className = defaultClass;
    deckElement.querySelector("#two").className = defaultClass;
    deckElement.querySelector("#three").className = defaultClass;
    deckElement.lastChild.className = defaultClass;
    counter = 0;
    console.log(myDeck);
    length = myDeck.numberOfCards;
  }

  let capitalName = name.substring(0, 1).toUpperCase();
  capitalName = capitalName + name.substring(1);
</script>

<div class={`deck-${name}`}>
  <div id="one" class="card">
    <div class="inner-box">
      <div class="card-back">
        <div class="back-inner">
          <div class="back-smallest">{capitalName}<br />Cards: {length}</div>
        </div>
      </div>
      <div class="card-front"><img src="" alt="card-front" /></div>
    </div>
  </div>
  <div id="two" class="card">
    <div class="inner-box">
      <div class="card-back">
        <div class="back-inner">
          <div class="back-smallest">{capitalName}<br />Cards: {length}</div>
        </div>
      </div>
      <div class="card-front"><img src="" alt="card-front" /></div>
    </div>
  </div>
  <div id="three" class="card">
    <div class="inner-box">
      <div class="card-back">
        <div class="back-inner">
          <div class="back-smallest">{capitalName}<br />Cards: {length}</div>
        </div>
      </div>
      <div class="card-front"><img src="" alt="card-front" /></div>
    </div>
  </div>
  <div id="four" class="card">
    <div class="inner-box">
      <div class="card-back">
        <div class="back-inner">
          <div class="back-smallest">{capitalName}<br />Cards: {length}</div>
        </div>
      </div>
      <div class="card-front"><img src="" alt="card-front" /></div>
    </div>
  </div>
</div>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  .deck-computer {
    width: 149px;
    height: 224px;
    position: relative;
    margin-left: 20px;
    border-radius: 0.5rem;
    box-shadow: 0 1px 5px 1px #333;
  }
  .deck-player {
    width: 149px;
    height: 224px;
    position: relative;
    margin-left: 20px;
    border-radius: 0.5rem;
    box-shadow: 0 1px 5px 1px #333;
  }

  img {
    height: 224px;
    border: 1px solid black;
    padding: 0 1px;
    -webkit-user-drag: none;
    border-radius: 15px;
    box-shadow: 0 2px 10px 2px black;
  }

  .card {
    height: 100%;
    width: 100%;
    position: absolute;
    perspective: 1000px;
    transition: transform 0.65s, opacity 0.4s;
  }
  .card.black {
    color: black;
  }

  .card.red {
    color: red;
  }
  .card.rotate {
    transform: translateX(200px);
  }

  .card.hidden {
    opacity: 0;
  }

  .card.up {
    transform: translateX(-100px) translateY(-100px);
    opacity: 0;
  }

  .card.return {
    transform: translateX(0);
    opacity: 0;
  }

  .card.down {
    transform: translateX(-100px) translateY(100px);
    opacity: 0;
  }

  .inner-box {
    position: absolute;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: transform 0.65s;
  }
  .card.hidden .inner-box {
    opacity: 0;
  }
  .card-front,
  .card-back {
    position: absolute;
    display: flex;
    /* border: 1px solid black; */
    border-radius: 0.5rem;
    justify-content: center;
    text-align: center;
    user-select: none;
    align-items: center;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
  }
  .card-back {
    /* background-color: rgb(68, 68, 245); */
    background-color: white;
    color: white;
    border: 1px solid white;
  }

  .back-inner {
    background-color: #305e76;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 95%;
    height: 98%;
    border-radius: 0.5rem;
  }
  .back-smallest {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid white;
    border-radius: 0.5rem;
    width: 95%;
    height: 98%;
  }

  .card-front {
    background-color: transparent;
    transform: rotateY(-180deg);
    font-size: 3.5rem;
  }
  .card.rotate .inner-box {
    transform: rotateY(180deg);
  }

  /* .card-front::before,
  .card-front::after {
    position: absolute;
    content: attr(data-value);
    font-size: 1.3rem;
  }
  .card-front::before {
    top: 0.5rem;
    left: 0.5rem;
  }

  .card-front::after {
    bottom: 0.5rem;
    right: 0.5rem;
    transform: rotate(180deg);
  } */
</style>

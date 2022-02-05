<script>
  import Player from "./Player.svelte";
  import Deck, { Card } from "./deck.js";
  const CARD_VALUE_MAP = {
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "10": 10,
    J: 11,
    Q: 12,
    K: 13,
    A: 14,
  };

  let table_1;
  let table_2;
  function isRoundWinner(cardOne, cardTwo) {
    return CARD_VALUE_MAP[cardOne.value] > CARD_VALUE_MAP[cardTwo.value];
  }

  function handleEndGame(event) {
    if (event === "player") {
      text = "Player wins the game!";
    } else {
      text = "Computer wins the game!";
    }
  }
  let deck = new Deck();
  Deck.shuffle(deck);
  let playerDeck = Deck.halfDeck(deck)[0];
  let computerDeck = Deck.halfDeck(deck)[1];
  // let dekkkk = new Deck([
  //   new Card("♠", "2"),
  //   new Card("♣", "2"),
  //   new Card("♣", "3"),
  //   new Card("♠", "3"),
  //   new Card("♣", "4"),
  //   new Card("♠", "4"),
  // ]); for debug
  let lastRoundWinner = "player";
  let text = "Click button to play";

  function restartGame(e) {
    deck = new Deck();
    Deck.shuffle(deck);
    playerDeck = Deck.halfDeck(deck)[0];
    computerDeck = Deck.halfDeck(deck)[1];
    // dekkkk = new Deck([
    //   new Card("♠", "2"),
    //   new Card("♣", "2"),
    //   new Card("♣", "3"),
    //   new Card("♠", "3"),
    //   new Card("♣", "4"),
    //   new Card("♠", "4"),
    // ]); for debug
    table_1.updateDeck(playerDeck);
    table_2.updateDeck(computerDeck);
    lastRoundWinner = "player";
    text = "Click button to play";
    e.target.innerText = "Check";
  }
</script>

<div class="gameboard">
  <h1 class="title">WAR</h1>
  <div class="table">
    <Player
      name="computer"
      bind:this={table_2}
      myDeck={computerDeck}
      on:endGame={handleEndGame}
    />
  </div>
  <h2 class="game-text">{text}</h2>
  <div class="table">
    <Player
      name="player"
      bind:this={table_1}
      myDeck={playerDeck}
      on:endGame={handleEndGame}
    />
  </div>
</div>
<button
  class="check-btn"
  on:click={(e) => {
    if (e.target.innerText === "Restart") {
      restartGame(e);
    } else {
      e.target.disabled = true;
      e.target.innerText = "Checking...";

      let card_1 = table_1.getCard();
      let card_2 = table_2.getCard();

      if (isRoundWinner(card_1, card_2)) {
        text = "Round won";
        lastRoundWinner = "player";
        table_1.addCards([card_1, card_2]);
      } else if (isRoundWinner(card_2, card_1)) {
        lastRoundWinner = "computer";
        table_2.addCards([card_2, card_1]);
        text = "Round lost";
      } else {
        table_1.addCards([card_1]);
        table_2.addCards([card_2]);
        text = "Draw";
      }
      if (table_1.checkLength() === 0 || table_2.checkLength() === 0) {
        handleEndGame("player");
        setTimeout(() => {
          e.target.disabled = false;
          e.target.innerText = "Restart";
        }, 550);
        return;
      }
      table_1.reverse(lastRoundWinner, card_1);
      table_2.reverse(lastRoundWinner, card_2);
      setTimeout(() => {
        e.target.disabled = false;
        e.target.innerText = "Check";
      }, 550);
    }
  }}>Check</button
>

<style>
  .title,
  .game-text {
    color: wheat;
    text-align: center;
    margin-bottom: 20px;
  }
  .title {
    font-size: 4rem;
  }

  .check-btn {
    width: 250px;
    font-size: 2rem;
    font-weight: bold;
    border-radius: 10px;
    border: 1px dashed purple;
    background-color: teal;
    color: rgb(49, 49, 49);
    transition: color 0.2s, background-color 0.2s, border-color 0.2s,
      content 0.2s, opacity 0.2s;
    opacity: 1;
  }
  .check-btn:disabled {
    opacity: 0.3;
    border-color: black;
    background-color: teal;
    color: black;
  }
  .check-btn:active,
  .check-btn:focus {
    border-color: rgb(162, 12, 162);
    background-color: rgb(25, 150, 150);
    color: rgb(38, 38, 38);
  }

  .table {
    background-image: url("../images/table.jpeg");
    background-size: cover;
    --width: 400px;
    --height: 300px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: var(--width);
    height: var(--height);
    border: 1px dashed brown;
    margin-bottom: 20px;
    position: relative;
    perspective: 1000px;
  }
</style>

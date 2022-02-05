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
    transform: rotateX(10deg);
  }
  .deck-player {
    width: 149px;
    height: 224px;
    position: relative;
    margin-left: 20px;
    border-radius: 0.5rem;
    box-shadow: 0 1px 5px 1px #333;
    transform: rotateX(10deg);
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
    transition: transform 0.65s, opacity 0.1s;
  }
  .card.black {
    color: black;
  }

  .card.red {
    color: red;
  }
  .card.rotate {
    transform: translateX(200px) rotateX(10deg);
  }

  .card.hidden {
    opacity: 0;
  }

  .card.up {
    transform: translateX(-100px) translateY(-100px) rotateX(10deg);
    opacity: 0;
  }

  .card.return {
    transform: translateX(0) rotateX(10deg);
    opacity: 0;
  }

  .card.down {
    transform: translateX(-100px) translateY(100px) rotateX(10deg);
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
    transform: rotateY(-180deg) rotateX(10deg);
    font-size: 3.5rem;
  }
  .card.rotate .inner-box {
    transform: rotateY(180deg) rotateX(10deg);
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

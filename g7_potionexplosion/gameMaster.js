class GameMaster {
  constructor(){
    this.player1 = new NewPlayer("1");
    this.player2 = new NewPlayer("2");
    this.dispenser = new MarbleDispenser();
    this.gameStartPotIndex = 1;
    this.canEndTurn = false;

  }

    gameStartTurn(){
      this.player1.myTurn = true;
    }
    generatePotion(potionPlayer){
      if (potionPlayer === "1"){
        this.player1Potion = new Potion("1");
        this.player1Potion.render(potionPlayer);

      }
      else if (potionPlayer === "2"){
        this.player2Potion = new Potion("2");
        this.player2Potion.render(potionPlayer);

      }
    }

    updatePoints(playerNum){
      if (playerNum === "1"){
        var dataPoints1 = $("[data-player-points='1']");
        dataPoints1.text("Player 1 Potion Points: " + this.player1.completePotions)
      }
      else if (playerNum === "2") {
        var dataPoints2 = $("[data-player-points='2']");
        dataPoints2.text("Player 2 Potion Points: " + this.player2.completePotions)
      }
    }
    endTurn() {
      debugger;
      if (gameMaster.player1.myTurn === true) {
      gameMaster.player1.myTurn = false;
      gameMaster.player2.myTurn = true;
      for (var i = 0 ; gameMaster.player1.hand.length; ){
        var randomNumber = Math.floor(Math.random() * gameMaster.dispenser.dispenserArray.length);
        if (gameMaster.dispenser.dispenserArray[randomNumber].length < 9) {
          var marbleClass = gameMaster.player1.hand[0].attr('class')
          var tempDomElem = $("<div>").attr('class',marbleClass)
          var tempSpliceArray = gameMaster.player1.hand.splice(i, 1);
          var currentRow = $("[data-row=" + randomNumber + "]")
          currentRow.append(tempDomElem);
          gameMaster.dispenser.dispenserArray[randomNumber].push(tempSpliceArray[0]);


        }

      }


      }
      else if (gameMaster.player2.myTurn === true) {
        gameMaster.player2.myTurn = false;
        gameMaster.player1.myTurn = true;
        for (var i = 0; gameMaster.player2.hand.length;) {
          var randomNumber = Math.floor(Math.random() * gameMaster.dispenser.dispenserArray.length);
          if (gameMaster.dispenser.dispenserArray[randomNumber].length < 9) {
            var marbleClass = gameMaster.player2.hand[0].attr('class')
            var tempDomElem = $("<div>").attr('class', marbleClass)
            var tempSpliceArray = gameMaster.player2.hand.splice(i, 1);
            var currentRow = $("[data-row="+randomNumber+"]")
            currentRow.append(tempDomElem);
            gameMaster.dispenser.dispenserArray[randomNumber].push(tempSpliceArray[0]);

          }
        }

      }
      gameMaster.dispenser.marbleClick();
    }

    generatePotionGameStart(){
      this.player1Potion = new Potion("1");
      this.player2Potion = new Potion("2");



      this.player1Potion.render();
      this.player2Potion.render();
      this.player1Potion.randomizePotion();
      this.player2Potion.randomizePotion();


    }

    gameStartRender(){
      this.dispenser.setUpDispenser();

      this.gameStartTurn();
      this.player1.render();
      this.player2.render();
      this.generatePotionGameStart()
    }

}

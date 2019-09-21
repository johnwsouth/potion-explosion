class Potion {
  constructor(player){
      this.redMarbleMax = null;
      this.blueMarbleMax = null;
      this.yellowMarbleMax = null;

      this.redMarbleCurrentVal = 0;
      this.blueMarbleCurrentVal = 0;
      this.yellowMarbleCurrentVal = 0;

      this.potionsPlayer = player;

      this.render = this.render.bind(this);
      this.handleClick = this.handleClick.bind(this);
      this.addPoint = this.addPoint.bind(this);

    }
    randomizePotion(){

      var randArray = []
      for (var i = 0 ; i < 3 ; i++){
        var randomNum = Math.floor(Math.random() * 3 + 2);
        randArray.push(randomNum);
      }
      this.redMarbleMax = randArray[0];
      this.blueMarbleMax = randArray[1];
      this.yellowMarbleMax = randArray[2];

      this.redTile.text("" + this.redMarbleCurrentVal + "/" + this.redMarbleMax);
      this.blueTile.text("" + this.blueMarbleCurrentVal + "/" + this.blueMarbleMax);
      this.yellowTile.text("" + this.yellowMarbleCurrentVal + "/" + this.yellowMarbleMax);



    }

    addPoint(){
      if(this.potionsPlayer === "1"){
        gameMaster.player1.completePotions += 1;
        gameMaster.updatePoints(this.potionsPlayer);
        this.removePotion(this.potionsPlayer);
      }
      else if (this.potionsPlayer === "2") {
        gameMaster.player2.completePotions += 1;
        gameMaster.updatePoints(this.potionsPlayer);
        this.removePotion(this.potionsPlayer);
      }


    }

    removePotion(playerNumber){
      $("[data-player="+playerNumber+"]").remove();
      if (playerNumber === "1"){
        var wally = $("<div>");
        var explosionDiv = $("<div>");
        wally.addClass('wally');
        explosionDiv.addClass('explosion')
        explosionDiv.attr("id", "explosion1");
        $("body").append(wally);
        $("body").append(explosionDiv);
        setTimeout(function () {
          $("#explosion1").remove()
          $(".wally").remove();
        }, 3000);

        var redMax = gameMaster.player1Potion.redMarbleMax;
        var blueMax = gameMaster.player1Potion.blueMarbleMax;
        var yellowMax = gameMaster.player1Potion.yellowMarbleMax;

        for (var i = 0; i < redMax; i++) {
          var randomNumber = Math.floor(Math.random() * gameMaster.dispenser.dispenserArray.length);
          if (gameMaster.dispenser.dispenserArray[randomNumber].length < 9) {

            var tempDomElem = $("<div>").addClass("marble");
            tempDomElem.addClass("red");

            var currentRow = $("[data-row=" + randomNumber + "]")
            currentRow.append(tempDomElem);
            gameMaster.dispenser.dispenserArray[randomNumber].push(tempDomElem);
          }
        }
        for (var i = 0; i < blueMax; i++) {
          var randomNumber = Math.floor(Math.random() * gameMaster.dispenser.dispenserArray.length);
          if (gameMaster.dispenser.dispenserArray[randomNumber].length < 9) {

            var tempDomElem = $("<div>").addClass("marble");
            tempDomElem.addClass("blue");

            var currentRow = $("[data-row=" + randomNumber + "]")
            currentRow.append(tempDomElem);
            gameMaster.dispenser.dispenserArray[randomNumber].push(tempDomElem);
          }
        }
        for (var i = 0; i < yellowMax; i++) {
          var randomNumber = Math.floor(Math.random() * gameMaster.dispenser.dispenserArray.length);
          if (gameMaster.dispenser.dispenserArray[randomNumber].length < 9) {

            var tempDomElem = $("<div>").addClass("marble");
            tempDomElem.addClass("yellow");

            var currentRow = $("[data-row=" + randomNumber + "]")
            currentRow.append(tempDomElem);
            gameMaster.dispenser.dispenserArray[randomNumber].push(tempDomElem);
          }
        }
        gameMaster.dispenser.marbleClick();

      }

      else if (playerNumber === "2") {
        var wally = $("<div>");
        var explosionDiv = $("<div>");
        wally.addClass('wally');
        explosionDiv.addClass('explosion')
        explosionDiv.attr("id","explosion2");
        $("body").append(wally);
        $("body").append(explosionDiv);
        setTimeout(function(){
          $("#explosion2").remove()
          $(".wally").remove();
        },3000);


        var redMax = gameMaster.player2Potion.redMarbleMax;
        var blueMax = gameMaster.player2Potion.blueMarbleMax;
        var yellowMax = gameMaster.player2Potion.yellowMarbleMax;

        for (var i = 0; i < redMax; i++) {
          var randomNumber = Math.floor(Math.random() * gameMaster.dispenser.dispenserArray.length);
          if (gameMaster.dispenser.dispenserArray[randomNumber].length < 9) {

            var tempDomElem = $("<div>").addClass("marble");
            tempDomElem.addClass("red");

            var currentRow = $("[data-row=" + randomNumber + "]")
            currentRow.append(tempDomElem);
            gameMaster.dispenser.dispenserArray[randomNumber].push(tempDomElem);
          }
        }
        for (var i = 0; i < blueMax; i++) {
          var randomNumber = Math.floor(Math.random() * gameMaster.dispenser.dispenserArray.length);
          if (gameMaster.dispenser.dispenserArray[randomNumber].length < 9) {

            var tempDomElem = $("<div>").addClass("marble");
            tempDomElem.addClass("blue");

            var currentRow = $("[data-row=" + randomNumber + "]")
            currentRow.append(tempDomElem);
            gameMaster.dispenser.dispenserArray[randomNumber].push(tempDomElem);
          }
        }
        for (var i = 0; i < yellowMax; i++) {
          var randomNumber = Math.floor(Math.random() * gameMaster.dispenser.dispenserArray.length);
          if (gameMaster.dispenser.dispenserArray[randomNumber].length < 9) {

            var tempDomElem = $("<div>").addClass("marble");
            tempDomElem.addClass("yellow");

            var currentRow = $("[data-row=" + randomNumber + "]")
            currentRow.append(tempDomElem);
            gameMaster.dispenser.dispenserArray[randomNumber].push(tempDomElem);
          }
        }

      }

      gameMaster.generatePotion(this.potionsPlayer);
    }

    handleClick(){

      if (gameMaster.player1.myTurn === true){
        $(".hand").empty();
        for(var i = 0 ; i < gameMaster.player1.hand.length ;  i++){
          if (gameMaster.player1.hand[i].hasClass("red") && gameMaster.player1Potion.redMarbleCurrentVal < gameMaster.player1Potion.redMarbleMax){
            gameMaster.player1.hand.splice(i,1);
            gameMaster.player1Potion.redMarbleCurrentVal++;
            i--;
          }
          else if (gameMaster.player1.hand[i].hasClass("blue") &&gameMaster.player1Potion.blueMarbleCurrentVal < gameMaster.player1Potion.blueMarbleMax) {
            gameMaster.player1.hand.splice(i, 1);
            gameMaster.player1Potion.blueMarbleCurrentVal++;
            i--;
          }
          else if (gameMaster.player1.hand[i].hasClass("yellow") &&gameMaster.player1Potion.yellowMarbleCurrentVal < gameMaster.player1Potion.yellowMarbleMax) {
            gameMaster.player1.hand.splice(i, 1);
            gameMaster.player1Potion.yellowMarbleCurrentVal++;
            i--;
          }

        }
      }
      else if (gameMaster.player2.myTurn === true) {
        $(".hand").empty();
        for (var i = 0; i < gameMaster.player2.hand.length; i++) {
          if (gameMaster.player2.hand[i].hasClass("red") &&gameMaster.player2Potion.redMarbleCurrentVal < gameMaster.player2Potion.redMarbleMax) {
            gameMaster.player2.hand.splice(i, 1);
            gameMaster.player2Potion.redMarbleCurrentVal++;
            i--;
          }
          else if (gameMaster.player2.hand[i].hasClass("blue") &&gameMaster.player2Potion.blueMarbleCurrentVal < gameMaster.player2Potion.blueMarbleMax) {
            gameMaster.player2.hand.splice(i, 1);
            gameMaster.player2Potion.blueMarbleCurrentVal++;
            i--;
          }
          else if (gameMaster.player2.hand[i].hasClass("yellow") &&gameMaster.player2Potion.yellowMarbleCurrentVal < gameMaster.player2Potion.yellowMarbleMax) {
            gameMaster.player2.hand.splice(i, 1);
            gameMaster.player2Potion.yellowMarbleCurrentVal++;
            i--;
          }
        }
      }

      this.updateDisplay();
      if (gameMaster.canEndTurn){
      gameMaster.canEndTurn = false;
      gameMaster.endTurn();
      }
      if (this.redMarbleCurrentVal === this.redMarbleMax && this.blueMarbleCurrentVal === this.blueMarbleMax && this.yellowMarbleCurrentVal === this.yellowMarbleMax){
        this.addPoint();
      }

    }

    updateDisplay(){
      var player1 = $("[data-player='1']");
      if (gameMaster.player1.myTurn === true){
        player1.children("div:nth-child(1)").text("" + gameMaster.player1Potion.redMarbleCurrentVal + "/" + gameMaster.player1Potion.redMarbleMax);
        player1.children("div:nth-child(2)").text("" + gameMaster.player1Potion.blueMarbleCurrentVal + "/" + gameMaster.player1Potion.blueMarbleMax);
        player1.children("div:nth-child(3)").text("" + gameMaster.player1Potion.yellowMarbleCurrentVal + "/" + gameMaster.player1Potion.yellowMarbleMax);
      }

      var player2 = $("[data-player='2']");
      if (gameMaster.player2.myTurn === true) {
        player2.children("div:nth-child(1)").text("" + gameMaster.player2Potion.redMarbleCurrentVal + "/" + gameMaster.player2Potion.redMarbleMax);
        player2.children("div:nth-child(2)").text("" + gameMaster.player2Potion.blueMarbleCurrentVal + "/" + gameMaster.player2Potion.blueMarbleMax);
        player2.children("div:nth-child(3)").text("" + gameMaster.player2Potion.yellowMarbleCurrentVal + "/" + gameMaster.player2Potion.yellowMarbleMax);
      }
    }

    render(potionPlayer){

      this.potionContainer = $("<div>");
      this.redTile = $("<div>");
      this.blueTile = $("<div>");
      this.yellowTile = $("<div>");

      this.randomizePotion();

      this.redTile.addClass("red-tile tile");
      this.blueTile.addClass("blue-tile tile");
      this.yellowTile.addClass("yellow-tile tile");

      this.potionContainer.append(this.redTile);
      this.potionContainer.append(this.blueTile);
      this.potionContainer.append(this.yellowTile);
      this.potionContainer.addClass("potion-container");
      this.potionContainer.attr("data-player", this.potionsPlayer);

      this.potionContainer.click(this.handleClick)
      if (gameMaster.gameStartPotIndex !== null){
        if (gameMaster.gameStartPotIndex === 1){
        gameMaster.player1.playerTile.append(this.potionContainer);
        gameMaster.gameStartPotIndex += 1;

        }
        else if (gameMaster.gameStartPotIndex === 2){
        gameMaster.player2.playerTile.append(this.potionContainer);
        gameMaster.gameStartPotIndex = null;
        }
      }
      else if (potionPlayer === "1"){
        gameMaster.player1.playerTile.append(this.potionContainer);
      }
      else if (potionPlayer === "2"){
        gameMaster.player2.playerTile.append(this.potionContainer);
      }
    }

  }

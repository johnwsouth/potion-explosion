
class MarbleDispenser {
  constructor() {
    this.masterHolder = ['red', 'red', 'red', 'blue', 'blue', 'blue', 'yellow', 'yellow', 'yellow'];
    this.dispenserArray = [];
    this.marbleHandler = this.marbleHandler.bind(this);
  }

  randomizeMarbles() {
    var tempArray = [];
    while (this.masterHolder.length) {
      var randNum = Math.floor(Math.random() * this.masterHolder.length);
      var randMarble = this.masterHolder[randNum];
      tempArray.push(randMarble);
      this.masterHolder.splice(randNum, 1);
    }

    this.masterHolder = tempArray;
  }

  setUpDispenser() {
    var rowArray = [];
    for (var i = 0; i < 5; i++) {
      var row = $("<div>").addClass('row');
      row.attr("data-row",i);
      $(".marbleDispenser").append(row);

      for (var j = 0; j < 9; j++) {
        this.randomizeMarbles();
        var color = this.masterHolder[j];
        var marble = $("<div>").addClass("marble");
        marble.addClass(color);

        rowArray.push(marble);
        $(row).append(marble);
      }
      this.dispenserArray.push(rowArray);
      rowArray = [];
    }
    return this.dispenserArray;
  }


  marbleHandler(event) {

    console.log("This is the current display array: ", this.dispenserArray)

    this.marbleMatch = true;
    console.log('DA:', this);
    var offset = 1;
    var currentMarble = $(event.currentTarget);
    var marbleIndex = currentMarble.index();
    var marbleRowIndex = currentMarble.closest('.row').index();
    if(marbleIndex +1 < 9 && marbleIndex > -1){
    var currentMarbleBroIndex = marbleIndex + 1;
    var currentMarbleBro = this.dispenserArray[marbleRowIndex][marbleIndex + offset];
    }
    if(marbleIndex -1 >-1){
    var currentMarbleSisIndex = marbleIndex - 1;
    var currentMarbleSis = this.dispenserArray[marbleRowIndex][marbleIndex - offset];
    }



    var spliceNum = null;
    var loop = 0;
    var tempSpliceArray = [];
    if (currentMarbleBro === undefined || currentMarbleSis === undefined){
      if (gameMaster.player1.myTurn === true && marbleRowIndex > -1 && marbleRowIndex < 9) {
        tempSpliceArray = this.dispenserArray[marbleRowIndex].splice(marbleIndex, 1);
        gameMaster.player1.hand = tempSpliceArray;
        currentMarble.remove();
        gameMaster.canEndTurn = true;
        this.marbleMatch = false;
        return;
      }
      else if (gameMaster.player2.myTurn === true && marbleRowIndex > -1 && marbleRowIndex < 9){
        tempSpliceArray = this.dispenserArray[marbleRowIndex].splice(marbleIndex, 1);
        gameMaster.player2.hand = tempSpliceArray;
        currentMarble.remove();
        gameMaster.canEndTurn = true;
        this.marbleMatch = false;
        return;
      }

    }
    if(currentMarbleBro !== undefined && currentMarbleSis !== undefined){
    if (currentMarble.attr('class') !== currentMarbleBro.attr('class') || currentMarble.attr('class') !== currentMarbleSis.attr('class')){
      currentMarble.remove();
    }
      if (gameMaster.player1.myTurn === true) {


        if(currentMarbleBro.attr("class") !== currentMarbleSis.attr("class")){

          tempSpliceArray = this.dispenserArray[marbleRowIndex].splice(marbleIndex, 1);
          gameMaster.player1.hand = tempSpliceArray;
          gameMaster.canEndTurn = true;
          this.marbleMatch = false;
        }

      }
      else if (gameMaster.player2.myTurn === true) {


        if (currentMarbleBro.attr("class") !== currentMarbleSis.attr("class")) {

          tempSpliceArray = this.dispenserArray[marbleRowIndex].splice(marbleIndex, 1);
          gameMaster.player2.hand = tempSpliceArray;
          gameMaster.canEndTurn = true;
          this.marbleMatch = false;
        }

      }
    }


    while(this.marbleMatch && currentMarbleBro !== undefined && currentMarbleSis !== undefined){
      currentMarbleBro = this.dispenserArray[marbleRowIndex][marbleIndex + offset];
      currentMarbleSis = this.dispenserArray[marbleRowIndex][marbleIndex - offset];


      if (currentMarbleBro.attr('class')  === currentMarbleSis.attr('class')) {

        if (offset === 1){
        currentMarble.remove();
        spliceNum += 3;
        }
        currentMarbleBro.remove();
        currentMarbleSis.remove();

        if (offset > 1){
        spliceNum+=2;
        }
        offset++;
        if (marbleIndex - offset < 0 ){
          this.marbleMatch = false;

        }
        else if (marbleIndex + offset > this.dispenserArray[marbleRowIndex].length -1){
          this.marbleMatch = false;
        }
      }

      if (currentMarbleBro.attr('class') !== currentMarbleSis.attr('class')){
        this.marbleMatch = false;

        }
      if (currentMarbleSisIndex - 1 > -1 && loop === 0) {
        currentMarbleSisIndex = marbleIndex -1;
      }
      else if (currentMarbleSisIndex - 1 > -1 && loop >= 1){
        currentMarbleSisIndex = marbleIndex - offset + 1;
      }
        loop += 1 ;

      }

    if (currentMarbleBro !== undefined && currentMarbleSis !== undefined){
    tempSpliceArray = this.dispenserArray[marbleRowIndex].splice(currentMarbleSisIndex, spliceNum)
    gameMaster.canEndTurn = true;


    if (gameMaster.player1.myTurn === true) {

    for (var i = 0; i < tempSpliceArray.length; i++){
      gameMaster.player1.hand.push(tempSpliceArray[i]);
      }

    }
    else if (gameMaster.player2.myTurn === true) {

      for (var i = 0; i < tempSpliceArray.length; i++) {
        gameMaster.player2.hand.push(tempSpliceArray[i]);
      }
    }
  }

  gameMaster.updatePlayerHandDisplay();
  e.stopPropagation();
  return;
}

  marbleClick() {
    $(".marble").on('click', this.marbleHandler);
  }
}

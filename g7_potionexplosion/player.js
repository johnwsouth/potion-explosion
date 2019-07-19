
class NewPlayer{
  constructor(playerNumber){
    this.completePotions = 0;
    this.hand = [];
    this.myTurn = false;
    this.playerNumber = playerNumber;


  }

  render(){
    this.playerTile = $("<div>");
    //this.playerTile.attr("data-player",this.playerNumber);
    this.playerTile.addClass("player");
    this.playerTile.attr("id","player"+this.playerNumber);

    var points = $("<div>");
    points.attr("data-player-points",this.playerNumber);
    points.addClass('player-points');
    points.text("Player " + this.playerNumber + " Potion Points: " +this.completePotions)
    this.playerTile.append(points);
    var body = $("body");
    body.append(this.playerTile);


  }
}

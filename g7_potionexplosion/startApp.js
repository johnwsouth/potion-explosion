$(document).ready(initializeApp)
var gameMaster;

function initializeApp(){
  gameMaster = new GameMaster();
  gameMaster.gameStartRender();
  gameMaster.dispenser.marbleClick();



}

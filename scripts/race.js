Game.Race = Object.extend({
  init: function() {
    
  },

  cleanup: function() {
    me.input.unbindTouch();
    me.input.unbindKey(me.input.KEY.RIGHT);
    me.game.collisionMap = null;
    me.game.viewport.reset();
    me.game.removeAll();
    me.game.currentLevel = {pos:{x:0,y:0}};
    Game.playScreen.setScene(2);
  },

  load: function() {
    me.levelDirector.loadLevel("race");
    me.game.viewport.follow(Game.playScreen.players[0], me.game.viewport.AXIS.BOTH);
    var players = Game.playScreen.players;
    for(var i = 0; i < Game.playScreen.players.length; i++) {
      players[i].pos.y = (28 * 32) - players[i].getHeight();  
    }
    players[0].pos.x = 40;
    players[1].pos.x = 40;

    players[2].pos.x = 0;
    players[3].pos.x = 15;
    players[2].flipX(false);
    players[3].flipX(false);

    players[0].setCollidable();
    players[1].setCollidable();
    players[1].vel.x += players[1].accel.x * me.timer.tick;
    this.raceEndPoint = me.game.currentLevel.width - 5; // 5 pixels buffer
    this.setupControls();
  },

  setupControls: function() {
    me.input.bindKey(me.input.KEY.RIGHT, 'right');
    me.input.bindTouch(me.input.KEY.RIGHT);
  },

  setWinner: function(i) {
    this.winner = i;
  },

  update: function() {
    var players = Game.playScreen.players;
    if(players[0].pos.x + players[0].collisionBox.width >= this.raceEndPoint) {
      if(typeof this.winner === 'undefined') this.setWinner(0);
      this.cleanup();
    }
    else if(players[1].pos.x + players[1].collisionBox.width >= this.raceEndPoint) {
      if(typeof this.winner === 'undefined') this.setWinner(1);
    }
  }
});
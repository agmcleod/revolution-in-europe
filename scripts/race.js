Game.Race = Object.extend({
  init: function() {
    me.levelDirector.loadLevel("race");
    me.game.viewport.follow(Game.playScreen.players[0], me.game.viewport.AXIS.BOTH);
    var players = Game.playScreen.players;
    for(var i = 0; i < Game.playScreen.players.length; i++) {
      players[i].pos.y = (28 * 32) - players[i].getHeight();  
    }
    players[0].pos.x = 40;
    players[1].pos.x = 40;

    players[2].pos.x = 0;
    players[3].pos.x = 0;

    players[0].setCollidable();

    this.setupControls();
  },

  destroy: function() {
    me.input.unbindTouch();
    me.input.unbindKey(me.input.KEY.RIGHT);
  },

  setupControls: function() {
    me.input.bindKey(me.input.KEY.RIGHT, 'right');
    me.input.bindTouch(me.input.KEY.RIGHT);
  },

  update: function() {
    
  }
});
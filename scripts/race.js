Game.Race = Object.extend({
  init: function() {
    Game.playScreen.players[0].pos.y = (29 * 32) - Game.playScreen.players[0].width;
    me.levelDirector.loadLevel("race");
    me.game.viewport.follow(Game.playScreen.players[0], me.game.viewport.AXIS.BOTH);
  },

  update: function() {
    
  }
});
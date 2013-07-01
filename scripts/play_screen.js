Game.PlayScreen = me.ScreenObject.extend({
  draw: function(ctx) {
    me.video.clearSurface(ctx, '#000');
    this.parent(ctx);
  },
  init: function() {
    this.parent(true, true);
    this.addedPlayers = false;
    this.aaronFont = new me.Font("Verdana", 14, '#1d8a00');
    this.kevinFont = new me.Font("Verdana", 14, '#00b3e0');
    this.leiFont = new me.Font("Verdana", 14, '#ffd08a');
    this.shannonFont = new me.Font("Verdana", 14, '#fff67e');
    this.z = 0;
  },
  loadRace: function() {
    this.setScene(1);
  },
  onDestroyEvent: function() {
    me.input.unbindTouch();
    me.input.unbindKey(me.input.KEY.ENTER);
    me.audio.stopTrack('euloop');
  },
  onResetEvent: function() {
    this.setupPlayers()

    this.players[2].flipX(true);
    this.players[3].flipX(true);

    this.setupScenes();
    me.audio.playTrack('euloop');
  },

  setupPlayers: function() {
    var viewportHeight = me.game.viewport.getHeight();
    this.players = [
      new Game.Player(100, viewportHeight - 148),
      new Game.Character(170, viewportHeight - 148, 1),
      new Game.Character(240, viewportHeight - 148, 2),
      new Game.Character(310, viewportHeight - 148, 3)
    ];
  },

  setScene: function(n) {
    this.currentScene = n;
    this.scenes[n].load();
  },

  setupScenes: function() {
    this.scenes = [
      new Game.IntroScene(),
      new Game.Race(),
      new Game.AfterRaceScene(),
      new Game.ThatsAll()
    ];
    this.setScene(0);
  },

  update: function() {
    this.scenes[this.currentScene].update();
    return true;
  }
});
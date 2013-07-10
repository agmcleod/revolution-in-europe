Game.PlayScreen = me.ScreenObject.extend({
  draw: function(ctx) {
    me.video.clearSurface(ctx, '#000');
    this.parent(ctx);
  },
  init: function(chapter) {
    this.initialChapter = chapter;
    this.parent(true, true);
    this.addedPlayers = false;
    this.aaronFont = new me.Font("Verdana", 14, '#1d8a00');
    this.kevinFont = new me.Font("Verdana", 14, '#00b3e0');
    this.leiFont = new me.Font("Verdana", 14, '#ffd08a');
    this.shannonFont = new me.Font("Verdana", 14, '#fff67e');
    this.z = 0;
  },
  loadChapter: function(n) {
    var scene = this.chapters[n-1].startScene;
    var cs = this.scenes[this.currentScene];
    if(cs) cs.cleanup();
    this.setScene(scene);
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
    this.chapters = [{
      startScene: 0
    }];
    this.loadChapter(this.initialChapter);
    me.audio.playTrack('euloop');
  },

  setScene: function(n) {
    this.currentScene = n;
    this.scenes[n].load();
  },

  setupPlayers: function() {
    var viewportHeight = me.game.viewport.getHeight();
    this.players = [
      new Game.Player(100, viewportHeight - 148),
      new Game.Kevin(170, viewportHeight - 148),
      new Game.Lei(240, viewportHeight - 148),
      new Game.Shannon(310, viewportHeight - 148)
    ];
  },

  setupScenes: function() {
    this.scenes = [
      new Game.IntroScene(),
      new Game.Race(),
      new Game.AfterRaceScene(),
      new Game.Asleep(),
      new Game.LondonHallway()
    ];
  },

  update: function() {
    this.scenes[this.currentScene].update();
    return true;
  }
});
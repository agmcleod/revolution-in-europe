Game.PlayScreen = me.ScreenObject.extend({
  init: function() {
    this.parent(true);
    this.atlas = new me.TextureAtlas(me.loader.getAtlas("ch1"), me.loader.getImage("ch1"));
    this.addedPlayers = false;
  },
  onDestroyEvent: function() {

  },
  onResetEvent: function() {
    this.background = new me.SpriteObject(0, 0, this.atlas.texture, 480, 320);
    var region = this.atlas.getRegion('tube.png');
    this.background.offset.setV(region.offset);
    this.background._sourceAngle = region.angle;
    me.game.add(this.background, 0);
    this.setupColumns();
    
    this.train = new me.SpriteObject(-500, 72, this.atlas.texture, 480, 192);
    region = this.atlas.getRegion('subway.png');
    this.train.offset.setV(region.offset)
    this.train._sourceAngle = region.angle;

    this.players = [
      new Game.Character(100, 240, 0, this.atlas),
      new Game.Character(170, 240, 1, this.atlas),
      new Game.Character(240, 235, 2, this.atlas),
      new Game.Character(310, 240, 3, this.atlas)
    ];

    me.game.add(this.train, 10);
    me.game.sort();
  },

  setupColumns: function() {
    this.columns = [];
    this.columns.push(new me.SpriteObject(90, 64, this.atlas.texture, 32, 215));
    this.columns.push(new me.SpriteObject(370, 64, this.atlas.texture, 32, 215));
    var region = this.atlas.getRegion('column.png');
    for(var i = 0; i < this.columns.length; i++) {
      var col = this.columns[i];
      col.offset.setV(region.offset);
      col._sourceAngle = region.angle;
      me.game.add(col, 20);
    }
  },

  update: function() {
    if(this.train.pos.x < -20) {
      this.train.pos.x += 10;
    }
    else if(!this.addedPlayers) {
      this.addedPlayers = true;
      for(var i = 0; i < this.players.length; i++) {
        var player = this.players[i];
        me.game.add(player, 30);
      }
      me.game.sort();
    }

    return true;
  }
});
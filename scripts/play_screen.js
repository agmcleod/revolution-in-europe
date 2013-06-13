Game.PlayScreen = me.ScreenObject.extend({
  draw: function(ctx) {
    this.background.draw(ctx);
    for(var i = 0; i < this.columns.length; i++) {
      this.columns[i].draw(ctx);
    }
  },
  init: function() {
    this.parent(true, true);
    this.atlas = new me.TextureAtlas(me.loader.getJSON("ch1"), me.loader.getImage("ch1"));
  },
  onDestroyEvent: function() {

  },
  onResetEvent: function() {
    this.background = new me.SpriteObject(0, 0, this.atlas.texture, 480, 320);
    var region = this.atlas.getRegion('tube.png');
    this.background.offset.setV(region.offset);
    this.background._sourceAngle = region.angle;

    this.setupColumns();
  },

  setupColumns: function() {
    this.columns = [];
    this.columns.push(new me.SpriteObject(90, 64, this.atlas.texture, 32, 215));
    this.columns.push(new me.SpriteObject(230, 64, this.atlas.texture, 32, 215));
    this.columns.push(new me.SpriteObject(370, 64, this.atlas.texture, 32, 215));
    var region = this.atlas.getRegion('column.png');
    for(var i = 0; i < this.columns.length; i++) {
      var col = this.columns[i];
      col.offset.setV(region.offset);
      col._sourceAngle = region.angle;
      me.game.add(col, 50);
    }
  }
});
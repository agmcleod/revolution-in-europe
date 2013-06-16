Game.Character = me.ObjectEntity.extend({
  init: function(x, y, index, atlas) {
    var settings = {
      image: atlas,
      spritewidth: 64,
      spriteheight: 128
    };
    this.parent(x, y, settings);
    var region = atlas.getRegion('column.png');
    //this.renderable.offset.setV(region.offset);
    //this.renderable._sourceAngle = region.angle;
    this.renderable.addAnimation('idle', [index]);
    this.renderable.setCurrentAnimation('idle');
  }
});
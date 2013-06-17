Game.Character = me.ObjectEntity.extend({
  init: function(x, y, index, atlas) {
    var settings = {
    };
    this.parent(x, y, settings);
    this.renderable = atlas.createAnimationFromName(['aaron.png', 'kevin.png', 'lei.png', 'shannon.png']);
    this.renderable.addAnimation('idle', [index]);
    this.renderable.setCurrentAnimation('idle');
  }
});
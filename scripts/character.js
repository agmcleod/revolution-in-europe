Game.Character = me.ObjectEntity.extend({
  init: function(x, y, index) {
    this.parent(x, y, {});
    this.renderable = Game.atlas.createAnimationFromName(['aaron.png', 'kevin.png', 'lei.png', 'shannon.png']);
    this.renderable.addAnimation('idle', [index]);
    this.renderable.setCurrentAnimation('idle');
  },

  update: function() {
    this.parent(this);
    return true;
  }
});
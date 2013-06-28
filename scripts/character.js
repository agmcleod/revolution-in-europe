Game.Character = me.ObjectEntity.extend({
  init: function(x, y, index) {
    this.parent(x, y, {spritewidth:64, spriteheight:128});
    this.isPersistent = true;
    this.renderable = Game.atlas.createAnimationFromName(['aaron.png', 'kevin.png', 'lei.png', 'shannon.png']);
    this.renderable.addAnimation('idle', [index]);
    this.renderable.setCurrentAnimation('idle');
    this.anchorPoint.set(0, 0);
  },

  getWidth: function() {
    return 64;
  },

  getHeight: function() {
    return 128;
  },

  update: function() {
    this.parent();
    return true;
  }
});
Game.Shannon = Game.Character.extend({
  init: function(x, y) {
    this.parent(x, y, 0);
    this.renderable = Game.atlas.createAnimationFromName(['shannon.png']);
    this.renderable.addAnimation('idle', [0]);
    this.renderable.setCurrentAnimation('idle');
    this.setVelocity(12, 0);
  }
});
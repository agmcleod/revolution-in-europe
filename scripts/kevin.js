Game.Kevin = Game.Character.extend({
  init: function(x, y) {
    this.parent(x, y);
    this.renderable = Game.atlas.createAnimationFromName(['kevin.png']);
    this.renderable.addAnimation('idle', [0]);
    this.renderable.setCurrentAnimation('idle');
    this.setVelocity(3, 0);
  }
});
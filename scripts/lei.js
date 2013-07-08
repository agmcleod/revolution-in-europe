Game.Lei = Game.Character.extend({
  init: function(x, y) {
    this.parent(x, y, 0);
    this.renderable = Game.atlas.createAnimationFromName(['lei.png']);
    this.renderable.addAnimation('idle', [0]);
    this.renderable.setCurrentAnimation('idle');
    this.setVelocity(12, 0);
  }
});
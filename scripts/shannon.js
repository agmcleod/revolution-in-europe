Game.Shannon = Game.Character.extend({
  init: function(x, y) {
    this.parent(x, y);
    this.renderable = Game.atlas.createAnimationFromName(['shannon.png']);
    this.renderable.addAnimation('idle', [0]);
    this.renderable.setCurrentAnimation('idle');
  }
});
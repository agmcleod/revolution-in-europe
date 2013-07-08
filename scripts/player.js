Game.Player = Game.Character.extend({
  init: function(x, y) {
    this.parent(x, y, 0);
    this.renderable = Game.atlas.createAnimationFromName(['aaron.png']);
    this.renderable.addAnimation('idle', [0]);
    this.renderable.setCurrentAnimation('idle');
    this.setVelocity(12, 0);
  },

  update: function() {
    this.parent();
    if(me.input.isKeyPressed('right')) {
      this.vel.x += (this.accel.x * me.timer.tick);
    }
    else if(this.vel.x > 0) {
      this.vel.x -= 3 * me.timer.tick;
      if(this.vel.x < 0) this.vel.x = 0;
    }
    return true;
  }
});
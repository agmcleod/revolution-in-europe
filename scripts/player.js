Game.Player = Game.Character.extend({
  init: function(x, y) {
    this.parent(x, y, 0);
    this.setVelocity(4.5, 0);
  },

  update: function() {
    this.parent();
    if(me.input.isKeyPressed('right')) {
      this.vel.x += this.accel.x * me.timer.tick;
    }
    else {
      this.vel.x = 0;
    }
    return true;
  }
});
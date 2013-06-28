Game.Player = Game.Character.extend({
  init: function(x, y) {
    this.parent(x, y, 0);
    this.collidable = false;
    this.setVelocity(5, 0);
    this.updateColRect(0, 26, -1, 0);
  },

  setCollidable: function() {
    this.collidable = true;
    this.collisionMap = me.game.collisionMap;
  },

  update: function() {
    this.parent();
    if(me.input.isKeyPressed('right')) {
      this.vel.x += this.accel.x * me.timer.tick;
    }
    else {
      this.vel.x = 0;
    }
    if(this.collidable)
      this.updateMovement();
    return true;
  }
});
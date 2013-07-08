Game.Character = me.ObjectEntity.extend({
  init: function(x, y) {
    this.parent(x, y, {spritewidth:64, spriteheight:128});
    this.isPersistent = true;
    this.anchorPoint.set(0, 0);
    this.collidable = false;
    this.setVelocity(3, 0);
    this.updateColRect(0, 40, 0, 122);
  },

  getWidth: function() {
    return 64;
  },

  getHeight: function() {
    return 128;
  },

  makeStill: function() {
    this.collidable = false;
    this.alwaysUpdate = false;
  },

  setCollidable: function() {
    this.collidable = true;
    this.collisionMap = me.game.collisionMap;
    this.alwaysUpdate = true;
  },

  update: function() {
    this.parent();
    if(this.collidable)
      this.updateMovement();
    return true;
  }
});
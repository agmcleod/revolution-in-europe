Game.MenuScreen = me.ScreenObject.extend({
  draw: function(ctx) {
    me.video.clearSurface(ctx, '#000');
    if(this.showChapters) {
      this.drawChapterSelection(ctx);
    }
    else {
      this.drawIntro(ctx);
    }
  },

  drawChapterSelection: function(ctx) {
    this.font.draw(ctx, 'Click on a chapter', me.video.getSystemCanvas().width / 2, 30);
    this.smallerFont.draw(ctx, 'Chapter 1', 20, 80);
  },

  drawIntro: function(ctx) {
    var x = me.video.getSystemCanvas().width / 2;
    this.font.draw(ctx, "Revelations in Europe", x, 30);
    this.font.draw(ctx, "A fun story about how I, Aaron", x, 80);
    this.font.draw(ctx, "and three friends traveled to Europe.", x, 105);
    this.font.draw(ctx, "Now I want to share how my experiences", x, 130);
    this.font.draw(ctx, "had a positive effect on my life.", x, 155);
    this.font.draw(ctx, "Click to continue", x, 200);
  },

  init: function() {
    this.parent(true);
  },

  loadPlayScreen: function(chapterNumber) {
    me.state.set(me.state.PLAY, new Game.PlayScreen(chapterNumber));
    me.state.change(me.state.PLAY);
  },

  onDestroyEvent: function() {
    for(var i = 0; i < this.eventRegions.length; i++) {
      var region = this.eventRegions[i];
      me.input.releaseMouseEvent('mousedown', region);
      me.input.releaseMouseEvent('touchend', region);
    }
  },

  onResetEvent: function() {
    this.font = new me.Font('Xolonium', '15px', '#fff', 'center');
    this.smallerFont = new me.Font('Xolonium', '13px', '#fff');
    this.showChapters = false;

    me.input.bindKey(me.input.KEY.ENTER, 'next');
    me.input.bindMouse(0, me.input.KEY.ENTER);
    me.input.bindTouch(me.input.KEY.ENTER);

    this.eventRegions = [
      new me.Rect(new me.Vector2d(20, 80), 100, 15)
    ];
  },

  update: function() {
    if(me.input.isKeyPressed('next')) {
      if(!this.showChapters) {
        me.input.unbindMouse(0);
        me.input.unbindTouch();
        me.input.unbindKey(me.input.KEY.ENTER);
        var _this = this;
        me.input.registerMouseEvent('mousedown', this.eventRegions[0], function() {
          _this.loadPlayScreen(0);
        });

        me.input.registerMouseEvent('touchend', this.eventRegions[0], function() {
          _this.loadPlayScreen(0);
        });  
      }
      
      this.showChapters = true;
    }
    return true;
  }
});
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

  loadPlayScreen: function() {
    me.state.set(me.state.PLAY, new Game.PlayScreen(chapterNumber));
    me.state.change(me.state.PLAY);
  },

  onDestroyEvent: function() {
    me.input.unbindMouse(0);
    me.input.unbindTouch();
    me.input.unbindKey(me.input.KEY.ENTER);
  },

  onResetEvent: function() {
    this.font = new me.Font('Xolonium', '15px', '#fff', 'center');
    this.showChapters = false;

    me.input.bindKey(me.input.KEY.ENTER, 'next');
    me.input.bindMouse(0, me.input.KEY.ENTER);
    me.input.bindTouch(me.input.KEY.ENTER);
  },

  update: function() {
    if(me.input.isKeyPressed('next')) {
      this.showChapters = true;
    }
    return true;
  }
});
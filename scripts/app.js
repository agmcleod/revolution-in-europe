var Game = {};

Game.Loader = (function() {
  var Loader = function() {
    this.resources = [{
      name: 'ch1',
      type:'json',
      src: 'assets/images/ch1.json'
    }, {
      name: 'ch1',
      type: 'image',
      src: 'assets/images/ch1.png'
    }, {
      name: 'dialog',
      type: 'image',
      src: 'assets/images/dialog.png'
    }];
  }

  Loader.prototype.init = function() {
    if(!me.video.init("app", 480, 320, false, 'auto', true)) {
      alert('please use a browser that supports the canvas');
    }
    else {
      me.loader.onload = this.loaded.bind(this);
      me.loader.preload(this.resources);
      me.state.change(me.state.LOADING);
    }
  }

  Loader.prototype.loaded = function() {
    me.state.set(me.state.MENU, new Game.MenuScreen());
    me.state.change(me.state.MENU);
  }

  return Loader;
})();

window.onReady(function() {
  var loader = new Game.Loader();
  loader.init();
  if (me.sys.isMobile && !navigator.isCocoonJS) {
    // Prevent the webview from moving on a swipe
    window.document.addEventListener("touchmove", function (e) {
      e.preventDefault();
      window.scroll(0, 0);
      return false;
    }, false);

    // Scroll away mobile GUI
    (function () {
      window.scrollTo(0, 1);
    }).defer();

    me.event.subscribe(me.event.WINDOW_ONRESIZE, function (e) {
      window.scrollTo(0, 1);
    })

    // Retina viewport settings
    if (window.devicePixelRatio > 1) {
      document.getElementById("viewport").setAttribute(
        "content",
        "width=device-width, initial-scale=0.5, maximum-scale=0.5, user-scalable=0"
      );
    }
  }
});
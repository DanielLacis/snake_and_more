(function() {
  if(typeof Snake === 'undefined') {
    window.Snake = {};
  }

  var View = window.Snake.View = function($el) {
    this.$el = $el;
    this.board = new window.Snake.Board();
    this.$el.keydown(handleKeyEvent.bind(this));
    // debugger
    setInterval(this.step.bind(this), 333);
  };

  var handleKeyEvent = function(event) {
    switch (event.keyCode) {
      case(37):
        this.board.snake.turn([0, -1]);
        break;
      case(38):
        this.board.snake.turn([-1, 0]);
        break;
      case(39):
        this.board.snake.turn([0, 1]);
        break;
      case(40):
        this.board.snake.turn([1, 0]);
        break;
      default:
    }
  };

  View.prototype.step = function() {
    // this.board.snake.checkWallCollision
    this.board.snake.move();
    this.board.checkApple();
    this.board.update();
    this.$el.html(this.board.render());
  };

})();

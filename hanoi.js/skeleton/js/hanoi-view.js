( function() {if (typeof Hanoi === 'undefined') {
  window.Hanoi = {};
}

  var View = window.Hanoi.View = function(game, $el) {
    this.game = game;
    this.$el = $el;
    this.setupTowers();
    this.render();
    this.clicked = null;
    this.$el.on('click', '.pile', clickTower.bind(this));
  };

  View.prototype.setupTowers = function() {
    for (var i = 0; i < 3; i++) {
      var $pile = $("<div class='pile'></div>");
      $pile.data('pile-id', i);
      for (var j = 0; j < 3; j++) {
        var $disk = $("<div></div>");
        $disk.data('disk-id', j);
        $pile.append($disk);
      }
      this.$el.append($pile);
    }
    return this.$el;
  };

  View.prototype.render = function() {
    for(var i = 0; i < 3; i++) {
      var pile = $('.pile')[i]; // provides appropriate tower
      for(var j = 0; j < 3; j++) {
        var $disk = $(pile.children[j]);
        var number = this.game.towers[i][(2 - j)] || 0;
        $disk.removeClass();
        $disk.addClass('disk' + number);
      }
    }
  };

  var clickTower = function(event) {
    event.preventDefault();
    var $pile = $(event.currentTarget);
    var pileId = $pile.data('pile-id');
    if (this.clicked === null) {
      this.clicked = pileId;
      $pile.addClass('diskHighlight');
    } else {
      if (this.game.isValidMove(this.clicked, pileId)) {
        this.game.move(this.clicked, pileId);
      } else {
        alert("not a valid move");
      }
      $('.pile').removeClass('diskHighlight');
      this.clicked = null;
    }
    this.render();
    if(this.game.isWon()) {
      alert("you win!");
    }
  };
})();

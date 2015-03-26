(function () {
  if (typeof TTT === "undefined") {
    window.TTT = {};
  }

  var View = window.TTT.View = function (game, $el) {
    this.game = game;
    this.$el = $el;
  };

  View.prototype.bindEvents = function () {
    var fn = this;
    $(".square").on('click', function(event) {
      event.preventDefault();

      var $square = event.currentTarget;
      // this is html element
      fn.makeMove($square);
      if (fn.game.isOver() && fn.game.winner() !== null) {
        alert(fn.game.winner() + " wins");
      } else if (fn.game.isOver()){
        alert("game over, it's a tie");
      }

    });
  };

  View.prototype.makeMove = function ($square) {
    var row = $square.dataset.rowId;
    var col = $square.dataset.colId;
    var mark = this.game.currentPlayer;
    this.game.playMove([parseInt(row), parseInt(col)]);
    if (mark === "x") {
      $($square).addClass("markX").html("x");
    } else {
      $($square).addClass("markO").html("o");
    }
  };
  // $square.dataset.rowId
  // $square.dataset.colId

  View.prototype.setupBoard = function () {
    // var $el = $("#gameBoard");
    for(var row = 0; row < 3; row++) {
      var $fullRow = $("<div class='row'></div>");
      for (var i = 0; i < 3; i++) {
        var $cell = $("<div class='square'></div>");
        $cell.attr('data-row-id', row);
        $cell.attr('data-col-id', i);
        $fullRow.append($cell);
      }
      this.$el.append($fullRow);
    }
    return this.$el;
  };

  // View.prototype.setupBoard = function () {
  //   var $el = $("#gameBoard");
  //   for(var row = 0; row < 3; row++) {
  //     var $rowx = "<div class='row'>";
  //     for (var i = 0; i < 3; i++) {
  //       $rowx += "<div class='square'></div>";
  //       $rowx.attr('data-row-id', row);
  //       $rowx.attr('data-col-id', i);
  //     }
  //     $rowx += "</div>";
  //     $el.append($rowx);
  //   }
  //   return $el;
  // };
})();

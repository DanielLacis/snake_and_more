(function() {
  if(typeof Snake === 'undefined') {
    window.Snake = {};
  }

  var DIR = ["N", "E", "S", "W"];
  var DIR_VECTOR = [[0, 1], [0, -1], [1, 0], [-1, 0]];

  var Snake = window.Snake.Snake = function() {
    this.dir = [0, 1];
    this.grow = false;
    this.growCounter = 0;
    this.segments = [new Coord([5, 0]), new Coord([5, 1]), new Coord([5, 2]), new Coord([5,3]), new Coord([5,4]), new Coord([5, 5])];
  };

  Snake.prototype.turn = function(newDir) {
    if (!window.Snake.Coord.prototype.isOpposite(this.dir, newDir)) {
      this.dir = newDir;
    }
  };

  Snake.prototype.move = function() {
    this.segments.push(this.segments[this.segments.length - 1].plus(this.dir));
    if (this.grow) {
      this.growCounter += 1;
    } else {
      this.segments.shift();
    }

    if (this.growCounter > 2) {
      this.grow = false;
      this.growCounter = 0;
    }

    for (var i = 0; i < this.segments.length - 1; i++) {
      var current = this.segments[i];
      if (this.segments[this.segments.length - 1].equals(current)) {
        alert("game over!");
      }
    }

  };

  var Apple = window.Snake.Apple = function(pos) {
    this.coord = new Coord(pos);
  };

  var Coord = window.Snake.Coord = function(pos) {
    this.pos = pos;
  };

  Coord.prototype = {
    plus: function(deltaPos) {
      var newPos = [];
      newPos[0] = this.pos[0] + deltaPos[0];
      newPos[1] = this.pos[1] + deltaPos[1];
      return new Coord(newPos);
    },

    equals: function(coord) { // used for collision detection
      if (this.pos[0] === coord.pos[0] && this.pos[1] === coord.pos[1]) {
        return true;
      }
      return false;
    },

    isOpposite: function(dir1, dir2) {
      return (dir1[0] + dir2[0] === 0 && dir1[1] + dir2[1] === 0);
      // don't allow snake to flip direction 180 degrees
    }

  };

  var Board = window.Snake.Board = function() {
    this.snake = new Snake();
    this.xDim = 20;
    this.yDim = 20;
    this.apples = [new Apple([10,10]), new Apple([15,15])];
    this.updateCounter = 1;
  };


  Board.prototype = {
    render: function() {
      var grid = [];
      for(var i = 0; i < this.xDim; i++) {
        grid.push(new Array(this.ydim));
      }
      for(var j = 0; j < this.xDim; j++) {
        for(var k = 0; k < this.yDim; k++) {
          grid[j][k] = ".";
        }
      }
      for(var l = 0; l < this.snake.segments.length; l++) {
        var pos = this.snake.segments[l].pos;
        grid[pos[0]][pos[1]] = "S";
      }
      for(var n = 0; n < this.apples.length; n++) {
        var posA = this.apples[n].coord.pos;
        grid[posA[0]][posA[1]] = "A";
      }
      var gridString = "";
      for(var m = 0; m < grid.length; m++) {
        gridString += grid[m].join("") + '\n';
      }
      return gridString;
    },

    update: function() {
      if(this.updateCounter % 15 === 0) {
        this.updateCounter = 1;
        this.createApple();
      } else {
        this.updateCounter += 1;
      }
    },

    createApple: function() {
      var randX = Math.floor(Math.random()*this.xDim);
      var randY = Math.floor(Math.random()*this.yDim);
      this.apples.push(new Apple([randX, randY]));
    },

    checkApple: function() {
      for (var i = 0; i < this.apples.length; i++) {
        if (this.snake.segments[this.snake.segments.length - 1].equals(this.apples[i].coord)) {
          this.snake.grow = true;
          this.snake.growCounter = 0;
          if (i === 0) {
            this.apples = this.apples.slice(1, this.apples.length);
          } else {
            this.apples = this.apples.slice(0, i).concat(this.apples.slice(i+ 1, this.apples.length));
          }

        }
      }

    }
  };


})();

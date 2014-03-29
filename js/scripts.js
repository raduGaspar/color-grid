(function() {
	// method that allows defining an array with default values
	Array.prototype.define = function(value, howMany){
		while(howMany) this[--howMany] = value;
		return this;
	}
	
	// variables and selectors
	var cols = 4,
		rows = 6,
		matrix = $(),
		$grid = $(".grid"),
		$body = $("body").addClass("black"),
		$result = $(".result"),
		$random = $(".random"),
		$reset = $(".reset"),
		randomized = true,
		stats = {};
	
	// grid generation logic
	for(var i=0; i<rows; i++) {
		var row = $("<div>").addClass("row");
		stats[i] = new Array().define(0, cols);
		for(var j=0; j<cols; j++) {
			var block = $("<div>").addClass("block");
			row.append(block);
			if(randomized) {
				var bin = randomBin();
				if(bin) {
					block.addClass("black");
					stats[i][j] = bin;
				}
			}
		}
		matrix = matrix.add(row);
	}
	
	// set grid width equal to that of its contents; margin included
	$grid
		.append(matrix)
		.css("width", $(".block").first().outerWidth(true) * cols)
	
		// block click logic
		.on("click", ".block", function() {
			var $this = $(this);
			$this.toggleClass("black");
			changeColor.call($this);
		});
	
	// method that changes the body color based on selected blocks
	function changeColor() {
		var row = this.parent().index(),
			col = this.index();
		
		stats[row][col] = this.hasClass("black") ? 1 : 0;
		
		render();
	}
	
	// method used for rendering the resulted hex
	function render() {
		var hex = gridHex();
		$body.css("background-color", hex);
		$result.text(hex);
	}
	
	// method for converting binary values to decimal
	function binaryToDec(bin) {
		return parseInt(bin, 2);
	}
	
	// method for converting binary values to hexadecimal
	function binaryToHex(bin) {
		return binaryToDec(bin).toString(16);
	}
	
	// method for generating hex value based on grid selected blocks
	function gridHex() {
		var result = "#";
		for(var i in stats) {
			result = result.concat(binaryToHex(stats[i].join('')));
		}
		
		return result;
	}
	
	// method for generation random binary value
	function randomBin() {
		return Math.random() < 0.5 ? 1 : 0;
	}
	
	// reset grid to default state
	function reset() {
		$(".black").removeClass("black");
		for(var i=0; i<rows; i++) {
			for(var j=0; j<cols; j++) {
				stats[i][j] = 0;
			}
		}
		render();
	}
	
	// generate random grid
	if(randomized) {
		render();
	}
	
	// simple page reload on "random" button click
	$random.on("click", function() {
		window.location.reload();
	});
	
	// grid reset on "reset" button click
	$reset.on("click", function() {
		reset();
	});
}());
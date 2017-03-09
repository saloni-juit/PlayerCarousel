(function() {

	var b = new Array(),firstState = true,points = 1;

	function getRandomIntArray() {
		var arr = [];
		while(arr.length < 9){
		    var randomnumber = Math.floor(Math.random()*9) + 1;
		    if(arr.indexOf(randomnumber) > -1) {
		    	continue;
		    }
		    arr[arr.length] = randomnumber;
		}
		return arr;
	}

	function init(){
		$(".grid").removeClass("disabled");
		$(".grid .cell").css({"background-color":"#000"});
		var a = getRandomIntArray();
		b = [];
		firstState = true;
		points = 1;
		$(".gameStatus").text("");
		for(var i=0;i<9;i++){
			b.push(i+1);
			$($(".grid .cell")[i]).text(a[i]);
		}
	}

	$("#btnReset").on("click",function(){
		init();
	});

	$(".cell").on("click",function(event){
		var val = parseInt($(event.currentTarget).text());
		
		if(firstState == true && b[0] != val || b.indexOf(val) == -1){
			return;
		}

		if(b[0] == val){

			if(firstState){
				firstState = false;
			}

			$(event.currentTarget).css({"background-color":"white"});
			b.shift(0,1);
			points += 11;
			if(b.length == 0){
				$(".gameStatus").text("you win with "+points+ " points! Please click on reset button to start new game");
				$(".grid").addClass("disabled");
			}
		}
		else {
			$(".gameStatus").text("you lose at "+points+" points. Please click on reset button to restart the game");
			$(".grid").addClass("disabled");
			$(".grid .cell").css({"background-color":"#000"});
		}
	});

	init();

}());
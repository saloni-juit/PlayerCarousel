var main = main || {};
(function() {

    var playerData = [];

    main.getJSON = function(fileName){
    	$.getJSON('https://api.myjson.com/bins/'+fileName, function(response) {
        	playerData = response;
        	$(".statusText").text(response.statusText);
        	updateResponse();
    	}).fail(function(errorResponse){
    		$(".statusText").text(errorResponse.statusText);
    		$(".slider").html("");
    	});
	};

    function updateResponse() {
        var slide_count = playerData.length;
        var slide_width_pc = 100.0 / slide_count;
        var slide_index = 0;

        var list = $('<ul/>');
        for (var i = 0; i < playerData.length; i++) {
            list.append('<li><div class="left"><img src="' + playerData[i].image + '" /></div>' +
                '<div class="right">' +
                '<div class="name">' + playerData[i].name + '</div>' +
                '<div class="desc">' + playerData[i].desc + '</div></div></li>');
        }

        $(list).appendTo(".slider");
        var ul = $(".slider ul");

        ul.find("li").each(function(indx) {
            var left_percent = (slide_width_pc * indx) + "%";
            $(this).css({ "left": (33.333 * indx) + "%" });
            $(this).css({ width: (34) + "%" });
        });

        $(".slider").append('<button class="prev"></button><button class="next"></button>');

        $(".slider .prev").click(function() {
            slide(slide_index - 1);
        });

        $(".slider .next").click(function() {
            slide(slide_index + 1);
        });

        function slide(new_slide_index) {
            if (new_slide_index < 0 || new_slide_index >= slide_count) return;
            var margin_left_pc = (new_slide_index * (-100)) + "%";
            ul.animate({ "margin-left": margin_left_pc }, 400, function() {
                slide_index = new_slide_index;
            });
        }
    }
}());

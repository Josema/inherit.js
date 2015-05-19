fun = function() {
    if ($('#run').html() == "Run again" || $('#run').html() == "Run tests") {
        if (n < max) {
            clearInterval(int);
            setTimeout(function(){ 
            	console.log("Running", ++n);
            	$('#run').click();
            	int = setInterval(fun, 5000);
            }, 5000);
        } else clearInterval(int);
    }

};
max = 10, int = setInterval(fun, 5000), n = 0;

max = 3, int = setInterval(function() {
    if ($('#run').innerHTML == "Run again" || $('#run').innerHTML == "Run tests") {
        if (n < max) {
            console.log("Running", ++n);
            setTimeout($('#run').click, 5000);
        } else clearInterval(int);
    }

}, 1000), n = 0;

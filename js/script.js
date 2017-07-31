function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview

    // YOUR CODE GOES HERE!
    /*var $streetVal = $("#street").val();
    var $cityVal = $("#city").val();
    $body.append('<img class="bgimg" src="http://maps.googleapis.com/maps/api/streetview?size=600x300&location=' + $streetVal + ',' + $cityVal + '"/>');*/

    var streetStr = $('#street').val();
    var cityStr = $('#city').val();
    var address = streetStr + ', ' + cityStr;

    $greeting.text('So, you want to live at ' + address + '?');


    // load streetview
    var streetviewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + address + '';
    $body.append('<img class="bgimg" src="' + streetviewUrl + '">');

    // load nytimes

    // YOUR CODE GOES HERE!
    // get the url for search articles
    // from http://developer.nytimes.com/article_search_v2.json
    var urlNYT = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    // add the provided api-key after sign up in NYT search API
    urlNYT += '?' + $.param({
        'api-key': "69b15d49a8134c69975b1dd48c025afb",
        'q': cityStr
    });

    // Sample Code
    // from http://developer.nytimes.com/article_search_v2.json
    // Built by LucyBot. www.lucybot.com
    /*$.ajax({
            url: url,
            method: 'GET',
        }).done(function(result) {
            //console.log(result); // the result from the get recuest
        }).fail(function(err) {
            throw err;
        });
    */
    
    // get NYT articles 
    $.getJSON(urlNYT, function(data) {
        console.log(data); // the result from the get request
        var items = [];
        var articles = data.response.docs;

        $nytHeaderElem.text("New York Times Articles About " + cityStr)

        // put the data from the data object in the list items
        // according to the key and value in the data object
        for (var i = 0; i < articles.length; i++) {
            var item = "";
            item = "<li class='article'>";
            item += "<a href='" + articles[i].web_url + "'>";
            item += articles[i].headline.main;
            item += articles[i].pub_date + "</a>";
            item += "<p>" + articles[i].snippet + "</p>"
            item += "</li>"
            items.push(item);
        }

        var itemsStr = items.join(""); // convert the items array to string
        $(itemsStr).appendTo("#nytimes-articles"); // add the list items String to the <ul>

        // end getJSON() 
    }).error(function() {
        // handle fail to get articles 
        // getJSON error .. using JQuery .error()
        $nytHeaderElem.text("New York Times Articles Could Not Be Loaded");
    }); // end error()
    
   
    return false;
};

$('#form-container').submit(loadData); // when press submit call loadData fun
function extractHostname(url) {
    // function from https://stackoverflow.com/questions/8498592/extract-hostname-name-from-string
    var hostname;
    //find & remove protocol (http, ftp, etc.) and get hostname
    if (url.indexOf("//") > -1) {
        hostname = url.split('/')[2];
    }
    else {
        hostname = url.split('/')[0];
    }
    //find & remove port number
    hostname = hostname.split(':')[0];
    //find & remove "?"
    hostname = hostname.split('?')[0];
    return hostname;
}

var label = document.getElementById("msg")
var img = document.getElementById("img-msg")


label.innerHTML = "Initializing";

var tabUrl = "";

chrome.tabs.getSelected(null, function(tab) {
        tabUrl = extractHostname(tab.url);
	var httpRequest = new XMLHttpRequest();
	httpRequest.open('GET', 'https://app.foliogrow.com/?whatever=' + tabUrl);
	httpRequest.onload = function() {
        	//label.innerHTML = httpRequest.responseText;
		if (tabUrl == "www.musicnotes.com")
			{  
			label.innerHTML = ""; // In Top 100 with a rank of 74";
			img.src = "musicscale.png"	
			}
		else if (tabUrl == "www.michelin.com")
			{  
			label.innerHTML = ""; // In Top 100 with a rank of 74";
			img.src = "2.png"	
			}
		else
			{
			label.innerHTML = ""; // Not in Top 100";
			img.src = "nodata.png";
			}
		};
	httpRequest.send();

        label.innerHTML = "Waiting for data on " + tabUrl;
    });
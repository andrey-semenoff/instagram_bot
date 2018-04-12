var fs = require('fs');
var webdriverio = require('webdriverio');
var options = {
    desiredCapabilities: {
        browserName: 'chrome'
    }
};

var path = {
	pics: 		'./pics/',
	screens: 	'./screens/',
};

var browser = webdriverio
    .remote(options)
    .init();

    browser.url('http://www.google.com').then(function() {
			browser.saveScreenshot().then(function(screenshot) {
		    takeScreenshot(screenshot, 'screenshot0');
			});
    })

    .setValue('#lst-ib', 'wild life').then(function() {
			browser.saveScreenshot().then(function(screenshot) {
		    takeScreenshot(screenshot, 'screenshot1');
			});
    })

    .keys('Enter').then(function() {
			browser.saveScreenshot().then(function(screenshot) {
		    takeScreenshot(screenshot, 'screenshot2');
			});
    })

    .getAttribute('#uid_dimg_0', 'src').then(function(image, err) {
			grabPicture(image);
    })

    .catch(function(err) {
        console.log(err);
    })

    .end();

function takeScreenshot(screenshot, name) {

	if ( !fs.existsSync(path.screens) ) {
		fs.mkdirSync(path.screens);
	}

  fs.writeFileSync(path.screens + name +'.jpg', screenshot)
}

function grabPicture(image) {

	if ( !fs.existsSync(path.pics) ) {
		fs.mkdirSync(path.pics);
	}

	image = image.replace(/^data:image\/\w+;base64,/, "");
	fs.writeFileSync(path.pics + 'picture.jpg', image, 'base64');
}
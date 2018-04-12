var fs = require('fs');
var https = require('https');

var webdriverio = require('webdriverio');
var options = {
    desiredCapabilities: {
        browserName: 'chrome'
    }
};

const config = require('./config.js');

var browser = webdriverio
    .remote(options)
    .init();

    browser.url(config.url).then(function() {
			browser.saveScreenshot().then(function(screenshot) {
		    takeScreenshot(screenshot, 'screenshot0');
			});
    })

    .click('[href = "/accounts/login/"]').then(function() {
			browser.saveScreenshot().then(function(screenshot) {
		    takeScreenshot(screenshot, 'screenshot1');
			});
    })

    .setValue('[name = "username"]', config.username)
    .setValue('[name = "password"]', config.password).then(function() {
			browser.saveScreenshot().then(function(screenshot) {
		    takeScreenshot(screenshot, 'screenshot2');
			});
    })

    .click('form button').then(function() {
			browser.saveScreenshot().then(function(screenshot) {
		    takeScreenshot(screenshot, 'screenshot3');
			});
    })

    .pause(3000)

    .isExisting('._dcj9f').then(function() {
	    browser.click('._dcj9f').then(function() {
				browser.saveScreenshot().then(function(screenshot) {
			    takeScreenshot(screenshot, 'screenshot4');
				});
	    })    	
    })


    .setValue('._avvq0._o716c', '#sea').then(function() {
			browser.saveScreenshot().then(function(screenshot) {
		    takeScreenshot(screenshot, 'screenshot5');
			});
    })

    .pause(2000)

    .keys('Enter').then(function() {
			browser.saveScreenshot().then(function(screenshot) {
		    takeScreenshot(screenshot, 'screenshot6');
			});
    })

    .pause(2000)

    .keys('Enter').then(function() {
			browser.saveScreenshot().then(function(screenshot) {
		    takeScreenshot(screenshot, 'screenshot7');
			});
    })

    .pause(3000)

    .saveScreenshot().then(function(screenshot) {
	    takeScreenshot(screenshot, 'screenshot8');
		})
  
    .getAttribute('//*[@id="react-root"]/section/main/article/div[1]/div/div/div[1]/div[2]/a/div/div[1]/img', 'src').then(function(image, err) {
			grabPicture(image);
    })

    .catch(function(err) {
        console.log(err);
    })

    .end();

function takeScreenshot(screenshot, name) {

	if ( !fs.existsSync(config.path.screens) ) {
		fs.mkdirSync(config.path.screens);
	}

  fs.writeFileSync(config.path.screens + name +'.jpg', screenshot)
}

function grabPicture(image) {

	if ( !fs.existsSync(config.path.pics) ) {
		fs.mkdirSync(config.path.pics);
	}

	var file = fs.createWriteStream(config.path.pics + 'Test_Worked.jpg');
	var request = https.get(image, function(response) {
	  response.pipe(file);
	});
}


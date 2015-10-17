var telegram = require('telegram-bot-api');
var request = require('request');
var irc = require('irc');
var imgur = require('imgur-node-api');

imgur.setClientID('32cd79f0cb986fc');
//a6c15c66c67c08

var gtoken='106732837:AAHR3zt1lQLjycLSTUVu3x1Yj88ruYfumK0';
var file='';
var channel='#ysitd';

var client = new irc.Client('irc.freenode.net','teleimgbot',{
    channels: [channel]
});

var api = new telegram({
    token: gtoken,
    updates: {
		enabled: true
	}
});

api.getMe(function(err, data)
{
    console.log(err);
    console.log(data);
});

api.on('message', function(message)
{
    console.log(message);
    if(message.photo){
            file = message.photo[message.photo.length-1].file_id;
            console.log(file);
            request('https://api.telegram.org/bot'+gtoken+'/getFile?file_id='+file,function(error, response, body){
                if (!error && response.statusCode == 200) {
                    console.log(body) // Show the HTML for the Google homepage.
                    var json=JSON.parse(body);
                            imgur.upload('https://api.telegram.org/file/bot'+gtoken+'/'+json.result.file_path,function(err,res){
                                if(!err){
                                    console.log(res.data.link);
                                    client.say(channel,res.data.link);
                                }
                            });
                }
            })
    }
});

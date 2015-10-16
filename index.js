var telegram = require('telegram-bot-api');
var request = require('request');

var gtoken='106732837:AAHR3zt1lQLjycLSTUVu3x1Yj88ruYfumK0';
var file='';
var channel='YSITD';

var api = new telegram({
token: gtoken,
updates: {
enabled: true,
get_interval: 1000
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
                file = message.photo[3].file_id;
                console.log(file);
                request('https://api.telegram.org/bot'+gtoken+'/getFile?file_id='+file,function(error, response, body){
                        if (!error && response.statusCode == 200) {
                        console.log(body) // Show the HTML for the Google homepage.
                        var json=JSON.parse(body);
                        api.sendMessage({
chat_id: message.chat.id,
text: 'https://api.telegram.org/file/bot'+gtoken+'/'+json.result.file_path
});
                        }
                        })
                }
                });

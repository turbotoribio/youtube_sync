var express = require('express'); 
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = 3456;


app.use(express.static("public"));

var users={};
var rooms={};

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/client.html');
});

io.on('connection', function(socket){

	socket.room='a'
	socket.join(socket.room)
	socket.name=socket.id

	socket.on('chat message', function(msg){

   		 io.to(socket.room).emit('chat message', socket.name+": "+msg);

  	});
	

	socket.on('player_state', function(data){

		if (data.type==3){
		
io.to(socket.room).emit('resync', data.time-1)

}

});


socket.on('click',function(data){
	
	io.to(socket.room).emit('event', data)
})






socket.on('create_room',function(data){

	if(data.name in rooms){

		socket.emit('err','Room name is already in use, try a different name !');

		return false;

	}	

	socket.room=data.name

	rooms[data.name]={priv:data.priv,password:data.password,user_list:[],num_user:0,owner:socket.id,videos:[],started:false}

	console.log(rooms)


});




 socket.on('new_user', function(data){

	var name = data["user"];
	var exists = has(users,name)
	
	if(!exists){
		socket.name=name;
		users[socket.id]=name;
		socket.room_created=false;
		console.log(users)
		socket.emit('valid_user',true)
	}
	else{
		socket.emit('invalid_user','Username is already in use pick another!')
	}  
});



socket.on('start_video',function(data){
	
	rooms[socket.room].videos.push(data)
	console.log(rooms)
})





	
});

function has(json, value) {
    let contains = false;
    Object.keys(json).some(key => {
        contains = typeof json[key] === 'object' ? has(json[key], value) : json[key] === value;
         return contains;
    });
    return contains;
 }

http.listen(port, function(){
  console.log('listening on *:' + port);
});




      var socket = io();

      // 2. This code loads the IFrame Player API code asynchronously.
      var tag = document.createElement('script');

      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      // 3. This function creates an <iframe> (and YouTube player)
      //    after the API code downloads.
      var player
      function onYouTubeIframeAPIReady() {
       player = new YT.Player('player', {
          height: '480',
          width: '720',
          videoId: '5wMJok9gXZc',
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
          },
        
	  playerVars: {
                'controls':0,
                'showinfo':0,
                'disablekb':1,
                'modestbranding':1,
                'loop':1,
                'rel':0
        }
	});
      }

      // 4. The API will call this function when the video player is ready.
      function onPlayerReady(event) {
         time();
      
	}

      // 5. The API calls this function when the player's state changes.
      //    The function indicates that when playing a video (state=1),
      //    the player should play for six seconds and then stop.
      var done = false;
      
      function onPlayerStateChange(event) {
      	socket.emit('player_state', {state:event.data,time:player.getCurrentTime()})
	}


$('#ply').on('click', function () {

   socket.emit('click',{type:'play',time:player.getCurrentTime()})
});


$('#pse').on('click', function (){

  socket.emit('click',{type:'pause',time:player.getCurrentTime()})  

});


function time(){
      $('#bar').click(function(event){
	var skip = player.getDuration()*((event.pageX)/770) //x cordinate of end of bar
	 socket.emit('click',{type:'skip',time:skip})


})

     var time_update = setInterval(function(){
		var video_complete = (player.getCurrentTime()/player.getDuration())*100;
		console.log(video_complete)
		$('#square').css('width',video_complete.toString()+'%');

	}, 100)
}

socket.on('chat message', function(msg){

          $('#messages').append($('<li>').text(msg));

          window.scrollTo(0, document.body.scrollHeight);

        });

socket.emit('chat message','new user has joined the channel')

socket.on('event',function(data){
	if(data.type == 'play'){
player.seekTo(data.time)
	player.playVideo();
}
   else	if(data.type == 'pause'){

	player.pauseVideo();
}
else{
	player.seekTo(data.time)	
}
})

socket.on('resync', function(data){


player.pauseVideo()


var interval = setInterval(function() { 
   if (time <1) { 
      alert(time);
      time++;
   }
   else { 
      clearInterval(interval);
   }
}, 3000);

player.seekTo(data.time)
player.playVideo();

});





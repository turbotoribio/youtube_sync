
var socket = io();
var current_search;
var current_token = "";
var next_token;
var prev_token;

function youtube(is_search){
    if(is_search){
	current_search = $('#search').val()	
    }

    $.ajax({
        cache: false,
        data: $.extend({

           // key: 'AIzaSyCT6APi-_oOgjL-TzpkCY5vmI-rYvNgdCE',
            key: 'AIzaSyA66Xz5yQCgUQfUJr-FK3CgzRRnoTtePIM',
            q: current_search,
            type: 'video',
            part: 'snippet'
       },{maxResults:7,pageToken:current_token}),
        dataType: 'json',
        type: 'GET',
        timeout: 5000,
        url: 'https://www.googleapis.com/youtube/v3/search'
    })
    .done(function(data) {
	console.log(data.items)	
	
	if (typeof data.prevPageToken === "undefined") {
		$("#prev").hide();
	}
	else{
		$("#prev").show();
	} 
	

	if (typeof data.nextPageToken === "undefined") {
		$("#next").hide();
	}
	else{
		$("#next").show();
	}

	next_token = data.nextPageToken;
	prev_token = data.prevPageToken;         
	print_search(data.items)
	

})

}

    	$("#next").on( "click", function( event ) {
		current_token = next_token;
        	$('#list').empty()
        	youtube(false);
        	$('#search').val("");
            });

         $("#prev").on( "click", function( event ) {
        	current_token = prev_token;
		alert('Prev')
		$('#list').empty()
        	youtube(false);
       		$('#search').val("");
               
            });

	$('#search_btn').click(function(){
		$('#list').empty()
		youtube(true);
		$('#search').val("");
	
	})

function print_search(data){

for (var search in data){
 $('#list').append(`<div class="container" id="`+data[search].id.videoId+`"> 
				<img class="search_img" src="`+data[search].snippet.thumbnails.default.url+`">  
				<p class="title">`+data[search].snippet.title+`</p>  
				<p class="author"> By: <span>`+data[search].snippet.channelTitle+`</span></p> 
				<button class='select' id="`+data[search].id.videoId+`">choose this video</button>
				<br><br><br>
			</div>`)
	
	console.log(data[search].id.videoId)
}

}

$(document.body).on('click', '.select' ,function(){
	socket.emit('start_video',this.id)
	$('#list').empty
        $('#searching').hide(500)
	$('#box').show(500)
})

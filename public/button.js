var socket = io();
var current_room;

$('#login').click(function(){

	$('#register').hide(500)
	$('#login').hide(500)
	$('#logUser').show(500)


})


$('#close1').click(function(){

	  $('#register').show(500)
        $('#login').show(500)
        $('#logUser').hide(500)

})



$('.container').click(function(event){

	 alert(event.target.id)

})

$('#register').click(function(){


$('#dd').hide(400)
$('#box').show(500)


	
})

$('#close2').click(function(){

        $('#register').show(500)
        $('#login').show(500)
        $('#regUser').hide(500)
                                                                                                                                                                                                                                      
})

$('#login_btn').click(function(){
	
	if($('#username').val().trim()==''){
		alert('fil in your username!')
		return;
	}
	else{
		 socket.emit('new_user', {user:$('#username').val().trim()});
	}

socket.on('invalid_user',function(data){
	alert(data)
	return
})

socket.on('valid_user',function(data){
	$('#logUser').hide(500)
	$('#container2').show(500)	
	$('#logout').show(500)	

});


})


$('#reg_btn').click(function(){

	$('#regUser').hide(500)
	 $('#logUser').show(500)

})


$('#logout').click(function(){
$('#logout').hide(500)
$('#container2').hide(500)
$('#register').show(500)
$('#login').show(500)
$('#roomname').hide(500)
$('#searching').hide(500)
$('#list').empty()
$('#search').val()="";

})



$('#create').click(function(){
	$('#logout').hide(500)
	$('#container2').hide(500)
	$('#roomname').show(500)

})


$('#created').click(function(){

if($('#createroom').val().trim() == ""){

	alert('Fill in the roomname!')
	return;
}
else{
	socket.emit('create_room', {name:$('#createroom').val(), priv:false, password:false})
}

socket.on('err', function(msg,bool){

	alert(msg)
	return true
})
	current_room=$('#createroom').val()
	$('#roomname').hide(500)
	$('#searching').show(500)




}
)




import '~/css/reset.sass';
import './ui.sass';
import $ from 'jquery';
import _ from 'underscore';
import io from 'socket.io-client';
import moment from 'moment';


var socket = io();
window.socket = socket; // fer debugging
socket.on('message', function(data) {
  console.log(data);
});


var check_and_disable_cancelconfirm = () => {
	if($(".selected").length) { 
		$("button#cancel").removeAttr("disabled"); 
	}  else {
		$("button#cancel").attr("disabled", "disabled"); 
	}
	
	if($("#actions .selected").length) {
 		$("button#confirm").removeAttr("disabled"); 
	}  else {
		$("button#confirm").attr("disabled", "disabled"); 
	}
}

var updateStatusScroll = () => {
    $("#statuses").scrollTop($("#statuses")[0].scrollHeight);
}



$(function() {
  check_and_disable_cancelconfirm();

  // select users
  $("#users .button").click((event) => {
    $(event.currentTarget).toggleClass("selected");
    check_and_disable_cancelconfirm();
  });

  // select actions
  $("#actions .button").click((event) => {
    $("#actions .button").not(event.currentTarget).removeClass("selected");
    $(event.currentTarget).toggleClass("selected");
    check_and_disable_cancelconfirm();
	});

  // 'cancel' button
  $("button#cancel").click((event) => {
    $(".selected").removeClass("selected");
    check_and_disable_cancelconfirm();
  });

  // confirm button
  $("button#confirm").click((event) => {

    var data = {};
    data.sender = "ui";
    data.action = $("#actions .button.selected").attr("id").replace("action_", "");
    data.time = {'mode': 'manual_entry', 'value': moment().format() }
    data.users = [];
		$("#users .button.selected").each((i, e) => {
			data.users.push($(e).attr("id").replace("user_",""));
		});

    // send data
		socket.emit('broadcast', data);

    // show status
    $("#statuses").append("<li>" 
      + moment(data.time.value).format("YYYY MMM Do h:mm:ss a") + " --- " 
      + data.action + " :: " 
      + data.users.join(", ") 
    + "</li>")
    updateStatusScroll();

    $(".selected").removeClass("selected");
    check_and_disable_cancelconfirm();
  });


});


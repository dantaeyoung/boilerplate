import $ from 'jquery'
import _ from 'lodash'
import showdown from 'showdown'
import 'normalize-css'
import './css/style.scss'

$(function() {
  var converter = new showdown.Converter();
  $(".markdown").each(function(i) {
    console.log($(this));
    $(this).html(converter.makeHtml($(this).html()));
  });
});

$("#test").html("test worked!");
console.log("this works too");

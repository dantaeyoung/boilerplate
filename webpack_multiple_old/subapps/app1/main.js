import '~/css/reset.sass';
import './story.sass';
import $ from 'jquery';
import _ from 'underscore';
import io from 'socket.io-client';
import moment from 'moment';
import tracery from 'tracery-grammar';


var socket = io();
window.socket = socket; // fer debugging
socket.on('message', function(data) {
  if(data.sender == 'ui' || _.random(0,100) == 1) { // hacky way to print 1%
    console.log(data);
    $("#storylines").append("<li class='storyline'>" 
      + '<span class="time">' + moment(data.time.value).format("h:mm:ss a") + "</span>" 
      + '<span class="users">' + data.users.join(", ")  + '</span>'
      + '<span class="action">'+ grammar.flatten('#' + data.action + '#') + '</span>'
    + "</li>")
    updateStatusScroll();
  }
});


var updateStatusScroll = () => {
    $("#storylines").scrollTop($("#storylines")[0].scrollHeight);
}


var grammar = tracery.createGrammar({
    'animal': ['panda','fox','capybara','iguana'],
    "emotion_mellowly" : "thoughtfully sadly slowly reflectively morosely gently quietly calmly tenderly".split(" "),
    "emotion_upbeat" : "happy sad reflective morose proud".split(" "),
    "emotion_anticipation" : "nervous excited curious hesitant annoyed grumpy tired".split(" "),
    "kinda-really": ["kinda", "somewhat", "maybe", "just a little", "very", "ridiculously", "totally", "really"],

    "talk": ["I'm #talk_verb#."],
    "talk_verb": "chatting|gabbing|speaking|talking|shooting the shit".split("|"),

    "eat": ["I'm #kinda-really# hungry. I'm eating."],

    'drink_alcohol':['I am #drinking_emotions# drinking from a #drinking_size# #drinking_vessel# of #drinking_alcohol#.'],
    "drinking_size": "thimble-sized large huge ample generous tiny petite".split(" "),
    "drinking_vessel": "bottle cup mug flask flagon".split(" "),
    "drinking_alcohol": "wine tequila beer cider".split(" "),
    "drinking_emotions": ["#emotion_mellowly#"],
    
    'drink_water':['I am #drinking_emotions# drinking from a #drinking_size# #drinking_vessel# of #drinking_water#.'],
    "drinking_water": ["smartwater", "tapwater", "#seltzer#"],
    "seltzer": ["la croix", "perrier"],

    'bathroom':["I'm a little busy #bathroom_activity#."],
    'bathroom_activity': ["taking a shit", "doing number two", "taking a piss", "adjusting my hair", "taking some deep breaths in a toilet stall by myself", "checking my phone while pretending to take a shit", "dropping some kids off at the pool", "answering the call of nature"],

    'entered':["I #entered_arrival#. I'm #kinda-really# #emotion_anticipation#."],
    "entered_arrival": ["just got here", "arrived", "am finally at the party"],

    'left':['The party was #kinda-really# #party_review#. I just had to #left_leave#.'],
    'party_review': 'boring exciting ho-hum fun weird uncomfortable'.split(' '),
    'left_leave': ['do an Irish goodbye', 'head home', 'go to my next party of the night', 'take a walk by myself', 'grab a bite to eat', 'escape from society']
});

grammar.addModifiers(tracery.baseEngModifiers); 



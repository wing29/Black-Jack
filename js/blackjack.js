/*var randomRating = Math.floor(Math.random()*(10 - 1));
var randomScore = Math.floor(Math.random()*(52 - 1));

function twoRandomScores(){
	var score1 = randomRating;
	var score2 = randomRating;
	return score1 + score2;
}

console.log(twoRandomScores());
console.log("I got the score " + randomScore);
console.log(finalCard);


var deal = randomScore;

// create card objects
function Card(num,suit){
	this.num = num 
	this.suit = suit;
}
// create player objects
var player_hand = [];
var dealer_hand = [];

// create deck
var deck = [];

for (i = 1; i < 14; i++){
	deck.push(new Card(i, 'Club'));
    deck.push(new Card(i, 'Diamond'));
    deck.push(new Card(i, 'Heart'));
    deck.push(new Card(i, 'Spade'));
}

//shuffle the cards - http://css-tricks.com/snippets/javascript/shuffle-array/
deck.sort(function() { return 0.5 - Math.random() });

// assign dealer and player their first card
dealer_hand.push(deck.pop());
player_hand.push(deck.pop());

// assign dealer and player their second card
dealer_hand.push(deck.pop());
player_hand.push(deck.pop());

*/

// create deck

/**
 * Game constructor
 */
function Game() {
	this.round = null;
	this.deck = [];
	this.playerHand = [];
	this.dealerHand = [];
}

/**
 * Game - init
 * 
 * Init function of Game. This function resets deck to default and empty both player's and dealer's hand.
 */
Game.prototype.init = function () {
	var self = this;

	self.round = 2;

	for (var i = 0; i < 52; i++) {
		self.deck[i] = i;
	}

	self.playerHand = [];
	self.dealerHand = [];
};

Game.prototype.dealDealer = function (){
	var self = this;
	var randomIndex = Math.floor(Math.random() * self.deck.length);

	// console.log("Dealing card " + self.deck[randomIndex] + " at " + randomIndex + " to dealer");

	self.dealerHand.push(self.deck[randomIndex]);
	self.deck.splice(randomIndex, 1);
};

Game.prototype.dealPlayer = function (){
	var self = this;
	var randomIndex = Math.floor(Math.random() * self.deck.length);

	// console.log("Dealing card " + self.deck[randomIndex] + " at " + randomIndex + " to player");

	self.playerHand.push(self.deck[randomIndex]);
	self.deck.splice(randomIndex, 1);
};

Game.prototype.getPlayerHandValue = function () {
	var self = this;
	var value = 0;

	for (var i = 0; i < self.playerHand.length; i++) {
		value += ((self.playerHand[i] % 13) + 1) > 10 ? 10 : (self.playerHand[i] % 13) + 1;
	}

	return value;
};

Game.prototype.getDealerHandValue = function () {
	var self = this;
	var value = 0;

	for (var i = 0; i < self.dealerHand.length; i++) {
		value += ((self.dealerHand[i] % 13) + 1) > 10 ? 10 : (self.dealerHand[i] % 13) + 1;
	}

	return value;
};

Game.prototype.isBusted = function () {
	var self = this;
	return self.getPlayerHandValue() > 21;
}

Game.prototype.isBustedDealer = function () {
	var self = this;
	return self.getDealerHandValue() > 21;
}

Game.prototype.compare = function (){
	var self = this;
	if (self.getDealerHandValue()  === self.getPlayerHandValue()) {
		document.getElementById("game_result").innerHTML = "Tied";
	} else if (self.getDealerHandValue() > 21){
		document.getElementById("game_result").innerHTML = "Player Wins";
	} else if (self.getPlayerHandValue() > self.getDealerHandValue() && self.getPlayerHandValue() <= 21 ) {
		document.getElementById("game_result").innerHTML = "Player wins";
	}  else{
		document.getElementById("game_result").innerHTML = "Dealer Wins";
	}
}
console.log(self.getDealerHandValue);

// assign two cards to dealer and player
var game = new Game();

game.init();

game.dealPlayer();
game.dealPlayer();

game.dealDealer();
game.dealDealer();


function hit(){
	// console.log(game.round);
	if (game.round < 5) {
		game.dealPlayer();
	} else {
		alert("Looks like you've reached the maximun number of cards you can have, let's play again!")
	}

	game.round++;
	refresh();
	promptBusted();
}

function promptBusted() {
	if (game.round != null && game.isBusted()) {
		document.getElementById("player_score").innerHTML = game.getPlayerHandValue() + " Busted!";
		document.getElementById("hit").disabled = true;
		stand();
	}
}

function refresh(){

	for (var i = 0; i < game.playerHand.length; i++) {
		document.getElementById("player_card" + (i + 1).toString()).src = "img/" + game.playerHand[i] + ".png";
		document.getElementById("player_score").innerHTML = game.getPlayerHandValue();
	}

	for (var i = 1; i < game.dealerHand.length; i++) {
		document.getElementById("dealer_card" + (i + 1).toString()).src = "img/" + game.dealerHand[i] + ".png";
	}
}

function stand(){
	document.getElementById("dealer_card1").src = "img/" + game.dealerHand[0] + ".png";

	while (game.getDealerHandValue() < 17) {
		game.dealDealer();
		refresh();
	}

	if (game.isBustedDealer()) {
		document.getElementById("dealer_score").innerHTML = game.getDealerHandValue() + " Busted!";
	} else if (game.getDealerHandValue() === 21) {
		document.getElementById("dealer_score").innerHTML = "Black Jack!";
	} else {
		document.getElementById("dealer_score").innerHTML = game.getDealerHandValue();
	}

	game.compare()
}

function reset(){
	location.reload();
}

console.log(game);
console.log(game.getPlayerHandValue());

// check player hand score




/*function deal(){
	var card = Math.floor(Math.random()*(52 - 0));
	return card;
}

// What card is it?

function suitType(card){
	if(Math.floor(card / 13) === 0) {
		return 'Heart';
	} else if (Math.floor(card / 13) === 1){
		return 'Diamond';
	} else if (Math.floor(card / 13) === 2){
		return 'Club';
	} else {
		return 'Spades';
	}
}
function cardValue(card){
	if(card % 13 === 12 ){
		return "King";
	}else if(card % 13 === 11){
		return "Queen";
	}else if(card % 13 === 10){
		return "Jack";
	}else if(card % 13 === 9){
		return "10";
	}else if(card % 13 === 8){
		return "9";
	}else if(card % 13 === 7){
		return "8";
	}else if(card % 13 === 6){
		return "7";
	}else if(card % 13 === 5){
		return "6";
	}else if(card % 13 === 4){
		return "5";
	}else if(card % 13 === 3){
		return "4";
	}else if(card % 13 === 2){
		return "3";
	}else if(card % 13 === 1){
		return "2";
	}else {
		return "Ace";
	}

}
// how to determine scores


function score() {
    return getValue(card1) + getValue(card2);
};

// create player objects
var player_hand = [];
var dealer_hand = [];

// create deck
var deck = [];

// new game
/*
for (i = 0, i < 52, i++){
	deck.push(i);
}*/

/*
// assign dealer and player their first card
dealer_hand.push(deck.pop());
player_hand.push(deck.pop());

// assign dealer and player their second card
dealer_hand.push(deck.pop());
player_hand.push(deck.pop());

// assign player two cards
var card1 = deal();
var card2 = deal();
var card3 = deal();
var card4 = deal();

function player_hand(){
	document.getElementById("player_card1").src = "img/" + card1 + ".png";
	document.getElementById("player_card2").src = "img/" + card2 + ".png";
}

function hit(){
	document.getElementById("player_card3").src = "img/" + card3 + ".png";
}

/*function hit_again(){
	document.getElementById("player_card4").src = "img/" + card4 + ".png";
}*/

/*
console.log(card1);
console.log(card2);

console.log('Your first card is ' + cardValue(card1) + ' of ' + suitType(card1));
console.log('Your second card is ' + cardValue(card2) + ' of ' + suitType(card2));
console.log('Your score is ' + score());
*/


var numbers = [0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26];

var black = function(num) {
	if ((((num >= 1) && (num <=10)) || ((num >= 1) && (num <=10))) && ((num % 2) == 0))
		return true;
	if ((((num >= 11) && (num <=18)) || ((num >= 29) && (num <=36))) && ((num % 2) == 1))
		return true;
	return false;
}

var red = function(num) {
	return (num !== 0) && !black(num);
}

var even = function(num) {
	return ((num !== 0) && ((num % 2) === 0));
}

var odd = function(num) {
	return ((num !== 0) && ((num % 2) === 1));
}

var manque = function(num) {
	return (num !== 0) && (num <= 18);
}

var passe = function(num) {
	return (num >= 19);
}


var manageExec = function() {
	var totalBalance = parseInt(document.getElementById('StartBalance').value, 10);
	var minBet       = parseInt(document.getElementById('MinBet').value, 10);
	var numSpins     = parseInt(document.getElementById('NumSpins').value, 10);
	var pastSpins    = [];
	var bets         = [];

	var functionText = document.getElementById('UserCode').value;
	var userFunc = new Function('balance', 'spins', functionText);

	for (var i = 0; i < numSpins; i++) {
		var currBet = userFunc(totalBalance, pastSpins);
		var index = Math.floor(Math.random() * numbers.length);
		var currSpin = numbers[index];

		totalBalance += pay(totalBalance, currBet, currSpin);
		alert(totalBalance);

		bets.push(currBet);
		pastSpins.push(currSpin);
	}

	alert(bets);
	
}

var pay = function(balance, bet, spin) {
	var win = 0;
	var cost = 0;
	
	for (var i = 0; i < bet.length; i++) {
		if (bet[i].amount > balance) {
			break; // can't bet on credit
		}
		else {
			cost += bet[i].amount;
			balance -= bet[i].amount;
			
			bet[i].bet = bet[i].bet.toLowerCase();
			if (bet[i].bet == 'even') {
				if (even(spin)) {
					win += bet[i].amount * 2;
					evenCount++;
				}
			}
			else if (bet[i].bet == 'odd') {
				if (odd(spin)) {
					win += bet[i].amount * 2;
					oddCount++;
				}
			}
			if (bet[i].bet == 'red') {
				if (red(spin)) {
					win += bet[i].amount * 2;
					redCount++;
				}
			}
			else if (bet[i].bet == 'black') {
				if (black(spin)) {
					win += bet[i].amount * 2;
					blackCount++;
				}
			}
			if (bet[i].bet == 'manque') {
				if (manque(spin)) {
					win += bet[i].amount * 2;
					manqueCount++;
				}
			}
			else if (bet[i].bet == 'passe') {
				if (passe(spin)) {
					win += bet[i].amount * 2;
					passeCount++;
				}
			}
			else if (bet[i].bet.contains('numbers')) {
				if (passe(spin)) {
					win += bet[i].amount * 2;
					passeCount++;
				}
			}
		}
	}
	
	return win - cost;
}

document.getElementById('Exec').onclick = manageExec;

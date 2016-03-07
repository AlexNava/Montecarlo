var numbers = [0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26];

var black = function(num) {
	if ((((num >= 1) && (num <=10)) || ((num >= 1) && (num <=10))) && ((num % 2) == 0))
		return true;
	if ((((num >= 11) && (num <=18)) || ((num >= 29) && (num <=36))) && ((num % 2) == 1))
		return true;
	return false;
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
				if ((spin !== 0) && ((spin % 2) === 0))
					win += bet[i].amount * 2;
			}
			else if (bet[i].bet == 'odd') {
				if ((spin !== 0) && ((spin % 2) === 1))
					win += bet[i].amount * 2;
			}
			if (bet[i].bet == 'red') {
				if ((spin !== 0) && !black(spin))
					win += bet[i].amount * 2;
			}
			else if (bet[i].bet == 'black') {
				if (black(spin))
					win += bet[i].amount * 2;
			}
			if (bet[i].bet == 'manque') {
				if ((spin !== 0) && (spin <= 18))
					win += bet[i].amount * 2;
			}
			else if (bet[i].bet == 'passe') {
				if ((spin !== 0) && (spin >= 19))
					win += bet[i].amount * 2;
			}
		}
	}
	
	return win - cost;
}

document.getElementById('Exec').onclick = manageExec;

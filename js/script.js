function shuffle(array) {
	var currentIndex = array.length, temporaryValue, randomIndex;
	while (0 !== currentIndex) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}
	return array;
}

isTimerRun = false;
completedCards = 0;
randomSample = ['💩', '🧠', '🤵', '👂🏻', '👩‍🦰', '🦄', '💩', '🧠', '🤵', '👂🏻', '👩‍🦰', '🦄']
randomSample = shuffle(randomSample)

var flibody = document.querySelectorAll('.flip__body');

function some() {
	for (var i = 0; i < ar.length; i++) {
		ar[i].textContent = randomSample[i];
	}
}

function newGame() {
	randomSample = shuffle(randomSample);
	[].forEach.call(flibody, function (element) {
		element.classList.remove('rot')
		element.querySelector('.flip__back').style.backgroundColor = '#fff';
		element.querySelector('.flip__back').style.border = ' 5px solid #fff';
	});
	curOpened = []
	curRedOpened = []
	time = '01:00';
	timer.textContent = time;
	isTimerRun = false;
	completedCards = 0;
	setTimeout(some, 1000)


	popup.classList.remove('open')
}

ar = document.querySelectorAll('.flip__back');
for (var i = 0; i < ar.length; i++) {
	ar[i].textContent = randomSample[i];
}

var popup = document.querySelector('.popup');

var fli = document.querySelectorAll('.flip');
[].forEach.call(fli, function (element) {
	element.addEventListener('click', handler)
});

curOpened = []
curRedOpened = []
function handler() {
	if (!isTimerRun) {
		isTimerRun = true;
		id = setInterval(timeF, 1000);
	}
	var flibody = this.querySelector('.flip__body');
	if (curRedOpened != []) {
		curRedOpened.forEach(function (element) {
			element.querySelector('.flip__back').style.backgroundColor = '#fff';
			element.querySelector('.flip__back').style.border = ' 5px solid #fff';
			element.classList.remove('rot');
		})
		curRedOpened = []
	}

	if (!(flibody.classList.contains('rot'))) {
		flibody.classList.add('rot');
		curOpened.push(flibody)
		if (curOpened.length > 1) {
			if (curOpened[0].querySelector('.flip__back').textContent === curOpened[1].querySelector('.flip__back').textContent) {
				curOpened[0].querySelector('.flip__back').style.backgroundColor = '#5AD66F';
				curOpened[0].querySelector('.flip__back').style.border = ' 5px solid #5AD66F';
				curOpened[1].querySelector('.flip__back').style.backgroundColor = '#5AD66F';
				curOpened[1].querySelector('.flip__back').style.border = ' 5px solid #5AD66F';
				curOpened = [];
				completedCards++;
				if (completedCards == 6) {
					clearInterval(id)
					document.querySelector('.popup__title').textContent = 'Win'
					// message = win;
					document.querySelector('.popup__text').textContent = 'Play again'
					popup.classList.add('open')
				}
			} else {
				curOpened[0].querySelector('.flip__back').style.backgroundColor = '#F44336';
				curOpened[0].querySelector('.flip__back').style.border = ' 5px solid #F44336';
				curOpened[1].querySelector('.flip__back').style.backgroundColor = '#F44336';
				curOpened[1].querySelector('.flip__back').style.border = ' 5px solid #F44336';
				curRedOpened = curOpened;
				curOpened = [];
			}
		}
	}
}


timer = document.querySelector('.timer__title');
time = '01:00';
var id

function timeF() {
	minutes = time.slice(0, 2)
	seconds = time.slice(3, 5)
	if (seconds === '00') {
		minutes = String(parseInt(minutes) - 1)
		if (minutes.length == 1) {
			minutes = '0' + minutes
		}
		seconds = '59'
	} else {
		seconds = String(parseInt(seconds) - 1)
		if (seconds.length == 1) {
			seconds = '0' + seconds
		}
	}
	time = minutes + ':' + seconds
	timer.textContent = time;
	if (time === '00:00') {
		clearInterval(id)
		document.querySelector('.popup__title').textContent = 'Lose'
		// message = 'Lose'
		document.querySelector('.popup__text').textContent = 'Try again'
		popup.classList.add('open')
	}
}

document.querySelector('.popup__text').addEventListener('click', newGame)
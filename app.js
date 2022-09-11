// Game values
let min = 1,
    max = 3,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

// UI elements
const UIgameWrapper = document.querySelector('#game'),
      UIminNum = document.querySelector('.min-num'),
      UImaxNum = document.querySelector('.max-num'),
      UIguessBtn = document.querySelector('#guess-btn'),
      UIguessInput = document.querySelector('#guess-input')
      UImessage = document.querySelector('.message');

// Assign UI min and max
UIminNum.textContent = min;
UImaxNum.textContent = max;

// Play again event listener
//
// since the play-again button doesnt exist within the initial html
// we need to target the new button through delegation of a parent element
// so we target the game wrapper to find the play-again button
UIgameWrapper.addEventListener('mousedown', function(e){
  if(e.target.className === 'play-again'){
    window.location.reload();
  }
})

// Listen for guess button
UIguessBtn.addEventListener('click', function(){
  let guess = parseInt(UIguessInput.value);

  // Validate the input check not blank, less than min, heigher than max
  if(isNaN(guess) || guess < min || guess > max){
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  }

  // Decrease guess count
  guessesLeft -= 1;

  // Check if won
  if(guess === winningNum){
    // Correct guess
    guessCorrect(true, `${winningNum} is correct!`);
    UIguessInput.disabled = true;
    UIguessBtn.value = 'Play Again';
    UIguessBtn.className += 'play-again';
  } else {
    if(guessesLeft === 0){
      // Wrong guess - Game over
      guessCorrect(false, `Game Over. The correct number was ${winningNum}.`);
      UIguessInput.disabled = true;
      UIguessBtn.value = 'Play Again';
      UIguessBtn.className += 'play-again';
    } else {
      // Wrong guess- Continue
      guessCorrect(false, `${guess} is not correct. ${guessesLeft} guesses left.`);
      // Clear Input
      UIguessInput.value = '';
    }
  }
});

// 
function guessCorrect(won, msg){
  let color;
  won === true ? color = 'green' : color = 'red';

  setMessage(msg, color);
}

// Get Random Number
function getRandomNum(min, max){
  return Math.floor(Math.random()*(max-min+1)+min);
}
      
// Set message
function setMessage(msg, color){
  UIguessInput.style.borderColor = color;
  UImessage.style.color = color;
  UImessage.textContent = msg;
}
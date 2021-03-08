//Global Variables
var pattern = []; //to be filled at game start
var patternLength = 8;
var numBtns = 6;
var progress = 0; 
var gamePlaying = false;
var tonePlaying = false;
var volume = 0.5;  //must be between 0.0 and 1.0
var guessCounter = 0;
var freqMap = {} //to be filled at game start
var clueHoldTime = 1000.0; //how long to hold each clue's light/sound
var curScore = 0; //current score
var highScore = 0; //high score
var timer; //timer object
var timeGiven = 10; //how much time to guess after clues stop
var timeRemaining = 0; //how much time the player has left

//Global constants
const cluePauseTime = 333; //how long to pause in between clues
const nextClueWaitTime = 1000; //how long to wait before starting playback of the clue sequence

//General game functions
function startGame(){
  //initialize game variables
  for (let i = 0; i < patternLength; i++) pattern[i] = Math.round(Math.random()*numBtns);
  let startingFreq = Math.random()*120+120;
  for (let i = 0; i < numBtns; i++) freqMap[i+1] = startingFreq+30*i;
  progress = 0;
  clueHoldTime = 1000.0;
  gamePlaying = true;
  curScore = 0;
  // swap the Start and Stop buttons
  document.getElementById("startBtn").classList.add("hidden");
  document.getElementById("stopBtn").classList.remove("hidden");
  
  document.getElementById("volumeSlider").addEventListener("change", function() {
    volume = document.getElementById("volumeSlider").value/100.0;
    console.log("Volume updated to " + volume);
}, false);
  
  playClueSequence();
}
function stopGame(){
  gamePlaying = false;
  // swap the Start and Stop buttons
  document.getElementById("stopBtn").classList.add("hidden");
  document.getElementById("startBtn").classList.remove("hidden");
  if (curScore > highScore) {
    highScore = curScore;
    updateParagraph();
  }
  clearTimer();
}
function loseGame(){
  stopGame();
  alert("Game Over. You lost.");
}
function winGame(){
  stopGame();
  alert("Game Over. You won.");
}

// Sound Synthesis Functions
function playTone(btn,len){ 
  o.frequency.value = freqMap[btn]
  g.gain.setTargetAtTime(volume,context.currentTime + 0.05,0.025)
  tonePlaying = true
  setTimeout(function(){
    stopTone()
  },len)
}
function startTone(btn){
  if(!tonePlaying){
    o.frequency.value = freqMap[btn]
    g.gain.setTargetAtTime(volume,context.currentTime + 0.05,0.025)
    tonePlaying = true
  }
}
function stopTone(){
    g.gain.setTargetAtTime(0,context.currentTime + 0.05,0.025)
    tonePlaying = false
}

//Clue Playing Functions
function lightButton(btn){
  document.getElementById("button"+btn).classList.add("lit")
}
function clearButton(btn){
  document.getElementById("button"+btn).classList.remove("lit")
}
function playSingleClue(btn){
  if(gamePlaying){
    lightButton(btn);
    playTone(btn,clueHoldTime);
    setTimeout(clearButton,clueHoldTime,btn);
  }
}
function playClueSequence(){
  let delay = nextClueWaitTime; //set delay to initial wait time
  guessCounter = 0;
  clueHoldTime *= 0.9;
  clearTimeout(timer);
  document.getElementById("p2").innerHTML = "Time remaining: " + timeGiven;
  for(let i=0;i<=progress;i++){ // for each clue that is revealed so far
    console.log("play single clue: " + pattern[i] + " in " + delay + "ms")
    setTimeout(playSingleClue,delay,pattern[i]) // set a timeout to play that clue
    delay += clueHoldTime 
    delay += cluePauseTime;
  }
  
  timeRemaining = timeGiven;
  timer = setTimeout(function tick() {
    if (gamePlaying) {
      updateTimer();
      timer = setTimeout(tick, 1000); // (*)
    }
  }, delay);
}

function updateParagraph() {
    document.getElementById("p1").innerHTML = "Press buttons in the same order as the original pattern to win.\nCurrent Score: "+curScore+" | High Score: "+highScore;
}
function clearTimer() {
  clearTimeout(timer);
  timeRemaining = 0;
  document.getElementById("p2").innerHTML = "";
}
function updateTimer() {
    if (timeRemaining >= 0) {
      document.getElementById("p2").innerHTML = "Time remaining: " + timeRemaining;
      timeRemaining--;
    } else {
      loseGame();
    }
}

//User input functions
function guess(btn){
  console.log("user guessed: " + btn);
  if(!gamePlaying){
    return;
  }

  // add game logic here
  if (btn == pattern[guessCounter]) {
    if (guessCounter == progress) {
      progress++;
      curScore = progress;
      updateParagraph();
      if (progress == patternLength) {
        winGame();
        return;
      }
      playClueSequence();
    } else {
      guessCounter++;
    }
  } else {
    loseGame();
    return;
  }
}

//Page Initialization
// Init Sound Synthesizer
var context = new AudioContext()
var o = context.createOscillator()
var g = context.createGain()
g.connect(context.destination)
g.gain.setValueAtTime(0,context.currentTime)
o.connect(g)
o.start(0)
updateParagraph();
//Initialization so that the buttons aren't useless before the game starts
for (let i = 0; i < patternLength; i++) pattern[i] = Math.round(Math.random()*numBtns);
let startingFreq = Math.random()*120+120;
for (let i = 0; i < numBtns; i++) freqMap[i+1] = startingFreq+30*i;
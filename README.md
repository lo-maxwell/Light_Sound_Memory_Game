# Pre-work - *Memory Game*

**Memory Game** is a Light & Sound Memory game to apply for CodePath's SITE Program.

Submitted by: **Maxwell Lo**

Time spent: **5** hours spent in total

Links to project: <br>
Code: https://glitch.com/edit/#!/sprinkle-field-angelfish <br>
Site: https://sprinkle-field-angelfish.glitch.me

## Required Functionality

The following **required** functionality is complete:

* [x] Game interface has a heading (h1 tag), a line of body text (p tag), and four buttons that match the demo app
* [x] "Start" button toggles between "Start" and "Stop" when clicked. 
* [x] Game buttons each light up and play a sound when clicked. 
* [x] Computer plays back sequence of clues including sound and visual cue for each button
* [x] Play progresses to the next turn (the user gets the next step in the pattern) after a correct guess. 
* [x] User wins the game after guessing a complete pattern
* [x] User loses the game after an incorrect guess

The following **optional** features are implemented:

* [x] Any HTML page elements (including game buttons) has been styled differently than in the tutorial
* [x] Buttons use a pitch (frequency) other than the ones in the tutorial
* [x] More than 4 functional game buttons
* [x] Playback speeds up on each turn
* [x] Computer picks a different pattern each time the game is played
* [ ] Player only loses after 3 mistakes (instead of on the first mistake)
* [ ] Game button appearance change goes beyond color (e.g. add an image)
* [ ] Game button sound is more complex than a single tone (e.g. an audio file, a chord, a sequence of multiple tones)
* [x] User has a limited amount of time to enter their guess on each turn

The following **additional** features are implemented:

- [x] Rolling high score tracker
- [x] Volume slider

## Video Walkthrough

Here's a walkthrough of implemented user stories:
<img src="https://github.com/lo-maxwell/Light_Sound_Memory_Game/blob/main/Screen%20Recording%202021-03-07%20at%2011.22.42%20PM.gif?raw=true" width=800><br>

## Reflection Questions
1. If you used any outside resources to help complete your submission (websites, books, people, etc) list them here. 

javascript.info: generic javascript syntax<br>
w3Schools: generic javascript, html, css syntax<br>
StackOverflow: info on dynamically changing html paragraph text, setTimeout and setInterval<br>

2. What was a challenge you encountered in creating this submission (be specific)? How did you overcome it? (recommended 200 - 400 words) 

The most difficult part of this submission was creating the countdown timer that would give the player a set amount of time to repeat the pattern. I wanted a timer that was: 1) visible to the player, 2) would end the game if it hit 0, but reset at the start of each round, and 3) wouldn’t start counting down until the sequence was done playing, so that the user would always have 10 seconds to enter their guesses (rather than having their time cut short by being forced to wait for the pattern to play).<br>
The first item took a while to figure out the syntax behind dynamically changing html text, but was fairly straightforward after searching a few answers on StackOverflow. The second item was more challenging. At first, I just made a single timer object and would have it run a function that counted down a specific timer variable (called timeRemaining). However, because the timer was reset at the beginning of each round, but the original timer was not cancelled, timeRemaining would begin counting down 2 or more times per second due to the cumulative timers running, and eventually the player would only have 1 second to input their answer rather than the given 10 seconds. I eventually fixed this by using clearInterval() immediately before starting the new timer for the next round.<br>
For the third item, I thought it would be enough to just have the continuous, 1 second timer delayed until after the sounds were done playing, which would be marked by the final “delay” variable that dictated when the last note in the pattern would play. But when I tried to implement this by having the round start call a new setTimeout() that would then call the continuous setInterval(), only the setTimeout was tied to the timer object and it became impossible to access the setInterval() timer. This created the previous problem of timers stacking and having multiple timers counting down the remaining time at once. In the end, while searching for a way to delay the setInterval() function without using setTimeout(), I stumbled upon a StackOverflow post that said to create a setTimeout() that recursively called a secondary setTimeout(). By setting the first one to have a delay equal to the longest note, and the second one to have a 1 second delay, I was able to create the timer that I wanted. 

3. What questions about web development do you have after completing your submission? (recommended 100 - 300 words) 

After completing this submission, I became more curious about how much one could do with just frontend languages, and also how to combine it with the backend that I’m more familiar with. Since I mainly program in java, my experience in creating an interface is essentially just messing with views in Android Studio. However, with html/css, it seems much easier to create buttons or text or just style the page in various colors and fonts. Would it then be possible to create an entire webapp in just javascript + html/css, and if so, where does the backend come in? This project has helped me realize just how little I know about how to actually use the data structures I learned in class. Without the knowledge of how to integrate it into a usable webpage or application, what’s the point of knowing how to reverse a linked list, or perform quicksort? While I’m likely still going to be working with java for a while, this project has made me more interested in learning javascript. 

4. If you had a few more hours to work on this project, what would you spend them doing (for example: refactoring certain functions, adding additional features, etc). Be specific. (recommended 100 - 300 words) 

If I had more time to work on this project, I would probably try to get the sequence to play out some sort of series of notes, either in a scale or copying the notes of a popular music/song. The latter is more interesting, but would likely require an already existing database of what pitch each note is at, or I would have to manually figure it out/create a program to parse the sounds, which would take a very long time. I would also try to clean up the code, since it has a lot of global variables and inefficient code since I was just trying to get something to work on account of not knowing javascript well. While not particularly complicated, I don’t know if the code will still be readable to me in 6 months as is. I would also just spend some time reading through and understanding the code, especially in parts were complicated and not clearly explained like the sound synthesis functions. 



## License

    Copyright [YOUR NAME]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.

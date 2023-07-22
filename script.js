let count = 0;//count of active timers
const hrs = document.getElementsByClassName("hrs");
const mins = document.getElementsByClassName("mins");
const secs = document.getElementsByClassName("secs");
const setTimeBtn = document.getElementById("set-btn");
const activeSection = document.getElementById("active-container");

let countdownTimes = [];
setTimeBtn.addEventListener("click", () => {
  count++;
  clearInterval(countdownTimes[count - 1]); // clear previous timer
  countdownTimes.splice(count - 1, 1);
  if (hrs[0].value != 0 || mins[0].value != 0 || secs[0].value != 0) {
    const activeDiv = document.createElement("div");
    activeDiv.className = "set-time-box";
    activeDiv.innerHTML = `<span>Time Left :</span>
        <div class="inputs">
          <input type="number" class="hrs" placeholder="hh" />
          <span>:</span>
          <input type="number" class="mins" placeholder="mm" />
          <span>:</span>
          <input type="number" class="secs" placeholder="ss" />
        </div>
        <button class = "delete-btn">Delete</button>`;
    countdownTimes.push(
      setInterval(() => {
        timer();
      }, 1000)
    );
    if (activeSection.innerText === "You have no timers currently!") {
      activeSection.innerText = "";
    }
    activeSection.appendChild(activeDiv);
  }
  hrs[count].value = hrs[0].value;
  mins[count].value = mins[0].value;
  secs[count].value = secs[0].value;
  hrs[0].value = "";
  mins[0].value = "";
  secs[0].value = "";
});

function timer() {
  if (
    hrs[count].value == 0 &&
    mins[count].value == 0 &&
    secs[count].value == 0
  ) {
    hrs[count].value = "";
    mins[count].value = "";
    secs[count].value = "";
    clearInterval(countdownTimes[count - 1]);
    //    countdownTimes.splice(count-1,1)
    timesUp();
  } else if (secs[count].value > 59) {
    const times = Math.floor(secs[count].value / 60);
    mins[count].value = mins[count].value + times;
    secs[count].value -= 60 * times;
  } else if (secs[count].value != 0) {
    secs[count].value--;
  } else if (mins[count].value > 59 && secs[count].value == 0) {
    const times = Math.floor(mins[count].value / 60);
    hrs[count].value = hrs[count].value + times;
    mins[count].value -= 60 * times;
  } else if (mins[count].value != 0 && secs[count].value == 0) {
    mins[count].value--;
    secs[count].value = 59;
  } else if (hrs[count].value != 0 && mins[count].value == 0) {
    hrs[count].value--;
    mins[count].value = 59;
    secs[count].value = 59;
  }
}

function timesUp() {
  let currDiv = document.getElementsByClassName("set-time-box")[count];
  currDiv.style.display = "none";
  const activeDiv = document.createElement("div");
  activeDiv.className = "set-time-box timesUpBox";
  activeDiv.innerHTML = `<audio class= "audio" src="./mixkit-happy-bells-notification-937.wav" loop ></audio><span class="timesUpText">Time is Up !</span><button id="stop-btn">Stop</button>`;
  activeSection.appendChild(activeDiv);
  const audioElement = activeDiv.querySelector(".audio");
  audioElement.play();
  document.getElementById("stop-btn").addEventListener("click", () => {
    activeDiv.remove();
  });
}

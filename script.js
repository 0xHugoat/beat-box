let record = document.getElementById("record")
let stop = document.getElementById("stop")
let lecture = document.getElementById("lecture")
let isRecording = false

let tableaux = []
let time = 0

function playSound(keyCode) {
  let audio = document.querySelector('audio[data-key="' + keyCode + '"]')
  audio.play()
  let key = document.querySelector('div[data-key="' + keyCode + '"]')
  key.classList.add("playing")
}

window.addEventListener("keydown", (e) => {
  playSound(e.keyCode)

  if (isRecording) {
    let dateNow = Date.now()
    let recordKey = e.keyCode
    tableaux.push({Recordkey: recordKey, Date:time == 0 ? 0: dateNow - time})
    time = dateNow
    console.log(tableaux);
  }
})

let keys = document.querySelectorAll(".key")

for (const key of keys) {
  key.addEventListener("transitionend", (e) => {
    key.classList.remove("playing")
  })
}

function beatBox() {
  function simulateKey(keyCode) {
    const event = new KeyboardEvent("keydown", {
      keyCode: keyCode,
      bubbles: true,
    })
    document.dispatchEvent(event)
  }
  function playBeat(keyCode, time) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        simulateKey(keyCode)
        resolve()
      }, time)
    })
  
} 


playBeat(65, 0)                       // kick
    .then(() => playBeat(90, 400))      // hihat
    .then(() => playBeat(69, 400))      // snare
    .then(() => playBeat(81, 400))      // hihat
    .then(() => playBeat(83, 400))      // kick
    .then(() => playBeat(68, 200))      // kick
    .then(() => playBeat(87, 400))      // snare
    .then(() => playBeat(81, 400))      // openhat
}

document.querySelector(".btn").addEventListener("click", beatBox)

record.addEventListener("click", () => {
  tableaux.length = 0;
  isRecording = true
})

stop.addEventListener("click", () => {
  isRecording = false
  console.log(isRecording);
})

function lectureTouche() {
  playSound({Recordkey: recordKey, Date:time == 0 ? 0: dateNow - time})
  return(lectureTouche)
}

lecture.addEventListener("click", () => {
  lectureTouche()
})




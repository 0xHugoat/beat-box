let record = document.getElementById("record")
let stop = document.getElementById("stop")
let lecture = document.getElementById("lecture")
let isRecording = false
let isLecture = false

let tableaux = []
let time = 0

function playSound(keyCode) {
  let audio = document.querySelector('audio[data-key="' + keyCode + '"]')
  if (!audio) return
  audio.currentTime = 0
  audio.play()
  let key = document.querySelector('div[data-key="' + keyCode + '"]')
  key.classList.add("playing")
}

window.addEventListener("keydown", (e) => {
  playSound(e.keyCode)

  if (isRecording) {
    let dateNow = Date.now()
    let recordKey = e.keyCode
    tableaux.push({ Recordkey: recordKey, Date: time == 0 ? 0 : dateNow - time })
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

function beatBoxF() {
  async function beat() {
    await playBeat(65, 0)                       // kick
    await playBeat(90, 400);    // hihat
    await playBeat(69, 400);     // snare
    await playBeat(81, 400);     // hihat
    await playBeat(83, 400);     // kick
    await playBeat(68, 200);     // kick
    await playBeat(87, 400);     // snare
    await playBeat(88, 400);
    await playBeat(67, 400);    // openhat
  }
  return beat();
}







document.querySelector(".btn").addEventListener("click", beatBoxF)

record.addEventListener("click", () => {
  tableaux = []
  time = 0
  isRecording = true
  console.log(isRecording);
})

stop.addEventListener("click", () => {
  isRecording = false
  console.log(isRecording);
})


lecture.addEventListener("click", () => {

  async function playRecord() {
    for (const element of tableaux) {
      await playBeat(element.Recordkey, element.Date);
      console.log(element.Recordkey, element.Date)
    }

    
  }
  return playRecord();
})





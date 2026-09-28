function playSound(keyCode) {
  let audio = document.querySelector('audio[data-key="' + keyCode + '"]')
  audio.play()
  let key = document.querySelector('div[data-key="' + keyCode + '"]')
  key.classList.add("playing")
}

window.addEventListener("keydown", (e) => {
  playSound(e.keyCode)
})

let keys = document.querySelectorAll(".key")

for (const key of keys) {
  key.addEventListener("transitionend", (e) => {
    key.classList.remove("playing")
  })
}
const counterEL = document.getElementById('counter')
const increEL = document.getElementById('incre')
const decreEL = document.getElementById('decre')

let count = 0;
increEL.addEventListener('click', () => {
  count++;
  counterEL.innerText = count
})
decreEL.addEventListener('click', () => {
  count--;
  counterEL.innerText = count
})

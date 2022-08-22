const countersEl = document.getElementById('countersBox');
const addCounterEl = document.getElementById('addCounter');
const resetEl = document.getElementById('reset');



//javascript side

//creating counter components
const createCounterComponent = (id) => {
  const counterEl = document.createElement('div')
  counterEl.setAttribute("class", "counter flex flex-col p-8 items-center border border-sky-500 rounded");
  counterEl.setAttribute('id', '1')

  //creating and appending counter
  const counter = document.createElement('div')
  counter.setAttribute("class", "flex items-center pb-4 text-2xl font-semibold counter");
  counter.innerText = 0


  //creating incrementdecrement box
  const boxEl = document.createElement('div');
  boxEl.setAttribute("class", "flex space-x-3");

  //creating decrement element
  const decrementButtonEl = document.createElement('div');
  decrementButtonEl.setAttribute("class", "bg-red-400 text-white px-3 py-2 rounded shadow");
  decrementButtonEl.setAttribute("id", "decre");
  decrementButtonEl.innerText = "Decrement";

  //creating increment element
  const incrementButtonEl = document.createElement('div');
  incrementButtonEl.setAttribute("class", "bg-blue-400 text-white px-3 py-2 rounded shadow");
  incrementButtonEl.setAttribute("id", "incre");
  incrementButtonEl.innerText = "increment";

  //appending item to counterEl
  counterEl.appendChild(counter)
  boxEl.appendChild(decrementButtonEl);
  boxEl.appendChild(incrementButtonEl);
  counterEl.appendChild(boxEl);
  counterEl.setAttribute("id", id);

  return counterEl;
}






///Redux side
const INCREMENT = 'increment';
const DECREMENT = 'decrement'
const initialState = [
  {
    id: 1,
    count: 0,
  }
]
//ACTION CREATORS
const increment = (value) => {
  return {
    type: INCREMENT,
    payload: value
  }
}
const decrement = (value) => {
  return {
    type: DECREMENT,
    payload: value
  }
}
//create reducer function
function counterReducer(state = initialState, { type, payload }) {
  if (type === INCREMENT) {
    return { ...state, count: state.count + payload };
  }
  else if (type === DECREMENT) {
    return { ...state, count: state.count - payload };
  }
  else {
    return state;
  }
}


// //create store
const store = Redux.createStore(counterReducer);

// console.log(counterEl)
// //this render funciton will take the current state and update it in the UI
// const render = () => {

//   const state = store.getState()

//   counterEl.innerText = state[0].count
// }

// //update UI initially
// render()


// //when state of store will get updated it will re render manually
// store.subscribe(render)
// //button click listenners

let counterId = 1;
const createCountObject = (value) => {
  return {
    id: value,
    count: 0,
  }
}
const addCounter = () => {
  const states = store.getState();
  states.push(createCountObject(counterId));
  console.log(states)

}
addCounterEl.addEventListener('click', () => {
  AddCounterElement(counterId)
  counterId = counterId + 1;
  addCounter(counterId);
})


const AddCounterElement = (id) => {
  //States.forEach(e => {
  countersEl.appendChild(createCounterComponent(id))
  //})
}

//initializing the first counter element
AddCounterElement(counterId)

//Dom element
const increEl = document.getElementById('incre');
const decreEl = document.getElementById('decre');
let counterEl = document.querySelector('.counter')





increEl.addEventListener('click', (e) => {
  store.dispatch(increment(5))
})
decreEl.addEventListener('click', (e) => {
  store.dispatch(decrement(5))
})

counterEl.addEventListener('click', e => {

  console.log(counterEl.id)
  counterEl = document.querySelector('.counter')
})
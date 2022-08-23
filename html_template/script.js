const intialState = [{
  id: 0,
  value: 0,
  incrementBy: 1,
  decrementBy: 1
}]

//action idetifiers
const Add_COUNTER = "addCounter";
const RESET_COUNTERS = "resetCounters";
const INCREMENT = "increment";
const DECREMENT = "decrement";

//action creators
const addCounter = () => {
  return {
    type: Add_COUNTER
  }
};

const resetCounter = () => {
  return {
    type: RESET_COUNTERS
  }
};
const incrementHandler = (counterId, value) => {
  console.log(counterId, value)
  return {
    type: INCREMENT,
    payload: { counterId, value }
  }
};
const decrementHandler = (counterId, value) => {
  return {
    type: DECREMENT,
    payload: { counterId, value }
  }
};

const nextCounterId = (counters) => {
  const maxId = counters.reduce(
    (maxId, counter) => Math.max(counter.id, maxId), -1);

  return counters.length;
}

//reducers
const counterReducer = (state = intialState, action,) => {
  const randomNumber = Math.floor(Math.random() * 10) + 1;


  if (action.type === Add_COUNTER) {
    return [
      ...state,
      {
        id: nextCounterId(state),
        value: 0,
        incrementBy: randomNumber,
        decrementBy: randomNumber

      }
    ]
  }

  if (action.type === RESET_COUNTERS) {
    return state.map(item => ({ ...item, value: 0 }))
  }

  if (action.type === INCREMENT) {

    console.log(action.payload.counterId)

    return state.map(item => (
      item.id === action.payload.counterId ?
        {

          ...item, value: item.value + action.payload.value
        } :
        {
          ...item
        }
    ))


  }



  if (action.type === DECREMENT) {

    return state.map(item => (
      item.id === action.payload.counterId ?
        {

          ...item, value: item.value - action.payload.value
        } :
        {
          ...item
        }
    ))
  }

  return state;

}


//select dom element
const countersContainer = document.getElementById("countersContainer");
const addCounterButton = document.getElementById("addCounter");
const resetCounterButton = document.getElementById("resetCounter");


//create store
const store = Redux.createStore(counterReducer);

const render = () => {
  const state = store.getState();
  let counterMarkup = "";

  state.forEach((counter) => {
    console.log(counter)
    counterMarkup += ` <div
    class="p-4 h-auto flex flex-col items-center justify-center space-y-5 bg-white rounded shadow">
    <div class="text-2xl font-semibold">${counter.value}</div>
    <div class="flex space-x-3">
    <button class="bg-red-400 text-white px-3 py-2 rounded shadow"
     onClick="store.dispatch(decrementHandler(${counter.id},${counter.incrementBy}))">
    Decrement
    </button>
    <button class="bg-indigo-400 text-white px-3 py-2 rounded shadow"
    onClick="store.dispatch(incrementHandler(${counter.id},${counter.incrementBy}))">
    Increment
  </button>
</div>
</div>`
  })

  countersContainer.innerHTML = counterMarkup

}
//update UI initially
render();
//everytime there is change in the state we need to update the ui too
store.subscribe(render);



addCounterButton.addEventListener('click', () => {
  store.dispatch(addCounter())
})
resetCounterButton.addEventListener('click', () => {
  store.dispatch(resetCounter())
})


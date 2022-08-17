//Dom elemente
const increEl = document.getElementById('incre')
const decreEl = document.getElementById('decre')
const counterEl = document.getElementById('counter')


//action identifiers
const INCREMENT = 'increment';
const DECREMENT = 'decrement'
const initialState = {
  count: 0
};

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
//create store
const store = Redux.createStore(counterReducer);

//this render funciton will take the current state and update it in the UI
const render = () => {
  const state = store.getState()
  counterEl.innerText = state.count
}

//update UI initially
render()




//when state of store will get updated it will
store.subscribe(render)
//button click listenners

increEl.addEventListener('click', (e) => {
  store.dispatch(increment(5))
})
decreEl.addEventListener('click', (e) => {
  store.dispatch(decrement(5))
})

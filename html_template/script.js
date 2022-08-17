//Dom elemente
const increEl = document.getElementById('incre')
const decreEl = document.getElementById('decre')
const counterEl = document.getElementById('counter')

const initialState = {
  count: 0
};
//create reducer function
function counterReducer(state = initialState, action) {
  if (action.type === 'increment') {
    return { ...state, count: state.count + 1 };
  }
  else if (action.type === 'decrement') {
    return { ...state, count: state.count - 1 };
  }
  else {
    return state;
  }
}
//update UI initially
render()
//create store
const store = Redux.createStore(counterReducer);

//this render funciton will take the current state and update it in the UI
const render = () => {
  const state = store.getState()
  counterEl.innerText = state.count
}

//when state of store will get updated it will
store.subscribe(render)
//button click listenners

increEl.addEventListener('click', () => {
  store.dispatch({
    type: 'increment'
  })
})
decreEl.addEventListener('click', () => {
  store.dispatch({
    type: 'decrement'
  })
})

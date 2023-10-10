// ❗ You don't need to add extra action creators to achieve MVP
import { INPUT_CHANGE, MOVE_CLOCKWISE, MOVE_COUNTERCLOCKWISE, RESET_FORM, SET_INFO_MESSAGE, SET_QUIZ_INTO_STATE, SET_SELECTED_ANSWER } from './action-types'
import axios from 'axios'
export function moveClockwise() {
  return ({ type: MOVE_CLOCKWISE })
}

export function moveCounterClockwise() {
  return ({ type: MOVE_COUNTERCLOCKWISE })
}

export function selectAnswer(index) {
  return ({ type: SET_SELECTED_ANSWER, payload: index })
}

export function setMessage(message) {
  return ({ type: SET_INFO_MESSAGE, payload: message })
}

export function setQuiz(quizData) {
  return ({ type: SET_QUIZ_INTO_STATE, payload: quizData })
}

export function inputChange(evt) {
  return ({ type: INPUT_CHANGE, payload: evt.target })
}

export function resetForm() {
  return ({ type: RESET_FORM })
}

// ❗ Async action creators

export function fetchQuiz() {
  return function (dispatch) {
    dispatch({ type: SET_QUIZ_INTO_STATE })
    axios.get('http://localhost:9000/api/quiz/next')
      .then(res => {
        dispatch(setQuiz(res.data))
      }).catch(err => {
        console.error(err)
        dispatch({ type: SET_INFO_MESSAGE, payload: "Error fetching quiz data" })
      })
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
  }
}
export function postAnswer(answer) {
  return function (dispatch) {
    axios.post('http://localhost:9000/api/quiz/answer', answer)
      .then(({ data }) => {
        console.log(data)
        dispatch({ type: SET_INFO_MESSAGE, payload: data.message })
      })
      .then(() => dispatch({ type: SET_QUIZ_INTO_STATE }))
      .catch(err => {
        console.error(err)
        dispatch({ type: SET_INFO_MESSAGE, payload: "Error posting answer" })
      })
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
  }
}
export function postQuiz(quiz) {
  return function (dispatch) {
    axios.post('http://localhost:9000/api/quiz/new', quiz)
      .then(({ data }) => {
        console.log(data)
        dispatch({ type: SET_INFO_MESSAGE, payload: `Congrats: "${quiz.question_text}" is a great question!` })
      }).catch((err) => {
        console.error("Error posting new quiz", err);
        dispatch({ type: SET_INFO_MESSAGE, payload: "Error posting quiz" })
      })
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
  }
}

// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state

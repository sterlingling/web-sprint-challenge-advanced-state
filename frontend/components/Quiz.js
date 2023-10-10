import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchQuiz, postAnswer, selectAnswer } from '../state/action-creators'
function Quiz({ quiz, fetchQuiz, postAnswer, selectAnswer, selectedAnswer }) {
  if (!quiz) {
    useEffect(() => {
      fetchQuiz();
    }, [])
  }


  const handleSelectAnswer = (answerIndex) => {
    selectAnswer(quiz.answers[answerIndex]);
  };

  const isAnswerSelected = selectedAnswer !== null;
  const onSubmit = () => {
    const answer = {
      quiz_id: quiz.quiz_id,
      answer_id: selectedAnswer.answer_id
    }
    postAnswer(answer);

  }

  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        quiz ? (
          <>
            <h2>{quiz.question}</h2>

            <div id="quizAnswers">
              {quiz.answers.map((answer, index) => (
                <div className={`answer ${selectedAnswer === answer ? 'selected' : ''}`} key={index}>
                  {answer.text}
                  <button onClick={() => handleSelectAnswer(index)}>
                    {selectedAnswer === answer ? 'SELECTED' : 'Select'}
                  </button>
                </div>
              ))}
            </div>

            <button id="submitAnswerBtn" onClick={() => onSubmit()} disabled={!isAnswerSelected}>Submit answer</button>
          </>
        ) : 'Loading next quiz...'
      }
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    quiz: state.quiz,
    selectedAnswer: state.selectedAnswer
  }
}

export default connect(mapStateToProps, { fetchQuiz, postAnswer, selectAnswer })(Quiz);

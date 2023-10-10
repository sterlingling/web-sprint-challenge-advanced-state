import React from 'react'
import { connect } from 'react-redux'
import { moveClockwise, moveCounterClockwise } from '../state/action-creators'
function Wheel(props) {
  console.log(() => moveClockwise())
  console.log(() => props.moveClockwise())
  return (
    <div id="wrapper">
      <div id="wheel">
        {[1, 2, 3, 4, 5, 6].map((number, index) => {
          return (
            <div key={number}
              className={index == props.wheel ? 'cog active' : 'cog'}
              style={{ "--i": index }}
            >
              {index == props.wheel ? 'B' : ''}</div>
          )
        })
        }

      </div>
      <div id="keypad">
        <button id="counterClockwiseBtn" onClick={() => props.moveCounterClockwise()}>Counter clockwise</button>
        <button id="clockwiseBtn" onClick={() => props.moveClockwise()}>Clockwise</button>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    wheel: state.wheel
  }
}

export default connect(mapStateToProps, { moveClockwise, moveCounterClockwise })(Wheel);

import React, { useState, useEffect } from 'react'
import './keyboard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
const Keyboard = props => {
  const [value, setValue] = useState('')

  useEffect(() => {
    props.onFilter(value)
  }, [value])

  const addInput = input => {
    setValue(value + input)
  }

  const nums = '1234567890-'
  const top = 'QWERTYUIOP'
  const mid = 'ASDFGHJKL'
  const bottom = 'ZXCVBNM/'

  return (
    <React.Fragment>
      <div className="keyboard">
        <div>
          <div className="k-controls">
            <div className="hide-button" onClick={x => props.hideKeyboard()}>
              <FontAwesomeIcon icon={faAngleDown}></FontAwesomeIcon>
            </div>
            <input
              id="text"
              type="text"
              readOnly="readonly"
              className="k-display"
              defaultValue={value}
            />
            <input
              id="bkspc"
              type="reset"
              value="←"
              className="kc-btn"
              onClick={e => {
                if (value.length > 0) {
                  setValue(value.substr(0, value.length - 1))
                }
              }}
            />
            <input
              id="Enter"
              type="reset"
              value="Enter"
              className="kc-btn"
              onClick={x => {
                console.log(value)
                props.setCustomDest(value)
                props.hideKeyboard()
              }}
            />
          </div>
        </div>
        <div className="k-row k-num">
          {[...nums].map(v => {
            return (
              <input
                type="button"
                value={v}
                className="k-btn"
                key={v}
                onClick={e => addInput(e.target.value)}
              />
            )
          })}
        </div>
        <div className="k-row k-top">
          {[...top].map(v => {
            return (
              <input
                type="button"
                value={v}
                key={v}
                className="k-btn"
                onClick={e => addInput(e.target.value)}
              />
            )
          })}
        </div>
        <div className="k-row k-mid">
          {[...mid].map(v => {
            return (
              <input
                type="button"
                value={v}
                key={v}
                className="k-btn"
                onClick={e => addInput(e.target.value)}
              />
            )
          })}
        </div>
        <div className="k-row k-bottom">
          {[...bottom].map(v => {
            return (
              <input
                type="button"
                value={v}
                key={v}
                className="k-btn"
                onClick={e => addInput(e.target.value)}
              />
            )
          })}
        </div>
        <input
          id="space"
          type="button"
          value=" "
          className="k-space"
          onClick={e => addInput(' ')}
        />
      </div>
    </React.Fragment>
  )
}

export default Keyboard

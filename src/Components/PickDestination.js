import React, { useState } from 'react'
import './pick-destination.css'
import Keyboard from './Keyboard'

const PickDestination = data => {
  const destinations = data.destinations.map((e, index) => {
    e.id = index
    return e
  })

  const [filter, setFilter] = useState(destinations)
  const [currentDest, setCurrentDest] = useState('')
  const [showKeyboard, setShowKeyboard] = useState(false)

  const onFilter = e => {
    if (e.length > 0) {
      setFilter(
        destinations.filter(value => {
          if (value.name.includes(e)) {
            return value
          }
        })
      )
    } else {
      setFilter(destinations)
    }
  }

  const hideKeyboard = () => {
    setShowKeyboard(false)
  }

  const onSelect = id => {
    const temp = filter.map(e => {
      if (e.id === id) {
        e.active = true
        setCurrentDest(e.name)
      } else e.active = false
      return e
    })
    setFilter(temp)
  }

  const onSelectCustom = value => {
    console.log(value)
    setCurrentDest(value)
    setFilter(
      destinations.map(e => {
        e.active = false
        return e
      })
    )
  }

  function handleButtons() {
    if (data.audio === '') {
      return currentDest === '' ? (
        <div className="pd-btn">GO</div>
      ) : (
        <div className="pd-btn" onClick={x => data.onPick(currentDest)}>
          {'GO TO ' + currentDest}
        </div>
      )
    } else {
      if (data.valid) {
        return (
          <div className="pd-btn" onClick={x => data.onPick(data.audio)}>
            {'GO TO ' + data.audio}
          </div>
        )
      } else {
        return (
          <div className="pd-btn" style={{ border: 'none' }}>
            Unknown Location, Try Again.
          </div>
        )
      }
    }
  }

  return (
    <div className="pd-container">
      <div className="pd-header" onClick={x => hideKeyboard()}>
        Choose your Destination
      </div>
      <div className="pd-grid" onClick={x => hideKeyboard()}>
        {data.audio === '' ? (
          <div className="pd-item-container">
            {filter.map((e, i) => {
              return (
                <div
                  className="pd-item"
                  key={i}
                  style={
                    e.active
                      ? { backgroundColor: '#060d18' }
                      : { backgroundColor: '#d72551' }
                  }
                  onClick={x => onSelect(e.id)}
                >
                  <div className="pd-text">{e.name}</div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="pd-audio">
            <div className="pd-audio-title">You said:</div>
            <div className="pd-audio-dest">{data.audio}</div>
          </div>
        )}
      </div>
      {showKeyboard ? (
        <Keyboard
          onFilter={e => onFilter(e)}
          hideKeyboard={e => hideKeyboard()}
          setCustomDest={e => onSelectCustom(e)}
        />
      ) : (
        <div className="pd-type-location">
          {handleButtons()}
          {data.audio === '' ? (
            <div className="pd-btn" onClick={e => setShowKeyboard(true)}>
              Enter Custom Destination
            </div>
          ) : (
            <div className="pd-btn" onClick={e => data.clearAudio()}>
              Cancel
            </div>
          )}

          <div className="pd-help">?</div>
        </div>
      )}
    </div>
  )
}

export default PickDestination

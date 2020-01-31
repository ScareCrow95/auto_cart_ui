import React, { useState, useEffect } from 'react'
import './app.css'
import PickDestination from './Components/PickDestination'
import Main from './Components/Main'
import io from 'socket.io-client'
const socket = io('http://35.238.125.238:8020/cartUI')
// const socket = io('http://localhost:8020/cartUI')

// const socket = io('http://172.30.167.135:8020/cartUI')
const cartid = '1bcadd2fea88'

const App = () => {
  const [initMsg, setInitMsg] = useState({
    userId: '',
    user_status: '',
    currentDestination: ''
  })

  const [destinations, setDestinations] = useState([])
  const [showDestination, setShowDestination] = useState(false)
  const [audio, setAudio] = useState({ msg: '', valid: false })
  const [showMain, setShowMain] = useState(-1)
  const [adminMessage, setAdminMessage] = useState('')
  const [location, setLocation] = useState('')
  const [cartGPS, setCartGPS] = useState({
    latitude: 38.43175,
    longitude: -78.876357
  })
  let initReady

  useEffect(() => {
    initReady = false
    socket.on('connected', () => {
      console.log('connected')
      socket.emit('cart_id', cartid)
    })

    socket.on('cart_init', data => {
      const jsonData = JSON.parse(data)
      setInitMsg(jsonData)
      jsonData.destinations.forEach(element => {
        element.active = false
      })
      setDestinations(jsonData.destinations)
      setShowMain(-1)
      setShowDestination(false)
    })

    socket.on('summoned', id => {
      console.log('summoned')
      setInitMsg({ userId: id, user_status: 'summoned' })
    })

    socket.on('summon_finish', id => {
      console.log('summon_finish')
      setInitMsg({ userId: id, user_status: 'summon_finish' })
    })

    socket.on('passenger_ready', () => {
      setShowMain(1)
      console.log('Setting ready true')
      initReady = true
    })

    socket.on('passenger_unsafe', () => {
      console.log(initReady + ' init ready')
      if (initReady) setShowMain(4)
    })

    socket.on('admin_message', data => {
      console.log(data)
      setAdminMessage(data)
    })

    socket.on('transit_end', () => {
      console.log('transit end')

      setShowMain(5)
    })

    socket.on('cart_gps', data => {
      const jsonData = JSON.stringify(data)
      console.log(jsonData)
      setCartGPS(jsonData)
    })

    socket.on('audio', data => {
      console.log('msg ' + data)
      const jsonData = JSON.parse(data)
      setAudio(jsonData)
    })

    return () => {
      socket.emit('quit', cartid)
    }
  }, [])

  const sendUserArrived = () => {
    socket.emit('transit_await', cartid)
    initMsg.user_status = 'transit_await'
    setInitMsg(initMsg)
    setShowDestination(true)
  }

  const onPickDestination = name => {
    const payload = {
      name: name,
      userId: initMsg.userId,
      cartId: cartid
    }
    socket.emit('set_destination', JSON.stringify(payload))
    setShowDestination(false)
    setShowMain(0)
    setLocation(name)
  }

  const updateMainState = state => {
    setShowMain(state)
  }

  const pullOver = () => {
    socket.emit('pull_over', cartid)
  }

  const resumeDriving = () => {
    socket.emit('resume_driving', cartid)
  }

  function HandleOverlay() {
    if (!initMsg) {
      return <div className="screen-msg-container">Connecting...</div>
    } else if (!initMsg.userId) {
      return <div className="screen-msg-container">Waiting to be summoned</div>
    } else if (initMsg.userId) {
      if (initMsg.user_status === 'summoned')
        return <div className="screen-msg-container">Driving to passenger</div>
      else if (initMsg.user_status === 'summon_finish')
        return (
          <div
            className="screen-msg-container"
            onClick={x => sendUserArrived()}
          >
            Please tap here to continue.
          </div>
        )
    } else return null
  }

  return (
    <div className="bg">
      {HandleOverlay()}
      {showDestination ? (
        <PickDestination
          destinations={destinations}
          onPick={x => onPickDestination(x)}
          audio={audio.msg}
          valid={audio.valid}
          clearAudio={x => setAudio({ msg: '', valid: false })}
        />
      ) : null}

      {showMain !== -1 ? (
        <Main
          currentState={showMain}
          setMainState={x => updateMainState(x)}
          pullOver={x => pullOver()}
          resumeDriving={x => resumeDriving()}
          location={location}
          cartGPS={cartGPS}
        />
      ) : null}

      {adminMessage ? (
        <div
          className="admin-message-bg"
          onClick={e => {
            setAdminMessage('')
          }}
        >
          Attention!
          <div className="admin-message"> {adminMessage}</div>
        </div>
      ) : null}
    </div>
  )
}

export default App

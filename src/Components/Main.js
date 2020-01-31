import React, { useState } from 'react'
import GoogleMapReact from 'google-map-react'
import './main.css'
import Marker from './Marker'
const Main = props => {
  const uiState = props.currentState
  const setUIState = x => props.setMainState(x)

  function DrivingBtn() {
    if (uiState === 0) {
      return <div className="pd-btn">Waiting...</div>
    } else if (uiState === 1) {
      return <div className="pd-btn">Driving to {props.location}</div>
    } else if (uiState === 2 || uiState === 4) {
      return <div className="pd-help">GET HELP</div>
    } else {
      return (
        <div className="pd-help" style={{ flexGrow: '1' }}>
          Use the App to summon again.
        </div>
      )
    }
  }

  function PullOverBtn() {
    if (uiState === 0) {
      return null
    } else if (uiState === 1) {
      return (
        <div
          className="pd-btn"
          onClick={x => {
            setUIState(2)
            props.pullOver()
          }}
        >
          Pull Over
        </div>
      )
    } else if (uiState === 2 || uiState === 4) {
      return (
        <div
          className="pd-btn"
          onClick={x => {
            setUIState(1)
            props.resumeDriving()
          }}
        >
          Continue Driving
        </div>
      )
    } else {
      return null
    }
  }

  function SetOverlayMsg() {
    if (uiState === 0) {
      return (
        <div className="pose-wait">
          <div className="screen-msg-container">Please be seated.</div>
        </div>
      )
    } else if (uiState === 2) {
      return (
        <div className="pose-wait">
          <div className="screen-msg-container">Is Everything Ok?</div>
        </div>
      )
    } else if (uiState === 3) {
      return (
        <div className="pose-wait">
          <div className="screen-msg-container">
            You have arrived at your destination. Please exit the vehicle.
          </div>
        </div>
      )
    } else if (uiState === 4) {
      return (
        <div className="pose-wait">
          <div className="screen-msg-container">
            It looks like you are unsafe, is everything alright?
          </div>
        </div>
      )
    } else if (uiState === 5) {
      return (
        <div className="pose-wait">
          <div className="screen-msg-container">
            You have arrived at your destination, please exit the cart.
          </div>
        </div>
      )
    }
  }

  return (
    <div className="main">
      <div className="main-top">
        <div className="map">
          <GoogleMapReact
            bootstrapURLKeys={{
              key: 'AIzaSyB57gkemGo4XwiDMzwXT2dImCdjh_-s7WQ'
            }}
            defaultCenter={{
              lat: props.cartGPS.latitude,
              lng: props.cartGPS.longitude
            }}
            defaultZoom={19}
          >
            <Marker
              lat={props.cartGPS.latitude}
              lng={props.cartGPS.longitude}
              name={'Cart'}
              color={'blue'}
            />
          </GoogleMapReact>
        </div>
      </div>
      <div className="main-bottom">
        {DrivingBtn()}
        {PullOverBtn()}
        <div className="pd-help">?</div>
      </div>
      {SetOverlayMsg()}
    </div>
  )
}

export default Main

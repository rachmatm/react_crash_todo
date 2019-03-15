import React from 'react'

function Alert(props) {

  if(props.alert){
    return (
      <div style={alertStyle}>
        {props.alert}
      </div>
    )
  }
  else{
    return null
  }
}

const alertStyle = {
  background: 'yellow',
  padding: '5px 10px'
}

export default Alert;

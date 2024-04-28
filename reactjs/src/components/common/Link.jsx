import React from 'react'
import {Link as LinkTab} from "react-router-dom"
import PropTypes from "prop-types"

export default function Link(props) {
  const className = props?.className || props?.class
  const Id = props?.id || props?.id
  const onClick = (e) =>{
    if(props?.onClick){
      e.preventDefault();
      props?.onClick(e)
    }
  }
  
  return (
    <LinkTab to={props?.to} onClick={onClick} className={`${className}`} id={Id} >
      {props?.children}
    </LinkTab>
  )
}
Link.propTypes = {
  to: PropTypes.any,
  onClick: PropTypes.func
}
Link.defaultProps = {
  to:null,
}
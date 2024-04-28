/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import LazyImage from './LazyImage';

export default function I(props) {
  
  const IconData = () =>{
    if(props?.image){
      return(
        <i onClick={props?.onClick} className={`common_icon_image ${props?.className}` }>
          <LazyImage src={props?.attrIcon} fill auth={props?.auth} />
        </i>
      )
    }
    return(
      <i onClick={props?.onClick} style={{...props?.style, '--icon-url':`url(${props?.attrIcon})`}}  className={`common_icon ${props?.className}`} attr-icon={props?.attrIcon} />
    )
  }
  const ButtonView = ( ) =>{
    return(
      <Button disable={props?.disable} onClick={props?.onClick} className={`btn-icon ${props?.buttonClassName}`} variant={props?.variant} size={props?.size}>
          {IconData()}
      </Button>
    )
  }
  if(props?.button){
    return(
        ButtonView()
    )
  }
  return (
    IconData()
  )
}

I.propTypes = {
    className: PropTypes.string,
    buttonClassName: PropTypes.string,
    size: PropTypes.string,
    variant: PropTypes.string,
    auth: PropTypes.bool,
    rounded: PropTypes.bool,
    disable: PropTypes.bool,
    onClick: PropTypes.func,
    loading: PropTypes.any,
    attrIcon: PropTypes.any,
}

I.defaultProps = {
    className: "",
    buttonClassName: "",
    size: "",
    variant: "",
    auth: false,
    rounded: false,
    disable: false,
    loading: false,
    attrIcon: ""
}

/* eslint-disable eqeqeq */
import React, { useEffect, useState } from 'react'
import PropTypes from "prop-types"
import {Button as CommonButton} from 'rsuite';
import { useNavigate } from 'react-router';
export default function Button(props) {
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const onClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (props?.to) {
      navigate(props?.to); // Replace router.push with window.location.href
    } else {
      setLoader(true);
      await props?.onClick(e);
      setLoader(false);
    }
  }
  useEffect(()=>{
    if(props?.disable != undefined){
      setLoader(props?.disable)
    }
  },[props?.disable])
  return (
    <CommonButton appearance={props?.variant} disabled={loader} size={props?.size} className={` ${props?.className}`} onClick={onClick} type={props?.type} >
      {props?.children}
    </CommonButton>
  )
}
Button.propTypes = {
    size: PropTypes.any,
    type: PropTypes.any,
    className: PropTypes.any,
    variant: PropTypes.any,
    onClick: PropTypes.func,
    disable: PropTypes.bool,
}
Button.defaultProps = {
    size: "lg",
    type: "button",
    className: "",
    variant: "",
    onClick: ()=>{},
    disable: false
}
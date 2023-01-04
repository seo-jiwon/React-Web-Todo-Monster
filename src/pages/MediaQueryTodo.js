import React from 'react'
import { useMediaQuery } from 'react-responsive'
import Todo from "./Todo";
 
const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 992 })
  return isDesktop ? children : null
}
const Tablet = ({ children }) => {
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 })
  return isTablet ? children : null
}
const Mobile = ({ children }) => {
  // const isNotMobile = useMediaQuery({ minWidth: 767 })
  const isMobile = useMediaQuery({ maxWidth: 500 })
  return isMobile ? children : null
}
const Default = ({ children }) => {
  // const isNotMobile = useMediaQuery({ minWidth: 768 })
  const isNotMobile = useMediaQuery({ minWidth: 501 })
  return isNotMobile ? children : null
}
 
export const MediaQueryTodo = ({children}) => (
  <div>
    <Default><b>가장 작은 사이즈로 줄여주세요!</b>( 흰 화면이 뜬다면 새로고침을 해주세요. ) <br/><br/>X Todo페이지만 해당됩니다. 다른 페이지는 Update 중 . . . X <br/><br/></Default>
    <Desktop><b>Desktop 사이즈는 지원하지 않습니다.</b></Desktop>
    <Tablet><b>Tablet 사이즈는 지원하지 않습니다.</b></Tablet>
    <Mobile>
        {/* {children} */}
        <Todo />
    </Mobile>
  </div>
)

export default MediaQueryTodo;
 
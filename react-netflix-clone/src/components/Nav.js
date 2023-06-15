import React, { useEffect, useState } from 'react'
import "./Nav.css"

export default function Nav() {
  
  const [show, setShow] = useState(false);

  /* 
    useEffect? 
    React의 함수형 컨포넌트에서 라이프사이클을 감지하기 위한 hook
    addEventListner을 통해 "scroll" 이라는 이벤트가 발생하면 어떤 함수를 호출할 것인지 리스너를 등록 
    이벤트를 사용하지 않을 땐 removeEventListner를 통해 리스너를 제거해준다.
  */
  useEffect(() => {
    window.addEventListener("scroll", () =>{
      console.log('scrollY', window.scrollY);
      if(window.scrollY > 50 ){
        setShow(true);
      }else{
        setShow(false);
      }
    });

    return(() =>{
      window.removeEventListener("scroll",() => {});
    })
  }, []);


  return (
    // {`nav ${show && "nav_black"}`} : show가 true이면 className을 "nav_black"으로 가지는 것
    // {`nav ${show || "nav_black"}`} : show가 false이면 className을 "nav_black"으로 가지는 것
    <nav className={`nav ${show && "nav_black"}`}>
      <img
        alt='Netflix logo'
        src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/170px-Netflix_2015_logo.svg.png'
        className='nav_logo'
        onClick={() => window.location.reload()}
      />
      <img
        alt='User logged'
        src='https://pbs.twimg.com/profile_images/1329780702783520768/fUEq-XSi_400x400.jpg'
        className='nav_avatar'
      />
    </nav>
)}

import React from 'react'
import SignupSigninComponent from '../components/SignupSignin'
import Header from '../components/Header'
function Signup() {
  return (
    <div>
      <Header></Header>
      <div className='wrapper'>
        <SignupSigninComponent></SignupSigninComponent>
      </div>
  </div>
  )
}

export default Signup
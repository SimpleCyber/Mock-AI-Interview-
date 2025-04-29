import React, { ReactNode } from 'react'

const AuthLayout = ({ children } : {children : ReactNode}) => {
  return (
    <div>
      <div>{children}</div>
    </div>
  )
}

export default AuthLayout

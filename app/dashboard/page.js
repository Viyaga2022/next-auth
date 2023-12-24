import React from 'react'
import { signOut } from '@/auth'

const page = () => {
  return (
    <>
      <h2>dashboard</h2>
      <form action={async () => {
        "use server"
        await signOut()
      }}>
        <button style={{fontSize:"20px", padding: "10px"}}>signout</button>
      </form>
    </>
  )
}

export default page
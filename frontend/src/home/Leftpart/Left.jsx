import React from 'react'
import Search from './search'
import Users from './users'
import Logout from './logout'

function Left() {
  return (
    <div className='w-full bg-black text-gray-300'>
      <Search/>
      <div className='no-scrollbar overflow-y-auto' style ={{minHeight:"calc(84vh - 10vh)"}}>
        <Users/>
      </div>
      <Logout/>
    </div>
  )
}

export default Left
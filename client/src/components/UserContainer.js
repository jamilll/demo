import React from 'react'
import Userbox from './Userbox'

function UserContainer({users, AddUser}) {

    const addUser = () =>{
        AddUser()
    }


    return(
    
    <div className='main-container'>
    <div className='user-input'>
        <label> username</label>
        <input id='username-field' type="text" />
        <label> password</label>
        <input id='password-field' type="password" />
        <button onClick={addUser}>add</button>
    </div>  
    <div className='children-container'>
    {users.map(u =>{
        return <Userbox username={u.username} password={u.password} key={Math.floor(Math.random()*10000000)}/>
    })}
    </div>
    </div>
    )
}

export default UserContainer
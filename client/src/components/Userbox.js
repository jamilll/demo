import React from 'react'

function Userbox(props) {

    return (
        <div className='userbox'>
            <h3>username</h3>
            <p>{props.username}</p>
            <h3>password</h3>
            <p>{props.password}</p>
        </div>

    )
}

export default Userbox
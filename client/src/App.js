import { useRef, useState } from 'react';
import './App.css';
import UserContainer from './components/UserContainer';

function App() {
  const [users, setUsers] = useState([])
  const isInit = useRef(false)



  const sendGetRequest = (p) =>{
    fetch("http://127.0.0.1:5000/" + p)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      isInit.current = true
      setUsers(data)
    })

    
  }

  if(!isInit.current){
    sendGetRequest("api/users")

  }


  const addUser = () =>{
    const username = document.getElementById("username-field").value
    const password = document.getElementById("password-field").value
    let data = {
        username: username,
        password: password
    }
    // clear the input fields
    document.getElementById("username-field").value = ""
    document.getElementById("password-field").value = ""

    //send request to server
    addServerUser(data)
  }

  const addServerUser = (body) =>{
    const req = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    }

    fetch("http://127.0.0.1:5000/api/users", req)
    .then(res => res.json())
    .then(data => {
      if(data.message === "success"){
        setUsers([...users, body])
      }
    })

  }


  return (
    <div className="App">
      <UserContainer users={users} AddUser={addUser} />
    
    </div>
  );
}

export default App;

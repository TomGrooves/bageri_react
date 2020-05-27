import React, {useState} from 'react';
import style from '../../styles/login.module.scss'

function Login (props) {

    const [username, updateUsername] = useState("");
    const [password, updatePassword] = useState("");
    const [errorCode, seterrorCode] = useState("");


const sendRequest = (e) => {
    let url = `https://api.mediehuset.net/token`
    e.preventDefault()
    console.log("user trying to log in")
    console.log("Username: " + username)
    console.log("Password: " + password)
  
    if (username && password){
  
    let formData = new FormData()
  
    formData.append('username', username)
    formData.append('password', password)
  
    fetch(url, {
      method: "POST",
      body : formData,
      
    })
      .then(response => response.json())
      .then(json => handleSessionData(json))
      .catch(error => console.log(error))
      }
      if (username === "" && password === ""){
        seterrorCode("Udfyld brugernavn og password")
      }
      else if (username === ""){
        seterrorCode("Udfyld brugernavn")
      }
      else if (password === ""){
        seterrorCode("Udfyld password")
      }
    }

    const logOut = () => {
      sessionStorage.removeItem('sessKey')
    }

    const handleSessionData = (key) => {
      
      if (!key.message){
          props.setSessionToken(key)
          console.log(key)
          sessionStorage.setItem('sessKey', JSON.stringify(key))
      }
      if (key.message === "No authorization"){
          seterrorCode("Forkert brugernavn eller password - prøv igen")
      }
    }
    


    return (
        <section className={style.mainContainer}>
        <h2>Log ind </h2>
        {props.sessionToken ? <p className={style.success}>Velkommen {username} - du er nu logget ind!</p> : <p className={style.error}>{errorCode}</p>}
          <form className={style.form}>
            <input type='username' name='userName' onChange={(event)=>updateUsername(event.target.value)} placeholder="username" value={username}></input>
            <input type='password' name='password' onChange={(event)=>updatePassword(event.target.value)} placeholder="password" value={password}></input>
            <button name="action" onClick={(event) => sendRequest(event)} type="submit"> Log ind</button>
            <button name="action" onClick={() => logOut()} type="submit"> Log ud</button>

          </form>
        </section>

    )
}

export default Login
import React, {useState} from 'react';
import contact from '../../styles/contact.module.scss';
import samplemap from '../../Billeder/mapsample.png';
import Modal from '../../components/modal/modal';

function ContactPage(props) {

    const [modalVisible, setModalVisible] = useState(false)
    const [errorMsg, setErrorMsg] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")

    const sendData = () =>{
        
        if(name && email && message && props.validateEmail(email)){
            setModalVisible(true)
        }
        else if (name === ""){
            setErrorMsg("Udfyld navn")
        }
        else if (email === ""){
            setErrorMsg("Udfyld email")
        }
        else if (!props.validateEmail(email)){
            setErrorMsg("Email addressen er ikke gyldig")
        }
        else if (message === ""){
            setErrorMsg("Udfyld besked")
        }
    }

    const modalChild = 
    <div>
        <h5>Tak fordi du kontaktede os</h5>
        <h6>Du har indsendt følgende:</h6>
        <p>Navn: {name}</p>
        <p>Email: {email}</p>
        <p>Besked: {message}</p>    
    </div>

    return (
    <>
    <Modal setModalVisible={setModalVisible} modalVisible={modalVisible} child={modalChild}></Modal>
        <section className={contact.mainContainer}>
            <div>
                <h2>Kontakt os</h2>
                <p>Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum</p>
            </div>
        <section className={contact.form}>
            <form>
                <input type="name" value={name} onChange={(e) => {setName(e.target.value)}} placeholder="Dit navn"></input>
                <input type="email" value={email} onChange={(e) => {setEmail(e.target.value)}} placeholder="Din email"></input>
                <input type="text" value={message} onChange={(e) => {setMessage(e.target.value)}} placeholder="Din besked"></input>
                <p className={contact.error}>{errorMsg}</p>
                <button onClick={(e) => {e.preventDefault(); sendData()}}>Send</button>
            </form>
        </section>
        <section className={contact.map}>
            <div><h5>adresse:</h5><p>Øster uttrupvej 1, 9200 Aalborg</p></div>
            <div><h5>telefon:</h5><p>+45 25 26 95 40</p></div>
            <img alt="vores-addresse" src={samplemap}></img>
        </section>
        </section>
    </>
    )
}

export default ContactPage
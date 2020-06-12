import React, {useState , useEffect } from "react";
import db from "./firebase";
import Form from "react-bootstrap/Form"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import image from '../src/google-signin.png'
import firebase from 'firebase'



const SignUpPage = () => {

  const [city, setCity] = useState('')
  const [profile, setProfile] = useState('')
  const [userId, setuserId] = useState('')
  const [imageUrl, setimageUrl] = useState('')
  const [name, setName] = useState('')

  const data = () => {
  const provider = new firebase.auth.GoogleAuthProvider();  
  return firebase.auth().signInWithPopup(provider)
  }

  const signInFunc = () => {
    data().then(result => {
      setuserId(result.user.uid)
      setimageUrl(result.user.photoURL)
      setName(result.user.displayName)
    })
}

const handleForm = e => {
  e.preventDefault()

    db.collection("profiles").doc(userId).set({
    imageUrl: imageUrl,
    name: name,
    userId: userId,
    city: city,
    profile: profile,

})

}

const fetchData = async () => {
  const res = await db.collection('profiles').get()
  const data = res.docs.map((data) => data.data());
  console.log(data)
}

useEffect(() => {
  fetchData()
}, []);  

  return (
    <div>
      <img onClick={signInFunc} src={image}/>
      <Form onSubmit={handleForm}>
    <Form.Group as={Row} controlId="formHorizontalEmail">
      <Form.Label column sm={2}>
      city
      </Form.Label>
      <Col sm={10}>
        <Form.Control value={city} onChange={e => setCity(e.target.value)}type="text" placeholder="city" />
      </Col>
    </Form.Group>
  
    <Form.Group as={Row} controlId="formHorizontalPassword">
      <Form.Label column sm={2}>
      profile
      </Form.Label>
      <Col sm={10}>
        <Form.Control value={profile} onChange={e => setProfile(e.target.value)} type="text" placeholder="profile" />
      </Col>
    </Form.Group>
 
    <Form.Group as={Row}>
      <Col sm={{ span: 10, offset: 2 }}>
        <Button type="submit">Sign in</Button>
      </Col>
    </Form.Group>
  </Form></div>
  )
};

export default SignUpPage;
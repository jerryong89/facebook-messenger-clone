import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDwUk0GCnwOZPEobKu95EuQHnpLScqeUmw",
    authDomain: "messenger-clone-40bbd.firebaseapp.com",
    projectId: "messenger-clone-40bbd",
    storageBucket: "messenger-clone-40bbd.appspot.com",
    messagingSenderId: "801942106611",
    appId: "1:801942106611:web:8f143e42ebda98e71be286"
})

const db = firebaseApp.firestore()

export default db

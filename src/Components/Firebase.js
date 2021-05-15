import firebase from 'firebase/app';
import firestore from 'firebase/firestore';

const settings = { timestampsInSnapshots: true };

const config = {
    apiKey: "AIzaSyCOzCvnDmsv3IbJzG00iCZAmIMt8SZ2E1c",
    authDomain: "corona-530ce.firebaseapp.com",
    projectId: "corona-530ce",
    storageBucket: "corona-530ce.appspot.com",
    messagingSenderId: "1087248309676",
    appId: "1:1087248309676:web:1fa6bea4375bfc0ea32e09"
};
firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase;
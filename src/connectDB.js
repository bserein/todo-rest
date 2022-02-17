const {initializeApp, cert, getApps} = require('firebase-admin/app')
const {getFirestore} = require('firebase-admin/firestore')
const serviceAccount = require('../credentials.json')

exports.connectDB = () => {
    if(!getApps().length){
        initializeApp({
            credential: cert(serviceAccount)
        });
    }
    return getFirestore();
}
//this only initializes connection to firebase if you are not already connected
//if you ever want to use firebase you can copy this code and use it somewhere else

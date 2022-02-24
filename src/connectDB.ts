import {initializeApp, cert, getApps} from 'firebase-admin/app'
import {getFirestore} from 'firebase-admin/firestore'
import serviceAccount from '../credentials.json' //need to tell it its okay to import a JSON file

export const connectDB = () => {
    if(!getApps().length){
        initializeApp({
            credential: cert(serviceAccount as any) //this basically tells typescript this works, we know what were doing
        });
    }
    return getFirestore();
}
//this only initializes connection to firebase if you are not already connected
//if you ever want to use firebase you can copy this code and use it somewhere else

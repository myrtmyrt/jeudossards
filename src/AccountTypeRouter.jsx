import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {onAuthStateChanged} from "firebase/auth";
import {auth, db} from "./firebase.js";
import {collection, query, where, getDocs} from "firebase/firestore";

function redirectUser(user, navigate) {
    // fetch the settings collection, find the doc in which email = user.email
    if (!user) {
        navigate('/login')
        return
    }

    const q = query(collection(db, 'settings'), where('email', '==', user.email))
    getDocs(q).then((snapshot) => {
        if (snapshot.empty) {
            auth.signOut().then(()=> {
                navigate('/login')
            })
        }

        const settings = snapshot.docs[0].data()
        if (settings.view === 'admin') {
            navigate('/admin')
        } else {
            navigate('/qr')
        }
    })
}

function AccountTypeRouter({children}) {
    const navigate = useNavigate();


    useEffect(()=> {
        redirectUser(auth.currentUser, navigate);
        onAuthStateChanged(auth, (user) => {
            redirectUser(user, navigate)
        });
    }, [])

    return children
}

export default AccountTypeRouter;
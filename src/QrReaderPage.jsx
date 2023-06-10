import {useState, useEffect} from 'react'
import {QrReader} from 'react-qr-reader';

import {toast, } from "react-toastify";
import {collection, addDoc, getDocs, query, where} from "firebase/firestore";
import {db, auth} from './firebase';

import 'react-toastify/dist/ReactToastify.css';

function QrReaderPage() {
    const [data, setData] = useState('');
    const [n, setN] = useState(1);
    const [buttonLoading, setButtonLoading] = useState(false);

    useEffect(() => {
        if (!auth.currentUser) return
        getDocs(query(collection(db, 'settings'), where("email", "==", auth.currentUser.email))).then((snapshot) => {
            if (snapshot.empty) {
                toast.error('could not find user')
                return
            }

            const settings = snapshot.docs[0].data()
            setN(settings.points)
        })
    })

    const addPoints = (n) => new Promise((resolve, reject) => {
        if (![1, 30].includes(n)) {
            reject('invalid number of points')
        }


        // create a doc with the user's id as the name
        addDoc(collection(db, "points"), {
            dossard: data,
            timestamp: Date.now(),
            points: n
        }).then(() => {
            resolve()
        }).catch((e) => {
            reject(e)
        })
    })

    useEffect(() => {
        if (!data) return
        if (isNaN(data) || data < 1 || data > 500) {
            toast.error('invalid QR code')
            return
        }
        toast.promise(addPoints(n), {
            pending: 'Adding Points to user ' + data,
            success: `${n} points added to user ${data}`,
            error: `could not add points to user ${data}`
        })
    }, [data])

    return (
        <div className="flex flex-col items-center justify-center w-screen">
            <QrReader
                onResult={(result, error) => {
                    if (!!result) {
                        setData(result?.text);
                    }

                    if (!!error) {
                        console.info(error);
                    }
                }}
                containerStyle={{width: "100vw", height: "100vh", position: "fixed", top: 0, left: 0}}
                videoStyle={{objectFit: "cover", width: "100%", height: "100%", objectPosition: "center"}}
                videoContainerStyle={{position: ""}}
                constraints={{facingMode: "environment"}}
            />
            <button onClick={() => {
                setButtonLoading(true)
                auth.signOut().then(() => {
                    setButtonLoading(false)
                }).catch(() => {
                    setButtonLoading(false)
                    toast.error('Erreur lors de la déconnexion')
                })
            }}
                    className="absolute top-5 right-5 rounded-lg bg-green-800 hover:bg-green-700 transition disabled:opacity-50 text-white px-10 py-1 flex gap-3"
                    disabled={buttonLoading}
            >Se déconnecter</button>
        </div>
    )
}

export default QrReaderPage

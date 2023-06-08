import {useState, useEffect} from 'react'
import {QrReader} from 'react-qr-reader';
import {toast} from "react-toastify";
import {ToastContainer} from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function App() {
    const [data, setData] = useState('');

    const addPoints = (n) => new Promise((resolve, reject) => {
        setTimeout(() => {
            Math.random() > 0.5 ? resolve() : reject()
        }, 3000)
    })

    useEffect(() => {
        if (!data) return
        toast.promise(addPoints(30), {
            pending: 'Adding Points to user ' + data,
            success: `${30} points added to user ${data}`,
            error: `could not add points to user ${data}`
        })
    }, [data])

    return (
        <div className="flex flex-col items-center justify-center w-screen">
            <ToastContainer/>
            <QrReader
                onResult={(result, error) => {
                    if (!!result) {
                        setData(result?.text);
                    }

                    if (!!error) {
                        console.info(error);
                    }
                }}
                containerStyle={{width: "50vw"}}
            />
        </div>
    )
}

export default App

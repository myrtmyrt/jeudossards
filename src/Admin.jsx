import {collection, getDocs} from "firebase/firestore";
import {useEffect, useState} from "react";
import {db, auth} from "./firebase.js";
import {TwoSeventyRingWithBg} from "react-svg-spinners";
import goldMedal from './assets/gold.svg'
import silverMedal from './assets/silver.svg'
import bronzeMedal from './assets/bronze.svg'
import {toast} from "react-toastify";

function Medal({rank}) {
    switch (rank) {
        case 1:
            return <img src={goldMedal} alt="gold medal" className="w-10 h-10"/>
        case 2:
            return <img src={silverMedal} alt="silver medal" className="w-10 h-10"/>
        case 3:
            return <img src={bronzeMedal} alt="bronze medal" className="w-10 h-10"/>
        default:
            return <div className="w-10 h-10"/>
    }
}

function Admin() {
    const [pointsByUser, setPointsByUser] = useState(null);
    const [buttonLoading, setButtonLoading] = useState(false);

    const q = collection(db, 'points')
    useEffect(() => {
        getDocs(q).then((snapshot) => {
            const docs = snapshot.docs.map((doc) => doc.data())
            const newPointsByUser = {}
            for (const doc of docs) {
                if (doc.dossard < 1 || doc.dossard > 500) continue
                if (!newPointsByUser[doc.dossard]) {
                    newPointsByUser[doc.dossard] = 0
                }
                newPointsByUser[doc.dossard] += doc.points
            }

            // now order the users by points in an array
            const users = Object.keys(newPointsByUser)
            users.sort((a, b) => newPointsByUser[b] - newPointsByUser[a])
            const newPointsByUserOrdered = []
            for (const user of users) {
                newPointsByUserOrdered.push([user, newPointsByUser[user]])
            }
            setPointsByUser(newPointsByUserOrdered)
        })
    }, [])
    return (
        <main className={"bg-gray-200 w-screen h-screen overflow-scroll"}>
            <div className="w-screen flex flex-col items-center gap-20">
                <h1 className="mt-20 text-2xl">Admin</h1>
                <table className="rounded-lg overflow-hidden text-black shadow">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="pl-6 p-3">Dossard</th>
                        <th className="pl-6 p-3">Points</th>
                        <th className="pl-6 p-3">Classement</th>
                    </tr>
                    </thead>
                    <tbody className="bg-white">
                    {
                        pointsByUser ? pointsByUser.map(([dossard, points], i) => (
                            <tr key={dossard}>
                                <td className="pl-6 p-3 font-bold">{dossard}</td>
                                <td className="pl-6 p-3 text-gray-600">{points}</td>
                                <td className="pl-6 p-3 text-gray-600"><Medal rank={i + 1}/></td>
                            </tr>
                        )) : <tr>
                            <td></td>
                            <td className="flex justify-center"><TwoSeventyRingWithBg/></td>
                            <td></td>
                        </tr>
                    }
                    </tbody>
                </table>

                <button onClick={() => {
                    setButtonLoading(true)
                    auth.signOut().then(() => {
                        setButtonLoading(false)
                    }).catch(() => {
                        setButtonLoading(false)
                        toast.error('Erreur lors de la déconnexion')
                    })
                }}
                        className="rounded-lg bg-green-800 hover:bg-green-700 transition disabled:opacity-50 text-white px-10 py-1 flex gap-3"
                        disabled={buttonLoading}
                >Se déconnecter</button>
            </div>
        </main>
    );
}

export default Admin;
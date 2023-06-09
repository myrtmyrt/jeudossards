import {BrowserRouter as Router} from 'react-router-dom';
import {Routes, Route} from 'react-router-dom';
import QrReaderPage from "./QrReaderPage.jsx";
import Login from "./Login.jsx";
import {ToastContainer} from "react-toastify";
import AccountTypeRouter from "./AccountTypeRouter.jsx";
import Admin from "./Admin.jsx";

// get the base name from vite confifg
function App(){
    return(
        <Router basename={import.meta.env.VITE_BASE_URL}>
            <ToastContainer/>
            <Routes>
                <Route path="/" element={<AccountTypeRouter><QrReaderPage/></AccountTypeRouter>}/>
                <Route path="/login" element={<AccountTypeRouter><Login/></AccountTypeRouter>}/>
                <Route path="/admin" element={<AccountTypeRouter><Admin/></AccountTypeRouter>}/>
            </Routes>
        </Router>
    )
}
export default App;
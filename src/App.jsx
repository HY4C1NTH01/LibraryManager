import Home from "./Home";
import Checked from "./Checked";
import { HashRouter as Router} from 'react-router-dom'
import { Routes, Route} from 'react-router-dom'

function App(){

   return(
    <>
    <Router>
      <Routes>
        <Route path= "/" element={<Home/>}/>
        <Route path= "/checked" element={<Checked/>}/>
      </Routes>
    </Router>
    </>
   )

}

export default App
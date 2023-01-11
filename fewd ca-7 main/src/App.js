import NavBar from './components/NavBar';
import Card from './components/Card';
import Form from './components/Form';
import './App.css';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
       <NavBar/>
      <Routes>
        <Route path='/' element={<Card/>}/>
        <Route path='/form' element={<Form/>}/>
     {/* <Card/> */}
     </Routes>
    </div>
  );
}

export default App;

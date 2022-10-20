import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar';
import CountriesList from './components/CountriesList';
import { Route, Routes } from 'react-router-dom';
import CountryDetails from './components/CountryDetails';

function App() {
	return (
    <div style={{display: "flex"}}>
      <div>
        <NavBar />
        <CountriesList />
      </div>
      <Routes>
        <Route path='/:alpha3code' element={<CountryDetails />}/>
      </Routes>
    </div>
  );
}


export default App;

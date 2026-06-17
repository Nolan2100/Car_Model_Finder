import './App.css';
import { useState } from 'react';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [cars, setCars] = useState([]);

  const searchCars = async () => {
    if (!searchTerm) return;
    const response = await fetch(`http://localhost:5000/api/cars?s=${searchTerm}`);
    const data = await response.json();
    if (data.Results) {
      setCars(data.Results);
    } else {
      setCars([]);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>REVVED UP</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Enter a car brand (e.g., Toyota)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={searchCars}>Search</button>
        </div>
      </header>
      <main>
        <div className="cars-container">
          {cars.map((car) => (
            <div key={car.Model_ID} className="car-card">
              <img src="https://via.placeholder.com/200x150?text=Car+Image" alt="Car" />
              <h3>{car.Make_Name} - {car.Model_Name}</h3>
            </div>
          ))}
        </div>
      </main> 
    </div>
  );
}

export default App;
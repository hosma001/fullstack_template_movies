import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';

const App = ()=> {
  const [movies, setMovies] = useState([]);
  useEffect(()=> {
    const fetchMovies = async()=> {
      const response = await axios.get('/api/movies');
      console.log('response');
    };
    fetchMovies();
  }, []);
  return (
    <h1>Movies ({ movies.length })</h1>
  );
};

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<App />);

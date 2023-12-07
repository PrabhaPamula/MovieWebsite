import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { MovieDetail } from './Components/MovieDetail';
import { Home } from './Components/Home';
import { Header } from './Components/Header';
import { MovieList } from './Components/MovieList';
import { SearchList } from './Components/SearchList';
import { useState } from 'react';

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
    console.log(query);
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Header onSearch={handleSearch}/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path="movie/:id" element={<MovieDetail />}></Route>
          <Route path="movies/:type" element={<MovieList/>}></Route>
          <Route path="search" element={<SearchList searchQuery={searchQuery}/>} />
          <Route path="/*" element={<h1>Error Page</h1>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthPage } from './pages/authPage/AuthPage';
import { BooksPage } from './pages/booksPage/BooksPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter> 
        <Routes>
          <Route path="/"  element={<BooksPage/>}/>   
          <Route path='/auth' element={<AuthPage/>}/>
        </Routes>
      </BrowserRouter> 
    </div>
  );
}

export default App;
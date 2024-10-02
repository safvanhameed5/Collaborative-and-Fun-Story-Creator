import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StoryList from './components/Stories/StoryList'
import StoryDetail from './components/Stories/StoryDetail'
import Login from './components/Auth/Login';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import Register from './components/Auth/Register';
import CreateStoryComponent from './components/Stories/CreateStory';
import NavBar from './components/Navbar'
import User from './components/User';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/user" element={<User />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/story" element={<StoryList />} />
          <Route path="/view/:id" element={<StoryDetail />} />
          <Route path="/create" element={<CreateStoryComponent />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App

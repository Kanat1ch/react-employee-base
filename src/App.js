import React from 'react'
import Layout from './components/HOC/Layout'
import Router from './components/HOC/Router'
import './App.scss'
import { Notifications } from 'react-push-notification';


function App() {
  return (
    <Layout>
      <Notifications position="bottom-right"/>
      <Router />
    </Layout>
  );
}

export default App

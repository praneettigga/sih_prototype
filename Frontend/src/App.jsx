import { useState } from 'react'
<<<<<<< HEAD
import InternshipRecommendationForm from './components/InternshipRecommendationForm'
import './App.css'

function App() {
  return (
    <>
      <InternshipRecommendationForm />
    </>
  );
=======
import ChatInterface from './components/ChatInterface'
import UserDetailsForm from './components/UserDetailsForm'
import './App.css'

function App() {
  const [showForm, setShowForm] = useState(true)
  const [userRegistered, setUserRegistered] = useState(false)
  const [messages, setMessages] = useState([])

  const handleFormSubmit = (userDetails) => {
    setUserRegistered(true)
    setShowForm(false)
    // Add welcome message
    setMessages([
      {
        id: 1,
        text: `Welcome! Your profile has been set up successfully. How can I help you find the perfect internship today?`,
        isBot: true,
        timestamp: new Date()
      }
    ])
  }

  const handleSendMessage = (message) => {
    const newMessage = {
      id: Date.now(),
      text: message,
      isBot: false,
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, newMessage])
    
    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: "I'm here to help you. This is a simulated response.",
        isBot: true,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botResponse])
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ChatInterface 
        messages={messages}
        onSendMessage={handleSendMessage}
        userRegistered={userRegistered}
        onOpenForm={() => setShowForm(true)}
      />
      
      {showForm && (
        <UserDetailsForm 
          onSubmit={handleFormSubmit}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  )
>>>>>>> 784c6d892a3334028b61924cc0822e8089e6b892
}

export default App

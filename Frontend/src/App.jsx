import { useState } from 'react'
import ChatInterface from './components/ChatInterface'
import UserDetailsForm from './components/UserDetailsForm'
import './App.css'

function App() {
  const [showForm, setShowForm] = useState(true)
  const [userRegistered, setUserRegistered] = useState(false)
  const [messages, setMessages] = useState([])

  // Internship data for responses
  const internships = [
    {
      id: 1,
      title: "Data Science Intern",
      company: "TechFlow Analytics",
      location: "Bangalore, India",
      duration: "3 months",
      stipend: "₹5,000/month",
      matchPercentage: 94,
      skills: ["Python", "Machine Learning", "SQL", "Data Analysis"],
      description: "Work on cutting-edge AI projects, analyze large datasets, and build predictive models for enterprise clients.",
      type: "Remote",
      keywords: ["data science", "data scientist", "ml", "machine learning", "analytics", "techflow"]
    },
    {
      id: 2,
      title: "Frontend Development Intern",
      company: "PixelCraft Studios",
      location: "Mumbai, India",
      duration: "4 months",
      stipend: "₹5,000/month",
      matchPercentage: 91,
      skills: ["React", "JavaScript", "HTML/CSS", "UI/UX Design"],
      description: "Create stunning user interfaces for web applications using modern frontend technologies and design systems.",
      type: "Hybrid",
      keywords: ["frontend", "front end", "react", "ui", "ux", "javascript", "pixelcraft"]
    },
    {
      id: 3,
      title: "Backend Development Intern",
      company: "CloudScale Technologies",
      location: "Hyderabad, India",
      duration: "6 months",
      stipend: "₹5,000/month",
      matchPercentage: 89,
      skills: ["Node.js", "Java", "AWS", "MongoDB", "API Development"],
      description: "Build scalable backend systems, design RESTful APIs, and work with cloud infrastructure.",
      type: "On-site",
      keywords: ["backend", "back end", "server", "api", "nodejs", "java", "cloudscale"]
    },
    {
      id: 4,
      title: "DevOps Engineering Intern",
      company: "InfraMax Solutions",
      location: "Pune, India",
      duration: "5 months",
      stipend: "₹5,000/month",
      matchPercentage: 87,
      skills: ["Docker", "Kubernetes", "AWS", "CI/CD", "Linux"],
      description: "Automate deployment pipelines, manage containerized applications, and optimize cloud infrastructure.",
      type: "Remote",
      keywords: ["devops", "docker", "kubernetes", "deployment", "infrastructure", "inframax"]
    },
    {
      id: 5,
      title: "Full Stack Web Development Intern",
      company: "NexGen Digital",
      location: "Delhi, India",
      duration: "4 months",
      stipend: "₹5,000/month",
      matchPercentage: 92,
      skills: ["React", "Node.js", "JavaScript", "PostgreSQL", "Git"],
      description: "Develop end-to-end web applications, from responsive frontends to robust backend services.",
      type: "Hybrid",
      keywords: ["full stack", "fullstack", "web development", "full-stack", "nexgen"]
    }
  ]

  const handleFormSubmit = (userDetails) => {
    setUserRegistered(true)
    setShowForm(false)
    // Add internship recommendations as welcome message
    setMessages([
      {
        id: 1,
        text: `🎉 Welcome! Your profile has been set up successfully!

Based on your skills and interests, I've found 5 amazing internship opportunities with high match rates for you:

🚀 **Data Science Intern** at TechFlow Analytics - 94% Match
📍 Bangalore, Remote | ₹5,000/month | 3 months
💡 Skills: Python, Machine Learning, SQL, Data Analysis

💻 **Frontend Development Intern** at PixelCraft Studios - 91% Match  
📍 Mumbai, Hybrid | ₹5,000/month | 4 months
💡 Skills: React, JavaScript, HTML/CSS, UI/UX Design

⚙️ **Backend Development Intern** at CloudScale Technologies - 89% Match
📍 Hyderabad, On-site | ₹5,000/month | 6 months  
💡 Skills: Node.js, Java, AWS, MongoDB, API Development

🔧 **DevOps Engineering Intern** at InfraMax Solutions - 87% Match
📍 Pune, Remote | ₹5,000/month | 5 months
💡 Skills: Docker, Kubernetes, AWS, CI/CD, Linux

🌐 **Full Stack Web Development Intern** at NexGen Digital - 92% Match
📍 Delhi, Hybrid | ₹5,000/month | 4 months
💡 Skills: React, Node.js, JavaScript, PostgreSQL, Git

Would you like more details about any of these positions? I can help you with application requirements, company information, or find similar opportunities!`,
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
    
    // Generate bot response based on message content
    setTimeout(() => {
      let responseText = "I'm here to help you. This is a simulated response."
      
      // Check if user is asking about a specific internship
      const messageLower = message.toLowerCase()
      const matchedInternship = internships.find(internship => 
        internship.keywords.some(keyword => messageLower.includes(keyword))
      )
      
      if (matchedInternship) {
        responseText = `📋 **${matchedInternship.title}** at **${matchedInternship.company}**

📍 **Location:** ${matchedInternship.location} (${matchedInternship.type})
⏱️ **Duration:** ${matchedInternship.duration}
💰 **Stipend:** ${matchedInternship.stipend}
🎯 **Match:** ${matchedInternship.matchPercentage}%

**About the role:**
${matchedInternship.description}

**Required Skills:**
${matchedInternship.skills.map(skill => `• ${skill}`).join('\n')}

Would you like me to help you with the application process or find similar opportunities?`
      } else if (messageLower.includes('internship') || messageLower.includes('job') || messageLower.includes('opportunity')) {
        responseText = `I can help you with information about any of these internships:

🚀 Data Science Intern at TechFlow Analytics
💻 Frontend Development Intern at PixelCraft Studios  
⚙️ Backend Development Intern at CloudScale Technologies
🔧 DevOps Engineering Intern at InfraMax Solutions
🌐 Full Stack Web Development Intern at NexGen Digital

Just ask me about any specific role you're interested in! For example, try "Tell me about the data science internship" or "What about the frontend role?"`
      }
      
      const botResponse = {
        id: Date.now() + 1,
        text: responseText,
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
}

export default App

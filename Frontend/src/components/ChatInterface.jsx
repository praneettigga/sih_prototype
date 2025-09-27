import { useState, useRef, useEffect } from 'react'

const ChatInterface = ({ messages, onSendMessage, userRegistered, onOpenForm }) => {
  const [inputMessage, setInputMessage] = useState('')
  const messagesEndRef = useRef(null)

  // Mock internship data with high match percentages
  const recommendedInternships = [
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
      type: "Remote"
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
      type: "Hybrid"
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
      type: "On-site"
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
      type: "Remote"
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
      type: "Hybrid"
    }
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (inputMessage.trim() && userRegistered) {
      onSendMessage(inputMessage.trim())
      setInputMessage('')
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <div className="flex flex-col h-screen bg-white text-gray-900">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 backdrop-blur-sm bg-white/95">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-900 to-blue-700 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-sm">AI</span>
          </div>
          <h1 className="text-xl font-light tracking-wide text-blue-900">PM Internship Assistant</h1>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
          <span>Online</span>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {!userRegistered ? (
          <div className="flex flex-col items-center justify-center h-full space-y-6">
            <div className="text-center max-w-2xl">
              <h2 className="text-4xl font-thin mb-6 bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent">
                Find the perfect internship for you!
              </h2>
              <p className="text-gray-600 text-lg mb-6">Please fill out the preliminary form to get started</p>
              
              {/* Profile Button */}
              <button
                onClick={onOpenForm}
                className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-blue-900 to-blue-700 hover:from-blue-800 hover:to-blue-600 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 mb-8"
              >
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <span>Fill Out Profile</span>
              </button>
              
              <div className="mt-8 flex justify-center">
                <div className="w-16 h-16 border-4 border-gray-300 border-t-orange-500 rounded-full animate-spin"></div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {messages.length === 0 ? (
              <div className="flex flex-col h-full space-y-6 p-6">
                {/* Personalized Recommendations Header */}
                <div className="text-center mb-6">
                  <h2 className="text-4xl font-thin mb-4 bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent">
                    Personalized Internship Recommendations
                  </h2>
                  <p className="text-gray-600 text-lg">Based on your profile, here are the top matches for you!</p>
                </div>

                {/* Internship Cards */}
                <div className="flex-1 overflow-y-auto space-y-4 max-w-6xl mx-auto w-full">
                  {recommendedInternships.map((internship) => (
                    <div key={internship.id} className="bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 animate-fade-in">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-xl font-semibold text-gray-900">{internship.title}</h3>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              internship.type === 'Remote' ? 'bg-green-100 text-green-800' :
                              internship.type === 'Hybrid' ? 'bg-blue-100 text-blue-800' :
                              'bg-orange-100 text-orange-800'
                            }`}>
                              {internship.type}
                            </span>
                          </div>
                          <p className="text-lg text-blue-700 font-medium mb-1">{internship.company}</p>
                          <p className="text-gray-600 mb-3">{internship.location} • {internship.duration}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="text-2xl font-bold text-green-600">{internship.matchPercentage}%</span>
                            <span className="text-sm text-gray-500">Match</span>
                          </div>
                          <div className="w-20 bg-gray-200 rounded-full h-3">
                            <div 
                              className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-500"
                              style={{ width: `${internship.matchPercentage}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>

                      <p className="text-gray-700 mb-4 leading-relaxed">{internship.description}</p>

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {internship.skills.map((skill, index) => (
                              <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                                {skill}
                              </span>
                            ))}
                          </div>
                          <p className="text-lg font-semibold text-orange-600">{internship.stipend}</p>
                        </div>
                        <div className="flex space-x-3">
                          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-2">
                              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l11 11z"/>
                            </svg>
                            Save
                          </button>
                          <button className="inline-flex items-center px-6 py-2 bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-lg hover:from-blue-800 hover:to-blue-600 transition-all duration-200 transform hover:scale-105 font-semibold shadow-lg">
                            Apply Now
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Chat Prompt */}
                <div className="text-center pt-6 border-t border-gray-200">
                  <p className="text-gray-600 mb-4">Have questions about any of these internships?</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg mx-auto">
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-orange-300 hover:bg-orange-50 transition-colors cursor-pointer">
                      <p className="text-sm text-gray-700">� Ask about requirements</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-orange-300 hover:bg-orange-50 transition-colors cursor-pointer">
                      <p className="text-sm text-gray-700">� Help with applications</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-orange-300 hover:bg-orange-50 transition-colors cursor-pointer">
                      <p className="text-sm text-gray-700">� Find similar roles</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-orange-300 hover:bg-orange-50 transition-colors cursor-pointer">
                      <p className="text-sm text-gray-700">� Career guidance</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'} animate-fade-in`}
                >
                  <div className="flex items-start space-x-3 max-w-3xl">
                    {message.isBot && (
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-900 to-blue-700 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white font-bold text-xs">AI</span>
                      </div>
                    )}
                    <div
                      className={`px-4 py-3 rounded-2xl shadow-lg transition-all duration-200 hover:shadow-xl ${
                        message.isBot
                          ? 'bg-gray-100 text-gray-900 border border-gray-200'
                          : 'bg-gradient-to-r from-orange-500 to-orange-600 text-white ml-auto'
                      }`}
                    >
                      <p className="whitespace-pre-wrap leading-relaxed">{message.text}</p>
                      <p className="text-xs opacity-60 mt-2 text-right">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    {!message.isBot && (
                      <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white font-bold text-xs">U</span>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-300 backdrop-blur-sm bg-gray-100">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          <div className="relative">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={userRegistered ? "Ask anything..." : "Please complete registration first"}
              disabled={!userRegistered}
              className={`w-full px-4 py-3 pr-12 bg-white border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all duration-200 placeholder-gray-500 text-gray-900 ${
                !userRegistered ? 'opacity-50 cursor-not-allowed' : 'hover:border-gray-400'
              }`}
              rows="1"
              maxLength={2000}
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || !userRegistered}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 text-gray-600 hover:text-blue-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:bg-blue-50 rounded-lg"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transform hover:scale-110 transition-transform duration-200"
              >
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22,2 15,22 11,13 2,9 22,2"></polygon>
              </svg>
            </button>
          </div>
          <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
            <span className="flex items-center space-x-2">
              <span>
                {userRegistered ? "Press Enter to send, Shift+Enter for new line" : "Registration required"}
              </span>
            </span>
            {inputMessage.length > 0 && (
              <span className={`transition-colors duration-200 ${inputMessage.length > 1800 ? 'text-orange-500' : inputMessage.length > 1900 ? 'text-red-500' : 'text-gray-500'}`}>
                {inputMessage.length}/2000
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default ChatInterface
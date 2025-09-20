import { useState, useEffect } from 'react'

const UserDetailsForm = ({ onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    university: '',
    cgpa: '',
    branch: '',
    skills: [],
    interests: [],
    previousInternships: ''
  })

  const [errors, setErrors] = useState({})
  const [showSkillsDropdown, setShowSkillsDropdown] = useState(false)
  const [showInterestsDropdown, setShowInterestsDropdown] = useState(false)
  const [skillSearchTerm, setSkillSearchTerm] = useState('')
  const [interestSearchTerm, setInterestSearchTerm] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleMultiSelect = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: prev[name].includes(value)
        ? prev[name].filter(item => item !== value)
        : [...prev[name], value]
    }))
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.university || formData.university === 'Select your university') {
      newErrors.university = 'Please select your university'
    }
    if (!formData.branch || formData.branch === 'Select your branch') {
      newErrors.branch = 'Please select your branch'
    }
    if (!formData.cgpa.trim()) newErrors.cgpa = 'CGPA is required'
    if (formData.cgpa && (isNaN(formData.cgpa) || formData.cgpa < 0 || formData.cgpa > 10)) {
      newErrors.cgpa = 'Please enter a valid CGPA (0-10)'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  const universities = [
    'Select your university',
    'Indian Institute of Technology (IIT) Delhi',
    'Indian Institute of Technology (IIT) Bombay',
    'Indian Institute of Technology (IIT) Kanpur',
    'Indian Institute of Technology (IIT) Kharagpur',
    'Indian Institute of Technology (IIT) Madras',
    'Indian Institute of Science (IISc) Bangalore',
    'National Institute of Technology (NIT) Trichy',
    'National Institute of Technology (NIT) Warangal',
    'Delhi Technological University (DTU)',
    'Birla Institute of Technology and Science (BITS) Pilani',
    'Vellore Institute of Technology (VIT)',
    'Manipal Institute of Technology',
    'SRM Institute of Science and Technology',
    'Anna University',
    'Pune Institute of Computer Technology (PICT)',
    'Other'
  ]

  const branches = [
    'Select your branch',
    'Computer Science Engineering',
    'Information Technology',
    'Electronics and Communication Engineering',
    'Electrical Engineering',
    'Mechanical Engineering',
    'Civil Engineering',
    'Chemical Engineering',
    'Aerospace Engineering',
    'Biotechnology',
    'Data Science',
    'Artificial Intelligence and Machine Learning',
    'Cybersecurity',
    'Other'
  ]

  const availableSkills = [
    'Python', 'Java', 'JavaScript', 'C++', 'C#', 'React', 'Node.js', 'Angular',
    'Vue.js', 'HTML/CSS', 'SQL', 'MongoDB', 'PostgreSQL', 'AWS', 'Azure',
    'Google Cloud', 'Docker', 'Kubernetes', 'Git', 'Machine Learning',
    'Data Analysis', 'UI/UX Design', 'Project Management', 'Communication',
    'Leadership', 'Problem Solving', 'Team Collaboration', 'Agile/Scrum'
  ]

  const availableInterests = [
    'Software Development', 'Web Development', 'Mobile App Development',
    'Data Science', 'Machine Learning', 'Artificial Intelligence',
    'Cybersecurity', 'Cloud Computing', 'DevOps', 'UI/UX Design',
    'Product Management', 'Digital Marketing', 'Business Analysis',
    'Research and Development', 'Consulting', 'Entrepreneurship',
    'Finance', 'Operations', 'Human Resources'
  ]

  // Filter skills and interests based on search terms
  const filteredSkills = availableSkills.filter(skill =>
    skill.toLowerCase().includes(skillSearchTerm.toLowerCase())
  )

  const filteredInterests = availableInterests.filter(interest =>
    interest.toLowerCase().includes(interestSearchTerm.toLowerCase())
  )

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-container')) {
        setShowSkillsDropdown(false)
        setShowInterestsDropdown(false)
      }
    }

    if (showSkillsDropdown || showInterestsDropdown) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showSkillsDropdown, showInterestsDropdown])

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto animate-scale-in border border-gray-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">AI</span>
              </div>
              <h2 className="text-2xl font-light tracking-wide">Internship Profile Setup</h2>
            </div>
            <button
              onClick={onClose}
              className="text-blue-100 hover:text-white text-3xl transition-colors duration-200 hover:bg-white/10 rounded-full w-8 h-8 flex items-center justify-center"
            >
              ×
            </button>
          </div>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Personal Details */}
            <div className="space-y-5">
              <h3 className="text-xl font-semibold text-blue-900 mb-6 flex items-center">
                <span className="w-6 h-6 bg-orange-500 rounded-full text-white text-xs flex items-center justify-center mr-3">1</span>
                Academic Details:
              </h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  University*
                </label>
                <select
                  name="university"
                  value={formData.university}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900/20 transition-all duration-200 cursor-pointer ${
                    errors.university ? 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-gray-300 focus:border-blue-900'
                  }`}
                >
                  {universities.map(university => (
                    <option key={university} value={university}>{university}</option>
                  ))}
                </select>
                {errors.university && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <span className="mr-1">⚠️</span>{errors.university}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CGPA*
                  </label>
                  <input
                    type="number"
                    name="cgpa"
                    value={formData.cgpa}
                    onChange={handleChange}
                    min="0"
                    max="10"
                    step="0.01"
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900/20 transition-all duration-200 ${
                      errors.cgpa ? 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-gray-300 focus:border-blue-900'
                    }`}
                    placeholder="8.5"
                  />
                  {errors.cgpa && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <span className="mr-1">⚠️</span>{errors.cgpa}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Previous Internships
                  </label>
                  <input
                    type="number"
                    name="previousInternships"
                    value={formData.previousInternships}
                    onChange={handleChange}
                    min="0"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 hover:border-gray-300 transition-all duration-200"
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Branch*
                </label>
                <select
                  name="branch"
                  value={formData.branch}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900/20 transition-all duration-200 cursor-pointer ${
                    errors.branch ? 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-gray-300 focus:border-blue-900'
                  }`}
                >
                  {branches.map(branch => (
                    <option key={branch} value={branch}>{branch}</option>
                  ))}
                </select>
                {errors.branch && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <span className="mr-1">⚠️</span>{errors.branch}
                  </p>
                )}
              </div>
            </div>

            {/* Right Column - Skills & Interests */}
            <div className="space-y-5">
              <h3 className="text-xl font-semibold text-blue-900 mb-6 flex items-center">
                <span className="w-6 h-6 bg-orange-500 rounded-full text-white text-xs flex items-center justify-center mr-3">2</span>
                Skills & Interests
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Skills
                </label>
                
                {/* Display Added Skills */}
                <div className="space-y-3 mb-4">
                  {formData.skills.map((skill, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-blue-200 rounded-lg bg-blue-50">
                      <span className="text-blue-900 font-medium">{skill}</span>
                      <button
                        type="button"
                        onClick={() => handleMultiSelect('skills', skill)}
                        className="text-blue-600 hover:text-blue-800 p-1"
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>

                {/* Add Skill Dropdown */}
                <div className="relative dropdown-container">
                  <button
                    type="button"
                    onClick={() => setShowSkillsDropdown(!showSkillsDropdown)}
                    className="inline-flex items-center space-x-2 px-4 py-2 border-2 border-blue-900 text-blue-900 font-medium rounded-lg hover:bg-blue-50 transition-all duration-200"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    <span>Add skill</span>
                  </button>

                  {showSkillsDropdown && (
                    <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                      <div className="p-2">
                        <input
                          type="text"
                          placeholder="Search skills..."
                          value={skillSearchTerm}
                          onChange={(e) => setSkillSearchTerm(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
                        />
                      </div>
                      <div className="max-h-32 overflow-y-auto">
                        {filteredSkills.map(skill => (
                          !formData.skills.includes(skill) && (
                            <button
                              key={skill}
                              type="button"
                              onClick={() => {
                                handleMultiSelect('skills', skill)
                                setShowSkillsDropdown(false)
                                setSkillSearchTerm('')
                              }}
                              className="w-full text-left px-3 py-2 hover:bg-orange-50 text-gray-700 hover:text-orange-700"
                            >
                              {skill}
                            </button>
                          )
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Interests
                </label>
                
                {/* Display Added Interests */}
                <div className="space-y-3 mb-4">
                  {formData.interests.map((interest, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-orange-200 rounded-lg bg-orange-50">
                      <span className="text-orange-900 font-medium">{interest}</span>
                      <button
                        type="button"
                        onClick={() => handleMultiSelect('interests', interest)}
                        className="text-orange-600 hover:text-orange-800 p-1"
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>

                {/* Add Interest Dropdown */}
                <div className="relative dropdown-container">
                  <button
                    type="button"
                    onClick={() => setShowInterestsDropdown(!showInterestsDropdown)}
                    className="inline-flex items-center space-x-2 px-4 py-2 border-2 border-blue-900 text-blue-900 font-medium rounded-lg hover:bg-blue-50 transition-all duration-200"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    <span>Add interest</span>
                  </button>

                  {showInterestsDropdown && (
                    <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                      <div className="p-2">
                        <input
                          type="text"
                          placeholder="Search interests..."
                          value={interestSearchTerm}
                          onChange={(e) => setInterestSearchTerm(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      </div>
                      <div className="max-h-32 overflow-y-auto">
                        {filteredInterests.map(interest => (
                          !formData.interests.includes(interest) && (
                            <button
                              key={interest}
                              type="button"
                              onClick={() => {
                                handleMultiSelect('interests', interest)
                                setShowInterestsDropdown(false)
                                setInterestSearchTerm('')
                              }}
                              className="w-full text-left px-3 py-2 hover:bg-blue-50 text-gray-700 hover:text-blue-700"
                            >
                              {interest}
                            </button>
                          )
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-orange-50 p-6 rounded-xl border border-blue-200 mt-6">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-xs">💡</span>
                  </div>
                  <div className="text-sm text-blue-900">
                    <p className="font-medium mb-2">Profile Tips</p>
                    <p>
                      Complete your profile to get personalized internship recommendations. 
                      Select skills and interests that best represent your career goals and technical abilities.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-10 flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500/20"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-900 hover:bg-blue-800 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-900/20 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
            >
              Save Profile & Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UserDetailsForm
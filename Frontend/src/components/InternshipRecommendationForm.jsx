import React, { useState } from 'react';
import MultiSelectDropdown from './MultiSelectDropdown';

const InternshipRecommendationForm = () => {
  const [formData, setFormData] = useState({
    branch: '',
    cgpa: '',
    skills: [],
    interests: [],
    preferred_location: '',
    interested_career_paths: [],
    no_of_previous_internships: ''
  });

  const [errors, setErrors] = useState({});

  // Data options for dropdowns
  const skillsOptions = [
    'JavaScript', 'Python', 'Java', 'C++', 'React', 'Node.js', 'Angular', 'Vue.js',
    'Machine Learning', 'Data Analysis', 'SQL', 'MongoDB', 'AWS', 'Docker', 'Git',
    'HTML/CSS', 'TypeScript', 'Django', 'Flask', 'Spring Boot', 'Express.js',
    'Data Science', 'Artificial Intelligence', 'Cybersecurity', 'DevOps', 'UI/UX Design',
    'Mobile Development', 'Blockchain', 'Cloud Computing', 'Big Data', 'IoT'
  ];

  const interestsOptions = [
    'Web Development', 'Mobile App Development', 'Data Science', 'Machine Learning',
    'Artificial Intelligence', 'Cybersecurity', 'Cloud Computing', 'DevOps',
    'UI/UX Design', 'Database Management', 'Software Testing', 'Game Development',
    'Blockchain Technology', 'IoT Development', 'Network Administration',
    'Digital Marketing', 'Content Writing', 'Graphic Design', 'Project Management',
    'Business Analysis', 'Research & Development', 'Quality Assurance'
  ];

  const careerPathsOptions = [
    'Software Engineer', 'Data Scientist', 'Full Stack Developer', 'Frontend Developer',
    'Backend Developer', 'Mobile App Developer', 'DevOps Engineer', 'Cloud Engineer',
    'Cybersecurity Analyst', 'Machine Learning Engineer', 'AI Research Scientist',
    'UI/UX Designer', 'Product Manager', 'Business Analyst', 'Quality Assurance Engineer',
    'Database Administrator', 'Network Engineer', 'System Administrator',
    'Digital Marketing Specialist', 'Content Strategist', 'Technical Writer',
    'Project Manager', 'Consultant', 'Research Analyst'
  ];

  const branchOptions = [
    'Computer Science Engineering', 'Information Technology', 'Electronics & Communication',
    'Electrical Engineering', 'Mechanical Engineering', 'Civil Engineering',
    'Chemical Engineering', 'Biotechnology', 'Aerospace Engineering',
    'Industrial Engineering', 'Environmental Engineering', 'Petroleum Engineering',
    'Mining Engineering', 'Metallurgical Engineering', 'Textile Engineering',
    'Agricultural Engineering', 'Food Technology', 'Marine Engineering',
    'Automobile Engineering', 'Robotics Engineering'
  ];

  const locationOptions = [
    'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune',
    'Ahmedabad', 'Surat', 'Jaipur', 'Lucknow', 'Kanpur', 'Nagpur', 'Indore',
    'Thane', 'Bhopal', 'Visakhapatnam', 'Pimpri-Chinchwad', 'Patna', 'Vadodara',
    'Ghaziabad', 'Ludhiana', 'Agra', 'Nashik', 'Faridabad', 'Meerut', 'Rajkot',
    'Kalyan-Dombivali', 'Vasai-Virar', 'Varanasi', 'Remote/Work from Home'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleMultiSelectChange = (name, values) => {
    setFormData(prev => ({
      ...prev,
      [name]: values
    }));
    // Clear error when user selects options
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.branch) {
      newErrors.branch = 'Branch is required';
    }

    if (!formData.cgpa) {
      newErrors.cgpa = 'CGPA is required';
    } else if (parseFloat(formData.cgpa) < 0 || parseFloat(formData.cgpa) > 10) {
      newErrors.cgpa = 'CGPA must be between 0 and 10';
    }

    if (formData.skills.length === 0) {
      newErrors.skills = 'Please select at least one skill';
    }

    if (formData.interests.length === 0) {
      newErrors.interests = 'Please select at least one interest';
    }

    if (!formData.preferred_location) {
      newErrors.preferred_location = 'Preferred location is required';
    }

    if (formData.interested_career_paths.length === 0) {
      newErrors.interested_career_paths = 'Please select at least one career path';
    }

    if (!formData.no_of_previous_internships) {
      newErrors.no_of_previous_internships = 'Number of previous internships is required';
    } else if (parseInt(formData.no_of_previous_internships) < 0) {
      newErrors.no_of_previous_internships = 'Number cannot be negative';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('Form submitted successfully:', formData);
      alert('Form submitted successfully! Check console for details.');
      // Here you would typically send the data to your backend API
    } else {
      alert('Please fix the errors in the form');
    }
  };

  const handleReset = () => {
    setFormData({
      branch: '',
      cgpa: '',
      skills: [],
      interests: [],
      preferred_location: '',
      interested_career_paths: [],
      no_of_previous_internships: ''
    });
    setErrors({});
  };

  return (
    <div className="internship-form-container">
      <div className="form-header">
        <h1>Prime Minister's Internship Scheme</h1>
        <h2>Internship Recommendation System</h2>
        <p>Please fill out all the required information to get personalized internship recommendations</p>
      </div>

      <form onSubmit={handleSubmit} className="internship-form">
        {/* Branch Selection */}
        <div className="form-group">
          <label htmlFor="branch" className="form-label">
            Branch <span className="required">*</span>
          </label>
          <select
            id="branch"
            name="branch"
            value={formData.branch}
            onChange={handleInputChange}
            className={`form-input ${errors.branch ? 'error' : ''}`}
          >
            <option value="">Select your branch</option>
            {branchOptions.map((branch, index) => (
              <option key={index} value={branch}>
                {branch}
              </option>
            ))}
          </select>
          {errors.branch && <span className="error-message">{errors.branch}</span>}
        </div>

        {/* CGPA Input */}
        <div className="form-group">
          <label htmlFor="cgpa" className="form-label">
            CGPA <span className="required">*</span>
          </label>
          <input
            type="number"
            id="cgpa"
            name="cgpa"
            value={formData.cgpa}
            onChange={handleInputChange}
            placeholder="Enter your CGPA (0-10)"
            min="0"
            max="10"
            step="0.01"
            className={`form-input ${errors.cgpa ? 'error' : ''}`}
          />
          {errors.cgpa && <span className="error-message">{errors.cgpa}</span>}
        </div>

        {/* Skills Multi-Select */}
        <div className="form-group">
          <MultiSelectDropdown
            options={skillsOptions}
            selectedValues={formData.skills}
            onChange={(values) => handleMultiSelectChange('skills', values)}
            placeholder="Select your skills"
            label="Skills"
            required={true}
          />
          {errors.skills && <span className="error-message">{errors.skills}</span>}
        </div>

        {/* Interests Multi-Select */}
        <div className="form-group">
          <MultiSelectDropdown
            options={interestsOptions}
            selectedValues={formData.interests}
            onChange={(values) => handleMultiSelectChange('interests', values)}
            placeholder="Select your interests"
            label="Interests"
            required={true}
          />
          {errors.interests && <span className="error-message">{errors.interests}</span>}
        </div>

        {/* Preferred Location */}
        <div className="form-group">
          <label htmlFor="preferred_location" className="form-label">
            Preferred Location <span className="required">*</span>
          </label>
          <select
            id="preferred_location"
            name="preferred_location"
            value={formData.preferred_location}
            onChange={handleInputChange}
            className={`form-input ${errors.preferred_location ? 'error' : ''}`}
          >
            <option value="">Select preferred location</option>
            {locationOptions.map((location, index) => (
              <option key={index} value={location}>
                {location}
              </option>
            ))}
          </select>
          {errors.preferred_location && <span className="error-message">{errors.preferred_location}</span>}
        </div>

        {/* Career Paths Multi-Select */}
        <div className="form-group">
          <MultiSelectDropdown
            options={careerPathsOptions}
            selectedValues={formData.interested_career_paths}
            onChange={(values) => handleMultiSelectChange('interested_career_paths', values)}
            placeholder="Select interested career paths"
            label="Interested Career Paths"
            required={true}
          />
          {errors.interested_career_paths && <span className="error-message">{errors.interested_career_paths}</span>}
        </div>

        {/* Number of Previous Internships */}
        <div className="form-group">
          <label htmlFor="no_of_previous_internships" className="form-label">
            Number of Previous Internships <span className="required">*</span>
          </label>
          <input
            type="number"
            id="no_of_previous_internships"
            name="no_of_previous_internships"
            value={formData.no_of_previous_internships}
            onChange={handleInputChange}
            placeholder="Enter number of previous internships"
            min="0"
            className={`form-input ${errors.no_of_previous_internships ? 'error' : ''}`}
          />
          {errors.no_of_previous_internships && <span className="error-message">{errors.no_of_previous_internships}</span>}
        </div>

        {/* Form Actions */}
        <div className="form-actions">
          <button type="button" onClick={handleReset} className="btn btn-secondary">
            Reset Form
          </button>
          <button type="submit" className="btn btn-primary">
            Get Recommendations
          </button>
        </div>
      </form>
    </div>
  );
};

export default InternshipRecommendationForm;

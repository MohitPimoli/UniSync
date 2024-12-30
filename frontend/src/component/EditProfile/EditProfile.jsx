import React, { useState } from "react";
import "./EditProfile.css";

const EditProfile = () => {
  const [activeTab, setActiveTab] = useState("Basic Details");
  const [formData, setFormData] = useState({
    profilePicture1122: "https://via.placeholder.com/100", // Default placeholder
    firstName: "",
    middleName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "Male",
    maritalStatus: "Single",
    rollNo: "2194012",
    joiningYear: "",
    graduationYear: "",
    organisation: "",
    designation: "",
    email: "",
    links: {
      github: "",
      linkedIn: "",
      personal: "",
    },
    professionalMilestones: [], // Array for professional milestones
    educationalMilestones: [],  // Array for educational milestones
    professionalMilestoneInput: "", // Input for professional milestone
    educationalMilestoneInput: "",  // Input for educational milestone
    areaOfExpertise: [],  // Initialize as an empty array
    areaOfInterest: [],   // Initialize as an empty array
    coreValues: [],       // Initialize as an empty array
    languagesKnown: [],   // Initialize as an empty array
    summary: "",          // Initialize as an empty string
    rolesAndResponsibilities: "", // Initialize as an empty string
    phoneNumbers: [{
        countryCode: "+91",
        number: ""
      }],
      currentAddress: {
        line1: "",
        line2: "",
        country: "India",
        state: "",
        city: "",
        postalCode: ""
      },
      permanentAddress: {
        line1: "",
        line2: "",
        country: "India",
        state: "",
        city: "",
        postalCode: ""
      },
      sameAsCurrentAddress: false
  });
  const handlePhoneChange = (index, field, value) => {
    setFormData(prev => {
      const newPhones = [...prev.phoneNumbers];
      newPhones[index] = { ...newPhones[index], [field]: value };
      return { ...prev, phoneNumbers: newPhones };
    });
  };

  const addPhoneNumber = () => {
    setFormData(prev => ({
      ...prev,
      phoneNumbers: [...prev.phoneNumbers, { countryCode: "+91", number: "" }]
    }));
  };

  const handleAddressChange = (type, field, value) => {
    setFormData(prev => ({
      ...prev,
      [type]: { ...prev[type], [field]: value }
    }));
  };

  const handleSameAddress = (e) => {
    const checked = e.target.checked;
    setFormData(prev => ({
      ...prev,
      sameAsCurrentAddress: checked,
      permanentAddress: checked ? { ...prev.currentAddress } : prev.permanentAddress
    }));
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prevState) => ({
          ...prevState,
          profilePicture1122: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };
  const handleCareerMilestoneAdd = () => {
    if (formData.careerMilestoneInput.trim() !== "") {
      setFormData((prevState) => ({
        ...prevState,
        professionalMilestones: [
          ...prevState.professionalMilestones,
          formData.careerMilestoneInput.trim(),
        ],
        careerMilestoneInput: "",
      }));
    }
  };

  // Handle milestone deletion
  const handleMilestoneDelete = (index) => {
    setFormData((prevState) => ({
      ...prevState,
      professionalMilestones: prevState.professionalMilestones.filter(
        (_, i) => i !== index
      ),
    }));
  };
  const handleLinkChange = (e, type) => {
    const { value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      links: {
        ...prevState.links,
        [type]: value,
      },
    }));
  };

  const handleTagChange = (e, fieldName) => {
    if (e.key === "Enter" && e.target.value.trim() !== "") {
      setFormData((prevState) => ({
        ...prevState,
        [fieldName]: [...prevState[fieldName], e.target.value.trim()],
      }));
      e.target.value = "";
    }
  };

  const removeTag = (fieldName, index) => {
    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: prevState[fieldName].filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);
    // Add logic to save data to a backend or state management system.
  };

  const renderContent = () => {
    switch (activeTab) {
      case "Basic Details":
        return (
          <div>
            <h3>Basic Details</h3>
            <form onSubmit={handleSubmit} className="form-container1122">
              <div className="form-section1122">
                <div className="form-group1122 profile-picture1122">
                  <img
                    src={formData.profilePicture1122}
                    alt="Profile"
                    className="profile-img1122"
                  />
                  <label htmlFor="profilePicture1122" className="upload-btn1122">
                    Change
                  </label>
                  <input
                    type="file"
                    className="input1"
                    id="profilePicture1122"
                    style={{ display: "none" }}
                    accept="image/*"
                    onChange={handlePictureChange}
                  />
                </div>
                <div className="form-group1122">
                  <label>First Name</label>
                  <input
                    type="text"
                    className="input1"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group1122">
                  <label>Middle Name</label>
                  <input
                    type="text"
                    className="input1"
                    name="middleName"
                    value={formData.middleName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group1122">
                  <label>Last Name</label>
                  <input
                    type="text"
                    className="input1"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group1122">
                  <label>Date of Birth</label>
                  <input
                    type="date"
                    className="input1"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group1122">
                  <label>Gender</label>
                  <select
                  className="input1"
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="form-group1122">
                  <label>Marital Status</label>
                  <select
                  className="input1"
                    name="maritalStatus"
                    value={formData.maritalStatus}
                    onChange={handleInputChange}
                  >
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                  </select>
                </div>
              </div>

              <div className="form-section1122">
                <div className="form-group1122">
                  <label>Roll No.</label>
                  <input
                  className="input1"
                    type="text"
                    name="rollNo"
                    value={formData.rollNo}
                    disabled
                  />
                </div>
                <div className="form-group1122">
                  <label>Joining Year</label>
                  <input
                  className="input1"
                    type="text"
                    name="joiningYear"
                    value={formData.joiningYear}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group1122">
                  <label>Graduation Year</label>
                  <input
                  className="input1"
                    type="text"
                    name="graduationYear"
                    value={formData.graduationYear}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group1122">
                  <label>Organisation</label>
                  <input
                  className="input1"
                    type="text"
                    name="organisation"
                    value={formData.organisation}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group1122">
                  <label>Designation</label>
                  <input
                  className="input1"
                    type="text"
                    name="designation"
                    value={formData.designation}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group1122">
                  <label>Email</label>
                  <input
                  className="input1"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group1122 links-group1122">
                  <label>Web Links</label>
                  <input
                    className="input1"
                    type="url"
                    placeholder="GitHub URL"
                    value={formData.links.github}
                    onChange={(e) => handleLinkChange(e, "github")}
                  />
                  <input
                  className="input1"
                    type="url"
                    placeholder="LinkedIn URL"
                    value={formData.links.linkedIn}
                    onChange={(e) => handleLinkChange(e, "linkedIn")}
                  />
                  <input
                  className="input1"
                    type="url"
                    placeholder="Personal Website"
                    value={formData.links.personal}
                    onChange={(e) => handleLinkChange(e, "personal")}
                  />
                </div>
              </div>

              <button type="submit" className="save-btn1122">
                Save
              </button>
            </form>
          </div>
        );
      case "Summary":
        return (
          <div>
            <h3>Summary</h3>
            <form onSubmit={handleSubmit} className="form-container-summary">
            <div className="Summary-container">
              <div className="form-group1122">
                <label>Summary</label>
                <textarea
                  style={{height:"150px", width:"87%"}}
                  name="summary"
                  value={formData.summary}
                  onChange={handleInputChange}
                  placeholder="Write a professional summary of your skills."
                  maxLength="1000"
                ></textarea>
                <span>{formData.summary.length} / 1000</span>
              </div>
              <div className="form-group1122">
                <label>Roles and Responsibilities</label>
                <textarea
                  style={{height:"150px", width:"87%"}}
                  name="rolesAndResponsibilities"
                  value={formData.rolesAndResponsibilities}
                  onChange={handleInputChange}
                  placeholder="Specify the roles and responsibilities of your current role."
                  maxLength="6000"
                ></textarea>
                <span>{formData.rolesAndResponsibilities.length} / 6000</span>
              </div>
              <div className="form-group1122">
                <label>Area of Expertise</label>
                <input
                className="input1"
                  type="text"
                  placeholder="Add Expertise"
                  onKeyDown={(e) => handleTagChange(e, "areaOfExpertise")}
                />
                <div className="tags1122">
                  {formData.areaOfExpertise.map((tag, index) => (
                    <span key={index} className="tag1122">
                      {tag} <button onClick={() => removeTag("areaOfExpertise", index)}>x</button>
                    </span>
                  ))}
                </div>
              </div>
              <div className="form-group1122">
                <label>Area of Interest</label>
                <input
                  type="text"
                  className="input1"
                  placeholder="Add Interests"
                  onKeyDown={(e) => handleTagChange(e, "areaOfInterest")}
                />
                <div className="tags1122">
                  {formData.areaOfInterest.map((tag, index) => (
                    <span key={index} className="tag1122">
                      {tag} <button onClick={() => removeTag("areaOfInterest", index)}>x</button>
                    </span>
                  ))}
                </div>
              </div>
              <div className="form-group1122">
                <label>Core Values</label>
                <input
                  type="text"
                  className="input1"
                  placeholder="Add Core Values"
                  onKeyDown={(e) => handleTagChange(e, "coreValues")}
                />
                <div className="tags1122">
                  {formData.coreValues.map((tag, index) => (
                    <span key={index} className="tag1122">
                      {tag} <button onClick={() => removeTag("coreValues", index)}>x</button>
                    </span>
                  ))}
                </div>
              </div>
              <div className="form-group1122">
                <label>Languages Known</label>
                <input
                  type="text"
                  className="input1"
                  placeholder="Add Languages"
                  onKeyDown={(e) => handleTagChange(e, "languagesKnown")}
                />
                <div className="tags1122">
                  {formData.languagesKnown.map((tag, index) => (
                    <span key={index} className="tag1122">
                      {tag} <button onClick={() => removeTag("languagesKnown", index)}>x</button>
                    </span>
                  ))}
                </div>
              </div>
              </div>
              <button type="submit" className="save-btn">Save</button>
            </form>
          </div>
        );
      case "Career Journey":
        return (
            <div>
            <h3>Career Journey</h3>
            <form className="form-container-career">
              <div className="form-group1122">
                <label>Add Career Milestone</label>
                <input
                  className="input1"
                  type="text"
                  placeholder="Describe your milestone (e.g., Promoted to Senior Developer)"
                  value={formData.careerMilestoneInput}
                  onChange={(e) =>
                    setFormData({ ...formData, careerMilestoneInput: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="add-btn1122"
                  onClick={handleCareerMilestoneAdd}
                >
                  Add Milestone
                </button>
              </div>
              <div className="milestones-list1122">
                <h4>Your Professional Milestones</h4>
                {formData.professionalMilestones.length > 0 ? (
                  formData.professionalMilestones.map((milestone, index) => (
                    <div key={index} className="milestone-item1122">
                      <span>{milestone}</span>
                      <button
                      className="add-btn1122"
                        type="button"
                        onClick={() => handleMilestoneDelete(index)}
                      >
                        Remove
                      </button>
                    </div>
                  ))
                ) : (
                  <p>No milestones added yet.</p>
                )}
              </div>
            </form>
          </div>
        );
      case "Contacts":
        return (
            <div>
            <h3>Contact Information</h3>
            <form onSubmit={handleSubmit} className="form-container-contacts">
                <div className="Contact-section">
              <div className="phone-section">
                <h4>Phone Numbers</h4>
                {formData.phoneNumbers.map((phone, index) => (
                  <div key={index} className="form-group1122">
                    <select
                      className="input1"
                      value={phone.countryCode}
                      onChange={(e) => handlePhoneChange(index, 'countryCode', e.target.value)}
                    >
                      <option value="+91">+91 - India</option>
                      {/* Add more country codes as needed */}
                    </select>
                    <input
                      type="tel"
                      className="input1"
                      value={phone.number}
                      onChange={(e) => handlePhoneChange(index, 'number', e.target.value)}
                      placeholder="Phone number"
                    />
                  </div>
                ))}
                <button type="button" onClick={addPhoneNumber} className="add-btn1122">
                  + Add another phone number
                </button>
              </div>

              <div className="address-section">
                <h4>Current Address</h4>
                <div className="form-group1122">
                  <input
                    type="text"
                    className="input1"
                    placeholder="Address Line 1"
                    value={formData.currentAddress.line1}
                    onChange={(e) => handleAddressChange('currentAddress', 'line1', e.target.value)}
                  />
                  <input
                    type="text"
                    className="input1"
                    placeholder="Address Line 2"
                    value={formData.currentAddress.line2}
                    onChange={(e) => handleAddressChange('currentAddress', 'line2', e.target.value)}
                  />
                  <div className="address-grid">
                    <select
                      className="input1"
                      value={formData.currentAddress.country}
                      onChange={(e) => handleAddressChange('currentAddress', 'country', e.target.value)}
                    >
                      <option value="India">India</option>
                    </select>
                    <input
                      type="text"
                      className="input1"
                      placeholder="State"
                      value={formData.currentAddress.state}
                      onChange={(e) => handleAddressChange('currentAddress', 'state', e.target.value)}
                    />
                    <input
                      type="text"
                      className="input1"
                      placeholder="City"
                      value={formData.currentAddress.city}
                      onChange={(e) => handleAddressChange('currentAddress', 'city', e.target.value)}
                    />
                    <input
                      type="text"
                      className="input1"
                      placeholder="Postal Code"
                      value={formData.currentAddress.postalCode}
                      onChange={(e) => handleAddressChange('currentAddress', 'postalCode', e.target.value)}
                    />
                  </div>
                </div>

                <div className="permanent-address">
                  <h4>Permanent Address</h4>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.sameAsCurrentAddress}
                      onChange={handleSameAddress}
                    />
                    Same as Current Address
                  </label>
                  {!formData.sameAsCurrentAddress && (
                    <div className="form-group1122">
                      <input
                        type="text"
                        className="input1"
                        placeholder="Address Line 1"
                        value={formData.permanentAddress.line1}
                        onChange={(e) => handleAddressChange('permanentAddress', 'line1', e.target.value)}
                      />
                      <input
                        type="text"
                        className="input1"
                        placeholder="Address Line 2"
                        value={formData.permanentAddress.line2}
                        onChange={(e) => handleAddressChange('permanentAddress', 'line2', e.target.value)}
                      />
                      <div className="address-grid">
                        <select
                          className="input1"
                          value={formData.permanentAddress.country}
                          onChange={(e) => handleAddressChange('permanentAddress', 'country', e.target.value)}
                        >
                          <option value="India">India</option>
                        </select>
                        <input
                          type="text"
                          className="input1"
                          placeholder="State"
                          value={formData.permanentAddress.state}
                          onChange={(e) => handleAddressChange('permanentAddress', 'state', e.target.value)}
                        />
                        <input
                          type="text"
                          className="input1"
                          placeholder="City"
                          value={formData.permanentAddress.city}
                          onChange={(e) => handleAddressChange('permanentAddress', 'city', e.target.value)}
                        />
                        <input
                          type="text"
                          className="input1"
                          placeholder="Postal Code"
                          value={formData.permanentAddress.postalCode}
                          onChange={(e) => handleAddressChange('permanentAddress', 'postalCode', e.target.value)}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
              </div>
              <button type="submit" className="save-btn1122">Save</button>
            </form>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="edit-profile11222">
      <h2>Edit Profile</h2>
      <div className="tabs1122">
        {["Basic Details", "Summary", "Career Journey", "Contacts"].map(
          (tab1122) => (
            <button
              key={tab1122}
              className={activeTab === tab1122 ? "active" : ""}
              onClick={() => setActiveTab(tab1122)}
            >
              {tab1122}
            </button>
          )
        )}
      </div>
      <div className="tab-content1122">{renderContent()}</div>
    </div>
  );
};

export default EditProfile;
import React, { useState } from "react";
import axios from "axios";
import "./admin.css";

const COMMON_ICONS = [
  "SiNextdotjs", "SiReact", "SiJavascript", "SiTypescript", "SiHtml5", "SiCss3", 
  "SiTailwindcss", "SiBootstrap", "SiSass", "SiNodedotjs", "SiExpress", "SiDotnet", 
  "SiLaravel", "SiPhp", "SiPython", "SiDjango", "SiMysql", "SiPostgresql", "SiMongodb", 
  "SiFirebase", "SiDocker", "SiGit", "SiGithub", "SiPostman", "SiFigma", "SiFlutter", "SiDart"
];

const AdminPanel = ({ data, onClose, onSave }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [activeTab, setActiveTab] = useState("hero");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // Form states initialized with database data
  const [formData, setFormData] = useState(JSON.parse(JSON.stringify(data)));

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      const res = await axios.post("/api/login", { password });
      if (res.data.success) {
        setIsLoggedIn(true);
        setToken(res.data.token);
      }
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    }
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      setError(null);
      setSuccess(null);
      const res = await axios.post("/api/portfolio", formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSuccess("Changes saved successfully!");
      onSave(); // Refresh App state
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to save changes");
    } finally {
      setIsSaving(false);
    }
  };

  const handleFileUpload = async (e, type, callback) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileForm = new FormData();
    fileForm.append("file", file);

    try {
      setError(null);
      setSuccess("Uploading file...");
      const res = await axios.post("/api/upload", fileForm, {
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data" 
        }
      });
      callback(res.data.url);
      setSuccess("File uploaded successfully!");
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.response?.data?.error || "File upload failed");
    }
  };

  // Helper change handlers
  const handleHeroChange = (key, value) => {
    setFormData(prev => ({
      ...prev,
      hero: { ...prev.hero, [key]: value }
    }));
  };

  const handleAboutChange = (key, value) => {
    setFormData(prev => ({
      ...prev,
      about: { ...prev.about, [key]: value }
    }));
  };

  const handleContactChange = (key, value) => {
    setFormData(prev => ({
      ...prev,
      contact: { ...prev.contact, [key]: value }
    }));
  };

  const handleAIChatChange = (key, value) => {
    setFormData(prev => ({
      ...prev,
      aiChat: { ...prev.aiChat, [key]: value }
    }));
  };

  // CRUD for Skills
  const handleSkillChange = (catIdx, skillIdx, key, value) => {
    setFormData(prev => {
      const updated = { ...prev };
      updated.skills[catIdx].skills[skillIdx][key] = value;
      return updated;
    });
  };

  const addSkill = (catIdx) => {
    setFormData(prev => {
      const updated = { ...prev };
      updated.skills[catIdx].skills.push({
        name: "New Skill",
        icon: "SiReact",
        level: "Intermediate",
        color: "#61DAFB"
      });
      return updated;
    });
  };

  const deleteSkill = (catIdx, skillIdx) => {
    setFormData(prev => {
      const updated = { ...prev };
      updated.skills[catIdx].skills.splice(skillIdx, 1);
      return updated;
    });
  };

  // CRUD for Qualifications
  const handleQualChange = (type, idx, key, value) => {
    setFormData(prev => {
      const updated = { ...prev };
      updated.qualification[type][idx][key] = value;
      return updated;
    });
  };

  const addQual = (type) => {
    setFormData(prev => {
      const updated = { ...prev };
      updated.qualification[type].unshift({
        title: "New Title",
        subtitle: "Subtitle/Organization",
        detail: "Description details",
        date: "Year - Year",
        start: new Date().toISOString().split("T")[0],
        end: null,
        current: false
      });
      return updated;
    });
  };

  const deleteQual = (type, idx) => {
    setFormData(prev => {
      const updated = { ...prev };
      updated.qualification[type].splice(idx, 1);
      return updated;
    });
  };

  // CRUD for Projects
  const handleProjectChange = (idx, key, value) => {
    setFormData(prev => {
      const updated = { ...prev };
      updated.projects[idx][key] = value;
      return updated;
    });
  };

  const addProject = () => {
    setFormData(prev => {
      const updated = { ...prev };
      const newId = updated.projects.length > 0 ? Math.max(...updated.projects.map(p => p.id)) + 1 : 1;
      updated.projects.unshift({
        id: newId,
        title: "New Project Title",
        description: "Short project summary.",
        longDescription: "Detailed description of the project.",
        images: [],
        category: "Web App",
        tags: ["React"]
      });
      return updated;
    });
  };

  const deleteProject = (idx) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    setFormData(prev => {
      const updated = { ...prev };
      updated.projects.splice(idx, 1);
      return updated;
    });
  };

  const addProjectImage = (projIdx, url) => {
    setFormData(prev => {
      const updated = { ...prev };
      updated.projects[projIdx].images.push(url);
      return updated;
    });
  };

  const removeProjectImage = (projIdx, imgIdx) => {
    setFormData(prev => {
      const updated = { ...prev };
      updated.projects[projIdx].images.splice(imgIdx, 1);
      return updated;
    });
  };

  if (!isLoggedIn) {
    return (
      <div className="admin-modal admin-login">
        <div className="admin-login-box">
          <button className="admin-close-btn" onClick={onClose}>✕</button>
          <h2>CMS Administration Lock</h2>
          <p>Please enter the admin security password to access the panel.</p>
          <form onSubmit={handleLogin}>
            <input 
              type="password" 
              placeholder="Admin Password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoFocus
            />
            {error && <div className="admin-error-msg">{error}</div>}
            <button type="submit" className="button">Access CMS</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-modal">
      <div className="admin-container">
        {/* Sidebar Tabs */}
        <aside className="admin-sidebar">
          <h3>CMS Portfolio</h3>
          <nav className="admin-nav">
            <button className={activeTab === "hero" ? "active" : ""} onClick={() => setActiveTab("hero")}>Hero Intro</button>
            <button className={activeTab === "about" ? "active" : ""} onClick={() => setActiveTab("about")}>About Me</button>
            <button className={activeTab === "skills" ? "active" : ""} onClick={() => setActiveTab("skills")}>Skills Stack</button>
            <button className={activeTab === "qualification" ? "active" : ""} onClick={() => setActiveTab("qualification")}>Career Timeline</button>
            <button className={activeTab === "projects" ? "active" : ""} onClick={() => setActiveTab("projects")}>Projects</button>
            <button className={activeTab === "contact" ? "active" : ""} onClick={() => setActiveTab("contact")}>Contact</button>
            <button className={activeTab === "aichat" ? "active" : ""} onClick={() => setActiveTab("aichat")}>AI Agent</button>
          </nav>
          <div className="admin-sidebar-footer">
            <button onClick={handleSave} className="button admin-save-btn" disabled={isSaving}>
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
            <button onClick={onClose} className="button button--secondary admin-exit-btn">Close Panel</button>
          </div>
        </aside>

        {/* Form Workspaces */}
        <main className="admin-main">
          {error && <div className="admin-status admin-error-msg">{error}</div>}
          {success && <div className="admin-status admin-success-msg">{success}</div>}

          {/* TAB 1: HERO */}
          {activeTab === "hero" && (
            <div className="admin-tab-content">
              <h2>Hero Introduction Section</h2>
              <div className="admin-form-group">
                <label>First Name</label>
                <input type="text" value={formData.hero.name} onChange={e => handleHeroChange("name", e.target.value)} />
              </div>
              <div className="admin-form-group">
                <label>Accent Last Name</label>
                <input type="text" value={formData.hero.accent} onChange={e => handleHeroChange("accent", e.target.value)} />
              </div>
              <div className="admin-form-group">
                <label>Short Pitch Description</label>
                <textarea rows={4} value={formData.hero.description} onChange={e => handleHeroChange("description", e.target.value)} />
              </div>
              <div className="admin-form-row">
                <div className="admin-form-group">
                  <label>Experience Years (e.g. 3+)</label>
                  <input type="text" value={formData.hero.experience} onChange={e => handleHeroChange("experience", e.target.value)} />
                </div>
                <div className="admin-form-group">
                  <label>Projects Completed (e.g. 20+)</label>
                  <input type="text" value={formData.hero.projectsCount} onChange={e => handleHeroChange("projectsCount", e.target.value)} />
                </div>
              </div>
              <div className="admin-form-group">
                <label>Work Status Text</label>
                <input type="text" value={formData.hero.status} onChange={e => handleHeroChange("status", e.target.value)} />
              </div>
              <div className="admin-form-group">
                <label>Roles/Keywords Rotation (comma-separated)</label>
                <input 
                  type="text" 
                  value={formData.hero.roles.join(", ")} 
                  onChange={e => handleHeroChange("roles", e.target.value.split(",").map(r => r.trim()))} 
                />
              </div>
            </div>
          )}

          {/* TAB 2: ABOUT */}
          {activeTab === "about" && (
            <div className="admin-tab-content">
              <h2>About Me Bio</h2>
              <div className="admin-form-group">
                <label>Tag Title</label>
                <input type="text" value={formData.about.tag} onChange={e => handleAboutChange("tag", e.target.value)} />
              </div>
              <div className="admin-form-row">
                <div className="admin-form-group">
                  <label>Title Name</label>
                  <input type="text" value={formData.about.titleName} onChange={e => handleAboutChange("titleName", e.target.value)} />
                </div>
                <div className="admin-form-group">
                  <label>Title Highlight</label>
                  <input type="text" value={formData.about.titleHighlight} onChange={e => handleAboutChange("titleHighlight", e.target.value)} />
                </div>
              </div>
              <div className="admin-form-group">
                <label>Who Am I Text</label>
                <textarea rows={5} value={formData.about.whoami} onChange={e => handleAboutChange("whoami", e.target.value)} />
              </div>
              <div className="admin-form-group">
                <label>Philosophy Motto</label>
                <input type="text" value={formData.about.philosophy} onChange={e => handleAboutChange("philosophy", e.target.value)} />
              </div>
              <div className="admin-form-group">
                <label>Resume File (CV PDF URL)</label>
                <div className="admin-file-upload-row">
                  <input type="text" value={formData.about.resumeUrl} onChange={e => handleAboutChange("resumeUrl", e.target.value)} />
                  <input 
                    type="file" 
                    id="cv-upload" 
                    accept=".pdf" 
                    onChange={e => handleFileUpload(e, "cv", (url) => handleAboutChange("resumeUrl", url))}
                    style={{ display: "none" }}
                  />
                  <label htmlFor="cv-upload" className="button">Upload PDF</label>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SKILLS */}
          {activeTab === "skills" && (
            <div className="admin-tab-content">
              <h2>Technical Capabilities & Stack</h2>
              {formData.skills.map((category, catIdx) => (
                <div key={catIdx} className="admin-skill-category-card">
                  <div className="admin-category-card-header">
                    <h4>{category.title}</h4>
                    <p>{category.description}</p>
                  </div>
                  <div className="admin-skill-items-list">
                    {category.skills.map((skill, skillIdx) => (
                      <div key={skillIdx} className="admin-skill-item-form-row">
                        <input 
                          type="text" 
                          placeholder="Skill Name" 
                          value={skill.name} 
                          onChange={e => handleSkillChange(catIdx, skillIdx, "name", e.target.value)} 
                        />
                        <select 
                          value={skill.icon} 
                          onChange={e => handleSkillChange(catIdx, skillIdx, "icon", e.target.value)}
                        >
                          {COMMON_ICONS.map(icon => <option key={icon} value={icon}>{icon}</option>)}
                        </select>
                        <select 
                          value={skill.level} 
                          onChange={e => handleSkillChange(catIdx, skillIdx, "level", e.target.value)}
                        >
                          <option value="Expert">Expert</option>
                          <option value="Advanced">Advanced</option>
                          <option value="Proficient">Proficient</option>
                          <option value="Intermediate">Intermediate</option>
                        </select>
                        <input 
                          type="color" 
                          value={skill.color} 
                          onChange={e => handleSkillChange(catIdx, skillIdx, "color", e.target.value)} 
                        />
                        <button className="admin-delete-row-btn" onClick={() => deleteSkill(catIdx, skillIdx)}>✕</button>
                      </div>
                    ))}
                    <button className="button button--secondary" onClick={() => addSkill(catIdx)}>+ Add Skill Item</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 4: QUALIFICATIONS */}
          {activeTab === "qualification" && (
            <div className="admin-tab-content">
              <h2>Professional Career Timeline</h2>
              
              <div className="admin-qual-section">
                <div className="admin-qual-section-header">
                  <h3>Work Experience</h3>
                  <button className="button" onClick={() => addQual("experience")}>+ Add Experience Entry</button>
                </div>
                {formData.qualification.experience.map((item, idx) => (
                  <div key={idx} className="admin-qual-card-editor">
                    <div className="admin-qual-card-row">
                      <div className="admin-form-group">
                        <label>Company</label>
                        <input type="text" value={item.title} onChange={e => handleQualChange("experience", idx, "title", e.target.value)} />
                      </div>
                      <div className="admin-form-group">
                        <label>Role</label>
                        <input type="text" value={item.subtitle} onChange={e => handleQualChange("experience", idx, "subtitle", e.target.value)} />
                      </div>
                    </div>
                    <div className="admin-form-group">
                      <label>Details</label>
                      <input type="text" value={item.detail} onChange={e => handleQualChange("experience", idx, "detail", e.target.value)} />
                    </div>
                    <div className="admin-form-row">
                      <div className="admin-form-group">
                        <label>Display Date (e.g. Dec 24 - Present)</label>
                        <input type="text" value={item.date} onChange={e => handleQualChange("experience", idx, "date", e.target.value)} />
                      </div>
                      <div className="admin-form-group">
                        <label>Start Date (YYYY-MM-DD)</label>
                        <input type="text" value={item.start || ""} onChange={e => handleQualChange("experience", idx, "start", e.target.value)} />
                      </div>
                      <div className="admin-form-group">
                        <label>End Date (or blank)</label>
                        <input type="text" value={item.end || ""} onChange={e => handleQualChange("experience", idx, "end", e.target.value)} />
                      </div>
                    </div>
                    <div className="admin-checkbox-group">
                      <input 
                        type="checkbox" 
                        id={`curr-${idx}`} 
                        checked={item.current || false} 
                        onChange={e => handleQualChange("experience", idx, "current", e.target.checked)} 
                      />
                      <label htmlFor={`curr-${idx}`}>Current Position</label>
                    </div>
                    <button className="button button--secondary admin-delete-qual-btn" onClick={() => deleteQual("experience", idx)}>Remove Entry</button>
                  </div>
                ))}
              </div>

              <div className="admin-qual-section">
                <div className="admin-qual-section-header">
                  <h3>Education Timeline</h3>
                  <button className="button" onClick={() => addQual("education")}>+ Add Education Entry</button>
                </div>
                {formData.qualification.education.map((item, idx) => (
                  <div key={idx} className="admin-qual-card-editor">
                    <div className="admin-qual-card-row">
                      <div className="admin-form-group">
                        <label>Institute Name</label>
                        <input type="text" value={item.title} onChange={e => handleQualChange("education", idx, "title", e.target.value)} />
                      </div>
                      <div className="admin-form-group">
                        <label>Degree Name</label>
                        <input type="text" value={item.subtitle} onChange={e => handleQualChange("education", idx, "subtitle", e.target.value)} />
                      </div>
                    </div>
                    <div className="admin-form-group">
                      <label>GPA/Result Detail</label>
                      <input type="text" value={item.detail} onChange={e => handleQualChange("education", idx, "detail", e.target.value)} />
                    </div>
                    <div className="admin-form-row">
                      <div className="admin-form-group">
                        <label>Display Date (e.g. 2020 - 2024)</label>
                        <input type="text" value={item.date} onChange={e => handleQualChange("education", idx, "date", e.target.value)} />
                      </div>
                      <div className="admin-form-group">
                        <label>Start Date (YYYY-MM-DD)</label>
                        <input type="text" value={item.start || ""} onChange={e => handleQualChange("education", idx, "start", e.target.value)} />
                      </div>
                    </div>
                    <button className="button button--secondary admin-delete-qual-btn" onClick={() => deleteQual("education", idx)}>Remove Entry</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: PROJECTS */}
          {activeTab === "projects" && (
            <div className="admin-tab-content">
              <div className="admin-qual-section-header">
                <h2>Project Portfolio Management</h2>
                <button className="button" onClick={addProject}>+ Create Project</button>
              </div>

              {formData.projects.map((project, idx) => (
                <div key={project.id} className="admin-project-editor-card">
                  <div className="admin-category-card-header">
                    <h4>{project.title}</h4>
                    <span className="project-badge">{project.category}</span>
                  </div>
                  
                  <div className="admin-form-group">
                    <label>Project Name</label>
                    <input type="text" value={project.title} onChange={e => handleProjectChange(idx, "title", e.target.value)} />
                  </div>
                  
                  <div className="admin-form-group">
                    <label>Short Description (for grid card)</label>
                    <input type="text" value={project.description} onChange={e => handleProjectChange(idx, "description", e.target.value)} />
                  </div>

                  <div className="admin-form-group">
                    <label>Detailed Specifications (Markdown/Text in Modal)</label>
                    <textarea rows={4} value={project.longDescription || ""} onChange={e => handleProjectChange(idx, "longDescription", e.target.value)} />
                  </div>

                  <div className="admin-form-row">
                    <div className="admin-form-group">
                      <label>Platform Category</label>
                      <select value={project.category} onChange={e => handleProjectChange(idx, "category", e.target.value)}>
                        <option value="Web App">Web App</option>
                        <option value="Website">Website</option>
                        <option value="Flutter">Flutter</option>
                        <option value="AI">AI</option>
                        <option value="AI + Web App">AI + Web App</option>
                        <option value="AI + Flutter">AI + Flutter</option>
                      </select>
                    </div>
                    <div className="admin-form-group">
                      <label>Production Live Link</label>
                      <input type="text" value={project.link || ""} onChange={e => handleProjectChange(idx, "link", e.target.value)} />
                    </div>
                  </div>

                  <div className="admin-form-group">
                    <label>Tags / Tech Keywords (comma-separated)</label>
                    <input 
                      type="text" 
                      value={project.tags ? project.tags.join(", ") : ""} 
                      onChange={e => handleProjectChange(idx, "tags", e.target.value.split(",").map(t => t.trim()))} 
                    />
                  </div>

                  {/* Project image gallery editor */}
                  <div className="admin-project-gallery-editor">
                    <label>Project Screenshots</label>
                    <div className="admin-gallery-thumbnails">
                      {project.images && project.images.map((img, imgIdx) => (
                        <div key={imgIdx} className="admin-thumb-box">
                          <img src={img} alt="" />
                          <button className="admin-thumb-delete" onClick={() => removeProjectImage(idx, imgIdx)}>✕</button>
                        </div>
                      ))}
                      <div className="admin-thumb-upload-btn">
                        <input 
                          type="file" 
                          id={`img-upload-${idx}`} 
                          accept="image/*" 
                          onChange={e => handleFileUpload(e, "image", (url) => addProjectImage(idx, url))}
                          style={{ display: "none" }}
                        />
                        <label htmlFor={`img-upload-${idx}`}>+ Upload Screenshot</label>
                      </div>
                    </div>
                  </div>

                  <button className="button button--secondary admin-delete-qual-btn" onClick={() => deleteProject(idx)}>Delete Project</button>
                </div>
              ))}
            </div>
          )}

          {/* TAB 6: CONTACTS */}
          {activeTab === "contact" && (
            <div className="admin-tab-content">
              <h2>Contact Methods & Keys</h2>
              <div className="admin-form-group">
                <label>Primary Email Address</label>
                <input type="email" value={formData.contact.email} onChange={e => handleContactChange("email", e.target.value)} />
              </div>
              <div className="admin-form-group">
                <label>WhatsApp Number (text style)</label>
                <input type="text" value={formData.contact.whatsapp} onChange={e => handleContactChange("whatsapp", e.target.value)} />
              </div>
              <div className="admin-form-group">
                <label>WhatsApp API Link URL</label>
                <input type="text" value={formData.contact.whatsappLink} onChange={e => handleContactChange("whatsappLink", e.target.value)} />
              </div>
              <div className="admin-form-group">
                <label>LinkedIn Full Name</label>
                <input type="text" value={formData.contact.linkedin} onChange={e => handleContactChange("linkedin", e.target.value)} />
              </div>
              <div className="admin-form-group">
                <label>LinkedIn Profile Link URL</label>
                <input type="text" value={formData.contact.linkedinLink} onChange={e => handleContactChange("linkedinLink", e.target.value)} />
              </div>
              
              <h3 className="admin-subheading">EmailJS Direct Form Configuration</h3>
              <div className="admin-form-row">
                <div className="admin-form-group">
                  <label>EmailJS Service ID</label>
                  <input type="text" value={formData.contact.emailjsServiceId} onChange={e => handleContactChange("emailjsServiceId", e.target.value)} />
                </div>
                <div className="admin-form-group">
                  <label>EmailJS Template ID</label>
                  <input type="text" value={formData.contact.emailjsTemplateId} onChange={e => handleContactChange("emailjsTemplateId", e.target.value)} />
                </div>
              </div>
              <div className="admin-form-group">
                <label>EmailJS Public Key</label>
                <input type="text" value={formData.contact.emailjsPublicKey} onChange={e => handleContactChange("emailjsPublicKey", e.target.value)} />
              </div>
            </div>
          )}

          {/* TAB 7: AI CHAT */}
          {activeTab === "aichat" && (
            <div className="admin-tab-content">
              <h2>AI Assistant Bot Customization</h2>
              <div className="admin-form-group">
                <label>Default Welcome Greeting Bubble</label>
                <input type="text" value={formData.aiChat.welcomeMessage} onChange={e => handleAIChatChange("welcomeMessage", e.target.value)} />
              </div>
              
              <div className="admin-form-group">
                <label>Suggested Quick Questions (one per line)</label>
                <textarea 
                  rows={4} 
                  value={formData.aiChat.quickQuestions.join("\n")} 
                  onChange={e => handleAIChatChange("quickQuestions", e.target.value.split("\n").filter(Boolean))} 
                />
              </div>

              <h3 className="admin-subheading">Keyword Responses Table</h3>
              <p className="admin-form-hint">When user inputs contain any of these keywords, the bot fires the configured response. "default" keyword matches other queries.</p>
              
              {formData.aiChat.qna.map((qnaItem, idx) => (
                <div key={idx} className="admin-qna-row-editor">
                  <div className="admin-form-group">
                    <label>Keyword Trigger</label>
                    <input 
                      type="text" 
                      value={qnaItem.keyword} 
                      disabled={qnaItem.keyword === "default"}
                      onChange={e => {
                        const updated = [...formData.aiChat.qna];
                        updated[idx].keyword = e.target.value;
                        handleAIChatChange("qna", updated);
                      }} 
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>AI Answer Bubble</label>
                    <textarea 
                      rows={2} 
                      value={qnaItem.response} 
                      onChange={e => {
                        const updated = [...formData.aiChat.qna];
                        updated[idx].response = e.target.value;
                        handleAIChatChange("qna", updated);
                      }} 
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;

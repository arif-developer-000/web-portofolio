import { useState, useEffect } from 'react';
import { auth, db } from '../firebase/firebaseConfig';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { FiFolder, FiBriefcase, FiCode, FiMail, FiLink, FiPlus, FiEdit, FiTrash2, FiLogOut, FiAward } from 'react-icons/fi';

const AdminPage = () => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [contactLinks, setContactLinks] = useState([]);
  const [activeTab, setActiveTab] = useState('projects');
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showExperienceForm, setShowExperienceForm] = useState(false);
  const [showCertificateForm, setShowCertificateForm] = useState(false);
  const [showContactLinkForm, setShowContactLinkForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [editingExperience, setEditingExperience] = useState(null);
  const [editingCertificate, setEditingCertificate] = useState(null);
  const [editingContactLink, setEditingContactLink] = useState(null);
  const [newSkill, setNewSkill] = useState('');
  const [contactLinkForm, setContactLinkForm] = useState({ label: '', href: '', icon: 'github' });
  const [certificateForm, setCertificateForm] = useState({ name: '', duration: '', link: '', image: '' });
  const [dataLoading, setDataLoading] = useState(false);
  const [projectForm, setProjectForm] = useState({ name: '', description: '', technologies: '', demo: '', github: '' });
  const [experienceForm, setExperienceForm] = useState({ position: '', company: '', duration: '', description: '', logo: '' });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setAuthLoading(false);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user]);

  const loadData = async () => {
    setDataLoading(true);
    try {
      const projectsSnap = await getDocs(collection(db, 'projects'));
      setProjects(projectsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

      const skillsSnap = await getDocs(collection(db, 'skills'));
      setSkills(skillsSnap.docs.map(doc => doc.data().name));

      const experiencesSnap = await getDocs(collection(db, 'experiences'));
      setExperiences(experiencesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

      const certificatesSnap = await getDocs(collection(db, 'certificates'));
      setCertificates(certificatesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

      const contactsSnap = await getDocs(collection(db, 'contacts'));
      setContacts(contactsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

      const contactLinksSnap = await getDocs(collection(db, 'contactLinks'));
      setContactLinks(contactLinksSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error('Error loading data:', error);
    }
    setDataLoading(false);
  };

  const handleEmailSignIn = async () => {
    if (!email || !password) {
      alert('Masukkan email dan password.');
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error('Error signing in:', error);
      if (error.code === 'auth/user-not-found') {
        alert('Email tidak ditemukan di Authentication.');
      } else if (error.code === 'auth/wrong-password') {
        alert('Password salah.');
      } else if (error.code === 'auth/invalid-email') {
        alert('Format email tidak valid.');
      } else {
        alert('Error signing in: ' + error.message);
      }
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  const saveProject = async (project) => {
    try {
      if (editingProject?.id) {
        await updateDoc(doc(db, 'projects', editingProject.id), project);
        setProjects(projects.map(p => p.id === editingProject.id ? { ...project, id: editingProject.id } : p));
      } else {
        const docRef = await addDoc(collection(db, 'projects'), project);
        setProjects([...projects, { ...project, id: docRef.id }]);
      }
      setShowProjectForm(false);
      setEditingProject(null);
    } catch (error) {
      console.error('Error saving project:', error);
    }
  };

  const deleteProject = async (id) => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteDoc(doc(db, 'projects', id));
        setProjects(projects.filter(p => p.id !== id));
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    }
  };

  const saveExperience = async (experience) => {
    try {
      if (editingExperience?.id) {
        await updateDoc(doc(db, 'experiences', editingExperience.id), experience);
        setExperiences(experiences.map(e => e.id === editingExperience.id ? { ...experience, id: editingExperience.id } : e));
      } else {
        const docRef = await addDoc(collection(db, 'experiences'), experience);
        setExperiences([...experiences, { ...experience, id: docRef.id }]);
      }
      setShowExperienceForm(false);
      setEditingExperience(null);
    } catch (error) {
      console.error('Error saving experience:', error);
    }
  };

  const deleteExperience = async (id) => {
    if (confirm('Are you sure you want to delete this experience?')) {
      try {
        await deleteDoc(doc(db, 'experiences', id));
        setExperiences(experiences.filter(e => e.id !== id));
      } catch (error) {
        console.error('Error deleting experience:', error);
      }
    }
  };

  const saveCertificate = async (certificate) => {
    try {
      if (editingCertificate?.id) {
        await updateDoc(doc(db, 'certificates', editingCertificate.id), certificate);
        setCertificates(certificates.map(c => c.id === editingCertificate.id ? { ...certificate, id: editingCertificate.id } : c));
      } else {
        const docRef = await addDoc(collection(db, 'certificates'), certificate);
        setCertificates([...certificates, { ...certificate, id: docRef.id }]);
      }
      setShowCertificateForm(false);
      setEditingCertificate(null);
    } catch (error) {
      console.error('Error saving certificate:', error);
    }
  };

  const deleteCertificate = async (id) => {
    if (confirm('Are you sure you want to delete this certificate?')) {
      try {
        await deleteDoc(doc(db, 'certificates', id));
        setCertificates(certificates.filter(c => c.id !== id));
      } catch (error) {
        console.error('Error deleting certificate:', error);
      }
    }
  };

  const handleCertificateFormChange = (e) => {
    setCertificateForm({ ...certificateForm, [e.target.name]: e.target.value });
  };

  const handleCertificateImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCertificateForm({ ...certificateForm, image: event.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const openCertificateForm = (certificate = null) => {
    if (certificate) {
      setCertificateForm({
        name: certificate.name || '',
        duration: certificate.duration || '',
        link: certificate.link || '',
        image: certificate.image || ''
      });
      setEditingCertificate(certificate);
    } else {
      setCertificateForm({ name: '', duration: '', link: '', image: '' });
      setEditingCertificate(null);
    }
    setShowCertificateForm(true);
  };

  const submitCertificateForm = async (e) => {
    e.preventDefault();
    await saveCertificate(certificateForm);
    setShowCertificateForm(false);
  };

  const addSkill = async () => {
    if (newSkill.trim()) {
      try {
        await addDoc(collection(db, 'skills'), { name: newSkill.trim() });
        setSkills([...skills, newSkill.trim()]);
        setNewSkill('');
      } catch (error) {
        console.error('Error adding skill:', error);
      }
    }
  };

  const deleteSkill = async (skillName) => {
    if (confirm('Are you sure you want to delete this skill?')) {
      try {
        const skillDoc = (await getDocs(collection(db, 'skills'))).docs.find(doc => doc.data().name === skillName);
        if (skillDoc) {
          await deleteDoc(doc(db, 'skills', skillDoc.id));
          setSkills(skills.filter(s => s !== skillName));
        }
      } catch (error) {
        console.error('Error deleting skill:', error);
      }
    }
  };

  const deleteContact = async (id) => {
    if (confirm('Are you sure you want to delete this contact message?')) {
      try {
        await deleteDoc(doc(db, 'contacts', id));
        setContacts(contacts.filter(c => c.id !== id));
      } catch (error) {
        console.error('Error deleting contact:', error);
      }
    }
  };

  const handleProjectFormChange = (e) => {
    setProjectForm({ ...projectForm, [e.target.name]: e.target.value });
  };

  const handleContactLinkFormChange = (e) => {
    setContactLinkForm({ ...contactLinkForm, [e.target.name]: e.target.value });
  };

  const openContactLinkForm = (link = null) => {
    if (link) {
      setContactLinkForm({ label: link.label || '', href: link.href || '', icon: link.icon || 'github' });
      setEditingContactLink(link);
    } else {
      setContactLinkForm({ label: '', href: '', icon: 'github' });
      setEditingContactLink(null);
    }
    setShowContactLinkForm(true);
  };

  const saveContactLink = async (link) => {
    try {
      if (editingContactLink?.id) {
        await updateDoc(doc(db, 'contactLinks', editingContactLink.id), link);
        setContactLinks(contactLinks.map(item => item.id === editingContactLink.id ? { ...item, ...link } : item));
      } else {
        const docRef = await addDoc(collection(db, 'contactLinks'), link);
        setContactLinks([...contactLinks, { ...link, id: docRef.id }]);
      }
    } catch (error) {
      console.error('Error saving contact link:', error);
    }
  };

  const deleteContactLink = async (id) => {
    if (confirm('Are you sure you want to delete this contact link?')) {
      try {
        await deleteDoc(doc(db, 'contactLinks', id));
        setContactLinks(contactLinks.filter(link => link.id !== id));
      } catch (error) {
        console.error('Error deleting contact link:', error);
      }
    }
  };

  const submitContactLinkForm = async (e) => {
    e.preventDefault();
    await saveContactLink(contactLinkForm);
    setShowContactLinkForm(false);
  };

  const handleExperienceFormChange = (e) => {
    setExperienceForm({ ...experienceForm, [e.target.name]: e.target.value });
  };

  const openProjectForm = (project = null) => {
    if (project) {
      setProjectForm({
        name: project.name || '',
        description: project.description || '',
        technologies: project.technologies ? project.technologies.join(', ') : '',
        demo: project.demo || '',
        github: project.github || ''
      });
      setEditingProject(project);
    } else {
      setProjectForm({ name: '', description: '', technologies: '', demo: '', github: '' });
      setEditingProject(null);
    }
    setShowProjectForm(true);
  };

  const openExperienceForm = (experience = null) => {
    if (experience) {
      setExperienceForm({
        position: experience.position || '',
        company: experience.company || '',
        duration: experience.duration || '',
        description: experience.description || '',
        logo: experience.logo || ''
      });
      setEditingExperience(experience);
    } else {
      setExperienceForm({ position: '', company: '', duration: '', description: '', logo: '' });
      setEditingExperience(null);
    }
    setShowExperienceForm(true);
  };

  const submitProjectForm = async (e) => {
    e.preventDefault();
    const projectData = {
      ...projectForm,
      technologies: projectForm.technologies.split(',').map(tech => tech.trim()).filter(tech => tech)
    };
    await saveProject(projectData);
    setShowProjectForm(false);
  };

  const submitExperienceForm = async (e) => {
    e.preventDefault();
    await saveExperience(experienceForm);
    setShowExperienceForm(false);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600 mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
        <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl w-full max-w-md mx-4">
          <h2 className="text-2xl font-bold text-center mb-2 text-slate-900 dark:text-slate-100">Admin Login</h2>
          <p className="text-center text-slate-600 dark:text-slate-400 mb-6">Masukkan email dan password yang terdaftar di Firebase Authentication.</p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@example.com"
            className="w-full mb-4 p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full mb-4 p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          />
          <button
            onClick={handleEmailSignIn}
            disabled={loading}
            className="w-full bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-3 rounded-lg font-semibold transition-all disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Login'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 text-slate-900 dark:text-slate-100">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">Admin Dashboard</h1>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors self-start sm:self-auto">
            <FiLogOut className="w-4 h-4" />
            Logout
          </button>
        </div>

        <div className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 rounded-2xl shadow-xl p-6 mb-8 border border-slate-200 dark:border-slate-700">
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setActiveTab('projects')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                activeTab === 'projects' ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600 hover:shadow-md'
              }`}
            >
              <FiFolder className="w-4 h-4" />
              Projects
            </button>
            <button
              onClick={() => setActiveTab('experiences')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                activeTab === 'experiences' ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600 hover:shadow-md'
              }`}
            >
              <FiBriefcase className="w-4 h-4" />
              Experiences
            </button>
            <button
              onClick={() => setActiveTab('skills')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                activeTab === 'skills' ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600 hover:shadow-md'
              }`}
            >
              <FiCode className="w-4 h-4" />
              Skills
            </button>
            <button
              onClick={() => setActiveTab('contactLinks')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                activeTab === 'contactLinks' ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600 hover:shadow-md'
              }`}
            >
              <FiLink className="w-4 h-4" />
              Contact Links
            </button>
            <button
              onClick={() => setActiveTab('certificates')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                activeTab === 'certificates' ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600 hover:shadow-md'
              }`}
            >
              <FiAward className="w-4 h-4" />
              Certificates
            </button>
            <button
              onClick={() => setActiveTab('contacts')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                activeTab === 'contacts' ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600 hover:shadow-md'
              }`}
            >
              <FiMail className="w-4 h-4" />
              Contacts ({contacts.length})
            </button>
          </div>

          {dataLoading ? (
            <div className="text-center py-8">Loading...</div>
          ) : (
            <>
              {activeTab === 'projects' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold">Manage Projects</h2>
                    <button
                      onClick={() => openProjectForm()}
                      className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-4 py-2 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl"
                    >
                      <FiPlus className="w-4 h-4" />
                      Add Project
                    </button>
                  </div>
                  <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {projects.map(project => (
                      <div key={project.id} className="bg-slate-50 dark:bg-slate-700 p-4 rounded-xl shadow-md">
                        <h3 className="text-lg font-semibold mb-2">{project.name}</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">{project.description}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-500 mb-4">Tech: {project.technologies?.join(', ')}</p>
                        <div className="flex gap-2">
                          <button
                            onClick={() => openProjectForm(project)}
                            className="flex items-center gap-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-3 py-1 rounded text-sm transition-all shadow-md hover:shadow-lg"
                          >
                            <FiEdit className="w-3 h-3" />
                            Edit
                          </button>
                          <button
                            onClick={() => deleteProject(project.id)}
                            className="flex items-center gap-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-3 py-1 rounded text-sm transition-all shadow-md hover:shadow-lg"
                          >
                            <FiTrash2 className="w-3 h-3" />
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'experiences' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold">Manage Experiences</h2>
                    <button
                      onClick={() => openExperienceForm()}
                      className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-4 py-2 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl"
                    >
                      <FiPlus className="w-4 h-4" />
                      Add Experience
                    </button>
                  </div>
                  <div className="grid gap-6 md:grid-cols-2">
                    {experiences.map(experience => (
                      <div key={experience.id} className="bg-slate-50 dark:bg-slate-700 p-4 rounded-xl shadow-md">
                        <div className="flex items-start gap-4">
                          {experience.logo && (
                            <img src={experience.logo} alt={experience.company} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                          )}
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold">{experience.position}</h3>
                            <p className="text-cyan-600 dark:text-cyan-400">{experience.company}</p>
                            <p className="text-sm text-slate-600 dark:text-slate-400">{experience.duration}</p>
                            <p className="text-sm text-slate-700 dark:text-slate-300 mt-2">{experience.description}</p>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-4">
                          <button
                            onClick={() => openExperienceForm(experience)}
                            className="flex items-center gap-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-3 py-1 rounded text-sm transition-all shadow-md hover:shadow-lg"
                          >
                            <FiEdit className="w-3 h-3" />
                            Edit
                          </button>
                          <button
                            onClick={() => deleteExperience(experience.id)}
                            className="flex items-center gap-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-3 py-1 rounded text-sm transition-all shadow-md hover:shadow-lg"
                          >
                            <FiTrash2 className="w-3 h-3" />
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'skills' && (
                <div>
                  <h2 className="text-2xl font-semibold mb-6">Manage Skills</h2>
                  <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <input
                      type="text"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      placeholder="New Skill"
                      className="flex-1 p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    />
                    <button
                      onClick={addSkill}
                      className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl"
                    >
                      <FiPlus className="w-4 h-4" />
                      Add Skill
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {skills.map(skill => (
                      <div key={skill} className="bg-slate-200 dark:bg-slate-600 px-4 py-2 rounded-lg flex items-center gap-2">
                        <span>{skill}</span>
                        <button
                          onClick={() => deleteSkill(skill)}
                          className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 font-bold"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'contactLinks' && (
                <div>
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-semibold">Manage Contact Links</h2>
                      <p className="mt-2 text-slate-600 dark:text-slate-400">Edit URL WhatsApp, Instagram, Email, dan link lain tanpa mengubah coding.</p>
                    </div>
                    <button
                      onClick={() => openContactLinkForm()}
                      className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-4 py-2 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl"
                    >
                      <FiPlus className="w-4 h-4" />
                      Add Link
                    </button>
                  </div>

                  {contactLinks.length === 0 ? (
                    <div className="rounded-3xl border border-dashed border-slate-300 dark:border-slate-700/60 bg-slate-50 dark:bg-slate-800/70 p-8 text-center text-slate-600 dark:text-slate-400">
                      Tidak ada contact link. Tambahkan link baru untuk mengisi bagian Contact.
                    </div>
                  ) : (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {contactLinks.map(link => (
                        <div key={link.id} className="rounded-3xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/90 p-5 shadow-sm">
                          <div className="flex items-center justify-between gap-4 mb-4">
                            <div>
                              <p className="text-sm uppercase tracking-[0.24em] text-cyan-700 dark:text-cyan-300">{link.label}</p>
                              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 break-words">{link.href}</p>
                            </div>
                            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-600 text-white">
                              {link.icon === 'instagram' ? 'IG' : link.icon === 'whatsapp' ? 'WA' : link.icon === 'mail' ? '✉' : link.icon === 'github' ? 'GH' : 'LN'}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <button
                              onClick={() => openContactLinkForm(link)}
                              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-3 py-2 rounded-lg text-sm transition-all shadow-md hover:shadow-lg"
                            >
                              <FiEdit className="w-3 h-3" />
                              Edit
                            </button>
                            <button
                              onClick={() => deleteContactLink(link.id)}
                              className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-3 py-2 rounded-lg text-sm transition-all shadow-md hover:shadow-lg"
                            >
                              <FiTrash2 className="w-3 h-3" />
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'certificates' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold">Manage Certificates</h2>
                    <button
                      onClick={() => openCertificateForm()}
                      className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-4 py-2 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl"
                    >
                      <FiPlus className="w-4 h-4" />
                      Add Certificate
                    </button>
                  </div>
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {certificates.map(certificate => (
                      <div key={certificate.id} className="bg-slate-50 dark:bg-slate-700 p-4 rounded-xl shadow-md overflow-hidden">
                        {certificate.image && (
                          <div className="mb-4 h-40 overflow-hidden rounded-lg">
                            <img src={certificate.image} alt={certificate.name} className="w-full h-full object-cover" />
                          </div>
                        )}
                        <h3 className="text-lg font-semibold mb-1">{certificate.name}</h3>
                        {certificate.duration && (
                          <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">{certificate.duration}</p>
                        )}
                        {certificate.link && (
                          <p className="text-xs text-cyan-600 dark:text-cyan-400 mb-3 break-words">
                            <a href={certificate.link} target="_blank" rel="noreferrer" className="hover:underline">
                              {certificate.link}
                            </a>
                          </p>
                        )}
                        <div className="flex gap-2">
                          <button
                            onClick={() => openCertificateForm(certificate)}
                            className="flex items-center gap-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-3 py-1 rounded text-sm transition-all shadow-md hover:shadow-lg"
                          >
                            <FiEdit className="w-3 h-3" />
                            Edit
                          </button>
                          <button
                            onClick={() => deleteCertificate(certificate.id)}
                            className="flex items-center gap-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-3 py-1 rounded text-sm transition-all shadow-md hover:shadow-lg"
                          >
                            <FiTrash2 className="w-3 h-3" />
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'contacts' && (
                <div>
                  <h2 className="text-2xl font-semibold mb-6">Contact Messages</h2>
                  {contacts.length === 0 ? (
                    <p className="text-center text-slate-600 dark:text-slate-400 py-8">No contact messages yet.</p>
                  ) : (
                    <div className="space-y-4">
                      {contacts.map(contact => (
                        <div key={contact.id} className="bg-slate-50 dark:bg-slate-700 p-4 rounded-xl shadow-md">
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                            <div>
                              <p className="text-xs text-slate-500 dark:text-slate-400 uppercase font-semibold">Name</p>
                              <p className="text-slate-900 dark:text-slate-100 font-semibold">{contact.name}</p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-500 dark:text-slate-400 uppercase font-semibold">Email</p>
                              <p className="text-slate-900 dark:text-slate-100">
                                <a href={`mailto:${contact.email}`} className="text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300">
                                  {contact.email}
                                </a>
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-500 dark:text-slate-400 uppercase font-semibold">Date</p>
                              <p className="text-slate-900 dark:text-slate-100 text-sm">
                                {contact.createdAt ? new Date(contact.createdAt.toDate()).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'N/A'}
                              </p>
                            </div>
                          </div>
                          <div className="bg-white dark:bg-slate-800 p-3 rounded-lg mb-4">
                            <p className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap break-words">{contact.message}</p>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => deleteContact(contact.id)}
                              className="flex items-center gap-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-3 py-1 rounded text-sm transition-all shadow-md hover:shadow-lg"
                            >
                              <FiTrash2 className="w-3 h-3" />
                              Delete
                            </button>
                            <a
                              href={`mailto:${contact.email}`}
                              className="flex items-center gap-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-3 py-1 rounded text-sm transition-all shadow-md hover:shadow-lg"
                            >
                              Reply
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>

        {/* Contact Link Form Modal */}
        {showContactLinkForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                  {editingContactLink ? 'Edit Contact Link' : 'Add New Contact Link'}
                </h3>
              </div>
              <form onSubmit={submitContactLinkForm} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">Label</label>
                  <input
                    type="text"
                    name="label"
                    value={contactLinkForm.label}
                    onChange={handleContactLinkFormChange}
                    className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    placeholder="Instagram"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">URL</label>
                  <input
                    type="url"
                    name="href"
                    value={contactLinkForm.href}
                    onChange={handleContactLinkFormChange}
                    className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    placeholder="https://instagram.com/username"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">Icon</label>
                  <select
                    name="icon"
                    value={contactLinkForm.icon}
                    onChange={handleContactLinkFormChange}
                    className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  >
                    <option value="github">GitHub</option>
                    <option value="linkedin">LinkedIn</option>
                    <option value="instagram">Instagram</option>
                    <option value="whatsapp">WhatsApp</option>
                    <option value="mail">Email</option>
                    <option value="website">Website</option>
                  </select>
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                  >
                    {editingContactLink ? 'Update Link' : 'Add Link'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowContactLinkForm(false)}
                    className="bg-slate-600 hover:bg-slate-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Project Form Modal */}
        {showProjectForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                  {editingProject ? 'Edit Project' : 'Add New Project'}
                </h3>
              </div>
              <form onSubmit={submitProjectForm} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">Project Name</label>
                  <input
                    type="text"
                    name="name"
                    value={projectForm.name}
                    onChange={handleProjectFormChange}
                    className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">Description</label>
                  <textarea
                    name="description"
                    value={projectForm.description}
                    onChange={handleProjectFormChange}
                    rows="3"
                    className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">Technologies (comma separated)</label>
                  <input
                    type="text"
                    name="technologies"
                    value={projectForm.technologies}
                    onChange={handleProjectFormChange}
                    placeholder="React, Node.js, Firebase"
                    className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">Demo URL</label>
                  <input
                    type="url"
                    name="demo"
                    value={projectForm.demo}
                    onChange={handleProjectFormChange}
                    placeholder="https://demo.example.com"
                    className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">GitHub URL</label>
                  <input
                    type="url"
                    name="github"
                    value={projectForm.github}
                    onChange={handleProjectFormChange}
                    placeholder="https://github.com/username/repo"
                    className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                  >
                    {editingProject ? 'Update Project' : 'Add Project'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowProjectForm(false)}
                    className="bg-slate-600 hover:bg-slate-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Experience Form Modal */}
        {showExperienceForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                  {editingExperience ? 'Edit Experience' : 'Add New Experience'}
                </h3>
              </div>
              <form onSubmit={submitExperienceForm} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">Position</label>
                  <input
                    type="text"
                    name="position"
                    value={experienceForm.position}
                    onChange={handleExperienceFormChange}
                    placeholder="Developer"
                    className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">Company</label>
                  <input
                    type="text"
                    name="company"
                    value={experienceForm.company}
                    onChange={handleExperienceFormChange}
                    placeholder="Company Name"
                    className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">Duration</label>
                  <input
                    type="text"
                    name="duration"
                    value={experienceForm.duration}
                    onChange={handleExperienceFormChange}
                    placeholder="Jan 2020 - Dec 2022"
                    className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">Description</label>
                  <textarea
                    name="description"
                    value={experienceForm.description}
                    onChange={handleExperienceFormChange}
                    rows="3"
                    placeholder="Describe your role and achievements..."
                    className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">Logo URL (optional)</label>
                  <input
                    type="url"
                    name="logo"
                    value={experienceForm.logo}
                    onChange={handleExperienceFormChange}
                    placeholder="https://example.com/logo.png"
                    className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                  >
                    {editingExperience ? 'Update Experience' : 'Add Experience'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowExperienceForm(false)}
                    className="bg-slate-600 hover:bg-slate-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Certificate Form Modal */}
        {showCertificateForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                  {editingCertificate ? 'Edit Certificate' : 'Add New Certificate'}
                </h3>
              </div>
              <form onSubmit={submitCertificateForm} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">Certificate Name</label>
                  <input
                    type="text"
                    name="name"
                    value={certificateForm.name}
                    onChange={handleCertificateFormChange}
                    placeholder="e.g., AWS Certified Developer"
                    className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">Duration</label>
                  <input
                    type="text"
                    name="duration"
                    value={certificateForm.duration}
                    onChange={handleCertificateFormChange}
                    placeholder="e.g., Jun 2023 - Present"
                    className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">Link URL (optional)</label>
                  <input
                    type="url"
                    name="link"
                    value={certificateForm.link}
                    onChange={handleCertificateFormChange}
                    placeholder="https://credentials.example.com/verify"
                    className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">Certificate Image (optional)</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleCertificateImageUpload}
                    className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  />
                  {certificateForm.image && (
                    <div className="mt-3">
                      <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">Preview:</p>
                      <img src={certificateForm.image} alt="Certificate preview" className="h-32 object-cover rounded-lg" />
                    </div>
                  )}
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                  >
                    {editingCertificate ? 'Update Certificate' : 'Add Certificate'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCertificateForm(false)}
                    className="bg-slate-600 hover:bg-slate-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const ProjectForm = ({ project, onSave, onCancel }) => {
  const [form, setForm] = useState(project || {});

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'technologies') {
      setForm({ ...form, [name]: value.split(',').map(t => t.trim()) });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl font-semibold mb-4">{project?.id ? 'Edit Project' : 'Add Project'}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            value={form.name || ''}
            onChange={handleChange}
            placeholder="Project Name"
            className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            required
          />
          <textarea
            name="description"
            value={form.description || ''}
            onChange={handleChange}
            placeholder="Description"
            rows="3"
            className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            required
          />
          <input
            name="technologies"
            value={form.technologies?.join(', ') || ''}
            onChange={handleChange}
            placeholder="Technologies (comma separated)"
            className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          />
          <input
            name="image"
            value={form.image || ''}
            onChange={handleChange}
            placeholder="Image URL"
            className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          />
          <input
            name="demo"
            value={form.demo || ''}
            onChange={handleChange}
            placeholder="Demo URL"
            className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          />
          <input
            name="github"
            value={form.github || ''}
            onChange={handleChange}
            placeholder="GitHub URL"
            className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          />
          <div className="flex gap-4">
            <button type="submit" className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
              Save
            </button>
            <button type="button" onClick={onCancel} className="bg-slate-600 hover:bg-slate-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ExperienceForm = ({ experience, onSave, onCancel }) => {
  const [form, setForm] = useState(experience || {});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl font-semibold mb-4">{experience?.id ? 'Edit Experience' : 'Add Experience'}</h3>

        {/* Preview */}
        <div className="mb-6 p-4 bg-slate-50 dark:bg-slate-700 rounded-xl">
          <h4 className="text-lg font-semibold mb-3">Preview</h4>
          <div className="flex items-start gap-4 p-4 bg-white dark:bg-slate-800 rounded-lg">
            {form.logo && (
              <img src={form.logo} alt={form.company || 'Company'} className="w-12 h-12 rounded-lg object-contain bg-slate-100 dark:bg-slate-600 p-1 flex-shrink-0" />
            )}
            <div className="flex-1">
              <h4 className="font-semibold text-slate-900 dark:text-slate-100">{form.position || 'Position'}</h4>
              <p className="text-cyan-600 dark:text-cyan-400 font-medium">{form.company || 'Company'}</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">{form.duration || 'Duration'}</p>
              <p className="text-sm text-slate-700 dark:text-slate-300 mt-2">{form.description || 'Description'}</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="company"
            value={form.company || ''}
            onChange={handleChange}
            placeholder="Company Name"
            className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            required
          />
          <input
            name="position"
            value={form.position || ''}
            onChange={handleChange}
            placeholder="Position/Role"
            className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            required
          />
          <input
            name="duration"
            value={form.duration || ''}
            onChange={handleChange}
            placeholder="Duration (e.g., Jan 2020 - Dec 2022)"
            className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            required
          />
          <textarea
            name="description"
            value={form.description || ''}
            onChange={handleChange}
            placeholder="Description"
            rows="3"
            className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            required
          />
          <input
            name="logo"
            value={form.logo || ''}
            onChange={handleChange}
            placeholder="Company Logo URL"
            className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          />
          <div className="flex gap-4">
            <button type="submit" className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
              Save
            </button>
            <button type="button" onClick={onCancel} className="bg-slate-600 hover:bg-slate-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminPage;
import { reactive } from "vue";
import type { ResumeData } from "../types/resume";

export function useResume() {
  const resumeData = reactive<ResumeData>({
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      website: "",
      linkedin: "",
      github: "",
    },
    summary: "",
    experience: [],
    education: [],
    skills: [],
    projects: [],
    certifications: [],
    languages: [],
    selectedLayout: 1,
  });

  const addExperience = () => {
    resumeData.experience.push({
      id: Date.now().toString(),
      company: "",
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    });
  };

  const removeExperience = (id: string) => {
    const index = resumeData.experience.findIndex((exp) => exp.id === id);
    if (index > -1) {
      resumeData.experience.splice(index, 1);
    }
  };

  const addEducation = () => {
    resumeData.education.push({
      id: Date.now().toString(),
      institution: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      gpa: "",
      description: "",
    });
  };

  const removeEducation = (id: string) => {
    const index = resumeData.education.findIndex((edu) => edu.id === id);
    if (index > -1) {
      resumeData.education.splice(index, 1);
    }
  };

  const addSkill = () => {
    resumeData.skills.push({
      id: Date.now().toString(),
      name: "",
      level: "Intermediate",
      category: "",
    });
  };

  const removeSkill = (id: string) => {
    const index = resumeData.skills.findIndex((skill) => skill.id === id);
    if (index > -1) {
      resumeData.skills.splice(index, 1);
    }
  };

  const addProject = () => {
    resumeData.projects.push({
      id: Date.now().toString(),
      name: "",
      description: "",
      technologies: [],
      url: "",
      github: "",
      startDate: "",
      endDate: "",
    });
  };

  const removeProject = (id: string) => {
    const index = resumeData.projects.findIndex((project) => project.id === id);
    if (index > -1) {
      resumeData.projects.splice(index, 1);
    }
  };

  const addCertification = () => {
    resumeData.certifications.push({
      id: Date.now().toString(),
      name: "",
      issuer: "",
      date: "",
      expiryDate: "",
      credentialId: "",
      url: "",
    });
  };

  const removeCertification = (id: string) => {
    const index = resumeData.certifications.findIndex((cert) => cert.id === id);
    if (index > -1) {
      resumeData.certifications.splice(index, 1);
    }
  };

  const addLanguage = () => {
    resumeData.languages.push({
      id: Date.now().toString(),
      name: "",
      proficiency: "Conversational",
    });
  };

  const removeLanguage = (id: string) => {
    const index = resumeData.languages.findIndex((lang) => lang.id === id);
    if (index > -1) {
      resumeData.languages.splice(index, 1);
    }
  };

  const exportResumeData = () => {
    return JSON.stringify(resumeData, null, 2);
  };

  const importResumeData = (jsonData: string) => {
    try {
      const data = JSON.parse(jsonData);
      Object.assign(resumeData, data);
      return true;
    } catch (error) {
      console.error("Error importing resume data:", error);
      return false;
    }
  };

  const resetResume = () => {
    resumeData.personalInfo = {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      website: "",
      linkedin: "",
      github: "",
    };
    resumeData.summary = "";
    resumeData.experience = [];
    resumeData.education = [];
    resumeData.skills = [];
    resumeData.projects = [];
    resumeData.certifications = [];
    resumeData.languages = [];
  };

  return {
    resumeData,
    addExperience,
    removeExperience,
    addEducation,
    removeEducation,
    addSkill,
    removeSkill,
    addProject,
    removeProject,
    addCertification,
    removeCertification,
    addLanguage,
    removeLanguage,
    exportResumeData,
    importResumeData,
    resetResume,
  };
}

<template>
  <div class="creative-layout">
    <!-- Sidebar -->
    <aside class="sidebar">
      <!-- Profile Section -->
      <div class="profile-section">
        <div class="profile-avatar">
          {{ getInitials(resumeData.personalInfo.fullName) }}
        </div>
        <h1 class="name">
          {{ resumeData.personalInfo.fullName || "Your Name" }}
        </h1>
      </div>

      <!-- Contact Section -->
      <section class="sidebar-section">
        <h2 class="sidebar-title">Contact</h2>
        <div class="contact-list">
          <div v-if="resumeData.personalInfo.email" class="contact-item">
            <div class="contact-icon">@</div>
            <div class="contact-text">{{ resumeData.personalInfo.email }}</div>
          </div>
          <div v-if="resumeData.personalInfo.phone" class="contact-item">
            <div class="contact-icon">📞</div>
            <div class="contact-text">{{ resumeData.personalInfo.phone }}</div>
          </div>
          <div v-if="resumeData.personalInfo.address" class="contact-item">
            <div class="contact-icon">📍</div>
            <div class="contact-text">
              {{ resumeData.personalInfo.address }}
            </div>
          </div>
          <div v-if="resumeData.personalInfo.website" class="contact-item">
            <div class="contact-icon">🌐</div>
            <div class="contact-text">
              {{ resumeData.personalInfo.website }}
            </div>
          </div>
          <div v-if="resumeData.personalInfo.linkedin" class="contact-item">
            <div class="contact-icon">💼</div>
            <div class="contact-text">LinkedIn</div>
          </div>
          <div v-if="resumeData.personalInfo.github" class="contact-item">
            <div class="contact-icon">📂</div>
            <div class="contact-text">GitHub</div>
          </div>
        </div>
      </section>

      <!-- Skills Section -->
      <section v-if="resumeData.skills.length" class="sidebar-section">
        <h2 class="sidebar-title">Skills</h2>
        <div class="skills-list">
          <div
            v-for="(skills, category) in groupedSkills"
            :key="category"
            class="skill-category"
          >
            <h3 class="skill-category-title">{{ category }}</h3>
            <div class="skill-items">
              <div v-for="skill in skills" :key="skill.id" class="skill-item">
                <div class="skill-name">{{ skill.name }}</div>
                <div class="skill-bar">
                  <div
                    class="skill-fill"
                    :style="{ width: getSkillWidth(skill.level) }"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Languages Section -->
      <section v-if="resumeData.languages.length" class="sidebar-section">
        <h2 class="sidebar-title">Languages</h2>
        <div class="languages-list">
          <div
            v-for="lang in resumeData.languages"
            :key="lang.id"
            class="language-item"
          >
            <div class="language-info">
              <span class="language-name">{{ lang.name }}</span>
              <span class="language-level">{{ lang.proficiency }}</span>
            </div>
            <div class="language-dots">
              <div
                v-for="i in 4"
                :key="i"
                class="dot"
                :class="{ active: i <= getProficiencyLevel(lang.proficiency) }"
              ></div>
            </div>
          </div>
        </div>
      </section>

      <!-- Certifications Section -->
      <section v-if="resumeData.certifications.length" class="sidebar-section">
        <h2 class="sidebar-title">Certifications</h2>
        <div class="cert-list">
          <div
            v-for="cert in resumeData.certifications"
            :key="cert.id"
            class="cert-item"
          >
            <div class="cert-name">{{ cert.name }}</div>
            <div class="cert-issuer">{{ cert.issuer }}</div>
            <div class="cert-date">{{ formatDate(cert.date) }}</div>
          </div>
        </div>
      </section>
    </aside>

    <!-- Main Content -->
    <main class="main-content">
      <!-- Summary Section -->
      <section
        v-if="resumeData.summary"
        class="content-section summary-section"
      >
        <h2 class="section-title">
          <span class="title-icon">💭</span>
          About Me
        </h2>
        <p class="summary-text">{{ resumeData.summary }}</p>
      </section>

      <!-- Experience Section -->
      <section v-if="resumeData.experience.length" class="content-section">
        <h2 class="section-title">
          <span class="title-icon">💼</span>
          Work Experience
        </h2>
        <div class="timeline">
          <div
            v-for="(exp, index) in resumeData.experience"
            :key="exp.id"
            class="timeline-item"
          >
            <div class="timeline-marker">
              <div class="timeline-dot"></div>
              <div
                v-if="index < resumeData.experience.length - 1"
                class="timeline-line"
              ></div>
            </div>
            <div class="timeline-content">
              <div class="timeline-header">
                <h3 class="position">{{ exp.position }}</h3>
                <div class="date-badge">
                  {{ formatDateRange(exp.startDate, exp.endDate, exp.current) }}
                </div>
              </div>
              <div class="company-location">
                <span class="company">{{ exp.company }}</span>
                <span v-if="exp.location" class="location">{{
                  exp.location
                }}</span>
              </div>
              <div v-if="exp.description" class="description">
                <p
                  v-for="line in exp.description.split('\n')"
                  :key="line"
                  class="description-line"
                >
                  {{ line }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Projects Section -->
      <section v-if="resumeData.projects.length" class="content-section">
        <h2 class="section-title">
          <span class="title-icon">🚀</span>
          Featured Projects
        </h2>
        <div class="projects-grid">
          <div
            v-for="project in resumeData.projects"
            :key="project.id"
            class="project-card"
          >
            <div class="project-header">
              <h3 class="project-title">{{ project.name }}</h3>
              <div v-if="project.startDate" class="project-date">
                {{ formatDateRange(project.startDate, project.endDate || "") }}
              </div>
            </div>
            <div v-if="project.technologies.length" class="project-tech">
              <span
                v-for="tech in project.technologies"
                :key="tech"
                class="tech-badge"
              >
                {{ tech }}
              </span>
            </div>
            <div v-if="project.description" class="project-description">
              {{ project.description }}
            </div>
            <div v-if="project.url || project.github" class="project-links">
              <a
                v-if="project.url"
                :href="project.url"
                class="project-link demo-link"
              >
                🔗 Live Demo
              </a>
              <a
                v-if="project.github"
                :href="project.github"
                class="project-link code-link"
              >
                📂 Code
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- Education Section -->
      <section v-if="resumeData.education.length" class="content-section">
        <h2 class="section-title">
          <span class="title-icon">🎓</span>
          Education
        </h2>
        <div class="education-list">
          <div
            v-for="edu in resumeData.education"
            :key="edu.id"
            class="education-item"
          >
            <div class="education-main">
              <h3 class="degree">{{ edu.degree }}</h3>
              <div class="education-details">
                <span class="field">{{ edu.field }}</span>
                <span v-if="edu.gpa" class="gpa">GPA: {{ edu.gpa }}</span>
              </div>
              <div class="institution">{{ edu.institution }}</div>
            </div>
            <div class="education-date">
              {{ formatDateRange(edu.startDate, edu.endDate) }}
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { ResumeData } from "../../types/resume";

interface Props {
  resumeData: ResumeData;
}

const props = defineProps<Props>();

const formatDate = (date: string): string => {
  if (!date) return "";
  const [year, month] = date.split("-");
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return `${monthNames[parseInt(month) - 1]} ${year}`;
};

const formatDateRange = (
  startDate: string,
  endDate: string,
  current: boolean = false
): string => {
  const start = formatDate(startDate);
  if (current) return `${start} - Present`;
  const end = formatDate(endDate);
  return end ? `${start} - ${end}` : start;
};

const getInitials = (name: string) => {
  if (!name) return "YN";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const groupedSkills = computed(() => {
  const groups: Record<string, any[]> = {};
  props.resumeData.skills.forEach((skill) => {
    const category = skill.category || "Other";
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(skill);
  });
  return groups;
});

const getSkillWidth = (level: string) => {
  const widths: Record<string, string> = {
    Beginner: "25%",
    Intermediate: "50%",
    Advanced: "75%",
    Expert: "100%",
  };
  return widths[level] || "50%";
};

const getProficiencyLevel = (proficiency: string) => {
  const levels: Record<string, number> = {
    Basic: 1,
    Conversational: 2,
    Fluent: 3,
    Native: 4,
  };
  return levels[proficiency] || 2;
};
</script>

<style scoped>
.creative-layout {
  display: grid;
  grid-template-columns: 300px 1fr;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background: white;
  min-height: 11in;
  color: #2d3748;
}

.sidebar {
  background: linear-gradient(180deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem 1.5rem;
}

.profile-section {
  text-align: center;
  margin-bottom: 2rem;
}

.profile-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  border: 3px solid rgba(255, 255, 255, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0 auto 1rem auto;
  backdrop-filter: blur(10px);
}

.name {
  font-size: 1.5rem;
  font-weight: 300;
  margin: 0;
  letter-spacing: 0.5px;
}

.sidebar-section {
  margin-bottom: 2rem;
}

.sidebar-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
  text-transform: uppercase;
  letter-spacing: 1px;
  border-bottom: 2px solid rgba(255, 255, 255, 0.3);
  padding-bottom: 0.5rem;
}

.contact-list {
  space-y: 0.75rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  font-size: 0.875rem;
}

.contact-icon {
  width: 20px;
  text-align: center;
  opacity: 0.9;
}

.contact-text {
  word-break: break-all;
}

.skill-category {
  margin-bottom: 1.5rem;
}

.skill-category-title {
  font-size: 0.875rem;
  font-weight: 500;
  margin: 0 0 0.75rem 0;
  opacity: 0.9;
}

.skill-item {
  margin-bottom: 0.75rem;
}

.skill-name {
  font-size: 0.8rem;
  margin-bottom: 0.25rem;
}

.skill-bar {
  height: 4px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  overflow: hidden;
}

.skill-fill {
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 2px;
  transition: width 0.3s ease;
}

.language-item {
  margin-bottom: 1rem;
}

.language-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.25rem;
  font-size: 0.875rem;
}

.language-level {
  font-size: 0.75rem;
  opacity: 0.8;
}

.language-dots {
  display: flex;
  gap: 0.25rem;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transition: background 0.3s ease;
}

.dot.active {
  background: rgba(255, 255, 255, 0.9);
}

.cert-item {
  margin-bottom: 1rem;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  backdrop-filter: blur(10px);
}

.cert-name {
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.25rem;
}

.cert-issuer {
  font-size: 0.75rem;
  opacity: 0.8;
  margin-bottom: 0.125rem;
}

.cert-date {
  font-size: 0.7rem;
  opacity: 0.7;
}

.main-content {
  padding: 2rem;
  background: white;
}

.content-section {
  margin-bottom: 2.5rem;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.75rem;
  font-weight: 700;
  color: #2d3748;
  margin: 0 0 1.5rem 0;
  position: relative;
}

.title-icon {
  font-size: 1.5rem;
}

.section-title::after {
  content: "";
  flex: 1;
  height: 2px;
  background: linear-gradient(90deg, #667eea, transparent);
  margin-left: 1rem;
}

.summary-text {
  font-size: 1.1rem;
  line-height: 1.7;
  color: #4a5568;
  text-align: justify;
}

.timeline {
  position: relative;
}

.timeline-item {
  display: flex;
  margin-bottom: 2rem;
}

.timeline-marker {
  position: relative;
  margin-right: 1.5rem;
}

.timeline-dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: linear-gradient(45deg, #667eea, #764ba2);
  border: 3px solid white;
  box-shadow: 0 0 0 3px #e2e8f0;
}

.timeline-line {
  position: absolute;
  left: 50%;
  top: 16px;
  bottom: -2rem;
  width: 2px;
  background: #e2e8f0;
  transform: translateX(-50%);
}

.timeline-content {
  flex: 1;
}

.timeline-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
}

.position {
  font-size: 1.25rem;
  font-weight: 600;
  color: #2d3748;
  margin: 0;
}

.date-badge {
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.75rem;
  font-weight: 500;
  white-space: nowrap;
}

.company-location {
  margin-bottom: 0.75rem;
}

.company {
  color: #667eea;
  font-weight: 500;
  margin-right: 1rem;
}

.location {
  color: #718096;
  font-size: 0.875rem;
}

.description {
  color: #4a5568;
  line-height: 1.6;
}

.description-line {
  margin: 0.25rem 0;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.project-card {
  background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%);
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1.5rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.project-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.15);
}

.project-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.75rem;
}

.project-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #2d3748;
  margin: 0;
}

.project-date {
  color: #718096;
  font-size: 0.75rem;
}

.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.tech-badge {
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 8px;
  font-size: 0.7rem;
  font-weight: 500;
}

.project-description {
  color: #4a5568;
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 1rem;
}

.project-links {
  display: flex;
  gap: 1rem;
}

.project-link {
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.project-link:hover {
  text-decoration: underline;
}

.education-list {
  space-y: 1.5rem;
}

.education-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1.5rem;
  background: #f7fafc;
  border-radius: 12px;
  border-left: 4px solid #667eea;
  margin-bottom: 1.5rem;
}

.degree {
  font-size: 1.1rem;
  font-weight: 600;
  color: #2d3748;
  margin: 0 0 0.25rem 0;
}

.education-details {
  display: flex;
  gap: 1rem;
  margin-bottom: 0.25rem;
}

.field {
  color: #4a5568;
  font-weight: 500;
}

.gpa {
  color: #718096;
  font-size: 0.875rem;
}

.institution {
  color: #667eea;
  font-weight: 500;
}

.education-date {
  color: #718096;
  font-size: 0.875rem;
  white-space: nowrap;
}

@media (max-width: 768px) {
  .creative-layout {
    grid-template-columns: 1fr;
  }

  .sidebar {
    order: 2;
    background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  }

  .main-content {
    order: 1;
  }

  .projects-grid {
    grid-template-columns: 1fr;
  }

  .timeline-header,
  .project-header,
  .education-item {
    flex-direction: column;
    gap: 0.5rem;
  }
}

@media print {
  .creative-layout {
    font-size: 9pt;
  }

  .sidebar {
    background: #667eea !important;
    color: white !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  .project-card {
    break-inside: avoid;
  }
}
</style>

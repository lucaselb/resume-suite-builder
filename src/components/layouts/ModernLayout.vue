<template>
  <div class="modern-layout">
    <!-- Header Section -->
    <header class="header">
      <div class="header-content">
        <h1 class="name">
          {{ resumeData.personalInfo.fullName || "Your Name" }}
        </h1>
        <div class="contact-grid">
          <div v-if="resumeData.personalInfo.email" class="contact-item">
            <span class="contact-icon">✉</span>
            <span>{{ resumeData.personalInfo.email }}</span>
          </div>
          <div v-if="resumeData.personalInfo.phone" class="contact-item">
            <span class="contact-icon">📞</span>
            <span>{{ resumeData.personalInfo.phone }}</span>
          </div>
          <div v-if="resumeData.personalInfo.address" class="contact-item">
            <span class="contact-icon">📍</span>
            <span>{{ resumeData.personalInfo.address }}</span>
          </div>
          <div v-if="resumeData.personalInfo.linkedin" class="contact-item">
            <span class="contact-icon">💼</span>
            <span>{{ resumeData.personalInfo.linkedin }}</span>
          </div>
          <div v-if="resumeData.personalInfo.website" class="contact-item">
            <span class="contact-icon">🌐</span>
            <span>{{ resumeData.personalInfo.website }}</span>
          </div>
          <div v-if="resumeData.personalInfo.github" class="contact-item">
            <span class="contact-icon">📂</span>
            <span>{{ resumeData.personalInfo.github }}</span>
          </div>
        </div>
      </div>
    </header>

    <div class="main-content">
      <!-- Left Column -->
      <div class="left-column">
        <!-- Summary Section -->
        <section v-if="resumeData.summary" class="section">
          <h2 class="section-title">About Me</h2>
          <p class="summary">{{ resumeData.summary }}</p>
        </section>

        <!-- Skills Section -->
        <section v-if="resumeData.skills.length" class="section">
          <h2 class="section-title">Skills</h2>
          <div
            v-for="(skills, category) in groupedSkills"
            :key="category"
            class="skill-category"
          >
            <h3 class="skill-category-title">{{ category }}</h3>
            <div class="skills-container">
              <div v-for="skill in skills" :key="skill.id" class="skill-tag">
                {{ skill.name }}
                <span
                  class="skill-level"
                  :class="`level-${skill.level.toLowerCase()}`"
                >
                  {{ skill.level }}
                </span>
              </div>
            </div>
          </div>
        </section>

        <!-- Languages Section -->
        <section v-if="resumeData.languages.length" class="section">
          <h2 class="section-title">Languages</h2>
          <div class="languages-list">
            <div
              v-for="lang in resumeData.languages"
              :key="lang.id"
              class="language-item"
            >
              <div class="language-header">
                <span class="language-name">{{ lang.name }}</span>
                <span class="language-proficiency">{{ lang.proficiency }}</span>
              </div>
              <div class="proficiency-bar">
                <div
                  class="proficiency-fill"
                  :style="{ width: getProficiencyWidth(lang.proficiency) }"
                ></div>
              </div>
            </div>
          </div>
        </section>

        <!-- Certifications Section -->
        <section v-if="resumeData.certifications.length" class="section">
          <h2 class="section-title">Certifications</h2>
          <div
            v-for="cert in resumeData.certifications"
            :key="cert.id"
            class="cert-item"
          >
            <h3 class="cert-name">{{ cert.name }}</h3>
            <div class="cert-details">
              <div class="cert-issuer">{{ cert.issuer }}</div>
              <div class="cert-date">{{ formatDate(cert.date) }}</div>
            </div>
          </div>
        </section>
      </div>

      <!-- Right Column -->
      <div class="right-column">
        <!-- Experience Section -->
        <section v-if="resumeData.experience.length" class="section">
          <h2 class="section-title">Experience</h2>
          <div
            v-for="exp in resumeData.experience"
            :key="exp.id"
            class="experience-item"
          >
            <div class="timeline-dot"></div>
            <div class="experience-content">
              <h3 class="position">{{ exp.position }}</h3>
              <div class="company-info">
                <span class="company">{{ exp.company }}</span>
                <span v-if="exp.location" class="location">{{
                  exp.location
                }}</span>
              </div>
              <div class="date-range">
                {{ formatDateRange(exp.startDate, exp.endDate, exp.current) }}
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
        </section>

        <!-- Education Section -->
        <section v-if="resumeData.education.length" class="section">
          <h2 class="section-title">Education</h2>
          <div
            v-for="edu in resumeData.education"
            :key="edu.id"
            class="education-item"
          >
            <div class="timeline-dot"></div>
            <div class="education-content">
              <h3 class="degree">{{ edu.degree }}</h3>
              <div class="education-info">
                <span class="field">{{ edu.field }}</span>
                <span v-if="edu.gpa" class="gpa">GPA: {{ edu.gpa }}</span>
              </div>
              <div class="institution">{{ edu.institution }}</div>
              <div class="date-range">
                {{ formatDateRange(edu.startDate, edu.endDate) }}
              </div>
              <div v-if="edu.description" class="description">
                <p
                  v-for="line in edu.description.split('\n')"
                  :key="line"
                  class="description-line"
                >
                  {{ line }}
                </p>
              </div>
            </div>
          </div>
        </section>

        <!-- Projects Section -->
        <section v-if="resumeData.projects.length" class="section">
          <h2 class="section-title">Projects</h2>
          <div
            v-for="project in resumeData.projects"
            :key="project.id"
            class="project-item"
          >
            <div class="project-header">
              <h3 class="project-name">{{ project.name }}</h3>
              <div v-if="project.startDate" class="date-range">
                {{ formatDateRange(project.startDate, project.endDate || "") }}
              </div>
            </div>
            <div
              v-if="project.technologies.length"
              class="project-technologies"
            >
              <span
                v-for="tech in project.technologies"
                :key="tech"
                class="tech-tag"
              >
                {{ tech }}
              </span>
            </div>
            <div v-if="project.description" class="description">
              {{ project.description }}
            </div>
            <div v-if="project.url || project.github" class="project-links">
              <a v-if="project.url" :href="project.url" class="project-link"
                >Live Demo</a
              >
              <a
                v-if="project.github"
                :href="project.github"
                class="project-link"
                >GitHub</a
              >
            </div>
          </div>
        </section>
      </div>
    </div>
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

const getProficiencyWidth = (level: string) => {
  const widths: Record<string, string> = {
    Basic: "25%",
    Conversational: "50%",
    Fluent: "75%",
    Native: "100%",
  };
  return widths[level] || "50%";
};
</script>

<style scoped>
.modern-layout {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background: white;
  min-height: 11in;
}

.header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
}

.name {
  font-size: 2.5rem;
  font-weight: 300;
  margin: 0 0 1rem 0;
  letter-spacing: 1px;
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 0.75rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
}

.contact-icon {
  width: 20px;
  text-align: center;
}

.main-content {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.section {
  margin-bottom: 2rem;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #667eea;
  margin: 0 0 1rem 0;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e0e7ff;
  position: relative;
}

.section-title::after {
  content: "";
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 50px;
  height: 2px;
  background: #667eea;
}

.summary {
  font-size: 1rem;
  line-height: 1.6;
  color: #4b5563;
  text-align: justify;
}

.skill-category {
  margin-bottom: 1.5rem;
}

.skill-category-title {
  font-size: 1rem;
  font-weight: 600;
  color: #374151;
  margin: 0 0 0.75rem 0;
}

.skills-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.skill-tag {
  background: #f3f4f6;
  border: 1px solid #d1d5db;
  border-radius: 20px;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.skill-level {
  background: #667eea;
  color: white;
  border-radius: 10px;
  padding: 0.125rem 0.5rem;
  font-size: 0.75rem;
  font-weight: 500;
}

.languages-list {
  space-y: 1rem;
}

.language-item {
  margin-bottom: 1rem;
}

.language-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.25rem;
}

.language-name {
  font-weight: 600;
  color: #374151;
}

.language-proficiency {
  font-size: 0.875rem;
  color: #6b7280;
}

.proficiency-bar {
  height: 6px;
  background: #e5e7eb;
  border-radius: 3px;
  overflow: hidden;
}

.proficiency-fill {
  height: 100%;
  background: linear-gradient(90deg, #667eea, #764ba2);
  border-radius: 3px;
  transition: width 0.3s ease;
}

.cert-item {
  margin-bottom: 1rem;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 8px;
  border-left: 4px solid #667eea;
}

.cert-name {
  font-size: 1rem;
  font-weight: 600;
  color: #374151;
  margin: 0 0 0.5rem 0;
}

.cert-details {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.cert-issuer {
  color: #6b7280;
  font-weight: 500;
}

.cert-date {
  color: #9ca3af;
  font-size: 0.875rem;
}

.experience-item,
.education-item {
  position: relative;
  padding-left: 2rem;
  margin-bottom: 2rem;
}

.timeline-dot {
  position: absolute;
  left: 0;
  top: 0.5rem;
  width: 12px;
  height: 12px;
  background: #667eea;
  border-radius: 50%;
  border: 3px solid #e0e7ff;
}

.experience-item:not(:last-child)::after,
.education-item:not(:last-child)::after {
  content: "";
  position: absolute;
  left: 5px;
  top: 24px;
  bottom: -2rem;
  width: 2px;
  background: #e0e7ff;
}

.position,
.degree {
  font-size: 1.25rem;
  font-weight: 600;
  color: #374151;
  margin: 0 0 0.5rem 0;
}

.company-info,
.education-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.25rem;
}

.company,
.institution {
  font-weight: 500;
  color: #667eea;
}

.location,
.field,
.gpa {
  color: #6b7280;
  font-size: 0.875rem;
}

.date-range {
  color: #9ca3af;
  font-size: 0.875rem;
  margin-bottom: 0.75rem;
}

.description {
  color: #4b5563;
  line-height: 1.5;
}

.description-line {
  margin: 0.25rem 0;
}

.project-item {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: #f9fafb;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
}

.project-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.75rem;
}

.project-name {
  font-size: 1.25rem;
  font-weight: 600;
  color: #374151;
  margin: 0;
}

.project-technologies {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.tech-tag {
  background: #e0e7ff;
  color: #5b21b6;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
}

.project-links {
  margin-top: 0.75rem;
  display: flex;
  gap: 1rem;
}

.project-link {
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.875rem;
}

.project-link:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .main-content {
    grid-template-columns: 1fr;
    gap: 1rem;
    padding: 1rem;
  }

  .contact-grid {
    grid-template-columns: 1fr;
  }

  .name {
    font-size: 2rem;
  }

  .company-info,
  .education-info {
    flex-direction: column;
    align-items: flex-start;
  }

  .project-header {
    flex-direction: column;
    gap: 0.5rem;
  }
}

@media print {
  .modern-layout {
    font-size: 10pt;
  }

  .header {
    background: #667eea !important;
    color: white !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  .main-content {
    padding: 1rem 0;
  }
}
</style>

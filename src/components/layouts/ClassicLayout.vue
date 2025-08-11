<template>
  <div class="classic-layout">
    <!-- Header Section -->
    <header class="header">
      <h1 class="name">
        {{ resumeData.personalInfo.fullName || "Your Name" }}
      </h1>
      <div class="contact-info">
        <div class="contact-row">
          <span v-if="resumeData.personalInfo.email" class="contact-item">
            {{ resumeData.personalInfo.email }}
          </span>
          <span v-if="resumeData.personalInfo.phone" class="contact-item">
            {{ resumeData.personalInfo.phone }}
          </span>
        </div>
        <div class="contact-row">
          <span v-if="resumeData.personalInfo.address" class="contact-item">
            {{ resumeData.personalInfo.address }}
          </span>
          <span v-if="resumeData.personalInfo.linkedin" class="contact-item">
            {{ resumeData.personalInfo.linkedin }}
          </span>
        </div>
        <div
          v-if="
            resumeData.personalInfo.website || resumeData.personalInfo.github
          "
          class="contact-row"
        >
          <span v-if="resumeData.personalInfo.website" class="contact-item">
            {{ resumeData.personalInfo.website }}
          </span>
          <span v-if="resumeData.personalInfo.github" class="contact-item">
            {{ resumeData.personalInfo.github }}
          </span>
        </div>
      </div>
    </header>

    <!-- Summary Section -->
    <section v-if="resumeData.summary" class="section">
      <h2 class="section-title">Professional Summary</h2>
      <p class="summary">{{ resumeData.summary }}</p>
    </section>

    <!-- Experience Section -->
    <section v-if="resumeData.experience.length" class="section">
      <h2 class="section-title">Professional Experience</h2>
      <div
        v-for="exp in resumeData.experience"
        :key="exp.id"
        class="experience-item"
      >
        <div class="item-header">
          <div class="item-main">
            <h3 class="position">{{ exp.position }}</h3>
            <h4 class="company">{{ exp.company }}</h4>
          </div>
          <div class="item-meta">
            <div class="date">
              {{ formatDateRange(exp.startDate, exp.endDate, exp.current) }}
            </div>
            <div v-if="exp.location" class="location">{{ exp.location }}</div>
          </div>
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
    </section>

    <!-- Education Section -->
    <section v-if="resumeData.education.length" class="section">
      <h2 class="section-title">Education</h2>
      <div
        v-for="edu in resumeData.education"
        :key="edu.id"
        class="education-item"
      >
        <div class="item-header">
          <div class="item-main">
            <h3 class="degree">{{ edu.degree }} in {{ edu.field }}</h3>
            <h4 class="institution">{{ edu.institution }}</h4>
          </div>
          <div class="item-meta">
            <div class="date">
              {{ formatDateRange(edu.startDate, edu.endDate) }}
            </div>
            <div v-if="edu.gpa" class="gpa">GPA: {{ edu.gpa }}</div>
          </div>
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
    </section>

    <!-- Skills Section -->
    <section v-if="resumeData.skills.length" class="section">
      <h2 class="section-title">Skills</h2>
      <div class="skills-grid">
        <div
          v-for="(skills, category) in groupedSkills"
          :key="category"
          class="skill-category"
        >
          <h4 class="skill-category-title">{{ category }}</h4>
          <div class="skill-list">
            <span v-for="skill in skills" :key="skill.id" class="skill-item">
              {{ skill.name }}
            </span>
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
        <div class="item-header">
          <div class="item-main">
            <h3 class="project-name">{{ project.name }}</h3>
            <div v-if="project.technologies.length" class="technologies">
              {{ project.technologies.join(", ") }}
            </div>
          </div>
          <div class="item-meta">
            <div v-if="project.startDate" class="date">
              {{ formatDateRange(project.startDate, project.endDate || "") }}
            </div>
          </div>
        </div>
        <div v-if="project.description" class="description">
          {{ project.description }}
        </div>
        <div v-if="project.url || project.github" class="project-links">
          <span v-if="project.url" class="project-link"
            >Live Demo: {{ project.url }}</span
          >
          <span v-if="project.github" class="project-link"
            >GitHub: {{ project.github }}</span
          >
        </div>
      </div>
    </section>

    <!-- Certifications Section -->
    <section v-if="resumeData.certifications.length" class="section">
      <h2 class="section-title">Certifications</h2>
      <div
        v-for="cert in resumeData.certifications"
        :key="cert.id"
        class="certification-item"
      >
        <div class="item-header">
          <div class="item-main">
            <h3 class="cert-name">{{ cert.name }}</h3>
            <h4 class="cert-issuer">{{ cert.issuer }}</h4>
          </div>
          <div class="item-meta">
            <div class="date">{{ formatDate(cert.date) }}</div>
            <div v-if="cert.expiryDate" class="expiry">
              Expires: {{ formatDate(cert.expiryDate) }}
            </div>
          </div>
        </div>
        <div v-if="cert.credentialId || cert.url" class="cert-details">
          <span v-if="cert.credentialId" class="credential-id"
            >ID: {{ cert.credentialId }}</span
          >
          <span v-if="cert.url" class="cert-url">{{ cert.url }}</span>
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
          <span class="language-name">{{ lang.name }}</span>
          <span class="language-proficiency">{{ lang.proficiency }}</span>
        </div>
      </div>
    </section>
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
</script>

<style scoped>
.classic-layout {
  padding: 1.5in 1in;
  font-family: "Times New Roman", serif;
  line-height: 1.4;
  color: #000;
  background: white;
}

.header {
  text-align: center;
  margin-bottom: 1.5rem;
  border-bottom: 2px solid #000;
  padding-bottom: 1rem;
}

.name {
  font-size: 24pt;
  font-weight: bold;
  margin: 0 0 0.5rem 0;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.contact-info {
  font-size: 11pt;
}

.contact-row {
  margin: 0.2rem 0;
}

.contact-item {
  margin: 0 1rem;
}

.contact-item:first-child {
  margin-left: 0;
}

.contact-item:last-child {
  margin-right: 0;
}

.section {
  margin-bottom: 1.5rem;
}

.section-title {
  font-size: 14pt;
  font-weight: bold;
  margin: 0 0 0.75rem 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 1px solid #000;
  padding-bottom: 0.25rem;
}

.summary {
  font-size: 11pt;
  margin: 0;
  text-align: justify;
}

.experience-item,
.education-item,
.project-item,
.certification-item {
  margin-bottom: 1rem;
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
}

.item-main h3 {
  font-size: 12pt;
  font-weight: bold;
  margin: 0;
}

.item-main h4 {
  font-size: 11pt;
  font-weight: normal;
  margin: 0.1rem 0 0 0;
  font-style: italic;
}

.item-meta {
  text-align: right;
  font-size: 10pt;
}

.date {
  font-weight: bold;
}

.location,
.gpa,
.expiry {
  color: #555;
}

.description {
  font-size: 10pt;
  margin: 0.5rem 0;
}

.description-line {
  margin: 0.2rem 0;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.skill-category-title {
  font-size: 11pt;
  font-weight: bold;
  margin: 0 0 0.25rem 0;
}

.skill-list {
  font-size: 10pt;
}

.skill-item {
  margin-right: 0.5rem;
}

.skill-item:not(:last-child)::after {
  content: "•";
  margin-left: 0.5rem;
}

.technologies {
  font-size: 10pt;
  font-style: italic;
  color: #555;
}

.project-links,
.cert-details {
  font-size: 10pt;
  margin-top: 0.25rem;
}

.project-link,
.credential-id,
.cert-url {
  margin-right: 1rem;
  color: #555;
}

.languages-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 0.5rem;
}

.language-item {
  display: flex;
  justify-content: space-between;
  font-size: 11pt;
}

.language-name {
  font-weight: bold;
}

.language-proficiency {
  color: #555;
}

@media print {
  .classic-layout {
    padding: 0.5in;
  }
}
</style>

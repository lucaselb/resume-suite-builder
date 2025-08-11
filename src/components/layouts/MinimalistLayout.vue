<template>
  <div class="minimalist-layout">
    <!-- Header -->
    <header class="header">
      <h1 class="name">
        {{ resumeData.personalInfo.fullName || "Your Name" }}
      </h1>
      <div class="contact-info">
        <span v-if="resumeData.personalInfo.email" class="contact-item">
          {{ resumeData.personalInfo.email }}
        </span>
        <span v-if="resumeData.personalInfo.phone" class="contact-item">
          {{ resumeData.personalInfo.phone }}
        </span>
        <span v-if="resumeData.personalInfo.address" class="contact-item">
          {{ resumeData.personalInfo.address }}
        </span>
        <span v-if="resumeData.personalInfo.website" class="contact-item">
          {{ resumeData.personalInfo.website }}
        </span>
        <span v-if="resumeData.personalInfo.linkedin" class="contact-item">
          {{ resumeData.personalInfo.linkedin }}
        </span>
        <span v-if="resumeData.personalInfo.github" class="contact-item">
          {{ resumeData.personalInfo.github }}
        </span>
      </div>
    </header>

    <!-- Summary -->
    <section v-if="resumeData.summary" class="section">
      <p class="summary">{{ resumeData.summary }}</p>
    </section>

    <!-- Experience -->
    <section v-if="resumeData.experience.length" class="section">
      <h2 class="section-title">Experience</h2>
      <div v-for="exp in resumeData.experience" :key="exp.id" class="item">
        <div class="item-header">
          <div class="item-left">
            <h3 class="item-title">{{ exp.position }}</h3>
            <div class="item-subtitle">{{ exp.company }}</div>
          </div>
          <div class="item-right">
            <div class="item-date">
              {{ formatDateRange(exp.startDate, exp.endDate, exp.current) }}
            </div>
            <div v-if="exp.location" class="item-location">
              {{ exp.location }}
            </div>
          </div>
        </div>
        <div v-if="exp.description" class="item-content">
          <p
            v-for="line in exp.description.split('\n')"
            :key="line"
            class="content-line"
          >
            {{ line }}
          </p>
        </div>
      </div>
    </section>

    <!-- Projects -->
    <section v-if="resumeData.projects.length" class="section">
      <h2 class="section-title">Projects</h2>
      <div
        v-for="project in resumeData.projects"
        :key="project.id"
        class="item"
      >
        <div class="item-header">
          <div class="item-left">
            <h3 class="item-title">{{ project.name }}</h3>
            <div v-if="project.technologies.length" class="item-subtitle">
              {{ project.technologies.join(" • ") }}
            </div>
          </div>
          <div class="item-right">
            <div v-if="project.startDate" class="item-date">
              {{ formatDateRange(project.startDate, project.endDate || "") }}
            </div>
          </div>
        </div>
        <div v-if="project.description" class="item-content">
          <p class="content-line">{{ project.description }}</p>
        </div>
        <div v-if="project.url || project.github" class="item-links">
          <span v-if="project.url" class="item-link">{{ project.url }}</span>
          <span v-if="project.github" class="item-link">{{
            project.github
          }}</span>
        </div>
      </div>
    </section>

    <!-- Education -->
    <section v-if="resumeData.education.length" class="section">
      <h2 class="section-title">Education</h2>
      <div v-for="edu in resumeData.education" :key="edu.id" class="item">
        <div class="item-header">
          <div class="item-left">
            <h3 class="item-title">{{ edu.degree }}</h3>
            <div class="item-subtitle">
              {{ edu.institution }} • {{ edu.field }}
            </div>
          </div>
          <div class="item-right">
            <div class="item-date">
              {{ formatDateRange(edu.startDate, edu.endDate) }}
            </div>
            <div v-if="edu.gpa" class="item-location">{{ edu.gpa }}</div>
          </div>
        </div>
        <div v-if="edu.description" class="item-content">
          <p
            v-for="line in edu.description.split('\n')"
            :key="line"
            class="content-line"
          >
            {{ line }}
          </p>
        </div>
      </div>
    </section>

    <!-- Skills -->
    <section v-if="resumeData.skills.length" class="section">
      <h2 class="section-title">Skills</h2>
      <div class="skills-content">
        <div
          v-for="(skills, category) in groupedSkills"
          :key="category"
          class="skill-group"
        >
          <span class="skill-category">{{ category }}</span>
          <span class="skill-list">
            {{ skills.map((s) => s.name).join(" • ") }}
          </span>
        </div>
      </div>
    </section>

    <!-- Languages -->
    <section v-if="resumeData.languages.length" class="section">
      <h2 class="section-title">Languages</h2>
      <div class="languages-content">
        <span
          v-for="(lang, index) in resumeData.languages"
          :key="lang.id"
          class="language-item"
        >
          {{ lang.name }} ({{ lang.proficiency }}){{
            index < resumeData.languages.length - 1 ? " • " : ""
          }}
        </span>
      </div>
    </section>

    <!-- Certifications -->
    <section v-if="resumeData.certifications.length" class="section">
      <h2 class="section-title">Certifications</h2>
      <div
        v-for="cert in resumeData.certifications"
        :key="cert.id"
        class="item"
      >
        <div class="item-header">
          <div class="item-left">
            <h3 class="item-title">{{ cert.name }}</h3>
            <div class="item-subtitle">{{ cert.issuer }}</div>
          </div>
          <div class="item-right">
            <div class="item-date">{{ formatDate(cert.date) }}</div>
            <div v-if="cert.expiryDate" class="item-location">
              Expires: {{ formatDate(cert.expiryDate) }}
            </div>
          </div>
        </div>
        <div v-if="cert.credentialId" class="item-content">
          <p class="content-line">Credential ID: {{ cert.credentialId }}</p>
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
.minimalist-layout {
  font-family: "Georgia", "Times New Roman", serif;
  max-width: 8.5in;
  margin: 0 auto;
  padding: 1in;
  background: white;
  color: #333;
  line-height: 1.5;
}

.header {
  margin-bottom: 2rem;
}

.name {
  font-size: 2.5rem;
  font-weight: normal;
  margin: 0 0 0.5rem 0;
  color: #222;
  letter-spacing: -0.5px;
}

.contact-info {
  display: flex;
  flex-wrap: wrap;
  gap: 0 1.5rem;
  font-size: 0.95rem;
  color: #666;
}

.contact-item {
  white-space: nowrap;
}

.section {
  margin-bottom: 2rem;
}

.section-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #222;
  margin: 0 0 1rem 0;
  padding-bottom: 0.25rem;
  border-bottom: 1px solid #ddd;
  letter-spacing: 0.5px;
}

.summary {
  font-size: 1rem;
  line-height: 1.6;
  margin: 0;
  color: #444;
  text-align: justify;
}

.item {
  margin-bottom: 1.5rem;
}

.item:last-child {
  margin-bottom: 0;
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
}

.item-left {
  flex: 1;
  min-width: 0;
}

.item-right {
  text-align: right;
  margin-left: 1rem;
  flex-shrink: 0;
}

.item-title {
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
  color: #222;
}

.item-subtitle {
  font-size: 0.9rem;
  color: #666;
  margin-top: 0.125rem;
}

.item-date {
  font-size: 0.85rem;
  color: #666;
  font-weight: 500;
}

.item-location {
  font-size: 0.8rem;
  color: #888;
  margin-top: 0.125rem;
}

.item-content {
  margin-top: 0.5rem;
  color: #555;
}

.content-line {
  margin: 0.25rem 0;
  font-size: 0.9rem;
}

.item-links {
  margin-top: 0.5rem;
  display: flex;
  gap: 1rem;
  font-size: 0.85rem;
}

.item-link {
  color: #666;
  text-decoration: none;
}

.skills-content {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.skill-group {
  display: flex;
  align-items: baseline;
  gap: 1rem;
}

.skill-category {
  font-weight: 600;
  color: #222;
  min-width: 120px;
  flex-shrink: 0;
  font-size: 0.9rem;
}

.skill-list {
  color: #555;
  font-size: 0.9rem;
  line-height: 1.4;
}

.languages-content {
  color: #555;
  font-size: 0.9rem;
  line-height: 1.4;
}

.language-item {
  display: inline;
}

@media (max-width: 768px) {
  .minimalist-layout {
    padding: 0.5in;
  }

  .name {
    font-size: 2rem;
  }

  .contact-info {
    flex-direction: column;
    gap: 0.25rem;
  }

  .item-header {
    flex-direction: column;
    gap: 0.25rem;
  }

  .item-right {
    text-align: left;
    margin-left: 0;
  }

  .skill-group {
    flex-direction: column;
    gap: 0.25rem;
  }

  .skill-category {
    min-width: auto;
  }

  .item-links {
    flex-direction: column;
    gap: 0.25rem;
  }
}

@media print {
  .minimalist-layout {
    padding: 0.75in;
    font-size: 11pt;
  }

  .name {
    font-size: 18pt;
  }

  .section-title {
    font-size: 12pt;
  }

  .item {
    break-inside: avoid;
    margin-bottom: 1rem;
  }

  .section {
    break-inside: avoid;
    margin-bottom: 1.5rem;
  }
}
</style>

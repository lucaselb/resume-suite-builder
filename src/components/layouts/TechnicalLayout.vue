<template>
  <div class="technical-layout">
    <!-- Header -->
    <header class="header">
      <div class="header-content">
        <div class="name-section">
          <h1 class="name">
            {{ resumeData.personalInfo.fullName || "Your Name" }}
          </h1>
          <div class="title-line"></div>
        </div>
        <div class="contact-section">
          <div class="contact-grid">
            <div v-if="resumeData.personalInfo.email" class="contact-item">
              <span class="contact-label">EMAIL</span>
              <span class="contact-value">{{
                resumeData.personalInfo.email
              }}</span>
            </div>
            <div v-if="resumeData.personalInfo.phone" class="contact-item">
              <span class="contact-label">PHONE</span>
              <span class="contact-value">{{
                resumeData.personalInfo.phone
              }}</span>
            </div>
            <div v-if="resumeData.personalInfo.address" class="contact-item">
              <span class="contact-label">LOCATION</span>
              <span class="contact-value">{{
                resumeData.personalInfo.address
              }}</span>
            </div>
            <div v-if="resumeData.personalInfo.github" class="contact-item">
              <span class="contact-label">GITHUB</span>
              <span class="contact-value">{{
                resumeData.personalInfo.github
              }}</span>
            </div>
            <div v-if="resumeData.personalInfo.linkedin" class="contact-item">
              <span class="contact-label">LINKEDIN</span>
              <span class="contact-value">{{
                resumeData.personalInfo.linkedin
              }}</span>
            </div>
            <div v-if="resumeData.personalInfo.website" class="contact-item">
              <span class="contact-label">WEBSITE</span>
              <span class="contact-value">{{
                resumeData.personalInfo.website
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </header>

    <div class="main-grid">
      <!-- Left Column -->
      <div class="left-column">
        <!-- Summary Section -->
        <section v-if="resumeData.summary" class="section">
          <h2 class="section-title">
            <span class="section-number">01</span>
            SUMMARY
          </h2>
          <div class="section-content">
            <p class="summary-text">{{ resumeData.summary }}</p>
          </div>
        </section>

        <!-- Technical Skills Section -->
        <section v-if="resumeData.skills.length" class="section">
          <h2 class="section-title">
            <span class="section-number">02</span>
            TECHNICAL SKILLS
          </h2>
          <div class="section-content">
            <div class="tech-skills">
              <div
                v-for="(skills, category) in groupedSkills"
                :key="category"
                class="skill-category"
              >
                <h3 class="skill-category-title">
                  {{ category.toUpperCase() }}
                </h3>
                <div class="skills-matrix">
                  <div
                    v-for="skill in skills"
                    :key="skill.id"
                    class="skill-box"
                  >
                    <div class="skill-name">{{ skill.name }}</div>
                    <div class="skill-level-indicator">
                      <div
                        v-for="i in 4"
                        :key="i"
                        class="level-dot"
                        :class="{ active: i <= getSkillLevel(skill.level) }"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Languages Section -->
        <section v-if="resumeData.languages.length" class="section">
          <h2 class="section-title">
            <span class="section-number">03</span>
            LANGUAGES
          </h2>
          <div class="section-content">
            <div class="languages-grid">
              <div
                v-for="lang in resumeData.languages"
                :key="lang.id"
                class="language-item"
              >
                <div class="language-name">{{ lang.name }}</div>
                <div class="language-proficiency">{{ lang.proficiency }}</div>
                <div class="language-bar">
                  <div
                    class="language-fill"
                    :style="{ width: getProficiencyWidth(lang.proficiency) }"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Certifications Section -->
        <section v-if="resumeData.certifications.length" class="section">
          <h2 class="section-title">
            <span class="section-number">04</span>
            CERTIFICATIONS
          </h2>
          <div class="section-content">
            <div class="cert-list">
              <div
                v-for="cert in resumeData.certifications"
                :key="cert.id"
                class="cert-item"
              >
                <div class="cert-main">
                  <div class="cert-name">{{ cert.name }}</div>
                  <div class="cert-issuer">{{ cert.issuer }}</div>
                </div>
                <div class="cert-date">{{ formatDate(cert.date) }}</div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <!-- Right Column -->
      <div class="right-column">
        <!-- Experience Section -->
        <section v-if="resumeData.experience.length" class="section">
          <h2 class="section-title">
            <span class="section-number">05</span>
            PROFESSIONAL EXPERIENCE
          </h2>
          <div class="section-content">
            <div class="experience-list">
              <div
                v-for="exp in resumeData.experience"
                :key="exp.id"
                class="experience-item"
              >
                <div class="experience-header">
                  <div class="experience-main">
                    <h3 class="position">{{ exp.position }}</h3>
                    <div class="company-info">
                      <span class="company">{{ exp.company }}</span>
                      <span v-if="exp.location" class="location">{{
                        exp.location
                      }}</span>
                    </div>
                  </div>
                  <div class="experience-date">
                    {{
                      formatDateRange(exp.startDate, exp.endDate, exp.current)
                    }}
                  </div>
                </div>
                <div v-if="exp.description" class="experience-description">
                  <div
                    v-for="line in exp.description.split('\n')"
                    :key="line"
                    class="description-line"
                  >
                    <span class="bullet">▸</span>
                    <span>{{ line }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Projects Section -->
        <section v-if="resumeData.projects.length" class="section">
          <h2 class="section-title">
            <span class="section-number">06</span>
            KEY PROJECTS
          </h2>
          <div class="section-content">
            <div class="projects-list">
              <div
                v-for="project in resumeData.projects"
                :key="project.id"
                class="project-item"
              >
                <div class="project-header">
                  <h3 class="project-name">{{ project.name }}</h3>
                  <div v-if="project.startDate" class="project-date">
                    {{
                      formatDateRange(project.startDate, project.endDate || "")
                    }}
                  </div>
                </div>
                <div v-if="project.technologies.length" class="project-tech">
                  <div class="tech-stack">
                    <span class="tech-label">STACK:</span>
                    <div class="tech-tags">
                      <span
                        v-for="tech in project.technologies"
                        :key="tech"
                        class="tech-tag"
                      >
                        {{ tech }}
                      </span>
                    </div>
                  </div>
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
                    [DEMO]
                  </a>
                  <a
                    v-if="project.github"
                    :href="project.github"
                    class="project-link code-link"
                  >
                    [CODE]
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Education Section -->
        <section v-if="resumeData.education.length" class="section">
          <h2 class="section-title">
            <span class="section-number">07</span>
            EDUCATION
          </h2>
          <div class="section-content">
            <div class="education-list">
              <div
                v-for="edu in resumeData.education"
                :key="edu.id"
                class="education-item"
              >
                <div class="education-header">
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
                <div v-if="edu.description" class="education-description">
                  <div
                    v-for="line in edu.description.split('\n')"
                    :key="line"
                    class="description-line"
                  >
                    <span class="bullet">▸</span>
                    <span>{{ line }}</span>
                  </div>
                </div>
              </div>
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

const getSkillLevel = (level: string) => {
  const levels: Record<string, number> = {
    Beginner: 1,
    Intermediate: 2,
    Advanced: 3,
    Expert: 4,
  };
  return levels[level] || 2;
};

const getProficiencyWidth = (proficiency: string) => {
  const widths: Record<string, string> = {
    Basic: "25%",
    Conversational: "50%",
    Fluent: "75%",
    Native: "100%",
  };
  return widths[proficiency] || "50%";
};
</script>

<style scoped>
.technical-layout {
  font-family: "Courier New", "Monaco", "Menlo", monospace;
  background: #0a0a0a;
  color: black;
  min-height: 11in;
  padding: 1.5rem;
}

.header {
  border: 2px solid black;
  margin-bottom: 2rem;
  background: white;
}

.header-content {
  padding: 1.5rem;
}

.name-section {
  margin-bottom: 1rem;
}

.name {
  font-size: 2rem;
  font-weight: bold;
  margin: 0;
  color: black;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.title-line {
  height: 2px;
  background: linear-gradient(90deg, black, transparent);
  margin-top: 0.5rem;
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.contact-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.contact-label {
  font-size: 0.7rem;
  color: #888;
  font-weight: bold;
}

.contact-value {
  font-size: 0.8rem;
  color: black;
  word-break: break-all;
}

.main-grid {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
}

.section {
  margin-bottom: 2rem;
  border: 1px solid #333;
  background: white;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: white;
  border-bottom: 1px solid black;
  padding: 0.75rem 1rem;
  margin: 0;
  font-size: 0.9rem;
  font-weight: bold;
  color: black;
}

.section-number {
  background: black;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 2px;
  font-weight: bold;
  min-width: 2rem;
  text-align: center;
}

.section-content {
  padding: 1rem;
}

.summary-text {
  line-height: 1.6;
  margin: 0;
  color: black;
}

.tech-skills > .skill-category {
  margin-bottom: 1.5rem;
}

.skill-category {
  margin-bottom: 1.5rem;
}

.skill-category-title {
  font-size: 0.8rem;
  color: black;
  margin: 0 0 0.75rem 0;
  border-bottom: 1px dotted #333;
  padding-bottom: 0.25rem;
}

.skills-matrix {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 0.75rem;
}

.skill-box {
  background: rgba(0, 255, 0, 0.05);
  border: 1px solid #333;
  padding: 0.75rem;
  text-align: center;
}

.skill-name {
  font-size: 0.7rem;
  color: black;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
}

.skill-level-indicator {
  display: flex;
  justify-content: center;
  gap: 0.25rem;
}

.level-dot {
  width: 6px;
  height: 6px;
  border: 1px solid #333;
  background: transparent;
}

.level-dot.active {
  background: black;
}

.languages-grid {
  display: grid;
  gap: 1rem;
}

.language-item {
  border: 1px solid #333;
  padding: 0.75rem;
  background: rgba(0, 255, 0, 0.05);
}

.language-name {
  color: black;
  font-weight: bold;
  margin-bottom: 0.25rem;
}

.language-proficiency {
  color: black;
  font-size: 0.8rem;
  margin-bottom: 0.5rem;
}

.language-bar {
  height: 4px;
  background: #222;
  border: 1px solid #333;
}

.language-fill {
  height: 100%;
  background: black;
  transition: width 0.3s ease;
}

.cert-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0.75rem;
  border: 1px dotted #333;
  margin-bottom: 0.75rem;
  background: rgba(0, 255, 0, 0.05);
}

.cert-name {
  color: black;
  font-size: 0.8rem;
  font-weight: bold;
}

.cert-issuer {
  color: black;
  font-size: 0.7rem;
}

.cert-date {
  color: black;
  font-size: 0.7rem;
  white-space: nowrap;
}

.experience-item,
.project-item,
.education-item {
  border-left: 3px solid black;
  padding-left: 1rem;
  margin-bottom: 1.5rem;
}

.experience-header,
.project-header,
.education-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.75rem;
}

.position,
.project-name,
.degree {
  font-size: 1.1rem;
  color: black;
  margin: 0 0 0.25rem 0;
  font-weight: bold;
}

.company-info,
.education-details {
  display: flex;
  gap: 1rem;
  margin-bottom: 0.25rem;
}

.company,
.field,
.institution {
  color: black;
  font-weight: bold;
}

.location,
.gpa {
  color: #888;
}

.experience-date,
.project-date,
.education-date {
  color: black;
  font-size: 0.8rem;
  white-space: nowrap;
  background: rgba(0, 255, 0, 0.1);
  padding: 0.25rem 0.5rem;
  border: 1px solid #333;
}

.experience-description,
.education-description {
  margin-top: 0.75rem;
}

.description-line {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
  color: black;
  font-size: 0.85rem;
  line-height: 1.4;
}

.bullet {
  color: black;
  font-weight: bold;
  margin-top: 0.1rem;
}

.tech-stack {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.tech-label {
  color: #888;
  font-size: 0.7rem;
  font-weight: bold;
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-tag {
  background: rgba(0, 255, 255, 0.1);
  border: 1px solid black;
  color: black;
  padding: 0.125rem 0.5rem;
  font-size: 0.7rem;
  text-transform: uppercase;
}

.project-description {
  color: black;
  margin-bottom: 0.75rem;
  line-height: 1.4;
}

.project-links {
  display: flex;
  gap: 1rem;
}

.project-link {
  color: black;
  text-decoration: none;
  font-weight: bold;
  font-size: 0.8rem;
  border: 1px solid black;
  padding: 0.25rem 0.5rem;
  background: rgba(0, 255, 0, 0.1);
}

.project-link:hover {
  background: rgba(0, 255, 0, 0.2);
}

@media (max-width: 768px) {
  .main-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .contact-grid {
    grid-template-columns: 1fr;
  }

  .skills-matrix {
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  }

  .experience-header,
  .project-header,
  .education-header {
    flex-direction: column;
    gap: 0.5rem;
  }

  .company-info,
  .education-details {
    flex-direction: column;
    gap: 0.25rem;
  }

  .tech-stack {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}

@media print {
  .technical-layout {
    background: white !important;
    color: black !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  .section {
    border-color: #333 !important;
  }

  .section-title {
    background: #f0f0f0 !important;
    color: black !important;
  }

  .section-number {
    background: black !important;
    color: white !important;
  }
}
</style>

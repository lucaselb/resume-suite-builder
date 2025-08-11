<template>
  <div class="resume-form">
    <div class="form-header">
      <div class="form-actions">
        <button @click="emit('togglePreview')" class="btn-primary">
          👁️ Toggle Preview
        </button>
        <button @click="loadSampleData" class="btn-success">
          ✨ Load Sample Data
        </button>
        <button @click="handleFileUpload" class="btn-secondary">
          📝 Import JSON
        </button>
        <button @click="handleExport" class="btn-secondary">
          📤 Export JSON
        </button>
        <button @click="downloadPDF" class="btn-primary">
          📄 Download PDF
        </button>
      </div>
      <input
        ref="fileInput"
        type="file"
        accept=".json"
        @change="handleFileChange"
        style="display: none"
      />
    </div>

    <nav class="form-navigation">
      <button
        v-for="section in sections"
        :key="section.id"
        @click="activeSection = section.id"
        :class="['nav-item', { active: activeSection === section.id }]"
      >
        <span class="nav-icon">{{ section.icon }}</span>
        <span class="nav-label">{{ section.label }}</span>
      </button>
    </nav>

    <div class="form-content">
      <PersonalInfoForm
        v-if="activeSection === 'personal'"
        :personal-info="resumeData.personalInfo"
        @update:personal-info="Object.assign(resumeData.personalInfo, $event)"
      />

      <SummaryForm
        v-if="activeSection === 'summary'"
        :summary="resumeData.summary"
        @update:summary="resumeData.summary = $event"
      />

      <ExperienceForm
        v-if="activeSection === 'experience'"
        :experience="resumeData.experience"
        @update:experience="resumeData.experience = $event"
      />

      <EducationForm
        v-if="activeSection === 'education'"
        :education="resumeData.education"
        @update:education="resumeData.education = $event"
      />

      <SkillsForm
        v-if="activeSection === 'skills'"
        :skills="resumeData.skills"
        @update:skills="resumeData.skills = $event"
      />

      <ProjectsForm
        v-if="activeSection === 'projects'"
        :projects="resumeData.projects"
        @update:projects="resumeData.projects = $event"
      />

      <CertificationsForm
        v-if="activeSection === 'certifications'"
        :certifications="resumeData.certifications"
        @update:certifications="resumeData.certifications = $event"
      />

      <LanguagesForm
        v-if="activeSection === 'languages'"
        :languages="resumeData.languages"
        @update:languages="resumeData.languages = $event"
      />

      <LayoutSelector
        v-if="activeSection === 'layout'"
        :selected-layout="resumeData.selectedLayout"
        @update:selected-layout="resumeData.selectedLayout = $event"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { ResumeData, LayoutType } from "../types/resume";
import PersonalInfoForm from "./forms/PersonalInfoForm.vue";
import SummaryForm from "./forms/SummaryForm.vue";
import ExperienceForm from "./forms/ExperienceForm.vue";
import EducationForm from "./forms/EducationForm.vue";
import SkillsForm from "./forms/SkillsForm.vue";
import ProjectsForm from "./forms/ProjectsForm.vue";
import CertificationsForm from "./forms/CertificationsForm.vue";
import LanguagesForm from "./forms/LanguagesForm.vue";
import LayoutSelector from "./LayoutSelector.vue";
import { sampleResumeData } from "../utils/sampleData";

interface Props {
  resumeData: ResumeData;
  selectedLayout: LayoutType;
}

const props = defineProps<Props>();
const emit = defineEmits();
const resumeData = props.resumeData;
const selectedLayout = props.selectedLayout;

const activeSection = ref("personal");

const sections = [
  { id: "personal", label: "Personal Info", icon: "👤" },
  { id: "summary", label: "Summary", icon: "📝" },
  { id: "experience", label: "Experience", icon: "💼" },
  { id: "education", label: "Education", icon: "🎓" },
  { id: "skills", label: "Skills", icon: "⚡" },
  { id: "projects", label: "Projects", icon: "🚀" },
  { id: "certifications", label: "Certifications", icon: "🏆" },
  { id: "languages", label: "Languages", icon: "🌍" },
  { id: "layout", label: "Layout", icon: "🎨" },
];

const downloadPDF = async () => {
  try {
    const html2pdf = (await import("html2pdf.js")).default;

    const element = document.getElementById("resume-preview");
    if (!element) {
      alert("Resume preview not found");
      return;
    }

    const elementWidth = element.offsetWidth;
    const elementHeight = element.offsetHeight;
    const pxToPt = 0.75;

    const pdfWidth = elementWidth * pxToPt;
    const pdfHeight = elementHeight * pxToPt;

    const opt = {
      margin: 0,
      filename: `${
        props.resumeData.personalInfo.fullName || "resume"
      }-${Date.now()}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        letterRendering: true,
        windowWidth: elementWidth,
      },
      jsPDF: {
        unit: "pt",
        format: [pdfWidth, pdfHeight],
        orientation: "portrait",
      },
      pagebreak: { mode: ["avoid-all"] },
    };

    const worker = html2pdf().set(opt).from(element);

    await worker
      .toPdf()
      .get("pdf")
      .then((pdf: any) => {
        const totalPages = pdf.internal.getNumberOfPages();
        if (totalPages > 1) {
          pdf.deletePage(totalPages);
        }
      })
      .save();
  } catch (error) {
    console.error("Error generating PDF:", error);
    alert("Error generating PDF. Please try again.");
  }
};

const fileInput = ref<HTMLInputElement | null>(null);

const handleImport = (file: string) => {
  try {
    const data = JSON.parse(file);

    // Validate the structure
    if (!data.personalInfo || typeof data.personalInfo !== "object") {
      throw new Error("Invalid resume data structure");
    }

    Object.assign(resumeData, data);

    alert("Resume imported successfully!");
  } catch (error) {
    console.error("Import error:", error);
    alert("Invalid JSON format. Please check your data.");
  }
};

const handleExport = () => {
  const dataStr = JSON.stringify(resumeData, null, 2);
  const dataBlob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `resume-data-${Date.now()}.json`;
  link.click();
  URL.revokeObjectURL(url);
};

const handleFileUpload = () => {
  fileInput.value?.click();
};

const handleFileChange = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (!file) return;

  if (file.type !== "application/json") {
    alert("Please select a valid JSON file.");
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const content = e.target?.result as string;
      handleImport(content);
    } catch (error) {
      alert("Error reading file.");
    }
  };
  reader.readAsText(file);
};

const loadSampleData = () => {
  if (
    confirm("This will replace all current data with sample data. Continue?")
  ) {
    Object.assign(resumeData, sampleResumeData);
    alert("Sample data loaded successfully!");
  }
};
</script>

<style scoped>
.resume-form {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.form-header {
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  background: #f9fafb;
}

.form-actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.form-actions button {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
}

.form-navigation {
  display: flex;
  overflow-x: auto;
  border-bottom: 1px solid #e5e7eb;
  background: white;
  padding: 0 1rem;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 1.5rem;
  border: none;
  background: none;
  cursor: pointer;
  border-bottom: 3px solid transparent;
  transition: all 0.25s;
  white-space: nowrap;
  color: #6b7280;
  font-weight: 500;
}

.nav-item:hover {
  background: #f3f4f6;
  color: #374151;
}

.nav-item.active {
  color: #646cff;
  border-bottom-color: #646cff;
  background: #f8faff;
}

.nav-icon {
  font-size: 1.125rem;
}

.nav-label {
  font-size: 0.875rem;
}

.form-content {
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 8px;
  padding: 2rem;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
}

.modal-content h3 {
  margin: 0 0 1rem 0;
  color: #374151;
}

.import-textarea {
  width: 100%;
  min-height: 200px;
  margin: 1rem 0;
  font-family: "Courier New", monospace;
  font-size: 0.875rem;
}

.modal-actions {
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
  margin-top: 1.5rem;
}

@media (max-width: 768px) {
  .form-navigation {
    padding: 0 0.5rem;
  }

  .nav-item {
    padding: 0.75rem 1rem;
  }

  .nav-label {
    display: none;
  }

  .form-content {
    padding: 1rem;
  }

  .form-actions {
    flex-direction: column;
  }

  .form-actions button {
    width: 100%;
  }
}
</style>

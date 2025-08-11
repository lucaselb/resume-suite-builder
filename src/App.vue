<template>
  <div class="app-container">
    <header class="app-header">
      <h1 class="app-title">Resume Suite Builder</h1>
      <p class="app-subtitle">Create your professional resume with ease</p>
    </header>

    <main class="main-content">
      <div class="content-wrapper">
        <div class="form-section">
          <ResumeForm
            v-model:resume-data="resumeData"
            @toggle-preview="showPreview = !showPreview"
          />
        </div>

        <div v-if="showPreview" class="preview-section">
          <ResumePreview
            :resume-data="resumeData"
            :layout="resumeData.selectedLayout"
          />
        </div>
      </div>
    </main>

    <WelcomeGuide @load-sample="loadSampleData" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import ResumeForm from "./components/ResumeForm.vue";
import ResumePreview from "./components/ResumePreview.vue";
import WelcomeGuide from "./components/WelcomeGuide.vue";
import { useResume } from "./composables/useResume";
import { sampleResumeData } from "./utils/sampleData";

const { resumeData } = useResume();
const showPreview = ref(false);

const loadSampleData = () => {
  Object.assign(resumeData, sampleResumeData);
  showPreview.value = true;
};
</script>

<style scoped>
.app-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.app-header {
  text-align: center;
  padding: 2rem 1rem;
  color: white;
}

.app-title {
  font-size: 3rem;
  font-weight: 700;
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.app-subtitle {
  font-size: 1.2rem;
  margin: 0.5rem 0 0 0;
  opacity: 0.9;
}

.main-content {
  padding: 0 1rem 2rem 1rem;
}

.content-wrapper {
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

.content-wrapper:has(.preview-section) {
  grid-template-columns: 1fr 1fr;
  max-width: fit-content;
}

.form-section {
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.preview-section {
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

@media (max-width: 1024px) {
  .content-wrapper:has(.preview-section) {
    grid-template-columns: 1fr;
  }

  .app-title {
    font-size: 2.5rem;
  }
}

@media (max-width: 768px) {
  .app-title {
    font-size: 2rem;
  }

  .main-content {
    padding: 0 0.5rem 1rem 0.5rem;
  }
}
</style>

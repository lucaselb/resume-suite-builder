<template>
  <div class="resume-preview">
    <div class="preview-header">
      <h3>Resume Preview</h3>
      <div class="layout-info">
        <span class="layout-badge">{{ layoutName }} Layout</span>
      </div>
    </div>

    <div class="preview-container" id="resume-preview">
      <component
        :is="layoutComponent"
        :resume-data="resumeData"
        class="resume-layout"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { ResumeData, LayoutType } from "../types/resume";
import ClassicLayout from "./layouts/ClassicLayout.vue";
import ModernLayout from "./layouts/ModernLayout.vue";
import CreativeLayout from "./layouts/CreativeLayout.vue";
import TechnicalLayout from "./layouts/TechnicalLayout.vue";
import MinimalistLayout from "./layouts/MinimalistLayout.vue";

interface Props {
  resumeData: ResumeData;
  layout: LayoutType;
}

const props = defineProps<Props>();

const layoutComponent = computed(() => {
  switch (props.layout) {
    case 1:
      return ClassicLayout;
    case 2:
      return ModernLayout;
    case 3:
      return CreativeLayout;
    case 4:
      return TechnicalLayout;
    case 5:
      return MinimalistLayout;
    default:
      return ClassicLayout;
  }
});

const layoutName = computed(() => {
  const names = {
    1: "Classic",
    2: "Modern",
    3: "Creative",
    4: "Technical",
    5: "Minimalist",
  };
  return names[props.layout] || "Classic";
});
</script>

<style scoped>
.resume-preview {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #f8fafc;
}

.preview-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  background: white;
}

.preview-header h3 {
  color: #374151;
  margin: 0;
  font-size: 1.25rem;
}

.layout-badge {
  background: #646cff;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
}

.preview-actions {
  display: flex;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  background: white;
}

.preview-actions button {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
}

.preview-container {
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
  background: #f1f5f9;
}

.resume-layout {
  max-width: 8.5in;
  min-height: 11in;
  margin: 0 auto;
  background: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
}

@media (max-width: 768px) {
  .preview-actions {
    flex-direction: column;
    gap: 0.5rem;
  }

  .preview-actions button {
    width: 100%;
  }

  .preview-container {
    padding: 1rem;
  }

  .resume-layout {
    max-width: 100%;
    min-height: auto;
  }
}

@media print {
  .preview-header,
  .preview-actions {
    display: none !important;
  }

  .preview-container {
    padding: 0 !important;
    background: white !important;
  }

  .resume-layout {
    box-shadow: none !important;
    border-radius: 0 !important;
    max-width: none !important;
    width: 100% !important;
  }
}
</style>

<template>
  <div class="layout-selector">
    <h2>Choose Your Layout</h2>
    <p class="section-description">
      Select a resume layout that best fits your industry and personal style.
    </p>

    <div class="layouts-grid">
      <div
        v-for="layout in layouts"
        :key="layout.id"
        class="layout-card"
        :class="{ active: selectedLayout === layout.id }"
        @click="selectLayout(layout.id)"
      >
        <div class="layout-preview">
          <div class="preview-placeholder">
            <div class="preview-icon">{{ getLayoutIcon(layout.name) }}</div>
            <div class="preview-text">{{ layout.name }}</div>
          </div>
        </div>

        <div class="layout-info">
          <h3>{{ layout.name }}</h3>
          <p>{{ layout.description }}</p>

          <div class="layout-features">
            <span
              v-for="feature in layout.features"
              :key="feature"
              class="feature-tag"
            >
              {{ feature }}
            </span>
          </div>
        </div>

        <div class="selection-indicator">
          <div v-if="selectedLayout === layout.id" class="selected-badge">
            ✓ Selected
          </div>
          <button
            v-else
            @click.stop="selectLayout(layout.id)"
            class="select-button"
          >
            Select Layout
          </button>
        </div>
      </div>
    </div>

    <div class="layout-tips">
      <h3>💡 Layout Selection Tips:</h3>
      <div class="tips-grid">
        <div class="tip-item">
          <h4>🏢 Traditional Industries</h4>
          <p>
            Banking, Law, Government - Choose <strong>Classic</strong> or
            <strong>Minimalist</strong>
          </p>
        </div>
        <div class="tip-item">
          <h4>💻 Tech Companies</h4>
          <p>
            Software, Startups, IT - Consider <strong>Technical</strong> or
            <strong>Modern</strong>
          </p>
        </div>
        <div class="tip-item">
          <h4>🎨 Creative Fields</h4>
          <p>
            Design, Marketing, Media - Go with <strong>Creative</strong> or
            <strong>Modern</strong>
          </p>
        </div>
        <div class="tip-item">
          <h4>📊 Business Roles</h4>
          <p>
            Management, Consulting, Sales - Try <strong>Classic</strong> or
            <strong>Modern</strong>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { LayoutType } from "../types/resume";

interface Props {
  selectedLayout: LayoutType;
}

interface Emits {
  (e: "update:selectedLayout", value: LayoutType): void;
}

defineProps<Props>();
const emit = defineEmits<Emits>();

const layouts = [
  {
    id: 1 as LayoutType,
    name: "Classic",
    description: "Clean and professional, perfect for traditional industries",
    preview: "/layouts/classic-preview.svg",
    features: [
      "Clean typography",
      "Traditional layout",
      "ATS-friendly",
      "Professional appearance",
    ],
  },
  {
    id: 2 as LayoutType,
    name: "Modern",
    description: "Contemporary design with subtle colors and modern spacing",
    preview: "/layouts/modern-preview.svg",
    features: [
      "Modern design",
      "Subtle colors",
      "Clean spacing",
      "Eye-catching sections",
    ],
  },
  {
    id: 3 as LayoutType,
    name: "Creative",
    description: "Bold and creative layout for design and creative roles",
    preview: "/layouts/creative-preview.svg",
    features: [
      "Creative design",
      "Bold typography",
      "Visual hierarchy",
      "Stand out style",
    ],
  },
  {
    id: 4 as LayoutType,
    name: "Technical",
    description:
      "Optimized for technical roles with emphasis on skills and projects",
    preview: "/layouts/technical-preview.svg",
    features: [
      "Technical focus",
      "Skills emphasis",
      "Project showcase",
      "Code-friendly",
    ],
  },
  {
    id: 5 as LayoutType,
    name: "Minimalist",
    description: "Simple and elegant with focus on content over design",
    preview: "/layouts/minimalist-preview.svg",
    features: [
      "Minimal design",
      "Content focus",
      "Clean lines",
      "Elegant simplicity",
    ],
  },
];

const selectLayout = (layoutId: LayoutType) => {
  emit("update:selectedLayout", layoutId);
};

const getLayoutIcon = (layoutName: string) => {
  const icons: Record<string, string> = {
    Classic: "📄",
    Modern: "✨",
    Creative: "🎨",
    Technical: "⚙️",
    Minimalist: "○",
  };
  return icons[layoutName] || "📄";
};
</script>

<style scoped>
.layout-selector h2 {
  color: #374151;
  margin: 0 0 0.5rem 0;
  font-size: 1.5rem;
}

.section-description {
  color: #6b7280;
  margin: 0 0 2rem 0;
  font-size: 0.875rem;
}

.layouts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.layout-card {
  background: #f9fafb;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.25s ease;
}

.layout-card:hover {
  border-color: #646cff;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(100, 108, 255, 0.15);
}

.layout-card.active {
  border-color: #646cff;
  background: #f8faff;
  box-shadow: 0 4px 20px rgba(100, 108, 255, 0.2);
}

.layout-preview {
  height: 180px;
  background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.layout-card.active .layout-preview {
  background: linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%);
}

.preview-placeholder {
  text-align: center;
  color: #64748b;
}

.preview-icon {
  font-size: 3rem;
  margin-bottom: 0.5rem;
}

.preview-text {
  font-weight: 600;
  font-size: 1.125rem;
}

.layout-info {
  padding: 1.5rem;
}

.layout-info h3 {
  color: #1f2937;
  margin: 0 0 0.5rem 0;
  font-size: 1.25rem;
  font-weight: 600;
}

.layout-info p {
  color: #6b7280;
  margin: 0 0 1rem 0;
  font-size: 0.875rem;
  line-height: 1.5;
}

.layout-features {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.feature-tag {
  background: #e5e7eb;
  color: #374151;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
}

.layout-card.active .feature-tag {
  background: #dbeafe;
  color: #1e40af;
}

.selection-indicator {
  padding: 1rem 1.5rem;
  border-top: 1px solid #e5e7eb;
  background: white;
}

.layout-card.active .selection-indicator {
  background: #f8faff;
  border-top-color: #e0e7ff;
}

.selected-badge {
  background: #10b981;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  text-align: center;
  font-weight: 600;
  font-size: 0.875rem;
}

.select-button {
  width: 100%;
  padding: 0.5rem 1rem;
  background: #646cff;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.25s;
}

.select-button:hover {
  background: #535bf2;
}

.layout-tips {
  background: #f8faff;
  border: 1px solid #e0e7ff;
  border-radius: 8px;
  padding: 1.5rem;
  border-left: 4px solid #646cff;
}

.layout-tips h3 {
  color: #374151;
  margin: 0 0 1rem 0;
  font-size: 1rem;
}

.tips-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.tip-item {
  background: white;
  border: 1px solid #e0e7ff;
  border-radius: 6px;
  padding: 1rem;
}

.tip-item h4 {
  color: #1f2937;
  margin: 0 0 0.5rem 0;
  font-size: 0.875rem;
  font-weight: 600;
}

.tip-item p {
  color: #6b7280;
  margin: 0;
  font-size: 0.75rem;
  line-height: 1.4;
}

@media (max-width: 768px) {
  .layouts-grid {
    grid-template-columns: 1fr;
  }

  .tips-grid {
    grid-template-columns: 1fr;
  }

  .layout-info {
    padding: 1rem;
  }

  .selection-indicator {
    padding: 0.75rem 1rem;
  }
}
</style>

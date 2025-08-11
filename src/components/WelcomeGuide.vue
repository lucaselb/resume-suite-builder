<template>
  <div v-if="showGuide" class="welcome-overlay">
    <div class="welcome-modal">
      <div class="welcome-header">
        <h2>Welcome to Resume Suite! 🎉</h2>
        <p>Create professional resumes with ease. Here's how to get started:</p>
      </div>

      <div class="welcome-steps">
        <div v-for="(step, index) in steps" :key="index" class="step">
          <div class="step-number">{{ index + 1 }}</div>
          <div class="step-icon">{{ step.icon }}</div>
          <div class="step-content">
            <h3>{{ step.title }}</h3>
            <p>{{ step.description }}</p>
          </div>
        </div>
      </div>

      <div class="welcome-actions">
        <button @click="closeGuide" class="btn-primary">🚀 Get Started</button>
        <button
          @click="
            $emit('loadSample');
            closeGuide();
          "
          class="btn-secondary"
        >
          ✨ Try Sample Data
        </button>
      </div>

      <button @click="closeGuide" class="close-button" title="Close">✕</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const showGuide = ref(true);

const steps = [
  {
    icon: "📝",
    title: "Fill Your Information",
    description:
      "Start by adding your personal information, work experience, education, and skills using the form sections.",
  },
  {
    icon: "🎨",
    title: "Choose a Layout",
    description:
      "Select from 5 professional resume layouts including Classic, Modern, Creative, Technical, and Minimalist.",
  },
  {
    icon: "👁️",
    title: "Preview Your Resume",
    description:
      "Toggle the preview to see how your resume looks in real-time as you make changes.",
  },
  {
    icon: "📄",
    title: "Download as PDF",
    description:
      "Once satisfied, download your resume as a high-quality PDF ready for applications.",
  },
  {
    icon: "💾",
    title: "Save & Import",
    description:
      "Export your data as JSON to save your work, or import previously saved resume data.",
  },
];

const closeGuide = () => {
  showGuide.value = false;
  localStorage.setItem("resume-guide-seen", "true");
};

// Check if user has seen the guide before
const hasSeenGuide = localStorage.getItem("resume-guide-seen");
if (hasSeenGuide) {
  showGuide.value = false;
}
</script>

<style scoped>
.welcome-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 1rem;
}

.welcome-modal {
  background: white;
  border-radius: 16px;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.welcome-header {
  text-align: center;
  padding: 2rem 2rem 1rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 16px 16px 0 0;
}

.welcome-header h2 {
  margin: 0 0 0.5rem 0;
  font-size: 1.75rem;
  font-weight: 700;
}

.welcome-header p {
  margin: 0;
  opacity: 0.9;
  font-size: 1.1rem;
}

.welcome-steps {
  padding: 2rem;
}

.step {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 12px;
  border-left: 4px solid #667eea;
}

.step:last-child {
  margin-bottom: 0;
}

.step-number {
  background: #667eea;
  color: white;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.875rem;
  flex-shrink: 0;
}

.step-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.step-content {
  flex: 1;
}

.step-content h3 {
  margin: 0 0 0.5rem 0;
  color: #374151;
  font-size: 1.1rem;
  font-weight: 600;
}

.step-content p {
  margin: 0;
  color: #6b7280;
  line-height: 1.5;
}

.welcome-actions {
  padding: 1.5rem 2rem 2rem 2rem;
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.welcome-actions button {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: all 0.25s;
}

.btn-primary {
  background: #667eea;
  color: white;
}

.btn-primary:hover {
  background: #5a67d8;
  transform: translateY(-1px);
}

.btn-secondary {
  background: #e5e7eb;
  color: #374151;
}

.btn-secondary:hover {
  background: #d1d5db;
}

.close-button {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 0.875rem;
  transition: background 0.25s;
}

.close-button:hover {
  background: rgba(255, 255, 255, 0.3);
}

@media (max-width: 768px) {
  .welcome-modal {
    margin: 1rem;
    max-width: none;
  }

  .welcome-header {
    padding: 1.5rem 1rem 1rem 1rem;
  }

  .welcome-header h2 {
    font-size: 1.5rem;
  }

  .welcome-steps {
    padding: 1.5rem 1rem;
  }

  .step {
    flex-direction: column;
    text-align: center;
    gap: 0.75rem;
  }

  .step-number,
  .step-icon {
    align-self: center;
  }

  .welcome-actions {
    padding: 1rem;
    flex-direction: column;
  }

  .welcome-actions button {
    width: 100%;
  }
}
</style>

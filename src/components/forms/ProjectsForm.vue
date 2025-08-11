<template>
  <div class="projects-form">
    <div class="section-header">
      <h2>Projects</h2>
      <button @click="addProject" class="btn-primary add-button">
        + Add Project
      </button>
    </div>
    <p class="section-description">
      Showcase your personal projects, portfolio work, or significant
      contributions.
    </p>

    <div v-if="projects.length === 0" class="empty-state">
      <div class="empty-icon">🚀</div>
      <p>No projects added yet.</p>
      <button @click="addProject" class="btn-primary">
        Add Your First Project
      </button>
    </div>

    <div
      v-for="(project, index) in projects"
      :key="project.id"
      class="project-item"
    >
      <div class="item-header">
        <span class="item-number">{{ index + 1 }}</span>
        <div class="item-controls">
          <button
            @click="moveUp(index)"
            :disabled="index === 0"
            class="btn-control"
            title="Move up"
          >
            ⬆️
          </button>
          <button
            @click="moveDown(index)"
            :disabled="index === projects.length - 1"
            class="btn-control"
            title="Move down"
          >
            ⬇️
          </button>
          <button
            @click="removeProject(project.id)"
            class="btn-danger btn-control"
            title="Remove"
          >
            🗑️
          </button>
        </div>
      </div>

      <div class="form-grid">
        <div class="form-group">
          <label>Project Name *</label>
          <input
            :value="project.name"
            @input="
              updateProject(
                project.id,
                'name',
                ($event.target as HTMLInputElement).value
              )
            "
            type="text"
            placeholder="E-commerce Platform"
            required
          />
        </div>

        <div class="form-group">
          <label>Technologies Used</label>
          <input
            :value="project.technologies.join(', ')"
            @input="
              updateTechnologies(
                project.id,
                ($event.target as HTMLInputElement).value
              )
            "
            type="text"
            placeholder="React, Node.js, MongoDB, AWS"
          />
          <small class="help-text">Separate technologies with commas</small>
        </div>

        <div class="form-group">
          <label>Start Date</label>
          <input
            :value="project.startDate"
            @input="
              updateProject(
                project.id,
                'startDate',
                ($event.target as HTMLInputElement).value
              )
            "
            type="month"
          />
        </div>

        <div class="form-group">
          <label>End Date</label>
          <input
            :value="project.endDate"
            @input="
              updateProject(
                project.id,
                'endDate',
                ($event.target as HTMLInputElement).value
              )
            "
            type="month"
          />
        </div>

        <div class="form-group">
          <label>Live Demo URL</label>
          <input
            :value="project.url"
            @input="
              updateProject(
                project.id,
                'url',
                ($event.target as HTMLInputElement).value
              )
            "
            type="url"
            placeholder="https://myproject.com"
          />
        </div>

        <div class="form-group">
          <label>GitHub Repository</label>
          <input
            :value="project.github"
            @input="
              updateProject(
                project.id,
                'github',
                ($event.target as HTMLInputElement).value
              )
            "
            type="url"
            placeholder="https://github.com/username/project"
          />
        </div>

        <div class="form-group full-width">
          <label>Project Description *</label>
          <textarea
            :value="project.description"
            @input="
              updateProject(
                project.id,
                'description',
                ($event.target as HTMLTextAreaElement).value
              )
            "
            rows="4"
            placeholder="Developed a full-stack e-commerce platform with user authentication, payment processing, and inventory management. Implemented responsive design and optimized for performance, resulting in 40% faster load times."
            required
          ></textarea>
          <small class="help-text"
            >Describe what the project does, your role, and key
            achievements</small
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Project } from "../../types/resume";

interface Props {
  projects: Project[];
}

interface Emits {
  (e: "update:projects", value: Project[]): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const addProject = () => {
  const newProject: Project = {
    id: Date.now().toString(),
    name: "",
    description: "",
    technologies: [],
    url: "",
    github: "",
    startDate: "",
    endDate: "",
  };

  emit("update:projects", [...props.projects, newProject]);
};

const removeProject = (id: string) => {
  const updated = props.projects.filter((project) => project.id !== id);
  emit("update:projects", updated);
};

const updateProject = (id: string, field: keyof Project, value: any) => {
  const updated = props.projects.map((project) =>
    project.id === id ? { ...project, [field]: value } : project
  );
  emit("update:projects", updated);
};

const updateTechnologies = (id: string, techString: string) => {
  const technologies = techString
    .split(",")
    .map((tech) => tech.trim())
    .filter((tech) => tech);
  updateProject(id, "technologies", technologies);
};

const moveUp = (index: number) => {
  if (index > 0) {
    const updated = [...props.projects];
    [updated[index], updated[index - 1]] = [updated[index - 1], updated[index]];
    emit("update:projects", updated);
  }
};

const moveDown = (index: number) => {
  if (index < props.projects.length - 1) {
    const updated = [...props.projects];
    [updated[index], updated[index + 1]] = [updated[index + 1], updated[index]];
    emit("update:projects", updated);
  }
};
</script>

<style scoped>
.projects-form h2 {
  color: #374151;
  margin: 0;
  font-size: 1.5rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.add-button {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
}

.section-description {
  color: #6b7280;
  margin: 0 0 2rem 0;
  font-size: 0.875rem;
}

.empty-state {
  text-align: center;
  padding: 3rem 1rem;
  color: #6b7280;
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.project-item {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.item-number {
  background: #f59e0b;
  color: white;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.875rem;
}

.item-controls {
  display: flex;
  gap: 0.5rem;
}

.btn-control {
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  min-width: auto;
}

.btn-control:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.form-group.full-width {
  grid-column: span 2;
}

.help-text {
  display: block;
  color: #6b7280;
  font-size: 0.75rem;
  margin-top: 0.5rem;
}

.preview-content {
  border: 1px solid #d1d5db;
  border-radius: 6px;
  padding: 1rem;
  background: white;
}

.preview-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.75rem;
}

.preview-header h5 {
  color: #1f2937;
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
}

.preview-links {
  display: flex;
  gap: 0.5rem;
}

.preview-link {
  font-size: 0.75rem;
  color: #646cff;
  text-decoration: underline;
}

.preview-technologies {
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
  margin-bottom: 0.75rem;
}

.tech-tag {
  background: #e5e7eb;
  color: #374151;
  padding: 0.125rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
}

.preview-description {
  color: #4b5563;
  margin: 0 0 0.75rem 0;
  font-size: 0.875rem;
  line-height: 1.5;
}

.preview-dates {
  color: #6b7280;
  font-size: 0.75rem;
  font-style: italic;
}

@media (max-width: 768px) {
  .section-header {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }

  .add-button {
    width: 100%;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }

  .form-group.full-width {
    grid-column: span 1;
  }

  .preview-header {
    flex-direction: column;
    gap: 0.5rem;
  }

  .preview-links {
    align-self: flex-start;
  }

  .item-controls {
    flex-wrap: wrap;
  }
}
</style>

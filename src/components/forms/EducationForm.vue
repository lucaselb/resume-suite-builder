<template>
  <div class="education-form">
    <div class="section-header">
      <h2>Education</h2>
      <button @click="addEducation" class="btn-primary add-button">
        + Add Education
      </button>
    </div>
    <p class="section-description">
      List your educational background in reverse chronological order.
    </p>

    <div v-if="education.length === 0" class="empty-state">
      <div class="empty-icon">🎓</div>
      <p>No education added yet.</p>
      <button @click="addEducation" class="btn-primary">
        Add Your First Education
      </button>
    </div>

    <div v-for="(edu, index) in education" :key="edu.id" class="education-item">
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
            :disabled="index === education.length - 1"
            class="btn-control"
            title="Move down"
          >
            ⬇️
          </button>
          <button
            @click="removeEducation(edu.id)"
            class="btn-danger btn-control"
            title="Remove"
          >
            🗑️
          </button>
        </div>
      </div>

      <div class="form-grid">
        <div class="form-group">
          <label>Institution *</label>
          <input
            :value="edu.institution"
            @input="
              updateEducation(
                edu.id,
                'institution',
                ($event.target as HTMLInputElement).value
              )
            "
            type="text"
            placeholder="University of Example"
            required
          />
        </div>

        <div class="form-group">
          <label>Degree *</label>
          <input
            :value="edu.degree"
            @input="
              updateEducation(
                edu.id,
                'degree',
                ($event.target as HTMLInputElement).value
              )
            "
            type="text"
            placeholder="Bachelor of Science"
            required
          />
        </div>

        <div class="form-group">
          <label>Field of Study *</label>
          <input
            :value="edu.field"
            @input="
              updateEducation(
                edu.id,
                'field',
                ($event.target as HTMLInputElement).value
              )
            "
            type="text"
            placeholder="Computer Science"
            required
          />
        </div>

        <div class="form-group">
          <label>GPA (Optional)</label>
          <input
            :value="edu.gpa"
            @input="
              updateEducation(
                edu.id,
                'gpa',
                ($event.target as HTMLInputElement).value
              )
            "
            type="text"
            placeholder="3.8/4.0"
          />
        </div>

        <div class="form-group">
          <label>Start Date *</label>
          <input
            :value="edu.startDate"
            @input="
              updateEducation(
                edu.id,
                'startDate',
                ($event.target as HTMLInputElement).value
              )
            "
            type="month"
            required
          />
        </div>

        <div class="form-group">
          <label>End Date *</label>
          <input
            :value="edu.endDate"
            @input="
              updateEducation(
                edu.id,
                'endDate',
                ($event.target as HTMLInputElement).value
              )
            "
            type="month"
            required
          />
        </div>

        <div class="form-group full-width">
          <label>Additional Details (Optional)</label>
          <textarea
            :value="edu.description"
            @input="
              updateEducation(
                edu.id,
                'description',
                ($event.target as HTMLTextAreaElement).value
              )
            "
            rows="3"
            placeholder="• Relevant coursework: Data Structures, Algorithms, Web Development&#10;• Dean's List (Fall 2020, Spring 2021)&#10;• Senior Project: E-commerce Platform using React and Node.js"
          ></textarea>
          <small class="help-text"
            >Include honors, relevant coursework, projects, or activities</small
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Education } from "../../types/resume";

interface Props {
  education: Education[];
}

interface Emits {
  (e: "update:education", value: Education[]): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const addEducation = () => {
  const newEducation: Education = {
    id: Date.now().toString(),
    institution: "",
    degree: "",
    field: "",
    startDate: "",
    endDate: "",
    gpa: "",
    description: "",
  };

  emit("update:education", [...props.education, newEducation]);
};

const removeEducation = (id: string) => {
  const updated = props.education.filter((edu) => edu.id !== id);
  emit("update:education", updated);
};

const updateEducation = (id: string, field: keyof Education, value: any) => {
  const updated = props.education.map((edu) =>
    edu.id === id ? { ...edu, [field]: value } : edu
  );
  emit("update:education", updated);
};

const moveUp = (index: number) => {
  if (index > 0) {
    const updated = [...props.education];
    [updated[index], updated[index - 1]] = [updated[index - 1], updated[index]];
    emit("update:education", updated);
  }
};

const moveDown = (index: number) => {
  if (index < props.education.length - 1) {
    const updated = [...props.education];
    [updated[index], updated[index + 1]] = [updated[index + 1], updated[index]];
    emit("update:education", updated);
  }
};
</script>

<style scoped>
.education-form h2 {
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

.education-item {
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
  background: #10b981;
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

  .item-controls {
    flex-wrap: wrap;
  }
}
</style>

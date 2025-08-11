<template>
  <div class="experience-form">
    <div class="section-header">
      <h2>Work Experience</h2>
      <button @click="addExperience" class="btn-primary add-button">
        + Add Experience
      </button>
    </div>
    <p class="section-description">
      List your work experience in reverse chronological order (most recent
      first).
    </p>

    <div v-if="experience.length === 0" class="empty-state">
      <div class="empty-icon">💼</div>
      <p>No work experience added yet.</p>
      <button @click="addExperience" class="btn-primary">
        Add Your First Experience
      </button>
    </div>

    <div
      v-for="(exp, index) in experience"
      :key="exp.id"
      class="experience-item"
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
            :disabled="index === experience.length - 1"
            class="btn-control"
            title="Move down"
          >
            ⬇️
          </button>
          <button
            @click="removeExperience(exp.id)"
            class="btn-danger btn-control"
            title="Remove"
          >
            🗑️
          </button>
        </div>
      </div>

      <div class="form-grid">
        <div class="form-group">
          <label>Company *</label>
          <input
            :value="exp.company"
            @input="
              updateExperience(
                exp.id,
                'company',
                ($event.target as HTMLInputElement).value
              )
            "
            type="text"
            placeholder="Company Name"
            required
          />
        </div>

        <div class="form-group">
          <label>Position *</label>
          <input
            :value="exp.position"
            @input="
              updateExperience(
                exp.id,
                'position',
                ($event.target as HTMLInputElement).value
              )
            "
            type="text"
            placeholder="Job Title"
            required
          />
        </div>

        <div class="form-group">
          <label>Location</label>
          <input
            :value="exp.location"
            @input="
              updateExperience(
                exp.id,
                'location',
                ($event.target as HTMLInputElement).value
              )
            "
            type="text"
            placeholder="City, State"
          />
        </div>

        <div class="form-group">
          <label>Start Date *</label>
          <input
            :value="exp.startDate"
            @input="
              updateExperience(
                exp.id,
                'startDate',
                ($event.target as HTMLInputElement).value
              )
            "
            type="month"
            required
          />
        </div>

        <div class="form-group">
          <label>End Date</label>
          <input
            :value="exp.endDate"
            @input="
              updateExperience(
                exp.id,
                'endDate',
                ($event.target as HTMLInputElement).value
              )
            "
            type="month"
            :disabled="exp.current"
          />
        </div>

        <div class="form-group">
          <label class="checkbox-label">
            <input
              :checked="exp.current"
              @change="
                updateExperience(
                  exp.id,
                  'current',
                  ($event.target as HTMLInputElement).checked
                )
              "
              type="checkbox"
            />
            Currently working here
          </label>
        </div>

        <div class="form-group full-width">
          <label>Description</label>
          <textarea
            :value="exp.description"
            @input="
              updateExperience(
                exp.id,
                'description',
                ($event.target as HTMLTextAreaElement).value
              )
            "
            rows="4"
            placeholder="• Developed and maintained web applications using React and Node.js&#10;• Led a team of 3 developers to deliver projects on time&#10;• Improved system performance by 40% through code optimization"
          ></textarea>
          <small class="help-text"
            >Use bullet points to describe your achievements and
            responsibilities</small
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Experience } from "../../types/resume";

interface Props {
  experience: Experience[];
}

interface Emits {
  (e: "update:experience", value: Experience[]): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const addExperience = () => {
  const newExperience: Experience = {
    id: Date.now().toString(),
    company: "",
    position: "",
    location: "",
    startDate: "",
    endDate: "",
    current: false,
    description: "",
  };

  emit("update:experience", [...props.experience, newExperience]);
};

const removeExperience = (id: string) => {
  const updated = props.experience.filter((exp) => exp.id !== id);
  emit("update:experience", updated);
};

const updateExperience = (id: string, field: keyof Experience, value: any) => {
  const updated = props.experience.map((exp) =>
    exp.id === id ? { ...exp, [field]: value } : exp
  );
  emit("update:experience", updated);
};

const moveUp = (index: number) => {
  if (index > 0) {
    const updated = [...props.experience];
    [updated[index], updated[index - 1]] = [updated[index - 1], updated[index]];
    emit("update:experience", updated);
  }
};

const moveDown = (index: number) => {
  if (index < props.experience.length - 1) {
    const updated = [...props.experience];
    [updated[index], updated[index + 1]] = [updated[index + 1], updated[index]];
    emit("update:experience", updated);
  }
};
</script>

<style scoped>
.experience-form h2 {
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

.experience-item {
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
  background: #646cff;
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

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
  cursor: pointer;
}

.checkbox-label input[type="checkbox"] {
  width: auto;
  margin: 0;
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

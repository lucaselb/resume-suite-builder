<template>
  <div class="skills-form">
    <div class="section-header">
      <h2>Skills</h2>
      <button @click="addSkill" class="btn-primary add-button">
        + Add Skill
      </button>
    </div>
    <p class="section-description">
      List your technical and professional skills organized by category.
    </p>

    <div v-if="skills.length === 0" class="empty-state">
      <div class="empty-icon">⚡</div>
      <p>No skills added yet.</p>
      <button @click="addSkill" class="btn-primary">
        Add Your First Skill
      </button>
    </div>

    <div v-else class="skills-content">
      <!-- Skills List View -->
      <div class="skills-list">
        <div v-for="skill in skills" :key="skill.id" class="skill-item">
          <div class="form-grid">
            <div class="form-group">
              <label>Skill Name *</label>
              <input
                :value="skill.name"
                @input="
                  updateSkill(
                    skill.id,
                    'name',
                    ($event.target as HTMLInputElement).value
                  )
                "
                type="text"
                placeholder="JavaScript, Python, Project Management..."
                required
              />
            </div>

            <div class="form-group">
              <label>Category</label>
              <input
                :value="skill.category"
                @input="
                  updateSkill(
                    skill.id,
                    'category',
                    ($event.target as HTMLInputElement).value
                  )
                "
                type="text"
                placeholder="Programming Languages, Tools, Soft Skills..."
                list="categories"
              />
              <datalist id="categories">
                <option
                  v-for="category in getUniqueCategories()"
                  :key="category"
                  :value="category"
                />
                <option value="Programming Languages" />
                <option value="Frameworks & Libraries" />
                <option value="Tools & Technologies" />
                <option value="Databases" />
                <option value="Soft Skills" />
                <option value="Languages" />
              </datalist>
            </div>

            <div class="form-group">
              <label>Proficiency Level</label>
              <select
                :value="skill.level"
                @change="
                  updateSkill(
                    skill.id,
                    'level',
                    ($event.target as HTMLSelectElement).value
                  )
                "
              >
                <option
                  v-for="level in skillLevels"
                  :key="level"
                  :value="level"
                >
                  {{ level }}
                </option>
              </select>
            </div>

            <div class="form-group">
              <button
                @click="removeSkill(skill.id)"
                class="btn-danger btn-small"
                title="Remove skill"
              >
                🗑️ Remove
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Skills Preview -->
      <div v-if="skills.length > 0" class="skills-preview">
        <h3>Skills Preview</h3>
        <div
          v-for="(skillGroup, category) in groupedSkills()"
          :key="category"
          class="skill-category"
        >
          <h4>{{ category }}</h4>
          <div class="skill-tags">
            <span
              v-for="skill in skillGroup"
              :key="skill.id"
              class="skill-tag"
              :class="`level-${skill.level.toLowerCase()}`"
            >
              {{ skill.name }}
              <small>{{ skill.level }}</small>
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="tips">
      <h3>💡 Tips for adding skills:</h3>
      <ul>
        <li>
          Group similar skills into categories (e.g., "Programming Languages",
          "Tools")
        </li>
        <li>Be honest about your proficiency levels</li>
        <li>Include both technical and soft skills</li>
        <li>Prioritize skills relevant to your target job</li>
        <li>Keep the list concise and focused</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Skill } from "../../types/resume";

interface Props {
  skills: Skill[];
}

interface Emits {
  (e: "update:skills", value: Skill[]): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const skillLevels = ["Beginner", "Intermediate", "Advanced", "Expert"] as const;

const addSkill = () => {
  const newSkill: Skill = {
    id: Date.now().toString(),
    name: "",
    level: "Intermediate",
    category: "",
  };

  emit("update:skills", [...props.skills, newSkill]);
};

const removeSkill = (id: string) => {
  const updated = props.skills.filter((skill) => skill.id !== id);
  emit("update:skills", updated);
};

const updateSkill = (id: string, field: keyof Skill, value: any) => {
  const updated = props.skills.map((skill) =>
    skill.id === id ? { ...skill, [field]: value } : skill
  );
  emit("update:skills", updated);
};

const getUniqueCategories = () => {
  const categories = props.skills
    .map((skill) => skill.category)
    .filter((cat) => cat.trim() !== "");
  return [...new Set(categories)];
};

const groupedSkills = () => {
  const groups: { [key: string]: Skill[] } = {};

  props.skills.forEach((skill) => {
    const category = skill.category || "Uncategorized";
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(skill);
  });

  return groups;
};
</script>

<style scoped>
.skills-form h2 {
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

.skills-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
}

.skill-item {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1rem;
}

.form-grid {
  display: grid;
  grid-template-columns: 2fr 2fr 1fr auto;
  gap: 1rem;
  align-items: end;
}

.btn-small {
  padding: 0.5rem 0.75rem;
  font-size: 0.75rem;
  white-space: nowrap;
}

.skills-preview {
  background: #f8faff;
  border: 1px solid #e0e7ff;
  border-radius: 8px;
  padding: 1.5rem;
  max-height: 600px;
  overflow-y: auto;
}

.skills-preview h3 {
  color: #374151;
  margin: 0 0 1rem 0;
  font-size: 1.125rem;
}

.skill-category {
  margin-bottom: 1.5rem;
}

.skill-category h4 {
  color: #4b5563;
  margin: 0 0 0.75rem 0;
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.skill-tag {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 500;
  text-align: center;
  min-width: 80px;
}

.skill-tag small {
  font-size: 0.625rem;
  opacity: 0.8;
  margin-top: 0.125rem;
}

.level-beginner {
  background: #fef3c7;
  color: #92400e;
}

.level-intermediate {
  background: #dbeafe;
  color: #1e40af;
}

.level-advanced {
  background: #d1fae5;
  color: #065f46;
}

.level-expert {
  background: #fce7f3;
  color: #be185d;
}

.tips {
  margin-top: 2rem;
  padding: 1.5rem;
  background: #f8faff;
  border-radius: 8px;
  border-left: 4px solid #646cff;
}

.tips h3 {
  color: #374151;
  margin: 0 0 1rem 0;
  font-size: 1rem;
}

.tips ul {
  margin: 0;
  padding-left: 1.5rem;
  color: #6b7280;
}

.tips li {
  margin-bottom: 0.5rem;
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

  .skills-content {
    grid-template-columns: 1fr;
  }

  .form-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .skill-tags {
    gap: 0.25rem;
  }

  .skill-tag {
    min-width: auto;
    padding: 0.375rem 0.5rem;
  }
}
</style>

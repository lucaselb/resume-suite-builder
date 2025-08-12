<template>
  <div class="languages-form">
    <div class="section-header">
      <h2>Languages</h2>
      <button @click="addLanguage" class="btn-primary add-button">
        + Add Language
      </button>
    </div>
    <p class="section-description">
      List the languages you speak and your proficiency level in each.
    </p>

    <div v-if="languages.length === 0" class="empty-state">
      <div class="empty-icon">🌍</div>
      <p>No languages added yet.</p>
      <button @click="addLanguage" class="btn-primary">
        Add Your First Language
      </button>
    </div>

    <div v-else class="languages-content">
      <div class="languages-grid">
        <div
          v-for="language in languages"
          :key="language.id"
          class="language-item"
        >
          <div class="form-grid">
            <div class="form-group">
              <label>Language *</label>
              <input
                :value="language.name"
                @input="
                  updateLanguage(
                    language.id,
                    'name',
                    ($event.target as HTMLInputElement).value
                  )
                "
                type="text"
                placeholder="English, Spanish, French..."
                required
                list="common-languages"
              />
              <datalist id="common-languages">
                <option value="English" />
                <option value="Spanish" />
                <option value="French" />
                <option value="German" />
                <option value="Italian" />
                <option value="Portuguese" />
                <option value="Chinese (Mandarin)" />
                <option value="Chinese (Cantonese)" />
                <option value="Japanese" />
                <option value="Korean" />
                <option value="Arabic" />
                <option value="Russian" />
                <option value="Hindi" />
                <option value="Dutch" />
                <option value="Swedish" />
                <option value="Norwegian" />
                <option value="Danish" />
                <option value="Polish" />
                <option value="Czech" />
                <option value="Hungarian" />
                <option value="Greek" />
                <option value="Turkish" />
                <option value="Hebrew" />
                <option value="Thai" />
                <option value="Vietnamese" />
                <option value="Indonesian" />
                <option value="Malay" />
                <option value="Finnish" />
                <option value="Estonian" />
                <option value="Latvian" />
                <option value="Lithuanian" />
              </datalist>
            </div>

            <div class="form-group">
              <label>Proficiency Level *</label>
              <select
                :value="language.proficiency"
                @change="
                  updateLanguage(
                    language.id,
                    'proficiency',
                    ($event.target as HTMLSelectElement).value
                  )
                "
                required
              >
                <option
                  v-for="level in proficiencyLevels"
                  :key="level"
                  :value="level"
                >
                  {{ getProficiencyIcon(level) }} {{ level }}
                </option>
              </select>
            </div>

            <div class="form-group">
              <button
                @click="removeLanguage(language.id)"
                class="btn-danger btn-small"
                title="Remove language"
              >
                🗑️ Remove
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Languages Preview -->
      <div class="languages-preview">
        <h3>Languages Preview</h3>
        <div class="preview-grid">
          <div
            v-for="language in languages.filter((l) => l.name)"
            :key="language.id"
            class="language-preview-item"
          >
            <div class="language-header">
              <span class="language-name">{{ language.name }}</span>
              <span
                class="proficiency-badge"
                :class="`level-${language.proficiency.toLowerCase()}`"
              >
                {{ getProficiencyIcon(language.proficiency) }}
                {{ language.proficiency }}
              </span>
            </div>
            <div class="proficiency-bar">
              <div
                class="proficiency-fill"
                :style="{ width: getProficiencyWidth(language.proficiency) }"
                :class="`level-${language.proficiency.toLowerCase()}`"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="tips">
      <h3>💡 Tips for language proficiency:</h3>
      <div class="proficiency-guide">
        <div class="proficiency-item">
          <span class="proficiency-icon">🌱</span>
          <div>
            <strong>Basic:</strong> Can understand and use everyday expressions
            and basic phrases
          </div>
        </div>
        <div class="proficiency-item">
          <span class="proficiency-icon">💬</span>
          <div>
            <strong>Conversational:</strong> Can communicate in simple and
            routine tasks
          </div>
        </div>
        <div class="proficiency-item">
          <span class="proficiency-icon">🗣️</span>
          <div>
            <strong>Fluent:</strong> Can use language flexibly and effectively
            for social, academic and professional purposes
          </div>
        </div>
        <div class="proficiency-item">
          <span class="proficiency-icon">🏆</span>
          <div>
            <strong>Native:</strong> Native speaker or equivalent proficiency
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Language } from "../../types/resume";

interface Props {
  languages: Language[];
}

interface Emits {
  (e: "update:languages", value: Language[]): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const proficiencyLevels = [
  "Basic",
  "Conversational",
  "Fluent",
  "Native",
] as const;

const addLanguage = () => {
  const newLanguage: Language = {
    id: Date.now().toString(),
    name: "",
    proficiency: "Conversational",
  };

  emit("update:languages", [...props.languages, newLanguage]);
};

const removeLanguage = (id: string) => {
  const updated = props.languages.filter((lang) => lang.id !== id);
  emit("update:languages", updated);
};

const updateLanguage = (id: string, field: keyof Language, value: any) => {
  const updated = props.languages.map((lang) =>
    lang.id === id ? { ...lang, [field]: value } : lang
  );
  emit("update:languages", updated);
};

const getProficiencyIcon = (level: string): string => {
  const icons = {
    Basic: "🌱",
    Conversational: "💬",
    Fluent: "🗣️",
    Native: "🏆",
  };
  return icons[level as keyof typeof icons] || "💬";
};

const getProficiencyWidth = (level: string) => {
  const widths: Record<string, string> = {
    Basic: "25%",
    Conversational: "50%",
    Fluent: "75%",
    Native: "100%",
  };
  return widths[level] || "50%";
};
</script>

<style scoped>
.languages-form h2 {
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

.languages-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
}

.languages-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.language-item {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1.5rem;
}

.form-grid {
  display: grid;
  grid-template-columns: 2fr 2fr auto;
  gap: 1rem;
  align-items: end;
}

.btn-small {
  padding: 0.5rem 0.75rem;
  font-size: 0.75rem;
  white-space: nowrap;
}

.help-text {
  display: block;
  color: #6b7280;
  font-size: 0.75rem;
  margin-top: 0.5rem;
  font-style: italic;
}

.languages-preview {
  background: #f8faff;
  border: 1px solid #e0e7ff;
  border-radius: 8px;
  padding: 1.5rem;
  max-height: 500px;
  overflow-y: auto;
}

.languages-preview h3 {
  color: #374151;
  margin: 0 0 1rem 0;
  font-size: 1.125rem;
}

.preview-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.language-preview-item {
  background: white;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  padding: 1rem;
}

.language-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.language-name {
  font-weight: 600;
  color: #1f2937;
}

.proficiency-badge {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
}

.proficiency-bar {
  height: 6px;
  background: #e5e7eb;
  border-radius: 3px;
  overflow: hidden;
}

.proficiency-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 0.3s ease;
}

.level-basic .proficiency-fill,
.level-basic.proficiency-badge {
  background: #fbbf24;
  color: #92400e;
}

.level-conversational .proficiency-fill,
.level-conversational.proficiency-badge {
  background: #60a5fa;
  color: #1e40af;
}

.level-fluent .proficiency-fill,
.level-fluent.proficiency-badge {
  background: #34d399;
  color: #065f46;
}

.level-native .proficiency-fill,
.level-native.proficiency-badge {
  background: #a78bfa;
  color: #5b21b6;
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

.proficiency-guide {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.proficiency-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.proficiency-icon {
  font-size: 1.25rem;
  margin-top: 0.125rem;
}

.proficiency-item div {
  color: #4b5563;
  font-size: 0.875rem;
  line-height: 1.4;
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

  .languages-content {
    grid-template-columns: 1fr;
  }

  .form-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .language-header {
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-start;
  }

  .proficiency-guide {
    gap: 0.5rem;
  }

  .proficiency-item {
    flex-direction: column;
    gap: 0.25rem;
  }
}
</style>

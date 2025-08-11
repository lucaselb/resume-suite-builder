<template>
  <div class="personal-info-form">
    <h2>Personal Information</h2>
    <p class="section-description">
      Enter your basic contact information and professional profiles.
    </p>

    <div class="form-grid">
      <div class="form-group">
        <label for="fullName">Full Name *</label>
        <input
          id="fullName"
          :value="personalInfo.fullName"
          @input="
            updateField('fullName', ($event.target as HTMLInputElement).value)
          "
          type="text"
          placeholder="John Doe"
          required
        />
      </div>

      <div class="form-group">
        <label for="email">Email Address *</label>
        <input
          id="email"
          :value="personalInfo.email"
          @input="
            updateField('email', ($event.target as HTMLInputElement).value)
          "
          type="email"
          placeholder="john.doe@example.com"
          required
        />
      </div>

      <div class="form-group">
        <label for="phone">Phone Number *</label>
        <input
          id="phone"
          :value="personalInfo.phone"
          @input="
            updateField('phone', ($event.target as HTMLInputElement).value)
          "
          type="tel"
          placeholder="+1 (555) 123-4567"
          required
        />
      </div>

      <div class="form-group">
        <label for="address">Address *</label>
        <input
          id="address"
          :value="personalInfo.address"
          @input="
            updateField('address', ($event.target as HTMLInputElement).value)
          "
          type="text"
          placeholder="City, State, Country"
          required
        />
      </div>

      <div class="form-group">
        <label for="website">Website</label>
        <input
          id="website"
          :value="personalInfo.website"
          @input="
            updateField('website', ($event.target as HTMLInputElement).value)
          "
          type="url"
          placeholder="https://johndoe.com"
        />
      </div>

      <div class="form-group">
        <label for="linkedin">LinkedIn Profile</label>
        <input
          id="linkedin"
          :value="personalInfo.linkedin"
          @input="
            updateField('linkedin', ($event.target as HTMLInputElement).value)
          "
          type="url"
          placeholder="https://linkedin.com/in/johndoe"
        />
      </div>

      <div class="form-group full-width">
        <label for="github">GitHub Profile</label>
        <input
          id="github"
          :value="personalInfo.github"
          @input="
            updateField('github', ($event.target as HTMLInputElement).value)
          "
          type="url"
          placeholder="https://github.com/johndoe"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PersonalInfo } from "../../types/resume";

interface Props {
  personalInfo: PersonalInfo;
}

interface Emits {
  (e: "update:personalInfo", value: PersonalInfo): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const updateField = (field: keyof PersonalInfo, value: string) => {
  emit("update:personalInfo", {
    ...props.personalInfo,
    [field]: value,
  });
};
</script>

<style scoped>
.personal-info-form h2 {
  color: #374151;
  margin: 0 0 0.5rem 0;
  font-size: 1.5rem;
}

.section-description {
  color: #6b7280;
  margin: 0 0 2rem 0;
  font-size: 0.875rem;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.form-group.full-width {
  grid-column: span 2;
}

@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
  }

  .form-group.full-width {
    grid-column: span 1;
  }
}
</style>

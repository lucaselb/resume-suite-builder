<template>
  <div class="summary-form">
    <h2>Professional Summary</h2>
    <p class="section-description">
      Write a compelling professional summary that highlights your key skills,
      experience, and career objectives. Keep it concise and tailored to your
      target role.
    </p>

    <div class="form-group">
      <label for="summary">Summary</label>
      <textarea
        id="summary"
        :value="summary"
        @input="updateSummary(($event.target as HTMLTextAreaElement).value)"
        rows="8"
        placeholder="Experienced software engineer with 5+ years of expertise in full-stack development, specializing in React, Node.js, and cloud technologies. Proven track record of delivering high-quality web applications and leading cross-functional teams to achieve project goals. Passionate about creating scalable solutions and mentoring junior developers."
      ></textarea>
      <div class="character-count">{{ summary.length }} characters</div>
    </div>

    <div class="tips">
      <h3>💡 Tips for a great summary:</h3>
      <ul>
        <li>Keep it between 3-5 sentences (150-300 characters)</li>
        <li>Include your most relevant skills and experience</li>
        <li>Mention specific technologies or industries</li>
        <li>Use action-oriented language</li>
        <li>Tailor it to the job you're applying for</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  summary: string;
}

interface Emits {
  (e: "update:summary", value: string): void;
}

defineProps<Props>();
const emit = defineEmits<Emits>();

const updateSummary = (value: string) => {
  emit("update:summary", value);
};
</script>

<style scoped>
.summary-form h2 {
  color: #374151;
  margin: 0 0 0.5rem 0;
  font-size: 1.5rem;
}

.section-description {
  color: #6b7280;
  margin: 0 0 2rem 0;
  font-size: 0.875rem;
  line-height: 1.5;
}

.form-group textarea {
  resize: vertical;
  min-height: 150px;
}

.character-count {
  text-align: right;
  font-size: 0.75rem;
  color: #6b7280;
  margin-top: 0.5rem;
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
</style>

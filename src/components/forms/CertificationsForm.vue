<template>
  <div class="certifications-form">
    <div class="section-header">
      <h2>Certifications</h2>
      <button @click="addCertification" class="btn-primary add-button">
        + Add Certification
      </button>
    </div>
    <p class="section-description">
      List your professional certifications, licenses, and credentials.
    </p>

    <div v-if="certifications.length === 0" class="empty-state">
      <div class="empty-icon">🏆</div>
      <p>No certifications added yet.</p>
      <button @click="addCertification" class="btn-primary">
        Add Your First Certification
      </button>
    </div>

    <div
      v-for="(cert, index) in certifications"
      :key="cert.id"
      class="certification-item"
    >
      <div class="item-header">
        <span class="item-number">{{ index + 1 }}</span>
        <div class="status-indicators">
          <span
            v-if="isExpired(cert.expiryDate ?? '')"
            class="status-badge expired"
          >
            ⚠️ Expired
          </span>
          <span
            v-else-if="isExpiringSoon(cert.expiryDate ?? '')"
            class="status-badge expiring"
          >
            ⏰ Expiring Soon
          </span>
          <span v-else-if="cert.expiryDate" class="status-badge valid">
            ✅ Valid
          </span>
        </div>
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
            :disabled="index === certifications.length - 1"
            class="btn-control"
            title="Move down"
          >
            ⬇️
          </button>
          <button
            @click="removeCertification(cert.id)"
            class="btn-danger btn-control"
            title="Remove"
          >
            🗑️
          </button>
        </div>
      </div>

      <div class="form-grid">
        <div class="form-group">
          <label>Certification Name *</label>
          <input
            :value="cert.name"
            @input="
              updateCertification(
                cert.id,
                'name',
                ($event.target as HTMLInputElement).value
              )
            "
            type="text"
            placeholder="AWS Certified Solutions Architect"
            required
          />
        </div>

        <div class="form-group">
          <label>Issuing Organization *</label>
          <input
            :value="cert.issuer"
            @input="
              updateCertification(
                cert.id,
                'issuer',
                ($event.target as HTMLInputElement).value
              )
            "
            type="text"
            placeholder="Amazon Web Services"
            required
          />
        </div>

        <div class="form-group">
          <label>Issue Date *</label>
          <input
            :value="cert.date"
            @input="
              updateCertification(
                cert.id,
                'date',
                ($event.target as HTMLInputElement).value
              )
            "
            type="month"
            required
          />
        </div>

        <div class="form-group">
          <label>Expiry Date</label>
          <input
            :value="cert.expiryDate"
            @input="
              updateCertification(
                cert.id,
                'expiryDate',
                ($event.target as HTMLInputElement).value
              )
            "
            type="month"
          />
          <small class="help-text"
            >Leave empty if certification doesn't expire</small
          >
        </div>

        <div class="form-group">
          <label>Credential ID</label>
          <input
            :value="cert.credentialId"
            @input="
              updateCertification(
                cert.id,
                'credentialId',
                ($event.target as HTMLInputElement).value
              )
            "
            type="text"
            placeholder="ABC123DEF456"
          />
        </div>

        <div class="form-group">
          <label>Verification URL</label>
          <input
            :value="cert.url"
            @input="
              updateCertification(
                cert.id,
                'url',
                ($event.target as HTMLInputElement).value
              )
            "
            type="url"
            placeholder="https://verify.example.com/cert/123"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Certification } from "../../types/resume";

interface Props {
  certifications: Certification[];
}

interface Emits {
  (e: "update:certifications", value: Certification[]): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const addCertification = () => {
  const newCertification: Certification = {
    id: Date.now().toString(),
    name: "",
    issuer: "",
    date: "",
    expiryDate: "",
    credentialId: "",
    url: "",
  };

  emit("update:certifications", [...props.certifications, newCertification]);
};

const removeCertification = (id: string) => {
  const updated = props.certifications.filter((cert) => cert.id !== id);
  emit("update:certifications", updated);
};

const updateCertification = (
  id: string,
  field: keyof Certification,
  value: any
) => {
  const updated = props.certifications.map((cert) =>
    cert.id === id ? { ...cert, [field]: value } : cert
  );
  emit("update:certifications", updated);
};

const moveUp = (index: number) => {
  if (index > 0) {
    const updated = [...props.certifications];
    [updated[index], updated[index - 1]] = [updated[index - 1], updated[index]];
    emit("update:certifications", updated);
  }
};

const moveDown = (index: number) => {
  if (index < props.certifications.length - 1) {
    const updated = [...props.certifications];
    [updated[index], updated[index + 1]] = [updated[index + 1], updated[index]];
    emit("update:certifications", updated);
  }
};

const isExpiringSoon = (expiryDate: string): boolean => {
  if (!expiryDate) return false;
  const expiry = new Date(expiryDate);
  const threeMonthsFromNow = new Date();
  threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3);
  return expiry <= threeMonthsFromNow;
};

const isExpired = (expiryDate: string): boolean => {
  if (!expiryDate) return false;
  const expiry = new Date(expiryDate);
  const now = new Date();
  return expiry < now;
};
</script>

<style scoped>
.certifications-form h2 {
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

.certification-item {
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
  background: #8b5cf6;
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

.status-indicators {
  flex: 1;
  display: flex;
  justify-content: center;
  gap: 0.5rem;
}

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
}

.status-badge.valid {
  background: #d1fae5;
  color: #065f46;
}

.status-badge.expiring {
  background: #fef3c7;
  color: #92400e;
}

.status-badge.expired {
  background: #fee2e2;
  color: #991b1b;
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

.preview-header h5 {
  color: #1f2937;
  margin: 0 0 0.5rem 0;
  font-size: 1.125rem;
  font-weight: 600;
}

.preview-meta {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 0.75rem;
}

.issuer {
  color: #4b5563;
  font-weight: 500;
  font-size: 0.875rem;
}

.date,
.expiry {
  color: #6b7280;
  font-size: 0.75rem;
}

.text-danger {
  color: #dc2626 !important;
}

.text-warning {
  color: #d97706 !important;
}

.preview-details {
  display: flex;
  gap: 1rem;
  align-items: center;
  padding-top: 0.75rem;
  border-top: 1px solid #e5e7eb;
}

.credential {
  color: #6b7280;
  font-size: 0.75rem;
  font-family: "Courier New", monospace;
}

.verification {
  color: #646cff;
  font-size: 0.75rem;
  text-decoration: underline;
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

  .item-header {
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .status-indicators {
    flex: none;
    width: 100%;
    justify-content: flex-start;
  }

  .preview-details {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}
</style>

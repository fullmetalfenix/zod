import { useState } from 'react';

const initialForm = {
  fullName: '',
  age: '',
  date: '',
  truthValue: '',
};

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? '';
const normalizedApiBaseUrl = apiBaseUrl.endsWith('/') ? apiBaseUrl.slice(0, -1) : apiBaseUrl;
const submitEndpoint = `${normalizedApiBaseUrl}/api/form/submit`;

export default function App() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(null);
  const [submitState, setSubmitState] = useState('idle');
  const [submitError, setSubmitError] = useState('');

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setSubmitState('submitting');
    setSubmitError('');

    try {
      const response = await fetch(submitEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const payload = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(payload?.message || `Request failed with status ${response.status}`);
      }

      setSubmitted(payload);
      setSubmitState('success');
    } catch (error) {
      setSubmitted(null);
      setSubmitState('error');
      setSubmitError(error instanceof Error ? error.message : 'Unable to submit the form.');
    }
  }

  return (
    <main className="page-shell">
      <section className="form-card">
        <div className="form-copy">
          <p className="eyebrow">React form</p>
          <h1>ALL TEXT FIELD SUBMIT FORM</h1>
          <h2>Testing Zod for validation / Conversion and whaterver else for use with Agentic Tools.</h2>
          <p className="lead">
            Capture a full name, age, date, and a true-or-false value as plain text, then see the raw result below.
          </p>
        </div>

        <form className="form-grid" onSubmit={handleSubmit}>
          <label>
            <span>Full name</span>
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="Your Name Here"
            />
          </label>

          <label>
            <span>Age</span>
            <input
              type="text"
              name="age"
              value={form.age}
              onChange={handleChange}
              placeholder="36"
            />
          </label>

          <label>
            <span>Date</span>
            <input
              type="text"
              name="date"
              value={form.date}
              onChange={handleChange}
              placeholder="2026-05-17"
            />
          </label>

          <label>
            <span>True or false</span>
            <input
              type="text"
              name="truthValue"
              value={form.truthValue}
              onChange={handleChange}
              placeholder="true"
            />
          </label>

          <button type="submit" disabled={submitState === 'submitting'}>
            {submitState === 'submitting' ? 'Submitting...' : 'Submit form'}
          </button>
        </form>
      </section>

      <section className="result-card" aria-live="polite">
        <h2>Normalized output</h2>
        {submitted ? (
          <pre>{JSON.stringify(submitted, null, 2)}</pre>
        ) : submitState === 'error' ? (
          <p className="empty-state">{submitError}</p>
        ) : (
          <p className="empty-state">Submit the form to see the normalized data.</p>
        )}
      </section>
    </main>
  );
}
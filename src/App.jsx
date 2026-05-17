import { useState } from 'react';

const initialForm = {
  fullName: '',
  age: '',
  date: '',
  truthValue: '',
};

export default function App() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(null);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    setSubmitted({ ...form });
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

          <button type="submit">Submit form</button>
        </form>
      </section>

      <section className="result-card" aria-live="polite">
        <h2>Normalized output</h2>
        {submitted ? (
          <pre>{JSON.stringify(submitted, null, 2)}</pre>
        ) : (
          <p className="empty-state">Submit the form to see the normalized data.</p>
        )}
      </section>
    </main>
  );
}
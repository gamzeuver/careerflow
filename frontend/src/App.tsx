import { useEffect, useState } from "react";
import "./App.css";

type Application = {
  id: string;
  company: string;
  role: string;
  status: string;
  notes: string;
  applicationDate: string;
};

function App() {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("APPLIED");
  const [notes, setNotes] = useState("");
  const [applicationDate, setApplicationDate] = useState("");
  const [applications, setApplications] = useState<Application[]>([]);

  const loadApplications = async () => {
    const response = await fetch("http://localhost:8080/applications");
    const data = await response.json();
    setApplications(data);
  };

  useEffect(() => {
    loadApplications();
  }, []);

  const createApplication = async () => {
    await fetch("http://localhost:8080/applications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        company,
        role,
        status,
        notes,
        applicationDate,
      }),
    });

    setCompany("");
    setRole("");
    setStatus("");
    setNotes("");
    setApplicationDate("");

    loadApplications();
  };

  const deleteApplication = async (id: string) => {
    await fetch(`http://localhost:8080/applications/${id}`, {
      method: "DELETE",
    });

    loadApplications();
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>CareerFlow</h1>

      <p>Track internships, jobs, and interviews</p>

      <hr />

      <h2>Add Application</h2>

      <input
        placeholder="Company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />

      <br />
      <br />

      <input
        placeholder="Role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />

      <br />
      <br />

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="APPLIED">APPLIED</option>
        <option value="OA">ONLINE ASSESSMENT</option>
        <option value="INTERVIEW">INTERVIEW</option>
        <option value="OFFER">OFFER</option>
        <option value="REJECTED">REJECTED</option>
      </select>

      <br />
      <br />

      <input
        type="date"
        value={applicationDate}
        onChange={(e) => setApplicationDate(e.target.value)}
      />

      <br />
      <br />

      <textarea 
        placeholder="Notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        rows={4}
        cols={40}
      />

      <br />
      <br />

      <button onClick={createApplication}>
        Add Application
      </button>

      <hr />

      <h2>Applications</h2>

      {applications.length === 0 ? (
        <p>No applications yet.</p>
      ) : (
        applications.map((app) => (
          <div 
            key={app.id}
            style={{
              border: "1px solid gray",
              padding: "1rem",
              marginBottom: "1rem",
              borderRadius: "8px",
            }} 
          >

          <h3>{app.company}</h3>

          <p>
            <strong>Role:</strong> {app.role}
          </p>

          <p>
            <strong>Status:</strong> {app.status}
          </p>

          <p>
            <strong>Applied:</strong> {" "}
            {app.applicationDate || "Not specified"}
          </p>

          <p>
            <strong>Notes:</strong> {" "}
            {app.notes || "No notes"}
          </p>

          <button
            onClick={() => deleteApplication(app.id)}
          >
            Delete
          </button>

        </div>
      ))
    )}
  </div>
  );
}

export default App;
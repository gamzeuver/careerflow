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
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editCompany, setEditCompany] = useState("");
  const [editRole, setEditRole] = useState("");
  const [editStatus, setEditStatus] = useState("");
  const [editNotes, setEditNotes] = useState("");
  const [editApplicationDate, setEditApplicationDate] = useState("");

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

  const startEditing = (application: Application) => {
    setEditingId(application.id);

    setEditCompany(application.company);
    setEditRole(application.role);
    setEditStatus(application.status);
    setEditNotes(application.notes || "");
    setEditApplicationDate(application.applicationDate || "");
  }

  const saveChanges = async () => {
    if (!editingId) return;

    await fetch(
      `http://localhost:8080/applications/${editingId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          company: editCompany,
          role: editRole,
          status: editStatus,
          notes: editNotes,
          applicationDate: editApplicationDate,
        }),
      }
    );

    setEditingId(null);

    loadApplications();
  };

  const filteredApplications = applications.filter((application) => {
    const matchesSearch = 
      application.company
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      application.role
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesStatus =
      selectedStatus === "ALL" ||
      application.status === selectedStatus;

    return matchesSearch && matchesStatus;
  })

  return (
    <div className="app-container">
      <h1 className="page-title">CareerFlow</h1>

      <p className="subtitle">
        track your opportunities, one step at a time ✨
      </p>

      <div className="card">
        <h2 className="section-title">Add Application</h2>

        <input
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />

        <input
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="APPLIED">Applied</option>
          <option value="OA">Online Assessment</option>
          <option value="INTERVIEW">Interview</option>
          <option value="OFFER">Offer</option>
          <option value="REJECTED">Rejected</option>
        </select>

        <input
          type="date"
          value={applicationDate}
          onChange={(e) => setApplicationDate(e.target.value)}
        />

        <textarea
          placeholder="Notes..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={4}
        />

        <button onClick={createApplication}>
          Save Application
        </button>
      </div>

      <div className="dashboard">
        <div className="stat-card">
          <div className="stat-number">
            {applications.length}
          </div>

          <div className="stat-label">
            Applications
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-number">
            {
              applications.filter(
                (app) => app.status === "OA"
              ).length
            }
          </div>

          <div className="stat-label">
            OA
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-number">
            {
              applications.filter(
                (app) => app.status === "INTERVIEW"
              ).length
            }
          </div>

          <div className="stat-label">
            Interviews
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-number">
            {
              applications.filter(
                (app) => app.status === "OFFER"
              ).length
            }
          </div>

          <div className="stat-label">
            Offers
          </div>
        </div>
      </div>

      <div className="card">
        <input
          placeholder="🔍 Search companies or roles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          value={selectedStatus}
          onChange={(e) =>
            setSelectedStatus(e.target.value)
          }
        >
          <option value="ALL">
            All Statuses
          </option>

          <option value="APPLIED">
            Applied
          </option>

          <option value="OA">
            Online Assessment
          </option>

          <option value="INTERVIEW">
            Interview
          </option>

          <option value="OFFER">
            Offer
          </option>

          <option value="REJECTED">
            Rejected
          </option>
        </select>
      </div>

      <div className="applications-section">
        <h2 className="section-title">
          Applications
        </h2>

        {filteredApplications.length === 0 ? (
          <div className="empty-state">
            🌷 No matching applications.
          </div>
        ) : (
          filteredApplications.map((application) => (
            <div
              key={application.id}
              className="application-card"
            >
              {editingId === application.id ? (
                <>
                  <input
                    value={editCompany}
                    onChange={(e) =>
                      setEditCompany(e.target.value)
                    }
                  />

                  <input
                    value={editRole}
                    onChange={(e) =>
                      setEditRole(e.target.value)
                    }
                  />

                  <select
                    value={editStatus}
                    onChange={(e) =>
                      setEditStatus(e.target.value)
                    }
                  >
                    <option value="APPLIED">
                      Applied
                    </option>

                    <option value="OA">
                      Online Assessment
                    </option>

                    <option value="INTERVIEW">
                      Interview
                    </option>

                    <option value="OFFER">
                      Offer
                    </option>

                    <option value="REJECTED">
                      Rejected
                    </option>
                  </select>

                  <input
                    type="date"
                    value={editApplicationDate}
                    onChange={(e) =>
                      setEditApplicationDate(
                        e.target.value
                      )
                    }
                  />

                  <textarea
                    rows={4}
                    value={editNotes}
                    onChange={(e) =>
                      setEditNotes(e.target.value)
                    }
                  />

                  <button onClick={saveChanges}>
                    Save
                  </button>

                  <button
                    className="delete-button"
                    onClick={() =>
                      setEditingId(null)
                    }
                    style={{
                      marginLeft: "10px",
                    }}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <div className="company-name">
                    {application.company}
                  </div>

                  <div className="role">
                    {application.role}
                  </div>

                  <div
                    className={`status-badge status-${application.status.toLowerCase()}`}
                  >
                    {application.status}
                  </div>

                  <div className="meta">
                    Applied:{" "}
                    {application.applicationDate ||
                      "Not specified"}
                  </div>

                  {application.notes && (
                    <div className="meta">
                      Notes: {application.notes}
                    </div>
                  )}

                  <button
                    onClick={() =>
                      startEditing(application)
                    }
                  >
                    Edit
                  </button>

                  <button
                    className="delete-button"
                    onClick={() => {
                      const confirmed =
                        window.confirm(
                          "Are you sure you want to delete this application?"
                        );

                      if (confirmed) {
                        deleteApplication(
                          application.id
                        );
                      }
                    }}
                    style={{
                      marginLeft: "10px",
                    }}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
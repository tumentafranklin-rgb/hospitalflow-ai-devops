import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "/api";

function App() {
  const [beds, setBeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchBeds() {
      try {
        const response = await fetch(`${API_URL}/beds`);

        if (!response.ok) {
          throw new Error("Unable to retrieve hospital bed information.");
        }

        const data = await response.json();
        setBeds(data.beds);
        setError("");
      } catch (err) {
        setError(
          "Unable to connect to the hospital API. Check that the backend is running."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchBeds();
  }, []);

  const totalBeds = beds.length;
  const availableBeds = beds.filter((bed) => bed.available).length;
  const occupiedBeds = totalBeds - availableBeds;

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <div className="brand-icon">H+</div>
          <div>
            <h1>HospitalFlow AI</h1>
            <p>Hospital Workflow Management</p>
          </div>
        </div>

        <div className="connection">
          <span className={`status-dot ${error ? "offline" : ""}`}></span>
          {error ? "Backend disconnected" : "Hospital operations"}
        </div>
      </header>

      <main className="dashboard">
        <section className="welcome">
          <div>
            <p className="eyebrow">HOSPITAL OVERVIEW</p>
            <h2>Operations Dashboard</h2>
            <p className="subtitle">
              Monitor bed availability across hospital departments.
            </p>
          </div>

          <div className="date-label">LIVE DATA</div>
        </section>

        {loading ? (
          <div className="message">Loading hospital information...</div>
        ) : error ? (
          <div className="message error">{error}</div>
        ) : (
          <>
            <section className="metrics">
              <article className="metric-card">
                <div className="metric-heading">
                  <span>Total beds</span>
                  <span className="metric-icon blue">B</span>
                </div>
                <strong>{totalBeds}</strong>
                <p>Registered hospital beds</p>
              </article>

              <article className="metric-card">
                <div className="metric-heading">
                  <span>Available beds</span>
                  <span className="metric-icon green">+</span>
                </div>
                <strong>{availableBeds}</strong>
                <p>Ready for patient admission</p>
              </article>

              <article className="metric-card">
                <div className="metric-heading">
                  <span>Occupied beds</span>
                  <span className="metric-icon orange">O</span>
                </div>
                <strong>{occupiedBeds}</strong>
                <p>Currently marked as occupied</p>
              </article>
            </section>

            <section className="beds-section">
              <div className="section-heading">
                <div>
                  <h3>Hospital Bed Inventory</h3>
                  <p>Availability by department</p>
                </div>
                <span className="count-badge">{totalBeds} beds</span>
              </div>

              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>Bed ID</th>
                      <th>Department</th>
                      <th>Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {beds.map((bed) => (
                      <tr key={bed.id}>
                        <td>BED-{String(bed.id).padStart(3, "0")}</td>
                        <td>{bed.department}</td>
                        <td>
                          <span
                            className={`bed-status ${
                              bed.available ? "available" : "occupied"
                            }`}
                          >
                            {bed.available ? "Available" : "Occupied"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}

        <footer>
          <span>HospitalFlow AI</span>
          <span>Educational demonstration · Sample data only</span>
        </footer>
      </main>
    </div>
  );
}

export default App;
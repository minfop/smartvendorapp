import { useSelector, useDispatch } from "react-redux";
import { setActiveDashboardTab } from "../slices/dashboardSlice";
import NewJobModal from "../components/newjobmodal";
import { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa"; // Add this import at the top

export default function Dashboard() {
  const activeTab = useSelector(state => state.dashboard.activeDashboardTab);
  const dispatch = useDispatch();
  const handleTabClick = (tab) => {
    dispatch(setActiveDashboardTab(tab));
  };

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    customerName: '',
    jobName: '',
    notes: '',
    deliveryDate: '',
    priceQuote: 1000,
    jobStatus: 'S', // Add status field
    jobId: 0
  });
  const [editMode, setEditMode] = useState(false); // Track if editing

  // State for job details
  const [jobDetails, setJobDetails] = useState([]);

  // Fetch job details on mount
  useEffect(() => {
    fetch('https://smartvendorapi.onrender.com/api/jobs', {
      method: 'GET',
      headers: {
        'accept': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => setJobDetails(data))
      .catch(err => console.error('Error fetching jobs:', err));
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEdit = (job) => {
    setForm({
      customerName: job.customer_name || job.customerName || '',
      jobName: job.job_name || job.jobName || '',
      notes: job.job_notes || job.jobNotes || '',
      deliveryDate: (job.delivery_date || job.deliveryDate || '').slice(0, 10),
      priceQuote: job.job_price_quote || job.jobPriceQuote || 1000,
      jobStatus: job.job_status || job.jobStatus || 'S',
      jobId: job.job_id || job.id || 0
    });
    setEditMode(true);
    setShowModal(true);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    // Prepare job data for PUT/POST
    const jobData = {
      jobId: form.jobId,
      jobName: form.jobName,
      customerName: form.customerName,
      startDate: new Date().toISOString().slice(0, 10),
      deliveryDate: form.deliveryDate,
      jobStatus: form.jobStatus,
      jobNotes: form.notes,
      jobPriceQuote: form.priceQuote
    };

    try {
      if (editMode) {
        // Edit job using local API
        await fetch(`http://localhost:3000/api/jobs/${form.jobId}`, {
          method: 'PUT',
          headers: {
            'accept': '*/*',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(jobData)
        });
      } else {
        // Create new job (keep your existing POST logic if needed)
        await fetch('https://smartvendorapi.onrender.com/api/jobs', {
          method: 'POST',
          headers: {
            'accept': '*/*',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(jobData)
        });
      }

      // Fetch all jobs again (from your preferred API)
      const res = await fetch('https://smartvendorapi.onrender.com/api/jobs', {
        method: 'GET',
        headers: {
          'accept': 'application/json'
        }
      });
      const data = await res.json();
      setJobDetails(data);

      setShowModal(false);
      setEditMode(false);
      setForm({
        customerName: '',
        jobName: '',
        notes: '',
        deliveryDate: '',
        priceQuote: 1000,
        jobStatus: 'S',
        jobId: 0
      });
    } catch (err) {
      console.error('Error saving job:', err);
    }
  };

  const handleDelete = async (jobId) => {
    // Implement delete logic here
    try {
      await fetch(`https://smartvendorapi.onrender.com/api/jobs/${jobId}`, {
        method: 'DELETE',
        headers: {
          'accept': '*/*'
        }
      });
      // Refresh job list
      const res = await fetch('https://smartvendorapi.onrender.com/api/jobs', {
        method: 'GET',
        headers: {
          'accept': 'application/json'
        }
      });
      const data = await res.json();
      setJobDetails(data);
    } catch (err) {
      console.error('Error deleting job:', err);
    }
  };

  return (
    <div className="flex flex-col flex-1 overflow-y-hidden overflow-x-hidden">
      <div className="p-6">
        <div id="content-management" className="tab-content active">
          <h2 className="text-2xl font-bold mb-4">Current job status</h2>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            + Add Job
          </button>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <p className="text-sm text-gray-500 font-bold">Total jobs</p>
              <p className="text-3xl font-bold">{jobDetails.length}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <p className="text-sm text-gray-500 font-bold">In Progress</p>
              <p className="text-3xl font-bold">{jobDetails.filter(x => x.job_status == "I").length}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <p className="text-sm text-gray-500 font-bold">Completed</p>
              <p className="text-3xl font-bold text-red-500">{jobDetails.filter(x => x.job_status == "C").length}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="row joblist">
        {jobDetails.map(job => (
          <div key={job.job_id || job.id} className="col-12 mb-3">
            <div className="card p-3 d-flex flex-row align-items-center justify-content-between">
              <div>
                <h5 className="mb-1">{job.job_name || job.jobName}</h5>
                <p className="mb-0 text-muted">Customer: {job.customer_name || job.customerName}</p>
                <p className="mb-0 text-muted">Status: {job.job_status || job.jobStatus}</p>
                <p className="mb-0 text-muted">Delivery: {job.delivery_date || job.deliveryDate}</p>
              </div>
              <div>
                <button className="btn btn-link" onClick={() => handleEdit(job)}>
                  <FaEdit />
                </button>
                <button className="btn btn-link text-danger" onClick={() => handleDelete(job.job_id || job.id)}>
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <NewJobModal
        show={showModal}
        onClose={() => { setShowModal(false); setEditMode(false); }}
        form={form}
        isEditMode={editMode}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
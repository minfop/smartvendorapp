import { useSelector, useDispatch } from "react-redux";
import { setActiveDashboardTab, setShowModal, setForm, setEditMode, setJobDetails } from "../slices/dashboardSlice";
import NewJobModal from "../components/newjobmodal";
import { useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { getStatusFromCode, apiCall, buildApiUrl } from "../utills/helpers";

export default function Dashboard() {
  const activeTab = useSelector(state => state.dashboard.activeDashboardTab);
  const showModal = useSelector(state => state.dashboard.showModal);
  const form = useSelector(state => state.dashboard.form);
  const editMode = useSelector(state => state.dashboard.editMode);
  const jobDetails = useSelector(state => state.dashboard.jobDetails);

  const dispatch = useDispatch();

  const handleTabClick = (tab) => {
    dispatch(setActiveDashboardTab(tab));
  };

  // Fetch job details on mount
  useEffect(() => {
    apiCall(buildApiUrl('jobs'))
      .then(data => dispatch(setJobDetails(data)))
      .catch(err => console.error('Error fetching jobs:', err));
  }, [dispatch]);

  const handleChange = e => {
    dispatch(setForm({ ...form, [e.target.name]: e.target.value }));
  };

  const handleEdit = (job) => {
    dispatch(setForm({
      customerName: job.customer_name || job.customerName || '',
      jobName: job.job_name || job.jobName || '',
      notes: job.job_notes || job.jobNotes || '',
      deliveryDate: (job.delivery_date || job.deliveryDate || '').slice(0, 10),
      priceQuote: job.job_price_quote || job.jobPriceQuote || 1000,
      jobStatus: job.job_status || job.jobStatus || 'N',
      jobId: job.job_id || job.id || 0
    }));
    dispatch(setEditMode(true));
    dispatch(setShowModal(true));
  };

  const handleSubmit = async e => {
    e.preventDefault();

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
        await apiCall(buildApiUrl('jobs', form.jobId), 'PUT', jobData);
      } else {
        await apiCall(buildApiUrl('jobs'), 'POST', jobData);
      }

      const data = await apiCall(buildApiUrl('jobs'));
      dispatch(setJobDetails(data));

      dispatch(setShowModal(false));
      dispatch(setEditMode(false));
      dispatch(setForm({
        customerName: '',
        jobName: '',
        notes: '',
        deliveryDate: '',
        priceQuote: 1000,
        jobStatus: 'N',
        jobId: 0
      }));
    } catch (err) {
      console.error('Error saving job:', err);
    }
  };

  const handleDelete = async (jobId) => {
    try {
      await apiCall(buildApiUrl('jobs', jobId), 'DELETE');
      const data = await apiCall(buildApiUrl('jobs'));
      dispatch(setJobDetails(data));
    } catch (err) {
      console.error('Error deleting job:', err);
    }
  };

  return (
    <div className="flex flex-col flex-1 overflow-y-hidden overflow-x-hidden">
      <div className="p-6">
        <div id="content-management" className="tab-content active">
          <h2 className="text-2xl font-bold mb-4">Current job status</h2>
          <button className="btn btn-primary" onClick={() => dispatch(setShowModal(true))}>
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
                <p className="mb-0 text-muted">Price Quote: Rs.{job.job_price_quote || job.jobPriceQuote}</p>
                <p className="mb-0 text-muted">Status: {getStatusFromCode(job.job_status || job.jobStatus)}</p>
                <p className="mb-0 text-muted">Delivery: {(job.delivery_date || job.deliveryDate).slice(0, 10)}</p>
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
        onClose={() => { dispatch(setShowModal(false)); dispatch(setEditMode(false)); }}
        form={form}
        isEditMode={editMode}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
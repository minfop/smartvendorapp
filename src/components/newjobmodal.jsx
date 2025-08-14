export default function NewJobModal({
  show,
  onClose,
  form,
  handleChange,
  handleSubmit,
  isEditMode
}) {
  if (!show) return null;

  return (
    <div className="modal fade show d-block" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{isEditMode ? "Update Job" : "Create Job"}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label text-start w-100">Job Name</label>
                <input
                  className="form-control"
                  name="jobName"
                  value={form.jobName}
                  onChange={handleChange}
                  placeholder='Job Name'
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label text-start w-100">Customer Name</label>
                <input
                  className="form-control"
                  name="customerName"
                  value={form.customerName}
                  onChange={handleChange}
                  placeholder='Customer Name'
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label text-start w-100">Notes</label>
                <input
                  type="text"
                  className="form-control"
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  placeholder=''
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label text-start w-100">Delivery Date</label>
                <input
                  type="date"
                  className="form-control"
                  name="deliveryDate"
                  value={form.deliveryDate}
                  onChange={handleChange}
                  placeholder=''
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label text-start w-100">Price Quote</label>
                <input
                  type="number"
                  className="form-control"
                  name="priceQuote"
                  value={form.priceQuote}
                  onChange={handleChange}
                  placeholder=''
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label text-start w-100">Status</label>
                <select
                  className="form-select"
                  name="jobStatus"
                  value={form.jobStatus}
                  onChange={handleChange}
                  required
                >
                  <option value="S">Started</option>
                  <option value="I">In Progress</option>
                  <option value="C">Completed</option>
                </select>
              </div>
            </div>
            
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Close
              </button>
              <button type="submit" className="btn btn-primary">
                Submit Job
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
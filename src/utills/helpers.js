// Function to get status string from status code
export function getStatusFromCode(statusCode) {
    switch (statusCode) {
        case "N":
            return "New";
        case "I":
            return "In Progress";
        case "C":
            return "Completed";
        default:
            return "Unknown";
    }
}

/**
 * Generic API call function
 */
export async function apiCall(url, method = 'GET', body = null, headers = {}) {
    const options = {
        method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('authToken') ? `Bearer ${localStorage.getItem('authToken')}` : '',
            ...headers
        }
    };
    if (body) {
        options.body = JSON.stringify(body);
    }
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('API call failed:', error);
        throw error;
    }
}

/**
 * Build API URL
 * @param {string} endpoint - API endpoint (e.g., 'jobs')
 * @param {string|number} [id] - Optional resource ID
 * @returns {string} - Full API URL
 */
export function buildApiUrl(endpoint, id = null) {
    const baseUrl = 'https://smartvendorapi.onrender.com/api/';
    //const baseUrl = 'http://localhost:3000/api/'; // For local development
    return id ? `${baseUrl}${endpoint}/${id}` : `${baseUrl}${endpoint}`;
}
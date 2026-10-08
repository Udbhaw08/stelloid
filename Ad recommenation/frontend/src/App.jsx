import React, { useState } from 'react';
import Papa from 'papaparse';
import { generateRecommendations, validateCSVFiles } from './engine';
import './App.css';

function App() {
  const [data, setData] = useState({
    products: null,
    inventory: null,
    sales: null,
    campaigns: null,
  });
  const [validationErrors, setValidationErrors] = useState([]);
  const [results, setResults] = useState([]);

  const handleFileUpload = (e, key) => {
    const file = e.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (parsedResults) => {
        setData((prev) => ({ ...prev, [key]: parsedResults.data }));
        setValidationErrors([]); // Reset errors on new upload
      },
    });
  };

  const isReady = data.products && data.inventory && data.sales && data.campaigns;

  const handleGenerate = () => {
    // 1. Validate CSV file headers/columns upfront
    const fileErrors = validateCSVFiles(
      data.products,
      data.inventory,
      data.sales,
      data.campaigns
    );

    if (fileErrors.length > 0) {
      setValidationErrors(fileErrors);
      setResults([]);
      return;
    }

    setValidationErrors([]);

    // 2. Generate recommendations with row-level validation
    const recommendations = generateRecommendations(
      data.products,
      data.inventory,
      data.sales,
      data.campaigns
    );
    setResults(recommendations);
  };

  return (
    <div className="container">
      <header>
        <h1>Ad Recommendation Engine</h1>
        <p className="subtitle">Upload your dummy CSV data to generate actionable insights.</p>
      </header>

      <div className="upload-grid">
        <UploadCard title="📦 Products Data" onChange={(e) => handleFileUpload(e, 'products')} ready={!!data.products} />
        <UploadCard title="🏭 Inventory Data" onChange={(e) => handleFileUpload(e, 'inventory')} ready={!!data.inventory} />
        <UploadCard title="🛒 Sales & Returns" onChange={(e) => handleFileUpload(e, 'sales')} ready={!!data.sales} />
        <UploadCard title="📈 Ad Campaigns" onChange={(e) => handleFileUpload(e, 'campaigns')} ready={!!data.campaigns} />
      </div>

      <button className="generate-btn" disabled={!isReady} onClick={handleGenerate}>
        {isReady ? 'Generate Recommendations' : 'Please upload all 4 files...'}
      </button>

      {/* File-Level Validation Errors */}
      {validationErrors.length > 0 && (
        <div className="validation-error-banner fade-in">
          <h3>⚠️ CSV Structure Validation Error</h3>
          <p>The following issues were detected in your uploaded files:</p>
          <ul>
            {validationErrors.map((err, idx) => (
              <li key={idx}>{err}</li>
            ))}
          </ul>
          <p className="hint">Please fix the column headers or data in the highlighted files and re-upload.</p>
        </div>
      )}

      {/* Results Table */}
      {results.length > 0 && (
        <div className="results-section fade-in">
          <h2>Recommended Actions</h2>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Action</th>
                  <th>Reasoning (Decision Logic)</th>
                </tr>
              </thead>
              <tbody>
                {results.map((rec, i) => (
                  <tr key={i} className={rec.Action === 'ERROR' ? 'error-row' : ''}>
                    <td>
                      <strong>{rec.Product_Name}</strong>
                      <div className="meta">ID: {rec.Product_ID} | Camp: {rec.Campaign_ID}</div>
                    </td>
                    <td>
                      <span className={`badge ${rec.Action.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}>
                        {rec.Action}
                      </span>
                      {rec.Metrics && (
                        <div className="metrics-box">
                          <div><span className="metric-label">ACoS:</span> {rec.Metrics.CurrentACoS}</div>
                          <div><span className="metric-label">Break-Even:</span> {rec.Metrics.BreakEvenACoS}</div>
                          <div><span className="metric-label">CVR:</span> {rec.Metrics.CVR}</div>
                        </div>
                      )}
                    </td>
                    <td className="explanation">{rec.Explanation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

function UploadCard({ title, onChange, ready }) {
  return (
    <div className={`upload-card ${ready ? 'ready' : ''}`}>
      <label>{title} {ready && <span className="check">✅</span>}</label>
      <input type="file" accept=".csv" onChange={onChange} />
    </div>
  );
}

export default App;

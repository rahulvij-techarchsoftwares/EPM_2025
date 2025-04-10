import React, { useState, useEffect, useContext } from 'react'; 
import DoughnutChart from '../../../charts/DoughnutChart';
import { GraphContext } from '../../../context/GraphContext';
import { getCssVariable } from '../Dashutils/Utils';
import { useProject } from "../../../context/ProjectContext";

function DashboardCard01() {
  const [selectedProject, setSelectedProject] = useState('');
  const { projects } = useProject();
  const { fetchWorkingHours, workingHours, loading, error } = useContext(GraphContext);

  useEffect(() => {
    if (selectedProject) {
      fetchWorkingHours(selectedProject);
    }
  }, [selectedProject]);

  console.log("Working Hours Data:", workingHours);

  const timeToDecimal = (time) => {
    if (!time || time === "00:00") return 0;
    const [hours, minutes] = time.split(':').map(Number);
    return hours + minutes / 60;
  };

  const safeGetCssVariable = (variable, fallback) => getCssVariable(variable) || fallback;

  const hasValidData =
    workingHours &&
    (workingHours.total_billable_hours !== "00:00" ||
     workingHours.total_nonbillable_hours !== "00:00" ||
     workingHours.total_inhouse_hours !== "00:00");

  const filteredChartData = hasValidData
    ? {
        labels: ['Billable Hours', 'Non-billable Hours', 'In-house Hours'],
        datasets: [
          {
            label: 'Working Hours',
            data: [
              timeToDecimal(workingHours.total_billable_hours),
              timeToDecimal(workingHours.total_nonbillable_hours),
              timeToDecimal(workingHours.total_inhouse_hours),
            ],
            backgroundColor: [
              safeGetCssVariable('--color-violet-500', '#8b5cf6'),
              safeGetCssVariable('--color-sky-500', '#0ea5e9'),
              safeGetCssVariable('--color-violet-800', '#6d28d9'),
            ],
            hoverBackgroundColor: [
              safeGetCssVariable('--color-violet-600', '#7c3aed'),
              safeGetCssVariable('--color-sky-600', '#0284c7'),
              safeGetCssVariable('--color-violet-900', '#4c1d95'),
            ],
            borderWidth: 1,
          },
        ],
      }
    : null;

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-gray-800 shadow-xs rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60 flex justify-between">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Working Hours</h2>
        <select
          className="bg-white-200 dark:bg-white-700 text-black-900 dark:text-black-100 px-3 py-1 rounded"
          value={selectedProject}
          onChange={(e) => setSelectedProject(e.target.value)}
        >
          <option value="">Select Project</option>
          {projects && projects.map((project) => (
            <option key={project.id} value={project.id}>{project.project_name}</option>
          ))}
        </select>
      </header>

      {loading && <p>Loading data...</p>}
      {error && <p>Error: {error.message || "An unknown error occurred"}</p>}

      {workingHours && (
        <div className="p-4">
          <h3 className="text-lg font-semibold">{workingHours.project_name}</h3>
          <p><strong>Client ID:</strong> {workingHours.client_id}</p>
          <p><strong>Total Hours:</strong> {workingHours.project_total_hours}</p>
          <p><strong>Deadline:</strong> {workingHours.deadline}</p>
          <p><strong>Requirements:</strong> {workingHours.requirements}</p>
        </div>
      )}

      {filteredChartData ? (
        <DoughnutChart data={filteredChartData} width={389} height={260} />
      ) : (
        <p className="text-center p-4">No data available for the selected project</p>
      )}
    </div>
  );
}

export default DashboardCard01;

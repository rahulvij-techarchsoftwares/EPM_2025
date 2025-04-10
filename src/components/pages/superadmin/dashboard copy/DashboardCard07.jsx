import React from 'react';
import { useProject } from "../../../context/ProjectContext";
import { useClient } from "../../../context/ClientContext";

function DashboardCard07() {
  const { projects, isLoading } = useProject();
  const { clients } = useClient(); // Assuming you have client data

  console.log("dash projects", projects);
  // Helper function to get client name by ID
  const latestProjects = projects
  .slice() // Create a copy to avoid mutating original array
  .sort((a, b) => new Date(b.created_at) - new Date(a.created_at)) // Sort by latest date
  .slice(0, 7);

  return (
    <div className="col-span-full xl:col-span-8 bg-white dark:bg-gray-800 shadow-xs rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Recent Projects</h2>
      </header>
      <div className="p-3">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full dark:text-gray-300">
            {/* Table header */}
            <thead className="text-xs uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700/50 rounded-xs">
              <tr>
                <th className="p-2">
                  <div className="font-semibold text-left">Client Name</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Project Name</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Created Date</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm font-medium divide-y divide-gray-100 dark:divide-gray-700/60">
              {isLoading ? (
                <tr>
                  <td colSpan="3" className="p-4 text-center">Loading...</td>
                </tr>
              ) : latestProjects.length > 0 ? (
                latestProjects.map((project) => (
                  <tr key={project.id}>
                    <td className="p-2">
                      <div className="text-gray-800 dark:text-gray-100">
                        {project.client?.company_name || "Unknown Client"}
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="text-center">{project.project_name}</div>
                    </td>
                    <td className="p-2">
                      <div className="text-center">
                        {new Date(project.created_at).toLocaleDateString()}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="p-4 text-center">No projects found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DashboardCard07;

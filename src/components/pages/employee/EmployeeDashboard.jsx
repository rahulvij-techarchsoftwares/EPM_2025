import React, { useEffect } from 'react';
import DashboardCard01 from './dashboard copy/DashboardCard01';
import DashboardCard02 from './dashboard copy/DashboardCard02';
import DashboardCard03 from './dashboard copy/DashboardCard03';
import DashboardCard04 from './dashboard copy/DashboardCard04';
import DashboardCard05 from './dashboard copy/DashboardCard05';
import DashboardCard06 from './dashboard copy/DashboardCard06';
import DashboardCard07 from './dashboard copy/DashboardCard07';
import DashboardCard08 from './dashboard copy/DashboardCard08';
import DashboardCard09 from './dashboard copy/DashboardCard09';
import { GraphProvider } from '../../context/GraphContext'; 
import { ProjectProvider  } from '../../context/ProjectContext'
import { UserProvider } from '../../context/UserContext';


const EmployeeDashboard = () => {
  useEffect(() => {
    console.log("Super Admin Dashboard Mounted");
  }, []);

  return (

    // <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    //   <div className="col-span-1 sm:col-span-2 lg:col-span-1">
    //     <RoleProvider>
    //       <Roletable/>
    //     </RoleProvider>
    //   </div>
    //   <div className="col-span-1 sm:col-span-2 lg:col-span-1">
    //     <TeamProvider>
    //       <Teamtable/>
    //     </TeamProvider>
    //   </div>
    //   <div className="col-span-1 sm:col-span-2 lg:col-span-1">
    //   <MonthlySales/>
    //   </div>
      
    // </div>
        <div className="grid grid-cols-12 gap-6 ">
    
                  {/* Line chart (Acme Plus) */}
                  <GraphProvider> {/* Wrap your component with the ThemeProvider */}
                  <ProjectProvider>
                  <DashboardCard01 />
                  </ProjectProvider>
        </GraphProvider>
                  {/* Line chart (Acme Advanced) */}
                  <DashboardCard02 />
                  {/* Line chart (Acme Professional) */}
                  <DashboardCard03 />
                  {/* Bar chart (Direct vs Indirect) */}
                  <GraphProvider> {/* Wrap your component with the ThemeProvider */}
          <DashboardCard04 />
        </GraphProvider>
                  {/* Line chart (Real Time Value) */}
                  <DashboardCard05 />
                  {/* Doughnut chart (Top Countries) */}
                  <GraphProvider> {/* Wrap your component with the ThemeProvider */}
          <DashboardCard06 />
        </GraphProvider>
                  {/* Table (Top Channels) */}
                  <UserProvider>
                  <DashboardCard07 />
                  </UserProvider>
                  {/* Line chart (Sales Over Time) */}
                  <DashboardCard08 />
                  {/* Stacked bar chart (Sales VS Refunds) */}
                  <DashboardCard09 />
                  
                </div>
  );
};

export default EmployeeDashboard;

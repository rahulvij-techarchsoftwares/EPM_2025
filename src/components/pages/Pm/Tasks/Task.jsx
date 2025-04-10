import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Overview } from "../../../components/RichTextEditor";
import { useTask } from "../../../context/TaskContext"; // ✅ Import useTask from TaskContext
import { Edit, Save, Trash2, Loader2, Trash } from "lucide-react";


export default function TaskList() {
  const { tasks, fetchTasks, addTask, approveTask, editTask, deleteTask } = useTask();
  const [openTask, setOpenTask] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [taskDetails, setTaskDetails] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [status, setStatus] = useState("To do");
  const [hours, setHours] = useState("");
  const [deadline, setDeadline] = useState("");
  const [statusDropdown, setStatusDropdown] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editProjectName, setEditProjectName] = useState(tasks.data?.project_name || "");
  const [editDeadline, setEditDeadline] = useState("");
  const [editHours, setEditHours] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const { project_id } = useParams();
  console.log("project_id izz", project_id);


  console.log("tasks", tasks);

  const updateStatus = async (taskId, newStatus) => {
    console.log("this is ud", taskId);
    console.log("this is new status", newStatus);
    try {
      await approveTask(taskId, newStatus);
      console.log(`✅ Task ${taskId} updated to ${newStatus}`);
      setStatusDropdown(null);
    } catch (error) {
      console.error("❌ Failed to update task status:", error);
    }
  };

  const handleAddTask = async () => {
    const newTask = {
      title: taskTitle,
      description: taskDetails,
      status,
      project_id: Number(project_id),
      hours: Number(hours),
      deadline,
    };

    try {
      await addTask(newTask);
      fetchTasks(project_id);
      setShowForm(false);
      setTaskTitle("");
      setTaskDetails("");
      setHours("");
      setDeadline("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };



  useEffect(() => {
    if (project_id) {
      fetchTasks(project_id);
    }
  }, [project_id]);

  const toggleTask = (taskId) => {
    if (editTaskId) return;
    setOpenTask(openTask === taskId ? null : taskId);
  };



  const toggleStatusDropdown = (id) => {
    setStatusDropdown(statusDropdown === id ? null : id);
  };


  const handleDelete = (taskId) => {
    deleteTask(taskId);
  };


  const startEditing = (task) => {
    setEditTaskId(task.id);
    setEditTitle(task.title);
    setEditDeadline(task.deadline);
    setEditHours(task.hours);
    setEditDescription(task.description);
  };

  const saveEdit = async (taskId) => {
    const updatedTask = {
      title: editTitle,
      description: editDescription,
      deadline: editDeadline,
      hours: editHours,
    };

    const result = await editTask(taskId, updatedTask);
    if (result) {
      setEditTaskId(null); // Exit edit mode
    }

    setEditTaskId(null);
    setEditTitle("");
    setEditDeadline("");
    setEditHours("");
    setEditDescription("");
    fetchTasks();
  };

  const cancelEdit = () => {
    setEditTaskId(null);
    setEditTitle("");
    setEditDeadline("");
    setEditHours("");
    setEditDescription("");
  };

  return (
    <div className="flex items-center justify-center relative">
      {showForm && (

        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">Add New Task</h2>
            <input
              type="text"
              placeholder="Task Name"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              className="w-full p-2 mb-3 border rounded"
            />
            <input
              type="text"
              placeholder="Status"
              value="To do"
              readOnly
              className="w-full p-2 mb-3 border rounded bg-gray-100 cursor-not-allowed"
            />

            <input
              type="number"
              placeholder="Hours"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              className="w-full p-2 mb-3 border rounded"
            />
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full p-2 mb-3 border rounded"
            />
            <textarea
              value={taskDetails}
              onChange={(e) => setTaskDetails(e.target.value)}
              placeholder="Task Details"
              className="w-full p-2 mb-3 border rounded h-32"
            ></textarea>

            <Overview />


            <div className="flex justify-end gap-3">
              <button onClick={() => setShowForm(false)} className="px-4 py-2 bg-gray-400 text-white rounded">
                Cancel
              </button>
              <button onClick={handleAddTask} className="flex items-center px-4 py-2 bg-blue-700 text-white rounded">
                <Save className="h-4 w-4 mr-1" />
                Save
              </button>
            </div>
          </div>
        </div>
      )}


      <div className="w-full bg-white shadow-md rounded-3xl p-4">
        <div className="absolute top-5 right-10">
          <button
            onClick={() => setShowForm(true)}
            className="add-items-btn"
            
          >
            + Add Task
          </button>
        </div>
        <h2 className="text-4xl font-extrabold text-blue-800 mb-8 text-center">Project Details</h2>
        {tasks.data && (
          <div className="mb-8 top-heading-bg rounded-lg ">
            {isEditing ? (
              <input
                type="text"
                value={editProjectName}
                onChange={(e) => setEditProjectName(e.target.value)}
                className="text-2xl font-bold text-gray-900 text-white border p-2 w-full"
              />
            ) : (
              <p className="text-2xl font-bold text-gray-900 text-white">{tasks.data.project_name}</p>
            )}
            <p className="text-lg text-gray-700 text-white">
              <strong>Created At:</strong> {tasks.data.created_at}
            </p>
            <p className="text-lg text-gray-700 text-white">
              <strong>Deadline:</strong> {tasks.data.deadline}
            </p>
            <p className="text-lg text-gray-700 text-white">
              <strong>Total Hours:</strong> {tasks.data.total_hours}
            </p>
            <p className="text-lg text-gray-700 text-white">
              <strong>Assigned By:</strong> {tasks.data.project_managers[0]}
            </p>
          </div>
        )}

        <h2 className="text-2xl font-bold text-blue-800 mb-6">Project Tasks</h2>
        <div className="relative border-l-4 border-blue-500 ml-9 space-y-4">
          {tasks.data?.tasks.length > 0 ? (
            tasks.data.tasks.map((task) => (
              <div key={task.id} className="relative px-5 py-1 border-b border-[#e1e1e1] pb-5">
                <div className="absolute w-5 h-5 bg-blue-600 rounded-full -left-[0.7rem] top-3"></div>
                <div className="flex justify-between items-center">

                  {/* Editable Title Field */}
                  {editTaskId === task.id ? (
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="text-base font-bold text-gray-900 border p-2 w-full rounded-md mr-3"
                    />
                  ) : (
                    <button
                      onClick={() => toggleTask(task.id)}
                      className="w-full text-left text-base font-bold text-gray-900 hover:text-blue-700 focus:outline-none transition-all"
                    >
                      {task.title}
                    </button>
                  )}

                  {/* Status Dropdown & Edit Buttons */}
                  <div className="relative flex items-center gap-2">
                    <button
                      onClick={() => toggleStatusDropdown(task.id)}
                      className="px-4 py-2 bg-gray-200 rounded-lg shadow-md hover:bg-gray-300 transition-all whitespace-nowrap"
                    >
                      {task.status}
                    </button>

                    {statusDropdown === task.id && (
                      <div className="absolute top-[10px] z-30 right-[35px] mt-2 w-36 bg-white border border-gray-300 rounded-lg shadow-lg">
                        <button
                          onClick={() => updateStatus(task.id, "To do")}
                          className="block w-full px-4 py-2 text-left hover:bg-gray-100 "
                        >
                          To-Do
                        </button>
                        <button
                          onClick={() => updateStatus(task.id, "In Progress")}
                          className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                        >
                          In Progress
                        </button>
                        <button
                          onClick={() => updateStatus(task.id, "Completed")}
                          className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                        >
                          Completed
                        </button>
                        <button
                          onClick={() => updateStatus(task.id, "Cancel")}
                          className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                        >
                          Cancel
                        </button>
                      </div>
                    )}

                    {/* Edit, Save & Cancel Buttons */}
                    {editTaskId === task.id ? (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => saveEdit(task.id)}
                          className="save-btn"
                        ><Save className="h-4 w-4 mr-1" />
                          Save
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="cancel-btn"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => startEditing(task)}
                        className="edit-btn"
                      ><Edit className="h-4 w-4 mr-1" />
                        Edit
                      </button>
                    )}


                    <button
                      onClick={() => handleDelete(task.id)}
                      className="delete-btn"
                    ><Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </button>
                  </div>
                </div>

                {/* Task Details (Expands when clicked) */}
                {openTask === task.id && (
                  <div className="mt-5 p-6 bg-blue-50 rounded-2xl shadow-lg border border-blue-300">

                    {/* Editable Deadline Field */}
                    <p className="text-lg text-gray-800 font-semibold">
                      <strong>Deadline:</strong>
                      {editTaskId === task.id ? (
                        <input
                          type="date"
                          value={editDeadline}
                          onChange={(e) => setEditDeadline(e.target.value)}
                          className="border p-2 ml-2"
                        />
                      ) : (
                        <span className="ml-2">{task.deadline}</span>
                      )}
                    </p>

                    {/* Editable Hours Field */}
                    <p className="text-lg text-gray-800 font-semibold">
                      <strong>Hours:</strong>
                      {editTaskId === task.id ? (
                        <input
                          type="number"
                          value={editHours}
                          onChange={(e) => setEditHours(e.target.value)}
                          className="border p-2 ml-2 w-20"
                        />
                      ) : (
                        <span className="ml-2">{task.hours}</span>
                      )}
                    </p>

                    <p className="text-lg text-gray-800 font-semibold">
                      <strong>Assigned By:</strong> {task.project_manager.name}
                    </p>

                    {/* Editable Task Description */}
                    <p className="text-gray-900 mt-5 leading-relaxed border-t pt-4 text-justify text-lg font-medium">
                      {editTaskId === task.id ? (
                        <textarea
                          value={editDescription}
                          onChange={(e) => setEditDescription(e.target.value)}
                          className="border p-2 w-full h-24"
                        />
                      ) : (
                        task.description
                      )}
                    </p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-lg text-gray-800 font-semibold">
              No tasks available for this project.
            </p>
          )}
        </div>

      </div>

    </div>
  );
} 

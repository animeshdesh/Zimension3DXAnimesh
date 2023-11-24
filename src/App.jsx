import { useState } from "react";
import "./App.css";
import { Button, Typography, TextField } from "@mui/material";
import { Select, MenuItem } from "@mui/material";

function App() {
  // State to hold all projects
  const [projects, setProjects] = useState({});

  // State for the new project name
  const [newProjectName, setNewProjectName] = useState("");

  // State for the new operation details
  const [newOperationDetails, setNewOperationDetails] = useState({
    operationName: "",
    tools: "",
  });
  // State to manage the visibility of div2
  const [isDiv2Visible, setIsDiv2Visible] = useState(true);

  // State for selected project
  const [selectedProjectKey, setSelectedProjectKey] = useState(null);

  // Add a new project
  const addProject = () => {
    if (newProjectName) {
      setProjects({
        ...projects,
        [newProjectName]: [],
      });
      setNewProjectName("");
    } else {
      alert("Please enter a project name.");
    }
  };

  // Select a project to view and add operations
  const selectProject = (projectKey) => {
    setSelectedProjectKey(projectKey);
  };

  // Add a new operation to the selected project
  const addOperationToProject = () => {
    if (
      newOperationDetails.operationName &&
      newOperationDetails.tools &&
      selectedProjectKey
    ) {
      const updatedProjects = {
        ...projects,
        [selectedProjectKey]: [
          ...projects[selectedProjectKey],
          {
            name: newOperationDetails.operationName,
            tools: newOperationDetails.tools,
          },
        ],
      };
      setProjects(updatedProjects);
      setNewOperationDetails({
        operationName: "",
        tools: "",
      });
    } else {
      alert("Please enter operation details.");
    }
  };
  // Function to remove an operation from a project
  const removeOperation = (projectKey, index) => {
    // Filter out the operation at the given index
    const updatedOperations = projects[projectKey].filter(
      (_, opIndex) => opIndex !== index
    );

    // Update the project's operations
    setProjects({
      ...projects,
      [projectKey]: updatedOperations,
    });
  };
  // Function to toggle the visibility
  const toggleDiv2 = () => {
    setIsDiv2Visible(!isDiv2Visible);
  };
  return (
    <>
      <div className="container">
        <div className="projectContainer">
          <Typography variant="h3">Projects</Typography>
          {Object.keys(projects).map((projectKey) => (
            <button
              variant="contained"
              className="projectButtons"
              key={projectKey}
              sx={{
                backgroundColor: "white",
                borderRadius: "15px",
              }}
              onClick={() => selectProject(projectKey)}
            >
              {projectKey}
            </button>
          ))}
          <TextField
            label="Project Name"
            sx={{ backgroundColor: "white", borderRadius: "20px" }}
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
          />
          <Button variant="contained" onClick={addProject}>
            Add Project
          </Button>
        </div>
        <div className="operationContainer">
          <div className="navbar">
            <Typography variant="h4">Account</Typography>
          </div>
          {selectedProjectKey && (
            <>
              <div className="operationsCanvas">
                <div className="operationsProjectName">
                  <Typography variant="h4">{selectedProjectKey}</Typography>
                </div>

                {projects[selectedProjectKey].map((operation, index) => (
                  <div key={index} className="operationsItems">
                    <div className="operationsName">
                      <Typography
                        sx={{
                          color: "#880202",
                          fontSize: "20px",
                          fontWeight: "700",
                        }}
                      >
                        {operation.name}
                      </Typography>
                    </div>
                    <div className="operationsTools">
                      <Typography
                        sx={{
                          color: "white",
                          fontSize: "20px",
                          fontWeight: "700",
                        }}
                      >
                        {operation.tools}
                      </Typography>
                    </div>

                    <button
                      variant="contained"
                      onClick={() => removeOperation(selectedProjectKey, index)}
                      className="removeOperationButton"
                    >
                      X
                    </button>
                  </div>
                ))}
                <div className="buttonOperations">
                  <Button
                    sx={{
                      backgroundColor: "white",
                      borderRadius: "50%",
                      padding: "1rem",
                    }}
                    onClick={toggleDiv2}
                  >
                    <Typography variant="h5">X</Typography>
                  </Button>
                  <Typography variant="h6">New Operations</Typography>
                </div>
              </div>
            </>
          )}
        </div>
        {isDiv2Visible && (
          <div className="operationsController">
            <Typography variant="h5">Add New Operation</Typography>
            <TextField
              label="Enter Name"
              value={newOperationDetails.operationName}
              sx={{
                border: "1px solid black",
                borderRadius: "10px",
                backgroundColor: "#EFEFEF",
              }}
              onChange={(e) =>
                setNewOperationDetails({
                  ...newOperationDetails,
                  operationName: e.target.value,
                })
              }
            />

            <Select
              label="Select Tool"
              value={newOperationDetails.tools}
              sx={{
                border: "1px solid black",
                borderRadius: "10px",
                backgroundColor: "#EFEFEF",
              }}
              onChange={(e) =>
                setNewOperationDetails({
                  ...newOperationDetails,
                  tools: e.target.value,
                })
              }
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="" disabled>
                Select tool
              </MenuItem>
              <MenuItem value="Tool D-2">Tool D-2 (2mm)</MenuItem>
              <MenuItem value="Tool D-4">Tool D-4 (4mm)</MenuItem>
              <MenuItem value="Tool D-6">Tool D-6 (6mm)</MenuItem>
              <MenuItem value="Tool D-8">Tool D-8 (8mm)</MenuItem>
              <MenuItem value="Tool D-10">Tool D-10 (10mm)</MenuItem>
            </Select>
            <Button
              variant="contained"
              sx={{ height: "50px", backgroundColor: "red", width: "92px" }}
              onClick={addOperationToProject}
            >
              Add
            </Button>
            <Button
              variant="contained"
              sx={{ height: "50px", backgroundColor: "blue", width: "92px" }}
              onClick={toggleDiv2}
            >
              Done
            </Button>
          </div>
        )}
      </div>
    </>
  );
}

export default App;

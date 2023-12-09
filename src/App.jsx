import { useState } from "react";
import NewProject from "./components/NewProject.jsx";
import NoProjectSelected from "./components/NoProjectSelected.jsx";
import ProjectsSideBar from "./components/ProjectsSideBar.jsx";
import SelectedProject from "./components/SelectedProject.jsx";

function App() {
  const [projectsState, setProjectsState] = useState({
    projects: [],
    selectedProjectId: undefined,
  });

  function handleOnStartProject() {
    setProjectsState((prevProjectsState) => {
      return {
        ...prevProjectsState,
        selectedProjectId: null,
      };
    });
  }

  function handleOnCancelProject() {
    setProjectsState((prevProjectsState) => {
      return {
        ...prevProjectsState,
        selectedProjectId: undefined,
      };
    });
  }

  function handleAddNewProject(project) {
    const newProject = {
      id: Math.random(),
      title: project.title,
      description: project.description,
      date: project.date,
    };

    setProjectsState((prevProjectsState) => {
      return {
        ...prevProjectsState,
        projects: [...prevProjectsState.projects, newProject],
        selectedProjectId: undefined,
      };
    });
  }

  function handleSelectProject(id) {
    setProjectsState((prevProjects) => {
      return {
        ...prevProjects,
        selectedProjectId: id,
      };
    });
  }

  function handleDeleteProject() {
    setProjectsState((prevProjects) => {
      return {
        ...prevProjects,
        selectedProjectId: undefined,
        projects: prevProjects.projects.filter(
          (project) => project.id !== prevProjects.selectedProjectId
        ),
      };
    });
  }

  const selectedProject = projectsState.projects.find(
    (project) => project.id === projectsState.selectedProjectId
  );

  let content = (
    <SelectedProject project={selectedProject} onDelete={handleDeleteProject} />
  );

  if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onCreateNewProject={handleOnStartProject} />;
  } else if (projectsState.selectedProjectId === null) {
    content = (
      <NewProject
        onAdd={handleAddNewProject}
        onCancel={handleOnCancelProject}
      />
    );
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSideBar
        onAddNewProject={handleOnStartProject}
        projects={projectsState.projects}
        onProjectSelect={handleSelectProject}
        selectedProjectId={projectsState.selectedProjectId}
      />
      {content}
    </main>
  );
}

export default App;

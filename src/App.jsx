import { useState } from "react";
import NewProject from "./components/NewProject.jsx";
import NoProjectSelected from "./components/NoProjectSelected.jsx";
import ProjectsSideBar from "./components/ProjectsSideBar.jsx";
import SelectedProject from "./components/SelectedProject.jsx";

function App() {
  const [projectsState, setProjectsState] = useState({
    projects: [],
    tasks: [],
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

  function handleAddTask(task) {
    console.log(task);
    const newTask = {
      id: Math.random(),
      projectId: projectsState.selectedProjectId,
      text: task,
    };

    setProjectsState((prevProjects) => {
      return {
        ...prevProjects,
        selectedProject: prevProjects.selectedProjectId,
        tasks: [newTask, ...prevProjects.tasks],
      };
    });
  }

  function handleDeleteTask(taskId) {
    setProjectsState((prevProjects) => {
      return {
        ...prevProjects,
        tasks: prevProjects.tasks.filter((task) => task.id !== taskId),
      };
    });
  }

  const selectedProject = projectsState.projects.find(
    (project) => project.id === projectsState.selectedProjectId
  );

  let content = (
    <SelectedProject
      project={selectedProject}
      onDelete={handleDeleteProject}
      handleAddTask={handleAddTask}
      handleDeleteTask={handleDeleteTask}
      tasks={projectsState.tasks}
    />
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

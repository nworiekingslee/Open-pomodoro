import ProjectCard from "./project component/ProjectCard";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Profile from "./Profile";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import HomeLoader from "./Loader screen/HomeLoader";
import Footer from "./Footer";

function ProjectCardContainer({
  tasks,
  projects: userProjects,
  handleDeleteProject,
  updateProjects,
}) {
  const { user } = useAuth0();
  const { nickname, picture, email } = user;

  return (
    <>
      <Profile
        projectCount={userProjects.length}
        name={nickname}
        picture={picture}
        email={email}
      />
      <Navbar projects={userProjects} updateUserProjects={updateProjects} />

      <div className="mx-4 grid gap-3 md:grid-cols-2 md:grid-rows-2 h-100 mb-16">
        {userProjects.map((item) => (
          <ProjectCard
            key={item.id}
            item={item}
            tasks={tasks.filter((task) => task.fields.projectId[0] === item.id)}
            handleDeleteProject={handleDeleteProject}
            profile_img={picture}
          />
        ))}
        <Link to="/new-project">
          <div className="p-4 w-100 bg-background relative rounded-lg border border-dashed hover:shadow  border-grey-200 cursor-pointer flex flex-col justify-center items-center text-grey-200">
            <p className="text-lg text-center font-semibold">
              What do you want to work on today?
            </p>
            <p className="text-center text-sm mt-4">
              Click to add a project and keep track of task
            </p>
          </div>
        </Link>
      </div>
      <Footer />
    </>
  );
}

export default withAuthenticationRequired(ProjectCardContainer, {
  onRedirecting: () => <HomeLoader />,
});

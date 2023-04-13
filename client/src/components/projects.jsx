import Spinner from './spinner'
import { useQuery } from '@apollo/client'
import { GET_PROJECTS } from "../queries/projectQueries"
import ProjectCard from './ProjectCard' 


const Projects = () => {
    const { loading, error, data } = useQuery(GET_PROJECTS)
    if (loading) return <Spinner />
    if (error) return <p>Something went wrong</p>
 
    return (
        <>
            { data.projects.length > 0 ? (
                <div className='row'>
                    { data.projects.map(project => (
                        <ProjectCard key={crypto.randomUUID()} project={project} />
                    ))}
                </div>
            ) : (<p>No projects</p>) }
        </>
    )
}

export default Projects;
import Header from "../components/Header";
import AddClientModal from "../components/addClientModal";
import Projects from "../components/projects";
import Clients from "../components/Clients";
import AddProjectModal from '../components/AddProjectModal'

const Home = () => {
    return (
        <>
        <div className="container">
            <AddClientModal />
            <AddProjectModal />
            <Projects />
            <Clients />
            <button className='btn-outline-secondary'>Click me</button>
        </div>    
        </>
    )
}

export default Home;
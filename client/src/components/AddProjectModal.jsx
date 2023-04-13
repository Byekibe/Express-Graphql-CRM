import { useState } from 'react'
import { FaList } from 'react-icons/fa'
import { useMutation, useQuery } from '@apollo/client'
import { GET_PROJECTS } from '../queries/projectQueries'
import { GET_CLIENTS } from '../queries/clientQueries'
import Spinner from './spinner'
import { ADD_PROJECT } from '../mutations/projectMutations'



const AddProjectModal = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [clientId, setClientId] = useState("");
    const [status, setStatus] = useState("new")

    const [addProject] = useMutation(ADD_PROJECT, {
        variables: { name, description, clientId, status},
        update(cache, { data: { addProject}}) {
            const { projects } = cache.readQuery({ query: GET_PROJECTS });
            cache.writeQuery({
                query: GET_PROJECTS,
                data: { projects: [...projects, addProject]},
            });
        }
    })
    const { loading, error, data} = useQuery(GET_CLIENTS)

    const handleSubmit = (e) => {
        e.preventDefault()

        if (name === "" || description === "" || status === "") {
            return alert('Please fill in all fields');
        }

        addProject(name, description, clientId,status)

        setName("");
        setDescription("");
        setStatus("new");
        setClientId("")
    }

    if (loading) return null;
    if (error) return "Something went wrong"

    return (
        <>
        {!loading && !error && (
                <>
                <button type="button" className="btn btn-primary mb-4 ms-3" data-bs-toggle="modal" data-bs-target="#addProjectModal">
                <div className='d-flex align-items-center'>
                    <FaList className='icon'  />
                    <div>New Project</div>
                </div>
                </button>

                <div className="modal fade" id="addProjectModal" aria-labelledby="addProjectModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="addProjectModalLabel">Add Project</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className='mb-3'>
                                <label className='form-label' htmlFor="name">Name</label>
                                <input 
                                    type="text" 
                                    id='name'
                                    className='form-control'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className='mb-3'>
                                <label className='form-label' htmlFor="email">Description</label>
                                <textarea 
                                    id='description'
                                    className='form-control'
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                ></textarea>
                            </div>
                            <div className='mb-3'>
                                <label className='form-label' htmlFor="status">Status</label>
                                <select id="status" className="form-select" value={status} onChange={ e => setStatus(e.target.value)}>
                                    <option value="new">Not Started</option>
                                    <option value="progress">In Progress</option>
                                    <option value="completed">Completed</option>
                                </select>
                            </div>
                            <div className='mb-3'>
                                <label className='form-label'>Client</label>
                                <select name="" id="clientId" className='form-select' value={clientId} onChange={e => setClientId(e.target.value)}>
                                    <option value="">Select Client</option>
                                    {
                                        data.clients.map(client => (
                                            <option key={client.id} value={client.id} >
                                                { client.name }
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>
                            <button 
                                className='btn btn-primary' 
                                data-bs-dismiss="modal"
                                type='submit'
                            >
                                Submit
                            </button>
                        </form>
                    </div>

                    </div>
                </div>
                </div>
            </>            
        )}
        </>
    )
}


export default AddProjectModal;
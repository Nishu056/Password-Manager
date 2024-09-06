import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from 'react-bootstrap';
import eye from '../assets/eye.webp'
import hidden from '../assets/hidden.webp';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './manager.css';  
import Navb from '../Components/Navb'

const Manager = () => {
    const [website, setWebsite] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [pass, setPass] = useState([]);
    const [editId, setEditId] = useState(null);

    // Data submission
    const Submit = (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');

        // Check if we are in edit mode
        if (editId) {
            // Update the existing password entry
            axios.put(`http://localhost:3002/updatePassword/` + editId, { website, name, password }, {
                headers: { 'Authorization': `Bearer ${token}` }
            })
                .then((result) => {
                    setPass(pass.map(item => (item._id === editId ? result.data : item)));
                    clearForm();
                })
                .catch((err) => console.log(err));
        } else {
            // Add a new password entry
            axios.post('http://localhost:3002/savePassword', { website, name, password }, {
                headers: { 'Authorization': `Bearer ${token}` }
            })
                .then((result) => {
                    setPass([...pass, result.data]);
                    clearForm();
                })
                .catch((err) => console.log(err));
        }
    };

    // Fetch password data on load
    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get('http://localhost:3002/getPassword', {
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then((result) => {
                setPass(result.data);
            })
            .catch((err) => console.log(err));
    }, []);

    // Handle deleting data 
    const handleDelete = (id) => {
        const token = localStorage.getItem('token');
        axios.delete(`http://localhost:3002/deletePassword/` + id, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then((result) => {
                window.location.reload()
            })
            .catch(err => console.log(err));
    }

    // Handle updating data 
    const handleUpdate = (id) => {
        const Edit = pass.find(item => item._id === id);
        if (Edit) {
            setWebsite(Edit.website);
            setName(Edit.name);
            setPassword(Edit.password);
            setEditId(id);
        }
    }


    // Clear form after submission 
    const clearForm = () => {
        setWebsite('');
        setName('');
        setPassword('');
        setEditId(null);
    }

    const ref = useRef()
    const Passwordref = useRef()
    const ShowPassword = () => {
        Passwordref.current.type = "text"
        if (ref.current.src.includes('hidden.webp')) {
            ref.current.src = eye;
            Passwordref.current.type = "text"
        } else {
            ref.current.src = hidden;
            Passwordref.current.type = "password"
        }
    };


    const copyToClipboard = (text) => {
        toast('Copied to clipboard', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        navigator.clipboard.writeText(text)
    }


    return (
        
        <>
        <Navb />
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div className="container">
                <h1 className="title">
                    <span>&lt;Password/&gt;</span>
                </h1>

                <p className="subtitle">Your Own Password Manager</p>
                <form onSubmit={Submit}>
                    <div className="form-items">
                        <input
                            className="input-field"
                            type="text"
                            placeholder="Enter Website Url"
                            value={website}
                            onChange={(e) => setWebsite(e.target.value)}
                            required
                        />
                        <div className="sidebyside">
                            <input
                                className="input-field  username-field"
                                type="text"
                                placeholder="Enter Username"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                            <input
                                className="input-field password-field"
                                type="password"
                                placeholder="Enter Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                ref={Passwordref}
                                required
                            />
                            </div>
                            <span className="toggle-password" onClick={ShowPassword}>
                                <img ref={ref} src={hidden} alt="Toggle password visibility" className="icon" />
                            </span>
                        

                        <button
                            type="submit"
                            className="submit-button"
                        ><lord-icon
                        src="https://cdn.lordicon.com/jgnvfzqg.json"
                        trigger="hover"
                   />
                            {editId ? 'Update Password' : 'Add Password'}
                        </button>
                    </div>
                </form>

                <div>
                    <Table striped="columns">
                        <thead>
                            <tr>
                                <th>Website</th>
                                <th>Username</th>
                                <th>Password</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pass.length > 0 ? (
                                pass.map((passItem) => (
                                    <tr key={passItem._id}>
                                        <td className="table-cell">{passItem.website} 
                                        <lord-icon
                                            src="https://cdn.lordicon.com/iykgtsbt.json"
                                            trigger="hover"
                                            style={{ width: '25px', height: '25px', cursor: 'pointer' }}
                                            onClick={() => copyToClipboard(passItem.website)}
                                        />
                                        </td>
                                        <td className="table-cell">{passItem.name}
                                        <lord-icon
                                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                                trigger="hover"
                                                style={{ width: '25px', height: '25px', cursor: 'pointer' }}
                                                onClick={() => copyToClipboard(passItem.name)}
                                            />
                                        </td>
                                        <td className="table-cell">{passItem.password}
                                        <lord-icon
                                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                                trigger="hover"
                                                style={{ width: '25px', height: '25px', cursor: 'pointer' }}
                                                onClick={() => copyToClipboard(passItem.password)}
                                            />
                                        </td>
                                        <td>
                                            <button className="btn btn-primary" onClick={() => handleUpdate(passItem._id)}>Update</button>{' '}
                                            <button className="btn btn-danger" onClick={() => handleDelete(passItem._id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4">No data available</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </div>
            </div>
        </>
    );
};

export default Manager;

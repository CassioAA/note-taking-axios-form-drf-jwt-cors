import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Form.css"
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import LoadingIndicator from "./LoadingIndicator";
import PropTypes from 'prop-types';

function Form({ route, method }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            const res = await api.post(route, { username, password })
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/")
            } else {
                navigate("/login")
            }
        } catch (error) {
            alert(error)
        } finally {
            setLoading(false)
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h1>{method}</h1>
            <input
                className="form-input"
                type="text"
                value={username}
                onChange={(e) =>
                    setUsername(e.target.value)
                }
                placeholder="Username"
            />
            <input
                className="form-input"
                type="password"
                value={password}
                onChange={(e) =>
                    setPassword(e.target.value)
                }
                placeholder="Password"
            />
            {loading && <LoadingIndicator />}
            <button className="form-button" type="submit">
                {method}
            </button>
        </form>
    );
}

Form.propTypes = {
    route: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired
};

export default Form;
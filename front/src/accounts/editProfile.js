import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom"
import EditForm from "./editProfileForm.js";

const EditProfile = () => {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://127.0.0.1/api/accounts/edit-profile/", {
                    headers: {
                        'Authorization': `Token ${localStorage.getItem('token')}`
                    }
                });
                setFirstName(response.data.first_name);
                setLastName(response.data.last_name);
                if (response.data.image) {
                    setImageUrl(response.data.image)
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    function handleFirstNameChange(event) {
        setFirstName(event.target.value)
    }
    function handleLastNameChange(event) {
        setLastName(event.target.value)
    }
    function handleImageChange(event) {
        if (event.target.files.length ) {
            const file = event.target.files[0];
            const url = URL.createObjectURL(file);
            setImage(file);
            setImageUrl(url);
        }
    };

    function submitProfile(event) {
        event.preventDefault();
        var params = { last_name: lastName, first_name: firstName, image: image };
        axios
            .patch("http://127.0.0.1/api/accounts/edit-profile/", params, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Token ${localStorage.getItem('token')}`
                }})
            .then(res => {
                navigate("/");
            })
            .catch(error => {
                if (error.response) {
                    alert(error.response.data.non_field_errors);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
            });
    }

    if (loading) {
        return <h4>loading...</h4>
    }

    return (
        <EditForm
            firstName={firstName}
            lastName={lastName}
            image={image}
            imageUrl={imageUrl}
            onFNchange={handleFirstNameChange}
            onLNchange={handleLastNameChange}
            onImageChange={handleImageChange}
            onSubmit={submitProfile}
        />
    )

}

export default EditProfile
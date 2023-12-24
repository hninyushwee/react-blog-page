import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../../contexts/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import CreatePostsForm from "./CreatePostsForm";
import { useApiData } from "../../../contexts/ApiDataContext";

function CreatePostsPage() {
  const { id } = useParams();
  const { localUserData } = useAuth();
  const { category } = useApiData();
  const navigator = useNavigate();
  const initialValue = {
    category: "default",
    title: "",
    image_url: "",
    content: "",
  };
  const [formValues, setFormValues] = useState(initialValue);
  const [errorMessage, setErrorMessage] = useState({});
  useEffect(() => {
    if (id) {
      axios
        .get(`${import.meta.env.VITE_API_URL}/posts/${id}?_expand=category`)
        .then((res) => setFormValues(res.data));
    } else {
      setFormValues(initialValue);
    }
  }, [id]);

  const handleInput = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };
  const validate = () => {
    let err = {};
    const imgRegx = /(https?:\/\/.*)/;
    if (formValues.category === "default") {
      err.category = "Category Field is required";
    }
    if (formValues.title === "" || formValues.title === null) {
      err.title = "Title Field is required";
    }
    if (formValues.image_url === "" || formValues.image_url === null) {
      err.image = "Image Field is required";
    } else if (!imgRegx.test(formValues.image_url)) {
      err.image = "Url start with https://... or http://...";
    }
    if (formValues.content === "" || formValues.content === null) {
      err.content = "Content Field is required";
    }
    return err;
  };
  const createPost = async () => {
    if (Object.keys(validate()).length === 0) {
      const date = new Date().toISOString();
      const postData = {
        title: formValues.title,
        image_url: formValues.image_url,
        content: formValues.content,
        created_at: date,
        userId: localUserData,
        categoryId: formValues.category,
        likeStatus: [],
      };
      // if error not have, store created post

      await axios
        .post(`${import.meta.env.VITE_API_URL}/posts`, postData)
        .then(() => {
          localStorage.setItem("SuccessToast", "false");
          //go to home page and show success toast
          navigator("/", {
            state: { createSuccess: "Create post successful" },
          });
          // clear input value
          setFormValues({ initialValue });
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);
          } else if (err.request) {
            console.log(err.request);
          } else {
            console.log("Error", err.message);
          }
          console.log(err.config);
        });
    }
  };
  const editPost = async () => {
    if (Object.keys(validate()).length === 0) {
      const postData = {
        title: formValues.title,
        image_url: formValues.image_url,
        content: formValues.content,
        categoryId: formValues?.category?.id,
      };
      // if error not have, store edit post data
      await axios
        .patch(`${import.meta.env.VITE_API_URL}/posts/${id}`, postData)
        .then(() => {
          localStorage.setItem("SuccessToast", "false");
          navigator("/", {
            state: { createSuccess: "Edit post successful" },
          });
          setFormValues({ initialValue });
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);
          } else if (err.request) {
            console.log(err.request);
          } else {
            console.log("Error", err.message);
          }
          console.log(err.config);
        });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage(validate(formValues));
    if (id) {
      editPost();
    } else {
      createPost();
    }
  };
  return (
    <div className="pb-5">
      <CreatePostsForm
        postId={id}
        category={category}
        errorMessage={errorMessage}
        formValues={formValues}
        handleInput={handleInput}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

export default CreatePostsPage;

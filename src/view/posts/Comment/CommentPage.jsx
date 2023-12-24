import axios from "axios";
import React, { useEffect, useState } from "react";
import { CommentForm } from "./CommentForm";
import { CommentsList } from "./CommentsList";
import { useAuth } from "../../../contexts/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import { useApiData } from "../../../contexts/ApiDataContext";
import { Loading } from "../../../Loading";

function CommentPage({ postId, setCommentCount }) {
  //   get login user id
  const { localUserData } = useAuth();
  const [loading, setLoading] = useState(true);
  const [activeComment, setActiveComment] = useState(null);
  // for comment from api
  const [comments, setComments] = useState([]);
  // Get comment from API
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_API_URL}/comments?postId=${postId}`)
      .then((res) => {
        setComments(res.data);
        setCommentCount(res.data.length);
        setLoading(false);
      });
  }, [postId]);
  //   Create Comment
  const createComment = (text) => {
    if (localUserData) {
      const data = {
        comment: text,
        postId: postId,
        userId: localUserData,
      };
      axios
        .post(`${import.meta.env.VITE_API_URL}/comments`, data)
        .then((res) => {
          setComments([...comments, res.data]);
          setCommentCount(comments.length + 1);
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
    } else {
      toast.warn("Please Login First!!", {
        position: toast.POSITION.TOP_RIGHT,
        theme: "colored",
      });
    }
  };
  //   update Comment
  const editComment = (text, commentId) => {
    axios
      .patch(`${import.meta.env.VITE_API_URL}/comments/${commentId}`, {
        comment: text,
      })
      .then(() => {
        const updateComment = comments.map((comment) => {
          if (comment.id === commentId) {
            return { ...comment, comment: text };
          }
          return comment;
        });
        setComments(updateComment);
        setActiveComment(null);
      })
      .catch((err) => console.log(err));
  };
  //   delete Comment
  const deleteComment = (commentId) => {
    axios
      .delete(`${import.meta.env.VITE_API_URL}/comments/${commentId}`)
      .then(() => {
        const updateComment = comments.filter(
          (comment) => comment.id !== commentId
        );
        setComments(updateComment);
        setCommentCount(comments.length - 1);
      })
      .catch((err) => console.log(err));
  };
  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      <ToastContainer />
      {/*Show Comments List */}
      {comments &&
        comments.map((comment) => (
          <CommentsList
            key={comment.id}
            comment={comment}
            commentUserId={comment.userId}
            userId={localUserData}
            activeComment={activeComment}
            setActiveComment={setActiveComment}
            editComment={editComment}
            deleteComment={deleteComment}
          />
        ))}
      {/*Create Comment */}
      <div className="mt-6">
        <CommentForm handleSubmit={createComment} submitLabel="Post" />
      </div>
    </div>
  );
}

export default CommentPage;

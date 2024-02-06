import React, { useState } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import bcrypt from "bcryptjs";
import axios from "axios";
import { ShowProfileData } from "./ShowProfileData";
import { useApiData } from "../../contexts/ApiDataContext";
import { ToastContainer, toast } from "react-toastify";

function ProfilePage() {
  const { theme, themeStyle } = useTheme();
  const { userDetails, setUserDetails, allUsers } = useApiData();
  // const [userDetails, setUserDetails] = useState({});
  const [activeProfile, setActiveProfile] = useState(null);

  // update password to api
  const updatePassword = async (newPassword) => {
    const salt = bcrypt.genSaltSync(10);
    const password = bcrypt.hashSync(newPassword, salt);

    await axios
      .patch(`${import.meta.env.VITE_API_URL}/users/${userDetails.id}`, {
        password: password,
      })
      .then((res) => {
        setActiveProfile(null);
        setUserDetails(res.data);
        toast.success("Change Password Successful", {
          position: toast.POSITION.TOP_RIGHT,
          theme: "colored",
          autoClose: 3000,
        });
      })
      .catch((err) => console.log(err));
  };
  //for password changing
  const handlePassword = (currentPassword, newPassword) => {
    const passwordRegx =
      /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;

    // Test current password don't match with old password from API
    bcrypt.compare(currentPassword, userDetails.password, (err, isMatch) => {
      if (err) {
        throw err;
      } else if (!isMatch) {
        toast.error("Current Password is not match", {
          position: toast.POSITION.TOP_RIGHT,
          theme: "colored",
          autoClose: 3000,
        });
      }
      //   test current password and new password is match, if match show error
      else if (currentPassword === newPassword) {
        toast.error("New Password shouldn't match old password", {
          position: toast.POSITION.TOP_RIGHT,
          theme: "colored",
          autoClose: 3000,
        });
      } else if (!passwordRegx.test(newPassword)) {
        toast.error(
          "Password should be 8-16 characters and include at least 1 letter, 1 number, and 1 special characters",
          {
            position: toast.POSITION.TOP_RIGHT,
            theme: "colored",
            autoClose: 3000,
          }
        );
      } else {
        updatePassword(newPassword);
      }
    });
  };
  //  If Email OR Phone already exit, show error
  const validateEmailOrPhone = (email, phone) => {
    if (email.length > 0) {
      toast.error("Email already exit.", {
        position: toast.POSITION.TOP_RIGHT,
        theme: "colored",
        autoClose: 3000,
      });
      return false;
    } else if (phone.length > 0) {
      toast.error("Phone already exit.", {
        position: toast.POSITION.TOP_RIGHT,
        theme: "colored",
        autoClose: 3000,
      });
      return false;
    } else {
      return true;
    }
  };
  // update other user data
  const updateOtherData = async (type, newData) => {
    let changeData;
    switch (type) {
      case "image":
        changeData = { image: newData };
        break;
      case "name":
        changeData = { name: newData };
        break;
      case "email":
        changeData = { email: newData };
        break;
      case "phone":
        changeData = { phone: newData };
        break;
    }
    const hasEmail = allUsers.filter(
      (allUser) => allUser.email === changeData.email
    );
    const hasPhone = allUsers.filter(
      (allUser) => allUser.phone === changeData.phone
    );
    if (validateEmailOrPhone(hasEmail, hasPhone)) {
      await axios
        .patch(
          `${import.meta.env.VITE_API_URL}/users/${userDetails.id}`,
          changeData
        )
        .then((res) => {
          setUserDetails(res.data);
          setActiveProfile(null);
          toast.success("Update successful.", {
            position: toast.POSITION.TOP_RIGHT,
            theme: "colored",
            autoClose: 3000,
          });
        });
    }
  };
 
  return (
    <div>
      <ToastContainer />
      <div
        className="w-5/6  m-auto mt-10 border border-[#9ca3afa1] rounded shadow-lg"
        style={
          theme.mode === "dark" ? themeStyle.card.dark : themeStyle.card.light
        }
      >
        {Object.keys(userDetails).length > 0 && (
          <ShowProfileData
            keys={userDetails.id}
            activeProfile={activeProfile}
            setActiveProfile={setActiveProfile}
            userData={userDetails}
            updateOtherData={updateOtherData}
            handlePassword={handlePassword}
          />
        )}
      </div>
    </div>
  );
}
export default ProfilePage;

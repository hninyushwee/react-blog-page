import React from "react";
import { PencilIcon } from "@heroicons/react/24/outline";
import { EditProfileData } from "./EditProfileData";

export const ShowProfileData = ({
  userData,
  setActiveProfile,
  activeProfile,
  handlePassword,
  updateOtherData,
}) => {
  const isImageEditing = activeProfile && activeProfile.type === "image";
  const isNameEditing = activeProfile && activeProfile.type === "name";
  const isEmailEditing = activeProfile && activeProfile.type === "email";
  const isPhoneEditing = activeProfile && activeProfile.type === "phone";
  const isPasswordEditing = activeProfile && activeProfile.type === "password";
  return (
    <div className="mx-5 my-3 md:mx-7 md:my-4 lg:mx-8 lg:my-5">
      <div>
        <div className="flex mb-1">
          <div>
            <img
              className="rounded-full w-6 h-6 sm:w-7 sm:h-7 md:w-9 md:h-9 lg:w-10 lg:h-10"
              src={userData.image}
              alt=""
            />
            <PencilIcon
              onClick={() =>
                setActiveProfile({
                  type: "image",
                })
              }
              className="w-4 h-3 sm:w-[18px] sm-h-3.5 md:w-5 md:h-4 lg:w-5 lg:h-4 ml-2 pb-[1px] border-b border-gray-500 cursor-pointer hover:h-4 hover:md:h-5 hover:lg:h-5"
            />
            {isImageEditing && (
              <EditProfileData
                label="Edit Image"
                setActiveProfile={setActiveProfile}
                oldData={userData.image}
                updateOtherData={updateOtherData}
                name="image"
              />
            )}
          </div>
          <div className="ml-2 md:ml-3 lg:ml-3">
            <div className="flex">
              <p className="font-bold">{userData.name}</p>
              <PencilIcon
                onClick={() =>
                  setActiveProfile({
                    type: "name",
                  })
                }
                className="w-4 h-3 sm:w-[18px] sm-h-3.5 md:w-5 md:h-4 lg:w-5 lg:h-4 ml-1.5 md:ml-3 lg:ml-3 mt-1 pb-[1px] border-b border-gray-500 cursor-pointer hover:h-4 hover:md:h-5 hover:lg:h-5"
              />
            </div>
            {isNameEditing && (
              <EditProfileData
                label="Edit Name"
                setActiveProfile={setActiveProfile}
                oldData={userData.name}
                updateOtherData={updateOtherData}
                name="name"
              />
            )}
          </div>
        </div>
      </div>
      <div className="ml-3.5 mt-3.5 md:ml-4 md:mt-4 lg:ml-5 lg:mt-5">
        <div className=" flex items-center mb-3.5 md:mb-4 lg:mb-5">
          <p>Email &nbsp;: &nbsp; </p>
          <div className="flex">
            <p>{userData.email}</p>
            <PencilIcon
              onClick={() =>
                setActiveProfile({
                  type: "email",
                })
              }
              className="w-4 h-3 sm:w-[18px] sm-h-3.5 md:w-5 md:h-4 lg:w-5 lg:h-4 ml-1.5 md:ml-3 lg:ml-3 pb-[1px] border-b border-gray-500 cursor-pointer hover:h-4 hover:md:h-5 hover:lg:h-5"
            />
          </div>
          {isEmailEditing && (
            <EditProfileData
              label="Edit Email"
              setActiveProfile={setActiveProfile}
              oldData={userData.email}
              updateOtherData={updateOtherData}
              name="email"
            />
          )}
        </div>
        <div className="flex items-center mb-3.5 md:mb-4 lg:mb-5">
          <p>Phone &nbsp;: &nbsp; </p>
          <div className="flex">
            <p>{userData.phone}</p>
            <PencilIcon
              onClick={() =>
                setActiveProfile({
                  type: "phone",
                })
              }
              className="w-4 h-3 sm:w-[18px] sm-h-3.5 md:w-5 md:h-4 lg:w-5 lg:h-4 ml-1.5 md:ml-3 lg:ml-3 pb-[1px] border-b border-gray-500 cursor-pointer hover:h-4 hover:md:h-5 hover:lg:h-5"
            />
          </div>
          {isPhoneEditing && (
            <EditProfileData
              label="Edit Phone"
              setActiveProfile={setActiveProfile}
              oldData={userData.phone}
              updateOtherData={updateOtherData}
              name="phone"
            />
          )}
        </div>
        <div className="flex mb-8">
          <p className="flex-none">Password &nbsp;: &nbsp; </p>
          <div className="flex">
            <p className="break-all">{userData.password}</p>
            <PencilIcon
              className="w-4 h-3 flex-none sm:w-[18px] sm-h-3.5 md:w-5 md:h-4 lg:w-5 lg:h-4 ml-1.5 md:ml-3 lg:ml-3 pb-[1px] border-b border-gray-500 cursor-pointer hover:h-4 hover:md:h-5 hover:lg:h-5"
              onClick={() => setActiveProfile({ type: "password" })}
            />
          </div>
          {isPasswordEditing && (
            <EditProfileData
              label="Change Password"
              setActiveProfile={setActiveProfile}
              oldPassword={userData.password}
              placeholder="Current Password"
              name="oldPassword"
              newPasswordInput
              handlePassword={handlePassword}
            />
          )}
        </div>
      </div>
    </div>
  );
};

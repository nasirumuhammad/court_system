import { useEffect } from "react";

import {
  FaEnvelope,
  FaPhone,
  FaUserShield,
  FaUserCircle,
  FaCalendarAlt,
} from "react-icons/fa";

import useProfileStore from "../../store/profileStore";
import useAuthStore from "../../store/authStore";

const Profile = () => {

  const {
    user,
    fetchProfile,
    isLoading,
    error,
  } = useProfileStore();

  

  useEffect(() => {
    fetchProfile();
  }, []);

 

  if (isLoading) {

    return (
      <div className="flex justify-center py-20">

        <span className="loading loading-spinner loading-lg"></span>

      </div>
    );

  }

  if (error) {

    return (
      <div className="alert alert-error">

        {error}

      </div>
    );

  }

  if (!user) return null;

  return (

    <div className="mx-auto max-w-4xl">

      <div className="card bg-base-100 shadow-xl">

        <div className="card-body">

          <div className="flex flex-col items-center">

            <div className="avatar placeholder">

              <div className="bg-primary text-primary-content text-4xl w-24 rounded-full flex items-center justify-center ">

                  {user.fullName.charAt(0).toUpperCase()}

              </div>

            </div>

            <h2 className="mt-4 text-3xl font-bold">

              {user.fullName}

            </h2>

            <div className="badge badge-primary badge-lg mt-2">

              {user.role}

            </div>

          </div>

          <div className="divider"></div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

            <ProfileItem
              icon={<FaEnvelope />}
              label="Email"
              value={user.email}
            />

            <ProfileItem
              icon={<FaPhone />}
              label="Phone Number"
              value={
                user.phoneNumber ||
                "Not Available"
              }
            />

            <ProfileItem
              icon={<FaUserShield />}
              label="Role"
              value={user.role}
            />

            <ProfileItem
              icon={<FaCalendarAlt />}
              label="Member Since"
              value={new Date(
                user.createdAt
              ).toLocaleDateString()}
            />

          </div>

          <div className="divider"></div>

          <div className="alert">

            <FaUserCircle className="text-lg" />

            <span>

              Profile information is managed by the system administrator.

            </span>

          </div>

        </div>

      </div>

    </div>

  );

};

const ProfileItem = ({
  icon,
  label,
  value,
}) => (

  <div className="flex items-start gap-4">

    <div className="mt-1 text-primary">

      {icon}

    </div>

    <div>

      <p className="text-sm text-base-content/60">

        {label}

      </p>

      <p className="font-semibold">

        {value}

      </p>

    </div>

  </div>

);

export default Profile;
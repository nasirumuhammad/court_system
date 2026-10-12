import { useEffect } from "react";

import useUserStore from "../../store/userStore";

import UsersHeader from "../../components/users/UsersHeader";
import UsersTable from "../../components/users/UsersTable";
import UserModal from "../../components/users/UserModal";
import ViewUserModal from "../../components/users/ViewUserModal";
import DeleteUserModal from "../../components/users/DeleteUserModal";

const Users = () => {
  const {
    fetchUsers,
    search,
    role,
    page,
  } = useUserStore();

  useEffect(() => {
    fetchUsers();
  }, [
    fetchUsers,
    search,
    role,
    page,
  ]);

  return (
    <div className="space-y-6">
      <UsersHeader />

      <UsersTable />

      <UserModal />

      <ViewUserModal />

      <DeleteUserModal />
    </div>
  );
};

export default Users;
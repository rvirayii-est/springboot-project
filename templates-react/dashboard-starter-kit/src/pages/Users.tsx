import { UserDataTable } from "@/components/UserDataTable";

const Users = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Users</h1>
        <p className="text-muted-foreground">
          Manage all user accounts and their permissions.
        </p>
      </div>
      
      <UserDataTable />
    </div>
  );
};

export default Users;
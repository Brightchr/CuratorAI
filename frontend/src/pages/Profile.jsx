import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user } = useAuth();

  if (!user) {
    return <p className="text-center text-white mt-20">You must be logged in to view your profile.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-24 p-8 bg-zinc-800 text-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6">Your Profile</h2>

      <div className="space-y-4">
        <div>
          <p className="text-zinc-400 text-sm">Full Name</p>
          <p className="text-lg">{user.firstName} {user.lastName}</p>
        </div>

        <div>
          <p className="text-zinc-400 text-sm">Email</p>
          <p className="text-lg">{user.email}</p>
        </div>

        <div>
          <p className="text-zinc-400 text-sm">User ID</p>
          <p className="text-sm break-all">{user.id}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;

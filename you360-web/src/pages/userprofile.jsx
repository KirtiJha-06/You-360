import React, { useEffect, useState } from "react";
import axios from "axios";

function UserProfile() {
  const [user, setUser] = useState({});

  useEffect(() => {
    axios.get("http://localhost:5000/api/users/668b2c5f5f3dfe12345abcde") // replace with your actual _id
      .then((res) => setUser(res.data))
      .catch((err) => console.error("Error fetching user:", err));
  }, []);

  return (
    <div>
      <h2>User Profile</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
    </div>
  );
}

export default UserProfile;

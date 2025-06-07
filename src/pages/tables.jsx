import React, { useState } from "react";

const usersData = [
  {
    id: 1,
    name: "Alishba Rehman",
    email: "alishba@gmail.com",
    role: "Admin",
    status: "Active",
    joined: "2023-03-10",
  },
  {
    id: 2,
    name: "Priya Singh",
    email: "priya123@gmail.com",
    role: "Editor",
    status: "Inactive",
    joined: "2022-11-20",
  },
  {
    id: 3,
    name: "Aryan Kapoor",
    email: "kapoor.aryan@gmail.com",
    role: "Viewer",
    status: "Active",
    joined: "2024-01-15",
  },
  {
    id: 4,
    name: "Ashiya Khan",
    email: "Ashiya67e@gmail.com",
    role: "Viewer",
    status: "Active",
    joined: "2024-01-15",
  },
];

function StatusBadge({ status }) {
  const colorClass =
    status === "Active"
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800";

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-semibold ${colorClass}`}
    >
      {status}
    </span>
  );
}


export default function Tables({ colorTheme = "slate" }) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  const filteredUsers = usersData.filter((user) => {
    const searchLower = search.toLowerCase();
    return (
      user.name.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower) ||
      user.role.toLowerCase().includes(searchLower) ||
      user.status.toLowerCase().includes(searchLower)
    );
  });

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (a[sortKey] < b[sortKey]) return sortOrder === "asc" ? -1 : 1;
    if (a[sortKey] > b[sortKey]) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  function handleSort(key) {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  }

  function sortArrow(key) {
    if (sortKey === key) {
      return sortOrder === "asc" ? " ▲" : " ▼";
    }
    return "";
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">User Management Table</h2>

      <input
        type="text"
        placeholder="Search users..."
        className="mb-4 p-2 border rounded w-full max-w-md"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="overflow-x-auto">
        <table className="min-w-full border rounded text-sm sm:text-base">
          <thead className={`bg-${colorTheme}-400 text-white`}>
            <tr>
              <th
                className="cursor-pointer px-4 py-2 border"
                onClick={() => handleSort("name")}
              >
                Name{sortArrow("name")}
              </th>
              <th
                className="cursor-pointer px-4 py-2 border"
                onClick={() => handleSort("email")}
              >
                Email{sortArrow("email")}
              </th>
              <th
                className="cursor-pointer px-4 py-2 border"
                onClick={() => handleSort("role")}
              >
                Role{sortArrow("role")}
              </th>
              <th
                className="cursor-pointer px-4 py-2 border"
                onClick={() => handleSort("status")}
              >
                Status{sortArrow("status")}
              </th>
              <th
                className="cursor-pointer px-4 py-2 border"
                onClick={() => handleSort("joined")}
              >
                Joined{sortArrow("joined")}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedUsers.length > 0 ? (
              sortedUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-100">
                  <td className="border px-4 py-2">{user.name}</td>
                  <td className="border px-4 py-2">{user.email}</td>
                  <td className="border px-4 py-2">{user.role}</td>
                  <td className="border px-4 py-2">
                    <StatusBadge status={user.status} />
                  </td>
                  <td className="border px-4 py-2">{user.joined}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="border px-4 py-2 text-center text-gray-500"
                >
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

import React from "react";
import { Users, DollarSign, Activity } from "lucide-react";

export default function Dashboard({ colorTheme = "slate" }) {
  const cardClass = `rounded-2xl p-5 shadow-md bg-white border-t-4 border-${colorTheme}-500`;

  const stats = [
    {
      title: "Total Users",
      value: "500",
      icon: <Users className="h-6 w-6 text-gray-600" />,
    },
    {
      title: "Monthly Revenue",
      value: "Rs.23,400",
      icon: <DollarSign className="h-6 w-6 text-gray-600" />,
    },
    {
      title: "Active Sessions",
      value: "50",
      icon: <Activity className="h-6 w-6 text-gray-600" />,
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
        <p className="text-gray-500">Welcome back, Admin!</p>
      </div>

    
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div key={stat.title} className={cardClass}>
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gray-100 rounded-full">{stat.icon}</div>
              <div>
                <p className="text-gray-500 text-sm">{stat.title}</p>
                <p className="text-xl font-semibold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-md overflow-x-auto">
  <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Users</h2>
  
  <table className="min-w-full text-sm">
    <thead className={`bg-${colorTheme}-600 text-white`}>
      <tr>
        <th className="text-left px-4 py-2 whitespace-nowrap">Name</th>
        <th className="text-left px-4 py-2 whitespace-nowrap">Email</th>
        <th className="text-left px-4 py-2 whitespace-nowrap">Status</th>
      </tr>
    </thead>
    <tbody>
      {[
        ["Alishba Rehman", "alishba@gmail.com", "Active"],
        ["Priya Singh", "priya123@gmail.com", "Inactive"],
        ["Aryan Kapoor", "kapoor.aryan@gmail.com", "Active"],
      ].map(([name, email, status]) => (
        <tr key={email} className="border-b hover:bg-gray-50">
          <td className="px-4 py-2 whitespace-nowrap">{name}</td>
          <td className="px-4 py-2 whitespace-nowrap">{email}</td>
          <td className="px-4 py-2 whitespace-nowrap">
            <span
              className={`text-xs font-semibold px-2 py-1 rounded-full ${
                status === "Active"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {status}
            </span>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

    </div>
  );
}


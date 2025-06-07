import {
  LineChart, Line, BarChart, Bar, PieChart, Pie,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell
} from 'recharts';

const data = [
  { name: 'Jan', logged: 400, registered: 240 },
  { name: 'Feb', logged: 300, registered: 139 },
  { name: 'Mar', logged: 200, registered: 980 },
  { name: 'Apr', logged: 278, registered: 390 },
  { name: 'May', logged: 189, registered: 480 },
];

const pieData = [
  { name: 'Admin', value: 400 },
  { name: 'Viewer', value: 300 },
  { name: 'Reader', value: 300 },
];

const COLORS = ['#8884d8', '#82ca9d', '#ffc658'];

export default function Charts() {
  return (
    <div className="space-y-10">
      <h2 className="text-2xl font-semibold">Charts Overview</h2>

      <div>
        <h3 className="text-lg font-medium mb-2">Line Chart</h3>
        <div className="h-64 bg-white rounded-xl shadow p-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="logged" stroke="#8884d8" />
              <Line type="monotone" dataKey="registered" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

   
      <div>
        <h3 className="text-lg font-medium mb-2">Bar Chart</h3>
        <div className="h-64 bg-white rounded-xl shadow p-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="registered" fill="#8884d8" />
              <Bar dataKey="logged" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

     
      <div>
        <h3 className="text-lg font-medium mb-2">Pie Chart</h3>
        <div className="h-64 bg-white rounded-xl shadow p-4 flex justify-center items-center">
          <ResponsiveContainer width="80%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

import express from "express";
import { nanoid } from "nanoid";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const users = [
  {
    id: "u-001",
    name: "Samar Hassan",
    email: "admin@heimonfuel.com",
    password: "Heimon@123",
    role: "System Admin",
    permissions: ["all"],
    department: "Executive",
  },
  {
    id: "u-002",
    name: "Omar Nabil",
    email: "operations@heimonfuel.com",
    password: "Fuel@123",
    role: "Operations Manager",
    permissions: ["operations", "fleet", "supply"],
    department: "Operations",
  },
  {
    id: "u-003",
    name: "Noura Adel",
    email: "finance@heimonfuel.com",
    password: "Finance@123",
    role: "Finance Controller",
    permissions: ["finance", "treasury", "billing"],
    department: "Finance",
  },
];

const sessions = new Map();

const sections = [
  {
    id: "sec-01",
    name: "Operations Command Center",
    description: "Real-time monitoring for fuel distribution, depots, and loading bays.",
    kpis: ["Depot throughput", "Loading turnaround", "Fleet utilization"],
  },
  {
    id: "sec-02",
    name: "Supply Chain & Procurement",
    description: "Vendor management, purchase orders, and inventory replenishment planning.",
    kpis: ["Vendor SLA", "Inventory coverage", "Lead time"],
  },
  {
    id: "sec-03",
    name: "Fleet & Logistics",
    description: "Route planning, driver scheduling, and safety compliance for tanker fleet.",
    kpis: ["OTD", "Fuel loss ratio", "Safety incidents"],
  },
  {
    id: "sec-04",
    name: "Finance & Treasury",
    description: "Cash flow visibility, reconciliations, and multi-site budgeting.",
    kpis: ["DSO", "Cash coverage", "Budget variance"],
  },
  {
    id: "sec-05",
    name: "Commercial & Contracts",
    description: "Contract lifecycle, pricing control, and enterprise customer portfolio.",
    kpis: ["Contract margin", "Retention rate", "Pipeline value"],
  },
  {
    id: "sec-06",
    name: "HR & Access Control",
    description: "Role-based access, onboarding, training records, and compliance.",
    kpis: ["Training completion", "Attrition", "Access review"],
  },
];

const roleMatrix = [
  {
    role: "System Admin",
    scope: "Full platform control",
    privileges: [
      "Master data management",
      "Role-based access policies",
      "Security audit trail",
    ],
  },
  {
    role: "Operations Manager",
    scope: "Operations, fleet, supply chain",
    privileges: [
      "Dispatch optimization",
      "Incident management",
      "Depot capacity planning",
    ],
  },
  {
    role: "Finance Controller",
    scope: "Finance and treasury",
    privileges: [
      "Budget approvals",
      "Invoice governance",
      "Cash forecasting",
    ],
  },
];

function authenticate(token) {
  if (!token) return null;
  const userId = sessions.get(token);
  return users.find((user) => user.id === userId) || null;
}

app.post("/api/login", (req, res) => {
  const { email, password } = req.body || {};
  const user = users.find(
    (candidate) => candidate.email === email && candidate.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = nanoid();
  sessions.set(token, user.id);
  return res.json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      permissions: user.permissions,
      department: user.department,
    },
  });
});

app.get("/api/me", (req, res) => {
  const token = req.headers.authorization?.replace("Bearer ", "");
  const user = authenticate(token);

  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  return res.json({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    permissions: user.permissions,
    department: user.department,
  });
});

app.get("/api/sections", (req, res) => {
  const token = req.headers.authorization?.replace("Bearer ", "");
  const user = authenticate(token);

  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  return res.json({ sections });
});

app.get("/api/roles", (req, res) => {
  const token = req.headers.authorization?.replace("Bearer ", "");
  const user = authenticate(token);

  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  return res.json({ roles: roleMatrix });
});

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Heimon ERP server running on http://localhost:${port}`);
});

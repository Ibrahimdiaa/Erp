const sectionsGrid = document.getElementById("sectionsGrid");
const rolesGrid = document.getElementById("rolesGrid");
const loginModal = document.getElementById("loginModal");
const demoModal = document.getElementById("demoModal");
const openLogin = document.getElementById("openLogin");
const closeLogin = document.getElementById("closeLogin");
const openDemo = document.getElementById("openDemo");
const closeDemo = document.getElementById("closeDemo");
const loginForm = document.getElementById("loginForm");
const demoUsers = document.getElementById("demoUsers");
const demoContent = document.getElementById("demoContent");

const demoAccounts = [
  {
    name: "Samar Hassan",
    email: "admin@heimonfuel.com",
    password: "Heimon@123",
    role: "System Admin",
  },
  {
    name: "Omar Nabil",
    email: "operations@heimonfuel.com",
    password: "Fuel@123",
    role: "Operations Manager",
  },
  {
    name: "Noura Adel",
    email: "finance@heimonfuel.com",
    password: "Finance@123",
    role: "Finance Controller",
  },
];

function toggleModal(modal, show) {
  modal.classList.toggle("active", show);
  modal.setAttribute("aria-hidden", String(!show));
}

function renderSections(sections) {
  sectionsGrid.innerHTML = "";
  sections.forEach((section) => {
    const card = document.createElement("div");
    card.className = "section-card";
    card.innerHTML = `
      <h3>${section.name}</h3>
      <p>${section.description}</p>
      <ul>
        ${section.kpis.map((kpi) => `<li>${kpi}</li>`).join("")}
      </ul>
    `;
    sectionsGrid.appendChild(card);
  });
}

function renderRoles(roles) {
  rolesGrid.innerHTML = "";
  roles.forEach((role) => {
    const card = document.createElement("div");
    card.className = "role-card";
    card.innerHTML = `
      <h3>${role.role}</h3>
      <p>${role.scope}</p>
      <ul>
        ${role.privileges.map((priv) => `<li>${priv}</li>`).join("")}
      </ul>
    `;
    rolesGrid.appendChild(card);
  });
}

function renderDemoUsers() {
  demoUsers.innerHTML = demoAccounts
    .map(
      (account) => `
      <div class="demo-user" data-email="${account.email}" data-password="${account.password}">
        <strong>${account.name}</strong>
        <span>${account.role}</span>
        <small>${account.email}</small>
      </div>
    `
    )
    .join("");
}

async function fetchWithAuth(url, token) {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Request failed");
  }

  return response.json();
}

async function runDemo(account) {
  demoContent.innerHTML = "<p>جارٍ تحميل بيانات العرض...</p>";
  try {
    const loginResponse = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: account.email,
        password: account.password,
      }),
    });

    if (!loginResponse.ok) {
      throw new Error("Login failed");
    }

    const { token, user } = await loginResponse.json();
    const [sections, roles] = await Promise.all([
      fetchWithAuth("/api/sections", token),
      fetchWithAuth("/api/roles", token),
    ]);

    demoContent.innerHTML = `
      <div class="banner">مرحباً ${user.name} • دورك الحالي: ${user.role}</div>
      <div>
        <h3>أولويات اليوم</h3>
        <ul>
          <li>مراجعة ${sections.sections[0].name}</li>
          <li>متابعة ${sections.sections[2].name}</li>
          <li>اعتماد تقرير ${roles.roles[0].role}</li>
        </ul>
      </div>
      <div>
        <h3>الإدارات المرتبطة</h3>
        <p>${sections.sections.map((section) => section.name).join(" • ")}</p>
      </div>
    `;
  } catch (error) {
    demoContent.innerHTML =
      "<p>تعذر تحميل البيانات. تحقق من تشغيل الخادم.</p>";
  }
}

openLogin.addEventListener("click", () => toggleModal(loginModal, true));
closeLogin.addEventListener("click", () => toggleModal(loginModal, false));
openDemo.addEventListener("click", () => toggleModal(demoModal, true));
closeDemo.addEventListener("click", () => toggleModal(demoModal, false));

loginModal.addEventListener("click", (event) => {
  if (event.target === loginModal) toggleModal(loginModal, false);
});

demoModal.addEventListener("click", (event) => {
  if (event.target === demoModal) toggleModal(demoModal, false);
});

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(loginForm);
  const payload = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  try {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Invalid credentials");
    }

    const { user } = await response.json();
    demoContent.innerHTML = `
      <div class="banner">تم تسجيل الدخول بنجاح</div>
      <p>مرحباً ${user.name}. صلاحيتك الحالية: ${user.role}.</p>
      <p>يمكنك فتح العرض التجريبي لمشاهدة البيانات التفصيلية.</p>
    `;
    toggleModal(loginModal, false);
    toggleModal(demoModal, true);
  } catch (error) {
    alert("بيانات الدخول غير صحيحة. جرب حساباً تجريبياً.");
  }
});

demoUsers.addEventListener("click", (event) => {
  const target = event.target.closest(".demo-user");
  if (!target) return;
  const email = target.dataset.email;
  const password = target.dataset.password;
  loginForm.email.value = email;
  loginForm.password.value = password;
});

renderDemoUsers();

fetch("/api/health")
  .then(() => Promise.all([fetch("/api/sections"), fetch("/api/roles")]))
  .then(async ([sectionsResponse, rolesResponse]) => {
    if (!sectionsResponse.ok || !rolesResponse.ok) {
      throw new Error("Requires auth");
    }
  })
  .catch(() => {
    renderSections([
      {
        name: "تشغيل الأسطول",
        description: "إدارة التحميل، التوزيع، وجدولة الشحنات.",
        kpis: ["الجاهزية", "زمن التحميل", "تغطية المسارات"],
      },
      {
        name: "الإمداد والمخزون",
        description: "مراقبة المخزون الاستراتيجي والتوريد.",
        kpis: ["معدل الامداد", "المخزون الآمن", "جودة المورد"],
      },
      {
        name: "المالية",
        description: "متابعة التحصيل، السيولة، والتقارير اليومية.",
        kpis: ["السيولة", "المديونية", "الربحية"],
      },
    ]);
    renderRoles([
      {
        role: "مدير النظام",
        scope: "إدارة شاملة",
        privileges: ["تهيئة النظام", "صلاحيات كاملة", "تقارير أمنية"],
      },
      {
        role: "مدير العمليات",
        scope: "تشغيل الأسطول والإمداد",
        privileges: ["تتبع الشحنات", "إدارة الموردين", "تنبيهات المخاطر"],
      },
      {
        role: "مدير المالية",
        scope: "المالية والخزانة",
        privileges: ["التحصيل", "إغلاق يومي", "تحليل الربحية"],
      },
    ]);
  });

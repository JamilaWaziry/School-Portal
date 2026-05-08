// dark mode
const themeBtn = document.getElementById("themeToggle");
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}
themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
});

//burger menu
const hamburger = document.getElementById("hamburger");
const sidebar = document.getElementById("sidebar");

hamburger.addEventListener("click", () => {
  sidebar.classList.toggle("active");
  hamburger.classList.toggle("active");
});

// Enrollment
const enrollForm = document.getElementById("enrollForm");
if (enrollForm) {
  enrollForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const grade = document.getElementById("grade").value;
    const number = document.getElementById("number").value;
    const email = document.getElementById("email").value;

    if (!name || !age || !grade || !number || !email) {
      alert("Please fill all fields");
      return;
    }

    const student = { name, age, grade, number, email };
    localStorage.setItem("student", JSON.stringify(student));

    document.getElementById("message").textContent =
      `Welcome to the Bright Future School ${name}!`;

    document.getElementById("studentSummary").innerHTML = `
      <div class="card">
        <p>Name: ${name}</p>
        <p>Age: ${age}</p>
        <p>Grade: ${grade}</p>
      </div>
    `;

    enrollForm.reset();
  });
}

// profile
if (document.getElementById("pName")) {
  const student = JSON.parse(localStorage.getItem("student"));

  if (student) {
    document.getElementById("pName").textContent = student.name;
    document.getElementById("pAge").textContent = student.age;
    document.getElementById("pGrade").textContent = student.grade;
  }

  const contactInfo = document.getElementById("contactInfo");

  document.getElementById("showEmail").addEventListener("click", () => {
    contactInfo.textContent = student
      ? `Email: ${student.email}`
      : "No student data";
  });

  document.getElementById("showPhone").addEventListener("click", () => {
    contactInfo.textContent = student
      ? `Phone: ${student.number}`
      : "No student data";
  });

  document.getElementById("hideInfo").addEventListener("click", () => {
    contactInfo.textContent = "";
  });

  document.getElementById("updateStatus").addEventListener("click", () => {
    const newStatus = document.getElementById("newStatus").value;
    if (newStatus) {
      document.getElementById("status").textContent = newStatus;
    }
  });
}

// coursed
const courseList = document.getElementById("courseList");

if (courseList) {
  let courses = JSON.parse(localStorage.getItem("courses")) || [
    { name: "Math", instructor: "Mr A", grade: "10", desc: "Algebra basics" },
    { name: "Science", instructor: "Ms B", grade: "11", desc: "Physics intro" },
  ];

  function renderCourses(list = courses) {
    courseList.innerHTML = "";

    list.forEach((course, index) => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <h3>${course.name}</h3>
        <p>${course.instructor}</p>
        <button data-index="${index}">View Details</button>
      `;

      courseList.appendChild(card);
    });
  }

  renderCourses();

  // showing course  detial
  courseList.addEventListener("click", function (e) {
    if (e.target.tagName === "BUTTON") {
      const index = e.target.dataset.index;
      const course = courses[index];

      document.getElementById("courseDetails").innerHTML = `
        <div class="card">
          <h3>${course.name}</h3>
          <p>${course.desc}</p>
          <p>Grade: ${course.grade}</p>
        </div>
      `;
    }
  });

  // add course
  const courseForm = document.getElementById("courseForm");
  if (courseForm) {
    courseForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("cName").value;
      const instructor = document.getElementById("cInstructor").value;
      const grade = document.getElementById("cGrade").value;
      const desc = document.getElementById("cDesc").value;

      if (!name || !instructor || !grade || !desc) {
        alert("Fill all fields");
        return;
      }

      courses.push({ name, instructor, grade, desc });
      localStorage.setItem("courses", JSON.stringify(courses));

      renderCourses();
      courseForm.reset();
    });
  }

  // search
  const searchInput = document.getElementById("search");
  if (searchInput) {
    searchInput.addEventListener("input", function () {
      const value = this.value.toLowerCase();
      const filtered = courses.filter((c) =>
        c.name.toLowerCase().includes(value),
      );
      renderCourses(filtered);
    });
  }

  // filter
  const filterButtons = document.querySelectorAll(".filters button");
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const grade = btn.dataset.grade;

      if (grade === "all") {
        renderCourses();
      } else {
        const filtered = courses.filter((c) => c.grade === grade);
        renderCourses(filtered);
      }
    });
  });
}
//contact page
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("conName").value;
    const email = document.getElementById("conEmail").value;
    const msg = document.getElementById("conMsg").value;

    if (!name || !email || !msg) {
      alert("Please fill all fields");
      return;
    }

    alert("Message sent successfully!");
    contactForm.reset();
  });
}

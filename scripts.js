// ***********************
// GLOBAL VARIABLES
// =======================
let courses = [];
let filteredCourses = [];
let currentPage = 1;
const itemsPerPage = 3;

// ***********************
// FETCH COURSES FROM JSON
// =======================
async function loadCourses() {
    try {
        const response = await fetch("courses.json"); // Fetching JSON file
        courses = await response.json();
        filteredCourses = [...courses];

        displayCourses();
        populateCourseDropdown();

    } catch (error) {
        console.error("Error loading courses:", error);
    }
}
loadCourses();

// ***********************
// DISPLAY COURSES
// =======================
function displayCourses() {
    const list = document.getElementById("courseList");
    list.innerHTML = "";

    // Pagination calculation
    let start = (currentPage - 1) * itemsPerPage;
    let end = start + itemsPerPage;
    let pageItems = filteredCourses.slice(start, end);

    // Display each course
    pageItems.forEach(course => {
        list.innerHTML += `
            <div class="card">
                <h3>${course.title}</h3>
                <p><strong>Instructor:</strong> ${course.instructor}</p>
                <p><strong>Duration:</strong> ${course.duration}</p>
                <p><strong>Category:</strong> ${course.category}</p>
                <p><strong>Rating:</strong> ⭐ ${course.rating}</p>
                <p><strong>Price:</strong> $${course.price}</p>
                <p><strong>Enrolled:</strong> ${course.enrolled} students</p>
            </div>
        `;
    });

    renderPagination();
}
// ***********************
// FILTER + SORT FUNCTION
// =======================
function applyFilters() {
    const category = document.getElementById("categoryFilter").value;
    const sortOption = document.getElementById("sortOptions").value;

    // FILTERING
    filteredCourses = courses.filter(course =>
        category === "" || course.category === category
    );

    // SORTING
    if (sortOption === "rating") {
        filteredCourses.sort((a, b) => b.rating - a.rating);
    } else if (sortOption === "price") {
        filteredCourses.sort((a, b) => a.price - b.price);
    }

    currentPage = 1; 
    displayCourses();
}

// ***********************
// PAGINATION HANDLING
// =======================
function renderPagination() {
    const pag = document.getElementById("pagination");
    pag.innerHTML = "";

    let totalPages = Math.ceil(filteredCourses.length / itemsPerPage);

    for (let i = 1; i <= totalPages; i++) {
        pag.innerHTML += `<button onclick="changePage(${i})">${i}</button>`;
    }
}

function changePage(page) {
    currentPage = page;
    displayCourses();
}

// ***********************
// FORM VALIDATION
// =======================
document.getElementById("signupForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let course = document.getElementById("courseSelect").value;
    let message = document.getElementById("formMessage");

    if (name === "" || email === "" || course === "") {
        message.textContent = "❌ Please fill out all fields.";
        message.style.color = "red";
        return;
    }

    message.textContent = "✅ Registered successfully!";
    message.style.color = "green";
});

// ***********************
// FILL THE DROPDOWN
// =======================
function populateCourseDropdown() {
    const dropdown = document.getElementById("courseSelect");

    courses.forEach(c => {
        dropdown.innerHTML += `
            <option value="${c.courseId}">${c.title}</option>
        `;
    });
}

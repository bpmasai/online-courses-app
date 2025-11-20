// =========================
// Global Variables
// =========================
let courses = [];           
let filteredCourses = [];   

// =========================
// Fetch courses.json and initialize
// =========================
fetch("courses.json")
    .then(response => response.json())
    .then(data => {
        courses = data;
        filteredCourses = [...courses];
        populateCategoryDropdown(courses);
        displayCourses(filteredCourses);
    })
    .catch(err => console.error("Error loading courses.json:", err));

// =========================
// Populate Category Dropdown dynamically
// =========================
function populateCategoryDropdown(data) {
    const categorySet = new Set();
    data.forEach(course => categorySet.add(course.category));

    const categoryDropdown = document.getElementById("categoryFilter");
    categoryDropdown.innerHTML = '<option value="">All Categories</option>';

    categorySet.forEach(cat => {
        const option = document.createElement("option");
        option.value = cat;
        option.textContent = cat;
        categoryDropdown.appendChild(option);
    });
}

// =========================
// Display courses on the page
// =========================
function displayCourses(courseArray) {
    const container = document.getElementById("courseList");
    container.innerHTML = "";

    if (courseArray.length === 0) {
        container.innerHTML = "<p style='text-align:center;'>No courses found.</p>";
        return;
    }

    courseArray.forEach(course => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <h3>${course.title}</h3>
            <p><strong>Instructor:</strong> ${course.instructor}</p>
            <p><strong>Category:</strong> ${course.category}</p>
            <p><strong>Duration:</strong> ${course.duration}</p>
            <p><strong>Rating:</strong> ${course.rating}</p>
            <p><strong>Price:</strong> ${course.price}</p>
            <p><strong>Enrolled:</strong> ${course.enrolled}</p>
        `;
        container.appendChild(card);
    });
}

// =========================
// Apply Filters and Sorting
// =========================
function applyFilters() {
    const selectedCategory = document.getElementById("categoryFilter").value;
    const sortBy = document.getElementById("sortOptions").value;

    let tempCourses = [...courses];

    // Filter by category
    if (selectedCategory) {
        tempCourses = tempCourses.filter(c => c.category === selectedCategory);
    }

    // Sort by rating or price
    if (sortBy === "rating") {
        tempCourses.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "price") {
        tempCourses.sort((a, b) => parseFloat(a.price.slice(1)) - parseFloat(b.price.slice(1)));
    }

    filteredCourses = tempCourses;
    displayCourses(filteredCourses);
}


document.addEventListener("DOMContentLoaded", function () {
    updateProgressBar(); // Initial progress bar update
});

// Function to update the progress bar
function updateProgressBar() {
    let totalFields = document.querySelectorAll("#resume-form input, #resume-form textarea, #resume-form select").length;
    let filledFields = Array.from(document.querySelectorAll("#resume-form input, #resume-form textarea, #resume-form select"))
                            .filter(input => input.value.trim() !== "").length;
    
    let progressPercentage = (filledFields / totalFields) * 100;
    document.getElementById("progress-bar").style.width = progressPercentage + "%";
    document.getElementById("progress-text").innerText = Math.round(progressPercentage) + "%";
}

// Function to generate the resume preview
function generateResume() {
    document.getElementById("preview-name").innerText = document.getElementById("name").value;
    document.getElementById("preview-email").innerText = document.getElementById("email").value;
    document.getElementById("preview-phone").innerText = document.getElementById("phone").value;
    document.getElementById("preview-summary").innerText = document.getElementById("summary").value;
    document.getElementById("preview-skills").innerText = document.getElementById("skills").value;
    document.getElementById("preview-interests").innerText = document.getElementById("interests").value;

    updateEducation();
    updateList("experience-container", "preview-experience");
    updateList("projects-container", "preview-projects");
    updateProgressBar(); // Update progress bar
}

// Function to update education preview
function updateEducation() {
    let container = document.getElementById("education-container");
    let preview = document.getElementById("preview-education");
    preview.innerHTML = "";
    
    let entries = container.getElementsByClassName("education-entry");
    for (let entry of entries) {
        let degree = entry.querySelector(".degree").value;
        let institution = entry.querySelector(".institution").value;
        let year = entry.querySelector(".year").value;
        let percentage = entry.querySelector(".percentage").value;

        let li = document.createElement("li");
        li.innerHTML = `<strong>${degree}</strong> - ${institution}, ${year} (${percentage}%)`;
        preview.appendChild(li);
    }
}

// Function to update lists for experience, projects, etc.
function updateList(containerId, previewId) {
    let container = document.getElementById(containerId);
    let preview = document.getElementById(previewId);
    preview.innerHTML = "";
    
    let items = container.getElementsByTagName("input");
    for (let item of items) {
        if (item.value.trim() !== "") {
            let li = document.createElement("li");
            li.innerText = item.value;
            preview.appendChild(li);
        }
    }
}

// Function to add new education entry
function addEducation() {
    let container = document.getElementById("education-container");
    let div = document.createElement("div");
    div.classList.add("education-entry");

    div.innerHTML = `
        <select class="degree" onchange="updateProgressBar()">
            <option value="Secondary School">Secondary School</option>
            <option value="Intermediate">Intermediate</option>
            <option value="B.Tech">B.Tech</option>
            <option value="M.Tech">M.Tech</option>
            <option value="B.Sc">B.Sc</option>
            <option value="M.Sc">M.Sc</option>
            <option value="BCA">BCA</option>
            <option value="MCA">MCA</option>
        </select>
        <input type="text" class="institution" placeholder="Institution Name" oninput="updateProgressBar()">
        <input type="number" class="year" placeholder="Year of Completion" oninput="updateProgressBar()">
        <input type="number" class="percentage" placeholder="Percentage (%)" oninput="updateProgressBar()">
    `;

    let removeBtn = document.createElement("button");
    removeBtn.innerText = "Remove";
    removeBtn.onclick = function () {
        container.removeChild(div);
        generateResume();
        updateProgressBar(); // Update progress when removing
    };
    
    div.appendChild(removeBtn);
    container.appendChild(div);
    updateProgressBar(); // Update progress after adding
}

// Function to add experience or project dynamically
function addItem(containerId, placeholder) {
    let container = document.getElementById(containerId);
    let div = document.createElement("div");
    div.classList.add("entry");
    div.innerHTML = `<input type="text" placeholder="Enter ${placeholder}" oninput="updateProgressBar()">`;

    let removeBtn = document.createElement("button");
    removeBtn.innerText = "Remove";
    removeBtn.onclick = function () {
        container.removeChild(div);
        generateResume();
        updateProgressBar();
    };

    div.appendChild(removeBtn);
    container.appendChild(div);
    updateProgressBar();
}

// Add experience and project functions
function addExperience() {
    addItem("experience-container", "Experience");
}

function addProject() {
    addItem("projects-container", "Project");
}

// Function to download resume (Placeholder)
function downloadResume() {
    alert("Download feature will be added soon!");
}

// Attach event listeners for real-time progress bar update
document.querySelectorAll("#resume-form input, #resume-form textarea, #resume-form select").forEach(input => {
    input.addEventListener("input", updateProgressBar);
});

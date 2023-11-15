const data = []

function submitData(event) {
    event.preventDefault()

    let nama = document
        .getElementById("project_name")
        .value
    let start_date = document
        .getElementById("start_date")
        .value
    let end_date = document
        .getElementById("end_date")
        .value
    let description = document
        .getElementById("description")
        .value
    let technologies = [];
    document
        .querySelectorAll('[name="technologies"]:checked')
        .forEach((checkbox) => {
            technologies.push(checkbox.value);
        });
    let image = document
        .getElementById("input-blog-image")
        .files

    image = URL.createObjectURL(image[0])
    let project_duration = countProjectDuration(); 
    
    const postDate = new Date(); // Record the current date and time when submitting the form

    const obj = {
        nama,
        start_date,
        end_date,
        description,
        technologies,
        image,
        author: "JODI ADRIAN",
        project_duration,
        postDate
    }

    data.push(obj)
    renderBlog()
}

function renderBlog() {
    document
        .getElementById("contents")
        .innerHTML = ""

    for (let i = 0; i < data.length; i++) {
        const timeAgo = getTimeAgo(data[i].postDate);
 
        document
            .getElementById("contents")
            .innerHTML += `<div class="project-card">
            <img src="${data[i].image}" alt="Project Image">
            <div class="project-details">
                <h2>${data[i].nama}</h2>
                <p>
                Posted ${timeAgo} ago | Author: ${data[i].author}
                </p>
                <p>
                Durasi: ${data[i].project_duration}
                </p>
                <p>
                Technologies: ${data[i].technologies}
                </p>
                <p>
                Deskripsi:
                ${data[i].description} 
                </p>
                <div class="action-buttons">
                    <button class="edit-btn">Edit</button>
                    <button class="delete-btn">Delete</button>
                </div>
            </div>
        </div>`
    }
}

function countProjectDuration() {
    // get value from input
	let start_date = document.getElementById("start_date").value;
	let end_date = document.getElementById("end_date").value;

    // convert string to date
	start_date = new Date(start_date);
	end_date = new Date(end_date);

	// Calculate the project duration in days by subtracting the start_date from the end_date.
    let project_duration = end_date - start_date;

    // Convert the duration from milliseconds to days by dividing it by the number of milliseconds in a day.
    project_duration = project_duration / (1000 * 60 * 60 * 24);

    // Round the calculated duration to the nearest whole number of days.
    project_duration = Math.round(project_duration);

    // Calculate the number of months in the project duration by dividing it by an approximate number of days in a month (30 days).
    month = Math.floor(project_duration / 30);

    // Calculate the remaining days after calculating the number of months.
    day = project_duration % 30;


    // return string project duration (month and day)
	return `${month} Bulan ${day} Hari`; // 1 Bulan 2 Hari
}

function getTimeAgo(postDate) {
    const currentDate = new Date();
    const seconds = Math.floor((currentDate - postDate) / 1000);

    let interval = Math.floor(seconds / 31536000);

    if (interval >= 1) {
        return interval + " years";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
        return interval + " months";
    }
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
        return interval + " days";
    }
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
        return interval + " hours";
    }
    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
        return interval + " minutes";
    }
    return Math.floor(seconds) + " seconds";
}

// Update the display every second
setInterval(renderBlog, 1000);
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

    const obj = {
        nama,
        start_date,
        end_date,
        description,
        technologies,
        image,
        author: "jODI ADRIAN"
    }

    data.push(obj)
    renderBlog()
}

function renderBlog() {
    document
        .getElementById("contents")
        .innerHTML = ""

    for (let i = 0; i < data.length; i++) {
        document
            .getElementById("contents")
            .innerHTML += `<div class="div-card">
    <img src="${data[i].image}" alt="" class="img-card"/>
    <h1 class="h1-card">
    ${data[i].nama}
    </h1>
    <p class="p-card">
    ${data[i].start_date} - ${data[i].end_date}</p>

    <table class="table-card">
        <tr>
            <th class="th-card">Deskripsi</th>
            <th class="th-card">Technology</th>
        </tr>
        <tr>
            <td class="td-card">
            ${data[i].description}</td>
            <td class="td-card">${data[i].technologies}</td>
        </tr>
    </table>
</div>`
    }
}
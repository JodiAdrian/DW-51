const dataTestiomonial = [
    {
        name: "Denada",
        comment: "Lain kali jangan di ulang ya",
        rating: 2,
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=" +
                "format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fH" +
                "x8fA%3D%3D"
    }, {
        name: "Clarence Darrow",
        comment: "You can only protect your liberties in this world by protecting the other man'" +
                "s freedom. You can only be free if I am free.",
        rating: 4,
        image: "https://images.unsplash.com/photo-1460194436988-671f763436b7?q=80&w=2070&auto=" +
                "format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fH" +
                "x8fA%3D%3D"
    }, {
        name: "Mahatma Gandhi",
        comment: "Learn as if you will live forever, live like you will die tomorrow.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1630419320857-7087d18ade31?q=80&w=2070&auto=" +
                "format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fH" +
                "x8fA%3D%3D"
    }, {
        name: "Herman Melville",
        comment: "btw its okay It is better to fail in originality than to succeed in imitation.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1516122402193-39636de115ff?q=80&w=1974&auto=" +
                "format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fH" +
                "x8fA%3D%3D"
    }
]

function showTestimonial() {
    let testimonialForHtml = ""

    dataTestiomonial.forEach(item => {
        testimonialForHtml += `
        <div class="testimonial">
          <img src=${item.image} class="profile-testimonial" />
          <p class="quote">${item.comment}</p>
          <p class="author">- ${item.name}</p>
        </div>
      `
    })

    document
        .getElementById("testimonials")
        .innerHTML = testimonialForHtml
}
showTestimonial()

// function for filtering
function filterTestimonials(rating) {
    let testimonialForHtml = ""

    const dataFiltered = dataTestiomonial.filter(data => data.rating === rating)
    console.log(dataFiltered);

    if (dataFiltered.length === 0) {
        testimonialForHtml = `<h3>Data not found !</h3>`
    } else {
        dataFiltered.forEach(item => {
            testimonialForHtml += `
        <div class="testimonial">
          <img src=${item.image} class="profile-testimonial" />
          <p class="quote">${item.comment}</p>
          <p class="author">- ${item.name}</p>
        </div>
      `
        })
    }

    document
        .getElementById("testimonials")
        .innerHTML = testimonialForHtml
}
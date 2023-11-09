function getData() {
    // data collection
    const nama = document.getElementById("nama").valeue
    const email = document.getElementById("email").valeue
    const phone = document.getElementById("phone").valeue
    const pilih = document.getElementById("pilih").valeue
    const pesan = document.getElementById("pesan").valeue

    //data validation
    if(nama == "") {
        return alert("Nama harus di isi")
    } else if(email == "") {
        return alert("Email harus di isi")
    } else if(phone == "") {
        return alert("Nomor harus di isi")
    } else if(pilih == "") {
        return alert("Pilihan harus di isi")
    } else if(pesan == "") {
        return alert("Pesan harus di isi")
    }
    
    // execute to email
    const emailReceiver = "adrianherebro@gmail.com"
    let a = document. createElement("a")
    a.href = `mailto:${emailReceiver}?pilih=${pilih}&body= Halo nama saya ${nama} , bisakah anda menghubungi saya ${phone} untuk membahas project ${pesan}`
    a.click()

    let data = {
        nama,
        email,
        phone,
        pilih,
        pesan
    }

    console.log(data)
}
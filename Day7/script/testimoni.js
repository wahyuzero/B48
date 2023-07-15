// // class✅
// // object ✅
// // inheritance ✅
// // polymorphism ✅
// // abstraction ✅
// // encapsulation ✅

// class Testimonial {
//     #quote = ""
//     #image = ""

//     constructor(quote, image) {
//         this.#quote = quote
//         this.#image = image
//     }

//     get quote() {
//         return this.#quote
//     }

//     get image() {
//         return this.#image
//     }

//     get user() {
//         throw new Error('there is must be user to make testimonials')
//     }

//     get testimonialHTML() {
//         return `<div class="testimonial">
//             <img src="${this.image}" class="profile-testimonial" />
//             <p class="quote">"${this.quote}"</p>
//             <p class="author">- ${this.user}</p>
//         </div>
//         `
//     }
// }

// class UserTestimonial extends Testimonial {
//     #user = ""

//     constructor(user, quote, image) {
//         super(quote, image)
//         this.#user = user
//     }

//     get user() {
//         return "user : " + this.#user
//     }
// }

// class CompanyTestimonial extends Testimonial {
//     #company = ""

//     constructor(company, quote, image) {
//         super(quote, image)
//         this.#company = company
//     }

//     get user() {
//         return "company : " + this.#company
//     }
// }

// const testimonial1 = new UserTestimonial("Surya Elidanto", "GG gaming", "https://images.unsplash.com/photo-1580477667995-2b94f01c9516?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80")

// const testimonial2 = new UserTestimonial("Guswandi", "Keren kamu bang", "https://images.unsplash.com/photo-1541562232579-512a21360020?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80")

// const testimonial3 = new CompanyTestimonial("Dumbways", "Apasih ga jelas", "https://images.unsplash.com/photo-1578632767115-351597cf2477?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80")

// // const testimonial4 = new Testimonial("Apasih ga jelas", "https://images.unsplash.com/photo-1578632767115-351597cf2477?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80")

// // console.log(testimonial1, testimonial2, testimonial3)

// let testimonialData = [testimonial1, testimonial2, testimonial3]

// let testimonialHTML = ""

// for (let i = 0; i < testimonialData.length; i++) {
//     testimonialHTML += testimonialData[i].testimonialHTML
// }

// document.getElementById("testimonials").innerHTML = testimonialHTML




class Testimoni {
    #quote = ""
    #img = ""
    constructor(quote, img) {
        this.#quote = quote
        this.#img = img
    }
    get quote() {
        return this.#quote
    }
    get img() {
        return this.#img
    }
    get usr() {
        throw new Error ('You must have user for write testimonial')
    }
    get testimoniHTML() {
        return `<div class="testimonial">
            <img src="${this.img}" class="profile-testimonial" />
            <p class="quote">"${this.quote}"</p>
            <p class="author">- ${this.usr}</p>
        </div>
        `
    }
}
class UserTestimoni extends Testimoni {
    #usr = ""

    constructor(usr, quote, img) {
        super(quote, img)
        this.#usr = usr
    }

    get usr() {
        return "Username: " + this.#usr
    }
}

class CompanyTestimoni extends Testimoni {
    #company = ""

    constructor(company, quote, img) {
        super(quote, img)
        this.#company = company
    }

    get usr() {
        return "Company Name: " + this.#company
    }
}
const testimoni1 = new UserTestimoni("Mas Eoln", "Mantap sir ngga kaya Threads", "https://upload.wikimedia.org/wikipedia/commons/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg")
const testimoni2 = new UserTestimoni("Mas Zuck", "Keren sekali gan, btw mas eoln gelut yok?", "https://upload.wikimedia.org/wikipedia/commons/1/18/Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg")
const testimoni3 = new UserTestimoni("Jefry Besos", "Lumayan menarik", "https://upload.wikimedia.org/wikipedia/commons/9/91/Jeff_Bezos%27_iconic_laugh_crop.jpg")
const testimoni4 = new UserTestimoni("Satosi Motonaka", "Mungkin bisa ditambah fitur lain lagi", "https://upload.wikimedia.org/wikipedia/commons/7/77/Satoshi_Nakamoto.jpg")
const testimoni5 = new CompanyTestimoni("Mikroskop", "Nggak rekomen, kelihatan masih pemula", "https://speckyboy.com/wp-content/uploads/2011/11/logoparody_10.jpg")
const testimoni6 = new CompanyTestimoni("Morgan JP", "Kelihatannya anda kekurangan investor", "https://upload.wikimedia.org/wikipedia/commons/4/41/JohnPierpontMorgan.png")

// console.log(testimoni1, testimoni4)
let testimoniData = [testimoni1, testimoni2, testimoni3, testimoni4, testimoni5, testimoni6];

let testimoniContainer = document.getElementById("testimoni");
for (let i = 0; i < testimoniData.length; i++) {
    let tempDiv = document.createElement('div');
    tempDiv.innerHTML = testimoniData[i].testimoniHTML.trim();
    testimoniContainer.appendChild(tempDiv.firstChild);
}


// static method
function handelactive(e) {
    e.target.parentElement.querySelectorAll(".active").forEach(function(ele) {
        ele.classList.remove("active")
    })
    e.target.classList.add("active")
}

// start slider

let background = document.querySelector(".slider .background")
let imgArray = ["01.jpg", "02.jpg","03.jpg","04.jpg","05.jpg","06.jpg","07.jpg","08.jpg","09.jpg","010.jpg",]
let Nimg = 1
let chevrons = document.querySelectorAll(".slider .chevron i")

chevrons.forEach(function (chevron) {
    chevron.addEventListener("click", function (chev) {
        if (chev.target.dataset.slid === "right") {
            background.style.backgroundImage = `url("../images/${imgArray[Nimg++]}")`
            if (Nimg === 10) {
                Nimg = 0
            }
        } else if (chev.target.dataset.slid === "left") {
            background.style.backgroundImage = `url("../images/${imgArray[Nimg-- - 1]}")`
            if (Nimg === 0) {
            Nimg = 10
            }
        }
    })
})


// end slider

// start setting box
let togleSetting = document.querySelector(".togle-setting")

togleSetting.onclick = function () {
    togleSetting.parentElement.classList.toggle("open")
    togleSetting.firstElementChild.classList.toggle("fa-spin")
} 

// start random background option
let backgroundOption = true
let nextimg;
let bgLocalStorage = window.localStorage.getItem("bgstorage")
let randomOption = document.querySelectorAll(".random-background span")
randomOption.forEach(function (spans) {
    spans.addEventListener("click", function (e) {
        handelactive(e)
        if (e.target.dataset.option === "yes") {
            localStorage.setItem("bgstorage", "true")
            backgroundOption = true
            randomize()
        } else {
            localStorage.setItem("bgstorage", "false")
            backgroundOption = false
            clearInterval(nextimg)
        }
    })
})

if (bgLocalStorage !== null) {
    if (bgLocalStorage === "true") {
        backgroundOption = true
    } else {
        backgroundOption = false
    }
    document.querySelectorAll(".random-background span").forEach((e) => {
        e.classList.remove("active")
    })
    if (bgLocalStorage === "true") {
        document.querySelector(".random-background .yes").classList.add("active")
    } else {
        document.querySelector(".random-background .no").classList.add("active")
    }
}


function randomize() {
    if (backgroundOption === true ) {
        nextimg = setInterval(function() {
            background.style.backgroundImage = `url("../images/${imgArray[Nimg++]}")`
            if (Nimg === 10) {
                Nimg = 0
            }
        }, 10000)
    }
}
randomize()

// end random background option

// start colors option 
let colorStorage = localStorage.getItem("color")
let colors = document.querySelectorAll(".color-option span")
colors.forEach((color) => {
    color.addEventListener("click", (e) => {
        handelactive(e)
        document.styleSheets[0].rules[0].style.setProperty("--main-color", e.target.dataset.color)
        localStorage.setItem("color", e.target.dataset.color)
    })
})

if (colorStorage !== null) {
    document.styleSheets[0].rules[0].style.setProperty("--main-color", colorStorage)
    document.querySelectorAll(".color-option span").forEach(co => {
        co.classList.remove("active")
        if (colorStorage === co.dataset.color) {
            co.classList.add("active")
        }
    })
}


// end colors option 

// end setting box


//start setting media query 

let menu = document.querySelector(".nav .menu i")
menu.onclick = function () {
    document.querySelector(".nav ul").classList.toggle("open")
}

//end setting media query

// start our skills 

let skillRange = document.querySelectorAll(".rang")
window.onscroll = function () {
    if (window.scrollY >= 850) {
        skillRange.forEach(function (skill) {
            skill.style.width = skill.dataset.range
        })
    }
}

// end our skills

// start gallery 

let gallery = document.querySelectorAll(".gallery img")

gallery.forEach(function (img,index) {
    img.addEventListener("click", function (im) {
        let imgoverlay = document.createElement("div")
        imgoverlay.className = "imgoverlay"
        document.body.appendChild(imgoverlay)
        let imgbox = document.createElement("div")
        imgbox.className = "imgbox"
        document.body.appendChild(imgbox)
        
        let photo = document.createElement("img")
        photo.className = "photo"
        photo.src = im.target.src
        imgbox.appendChild(photo)
        let close = document.createElement("span")
        close.appendChild(document.createTextNode("X"))
        close.className = "close"
        imgbox.appendChild(close)
        close.addEventListener("click", function () {
            imgoverlay.remove()
            imgbox.remove()
        })
        let chevleft = document.createElement("i")
        chevleft.className = "fa-solid fa-chevron-left"
        chevleft.dataset.move = "left"
        imgbox.appendChild(chevleft)

        let chevright = document.createElement("i")
        chevright.className = "fa-solid fa-chevron-right"
        chevright.dataset.move = "right"
        imgbox.appendChild(chevright)

        let imgchev = document.querySelectorAll(".imgbox i")
        imgchev.forEach(function (imgche) {
            imgche.addEventListener("click", function (che) {
                if (che.target.dataset.move === "right") {
                    photo.src = gallery[++index-1].src
                    if ( index === 10) {
                        index = 0
                    }
                } else {
                    photo.src = gallery[--index+1].src
                    if ( index === -1) {
                        index = 9
                    }
                }
            })
        })
    })
})

// end gallery

let bullets = document.querySelectorAll(".bullets .bullet")
bullets.forEach(function (bull) {
    bull.addEventListener("click", function (bul) {
        document.querySelector(bul.target.dataset.section).scrollIntoView({ behavior: "smooth"})
    })
})

document.querySelector(".top").onclick = function () {
    window.scroll({top:0,left:0,behavior:"smooth"})
}


let bulloptions = document.querySelectorAll(".bullts span")
let bullstorage = window.localStorage.getItem("bull")
bulloptions.forEach(function(span) {
    span.addEventListener("click", function (e) {
        handelactive(e)
        if (e.target.dataset.option === "yes") {
            document.querySelector(".bullets").style.display = "flex"
            window.localStorage.setItem("bull", "yes")
        } else {
            document.querySelector(".bullets").style.display = "none"
            window.localStorage.setItem("bull", "no")
        }
    })
})

if (bullstorage !== null) {
    if (bullstorage === "yes") {
        document.querySelector(".bullets").style.display = "flex"
    } else {
        document.querySelector(".bullets").style.display = "none"
    }
    bulloptions.forEach(function(span) {
        span.classList.remove("active")
    } )

    if (bullstorage === "yes") {
        bulloptions[0].classList.add("active")
    } else {
        bulloptions[1].classList.add("active")
    }
}
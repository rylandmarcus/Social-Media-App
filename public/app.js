// // console.log('hey');

// if (document.querySelector('.profPic')){
//     document.querySelectorAll('.profPic').forEach(pic=>{
//         pic.addEventListener('error', function handleError(){
//             pic.src = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
//             pic.alt = 'default'
//         })
//     })
// }

// if (document.querySelector('.coverPhoto')){
//     let cover = document.querySelector('.coverPhoto')
//     cover.addEventListener('error', function handleError(){
//             cover.src = 'https://i.pinimg.com/1200x/ce/2c/16/ce2c167254400a9f2cf349019a5fcbfd.jpg'
//             cover.alt = 'default'
//         })
// }

console.log('hi');

if (document.querySelector('.roundProfPic')){
    let profPic = document.querySelector('.roundProfPic')
    profPic.addEventListener('click', (e)=>{
        document.querySelector('body').innerHTML = `<div class="container"><img src=${profPic.src} class="profPic"> <br><a href="" class="link"><--Back</a></div>`
        document.querySelector('body').style.backgroundColor = 'black'
        document.querySelector('.profPic').style.height = '500px'
        document.querySelector('.profPic').style.width = '500px'
        document.querySelector('.container').style.margin = '200px'
        document.querySelector('.container').style.height = '700px'
        document.querySelector('.container').style.textAlign = 'center'
        document.querySelector('.profPic').style.backgroundColor = 'white'
        document.querySelector('body').style.display = 'flex'
        document.querySelector('body').style.justifyContent = 'center'
        document.querySelector('body').style.flexDirection = 'column'
        document.querySelector('body').style.alignItems = 'center'
        document.querySelector('.link').style.fontSize = '25px'
    })
}


if (document.querySelector('.colorsNav')){
    let colorsContainer = document.querySelector('.colorsContainer')
    let colorsNav = document.querySelector('.colorsNav')
    colorsNav.addEventListener('click', (e)=>{
        if (colorsContainer.hidden==true){
            colorsContainer.hidden = false
            return
        }
        if (colorsContainer.hidden==false){
            colorsContainer.hidden=true
            return
        }
    })
}


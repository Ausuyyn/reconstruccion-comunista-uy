
window.onload = ()=> {
    const menu_btn = document.querySelector('.hamburger')
    const mobile_menu = document.querySelector('.mobile-nav')
    const desktop_menu = document.querySelector('.desktop-nav')
    menu_btn.addEventListener('click', ()=> {
        if(!menu_btn.classList[1]) {
            menu_btn.classList.add('is-active')
        } else {
            menu_btn.classList.remove('is-active')
        }
        if(!mobile_menu.classList[1]) {
            mobile_menu.classList.add('is-active')
        } else {
            mobile_menu.classList.remove('is-active')
        }
        if(!desktop_menu.classList[1]) {
            desktop_menu.classList.add('is-active')
        } else {
            desktop_menu.classList.remove('is-active')
        }
    })

    window.addEventListener('resize', (e)=> {
        if(desktop_menu.classList[1] && screen.width > 800){
            desktop_menu.classList.remove('is-active')
        } else if(!desktop_menu.classList[1] && screen.width < 800) {
            desktop_menu.classList.add('is-active')
        }
    })
}

const openPopupButton = document.querySelectorAll('[data-popup-target]')
const closePopupButton = document.querySelectorAll('[data-close-button]')
const wall = document.getElementById('wall')
const sidebar = document.getElementById('sidebar')

openPopupButton.forEach(button => {
    button.addEventListener('click', () => {
        const popup = document.querySelector(button.dataset.popupTarget)
        openPopup(popup)
    })
})

closePopupButton.forEach(button => {
    button.addEventListener('click', () => {
        const popup = button.closest('.popup')
        closePopup(popup)
    })
})

wall.addEventListener('click', () => {
    const popups = document.querySelectorAll('.popup.active')
    popups.forEach(popup => {
        closePopup(popup)
    });

})

function openPopup(popup) {
    if (popup == null) return
    popup.classList.add('active')
    wall.classList.add('active')
    sidebar.classList.add('active')
}

function closePopup(popup) {
    if (popup == null) return
    popup.classList.remove('active')
    wall.classList.remove('active')
    sidebar.classList.remove('active')
}

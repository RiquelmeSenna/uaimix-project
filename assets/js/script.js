let menuBar = document.querySelector('.bars')
let categoriesBar = document.querySelector('.categorias-bar')
let exit = document.querySelector('#exit')


menuBar.addEventListener('click', () => {
    categoriesBar.style.transform = 'translateX(00%)';
    setTimeout(() => {
        categoriesBar.style.boxShadow = '140px 0px 0px rgba(0, 0, 0, 0.7)'
    }, 175)
})

exit.addEventListener('click', () => {
    categoriesBar.style.transform = 'translateX(-100%)';

    setTimeout(() => {
        categoriesBar.style.boxShadow = '0px 0px 0px'
    }, 25)
})

//box-shadow: 140px 0px 0px rgba(0, 0, 0, 0.7);
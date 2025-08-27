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

function renderCategoriasNav(categorias) {
    let categoriasNav = document.querySelector('.categorias-nav')
    categoriasNav.innerHTML = ""
    let categoriesFooter = document.querySelectorAll('.footer-section ul')[1]
    categoriesFooter.innerHTML = ''

    categorias.forEach(categoria => {
        let link = document.createElement('a')
        link.href = "./categoryPage.html"
        link.textContent = categoria

        let linkFooter = document.createElement('li')
        let a = document.createElement('a')
        a.href = "./categoryPage.html"
        a.textContent = categoria

        linkFooter.appendChild(a)

        link.addEventListener('click', (e) => {
            e.preventDefault()
            localStorage.setItem('categoriaSelecionada', categoria)
            window.location.href = "./categoryPage.html"
        })

        a.addEventListener('click', (e) => {
            e.preventDefault()
            localStorage.setItem('categoriaSelecionada', categoria)
            window.location.href = './categoryPage.html'
        })
        categoriasNav.appendChild(link)
        categoriesFooter.appendChild(linkFooter)
    })

}

async function loadCategoryProducts() {
    const url = 'https://sheetdb.io/api/v1/ppt72dz0c8neo'
    const response = await fetch(url)
    const products = await response.json()

    let categoriaSelecionada = localStorage.getItem('categoriaSelecionada')
    let productlist = document.querySelector('.products-list')

    let categoriasUnicas = [...new Set(products.map(p => p.categoria))]
    renderCategoriasNav(categoriasUnicas)

    if (!categoriaSelecionada) {
        productlist.innerHTML = "<p>Selecione uma categoria no menu.</p>"
        return
    }

    let produtosDaCategoria = products.filter(p => p.categoria === categoriaSelecionada)

    if (produtosDaCategoria.length === 0) {
        productlist.innerHTML = `<p>Nenhum produto encontrado em <strong>${categoriaSelecionada}</strong>.</p>`
        return
    }
}

function loadProductUnique() {
    let product = JSON.parse(localStorage.getItem('produtoSelecionado'))



    let titleProduct = document.querySelector('.produto-nome')
    let titleImg = document.querySelector('.produto-imagem img')
    let ManufacturerCode = document.querySelectorAll('.produto-detalhes li')[0]
    let productBrand = document.querySelectorAll('.produto-detalhes li')[1]
    let productCategory = document.querySelectorAll('.produto-detalhes li')[2]
    let productDescription = document.querySelectorAll('.produto-detalhes li')[3]


    console.log(product)
    titleProduct.innerHTML = product.nome
    titleImg.src = product.imagemUrl
    ManufacturerCode.innerHTML = `<li><strong>Código do Fabricante:</strong> ${product.codigo}</li> `
    productBrand.innerHTML = `<li><strong>Marca:</strong> ${product.marca}</li> `
    productCategory.innerHTML = `<li><strong>Categoria:</strong> ${product.categoria}</li>`
    productDescription.innerHTML = `<li><strong>Descrição:</strong> ${product.descricao}</li>`

}

loadCategoryProducts()
loadProductUnique()
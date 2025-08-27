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
        link.href = "./html/categoryPage.html"
        link.textContent = categoria

        let linkFooter = document.createElement('li')
        let a = document.createElement('a')
        a.href = "./html/categoryPage.html"
        a.textContent = categoria

        linkFooter.appendChild(a)


        link.addEventListener('click', (e) => {
            e.preventDefault()
            localStorage.setItem('categoriaSelecionada', categoria)
            window.location.href = './html/categoryPage.html'
        })

        a.addEventListener('click', (e) => {
            e.preventDefault()
            localStorage.setItem('categoriaSelecionada', categoria)
            window.location.href = './html/categoryPage.html'
        })

        categoriasNav.appendChild(link)
        categoriesFooter.appendChild(linkFooter)

    })

}


function shuffleArray(array) {
    return array
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
}

async function addNewProduct() {
    const url = 'https://sheetdb.io/api/v1/ppt72dz0c8neo'
    const response = await fetch(url)
    const products = await response.json()

    let productlist = document.querySelector('.produtos-lista')
    let productsCategory = document.querySelector('.produtos-categoria')


    let categoriasUnicas = [...new Set(products.map(p => p.categoria))]

    renderCategoriasNav(categoriasUnicas)


    categoriasUnicas.forEach(categoria => {
        let divTitulo = document.createElement('div')
        divTitulo.classList.add('titulo')

        let h3 = document.createElement('h3')
        h3.classList.add('categoria-nome')
        h3.innerHTML = categoria

        let bar = document.createElement('div')
        bar.classList.add('barra')

        divTitulo.appendChild(h3)
        divTitulo.appendChild(bar)


        let produtosDiv = document.createElement('div')
        produtosDiv.classList.add('produtos')
        produtosDiv.setAttribute('data-categoria', categoria)

        productsCategory.appendChild(divTitulo)
        productsCategory.appendChild(produtosDiv)
    })

    let produtosAleatorios = shuffleArray(products).slice(0, 6)

    produtosAleatorios.forEach(product => {
        let productItem = document.createElement('div')
        productItem.classList.add('produto-item')

        let img = document.createElement('img')
        img.src = product.imagemUrl

        let h2 = document.createElement('h2')
        h2.classList.add('produto-nome')
        h2.innerHTML = product.nome

        let p = document.createElement('p')
        p.classList.add('produto-codigo')
        p.innerHTML = `Código: ${product.codigo}`

        let button = document.createElement('button')
        button.classList.add('produto-comprar')
        button.innerHTML = 'Comprar'

        button.addEventListener('click', () => {
            localStorage.setItem('produtoSelecionado', JSON.stringify(product))
            window.location.href = './html/produtoPage.html'
        })
        productItem.appendChild(img)
        productItem.appendChild(h2)
        productItem.appendChild(p)
        productItem.appendChild(button)

        productlist.appendChild(productItem)

    })

    categoriasUnicas.forEach(categoria => {
        let categoriaDiv = document.querySelector(`.produtos[data-categoria="${categoria}"]`)

        let produtosDaCategoria = products.filter(p => p.categoria === categoria)
        let embaralhados = shuffleArray(produtosDaCategoria)

        embaralhados.forEach(product => {
            let productItem = document.createElement('div')
            productItem.classList.add('produto-item')

            let img = document.createElement('img')
            img.src = product.imagemUrl

            let h2 = document.createElement('h2')
            h2.classList.add('produto-nome')
            h2.innerHTML = product.nome

            let p = document.createElement('p')
            p.classList.add('produto-codigo')
            p.innerHTML = `Código: ${product.codigo}`

            let button = document.createElement('button')
            button.classList.add('produto-comprar')
            button.innerHTML = 'Comprar'

            button.addEventListener('click', () => {
                localStorage.setItem('produtoSelecionado', JSON.stringify(product))
                window.location.href = './html/produtoPage.html'
            })

            productItem.appendChild(img)
            productItem.appendChild(h2)
            productItem.appendChild(p)
            productItem.appendChild(button)

            categoriaDiv.appendChild(productItem)
        })
    })
}

addNewProduct()

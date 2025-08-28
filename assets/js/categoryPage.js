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

    document.querySelector('.category-header h2').innerHTML = categoriaSelecionada
    renderCategoryProducts(produtosDaCategoria, productlist)
    setupCategorySearch(produtosDaCategoria, productlist)



    produtosDaCategoria.forEach(product => {
        let Title = document.querySelector('.category-header h2').innerHTML = product.categoria

        let productItem = document.createElement('div')
        productItem.classList.add('product-card')

        let img = document.createElement('img')
        img.src = product.imagemUrl

        let h3 = document.createElement('h3')
        h3.innerHTML = product.nome

        let pBrand = document.createElement('p')
        pBrand.classList.add('brand')
        pBrand.innerHTML = `Marca: ${product.marca}`

        console.log(product)
        let p = document.createElement('p')
        p.innerHTML = `Código: ${product.codigo}`

        let button = document.createElement('button')
        button.classList.add('buy-button')
        button.innerHTML = 'Comprar'

        button.addEventListener('click', () => {
            localStorage.setItem('produtoSelecionado', JSON.stringify(product))
            window.location.href = './produtoPage.html'
        })

        productItem.appendChild(img)
        productItem.appendChild(h3)
        productItem.appendChild(pBrand)
        productItem.appendChild(p)
        productItem.appendChild(button)

        productlist.appendChild(productItem)
    })

}

function renderCategoryProducts(products, container) {
    container.innerHTML = ""; // limpa antes de renderizar
    products.forEach(product => {
        let productItem = document.createElement('div')
        productItem.classList.add('product-card')

        let img = document.createElement('img')
        img.src = product.imagemUrl

        let h3 = document.createElement('h3')
        h3.innerHTML = product.nome

        let pBrand = document.createElement('p')
        pBrand.classList.add('brand')
        pBrand.innerHTML = `Marca: ${product.marca}`

        let p = document.createElement('p')
        p.innerHTML = `Código: ${product.codigo}`

        let button = document.createElement('button')
        button.classList.add('buy-button')
        button.innerHTML = 'Comprar'

        button.addEventListener('click', () => {
            localStorage.setItem('produtoSelecionado', JSON.stringify(product))
            window.location.href = './produtoPage.html'
        })

        productItem.appendChild(img)
        productItem.appendChild(h3)
        productItem.appendChild(pBrand)
        productItem.appendChild(p)
        productItem.appendChild(button)

        container.appendChild(productItem)
    })
}

function setupCategorySearch(products, container) {
    const input = document.querySelector("#search-input")
    const button = document.querySelector("#button-search")

    function filtrar() {
        let termo = input.value.trim().toLowerCase()
        if (termo === "") {
            renderCategoryProducts(products, container)
            return
        }

        let filtrados = products.filter(p =>
            p.nome.toLowerCase().includes(termo) ||
            p.codigo.toString().includes(termo) ||
            (p.marca && p.marca.toLowerCase().includes(termo))
        )

        renderCategoryProducts(filtrados, container)
    }

    input.addEventListener("input", filtrar)
    button.addEventListener("click", (e) => {
        e.preventDefault()
        filtrar()
    })
}


function enviarWhatssapp(mensagem = "Olá, gostaria de fazer um orçamento.") {
    const numero = "5561994021018";
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`
    window.open(url, "_blank");
}

document.querySelector('#whatssap-header').addEventListener('click', (e) => {
    e.preventDefault()
    enviarWhatssapp("Olá, gostaria de mais informações sobre os produtos da Uaimix.")
})

document.querySelector("#whatssap-button").addEventListener("click", (e) => {
    e.preventDefault();
    enviarWhatssapp("Olá, gostaria de mais informações sobre os produtos da Uaimix.")
});

loadCategoryProducts()

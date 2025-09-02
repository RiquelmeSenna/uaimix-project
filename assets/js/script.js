let menuBar = document.querySelector('.bars')
let categoriesBar = document.querySelector('.categorias-bar')
let exit = document.querySelector('#exit')


menuBar.addEventListener('click', () => {
    categoriesBar.style.transform = 'translateX(00%)';
    setTimeout(() => {
        categoriesBar.style.boxShadow = '226px 0px 0px rgba(0, 0, 0, 0.7)'
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
    const url = 'https://script.google.com/macros/s/AKfycbzXVj2wzMU6XgF7bypB0o8Kwp5NHtfIWr9Jd7RBo1yvB1PyisOY9UoQXU2CSLChGti7kw/exec'
    const response = await fetch(url)
    const products = await response.json()

    console.log(products)

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

    setupSearch(products)
}

function renderProductsList(products, container) {
    container.innerHTML = "";
    products.forEach(product => {
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

        container.appendChild(productItem)
    })
}

function setupSearch(products) {
    const input = document.querySelector("#search-input")
    const button = document.querySelector("#button-search")
    const productlist = document.querySelector('.produtos-lista')

    function filtrar() {
        let termo = input.value.trim().toLowerCase()
        if (termo === "") {
            // volta 6 produtos aleatórios
            let aleatorios = shuffleArray(products).slice(0, 6)
            renderProductsList(aleatorios, productlist)
            return
        }

        let filtrados = products.filter(p =>
            p.nome.toLowerCase().includes(termo) ||
            p.codigo.toString().includes(termo) ||
            (p.marca && p.marca.toLowerCase().includes(termo))
        )

        renderProductsList(filtrados, productlist)
    }

    // pesquisa enquanto digita
    input.addEventListener("input", filtrar)
    // pesquisa no clique do botão
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

addNewProduct()

///////////////////////////


const btnUserLogin = document.querySelector("#user-login-btn");
const loginModal = document.querySelector("#login-modal");
const registerModal = document.querySelector("#register-modal");

const closeLogin = document.querySelector("#close-login-modal");
const closeRegister = document.querySelector("#close-register-modal");
const loginLink = document.querySelector("#login-link"); // "Já tem conta? Entrar"
const registerLink = document.querySelector("#login-modal p a"); // "Não tem conta? Cadastre-se"

// Abrir modal de cadastro ao clicar no ícone de usuário
btnUserLogin.addEventListener("click", () => {
    registerModal.style.display = "flex";
    loginModal.style.display = "none";
});

// Fechar modais
closeLogin.addEventListener("click", () => {
    loginModal.style.display = "none";
});
closeRegister.addEventListener("click", () => {
    registerModal.style.display = "none";
});

// Trocar de Cadastro → Login
loginLink.addEventListener("click", (e) => {
    e.preventDefault();
    registerModal.style.display = "none";
    loginModal.style.display = "flex";
});

// Trocar de Login → Cadastro
registerLink.addEventListener("click", (e) => {
    e.preventDefault();
    loginModal.style.display = "none";
    registerModal.style.display = "flex";
});

// Fechar modal clicando fora
window.addEventListener("click", (e) => {
    if (e.target === loginModal) loginModal.style.display = "none";
    if (e.target === registerModal) registerModal.style.display = "none";
});

const API_URL = "https://script.google.com/macros/s/AKfycbx3pv27lzJcPqD16l6DcWrw8gm4wdqo2_37v97tgfOfd13w1e8esbWnWhiUTmvajr94jQ/exec";

// --- Cadastro ---
document.querySelector("#register-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const inputs = e.target.querySelectorAll("input");
    const nome = inputs[0].value;
    const documento = inputs[1].value;
    const email = inputs[2].value;
    const senha = inputs[3].value;
    const confirmaSenha = inputs[4].value;

    if (senha !== confirmaSenha) {
        alert("As senhas não coincidem!");
        return;
    }

    try {
        const resp = await fetch(API_URL, {
            method: "POST",
            body: JSON.stringify({ nome, documento, email, senha }),
            headers: { "Content-Type": "application/json" },
            mode: "cors"
        });

        const data = await resp.json();
        console.log(data)

        if (data.sucesso) {
            alert("Cadastro realizado com sucesso!");
            localStorage.setItem("usuarioLogado", JSON.stringify({ nome, email, id: data.id }));
            location.reload();
        } else {
            alert(data.erro || "Erro no cadastro.");
        }
    } catch (err) {
        alert("Erro na conexão: " + err.message);
    }
});

// --- Login ---
document.querySelector("#login-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const inputs = e.target.querySelectorAll("input");
    const email = inputs[0].value;
    const senha = inputs[1].value;

    try {
        const resp = await fetch(`${API_URL}?email=${encodeURIComponent(email)}&senha=${encodeURIComponent(senha)}`, {
            method: "GET",
            mode: "cors"
        });

        const data = await resp.json();

        if (data.sucesso) {
            localStorage.setItem("usuarioLogado", JSON.stringify(data));
            alert("Login realizado!");
            location.reload();
        } else {
            alert(data.erro || "Erro no login.");
        }
    } catch (err) {
        alert("Erro na conexão: " + err.message);
    }
});

// --- Manter usuário logado ---
window.addEventListener("DOMContentLoaded", () => {
    const usuario = localStorage.getItem("usuarioLogado");
    if (usuario) {
        const user = JSON.parse(usuario);
        document.querySelector("#user-login-btn img").title = `Olá, ${user.nome}`;
    }
});




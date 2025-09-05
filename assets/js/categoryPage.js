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
    const url = 'https://script.google.com/macros/s/AKfycbzXVj2wzMU6XgF7bypB0o8Kwp5NHtfIWr9Jd7RBo1yvB1PyisOY9UoQXU2CSLChGti7kw/exec'
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

    // Esconde o loading
    document.querySelector("#loading-screen").style.display = "none";


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

        const compraEl = criarElementoCompra(product);
        productItem.appendChild(compraEl);


        productItem.appendChild(img)
        productItem.appendChild(h3)
        productItem.appendChild(pBrand)
        productItem.appendChild(p)
        productItem.appendChild(compraEl)

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
    const numero = "5561983776360";
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

document.querySelector("#loading-screen").style.display = "flex";

loadCategoryProducts()

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

const API_URL = "https://uaimix-backend.onrender.com/user";

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
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: nome,
                document: documento,
                email,
                password: senha
            })
        });

        const data = await resp.json();

        if (resp.ok) {
            alert("Cadastro realizado com sucesso!");
            localStorage.setItem("usuarioLogado", JSON.stringify({ nome, email }));
            location.reload();
        } else {
            alert(data.error || "Erro ao cadastrar.");
        }
    } catch (err) {
        console.error(err);
        alert("Erro na conexão com o servidor.");
    }
});

// --- Login ---
document.querySelector("#login-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const inputs = e.target.querySelectorAll("input");
    const email = inputs[0].value;
    const senha = inputs[1].value;

    try {
        const resp = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password: senha })
        });

        const data = await resp.json();

        if (resp.ok && data.token) {
            alert("Login realizado!");
            localStorage.setItem("authToken", data.token);
            localStorage.setItem("usuarioLogado", JSON.stringify({ email }));
            location.reload();
        } else {
            alert(data.error || "Email ou senha incorretos.");
        }
    } catch (err) {
        console.error(err);
        alert("Erro na conexão com o servidor.");
    }
});

// --- Manter usuário logado ---
window.addEventListener("DOMContentLoaded", () => {
    const usuario = localStorage.getItem("usuarioLogado");
    if (usuario) {
        const user = JSON.parse(usuario);
        document.querySelector("#user-login-btn img").title = `Olá, ${user.nome || user.email}`;
    }
});

// --- Manter usuário logado ---
window.addEventListener("DOMContentLoaded", () => {
    const usuario = localStorage.getItem("usuarioLogado");
    if (usuario) {
        const user = JSON.parse(usuario);
        const header = document.querySelector("header nav");

        // Remove o botão original
        const oldBtn = document.querySelector("#user-login-btn");
        if (oldBtn) oldBtn.remove();

        // Cria a área de usuário
        const userArea = document.createElement("div");
        userArea.classList.add("user-area");
        userArea.innerHTML = `
            <span class="user-name">Olá, <strong>${user.name || "Usuário"}</strong></span>
            <button id="logout-btn" class="logout-btn">Sair</button>
        `;

        header.appendChild(userArea);

        // Logout
        document.querySelector("#logout-btn").addEventListener("click", () => {
            localStorage.removeItem("usuarioLogado");
            location.reload();
        });
    }
});

function criarElementoCompra(product) {
    const usuario = localStorage.getItem("usuarioLogado");

    if (usuario) {
        // Logado: mostra o botão normal
        const btn = document.createElement("button");
        btn.className = "produto-comprar";
        btn.textContent = "Comprar";
        btn.addEventListener("click", () => {
            localStorage.setItem("produtoSelecionado", JSON.stringify(product));
            window.location.href = "./html/produtoPage.html";
        });
        return btn;
    }

    // NÃO logado: mostra apenas a mensagem (sem botão)
    const aviso = document.createElement("p");
    aviso.className = "aviso-login";
    aviso.textContent = "Faça login para comprar";
    return aviso;
}

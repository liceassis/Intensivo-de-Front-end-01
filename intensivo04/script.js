/* ==================================

BOTÃO QUE MUDA DE COR
================================== */

const botaoCor = document.getElementById("botaoCor");

botaoCor.addEventListener("mouseover", function() {
botaoCor.style.backgroundColor = "#e74c3c";
});

botaoCor.addEventListener("mouseout", function() {
botaoCor.style.backgroundColor = "#3498db";
});

/* ==================================
2. CONTADOR DE CLIQUES
================================== */

const botaoContador = document.getElementById("botaoContador");
const contador = document.getElementById("contador");

let cliques = 0;

botaoContador.addEventListener("click", function() {

cliques++;

contador.textContent = cliques;


});

/* ==================================
3. MODAL
================================== */

const modal = document.getElementById("modal");
const abrirModal = document.getElementById("abrirModal");
const fecharModal = document.getElementById("fecharModal");

// Abrir o modal
abrirModal.addEventListener("click", function() {
modal.style.display = "flex";
});

// Fechar pelo botão
fecharModal.addEventListener("click", function() {
modal.style.display = "none";
});

// Fechar clicando fora do modal
modal.addEventListener("click", function(event) {

if (event.target === modal) {
    modal.style.display = "none";
}


});

/* ==================================
4. GALERIA DE IMAGENS
================================== */

const imagens = document.querySelectorAll(".galeria img");
const imagemAmpliada = document.getElementById("imagemAmpliada");
const imagemGrande = document.getElementById("imagemGrande");

imagens.forEach(function(imagem) {

imagem.addEventListener("click", function() {

    imagemGrande.src = imagem.src;

    imagemAmpliada.style.display = "flex";

});


});

// Fechar imagem ampliada ao clicar fora
imagemAmpliada.addEventListener("click", function(event) {

if (event.target === imagemAmpliada) {
    imagemAmpliada.style.display = "none";
}


});

/* ==================================
5. SISTEMA DE TABS
================================== */

const tabs = document.querySelectorAll(".tab");
const conteudos = document.querySelectorAll(".conteudo-tab");

tabs.forEach(function(tab) {

tab.addEventListener("click", function() {

    // Remove a aba ativa
    tabs.forEach(function(tab) {
        tab.classList.remove("ativa");
    });

    // Esconde todos os conteúdos
    conteudos.forEach(function(conteudo) {
        conteudo.classList.remove("ativo");
    });

    // Ativa a aba clicada
    tab.classList.add("ativa");

    // Descobre qual conteúdo deve aparecer
    const id = tab.getAttribute("data-tab");

    document.getElementById(id).classList.add("ativo");

});


});
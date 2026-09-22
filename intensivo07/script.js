const usuarios = [

    {
        nome: "Ana Clara",
        usuario: "anac",
        senha: "1234",
        email: "anac@gmail.com",
        idade: 17
    },

    {
        nome: "Giovana",
        usuario: "gi",
        senha: "1234",
        email: "giovana@gmail.com",
        idade: 17
    },

    {
        nome: "Larissa",
        usuario: "Lari",
        senha: "1234",
        email: "larissa@gmail.com",
        idade: 17
    },

    {
        nome: "Luana",
        usuario: "lua",
        senha: "1234",
        email: "luana@gmail.com",
        idade: 18
    },

    {
        nome: "Victória",
        usuario: "vic",
        senha: "1234",
        email: "vicmarreto@gmail.com",
        idade: 17
    },

    {
        nome: "Alice",
        usuario: "lice",
        senha: "1234",
        email: "lice@gmail.com",
        idade: 18
    }

];


const botaoPosts =
    document.getElementById("buscarPosts");

const resultadoPosts =
    document.getElementById("resultadoPosts");


botaoPosts.addEventListener(
    "click",
    async function () {

        resultadoPosts.innerHTML = `
            <p>Carregando informações...</p>
        `;


        try {

            const resposta = await fetch(
                "https://jsonplaceholder.typicode.com/posts"
            );


            const posts =
                await resposta.json();


            resultadoPosts.innerHTML = "";


            posts.slice(0, 10).forEach(
                function (post) {

                    resultadoPosts.innerHTML += `

                        <div class="post">

                            <h3>
                                ${post.title}
                            </h3>

                            <p>
                                ${post.body}
                            </p>

                        </div>

                    `;

                }
            );


        } catch (erro) {

            resultadoPosts.innerHTML = `
                <p class="erro">
                    Erro ao buscar os dados.
                </p>
            `;

            console.error(erro);

        }

    }
);



const campoBusca =
    document.getElementById("campoBusca");


const resultadoBusca =
    document.getElementById("resultadoBusca");


function mostrarUsuariosBusca(lista) {

    resultadoBusca.innerHTML = "";


    if (lista.length === 0) {

        resultadoBusca.innerHTML = `
            <p>
                Nenhum usuário encontrado.
            </p>
        `;

        return;

    }


    lista.forEach(
        function (usuario) {

            resultadoBusca.innerHTML += `

                <div class="usuario">

                    <h3>
                        ${usuario.nome}
                    </h3>

                    <p>
                        <strong>E-mail:</strong>
                        ${usuario.email}
                    </p>

                    <p>
                        <strong>Idade:</strong>
                        ${usuario.idade} anos
                    </p>

                </div>

            `;

        }
    );

}


campoBusca.addEventListener(
    "input",
    function () {

        const texto =
            campoBusca.value.toLowerCase();


        const usuariosFiltrados =
            usuarios.filter(
                function (usuario) {

                    return usuario.nome
                        .toLowerCase()
                        .includes(texto);

                }
            );


        mostrarUsuariosBusca(
            usuariosFiltrados
        );

    }
);


// Mostra todos inicialmente

mostrarUsuariosBusca(usuarios);



/* EXERCÍCIO 3 - SISTEMA DE LOGIN*/

const formularioLogin =
    document.getElementById("formLogin");


const mensagemLogin =
    document.getElementById("mensagemLogin");


const dadosUsuario =
    document.getElementById("dadosUsuario");


formularioLogin.addEventListener(
    "submit",
    function (evento) {

        evento.preventDefault();


        const usuarioDigitado =
            document.getElementById("usuario").value;


        const senhaDigitada =
            document.getElementById("senha").value;


        const usuarioEncontrado =
            usuarios.find(
                function (usuario) {

                    return (
                        usuario.usuario === usuarioDigitado &&
                        usuario.senha === senhaDigitada
                    );

                }
            );


        if (usuarioEncontrado) {

            mensagemLogin.textContent =
                "Login realizado com sucesso!";

            mensagemLogin.className =
                "sucesso";


            dadosUsuario.innerHTML = `

                <h3>
                    Bem-vindo,
                    ${usuarioEncontrado.nome}!
                </h3>

                <p>
                    E-mail:
                    ${usuarioEncontrado.email}
                </p>

                <p>
                    Idade:
                    ${usuarioEncontrado.idade} anos
                </p>

            `;


        } else {

            mensagemLogin.textContent =
                "Usuário ou senha incorretos.";

            mensagemLogin.className =
                "erro";


            dadosUsuario.innerHTML = "";

        }

    }
);



/* EXERCÍCIO 4 - LISTA DOS 6 USUÁRIOS*/

const listaUsuarios =
    document.getElementById("listaUsuarios");


function mostrarListaUsuarios() {

    listaUsuarios.innerHTML = "";


    usuarios.forEach(
        function (usuario) {

            listaUsuarios.innerHTML += `

                <div class="card-usuario">

                    <h3>
                        ${usuario.nome}
                    </h3>

                    <p>
                        <strong>Usuário:</strong>
                        ${usuario.usuario}
                    </p>

                    <p>
                        <strong>E-mail:</strong>
                        ${usuario.email}
                    </p>

                    <p>
                        <strong>Idade:</strong>
                        ${usuario.idade} anos
                    </p>

                </div>

            `;

        }
    );

}


mostrarListaUsuarios();



/*EXERCÍCIO 5 - PREVISÃO DO TEMPO PELA LOCALIZAÇÃO*/


const botaoClima =
    document.getElementById("buscarClima");


const resultadoClima =
    document.getElementById("resultadoClima");



botaoClima.addEventListener(
    "click",
    function () {

        // Verifica se o navegador possui
        // suporte à localização

        if (!navigator.geolocation) {

            resultadoClima.innerHTML = `

                <p class="erro">
                    Seu navegador não suporta
                    localização.
                </p>

            `;

            return;
        }


        resultadoClima.innerHTML = `

            <p>
                Obtendo sua localização...
            </p>

        `;


        // Pega a localização do usuário

        navigator.geolocation.getCurrentPosition(

            async function (posicao) {

                // Latitude do usuário

                const latitude =
                    posicao.coords.latitude;


                // Longitude do usuário

                const longitude =
                    posicao.coords.longitude;


                try {

                    // Consulta a API do clima

                    const resposta =
                        await fetch(

                            `https://api.open-meteo.com/v1/forecast` +

                            `?latitude=${latitude}` +

                            `&longitude=${longitude}` +

                            `&current=temperature_2m,wind_speed_10m` +

                            `&timezone=auto`

                        );


                    // Transforma a resposta em JSON

                    const dados =
                        await resposta.json();


                    // Pega a temperatura

                    const temperatura =
                        dados.current.temperature_2m;


                    // Pega a velocidade do vento

                    const vento =
                        dados.current.wind_speed_10m;


                    // Mostra o resultado

                    resultadoClima.innerHTML = `

                        <h3>
                            Seu clima atual
                        </h3>


                        <div class="temperatura">

                            ${temperatura}°C

                        </div>


                        <p class="info-clima">

                            <strong>
                                Velocidade do vento:
                            </strong>

                            ${vento} km/h

                        </p>


                        <p class="info-clima">

                            <strong>
                                Latitude:
                            </strong>

                            ${latitude.toFixed(4)}

                        </p>


                        <p class="info-clima">

                            <strong>
                                Longitude:
                            </strong>

                            ${longitude.toFixed(4)}

                        </p>

                    `;


                } catch (erro) {

                    resultadoClima.innerHTML = `

                        <p class="erro">
                            Não foi possível consultar
                            o clima.
                        </p>

                    `;

                    console.error(erro);

                }

            },


            function () {

                resultadoClima.innerHTML = `

                    <p class="erro">
                        Não foi possível acessar sua
                        localização.
                    </p>

                    <p>
                        Verifique se você permitiu
                        o acesso à localização.
                    </p>

                `;

            }

        );

    }
);


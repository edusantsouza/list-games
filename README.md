# Projeto de Estágio Frontend React App Masters - Segunda etapa

Este projeto foi realizado com base no processo seletivo de estágio para a [App Masters](https://www.appmasters.io/).

O objetivo do projeto é implementar o frontend de uma lista de jogos fornecido por uma API.


## Requisitos

- Utilizar Firebase para realizar autenticação usando email/senha. [x]
 * Autenticação de usuário feita com email/senha, registrando o usuário no banco de dados com Firestore.

- Ter um ❤️ para o usuário favoritar o jogo diretamente na lista, ficando vermelho quando marcado. [x]
  * Todos os jogos apresentados são possuem um ícone de coração para adicioná-lo a lista de favoritos.

- Salvar no firebase os jogos favoritos do usuário, no realtime ou firestore. [x]
  * Ao favoritar o jogo ele será registrado no banco de dados do firestore no id do usuário. 

- Ter um botão “Favoritos” que apresenta apenas jogos favoritados, permitindo ainda buscar e filtrar estes jogos. Pode ser na própria lista já apresentada ou em uma separada se preferir. [x]
  * A aplicação conta com um seção de favoritos, além de uma lista de desejos e biblioteca que, assim como o botão de favoritar, estão presentes nos cards de cada jogo.

- Ao lado do coração, ter ★★★★ para o usuário avaliar o jogo, podendo marcar de uma em uma. Ou seja, ele pode escolher 1, 2, 3 ou as 4. [x]
  * Parcialmente implementado. Ainda não é possível registrar no banco de dados o valor atribuido a cada jogo pelo usuário logado.
 
- Ter uma forma de ordenar por avaliação, vendo os melhores (ou piores) primeiro, clicando novamente para inverter a ordem. []
  * Não implementado.

- Ao carregar a interface, deixar o ❤️ vermelho para os itens favoritos e as ⭐️ amarelas nos itens avaliados [x]
  * Parcialmente implementado. Apenas os favoritos são registrados, por enquanto.

- Ao acessar sem estar autenticado, os ícones 🩶 e ★ deverão estar visíveis, mas ao clicar irá solicitar a autenticação [x]
  * Os itens de seleção nos cards são visíveis mas não são clicáveis. Ao selecioná-lo o usuário é redirecionado para a tela de login ou signup.

- Ao obter os jogos da API e os dados do firebase, apresentar. Manter o loading para os jogos. Não precisa de loading enquanto espera o firebase, até porque o firebase devolverá os dados mais rapidamente e pode ser complicado “esperar o firebase” se estiver “escutando o firebase”. [x]
  * Telas de loading implementadas em alguns momentos da aplicação.

- A autenticação deve acontecer na rota `/auth/` do frontend, usando o provedor “E-mail/senha” do firebase, onde o usuário poderá criar uma conta ou acessar a conta já existente (se mantendo apenas nesta rota) [x]
  * O usuário pode se cadastrar ou fazer login se já tiver conta existente.

- Escolher um item para aplicar uma animação com CSS, pode ser ao favoritar, ou avaliar, ou quando os itens surgirem. [x]
  * A home do projeto possui um carrossel de imagens dos jogos da API.

- Publicar seu projeto online para testarmos (na mesma url de antes). [x]
  * Devidamente publicado.


### Screenshots

A página inicial da aplicação.

![Página inicial da aplicação.](/screenshots/home-screen.png)

Página com todos os jogos.

![Categorias - Todos os jogos](/screenshots/categories-screen.png)


Página com todos os jogos para usuário logado.

![Categorias - Todos os jogos para usuário logado.](/screenshots/categories-logado.png)

Página de favoritos.

![Página de favoritos](/screenshots/favorites-screen.png)

Página de login.

![Página de Login](/screenshots/login-screen.png)

Menu no mobile para usuário não logado. 

![Menu mobile.](/screenshots/menu-mobile.png)

Menu no mobile para usuário logado. 

![Menu mobile para usuário logado.](/screenshots/menu-mobile-on.png)

Categorias para usuário logado no mobile. 

![Categorias para usuário logado no mobile.](/screenshots/categories-mobile.png)

Visite a página da aplicação [clicando aqui.](https://list-games.vercel.app/)


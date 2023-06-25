# Projeto de Estágio Frontend React - App Masters

Este projeto foi realizado com base no processo seletivo de estágio para a [App Masters](https://www.appmasters.io/).

O objetivo do projeto é implementar o frontend de uma lista de jogos fornecido por uma API.


## Requisitos

- O projeto deve ser feito usando React ou Next.JS [x]
  * A implementação do projeto foi feita com React, em JS puro.

- Obter a lista de jogos em `/data` [x]
  * Através da URL base da API, acessamos o `/data` e, no segundo argumento do fetch, fornecemos no header um e-mail válido como value da key `dev-email-address`.

- Apresentar um loader enquanto os dados são obtidos [x]
  * Uma mensagem indicando que a aplicação está carregando é apresentada até que a busca na API retorne uma resposta.

- Apresentar os jogos em três colunas (no computador) [x]
  * Foi utilizado o display grid para distribuir os cards em três colunas de tamanhos iguais.

- Em cada card apresentar o título e imagem pelo menos [x]
  * Cada card possui a imagem, título, publisher, gênero, descrição e acesso ao site principal que agrega informações sobre o jogo. 

- Lidar com a responsividade, para que fique bem apresentado no computador, tablets ou celular [x]
  * Também através do display grid foram implentados breakpoints para adaptar o conteúdo a diferentes tamanhos de tela.

- Quando a API retornar o `status code` 500, 502, 503, 504, 507, 508 ou 509 apresentar ao usuário `O servidor falhou em responder, tente recarregar a página` [x]
  * Foram implementadas mensagens de erro aos status code citados no requisito, retornando ao usuário o texto:
   `O servidor falhou em responder, tente recarregar a página`

- Caso a API retorne outros erros, apresentar `O servidor não conseguirá responder por agora, tente voltar novamente mais tarde` [x]
  * Foram implementadas mensagens de erros a qualquer outro retorno da API que tenho o `status.ok` como false, retornando ao usuário o texto:
   `O servidor falhou em responder, tente recarregar a página`

- Ao realizar uma chamada, não esperar mais que 5 segundos pelo retorno. Se os dados demorarem mais de 5 segundos para retornar apresentar `O servidor demorou para responder, tente mais tarde` [x]
  * Um controller foi adicionado durante o fetch dos dados para controlar o tempo entre o pedido e a resposta (seja ela qual for). Ao exceder o tempo determinado de 5 segundos a seguinte mensagem é apresentada na tela:
  `O servidor demorou para responder, tente mais tarde`

- Sempre que apresentar uma mensagem para o usuário, ou tiver os dados em mãos para apresentar, ocultar o loader [x]
  * Quando a aplicação possui uma resposta a respeito do fetch na API, ela oculta o loader para fornecer a informação em tela.

- Incluir um campo de busca, que permite localizar jogos pelo título, com busca case insensitive [x]
  * No header da aplicação está um campo de busca que procura pelo nome do jogo e retorna o resultado, seja ele positivo (que o jogo foi encontrado) ou não.

- Uma vez que tenha os dados em mãos, veja quais `genre` foram retornados e permita ao usuário selecionar um deles, e então filtre para exibir apenas jogos do gênero selecionado [x]
  * Um filtro foi adicionado na home para selecionar jogos conforme o gênero que preferir através de uma droplist que contém todos os gêneros disponíveis.

### Screenshots

A página inicial da aplicação.
![Página inicial da aplicação.]('./screenshots/screenshot-one')

Filtrando os jogos por categoria.
![Filtrando os jogos por categoria.]('./screenshots/screenshot-two')

Pesquisando jogos com uma parte do nome na barra de pesquisa.
![Pesquisando jogos com uma parte do nome na barra de pesquisa.]('./screenshots/screenshot-two')



## Como executar este projeto?

Entre no diretório do projeto e execute:

### `npm start`

Ou visite a página da aplicação [clicando aqui.](https://list-games.vercel.app/)


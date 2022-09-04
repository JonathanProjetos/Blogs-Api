# Blogs-Api

# Contexto

Nesta aplicação foi desenvolvido uma API e um banco de dados, com intuito de produzir conteúdo para um blog.  A aplicação segue os princípios REST.  Para acessar os endereços da aplicação, é necessário fazer autenticação e quando autenticado a API responderá  trazendo um token no corpo da requisição. O token deverá ser inserido no cabeçalho de cada requisição privada, com  o intuito de autenticação. A arquitetura da aplicação  se baseia em relações entre usuário por postagem  e de postagem por categorias.  Dentro do projeto existe um diagrama exemplificando estas ligações.

## Importante:

- E aconselhável o uso de softwares de envio de requisições REST como:
- [Insomia](https://insomnia.rest/)
- [Postman](https://www.postman.com/)
- [Httpie](https://httpie.io/)

## Detalhes das rotas

#### Verbo Post : http://localhost:3000/login

##### Esperado
 - O corpo da requisição deverá seguir o formato abaixo:
 
 ```json
 
  {
    "email": "Blogs-Api@gmail.com",
    "password": "123456"
  }
 
 ```
 - Se o login foi feito com sucesso o resultado retornado deverá ser conforme exibido abaixo, com um status http 200
 
 ```json
 
 {
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjo1LCJkaXNwbGF5TmFtZSI6InVzdWFyaW8gZGUgdGVzdGUiLCJlbWFpbCI6InRlc3RlQGVtYWls
   LmNvbSIsImltYWdlIjoibnVsbCJ9LCJpYXQiOjE2MjAyNDQxODcsImV4cCI6MTYyMDY3NjE4N30.Roc4byj6mYakYqd9LTCozU1hd9k_Vw5IWKGL4hcCVG8"
 }
 
 ```
    
#### Verbo Post : http://localhost:3000/user

##### Esperado

 - O corpo da requisição deverá seguir o formato abaixo:

  ```json
{
  "displayName": "Brett Wiltshire",
  "email": "brett@email.com",
  "password": "123456",
  "image": "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
}
     
 ```
 - Se o user for criado com sucesso o resultado retornado deverá ser conforme exibido abaixo, com um status http 201:
 
 ```json
   
 {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjo1LCJkaXNwbGF5TmFtZSI6InVzdWFyaW8gZGUgdGVzdGUiLCJlbWFpbCI6InRlc3RlQGVtYWls
    LmNvbSIsImltYWdlIjoibnVsbCJ9LCJpYXQiOjE2MjAyNDQxODcsImV4cCI6MTYyMDY3NjE4N30.Roc4byj6mYakYqd9LTCozU1hd9k_Vw5IWKGL4hcCVG8"
 }
 
 ```
    
#### Verbo Get : http://localhost:3000/User

##### Esperado

- Ao listar usuários com sucesso o resultado retornado deverá ser conforme exibido abaixo, com um status http 200.

  ```json
  [
    {
      "id": 1,
      "displayName": "Lewis Hamilton",
      "email": "lewishamilton@gmail.com",
      "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
    },

    /* ... */
  ]
  ```

#### Verbo Get : http://localhost:3000/user/:id

##### Esperado

- Ao listar um usuário com sucesso o resultado retornado deverá ser conforme exibido abaixo, com um status http 200:
> exemplo id: 1

 ```json
  {
    "id": 1,
    "displayName": "Lewis Hamilton",
    "email": "lewishamilton@gmail.com",
    "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
  }
 ```   

#### Verbo Post : http://localhost:3000/categories

##### Esperado

- O corpo da requisição deverá seguir o formato abaixo:

  ```json
  {
     "name": "Blogs"
  }

  ```

#### Verbo Get : http://localhost:3000/categories

##### Esperado

 - O endpoint traz todas as caretorias existentes no banco.

```json
 [
  {
      "id": 1,
      "name": "Inovação"
  },
  {
      "id": 2,
      "name": "Escola"
  },

  /* ... */
]
``` 
#### Verbo Post : http://localhost:3000/post

##### Esperado

- O endpoint deve ser capaz de adicionar um novo blog post e vinculá-lo às categorias em suas tabelas no banco de dados.
- O corpo da requisição deverá seguir o formato abaixo:

 ```json
{
  "title": "guia",
  "content": "A todo momento procuramos maneira de diversificar nossas postagens",
  "categoryIds": [1, 2]
}
```
    
#### Verbo Get : http://localhost:3000/post

##### Esperado

- Ao listar posts com sucesso o resultado retornado deverá ser conforme exibido abaixo, com um status http 200:


 ```json
 [
   {
     "id": 1,
     "title": "Post do Ano",
     "content": "Melhor post do ano",
     "userId": 1,
     "published": "2011-08-01T19:58:00.000Z",
     "updated": "2011-08-01T19:58:51.000Z",
     "user": {
       "id": 1,
       "displayName": "Lewis Hamilton",
       "email": "lewishamilton@gmail.com",
       "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
     },
     "categories": [
       {
         "id": 1,
         "name": "Inovação"
       }
     ]
   },
  
   /* ... */
 ]
  ```
#### Verbo Get : http://localhost:3000/post/:id

##### Esperado

- O endpoint deve ser capaz de trazer o blog post baseado no id do banco de dados se ele existir;
> exemplo id: 1

 ```json
 {
  "id": 1,
  "title": "Post do Ano",
  "content": "Melhor post do ano",
  "userId": 1,
  "published": "2011-08-01T19:58:00.000Z",
  "updated": "2011-08-01T19:58:51.000Z",
  "user": {
      "id": 1,
      "displayName": "Lewis Hamilton",
      "email": "lewishamilton@gmail.com",
      "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
  },
  "categories": [
      {
          "id": 1,
          "name": "Inovação"
      }
   ]
 }
  ```
#### Verbo Put : http://localhost:3000/post/:id

##### Esperado

- O endpoint deve ser capaz de alterar um post do banco de dados, se ele existir;
- O corpo da requisição deverá seguir o formato abaixo:

> exemplo id: 1

 ```json
 
  {
    "title": "Novidade",
    "content": "Aqui sempre fez história"
  }

 ```
#### Verbo Delete http://localhost:3000/post/:id

##### Esperado

- O endpoint deve ser capaz de deletar um blog post baseado no id do banco de dados se ele existir;

> exemplo id: 1

- Se o blog post for deletado com sucesso não deve ser retornada nenhuma resposta, apenas um status http 204:

 ```
 
#### Verbo Delete http://localhost:3000/user/me

##### Esperado

- O endpoint deve ser capaz de deletar você do banco de dados.

- Se o user for deletado com sucesso não deve ser retornada nenhuma resposta, apenas um status http 204.


#### Verbo Delete http://localhost:3000/post/search?q=:searchTerm

##### Esperado

- O endpoint deve ser capaz de trazer os blogs post baseados no q do banco de dados, se ele existir.

- O query params da requisição deverá seguir o formato abaixo:

```json
    http://localhost:PORT/post/search?q=vamos
```

## Técnologias usadas

> Desenvolvido em nodejs.

> Framework utilizado: Express.

> Libs: nodemon, eslint, nodemon, express-rescue, crypto-js, body-parser

## Instalando Dependências

> Node
```bash
cd Talker-Manager/
npm install
``` 
> Docker
```
cd Talker-Manager/
npm install
docker-compose up -d
```
## Rodando a aplicação
```
cd Talker-Manager/
npm run dev
```

## Aviso Importante 
Caso queira roda a aplicação via docker deverá ter o docker instalado no dispositivo, caso não esteja instalado você pode encontra como instalar neste [link](https://docs.docker.com/engine/install/ubuntu/) site oficial 




# 🚧 README em construção 🚧

<!-- Olá, Tryber!

Esse é apenas um arquivo inicial para o README do seu projeto.

É essencial que você preencha esse documento por conta própria, ok?

Não deixe de usar nossas dicas de escrita de README de projetos, e deixe sua criatividade brilhar!

⚠️ IMPORTANTE: você precisa deixar nítido:
- quais arquivos/pastas foram desenvolvidos por você; 
- quais arquivos/pastas foram desenvolvidos por outra pessoa estudante;
- quais arquivos/pastas foram desenvolvidos pela Trybe.

-->

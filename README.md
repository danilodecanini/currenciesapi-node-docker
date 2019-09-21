# Currency API 
API criada para obter os atuais valores do Dolar (BRL/Real) e a Taxa da Selic.

# Como funciona?
Quando requisitada a API pelo Front-end a API verifica se o registro gravado no banco de dados é mais antigo que o valor colocado nos minutos no .env e se for ele busca na API principal e atualiza o registro no banco de dados, pois a API principal na HGBrasil tem um limite de 400 requisções por dia. 

## Tecnologias
- Node.js
- Docker 
- MongoDB

## Como utilizar
- git clone
- Renomear o arquivo .env.example para .env 
- Inserir a chave da API adquirida em https://console.hgbrasil.com
- Alterar os minutos de intervalo para o desejado para obter os novos valores no arquivo .env para  
- docker-compose up

## License
MIT


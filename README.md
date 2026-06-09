# SpaceConnectApp

## Mobile Development Global Solution

Projeto mobile desenvolvido para a Global Solution da disciplina de Mobile Development, com foco no uso de dados climáticos e informações ambientais para apoiar a consulta, a prevenção e a conscientização sobre riscos naturais.

## Integrantes

- Guilherme Santos Nunes – RM558989
- Kaique Rodrigues Zaffarani – RM556677
- Kairo da Silva Silvestre de Carvalho – RM558288
- Pedro Josué Pereira Almeida – RM554913

## Docente

ANDERSON SILVA NASCIMENTO

## Sobre a solução

O SpaceConnectApp é uma aplicação mobile desenvolvida com Expo e React Native para consultar dados climáticos de uma cidade informada pelo usuário e exibir informações relacionadas ao clima atual, à previsão semanal e a eventos naturais em ocorrência no mundo.

A solução utiliza a Open-Meteo API para buscar a localização da cidade, dados climáticos atuais e previsões dos próximos sete dias. Esses dados são apresentados em cards, gráficos e listas, permitindo que o usuário visualize temperatura, umidade, chance de chuva, precipitação e velocidade do vento.

A aplicação também consome a EONET API da NASA para listar eventos naturais abertos, como incêndios, enchentes, secas, vulcões, deslizamentos e tempestades. Os eventos podem ser acessados em uma tela de detalhes, onde são exibidas informações resumidas, recomendações preventivas por categoria e links externos relacionados a conteúdos da NASA.

O projeto conta com armazenamento local por meio do Async Storage, utilizado para manter a última cidade analisada, os dados climáticos consultados, eventos favoritos, tema claro/escuro e informações de perfil do usuário. A navegação é organizada por stack navigation e bottom tabs, com telas para Home, Semana, Favoritos, Configurações, Cadastro de cidade e Detalhes de eventos.

## Tecnologias utilizadas

| Tecnologia | Uso no projeto |
| --- | --- |
| Expo SDK | Utilizado como base para execução e desenvolvimento da aplicação mobile. |
| React Native | Utilizado para construção das telas, componentes visuais, listas, cards, formulários e interações do aplicativo. |
| TypeScript | Utilizado para tipagem de dados climáticos, eventos naturais, parâmetros de navegação e componentes. |
| React | Utilizado para criação de componentes funcionais, estados, efeitos e contextos da aplicação. |
| React Navigation Native Stack | Utilizado para controlar a navegação principal entre cadastro de cidade, abas da aplicação e detalhes de evento. |
| React Navigation Bottom Tabs | Utilizado para organizar as telas Home, Semana, Favoritos e Settings em abas inferiores. |
| Async Storage | Utilizado para armazenamento local de clima consultado, favoritos, tema e dados de perfil/preferências do usuário. |
| Axios | Utilizado para realizar requisições HTTP para as APIs Open-Meteo e EONET/NASA. |
| Expo Blur | Utilizado para aplicar efeito de desfoque no fundo da barra de abas inferior. |
| Expo Linear Gradient | Utilizado nos cards de eventos naturais para compor o estilo visual com gradiente. |
| React Native Gifted Charts | Utilizado para renderizar gráficos de barras da previsão semanal e gráfico circular de chance de chuva. |
| Open-Meteo API | Utilizada para buscar geocodificação, clima atual e previsão semanal. |
| NASA EONET API | Utilizada para buscar eventos naturais abertos em ocorrência no mundo. |

## Como executar o projeto

### Pré-requisitos

* Node.js instalado.
* npm instalado.
* Expo Go no dispositivo físico ou um emulador Android/iOS configurado.

### Instalar dependências

A partir da raiz deste repositório, acesse a pasta do aplicativo:

```bash
cd SpaceConnectApp
```

Instale as dependências:

```bash
npm install
```

### Iniciar a aplicação

O script principal definido no `package.json` é:

```bash
npm run start
```

Esse comando executa o Expo. Depois disso, é possível abrir o app pelo Expo Go, escaneando o QR Code exibido no terminal, ou utilizar as opções do Expo para emulador.

Também existem scripts específicos:

```bash
npm run android
```

```bash
npm run ios
```

```bash
npm run web
```

## Estrutura do projeto

```text
SpaceConnectApp/
|-- App.tsx
|-- index.ts
|-- app.json
|-- package.json
|-- assets/
|-- src/
    |-- assets/
    |-- components/
    |-- contexts/
    |-- hooks/
    |-- navigation/
    |-- screens/
    |-- services/
    |-- storage/
    |-- theme/
    |-- types/
```

| Pasta/arquivo | Responsabilidade |
| --- | --- |
| `App.tsx` | Configura os providers de usuário e tema, além do container de navegação principal. |
| `index.ts` | Ponto de entrada da aplicação Expo. |
| `app.json` | Configurações do app Expo, como nome, ícones, splash screen e orientação. |
| `assets/` | Arquivos visuais padrão do Expo, como ícone, splash e favicon. |
| `src/assets/images/` | Imagens usadas na interface, como logo, ícones de abas, sol, lua e setas. |
| `src/components/` | Componentes reutilizáveis, como cards, botões de filtro e gráficos. |
| `src/contexts/` | Contextos globais de tema e usuário. |
| `src/hooks/` | Hooks de acesso aos contextos de tema e usuário. |
| `src/navigation/` | Configuração da stack navigation e da bottom tab navigation. |
| `src/screens/` | Telas principais da aplicação. |
| `src/services/` | Serviços de consumo das APIs externas e regras auxiliares de favoritos/preferências. |
| `src/storage/` | Funções de persistência local usando Async Storage. |
| `src/theme/` | Definições de tema claro e tema escuro. |
| `src/types/` | Tipagens TypeScript para clima, previsão, eventos e navegação. |

# Aplicação

## Entrada / busca de cidade
<img width="358" height="595" alt="image" src="https://github.com/user-attachments/assets/bd5a1c51-e427-4ede-b660-2e7b52ad6c02" />


A primeira tela exibida quando não há clima salvo localmente solicita que o usuário informe uma cidade. Ao realizar a busca, a aplicação:

* Consulta a Open-Meteo Geocoding API para localizar a cidade informada.
* Busca a previsão dos próximos sete dias.
* Busca os dados climáticos atuais.
* Salva localmente os dados retornados.
* Redireciona o usuário para as abas principais da aplicação.
* Exibe mensagem de erro quando a cidade não é informada, não é encontrada ou a busca falha.

## Home
<img width="358" height="602" alt="image" src="https://github.com/user-attachments/assets/747e07a5-3db1-48be-8f8d-9daa12650e60" />


A tela Home apresenta um resumo climático da cidade analisada e uma seção de eventos naturais em ocorrência no mundo.

Funcionalidades implementadas:

* Exibição da cidade consultada e da data atual dos dados climáticos.
* Exibição de temperatura atual.
* Indicador visual de dia ou noite com imagens de sol e lua.
* Exibição de chance de chuva, umidade e vento.
* Gráfico circular para representar a chance de chuva.
* Mensagem de recomendação baseada na temperatura atual.
* Gráfico de barras com dados semanais.
* Alternância do gráfico semanal entre temperatura máxima, temperatura mínima, vento e chuva.
* Listagem horizontal de eventos naturais obtidos pela EONET API da NASA.
* Cards clicáveis de eventos, com navegação para detalhes.
* Botão para favoritar ou remover eventos dos favoritos.
* Indicação da fonte dos eventos: EONET API - NASA.

## Semana / previsão semanal
<img width="356" height="602" alt="image" src="https://github.com/user-attachments/assets/72ce27b1-153c-48fb-8d28-cf6eb0eb0816" />


A tela Semana lista a previsão dos próximos sete dias com base na cidade salva pelo usuário.

Funcionalidades implementadas:

* Listagem de cards de previsão semanal.
* Exibição do dia da semana e da data.
* Exibição de temperatura máxima e mínima.
* Exibição de chance de chuva.
* Exibição de velocidade do vento.
* Campo de pesquisa por dia da semana.
* Ordenação por temperatura, chuva e vento.
* Filtros por todos os dias, dias quentes, frios, chuvosos e ventosos.
* Expansão e recolhimento das seções de ordenação e filtros.

## Favoritos
<img width="356" height="604" alt="image" src="https://github.com/user-attachments/assets/9e275c33-a328-4028-9634-f1ad7ba3341e" />

A tela Favoritos concentra os eventos naturais salvos pelo usuário e também oferece recursos de perfil e limpeza de preferências.

Funcionalidades implementadas:

* Listagem de eventos favoritados localmente.
* Uso dos mesmos cards clicáveis de eventos da Home.
* Remoção de favoritos pelo botão de favorito no card.
* Estado vazio quando nenhuma notícia/evento foi favoritado.
* Cadastro de tratamento do usuário, com opções como Sr., Sra., Dr. e Dra.
* Cadastro de nome de usuário.
* Salvamento local do perfil.
* Limpeza de preferências, incluindo cidade analisada, notícias favoritas, nome de usuário, tratamento e tema.

## Settings / configurações
<img width="361" height="595" alt="image" src="https://github.com/user-attachments/assets/706eff6f-b461-4c31-9ff9-01d2f0edaee8" />

A tela Settings possui a configuração de tema da aplicação.

Funcionalidades implementadas:

* Alternância entre tema claro e tema escuro.
* Persistência da escolha de tema no Async Storage.
* Texto dinâmico indicando a mudança para Light Mode ou Dark Mode.

## Detalhes do evento
<img width="356" height="602" alt="image" src="https://github.com/user-attachments/assets/9dec880f-e9f1-45d0-a656-ada8510c4169" />

A tela de detalhes é acessada ao tocar em um card de evento natural.

Funcionalidades implementadas:

* Exibição do título do evento.
* Exibição da categoria do evento.
* Exibição da data formatada.
* Recomendações preventivas para categorias como incêndios, enchentes, vulcões, secas, deslizamentos e tempestades severas.
* Botão para abrir conteúdos externos da NASA quando há link mapeado para a categoria do evento.

## APIs utilizadas

| API | Finalidade | Dados consumidos | Onde aparece na aplicação |
| --- | --- | --- | --- |
| Open-Meteo Geocoding API | Buscar a cidade informada pelo usuário e obter suas coordenadas. | Nome da cidade, latitude, longitude e dados de localização retornados pela busca. | Tela de entrada/busca de cidade. |
| Open-Meteo Forecast API | Buscar dados climáticos atuais e previsão dos próximos sete dias. | Temperatura atual, umidade relativa, precipitação, vento, indicador de dia/noite, temperatura máxima, temperatura mínima, chance de chuva e velocidade do vento. | Home, gráficos climáticos e tela Semana. |
| NASA EONET API | Buscar eventos naturais abertos em ocorrência recente no mundo. | Identificador, título, categoria e data dos eventos. | Seção "Ocorrendo no mundo", cards de eventos, Favoritos e Detalhes do Evento. |

## Armazenamento local

O projeto utiliza Async Storage para manter informações importantes entre execuções do aplicativo.

Dados persistidos da aplicação:

* Últimos dados climáticos consultados, salvos com previsão semanal, clima atual e nome da cidade.
* Eventos naturais favoritos.
* Preferência de tema claro ou escuro.
* Dados de perfil do usuário, como nome e tratamento.
* Preferências auxiliares de usuário utilizadas por serviços de perfil.

Também existem ações de limpeza de preferências que utilizam `AsyncStorage.clear()` para remover os dados salvos localmente.

## Funcionalidades principais

* Busca de cidade informada pelo usuário.
* Consulta de coordenadas por meio da Open-Meteo Geocoding API.
* Consulta de clima atual.
* Consulta de previsão semanal dos próximos sete dias.
* Exibição de temperatura, umidade, chuva, precipitação e vento.
* Exibição de recomendações baseadas na temperatura atual.
* Dashboard com gráfico circular de chance de chuva.
* Dashboard com gráfico de barras para métricas semanais.
* Alternância do gráfico entre temperatura máxima, temperatura mínima, vento e chuva.
* Pesquisa de previsão por dia da semana.
* Ordenação da previsão por temperatura, chuva e vento.
* Filtros por dias quentes, frios, chuvosos e ventosos.
* Consulta de eventos naturais abertos pela EONET API da NASA.
* Cards clicáveis de eventos naturais.
* Tela de detalhes com recomendações preventivas por categoria de evento.
* Links externos para conteúdos da NASA.
* Favoritar e remover eventos favoritos.
* Listagem local de favoritos.
* Cadastro local de nome de usuário e tratamento.
* Alternância entre tema claro e tema escuro.
* Armazenamento local de dados, preferências e favoritos.
* Navegação por stack navigation e bottom tabs.

## Considerações finais

O SpaceConnectApp demonstra como a tecnologia pode ser aplicada no contexto da Global Solution para integrar dados climáticos, informações ambientais e recursos de visualização em uma experiência mobile objetiva. A aplicação apoia a prevenção, a tomada de decisão e a conscientização dos usuários ao apresentar informações sobre clima, previsão semanal, eventos naturais e recomendações relacionadas a riscos ambientais.

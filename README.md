# Testes de performance da API do Banco

## Introdução

Repositório de testes de carga e desempenho da API bancária, escritos em JavaScript e executados com o k6. Os cenários verificam o login e a realização de transferências.

## Tecnologias utilizadas

- **JavaScript** para implementar os cenários de teste.
- **k6** para executar os testes e coletar métricas.
- **API bancária** como serviço sob teste.

## Estrutura do repositório

```text
.
├── config/
│   └── config.local.json
├── fixtures/
│   ├── postLogin.json
│   └── postTransferencias.json
├── helpers/
│   └── autenticacao.js
├── tests/
│   ├── login.test.js
│   └── transferencias.test.js
├── utils/
│   └── variaveis.js
├── html-report.html
└── README.md
```

## Objetivo de cada grupo de arquivos

- **`tests/`**: contém os cenários executáveis pelo k6. `login.test.js` testa o endpoint de login com estágios de carga e limites de desempenho; `transferencias.test.js` realiza uma transferência após obter um token.
- **`helpers/`**: contém funções reutilizáveis pelos cenários. `autenticacao.js` autentica e obtém o token necessário à transferência.
- **`fixtures/`**: contém os corpos JSON enviados nas requisições de login e transferência.
- **`utils/`**: contém utilitários compartilhados, como a leitura da URL base da API.
- **`config/`**: contém a configuração local, usada como valor alternativo quando `BASE_URL` não é informada.
- **`html-report.html`**: relatório HTML exportado pelo dashboard do k6 ao final da execução.

## Configuração das Variáveis de ambiente

O arquivo `config/config.local.json` define a URL base local da API pela propriedade `baseUrl`. Altere o valor para apontar para o endereço da API que deseja testar:

```json
{
  "baseUrl": "http://localhost:3000"
}
```

Essa propriedade é uma configuração do projeto, não uma variável de ambiente. Ao executar o k6, a variável `BASE_URL` passada com `-e` tem prioridade sobre `baseUrl`; se ela não for informada, será usada a URL do arquivo de configuração.

## Instalação e execução

1. Instale o [k6](https://grafana.com/docs/k6/latest/set-up/install-k6/) e confirme a instalação:

   ```powershell
   k6 version
   ```

2. Inicie a API bancária e informe sua URL ao k6 com a variável `BASE_URL`. Por exemplo, para executar o teste de login contra uma API local:

   ```powershell
   k6 run -e BASE_URL=http://localhost:3000 tests/login.test.js
   ```

   Para executar o teste de transferência:

   ```powershell
   k6 run -e BASE_URL=http://localhost:3000 tests/transferencias.test.js
   ```

### Acompanhamento e exportação do relatório

Para acompanhar as métricas em tempo real, habilite o dashboard web do k6. Ele ficará disponível em `http://localhost:5665` durante a execução. O relatório HTML configurado será exportado ao final do teste:

```powershell
$env:K6_WEB_DASHBOARD = "true"
$env:K6_WEB_DASHBOARD_EXPORT = "html-report.html"
k6 run -e BASE_URL=http://localhost:3000 tests/login.test.js
```

As variáveis do dashboard são as próprias variáveis de ambiente do k6, equivalentes a `K6_WEB_DASHBOARD=true` e `K6_WEB_DASHBOARD_EXPORT=html-report.html`. Para executar outro cenário, substitua o caminho do teste no comando `k6 run`.

# Controle de Despesas — Angular + TypeScript

Aplicação de estudo para registrar despesas pessoais, acompanhar o total gasto e visualizar lançamentos por categoria. O foco é praticar **formulários Angular, tipagem TypeScript, cálculos e filtros reativos**.

> Não é um aplicativo financeiro conectado a instituições bancárias. Os valores cadastrados servem apenas para organização local e aprendizado.

## Objetivo do projeto

Implementar um formulário com diferentes tipos de entrada e regras de validação, além de uma listagem que permita analisar registros e visualizar o somatório de valores no formato brasileiro.

## Funcionalidades implementadas

- Cadastrar despesa com **descrição**, **categoria** e **valor**.
- Categorias predefinidas: Alimentação, Transporte, Moradia, Estudos e Outros.
- Rejeitar descrição vazia e valores que não sejam positivos ou finitos.
- Listar despesas cadastradas com descrição, categoria e valor formatado em reais.
- Calcular o **total de todas as despesas registradas**.
- Contar o número total de lançamentos.
- Filtrar o histórico por categoria, com opção **Todas**.
- Excluir lançamentos.
- Manter os dados entre atualizações da página via `localStorage`.

**Atenção:** o valor mostrado no cartão “Total registrado” é o total **global**, mesmo quando o histórico estiver filtrado por categoria. Não há cálculo de subtotais por filtro na versão atual.

## Fluxo de utilização

1. Preencha a descrição (`Supermercado`, por exemplo).
2. Selecione uma categoria.
3. Informe um valor positivo, como `85.50` (a entrada do campo numérico pode variar conforme o navegador).
4. Clique em **Adicionar despesa**.
5. Confira o lançamento no histórico e o total atualizado.
6. Filtre por **Alimentação** ou outra categoria para visualizar somente os registros correspondentes.
7. Exclua um lançamento e verifique o recálculo do total.

## Detalhes técnicos

### Modelo TypeScript

```ts
interface Expense {
  id: number;
  description: string;
  category: string;
  value: number;
}
```

A interface garante uma estrutura uniforme nos registros, incluindo o valor como número.

### Formulário

O projeto importa `FormsModule` e utiliza `[(ngModel)]` nos campos. No método `add()`:

- `description.trim()` remove espaços nas extremidades.
- `Number(this.amount)` converte o valor recebido.
- `Number.isFinite(value)` e `value <= 0` impedem valores inválidos ou não positivos.
- O objeto criado é inserido no início da lista.

Não são usados `ReactiveForms` nem bibliotecas adicionais de formulários neste projeto.

### Signals e cálculos

- `expenses = signal<Expense[]>(...)`: estado da lista.
- `selectedCategory = signal('Todas')`: categoria do filtro.
- `total = computed(...)`: soma todos os valores com `reduce()`.
- `filtered = computed(...)`: retorna despesas correspondentes à categoria selecionada.

### Formatação monetária

A função `money()` utiliza `toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })` para exibir os valores em reais.

### Persistência local

A chave utilizada no navegador é `angular-portfolio-expenses`. Os dados não são enviados a servidores e podem desaparecer ao limpar os dados do site.

## Validação manual sugerida

- [ ] Cadastrar uma despesa válida
- [ ] Tentar cadastrar sem descrição
- [ ] Tentar cadastrar valor zero ou negativo
- [ ] Cadastrar duas despesas e conferir a soma exibida
- [ ] Filtrar por categoria e conferir a lista
- [ ] Confirmar que o total global não muda ao aplicar filtros
- [ ] Excluir uma despesa e conferir novo total
- [ ] Atualizar a página e verificar a persistência

## Limitações e melhorias futuras

- O total não é agrupado por mês nem por categoria.
- Não há edição de lançamentos, receitas, orçamento ou gráficos.
- Para aplicações financeiras reais, valores monetários merecem tratamento de precisão mais rigoroso (por exemplo, centavos inteiros).
- Adicionar filtros por período, subtotais, componentes reutilizáveis e testes automatizados são boas evoluções.
- Uma futura API poderia armazenar os dados em banco, com autenticação e sincronização.

## Tecnologias

- Angular 20 (componentes standalone e sintaxe de controle de fluxo `@for`/`@if`)
- TypeScript 5.9
- HTML5 e CSS3
- Angular CLI para desenvolvimento e build
- Sem API externa ou banco de dados no estágio atual

## Pré-requisitos

- Node.js e npm instalados (use uma versão de Node.js compatível com Angular 20)
- Editor como Visual Studio Code
- Navegador moderno

Confira as versões locais:

```bash
node --version
npm --version
```

## Instalação e execução

Clone o repositório (substitua a URL por aquela publicada no seu perfil) e acesse a pasta do projeto:

```bash
git clone https://github.com/SEU-USUARIO/NOME-DO-REPOSITORIO.git
cd NOME-DO-REPOSITORIO
npm install
npm start
```

Abra **http://localhost:4200**. Alternativamente, use `npx ng serve`.

Para gerar a compilação de produção:

```bash
npm run build
```

A saída é criada dentro da pasta `dist/` (conforme `angular.json`). O código-fonte fica em `src/`. Se a porta 4200 já estiver ocupada, use `npx ng serve --port 4201`.

## Organização dos arquivos

```text
.
├── src/
│   ├── app/
│   │   ├── app.component.ts     # Estado, lógica e ações da interface
│   │   └── app.component.html   # Template e interações Angular
│   ├── index.html               # Documento base
│   ├── main.ts                  # Bootstrap da aplicação
│   └── styles.css               # Estilos globais
├── angular.json                 # Configuração Angular CLI
├── package.json                 # Dependências e scripts
├── tsconfig.json                # Configurações TypeScript
└── README.md                    # Documentação
```

> Este é um exemplo deliberadamente compacto: a lógica está concentrada no componente raiz. Ainda não há módulos de domínio, roteamento entre telas nem integração com backend.

## Scripts disponíveis

| Comando | Finalidade |
|---|---|
| `npm install` | Instala as dependências |
| `npm start` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera o build de produção |
| `npm run test` | Script declarado em `package.json`, **sem suíte/configuração de testes incluída nesta entrega**; não considere testes automatizados implementados |

## Status e limitações

- Projeto de **estudo e portfólio**, não uma solução de produção.
- Ainda **não foram executados `npm install`, build e testes neste ambiente**; valide tudo localmente antes de publicar.
- Não há autenticação, banco de dados, API externa, pipeline de CI/CD ou suíte automatizada de testes.
- Não há imagens reais da aplicação no repositório. Se quiser, adicione capturas próprias após executar o projeto, em uma pasta `docs/`, e referencie-as neste README.

## Publicação no GitHub

Na raiz deste projeto, depois de testar localmente:

```bash
git init
git add .
git commit -m "feat: adiciona projeto Angular inicial"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/NOME-DO-REPOSITORIO.git
git push -u origin main
```

Crie primeiro um repositório vazio no GitHub. **Não envie a pasta `node_modules/`**, que já está ignorada no `.gitignore`. Se o projeto for parte de um repositório único com os três aplicativos, rode os comandos Git na raiz do portfólio, e não dentro de cada subpasta.

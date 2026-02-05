# Bird Bones Website

Website oficial da banda Bird Bones, uma banda punk de Itapetininga, SP.

## 🎸 Sobre

Este é o site da banda Bird Bones, feito com HTML, CSS e JavaScript. O site inclui:

- Página inicial com informações sobre a banda
- Seção de notícias
- Página de música com links para streaming
- Galeria de fotos interativa
- Seção de merchandising (em breve)
- Livro de recados (guestbook) com backend em Vercel

## 🚀 Novidades: Sistema de Recados com Vercel

### O que mudou?

Antes, o livro de recados só funcionava no navegador (dados eram perdidos ao recarregar a página). Agora:

✅ **Dados persistentes**: Os recados são armazenados e persistem entre sessões  
✅ **Backend em Vercel**: API serverless para gerenciar os comentários  
✅ **Segurança**: Validação de entrada e proteção contra XSS  
✅ **Interface melhorada**: Exibição de data/hora e layout mais organizado  

### Como funciona?

1. **Frontend**: Quando o visitante acessa a seção "RECADOS", o site carrega automaticamente os comentários existentes
2. **Backend**: API em `/api/comments` gerencia o CRUD (Create, Read) de comentários
3. **Persistência**: Dados são armazenados na memória do serverless function (para persistência permanente, seria necessário conectar a um banco de dados)

## 📁 Estrutura do Projeto

```
BirdBones-main/
├── index.html              # Página principal
├── api/
│   └── comments.js         # API para gerenciar recados
├── fotosensaio/            # Fotos da galeria
├── package.json            # Configurações do projeto
├── vercel.json             # Configuração de deploy no Vercel
└── README.md              # Este arquivo
```

## 🌐 Deploy no Vercel

### Passo a passo:

1. **Fazer fork ou clonar o repositório**
   ```bash
   git clone https://github.com/seu-usuario/BirdBones-main.git
   cd BirdBones-main
   ```

2. **Conectar ao Vercel**
   - Acesse [vercel.com](https://vercel.com)
   - Crie uma conta (se ainda não tiver)
   - Conecte seu repositório GitHub

3. **Configurar o projeto**
   - O Vercel detectará automaticamente que é um projeto com API routes
   - As configurações padrão já estão no `vercel.json`
   - Clique em "Deploy"

4. **Pronto!** 🎉
   - Seu site estará no ar em poucos minutos
   - A URL será algo como: `https://bird-bones-seuusername.vercel.app`

### Configurações importantes

- **API Routes**: O Vercel automaticamente cria endpoints para arquivos na pasta `/api`
- **Serverless Functions**: Cada arquivo `.js` na pasta `/api` vira uma função serverless
- **Persistência**: Atualmente os dados são armazenados na memória (para dados permanentes, seria necessário conectar a um banco de dados)

## 🔧 Para desenvolvedores

### Testar localmente

Para testar localmente, você precisará de um servidor HTTP simples:

```bash
# Instalar servidor HTTP (se precisar)
npm install -g http-server

# Iniciar servidor
http-server

# Acessar http://localhost:8080
```

### API Endpoints

- `GET /api/comments` - Lista todos os comentários (ordenados por data)
- `POST /api/comments` - Cria um novo comentário
  - Body: `{ "name": "Seu Nome", "message": "Sua mensagem" }`

### Para persistência permanente

Para tornar os dados permanentes, você precisaria:

1. **Conectar a um banco de dados** (Vercel Postgres, PlanetScale, etc.)
2. **Atualizar a API** para usar o banco de dados ao invés da memória
3. **Configurar variáveis de ambiente** para credenciais do banco

## 🗄️ Configurar Vercel Postgres (banco de dados) e variáveis de ambiente

Se você quer que os recados fiquem salvos permanentemente, use o Vercel Postgres e configure a variável de ambiente `DATABASE_URL` no projeto do Vercel.

Passos rápidos:

1. No dashboard do Vercel, abra o projeto e vá em **Add > Vercel Postgres** (ou procure por "Postgres" na seção de Add-ons). Crie uma instância gratuita ou escolha o plano desejado.
2. Após criada, copie a *Connection String* (ela tem o formato `postgres://USER:PASS@HOST:PORT/DATABASE`).
3. No projeto Vercel, abra **Settings → Environment Variables** e adicione uma variável chamada `DATABASE_URL` com o valor da Connection String.
4. Re-deploy do projeto (ou faça novo deploy via Git). O Vercel injeta `DATABASE_URL` nas serverless functions automaticamente.

Observação: a API em `/api/comments` já foi atualizada para usar `DATABASE_URL` (conexão via `pg`) e cria a tabela `comments` automaticamente na primeira chamada.

## 🧪 Testes locais (com `DATABASE_URL` de teste)

Se você quiser que eu rode testes locais aqui, forneça uma `DATABASE_URL` de teste (uma string de conexão para um Postgres acessível). Caso prefira testar localmente, siga estes passos:

1. Exporte a variável `DATABASE_URL` no seu terminal (macOS/Linux):

```bash
export DATABASE_URL="postgres://USER:PASSWORD@HOST:PORT/DATABASE"
```

2. Inicie o desenvolvimento local com o Vercel CLI (recomendado):

```bash
npm i -g vercel
vercel dev
```

3. Em outro terminal, rode os testes via `curl`:

```bash
# Listar recados
curl http://localhost:3000/api/comments

# Criar recado
curl -X POST http://localhost:3000/api/comments \
   -H "Content-Type: application/json" \
   -d '{"name":"Teste","message":"Olá do ambiente local"}'

# Deletar recado (exemplo id=1)
curl -X DELETE http://localhost:3000/api/comments \
   -H "Content-Type: application/json" \
   -d '{"id":1}'
```

Se você me fornecer a `DATABASE_URL` aqui (como mensagem), eu posso executar os mesmos testes dentro deste ambiente e confirmar que GET/POST/DELETE funcionam.


## 🎨 Design

O site tem um design "bulletin board" (quadro de recados) com:
- Papel envelhecido
- Fotos em polaroid
- Estilo punk/underground
- Tipografia especial para cada seção

## 📱 Responsivo

O site é totalmente responsivo e funciona bem em:
- Desktop
- Tablets
- Celulares

## 🤝 Contribuições

Contribuições são bem-vindas! Siga estes passos:

1. Faça um fork do projeto
2. Crie uma branch: `git checkout -b feature/nome-da-feature`
3. Faça commit das suas alterações: `git commit -m 'Adiciona nova feature'`
4. Dê push para a branch: `git push origin feature/nome-da-feature`
5. Abra um Pull Request

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🙏 Agradecimentos

Aos fãs que deixam recados e apoiam a banda! 🤘

---

**BIRD BONES** - PRIMEIRA BANDA DO MUNDO // EST. 2025# birdbonespunk

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

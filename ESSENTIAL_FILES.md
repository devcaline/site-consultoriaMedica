# Arquivos Essenciais para Build

Este documento lista os arquivos que devem estar presentes na pasta `dist` após cada build.

## Arquivos Essenciais

### 1. `enviar-formulario.php`
- **Localização no código fonte:** `public/enviar-formulario.php`
- **Função:** Backend PHP para processar envio de formulários de contato
- **Importante:** Este arquivo é copiado automaticamente pelo script de pós-build

### 2. `.htaccess`
- **Localização no código fonte:** `public/.htaccess`
- **Função:** Configurações do servidor Apache (SPA routing, cache, compressão, segurança)
- **Importante:** Este arquivo é copiado automaticamente pelo script de pós-build

## Como Funciona

### Script de Pós-Build
O script `scripts/copy-essential-files.js` é executado automaticamente após cada build (`npm run build`) e copia os arquivos essenciais de `public/` para `dist/`.

### Scripts Disponíveis

- `npm run build` - Build normal (executa o script de pós-build automaticamente)
- `npm run build:complete` - Build completo com verificação explícita
- `npm run postbuild` - Executa apenas o script de cópia de arquivos essenciais

## Manutenção

### Adicionar Novo Arquivo Essencial

1. Adicione o arquivo na pasta `public/`
2. Edite `scripts/copy-essential-files.js` e adicione o nome do arquivo no array `essentialFiles`:

```javascript
const essentialFiles = [
  'enviar-formulario.php',
  '.htaccess',
  'novo-arquivo.php' // Adicione aqui
];
```

### Verificar Arquivos Após Build

Sempre verifique se os arquivos essenciais estão presentes na pasta `dist/` antes de fazer deploy:

```bash
# Verificar arquivos
ls dist/enviar-formulario.php
ls dist/.htaccess
```

## Problemas Comuns

### Arquivo não aparece na dist após build

**Solução:** 
1. Verifique se o arquivo está em `public/`
2. Verifique se o nome está correto no array `essentialFiles` do script
3. Execute manualmente: `npm run postbuild`

### Arquivo foi modificado manualmente na dist

**Atenção:** Modificações manuais na pasta `dist/` serão perdidas no próximo build!

**Solução:** 
1. Copie o arquivo modificado para `public/`
2. Faça um novo build: `npm run build`

## Notas Importantes

- ✅ **Nunca edite arquivos diretamente na pasta `dist/`**
- ✅ **Sempre edite arquivos em `public/` ou no código fonte**
- ✅ **A pasta `dist/` é gerada automaticamente e pode ser deletada/reconstruída**
- ✅ **Use `npm run build:complete` para garantir que todos os arquivos estão presentes**

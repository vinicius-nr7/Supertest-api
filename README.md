# Supertest + Jest

Este projeto contém uma suíte de testes automatizados para uma API de reservas, desenvolvida em Node.js.
Ele usa o Jest como framework de testes e o Supertest para simular requisições HTTP à API.

## Como usar

- Instale as dependências:
  - `npm install`
- Execute todos os testes:
  - `npm test`
- Execute um teste específico:
  - `npm test -- --testNamePattern="cadastrar uma reserva"`

## Estrutura

- `tests/` — arquivos de teste com as suites do Jest

## Integração contínua

Este projeto inclui uma workflow GitHub Actions em `.github/workflows/ci.yml`.
A pipeline executa automaticamente em `push` e `pull_request` na branch `main` e realiza:

- `npm install`
- `npm test`

## Objetivo

Garantir que a API de reservas se comporte corretamente em cenários reais, validando tanto a criação quanto a gestão de reservas via endpoints HTTP.
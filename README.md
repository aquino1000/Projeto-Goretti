# CS50 Guide BR

Aplicação web em **Java + Spring Boot + Thymeleaf** que funciona como um e-book interativo em português para iniciantes, inspirada no curso **CS50: Introduction to Computer Science** (Harvard).

## Requisitos
- Java 17+
- Maven 3.9+

## Como executar
```bash
mvn spring-boot:run
```

## Como abrir no navegador
Após iniciar, acesse:
- http://localhost:8080/

## Páginas disponíveis
- `/` Página inicial
- `/modules` Módulos
- `/chapter/{id}` Leitura de capítulo
- `/progress` Progresso com localStorage
- `/study-plan` Plano de estudos (8 semanas)
- `/exercises` Exercícios
- `/about` Sobre o curso

## Observações
- O conteúdo é um guia educacional em português e **não é afiliado oficialmente à Harvard University**.
- Estudo do CS50 pode ser gratuito na opção audit/free; certificado verificado pode exigir pagamento.

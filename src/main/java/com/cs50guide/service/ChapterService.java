package com.cs50guide.service;

import com.cs50guide.model.Chapter;
import com.cs50guide.model.Exercise;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ChapterService {

    public List<Chapter> getAllChapters() {
        List<Chapter> chapters = new ArrayList<>();
        chapters.add(new Chapter(1, "Capítulo 1 — O que é programação",
                "Entenda o que é programar, algoritmos e instruções.",
                "Programar é escrever instruções para o computador resolver problemas. " +
                        "Um algoritmo é uma sequência de passos lógicos, como uma receita. " +
                        "No CS50, você aprende a quebrar problemas grandes em pequenas tarefas claras.",
                "// Exemplo de algoritmo em pseudocódigo\n" +
                        "início\n" +
                        "  leia nome\n" +
                        "  escreva \"Olá, \" + nome\n" +
                        "fim",
                "Programar é transformar lógica em instruções que a máquina executa.",
                "Escreva um algoritmo (em português) para preparar um café em 6 passos."));

        chapters.add(new Chapter(2, "Capítulo 2 — Lógica de programação",
                "Variáveis, condições, laços e funções para resolver problemas.",
                "Lógica é o coração da programação. Você vai usar variáveis para guardar dados, " +
                        "if/else para decisões, loops para repetição e funções para organizar código reutilizável.",
                "int idade = 18;\nif (idade >= 18) {\n  System.out.println(\"Maior de idade\");\n}",
                "Com lógica, você controla fluxo e comportamento do programa.",
                "Crie uma lógica que imprima números de 1 a 10 usando loop."));

        chapters.add(new Chapter(3, "Capítulo 3 — C e pensamento computacional",
                "Por que começar com C ajuda a entender o computador.",
                "No CS50, C aparece cedo para mostrar como memória, tipos de dados e performance funcionam. " +
                        "Você aprende como o código conversa com o hardware de maneira mais direta.",
                "#include <stdio.h>\nint main(void){\n  printf(\"Hello, world!\\n\");\n}",
                "C ensina fundamentos profundos da computação.",
                "Pesquise o que é um ponteiro e explique com suas palavras."));

        chapters.add(new Chapter(4, "Capítulo 4 — Python para iniciantes",
                "Produtividade e simplicidade para evoluir rápido.",
                "Python reduz complexidade de sintaxe e permite foco no problema. " +
                        "É ótimo para iniciantes porque permite testar ideias rapidamente.",
                "nome = input('Seu nome: ')\nprint(f'Olá, {nome}!')",
                "Python acelera a construção de soluções úteis.",
                "Faça um programa que receba dois números e mostre a soma."));

        chapters.add(new Chapter(5, "Capítulo 5 — SQL e banco de dados",
                "Como guardar e consultar dados com eficiência.",
                "SQL é a linguagem para conversar com bancos de dados relacionais. " +
                        "Você aprende tabelas, registros e consultas para extrair informação.",
                "SELECT nome, email FROM usuarios WHERE ativo = 1;",
                "Banco de dados organiza informação e facilita análise.",
                "Modele uma tabela 'alunos' com id, nome e email."));

        chapters.add(new Chapter(6, "Capítulo 6 — HTML, CSS e JavaScript",
                "Base do desenvolvimento web moderno.",
                "HTML estrutura conteúdo, CSS estiliza e JavaScript traz interatividade. " +
                        "Juntos, são pilares para qualquer site ou aplicação web.",
                "<button onclick=\"alert('Olá!')\">Clique</button>",
                "A tríade HTML/CSS/JS transforma ideias em interfaces reais.",
                "Crie uma página simples com título, parágrafo e botão."));

        chapters.add(new Chapter(7, "Capítulo 7 — Segurança e boas práticas",
                "Proteja dados e escreva código mais confiável.",
                "Você verá conceitos como validação de entrada, senhas seguras, prevenção de bugs e " +
                        "boas práticas de organização. Segurança começa com hábitos corretos.",
                "if (senha.length() < 8) {\n  System.out.println(\"Senha fraca\");\n}",
                "Programar com segurança evita problemas graves no futuro.",
                "Liste 3 riscos de não validar dados enviados por usuários."));

        chapters.add(new Chapter(8, "Capítulo 8 — Projeto final",
                "Consolide tudo construindo algo do zero.",
                "No projeto final, você escolhe um problema real e aplica o que aprendeu. " +
                        "Pode ser um site, app simples ou ferramenta de produtividade.",
                "// Ideia: sistema de tarefas\n// recursos: criar, listar e concluir tarefas",
                "Projetos reais transformam conhecimento em portfólio.",
                "Defina um mini projeto com objetivo, público e 3 funcionalidades."));

        return chapters;
    }

    public Optional<Chapter> getChapterById(int id) {
        return getAllChapters().stream().filter(ch -> ch.getId() == id).findFirst();
    }

    public List<Exercise> getExercises() {
        return List.of(
                new Exercise(1, 1, "O que melhor define algoritmo?",
                        List.of("Uma linguagem específica", "Uma sequência de passos", "Um tipo de banco de dados"),
                        "Uma sequência de passos", "Desafio: escreva um algoritmo para escovar os dentes."),
                new Exercise(2, 2, "Qual estrutura repete um bloco várias vezes?",
                        List.of("if", "loop", "variável"),
                        "loop", "Desafio: use for para imprimir números pares até 20."),
                new Exercise(3, 3, "Por que aprender C no começo do CS50?",
                        List.of("Porque é a linguagem mais fácil", "Para entender memória e baixo nível", "Só para fazer sites"),
                        "Para entender memória e baixo nível", "Desafio: explique a diferença entre compilado e interpretado."),
                new Exercise(4, 4, "Python é conhecido por...",
                        List.of("Sintaxe complexa", "Facilidade de leitura", "Uso apenas acadêmico"),
                        "Facilidade de leitura", "Desafio: crie um script que peça nome e idade."),
                new Exercise(5, 5, "SQL serve para...",
                        List.of("Editar vídeos", "Consultar dados", "Criar slides"),
                        "Consultar dados", "Desafio: escreva uma consulta SELECT com filtro WHERE."),
                new Exercise(6, 6, "Quem estiliza uma página?",
                        List.of("HTML", "CSS", "SQL"),
                        "CSS", "Desafio: mude cor e fonte de um título em CSS."),
                new Exercise(7, 7, "Boa prática de segurança é...",
                        List.of("Confiar em toda entrada", "Validar dados do usuário", "Usar senha 123"),
                        "Validar dados do usuário", "Desafio: crie uma regra para senha forte."),
                new Exercise(8, 8, "Objetivo do projeto final é...",
                        List.of("Decorar teoria", "Aplicar conhecimentos na prática", "Evitar programação"),
                        "Aplicar conhecimentos na prática", "Desafio: descreva um projeto e 3 funcionalidades.")
        );
    }
}

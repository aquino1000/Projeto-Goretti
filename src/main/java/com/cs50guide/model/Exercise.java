package com.cs50guide.model;

import java.util.List;

/**
 * Representa um exercício de múltipla escolha/desafio.
 */
public class Exercise {
    private final int id;
    private final int chapterId;
    private final String question;
    private final List<String> options;
    private final String answer;
    private final String challenge;

    public Exercise(int id, int chapterId, String question, List<String> options, String answer, String challenge) {
        this.id = id;
        this.chapterId = chapterId;
        this.question = question;
        this.options = options;
        this.answer = answer;
        this.challenge = challenge;
    }

    public int getId() { return id; }
    public int getChapterId() { return chapterId; }
    public String getQuestion() { return question; }
    public List<String> getOptions() { return options; }
    public String getAnswer() { return answer; }
    public String getChallenge() { return challenge; }
}

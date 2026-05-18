package com.cs50guide.model;

/**
 * Representa um capítulo do eBook do CS50 Guide BR.
 */
public class Chapter {
    private final int id;
    private final String title;
    private final String shortDescription;
    private final String explanation;
    private final String codeExample;
    private final String summary;
    private final String exercise;

    public Chapter(int id, String title, String shortDescription, String explanation,
                   String codeExample, String summary, String exercise) {
        this.id = id;
        this.title = title;
        this.shortDescription = shortDescription;
        this.explanation = explanation;
        this.codeExample = codeExample;
        this.summary = summary;
        this.exercise = exercise;
    }

    public int getId() { return id; }
    public String getTitle() { return title; }
    public String getShortDescription() { return shortDescription; }
    public String getExplanation() { return explanation; }
    public String getCodeExample() { return codeExample; }
    public String getSummary() { return summary; }
    public String getExercise() { return exercise; }
}

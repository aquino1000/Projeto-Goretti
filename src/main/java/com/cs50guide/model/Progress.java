package com.cs50guide.model;

/**
 * Modelo simples para visualização de progresso no frontend.
 * O estado persistente real fica no localStorage do navegador.
 */
public class Progress {
    private int totalChapters;
    private int completedChapters;

    public Progress(int totalChapters, int completedChapters) {
        this.totalChapters = totalChapters;
        this.completedChapters = completedChapters;
    }

    public int getTotalChapters() { return totalChapters; }
    public void setTotalChapters(int totalChapters) { this.totalChapters = totalChapters; }
    public int getCompletedChapters() { return completedChapters; }
    public void setCompletedChapters(int completedChapters) { this.completedChapters = completedChapters; }

    public double getPercentage() {
        return totalChapters == 0 ? 0 : (completedChapters * 100.0) / totalChapters;
    }
}

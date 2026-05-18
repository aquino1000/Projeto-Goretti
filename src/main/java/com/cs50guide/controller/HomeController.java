package com.cs50guide.controller;

import com.cs50guide.model.Chapter;
import com.cs50guide.service.ChapterService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Controller
public class HomeController {

    private final ChapterService chapterService;

    public HomeController(ChapterService chapterService) {
        this.chapterService = chapterService;
    }

    @GetMapping("/")
    public String index(Model model) {
        model.addAttribute("siteName", "CS50 Guide BR");
        return "index";
    }

    @GetMapping("/modules")
    public String modules(Model model) {
        List<Chapter> chapters = chapterService.getAllChapters();
        model.addAttribute("chapters", chapters);
        return "modules";
    }

    @GetMapping("/chapter/{id}")
    public String chapter(@PathVariable int id, Model model) {
        Chapter chapter = chapterService.getChapterById(id).orElseThrow(() -> new IllegalArgumentException("Capítulo não encontrado"));
        model.addAttribute("chapter", chapter);
        model.addAttribute("nextChapterId", id < 8 ? id + 1 : 1);
        return "chapter";
    }

    @GetMapping("/progress")
    public String progress() {
        return "progress";
    }

    @GetMapping("/study-plan")
    public String studyPlan() {
        return "study-plan";
    }

    @GetMapping("/exercises")
    public String exercises(Model model) {
        model.addAttribute("exercises", chapterService.getExercises());
        return "exercises";
    }

    @GetMapping("/about")
    public String about() {
        return "about";
    }
}

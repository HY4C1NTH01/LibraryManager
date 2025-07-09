package org.example.LibraryManager.controller;

import org.example.LibraryManager.model.AvailableBooks;
import org.example.LibraryManager.model.CheckedOutBooks;
import org.example.LibraryManager.repository.AvailRepo;
import org.example.LibraryManager.repository.CheckedRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(maxAge = 3600)
@RestController
public class CheckedController {

    @Autowired
    private AvailRepo availRepo;

    @Autowired
    private CheckedRepo checkedRepo;

    @GetMapping("/seeCheckedBooks")
    public ResponseEntity<List<CheckedOutBooks>> getCheckedOutBooks() {
        return ResponseEntity.ok(checkedRepo.findAll());
    }

    @DeleteMapping(value = "/return/{title}",produces = MediaType.APPLICATION_JSON_VALUE)
    public String returnBook(@PathVariable String title) {
        CheckedOutBooks checked = checkedRepo.findCheckedOutBooksByTitle(title);
        AvailableBooks book = new AvailableBooks();
        book.setTitle(title);
        book.setAuthor(checked.getAuthor());
        book.setAbout(checked.getAbout());
        book.setGenre(checked.getGenre());
        availRepo.save(book);
        checkedRepo.delete(checked);

        return "You have returned " + title + ". Thank you, come Again";
    }

    @GetMapping("/bookInfo/{title}")
    public String bookInfo(@PathVariable String title){
        CheckedOutBooks book = checkedRepo.findCheckedOutBooksByTitle(title);
        return book.getAbout();
    }

}

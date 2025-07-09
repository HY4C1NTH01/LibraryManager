package org.example.LibraryManager.controller;

import org.example.LibraryManager.model.AvailableBooks;
import org.example.LibraryManager.model.CheckedOutBooks;
import org.example.LibraryManager.repository.AvailRepo;
import org.example.LibraryManager.repository.CheckedRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@CrossOrigin(maxAge = 3600)
@RestController
public class AvailController {

    @Autowired
    private AvailRepo availRepo;

    @Autowired
    private CheckedRepo checkedRepo;

    @GetMapping("/seeAvailBooks")
    public ResponseEntity<List<AvailableBooks>> getAvailableBooks() {
        return ResponseEntity.ok(availRepo.findAll());
    }

    @DeleteMapping(value = "/checkOut/{title}",produces = MediaType.APPLICATION_JSON_VALUE)
    public String checkOutBook(@PathVariable String title, @RequestParam String name){
        AvailableBooks book = availRepo.findAvailableBooksByTitle(title);
        CheckedOutBooks checked = new CheckedOutBooks();
        checked.setTitle(title);
        checked.setAuthor(book.getAuthor());
        checked.setAbout(book.getAbout());
        checked.setGenre(book.getGenre());
        checked.setCheckedOutBy(name);

        LocalDate today = LocalDate.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        String formattedDate = today.format(formatter);
        checked.setCheckOutDate(formattedDate);

        LocalDate due = today.plusWeeks(3);
        DateTimeFormatter formatter2 = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        String formattedDate2 = due.format(formatter2);
        checked.setDueReturnDate(formattedDate2);

        checkedRepo.save(checked);

        availRepo.delete(book);

        return title + " successfully checked out, Thank you";
    }

    @GetMapping("/info/{title}")
    public String info(@PathVariable String title){
        AvailableBooks book = availRepo.findAvailableBooksByTitle(title);
        return book.getAbout();
    }

}

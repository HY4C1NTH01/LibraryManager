package org.example.LibraryManager.service;

import org.example.LibraryManager.model.CheckedOutBooks;

import java.util.Optional;

public interface CheckedService {

    void save(CheckedOutBooks checkedOutBooks);
}

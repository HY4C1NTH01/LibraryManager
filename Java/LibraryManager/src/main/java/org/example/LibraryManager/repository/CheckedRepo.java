package org.example.LibraryManager.repository;

import org.bson.types.ObjectId;
import org.example.LibraryManager.model.CheckedOutBooks;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface CheckedRepo extends MongoRepository<CheckedOutBooks, ObjectId> {

    CheckedOutBooks findCheckedOutBooksByTitle(String title);

}

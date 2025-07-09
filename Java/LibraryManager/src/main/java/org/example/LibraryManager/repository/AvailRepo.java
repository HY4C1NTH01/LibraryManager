package org.example.LibraryManager.repository;

import org.example.LibraryManager.model.AvailableBooks;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AvailRepo extends MongoRepository<AvailableBooks, ObjectId> {

    AvailableBooks findAvailableBooksByTitle(String title);
}

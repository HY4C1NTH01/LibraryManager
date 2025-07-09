package org.example.LibraryManager.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "checked")
@Data
@NoArgsConstructor
public class CheckedOutBooks {

    @Id
    private ObjectId id;

    @NonNull
    private String title;
    private String author;
    private String about;
    private String genre;
    private String checkOutDate;
    private String checkedOutBy;
    private String dueReturnDate;
}

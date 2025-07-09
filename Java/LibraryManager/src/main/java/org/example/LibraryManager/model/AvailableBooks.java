package org.example.LibraryManager.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "available")
@Data
@NoArgsConstructor
public class AvailableBooks {

    @Id
    private ObjectId id;

    @NonNull
    private String title;
    private String author;
    private String about;
    private String genre;
}

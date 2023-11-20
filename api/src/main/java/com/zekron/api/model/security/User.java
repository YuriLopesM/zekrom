package com.zekron.api.model.security;

import javax.persistence.*;
//import javax.validation.constraints.*;
@Entity
@Table( name = "users",
        uniqueConstraints = {
            @UniqueConstraint(columnNames = "username"),
            @UniqueConstraint(columnNames = "email")
        }
)
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

//    @NotBlank
//    @Size(max=20)
    private String username;

//    @NotBlank
//    @Size(max=50)
//    @Email
    private String email;
}

package com.grindlaysresort.customerModule;

import com.grindlaysresort.Country;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity //persistance applie this entity
@Table(
        name = "customer"
)
@Data // generate getter and setters
@AllArgsConstructor //all args cunstructor
@NoArgsConstructor
public class Customer {

    @Column(name = "id",unique = true)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;

    @Column(name = "full_name")
    @NotNull
    String full_name;

    @Column(name = "title")
    @NotNull
    String title;

    @Column(name = "customernumber",unique = true)
    String customernumber;

    @Column(name = "citizenship")
    @NotNull
    boolean citizenship;

    @Column(name = "nic",unique = true)
    //@Pattern(regexp = "^()$",message please enter valid NIC number)
    String nic;

    @Column(name = "passport",unique = true)
    String passport;

    @Column(name = "gender")
    @NotNull(message = "gender should not be null")
    String gender;

    @Column(name = "mobile",unique = true)
    @NotNull(message = "mobile should not be null")
    String mobile;

    @Column(name = "email",unique = true)
    @NotNull(message = "Email should not be null")
    String email;

    @Column(name = "address")
    @NotNull
    String address;

    @Column(name = "date_of_birth")
    @NotNull(message = "Date of birth should not be null")
    @Past(message = "birthday should be paster than form today")
    LocalDate date_of_birth;

    @ManyToOne
    @JoinColumn(name = "customerstatus_id", referencedColumnName = "id")
    CustomerStatus customerstatus_id;

    @Column(name = "addeddatetime")
    LocalDateTime addeddatetime;

    @Column(name = "civil_status")
    @NotNull
    String civil_status;

    @Column(name = "emg_cont_number")
    String emg_cont_number;

    @Column(name = "emg_name")
    String emg_name;

    @Column(name = "note")
    String note;

    @Column(name = "deletedatetime")
    LocalDateTime deletedatetime;

    @Column(name = "editdatetime")
    LocalDateTime editdatetime;

    @ManyToOne
    @JoinColumn(name = "country_id", referencedColumnName = "id")
    Country country_id;

}

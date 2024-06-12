package com.grindlaysresort;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.UniqueElements;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity //persistance applie this entity
@Table(
        name = "employee"
)
@Data // generate getter and setters
@AllArgsConstructor //all args cunstructor
@NoArgsConstructor
public class Employee {

    @Column(name = "id",unique = true)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;

    @Column(name = "full_name")
    @NotNull
    String full_name;

    @Column(name = "employeeid",unique = true)
    String employeeid;

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

    @Column(name = "add_date")
    LocalDateTime add_date;

    @Column(name = "civil_status")
    @NotNull
    String civil_status;

    @Column(name = "note")
    String note;

    @Column(name = "delete_date")
    LocalDateTime delete_date;

    @Column(name = "edit_date")
    LocalDateTime edit_date;

    @ManyToOne
    @JoinColumn(name = "workingstatus_id", referencedColumnName = "id")
    WorkingStatus workingstatus_id;

    @ManyToOne
    @JoinColumn(name = "designation_id", referencedColumnName = "id")
    Designation designation_id;

    @ManyToOne
    @JoinColumn(name = "category_id", referencedColumnName = "id")
    EmployeeCategory category_id;

    @ManyToOne
    @JoinColumn(name = "country_id", referencedColumnName = "id")
    Country country_id;

    @Column(name = "date_of_recruitment")
    @NotNull
    LocalDate date_of_recruitment;

    @Column(name = "epf_number")
    @NotNull
    String epf_number;

    @Column(name = "etf_number")
    @NotNull
    String etf_number;

    @Column(name = "basicsalary")
    @NotNull
    BigDecimal basicsalary;

}

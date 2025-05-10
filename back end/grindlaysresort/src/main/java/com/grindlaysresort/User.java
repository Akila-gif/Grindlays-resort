package com.grindlaysresort;

import com.grindlaysresort.employeeModule.Employee;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(
        name = "user"
)
public class
User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "username", unique = true)
    @NotNull
    private String username;

    @Column(name = "password")
    private String password;

    @Column(name = "addeddate")
    private LocalDateTime addeddate;

    @Column(name = "updatedate")
    private LocalDateTime updatedate;

    @Column(name = "deletedate")
    private LocalDateTime deletedate;

    @ManyToOne
    @JoinColumn(name = "employee_id", referencedColumnName = "id")
    @NotNull
    private Employee employee_id;

    @Column(name = "status")
    @NotNull
    private boolean status;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "user_has_role",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private List<Role> roleList;

/*    public User(Integer id, String username, LocalDateTime addeddate, LocalDateTime updatedate, LocalDateTime deletedate, Employee employee_id, boolean status) {
        this.id = id;
        this.username = username;
        this.addeddate = addeddate;
        this.updatedate = updatedate;
        this.deletedate = deletedate;
        this.employee_id = employee_id;
        this.status = status;
    }*/

    public User(Integer id) {
        this.id = id;
    }

    public boolean getStatus() {
        return this.status;
    }
}

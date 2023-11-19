package com.rcbsukcesja.hack2react.storage.user.entity;

import com.rcbsukcesja.hack2react.storage.user.enums.UserType;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.NamedQueries;
import jakarta.persistence.NamedQuery;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@NamedQueries({
        @NamedQuery(name = "getUserByUsername", query = "select u from CustomUserEntity u where u.username = :username"),
        @NamedQuery(name = "getUserByEmail", query = "select u from CustomUserEntity u where u.email = :email"),
        @NamedQuery(name = "getUserCount", query = "select count(u) from CustomUserEntity u"),
        @NamedQuery(name = "getAllUsers", query = "select u from CustomUserEntity u"),
        @NamedQuery(name = "searchForUser", query = "select u from CustomUserEntity u where " +
                "( lower(u.username) like :search or u.email like :search ) order by u.username"),
})
@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode(of = "id")
@Table(name = "app_users", schema = "wavvy")
public class CustomUserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "USERNAME", nullable = false)
    private String username;

    @Column(name = "FIRST_NAME")
    private String firstName;

    @Column(name = "LAST_NAME")
    private String lastName;

    @Column(name = "EMAIL")
    private String email;

    @Column(name = "PHONE")
    private String phone;

    @Column(name = "DELETED")
    private boolean deleted;

    @Column(name = "CREATED_TIMESTAMP")
    private Long createdTimestamp;

    @Column(name = "ENABLED")
    private boolean enabled;

    @Column(name = "DISABLED_REASON")
    private String disabledReason;

    @Column(name = "EMAIL_VERIFIED")
    private boolean emailVerified;

    @Column(name = "USER_TYPE")
    @Enumerated(EnumType.STRING)
    private UserType userType;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @JoinColumn(name = "organization_id", referencedColumnName = "id")
    private Organization organization;

}

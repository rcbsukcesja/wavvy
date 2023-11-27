package com.rcbsukcesja.hack2react.model.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.ZonedDateTime;
import java.util.UUID;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode(of = "id")
@Table(name = "messages", schema = "wavvy")
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String title;
    private String message;
    private String contact;
    private String name;
    @Column(columnDefinition = "TIMESTAMP", nullable = false)
    private ZonedDateTime createdAt;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE,
            CascadeType.REFRESH, CascadeType.DETACH})
    @JoinColumn(name = "user_id", nullable = false, insertable=false, updatable=false)
    private User receiver;
    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE,
            CascadeType.REFRESH, CascadeType.DETACH})
    @JoinColumn(name = "user_id", nullable = false, insertable=false, updatable=false)
    private User sender;


}

// convert this followings kotlin data class into ts object
/*
var accountId: Long? = null,

    @Column(name = "accountName", nullable = false, unique = true)
    var accountName: String,

    @Column(name = "password", nullable = false)
    var password: String,

    @Column(name = "email", nullable = false)
    var email: String,

    @Column(name = "phoneNumber", nullable = false)
    var phoneNumber: String?,

    @Column(name = "isDeleted", nullable = false)
    var isDeleted: Boolean,

    @OneToMany(mappedBy = "account", cascade = [CascadeType.ALL], fetch = FetchType.LAZY)
    var pets: List<PetOwnershipEntity>?,

    @OneToMany(mappedBy = "account")
    var posts: List<PostEntity>?*/

import { IPost } from "./IPost";

export interface IAccount {
    accountId: number | null;
    accountName: string;
    password: string;
    email: string;
    phoneNumber: string | null;
    isDeleted: boolean;
}

// impl more dtos!
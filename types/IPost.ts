//convert this followings kotlin data class into ts object
/*
@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "postId")
    var postId: Long? = null,

    @Column(name = "postTitle")
    var postTitle: String? = null,

    @Column(name = "postContent")
    var postContent: String? = null,

    @Column(name = "postDate")
    var postDate: Date? = null,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "accountId")
    var account: AccountEntity? = null,

    //Either lost or found
    @Column(name = "postType")
    var postType: String? = null,

    @Column(name = "postImage")
    var postImageLink: String? = null,

//    @Column(name = "postLink")
//    var postLink: String? = null

    @Column(name = "postStatus")
    var postStatus: String? = null,

    @Column(name = "isDeleted")
    var isDeleted: Boolean = false,

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "petParticipationInPosts",
        joinColumns = [JoinColumn(name = "postId")],
        inverseJoinColumns = [JoinColumn(name = "petId")]
    )
    var petParticipated: List<PetInfoEntity> = listOf()*/

import { IAccount } from "./IAccount";
import { IPet } from "./IPet";

export interface IPostData {
    postId: number | null,
    postTitle: string | null,
    postContent: string | null,
    postDate: Date | null,
    accountId: number,
    postType: string | null,
    postImageLink: string | null,
    petParticipated: IPet[]
}

export interface IPost {
    postData: IPostData,
    email: string,
    phoneNumber: string,
}
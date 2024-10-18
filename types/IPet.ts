//convert this followings kotlin data class into ts object
/*
@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "petId")
    var petId: Long? = null,

    @Column(name = "petName")
    var petName: String? = null,

    @Column(name = "petType")
    var petType : String? = null,

    @Column(name = "breed")
    var breed : String? = null,

    // may be estimated
    @Column(name = "birthDate")
    var birthDate : Date? = null,

    // Either F, M or U
    @Column(name = "gender")
    var gender : String? = null,

    @Column(name = "isAdopted")
    var isAdopted: String? = null,

    @Column(name = "detail")
    var detail: String? = null,

    @Column(name = "lastLat")
    var lastLat: Float? = null,

    //Distance(km)=1.85×cos(latitude degrees)
    @Column(name = "lastLng")
    var lastLng: Float? = null,

    @Column(name = "isLost")
    var isLost: Boolean? = null,

    @OneToMany(cascade = [CascadeType.ALL], mappedBy = "pet", fetch = FetchType.LAZY)
    var ownerHistList: List<PetOwnershipEntity> = mutableListOf(),

    @Column(name = "isDeceased")
    var isDeceased: Boolean? = false,

    @Column(name = "lastPicLink")
    var lastPicLink: String? = null,

    @Column(name = "isDeleted")
    var isDeleted: Boolean = false,

    @ManyToMany(mappedBy = "petParticipated", cascade = [CascadeType.ALL], fetch = FetchType.LAZY)
    var postParticipation: List<PostEntity> = listOf()*/

export interface IPet {
    petId?: number;
    petName: string;
    petType: string;
    breed: string;
    birthDate: Date;
    gender: string;
    isAdopted: string;
    detail: string;
    lastLat: number;
    lastLng: number;
    isLost: boolean;
    // ownerHistList: PetOwnershipEntity[];
    isDeceased: boolean;
    lastPicLink: string;
    isDeleted: boolean;
    // postParticipation: PostEntity[];
}
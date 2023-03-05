export interface UserClub {
    clubId: string;
    role: string;
    _id: string;
}

export interface ClubMember {
    userId: string;
    role: string;
    _id: string;
}

export interface Club {
    createdAt: string;
    description: string;
    members: ClubMember[];
    name: string;
    userName: string;
    __v: number;
    _id: string;
}

export interface CreateClubDto {
    name: string;
    userName: string;
    password: string;
    description: string;
}

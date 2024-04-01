import * as bcrypt from 'bcrypt';

export interface SeedData {
    users: User[];
    profesional: Profesional[];
}

export interface Profesional {
    photo: string;
    identityDocument: string;
    isAccepted: boolean;
    comments: Comment[];
    certificates: Certificate[];
}

export interface Certificate {
    name: string;
}

export interface Comment {
    title: string;
    starts: number;
    comment: string;
}

export interface User {
    email: string;
    password: string;
    fullName: string;
    isActive: boolean;
    roles: string[];
}

export const initialData: SeedData = {
    users: [
        {
            email: 'admin@gmail.com',
            password: bcrypt.hashSync( 'Admin123', 10 ),
            fullName: 'Admin Admin Admin',
            isActive: true,
            roles: ['Administrador']
        },
        {
            email: 'suport@gmail.com',
            password: bcrypt.hashSync( 'Suport123', 10 ),
            fullName: 'Suport Suport Suport',
            isActive: true,
            roles: ['Soporte']
        }
    ],

    profesional: [
        {
            photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTujSQZrZ1o5Eo_8WMZlI4x48XlirhuyiBHzvicxBjvpQ&s',

            identityDocument: '18222534',

            isAccepted: true,

            comments: [
                {
                    title: 'Cumple con sus requisitos',
                    starts: 3,
                    comment: 'Gran profesional cumple con los trabajos.',
                },
                {
                    title: 'Es puntual.',
                    starts: 4,
                    comment: 'Un profesional muy responsable con la puntualidad.',
                }
            ],
            certificates: [
                {
                    name: 'Certificado de capacitacion.'
                },
                {
                    name: 'Certificado de liderazgo.'
                }
            ]
        },
        {
            photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTye-51ubqDBgEGhw6RFU0rL8jwDzJCCPnHkcxoOf94xA&s',

            identityDocument: '1514152',

            isAccepted: true,

            comments: [
                {
                    title: 'Cumple con sus requisitos',
                    starts: 3,
                    comment: 'Gran profesional cumple con los trabajos.',
                },
                {
                    title: 'Es puntual.',
                    starts: 4,
                    comment: 'Un profesional muy responsable con la puntualidad.',
                }
            ],
            certificates: [
                {
                    name: 'Certificado de capacitacion.'
                },
                {
                    name: 'Certificado de liderazgo.'
                }
            ]
        }
    ]
}
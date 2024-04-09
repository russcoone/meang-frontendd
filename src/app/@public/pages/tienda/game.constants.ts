export const GAMES_PAGES_INFO = {
    'platforms/tenis de mujer': {
        title: 'Tenis de Mujer',
        description: `En esta página encontras los tenis de mujer de la nueva temporada de las marcas 
        que manejamos en nuestra tienda.`,
        platformsIds: ['1'],
        topPrice: -1,
        stock: -1
    },
    'platforms/tenis de hombre': {
        title: 'Tenis de Hombre',
        description: `En esta página encontraremos juegos de las diferentes plataformas
        de Microsoft como pueden ser PC, Xbox,...`,
        platformsIds: ['2'],
        topPrice: -1,
        stock: -1
    },
    'platforms/tenis de niñas': {
        title: 'Tenis de Niñas',
        description: `En esta página encontraremos juegos de las diferentes plataformas
        de Nintendo como pueden ser Nintendo 64, NintendoDS, Wii,...`,
        platformsIds: ['3'],
        topPrice: -1,
        stock: -1
    },
    'platforms/tenis de niños': {
        title: 'Tenis de Niños',
        description: `En esta página encontraremos juegos de las diferentes plataformas
        de Nintendo como pueden ser Nintendo 64, NintendoDS, Wii,...`,
        platformsIds: ['4'],
        topPrice: -1,
        stock: -1
    },
    'promotions/last-units': {
        title: 'Últimas unidades',
        description: `En esta página encontraremos juegos que está a punto de agotarse`,
        platformsIds: [],
        topPrice: -1,
        stock: 30
    },
    'platforms/tenis mas economicos': {
        title: 'En liquidación',
        description: `En esta página encontraremos juegos con
        pocas existencias en el stock y a precios competitivos`,
        platformsIds: ['5'],
        topPrice: 2000,
        stock: 40
    }

};

export enum TYPE_OPERATION {
    PLATFORMS = 'platforms',
    PROMOTION = 'promotion'
}

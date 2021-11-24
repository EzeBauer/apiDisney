'use strict';
let characters = [
  {
    name: "Emma Stone",
    image: "emma_stone.jpg",
    age: 32,
    weight: 52,
    history: "Emily Jean Stone, más conocida profesionalmente como Emma Stone, es una actriz estadounidense. También ha incursionado en la producción cinematográfica. Ha recibido numerosos premios, entre ellos un Óscar, un BAFTA, un SAG y un Globo de Oro, a mejor actriz, por su interpretación en la cinta La La Land.",
    createdAt: new Date,
    updatedAt:  new Date
  },
  {
    name: "Dwayne Johnson",
    image: "dwayne-johnson.webp",
    age: 49,
    weight: 118,
    history: "Dwayne Douglas Johnson es un actor y luchador profesional estadounidense, conocido popularmente como La Roca o The Rock.Se desempeñó como luchador profesional para la WWE hasta su retirada oficial en 2019, con el objetivo de centrarse en su carrera artística.",
    createdAt: new Date,
    updatedAt:  new Date
  },
  {
    name: "Scarlett Johansson",
    image: "Scarlett-Johansson.webp",
    age: 36,
    weight: 57,
    history: "Scarlett Ingrid Johansson es una actriz, cantante y modelo estadounidense. Comenzó a mostrar intereses por la música y la actuación desde temprana edad, y a lo largo de su infancia y adolescencia se formó en distintos institutos como actriz.",
    createdAt: new Date,
    updatedAt:  new Date
  },
  {
    name: "Kelly Marie Tran",
    image: "kelly-marie.jpg",
    age: 36,
    weight: 57,
    history: "Kelly Marie Tran es una actriz estadounidense. Ha tenido varios papeles en cortometrajes y episodios de distintas series de televisión, y es principalmente conocida por su participación en Star Wars: Episodio VIII - Los últimos Jedi, como Rose Tico y ser la voz de Raya en Raya y el último dragón",
    createdAt: new Date,
    updatedAt:  new Date
  }
]
module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Characters',characters, {});
    
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('Characters', null, {});

  }
};

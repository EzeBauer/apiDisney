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
  },
  {
    name: "John Christopher Depp",
    image: "Johnny Deep.jpg",
    age: 58,
    weight: 78,
    history: "John Christopher Depp II (Owensboro, Kentucky; 9 de junio de 1963) es un actor, productor, guionista y músico estadounidense. Ha sido nominado en tres ocasiones al Óscar y recibió un Globo de Oro,1​ un premio del Sindicato de Actores y un César ",
    createdAt: new Date,
    updatedAt:  new Date
  },
  {
  name: "Orlando Bloom",
  image: "Orlando Bloom.jpg",
  age: 44,
  weight: 72,
  history: "Orlando Jonathan Blanchard Bloom, conocido habitualmente como Orlando Bloom, es un actor británico",
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

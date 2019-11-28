import { SeaField } from './sea-field.class';

const seaField = new SeaField();
seaField.attach(document.getElementById('sea-field'));

seaField.addShip(2,2, 4, true);
seaField.addShip(1, 4, 2);
seaField.addShip(2, 1, 3, true);



console.log('seaField=', seaField);

const seaField1 = new SeaField();
seaField1.attach(document.getElementById('sea-field-1'));

// TODO:
// отлов клавиш
// определение нажатия клавиши 1
// вывод в консоль нажатой клавиши
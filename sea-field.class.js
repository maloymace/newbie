export class SeaField {
    el;
    elInfoRow;

    field = [];
    state;

    activeCellInfo;

    constructor() {
        this.state = 0;
        this.fillFieldDefaultData();
    }

    fillInfoRow() {
        if (this.state === 0) {
            this.elInfoRow.innerHTML = 'Выбери корабль';
        }
    }

    fillFieldDefaultData() {
        for (let rowIndex = 0; rowIndex < 10; rowIndex++) {
            const row = [];
            for (let cellIndex = 0; cellIndex < 10; cellIndex++) {
                const cell = {
                    rowIndex: rowIndex,
                    cellIndex: cellIndex,
                    state: 0,
                    isShip: false,
                    isActive: false,
                };
                row[cellIndex] = cell;
            }
            this.field[rowIndex] = row;
        }
    }

    attach(el) {
        this.el = el;
        this.fillEl();
        this.fillInfoRow();
    }

    fillEl() {
        this.field.forEach((rowInfo) => {
            const row = this.createRow(rowInfo);
            this.el.appendChild(row);
        });
        this.elInfoRow = document.createElement('div');
        this.elInfoRow.classList.add('info-row');
        this.el.appendChild(this.elInfoRow);
    }

    createRow(rowInfo) {
        const row = document.createElement('div');
        row.classList.add('row');

        rowInfo.forEach((cellInfo) => {
            const cell = this.createCell(cellInfo);
            row.appendChild(cell);
        });

        return row;
    }


    createCell(cellInfo) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.addEventListener('click', () => this.onCellClick(cellInfo));

        cellInfo.el = cell;

        return cell;
    }

    onCellClick(cellInfo) {
        if (this.activeCellInfo) {
            this.activeCellInfo.isActive = false;
            this.updateCell(this.activeCellInfo);
        }

        this.activeCellInfo = cellInfo;
        cellInfo.isActive = true;
        this.updateCell(cellInfo);
    }

    addShip(rowIndex, cellIndex, length, isVertical) {
        let currentRowIndex = rowIndex;
        let currentCellIndex = cellIndex;

        if(!this.isShipCanBePlaced(rowIndex, cellIndex, length, isVertical)){
            return
        }


        for (let i = 0; i < length; i++) {
            this.field[currentRowIndex][currentCellIndex].isShip = true;
            this.updateCell(this.field[currentRowIndex][currentCellIndex]);

            if (isVertical) {
                currentRowIndex++;
            } else {
                currentCellIndex++;
            }
        }

    }

    updateCell(cellInfo) {
        if (cellInfo.isActive) {
            cellInfo.el.classList.add('active');
        } else {
            cellInfo.el.classList.remove('active');
        }

        if (cellInfo.isShip) {
            cellInfo.el.classList.add('ship');
        } else {
            cellInfo.el.classList.remove('ship');
        }
    }

    isShipCanBePlaced(rowIndex, cellIndex, length, isVertical) {
        if (length > 4) {

            return;
        }

        let currentRowIndex = rowIndex;
        let currentCellIndex = cellIndex;

        for (let i = 0; i < length; i++) {

            if (!this.canCellBePlaced(currentRowIndex, currentCellIndex)) {
                return;
            }


            if (isVertical) {
                currentRowIndex++;
            } else {
                currentCellIndex++;
            }
        }

        return true;
    }

    canCellBePlaced(rowIndex, cellIndex) {
        if (rowIndex > 9 || rowIndex < 0 || cellIndex > 9 || cellIndex < 0) {
            return;
        }

        const coords = [
            rowIndex,     cellIndex,
            rowIndex - 1, cellIndex - 1,
            rowIndex - 1, cellIndex,
            rowIndex - 1, cellIndex + 1,
            rowIndex,     cellIndex + 1,
            rowIndex + 1, cellIndex + 1,
            rowIndex + 1, cellIndex,
            rowIndex + 1, cellIndex - 1,
            rowIndex + 1, cellIndex
        ];

        for (let i = 0; i < coords.length; i = i + 2) {
            if (this.field[coords[i]][coords[i + 1]].isShip) {
                return;
            }
        }

        return true;
    }


}

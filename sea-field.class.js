export class SeaField {
    el;
    field = [];

    activeCellInfo;

    constructor() {
        this.fillFieldDefaultData();
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
    }

    fillEl() {
        this.field.forEach((rowInfo) => {
            const row = this.createRow(rowInfo);
            this.el.appendChild(row);
        })
        const info = document.createElement('div');
        info.classList.add('info-row');
        this.el.appendChild(info);
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
        cell.addEventListener('click', (e) => this.onCellClick(cellInfo));

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

        if (length > 4) {

            return;
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
}

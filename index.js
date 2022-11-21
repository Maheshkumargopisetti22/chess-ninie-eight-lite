var board = document.getElementById("board");

x = 1, y = 1;
for (let i = 1; i < 65; i++) {
    let box = document.createElement("div");
    let image = document.createElement("img");
    image.setAttribute("src", "#");
    image.classList.add("imgPiece")
    image.setAttribute("alt", "");
    box.appendChild(image)
    box.classList.add("box");
    board.appendChild(box);
    box.setAttribute("data-xIndex", x);
    box.setAttribute("data-yIndex", y);
    box.setAttribute("data-cords", `(${x},${y})`)
    // box.innerText = "(" + x + "," + y + ")";
    if ((x + y) % 2 == 0) {
        box.style.backgroundColor = "#7f8c8d";
    }
    else {
        box.style.backgroundColor = "#34495e";
        box.style.color = "white";

    }
    x++;
    if (x > 8) {
        x = 1;
        y++;
    }

}

const showMoves = (piece) => {
    const moves = piece.moves;
    moves.forEach(m => {
        for (const box of boxes) {
            if (m.x == box.dataset.xindex && m.y == box.dataset.yindex) {
                if (box.dataset.color == piece.color) {
                    box.classList.add("Cantkill")
                } else {
                    box.classList.add("Cankill")
                }
                if (box.dataset.color == "" || box.dataset.color == null || box.dataset.color == undefined) {
                    box.classList.remove("Cankill")
                    box.classList.add("possibleMove")

                }

            }
        }
    })
}
const resetPossibleMove = (piece) => {
    const moves = piece.moves;
    moves.forEach(m => {
        for (const box of boxes) {
            if (m.x == box.dataset.xindex && m.y == box.dataset.yindex) {
                box.classList.remove("possibleMove")
                box.classList.remove("Cankill")
                box.classList.remove("Cantkill")
            }
        }
    })

}

class Piece {
    constructor(color, name, initialX, initialY, image) {
        this.color = color;
        this.name = name;
        this.initialPos = {
            x: initialX,
            y: initialY
        }
        this.currentPos = {
            x: initialX,
            y: initialY
        }
        this.image = image;
        this.moves = [];


    }
}
class Pawn extends Piece {
    constructor(color, name, initialX, initialY, image) {
        super(color, name, initialX, initialY, image)
        this.initialMove = true;
    }

    getPossibleMove = () => {
        if (this.color == "black") {
            if (this.initialMove) {
                this.moves.push({
                    x: this.currentPos.x,
                    y: this.currentPos.y + 2
                })

            }
            this.moves.push({
                x: this.currentPos.x,
                y: this.currentPos.y + 1
            })
            const box1 = document.querySelector(`div[data-cords="(${this.currentPos.x + 1},${this.currentPos.y + 1})"]`);
            const box2 = document.querySelector(`div[data-cords="(${this.currentPos.x - 1},${this.currentPos.y + 1})"]`);
            if (box1 && box1.dataset.color && box1.dataset.color != this.color) {
                this.moves.push({
                    x: this.currentPos.x + 1,
                    y: this.currentPos.y + 1
                })
            }
            if (box2 && box2.dataset.color && box2.dataset.color != this.color) {
                this.moves.push({
                    x: this.currentPos.x - 1,
                    y: this.currentPos.y + 1
                })
            }
        } else {
            if (this.initialMove) {
                this.moves.push({
                    x: this.currentPos.x,
                    y: this.currentPos.y - 2
                })
            }
            this.moves.push({
                x: this.currentPos.x,
                y: this.currentPos.y - 1
            })
            const box1 = document.querySelector(`div[data-cords="(${this.currentPos.x + 1},${this.currentPos.y - 1})"]`);
            const box2 = document.querySelector(`div[data-cords="(${this.currentPos.x - 1},${this.currentPos.y - 1})"]`);
            if (box1 && box1.dataset.color && box1.dataset.color != this.color) {
                this.moves.push({
                    x: this.currentPos.x + 1,
                    y: this.currentPos.y - 1
                })
            }
            if (box2 && box2.dataset.color && box2.dataset.color != this.color) {
                this.moves.push({
                    x: this.currentPos.x - 1,
                    y: this.currentPos.y - 1
                })
            }
        }

        showMoves(this)
    }
}
class Bishop extends Piece {
    constructor(color, name, initialX, initialY, image) {
        super(color, name, initialX, initialY, image)
    }
    getPossibleMove = () => {
        if (this.moves.length) {
            validateBishopMovesArr(this);
            showMoves(this);
            return;
        }
        let x = 7, y = 1;
        while (x > 0) {
            let newX = this.currentPos.x + x;
            let newY = this.currentPos.y + x;
            if (newX > 0 && newX < 9 && newY > 0 && newY < 9) {
                this.moves.push({ x: newX, y: newY });
            }
            x--;
        }

        while (y < 7) {
            let newX = this.currentPos.x - y;
            let newY = this.currentPos.y - y;
            if (newX > 0 && newX < 9 && newY > 0 && newY < 9) {
                this.moves.push({ x: newX, y: newY });
            }
            y++;
        }
        x = 7, y = 1;
        while (y < 7) {
            let newX = this.currentPos.x + y;
            let newY = this.currentPos.y - y;
            if (newX > 0 && newX < 9 && newY > 0 && newY < 9) {
                this.moves.push({ x: newX, y: newY });
            }
            y++;
        }
        while (x > 0) {
            let newX = this.currentPos.x - x;
            let newY = this.currentPos.y + x;
            if (newX > 0 && newX < 9 && newY > 0 && newY < 9) {
                this.moves.push({ x: newX, y: newY });
            }
            x--;
        }
        let validatedMoves = validateBishopMovesArr(this);
        this.moves = validatedMoves;

        showMoves(this)
    }
}
class Rook extends Piece {
    constructor(color, name, initialX, initialY, image) {
        super(color, name, initialX, initialY, image)
    }
    getPossibleMove = () => {
        if (this.moves.length) {
            validateRookMovesArr(this);
            showMoves(this);
            return;
        }
        let x = 7, y = 7;
        while (x > 0) {
            let newX = this.currentPos.x + x;
            if (newX > 8) {
                newX -= 8
            }
            this.moves.push({
                x: newX,
                y: this.currentPos.y
            })
            x--;
        }
        while (y > 0) {
            let newY = this.currentPos.y + y;
            if (newY > 8) {
                newY -= 8
            }
            this.moves.push({
                x: this.currentPos.x,
                y: newY
            })
            y--;
        }
        let validatedMoves = validateRookMovesArr(this);
        this.moves = validatedMoves;
        showMoves(this)
    }
}
class Knight extends Piece {
    constructor(color, name, initialX, initialY, image) {
        super(color, name, initialX, initialY, image)
    }
    getPossibleMove = () => {
        if (this.moves.length) {
            showMoves(this);
            return;
        }
        let newX, newY;
        newX = this.currentPos.x + 2;
        newY = this.currentPos.y - 1
        if (newX > 0 && newX < 9 && newY > 0 && newY < 9) this.moves.push({ x: newX, y: newY });
        newX = this.currentPos.x + 2;
        newY = this.currentPos.y + 1
        if (newX > 0 && newX < 9 && newY > 0 && newY < 9) this.moves.push({ x: newX, y: newY });
        newX = this.currentPos.x - 2;
        newY = this.currentPos.y - 1
        if (newX > 0 && newX < 9 && newY > 0 && newY < 9) this.moves.push({ x: newX, y: newY });
        newX = this.currentPos.x - 2;
        newY = this.currentPos.y + 1
        if (newX > 0 && newX < 9 && newY > 0 && newY < 9) this.moves.push({ x: newX, y: newY });
        newX = this.currentPos.x + 1;
        newY = this.currentPos.y + 2
        if (newX > 0 && newX < 9 && newY > 0 && newY < 9) this.moves.push({ x: newX, y: newY });
        newX = this.currentPos.x - 1;
        newY = this.currentPos.y + 2
        if (newX > 0 && newX < 9 && newY > 0 && newY < 9) this.moves.push({ x: newX, y: newY });
        newX = this.currentPos.x + 1;
        newY = this.currentPos.y - 2
        if (newX > 0 && newX < 9 && newY > 0 && newY < 9) this.moves.push({ x: newX, y: newY });
        newX = this.currentPos.x - 1;
        newY = this.currentPos.y - 2
        if (newX > 0 && newX < 9 && newY > 0 && newY < 9) this.moves.push({ x: newX, y: newY });
        showMoves(this);
    }
}
class Queen extends Piece {
    constructor(color, name, initialX, initialY, image) {
        super(color, name, initialX, initialY, image)
    }
    getPossibleMove = () => {
        let x = 7, y = 1;
        while (x > 0) {
            let newX = this.currentPos.x + x;
            let newY = this.currentPos.y + x;
            if (newX > 0 && newX < 9 && newY > 0 && newY < 9) {
                this.moves.push({ x: newX, y: newY });
            }
            x--;
        }

        while (y < 7) {
            let newX = this.currentPos.x - y;
            let newY = this.currentPos.y - y;
            if (newX > 0 && newX < 9 && newY > 0 && newY < 9) {
                this.moves.push({ x: newX, y: newY });
            }
            y++;
        }
        x = 7, y = 1;
        while (y < 7) {
            let newX = this.currentPos.x + y;
            let newY = this.currentPos.y - y;
            if (newX > 0 && newX < 9 && newY > 0 && newY < 9) {
                this.moves.push({ x: newX, y: newY });
            }
            y++;
        }
        while (x > 0) {
            let newX = this.currentPos.x - x;
            let newY = this.currentPos.y + x;
            if (newX > 0 && newX < 9 && newY > 0 && newY < 9) {
                this.moves.push({ x: newX, y: newY });
            }
            x--;
        }
        x = 7, y = 7;
        while (x > 0) {
            let newX = this.currentPos.x + x;
            if (newX > 8) {
                newX -= 8
            }
            this.moves.push({
                x: newX,
                y: this.currentPos.y
            })
            x--;
        }
        while (y > 0) {
            let newY = this.currentPos.y + y;
            if (newY > 8) {
                newY -= 8
            }
            this.moves.push({
                x: this.currentPos.x,
                y: newY
            })
            y--;
        }
        this.moves = [...validateBishopMovesArr(this), ...validateRookMovesArr(this)]
        showMoves(this)
    }
}
class King extends Piece {
    constructor(color, name, initialX, initialY, image) {
        super(color, name, initialX, initialY, image)
    }
    getPossibleMove = () => {
        if (this.moves.length) {
            showMoves(this);
            return;
        }
        let newX, newY;
        newX = this.currentPos.x + 1;
        newY = this.currentPos.y + 1
        if (newX > 0 && newX < 9 && newY > 0 && newY < 9) this.moves.push({ x: newX, y: newY });
        newX = this.currentPos.x;
        newY = this.currentPos.y + 1
        if (newX > 0 && newX < 9 && newY > 0 && newY < 9) this.moves.push({ x: newX, y: newY });
        newX = this.currentPos.x - 1;
        newY = this.currentPos.y + 1
        if (newX > 0 && newX < 9 && newY > 0 && newY < 9) this.moves.push({ x: newX, y: newY });
        newX = this.currentPos.x - 1;
        newY = this.currentPos.y
        if (newX > 0 && newX < 9 && newY > 0 && newY < 9) this.moves.push({ x: newX, y: newY });
        newX = this.currentPos.x - 1;
        newY = this.currentPos.y - 1
        if (newX > 0 && newX < 9 && newY > 0 && newY < 9) this.moves.push({ x: newX, y: newY });
        newX = this.currentPos.x;
        newY = this.currentPos.y - 1
        if (newX > 0 && newX < 9 && newY > 0 && newY < 9) this.moves.push({ x: newX, y: newY });
        newX = this.currentPos.x + 1;
        newY = this.currentPos.y - 1
        if (newX > 0 && newX < 9 && newY > 0 && newY < 9) this.moves.push({ x: newX, y: newY });
        newX = this.currentPos.x + 1;
        newY = this.currentPos.y
        if (newX > 0 && newX < 9 && newY > 0 && newY < 9) this.moves.push({ x: newX, y: newY });
        // let validatedMoves = validateKingMovesArr(this);
        // this.moves = validatedMoves;
        showMoves(this);
    }
}
const pb1 = new Pawn("black", "Black Pawn", 1, 2, "./media/b_pawn.svg")
const pb2 = new Pawn("black", "Black Pawn", 2, 2, "./media/b_pawn.svg")
const pb3 = new Pawn("black", "Black Pawn", 3, 2, "./media/b_pawn.svg")
const pb4 = new Pawn("black", "Black Pawn", 4, 2, "./media/b_pawn.svg")
const pb5 = new Pawn("black", "Black Pawn", 5, 2, "./media/b_pawn.svg")
const pb6 = new Pawn("black", "Black Pawn", 6, 2, "./media/b_pawn.svg")
const pb7 = new Pawn("black", "Black Pawn", 7, 2, "./media/b_pawn.svg")
const pb8 = new Pawn("black", "Black Pawn", 8, 2, "./media/b_pawn.svg")
const pw1 = new Pawn("white", "white Pawn", 1, 7, "./media/w_pawn.svg")
const pw2 = new Pawn("white", "white Pawn", 2, 7, "./media/w_pawn.svg")
const pw3 = new Pawn("white", "white Pawn", 3, 7, "./media/w_pawn.svg")
const pw4 = new Pawn("white", "white Pawn", 4, 7, "./media/w_pawn.svg")
const pw5 = new Pawn("white", "white Pawn", 5, 7, "./media/w_pawn.svg")
const pw6 = new Pawn("white", "white Pawn", 6, 7, "./media/w_pawn.svg")
const pw7 = new Pawn("white", "white Pawn", 7, 7, "./media/w_pawn.svg")
const pw8 = new Pawn("white", "white Pawn", 8, 7, "./media/w_pawn.svg")
const rk1 = new Rook("black", "black Rook", 1, 1, "./media/b_rook.svg")
const rk2 = new Rook("black", "black Rook", 8, 1, "./media/b_rook.svg")
const rk3 = new Rook("white", "white Rook", 1, 8, "./media/w_rook.svg")
const rk4 = new Rook("white", "white Rook", 8, 8, "./media/w_rook.svg")
const kk1 = new Knight("black", "black knight", 2, 1, "./media/b_knight.svg")
const kk2 = new Knight("black", "black knight", 7, 1, "./media/b_knight.svg")
const kk3 = new Knight("white", "white knight", 2, 8, "./media/w_knight.svg")
const kk4 = new Knight("white", "white knight", 7, 8, "./media/w_knight.svg")
const k1 = new King("black", "black king", 5, 1, "./media/b_king.svg")
const k2 = new Queen("black", "black king", 4, 1, "./media/b_queen.svg")
const k3 = new King("white", "white king", 4, 8, "./media/w_king.svg")
const k4 = new Queen("white", "white king", 5, 8, "./media/w_queen.svg")
const b1 = new Bishop("black", "black bishop", 3, 1, "./media/b_bishop.svg")
const b2 = new Bishop("black", "black bishop", 6, 1, "./media/b_bishop.svg")
const b3 = new Bishop("white", "white bishop", 3, 8, "./media/w_bishop.svg")
const b4 = new Bishop("white", "white bishop", 6, 8, "./media/w_bishop.svg")


const PiecessArr = [pb1, pb2, pb3, pb4, pb5, pb6, pb7, pb8, pw1, pw2, pw3, pw4, pw5, pw6, pw7, pw8, rk1, rk2, rk3, rk4, kk1, kk2, kk3, kk4, k1, k2, k3, k4, b1, b2, b3, b4]
const boxes = document.getElementsByClassName("box");

PiecessArr.forEach(p => {
    for (const box of boxes) {
        if (p.initialPos.x == box.dataset.xindex && p.initialPos.y == box.dataset.yindex) {
            box.firstChild.setAttribute("src", p.image);
            box.setAttribute("data-name", p.name);
            box.setAttribute("data-color", p.color);
            box.addEventListener("mouseenter", p.getPossibleMove)
            box.addEventListener("mouseleave", () => resetPossibleMove(p))
        }
    }
})

for (const box of boxes) {
    if (box.dataset.name == "" || box.dataset.name == null || box.dataset.name == undefined) {
        box.firstElementChild.classList.add("hideImg");
    }

}

const findDistance = (a, b) => {
    return Math.sqrt((Math.pow((a.x - b.x), 2) + Math.pow((a.y - b.y), 2)));
}



const validateRookMovesArr = (piece) => {
    let current = piece.currentPos;
    let moves = piece.moves;
    moves = moves.sort((a, b) => findDistance(a, current) - findDistance(b, current));
    let directions = {
        up: [],
        down: [],
        left: [],
        right: []
    }
    moves.forEach(m => {
        if (m.y > current.y && m.x == current.x) {
            directions.down = [...directions.down, m]
        }
        if (m.y < current.y && m.x == current.x) {
            directions.up = [...directions.up, m]
        }
        if (m.y == current.y && m.x > current.x) {
            directions.right = [...directions.right, m]
        }
        if (m.y == current.y && m.x < current.x) {
            directions.left = [...directions.left, m]
        }
    })
    let newMoves = [];
    for (const dir in directions) {
        for (const d of directions[dir]) {
            const box = document.querySelector(`div[data-cords="(${d.x},${d.y})"]`);
            const color = box.dataset.color;
            if (color != "" && color != undefined && color != null) {
                if (color == piece.color) {
                    newMoves.push(d);
                    break;
                }

            } else {
                newMoves.push(d);
            }
        }
    }
    return newMoves;
}

const validateBishopMovesArr = (piece) => {
    let current = piece.currentPos;
    let moves = piece.moves;
    moves = moves.sort((a, b) => findDistance(a, current) - findDistance(b, current));
    let directions = {
        upRight: [],
        downLeft: [],
        upLeft: [],
        downRight: []
    }
    moves.forEach(m => {
        if (m.x < current.x && m.y > current.y) {
            directions.upRight = [...directions.upRight, m]
        }
        if (m.x > current.x && m.y < current.y) {
            directions.downLeft = [...directions.downLeft, m]
        }
        if (m.x < current.x && m.y < current.y) {
            directions.upLeft = [...directions.upLeft, m]
        }
        if (m.x > current.x && m.y > current.y) {
            directions.downRight = [...directions.downRight, m]
        }

    })
    let newMoves = [];
    for (const dir in directions) {
        for (const d of directions[dir]) {
            const box = document.querySelector(`div[data-cords="(${d.x},${d.y})"]`);
            const color = box.dataset.color;
            if (color != "" && color != undefined && color != null) {
                if (color == piece.color) {
                    newMoves.push(d);
                    break;
                }

            } else {
                newMoves.push(d);
            }
        }
    }
    return newMoves;

}





const validateKingMovesArr = (piece) => {
    
    let newMoves = [];
    for (const dir in directions) {
        for (const d of directions[dir]) {
            const box = document.querySelector(`div[data-cords="(${d.x},${d.y})"]`);
            const color = box.dataset.color;
            if (color != "" && color != undefined && color != null) {
                if (color == piece.color) {
                    newMoves.push(d);
                    break;
                }

            } else {
                newMoves.push(d);
            }
        }
    }
    return newMoves;

}

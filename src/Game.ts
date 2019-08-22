export class Game {

    playerMove: string;
    computerMove: string;
    playerClass: string;
    computerClass: string;
    startMenu: HTMLDivElement;
    buttonX: HTMLButtonElement;
    buttonO: HTMLButtonElement;
    tableBoard: HTMLDivElement;
    plays: NodeListOf<HTMLUListElement>;

    constructor() {
        this.selectElements();
        this.addEventListeners();
        this.playerClass='';
        this.computerClass='';
    }

    // Select elements
    private selectElements = (): void => {
        this.startMenu = document.querySelector('.startMenu');
        this.buttonX = document.querySelector('.buttonX');
        this.buttonO = document.querySelector('.buttonO');
        this.tableBoard = document.querySelector('.tableBoard');
        this.plays = document.querySelectorAll('.tic');
    };

    // Add event listeners ( 0 - 'X', 1 - '0')
    private addEventListeners = (): void => {
        this.buttonX.addEventListener('click', () => {
            this.playerMove = 'X';
            this.computerMove = '0';
            this.playerClass = this.playerMove ==='X' ? 'x' : 'o';
            this.computerClass = this.playerMove ==='X' ? 'o' : 'x' ;
            this.startMenu.classList.add('hidden');
            this.tableBoard.classList.remove('hidden');
            this.startGame();
        });

        this.buttonO.addEventListener('click', () => {
            this.playerMove = '0';
            this.computerMove = 'X';
            this.playerClass = this.playerMove ==='0' ? 'o' : 'x';
            this.computerClass = this.computerMove ==='0' ? 'o' : 'x';
            this.startMenu.classList.add('hidden');
            this.tableBoard.classList.remove('hidden');
            this.startGame();
        });
    };

    // Start the first game
    private startGame = () : void => {
        this.playerTurn();
    };

    // Player turn
    playerTurn = () : void => {
        this.plays.forEach((element: HTMLUListElement): void => {
            element.addEventListener('click', () :void => {
                element.innerText=this.playerMove;
                element.classList.add(this.playerClass);
                this.winCondition();
                for(let i = 0; i < this.plays.length; i++) {
                    if(this.plays[i].classList.contains(this.playerClass)) {
                        this.computerTurn();
                        break;
                    }
                }
            })
        });
    };

    // Computer turn
    computerTurn = () : void => {
        let randomIdx = Math.floor(Math.random() * 9);
        while(this.plays[randomIdx].classList.contains('x') || this.plays[randomIdx].classList.contains('o')){
            randomIdx = Math.floor((Math.random() * 9));
        }
        this.plays[randomIdx].innerText=this.computerMove;
        this.plays[randomIdx].classList.add(this.computerClass);
        this.winCondition();
    };

    // Check if the player or the computer has already won
    winCondition = () : void => {
        //Check if player win
        if(
            (this.plays[0].classList.contains(this.playerClass) && this.plays[1].classList.contains(this.playerClass) && this.plays[2].classList.contains(this.playerClass))
            || (this.plays[3].classList.contains(this.playerClass) && this.plays[4].classList.contains(this.playerClass) && this.plays[5].classList.contains(this.playerClass))
            || (this.plays[6].classList.contains(this.playerClass) && this.plays[7].classList.contains(this.playerClass) && this.plays[8].classList.contains(this.playerClass))
            || (this.plays[0].classList.contains(this.playerClass) && this.plays[3].classList.contains(this.playerClass) && this.plays[6].classList.contains(this.playerClass))
            || (this.plays[1].classList.contains(this.playerClass) && this.plays[4].classList.contains(this.playerClass) && this.plays[7].classList.contains(this.playerClass))
            || (this.plays[2].classList.contains(this.playerClass) && this.plays[5].classList.contains(this.playerClass) && this.plays[8].classList.contains(this.playerClass))
            || (this.plays[0].classList.contains(this.playerClass) && this.plays[4].classList.contains(this.playerClass) && this.plays[8].classList.contains(this.playerClass))
            || (this.plays[2].classList.contains(this.playerClass) && this.plays[4].classList.contains(this.playerClass) && this.plays[6].classList.contains(this.playerClass))
        ) {
            this.reset('You win!');
        } else if (
            (this.plays[0].classList.contains(this.computerClass) && this.plays[1].classList.contains(this.computerClass) && this.plays[2].classList.contains(this.computerClass))
            || (this.plays[3].classList.contains(this.computerClass) && this.plays[4].classList.contains(this.computerClass) && this.plays[5].classList.contains(this.computerClass))
            || (this.plays[6].classList.contains(this.computerClass) && this.plays[7].classList.contains(this.computerClass) && this.plays[8].classList.contains(this.computerClass))
            || (this.plays[0].classList.contains(this.computerClass) && this.plays[3].classList.contains(this.computerClass) && this.plays[6].classList.contains(this.computerClass))
            || (this.plays[1].classList.contains(this.computerClass) && this.plays[4].classList.contains(this.computerClass) && this.plays[7].classList.contains(this.computerClass))
            || (this.plays[2].classList.contains(this.computerClass) && this.plays[5].classList.contains(this.computerClass) && this.plays[8].classList.contains(this.computerClass))
            || (this.plays[0].classList.contains(this.computerClass) && this.plays[4].classList.contains(this.computerClass) && this.plays[8].classList.contains(this.computerClass))
            || (this.plays[2].classList.contains(this.computerClass) && this.plays[4].classList.contains(this.computerClass) && this.plays[6].classList.contains(this.computerClass))
        ) {
            this.reset('You loose!')
        } else if(this.checkIfAllFieldsAreUsed()) {
            this.reset('It is a tie!')
        }
    };

    checkIfAllFieldsAreUsed = () : boolean => {
        for (let i = 0; i < this.plays.length; i++) {
            if(!this.plays[i].classList.contains(this.playerClass) || !this.plays[i].classList.contains(this.computerClass)) {
                return false;
            }
            return true;
        }
    };

    reset = (message: string) : void => {
        this.startMenu.classList.remove('hidden');
        this.tableBoard.classList.add('hidden');
        alert(message);

        this.plays.forEach((element: HTMLUListElement): void => {
            element.innerText='#';
            element.classList.remove(this.playerClass);
            element.classList.remove(this.computerClass);
            element.removeEventListener('click', ()=> {
            });
        });
        this.buttonX.removeEventListener('click', () => {});
        this.buttonO.removeEventListener('click', () => {});
    };
}
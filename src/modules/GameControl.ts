import Food from './Food';
import ScorePanel from './ScorePanel';
import Snake from './Snake';

class GameControl {
    food: Food;
    scorePanel: ScorePanel;
    snake: Snake;
    direction = '';
    isDead = false;
    timer = 0; // 定时器标识
    speed = 300;  // 蛇移动的速度

    constructor() {
        this.food = new Food();
        this.scorePanel = new ScorePanel(10, 2); // 每两分升一级
        this.snake = new Snake;
        this.keyDownHandler = this.keyDownHandler.bind(this);

        this.init();
    }

    init() {
        document.addEventListener('keydown', this.keyDownHandler, false);

        console.log(this.speed, 'speed');

        this.run();

    }

    // 按键响应函数

    keyDownHandler(event: KeyboardEvent) {
        this.direction = event.key;
    }

    run() {
        // 清除定时器
        clearTimeout(this.timer);
        if (this.snake.checkCrossBoby()) {
            this.isDead = true;
            alert('GAME OVER!');
        }
        if (this.isDead) { // 游戏结束
            clearInterval(this.timer);
            return;
        }
        let left = this.snake.X;
        let top = this.snake.Y;

        switch (this.direction) {
            case 'ArrowUp':
            case 'Up':
                // top - 10 === 0 ? top = -3 : top -= 10; // 处理间隙问题？
                top -= 10;
                break;
            case 'ArrowDown':
            case 'Down':
                // top + 10 === 290 ? top = 293 : top += 10;
                top += 10;
                break;
            case 'ArrowLeft':
            case 'Left':
                // left - 10 === 0 ? left = -3 : left -= 10;
                left -= 10;
                break;
            case 'ArrowRight':
            case 'Right':
                // left + 10 === 290 ? left = 293 : left += 10;
                left += 10;
                break;
        }

        try {
            this.snake.X = left;
            this.snake.Y = top;
        } catch (e) {
            this.isDead = true;
            alert(e.message);
        }

        this.speed = 300 - (this.scorePanel.level - 1) * 30;
        !this.isDead && (this.timer = setTimeout(this.run.bind(this), this.speed) as any);

        this.checkEat(left, top)
    }

    // 检查是否迟到食物
    checkEat(left: number, top: number) {
        if (left === this.food.Left && top === this.food.Top) {
            this.food.updateFoodPostion();
            this.scorePanel.addScore();
            this.snake.addBodies();
        }
    }
}

export default GameControl;

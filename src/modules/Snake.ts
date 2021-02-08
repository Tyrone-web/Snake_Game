import { Template } from "webpack";

class Snake {
    head: HTMLElement; // 蛇头
    bodies: HTMLCollection; //蛇身（包括蛇头）
    elemnt: HTMLElement; // 蛇的容器

    constructor() {
        this.elemnt = document.querySelector('.snake') as HTMLElement;
        this.head = document.querySelector('.snake .snake-item') as HTMLElement;
        this.bodies = document.getElementsByClassName('snake')[0].getElementsByClassName('snake-item');
    }

    // 获取head的坐标
    get X() {
        return this.head.offsetLeft;
    }

    get Y() {
        return this.head.offsetTop;
    }

    // 设置head的坐标
    set X(left: number) {
        if (this.X === left) {
            return;
        }

        if (left < 0 || left > 290) {
            throw new Error('GAME OVER!');
        }
        // 检查是水平否掉头: 蛇头的left和第二个lileft的坐标相等时，发生掉头
        if (this.bodies[1] && (this.bodies[1] as HTMLElement).style.left === left + 'px') {
            if (left > this.X) { // left>this.x 说明蛇掉头往右走， 此时应该继续让蛇忘左走
                left = this.X - 10;
            } else {
                left = this.X + 10
            }
        }
        this.moveSnake(left, 'left');
    }

    set Y(top: number) {
        if (this.Y === top) {
            return;
        }

        if (top < 0 || top > 290) {
            throw new Error('GAME OVER!');
        }

        // 检查垂直方向是否掉头: 蛇头的top和第二个li的top的坐标相等时，发生掉头
        if (this.bodies[1] && (this.bodies[1] as HTMLElement).style.top === top + 'px') {
            if (top > this.Y) { // top>this.Y 说明蛇掉头往下走， 此时应该继续让蛇忘上走
                top = this.Y - 10
            } else {
                top = this.Y + 10
            }
        }
        this.moveSnake(top, 'top');
    }

    addBodies() {
        const elemnt = document.createElement('li');
        elemnt.className = 'snake-item'; //设置类名使对应的样式生效
        this.elemnt.insertAdjacentElement('beforeend', elemnt);
    }

    moveBody() {
        // 移动蛇身体 将最后一个li的位置设置为前面一个li的位置以此类推
        for (let i = this.bodies.length - 1; i > 0; i--) {
            //获取前一个li的坐标值
            const left = (this.bodies[i - 1] as HTMLElement).offsetLeft;
            const top = (this.bodies[i - 1] as HTMLElement).offsetTop;
            // 将获取到的坐标赋值给当前li
            (this.bodies[i] as HTMLElement).style.left = left + 'px';
            (this.bodies[i] as HTMLElement).style.top = top + 'px';
        }
    }

    // 检查蛇头和身体是否相撞：蛇头的坐标和余下所有的li的坐标
    checkCrossBoby(): boolean {
        let res = false;
        const len = this.bodies.length;
        for (let i = 1; i < len; i++) {
            const liElement = (this.bodies[i] as HTMLElement)
            if (this.X === liElement.offsetLeft && this.Y === liElement.offsetTop) {
                res = true;
                // throw new Error('GAME OVER!');
                break;
            }
        }
        return res;
    }

    moveSnake(value: number, direction: string) {
        this.moveBody(); // 移动蛇身
        // 移动蛇头
        direction === 'left' ? this.head.style.left = `${value}px` : this.head.style.top = `${value}px`;
        this.checkCrossBoby();
    }
}

export default Snake;
class Food {
    element: HTMLElement;

    constructor() {
        this.element = document.getElementsByClassName('food')[0] as HTMLElement;
    }

    // 获取food的横坐标
    get Left() {
        return this.element.offsetLeft;
    }

    // 获取food的纵坐标
    get Top() {
        return this.element.offsetTop;
    }

    // 更新food的坐标
    updateFoodPostion() {
        // food的坐标位置范围宽高都是[0, 290], 每次snake移动一个food的width。
        const Left = Math.round(Math.random() * 29) * 10;
        const Top = Math.round(Math.random() * 29) * 10;

        this.element.style.left = `${Left}px`;
        this.element.style.top = `${Top}px`;
    }
}

export default Food;
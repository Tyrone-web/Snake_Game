class ScorePanel {
    score = 0;
    level = 1;
    scoreEle: HTMLElement;
    levelEle: HTMLElement;
    maxLevel: number; // 最高级数
    scoreLevel: number; //多少分升一级 尽量不要使用字面量的数字而是用变量转换

    constructor(maxLevel: number = 10, scoreLevel: number = 10) { // 默认每10分升一级
        this.scoreEle = document.getElementsByClassName('score')[0] as HTMLElement;
        this.levelEle = document.getElementsByClassName('level')[0] as HTMLElement;
        this.maxLevel = maxLevel;
        this.scoreLevel = scoreLevel;
    }

    addScore() {
        this.scoreEle.innerHTML = ++this.score + '';
        // 升级
        this.score % this.scoreLevel === 0 && this.addLevel();
    }

    addLevel() {
        this.level < this.maxLevel && (this.levelEle.innerHTML = ++this.level + '');
    }
}

export default ScorePanel;
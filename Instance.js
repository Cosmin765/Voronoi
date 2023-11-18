class Instance {
    static colors = [
        'red',
        'blue',
        'green',
    ];

    constructor(pos=null, cls=null) {
        this.pos = pos ?? new Vec2(Math.random() * bounds.x, Math.random() * bounds.y);
        this.cls = cls ?? Math.random() * Instance.colors.length | 0;
        this.radius = 5;
        this.color = Instance.colors[this.cls];
    }

    renderMedians() {
        if(this.cls != 0) {
            return;
        }

        for(const instance of instances) {
            if(instance.cls == this.cls) {
                continue;
            }

            // ctx.strokeStyle = 'grey';
            // ctx.beginPath();
            // ctx.moveTo(this.pos.x, this.pos.y);
            // ctx.lineTo(instance.pos.x, instance.pos.y);
            // ctx.closePath();
            // ctx.stroke();

            const middle = new Vec2(this.pos.x + instance.pos.x, this.pos.y + instance.pos.y).div(2);
            
            const slope = -1 / ((instance.pos.y - this.pos.y) / (instance.pos.x - this.pos.x));

            ctx.fillStyle = 'black';
            ctx.beginPath();
            ctx.arc(middle.x, middle.y, 2, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.fill();

            const delta = 5000;
            const p1 = new Vec2(middle.x - delta, slope * (middle.x - delta - middle.x) + middle.y);
            const p2 = new Vec2(middle.x + delta, slope * (middle.x + delta - middle.x) + middle.y);

            p1.sub(middle).normalize().mult(delta).add(middle);
            p2.sub(middle).normalize().mult(delta).add(middle);

            ctx.strokeStyle = 'black';
            ctx.beginPath();
            ctx.moveTo(...middle);
            ctx.lineTo(...p1);
            ctx.closePath();
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(...middle);
            ctx.lineTo(...p2);
            ctx.closePath();
            ctx.stroke();
        }
    }

    render() {
        this.renderMedians();

        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();
    }
}
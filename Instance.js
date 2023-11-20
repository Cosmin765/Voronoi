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
        this.connections = [];
    }

    renderMedians() {
        const connectionsNew = [];
        const highlighted = [];

        for(const instance of instances) {
            if(this.cls > instance.cls) {
                continue;
            }

            if(this.cls !== instance.cls) {
                ctx.strokeStyle = 'grey';
                ctx.beginPath();
                ctx.moveTo(this.pos.x, this.pos.y);
                ctx.lineTo(instance.pos.x, instance.pos.y);
                ctx.closePath();
                ctx.stroke();

                const middle = new Vec2(this.pos.x + instance.pos.x, this.pos.y + instance.pos.y).div(2);
                
                const slope = -1 / ((instance.pos.y - this.pos.y) / (instance.pos.x - this.pos.x));

                ctx.fillStyle = 'black';
                ctx.beginPath();
                ctx.arc(middle.x, middle.y, 2, 0, 2 * Math.PI);
                ctx.closePath();
                ctx.fill();

                const delta = 5000;
                const p1 = new Vec2(middle.x - delta, slope * -delta + middle.y);
                const p2 = new Vec2(middle.x + delta, slope * delta + middle.y);

                p1.sub(middle).normalize().mult(delta).add(middle);
                p2.sub(middle).normalize().mult(delta).add(middle);

                ctx.strokeStyle = 'black';
                ctx.beginPath();
                ctx.moveTo(...p1);
                ctx.lineTo(...p2);
                ctx.closePath();
                ctx.stroke();

                const nElement = middle.y - slope * middle.x;
                connectionsNew.push([slope, nElement, instance]);  // [m, n]
            }

            if(this.cls == 0 && instance.cls === this.cls) {
                // calculate the intersections
                for(const connection1 of this.connections) {
                    for(const connection2 of instance.connections) {
                        if(connection1 === connection2) {
                            continue;
                        }

                        const [m1, n1, other1] = connection1;
                        const [m2, n2, other2] = connection2;

                        if(m1 === m2) {
                            // they are parallel
                            continue;
                        }

                        // intersection point
                        const x = (n2 - n1) / (m1 - m2);
                        const y = m1 * x + n1;

                        $('.debug').innerHTML = `${m1} ${m2} ${n1} ${n2}`;
                        
                        ctx.fillStyle = 'magenta';
                        ctx.beginPath();
                        ctx.arc(x, y, 10, 0, 2 * Math.PI);
                        ctx.closePath();
                        ctx.fill();

                        const delta = 5000;
                        // let p = new Vec2(x - delta, m1 * -delta + y);
                        let p = this.pos.copy().add(other1.pos).div(2);

                        

                        // if(this.pos.y - other2.pos.y < 0) {
                        //     p.y *= -1;
                        // }

                        highlighted.push([new Vec2(x, y), p]);
                    }
                }
            }
        }

        ctx.save();
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 5;
        for(const [p1, p2] of highlighted) {
            ctx.beginPath();
            ctx.moveTo(...p1);
            ctx.lineTo(...p2);
            ctx.closePath();
            ctx.stroke();
        }
        ctx.restore();

        this.connections = connectionsNew;
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
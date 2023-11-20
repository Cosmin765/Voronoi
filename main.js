window.onload = main;

let canvas, ctx;
const bounds = new Vec2(innerWidth, innerHeight);

const mouseInstance = new Instance(null, 0);
const instances = [mouseInstance];

const $ = name => document.querySelector(name);


function main() {
    canvas = document.querySelector('canvas');
    ctx = canvas.getContext('2d');

    [canvas.width, canvas.height] = bounds;
    requestAnimationFrame(render);

    for(let i = 0; i < 2; ++i) {
        // const cls = Math.random() * 2 | 0;
        const cls = 1;
        const instance = new Instance(null, cls);
        instances.push(instance);
    }

    addEventListener('mousemove', e => {
        mouseInstance.pos.x = e.pageX;
        mouseInstance.pos.y = e.pageY;
    }); 
}

function render() {
    ctx.fillStyle = '#42d1f5';
    ctx.fillRect(0, 0, bounds.x, bounds.y);

    for(const instance of instances) {
        instance.render();
    }

    requestAnimationFrame(render);
}

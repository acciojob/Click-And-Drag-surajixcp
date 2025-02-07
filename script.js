const cubes = document.querySelectorAll('.cube');
const container = document.querySelector('.container');
let selectedCube = null;
let offsetX, offsetY;

cubes.forEach(cube => {
    cube.addEventListener('mousedown', (e) => {
        selectedCube = cube;
        offsetX = e.clientX - cube.getBoundingClientRect().left;
        offsetY = e.clientY - cube.getBoundingClientRect().top;
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });
});

function onMouseMove(e) {
    if (!selectedCube) return;

    let newX = e.clientX - offsetX;
    let newY = e.clientY - offsetY;

    // Get container boundaries
    const containerRect = container.getBoundingClientRect();
    const cubeRect = selectedCube.getBoundingClientRect();

    // Boundary conditions
    if (newX < containerRect.left) newX = containerRect.left;
    if (newX + cubeRect.width > containerRect.right) newX = containerRect.right - cubeRect.width;
    if (newY < containerRect.top) newY = containerRect.top;
    if (newY + cubeRect.height > containerRect.bottom) newY = containerRect.bottom - cubeRect.height;

    selectedCube.style.left = `${newX - containerRect.left}px`;
    selectedCube.style.top = `${newY - containerRect.top}px`;
}

function onMouseUp() {
    selectedCube = null;
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
}


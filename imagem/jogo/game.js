document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.getElementById('game-container');
    const player = document.getElementById('player');
    const playerSpeed = 10;
    const playerWidth = 50;
    const gameWidth = gameContainer.clientWidth;
    const gameHeight = gameContainer.clientHeight;
    let playerPosition = gameWidth / 2 - playerWidth / 2;

    // Movimentação do jogador
    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft' && playerPosition > 0) {
            playerPosition -= playerSpeed;
        } else if (event.key === 'ArrowRight' && playerPosition < gameWidth - playerWidth) {
            playerPosition += playerSpeed;
        }
        player.style.left = `${playerPosition}px`;
    });

    // Criar objeto que cai
    function createFallingObject() {
        const object = document.createElement('div');
        object.classList.add('falling-object');
        object.style.left = `${Math.random() * (gameWidth - 30)}px`;
        object.style.top = '0px';
        gameContainer.appendChild(object);

        let objectPosition = 0;
        const objectFallSpeed = 5;

        function fall() {
            if (objectPosition < gameHeight) {
                objectPosition += objectFallSpeed;
                object.style.top = `${objectPosition}px`;
                requestAnimationFrame(fall);
            } else {
                gameContainer.removeChild(object);
            }
        }
        fall();
    }

    // Criar item coletável
    function createCollectibleItem() {
        const item = document.createElement('div');
        item.classList.add('collectible-item');
        item.style.left = `${Math.random() * (gameWidth - 30)}px`;
        item.style.top = '0px';
        gameContainer.appendChild(item);

        let itemPosition = 0;
        const itemFallSpeed = 5;

        function fall() {
            if (itemPosition < gameHeight) {
                itemPosition += itemFallSpeed;
                item.style.top = `${itemPosition}px`;
                requestAnimationFrame(fall);
            } else {
                gameContainer.removeChild(item);
            }
        }
        fall();
    }

    // Verificar colisão
    function checkCollision() {
        const objects = document.querySelectorAll('.falling-object');
        const items = document.querySelectorAll('.collectible-item');
        const playerRect = player.getBoundingClientRect();

        objects.forEach(object => {
            const objectRect = object.getBoundingClientRect();
            if (playerRect.left < objectRect.right && playerRect.right > objectRect.left &&
                playerRect.top < objectRect.bottom && playerRect.bottom > objectRect.top) {
                alert('Game Over!');
                window.location.reload();
            }
        });

        items.forEach(item => {
            const itemRect = item.getBoundingClientRect();
            if (playerRect.left < itemRect.right && playerRect.right > itemRect.left &&
                playerRect.top < itemRect.bottom && playerRect.bottom > itemRect.top) {
                gameContainer.removeChild(item);
                // Adicione lógica para incrementar a pontuação aqui
            }
        });

        requestAnimationFrame(checkCollision);
    }

    // Intervalos para criar objetos e itens
    setInterval(createFallingObject, 2000);
    setInterval(createCollectibleItem, 3000);
    requestAnimationFrame(checkCollision);
});
